import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyShell } from "@/components/case-study-shell";
export const Route = createFileRoute("/work/onecare")({
  head: () => ({ meta: [
    { title: "OneCare — Anarghya" }, { name: "description", content: "OneCare medical tourism platform case study by product designer Anarghya." },
    { property: "og:title", content: "OneCare — Anarghya" }, { property: "og:description", content: "OneCare medical tourism platform case study by product designer Anarghya." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <CaseStudyShell title="ONECARE" />,
});
