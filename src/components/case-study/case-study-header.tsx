import { ChevronLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

const resumeHref = "https://drive.google.com/file/d/1rty1WM8ae-9wCtcvp9i9Any3fwtxRpph/view?usp=sharing";

export function CaseStudyHeader() {
  return (
    <header className="case-study-header">
      <div className="site-container case-study-nav">
        <Link to="/" className="case-study-nav-link case-study-back">
          <ChevronLeft aria-hidden="true" strokeWidth={1.75} />
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
