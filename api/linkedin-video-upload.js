export const config = {
  maxDuration: 60,
};

const LINKEDIN_API = "https://api.linkedin.com";
const API_VERSION = "202510";

function json(res, status, body) {
  res.setHeader("Content-Type", "application/json");
  res.status(status).send(JSON.stringify(body));
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, opts);
  const text = await res.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  return { ok: res.ok, status: res.status, headers: res.headers, body };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) return json(res, 500, { error: "LINKEDIN_ACCESS_TOKEN env var not set" });

  const shared = req.headers["x-bridge-secret"];
  const expected = process.env.BRIDGE_SECRET;
  if (expected && shared !== expected) return json(res, 401, { error: "Unauthorized" });

  const { video_url, caption = "", alt_text = "" } = req.body || {};
  if (!video_url) return json(res, 400, { error: "video_url required" });

  const H = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Restli-Protocol-Version": "2.0.0",
    "LinkedIn-Version": API_VERSION,
  };

  const log = [];
  const step = (name, data) => log.push({ name, ...data });

  try {
    // 1. Get author URN via /v2/userinfo (OpenID Connect — works with the `openid profile` scope)
    const me = await fetchJson(`${LINKEDIN_API}/v2/userinfo`, { headers: H });
    if (!me.ok) return json(res, 502, { error: "v2/userinfo failed", status: me.status, body: me.body });
    // /v2/userinfo returns { sub: "...", name, email, picture, ... } where `sub` is the member ID
    const authorId = me.body?.sub;
    if (!authorId) return json(res, 502, { error: "v2/userinfo returned no sub", body: me.body });
    const author = `urn:li:person:${authorId}`;
    step("me", { authorId });

    // 2. Download video
    const videoRes = await fetch(video_url);
    if (!videoRes.ok) return json(res, 502, { error: "video download failed", status: videoRes.status });
    const videoBuf = Buffer.from(await videoRes.arrayBuffer());
    const fileSize = videoBuf.length;
    step("download", { bytes: fileSize });

    // 3. Initialize upload
    const init = await fetchJson(`${LINKEDIN_API}/rest/videos?action=initializeUpload`, {
      method: "POST",
      headers: H,
      body: JSON.stringify({
        initializeUploadRequest: {
          owner: author,
          fileSizeBytes: fileSize,
          uploadCaptions: false,
          uploadThumbnail: false,
        },
      }),
    });
    if (!init.ok) return json(res, 502, { error: "initializeUpload failed", status: init.status, body: init.body });
    const value = init.body?.value;
    const videoUrn = value?.video;
    const instructions = value?.uploadInstructions || [];
    const uploadToken = value?.uploadToken || "";
    if (!videoUrn || instructions.length === 0) {
      return json(res, 502, { error: "initializeUpload response missing fields", body: init.body });
    }
    step("init", { videoUrn, chunkCount: instructions.length, uploadToken: !!uploadToken });

    // 4. PUT each chunk, collect etags
    const uploadedPartIds = [];
    for (let i = 0; i < instructions.length; i++) {
      const { uploadUrl, firstByte, lastByte } = instructions[i];
      const chunk = videoBuf.subarray(firstByte, lastByte + 1);
      const put = await fetch(uploadUrl, {
        method: "PUT",
        body: chunk,
        headers: { "Content-Type": "application/octet-stream" },
      });
      if (!put.ok) {
        const text = await put.text().catch(() => "");
        return json(res, 502, { error: `chunk ${i + 1}/${instructions.length} failed`, status: put.status, body: text.slice(0, 500) });
      }
      const etag = put.headers.get("etag") || put.headers.get("ETag");
      if (etag) uploadedPartIds.push(etag);
      step(`chunk${i + 1}`, { bytes: chunk.length, etag: !!etag });
    }

    // 5. Finalize
    const finalize = await fetchJson(`${LINKEDIN_API}/rest/videos?action=finalizeUpload`, {
      method: "POST",
      headers: H,
      body: JSON.stringify({
        finalizeUploadRequest: {
          video: videoUrn,
          uploadToken,
          uploadedPartIds,
        },
      }),
    });
    if (!finalize.ok) return json(res, 502, { error: "finalizeUpload failed", status: finalize.status, body: finalize.body });
    step("finalize", { status: finalize.status });

    // 6. Poll status until AVAILABLE (single-chunk videos often skip this)
    let status = null;
    const maxAttempts = 15; // 15 × 2s = 30s max
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const q = await fetchJson(`${LINKEDIN_API}/rest/videos/${encodeURIComponent(videoUrn)}`, { headers: H });
      status = q.body?.status;
      if (status === "AVAILABLE") break;
      if (status === "PROCESSING_FAILED" || status === "DELETED") {
        return json(res, 502, { error: `video ${status}`, body: q.body });
      }
    }
    if (status !== "AVAILABLE") {
      return json(res, 504, { error: `video did not reach AVAILABLE within 30s`, last_status: status });
    }
    step("poll", { finalStatus: status });

    // 7. Create post
    const post = await fetchJson(`${LINKEDIN_API}/rest/posts`, {
      method: "POST",
      headers: H,
      body: JSON.stringify({
        author,
        commentary: caption,
        visibility: "PUBLIC",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        content: {
          media: { id: videoUrn, altText: alt_text },
        },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
      }),
    });
    if (!post.ok) return json(res, 502, { error: "create post failed", status: post.status, body: post.body });
    const postUrn = post.headers.get("x-restli-id") || post.headers.get("x-linkedin-id") || post.body?.id || null;
    step("post", { postUrn });

    return json(res, 200, {
      success: true,
      post_urn: postUrn,
      video_urn: videoUrn,
      chunks: instructions.length,
      bytes: fileSize,
      log,
    });
  } catch (err) {
    return json(res, 500, { error: err.message, stack: err.stack, log });
  }
}
