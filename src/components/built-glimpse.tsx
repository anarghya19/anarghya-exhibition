import { useEffect, useMemo, useRef, useState } from "react";
import "./built-glimpse.css";
import { ORBIT_SPEED, orbitLayout, orbitPose } from "./glimpse-orbit";

type Preview = { title: string; image: string; video?: string; previewVideo?: string };

function startOrbit(ribbon: HTMLElement, load: () => void) {
  const cards = Array.from(ribbon.querySelectorAll<HTMLElement>(".glimpse-orbit-frame"));
  const videos = Array.from(ribbon.querySelectorAll("video"));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let layout = orbitLayout(ribbon.clientWidth, cards[0]?.offsetWidth ?? 200);
  let phase = 0;
  let previous: number | null = null;
  let frame = 0;
  let visible = false;
  const paint = () => {
    cards.forEach((card, index) => {
      const pose = orbitPose(index, phase, layout, cards.length);
      card.style.transform = pose.transform;
      card.style.opacity = String(pose.opacity);
      card.style.visibility = pose.opacity > 0 ? "visible" : "hidden";
      card.style.zIndex = String(pose.zIndex);
    });
  };
  const measure = () => {
    layout = orbitLayout(ribbon.clientWidth, cards[0]?.offsetWidth ?? 200);
    paint();
  };
  const tick = (time: number) => {
    if (previous !== null) phase = (phase + Math.min((time - previous) / 1000, .05) * ORBIT_SPEED) % cards.length;
    previous = time;
    paint();
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    previous = null;
    const playing = visible && !document.hidden && !reduced.matches;
    if (playing) {
      load();
      frame = requestAnimationFrame(tick);
    }
    videos.forEach((video) => {
      if (playing) void video.play().catch(() => {});
      else video.pause();
    });
    paint();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    sync();
  });
  const resize = new ResizeObserver(measure);
  observer.observe(ribbon);
  resize.observe(ribbon);
  if (cards[0]) resize.observe(cards[0]);
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  measure();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    resize.disconnect();
    document.removeEventListener("visibilitychange", sync);
    reduced.removeEventListener("change", sync);
  };
}

export function BuiltGlimpse({ previews, preview = false }: { previews: Preview[]; preview?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const exhibits = useMemo(() => previews.length
    ? Array.from({ length: Math.max(6, previews.length * 2) }, (_, index) => previews[index % previews.length]!) : [], [previews]);

  useEffect(() => {
    if (!section.current || !strip.current || !exhibits.length) return;
    return startOrbit(strip.current, () => setLoadVideo(true));
  }, [exhibits]);

  return (
    <section ref={section} className="built-glimpse built-glimpse--orbit" aria-labelledby="built-glimpse-heading">
      <div className="site-container built-glimpse-header">
        <h2 id="built-glimpse-heading">Glimpse of what I've built</h2>
        <a className="built-glimpse-link" href={preview ? "/#experiments" : "#experiments"} target={preview ? "_top" : undefined}>View Experiments</a>
      </div>
      <div ref={strip} className="built-glimpse-strip glimpse-orbit-strip" role="region" aria-label="Automatic gallery orbit of experiment previews">
        {exhibits.map((exhibit, index) => (
          <div className="built-glimpse-frame glimpse-orbit-frame" data-project={exhibit.title} key={`${exhibit.title}-${index}`} aria-hidden={index >= previews.length ? true : undefined}>
            {exhibit.previewVideo || exhibit.video ? <video src={loadVideo ? exhibit.previewVideo ?? exhibit.video : undefined} poster={exhibit.image} autoPlay muted loop playsInline preload="auto" aria-label={`${exhibit.title} preview`} />
              : <img src={exhibit.image} alt={index >= previews.length ? "" : `${exhibit.title} preview`} decoding="async" />}
          </div>
        ))}
      </div>
    </section>
  );
}
