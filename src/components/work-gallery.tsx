import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "./work-gallery.css";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: "/work/giggles" | "/work/alchemic" | "/work/onecare" | "/work/fnp-circle";
  comingSoon?: boolean;
};

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };

export function WorkGallery({ projects }: { projects: readonly Project[] }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const exhibits = Array.from(root.querySelectorAll<HTMLElement>(".wg-exhibit"));
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const short = window.matchMedia("(max-height: 639px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const fallback = reduced.matches || short.matches;
      const headerHeight = parseFloat(getComputedStyle(root.querySelector(".wg-room")!).top) || 0;
      const viewport = window.innerHeight - headerHeight;
      const distance = Math.max(1, root.offsetHeight - viewport);
      const progress = clamp((headerHeight - root.getBoundingClientRect().top) / distance) * (projects.length - 1);
      exhibits.forEach((el, i) => {
        const local = progress - i;
        let painting = 1, text = 1, y = 0, textY = 0;
        if (mobile.matches) {
          // Each opaque exhibit rises as one unit, covering the previous exhibit.
          y = i === 0 ? 0 : (1 - ease((local + 0.7) / 0.7)) * 105;
          const active = fallback || (local >= 0 && local < 1) || (i === 0 && progress === 0);
          el.inert = !active;
          el.setAttribute("aria-hidden", String(!active));
        } else {
          // Outgoing text, outgoing art, incoming art, then incoming text.
          painting = local >= 0 ? 1 - ease((local - 0.36) / 0.18) : ease((local + 0.42) / 0.27);
          text = local >= 0 ? 1 - ease((local - 0.24) / 0.12) : ease((local + 0.15) / 0.15);
          if (i === projects.length - 1 && local >= 0) painting = text = 1;
          if (i === 0 && local < 0) painting = text = 1;
          y = local >= 0 ? -4 * (1 - painting) : 5 * (1 - painting);
          textY = 12 * (1 - text);
          const active = fallback || text > 0.01;
          el.inert = !active;
          el.setAttribute("aria-hidden", String(!active));
        }
        if (fallback) {
          el.inert = false;
          el.removeAttribute("aria-hidden");
        }
        el.style.setProperty("--painting-opacity", String(painting));
        el.style.setProperty("--text-opacity", String(text));
        el.style.setProperty("--exhibit-y", `${y}%`);
        el.style.setProperty("--text-y", `${textY}px`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, [projects.length]);

  return (
    <section ref={section} id="work" className="wg-gallery" aria-labelledby="work-heading">
      <div className="wg-room">
        <header className="wg-header">
          <h2 id="work-heading">Work</h2>
          <span>A selection of considered work <span aria-hidden="true">·</span> 2026</span>
        </header>
        <div className="wg-stage">
          {projects.map((project, i) => {
            const artwork = <img src={project.image} alt={`${project.title} — project cover artwork`} decoding="async" loading={i === 0 ? "eager" : "lazy"} />;
            return (
              <article className="wg-exhibit" key={project.href} aria-labelledby={`wg-title-${i}`}>
                <div className="wg-art">
                  <div className="wg-strings" aria-hidden="true"><i /><i /></div>
                  {project.comingSoon ? <div className="wg-frame">{artwork}</div> : <Link to={project.href} className="wg-frame" aria-label={`View ${project.title} case study`}>{artwork}</Link>}
                </div>
                <div className="wg-copy">
                  <p className="wg-number">EXHIBIT <span>{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></p>
                  <h3 id={`wg-title-${i}`}>{project.title}</h3>
                  <p className="wg-descriptor">{project.subtitle}</p>
                  <p className="wg-description">{project.description}</p>
                  {project.comingSoon ? <span className="wg-status">Coming Soon</span> : <Link className="wg-cta" to={project.href}>View Case Study <span aria-hidden="true">↗</span></Link>}
                </div>
              </article>
            );
          })}
        </div>
        <div className="wg-floor" aria-hidden="true" />
        <p className="wg-scroll" aria-hidden="true">SCROLL TO EXPLORE <span>↓</span></p>
      </div>
    </section>
  );
}
