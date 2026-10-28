import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import "./experiment-game-window.css";

export function ExperimentGameWindow({ title, src, onClose, trigger, media = "game", returnLabel = "Close", hint = "Click inside to play · Esc pauses the game · Closing resets this session" }: {
  title: string;
  src: string;
  onClose: () => void;
  trigger: RefObject<HTMLElement | null>;
  returnLabel?: string;
  hint?: string;
  media?: "game" | "video";
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const id = useId();
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const [fullscreenFailed, setFullscreenFailed] = useState(false);

  useEffect(() => {
    const node = dialog.current;
    const windowNode = shell.current;
    const videoNode = video.current;
    if (!node || !windowNode) return;
    const scrollX = window.scrollX, scrollY = window.scrollY;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node.showModal(); // Native modal provides inert background and focus containment.
    close.current?.focus();
    if (videoNode) void videoNode.play().catch(() => {});
    setFullscreenSupported(!!document.fullscreenEnabled && !!windowNode.requestFullscreen);
    const syncFullscreen = () => setFullscreen(document.fullscreenElement === windowNode);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => {
      videoNode?.pause();
      document.removeEventListener("fullscreenchange", syncFullscreen);
      if (document.fullscreenElement === windowNode) void document.exitFullscreen().catch(() => {});
      node.close();
      document.body.style.overflow = priorOverflow;
      // Neither focus restoration nor scroll restoration should animate the page.
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      trigger.current?.focus({ preventScroll: true });
      // The conditional React mount removes the iframe and its entire game session.
    };
  }, [trigger]);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement === shell.current) await document.exitFullscreen();
      else await shell.current?.requestFullscreen();
    } catch {
      setFullscreenFailed(true);
    }
  };

  return createPortal(<dialog ref={dialog} className="experiment-game-window" aria-labelledby={`${id}-title`} aria-describedby={`${id}-hint`}
    onCancel={event => {
      event.preventDefault();
      // Escape belongs to the game while focus is inside its document.
      if (document.activeElement?.tagName !== "IFRAME") onClose();
    }}>
    <div ref={shell} className="experiment-game-shell">
      <div className="experiment-game-toolbar">
        <strong id={`${id}-title`}>{title}</strong>
        {media === "video" ? <a href="https://jurrasicescape.netlify.app/" target="_blank" rel="noopener noreferrer">Try the game ↗</a> : null}
        {fullscreenSupported && !fullscreenFailed ? <button type="button" onClick={() => void toggleFullscreen()}>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</button> : null}
        <button ref={close} type="button" onClick={onClose} aria-label={returnLabel === "Close" ? `Close ${title}` : returnLabel}>{returnLabel === "Close" ? "Close ✕" : `← ${returnLabel}`}</button>
      </div>
      <p id={`${id}-hint`} className="experiment-game-hint">{hint}{fullscreenFailed ? " · Fullscreen unavailable in this browser; you can keep playing here." : ""}</p>
      {media === "video"
        ? <video ref={video} className="experiment-window-video" src={src} controls autoPlay playsInline />
        : <iframe src={src} title={`${title} playable game`} allow="fullscreen; autoplay" allowFullScreen />}
    </div>
  </dialog>, document.body);
}
