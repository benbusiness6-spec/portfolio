import { useEffect, useRef, useState } from "react";
import { Reveal, CALENDLY_URL } from "./shared.jsx";

const GOLD = "#C5A572";

const HERO = {
  src: "/assets/security/wd03-hero.mp4",
  poster: "/assets/security/wd03-hero-poster.webp",
  views: "100k+ views",
};

const PROOF = [
  { src: "/assets/security/wd-top.mp4", poster: "/assets/security/wd-top-poster.webp", views: "160k views" },
  { src: "/assets/security/wd03-hero.mp4", poster: "/assets/security/wd03-hero-poster.webp", views: "100k views" },
  { src: "/assets/security/wd-50k.mp4", poster: "/assets/security/wd-50k-poster.webp", views: "60k views" },
];

const MUTED_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>;
const SOUND_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;

function Stars() {
  return (
    <span style={{ display: "inline-flex", gap: "3px" }} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={GOLD} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      ))}
    </span>
  );
}

// Framed video: gold frame + poster + autoplay-muted loop + tap-to-unmute + view badge.
// priority=true loads immediately (hero LCP); otherwise lazy via IntersectionObserver.
function FramedVideo({ src, poster, views, priority = false, frameClass = "" }) {
  const wrapRef = useRef(null);
  const vidRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    if (priority) {
      if ("requestIdleCallback" in window) requestIdleCallback(() => setShouldLoad(true), { timeout: 300 });
      else setTimeout(() => setShouldLoad(true), 50);
      return;
    }
    const el = wrapRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShouldLoad(true); obs.unobserve(el); } }, { rootMargin: "400px" });
    obs.observe(el); return () => obs.disconnect();
  }, [priority]);
  const toggle = (e) => { e.stopPropagation(); if (vidRef.current) { vidRef.current.muted = !vidRef.current.muted; setMuted(vidRef.current.muted); } };
  return (
    <div ref={wrapRef} className={`sec-frame ${frameClass}`} onClick={toggle} style={{ cursor: "pointer" }}>
      <div className="sec-frame-inner" style={{ height: "100%" }}>
        {poster && <img src={poster} alt="Watchdog cinematic brand film" loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 0 : 1, transition: "opacity 0.5s ease" }} />}
        {shouldLoad && <video ref={vidRef} src={src} poster={poster} autoPlay muted loop playsInline preload={priority ? "auto" : "metadata"}
          onLoadedData={() => setLoaded(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }} />}
        {views && (
          <div className="view-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {views}
          </div>
        )}
        <button aria-label="Toggle sound" onClick={toggle} style={{ position: "absolute", bottom: "12px", right: "12px", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3, cursor: "pointer" }}>
          {muted ? MUTED_ICON : SOUND_ICON}
        </button>
      </div>
    </div>
  );
}

function BookBtn({ children = "Book a 15-minute call", big = false }) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bp" style={big ? { padding: "20px 48px", fontSize: "12px" } : {}}>{children}</a>
  );
}

function ScrollCue() {
  const go = () => document.getElementById("proof")?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="sec-cue" onClick={go} role="button" aria-label="See more proof">
      <span className="cta-hint" style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#F5F0EB", fontWeight: 500 }}>See more proof</span>
      <div className="scroll-arrow" style={{ color: GOLD, marginTop: "7px", display: "inline-flex" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
  );
}

const SEC_STYLES = `
.sec-hero{position:relative;min-height:100svh;display:flex;align-items:center;padding:88px 24px 64px}
.sec-hero-inner{max-width:1240px;width:100%;margin:0 auto;display:flex;gap:64px;align-items:center;justify-content:center}
.sec-hero-copy{flex:1 1 520px;max-width:640px}
.sec-hero-media{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:14px}
.sec-frame{box-sizing:border-box;border:1.5px solid rgba(197,165,114,0.5);background:rgba(197,165,114,0.05);border-radius:16px;padding:6px;box-shadow:0 28px 80px rgba(0,0,0,0.55)}
.sec-frame-inner{border-radius:10px;overflow:hidden;position:relative;background:#111;width:100%}
.sec-hero-frame{height:min(76svh,720px);aspect-ratio:9/16}
.sec-proof-frame{width:100%;aspect-ratio:9/16}
.view-badge{position:absolute;bottom:12px;left:12px;display:flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;background:rgba(0,0,0,0.62);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12);font-size:12px;font-weight:500;letter-spacing:0.3px;color:#F5F0EB;z-index:3}
.rating-row{display:flex;align-items:center;gap:10px}
.rating-row .rt{font-size:13px;letter-spacing:0.5px;color:rgba(245,240,235,0.7);font-weight:400}
.sec-cue{position:absolute;left:0;right:0;bottom:22px;display:flex;flex-direction:column;align-items:center;cursor:pointer;z-index:4}
.sec-sp{padding-top:64px!important;padding-bottom:64px!important}
.whoami{display:flex;gap:48px;align-items:center;flex-wrap:wrap;justify-content:center}
.whoami-copy{flex:1 1 360px;max-width:500px}
@media(max-width:768px){
  .sec-hero{padding:56px 20px 56px;align-items:center}
  .sec-hero-inner{flex-direction:column;gap:12px}
  .sec-hero-copy{flex:0 0 auto;max-width:100%;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
  .sec-hero h1{font-size:clamp(27px,6.8vw,44px)!important;margin-top:8px!important}
  .sec-hero-sub{font-size:14px!important;line-height:1.5!important;margin-top:10px!important;max-width:420px!important}
  .sec-hero-rating{margin-top:12px!important}
  .sec-hero-cta{margin-top:16px!important}
  .sec-hero-frame{height:min(40svh,470px)}
  .rating-row{justify-content:center}
  .sec-hero-chip{display:none}
  .sec-sp{padding-top:48px!important;padding-bottom:48px!important}
  .whoami{text-align:center}
  .whoami-copy{text-align:center}
  .whoami-copy .sl{text-align:center!important}
}
`;

export default function Security() {
  useEffect(() => {
    document.title = "Cinematic AI Content for Security Firms · Ben Lewis Studios";
    const meta = document.querySelector('meta[name="description"]');
    const prev = meta?.getAttribute("content");
    if (meta) meta.setAttribute("content", "Cinematic AI content that makes established security firms the name their market trusts first. 300,000+ organic views for a multi-million-pound security group. Book a 15-minute call.");
    return () => { if (meta && prev != null) meta.setAttribute("content", prev); };
  }, []);

  return (
    <>
      <style>{SEC_STYLES}</style>

      {/* HERO */}
      <section className="sec-hero">
        <div className="sec-hero-inner">
          <div className="sec-hero-copy">
            <div style={{ fontFamily: "var(--fh)", fontSize: "11px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", animation: "fadeIn 0.8s ease 0.1s both" }}>
              Cinematic AI content · for security firms
            </div>
            <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(34px,5.4vw,76px)", fontWeight: 700, lineHeight: 1.03, letterSpacing: "-1.5px", margin: "22px 0 0", animation: "fadeUp 0.9s ease 0.25s both" }}>
              You earned the reputation.{" "}
              <span style={{ color: "rgba(245,240,235,0.55)", fontWeight: 600 }}>Now own the recognition.</span>
            </h1>
            <p className="sec-hero-sub" style={{ fontSize: "clamp(16px,1.9vw,21px)", lineHeight: 1.55, color: "rgba(245,240,235,0.68)", maxWidth: "540px", margin: "22px 0 0", fontWeight: 300, animation: "fadeUp 0.9s ease 0.4s both" }}>
              Cinematic content that makes your firm the obvious, trusted choice, so you compete on reputation, never on price.
            </p>
            <div className="rating-row sec-hero-rating" style={{ marginTop: "24px", animation: "fadeUp 0.9s ease 0.5s both" }}>
              <Stars />
              <span className="rt">100% client satisfaction</span>
            </div>
            <div className="sec-hero-cta" style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", animation: "fadeUp 0.9s ease 0.6s both" }}>
              <BookBtn big />
              <span className="sec-hero-chip" style={{ fontSize: "13px", letterSpacing: "0.5px", color: "rgba(245,240,235,0.45)", fontWeight: 300 }}>
                300,000+ organic views · multi-million-pound security group
              </span>
            </div>
          </div>
          <div className="sec-hero-media" style={{ animation: "fadeUp 1s ease 0.45s both" }}>
            <FramedVideo src={HERO.src} poster={HERO.poster} views={HERO.views} priority frameClass="sec-hero-frame" />
            <p style={{ textAlign: "center", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: GOLD, fontWeight: 500, opacity: 0.85 }}>
              Latest case study · Watchdog
            </p>
          </div>
        </div>
        <ScrollCue />
      </section>

      {/* PROOF — latest case study */}
      <section id="proof" style={{ padding: "70px 24px 72px", background: "linear-gradient(180deg,#0A0A0A,#0d0d0d 50%,#0A0A0A)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div className="sl">Latest case study · Watchdog</div>
            <h2 className="sh" style={{ marginBottom: "16px" }}>The work that made a security group impossible to ignore.</h2>
            <p style={{ textAlign: "center", fontSize: "15px", lineHeight: 1.7, color: "rgba(245,240,235,0.5)", fontWeight: 300, maxWidth: "660px", margin: "0 auto 8px" }}>
              Our latest: a multi-million-pound UK security group that keeps bringing us back, film after film, to build and run their on-screen brand. Here's what those films did on organic reach alone.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="stats-bar" style={{ border: "none", marginTop: "24px", marginBottom: "16px" }}>
              <div style={{ textAlign: "center" }}>
                <div className="stat-num">300k+</div>
                <div className="stat-lbl">Organic views</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="stat-num">100k+</div>
                <div className="stat-lbl">Average per film</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="stat-num">1,000s</div>
                <div className="stat-lbl">Shares</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: "22px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
              {PROOF.map((p, i) => (
                <div key={i} style={{ width: "min(240px, 72vw)" }}>
                  <FramedVideo src={p.src} poster={p.poster} views={p.views} frameClass="sec-proof-frame" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA directly below proof */}
      <section className="sp sec-sp" style={{ maxWidth: "760px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(24px,3.2vw,36px)", fontWeight: 600, lineHeight: 1.2, marginBottom: "26px", color: "#F5F0EB" }}>
            See what this would look like for your firm.
          </h2>
          <BookBtn big />
        </Reveal>
      </section>

      {/* THE GUT-CHECK — visceral pain → dream */}
      <section className="sp sec-sp" style={{ maxWidth: "860px", textAlign: "center" }}>
        <Reveal>
          <div className="sl">The real cost</div>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(25px,3.6vw,40px)", fontWeight: 600, lineHeight: 1.18, marginBottom: "30px", color: "#F5F0EB" }}>
            Right now, someone who needs exactly what you do is calling a competitor, because his name came to mind and yours didn't.
          </h2>
          <div style={{ fontSize: "16px", lineHeight: 1.85, color: "rgba(245,240,235,0.6)", fontWeight: 300, display: "flex", flexDirection: "column", gap: "18px", maxWidth: "680px", margin: "0 auto" }}>
            <p>It isn't because he's better than you. His response times might be slower, his reviews thinner, his team smaller. He just got <em style={{ fontStyle: "normal", color: "#F5F0EB" }}>remembered first</em>, and in this market, being remembered first is the whole game.</p>
            <p>Every month that gap stays open, it quietly costs you: the contracts you should have won, the rates you should have charged, the ground the big consolidators buy up while you stay invisible.</p>
            <p style={{ color: "rgba(245,240,235,0.85)" }}>Picture the opposite. You're the name that surfaces first. The firm that looks like the obvious, serious choice before a word is exchanged. You're off the price treadmill, and the bigger work starts coming to you.</p>
          </div>
        </Reveal>
      </section>

      {/* WHO AM I */}
      <section className="sp sec-sp" style={{ maxWidth: "960px" }}>
        <Reveal>
          <div className="whoami">
            <div style={{ flex: "0 0 auto" }}>
              <div className="sec-frame" style={{ width: "min(260px, 70vw)" }}>
                <div className="sec-frame-inner" style={{ aspectRatio: "4/5" }}>
                  <img src="/assets/ben-lewis.webp" alt="Ben Lewis" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%", display: "block" }} />
                </div>
              </div>
            </div>
            <div className="whoami-copy">
              <div className="sl" style={{ textAlign: "left" }}>Who you'd work with</div>
              <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(24px,3vw,34px)", fontWeight: 600, lineHeight: 1.2, marginBottom: "20px", color: "#F5F0EB" }}>I'm Ben Lewis.</h2>
              <div style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.6)", fontWeight: 300, display: "flex", flexDirection: "column", gap: "14px" }}>
                <p>I make cinematic content for security firms, and I make every frame myself.</p>
                <p>No agency, no junior, no faceless content mill. You work directly with the person who concepts, produces and delivers the work, which is exactly why it stays consistent and why it performs.</p>
                <p>A proper introduction film is on the way. For now, the work above speaks for itself.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="mob-cta" style={{ padding: "110px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: GOLD, fontWeight: 500, marginBottom: "18px", opacity: 0.9 }}>
            One firm per market · when your area's taken, it's taken
          </div>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, lineHeight: 1.12, marginBottom: "16px", maxWidth: "700px", margin: "0 auto 16px" }}>
            One 15-minute call.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.55)", fontWeight: 300, maxWidth: "500px", margin: "0 auto 18px", lineHeight: 1.7 }}>
            I'll show you exactly what we built for Watchdog, and what the same would look like for your firm. I work with one firm per market, never your direct competitor. No pressure, no pitch deck.
          </p>
          <p style={{ fontSize: "15px", color: "#F5F0EB", fontWeight: 400, margin: "0 auto 32px" }}>The only thing you're really risking is fifteen minutes.</p>
          <BookBtn big />
        </Reveal>
      </section>
    </>
  );
}
