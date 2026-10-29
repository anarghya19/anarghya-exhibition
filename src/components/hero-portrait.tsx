import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./hero-portrait.css";

/** V11 artwork interaction; the outer box preserves the approved hero grid. */
export function HeroPortrait({ src }: { src: string }) {
  const host = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const stamp = useRef<(x: number, y: number) => void>(() => {});
  const touch = useRef<{ x: number; y: number; id: number } | null>(null);
  const pointerType = useRef("mouse");
  const lastMove = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const node = host.current;
    const heading = node?.closest(".hero")?.querySelector<HTMLElement>(".hero-title");
    if (!node || !heading) return;
    const align = () => {
      // offsetTop excludes the existing entrance animation's transient transform.
      const offset = window.matchMedia("(min-width: 1200px)").matches
        ? heading.offsetTop - node.offsetTop
        : 0;
      node.style.setProperty("--portrait-v11-offset", `${offset}px`);
    };
    const observer = new ResizeObserver(align);
    observer.observe(node);
    observer.observe(heading);
    window.addEventListener("resize", align);
    align();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", align);
    };
  }, []);

  useEffect(() => {
    const photo = image.current;
    const layer = canvas.current;
    const node = host.current;
    if (!photo || !layer || !node) return;
    const context = layer.getContext("2d");
    const sample = document.createElement("canvas");
    const sampleContext = sample.getContext("2d");
    if (!context || !sampleContext) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const block = 8;
    let width = 0,
      height = 0,
      frame = 0,
      timer = 0,
      seed = 0;
    let visible = false,
      demonstrated = false,
      disposed = false;
    let patches: Array<{ x: number; y: number; time: number; seed: number }> = [];
    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      patches = [];
      context.clearRect(0, 0, width, height);
    };
    const draw = (time: number) => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      if (motion.matches || !visible || document.hidden) {
        patches = [];
        return;
      }
      context.imageSmoothingEnabled = false;
      patches = patches.filter((patch) => time - patch.time < 840);
      for (const patch of patches) {
        const fade = Math.pow(Math.max(0, 1 - (time - patch.time) / 840), 1.4);
        const cx = Math.floor(patch.x / block),
          cy = Math.floor(patch.y / block);
        for (let dy = -7; dy <= 7; dy++)
          for (let dx = -7; dx <= 7; dx++) {
            const gx = cx + dx,
              gy = cy + dy;
            if (
              gx < 0 ||
              gy < 0 ||
              gx >= sample.width ||
              gy >= sample.height ||
              Math.hypot(dx, dy) > 7
            )
              continue;
            const noise = ((((gx * 71 + gy * 137 + patch.seed * 31) % 101) + 101) % 101) / 101;
            if (noise > 0.64 * fade + 0.12) continue;
            context.globalAlpha = fade * (0.7 + noise * 0.3);
            context.drawImage(sample, gx, gy, 1, 1, gx * block, gy * block, block, block);
          }
      }
      context.globalAlpha = 1;
      if (patches.length) frame = requestAnimationFrame(draw);
    };
    const add = (x: number, y: number) => {
      if (disposed || motion.matches || !visible || document.hidden || !width) return;
      patches.push({ x, y, time: performance.now(), seed: ++seed });
      if (patches.length > 10) patches.shift();
      if (!frame) frame = requestAnimationFrame(draw);
    };
    stamp.current = add;
    const demonstrate = () => {
      if (demonstrated || timer || !width || !visible || document.hidden || motion.matches) return;
      timer = window.setTimeout(() => {
        timer = 0;
        if (!visible || document.hidden || motion.matches) return;
        demonstrated = true;
        add(width * 0.36, height * 0.3);
      }, 1250);
    };
    const configure = () => {
      if (!photo.complete || !photo.naturalWidth || disposed) return;
      width = photo.clientWidth;
      height = photo.clientHeight;
      if (!width || !height) return;
      clear();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      layer.width = Math.round(width * ratio);
      layer.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      sample.width = Math.ceil(width / block);
      sample.height = Math.ceil(height / block);
      // Match the original image's contain / center-bottom treatment exactly.
      const fit = Math.min(width / photo.naturalWidth, height / photo.naturalHeight);
      const fittedWidth = photo.naturalWidth * fit,
        fittedHeight = photo.naturalHeight * fit;
      sampleContext.clearRect(0, 0, sample.width, sample.height);
      sampleContext.drawImage(
        photo,
        ((width - fittedWidth) / 2 / width) * sample.width,
        ((height - fittedHeight) / height) * sample.height,
        (fittedWidth / width) * sample.width,
        (fittedHeight / height) * sample.height,
      );
      demonstrate();
    };
    const sync = () => {
      if (motion.matches || document.hidden || !visible) {
        clear();
        window.clearTimeout(timer);
        timer = 0;
      } else demonstrate();
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      sync();
    });
    const resize = new ResizeObserver(configure);
    visibility.observe(photo);
    resize.observe(photo);
    photo.addEventListener("load", configure);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    const outsideTap = (event: PointerEvent) => {
      if (event.pointerType === "touch" && !node.contains(event.target as Node)) setRevealed(false);
    };
    document.addEventListener("pointerdown", outsideTap, { passive: true });
    configure();
    return () => {
      disposed = true;
      clear();
      window.clearTimeout(timer);
      stamp.current = () => {};
      visibility.disconnect();
      resize.disconnect();
      photo.removeEventListener("load", configure);
      document.removeEventListener("visibilitychange", sync);
      document.removeEventListener("pointerdown", outsideTap);
      motion.removeEventListener("change", sync);
    };
  }, []);

  const atPointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    stamp.current(event.clientX - rect.left, event.clientY - rect.top);
  };

  return (
    <div ref={host} className={`portrait-wrap hero-portrait-v11${revealed ? " is-revealed" : ""}`}>
      <div className="hero-portrait-v11__presentation">
        <span className="hero-portrait-v11__instruction" aria-hidden="true">
          <span className="hero-portrait-v11__desktop-hint">Hover over portrait</span>
          <span className="hero-portrait-v11__touch-hint">Tap portrait</span>
        </span>
        <button
          type="button"
          className="hero-portrait-v11__surface"
          aria-label="Interact with Anarghya's portrait"
          aria-describedby="hero-portrait-caption"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setRevealed(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setRevealed(false);
          }}
          onFocus={() => {
            if (pointerType.current !== "touch") setRevealed(true);
          }}
          onBlur={() => setRevealed(false)}
          onPointerDown={(event) => {
            pointerType.current = event.pointerType;
            if (event.pointerType === "touch" || event.pointerType === "pen")
              touch.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
          }}
          onPointerMove={(event) => {
            if (event.pointerType === "touch") {
              if (
                touch.current &&
                Math.hypot(event.clientX - touch.current.x, event.clientY - touch.current.y) > 10
              )
                touch.current = null;
              return;
            }
            if (performance.now() - lastMove.current < 60) return;
            lastMove.current = performance.now();
            atPointer(event);
          }}
          onPointerUp={(event) => {
            const start = touch.current;
            touch.current = null;
            if (
              !start ||
              start.id !== event.pointerId ||
              Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10
            )
              return;
            setRevealed((value) => !value);
            atPointer(event);
          }}
          onPointerCancel={() => {
            touch.current = null;
          }}
          onClick={(event) => {
            if (event.detail !== 0) return; // Native keyboard activation, not a second touch toggle.
            setRevealed(true);
            const rect = event.currentTarget.getBoundingClientRect();
            stamp.current(rect.width * 0.5, rect.height * 0.4);
          }}
        >
          <img
            ref={image}
            src={src}
            alt="Portrait of Anarghya"
            width={394}
            height={507}
            fetchPriority="high"
            decoding="async"
          />
          <canvas ref={canvas} className="hero-portrait-v11__pixels" aria-hidden="true" />
        </button>
        <div id="hero-portrait-caption" className="hero-portrait-v11__caption" aria-live="polite">
          <span className="hero-portrait-v11__label" aria-hidden={revealed}>
            EXHIBIT 001 · SELF PORTRAIT
          </span>
          <span className="hero-portrait-v11__statement" aria-hidden={!revealed}>
            It's the <em>little changes</em> that make the final piece.
          </span>
        </div>
      </div>
    </div>
  );
}
