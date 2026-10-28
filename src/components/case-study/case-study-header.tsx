import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const resumeHref = "https://drive.google.com/file/d/1rty1WM8ae-9wCtcvp9i9Any3fwtxRpph/view?usp=sharing";

export function CaseStudyHeader() {
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    // Sticky positioning is CSS-only, as in the original header. This flag
    // supplies a dark surface when cream links pass over the beige content.
    const update = () => header.current?.toggleAttribute("data-stuck", window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header ref={header} className="case-study-header case-gallery-header">
      <div className="site-container case-study-nav">
        <Link to="/" className="case-study-nav-link case-study-back">
          <ArrowLeft aria-hidden="true" strokeWidth={1.75} />
          Back to Home
        </Link>
        <nav aria-label="Case study">
          <Link to="/" hash="work" className="case-study-nav-link">Work</Link>
          <a className="case-study-nav-link" href={resumeHref} target="_blank" rel="noreferrer">Resume</a>
        </nav>
      </div>
    </header>
  );
}
