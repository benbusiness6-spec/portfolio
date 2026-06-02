import { useEffect, useRef, useState } from "react";
import { Reveal, LazyVideo, CALENDLY_URL } from "./shared.jsx";

const HERO = {
  src: "/assets/security/wd03-hero.mp4",
  poster: "/assets/security/wd03-hero-poster.webp",
};

const PROOF = [
  { src: "/assets/security/wd-top.mp4", poster: "/assets/security/wd-top-poster.webp", label: "Cinematic brand film" },
  { src: "/assets/security/wd-50k.mp4", poster: "/assets/security/wd-50k-poster.webp", label: "Cinematic brand film" },
];

const GET = [
  {
    title: "Cinematic brand films",
    body: "Hero pieces that make your firm look like it has a six-figure content budget, for a fraction of it.",
  },
  {
    title: "A consistent visual world",
    body: "One unmistakable look across every channel, so you're recognised in three seconds, not three scrolls.",
  },
  {
    title: "Proof-led content",
    body: "Built to perform and to be remembered, not just to look good.",
  },
];

// Hero video: poster + autoplay muted loop, tap to unmute. LCP-priority.
function HeroFilm() {
  const vidRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const toggle = (e) => {
    e.stopPropagation();
    if (vidRef.current) { vidRef.current.muted = !vidRef.current.muted; setMuted(vidRef.current.muted); }
  };
  return (
    <div onClick={toggle} style={{ position: "relative", aspectRatio: "9/16", borderRadius: "14px", overflow: "hidden", background: "#111", cursor: "pointer", boxShadow: "0 30px 90px rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <img src={HERO.poster} alt="Watchdog cinematic brand film" width="540" height="960" loading="eager" decoding="async" fetchpriority="high"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 0 : 1, transition: "opacity 0.5s ease" }} />
      <video ref={vidRef} src={HERO.src} poster={HERO.poster} autoPlay muted loop playsInline preload="auto"
        onLoadedData={() => setLoaded(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }} />
      <div style={{ position: "absolute", bottom: "14px", right: "14px", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
        {muted ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        )}
      </div>
    </div>
  );
}

function BookBtn({ children = "Book a 20-minute call", style = {} }) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bp" style={style}>{children}</a>
  );
}

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
      {/* HERO */}
      <section style={{ padding: "120px 24px 60px", maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "64px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flex: "1 1 460px", maxWidth: "600px" }}>
            <div style={{ fontFamily: "var(--fh)", fontSize: "11px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginBottom: "28px", animation: "fadeIn 0.8s ease 0.1s both" }}>
              Cinematic brand worlds · for security firms
            </div>
            <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(34px,5.2vw,60px)", fontWeight: 700, lineHeight: 1.07, letterSpacing: "-1px", animation: "fadeUp 0.9s ease 0.25s both" }}>
              You don't need more ads.{" "}
              <span style={{ color: "rgba(245,240,235,0.5)", fontWeight: 500 }}>You need to be the first name they think of.</span>
            </h1>
            <p style={{ fontSize: "clamp(15px,1.7vw,18px)", lineHeight: 1.7, color: "rgba(245,240,235,0.65)", maxWidth: "520px", margin: "26px 0 0", fontWeight: 300, animation: "fadeUp 0.9s ease 0.4s both" }}>
              We build the proprietary character and cinematic world that makes your firm the name people remember, and trust, before they ever start searching.
            </p>
            <div style={{ marginTop: "36px", display: "flex", alignItems: "center", gap: "22px", flexWrap: "wrap", animation: "fadeUp 0.9s ease 0.55s both" }}>
              <BookBtn />
              <span style={{ fontSize: "13px", letterSpacing: "0.5px", color: "rgba(245,240,235,0.45)", fontWeight: 300 }}>
                300,000+ organic views · built for a live UK security group
              </span>
            </div>
          </div>
          <div style={{ flex: "0 0 auto", width: "min(340px, 80vw)", animation: "fadeUp 1s ease 0.45s both" }}>
            <HeroFilm />
            <p style={{ textAlign: "center", marginTop: "14px", fontSize: "11px", letterSpacing: "1px", color: "rgba(245,240,235,0.35)", fontWeight: 300 }}>
              Cinematic brand film · Watchdog · (tap for sound)
            </p>
          </div>
        </div>
      </section>

      {/* THE SHIFT */}
      <section className="sp" style={{ maxWidth: "820px" }}>
        <Reveal>
          <div className="sl" style={{ textAlign: "left" }}>The shift</div>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(24px,3.4vw,38px)", fontWeight: 600, lineHeight: 1.2, marginBottom: "28px", color: "#F5F0EB" }}>
            Most security firms have everything except the one thing that matters.
          </h2>
          <div style={{ fontSize: "16px", lineHeight: 1.85, color: "rgba(245,240,235,0.6)", fontWeight: 300, display: "flex", flexDirection: "column", gap: "18px" }}>
            <p>You're good at what you do. The credibility's there. The service is there. The results are there.</p>
            <p>But in a market where every firm looks the same (same stock photos, same "24/7 trusted security," same dated website), buyers can't tell the serious operator from the cheapest one.</p>
            <p>So they default to whoever shouts loudest with the lowest price. That's the <em style={{ fontStyle: "normal", color: "#F5F0EB" }}>race to the bottom</em>, and it's a race you don't want to win.</p>
            <p style={{ color: "rgba(245,240,235,0.8)" }}>The firms that pull ahead don't win on service alone. They win by being <em style={{ fontStyle: "normal", color: "#F5F0EB" }}>instantly recognisable</em>, the obvious, serious choice, the name that surfaces first before anyone even starts looking.</p>
          </div>
        </Reveal>
      </section>

      {/* WHAT YOU GET */}
      <section className="sp" style={{ paddingTop: "20px" }}>
        <Reveal>
          <div className="sl">What you actually get</div>
          <h2 className="sh" style={{ marginBottom: "20px", maxWidth: "780px", marginLeft: "auto", marginRight: "auto" }}>
            A proprietary brand character and cinematic world that <span style={{ color: "rgba(245,240,235,0.5)" }}>you own.</span>
          </h2>
          <p style={{ textAlign: "center", fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,235,0.55)", fontWeight: 300, maxWidth: "640px", margin: "0 auto 56px" }}>
            Not "a few videos." A recurring on-screen identity, a film-grade character and world built around your firm, that nobody else can copy and that gets stronger every month you run it.
          </p>
        </Reveal>
        <div className="sr" style={{ justifyContent: "center" }}>
          {GET.map((g, i) => (
            <Reveal key={i} delay={i * 0.08} style={{ flex: "1 1 280px", maxWidth: "340px" }}>
              <div style={{ padding: "32px 28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", height: "100%" }}>
                <div style={{ fontFamily: "var(--fh)", fontSize: "18px", fontWeight: 600, color: "#F5F0EB", marginBottom: "12px" }}>{g.title}</div>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,235,0.5)", fontWeight: 300 }}>{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p style={{ textAlign: "center", fontSize: "17px", lineHeight: 1.7, color: "rgba(245,240,235,0.75)", fontWeight: 300, maxWidth: "620px", margin: "52px auto 0" }}>
            And you <em style={{ fontStyle: "normal", color: "#F5F0EB" }}>barely lift a finger.</em> We run the entire engine: concept, production, delivery, all of it. You approve. That's the whole job.
          </p>
        </Reveal>
      </section>

      {/* THE PROOF */}
      <section style={{ padding: "80px 24px 100px", background: "linear-gradient(180deg,#0A0A0A,#0d0d0d 50%,#0A0A0A)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div className="sl">Latest published results · Watchdog</div>
            <h2 className="sh" style={{ marginBottom: "16px" }}>A live engine for a real security group.</h2>
            <p style={{ textAlign: "center", fontSize: "15px", lineHeight: 1.7, color: "rgba(245,240,235,0.5)", fontWeight: 300, maxWidth: "640px", margin: "0 auto 8px" }}>
              Watchdog, a UK security group, came to us looking for one thing: visibility. We built them a cinematic brand world from the ground up. Here's what it did, in the open, on organic reach alone.
            </p>
          </Reveal>

          {/* stat row */}
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

          {/* proof videos */}
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
              {PROOF.map((p, i) => (
                <div key={i} style={{ width: "min(260px, 70vw)" }}>
                  <LazyVideo src={p.src} poster={p.poster} aspectRatio="9/16" borderRadius="12px" />
                  <p style={{ textAlign: "center", marginTop: "12px", fontSize: "11px", letterSpacing: "1px", color: "rgba(245,240,235,0.35)", fontWeight: 300 }}>{p.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE GUARANTEE */}
      <section className="sp" style={{ maxWidth: "900px" }}>
        <Reveal>
          <div className="sl">The guarantee</div>
          <h2 className="sh" style={{ marginBottom: "48px" }}>The only risk in saying yes is wondering why you didn't sooner.</h2>
        </Reveal>
        <div className="sr" style={{ justifyContent: "center" }}>
          {[
            { tag: "The build", body: "You'll be thrilled with your character and your first film, or I keep working until you are. No drama, no fine print. We don't stop until it's right." },
            { tag: "The retainer", body: "Month-to-month. No lock-in, no long contracts. I earn it every single month, or you walk. The work keeps you here, not the paperwork." },
          ].map((g, i) => (
            <Reveal key={i} delay={i * 0.08} style={{ flex: "1 1 340px", maxWidth: "400px" }}>
              <div style={{ padding: "34px 30px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", height: "100%" }}>
                <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginBottom: "16px", fontWeight: 500 }}>{g.tag}</div>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(245,240,235,0.75)", fontWeight: 300 }}>{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ONE FIRM PER MARKET */}
      <section className="sp" style={{ maxWidth: "760px", paddingTop: "20px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(22px,3vw,32px)", fontWeight: 600, lineHeight: 1.25, marginBottom: "20px", color: "#F5F0EB" }}>
            I work with one security firm per market, never your direct competitor.
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.55)", fontWeight: 300, maxWidth: "560px", margin: "0 auto" }}>
            Which means once a firm in your area is in, that's it. Your rivals can't have this. I'm taking on a small founding group at preferential rates while I build this out. When your slot's gone, it's gone.
          </p>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="mob-cta" style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg,#0A0A0A 0%,#0d0d0d 50%,#0A0A0A 100%)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px", maxWidth: "680px", margin: "0 auto 16px" }}>
            One 20-minute call.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(245,240,235,0.55)", fontWeight: 300, maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            I'll show you exactly what we built for Watchdog, and what the same engine would look like for your firm. No pressure, no pitch deck. Just a look at what's possible.
          </p>
          <BookBtn />
        </Reveal>
      </section>
    </>
  );
}
