import { useCallback, useEffect, useRef, useState } from "react";
import "./experiments-gallery.css";
import { ExperimentGameWindow } from "./experiment-game-window";

type Experiment = { title: string; image: string; video?: string; game?: string; gameReturnLabel?: string; gameHint?: string };

function Easel({ experiment }: { experiment: Experiment }) {
  const canvas = useRef<HTMLDivElement & HTMLButtonElement>(null);
  const [gameOpen, setGameOpen] = useState(false);
  const closeGame = useCallback(() => setGameOpen(false), []);

  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let bounds: DOMRect | null = null, frame = 0;
    let target: [number, number] = [.5, .5], current: [number, number] = [.5, .5];
    const tick = () => {
      current = [current[0] + (target[0] - current[0]) * .23, current[1] + (target[1] - current[1]) * .23];
      node.style.setProperty("--sx", `${current[0] * 100}%`);
      node.style.setProperty("--sy", `${current[1] * 100}%`);
      frame = Math.abs(target[0] - current[0]) + Math.abs(target[1] - current[1]) > .002 ? requestAnimationFrame(tick) : 0;
    };
    const enter = () => { bounds = node.getBoundingClientRect(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || motion.matches) return;
      bounds ??= node.getBoundingClientRect();
      target = [Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)), Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))];
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const leave = () => { bounds = null; cancelAnimationFrame(frame); frame = 0; };
    const focus = () => { leave(); node.style.setProperty("--sx", "50%"); node.style.setProperty("--sy", "50%"); };
    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    node.addEventListener("focus", focus);
    window.addEventListener("resize", leave);
    window.addEventListener("scroll", leave, true);
    motion.addEventListener("change", leave);
    return () => {
      leave();
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
      node.removeEventListener("focus", focus);
      window.removeEventListener("resize", leave);
      window.removeEventListener("scroll", leave, true);
      motion.removeEventListener("change", leave);
    };
  }, []);

  const artwork = <><img src={experiment.image} alt="" width={1100} height={860} loading="lazy" decoding="async" /><span className="spotlight" aria-hidden="true" /></>;
  return <article className="exhibit" aria-label={experiment.title}>
    <div className="easel">
      <div className="easel-back-leg" aria-hidden="true" /><div className="leg left" aria-hidden="true" /><div className="leg right" aria-hidden="true" /><div className="crossbar" aria-hidden="true" /><div className="top-peg" aria-hidden="true" />
      <div className="canvas-rig">
        {experiment.video || experiment.game
          ? <button ref={canvas} className="canvas" type="button" aria-label={`Play ${experiment.title}`} onClick={() => setGameOpen(true)}>{artwork}</button>
          : <div ref={canvas} className="canvas" tabIndex={0} role="img" aria-label={`${experiment.title} experiment thumbnail`}>{artwork}</div>}
        <div className="canvas-ledge" aria-hidden="true" />
      </div>
    </div>
    {gameOpen && (experiment.game || experiment.video) ? <ExperimentGameWindow title={experiment.title} src={(experiment.game ?? experiment.video)!} onClose={closeGame} trigger={canvas} {...(experiment.video ? { media: "video" as const, returnLabel: "Back to Experiments", hint: "Use the player controls · Closing stops playback" } : {})} {...(experiment.gameReturnLabel ? { returnLabel: experiment.gameReturnLabel } : {})} {...(experiment.gameHint ? { hint: experiment.gameHint } : {})} /> : null}
  </article>;
}

export function ExperimentsGallery({ experiments }: { experiments: readonly Experiment[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ active: 0, per: 3 });
  const last = Math.max(0, experiments.length - position.per);
  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = node.querySelectorAll<HTMLElement>(".exhibit");
      const step = cards[1] && cards[0] ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
      const per = matchMedia("(max-width: 650px)").matches ? 1 : matchMedia("(max-width: 1050px)").matches ? 2 : 3;
      setPosition({ per, active: Math.max(0, Math.min(experiments.length - per, Math.round(node.scrollLeft / step))) });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(node);
    node.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); node.removeEventListener("scroll", schedule); };
  }, [experiments.length]);
  const move = (index: number) => {
    const node = viewport.current;
    if (!node) return;
    const cards = node.querySelectorAll<HTMLElement>(".exhibit");
    const active = Math.max(0, Math.min(last, index));
    const card = cards[active], first = cards[0];
    if (!card || !first) return;
    node.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <section id="experiments" className="experiments-easel" aria-labelledby="experiments-heading">
    <div className="wall-noise" aria-hidden="true" /><div className="wall-vignette" aria-hidden="true" /><div className="gallery-ambient" aria-hidden="true" /><div className="moulding" aria-hidden="true" /><div className="floor" aria-hidden="true" />
    <div className="gallery-shell">
      <header className="gallery-header"><h2 id="experiments-heading">Experiments</h2></header>
      <div className="gallery-stage">
        <button className="arrow arrow-prev" type="button" aria-label="Previous experiments" hidden={!last} disabled={position.active === 0} onClick={() => move(position.active - 1)}><span aria-hidden="true">‹</span></button>
        <div className="gallery-viewport" ref={viewport} tabIndex={0} role="region" aria-label="Experiment artworks, horizontally scrollable" onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(position.active + (event.key === "ArrowRight" ? 1 : -1)); } }}>
          <div className="easel-track">{experiments.map(experiment => <Easel key={experiment.title} experiment={experiment} />)}</div>
        </div>
        <button className="arrow arrow-next" type="button" aria-label="Next experiments" hidden={!last} disabled={position.active === last} onClick={() => move(position.active + 1)}><span aria-hidden="true">›</span></button>
      </div>
      <div className="gallery-bottom"><div className="gallery-dots" hidden={!last} aria-label="Gallery position">{Array.from({ length: last + 1 }, (_, i) => <button type="button" key={i} className={i === position.active ? "active" : ""} aria-label={`Show experiments starting at ${i + 1}`} aria-current={i === position.active ? "true" : undefined} onClick={() => move(i)} />)}</div></div>
    </div>
  </section>;
}
