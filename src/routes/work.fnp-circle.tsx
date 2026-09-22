import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyShell } from "@/components/case-study-shell";
export const Route = createFileRoute("/work/fnp-circle")({
  head: () => ({ meta: [
    { title: "FNP Circle — Anarghya" }, { name: "description", content: "FNP Circle group gifting case study by product designer Anarghya." },
    { property: "og:title", content: "FNP Circle — Anarghya" }, { property: "og:description", content: "FNP Circle group gifting case study by product designer Anarghya." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <CaseStudyShell title="FNP CIRCLE" />,
});
