import { Fragment, useEffect, useState } from "react";
import type { CaseStudySection } from "@/data/case-studies";

function ArchitectureFigure({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" className="case-ia" onClick={() => setOpen(true)}>
        <img className="case-chapter-image" src={src} alt={alt} loading="lazy" decoding="async" />
      </button>
      <button type="button" className="case-ia-link" onClick={() => setOpen(true)}>
        View full Information Architecture ↗
      </button>
      {open ? (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label="Full information architecture" onClick={() => setOpen(false)}>
          <button type="button" className="case-lightbox-close" onClick={() => setOpen(false)}>Close</button>
          <img src={src} alt={alt} onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </>
  );
}

export function SectionDivider() {
  return <div className="section-divider" aria-hidden="true" />;
}

export function CaseStudyContent({ slug, sections }: { slug: string; sections: CaseStudySection[] }) {
  return (
    <div id="case-study-content" className="case-study-content">
      {sections.map((section, index) => (
        <Fragment key={section.id}>
        <section id={`case-${slug}-${section.id}`} className="case-chapter" data-chapter={index}>
          {section.numbered === false ? (
            section.kicker ? <p className="case-chapter-kicker">{section.kicker}</p> : null
          ) : (
            <p>
              {String(sections.slice(0, index + 1).filter((item) => item.numbered !== false).length).padStart(2, "0")}
              {section.kicker ? <span className="case-chapter-kicker">{section.kicker}</span> : null}
            </p>
          )}
          {section.title ? <h2>{section.title}</h2> : null}
          {section.blocks ? (
            <div className="case-chapter-body">
              {section.blocks.map((block, blockIndex) => {
                if (block.type === "intro") {
                  return (
                    <div key={blockIndex} className="case-chapter-intro">
                      {block.lead ? <p className="case-chapter-lead">{block.lead}</p> : null}
                      <p className="case-chapter-copy">{block.text}</p>
                      {block.more ? <p className="case-chapter-copy">{block.more}</p> : null}
                      {block.statement ? <p className="case-takeaway">{block.statement}</p> : null}
                      {block.question ? <p className="case-question">{block.question}</p> : null}
                    </div>
                  );
                }
                if (block.type === "figure") {
                  return (
                    <figure key={blockIndex} className={block.close ? "case-figure case-figure-close" : "case-figure"}>
                      <img className="case-chapter-image" src={block.src} alt={block.alt} loading="lazy" decoding="async" />
                      <figcaption>{block.caption}</figcaption>
                    </figure>
                  );
                }
                if (block.type === "split") {
                  return (
                    <div key={blockIndex} className="case-split-block">
                      <div className="case-split">
                        <img className="case-chapter-image" src={block.image} alt={block.alt} loading="lazy" decoding="async" />
                        <div>
                          <h3>{block.heading}</h3>
                          <p className="case-chapter-copy">{block.text}</p>
                        </div>
                      </div>
                      <p className="case-takeaway">{block.statement}</p>
                    </div>
                  );
                }
                if (block.type === "points") {
                  return (
                    <div key={blockIndex} className={block.large ? "case-points case-points-large" : "case-points"}>
                      {block.items.map((item) => (
                        <div key={item.number} className="case-point">
                          <h3><span>{item.number}</span>{item.title}</h3>
                          <p>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  );
                }
                if (block.type === "stats") {
                  return (
                    <div key={blockIndex} className="case-stats">
                      {block.items.map((item) => (
                        <p key={item.figure} className="case-stat">
                          <strong>{item.figure}</strong>
                          <span>{item.label}</span>
                        </p>
                      ))}
                    </div>
                  );
                }
                if (block.type === "journey") {
                  return (
                    <ol key={blockIndex} className="case-journey">
                      {block.stages.map((stage) => (
                        <li key={stage.number}>
                          <span>{stage.number}</span>
                          <h3>{stage.title}</h3>
                          <p>{stage.text}</p>
                        </li>
                      ))}
                    </ol>
                  );
                }
                if (block.type === "subsection") {
                  return (
                    <div key={blockIndex} className={block.small ? "case-subsection case-subsection-small" : "case-subsection"}>
                      {block.label ? <p className="case-mode-label">{block.label}</p> : null}
                      <h3>{block.heading}</h3>
                      {block.text ? <p className="case-chapter-copy">{block.text}</p> : null}
                    </div>
                  );
                }
                if (block.type === "finding") {
                  return (
                    <div key={blockIndex} className="case-finding-block">
                      <div className="case-finding">
                        <img className="case-chapter-image" src={block.image} alt={block.alt} loading="lazy" decoding="async" />
                        <p className="case-chapter-copy">{block.finding}</p>
                      </div>
                      <p className="case-chapter-copy">{block.follow}</p>
                    </div>
                  );
                }
                if (block.type === "modes") {
                  return (
                    <div key={blockIndex} className="case-modes">
                      {block.columns.map((column) => (
                        <div key={column.label}>
                          <p className="case-mode-label">{column.label}</p>
                          <h3>{column.title}</h3>
                          <ul>
                            {column.items.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  );
                }
                if (block.type === "architecture") {
                  return <ArchitectureFigure key={blockIndex} src={block.src} alt={block.alt} />;
                }
                if (block.type === "mark") {
                  return (
                    <div key={blockIndex} className="case-mark">
                      <img className="case-chapter-image" src={block.image} alt={block.alt} loading="lazy" decoding="async" />
                      <p className="case-chapter-copy">{block.text}</p>
                    </div>
                  );
                }
                if (block.type === "palette") {
                  return (
                    <ul key={blockIndex} className="case-palette">
                      {block.colors.map((color) => (
                        <li key={color.name}>
                          <span className="case-swatch" style={{ background: color.swatch }} />
                          <strong>{color.name}</strong>
                          {color.hex ? <span className="case-hex">{color.hex}</span> : null}
                          <span className="case-role">{color.role}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "typefaces") {
                  return (
                    <div key={blockIndex} className="case-type">
                      {block.faces.map((face) => (
                        <p key={face.name} style={{ fontFamily: face.family }}>
                          {face.name}
                          <span>{face.role}</span>
                        </p>
                      ))}
                    </div>
                  );
                }
                if (block.type === "question") {
                  return <p key={blockIndex} className="case-question">{block.text}</p>;
                }
                if (block.type === "changes") {
                  const list = (
                    <ul className="case-changes">
                      {block.items.map((item) => (
                        <li key={item.finding}>
                          <p>{item.finding}</p>
                          <p className="case-change">→ {item.change}</p>
                        </li>
                      ))}
                    </ul>
                  );
                  if (!block.image) return <div key={blockIndex}>{list}</div>;
                  return (
                    <div key={blockIndex} className="case-changes-split">
                      {list}
                      <img src={block.image} alt={block.alt ?? ""} loading="lazy" decoding="async" />
                    </div>
                  );
                }
                if (block.type === "stack") {
                  return (
                    <ol key={blockIndex} className={block.marker === "plus" ? "case-stack case-stack-plus" : "case-stack"}>
                      {block.steps.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                  );
                }
                if (block.type === "compare") {
                  return (
                    <div key={blockIndex} className="case-compare">
                      {block.label ? <p className="case-mode-label">{block.label}</p> : null}
                      <div className="case-modes">
                        {block.columns.map((column) => (
                          <div key={column.label}>
                            <p className="case-mode-label">{column.label}</p>
                            <ol className="case-stack">
                              {column.steps.map((step) => <li key={step}>{step}</li>)}
                            </ol>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (block.type === "ladder") {
                  return (
                    <ol key={blockIndex} className={block.flat ? "case-ladder is-flat" : "case-ladder"}>
                      {block.items.map((item) => (
                        <li key={item.title}>
                          {item.level ? <p className="case-mode-label">{item.level}</p> : null}
                          <h3>{item.title}</h3>
                          {item.text ? <p className="case-chapter-copy">{item.text}</p> : null}
                          {item.next ? <p className="case-ladder-next">{item.next} ↓</p> : null}
                        </li>
                      ))}
                    </ol>
                  );
                }
                if (block.type === "bridge") {
                  return (
                    <p key={blockIndex} className="case-bridge">
                      {block.from ? <span>{block.from}</span> : null}
                      <span className="case-bridge-arrow" aria-hidden="true">↓</span>
                      <span>{block.to}</span>
                    </p>
                  );
                }
                if (block.type === "note") {
                  return <p key={blockIndex} className="case-note">{block.text}</p>;
                }
                if (block.type === "link") {
                  return (
                    <a key={blockIndex} className="case-prototype-link" href={block.href} target="_blank" rel="noreferrer">
                      {block.label}
                    </a>
                  );
                }
                if (block.type === "reflection") {
                  return (
                    <div key={blockIndex} className="case-reflection">
                      {block.label ? <p className="case-reflection-label">{block.label}</p> : null}
                      {block.heading ? <h3>{block.heading}</h3> : null}
                      <div className="case-learnings">
                        {block.items.map((item) => (
                          <div key={item.title}>
                            {item.number ? <span className="case-learning-number">{item.number}</span> : null}
                            <h4>{item.title}</h4>
                            <p className="case-chapter-copy">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (block.type === "decision") {
                  return (
                    <div key={blockIndex} className="case-key-decision">
                      <p className="case-mode-label">{block.label ?? "Key decision"}</p>
                      <p className="case-takeaway">{block.statement}</p>
                      {block.text ? <p className="case-chapter-copy">{block.text}</p> : null}
                    </div>
                  );
                }
                if (block.type === "decisions") {
                  return (
                    <ol key={blockIndex} className="case-decision-list">
                      {block.items.map((item) => (
                        <li key={item.number} className="case-decision-row">
                          <div className="case-decision-head">
                            <span>{item.number}</span>
                            <h3>{item.heading}</h3>
                          </div>
                          <div className="case-decision-grid">
                            <p><strong>What we found</strong>{item.found}</p>
                            <p><strong>What changed</strong>{item.changed}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  );
                }
                if (block.type === "heading") {
                  return <h2 key={blockIndex}>{block.text}</h2>;
                }
                if (block.type === "shots") {
                  return (
                    <figure key={blockIndex} className="case-figure">
                      <div className="case-shot-row">
                        {block.items.map((item) => (
                          <div key={item.id} className="case-shot-placeholder" data-shot={item.id} role="img" aria-label={item.label}>
                            <strong>{item.label}</strong>
                          </div>
                        ))}
                      </div>
                      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
                    </figure>
                  );
                }
                if (block.type === "placeholder") {
                  const shot = (
                    <div className="case-shot-placeholder" data-shot={block.id} role="img" aria-label={block.label}>
                      <strong>{block.label}</strong>
                    </div>
                  );
                  return block.caption ? (
                    <figure key={blockIndex} className="case-figure">
                      {shot}
                      <figcaption>{block.caption}</figcaption>
                    </figure>
                  ) : (
                    <div key={blockIndex}>{shot}</div>
                  );
                }
                if (block.type === "text") {
                  return <p key={blockIndex} className={block.statement ? "case-takeaway" : "case-chapter-copy"}>{block.text}</p>;
                }
                return <img key={blockIndex} className={block.hero ? "case-chapter-image case-visual case-visual-hero" : "case-chapter-image case-visual"} src={block.src} alt={block.alt} loading="lazy" decoding="async" />;
              })}
            </div>
          ) : (
            <p className="case-chapter-placeholder">This chapter will be written here.</p>
          )}
        </section>
        {index < sections.length - 1 ? <SectionDivider /> : null}
        </Fragment>
      ))}
    </div>
  );
}
