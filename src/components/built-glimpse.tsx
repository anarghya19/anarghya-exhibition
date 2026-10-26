import { useEffect, useRef, useState } from "react";
import "./built-glimpse.css";

type Preview = { title: string; image: string; video?: string };

export function BuiltGlimpse({ previews }: { previews: Preview[] }) {
  const section = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const node = section.current;
    const ribbon = strip.current;
    if (!node || !ribbon) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    const cards = Array.from(ribbon.querySelectorAll<HTMLElement>(".built-glimpse-frame"));
    const track = ribbon.querySelector<HTMLElement>(".built-glimpse-track")!;
    let half = 1;
    let loopWidth = 0;
    let centres: number[] = [];
    let duration = 70000;
    let drift: Animation | undefined;
    const measure = () => {
      half = ribbon.clientWidth / 2;
      loopWidth = track.scrollWidth / 2;
      centres = cards.map((card) => card.offsetLeft + card.offsetWidth / 2);
      drift = track.getAnimations()[0];
      duration = Number(drift?.effect?.getTiming().duration) || 70000;
    };
    const resize = new ResizeObserver(measure);
    resize.observe(ribbon);
    measure();

    const curve = () => {
      // Cached geometry and animation time avoid layout reads during movement.
      const progress = (Number(drift?.currentTime ?? 0) % duration) / duration;
      const maxAngle = half * 2 < 768 ? 2 : half * 2 < 1200 ? 5 : 8;
      cards.forEach((card, index) => {
        const distance = Math.max(-1, Math.min(1, (centres[index] - progress * loopWidth - half) / half));
        card.style.transform = `perspective(1600px) rotateY(${-distance * maxAngle}deg)`;
      });
      frame = window.requestAnimationFrame(curve);
    };
    const sync = () => {
      window.cancelAnimationFrame(frame);
      node.dataset.moving = String(visible && !motion.matches);
      if (visible && !motion.matches) {
        measure();
        setLoadVideo(true);
        frame = window.requestAnimationFrame(curve);
      } else {
        cards.forEach((card) => card.style.removeProperty("transform"));
      }
      node.querySelectorAll("video").forEach((video) => {
        if (visible && !motion.matches) void video.play().catch(() => {});
        else video.pause();
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { rootMargin: "120px" });
    observer.observe(node);
    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      resize.disconnect();
      motion.removeEventListener("change", sync);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={section} className="built-glimpse" aria-labelledby="built-glimpse-heading">
      <div className="site-container built-glimpse-header">
        <h2 id="built-glimpse-heading">Glimpse of what I've built</h2>
        <a className="built-glimpse-link" href="#experiments">
          View built work
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M12 4v16m-6-6 6 6 6-6" />
          </svg>
        </a>
      </div>
      <div ref={strip} className="built-glimpse-strip" tabIndex={0} role="region" aria-label="Project previews: Jurassic Escape, Lumaire, and Gmail Pulse. Focus to pause movement.">
        <div className="built-glimpse-track">
          {[0, 1].map((group) => (
            <div className="built-glimpse-group" key={group} aria-hidden={group === 1 ? true : undefined}>
              {[...previews, ...previews].map((preview, index) => (
                <div className="built-glimpse-frame" data-project={preview.title} key={`${preview.title}-${index}`} aria-hidden={index >= previews.length ? true : undefined}>
                  {preview.video ? (
                    <video src={loadVideo ? preview.video : undefined} poster={preview.image} autoPlay muted loop playsInline preload="none" aria-label={`${preview.title} preview`} />
                  ) : <img src={preview.image} alt={`${preview.title} preview`} loading="lazy" decoding="async" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
