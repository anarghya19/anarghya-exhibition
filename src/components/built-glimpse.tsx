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
    const cards = Array.from(ribbon.querySelectorAll<HTMLElement>(".built-glimpse-frame"));
    const track = ribbon.querySelector<HTMLElement>(".built-glimpse-track")!;
    const group = track.querySelector<HTMLElement>(".built-glimpse-group")!;
    const videos = Array.from(node.querySelectorAll("video"));
    let visible = false;
    let hovered = ribbon.matches(":hover");
    let focused = ribbon.contains(document.activeElement);
    let frame = 0;
    let lastTime: number | null = null;
    let offset = 0;
    let half = 1;
    let loopWidth = 0;
    let centres: number[] = [];
    const speed = 26; // CSS pixels per second, independent of frame rate or group length.

    const render = () => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      const mobile = half * 2 < 768;
      const tablet = half * 2 < 1200;
      const maxAngle = mobile ? 4 : tablet ? 8 : 14;
      const depth = mobile ? 10 : tablet ? 22 : 36;
      cards.forEach((card, index) => {
        const position = (centres[index] - offset - half) / half;
        const distance = Math.max(-1, Math.min(1, position));
        const bend = distance * distance;
        card.style.transform = `perspective(1100px) translate3d(0, ${bend * 2}px, ${-bend * depth}px) rotateY(${-distance * maxAngle}deg)`;
      });
    };
    const measure = () => {
      const oldWidth = loopWidth;
      half = ribbon.clientWidth / 2;
      loopWidth = group.getBoundingClientRect().width;
      centres = cards.map((card) => card.offsetLeft + card.offsetWidth / 2);
      if (oldWidth && loopWidth) offset = (offset / oldWidth * loopWidth) % loopWidth;
      if (!motion.matches) render();
    };
    const tick = (time: number) => {
      // Only cached geometry is used here; no layout reads in the animation loop.
      if (lastTime !== null && loopWidth) {
        offset = (offset + (time - lastTime) / 1000 * speed) % loopWidth;
      }
      lastTime = time;
      render();
      frame = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = null;
      const playing = visible && !document.hidden && !motion.matches;
      if (playing) {
        setLoadVideo(true);
        if (!hovered && !focused) frame = window.requestAnimationFrame(tick);
      }
      videos.forEach((video) => {
        if (playing) void video.play().catch(() => {});
        else video.pause();
      });
      // Ordinary pauses deliberately leave both transforms untouched.
    };
    const onMotion = () => {
      if (motion.matches) {
        track.style.removeProperty("transform");
        cards.forEach((card) => card.style.removeProperty("transform"));
        offset = 0;
      } else measure();
      sync();
    };
    const onEnter = () => { hovered = true; sync(); };
    const onLeave = () => { hovered = false; sync(); };
    const onFocus = () => { focused = true; sync(); };
    const onBlur = (event: FocusEvent) => {
      focused = event.relatedTarget instanceof Node && ribbon.contains(event.relatedTarget);
      sync();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(ribbon);
    resize.observe(group);
    measure();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(ribbon);
    ribbon.addEventListener("pointerenter", onEnter);
    ribbon.addEventListener("pointerleave", onLeave);
    ribbon.addEventListener("focusin", onFocus);
    ribbon.addEventListener("focusout", onBlur);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      resize.disconnect();
      ribbon.removeEventListener("pointerenter", onEnter);
      ribbon.removeEventListener("pointerleave", onLeave);
      ribbon.removeEventListener("focusin", onFocus);
      ribbon.removeEventListener("focusout", onBlur);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotion);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={section} className="built-glimpse" aria-labelledby="built-glimpse-heading">
      <div className="site-container built-glimpse-header">
        <h2 id="built-glimpse-heading">Glimpse of what I've built</h2>
        <a className="built-glimpse-link" href="#experiments">
          View Experiments
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
