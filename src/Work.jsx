import { useEffect } from "react";
import { CALENDLY_URL, LINKEDIN_URL, Reveal, Carousel, CarouselCard, GridImage, StepCard, LeadForm } from "./shared.jsx";

const HERO_ITEMS = [
  { id: 1, label: "Cinematic Reel", type: "video", src: "/assets/hero-2.mp4" },
  { id: 2, label: "Brand Film", type: "video", src: "/assets/hero-3.mp4" },
  { id: 3, label: "Campaign Film", type: "video", src: "/assets/hero-4.mp4" },
];

const EDIT_ITEMS = [
  { id: 1, label: "Editorial Beauty", sublabel: "Cinematic portrait with dramatic lighting", type: "image", src: "/assets/hero-1-c.webp" },
  { id: 2, label: "Luxury Skincare", sublabel: "Premium product photography with cinematic lighting", type: "image", src: "/assets/edit-1-c.webp" },
  { id: 3, label: "Beauty Editorial", sublabel: "High-end editorial series for skincare campaigns", type: "image", src: "/assets/edit-2-c.webp" },
  { id: 4, label: "Product Campaign", sublabel: "Hero shots for e-commerce and brand retail", type: "image", src: "/assets/edit-3-c.webp" },
  { id: 5, label: "Fashion Editorial", sublabel: "Editorial beauty with dramatic composition", type: "image", src: "/assets/edit-4-c.webp" },
  { id: 6, label: "Beauty Portrait", sublabel: "Premium editorial with natural beauty aesthetic", type: "image", src: "/assets/hero-5-c.webp" },
];

const UGC_ITEMS = [
  { id: 1, label: "Nuria", sublabel: "Calm Mist with Rose Water & Oat Extract", type: "video", src: "/assets/ugc-3.mp4" },
  { id: 2, label: "Faace", sublabel: "Menopause Face Cream", type: "video", src: "/assets/ugc-1.mp4" },
  { id: 3, label: "Codage Paris", sublabel: "Moisturising Serum N°01", type: "video", src: "/assets/ugc-2.mp4" },
  { id: 4, label: "Ritmo", sublabel: "Energy Gummies", type: "video", src: "/assets/ugc-4.mp4" },
  { id: 5, label: "MuscleFier", sublabel: "INFRNO Pre-Workout", type: "video", src: "/assets/ugc-5.mp4" },
];

const GRID_ITEMS = [
  { type: "image", src: "/assets/15-c.webp" },
  { type: "image", src: "/assets/16-c.webp" },
  { type: "image", src: "/assets/17-c.webp" },
  { type: "image", src: "/assets/18-c.webp" },
  { type: "image", src: "/assets/19-c.webp" },
  { type: "image", src: "/assets/20-c.webp" },
  { type: "image", src: "/assets/21-c.webp" },
  { type: "image", src: "/assets/22-c.webp" },
  { type: "image", src: "/assets/23-c.webp" },
];

export default function Work() {
  useEffect(() => {
    document.title = "Work — Ben Lewis Studios";
  }, []);
  return (
    <>
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 0 60px", position: "relative" }}>
        <div style={{ padding: "0 32px", maxWidth: "1100px", margin: "0 auto", width: "100%", textAlign: "center" }}>
          <div style={{ animation: "fadeIn 0.8s ease 0.2s both" }}>
            <div style={{ fontFamily: "var(--fh)", fontSize: "11px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginBottom: "32px" }}>Ben Lewis Studios</div>
          </div>
          <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(36px,7vw,76px)", fontWeight: 700, lineHeight: 1.05, maxWidth: "800px", margin: "0 auto", animation: "fadeUp 0.9s ease 0.35s both", letterSpacing: "-1px" }}>
            Content that scales your brand.<br />
            <span style={{ color: "rgba(245,240,235,0.45)", fontWeight: 400 }}>Produced in days, not weeks.</span>
          </h1>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,235,0.45)", maxWidth: "540px", margin: "28px auto 0", fontWeight: 300, animation: "fadeUp 0.9s ease 0.55s both" }}>
            Editorial photography. UGC videos. Product shots. Cinematic reels. One partner. Built to perform.
          </p>
        </div>
        <div style={{ marginTop: "52px", animation: "fadeUp 0.9s ease 0.7s both" }}>
          <div className="mb" style={{ justifyContent: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(245,240,235,0.2)", fontWeight: 400 }}>Swipe to explore</span>
          </div>
          <div className="hero-row" style={{ display: "flex", gap: "16px", justifyContent: "center", padding: "0 24px 20px", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {HERO_ITEMS.map((item) => (
              <div key={item.id} className="hero-card" style={{ flex: "0 0 auto" }}>
                <CarouselCard item={item} priority={true} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 32px", marginTop: "40px", animation: "fadeUp 0.9s ease 0.85s both", textAlign: "center" }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bp">Book a Discovery Call</a>
        </div>
      </section>

      <section id="work" className="mob-sec" style={{ padding: "80px 0 100px" }}>
        <div style={{ padding: "0 32px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <Reveal><div className="sl">The Work</div><h2 className="sh">Luxury <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>editorial</span></h2></Reveal>
        </div>
        <Reveal><Carousel items={EDIT_ITEMS} cardWidth={340} mobileCardWidth={280} renderCard={(item) => <CarouselCard item={item} />} /></Reveal>
        <Reveal><div style={{ textAlign: "center", marginTop: "40px" }}><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bg">Like what you see? Let's talk</a></div></Reveal>
      </section>

      <section id="ugc" className="mob-sec" style={{ padding: "80px 0 100px" }}>
        <div style={{ padding: "0 32px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <Reveal><div className="sl">UGC</div><h2 className="sh">UGC that <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>converts</span></h2></Reveal>
        </div>
        <Reveal>
          <div className="mb" style={{ justifyContent: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(245,240,235,0.2)", fontWeight: 400 }}>Swipe to explore</span>
          </div>
          <div className="ugc-row" style={{ display: "flex", gap: "16px", justifyContent: "center", padding: "0 24px 20px", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {UGC_ITEMS.map((item) => (
              <div key={item.id} className="ugc-card" style={{ flex: "0 0 auto" }}>
                <CarouselCard item={item} ugc={true} />
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal><div style={{ textAlign: "center", marginTop: "40px" }}><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bg">Get this for your brand</a></div></Reveal>
      </section>

      <section className="mob-cta" style={{ padding: "100px 24px", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, lineHeight: 1.15, marginBottom: "16px" }}>
              See what this could do<span style={{ display: "block", fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>for your brand.</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(245,240,235,0.45)", fontWeight: 300, maxWidth: "420px", margin: "0 auto 40px" }}>
              We'll produce a custom UGC video featuring your product — yours to keep and use, no strings attached.
            </p>
            <LeadForm
              fields={[
                { name: "firstName", label: "First Name", placeholder: "First name" },
                { name: "brand", label: "Brand", placeholder: "Brand name" },
                { name: "email", label: "Email", placeholder: "Email address", type: "email" },
              ]}
              subjectPrefix="Free UGC Video Request"
              buttonText="Get Your Free Video"
              successTitle="We'll be in touch."
              successBody="Check your inbox — we'll send your free video within 48 hours."
            />
          </div>
        </Reveal>
      </section>

      <section className="sp" style={{ textAlign: "center" }}>
        <Reveal><div className="sl">Editorial & Product</div><h2 className="sh">The full <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>content ecosystem</span></h2></Reveal>
        <div className="eg">{GRID_ITEMS.map((item, i) => <Reveal key={i} delay={i * 0.05}><GridImage item={item} /></Reveal>)}</div>
        <Reveal><div style={{ marginTop: "48px" }}><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bp">Book a Discovery Call</a></div></Reveal>
      </section>

      <section className="mob-cta" style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0e0e0e 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div className="sl" style={{ marginBottom: "32px" }}>What This Replaces</div>
            <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(26px,4.5vw,48px)", fontWeight: 700, lineHeight: 1.12, marginBottom: "32px" }}>Your current content production is slow, expensive,<span style={{ display: "block", color: "#F5F0EB", marginTop: "8px" }}>and impossible to test at scale.</span></h2>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.45)", maxWidth: "480px", margin: "0 auto 12px", fontWeight: 300 }}>Photographers. Videographers. UGC creators. Agencies. Studio hire. Model fees. Weeks of lead time. No way to iterate fast enough to find what converts.</p>
            <p style={{ fontFamily: "var(--fh)", fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 600, color: "#F5F0EB", marginTop: "40px", lineHeight: 1.2 }}>We replace all of it.</p>
            <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.45)", fontWeight: 300, marginTop: "16px" }}>One partner. Campaign-grade output. Produced in days. A fraction of the cost.</p>
            <div style={{ marginTop: "44px" }}><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bp">See How It Works</a></div>
          </div>
        </Reveal>
      </section>

      <section className="sp" style={{ textAlign: "center" }}>
        <Reveal><div className="sl">Process</div><h2 className="sh">How it <span style={{ fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>works</span></h2></Reveal>
        <Reveal delay={0.1}>
          <div className="sr">
            <StepCard number="01" title="Brand Immersion" description="We learn your brand, your audience, your aesthetic. We study your products, your competitors, and your content gaps." />
            <StepCard number="02" title="Content Production" description="We produce a complete monthly content library — editorial stills, UGC videos, product shots, and cinematic reels — all tailored to your brand." />
            <StepCard number="03" title="Deliver & Scale" description="You receive ready-to-deploy content every month. We analyse performance data, double down on winners, and kill what doesn't convert." />
          </div>
        </Reveal>
        <Reveal><div style={{ marginTop: "48px" }}><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bg">Book a Discovery Call</a></div></Reveal>
      </section>

      <section id="about" className="sp">
        <Reveal>
          <div style={{ display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "0 0 auto" }}>
              <div style={{ width: "220px", height: "220px", borderRadius: "50%", background: "linear-gradient(160deg,#1a1a1a,#0d0d0d)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <img src="/assets/ben-lewis.png" alt="Ben Lewis" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%" }} />
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

      <section className="mob-cta" style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 100%)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, lineHeight: 1.1, maxWidth: "700px", margin: "0 auto 28px" }}>Ready for content that actually moves the needle?</h2>
          <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.45)", fontWeight: 300, maxWidth: "420px", margin: "0 auto 44px", lineHeight: 1.7 }}>15-minute discovery call. No pitch deck. Just a conversation about your content, your growth, and how to unlock both.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bp">Book a Discovery Call</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="bg">Connect on LinkedIn</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
