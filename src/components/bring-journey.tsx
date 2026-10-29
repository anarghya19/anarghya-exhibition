import { useEffect, useId, useRef } from "react";
import glass from "../../assets/bring-journey/magnifying-glass-source-optimized.webp";
import puzzle from "../../assets/bring-journey/puzzle-pieces-source-optimized.webp";
import notebook from "../../assets/bring-journey/notebook-source-optimized.webp";
import hanging from "../../assets/bring-journey/hanging-shapes-source-optimized.webp";
import blocks from "../../assets/bring-journey/interface-blocks-source-optimized.webp";
import ribbon from "../../assets/bring-journey/ribbon-original.svg";
import mobileRibbon from "../../assets/bring-journey/mobile-ribbon-refined.svg";
import desktopReveal from "../../assets/bring-journey/desktop-reveal-map.png";
import mobileReveal from "../../assets/bring-journey/mobile-reveal-map.png";
import "./bring-journey.css";

const steps = [
  { label: "01. Find Patterns", discipline: "UX Research", image: glass, at: .08 },
  { label: "02. See what works", discipline: "Product Design", image: puzzle, at: .29 },
  { label: "03. Shape interactions", discipline: "Interaction Design", image: hanging, at: .66 },
  { label: "04. Build the idea", discipline: "AI Assisted Development", image: blocks, at: .88 },
];

// The map stores connected travel distance in two colour channels. Threshold
// both channels in one operation so the reveal does not jump in 256 bands.
function revealValues(p: number) {
  const gain = 2048;
  return `0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 ${-gain * 256 / 257} ${-gain / 257} 0 0 ${p * gain}`;
}

export function BringJourney() {
  const root = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");
  const progress = useRef(0);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const transfers = Array.from(node.querySelectorAll<SVGFEColorMatrixElement>(".bj-reveal-transfer"));
    const surfaces = Array.from(node.querySelectorAll<SVGImageElement>(".bj-reveal-surface"));
    const fullMasks = Array.from(node.querySelectorAll<SVGRectElement>(".bj-complete-mask"));
    const illustrations = Array.from(node.querySelectorAll<HTMLElement>("[data-journey-at]"));
    let top = 0, height = 1, viewport = innerHeight, frame = 0;
    const paint = () => {
      frame = 0;
      const next = motion.matches ? 1 : Math.max(0, Math.min(1, (scrollY + viewport * .95 - top) / height));
      progress.current = Math.max(progress.current, next);
      const p = progress.current;
      transfers.forEach((transfer) => transfer.setAttribute("values", revealValues(p)));
      surfaces.forEach((surface) => { surface.style.opacity = p > 0 ? "1" : "0"; });
      fullMasks.forEach((mask) => { mask.style.opacity = p >= 1 ? "1" : "0"; });
      illustrations.forEach((figure) => {
        figure.dataset["reached"] = String(p >= Number(figure.dataset["journeyAt"]));
      });
      node.dataset["progress"] = p.toFixed(4);
    };
    const schedule = () => {
      if (!frame && progress.current < 1) frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      cancelAnimationFrame(frame);
      const rect = node.getBoundingClientRect();
      top = rect.top + scrollY;
      height = Math.max(1, rect.height);
      viewport = innerHeight;
      paint();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(node);
    resize.observe(document.body);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", measure);
    motion.addEventListener("change", paint);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", measure);
      motion.removeEventListener("change", paint);
    };
  }, []);

  return <div ref={root} className="bring-journey">
    <svg className="bj-ribbon bj-ribbon-desktop" viewBox="0 0 1164.11 629.455" aria-hidden="true">
      <defs>
        <filter id={`${id}-desktop-transfer`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix className="bj-reveal-transfer" type="matrix" values={revealValues(0)} />
        </filter>
        <mask id={`${id}-desktop`} maskUnits="userSpaceOnUse" x="0" y="0" width="1164.11" height="629.455">
        <image className="bj-reveal-surface" href={desktopReveal} width="1164.11" height="629.455" preserveAspectRatio="none" filter={`url(#${id}-desktop-transfer)`} />
        <rect className="bj-complete-mask" width="1164.11" height="629.455" fill="white" />
      </mask></defs>
      <image href={ribbon} width="1164.11" height="629.455" mask={`url(#${id}-desktop)`} />
    </svg>
    <svg className="bj-ribbon bj-ribbon-mobile" viewBox="0 0 390 850" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id={`${id}-mobile-transfer`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix className="bj-reveal-transfer" type="matrix" values={revealValues(0)} />
        </filter>
        <mask id={`${id}-mobile`} maskUnits="userSpaceOnUse" x="0" y="0" width="390" height="850">
        <image className="bj-reveal-surface" href={mobileReveal} width="390" height="850" preserveAspectRatio="none" filter={`url(#${id}-mobile-transfer)`} />
        <rect className="bj-complete-mask" width="390" height="850" fill="white" />
      </mask></defs>
      <image href={mobileRibbon} width="390" height="850" preserveAspectRatio="none" mask={`url(#${id}-mobile)`} />
    </svg>
    <ol className="bj-steps">
      {steps.map((step, index) => <li key={step.label} className={`bj-step bj-step-${index + 1}`}>
        <div className={`bj-figure bj-figure-${index + 1}`} data-journey-at={step.at}>
          <div className="bj-entrance"><div className="bj-lift"><img className="bj-asset" src={step.image} alt="" loading="lazy" decoding="async" /></div></div>
        </div>
        <div className={`bj-label bj-label-${index + 1}`}><strong>{step.label}</strong><em>{step.discipline}</em></div>
      </li>)}
    </ol>
    <div className="bj-book" data-journey-at=".45">
      <div className="bj-entrance"><div className="bj-book-tilt">
        <picture>
          <source media="(min-width: 701px)" srcSet={notebook} />
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Open design notebook with research diagrams, interface sketches and code notes" loading="lazy" decoding="async" />
        </picture>
        <span className="bj-book-detail" aria-hidden="true" />
      </div></div>
    </div>
  </div>;
}
