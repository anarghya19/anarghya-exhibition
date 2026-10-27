import { useEffect, useMemo, useRef, useState } from "react";
import "./built-glimpse.css";

type Preview = { title: string; image: string; video?: string };

export function BuiltGlimpse({ previews }: { previews: Preview[] }) {
  const strip = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  // Five replaceable slots for now. Existing real experiments are reused rather than inventing projects.
  const exhibits = useMemo(() => Array.from({ length: 5 }, (_, index) => previews[index % previews.length]), [previews]);

  useEffect(() => {
    const viewport = strip.current;
    if (!viewport || !previews.length) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>(".built-glimpse-frame"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let raf = 0;
    let previous: number | null = null;
    let phase = 0;
    let width = viewport.clientWidth;
    let cardWidth = cards[0]?.offsetWidth ?? 200;

    const render = () => {
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1200;
      const gap = mobile ? 18 : tablet ? 28 : 44;
      const step = cardWidth + gap;
      // Original Gallery Orbit (03): independent placements, centre forward,
      // progressively receding frames, with Y rotation — NOT a translated flex track.
      cards.forEach((card, index) => {
        let distance = ((index - phase + 5000) % 5);
        if (distance > 2.5) distance -= 5;
        const distanceAbs = Math.abs(distance);
        const x = distance * step;
        const depth = -distanceAbs * (mobile ? 32 : tablet ? 46 : 58);
        const rotation = -distance * 13;
        const scale = 1 + Math.max(0, 1 - distanceAbs / 2.5) * 0.13;
        // Hide an exhibit before it wraps from the right edge to the left edge.
        const visibility = Math.min(1, Math.max(0, (2.48 - distanceAbs) / 0.28));
        const edge = Math.min(1, Math.max(0, (width / 2 + cardWidth / 2 - Math.abs(x)) / (cardWidth * 0.4)));
        card.style.transform = `translate3d(calc(-50% + ${x}px), -50%, ${depth}px) rotateY(${rotation}deg) scale(${scale})`;
        card.style.opacity = String(visibility * edge);
        card.style.zIndex = String(Math.round(100 - distanceAbs * 12));
      });
    };
    const measure = () => {
      width = viewport.clientWidth;
      cardWidth = cards[0]?.offsetWidth ?? 200;
      render();
    };
    const tick = (time: number) => {
      if (previous !== null) phase = (phase + Math.min((time - previous) / 1000, 0.05) * 0.23) % 5;
      previous = time;
      render();
      raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      previous = null;
      const play = inView && !document.hidden && !motion.matches;
      if (play) {
        setLoadVideo(true);
        raf = requestAnimationFrame(tick);
      }
      viewport.querySelectorAll("video").forEach((video) => {
        if (play) void video.play().catch(() => {});
        else video.pause();
      });
      render();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(viewport);
    measure();
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [previews.length]);

  return (
    <section className="built-glimpse" aria-labelledby="built-glimpse-heading">
      <div className="site-container built-glimpse-header">
        <h2 id="built-glimpse-heading">Glimpse of what I've built</h2>
        <a className="built-glimpse-link" href="#experiments">View Experiments</a>
      </div>
      <div ref={strip} className="built-glimpse-strip" role="region" aria-label="Automatic orbit of experiment previews">
        {exhibits.map((preview, index) => (
          <div
            className="built-glimpse-frame"
            data-project={preview.title}
            key={index}
            aria-hidden={index >= previews.length ? true : undefined}
          >
            {preview.video ? (
              <video src={loadVideo ? preview.video : undefined} poster={preview.image} autoPlay muted loop playsInline preload="none" aria-label={`${preview.title} preview`} />
            ) : (
              <img src={preview.image} alt={index >= previews.length ? "" : `${preview.title} preview`} loading="lazy" decoding="async" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
