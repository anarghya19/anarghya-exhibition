import { useEffect, useState } from "react";
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

  const linked = sections.filter((section) => section.includeInNav !== false);

  useEffect(() => {
    const content = document.getElementById("case-study-content");
    const next = document.getElementById("next-project");
    const chapters = sections.filter((section) => section.includeInNav !== false).map((section) => document.getElementById(chapterId(slug, section.id)));
    if (!content || !next) return;

    const update = () => {
      const contentTop = content.getBoundingClientRect().top;
      const nextTop = next.getBoundingClientRect().top;
      setVisible(contentTop < 340 && nextTop > window.innerHeight * 0.62);

      const marker = window.innerHeight * 0.34;
      let current = 0;
      chapters.forEach((chapter, index) => {
        if (chapter && chapter.getBoundingClientRect().top <= marker) current = index;
      });
      setActive(current);
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
    setActive(index);
    setOpen(false);
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
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
