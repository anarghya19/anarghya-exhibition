import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BuiltGlimpse } from "@/components/built-glimpse";
import jurassic from "../../assets/Jurassic escape - Desktop final.webp";
import video from "../../assets/jurassic-gallery-preview.mp4";
import viceCity from "../../assets/vice-city-cover.webp";
import outdrive from "../../assets/outdrive-cover.webp";
import viceVideo from "../../assets/vice-city-gallery-preview.mp4";
import outdriveVideo from "../../assets/outdrive-gallery-preview.mp4";
import "./preview.glimpse.css";

export const Route = createFileRoute("/preview/glimpse")({
  beforeLoad: () => { if (!import.meta.env.DEV) throw notFound(); },
  validateSearch: (search: Record<string, unknown>) => ({ canvas: search["canvas"] === 1 || search["canvas"] === "1" || search["canvas"] === true || search["canvas"] === "true" }),
  head: () => ({ meta: [{ title: "Glimpse · development preview" }, { name: "robots", content: "noindex" }] }),
  component: import.meta.env.DEV ? GlimpsePreview : () => null,
});

const previews = [
  { title: "Jurassic Escape", image: jurassic, video },
  { title: "Vice City", image: viceCity, video: viceVideo },
  { title: "OUTDRIVE", image: outdrive, video: outdriveVideo },
];
const widths = [1440, 1280, 1024, 768, 390, 375];

function GlimpsePreview() {
  const { canvas } = Route.useSearch();
  const [width, setWidth] = useState(1440);
  const [height, setHeight] = useState(380);
  const [available, setAvailable] = useState(1440);
  const [fit, setFit] = useState(true);
  const area = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (canvas && content.current) {
      const node = content.current;
      const report = () => window.parent.postMessage({ type: "glimpse-preview-height", height: Math.ceil(node.getBoundingClientRect().height) }, window.location.origin);
      const observer = new ResizeObserver(report);
      observer.observe(node);
      report();
      return () => observer.disconnect();
    }
    if (!area.current) return;
    const observer = new ResizeObserver(([entry]) => { if (entry) setAvailable(entry.contentRect.width); });
    observer.observe(area.current);
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== iframe.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === "glimpse-preview-height" && typeof data.height === "number" && data.height > 100 && data.height < 3000) setHeight(data.height);
    };
    window.addEventListener("message", receive);
    return () => { observer.disconnect(); window.removeEventListener("message", receive); };
  }, [canvas]);

  if (canvas) return <div ref={content}><BuiltGlimpse previews={previews} preview /></div>;
  const scale = fit ? Math.min(1, available / width) : 1;
  return <main className="glimpse-preview">
    <header className="glimpse-preview-toolbar">
      <h1>Gallery Orbit · development preview</h1>
      <div className="glimpse-preview-sizes" aria-label="Preview viewport width">
        {widths.map((size) => <button key={size} type="button" aria-pressed={width === size} onClick={() => setWidth(size)}>{size}px</button>)}
        <label><input type="checkbox" checked={fit} onChange={(event) => setFit(event.target.checked)} /> Fit to window</label>
      </div>
    </header>
    <div className="glimpse-preview-area" ref={area}>
      <div className="glimpse-preview-device" style={{ width: width * scale, height: height * scale }}>
        <iframe ref={iframe} title={`Glimpse at ${width}px`} src="/preview/glimpse?canvas=1" width={width} height={height} style={{ transform: `scale(${scale})` }} />
      </div>
    </div>
  </main>;
}
