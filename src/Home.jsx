import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, LazyVideo, CarouselCard, LeadForm } from "./shared.jsx";

const PORTFOLIO_PREVIEW = [
  { id: 1, label: "Cinematic Reel", type: "video", src: "/assets/hero-2.mp4" },
  { id: 2, label: "Brand Film", type: "video", src: "/assets/hero-3.mp4" },
  { id: 3, label: "MuscleFier", sublabel: "INFRNO Pre-Workout", type: "video", src: "/assets/ugc-5.mp4" },
  { id: 4, label: "Codage Paris", sublabel: "Moisturising Serum N°01", type: "video", src: "/assets/ugc-2.mp4" },
];

function BeforeAfterSlot({ label }) {
  return (
    <div style={{ flex: 1, minWidth: "240px", maxWidth: "420px" }}>
      <div style={{ aspectRatio: "4/5", background: "linear-gradient(160deg,#1a1a1a,#0d0d0d)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,235,0.35)", fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginTop: "12px", textAlign: "center", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function Stat({ num, lbl }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="stat-num">{num}</div>
      <div className="stat-lbl">{lbl}</div>
    </div>
  );
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    document.title = "Work — Ben Lewis Studios";
    let ticking = false;
    const fn = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { setScrollY(window.scrollY); ticking = false; }); } };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 60px", position: "relative" }}>
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,240,235,0.02) 0%,transparent 70%)", top: "30%", left: "50%", transform: `translate(-50%,-50%) translateY(${scrollY * -0.06}px)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", textAlign: "center" }}>
          <div style={{ animation: "fadeIn 0.8s ease 0.2s both" }}>
            <div style={{ fontFamily: "var(--fh)", fontSize: "11px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginBottom: "32px" }}>Ben Lewis Studios</div>
          </div>
          <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(34px,6.5vw,72px)", fontWeight: 700, lineHeight: 1.05, maxWidth: "900px", margin: "0 auto", animation: "fadeUp 0.9s ease 0.35s both", letterSpacing: "-1px" }}>
            If you don't have attention in 2026,<br />
            <span style={{ color: "rgba(245,240,235,0.45)", fontWeight: 400 }}>you don't have a business.</span>
          </h1>
          <p style={{ fontFamily: "var(--fh)", fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1.4, color: "#F5F0EB", maxWidth: "720px", margin: "28px auto 0", fontWeight: 500, animation: "fadeUp 0.9s ease 0.5s both" }}>
            I help brands look like they have a 7-figure marketing budget — at a fraction of the cost.
          </p>
          <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(245,240,235,0.55)", maxWidth: "640px", margin: "20px auto 0", fontWeight: 300, animation: "fadeUp 0.9s ease 0.65s both" }}>
            Cinematic video ads. Editorial photography. UGC content. One partner. 72-hour turnaround.
          </p>
          <div style={{ marginTop: "48px", maxWidth: "640px", margin: "48px auto 0", animation: "fadeUp 0.9s ease 0.8s both" }}>
            <LazyVideo src="/assets/hero-2.mp4" aspectRatio="16/9" borderRadius="12px" priority={true} />
          </div>
          <div style={{ marginTop: "32px", animation: "fadeUp 0.9s ease 0.95s both" }}>
            <a href="#cta" onClick={(e) => { e.preventDefault(); document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" }); }} className="bp">Get Your Free Spec Ad</a>
          </div>
        </div>
      </section>

      {/* RESULTS BAR */}
      <Reveal>
        <div className="stats-bar">
          <Stat num="100×" lbl="Engagement spike" />
          <Stat num="5×" lbl="Retainer increase" />
          <Stat num="72hr" lbl="Turnaround" />
        </div>
      </Reveal>

      {/* THE PROBLEM */}
      <section className="sp" style={{ textAlign: "center" }}>
        <Reveal>
          <div className="sl">The Problem</div>
          <h2 className="sh">The problem</h2>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,235,0.6)", maxWidth: "680px", margin: "0 auto", fontWeight: 300 }}>
            You're spending £3–5K a month across freelance photographers, UGC creators, and the odd photoshoot. Getting half the content you need, twice as slow as you need it. Your product deserves better than recycled Canva graphics and inconsistent iPhone shots.
          </p>
        </Reveal>
      </section>

      {/* THE SOLUTION */}
      <section className="sp" style={{ textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div className="sl">The Solution</div>
          <h2 className="sh">The solution</h2>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,235,0.6)", maxWidth: "680px", margin: "0 auto", fontWeight: 300 }}>
            One retainer replaces your photographer, your UGC creators, and your content agency. Same quality you'd expect from a £15K production. Turned around in days, not weeks.
          </p>
        </Reveal>
      </section>

      {/* BEFORE/AFTER */}
      <section className="sp" style={{ textAlign: "center" }}>
        <Reveal>
          <div className="sl">Transformation</div>
          <h2 className="sh">The transformation</h2>
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
            <BeforeAfterSlot label="Before" />
            <BeforeAfterSlot label="After" />
          </div>
        </Reveal>
      </section>

      {/* CASE STUDY */}
      <section className="mob-cta" style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0e0e0e 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div className="sl">Case Study</div>
            <h2 className="sh">The results</h2>
            <p style={{ fontSize: "17px", lineHeight: 1.8, color: "rgba(245,240,235,0.6)", fontWeight: 300 }}>
              Latest campaign I produced for a multi-million pound DTC brand got <span style={{ color: "#F5F0EB", fontWeight: 500 }}>100× their normal share rate</span>. Their CEO went from 2 videos a month to 10 on the spot. The previous production took them a month and cost over £10K.
            </p>
            <p style={{ fontFamily: "var(--fh)", fontSize: "clamp(20px,3vw,32px)", fontWeight: 600, color: "#F5F0EB", marginTop: "32px", lineHeight: 1.25 }}>
              I delivered in under a week.
            </p>
          </div>
        </Reveal>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="sp" style={{ textAlign: "center" }}>
        <Reveal>
          <div className="sl">Portfolio</div>
          <h2 className="sh">The work</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", maxWidth: "1000px", margin: "0 auto" }}>
            {PORTFOLIO_PREVIEW.map(item => (
              <div key={item.id}>
                <CarouselCard item={item} />
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div style={{ marginTop: "48px" }}>
            <Link to="/work" className="bg">See full portfolio →</Link>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section id="cta" className="mob-cta" style={{ padding: "120px 24px", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "20px" }}>
              See what we can do<span style={{ display: "block", fontWeight: 400, color: "rgba(245,240,235,0.45)" }}>for your brand.</span>
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,235,0.55)", fontWeight: 300, maxWidth: "480px", margin: "0 auto 40px" }}>
              Get a free spec ad made for your brand. Delivered in 72 hours. No strings attached. Yours to keep regardless.
            </p>
            <LeadForm
              fields={[
                { name: "name", label: "Name", placeholder: "Name" },
                { name: "email", label: "Email", placeholder: "Email", type: "email" },
                { name: "brand", label: "Brand URL", placeholder: "Brand URL" },
              ]}
              subjectPrefix="Free Spec Ad Request"
              buttonText="Get Your Free Spec Ad"
              successTitle="Request received."
              successBody="Your spec ad will be with you within 72 hours."
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
