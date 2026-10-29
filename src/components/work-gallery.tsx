import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type CSSProperties } from "react";
import "./work-gallery.css";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: "/work/giggles" | "/work/alchemic" | "/work/onecare" | "/work/fnp-circle";
  comingSoon?: boolean;
};

const displayTitle = (title: string) => title
  .replace("GIGGLES", "Giggles").replace("ALCHEMIC", "Alchemic")
  .replace("ONECARE", "OneCare").replace("FNP CIRCLE", "FNP Circle");

const ScrollCue = () => <p className="painting-scroll-cue">Scroll to explore <span aria-hidden="true">↓</span></p>;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function WorkGallery({ projects }: { projects: readonly Project[] }) {
  const section = useRef<HTMLElement>(null);
  const previous = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const area = root.querySelector<HTMLElement>(".scroll-area")!;
    const viewport = root.querySelector<HTMLElement>(".gallery-viewport")!;
    const art = Array.from(root.querySelectorAll<HTMLElement>(".art-object"));
    const copies = Array.from(root.querySelectorAll<HTMLElement>(".project-copy"));
    const mobile = window.matchMedia("(max-width: 880px)");
    const phone = window.matchMedia("(max-width: 767px)");
    const short = window.matchMedia("(max-height: 580px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileArea = root.querySelector<HTMLElement>(".mobile-only")!;
    const mobileViewport = root.querySelector<HTMLElement>(".mobile-viewport")!;
    const mobileArticles = Array.from(root.querySelectorAll<HTMLElement>(".mobile-article"));
    let current = -1;
    let generation = 0;
    let stageTimer = 0;
    let textTimer = 0;
    let scrollFrame = 0;
    const paintFrames = new Set<number>();
    const clear = () => {
      window.clearTimeout(stageTimer);
      window.clearTimeout(textTimer);
      paintFrames.forEach((id) => window.cancelAnimationFrame(id));
      paintFrames.clear();
    };
    const afterPaint = (callback: () => void) => {
      const id = window.requestAnimationFrame(() => {
        paintFrames.delete(id);
        callback();
      });
      paintFrames.add(id);
    };
    const progress = () => {
      const rect = area.getBoundingClientRect();
      const navHeight = parseFloat(getComputedStyle(viewport).top) || 0;
      return clamp((navHeight - rect.top) / Math.max(1, rect.height - viewport.offsetHeight) * (projects.length - 1), 0, projects.length - 1);
    };
    const activate = (index: number) => {
      if (index === current) return;
      current = index;
      const token = ++generation;
      clear();
      if (previous.current) previous.current.disabled = index === 0;
      if (next.current) next.current.disabled = index === projects.length - 1;
      if (counter.current) counter.current.textContent = `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
      // V8 clears the old exhibit completely before admitting the next painting.
      [...art, ...copies].forEach((node) => {
        node.classList.remove("is-visible", "on-stage", "is-readable", "is-active");
        node.inert = true;
        node.setAttribute("aria-hidden", "true");
      });
      stageTimer = window.setTimeout(() => {
        if (token !== generation) return;
        const painting = art[index];
        const copy = copies[index];
        painting.classList.add("on-stage", "is-active");
        painting.inert = false;
        painting.setAttribute("aria-hidden", "false");
        afterPaint(() => afterPaint(() => {
          if (token === generation) painting.classList.add("is-visible");
        }));
        // Reveal at roughly 75% of the unchanged 420ms painting entrance.
        textTimer = window.setTimeout(() => {
          if (token !== generation) return;
          copy.classList.add("on-stage", "is-readable");
          copy.inert = false;
          copy.setAttribute("aria-hidden", "false");
          afterPaint(() => afterPaint(() => {
            if (token === generation) copy.classList.add("is-visible");
          }));
        }, reduced.matches ? 0 : 315);
      }, reduced.matches ? 0 : 110);
    };
    const render = () => {
      scrollFrame = 0;
      if (phone.matches && !short.matches && !reduced.matches) {
        const navHeight = parseFloat(getComputedStyle(mobileViewport).top) || 0;
        const travel = Math.max(1, mobileArea.offsetHeight - mobileViewport.clientHeight);
        const position = clamp((navHeight - mobileArea.getBoundingClientRect().top) / travel * (projects.length - 1), 0, projects.length - 1);
        const base = Math.floor(position);
        const phase = position - base;
        const settled = phase <= .18 || base === projects.length - 1 ? base : phase >= .998 ? Math.min(base + 1, projects.length - 1) : -1;
        mobileArticles.forEach((article, index) => {
          const local = clamp((position - index + 1 - .18) / .82, 0, 1);
          const eased = local * local * (3 - 2 * local);
          article.style.setProperty("--mobile-y", `${index === 0 ? 0 : (1 - eased) * 100}%`);
          article.inert = index !== settled;
          article.setAttribute("aria-hidden", String(index !== settled));
        });
      } else {
        mobileArticles.forEach((article) => {
          article.style.removeProperty("--mobile-y");
          article.inert = false;
          article.removeAttribute("aria-hidden");
        });
      }
      if (mobile.matches || reduced.matches) {
        ++generation;
        clear();
        current = -1;
        return;
      }
      activate(Math.round(progress()));
    };
    const schedule = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(render);
    };
    const jump = (direction: number) => {
      const index = clamp(Math.round(progress()) + direction, 0, projects.length - 1);
      const navHeight = parseFloat(getComputedStyle(viewport).top) || 0;
      const top = window.scrollY + area.getBoundingClientRect().top - navHeight + (area.offsetHeight - viewport.offsetHeight) * index / Math.max(1, projects.length - 1);
      window.scrollTo({ top, behavior: reduced.matches ? "instant" : "smooth" });
    };
    const onPrevious = () => jump(-1);
    const onNext = () => jump(1);
    const previousButton = previous.current;
    const nextButton = next.current;
    const galleryHeader = root.querySelector<HTMLElement>(".exhibition-head")!;
    const alignDesktop = () => {
      if (mobile.matches || !art[0]?.offsetHeight) return;
      const frameHeight = art[0].offsetHeight;
      const center = galleryHeader.offsetTop + galleryHeader.offsetHeight + 42 + frameHeight / 2;
      root.style.setProperty("--wg-art-center", `${center}px`);
    };
    const alignmentObserver = new ResizeObserver(alignDesktop);
    alignmentObserver.observe(viewport);
    alignmentObserver.observe(galleryHeader);
    if (art[0]) alignmentObserver.observe(art[0]);
    alignDesktop();
    const mobileStages = Array.from(root.querySelectorAll<HTMLElement>(".mobile-stage"));
    const fitMobileControls = () => {
      mobileStages.forEach((stage) => {
        const controls = stage.querySelector<HTMLElement>(".mobile-controls")!;
        const text = stage.querySelector<HTMLElement>(".text-area")!;
        const bounds = stage.getBoundingClientRect();
        // On shorter compositions, the exhibit identifier and natural scrolling
        // remain available; never place navigation over the project information.
        controls.hidden = text.getBoundingClientRect().bottom - bounds.top > bounds.height - 106;
      });
    };
    const fitObserver = new ResizeObserver(fitMobileControls);
    mobileStages.forEach((stage) => {
      fitObserver.observe(stage);
      fitObserver.observe(stage.querySelector(".text-area")!);
    });
    fitMobileControls();
    previousButton?.addEventListener("click", onPrevious);
    nextButton?.addEventListener("click", onNext);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    mobile.addEventListener("change", schedule);
    schedule();
    return () => {
      ++generation;
      clear();
      fitObserver.disconnect();
      alignmentObserver.disconnect();
      window.cancelAnimationFrame(scrollFrame);
      previousButton?.removeEventListener("click", onPrevious);
      nextButton?.removeEventListener("click", onNext);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      mobile.removeEventListener("change", schedule);
    };
  }, [projects.length]);

  const artwork = (project: Project) => (
    <div className="gilded"><img className="art-image" src={project.image} alt={`${project.title} — project cover artwork`} loading="lazy" decoding="async" /></div>
  );
  const artLink = (project: Project) => project.comingSoon
    ? <div className="art-anchor art-anchor--coming-soon" tabIndex={0} aria-label={`${project.title}, coming soon`}>{artwork(project)}<span className="art-coming-soon" aria-hidden="true">Coming soon</span></div>
    : <Link to={project.href} className="art-anchor" aria-label={`View ${project.title} case study`}>{artwork(project)}</Link>;
  const jumpMobile = (index: number) => {
    const root = section.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.matchMedia("(max-width: 767px) and (min-height: 581px)").matches && !reduced) {
      const area = root.querySelector<HTMLElement>(".mobile-only")!;
      const viewport = root.querySelector<HTMLElement>(".mobile-viewport")!;
      const navHeight = parseFloat(getComputedStyle(viewport).top) || 0;
      const top = window.scrollY + area.getBoundingClientRect().top - navHeight + (area.offsetHeight - viewport.clientHeight) * index / Math.max(1, projects.length - 1);
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }
    const article = section.current?.querySelectorAll<HTMLElement>(".mobile-article")[index];
    article?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };
  const label = (project: Project, index: number, mobileLabel = false) => <>
    <div className="gold-line" />
    <span className="exhibit-count">EXHIBIT {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
    <h2>{displayTitle(project.title)}</h2>
    <p className="discipline">{project.subtitle}</p>
    <p className="summary">{project.description}</p>
    {project.comingSoon ? <span className="coming-soon-label">COMING SOON</span> : <Link to={project.href} className={mobileLabel ? "view-link" : undefined}>View Case Study</Link>}
    <div className="gold-line lower-divider" aria-hidden="true" />
  </>;

  return (
    <section ref={section} id="work" className="wg-v8" aria-label="Work gallery">
      <div className="scroll-area">
        <div className="gallery-viewport">
          <div className="wall" aria-hidden="true" />
          <div className="moulding" aria-hidden="true" />
          <div className="floor" aria-hidden="true" />
          <header className="exhibition-head site-container"><h2>Selected Work</h2></header>
          <div className="gallery-content site-container">
          <div className="gallery-art">
            {projects.map((project) => <div className="art-object" key={project.href} inert aria-hidden="true">
              <div className="cords" aria-hidden="true"><span className="pin" /><span className="pin" /></div>
              {artLink(project)}
              <ScrollCue />
            </div>)}
          </div>
          {projects.map((project, index) => <div className={`project-copy ${project.title.length > 20 ? "is-long" : ""}`} key={project.href} inert aria-hidden="true">{label(project, index)}</div>)}
          </div>
          <div className="vignette" aria-hidden="true" />
          <footer className="gallery-foot site-container">
            <div className="step-controls">
              <button ref={previous} disabled type="button" aria-label="Previous exhibit">←</button>
              <span ref={counter}>01 / {String(projects.length).padStart(2, "0")}</span>
              <button ref={next} type="button" aria-label="Next exhibit">→</button>
            </div>
          </footer>
        </div>
      </div>
      <div className="mobile-only">
        <div className="mobile-viewport">
        <header className="mobile-top site-container"><h2>Selected Work</h2></header>
        {projects.map((project, index) => <article className={`mobile-article ${project.title.length > 20 ? "is-long" : ""}`} style={{ "--mobile-z": index + 1 } as CSSProperties} inert={index > 0} aria-hidden={index > 0 ? true : undefined} key={project.href}>
          <div className="mobile-stage">
            <div className="mobile-cords" aria-hidden="true" />
            <div className="mobile-frame">{artLink(project)}<ScrollCue /></div>
            <div className="mobile-plinth" aria-hidden="true" />
            <div className="text-area">{label(project, index, true)}</div>
            <div className="step-controls mobile-controls site-container">
              <button type="button" aria-label="Previous exhibit" disabled={index === 0} onClick={() => jumpMobile(index - 1)}>←</button>
              <span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
              <button type="button" aria-label="Next exhibit" disabled={index === projects.length - 1} onClick={() => jumpMobile(index + 1)}>→</button>
            </div>
          </div>
        </article>)}
        </div>
      </div>
    </section>
  );
}
