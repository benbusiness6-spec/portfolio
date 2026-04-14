import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const CALENDLY_URL = "https://calendly.com/ben-business/30min";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ben-lewis-466a3a310/";
export const INSTAGRAM_URL = "https://www.instagram.com/benlewisstudios/";
export const YOUTUBE_URL = "https://www.youtube.com/@benlewis7548";
export const EMAIL = "ben@benlewisltd.com";

export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView(0.05);
  return (<div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`, willChange: "opacity, transform", ...style }}>{children}</div>);
}

export function LazyVideo({ src, aspectRatio = "9/16", borderRadius = "10px", priority = false }) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (priority) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => setShouldLoad(true), { timeout: 300 });
      } else {
        setTimeout(() => setShouldLoad(true), 100);
      }
      return;
    }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShouldLoad(true); obs.unobserve(el); }
    }, { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [priority]);
  return (
    <div ref={ref} style={{ aspectRatio, borderRadius, overflow: "hidden", background: "#111", position: "relative" }}>
      {shouldLoad ? (
        <video src={src} autoPlay muted loop playsInline preload="auto"
          onLoadedData={() => setLoaded(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }} />
      ) : null}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#1a1520,#080808)", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.6s ease", opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
    </div>
  );
}

export function UgcVideo({ src, aspectRatio = "9/16", borderRadius = "10px" }) {
  const ref = useRef(null);
  const vidRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShouldLoad(true); obs.unobserve(el); }
    }, { rootMargin: "600px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const toggleMute = (e) => {
    e.stopPropagation();
    if (vidRef.current) { vidRef.current.muted = !vidRef.current.muted; setMuted(!muted); }
  };
  return (
    <div ref={ref} style={{ aspectRatio, borderRadius, overflow: "hidden", background: "#111", position: "relative", cursor: "pointer" }} onClick={toggleMute}>
      {shouldLoad ? (
        <video ref={vidRef} src={src} autoPlay muted loop playsInline preload="auto"
          onLoadedData={() => setLoaded(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }} />
      ) : null}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#1a1520,#080808)", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.6s ease", opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
      {loaded && (
        <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s", zIndex: 2 }}>
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
        </div>
      )}
    </div>
  );
}

export function MediaSlot({ type, src, aspectRatio = "9/16", borderRadius = "10px", priority = false, ugc = false }) {
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
  if (type === "video" && ugc) return <UgcVideo src={src} aspectRatio={aspectRatio} borderRadius={borderRadius} />;
  if (type === "video") return <LazyVideo src={src} aspectRatio={aspectRatio} borderRadius={borderRadius} priority={priority} />;
  return <img src={src} alt="" loading="lazy" style={{ width: "100%", aspectRatio, objectFit: "cover", borderRadius, display: "block" }} />;
}

export function ArrowBtn({ direction, onClick, visible }) {
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

export function Carousel({ items, cardWidth = 220, mobileCardWidth, gap = 16, renderCard }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [drag, setDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [sl, setSl] = useState(0);
  const [activeWidth, setActiveWidth] = useState(cardWidth);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 768);
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

export function CarouselCard({ item, priority = false, ugc = false }) {
  return (
    <div style={{ userSelect: "none" }}>
      <MediaSlot type={item.type} src={item.src} priority={priority} ugc={ugc} />
      {(item.label || item.sublabel) && (
        <div style={{ marginTop: "12px", padding: "0 4px", textAlign: "center" }}>
          {item.label && <div style={{ fontSize: "12px", color: "#F5F0EB", fontWeight: 400 }}>{item.label}</div>}
          {item.sublabel && <div style={{ fontSize: "11px", color: "rgba(245,240,235,0.35)", fontWeight: 300, lineHeight: 1.5, marginTop: "4px" }}>{item.sublabel}</div>}
        </div>
      )}
    </div>
  );
}

export function GridImage({ item }) {
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

export function StepCard({ number, title, description }) {
  return (
    <div style={{ padding: "32px 28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", flex: 1, minWidth: "260px", textAlign: "center" }}>
      <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginBottom: "16px", fontWeight: 500 }}>Step {number}</div>
      <div style={{ fontSize: "18px", fontWeight: 600, color: "#F5F0EB", marginBottom: "12px", fontFamily: "var(--fh)" }}>{title}</div>
      <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,235,0.4)", fontWeight: 300 }}>{description}</p>
    </div>
  );
}

export function LeadForm({ fields, subjectPrefix = "Lead", buttonText = "Submit", successTitle = "We'll be in touch.", successBody = "Check your inbox — we'll reply shortly." }) {
  const defaults = fields.reduce((a, f) => ({ ...a, [f.name]: "" }), {});
  const [form, setForm] = useState(defaults);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    for (const f of fields) { if (f.required !== false && !form[f.name]) return; }
    setSending(true);
    const payload = fields.reduce((a, f) => ({ ...a, [f.label]: form[f.name] }), {});
    const subjectKey = fields.find(f => f.name === "brand") ? (form.brand || form[fields[0].name]) : form[fields[0].name];
    try {
      await fetch("https://formsubmit.co/ajax/ben@benlewisltd.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...payload, "_subject": `${subjectPrefix} — ${subjectKey}`, "_template": "table" }),
      });
      setSent(true);
    } catch {
      const subject = encodeURIComponent(`${subjectPrefix} — ${subjectKey}`);
      const body = encodeURIComponent(fields.map(f => `${f.label}: ${form[f.name]}`).join("\n"));
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setSent(true);
    }
    setSending(false);
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
        <p style={{ fontFamily: "var(--fh)", fontSize: "20px", fontWeight: 500, color: "#F5F0EB", marginBottom: "8px" }}>{successTitle}</p>
        <p style={{ fontSize: "14px", color: "rgba(245,240,235,0.45)", fontWeight: 300 }}>{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "420px", margin: "0 auto" }}>
      {fields.map(f => (
        <input key={f.name} type={f.type || "text"} placeholder={f.placeholder} value={form[f.name]} onChange={e => update(f.name, e.target.value)} required={f.required !== false}
          style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.25)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
      ))}
      <button type="submit" className="bp" style={{ width: "100%", justifyContent: "center", marginTop: "8px", padding: "18px 36px", opacity: sending ? 0.6 : 1 }}>
        {sending ? "Sending..." : buttonText}
      </button>
    </form>
  );
}

export function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
      body{-webkit-overflow-scrolling:touch;background:#0A0A0A;color:#F5F0EB}
      ::selection{background:rgba(245,240,235,0.2);color:#fff}
      @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      .nl{color:rgba(245,240,235,0.4);text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:color 0.3s;font-weight:400}
      .nl:hover{color:#F5F0EB}
      .nl.active{color:#F5F0EB}
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
      .ugc-row::-webkit-scrollbar{display:none}
      .hero-card{width:440px}
      .ugc-card{width:340px}
      .sl{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:rgba(245,240,235,0.45);margin-bottom:16px;font-weight:500;text-align:center}
      .sh{font-family:var(--fh);font-size:clamp(28px,4vw,44px);font-weight:600;line-height:1.15;margin-bottom:48px;text-align:center}
      .stats-bar{display:flex;gap:48px;justify-content:center;flex-wrap:wrap;padding:48px 24px;border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06)}
      .stat-num{font-family:var(--fh);font-size:clamp(32px,5vw,56px);font-weight:700;color:#F5F0EB;letter-spacing:-1px}
      .stat-lbl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,240,235,0.45);margin-top:8px;font-weight:500}
      @media(max-width:768px){
        .hero-card{width:280px}
        .ugc-card{width:280px}
        .sp{padding:70px 20px!important}
        .mob-sec{padding-top:56px!important;padding-bottom:70px!important}
        .mob-cta{padding-top:80px!important;padding-bottom:80px!important}
        .stats-bar{gap:28px;padding:36px 20px}
      }
    `}</style>
  );
}

export function Nav() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    let ticking = false;
    const fn = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { setScrollY(window.scrollY); ticking = false; }); } };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const goCta = () => {
    setMenuOpen(false);
    if (location.pathname !== "/work") {
      navigate("/work");
      setTimeout(() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const onHome = location.pathname === "/";
  const onWork = location.pathname === "/work";
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "18px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrollY > 60 ? "rgba(10,10,10,0.92)" : "transparent", backdropFilter: scrollY > 60 ? "blur(20px)" : "none", borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.04)" : "none", transition: "all 0.4s ease" }}>
        <Link to="/" style={{ fontFamily: "var(--fh)", fontSize: "14px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#F5F0EB", cursor: "pointer", textDecoration: "none" }}>Ben Lewis Studios</Link>
        <div className="dk" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          <Link to="/" className={`nl${onHome ? " active" : ""}`}>Home</Link>
          <Link to="/work" className={`nl${onWork ? " active" : ""}`}>Work</Link>
          <span className="nl" onClick={goCta} style={{ color: "#F5F0EB" }} role="button">Get Your Free Spec Ad</span>
        </div>
        <button className="mb" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "8px" }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: "22px", height: "1.5px", background: "#F5F0EB", transition: "all 0.3s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(4.5px,4.5px)" : i === 1 ? "scaleX(0)" : "rotate(-45deg) translate(4.5px,-4.5px)") : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />)}
        </button>
      </nav>
      {menuOpen && <div className="mm">
        <Link to="/" className="nl" style={{ fontSize: "16px" }} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/work" className="nl" style={{ fontSize: "16px" }} onClick={() => setMenuOpen(false)}>Work</Link>
        <span className="nl" style={{ fontSize: "16px" }} onClick={goCta}>Get Your Free Spec Ad</span>
      </div>}
    </>
  );
}

export function Footer() {
  return (
    <footer style={{ padding: "28px 32px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--fh)", fontSize: "12px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)" }}>Ben Lewis Studios</div>
      <div style={{ fontSize: "11px", color: "rgba(245,240,235,0.35)", letterSpacing: "1px" }}>London, UK</div>
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Link to="/work" style={{ color: "rgba(245,240,235,0.45)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none" }}>Work</Link>
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
  );
}
