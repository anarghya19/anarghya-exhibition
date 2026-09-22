import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyShell } from "@/components/case-study-shell";
export const Route = createFileRoute("/work/alchemic")({
  head: () => ({ meta: [
    { title: "Alchemic — Anarghya" }, { name: "description", content: "Alchemic AI customer insights case study by product designer Anarghya." },
    { property: "og:title", content: "Alchemic — Anarghya" }, { property: "og:description", content: "Alchemic AI customer insights case study by product designer Anarghya." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <CaseStudyShell title="ALCHEMIC" />,
});
