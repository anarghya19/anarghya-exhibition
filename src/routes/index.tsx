import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Anarghya — Product Designer" },
    { name: "description", content: "Product design portfolio of Anarghya, exploring human behavior, interaction design and ideas brought to life through code." },
    { property: "og:title", content: "Anarghya — Product Designer" },
    { property: "og:description", content: "A curated exhibition of product design, experiments and art by Anarghya." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Portfolio,
});
