import { useState, useEffect, useRef, useCallback } from "react";

const CALENDLY_URL = "#";
const LINKEDIN_URL = "#";
const EMAIL = "ben@benlewisltd.com";

const HERO_ITEMS = [
  { id: 1, label: "Cinematic Reel", color: "#1a1225", type: "video", src: null },
  { id: 2, label: "Editorial Beauty", color: "#1f1a2d", type: "image", src: null },
  { id: 3, label: "Product Hero", color: "#251a1f", type: "image", src: null },
  { id: 4, label: "UGC Content", color: "#1a251f", type: "video", src: null },
  { id: 5, label: "Brand Film", color: "#25201a", type: "video", src: null },
];
const WORK_ITEMS = [
  { id: 1, label: "Creative Concept — Fashion Editorial", sublabel: "Cinematic brand film with product integration", color: "#1e1428", type: "video", src: null },
  { id: 2, label: "Cinematic Brand Film", sublabel: "Macro texture sequence with dramatic lighting", color: "#1a1020", type: "video", src: null },
  { id: 3, label: "Editorial Beauty Campaign", sublabel: "Full editorial series for skincare launch", color: "#201418", type: "image", src: null },
  { id: 4, label: "Product Hero — Serum Collection", sublabel: "Hero shots for e-commerce and retail", color: "#14201a", type: "image", src: null },
];
const UGC_ITEMS = [
  { id: 1, label: "Get Ready With Me", sublabel: "Lumière Skincare — Vitamin C Serum · 15s direct-to-camera testimonial with product B-roll", color: "#1a1528", type: "video", src: null },
  { id: 2, label: "Morning Routine", sublabel: "Bare Ritual — Hydrating Cleanser · GRWM routine with product integration and natural lighting", color: "#151a28", type: "video", src: null },
  { id: 3, label: "First Impressions", sublabel: "Glow Theory — Retinol Night Cream · Unboxing with texture shots and before-after routine", color: "#281a15", type: "video", src: null },
  { id: 4, label: "Product Application", sublabel: "Velvet Skin Co — Hyaluronic Serum · Close-up application with skin texture detail shots", color: "#1f1528", type: "video", src: null },
  { id: 5, label: "Night Routine", sublabel: "Dew Drop Beauty — Overnight Mask · Full evening skincare routine with ambient lighting", color: "#15281a", type: "video", src: null },
];
const EDITORIAL_ITEMS = [
  { color: "#1e1428", type: "image", src: null },
  { color: "#201a14", type: "image", src: null },
  { color: "#14201a", type: "image", src: null },
  { color: "#1a1428", type: "image", src: null },
  { color: "#28141e", type: "image", src: null },
  { color: "#142028", type: "image", src: null },
  { color: "#201e14", type: "image", src: null },
  { color: "#1a2014", type: "image", src: null },
  { color: "#281420", type: "image", src: null },
];

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
  const [ref, vis] = useInView();
  return (<div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>{children}</div>);
}

function MediaSlot({ type, src, color, aspectRatio = "9/16", borderRadius = "10px", placeholderIcon = "play" }) {
  if (src) {
    if (type === "video") return <video src={src} autoPlay muted loop playsInline style={{ width: "100%", aspectRatio, objectFit: "cover", borderRadius, display: "block" }} />;
    return <img src={src} alt="" loading="lazy" style={{ width: "100%", aspectRatio, objectFit: "cover", borderRadius, display: "block" }} />;
  }
  return (
    <div style={{ aspectRatio, borderRadius, background: `linear-gradient(160deg,${color || "#1a1a2e"},#080808)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {placeholderIcon === "play" ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>}
        </div>
      </div>
    </div>
  );
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

function Carousel({ items, cardWidth = 220, gap = 16, renderCard }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [drag, setDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [sl, setSl] = useState(0);

  const checkScroll = useCallback(() => {
    const el = trackRef.current; if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const totalW = items.length * cardWidth + (items.length - 1) * gap;
    if (totalW > el.clientWidth) el.scrollLeft = (totalW - el.clientWidth) / 2;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => { el.removeEventListener("scroll", checkScroll); window.removeEventListener("resize", checkScroll); };
  }, [items.length, cardWidth, gap, checkScroll]);

  const scroll = (dir) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir === "left" ? -(cardWidth + gap) : (cardWidth + gap), behavior: "smooth" });
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
        style={{ display: "flex", gap: `${gap}px`, overflowX: "auto", cursor: drag ? "grabbing" : "grab", padding: "0 40px 20px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}>
        {items.map((item, i) => (
          <div key={item.id || i} style={{ scrollSnapAlign: "center", flex: `0 0 ${cardWidth}px` }}>
            {renderCard(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}

function CarouselCard({ item }) {
  return (
    <div style={{ userSelect: "none" }}>
      <MediaSlot type={item.type} src={item.src} color={item.color} placeholderIcon={item.type === "video" ? "play" : "image"} />
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
      <MediaSlot type={item.type} src={item.src} color={item.color} aspectRatio="4/5" borderRadius="0px" placeholderIcon="image" />
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

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const fn = () => setScrollY(window.scrollY); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ "--fh": "'Syne','Helvetica Neue',sans-serif", "--fb": "'Inter',-apple-system,sans-serif", minHeight: "100vh", background: "#0A0A0A", color: "#F5F0EB", fontFamily: "var(--fb)", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        ::selection{background:rgba(245,240,235,0.2);color:#fff}
        @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .nl{color:rgba(245,240,235,0.4);text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:color 0.3s;font-weight:400}
        .nl:hover{color:#F5F0EB}
        .bp{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;background:#F5F0EB;border:none;color:#0A0A0A;font-family:var(--fb);font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;cursor:pointer;font-weight:500;transition:all 0.35s cubic-bezier(0.16,1,0.3,1);border-radius:2px}
        .bp:hover{background:#fff;transform:translateY(-2px);box-shadow:0 8px 32px rgba(245,240,235,0.15)}
        .bg{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;background:transparent;border:1px solid rgba(245,240,235,0.2);color:#F5F0EB;font-family:var(--fb);font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;cursor:pointer;font-weight:400;transition:all 0.35s;border-radius:2px}
        .bg:hover{border-color:rgba(245,240,235,0.5);background:rgba(245,240,235,0.04)}
        .sp{padding:100px 24px;max-width:1100px;margin:0 auto}
        .mm{position:fixed;inset:0;background:rgba(10,10,10,0.98);backdrop-filter:blur(24px);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;animation:fadeIn 0.3s ease}
        @media(max-width:768px){.dk{display:none!important}.mb{display:flex!important}}
        @media(min-width:769px){.mb{display:none!important}}
        .eg{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        @media(max-width:640px){.eg{grid-template-columns:repeat(2,1fr)}}
        .sr{display:flex;gap:20px;flex-wrap:wrap}
        @media(max-width:768px){.sr{flex-direction:column}}
        .ctrack::-webkit-scrollbar{display:none}
        .sl{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:rgba(245,240,235,0.45);margin-bottom:16px;font-weight:500;text-align:center}
        .sh{font-family:var(--fh);font-size:clamp(28px,4vw,44px);font-weight:600;line-height:1.15;margin-bottom:48px;text-align:center}
      `}</style>

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
          <Carousel items={HERO_ITEMS} cardWidth={220} renderCard={(item) => <CarouselCard item={item} />} />
        </div>
        <div style={{ padding: "0 32px", marginTop: "40px", animation: "fadeUp 0.9s ease 0.85s both", textAlign: "center" }}>
          <a href={CALENDLY_URL} className="bp">Book a Discovery Call</a>
        </div>
        <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", animation: "fadeIn 1s ease 1.2s both" }}>
          <span style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(245,240,235,0.25)" }}>Scroll</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom,rgba(245,240,235,0.3),transparent)" }} />
        </div>
      </section>

      <section id="work" style={{ padding: "80px 0 100px" }}>
        <div style={{ padding: "0 32px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <Reveal><div className="sl">The Work</div><h2 className="sh">Selected <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>pieces</span></h2></Reveal>
        </div>
        <Reveal><Carousel items={WORK_ITEMS} cardWidth={280} renderCard={(item) => <CarouselCard item={item} />} /></Reveal>
        <Reveal><div style={{ textAlign: "center", marginTop: "40px" }}><a href={CALENDLY_URL} className="bg">Like what you see? Let's talk</a></div></Reveal>
      </section>

      <section id="ugc" style={{ padding: "80px 0 100px" }}>
        <div style={{ padding: "0 32px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <Reveal><div className="sl">UGC</div><h2 className="sh">Scroll-stopping <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>UGC</span></h2></Reveal>
        </div>
        <Reveal><Carousel items={UGC_ITEMS} cardWidth={260} renderCard={(item) => <CarouselCard item={item} />} /></Reveal>
        <Reveal><div style={{ textAlign: "center", marginTop: "40px" }}><a href={CALENDLY_URL} className="bg">Get this for your brand</a></div></Reveal>
      </section>

      <section className="sp" style={{ textAlign: "center" }}>
        <Reveal><div className="sl">Editorial & Product</div><h2 className="sh">The full <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>content ecosystem</span></h2></Reveal>
        <div className="eg">{EDITORIAL_ITEMS.map((item, i) => <Reveal key={i} delay={i * 0.05}><GridImage item={item} /></Reveal>)}</div>
        <Reveal><div style={{ marginTop: "48px" }}><a href={CALENDLY_URL} className="bp">Book a Discovery Call</a></div></Reveal>
      </section>

      <section style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0e0e0e 50%,#0A0A0A 100%)" }}>
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

      <section className="sp" style={{ paddingTop: "60px" }}>
        <Reveal>
          <div style={{ maxWidth: "700px", margin: "0 auto", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "14px", padding: "52px 40px", textAlign: "center" }}>
            <div className="sl" style={{ marginBottom: "28px" }}>What Clients Say</div>
            <div style={{ aspectRatio: "16/9", maxWidth: "480px", margin: "0 auto 28px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <p style={{ fontFamily: "var(--fh)", fontSize: "18px", fontStyle: "italic", lineHeight: 1.65, color: "rgba(245,240,235,0.45)", maxWidth: "440px", margin: "0 auto 16px", fontWeight: 400 }}>"Video testimonial coming soon."</p>
            <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,235,0.25)" }}>— Client Name, Founder of Brand</div>
          </div>
        </Reveal>
      </section>

      <section id="about" className="sp" style={{ textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ width: "200px", height: "250px", borderRadius: "10px", margin: "0 auto 36px", background: "linear-gradient(160deg,#1a1520,#0a0a0a)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.04)" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="sl">About</div>
            <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 600, lineHeight: 1.2, marginBottom: "20px" }}>Ben Lewis</h2>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.45)", fontWeight: 300, maxWidth: "480px", margin: "0 auto" }}>I build AI-powered content production systems that give DTC beauty brands campaign-grade content without the traditional production overhead. My work spans editorial fashion, skincare campaigns, and cinematic brand films.</p>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.45)", fontWeight: 300, maxWidth: "480px", margin: "16px auto 0" }}>One partner replaces an entire production team — photographers, videographers, UGC creators, stylists, and studio sessions. You get the output. I handle the rest.</p>
            <div style={{ marginTop: "36px" }}><a href={CALENDLY_URL} className="bp">Book a Discovery Call</a></div>
          </div>
        </Reveal>
      </section>

      <section style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 100%)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, lineHeight: 1.1, maxWidth: "700px", margin: "0 auto 28px" }}>Ready to replace your entire content production<span style={{ display: "block", fontWeight: 400, color: "rgba(245,240,235,0.45)", marginTop: "4px" }}>with one partner?</span></h2>
          <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.45)", fontWeight: 300, maxWidth: "420px", margin: "0 auto 44px", lineHeight: 1.7 }}>15-minute discovery call. No pitch deck. Just a conversation about your content and how to fix it.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={CALENDLY_URL} className="bp">Book a Discovery Call</a>
            <a href={LINKEDIN_URL} className="bg">Connect on LinkedIn</a>
          </div>
        </Reveal>
      </section>

      <footer style={{ padding: "28px 32px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--fh)", fontSize: "12px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)" }}>Ben Lewis Studios</div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <a href={LINKEDIN_URL} style={{ color: "rgba(245,240,235,0.25)", transition: "color 0.3s", display: "flex" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href={`mailto:${EMAIL}`} style={{ color: "rgba(245,240,235,0.25)", fontSize: "11px", letterSpacing: "1px", textDecoration: "none", transition: "color 0.3s" }}>{EMAIL}</a>
        </div>
        <div style={{ fontSize: "11px", color: "rgba(245,240,235,0.25)", letterSpacing: "0.5px" }}>© 2026 Ben Lewis Studios</div>
      </footer>
    </div>
  );
}
