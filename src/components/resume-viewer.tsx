import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./resume-viewer.css";
import pages from "./resume-pages.json";

const resume = "/Anarghya_Resume.pdf";

function ResumeWindow({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node.showModal();
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialog}
      className="resume-viewer"
      aria-label="Anarghya's resume"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="resume-viewer__toolbar">
        <button type="button" onClick={onClose}>
          ← Back
        </button>
        <strong>Resume</strong>
        <a href={resume} download="Anarghya_Resume.pdf">
          Download PDF ↓
        </a>
      </div>
      <div className="resume-viewer__pages" role="region" aria-label="Resume document" tabIndex={0}>
        {pages.map((page, index) => (
          <img
            key={page}
            src={page}
            alt={`Anarghya's resume, page ${index + 1}. Download the PDF for selectable text and links.`}
          />
        ))}
      </div>
      <p className="resume-viewer__fallback">
        If the preview is unavailable, use Download PDF above.
      </p>
    </dialog>,
    document.body,
  );
}

export function ResumeLink({
  children = "Resume",
  className,
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a
        href={resume}
        className={className}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          onClick?.();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open ? <ResumeWindow onClose={() => setOpen(false)} /> : null}
    </>
  );
}
