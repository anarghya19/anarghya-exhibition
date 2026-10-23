import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import workflowWebapp from "../../../assets/Alchemic/workflow-webapp.webp";
import nykaaShot from "../../../assets/Alchemic/nyka.webp";
import instaShot from "../../../assets/Alchemic/insta.webp";
import zeptoShot from "../../../assets/Alchemic/zepto.webp";

type ClientAsset = {
  key: string;
  label: string;
  alt: string;
  src?: string;
};

const clientBuildAssets: { workflow: ClientAsset; apps: ClientAsset[] } = {
  workflow: {
    key: "client-development-workflow",
    label: "Client Development Workflow — Image to be added",
    alt: "Illustrated workflow from paper wireframes to a markdown specification to a functional web app.",
    src: workflowWebapp,
  },
  apps: [
    {
      key: "client-app-01",
      label: "Client App 01 — Blurred Screenshot to be added",
      alt: "Blurred screenshot of a functional client application.",
      src: nykaaShot,
    },
    {
      key: "client-app-02",
      label: "Client App 02 — Blurred Screenshot to be added",
      alt: "Blurred screenshot of a functional client application.",
      src: instaShot,
    },
    {
      key: "client-app-03",
      label: "Client App 03 — Blurred Screenshot to be added",
      alt: "Blurred screenshot of a functional client application.",
      src: zeptoShot,
    },
  ],
};

function useMobileCaseStudy() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return mobile;
}

function scrollClients(scroller: HTMLDivElement | null, direction: -1 | 1) {
  if (!scroller) return;
  const slide = scroller.querySelector<HTMLElement>(".alc-clients-slide");
  if (!slide) return;
  const gap = Number.parseFloat(getComputedStyle(scroller).columnGap) || 16;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  scroller.scrollBy({
    left: direction * (slide.getBoundingClientRect().width + gap),
    behavior: reduce ? "auto" : "smooth",
  });
}

function WorkflowFigure({ asset }: { asset: ClientAsset }) {
  const mobile = useMobileCaseStudy();
  const [open, setOpen] = useState(false);
  const image = asset.src ? <img src={asset.src} alt={asset.alt} /> : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <figure className="alc-clients-workflow">
        <div className="alc-clients-workflow-scroll">
          {image ? (
            mobile ? (
              <button type="button" className="alc-clients-zoom" onClick={() => setOpen(true)} aria-label="Enlarge the client development workflow">
                {image}
              </button>
            ) : (
              image
            )
          ) : (
            <div className="alc-clients-workflow-placeholder" role="img" aria-label={asset.label}>
              {asset.label}
            </div>
          )}
        </div>
      </figure>
      {open && asset.src ? (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label="Client development workflow" onClick={() => setOpen(false)}>
          <button type="button" className="case-lightbox-close" onClick={() => setOpen(false)}>
            Close
          </button>
          <img src={asset.src} alt={asset.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </>
  );
}

function ClientPhone({ asset }: { asset: ClientAsset }) {
  return (
    <div className="alc-clients-phone">
      <div className="alc-clients-ear" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="alc-clients-screen">
        {asset.src ? (
          <img src={asset.src} alt={asset.alt} />
        ) : (
          <p>{asset.label}</p>
        )}
      </div>
    </div>
  );
}

function ClientPhones({ apps }: { apps: ClientAsset[] }) {
  const mobile = useMobileCaseStudy();
  const scroller = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    scrollClients(scroller.current, event.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <figure className="alc-clients-gallery">
      <div
        className="alc-clients-phones"
        ref={scroller}
        aria-label="Client applications"
        {...(mobile
          ? {
              role: "region" as const,
              "aria-roledescription": "carousel",
              tabIndex: 0,
              onKeyDown,
            }
          : {})}
      >
        {apps.map((asset, index) => (
          <div
            key={asset.key}
            className="alc-clients-slide"
            {...(mobile
              ? {
                  role: "group" as const,
                  "aria-roledescription": "slide",
                  "aria-label": `${index + 1} of ${apps.length}`,
                }
              : {})}
          >
            <ClientPhone asset={asset} />
          </div>
        ))}
      </div>
      {mobile ? (
        <div className="alc-clients-controls">
          <button type="button" onClick={() => scrollClients(scroller.current, -1)}>
            Previous
          </button>
          <button type="button" onClick={() => scrollClients(scroller.current, 1)}>
            Next
          </button>
        </div>
      ) : null}
      <figcaption>Functional client applications. Interfaces obscured for confidentiality.</figcaption>
    </figure>
  );
}

export function AlchemicClients() {
  const { workflow, apps } = clientBuildAssets;

  return (
    <section id="case-alchemic-clients" className="case-chapter alc-clients">
      <p>
        04
        <span className="case-chapter-kicker">Client Builds</span>
      </p>
      <h2>Client Builds</h2>
      <div className="case-chapter-body">
        <p className="alc-site-statement">From an idea on paper to a working web app.</p>
        <p className="case-chapter-copy">
          For client projects, I translated early wireframes into detailed Markdown specifications and used AI-assisted coding to build and refine functional web applications.
        </p>
        <WorkflowFigure asset={workflow} />
        <div className="case-subsection">
          <p className="alc-kicker">Built through AI-assisted coding</p>
          <h3>Not just clickable prototypes.</h3>
          <p className="case-chapter-copy">Working applications developed from early sketches and detailed build specifications.</p>
        </div>
        <ClientPhones apps={apps} />
        <p className="alc-clients-takeaway">
          <span>The specification helped turn design decisions into</span>
          <span>instructions I could build and refine.</span>
        </p>
      </div>
    </section>
  );
}
