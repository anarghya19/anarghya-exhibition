import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { CaseStudy } from "@/data/case-studies";

const caseStudyPath = {
  onecare: "/work/onecare",
  alchemic: "/work/alchemic",
  giggles: "/work/giggles",
  "fnp-circle": "/work/fnp-circle",
} as const;

function GatedCard({ study }: { study: CaseStudy }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" className={`lined-card is-gated${open ? " is-open" : ""}`} aria-expanded={open} aria-label={`${study.title}, coming soon`} onClick={() => setOpen((value) => !value)}>
      <div className="case-gallery-frame">
        <div className="project-media">
          <img className="project-image" src={study.cardImage} alt="" loading="lazy" decoding="async" />
          <p className="coming-soon"><span>Coming soon</span></p>
        </div>
      </div>
    </button>
  );
}

export function LinedUpWork({ studies }: { studies: CaseStudy[] }) {
  return (
    <section id="next-project" className="lined-work case-gallery-wall case-gallery-bottom" aria-labelledby="lined-work-title">
      <div className="case-gallery-noise" aria-hidden="true" />
      <div className="case-gallery-inside">
        <h2 id="lined-work-title">More on Display</h2>
        <div className="lined-work-grid">
          {studies.map((study) => (
            study.slug === "fnp-circle" ? <GatedCard key={study.slug} study={study} /> :
            <Link key={study.slug} to={caseStudyPath[study.slug]} className="lined-card" aria-label={study.title}>
              <div className="case-gallery-frame">
                <img className="project-image" src={study.cardImage} alt="" loading="lazy" decoding="async" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
