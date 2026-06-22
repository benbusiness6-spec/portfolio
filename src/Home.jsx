import { useEffect, useRef, useState } from "react";
import { Reveal, LeadForm } from "./shared.jsx";

const GOLD = "#C5A572";

const STATS = [
  { num: "100+", lbl: "Ads delivered" },
  { num: "72hr", lbl: "Brief to ad" },
  { num: "1/10th", lbl: "The agency cost" },
];

const CAMPAIGNS = [
  { brand: "Watchdog", category: "DTC security", src: "/assets/posts/homepage-carousel/watchdog.mp4", poster: "/assets/posts/homepage-carousel/watchdog.webp", type: "video" },
  { brand: "Craftd", category: "Spec ad", src: "/assets/posts/homepage-carousel/crafted.mp4", poster: "/assets/posts/homepage-carousel/crafted.webp", type: "video" },
  { brand: "OMEGA", category: "Spec ad", src: "/assets/posts/homepage-carousel/omega.mp4", poster: "/assets/posts/homepage-carousel/omega.webp", type: "video" },
  { brand: "Neutonic", category: "Spec ad", src: "/assets/posts/homepage-carousel/neutonic.mp4", poster: "/assets/posts/homepage-carousel/neutonic.webp", type: "video" },
  { brand: "Panther", category: "Spec ad", src: "/assets/posts/homepage-carousel/panther.mp4", poster: "/assets/posts/homepage-carousel/panther.webp", type: "video" },
  { brand: "MuscleFier", category: "Sports nutrition", src: "/assets/posts/homepage-carousel/musclefier.mp4", poster: "/assets/posts/homepage-carousel/musclefier.webp", type: "video" },
];

const FORM_FIELDS = [
  { name: "name", label: "Name", placeholder: "Your name" },
  { name: "email", label: "Email", placeholder: "Email address", type: "email" },
  { name: "brand", label: "Brand URL", placeholder: "Your brand's website URL" },
];

const MUTED_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>;
const SOUND_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;

const HOME_STYLES = `
.gold-frame{box-sizing:border-box;border:1.5px solid rgba(197,165,114,0.5);background:rgba(197,165,114,0.05);border-radius:16px;padding:6px;box-shadow:0 28px 80px rgba(0,0,0,0.55)}
.gold-frame-inner{border-radius:10px;overflow:hidden;position:relative;background:#111;width:100%}
`;

// Gold-framed video: poster + autoplay-muted loop + tap-to-unmute. No view badge (spec ads).
function GoldVideo({ src, poster }) {
  const wrapRef = useRef(null);
  const vidRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShouldLoad(true); obs.unobserve(el); } }, { rootMargin: "400px" });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const toggle = (e) => { e.stopPropagation(); if (vidRef.current) { vidRef.current.muted = !vidRef.current.muted; setMuted(vidRef.current.muted); } };
  return (
    <div ref={wrapRef} className="gold-frame" onClick={toggle} style={{ cursor: "pointer" }}>
      <div className="gold-frame-inner" style={{ aspectRatio: "9/16" }}>
        {poster && <img src={poster} alt="" loading="lazy" decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 0 : 1, transition: "opacity 0.5s ease" }} />}
        {shouldLoad && <video ref={vidRef} src={src} poster={poster} autoPlay muted loop playsInline preload="metadata"
          onLoadedData={() => setLoaded(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }} />}
        <button aria-label="Toggle sound" onClick={toggle} style={{ position: "absolute", bottom: "12px", right: "12px", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3, cursor: "pointer" }}>
          {muted ? MUTED_ICON : SOUND_ICON}
        </button>
      </div>
    </div>
  );
}

function Popup({ onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={e => e.stopPropagation()} style={{ borderColor: "rgba(197,165,114,0.3)" }}>
        <button aria-label="Close" onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F0EB", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        <div style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, fontWeight: 500, marginBottom: "16px", textAlign: "center" }}>Before you go</div>
        <h3 style={{ fontFamily: "var(--fh)", fontSize: "24px", fontWeight: 600, lineHeight: 1.2, marginBottom: "10px", textAlign: "center" }}>Let me make you an ad, on the house.</h3>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(245,240,235,0.55)", fontWeight: 300, textAlign: "center", marginBottom: "28px" }}>A scroll-stopping video ad for your brand. Under 24 hours. Completely free. If you love it we talk, if not, it's yours to run anyway.</p>
        <LeadForm
          fields={FORM_FIELDS}
          subjectPrefix="Free Spec Ad Request (Popup)"
          buttonText="Get your free ad"
          successTitle="Thanks."
          successBody="I'll have your ad ready in under 24 hours."
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [popupOpen, setPopupOpen] = useState(false);
  const popupOpenRef = useRef(false);
  const carouselRef = useRef(null);
  useEffect(() => { popupOpenRef.current = popupOpen; }, [popupOpen]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const centerCard = (card) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const containerRect = el.getBoundingClientRect();
      const cardCenter = cardRect.left - containerRect.left + el.scrollLeft + cardRect.width / 2;
      el.scrollLeft = cardCenter - el.clientWidth / 2;
    };
    const positionCarousel = () => {
      if (window.innerWidth > 768) return;
      const cards = el.querySelectorAll(".campaign-card");
      centerCard(cards[0]);
    };
    positionCarousel();
    window.addEventListener("resize", positionCarousel);
    return () => window.removeEventListener("resize", positionCarousel);
  }, []);

  useEffect(() => {
    document.title = "Ben Lewis Studios — Video Ad Creative for DTC Brands";

    const getCount = () => parseInt(sessionStorage.getItem("bls_popup_count") || "0", 10);
    const isSubmitted = () => sessionStorage.getItem("bls_lead_submitted") === "1";
    const fire = () => {
      if (isSubmitted() || getCount() >= 2 || popupOpenRef.current) return;
      sessionStorage.setItem("bls_popup_count", String(getCount() + 1));
      setPopupOpen(true);
    };

    const timer = setTimeout(() => { if (getCount() === 0) fire(); }, 15000);

    const onMouseOut = (e) => {
      if (e.clientY > 0 || e.relatedTarget) return;
      if (getCount() < 1) return;
      fire();
    };
    document.addEventListener("mouseout", onMouseOut);

    return () => { clearTimeout(timer); document.removeEventListener("mouseout", onMouseOut); };
  }, []);

  const scrollToForm = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOME_STYLES }} />

      {/* HERO */}
      <section className="hero-sec">
        <div style={{ maxWidth: "920px", margin: "0 auto", width: "100%", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--fh)", fontSize: "11px", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "32px" }}>Ad creative for DTC brands</div>
          <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(34px,6vw,68px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-1px" }}>
            Video ads that sell. <span style={{ color: GOLD, fontWeight: 600 }}>1/10th the cost. 10x the speed. 100% of the quality.</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,1.8vw,18px)", lineHeight: 1.7, color: "#F5F0EB", maxWidth: "640px", margin: "28px auto 0", fontWeight: 600 }}>
            Scroll-stopping ad creative, made for a fraction of what an agency charges and ready to test this week. <span className="mob-line">I'll make you one for free.</span>
          </p>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="form" className="form-sec">
        <Reveal>
          <div style={{ maxWidth: "460px", margin: "0 auto", textAlign: "center" }}>
            <LeadForm
              fields={FORM_FIELDS}
              subjectPrefix="Free Spec Ad Request"
              buttonText="Get your free ad"
              successTitle="Thanks!"
              successBody="I'll have your ad ready in under 24 hours."
            />
          </div>
        </Reveal>
      </section>

      {/* SCROLL INDICATOR */}
      <Reveal>
        <div className="scroll-sec" onClick={() => document.getElementById("campaigns")?.scrollIntoView({ behavior: "smooth" })} role="button" aria-label="Scroll to campaigns">
          <span className="cta-hint" style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,235,0.75)", fontWeight: 500 }}>
            See what we've made for brands like yours
          </span>
          <div className="scroll-arrow" style={{ display: "inline-block", color: GOLD, marginTop: "12px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </Reveal>

      {/* CAMPAIGNS CAROUSEL */}
      <section id="campaigns" style={{ padding: "40px 0 100px" }}>
        <Reveal>
          <div style={{ textAlign: "center", padding: "0 24px" }}>
            <div className="sl">Recent work</div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div ref={carouselRef} className="campaigns-row" style={{ display: "flex", gap: "16px", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}>
            {CAMPAIGNS.map((c, i) => (
              <div key={i} className="campaign-card" style={{ flex: "0 0 auto", width: "280px", scrollSnapAlign: "start" }}>
                <GoldVideo src={c.src} poster={c.poster} />
                <div style={{ marginTop: "14px", padding: "0 4px" }}>
                  <div style={{ fontFamily: "var(--fh)", fontSize: "15px", fontWeight: 600, color: "#F5F0EB" }}>{c.brand}</div>
                  <div style={{ fontSize: "12px", letterSpacing: "1px", color: "rgba(245,240,235,0.4)", marginTop: "4px", fontWeight: 300 }}>{c.category}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SCROLLING STATS */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {Array.from({ length: 8 }).flatMap(() => STATS).map((s, i) => (
            <div key={i} className="marquee-item">
              <div className="stat-num">{s.num}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="sp">
        <Reveal>
          <div style={{ display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "0 0 auto" }}>
              <div className="gold-frame" style={{ width: "min(240px,70vw)" }}>
                <div className="gold-frame-inner" style={{ aspectRatio: "4/5" }}>
                  <img src="/assets/ben-lewis.webp" alt="Ben Lewis" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%", display: "block" }} />
                </div>
              </div>
            </div>
            <div className="about-text" style={{ flex: "1 1 320px", maxWidth: "560px" }}>
              <div className="sl about-label">About</div>
              <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(24px,3vw,34px)", fontWeight: 600, lineHeight: 1.2, marginBottom: "20px", color: "#F5F0EB" }}>I'm Ben Lewis.</h2>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.55)", fontWeight: 300, marginBottom: "16px" }}>
                I make video ads for DTC brands, and I make every frame myself. No agency markup, no month-long timelines, no creative-by-committee.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.55)", fontWeight: 300 }}>
                Brands used to spend weeks and five figures on a single ad. I deliver the same quality in days, for a fraction of the cost, so you can test more creative and find your winners faster.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECOND CTA */}
      <section className="mob-cta" style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: GOLD, fontWeight: 500, marginBottom: "18px", opacity: 0.9 }}>
            Free spec ad · made for your brand · yours to keep
          </div>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px", maxWidth: "680px", margin: "0 auto 16px" }}>
            Your next winning ad is one brief away.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.55)", fontWeight: 300, maxWidth: "420px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Free spec ad. Under 24 hours. No strings.
          </p>
          <button onClick={scrollToForm} className="bp" style={{ border: "none" }}>Get your free ad</button>
        </Reveal>
      </section>

      {popupOpen && <Popup onClose={() => setPopupOpen(false)} />}
    </>
  );
}
