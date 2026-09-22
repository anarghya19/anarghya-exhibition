import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyShell } from "@/components/case-study-shell";
export const Route = createFileRoute("/work/giggles")({
  head: () => ({ meta: [
    { title: "Giggles — Anarghya" }, { name: "description", content: "Giggles tangible interaction game case study by product designer Anarghya." },
    { property: "og:title", content: "Giggles — Anarghya" }, { property: "og:description", content: "Giggles tangible interaction game case study by product designer Anarghya." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <CaseStudyShell title="GIGGLES" />,
});
