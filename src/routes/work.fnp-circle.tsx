import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { getCaseStudy } from "@/data/case-studies";

const study = getCaseStudy("fnp-circle");

export const Route = createFileRoute("/work/fnp-circle")({
  head: () => ({ meta: [
    { title: `${study.title} — Anarghya` },
    { name: "description", content: study.tagline },
    { property: "og:title", content: `${study.title} — Anarghya` },
    { property: "og:description", content: study.tagline },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: () => <CaseStudyPage study={study} />,
});
