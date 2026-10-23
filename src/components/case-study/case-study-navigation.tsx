import { useEffect, useRef, useState } from "react";
import type { CaseStudySection } from "@/data/case-studies";

const numberFor = (index: number) => String(index + 1).padStart(2, "0");

function chapterId(slug: string, id: string) {
  return `case-${slug}-${id}`;
}

export function CaseStudyNavigation({
  slug,
  sections,
}: {
  slug: string;
  sections: CaseStudySection[];
}) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const pinned = useRef(-1);

  const linked = sections.filter((section) => section.includeInNav !== false);

  useEffect(() => {
    const content = document.getElementById("case-study-content");
    const next = document.getElementById("next-project");
    if (!content || !next) return;

    const update = () => {
      const contentTop = content.getBoundingClientRect().top;
      const nextTop = next.getBoundingClientRect().top;
      setVisible(contentTop < 340 && nextTop > window.innerHeight * 0.62);

      const marker = Math.max(320, window.innerHeight * 0.45);
      const chapters = sections.filter((section) => section.includeInNav !== false).map((section) => document.getElementById(chapterId(slug, section.id)));
      let current = 0;
      chapters.forEach((chapter, index) => {
        if (chapter && chapter.getBoundingClientRect().top <= marker) current = index;
      });
      setActive(pinned.current >= 0 ? pinned.current : current);
    };

    update();
    const scroller = document.scrollingElement;
    window.addEventListener("scroll", update, { passive: true });
    scroller?.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      scroller?.removeEventListener("scroll", update);
    };
  }, [sections, slug]);

  const goTo = (index: number) => {
    const section = linked[index];
    if (!section) return;
    const node = document.getElementById(chapterId(slug, section.id));
    pinned.current = index;
    setActive(index);
    setOpen(false);
    if (!node) return;
    const scroller = document.scrollingElement ?? document.documentElement;
    const top = node.getBoundingClientRect().top + scroller.scrollTop - 132;
    scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    const release = () => {
      if (pinned.current !== index) return;
      pinned.current = -1;
      window.dispatchEvent(new Event("scroll"));
    };
    scroller.addEventListener("scrollend", release, { once: true });
    window.setTimeout(release, 1600);
  };

  if (!visible) return null;

  const current = linked[active];

  return (
    <>
      <nav className="case-section-nav" aria-label="Case study chapters">
        <ol>
          {linked.map((section, index) => (
            <li key={section.id} className={index === active ? "is-active" : ""}>
              <button type="button" onClick={() => goTo(index)} aria-current={index === active ? "true" : undefined}>
                {section.navTitle ?? section.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <div className="case-chapter-bar">
        <button
          type="button"
          className="case-chapter-current"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{numberFor(active)} / {numberFor(linked.length - 1)}</span>
          <strong>{current?.navTitle ?? current?.title}</strong>
          <span aria-hidden="true">{open ? "↑" : "↓"}</span>
        </button>
        {open ? (
          <div className="case-chapter-menu">
            {linked.map((section, index) => (
              <button
                key={section.id}
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => goTo(index)}
              >
                <span>{numberFor(index)}</span>
                {section.navTitle ?? section.title}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
