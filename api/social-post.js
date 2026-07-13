// social-post.js — Content Distro engine (Make webhook replacement)
//
// ⚠️ DORMANT (shelved by /musk 2026-06-17). NOT DEPLOYED / NOT IN USE.
// Content Distro v2 drives the existing Make webhook instead, because Make
// already owns an approved Meta app + token refresh and is free at Ben's
// volume. Revive this ONLY if Make ever caps or breaks — it needs its own
// Meta app + IG/LinkedIn tokens + the env vars documented below.
//
// One endpoint that owns Instagram + LinkedIn auth and posts synchronously.
// Accepts the SAME payload shape the old Make webhook used, so the Claude
// routine (or any caller) just swaps the URL. Returns post IDs + permalinks.
//
// Auth model (durable, set-and-forget):
//   Instagram -> IG_ACCESS_TOKEN  (Facebook System User token = never expires)
//                IG_USER_ID       (17841480205447947 = @benlewisstudios)
//   LinkedIn  -> LINKEDIN_ACCESS_TOKEN (env). On 401 it self-heals via
//                LINKEDIN_REFRESH_TOKEN + LINKEDIN_CLIENT_ID/SECRET if present.
//   Guard     -> BRIDGE_SECRET, sent as the x-bridge-secret header.
//
// Payload:
//   { platform: "instagram"|"linkedin"|"both",
//     post_type: "feed"|"carousel"|"reel",   // IG routing; omit for LI text
//     media_type: "image"|"video"|"text",
//     media_urls: [{image_url|video_url, media_type:"IMAGE"|"VIDEO"}],
//     caption: "...", alt_text: "..." }

export const config = { maxDuration: 120 };

const GRAPH = "https://graph.facebook.com/v21.0";
const LINKEDIN_API = "https://api.linkedin.com";
const LI_VERSION = "202510";

function json(res, status, body) {
  res.setHeader("Content-Type", "application/json");
  res.status(status).send(JSON.stringify(body));
}

async function fetchJson(url, opts = {}) {
  const r = await fetch(url, opts);
  const text = await r.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  return { ok: r.ok, status: r.status, headers: r.headers, body };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─────────────────────────────────────────────────────────────────────────
// Instagram (Graph API content publishing)
// ─────────────────────────────────────────────────────────────────────────

async function igForm(path, params) {
  const body = new URLSearchParams(params).toString();
  return fetchJson(`${GRAPH}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}

// Poll a container until it is FINISHED (reels/video need processing time).
async function igWaitContainer(containerId, token, log) {
  for (let i = 0; i < 30; i++) { // 30 × 4s = 2 min max
    await sleep(4000);
    const q = await fetchJson(
      `${GRAPH}/${containerId}?fields=status_code,status&access_token=${encodeURIComponent(token)}`
    );
    const code = q.body?.status_code;
    log.push({ poll: i + 1, status_code: code });
    if (code === "FINISHED") return true;
    if (code === "ERROR" || code === "EXPIRED") {
      throw new Error(`IG container ${code}: ${JSON.stringify(q.body?.status || q.body)}`);
    }
  }
  throw new Error("IG container did not reach FINISHED within 2 min");
}

async function postInstagram({ post_type, media_type, media_urls, caption }) {
  const token = process.env.IG_ACCESS_TOKEN;
  const igUser = process.env.IG_USER_ID;
  if (!token) throw new Error("IG_ACCESS_TOKEN not set");
  if (!igUser) throw new Error("IG_USER_ID not set");

  const log = [];
  let creationId;

  if (post_type === "reel" || media_type === "video") {
    const videoUrl = media_urls?.[0]?.video_url || media_urls?.[0]?.image_url;
    if (!videoUrl) throw new Error("reel requires media_urls[0].video_url");
    const c = await igForm(`${igUser}/media`, {
      media_type: "REELS", video_url: videoUrl, caption: caption || "", access_token: token,
    });
    if (!c.ok || !c.body?.id) throw new Error(`IG reel container failed: ${JSON.stringify(c.body)}`);
    creationId = c.body.id;
    await igWaitContainer(creationId, token, log);

  } else if (post_type === "carousel") {
    if (!Array.isArray(media_urls) || media_urls.length < 2) {
      throw new Error("carousel requires 2+ media_urls");
    }
    const childIds = [];
    for (const m of media_urls) {
      const isVid = (m.media_type || "").toUpperCase() === "VIDEO" || !!m.video_url;
      const params = isVid
        ? { media_type: "VIDEO", video_url: m.video_url, is_carousel_item: "true", access_token: token }
        : { image_url: m.image_url, is_carousel_item: "true", access_token: token };
      const child = await igForm(`${igUser}/media`, params);
      if (!child.ok || !child.body?.id) throw new Error(`IG carousel child failed: ${JSON.stringify(child.body)}`);
      if (isVid) await igWaitContainer(child.body.id, token, log);
      childIds.push(child.body.id);
    }
    const parent = await igForm(`${igUser}/media`, {
      media_type: "CAROUSEL", children: childIds.join(","), caption: caption || "", access_token: token,
    });
    if (!parent.ok || !parent.body?.id) throw new Error(`IG carousel parent failed: ${JSON.stringify(parent.body)}`);
    creationId = parent.body.id;
    await igWaitContainer(creationId, token, log).catch(() => {}); // image carousels are usually instant

  } else {
    // single feed image
    const imageUrl = media_urls?.[0]?.image_url;
    if (!imageUrl) throw new Error("feed image requires media_urls[0].image_url");
    const c = await igForm(`${igUser}/media`, {
      image_url: imageUrl, caption: caption || "", access_token: token,
    });
    if (!c.ok || !c.body?.id) throw new Error(`IG image container failed: ${JSON.stringify(c.body)}`);
    creationId = c.body.id;
  }

  // publish
  const pub = await igForm(`${igUser}/media_publish`, { creation_id: creationId, access_token: token });
  if (!pub.ok || !pub.body?.id) throw new Error(`IG publish failed: ${JSON.stringify(pub.body)}`);
  const mediaId = pub.body.id;

  // permalink (best effort)
  let permalink = null;
  const pl = await fetchJson(`${GRAPH}/${mediaId}?fields=permalink&access_token=${encodeURIComponent(token)}`);
  if (pl.ok) permalink = pl.body?.permalink || null;

  return { success: true, media_id: mediaId, permalink, log };
}

// ─────────────────────────────────────────────────────────────────────────
// LinkedIn (personal profile)
// ─────────────────────────────────────────────────────────────────────────

// Returns a usable access token, refreshing once if the env token is dead.
async function getLinkedInToken() {
  const envToken = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!envToken) throw new Error("LINKEDIN_ACCESS_TOKEN not set");
  const probe = await fetchJson(`${LINKEDIN_API}/v2/userinfo`, {
    headers: { Authorization: `Bearer ${envToken}`, "Content-Type": "application/json" },
  });
  if (probe.ok) return { token: envToken, sub: probe.body?.sub, refreshed: false };

  // self-heal via refresh token if configured
  if (process.env.LINKEDIN_REFRESH_TOKEN && process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
    const form = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.LINKEDIN_REFRESH_TOKEN,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    }).toString();
    const ref = await fetchJson(`${LINKEDIN_API}/oauth/v2/accessToken`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    if (!ref.ok || !ref.body?.access_token) {
      throw new Error(`LinkedIn token expired and refresh failed: ${JSON.stringify(ref.body)}`);
    }
    const token = ref.body.access_token;
    const who = await fetchJson(`${LINKEDIN_API}/v2/userinfo`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return {
      token,
      sub: who.body?.sub,
      refreshed: true,
      // surfaced so the caller can persist the rotated refresh token if LinkedIn returned one
      new_refresh_token: ref.body.refresh_token || null,
    };
  }
  throw new Error(`LinkedIn token rejected (401) and no refresh token configured: ${JSON.stringify(probe.body)}`);
}

async function liRegisterImage(author, token, imageUrl) {
  const reg = await fetchJson(`${LINKEDIN_API}/v2/assets?action=registerUpload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      registerUploadRequest: {
        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
        owner: author,
        serviceRelationships: [{ relationshipType: "OWNER", identifier: "urn:li:userGeneratedContent" }],
      },
    }),
  });
  if (!reg.ok) throw new Error(`LI registerUpload failed: ${JSON.stringify(reg.body)}`);
  const uploadUrl =
    reg.body?.value?.uploadMechanism?.["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]?.uploadUrl;
  const asset = reg.body?.value?.asset;
  if (!uploadUrl || !asset) throw new Error(`LI registerUpload missing fields: ${JSON.stringify(reg.body)}`);

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`LI image download failed (${imgRes.status}) for ${imageUrl}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const put = await fetch(uploadUrl, {
    method: "PUT",
    body: buf,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/octet-stream" },
  });
  if (!put.ok) throw new Error(`LI image upload failed: ${put.status}`);
  return asset;
}

// Full video flow, ported from linkedin-video-upload.js (proven path).
async function liUploadVideo(author, token, videoUrl, log) {
  const H = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Restli-Protocol-Version": "2.0.0",
    "LinkedIn-Version": LI_VERSION,
  };
  const videoRes = await fetch(videoUrl);
  if (!videoRes.ok) throw new Error(`LI video download failed: ${videoRes.status}`);
  const buf = Buffer.from(await videoRes.arrayBuffer());

  const init = await fetchJson(`${LINKEDIN_API}/rest/videos?action=initializeUpload`, {
    method: "POST",
    headers: H,
    body: JSON.stringify({
      initializeUploadRequest: { owner: author, fileSizeBytes: buf.length, uploadCaptions: false, uploadThumbnail: false },
    }),
  });
  if (!init.ok) throw new Error(`LI video init failed: ${JSON.stringify(init.body)}`);
  const v = init.body?.value;
  const videoUrn = v?.video;
  const instructions = v?.uploadInstructions || [];
  const uploadToken = v?.uploadToken || "";
  if (!videoUrn || !instructions.length) throw new Error(`LI video init missing fields: ${JSON.stringify(init.body)}`);

  const partIds = [];
  for (let i = 0; i < instructions.length; i++) {
    const { uploadUrl, firstByte, lastByte } = instructions[i];
    const chunk = buf.subarray(firstByte, lastByte + 1);
    const put = await fetch(uploadUrl, { method: "PUT", body: chunk, headers: { "Content-Type": "application/octet-stream" } });
    if (!put.ok) throw new Error(`LI video chunk ${i + 1} failed: ${put.status}`);
    const etag = put.headers.get("etag") || put.headers.get("ETag");
    if (etag) partIds.push(etag);
  }

  const fin = await fetchJson(`${LINKEDIN_API}/rest/videos?action=finalizeUpload`, {
    method: "POST",
    headers: H,
    body: JSON.stringify({ finalizeUploadRequest: { video: videoUrn, uploadToken, uploadedPartIds: partIds } }),
  });
  if (!fin.ok) throw new Error(`LI video finalize failed: ${JSON.stringify(fin.body)}`);

  let status = null;
  for (let i = 0; i < 15; i++) {
    await sleep(2000);
    const q = await fetchJson(`${LINKEDIN_API}/rest/videos/${encodeURIComponent(videoUrn)}`, { headers: H });
    status = q.body?.status;
    if (status === "AVAILABLE") break;
    if (status === "PROCESSING_FAILED" || status === "DELETED") throw new Error(`LI video ${status}`);
  }
  if (status !== "AVAILABLE") throw new Error(`LI video not AVAILABLE within 30s (last: ${status})`);
  log.push({ li_video: videoUrn, status });
  return videoUrn;
}

async function postLinkedIn({ media_type, media_urls, caption }) {
  const { token, sub, refreshed, new_refresh_token } = await getLinkedInToken();
  if (!sub) throw new Error("LinkedIn /v2/userinfo returned no sub");
  const author = `urn:li:person:${sub}`;
  const log = [];

  let shareMediaCategory = "NONE";
  let media = [];

  if (media_type === "video") {
    const videoUrl = media_urls?.[0]?.video_url || media_urls?.[0]?.image_url;
    if (!videoUrl) throw new Error("LI video requires media_urls[0].video_url");
    const urn = await liUploadVideo(author, token, videoUrl, log);
    shareMediaCategory = "VIDEO";
    media = [{ status: "READY", media: urn }];

  } else if (media_type === "image") {
    const imgs = (media_urls || []).filter((m) => m.image_url).map((m) => m.image_url);
    if (!imgs.length) throw new Error("LI image post requires at least one media_urls[].image_url");
    const assets = [];
    for (const url of imgs) assets.push(await liRegisterImage(author, token, url));
    shareMediaCategory = "IMAGE";
    media = assets.map((a) => ({ status: "READY", media: a }));
  }
  // else text -> NONE, no media

  const shareContent = {
    shareCommentary: { text: caption || "" },
    shareMediaCategory,
  };
  if (media.length) shareContent.media = media;

  const post = await fetchJson(`${LINKEDIN_API}/v2/ugcPosts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author,
      lifecycleState: "PUBLISHED",
      specificContent: { "com.linkedin.ugc.ShareContent": shareContent },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    }),
  });
  if (!post.ok) throw new Error(`LI post failed: ${JSON.stringify(post.body)}`);
  const postUrn = post.headers.get("x-restli-id") || post.body?.id || null;

  return {
    success: true,
    post_urn: postUrn,
    permalink: postUrn ? `https://www.linkedin.com/feed/update/${postUrn}` : null,
    token_refreshed: refreshed,
    // If present, the caller MUST persist this — the old refresh token is now stale.
    new_refresh_token: new_refresh_token || undefined,
    log,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const expected = process.env.BRIDGE_SECRET;
  if (expected && req.headers["x-bridge-secret"] !== expected) {
    return json(res, 401, { error: "Unauthorized" });
  }

  const p = req.body || {};
  const platform = p.platform;
  if (!["instagram", "linkedin", "both"].includes(platform)) {
    return json(res, 400, { error: "platform must be instagram | linkedin | both" });
  }

  const out = { platform };
  try {
    if (platform === "instagram" || platform === "both") {
      out.instagram = await postInstagram(p);
    }
    if (platform === "linkedin" || platform === "both") {
      out.linkedin = await postLinkedIn(p);
    }
    return json(res, 200, { success: true, ...out });
  } catch (err) {
    // Partial success is possible on cross-post — report what we have.
    return json(res, 502, { success: false, error: err.message, ...out });
  }
}
