import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Services", "Projects", "Team", "Contact"];

const SERVICES = [
  {
    icon: "🎬",
    title: "Audio-Visual Services",
    desc: "Film production, animation, motion graphics, and digital content crafted to communicate clearly, engage audiences, and strengthen brand impact.",
    items: ["Advertisement & TVC", "Video Documentary", "Music Videos", "Animated Video (2D/3D)", "Short Videos", "Radio/TV PSAs", "Wedding & Event Coverage"],
  },
  {
    icon: "🎨",
    title: "Printing & Designing",
    desc: "Creative design and high-quality printing that bring brands to life with visually appealing and impactful results.",
    items: ["IEC/BCC Material", "Graphic & Design", "UI/UX Designing", "Illustrator"],
  },
  {
    icon: "📷",
    title: "Photography",
    desc: "Capturing moments with creativity and precision, delivering high-quality images that tell stories and leave a lasting visual impact.",
    items: ["Commercial Photography", "Portrait Photography", "Product Photography", "Wedding Photography", "Event Photography", "Fashion Photography", "Documentary Photography"],
  },
  {
    icon: "💻",
    title: "IT Services",
    desc: "From web development to digital strategy, our in-office IT team delivers end-to-end technology solutions — actively supporting national and international clients with consistent, results-driven execution.",
    items: ["Website Design & Development", "Social Media Management", "Digital Marketing & SEO", "Software & ERP Documentation", "Tech Client Support", "Content Strategy", "Online Brand Management"],
    badge: "Office Ready",
  },
];

const PROJECTS = [
  { client: "PaceX Sports", sub: "Official IT Partner", type: "Web & IT Management", desc: "Chitransh Creation is the official IT partner of PaceX Sports — actively developing, maintaining, and managing their digital platform to power Nepal's growing sports community.", url: "https://pacexsports.com.np", tag: "IT Project", isIT: true },
  { client: "Agile Solution", sub: "Microsoft Partner in Nepal", type: "Event Coverage", desc: "Comprehensive video and photo coverage for AGIL Solution 2025 — capturing key moments, speaker highlights, and authentic interactions.", url: "https://www.linkedin.com/posts/agileerp_businesscentral-microsoftdynamics365-agilesolutions-activity-7318538156323000320-4721", tag: "Corporate" },
  { client: "Swaraj Tractor", sub: "Customer Testimonials", type: "Testimonial Videos", desc: "Four authentic testimonial videos showcasing real customer experiences with Swaraj Tractor across Nepal in 2025.", url: "https://www.facebook.com/reel/1702587773974869", tag: "Brand Film" },
  { client: "Huawei Nepal", sub: "Digital Education", type: "Documentary", desc: "A refined video documentary elegantly showcasing the impact and transformative benefits of digital education.", url: "https://blog.huawei.com/admin/asset/v1/pro/view/4-fa85a68997442309c8e10d3f975268d.mp4", tag: "Documentary" },
  { client: "Support Nepal", sub: "Journey Toward Inclusion", type: "Social Documentary", desc: "A compelling documentary narrating the inspiring journey toward inclusion of Support Nepal, capturing its vision and lasting contribution.", url: "https://www.youtube.com/watch?v=1SlTFpduQ1s", tag: "Documentary" },
  { client: "Model Multiple College", sub: "Janakpur", type: "Audio Production", desc: "Produced an audiobook titled \"Khushi\" — the inspiring biography of Birendra Sah Sir, brought to life through expressive narration.", url: "https://www.youtube.com/watch?v=2lL8m98hjvk", tag: "Audiobook" },
  { client: "\"Khushi\" Short Movie", sub: "NIFF 2025 Selection", type: "Narrative Film", desc: "Produced the acclaimed short film \"Khushi,\" directed by Pradhumna Mishra and officially selected for NIFF 2025.", url: "https://youtu.be/ZDD5_Pw-Fn4", tag: "Narrative Film" },
];

const TEAM = [
  {
    name: "Atul Karn",
    role: "Chief Executive Officer",
    image: "/team/atul.jpg",
    desc: "Sets the overall vision, strategy, and direction of Chitransh Creation. Leads organizational growth and represents the company in key partnerships."
  },
  {
    name: "Bikal Bhandari",
    role: "Managing Director",
    image: "/team/bikalbhandari.jpg",
    desc: "Oversees day-to-day business operations, drives performance, and ensures projects, clients, and teams operate smoothly."
  },
  {
    name: "CA Mohan Budhathoki",
    role: "Chief Financial Officer",
    image: "/team/mohan.jpg",
    desc: "Oversees financial planning, budgeting, accounting, and compliance. Ensures financial stability and provides strategic insights."
  },
  {
    name: "Jatin Gurung",
    role: "Chief Operations Officer",
    image: "/team/jatin.jpg",
    desc: "Manages internal operations, workflows, and project delivery. Focuses on improving efficiency and maintaining quality standards."
  }
];

const TAG_COLORS = {
  "IT Project": { bg: "#e8f4ff", text: "#0a3d6b" },
  "Corporate": { bg: "#fff0f0", text: "#8B1E1E" },
  "Brand Film": { bg: "#fff8e6", text: "#7a4a00" },
  "Documentary": { bg: "#e6f0ff", text: "#1a3a6b" },
  "Audiobook": { bg: "#e6ffe6", text: "#1a4a1a" },
  "Narrative Film": { bg: "#f3e6ff", text: "#4a1a6b" },
  "Social Documentary": { bg: "#e6f0ff", text: "#1a3a6b" },
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
  const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success | error
  const [formError, setFormError] = useState("");

  const handleFormChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

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
        body: JSON.stringify({ name: formData.name, email: formData.email, subject: formData.subject, message: formData.message }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setFormError(data?.errors?.[0]?.message || "Something went wrong. Please try again.");
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const id of NAV_LINKS) {
        const el = sectionsRef.current[id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) setActiveNav(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => { if (isDesktop) setMenuOpen(false); }, [isDesktop]);

  const scrollTo = (id) => {
    sectionsRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const px = isMobile ? "5%" : "6%";
  const sectionPad = isMobile ? "64px 5%" : isTablet ? "80px 6%" : "100px 6%";

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#faf9f7", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || menuOpen ? "rgba(10,10,10,0.98)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}>
        <div style={{ padding: `0 ${px}`, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div style={{ width: 28, height: 28, background: "#c0392b", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: isMobile ? 14 : 16, letterSpacing: 1 }}>CHITRANSH</span>
              <span style={{ color: "#c0392b", fontWeight: 400, fontSize: 9, letterSpacing: 3 }}>CREATION</span>
            </div>
          </div>

          {/* Desktop nav links */}
          {isDesktop && (
            <div style={{ display: "flex", gap: 32 }}>
              {NAV_LINKS.map(l => (
                <button key={l} onClick={() => scrollTo(l)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: activeNav === l ? "#c0392b" : "rgba(255,255,255,0.7)",
                  fontSize: 13, fontWeight: activeNav === l ? 600 : 400,
                  letterSpacing: 0.5, padding: 0,
                  borderBottom: activeNav === l ? "2px solid #c0392b" : "2px solid transparent",
                  paddingBottom: 2, transition: "color 0.2s",
                }}>{l}</button>
              ))}
            </div>
          )}

          {/* Hamburger */}
          {!isDesktop && (
            <button onClick={() => setMenuOpen(o => !o)} style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: 5, padding: 8,
            }} aria-label="Toggle menu">
              {menuOpen
                ? [0, 1].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transform: i === 0 ? "rotate(45deg) translate(5px,5px)" : "rotate(-45deg) translate(5px,-5px)", transition: "transform 0.25s" }} />)
                : [0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 }} />)
              }
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {!isDesktop && menuOpen && (
          <div style={{ background: "rgba(10,10,10,0.98)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "8px 0 16px" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)} style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none", cursor: "pointer",
                color: activeNav === l ? "#c0392b" : "rgba(255,255,255,0.75)",
                fontSize: 15, fontWeight: activeNav === l ? 600 : 400,
                padding: "12px 6%", letterSpacing: 0.5,
                borderLeft: activeNav === l ? "3px solid #c0392b" : "3px solid transparent",
              }}>{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0d0d0d 0%, #1a0808 50%, #0d0d0d 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: `80px ${px} 60px`, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: isMobile ? "50%" : "35%", height: isMobile ? "30%" : "45%", background: "linear-gradient(135deg, #c0392b 0%, #7b1313 100%)", clipPath: "polygon(100% 0, 100% 100%, 0 0)", opacity: 0.85 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: isMobile ? "28%" : "20%", height: isMobile ? "18%" : "25%", background: "#c0392b", clipPath: "polygon(0 100%, 100% 100%, 0 0)", opacity: 0.6 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 700, width: "100%" }}>
          <p style={{ color: "#c0392b", fontSize: 11, letterSpacing: 4, fontWeight: 600, textTransform: "uppercase", marginBottom: 20 }}>Est. 2023 · Kathmandu, Nepal</p>
          <h1 style={{ color: "#fff", fontSize: isMobile ? 42 : isTablet ? 64 : 88, fontWeight: 800, lineHeight: 1.05, marginBottom: 12, letterSpacing: -1 }}>
            CHITRANSH<br /><span style={{ color: "#c0392b" }}>CREATION</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: isMobile ? 10 : 13, letterSpacing: isMobile ? 4 : 6, textTransform: "uppercase", marginBottom: 28, fontWeight: 400 }}>Fuelling Brands Through Film</p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: isMobile ? 15 : 17, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.75, fontWeight: 300 }}>
            We transform ideas into compelling audio-visual experiences that inspire, connect, and elevate brands.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Projects")} style={{ background: "#c0392b", color: "#fff", border: "none", padding: isMobile ? "13px 28px" : "14px 36px", fontSize: 13, fontWeight: 600, letterSpacing: 1, cursor: "pointer", borderRadius: 2 }}>View Our Work</button>
            <button onClick={() => scrollTo("Contact")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: isMobile ? "13px 28px" : "14px 36px", fontSize: 13, fontWeight: 400, letterSpacing: 1, cursor: "pointer", borderRadius: 2 }}>Get In Touch</button>
          </div>
        </div>
        {!isMobile && (
          <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2, textAlign: "center" }}>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)", margin: "0 auto 8px" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 3 }}>SCROLL</span>
          </div>
        )}
      </section>

      {/* ── ABOUT ── */}
      <section ref={el => sectionsRef.current["About"] = el} style={{ padding: sectionPad, background: "#faf9f7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: isDesktop ? 80 : 48, alignItems: "center" }}>
          <div>
            <p style={{ color: "#c0392b", fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>About Us</p>
            <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: -0.5 }}>
              A Dynamic Leader in Audio-Visual Production
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#555", marginBottom: 18 }}>
              Chitransh Creation is a fast-emerging audio-visual production company established in 2023. We specialize in high-quality video production including animation, motion graphics, and photography — transforming creative ideas into compelling narratives that resonate deeply with audiences.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#555", marginBottom: 32 }}>
              Despite being a young company, we have rapidly earned the trust of both national and international clients by consistently delivering exceptional results driven by creativity, precision, and strategic insight.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Creativity", "Precision", "Impact"].map(tag => (
                <span key={tag} style={{ background: "#fff0f0", color: "#8B1E1E", fontSize: 12, fontWeight: 600, letterSpacing: 1, padding: "6px 16px", borderRadius: 2, border: "1px solid rgba(192,57,43,0.2)" }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { label: "Founded", value: "2023", sub: "Kathmandu, Nepal" },
              { label: "Clients", value: "National & Int'l", sub: "Across sectors" },
              { label: "Services", value: "4 Core Areas", sub: "AV · Design · Photo · IT" },
              { label: "Mission", value: "Film-First", sub: "Fuelling brands" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid #f0ece6", borderRadius: 4, padding: "24px 20px", borderLeft: "3px solid #c0392b" }}>
                <p style={{ fontSize: 11, color: "#999", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{s.label}</p>
                <p style={{ fontSize: isMobile ? 16 : 19, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{s.value}</p>
                <p style={{ fontSize: 12, color: "#bbb" }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION + MISSION ── */}
      <section style={{ background: "#0d0d0d", padding: sectionPad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: isDesktop ? 60 : 44 }}>
          {[
            { label: "Our Vision", title: "A globally recognized creative powerhouse", body: "To redefine visual storytelling by seamlessly blending innovation, artistry, and cutting-edge technology — crafting narratives that transcend boundaries, spark imagination, and leave a lasting impression." },
            { label: "Our Mission", title: "Fuelling Brands Through Film", body: "We specialize in creating high-quality films, animations, and digital content that bring brand stories to life with clarity, creativity, and emotional depth — fueling growth through impactful films." },
          ].map(v => (
            <div key={v.label}>
              <p style={{ color: "#c0392b", fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>{v.label}</p>
              <h3 style={{ color: "#fff", fontSize: isMobile ? 20 : 24, fontWeight: 700, marginBottom: 14, lineHeight: 1.3 }}>{v.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.85 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section ref={el => sectionsRef.current["Services"] = el} style={{ padding: sectionPad, background: "#faf9f7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
            <p style={{ color: "#c0392b", fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>What We Do</p>
            <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 800, letterSpacing: -0.5, marginBottom: 16 }}>Our Services</h2>
            <div style={{ width: 48, height: 3, background: "#c0392b", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr", gap: 22 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{
                background: "#fff",
                border: s.badge ? "1.5px solid rgba(192,57,43,0.3)" : "1px solid #f0ece6",
                borderRadius: 4, padding: isMobile ? "28px 22px" : "36px 32px",
                position: "relative", transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(192,57,43,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {s.badge && (
                  <div style={{ position: "absolute", top: 16, right: 16, background: "#fff0f0", color: "#8B1E1E", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 10px", borderRadius: 2, border: "1px solid rgba(192,57,43,0.2)", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2ecc71", display: "inline-block" }} />
                    {s.badge}
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                  <div style={{ fontSize: 32 }}>{s.icon}</div>
                  <div style={{ width: 28, height: 3, background: "#c0392b" }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.8, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 0 }}>
                  {s.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 13, color: "#555", padding: "6px 0", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #f5f0eb" }}>
                      <span style={{ width: 5, height: 5, background: "#c0392b", borderRadius: "50%", flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
                {s.badge && (
                  <div style={{ marginTop: 20, padding: "12px 16px", background: "#fdf7f7", borderRadius: 3, border: "1px solid rgba(192,57,43,0.1)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>🏢</span>
                    <p style={{ fontSize: 12, color: "#888", lineHeight: 1.7, margin: 0 }}>Our dedicated IT office is fully operational in Baneshwor, Kathmandu — consistently delivering projects for national and international clients including Microsoft partners, educational institutions, and enterprise brands.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section ref={el => sectionsRef.current["Projects"] = el} style={{ padding: sectionPad, background: "#111" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
            <p style={{ color: "#c0392b", fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Portfolio</p>
            <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 800, letterSpacing: -0.5, color: "#fff", marginBottom: 16 }}>Our Projects</h2>
            <div style={{ width: 48, height: 3, background: "#c0392b", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 18 }}>
            {PROJECTS.map((p, i) => (
              <div key={i} style={{ background: p.isIT ? "#0d1a2a" : "#1a1a1a", border: p.isIT ? "1px solid rgba(30,120,220,0.25)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "24px 22px", display: "flex", flexDirection: "column", transition: "border-color 0.2s, background 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.isIT ? "rgba(30,120,220,0.55)" : "rgba(192,57,43,0.5)"; e.currentTarget.style.background = p.isIT ? "#0a1520" : "#200e0e"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = p.isIT ? "rgba(30,120,220,0.25)" : "rgba(255,255,255,0.07)"; e.currentTarget.style.background = p.isIT ? "#0d1a2a" : "#1a1a1a"; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, padding: "4px 10px", borderRadius: 2, background: TAG_COLORS[p.tag]?.bg || "#222", color: TAG_COLORS[p.tag]?.text || "#ccc" }}>{p.tag}</span>
                  {p.isIT && (
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "4px 10px", borderRadius: 2, background: "rgba(46,204,113,0.12)", color: "#2ecc71", border: "1px solid rgba(46,204,113,0.25)", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2ecc71", display: "inline-block" }} />
                      Live & Maintained
                    </span>
                  )}
                </div>
                <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{p.client}</h3>
                <p style={{ color: p.isIT ? "#4a9edd" : "#c0392b", fontSize: 12, fontWeight: 500, marginBottom: 10, letterSpacing: 0.5 }}>{p.sub}</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7, flex: 1, marginBottom: 18 }}>{p.desc}</p>
                <a href={p.url.startsWith("http") ? p.url : `https://${p.url}`} target="_blank" rel="noopener noreferrer" style={{ color: p.isIT ? "rgba(74,158,221,0.6)" : "rgba(255,255,255,0.35)", fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", borderTop: `1px solid ${p.isIT ? "rgba(30,120,220,0.15)" : "rgba(255,255,255,0.07)"}`, paddingTop: 12, marginTop: "auto", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = p.isIT ? "#4a9edd" : "#c0392b"}
                  onMouseLeave={e => e.currentTarget.style.color = p.isIT ? "rgba(74,158,221,0.6)" : "rgba(255,255,255,0.35)"}
                >
                  <span>{p.isIT ? p.url : p.type}</span>
                  <span style={{ marginLeft: "auto" }}>→ {p.isIT ? "Visit Site" : "View"}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      {/* <section ref={el => sectionsRef.current["Team"] = el} style={{ padding: sectionPad, background: "#faf9f7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
            <p style={{ color: "#c0392b", fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>The People</p>
            <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 800, letterSpacing: -0.5, marginBottom: 16 }}>Meet Our Team</h2>
            <div style={{ width: 48, height: 3, background: "#c0392b", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 14 : 20 }}>
            {TEAM.map((m, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #f0ece6", borderRadius: 4, overflow: "hidden", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ background: m.color, padding: "28px 0", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                  <div style={{ width: isMobile ? 56 : 68, height: isMobile ? 56 : 68, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#fff", border: "2px solid rgba(255,255,255,0.3)" }}>{m.initials}</div>
                  <div style={{ position: "absolute", bottom: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 20px 20px", borderColor: "transparent transparent #faf9f7 transparent" }} />
                </div>
                <div style={{ padding: isMobile ? "14px 14px 18px" : "18px 18px 22px" }}>
                  <h3 style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ fontSize: 10, color: "#c0392b", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>{m.role}</p>
                  {!isMobile && <p style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>{m.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns:
            isMobile
              ? "1fr"
              : isTablet
                ? "1fr 1fr"
                : "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 24
        }}
      >
        {TEAM.map((m, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid #eee",
              boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
              transition: "all .3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0,0,0,0.05)";
            }}
          >
            <div
              style={{
                height: isMobile ? 240 : 300,
                overflow: "hidden"
              }}
            >
              <img
                src={m.image}
                alt={m.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </div>

            <div
              style={{
                padding: "24px"
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: 8,
                  fontSize: 18,
                  fontWeight: 700
                }}
              >
                {m.name}
              </h3>

              <p
                style={{
                  color: "#c0392b",
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 15
                }}
              >
                {m.role}
              </p>

              <div
                style={{
                  width: 40,
                  height: 3,
                  background: "#c0392b",
                  marginBottom: 15
                }}
              />

              <p
                style={{
                  color: "#666",
                  fontSize: 13,
                  lineHeight: 1.8,
                  margin: 0
                }}
              >
                {m.desc}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      <section 
        ref={el => sectionsRef.current["Team"] = el} 
        style={{ padding: sectionPad, background: "#faf9f7" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
            <p style={{ color: "#c0392b", fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>The People</p>
            <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 800, letterSpacing: -0.5, marginBottom: 16 }}>Meet Our Team</h2>
            <div style={{ width: 48, height: 3, background: "#c0392b", margin: "0 auto" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24
          }}>
            {TEAM.map((m, i) => (
              <div key={i} style={{
                background: "#fff",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid #eee",
                boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                transition: "all .3s ease"
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.05)";
                }}
              >
                <div style={{ height: isMobile ? 240 : 300, overflow: "hidden" }}>
                  <img
                    src={m.image}
                    alt={`${m.name} - ${m.role}`}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>{m.name}</h3>
                  <p style={{ color: "#c0392b", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 15 }}>
                    {m.role}
                  </p>
                  <div style={{ width: 40, height: 3, background: "#c0392b", marginBottom: 15 }} />
                  <p style={{ color: "#666", fontSize: 13, lineHeight: 1.8, margin: 0 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section ref={el => sectionsRef.current["Contact"] = el} style={{ background: "#0d0d0d", padding: sectionPad }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: isDesktop ? 80 : 52, alignItems: "start" }}>
          <div>
            <p style={{ color: "#c0392b", fontSize: 11, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>Get In Touch</p>
            <h2 style={{ color: "#fff", fontSize: isMobile ? 26 : 38, fontWeight: 800, letterSpacing: -0.5, marginBottom: 20, lineHeight: 1.2 }}>
              Let's Create Something<br /><span style={{ color: "#c0392b" }}>Powerful Together</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.85, marginBottom: 36 }}>
              We believe in collaboration, innovation, and excellence. Your vision is our inspiration, and your success is our priority.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>

              {/* Phone — two separate WhatsApp links */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 38, height: 38, background: "rgba(192,57,43,0.15)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>📞</div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Phone</p>
                  <div style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                    {[
                      { display: "+977-9861330778 |", number: "9779861330778" },
                      { display: "+977-9815888017", number: "9779815888017" },
                    ].map(p => (
                      <a key={p.number} href={`https://wa.me/${p.number}`} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#25D366"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                      >
                        {p.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginTop: 12 }}>
                <div style={{ width: 38, height: 38, background: "rgba(192,57,43,0.15)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>✉️</div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Email</p>
                  <a href="mailto:creationchitransh8@gmail.com" style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#c0392b"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  >creationchitransh8@gmail.com</a>
                </div>
              </div>

              {/* Website */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginTop: 12 }}>
                <div style={{ width: 38, height: 38, background: "rgba(192,57,43,0.15)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>🌐</div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Website</p>
                  <a href="https://www.chitranshcreation.com.np/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#c0392b"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  >chitranshcreation.com.np ↗</a>
                </div>
              </div>

              {/* Address */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginTop: 12 }}>
                <div style={{ width: 38, height: 38, background: "rgba(192,57,43,0.15)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>📍</div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Address</p>
                  <a href="https://maps.google.com/maps/search/Chandragiri%20Marga%2C%20Old%20Baneshwor%2C%2044600%20Kathmandu%2C%20Nepal/@28.7045,80.5663,17z?hl=en" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none", lineHeight: 1.6, transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#c0392b"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  >Chandragiri Marg, Baneshwor,<br />Kathmandu, Nepal ↗</a>
                </div>
              </div>

            </div>
          </div>
          <div style={{ background: "#1a1a1a", borderRadius: 4, padding: isMobile ? "28px 22px" : "36px 32px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Send Us a Message</h3>

            {formStatus === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h4 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Message Sent!</h4>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  Thank you for reaching out. The Chitransh Creation team will get back to you shortly.
                </p>
                <button onClick={() => setFormStatus("idle")} style={{ background: "transparent", color: "#c0392b", border: "1px solid rgba(192,57,43,0.4)", padding: "10px 24px", fontSize: 13, cursor: "pointer", borderRadius: 2, fontWeight: 600 }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                {[
                  { label: "Your Name", name: "name", type: "text", placeholder: "Full name" },
                  { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Subject", name: "subject", type: "text", placeholder: "Project type or topic" },
                ].map(f => (
                  <div key={f.name} style={{ marginBottom: 18 }}>
                    <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 7 }}>{f.label}</label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={formData[f.name]}
                      onChange={handleFormChange}
                      placeholder={f.placeholder}
                      disabled={formStatus === "loading"}
                      style={{ width: "100%", background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", opacity: formStatus === "loading" ? 0.6 : 1 }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: formError ? 12 : 24 }}>
                  <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 7 }}>Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell us about your project..."
                    disabled={formStatus === "loading"}
                    style={{ width: "100%", background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", opacity: formStatus === "loading" ? 0.6 : 1 }}
                  />
                </div>
                {formError && (
                  <div style={{ marginBottom: 16, padding: "10px 14px", background: "rgba(192,57,43,0.12)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: 2, color: "#e07060", fontSize: 13 }}>
                    ⚠ {formError}
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={formStatus === "loading"}
                  style={{ width: "100%", background: formStatus === "loading" ? "#7a2020" : "#c0392b", color: "#fff", border: "none", padding: "13px 0", fontSize: 14, fontWeight: 600, letterSpacing: 1, cursor: formStatus === "loading" ? "not-allowed" : "pointer", borderRadius: 2, transition: "background 0.2s" }}
                >
                  {formStatus === "loading" ? "Sending…" : "Send Message →"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#080808", padding: `24px ${px}`, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 10 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 18, height: 18, background: "#c0392b", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: isMobile ? 11 : 13 }}>Chitransh Creation Pvt. Ltd. · Reg. No. 321002/080/081</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 12 }}>© 2025 Chitransh Creation. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}