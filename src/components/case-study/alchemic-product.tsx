import { useEffect, useState } from "react";
import insightsWireframe from "../../../assets/Alchemic/Dashboard - insights panel.png";
import insightsOverview from "../../../assets/Alchemic/Insights 1.png";
import evidencePanel from "../../../assets/Alchemic/Insights 2.png";

const wireframeAlt = "Conceptual wireframe of three stages: an insights overview, a side panel for evidence, and a full findings view.";

/** Replace `src` with an approved, already-blurred screenshot. Leave it unset until then. */
const implementedShots: { label: string; alt: string; src?: string }[] = [
  { label: "01 — Insights Overview", alt: "Implemented insights overview. Details obscured for confidentiality.", src: insightsOverview },
  { label: "02 — Evidence Side Panel", alt: "Implemented evidence side panel. Details obscured for confidentiality.", src: evidencePanel },
];

function InsightsWireframe() {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const image = <img src={insightsWireframe} alt={wireframeAlt} loading="lazy" decoding="async" />;

  return (
    <>
      <figure className="alc-product-figure">
        {mobile ? (
          <button type="button" className="alc-product-zoom" onClick={() => setOpen(true)}>
            {image}
          </button>
        ) : (
          image
        )}
        <figcaption>Conceptual wireframe illustrating the interaction approach. Internal product screens are confidential.</figcaption>
      </figure>
      {open ? (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label="Research insights wireframe" onClick={() => setOpen(false)}>
          <button type="button" className="case-lightbox-close" onClick={() => setOpen(false)}>
            Close
          </button>
          <img src={insightsWireframe} alt={wireframeAlt} onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </>
  );
}

export function AlchemicProduct() {
  return (
    <section id="case-alchemic-product" className="case-chapter alc-product">
      <p>
        03
        <span className="case-chapter-kicker">Product UX</span>
      </p>
      <h2>Making Research Insights Easier to Explore</h2>
      <div className="case-chapter-body">
        <p className="alc-site-statement">What should clients see first?</p>
        <p className="case-chapter-copy">
          Detailed research findings were competing for attention. The challenge was to make key insights easier to understand without taking away the supporting evidence.
        </p>
        <InsightsWireframe />
        <div className="alc-product-decision">
          <p className="alc-kicker">The design decision</p>
          <div className="alc-product-decision-grid">
            <h3>The insight first. The evidence when needed.</h3>
            <p>
              I organised research findings into insight cards, with the key takeaway, a short observation and participant count visible upfront. A side panel made the detailed evidence accessible without taking clients away from their overview.
            </p>
          </div>
        </div>
        <figure className="alc-product-built">
          <div className="alc-product-shots">
            {implementedShots.map((shot) =>
              shot.src ? (
                <img key={shot.label} src={shot.src} alt={shot.alt} />
              ) : (
                <div key={shot.label} className="alc-product-frame" role="img" aria-label={shot.label}>
                  {shot.label}
                </div>
              ),
            )}
          </div>
          <figcaption>Implemented product screens. Details obscured for confidentiality.</figcaption>
        </figure>
        <div className="alc-site-outcome">
          <p className="alc-kicker">After launch</p>
          <p className="alc-site-outcome-line">It was easier for clients to skim through the insights.</p>
          <p className="case-chapter-copy">Too much information that was generated was clearly organised.</p>
        </div>
        <div className="alc-product-admin">
          <p className="alc-kicker">Also within the product</p>
          <h3>Fewer steps. Easier access.</h3>
          <p>For internal teams, I worked on reducing unnecessary steps in existing workflows and making frequently needed information easier to access.</p>
        </div>
      </div>
    </section>
  );
}
