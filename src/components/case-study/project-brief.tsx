import type { BriefVisual } from "@/data/case-studies";

function BriefMark({ kind }: { kind: BriefVisual }) {
  if (kind === "bone") {
    return (
      <svg viewBox="0 0 120 220" aria-hidden="true">
        <path d="M60 18c14 0 24 10 24 22 0 8-4 14-10 18 10 6 16 16 16 28 0 18-14 32-30 32s-30-14-30-32c0-12 6-22 16-28-6-4-10-10-10-18 0-12 10-22 24-22z" />
        <path d="M48 96h24v78c8 2 14 10 14 20 0 12-8 20-18 22-6 8-16 8-22 0-10-2-18-10-18-22 0-10 6-18 14-20V96z" />
      </svg>
    );
  }
  if (kind === "game") {
    return (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect x="28" y="36" width="44" height="44" rx="8" />
        <rect x="84" y="36" width="44" height="44" rx="8" />
        <rect x="56" y="88" width="44" height="44" rx="8" />
      </svg>
    );
  }
  if (kind === "gift") {
    return (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect x="34" y="62" width="92" height="70" rx="6" />
        <path d="M34 78h92M80 62v70M58 62c-10-16-2-28 10-22 6 4 10 14 12 22-8 0-16-6-22 0zM102 62c10-16 2-28-10-22-6 4-10 14-12 22 8 0 16-6 22 0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true">
      <path d="M28 112h18V78H28zM62 112h18V52H62zM96 112h18V68H96zM130 112h18V40h-18z" />
      <path d="M28 48c22 8 36-6 54 2s28 18 50-4" />
    </svg>
  );
}

export function ProjectBrief({
  problem,
  solution,
  visual,
  image,
  statement,
  title = "Project in brief",
  showHeadings = true,
  stacked = false,
}: {
  problem: string;
  solution: string;
  visual: BriefVisual;
  image?: string;
  statement?: string;
  title?: string;
  showHeadings?: boolean;
  stacked?: boolean;
}) {
  return (
    <section className="case-brief" aria-labelledby="project-brief-title">
      <h2 id="project-brief-title">{title}</h2>
      {stacked ? (
        <div className="case-brief-copy">
          <p>{problem}</p>
          <p>{solution}</p>
        </div>
      ) : (
        <div className="case-brief-grid">
          <div className="case-brief-box">
            {showHeadings ? <h3>Problem</h3> : null}
            <p>{problem}</p>
          </div>
          <div className={`case-brief-visual case-brief-visual-${visual}`}>
            {image ? <img className="case-brief-photo" src={image} alt="" /> : <BriefMark kind={visual} />}
          </div>
          <div className="case-brief-box">
            {showHeadings ? <h3>Solution</h3> : null}
            <p>{solution}</p>
          </div>
        </div>
      )}
      {statement ? <p className="case-takeaway">{statement}</p> : null}
    </section>
  );
}
