import { useEffect, useState } from "react";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { AlchemicStory } from "./alchemic-story";
import { GigglesStory } from "./giggles-story";
import { CaseStudyContent, SectionDivider } from "./case-study-content";
import { GigglesDivider } from "./giggles-divider";
import { CaseStudyHeader } from "./case-study-header";
import { CaseStudyNavigation } from "./case-study-navigation";
import { LinedUpWork } from "./next-project";
import { ProjectBrief } from "./project-brief";
import { ProjectHero } from "./project-hero";
import { ProjectMetadata } from "./project-metadata";

/** Replace with the published Giggles Behance case-study URL. */
const GIGGLES_BEHANCE_URL = "https://www.behance.net/gallery/256015117/Giggles-A-Tangible-Learning-game";

function BehanceLink({
  href = "https://www.behance.net/gallery/256015779/ONECARE-Medical-Tourism-Platform",
  label = "Read the detailed OneCare case study on Behance",
}: {
  href?: string;
  label?: string;
}) {
  const [hidden, setHidden] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const section = document.getElementById("next-project");
    const observer = section
      ? new IntersectionObserver(([entry]) => {
          setHidden(entry.isIntersecting);
        })
      : null;
    observer?.observe(section!);
    const timer = window.setTimeout(() => setHint(false), 5000);
    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <p className={hint && !hidden ? "case-behance-hint" : "case-behance-hint is-gone"}>view detailed case study</p>
      <a
        className={hidden ? "case-behance-fab is-hidden" : "case-behance-fab"}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
      >
        <span className="case-behance-mark" aria-hidden="true">Bē</span>
        <span className="case-behance-rest" aria-hidden="true">
          <span className="case-behance-rest-inner">
            Detailed Case Study
            <span className="case-behance-arrow">↗</span>
          </span>
        </span>
      </a>
    </>
  );
}

function linedUpFor(study: CaseStudy) {
  const start = caseStudies.findIndex((item) => item.slug === study.slug);
  return [1, 2, 3].map((step) => caseStudies[(start + step) % caseStudies.length]);
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <article className={`case-study-shell${study.slug === "alchemic" ? " is-alchemic" : ""}${study.slug === "giggles" ? " is-giggles" : ""}${study.slug === "onecare" ? " is-onecare" : ""}`}>
      <CaseStudyHeader />
      <div className="site-container case-study-body">
        <ProjectHero title={study.title} tagline={study.tagline} image={study.heroImage} />
        <ProjectMetadata
          projectType={study.projectType}
          duration={study.duration}
          team={study.team}
          role={study.role}
          {...(study.slug === "alchemic" ? { lineup: study.lineup, roleLabel: "Role" } : {})}
          {...(study.slug === "giggles" ? { roleLabel: "Context" } : {})}
        />
        {study.slug === "alchemic" ? <AlchemicStory /> : study.slug === "giggles" ? (
          <>
            <ProjectBrief problem={study.problem} solution={study.solution} visual={study.briefVisual} image={study.briefImage} {...(study.briefStatement ? { statement: study.briefStatement } : {})} showHeadings={study.showBriefHeadings !== false} title="At a glance" />
            <GigglesDivider />
            <GigglesStory />
          </>
        ) : (
          <>
            <ProjectBrief problem={study.problem} solution={study.solution} visual={study.briefVisual} image={study.briefImage} {...(study.briefStatement ? { statement: study.briefStatement } : {})} showHeadings={study.showBriefHeadings !== false} {...(study.slug === "onecare" ? { title: "At a glance" } : {})} />
            <SectionDivider />
            <CaseStudyContent slug={study.slug} sections={study.sections} />
          </>
        )}
      </div>
      <LinedUpWork studies={linedUpFor(study)} />
      <CaseStudyNavigation slug={study.slug} sections={study.sections} />
      {study.slug === "onecare" ? <BehanceLink /> : null}
      {study.slug === "giggles" ? <BehanceLink href={GIGGLES_BEHANCE_URL} label="Read the detailed Giggles case study on Behance" /> : null}
    </article>
  );
}
