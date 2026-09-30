import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Lock, Menu, X } from "lucide-react";
import portrait from "../../assets/Anarghya Profile.png";
import goldenDot from "../../assets/Golden dot.png";
import bringTable from "../../assets/what I bring to table.png";
import favicon from "../../assets/Favicon.png";
import figmaIcon from "../../assets/Figma.png";
import illustratorIcon from "../../assets/Illustrator.png";
import stitchIcon from "../../assets/Stitch.png";
import cursorIcon from "../../assets/Cursor.png";
import figmaMakeIcon from "../../assets/Figma make.png";
import lovableIcon from "../../assets/Lovable.png";
import onecareThumb from "../../assets/One care Thumbnail.png";
import alchemicThumb from "../../assets/Alchemic Thumbnail.png";
import gigglesThumb from "../../assets/Giggles Thumbnail.png";
import fnpThumb from "../../assets/FNP Thumbnail.png";
import inviteCard from "../../assets/Exhibition invite card footer.png";
import gmailExperiment from "../../assets/Gmail.png";
import jurassicExperiment from "../../assets/Jurassic escape.png";
import jurassicVideo from "../../assets/Jurassic Escape - Desktop final.mp4";
import lumaireExperiment from "../../assets/Lumaire.png";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "ONECARE",
    subtitle: "End-to-end Medical Tourism Platform",
    description:
      "Designed the service, visual experience and coded platform for an international patient journey from discovery to post-surgery care.",
    disciplines: "Design Management · Visual Design · Web Development",
    href: "/work/onecare" as const,
    asset: "/assets/work/onecare.webp",
    image: onecareThumb,
  },
  {
    title: "ALCHEMIC (Summer Internship)",
    subtitle: "AI Customer Insights Platform",
    description:
      "Designed and shipped product and web experiences, simplifying dense customer insights into clearer, more usable interfaces.",
    disciplines: "Product Design · UX · Vibe Coding · AI Prototyping",
    href: "/work/alchemic" as const,
    asset: "/assets/work/alchemic.webp",
    image: alchemicThumb,
    nda: true,
  },
  {
    title: "GIGGLES",
    subtitle: "Tangible Interaction Game",
    description:
      "Designed and built a physical-digital game for autistic children, combining gameplay, tangible interaction, electronics and code.",
    disciplines: "Interaction Design · Accessibility · Physical Computing",
    href: "/work/giggles" as const,
    asset: "/assets/work/giggles.webp",
    image: gigglesThumb,
  },
  {
    title: "FNP CIRCLE",
    subtitle: "Group Gifting Feature on FNP",
    description:
      "Researched, designed and tested a group-gifting experience that helps people plan, contribute and choose gifts together.",
    disciplines: "Product Design · UX Research · Interaction Design",
    href: "/work/fnp-circle" as const,
    asset: "/assets/work/fnp-circle.webp",
    image: fnpThumb,
    comingSoon: true,
  },
];

const tools = [
  { name: "Figma", src: figmaIcon },
  { name: "Illustrator", src: illustratorIcon },
  { name: "Google Stitch", src: stitchIcon },
  { name: "Cursor", src: cursorIcon },
  { name: "Figma Make", src: figmaMakeIcon },
  { name: "Lovable", src: lovableIcon },
];

const experience = [
  { company: "Alchemic", role: "Product Design Intern", dates: "May – July 2026" },
  { company: "Dategain", role: "UI/UX Design Intern", dates: "June – July 2025" },
];

const experiments = [
  {
    title: "Gmail Pulse",
    description:
      "An AI-assisted Gmail concept that surfaces actionable emails and helps users quickly identify what needs their attention.",
    image: gmailExperiment,
  },
  {
    title: "Jurassic Escape",
    description:
      "A motion-controlled 3D game where players use real body movements to navigate obstacles and survive across Jurassic environments.",
    image: jurassicExperiment,
    video: jurassicVideo,
  },
  {
    title: "Lumaire",
    description:
      "A stained-glass inspired design system translating light, geometry and layered forms into a distinctive digital visual language.",
    image: lumaireExperiment,
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function AssetPlaceholder({ path, kind }: { path: string; kind: "portrait" | "project" | "experiment" }) {
  return (
    <div className={`asset-placeholder asset-${kind}`} role="img" aria-label={`Placeholder for ${path}`}>
      <span>{path}</span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
    <header className="site-header">
      <div className="site-container nav-layout">
        <a href="#top" className="wordmark" onClick={close}>anarghya</a>
        <nav className={`desktop-nav ${open ? "mobile-open" : ""}`} aria-label="Primary navigation">
          <a href="#work" onClick={close}>Work</a>
          <a href="#experiments" onClick={close}>Playground</a>
          <a href="#about" onClick={close}>About</a>
          <a href="https://drive.google.com/file/d/1rty1WM8ae-9wCtcvp9i9Any3fwtxRpph/view?usp=sharing" target="_blank" rel="noreferrer" onClick={close}>Resume</a>
        </nav>
        <a className="resume-link" href="https://drive.google.com/file/d/1rty1WM8ae-9wCtcvp9i9Any3fwtxRpph/view?usp=sharing" target="_blank" rel="noreferrer">Resume</a>
        <Button variant="ghost" size="icon" className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
    </header>
    {open ? <button type="button" className="nav-scrim" aria-label="Close menu" onClick={close} /> : null}
    </>
  );
}

function SectionHeading({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return <h2 className={`section-heading ${dark ? "section-heading-light" : ""} ${className}`}>{children}</h2>;
}

function Hero() {
  return (
    <section id="top" className="hero site-container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title" className="hero-title">
          I like asking the <span>“why”</span><br />before I start designing.
        </h1>
        <p className="hero-intro">
          I’m Anarghya<br />an Experience Designer interested in<br />
          <em>understanding human behavior, interaction<br className="desktop-break" /> design, and bringing ideas to life through code.</em>
        </p>
      </div>
      <div className="portrait-wrap">
        <img
          src={portrait}
          alt="Portrait of Anarghya"
          width={394}
          height={507}
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}

function Plaque({ children, className = "", dots = false }: { children: ReactNode; className?: string; dots?: boolean }) {
  return (
    <div className={`plaque ${dots ? "plaque-dots" : ""} ${className}`}>
      {dots
        ? [0, 1, 2, 3].map((corner) => <img key={corner} className="plaque-dot" src={goldenDot} alt="" width={12} height={12} />)
        : <><i /><i /><i /><i /></>}
      {children}
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const comingSoon = "comingSoon" in project && project.comingSoon;
  const nda = "nda" in project && project.nda;
  const [open, setOpen] = useState(false);
  const card = (
    <>
      <div className="project-frame">
        <div className="project-media">
          {"image" in project && project.image
            ? <img className="project-image" src={project.image} alt="" />
            : <AssetPlaceholder path={project.asset} kind="project" />}
          {comingSoon ? <p className="coming-soon"><span>Coming soon</span></p> : null}
          {nda ? (
            <div className="card-gate">
              <Lock aria-hidden="true" />
              <p>Under NDA, contact to know more</p>
            </div>
          ) : null}
        </div>
      </div>
      <Plaque className="project-plaque" dots>
        <h3>{project.title}</h3>
        <p className="plaque-subtitle">{project.subtitle}</p>
        <p>{project.description}</p>
      </Plaque>
    </>
  );

  return (
    <Reveal delay={(index % 2) * 70}>
      {comingSoon ? (
        <div className="project-card is-coming-soon" aria-label={`${project.title}, coming soon`}>
          {card}
        </div>
      ) : nda ? (
        <button type="button" className={`project-card is-gated${open ? " is-open" : ""}`} aria-expanded={open} aria-label={`${project.title}, under NDA`} onClick={() => setOpen((value) => !value)}>
          {card}
        </button>
      ) : (
        <Link to={project.href} target="_blank" rel="noreferrer" className="project-card" aria-label={`View ${project.title} case study`}>
          {card}
        </Link>
      )}
    </Reveal>
  );
}

function WorkSection() {
  return (
    <section id="work" className="burgundy-section work-section" aria-labelledby="work-heading">
      <div className="site-container">
        <SectionHeading dark className="work-heading">Work</SectionHeading>
        <div className="work-grid">
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function CapabilitySection() {
  return (
    <section id="about" className="capability-section" aria-labelledby="about-heading">
      <div className="bring-wrap">
        <h2 id="about-heading" className="bring-heading">What I bring to the table?</h2>
        <div className="bring-stage">
          <img className="bring-art" src={bringTable} alt="A burgundy ribbon connecting a magnifying glass, puzzle pieces, an open notebook, hanging cones, and wireframe blocks." width={2501} height={1912} />
        </div>
        <div className="bring-meta">
          <div>
            <h3 className="bring-kicker">Tools box</h3>
            <div className="tool-row">
              {tools.map((tool) => (
                <span key={tool.name} className="tool-hit">
                  <img className="tool-icon" src={tool.src} alt={tool.name} width={72} height={72} />
                  <span className="tool-label" aria-hidden="true">{tool.name}</span>
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="bring-kicker">Experience</h3>
            <div className="experience-list">
              {experience.map((job) => (
                <div key={job.company} className="experience-row">
                  <div>
                    <h4>{job.company}</h4>
                    <p>{job.role}</p>
                  </div>
                  <p className="experience-dates">{job.dates}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryLights() {
  return (
    <div className="lights" aria-hidden="true">
      <div className="light-rail" />
      {[0, 1, 2].map((light) => <div key={light} className={`light-unit light-${light + 1}`}><span><b className="light-bulb" /></span><i /></div>)}
    </div>
  );
}

function ExperimentCard({ experiment, index }: { experiment: (typeof experiments)[number]; index: number }) {
  const video = "video" in experiment ? experiment.video : undefined;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Reveal delay={index * 55} className="experiment-reveal">
      <article className="experiment-card">
        {video ? (
          <button type="button" className="experiment-frame" aria-label={`Play ${experiment.title}`} onClick={() => setOpen(true)}>
            <img className="experiment-image" src={experiment.image} alt="" />
          </button>
        ) : (
          <div className="experiment-frame"><img className="experiment-image" src={experiment.image} alt="" /></div>
        )}
        <Plaque className="experiment-plaque"><h3>{experiment.title}</h3><p>{experiment.description}</p></Plaque>
      </article>
      {open && video
        ? createPortal(
            <div className="video-pop" role="dialog" aria-modal="true" aria-label={experiment.title}>
              <div className="video-pop-window">
                <button type="button" className="video-pop-cancel" aria-label="Cancel" onClick={() => setOpen(false)}><X /></button>
                <video src={video} controls autoPlay playsInline />
              </div>
            </div>,
            document.body,
          )
        : null}
    </Reveal>
  );
}

function ExperimentsSection() {
  return (
    <section id="experiments" className="burgundy-section experiments-section" aria-labelledby="experiments-heading">
      <div className="site-container">
        <SectionHeading dark className="work-heading">Experiments</SectionHeading>
        <GalleryLights />
        <div className="experiments-grid">
          {experiments.map((experiment, index) => <ExperimentCard key={experiment.title} experiment={experiment} index={index} />)}
        </div>
        <p className="experiment-scroll">
          Scroll Left
          <ArrowLeft aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}

function ContactTicket() {
  return (
    <div className="contact-ticket">
      <img className="ticket-card" src={inviteCard} alt="" />
      <div className="ticket-title"><span>Thanks for Visiting</span><strong>Curated by Anarghya</strong></div>
      <div className="ticket-divider" />
      <div className="ticket-links">
        <p>Say Hello at<br /><a href="mailto:anarghya002@gmail.com">anarghya002@gmail.com</a></p>
        <p>Take with you<br /><a href="https://drive.google.com/file/d/1rty1WM8ae-9wCtcvp9i9Any3fwtxRpph/view?usp=sharing" target="_blank" rel="noreferrer">Resume</a></p>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <div className="site-container contact-top">
        <div className="contact-copy">
          <h2 id="contact-heading">Liked the curation?</h2>
          <p>Let’s make something <em>worth exhibiting.</em></p>
          <small>I’m open to Product Design opportunities,<br />collaborations &amp; conversations.</small>
        </div>
        <ContactTicket />
      </div>
      <footer className="site-container footer-row">
        <p><img className="curator-mark" src={favicon} alt="" width={25} height={25} />Curated by Anarghya · 2026</p>
        <nav aria-label="Social links">
          <a href="https://www.behance.net/anarghyas" target="_blank" rel="noreferrer">Behance</a>
          <a href="https://in.linkedin.com/in/anarghya-y-s-078237316" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/art.anarghya" target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </footer>
    </section>
  );
}

export function Portfolio() {
  return <><Navbar /><Hero /><WorkSection /><CapabilitySection /><ExperimentsSection /><ContactSection /></>;
}
