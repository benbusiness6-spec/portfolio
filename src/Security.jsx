import { useEffect, useRef, useState } from "react";
import { Reveal, LazyVideo, CALENDLY_URL } from "./shared.jsx";

const GOLD = "#C5A572";

const HERO = {
  src: "/assets/security/wd03-hero.mp4",
  poster: "/assets/security/wd03-hero-poster.webp",
  views: "100k+ views",
};

const PROOF = [
  { src: "/assets/security/wd-top.mp4", poster: "/assets/security/wd-top-poster.webp", views: "160k views", label: "Cinematic brand film" },
  { src: "/assets/security/wd03-hero.mp4", poster: "/assets/security/wd03-hero-poster.webp", views: "100k views", label: "Cinematic brand film" },
  { src: "/assets/security/wd-50k.mp4", poster: "/assets/security/wd-50k-poster.webp", views: "60k views", label: "Cinematic brand film" },
];

function Stars() {
  return (
    <span style={{ display: "inline-flex", gap: "3px" }} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={GOLD} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      ))}
    </span>
  );
}

function ViewBadge({ children }) {
  return (
    <div className="view-badge">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      {children}
    </div>
  );
}

// Hero video: framed, poster + autoplay muted loop, tap to unmute, view overlay. LCP-priority.
function HeroFilm() {
  const vidRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const toggle = (e) => {
    e.stopPropagation();
    if (vidRef.current) { vidRef.current.muted = !vidRef.current.muted; setMuted(vidRef.current.muted); }
  };
  return (
    <div className="sec-frame sec-hero-frame" onClick={toggle} style={{ cursor: "pointer" }}>
      <div className="sec-frame-inner" style={{ height: "100%" }}>
        <img src={HERO.poster} alt="Watchdog cinematic brand film" width="540" height="960" loading="eager" decoding="async" fetchpriority="high"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 0 : 1, transition: "opacity 0.5s ease" }} />
        <video ref={vidRef} src={HERO.src} poster={HERO.poster} autoPlay muted loop playsInline preload="auto"
          onLoadedData={() => setLoaded(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }} />
        <ViewBadge>{HERO.views}</ViewBadge>
        <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
        </div>
      </div>
    </div>
  );
}

function ProofCard({ item }) {
  return (
    <div style={{ width: "min(240px, 72vw)" }}>
      <div className="sec-frame">
        <div className="sec-frame-inner">
          <LazyVideo src={item.src} poster={item.poster} aspectRatio="9/16" borderRadius="8px" />
          <ViewBadge>{item.views}</ViewBadge>
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: "12px", fontSize: "11px", letterSpacing: "1px", color: "rgba(245,240,235,0.35)", fontWeight: 300 }}>{item.label}</p>
    </div>
  );
}

function BookBtn({ children = "Book a 15-minute call", style = {} }) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bp" style={style}>{children}</a>
  );
}

const SEC_STYLES = `
.sec-hero{min-height:100svh;display:flex;align-items:center;padding:92px 24px 40px}
.sec-hero-inner{max-width:1160px;width:100%;margin:0 auto;display:flex;gap:56px;align-items:center;justify-content:center}
.sec-hero-copy{flex:1 1 480px;max-width:600px}
.sec-hero-media{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:12px}
.sec-frame{box-sizing:border-box;border:1.5px solid rgba(197,165,114,0.5);background:rgba(197,165,114,0.05);border-radius:16px;padding:6px;box-shadow:0 24px 70px rgba(0,0,0,0.5)}
.sec-frame-inner{border-radius:10px;overflow:hidden;position:relative;background:#111;width:100%}
.sec-hero-frame{height:min(68svh,600px);aspect-ratio:9/16}
.view-badge{position:absolute;bottom:12px;left:12px;display:flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;background:rgba(0,0,0,0.62);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12);font-size:12px;font-weight:500;letter-spacing:0.3px;color:#F5F0EB;z-index:3}
.rating-row{display:flex;align-items:center;gap:10px}
.rating-row .rt{font-size:13px;letter-spacing:0.5px;color:rgba(245,240,235,0.7);font-weight:400}
.derisk-box{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin:36px 0 0}
.derisk-item{flex:1 1 300px;max-width:380px;text-align:left;padding:22px 24px;border:1px solid rgba(197,165,114,0.28);border-radius:12px;background:rgba(197,165,114,0.04)}
.whoami{display:flex;gap:48px;align-items:center;flex-wrap:wrap;justify-content:center}
@media(max-width:768px){
  .sec-hero{padding:58px 20px 16px;align-items:center}
  .sec-hero-inner{flex-direction:column;gap:12px}
  .sec-hero-copy{flex:0 0 auto;max-width:100%;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
  .sec-hero h1{font-size:clamp(26px,6.6vw,42px)!important;margin-top:8px!important}
  .sec-hero-sub{font-size:14px!important;line-height:1.5!important;margin-top:10px!important;max-width:420px!important}
  .sec-hero-rating{margin-top:12px!important}
  .sec-hero-cta{margin-top:16px!important}
  .sec-hero-frame{height:min(44svh,520px)}
  .rating-row{justify-content:center}
  .sec-hero-chip{display:none}
  .whoami{text-align:center}
}
`;

export default function Security() {
  useEffect(() => {
    document.title = "Cinematic Brand Worlds for Security Firms · Ben Lewis Studios";
    const meta = document.querySelector('meta[name="description"]');
    const prev = meta?.getAttribute("content");
    if (meta) meta.setAttribute("content", "We build security firms a proprietary brand character and cinematic world, the kind that makes you the first name people think of. 300,000+ organic views built for Watchdog. Book a call.");
    return () => { if (meta && prev != null) meta.setAttribute("content", prev); };
  }, []);

  return (
    <>
      <style>{SEC_STYLES}</style>

      {/* HERO — fold-perfect: offer + proof piece */}
      <section className="sec-hero">
        <div className="sec-hero-inner">
          <div className="sec-hero-copy">
            <div style={{ fontFamily: "var(--fh)", fontSize: "11px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", animation: "fadeIn 0.8s ease 0.1s both" }}>
              Cinematic brand worlds · for security firms
            </div>
            <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(30px,5.6vw,66px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-1px", margin: "20px 0 0", animation: "fadeUp 0.9s ease 0.25s both" }}>
              You don't need more ads.{" "}
              <span style={{ color: "rgba(245,240,235,0.55)", fontWeight: 600 }}>You need to be the first name they think of.</span>
            </h1>
            <p className="sec-hero-sub" style={{ fontSize: "clamp(15px,1.7vw,18px)", lineHeight: 1.6, color: "rgba(245,240,235,0.65)", maxWidth: "520px", margin: "18px 0 0", fontWeight: 300, animation: "fadeUp 0.9s ease 0.4s both" }}>
              We build the proprietary character and cinematic world that makes your firm the name people remember, and trust, before they ever start searching.
            </p>
            <div className="rating-row sec-hero-rating" style={{ marginTop: "20px", animation: "fadeUp 0.9s ease 0.5s both" }}>
              <Stars />
              <span className="rt">100% client satisfaction</span>
            </div>
            <div className="sec-hero-cta" style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", animation: "fadeUp 0.9s ease 0.6s both" }}>
              <BookBtn />
              <span className="sec-hero-chip" style={{ fontSize: "13px", letterSpacing: "0.5px", color: "rgba(245,240,235,0.45)", fontWeight: 300 }}>
                300,000+ organic views · live UK security group
              </span>
            </div>
          </div>
          <div className="sec-hero-media" style={{ animation: "fadeUp 1s ease 0.45s both" }}>
            <HeroFilm />
            <p style={{ textAlign: "center", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: GOLD, fontWeight: 500, opacity: 0.85 }}>
              Latest case study · Watchdog
            </p>
          </div>
        </div>
      </section>

      {/* PROOF — live case study */}
      <section style={{ padding: "70px 24px 90px", background: "linear-gradient(180deg,#0A0A0A,#0d0d0d 50%,#0A0A0A)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div className="sl">The proof · Watchdog</div>
            <h2 className="sh" style={{ marginBottom: "16px" }}>A live engine for a real security group.</h2>
            <p style={{ textAlign: "center", fontSize: "15px", lineHeight: 1.7, color: "rgba(245,240,235,0.5)", fontWeight: 300, maxWidth: "640px", margin: "0 auto 8px" }}>
              Watchdog, a UK security group, came to us looking for one thing: visibility. We built them a cinematic brand world from the ground up. Here's what it did, in the open, on organic reach alone.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="stats-bar" style={{ border: "none", marginTop: "24px", marginBottom: "16px" }}>
              <div style={{ textAlign: "center" }}>
                <div className="stat-num">300k+</div>
                <div className="stat-lbl">Combined organic views</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="stat-num">3</div>
                <div className="stat-lbl">Cinematic ads published</div>
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
                <ProofCard key={i} item={p} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE GUT-CHECK — visceral pain → dream + derisk */}
      <section className="sp" style={{ maxWidth: "860px", textAlign: "center" }}>
        <Reveal>
          <div className="sl">The real cost</div>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(25px,3.6vw,40px)", fontWeight: 600, lineHeight: 1.18, marginBottom: "30px", color: "#F5F0EB" }}>
            Right now, someone who needs exactly what you do is calling a competitor, because his name came to mind and yours didn't.
          </h2>
          <div style={{ fontSize: "16px", lineHeight: 1.85, color: "rgba(245,240,235,0.6)", fontWeight: 300, display: "flex", flexDirection: "column", gap: "18px", maxWidth: "680px", margin: "0 auto" }}>
            <p>It isn't because he's better than you. His response times might be slower, his reviews thinner, his team smaller. He just got <em style={{ fontStyle: "normal", color: "#F5F0EB" }}>remembered first</em>, and in this market, being remembered first is the whole game.</p>
            <p>Every month that gap stays open, it quietly costs you: the contracts you should have won, the rates you should have charged, the ground the big consolidators buy up while you stay invisible.</p>
            <p style={{ color: "rgba(245,240,235,0.85)" }}>Now picture the opposite. You're the name that surfaces first. The firm that looks like the obvious, serious choice before a word is exchanged. You're off the price treadmill, because you're no longer in the same conversation as the cheap option, and the bigger work starts coming to you.</p>
            <p>That's what a cinematic brand world does. You own it, we run all of it, and you barely lift a finger.</p>
          </div>

          <div className="derisk-box">
            <div className="derisk-item">
              <div style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>The build</div>
              <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "rgba(245,240,235,0.75)", fontWeight: 300 }}>You'll be thrilled with your character and your first film, or I keep working until you are. We don't stop until it's right.</p>
            </div>
            <div className="derisk-item">
              <div style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>The retainer</div>
              <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "rgba(245,240,235,0.75)", fontWeight: 300 }}>Month-to-month. No lock-in, no long contracts. I earn it every single month, or you walk.</p>
            </div>
          </div>

          <p style={{ fontSize: "17px", lineHeight: 1.6, color: "#F5F0EB", fontWeight: 400, margin: "34px auto 30px", maxWidth: "560px" }}>
            The only thing you're really risking is fifteen minutes.
          </p>
          <BookBtn style={{ padding: "20px 46px", fontSize: "12px" }} />
        </Reveal>
      </section>

      {/* WHO AM I — trust (VSL placeholder) */}
      <section className="sp" style={{ maxWidth: "960px", paddingTop: "30px" }}>
        <Reveal>
          <div className="whoami">
            <div style={{ flex: "0 0 auto" }}>
              <div className="sec-frame" style={{ width: "min(260px, 70vw)" }}>
                <div className="sec-frame-inner" style={{ aspectRatio: "4/5" }}>
                  <img src="/assets/ben-lewis.webp" alt="Ben Lewis" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%", display: "block" }} />
                </div>
              </div>
            </div>
            <div style={{ flex: "1 1 360px", maxWidth: "500px" }}>
              <div className="sl" style={{ textAlign: "left" }}>Who you'd work with</div>
              <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(24px,3vw,34px)", fontWeight: 600, lineHeight: 1.2, marginBottom: "20px", color: "#F5F0EB" }}>I'm Ben Lewis.</h2>
              <div style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.6)", fontWeight: 300, display: "flex", flexDirection: "column", gap: "14px" }}>
                <p>I build cinematic brand worlds for security firms, and I make the work myself.</p>
                <p>Watchdog was the first. I built their character and world from nothing, and the films have pulled 300,000+ organic views and thousands of shares for a single regional security group.</p>
                <p>You won't be handed to a junior or a faceless content mill. You work directly with the person who concepts, produces and delivers every frame. A proper introduction film is on the way, for now, the work above speaks for itself.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA — 15-min + one-firm-per-market */}
      <section className="mob-cta" style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: GOLD, fontWeight: 500, marginBottom: "18px", opacity: 0.9 }}>
            One firm per market · when your area's taken, it's taken
          </div>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px", maxWidth: "680px", margin: "0 auto 16px" }}>
            One 15-minute call.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.55)", fontWeight: 300, maxWidth: "500px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            I'll show you exactly what we built for Watchdog, and what the same engine would look like for your firm. I work with one firm per market and never your direct competitor. No pressure, no pitch deck.
          </p>
          <BookBtn style={{ padding: "20px 46px", fontSize: "12px" }} />
        </Reveal>
      </section>
    </>
  );
}
