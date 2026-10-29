import { ResumeLink } from "./resume-viewer";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import portrait from "../../assets/Anarghya Profile.webp";
import goldenDot from "../../assets/Golden dot.png";
import { BringJourney } from "./bring-journey";
import favicon from "../../assets/Favicon.png";
import figmaIcon from "../../assets/Figma.webp";
import illustratorIcon from "../../assets/Illustrator.webp";
import stitchIcon from "../../assets/Stitch.webp";
import cursorIcon from "../../assets/Cursor.webp";
import figmaMakeIcon from "../../assets/Figma make.webp";
import lovableIcon from "../../assets/Lovable.webp";
import onecareThumb from "../../assets/One care Thumbnail.webp";
import alchemicThumb from "../../assets/Alchemic Thumbnail.webp";
import gigglesThumb from "../../assets/Giggles Thumbnail.webp";
import fnpThumb from "../../assets/FNP Thumbnail.webp";
import inviteCard from "../../assets/Exhibition invite card footer.webp";
import outdriveExperiment from "../../assets/outdrive-cover.webp";
import jurassicExperiment from "../../assets/Jurassic escape - Desktop final.webp";
import jurassicVideo from "../../assets/The Jurassic Escape desktop (1)-compressed.mp4";
import jurassicPreview from "../../assets/jurassic-gallery-preview.mp4";
import viceCityPreview from "../../assets/vice-city-gallery-preview.mp4";
import outdrivePreview from "../../assets/outdrive-gallery-preview.mp4";
import viceCityExperiment from "../../assets/vice-city-cover.webp";
import { Button } from "@/components/ui/button";
import { BuiltGlimpse } from "./built-glimpse";
import { HeroPortrait } from "./hero-portrait";
import { WorkGallery } from "./work-gallery";
import { ExperimentsGallery } from "./experiments-gallery";

const projects = [
  {
    title: "ALCHEMIC (Summer Internship)",
    subtitle: "AI Customer Insights Platform",
    description:
      "Designed and shipped product and web experiences, simplifying dense customer insights into clearer, more usable interfaces.",
    disciplines: "Product Design · UX · Vibe Coding · AI Prototyping",
    href: "/work/alchemic" as const,
    asset: "/assets/work/alchemic.webp",
    image: alchemicThumb,
  },
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
    title: "Jurassic Escape",
    description:
      "A motion-controlled 3D game where players use real body movements to navigate obstacles and survive across Jurassic environments.",
    image: jurassicExperiment,
    video: jurassicVideo,
    previewVideo: jurassicPreview,
  },
  {
    title: "Vice City",
    description:
      "An open-city arcade driving game: explore Vice Island, switch cars and take on the night shift.",
    image: viceCityExperiment,
    previewVideo: viceCityPreview,
    game: "/games/vice-grid/index.html",
  },
  {
    title: "OUTDRIVE",
    description:
      "A neon Three.js driving game: steer the endless road, accelerate and see how far the night takes you.",
    image: outdriveExperiment,
    previewVideo: outdrivePreview,
    game: "/games/outdrive/outdrive.html",
    gameReturnLabel: "Back to Experiments",
    gameHint: "Click inside to drive · WASD or arrow keys to steer, accelerate and brake",
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

function ResumeTicketLabel() {
  return <>
    <svg className="resume-ticket-outline" viewBox="0 0 120 44" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M3 .75 H117 Q119.25 .75 119.25 3 V17 A5 5 0 0 0 119.25 27 V41 Q119.25 43.25 117 43.25 H3 Q.75 43.25 .75 41 V27 A5 5 0 0 0 .75 17 V3 Q.75 .75 3 .75 Z" vectorEffect="non-scaling-stroke" />
    </svg>
    <span>Resume</span>
  </>;
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
          <a href="#experiments" onClick={close}>Experiments</a>
          <a href="#about" onClick={close}>About</a>
          <ResumeLink onClick={close}><ResumeTicketLabel /></ResumeLink>
        </nav>
        <ResumeLink className="resume-link"><ResumeTicketLabel /></ResumeLink>
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

const heroPhrases = ["digital products.", "tangible interactions.", "playable experiments.", "working prototypes."] as const;

function HeroPhrase() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"shown" | "out" | "in">("shown");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let holdTimer = 0;
    let moveTimer = 0;
    let frame = 0;
    let active = true;

    const clear = () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(moveTimer);
      window.cancelAnimationFrame(frame);
    };

    const arm = () => {
      clear();
      if (!active || document.hidden) return;
      holdTimer = window.setTimeout(() => {
        setPhase("out");
        moveTimer = window.setTimeout(() => {
          setIndex((current) => (current + 1) % heroPhrases.length);
          setPhase("in");
          frame = window.requestAnimationFrame(() => {
            frame = window.requestAnimationFrame(() => {
              if (!active) return;
              setPhase("shown");
              arm();
            });
          });
        }, 450);
      }, 3000);
    };

    const onVisibility = () => {
      if (document.hidden) {
        clear();
        return;
      }
      setPhase("shown");
      arm();
    };

    document.addEventListener("visibilitychange", onVisibility);
    arm();

    return () => {
      active = false;
      clear();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const phrase = heroPhrases[index] ?? heroPhrases[0];

  return (
    <span className="hero-phrase">
      <span className="hero-phrase-sizer" aria-hidden="true">playable experiments.</span>
      <span className={`hero-phrase-text is-${phase}`} aria-live="polite">{phrase}</span>
    </span>
  );
}

function Hero() {
  return (
    <section id="top" className="hero site-container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title" className="hero-title">
          <span className="hero-headline-line">Somewhere between <em className="hero-title-accent">designing it</em></span>{" "}
          <span className="hero-headline-line">&amp; figuring out <em className="hero-title-accent">how to build it.</em></span>
        </h1>
        <div className="hero-intro">
          <p className="hero-intro-lead">
            <span className="hero-intro-line">I'm Anarghya, an engineer turned Product</span>{" "}
            <span className="hero-intro-line">Designer who enjoys turning ideas into</span>
          </p>
          <p className="hero-intro-follow">
            <HeroPhrase />
          </p>
          <a className="hero-explore" href="#work">
            <svg className="hero-explore-outline" viewBox="0 0 120 44" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M3 .75 H117 Q119.25 .75 119.25 3 V17 A5 5 0 0 0 119.25 27 V41 Q119.25 43.25 117 43.25 H3 Q.75 43.25 .75 41 V27 A5 5 0 0 0 .75 17 V3 Q.75 .75 3 .75 Z" vectorEffect="non-scaling-stroke" />
            </svg>
            <span>Explore Work</span>
          </a>
        </div>
      </div>
      <HeroPortrait src={portrait} />
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
  const card = (
    <>
      <div className="project-frame">
        <div className="project-media">
          {"image" in project && project.image
            ? <img className="project-image" src={project.image} alt="" />
            : <AssetPlaceholder path={project.asset} kind="project" />}
          {comingSoon ? <p className="coming-soon"><span>Coming soon</span></p> : null}
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
      ) : (
        <Link to={project.href} className="project-card" aria-label={`View ${project.title} case study`}>
          {card}
        </Link>
      )}
    </Reveal>
  );
}

function WorkSection() {
  return <WorkGallery projects={projects} />;
}

function CapabilitySection() {
  return (
    <section id="about" className="capability-section" aria-labelledby="about-heading">
      <div className="bring-wrap">
        <h2 id="about-heading" className="bring-heading">What I bring to the table?</h2>
        <div className="bring-stage">
          <BringJourney />
        </div>
        <div className="bring-meta">
          <div>
            <h3 className="bring-kicker">Tools box</h3>
            <div className="tool-row">
              {tools.map((tool) => (
                <span key={tool.name} className="tool-hit">
                  <img className="tool-icon" src={tool.src} alt={tool.name} width={72} height={72} loading="lazy" decoding="async" />
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

function ExperimentsSection() {
  return <ExperimentsGallery experiments={experiments} />;
}

function ContactTicket() {
  return (
    <div className="contact-ticket">
      <img className="ticket-card" src={inviteCard} alt="" loading="lazy" decoding="async" />
      <div className="ticket-title"><span>Thanks for Visiting</span><strong>Curated by Anarghya</strong></div>
      <div className="ticket-divider" />
      <div className="ticket-links">
        <p>Say Hello at<br /><a href="mailto:anarghya002@gmail.com">anarghya002@gmail.com</a></p>
        <p>Take with you<br /><ResumeLink /></p>
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
  return <><Navbar /><Hero /><BuiltGlimpse previews={experiments} /><WorkSection /><CapabilitySection /><ExperimentsSection /><ContactSection /></>;
}
