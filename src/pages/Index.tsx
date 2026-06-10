import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/57572f4b-f178-4399-8ac9-4a5e84e5cc1f/files/15c00354-1e98-4e8e-a09d-bdefccb09b4c.jpg";
const LEDUC_IMG = "https://cdn.ezst.app/projects/57572f4b-f178-4399-8ac9-4a5e84e5cc1f/files/94ffbffa-0c61-46b2-8b97-e5414b42db7a.jpg";
const PETRO_BEADWORK_IMG = "https://cdn.ezst.app/projects/57572f4b-f178-4399-8ac9-4a5e84e5cc1f/bucket/fe9732bb-4761-4292-8603-3452f0f5bf04.png";
const OPEC_CARTOON_IMG = "https://cdn.ezst.app/projects/57572f4b-f178-4399-8ac9-4a5e84e5cc1f/bucket/6a381d61-2025-4c97-963c-ed443c9a0549.png";
const BERGER_REPORT_IMG = "https://cdn.ezst.app/projects/57572f4b-f178-4399-8ac9-4a5e84e5cc1f/bucket/f72202c1-61a1-48ac-8f9b-d5631ee28a3b.png";

const timelineEvents = [
  { year: "1947", title: "Leduc No. 1 Discovery", desc: "Imperial Oil strikes oil near Leduc, Alberta — igniting Canada's modern oil era.", color: "#D4A017" },
  { year: "1956", title: "Pipeline Debate", desc: "C.D. Howe's Trans-Canada Pipeline sparks Parliament's most bitter debate.", color: "#C0392B" },
  { year: "1973", title: "OPEC Oil Crisis", desc: "Global oil embargo exposes Canada's energy vulnerability and reshapes policy.", color: "#D4A017" },
  { year: "1980", title: "National Energy Program", desc: "Trudeau's NEP triggers Alberta fury — the battle over who owns Canada's oil.", color: "#C0392B" },
  { year: "1988", title: "Free Trade Agreement", desc: "Mulroney and Reagan sign FTA, binding Canadian oil to U.S. markets permanently.", color: "#D4A017" },
  { year: "Present", title: "Trans Mountain & Beyond", desc: "Modern pipeline battles echo old conflicts: economy vs. environment vs. rights.", color: "#C0392B" },
];

const sections = [
  {
    id: "pipelines",
    number: "01",
    title: "Pipeline Projects",
    subtitle: "Arteries of Power",
    overview: "Pipeline development connected Canadian oil to national and international markets while generating fierce debates over economic growth, national sovereignty, and public interest.",
    events: ["Trans-Canada Pipeline (1956)", "C.D. Howe and the Pipeline Debate", "Enbridge Expansion Plan (2025)", "Trans Mountain Expansion"],
    artifact: { name: "Original Trans-Canada Pipeline Map", year: "1956" },
    question: "How have pipeline goals changed from the 1950s to today?",
    icon: "GitBranch",
    img: HERO_IMG,
  },
  {
    id: "crisis",
    number: "02",
    title: "Global Energy Crisis",
    subtitle: "Shock Waves",
    overview: "Global oil shortages during the 1970s revealed how international events could devastate Canada's economy and forced a reckoning with energy security and national identity.",
    events: ["OPEC Oil Crisis (1973)", "Pierre Trudeau's Response", "Creation of Petro-Canada", "Venezuela's Oil Crisis"],
    artifact: { name: "Chenoa Plain, Untitled Beadwork of Petro-Canada Logo", year: "2022" },
    question: "What consequences followed the global energy crisis?",
    icon: "Zap",
    img: PETRO_BEADWORK_IMG,
  },
  {
    id: "conflicts",
    number: "03",
    title: "National Conflicts",
    subtitle: "A Nation Divided",
    overview: "Disputes over who should control Canada's energy resources created deep tensions between Alberta and the federal government — wounds that have never fully healed.",
    events: ["Nationalizing Alberta's Oil Debate", "National Energy Program (1980)", "Rise of Alberta Separatism", "Peter Lougheed", "Canada-Alberta MOU"],
    artifact: { name: "National Energy Program Document", year: "1980" },
    question: "Who should control Canada's natural resources — provinces or the federal government?",
    icon: "Flame",
    img: OPEC_CARTOON_IMG,
  },
  {
    id: "trade",
    number: "04",
    title: "International Oil Trades",
    subtitle: "Black Gold on the World Stage",
    overview: "Oil exports helped integrate Canada into the global economy and strengthened trade relationships with major partners, from the United States to emerging Asian markets.",
    events: ["Leduc No. 1 Discovery", "Athabasca Oil Sands", "Alberta Oil Exports to the U.S.", "FTA → NAFTA → CUSMA", "Pacific Ports and Asian Markets"],
    artifact: { name: "Western Examiner front page — Leduc Discovery", year: "1947" },
    question: "Why was oil important to Canada's international influence?",
    icon: "Globe",
    img: HERO_IMG,
  },
  {
    id: "indigenous",
    number: "05",
    title: "Indigenous Impacts",
    subtitle: "Land, Rights & Resistance",
    overview: "Resource development projects affected Indigenous communities and sparked landmark debates about environmental protection, the duty to consult, and the meaning of land rights.",
    events: ["Mackenzie Valley Pipeline Proposal", "Berger Inquiry", "Justice Thomas Berger", "Dene Chief Frank T'Seleie's Testimony (1975)"],
    artifact: { name: "Berger Report", year: "1977" },
    question: "How should governments balance economic development and Indigenous rights?",
    icon: "Trees",
    img: BERGER_REPORT_IMG,
  },
];

const reflectionFactors = [
  { label: "Economic Growth", icon: "TrendingUp", color: "#D4A017" },
  { label: "Government Policy", icon: "Landmark", color: "#C0392B" },
  { label: "International Trade", icon: "Globe", color: "#D4A017" },
  { label: "Indigenous Rights", icon: "Users", color: "#C0392B" },
  { label: "Environmental Concerns", icon: "Leaf", color: "#2ECC71" },
];

function useIntersection(ref: React.RefObject<Element>, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null!);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ArtifactViewer({ name, year, img }: { name: string; year: string; img: string }) {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setRotY(r => r + dx * 0.5);
    setRotX(r => Math.max(-35, Math.min(35, r - dy * 0.5)));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.max(0.6, Math.min(2.8, z - e.deltaY * 0.0012)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - lastPos.current.x;
    const dy = e.touches[0].clientY - lastPos.current.y;
    setRotY(r => r + dx * 0.5);
    setRotX(r => Math.max(-35, Math.min(35, r - dy * 0.5)));
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const reset = () => { setRotX(0); setRotY(0); setZoom(1); };

  return (
    <div className="av-wrap">
      <div className="av-label-row">
        <span className="av-badge">ARTIFACT</span>
        <div className="av-meta">
          <span className="av-name">{name}</span>
          <span className="av-year">{year}</span>
        </div>
        <button className="av-reset" onClick={reset} title="Reset view">
          <Icon name="RotateCcw" size={14} />
        </button>
      </div>
      <div
        className="av-stage"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setDragging(false)}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <div className="av-inner" style={{
          transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${zoom})`,
          transition: dragging ? "none" : "transform 0.5s cubic-bezier(.23,1,.32,1)",
        }}>
          <img src={img} alt={name} className="av-img" draggable={false} />
          <div className="av-gloss" style={{
            background: `radial-gradient(ellipse at ${50 + rotY * 0.5}% ${50 - rotX * 0.5}%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
          }} />
          <div className="av-frame-corner tl" />
          <div className="av-frame-corner tr" />
          <div className="av-frame-corner bl" />
          <div className="av-frame-corner br" />
        </div>
      </div>
      <p className="av-hint">
        <Icon name="MousePointer2" size={11} />
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  );
}

export default function Index() {
  const [pathway, setPathway] = useState<string | null>(null);
  const [activeTimeline, setActiveTimeline] = useState<number | null>(null);
  const [reflection, setReflection] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="ex-root">
      {/* STICKY NAV */}
      <nav className={`ex-nav ${navVisible ? "ex-nav-show" : ""}`}>
        <button className="ex-nav-logo" onClick={() => scrollTo("home")}>BLACK GOLD</button>
        <div className="ex-nav-links">
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} className="ex-nav-link">
              <span className="ex-nav-num">{s.number}</span>
              <span className="ex-nav-ttl">{s.title.split(" ")[0]}</span>
            </button>
          ))}
          <button onClick={() => scrollTo("final")} className="ex-nav-link ex-nav-gold">Gallery</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="hero-grad" />
        <div className="hero-grain" />

        <div className="hero-body">
          <div className="hero-eyebrow">
            <span className="hero-line" />
            <span className="hero-eyebrow-txt">MUSEUM EXHIBITION · CANADA · 1945–PRESENT</span>
            <span className="hero-line" />
          </div>

          <h1 className="hero-h1">
            <span className="h1-black">BLACK</span>
            <span className="h1-gold">GOLD</span>
            <br />
            <span className="h1-amp">&amp;</span>
            <span className="h1-red">RED LINES</span>
          </h1>

          <p className="hero-tagline">Oil, Power, and Perspectives</p>

          <p className="hero-desc">
            Since 1945, oil and gas have transformed Canada's economy, politics,
            and international relationships — while fuelling lasting conflicts over pipelines,
            government control, Indigenous rights, and the environment.
          </p>

          <div className="hero-paths">
            <button
              className={`path-btn path-econ ${pathway === "economic" ? "path-active" : ""}`}
              onClick={() => { setPathway("economic"); scrollTo("pipelines"); }}
            >
              <Icon name="BarChart2" size={16} />
              Political &amp; Economic Perspective
            </button>
            <button
              className={`path-btn path-indig ${pathway === "indigenous" ? "path-active" : ""}`}
              onClick={() => { setPathway("indigenous"); scrollTo("indigenous"); }}
            >
              <Icon name="Leaf" size={16} />
              Environmental &amp; Indigenous Perspective
            </button>
          </div>

          <button className="hero-explore" onClick={() => scrollTo("timeline")}>
            <Icon name="ChevronDown" size={18} />
            Explore Exhibition
          </button>
        </div>

        <div className="hero-years">
          {["1947", "1956", "1973", "1980", "1988", "Present"].map(y => (
            <span key={y} className="hero-yr">{y}</span>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="tl-section" id="timeline">
        <AnimatedSection>
          <div className="center-header">
            <span className="sec-tag">NAVIGATE</span>
            <h2 className="sec-title">Timeline Navigation</h2>
          </div>
        </AnimatedSection>

        <div className="tl-track">
          <div className="tl-rail" />
          {timelineEvents.map((ev, i) => (
            <AnimatedSection key={ev.year} delay={i * 80}>
              <div className={`tl-node ${activeTimeline === i ? "tl-open" : ""}`} onClick={() => setActiveTimeline(activeTimeline === i ? null : i)}>
                <div className="tl-dot-wrap">
                  <div className="tl-dot" style={{
                    borderColor: ev.color,
                    background: activeTimeline === i ? ev.color : "transparent",
                    boxShadow: activeTimeline === i ? `0 0 16px ${ev.color}80` : "none",
                  }} />
                </div>
                <div className="tl-yr" style={{ color: ev.color }}>{ev.year}</div>
                <div className={`tl-card ${activeTimeline === i ? "tl-card-open" : ""}`}>
                  <h4 className="tl-title">{ev.title}</h4>
                  <p className="tl-desc">{ev.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── EXHIBIT SECTIONS ── */}
      {sections.map((sec, idx) => (
        <section key={sec.id} id={sec.id} className={`ex-section ${idx % 2 === 1 ? "ex-alt" : ""}`}>
          <AnimatedSection>
            <div className="ex-grid">
              <div className="ex-text">
                <div className="ex-num-badge">{sec.number}</div>
                <span className="ex-subtitle-tag">{sec.subtitle}</span>
                <h2 className="ex-title">{sec.title}</h2>
                <p className="ex-overview">{sec.overview}</p>

                <div className="ex-events">
                  <p className="ex-events-label">Featured Events</p>
                  <ul className="ex-event-list">
                    {sec.events.map(ev => (
                      <li key={ev} className="ex-event-item">
                        <span className="ex-dot" />
                        {ev}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ex-question">
                  <Icon name="MessageCircle" size={15} />
                  <span>"{sec.question}"</span>
                </div>
              </div>

              <div className="ex-visual">
                <ArtifactViewer name={sec.artifact.name} year={sec.artifact.year} img={sec.img} />
              </div>
            </div>
          </AnimatedSection>
        </section>
      ))}

      {/* ── FINAL GALLERY ── */}
      <section className="final-gal" id="final">
        <AnimatedSection>
          <div className="center-header">
            <span className="sec-tag">REFLECT</span>
            <h2 className="sec-title">Final Gallery</h2>
            <p className="final-intro">
              How did oil transform Canada's economy, politics, and relations with the world?
              What conflicts arose — and what remains unresolved today?
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="kq-wrap">
            <div className="kq-card">
              <Icon name="HelpCircle" size={18} />
              <p>How did oil transform Canada's economy, politics, and relations with the world?</p>
            </div>
            <div className="kq-card">
              <Icon name="HelpCircle" size={18} />
              <p>What conflicts and outcomes arose as a result of Canada's oil industry?</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="reflect-wrap">
            <h3 className="reflect-heading">Reflection Activity</h3>
            <p className="reflect-sub">Select the factor you believe had the greatest impact on Canada's oil story:</p>
            <div className="reflect-grid">
              {reflectionFactors.map((f, i) => (
                <button
                  key={f.label}
                  className={`reflect-card ${reflection === f.label ? "reflect-selected" : ""}`}
                  style={{ "--rc-color": f.color } as React.CSSProperties}
                  onClick={() => setReflection(f.label)}
                >
                  <span className="rc-icon"><Icon name={f.icon} size={26} /></span>
                  <span className="rc-label">{f.label}</span>
                  {reflection === f.label && (
                    <span className="rc-check"><Icon name="CheckCircle2" size={16} /></span>
                  )}
                </button>
              ))}
            </div>

            {reflection && (
              <div className="reflect-result">
                <p>
                  You selected <strong style={{ color: "var(--gold)" }}>{reflection}</strong> as the defining force.
                  Oil's history is never one-dimensional — each factor shaped and was shaped by the others.
                  Canada's energy future is still being written.
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>

        <footer className="ex-footer">
          <div className="footer-title">BLACK GOLD &amp; RED LINES</div>
          <div className="footer-sub">Oil, Power, and Perspectives · Canada · 1945–Present</div>
          <div className="footer-rule" />
          <p className="footer-copy">Interactive Museum Exhibition</p>
        </footer>
      </section>
    </div>
  );
}