import { useState, useEffect, useRef, useCallback } from "react";

const CALENDLY_URL = "#";
const LINKEDIN_URL = "https://www.linkedin.com/in/ben-lewis-466a3a310/";
const INSTAGRAM_URL = "https://www.instagram.com/benlewisstudios/";
const YOUTUBE_URL = "https://www.youtube.com/@benlewis7548";
const EMAIL = "ben@benlewisltd.com";

/* ── HERO: 3 cinematic reels only ── */
const HERO_ITEMS = [
  { id: 1, label: "Cinematic Reel", type: "video", src: "/assets/hero-2.mp4" },
  { id: 2, label: "Brand Film", type: "video", src: "/assets/hero-3.mp4" },
  { id: 3, label: "Campaign Film", type: "video", src: "/assets/hero-4.mp4" },
];

/* ── EDITORIAL: 6 luxury images (hero images added as 1st and last) ── */
const EDIT_ITEMS = [
  { id: 1, label: "Editorial Beauty", sublabel: "Cinematic portrait with dramatic lighting", type: "image", src: "/assets/hero-1.jpg" },
  { id: 2, label: "Luxury Skincare", sublabel: "Premium product photography with cinematic lighting", type: "image", src: "/assets/edit-1.jpg" },
  { id: 3, label: "Beauty Editorial", sublabel: "High-end editorial series for skincare campaigns", type: "image", src: "/assets/edit-2.jpg" },
  { id: 4, label: "Product Campaign", sublabel: "Hero shots for e-commerce and brand retail", type: "image", src: "/assets/edit-3.jpg" },
  { id: 5, label: "Fashion Editorial", sublabel: "Editorial beauty with dramatic composition", type: "image", src: "/assets/edit-4.jpg" },
  { id: 6, label: "Beauty Portrait", sublabel: "Premium editorial with natural beauty aesthetic", type: "image", src: "/assets/hero-5.jpg" },
];

/* ── UGC: 5 videos (ugc-2 is best, centred at position 3) ── */
const UGC_ITEMS = [
  { id: 1, label: "Morning Routine", sublabel: "GRWM routine with product integration", type: "video", src: "/assets/ugc-3.mp4" },
  { id: 2, label: "Get Ready With Me", sublabel: "Direct-to-camera testimonial with product B-roll", type: "video", src: "/assets/ugc-1.mp4" },
  { id: 3, label: "Product Review", sublabel: "Authentic product showcase with natural lighting", type: "video", src: "/assets/ugc-2.mp4" },
  { id: 4, label: "First Impressions", sublabel: "Unboxing with texture shots and before-after", type: "video", src: "/assets/ugc-4.mp4" },
  { id: 5, label: "Brand Spotlight", sublabel: "Full product showcase with lifestyle integration", type: "video", src: "/assets/ugc-5.mp4" },
];

/* ── GRID: 9 images (unchanged) ── */
const GRID_ITEMS = [
  { type: "image", src: "/assets/15.png" },
  { type: "image", src: "/assets/16.png" },
  { type: "image", src: "/assets/17.png" },
  { type: "image", src: "/assets/18.jpg" },
  { type: "image", src: "/assets/19.jpg" },
  { type: "image", src: "/assets/20.jpg" },
  { type: "image", src: "/assets/21.png" },
  { type: "image", src: "/assets/22.png" },
  { type: "image", src: "/assets/23.png" },
];

/* ═══════════ COMPONENTS ═══════════ */

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView(0.05);
  return (<div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`, willChange: "opacity, transform", ...style }}>{children}</div>);
}

function LazyVideo({ src, aspectRatio = "9/16", borderRadius = "10px", priority = false }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(priority);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (priority) return;
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.unobserve(el); }
    }, { rootMargin: "400px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [priority]);
  return (
    <div ref={ref} style={{ aspectRatio, borderRadius, overflow: "hidden", background: "#111", position: "relative" }}>
      {inView ? (
        <video src={src} autoPlay muted loop playsInline
          onLoadedData={() => setLoaded(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded || priority ? 1 : 0, transition: "opacity 0.5s ease" }} />
      ) : null}
      {(!inView || (!loaded && !priority)) && (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#1a1a2e,#080808)", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.5s ease", opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      )}
    </div>
  );
}

function MediaSlot({ type, src, aspectRatio = "9/16", borderRadius = "10px", priority = false }) {
  if (!src) {
    return (
      <div style={{ aspectRatio, borderRadius, background: "linear-gradient(160deg,#1a1a2e,#080808)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
        </div>
      </div>
    );
  }
  if (type === "video") return <LazyVideo src={src} aspectRatio={aspectRatio} borderRadius={borderRadius} priority={priority} />;
  return <img src={src} alt="" loading="lazy" style={{ width: "100%", aspectRatio, objectFit: "cover", borderRadius, display: "block" }} />;
}

function ArrowBtn({ direction, onClick, visible }) {
  return (
    <button onClick={onClick} aria-label={direction === "left" ? "Previous" : "Next"} style={{
      position: "absolute", top: "50%", transform: "translateY(-60%)",
      [direction === "left" ? "left" : "right"]: "8px",
      width: "44px", height: "44px", borderRadius: "50%",
      background: "rgba(10,10,10,0.7)", backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", zIndex: 10, opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none",
      transition: "opacity 0.3s, background 0.3s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(30,30,30,0.9)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(10,10,10,0.7)"}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5F0EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left" ? <polyline points="15 18 9 12 15 6"/> : <polyline points="9 6 15 12 9 18"/>}
      </svg>
    </button>
  );
}

function Carousel({ items, cardWidth = 220, mobileCardWidth, gap = 16, renderCard }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [drag, setDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [sl, setSl] = useState(0);
  const [activeWidth, setActiveWidth] = useState(cardWidth);
  const [isMobile, setIsMobile] = useState(false);

  const getWidth = useCallback(() => {
    return (mobileCardWidth && window.innerWidth <= 768) ? mobileCardWidth : cardWidth;
  }, [cardWidth, mobileCardWidth]);

  const checkScroll = useCallback(() => {
    const el = trackRef.current; if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const centreOnMiddle = useCallback((w) => {
    const el = trackRef.current; if (!el) return;
    const pad = 40;
    const middleIndex = Math.floor(items.length / 2);
    const middleOffset = pad + middleIndex * (w + gap);
    const centreScroll = middleOffset - (el.clientWidth / 2) + (w / 2);
    el.scrollLeft = Math.max(0, centreScroll);
  }, [items.length, gap]);

  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    const w = getWidth();
    setActiveWidth(w);
    centreOnMiddle(w);
    checkScroll();
    const onScroll = () => checkScroll();
    const onResize = () => {
      setIsMobile(window.innerWidth <= 768);
      const nw = getWidth();
      setActiveWidth(nw);
      centreOnMiddle(nw);
      checkScroll();
    };
    const el = trackRef.current;
    if (el) el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { if (el) el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, [items.length, cardWidth, mobileCardWidth, gap, checkScroll, getWidth, centreOnMiddle]);

  const scroll = (dir) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir === "left" ? -(activeWidth + gap) : (activeWidth + gap), behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <ArrowBtn direction="left" onClick={() => scroll("left")} visible={canLeft} />
      <ArrowBtn direction="right" onClick={() => scroll("right")} visible={canRight} />
      <div ref={trackRef} className="ctrack"
        onMouseDown={e => { setDrag(true); setStartX(e.pageX - trackRef.current.offsetLeft); setSl(trackRef.current.scrollLeft); }}
        onMouseMove={e => { if (!drag) return; e.preventDefault(); trackRef.current.scrollLeft = sl - (e.pageX - trackRef.current.offsetLeft - startX) * 1.5; }}
        onMouseUp={() => setDrag(false)} onMouseLeave={() => setDrag(false)}
        onTouchStart={e => { setStartX(e.touches[0].pageX); setSl(trackRef.current.scrollLeft); }}
        onTouchMove={e => { trackRef.current.scrollLeft = sl - (e.touches[0].pageX - startX); }}
        style={{ display: "flex", gap: `${gap}px`, overflowX: "auto", cursor: drag ? "grabbing" : "grab", padding: "0 40px 20px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", scrollSnapType: isMobile ? "none" : "x mandatory" }}>
        {items.map((item, i) => (
          <div key={item.id || i} style={{ scrollSnapAlign: isMobile ? "none" : "center", flex: `0 0 ${activeWidth}px` }}>
            {renderCard(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}

function CarouselCard({ item, priority = false }) {
  return (
    <div style={{ userSelect: "none" }}>
      <MediaSlot type={item.type} src={item.src} priority={priority} />
      {(item.label || item.sublabel) && (
        <div style={{ marginTop: "12px", padding: "0 4px", textAlign: "center" }}>
          {item.label && <div style={{ fontSize: "12px", color: "#F5F0EB", fontWeight: 400 }}>{item.label}</div>}
          {item.sublabel && <div style={{ fontSize: "11px", color: "rgba(245,240,235,0.35)", fontWeight: 300, lineHeight: 1.5, marginTop: "4px" }}>{item.sublabel}</div>}
        </div>
      )}
    </div>
  );
}

function GridImage({ item }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s",
      transform: h ? "scale(1.03)" : "scale(1)", boxShadow: h ? "0 16px 48px rgba(0,0,0,0.4)" : "none",
      cursor: "pointer", overflow: "hidden", borderRadius: "8px",
    }}>
      <MediaSlot type={item.type} src={item.src} aspectRatio="4/5" borderRadius="0px" />
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div style={{ padding: "32px 28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", flex: 1, minWidth: "260px", textAlign: "center" }}>
      <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginBottom: "16px", fontWeight: 500 }}>Step {number}</div>
      <div style={{ fontSize: "18px", fontWeight: 600, color: "#F5F0EB", marginBottom: "12px", fontFamily: "var(--fh)" }}>{title}</div>
      <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,235,0.4)", fontWeight: 300 }}>{description}</p>
    </div>
  );
}

/* ── Lead Capture Form ── */
function LeadForm() {
  const [form, setForm] = useState({ brand: "", url: "", email: "" });
  const [sent, setSent] = useState(false);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Free UGC Video Request — ${form.brand}`);
    const body = encodeURIComponent(`Brand: ${form.brand}\nProduct URL: ${form.url}\nEmail: ${form.email}`);
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  const inputStyle = {
    width: "100%", padding: "16px 20px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#F5F0EB",
    fontFamily: "var(--fb)", fontSize: "14px", fontWeight: 300, outline: "none",
    transition: "border-color 0.3s",
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ fontSize: "28px", marginBottom: "16px" }}>✓</div>
        <p style={{ fontFamily: "var(--fh)", fontSize: "20px", fontWeight: 500, color: "#F5F0EB", marginBottom: "8px" }}>We'll be in touch.</p>
        <p style={{ fontSize: "14px", color: "rgba(245,240,235,0.45)", fontWeight: 300 }}>Check your inbox — we'll send your free video within 48 hours.</p>
      </div>
    );
  }

  return (
    <div onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "420px", margin: "0 auto" }}>
      <input type="text" placeholder="Brand name" value={form.brand} onChange={e => update("brand", e.target.value)} required
        style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.25)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
      <input type="url" placeholder="Product URL" value={form.url} onChange={e => update("url", e.target.value)} required
        style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.25)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
      <input type="email" placeholder="Email address" value={form.email} onChange={e => update("email", e.target.value)} required
        style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.25)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
      <button type="submit" onClick={handleSubmit} className="bp" style={{ width: "100%", justifyContent: "center", marginTop: "8px", padding: "18px 36px" }}>
        Get Your Free Video
      </button>
    </div>
  );
}

/* ═══════════ MAIN APP ═══════════ */

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { setScrollY(window.scrollY); ticking = false; }); }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ "--fh": "'Syne','Helvetica Neue',sans-serif", "--fb": "'Inter',-apple-system,sans-serif", minHeight: "100vh", background: "#0A0A0A", color: "#F5F0EB", fontFamily: "var(--fb)", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
        body{-webkit-overflow-scrolling:touch}
        ::selection{background:rgba(245,240,235,0.2);color:#fff}
        @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .nl{color:rgba(245,240,235,0.4);text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:color 0.3s;font-weight:400}
        .nl:hover{color:#F5F0EB}
        .bp{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;background:#F5F0EB;border:none;color:#0A0A0A;font-family:var(--fb);font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;cursor:pointer;font-weight:500;transition:all 0.35s cubic-bezier(0.16,1,0.3,1);border-radius:2px}
        .bp:hover{background:#fff;transform:translateY(-2px);box-shadow:0 8px 32px rgba(245,240,235,0.15)}
        .bg{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;background:#F5F0EB;border:1px solid #F5F0EB;color:#0A0A0A;font-family:var(--fb);font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;cursor:pointer;font-weight:500;transition:all 0.35s;border-radius:2px}
        .bg:hover{background:#fff;border-color:#fff;transform:translateY(-2px);box-shadow:0 8px 32px rgba(245,240,235,0.15)}
        .sp{padding:100px 24px;max-width:1100px;margin:0 auto}
        .mm{position:fixed;inset:0;background:rgba(10,10,10,0.98);backdrop-filter:blur(24px);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;animation:fadeIn 0.3s ease}
        @media(max-width:768px){.dk{display:none!important}.mb{display:flex!important}}
        @media(min-width:769px){.mb{display:none!important}}
        .eg{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        @media(max-width:640px){.eg{grid-template-columns:repeat(2,1fr)}}
        .sr{display:flex;gap:20px;flex-wrap:wrap}
        @media(max-width:768px){.sr{flex-direction:column}}
        .ctrack::-webkit-scrollbar{display:none}
        .hero-row::-webkit-scrollbar{display:none}
        .hero-card{width:440px}
        .sl{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:rgba(245,240,235,0.45);margin-bottom:16px;font-weight:500;text-align:center}
        .sh{font-family:var(--fh);font-size:clamp(28px,4vw,44px);font-weight:600;line-height:1.15;margin-bottom:48px;text-align:center}
        @media(max-width:768px){
          .hero-card{width:280px}
          .sp{padding:70px 20px!important}
          .mob-sec{padding-top:56px!important;padding-bottom:70px!important}
          .mob-cta{padding-top:80px!important;padding-bottom:80px!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "18px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrollY > 60 ? "rgba(10,10,10,0.92)" : "transparent", backdropFilter: scrollY > 60 ? "blur(20px)" : "none", borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.04)" : "none", transition: "all 0.4s ease" }}>
        <div onClick={() => go("hero")} style={{ fontFamily: "var(--fh)", fontSize: "14px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#F5F0EB", cursor: "pointer" }}>Ben Lewis Studios</div>
        <div className="dk" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          <span className="nl" onClick={() => go("work")}>Work</span>
          <span className="nl" onClick={() => go("ugc")}>UGC</span>
          <span className="nl" onClick={() => go("about")}>About</span>
          <a href={CALENDLY_URL} className="bp" style={{ padding: "10px 24px", fontSize: "10px" }}>Book a Call</a>
        </div>
        <button className="mb" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "8px" }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: "22px", height: "1.5px", background: "#F5F0EB", transition: "all 0.3s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(4.5px,4.5px)" : i === 1 ? "scaleX(0)" : "rotate(-45deg) translate(4.5px,-4.5px)") : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />)}
        </button>
      </nav>
      {menuOpen && <div className="mm">
        <span className="nl" style={{ fontSize: "16px" }} onClick={() => go("work")}>Work</span>
        <span className="nl" style={{ fontSize: "16px" }} onClick={() => go("ugc")}>UGC</span>
        <span className="nl" style={{ fontSize: "16px" }} onClick={() => go("about")}>About</span>
        <a href={CALENDLY_URL} className="bp" style={{ marginTop: "12px" }}>Book a Call</a>
      </div>}

      {/* HERO — 3 cinematic reels, larger cards */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 0 60px", position: "relative" }}>
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,240,235,0.02) 0%,transparent 70%)", top: "30%", left: "50%", transform: `translate(-50%,-50%) translateY(${scrollY * -0.06}px)`, pointerEvents: "none" }} />
        <div style={{ padding: "0 32px", maxWidth: "1100px", margin: "0 auto", width: "100%", textAlign: "center" }}>
          <div style={{ animation: "fadeIn 0.8s ease 0.2s both" }}>
            <div style={{ fontFamily: "var(--fh)", fontSize: "11px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginBottom: "32px" }}>Ben Lewis Studios</div>
          </div>
          <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(36px,7vw,76px)", fontWeight: 700, lineHeight: 1.05, maxWidth: "800px", margin: "0 auto", animation: "fadeUp 0.9s ease 0.35s both", letterSpacing: "-1px" }}>
            Your brand deserves better content.<br />
            <span style={{ color: "rgba(245,240,235,0.45)", fontWeight: 400 }}>We make it effortless.</span>
          </h1>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,235,0.45)", maxWidth: "540px", margin: "28px auto 0", fontWeight: 300, animation: "fadeUp 0.9s ease 0.55s both" }}>
            Editorial photography. UGC videos. Product shots. Cinematic reels. One partner. Unlimited output.
          </p>
        </div>
        <div style={{ marginTop: "52px", animation: "fadeUp 0.9s ease 0.7s both" }}>
          <div className="hero-row" style={{ display: "flex", gap: "16px", justifyContent: "center", padding: "0 24px 20px", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {HERO_ITEMS.map((item) => (
              <div key={item.id} className="hero-card" style={{ flex: "0 0 auto" }}>
                <CarouselCard item={item} priority={true} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 32px", marginTop: "40px", animation: "fadeUp 0.9s ease 0.85s both", textAlign: "center" }}>
          <a href={CALENDLY_URL} className="bp">Book a Discovery Call</a>
        </div>
        <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", animation: "fadeIn 1s ease 1.2s both" }}>
          <span style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(245,240,235,0.25)" }}>Scroll</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom,rgba(245,240,235,0.3),transparent)" }} />
        </div>
      </section>

      {/* EDITORIAL — 6 luxury images */}
      <section id="work" className="mob-sec" style={{ padding: "80px 0 100px" }}>
        <div style={{ padding: "0 32px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <Reveal><div className="sl">The Work</div><h2 className="sh">Luxury <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>editorial</span></h2></Reveal>
        </div>
        <Reveal><Carousel items={EDIT_ITEMS} cardWidth={340} mobileCardWidth={280} renderCard={(item) => <CarouselCard item={item} />} /></Reveal>
        <Reveal><div style={{ textAlign: "center", marginTop: "40px" }}><a href={CALENDLY_URL} className="bg">Like what you see? Let's talk</a></div></Reveal>
      </section>

      {/* UGC — 5 videos */}
      <section id="ugc" className="mob-sec" style={{ padding: "80px 0 100px" }}>
        <div style={{ padding: "0 32px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <Reveal><div className="sl">UGC</div><h2 className="sh">Scroll-stopping <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>UGC</span></h2></Reveal>
        </div>
        <Reveal><Carousel items={UGC_ITEMS} cardWidth={340} mobileCardWidth={280} renderCard={(item) => <CarouselCard item={item} />} /></Reveal>
        <Reveal><div style={{ textAlign: "center", marginTop: "40px" }}><a href={CALENDLY_URL} className="bg">Get this for your brand</a></div></Reveal>
      </section>

      {/* LEAD CAPTURE — right after UGC */}
      <section className="mob-cta" style={{ padding: "100px 24px", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, lineHeight: 1.15, marginBottom: "16px" }}>
              See what this looks like<span style={{ display: "block", fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>for your brand.</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(245,240,235,0.45)", fontWeight: 300, maxWidth: "420px", margin: "0 auto 40px" }}>
              We'll produce a custom UGC video featuring your product — yours to keep and use, no strings attached.
            </p>
            <LeadForm />
          </div>
        </Reveal>
      </section>

      {/* GRID */}
      <section className="sp" style={{ textAlign: "center" }}>
        <Reveal><div className="sl">Editorial & Product</div><h2 className="sh">The full <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>content ecosystem</span></h2></Reveal>
        <div className="eg">{GRID_ITEMS.map((item, i) => <Reveal key={i} delay={i * 0.05}><GridImage item={item} /></Reveal>)}</div>
        <Reveal><div style={{ marginTop: "48px" }}><a href={CALENDLY_URL} className="bp">Book a Discovery Call</a></div></Reveal>
      </section>

      {/* WHAT THIS REPLACES */}
      <section className="mob-cta" style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0e0e0e 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div className="sl" style={{ marginBottom: "32px" }}>What This Replaces</div>
            <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(26px,4.5vw,48px)", fontWeight: 700, lineHeight: 1.12, marginBottom: "32px" }}>Your current content production costs<span style={{ display: "block", color: "#F5F0EB", marginTop: "8px" }}>£19,000–£45,000 per month.</span></h2>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.45)", maxWidth: "480px", margin: "0 auto 12px", fontWeight: 300 }}>Photographers. Videographers. UGC creators. Content agencies. Studio hire. Model fees.</p>
            <p style={{ fontFamily: "var(--fh)", fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 600, color: "#F5F0EB", marginTop: "40px", lineHeight: 1.2 }}>We replace all of it.</p>
            <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.45)", fontWeight: 300, marginTop: "16px" }}>One partner. Campaign-grade output. A fraction of the cost.</p>
            <div style={{ marginTop: "44px" }}><a href={CALENDLY_URL} className="bp">See How It Works</a></div>
          </div>
        </Reveal>
      </section>

      {/* HOW IT WORKS */}
      <section className="sp" style={{ textAlign: "center" }}>
        <Reveal><div className="sl">Process</div><h2 className="sh">How it <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>works</span></h2></Reveal>
        <Reveal delay={0.1}>
          <div className="sr">
            <StepCard number="01" title="Brand Immersion" description="We learn your brand, your audience, your aesthetic. We study your products, your competitors, and your content gaps." />
            <StepCard number="02" title="Content Production" description="We produce a complete monthly content library — editorial stills, UGC videos, product shots, and cinematic reels — all tailored to your brand." />
            <StepCard number="03" title="Deliver & Scale" description="You receive ready-to-post content every month. We optimise based on performance and scale what works." />
          </div>
        </Reveal>
        <Reveal><div style={{ marginTop: "48px" }}><a href={CALENDLY_URL} className="bg">Book a Discovery Call</a></div></Reveal>
      </section>

      {/* ABOUT */}
      <section id="about" className="sp" style={{ textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ width: "200px", height: "250px", borderRadius: "10px", margin: "0 auto 36px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
              <img src="/assets/about.png" alt="Ben Lewis" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div className="sl">About</div>
            <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 600, lineHeight: 1.2, marginBottom: "20px" }}>Ben Lewis</h2>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.45)", fontWeight: 300, maxWidth: "480px", margin: "0 auto" }}>I build AI-powered content production systems that give DTC beauty brands campaign-grade content without the traditional production overhead. My work spans editorial fashion, skincare campaigns, and cinematic brand films.</p>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.45)", fontWeight: 300, maxWidth: "480px", margin: "16px auto 0" }}>One partner replaces an entire production team — photographers, videographers, UGC creators, stylists, and studio sessions. You get the output. I handle the rest.</p>
            <div style={{ marginTop: "36px" }}><a href={CALENDLY_URL} className="bp">Book a Discovery Call</a></div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="mob-cta" style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 100%)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, lineHeight: 1.1, maxWidth: "700px", margin: "0 auto 28px" }}>Ready to replace your entire content production<span style={{ display: "block", fontWeight: 400, color: "rgba(245,240,235,0.45)", marginTop: "4px" }}>with one partner?</span></h2>
          <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.45)", fontWeight: 300, maxWidth: "420px", margin: "0 auto 44px", lineHeight: 1.7 }}>15-minute discovery call. No pitch deck. Just a conversation about your content and how to fix it.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={CALENDLY_URL} className="bp">Book a Discovery Call</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="bg">Connect on LinkedIn</a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "28px 32px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--fh)", fontSize: "12px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)" }}>Ben Lewis Studios</div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,235,0.25)", transition: "color 0.3s", display: "flex" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,235,0.25)", transition: "color 0.3s", display: "flex" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,235,0.25)", transition: "color 0.3s", display: "flex" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href={`mailto:${EMAIL}`} style={{ color: "rgba(245,240,235,0.25)", fontSize: "11px", letterSpacing: "1px", textDecoration: "none", transition: "color 0.3s" }}>{EMAIL}</a>
        </div>
        <div style={{ fontSize: "11px", color: "rgba(245,240,235,0.25)", letterSpacing: "0.5px" }}>© 2026 Ben Lewis Studios</div>
      </footer>
    </div>
  );
}
