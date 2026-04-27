import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, MediaSlot, LeadForm } from "./shared.jsx";

const STATS = [
  { num: "100+", lbl: "Assets delivered" },
  { num: "72hr", lbl: "Brief to ad" },
  { num: "8-fig", lbl: "DTC brands consulted" },
];

const CAMPAIGNS = [
  { brand: "Beauty Editorial", category: "AI fashion campaign", src: "/assets/posts/homepage-carousel/beauty.mp4", poster: "/assets/posts/homepage-carousel/beauty.webp", type: "video" },
  { brand: "Watchdog", category: "DTC security", src: "/assets/posts/homepage-carousel/watchdog.mp4", poster: "/assets/posts/homepage-carousel/watchdog.webp", type: "video" },
  { brand: "Karviva", category: "Functional beverage", src: "/assets/posts/homepage-carousel/karviva.mp4", poster: "/assets/posts/homepage-carousel/karviva.webp", type: "video" },
  { brand: "Undeniable", category: "Spec piece", src: "/assets/hero-2.mp4", poster: "/assets/posts/homepage-carousel/skincare.webp", type: "video" },
  { brand: "MuscleFier", category: "Sports nutrition", src: "/assets/posts/homepage-carousel/musclefier.mp4", poster: "/assets/posts/homepage-carousel/musclefier.webp", type: "video" },
  { brand: "Panther", category: "Spec piece", src: "/assets/posts/homepage-carousel/panther.mp4", poster: "/assets/posts/homepage-carousel/panther.webp", type: "video" },
];

const FORM_FIELDS = [
  { name: "name", label: "Name", placeholder: "Your name" },
  { name: "email", label: "Email", placeholder: "Email address", type: "email" },
  { name: "brand", label: "Brand URL", placeholder: "Your brand's website URL" },
];

function Popup({ onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={e => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F0EB", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        <h3 style={{ fontFamily: "var(--fh)", fontSize: "24px", fontWeight: 600, lineHeight: 1.2, marginBottom: "10px", textAlign: "center" }}>Before you go, I want to make you something.</h3>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(245,240,235,0.55)", fontWeight: 300, textAlign: "center", marginBottom: "28px" }}>A spec ad for your brand. Under 24 hours. Completely free. If you love it we talk, if not, it's yours to post anyway.</p>
        <LeadForm
          fields={FORM_FIELDS}
          subjectPrefix="Free Spec Ad Request (Popup)"
          buttonText="Get your free spec ad"
          successTitle="Thanks."
          successBody="I'll have your spec ad ready in under 24 hours."
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
    const positionKarviva = () => {
      if (window.innerWidth > 768) return;
      const cards = el.querySelectorAll(".campaign-card");
      centerCard(cards[2]);
    };
    positionKarviva();
    window.addEventListener("resize", positionKarviva);
    return () => window.removeEventListener("resize", positionKarviva);
  }, []);

  useEffect(() => {
    document.title = "Ben Lewis Studios — AI Content Production for DTC Brands";

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
      {/* HERO */}
      <section className="hero-sec">
        <div style={{ maxWidth: "920px", margin: "0 auto", width: "100%", textAlign: "center" }}>
          <div style={{ animation: "fadeIn 0.8s ease 0.2s both", fontFamily: "var(--fh)", fontSize: "11px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginBottom: "32px" }}>Ben Lewis Studios</div>
          <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(34px,6vw,68px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-1px", animation: "fadeUp 0.9s ease 0.35s both" }}>
            See what your brand looks like with a<br />
            <span style={{ color: "rgba(245,240,235,0.5)", fontWeight: 500 }}>7-figure content budget.</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,1.8vw,18px)", lineHeight: 1.7, color: "rgba(245,240,235,0.65)", maxWidth: "640px", margin: "28px auto 0", fontWeight: 300, animation: "fadeUp 0.9s ease 0.5s both" }}>
            I'll produce a spec ad for your brand in under 24 hours. Free. No strings. Yours to keep regardless.
          </p>
          <p style={{ fontSize: "13px", letterSpacing: "1px", color: "rgba(245,240,235,0.4)", marginTop: "20px", fontWeight: 300, animation: "fadeUp 0.9s ease 0.65s both" }}>
            Video Ads | Editorial Photography | UGC Content
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
              buttonText="Get your free spec ad"
              successTitle="Thanks!"
              successBody="I'll have your spec ad ready in under 24 hours."
            />
          </div>
        </Reveal>
      </section>

      {/* SCROLL INDICATOR */}
      <Reveal>
        <div className="scroll-sec" onClick={() => document.getElementById("campaigns")?.scrollIntoView({ behavior: "smooth" })} role="button" aria-label="Scroll to campaigns">
          <span className="cta-hint" style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,235,0.75)", fontWeight: 500 }}>
            See what we did for brands like yours
          </span>
          <div className="scroll-arrow" style={{ display: "inline-block", color: "rgba(245,240,235,0.4)", marginTop: "12px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </Reveal>

      {/* CAMPAIGNS CAROUSEL */}
      <section id="campaigns" style={{ padding: "40px 0 100px" }}>
        <Reveal>
          <div style={{ textAlign: "center", padding: "0 24px" }}>
            <div className="sl">Campaigns we've produced</div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div ref={carouselRef} className="campaigns-row" style={{ display: "flex", gap: "16px", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}>
            {CAMPAIGNS.map((c, i) => (
              <div key={i} className="campaign-card" style={{ flex: "0 0 auto", width: "280px", scrollSnapAlign: "start" }}>
                {c.src ? (
                  <MediaSlot type={c.type} src={c.src} poster={c.poster} aspectRatio="9/16" borderRadius="10px" />
                ) : (
                  <div style={{ aspectRatio: "9/16", background: "linear-gradient(160deg,#1a1a1a,#0d0d0d)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "var(--fh)", fontSize: "16px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,235,0.35)", fontWeight: 600 }}>{c.placeholder ? "Coming soon" : c.brand}</span>
                    {c.placeholder && (<span style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(245,240,235,0.25)", textTransform: "uppercase" }}>Spec piece</span>)}
                  </div>
                )}
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
          {[...STATS, ...STATS, ...STATS].map((s, i) => (
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
              <div style={{ width: "220px", height: "220px", borderRadius: "50%", background: "linear-gradient(160deg,#1a1a1a,#0d0d0d)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <img src="/assets/ben-lewis.webp" alt="Ben Lewis" width="220" height="220" loading="eager" decoding="async" fetchpriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%" }} />
              </div>
            </div>
            <div className="about-text" style={{ flex: "1 1 320px", maxWidth: "560px" }}>
              <div className="sl about-label">About</div>
              <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(24px,3vw,34px)", fontWeight: 600, lineHeight: 1.2, marginBottom: "20px", color: "#F5F0EB" }}>Ben Lewis</h2>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.55)", fontWeight: 300, marginBottom: "16px" }}>
                I produce cinematic content for multi-million pound DTC brands. I co-founded a business that did £200K in year one with zero paid media. I consult for 7 and 8-figure companies on AI infrastructure.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.55)", fontWeight: 300 }}>
                The last brand I worked with was spending months producing a single campaign. I delivered the same quality in under a week. Now I want to do the same for yours.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECOND CTA */}
      <section className="mob-cta" style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px", maxWidth: "680px", margin: "0 auto 16px" }}>
            Your brand deserves better content.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.55)", fontWeight: 300, maxWidth: "420px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Free spec ad. Under 24 hours. No strings.
          </p>
          <button onClick={scrollToForm} className="bp" style={{ border: "none" }}>Get your free spec ad</button>
        </Reveal>
      </section>

      {popupOpen && <Popup onClose={() => setPopupOpen(false)} />}
    </>
  );
}
