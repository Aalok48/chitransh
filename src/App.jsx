import { useState, useEffect, useRef } from "react";

// ── THEME ─────────────────────────────────────────────────────────────────
const T = {
  accent: "#E8563A",
  accentSoft: "#FDF1EE",
  accentMid: "#F4896B",
  navy: "#1E2A3A",
  navyMid: "#2E3F55",
  slate: "#5A6A7E",
  slateLight: "#8A97A8",
  bg: "#F8F6F2",
  bgAlt: "#F2EFE9",
  bgCard: "#FFFFFF",
  bgDark: "#1E2A3A",
  bgDarkAlt: "#253347",
  border: "#E8E2D9",
  borderCard: "#EDE8E0",
  green: "#2ECC71",
  blue: "#4A9EDD",
};

const NAV_LINKS = ["About", "Services", "Projects", "Team", "Contact"];

const SERVICES = [
  { icon: "🎬", title: "Audio-Visual Services", desc: "Film production, animation, motion graphics, and digital content crafted to communicate clearly, engage audiences, and strengthen brand impact.", items: ["Advertisement & TVC", "Video Documentary", "Music Videos", "Animated Video (2D/3D)", "Short Videos", "Radio/TV PSAs", "Wedding & Event Coverage"] },
  { icon: "🎨", title: "Printing & Designing", desc: "Creative design and high-quality printing that bring brands to life with visually appealing and impactful results.", items: ["IEC/BCC Material", "Graphic & Design", "UI/UX Designing", "Illustrator"] },
  { icon: "📷", title: "Photography", desc: "Capturing moments with creativity and precision, delivering high-quality images that tell stories and leave a lasting visual impact.", items: ["Commercial Photography", "Portrait Photography", "Product Photography", "Wedding Photography", "Event Photography", "Fashion Photography", "Documentary Photography"] },
  { icon: "💻", title: "IT Services", desc: "From web development to digital strategy, our in-office IT team delivers end-to-end technology solutions — actively supporting national and international clients with consistent, results-driven execution.", items: ["Website Design & Development", "Social Media Management", "Digital Marketing & SEO", "Software & ERP Documentation", "Tech Client Support", "Content Strategy", "Online Brand Management"], badge: "Office Ready" },
];

const PROJECTS = [
  { client: "PaceX Sports", logo: "/clientlogo/pacexlogo.jpeg", sub: "Official IT Partner", type: "Web & IT Management", desc: "Chitransh Creation is the official IT partner of PaceX Sports — actively developing, maintaining, and managing their digital platform to power Nepal's growing sports community.", url: "https://pacexsports.com.np", tag: "IT Project", isIT: true },
  { client: "Agile Solution", logo: "/clientlogo/agilelogo.jpeg", sub: "Microsoft Partner in Nepal", type: "Event Coverage", desc: "Comprehensive video and photo coverage for AGIL Solution 2025 — capturing key moments, speaker highlights, and authentic interactions.", url: "https://www.linkedin.com/posts/agileerp_businesscentral-microsoftdynamics365-agilesolutions-activity-7318538156323000320-4721", tag: "Corporate" },
  { client: "Swaraj Tractor", logo: "/clientlogo/swarajlogo.jpeg", sub: "Customer Testimonials", type: "Testimonial Videos", desc: "Four authentic testimonial videos showcasing real customer experiences with Swaraj Tractor across Nepal in 2025.", url: "https://www.facebook.com/reel/1702587773974869", tag: "Brand Film" },
  { client: "Shree Tarapunja English School", logo: "/clientlogo/shreetarapunja.jpeg", sub: "Educational Institution Showcase", type: "School Promotional Video", desc: "Produced a professional promotional video highlighting Shree Tarapunja English School's academic environment, student achievements, educational facilities, and commitment to quality learning.", url: "https://www.facebook.com/reel/1702587773974869", tag: "Corporate" }, { client: "Huawei Nepal", logo: "/clientlogo/huaweilogo.jpeg", sub: "Digital Education", type: "Documentary", desc: "A refined video documentary elegantly showcasing the impact and transformative benefits of digital education.", url: "https://blog.huawei.com/admin/asset/v1/pro/view/4-fa85a68997442309c8e10d3f975268d.mp4", tag: "Documentary" },
  { client: "Delight Hospitality", logo: "/clientlogo/delighthospitality.jpeg", sub: "Hotel & Hospitality Promotion", type: "Promotional Video", desc: "Created a visually engaging promotional video highlighting Delight Hospitality's accommodations, services, and customer-centric approach, helping strengthen its brand presence and market reach.", url: "https://www.youtube.com/watch?v=1SlTFpduQ1s", tag: "Brand Film" },
  { client: "Model Multiple College", logo: "/clientlogo/modellogo.jpeg", sub: "Janakpur", type: "Audio Production", desc: "Produced an audiobook titled \"Khushi\" — the inspiring biography of Birendra Sah Sir, brought to life through expressive narration.", url: "https://www.youtube.com/watch?v=2lL8m98hjvk", tag: "Audiobook" },
  { client: "\"Khushi\" Short Movie", logo: "/clientlogo/khushilogo.jpeg", sub: "NIFF 2025 Selection", type: "Narrative Film", desc: "Produced the acclaimed short film \"Khushi,\" directed by Pradhumna Mishra and officially selected for NIFF 2025.", url: "https://youtu.be/ZDD5_Pw-Fn4", tag: "Narrative Film" },
];

const TEAM = [
  { name: "Atul Karn", role: "Chief Executive Officer", image: "/team/atulkarn.jpeg" },
  { name: "Alok Karn", role: "IT chief", image: "/team/alokkarn.jpeg" },
  { name: "Bikal Bhandari", role: "Managing Director", image: "/team/bikalbhandari.jpeg" },
  { name: "CA Mohan Budhathoki", role: "Chief Financial Officer", image: "/team/mohan.jpeg" },
  { name: "Jatin Gurung", role: "Chief Operations Officer", image: "/team/jatingurung.jpeg" },
  { name: "Sakina Batt", role: "Creative Director", image: "/team/sakinabatt.jpeg" },
  { name: "Ritu Karn", role: "Accountant", image: "/team/ritukarn.jpeg" },
  { name: "Pradeep Thapa Magar", role: "Cinematographer", image: "/team/pradeepthapamagar.jpeg" },
  { name: "Sagin Maharjan", role: "Visual Editor", image: "/team/pradeepthapamagar.jpeg" },
  { name: "Sushant Kumar Lal", role: "Visual Editor", image: "/team/sushantkumarlal.jpeg" },
  { name: "Dipesh Shrestha", role: "Graphic Designer", image: "/team/dipeshshrestha.jpeg" },
  { name: "Matrika Subedi", role: "Consultant", image: "/team/dipeshshrestha.jpeg" },
];

const TAG_COLORS = {
  "IT Project": { bg: "#EAF3FB", text: "#1A5276" },
  "Corporate": { bg: "#FEF0EB", text: "#922B21" },
  "Brand Film": { bg: "#FEF9E7", text: "#7D6608" },
  "Documentary": { bg: "#EBF5FB", text: "#1A5276" },
  "Audiobook": { bg: "#EAFAF1", text: "#1E8449" },
  "Narrative Film": { bg: "#F5EEF8", text: "#6C3483" },
  "Social Documentary": { bg: "#EBF5FB", text: "#1A5276" },
};

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

export default function ChitranshCreation() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionsRef = useRef({});

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  const handleFormChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError("Please fill in your name, email, and message.");
      return;
    }
    setFormError("");
    setFormStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/xvznrrkr", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const d = await res.json();
        setFormError(d?.errors?.[0]?.message || "Something went wrong. Please try again.");
        setFormStatus("error");
      }
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setFormStatus("error");
    }
  };

  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;
  const isDesktop = w >= 1024;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 70);
      for (const id of NAV_LINKS) {
        const el = sectionsRef.current[id];
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 110 && r.bottom > 110) setActiveNav(id);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { if (isDesktop) setMenuOpen(false); }, [isDesktop]);

  const scrollTo = (id) => {
    sectionsRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const sp = isMobile ? "64px 24px" : isTablet ? "80px 40px" : "100px 64px";

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: T.bg, color: T.navy, overflowX: "hidden", margin: 0, padding: 0 }}>

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || menuOpen ? "rgba(255,252,248,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        transition: "background 0.3s, border 0.3s",
      }}>
        <div style={{ padding: isMobile ? "0 20px" : "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? 64 : 80 }}>
          {/* Logo */}
          <div
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/logo/logowithoutbg.png"
              alt="Chitransh Creation Logo"
              style={{
                height: isMobile ? 40 : 55,
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          {/* Desktop links */}
          {isDesktop && (
            <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
              {NAV_LINKS.map(l => (
                <button key={l} onClick={() => scrollTo(l)} style={{
                  background: "none", border: "none", cursor: "pointer", padding: "4px 0",
                  color: activeNav === l ? T.accent : scrolled ? T.slate : "rgba(255,255,255,0.85)",
                  fontSize: 13, fontWeight: activeNav === l ? 700 : 400, letterSpacing: 0.5,
                  borderBottom: activeNav === l ? `2px solid ${T.accent}` : "2px solid transparent",
                  transition: "color 0.2s",
                }}>{l}</button>
              ))}
              <button onClick={() => scrollTo("Contact")} style={{
                background: T.accent, color: "#fff", border: "none",
                padding: "10px 22px", fontSize: 13, fontWeight: 600,
                borderRadius: 6, cursor: "pointer", letterSpacing: 0.5,
                boxShadow: `0 4px 14px #bb2b2b)`,
              }}>Let's Connect</button>
            </div>
          )}

          {/* Hamburger */}
          {!isDesktop && (
            <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
              {menuOpen
                ? [0, 1].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: T.navy, borderRadius: 2, transform: i === 0 ? "rotate(45deg) translate(5px,5px)" : "rotate(-45deg) translate(5px,-5px)", transition: "transform 0.25s" }} />)
                : [0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: scrolled ? T.navy : "#fff", borderRadius: 2 }} />)
              }
            </button>
          )}
        </div>

        {/* Mobile dropdown */}
        {!isDesktop && menuOpen && (
          <div style={{ background: "rgba(255,252,248,0.98)", borderTop: `1px solid ${T.border}`, paddingBottom: 12 }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)} style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none", cursor: "pointer",
                color: activeNav === l ? T.accent : T.slate,
                fontSize: 15, fontWeight: activeNav === l ? 700 : 400,
                padding: "13px 24px",
                borderLeft: activeNav === l ? `3px solid ${T.accent}` : "3px solid transparent",
              }}>{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh", width: "100%",
        background: `linear-gradient(135deg, ${T.navy} 0%, #2C3E50 55%, #3D2B1F 100%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: isMobile ? "90px 24px 60px" : "100px 64px 80px",
        position: "relative", overflow: "hidden", boxSizing: "border-box",
      }}>
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.3,
          }}
        >
          <source src="/video/backgroundvideo.mp4" type="video/mp4" />
        </video>
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: isMobile ? 280 : 500, height: isMobile ? 280 : 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,86,58,0.18) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: isMobile ? 240 : 420, height: isMobile ? 240 : 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,158,221,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
        {/* Diagonal accents */}
        <div style={{ position: "absolute", top: 0, right: 0, width: isMobile ? "40%" : "28%", height: isMobile ? "28%" : "38%", background: `linear-gradient(135deg, ${T.accent} 0%, #C44A30 100%)`, clipPath: "polygon(100% 0, 100% 100%, 0 0)", opacity: 0.7, pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: isMobile ? "22%" : "15%", height: isMobile ? "14%" : "20%", background: T.accent, clipPath: "polygon(0 100%, 100% 100%, 0 0)", opacity: 0.4, pointerEvents: "none", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 760, width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,86,58,0.15)", border: "1px solid rgba(232,86,58,0.3)", borderRadius: 20, padding: "6px 18px", marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent, display: "inline-block" }} />
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, letterSpacing: 2 }}>Est. 2023 · Kathmandu, Nepal</span>
          </div>
          <h1 style={{ color: "#bb2b2b", fontSize: isMobile ? 44 : isTablet ? 68 : 90, fontWeight: 900, lineHeight: 1.0, marginBottom: 14, letterSpacing: -2,}}>
            Fuelling Brands <br />
            <span style={{ color: "#fff" }}>Through Film</span>
          </h1>
          {/* <p style={{ color: "rgba(255,255,255,0.45)", fontSize: isMobile ? 11 : 13, letterSpacing: 5, textTransform: "uppercase", marginBottom: 28 }}>
            Fuelling Brands Through Film
          </p> */}
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: isMobile ? 15 : 18, maxWidth: 560, margin: "0 auto 44px", lineHeight: 1.75, fontWeight: 300 }}>
            We transform ideas into compelling audio-visual experiences that inspire, connect, and elevate brands — with storytelling at the heart of everything we do.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Projects")} style={{ background: T.accent, color: "#fff", border: "none", padding: isMobile ? "13px 28px" : "15px 36px", fontSize: 14, fontWeight: 700, borderRadius: 8, cursor: "pointer", letterSpacing: 0.5, boxShadow: "0 8px 24px rgba(232,86,58,0.35)" }}>View Our Work</button>
            <button onClick={() => scrollTo("Contact")} style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", padding: isMobile ? "13px 28px" : "15px 36px", fontSize: 14, fontWeight: 400, borderRadius: 8, cursor: "pointer", backdropFilter: "blur(4px)" }}>Get In Touch</button>
          </div>
        </div>
        {!isMobile && (
          <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2, textAlign: "center" }}>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)", margin: "0 auto 8px" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 4 }}>SCROLL</span>
          </div>
        )}
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════════════════════ */}
      <section ref={el => sectionsRef.current["About"] = el} style={{ padding: sp, background: T.bg, width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: isDesktop ? 80 : 48, alignItems: "center" }}>
          <div>
            <p style={{ color: T.accent, fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>About Us</p>
            <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 800, lineHeight: 1.15, marginBottom: 20, color: T.navy, letterSpacing: -0.5 }}>
              A Dynamic Leader in<br />Audio-Visual Production
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: T.slate, marginBottom: 18 }}>
              Chitransh Creation is a fast-emerging audio-visual production company established in 2023. We specialize in high-quality video production including animation, motion graphics, and photography — transforming creative ideas into compelling narratives that resonate deeply with audiences.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: T.slate, marginBottom: 32 }}>
              Despite being a young company, we have rapidly earned the trust of both national and international clients by consistently delivering exceptional results driven by creativity, precision, and strategic insight.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Creativity", "Precision", "Impact", "Innovation"].map(tag => (
                <span key={tag} style={{ background: T.accentSoft, color: T.accent, fontSize: 12, fontWeight: 600, letterSpacing: 1, padding: "7px 18px", borderRadius: 20, border: "1px solid rgba(232,86,58,0.2)" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Stat cards — colored left border preserved */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Founded", value: "2023", sub: "Kathmandu, Nepal", icon: "📅" },
              { label: "Clients", value: "National & Int'l", sub: "Across sectors", icon: "🤝" },
              { label: "Services", value: "4 Core Areas", sub: "AV · Design · Photo · IT", icon: "⚡" },
              { label: "Mission", value: "Film-First", sub: "Fuelling brands", icon: "🎯" },
            ].map(s => (
              <div key={s.label} style={{
                background: T.bgCard,
                border: `1px solid ${T.borderCard}`,
                borderLeft: `3px solid ${T.accent}`,   /* ← coloured left border kept */
                borderRadius: 12,
                padding: "24px 20px",
                boxShadow: "0 2px 12px rgba(30,42,58,0.06)",
              }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
                <p style={{ fontSize: 11, color: T.slateLight, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</p>
                <p style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, color: T.navy, marginBottom: 4 }}>{s.value}</p>
                <p style={{ fontSize: 12, color: T.slateLight }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VISION + MISSION ═════════════════════════════════════════════════ */}
      <section style={{ background: T.bgDark, padding: sp, width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: isDesktop ? 64 : 44 }}>
          {[
            { label: "Our Vision", title: "A globally recognized creative powerhouse", body: "To redefine visual storytelling by seamlessly blending innovation, artistry, and cutting-edge technology — crafting narratives that transcend boundaries, spark imagination, and leave a lasting impression.", icon: "🌍" },
            { label: "Our Mission", title: "Fuelling Brands Through Film", body: "We specialize in creating high-quality films, animations, and digital content that bring brand stories to life with clarity, creativity, and emotional depth — fueling growth through impactful films.", icon: "🎬" },
          ].map((v, i) => (
            <div key={i} style={{ background: T.bgDarkAlt, borderRadius: 16, padding: isMobile ? "28px 24px" : "40px 36px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{v.icon}</div>
              <p style={{ color: T.accent, fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>{v.label}</p>
              <h3 style={{ color: "#fff", fontSize: isMobile ? 20 : 24, fontWeight: 700, marginBottom: 14, lineHeight: 1.3 }}>{v.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.9 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════════════════════════ */}
      <section ref={el => sectionsRef.current["Services"] = el} style={{ padding: sp, background: T.bgAlt, width: "100%", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
          <p style={{ color: T.accent, fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>What We Do</p>
          <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 800, letterSpacing: -0.5, marginBottom: 16, color: T.navy }}>Our Services</h2>
          <div style={{ width: 48, height: 3, background: T.accent, borderRadius: 2, margin: "0 auto" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ background: T.bgCard, borderRadius: 16, padding: isMobile ? "28px 22px" : "36px 32px", border: `1px solid ${T.borderCard}`, boxShadow: "0 2px 16px rgba(30,42,58,0.06)", position: "relative", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(30,42,58,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(30,42,58,0.06)"; }}
            >
              {s.badge && (
                <div style={{ position: "absolute", top: 18, right: 18, background: "#EAFAF1", color: "#1E8449", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(46,204,113,0.25)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.green, display: "inline-block" }} />
                  {s.badge}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div style={{ width: 52, height: 52, background: T.accentSoft, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{s.icon}</div>

                <h3 style={{ fontSize: 18, fontWeight: 700, color: T.navy, margin: 0 }}>{s.title}</h3>
              </div>
              <div style={{ width: 36, height: 3, background: T.accent, borderRadius: 2, marginBottom: 16 }} />
              <p style={{ fontSize: 13, color: T.slate, lineHeight: 1.85, marginBottom: 20 }}>{s.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                {s.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 13, color: T.slate, padding: "7px 0", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ width: 6, height: 6, background: T.accent, borderRadius: "50%", flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              {s.badge && (
                <div style={{ marginTop: 20, padding: "14px 16px", background: "#F0FAF4", borderRadius: 10, border: "1px solid rgba(46,204,113,0.2)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>🏢</span>
                  <p style={{ fontSize: 12, color: "#3A7A55", lineHeight: 1.7, margin: 0 }}>Our dedicated IT office is fully operational in Baneshwor, Kathmandu — consistently delivering for national and international clients including Microsoft partners, educational institutions, and enterprise brands.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section ref={el => sectionsRef.current["Projects"] = el} style={{ padding: sp, background: T.bg, width: "100%", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
          <p style={{ color: T.accent, fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Portfolio</p>
          <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 800, letterSpacing: -0.5, color: T.navy, marginBottom: 16 }}>Our Projects</h2>
          <div style={{ width: 48, height: 3, background: T.accent, borderRadius: 2, margin: "0 auto" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{
              background: p.isIT ? "#F0F7FF" : T.bgCard,
              border: p.isIT ? `1.5px solid rgba(74,158,221,0.3)` : `1px solid ${T.borderCard}`,
              borderRadius: 14, padding: "24px 22px", display: "flex", flexDirection: "column",
              boxShadow: "0 2px 12px rgba(30,42,58,0.05)", transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(30,42,58,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(30,42,58,0.05)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, padding: "4px 12px", borderRadius: 20, background: TAG_COLORS[p.tag]?.bg || "#f0f0f0", color: TAG_COLORS[p.tag]?.text || "#555" }}>{p.tag}</span>
                {p.isIT && (
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, padding: "4px 10px", borderRadius: 20, background: "#EAFAF1", color: "#1E8449", border: "1px solid rgba(46,204,113,0.25)", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.green, display: "inline-block" }} />
                    Live & Maintained
                  </span>
                )}
              </div>
              {/* Client logo */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                <div style={{
                  width: 80, height: 80,
                  borderRadius: 18,
                  background: `radial-gradient(circle, #ffffff 55%, ${p.isIT ? "#F0F7FF" : T.bgAlt} 100%)`,
                  border: `1px solid ${T.borderCard}`,
                  boxShadow: "0 2px 16px rgba(30,42,58,0.09)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 10, overflow: "hidden",
                }}>
                  <img
                    src={p.logo}
                    alt={p.client}
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
              </div>
              <h3 style={{ color: T.navy, fontSize: 16, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>{p.client}</h3>
              <p style={{ color: p.isIT ? T.blue : T.accent, fontSize: 12, fontWeight: 600, marginBottom: 10, textAlign: "center" }}>{p.sub}</p>
              <p style={{ color: T.slate, fontSize: 13, lineHeight: 1.75, flex: 1, marginBottom: 18 }}>{p.desc}</p>
              <a href={p.url.startsWith("http") ? p.url : `https://${p.url}`} target="_blank" rel="noopener noreferrer"
                style={{ color: p.isIT ? T.blue : T.accent, fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", borderTop: `1px solid ${T.border}`, paddingTop: 12, marginTop: "auto", fontWeight: 600, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <span>{p.isIT ? p.url : p.type}</span>
                <span style={{ marginLeft: "auto" }}>→ {p.isIT ? "Visit Site" : "View"}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TEAM ═════════════════════════════════════════════════════════════ */}
      <section ref={el => sectionsRef.current["Team"] = el} style={{ padding: sp, background: T.bgAlt, width: "100%", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
          <p style={{ color: T.accent, fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>The People</p>
          <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 800, letterSpacing: -0.5, marginBottom: 16, color: T.navy }}>Meet Our Team</h2>
          <div style={{ width: 48, height: 3, background: T.accent, borderRadius: 2, margin: "0 auto" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {TEAM.map((m, i) => (
            <div key={i} style={{ background: T.bgCard, borderRadius: 14, overflow: "hidden", border: `1px solid ${T.borderCard}`, boxShadow: "0 4px 16px rgba(30,42,58,0.07)", transition: "transform 0.3s, box-shadow 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 44px rgba(30,42,58,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(30,42,58,0.07)"; }}
            >
              <div style={{ height: isMobile ? 240 : 300, overflow: "hidden" }}>
                <img src={m.image} alt={`${m.name} - ${m.role}`} loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "24px" }}>
                <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: T.navy }}>{m.name}</h3>
                <p style={{ color: T.accent, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>{m.role}</p>
                <p style={{ color: T.slate, fontSize: 13, lineHeight: 1.8, margin: 0 }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════════════════════════ */}
      <section ref={el => sectionsRef.current["Contact"] = el} style={{ background: T.bgDark, padding: sp, width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: isDesktop ? 80 : 52, alignItems: "start" }}>

          {/* Left */}
          <div>
            <p style={{ color: T.accent, fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>Get In Touch</p>
            <h2 style={{ color: "#fff", fontSize: isMobile ? 26 : 40, fontWeight: 800, letterSpacing: -0.5, marginBottom: 20, lineHeight: 1.2 }}>
              Let's Create Something<br /><span style={{ color: T.accent }}>Powerful Together</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.9, marginBottom: 40 }}>
              We believe in collaboration, innovation, and excellence. Your vision is our inspiration, and your success is our priority.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {/* Phone */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 40, height: 40, background: "rgba(232,86,58,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📞</div>
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[{ display: "+977-9861330778", number: "9779861330778" }].map(ph => (
                      <a key={ph.number} href={`https://wa.me/${ph.number}`} target="_blank" rel="noopener noreferrer"
                        style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = T.green}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                      >
                        {ph.display}
                        <span style={{ fontSize: 10, background: "rgba(46,204,113,0.12)", color: T.green, border: "1px solid rgba(46,204,113,0.25)", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>WhatsApp</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginTop: 14 }}>
                <div style={{ width: 40, height: 40, background: "rgba(232,86,58,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>✉️</div>
                <div>
                  <a href="mailto:creationchitransh8@gmail.com" style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = T.accent}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  >creationchitransh8@gmail.com</a>
                </div>
              </div>



              {/* Address */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginTop: 14 }}>
                <div style={{ width: 40, height: 40, background: "rgba(232,86,58,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📍</div>
                <div>
                  <a href="https://maps.google.com/maps/search/Chandragiri%20Marga%2C%20Old%20Baneshwor%2C%2044600%20Kathmandu%2C%20Nepal/@28.7045,80.5663,17z?hl=en" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none", lineHeight: 1.7, transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = T.accent}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  >Chandragiri Marg, Baneshwor,<br />Kathmandu, Nepal ↗</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div style={{ background: T.bgDarkAlt, borderRadius: 16, padding: isMobile ? "28px 22px" : "40px 36px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 28 }}>Send Us a Message</h3>
            {formStatus === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <h4 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Message Sent!</h4>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>Thank you for reaching out. The Chitransh Creation team will get back to you shortly.</p>
                <button onClick={() => setFormStatus("idle")} style={{ background: "transparent", color: T.accent, border: `1px solid rgba(232,86,58,0.4)`, padding: "10px 24px", fontSize: 13, cursor: "pointer", borderRadius: 8, fontWeight: 600 }}>Send Another Message</button>
              </div>
            ) : (
              <>
                {[
                  { label: "Your Name", name: "name", type: "text", placeholder: "Full name" },
                  { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Subject", name: "subject", type: "text", placeholder: "Project type or topic" },
                ].map(f => (
                  <div key={f.name} style={{ marginBottom: 18 }}>
                    <label style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 7 }}>{f.label}</label>
                    <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleFormChange} placeholder={f.placeholder} disabled={formStatus === "loading"}
                      style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", opacity: formStatus === "loading" ? 0.6 : 1 }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: formError ? 12 : 24 }}>
                  <label style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 7 }}>Message</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleFormChange} placeholder="Tell us about your project..." disabled={formStatus === "loading"}
                    style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", opacity: formStatus === "loading" ? 0.6 : 1 }}
                  />
                </div>
                {formError && (
                  <div style={{ marginBottom: 16, padding: "11px 14px", background: "rgba(232,86,58,0.12)", border: "1px solid rgba(232,86,58,0.3)", borderRadius: 8, color: T.accentMid, fontSize: 13 }}>⚠ {formError}</div>
                )}
                <button onClick={handleSubmit} disabled={formStatus === "loading"}
                  style={{ width: "100%", background: formStatus === "loading" ? "#9E3A25" : T.accent, color: "#fff", border: "none", padding: "14px 0", fontSize: 14, fontWeight: 700, letterSpacing: 0.5, cursor: formStatus === "loading" ? "not-allowed" : "pointer", borderRadius: 8, transition: "background 0.2s", boxShadow: "0 6px 20px rgba(232,86,58,0.3)" }}
                >{formStatus === "loading" ? "Sending…" : "Send Message →"}</button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#131D28", padding: isMobile ? "24px 24px" : "28px 64px", borderTop: "1px solid rgba(255,255,255,0.06)", width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 10 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 18, height: 18, background: T.accent, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: isMobile ? 11 : 13 }}>Chitransh Creation Pvt. Ltd. · Reg. No. 321002/080/081</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 12 }}>© 2025 Chitransh Creation. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}
