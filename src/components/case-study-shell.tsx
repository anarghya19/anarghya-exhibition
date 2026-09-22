import { Link } from "@tanstack/react-router";

export function CaseStudyShell({ title }: { title: string }) {
  return (
    <section className="case-study-shell">
      <div className="site-container">
        <Link to="/" hash="work" className="back-link">← Back to Work</Link>
        <p className="case-kicker">Case study</p>
        <h1>{title}</h1>
        <p className="coming-soon">Coming soon — case study content is being curated.</p>
      </div>
    </section>
  );
}
