import { useId, useState, type KeyboardEvent } from "react";
import solutionsWireframe from "../../../assets/Alchemic/Solutions Lofi.jpg";
import solutionsLive from "../../../assets/Alchemic/Packaging testing.png";
import technologyWireframe from "../../../assets/Alchemic/AI insights lofi.jpg";
import technologyLive from "../../../assets/Alchemic/AI Insights Platform.png";
import technologyMobile from "../../../assets/Alchemic/mobile view technology page.png";
import listenLabs from "../../../assets/Alchemic/Compare - Listen Labs.png";
import surveyMonkey from "../../../assets/Alchemic/Compare - Survey Monkey.png";

/** Drop each file in assets/Alchemic and set `src` to its imported URL. Leave `url` unset until the live address is confirmed. */
export type AlchemicShot = {
  file: string;
  label: string;
  alt: string;
  src?: string;
};

export type AlchemicPageAsset = {
  id: string;
  tab: string;
  wireframe: AlchemicShot;
  live: AlchemicShot;
  url?: string;
};

export type AlchemicShippedAsset = {
  id: string;
  title: string;
  shot: AlchemicShot;
  published?: boolean;
  url?: string;
};

export const alchemicWebsiteAssets: {
  pages: AlchemicPageAsset[];
  responsive: { desktop: AlchemicShot; mobile: AlchemicShot };
  shipped: AlchemicShippedAsset[];
} = {
  pages: [
    {
      id: "solutions",
      tab: "Solutions ( Packaging Testing )",
      wireframe: {
        file: "Solutions Lofi.jpg",
        src: solutionsWireframe,
        label: "Paper Wireframe — Image to be added",
        alt: "Paper wireframe for the Solutions ad testing page",
      },
      live: {
        file: "Packaging testing.png",
        src: solutionsLive,
        label: "Live Website — Screenshot to be added",
        alt: "Live Solutions ad testing page on desktop",
      },
      url: "https://thealchemic.com/packaging-testing/",
    },
    {
      id: "technology",
      tab: "Technology ( AI Insights )",
      wireframe: {
        file: "AI insights lofi.jpg",
        src: technologyWireframe,
        label: "Paper Wireframe — Image to be added",
        alt: "Paper wireframe for the Technology page",
      },
      live: {
        file: "AI Insights Platform.png",
        src: technologyLive,
        label: "Live Website — Screenshot to be added",
        alt: "Live Technology page on desktop",
      },
      url: "https://thealchemic.com/insights-platform/",
    },
  ],
  responsive: {
    desktop: {
      file: "AI Insights Platform.png",
      src: technologyLive,
      label: "Desktop Screenshot — To be added",
      alt: "Desktop layout of the Technology page",
    },
    mobile: {
      file: "mobile view technology page.png",
      src: technologyMobile,
      label: "Mobile Screenshot — To be added",
      alt: "Mobile layout of the Technology page",
    },
  },
  shipped: [
    {
      id: "comparison-01",
      title: "Alchemic vs Listen Labs",
      shot: {
        file: "Compare - Listen Labs.png",
        src: listenLabs,
        label: "Comparison page 01 — Screenshot to be added",
        alt: "Listen Labs comparison page",
      },
    },
    {
      id: "comparison-02",
      title: "Alchemic vs Survey Monkey",
      shot: {
        file: "Compare - Survey Monkey.png",
        src: surveyMonkey,
        label: "Comparison page 02 — Screenshot to be added",
        alt: "SurveyMonkey comparison page",
      },
    },
  ],
};

const decisions = [
  {
    number: "01",
    title: "Show what the product does, not just describe it.",
    text: "Purposeful visuals helped businesses understand Alchemic's offerings, processes and comparisons without relying entirely on text.",
  },
  {
    number: "02",
    title: "Consistent patterns. Different emphasis.",
    text: "Shared typography, card treatments and FAQ patterns brought the pages together, while varied compositions helped important information stand out.",
  },
  {
    number: "03",
    title: "Use motion to make technology easier to understand.",
    text: "A coded motion treatment communicated the Technology page's message without depending on a heavy pre-rendered video.",
  },
];

function FrameShot({ shot }: { shot: AlchemicShot }) {
  if (shot.src) {
    return <img className="alc-site-photo" src={shot.src} alt={shot.alt} loading="lazy" decoding="async" draggable={false} />;
  }
  return (
    <div className="alc-site-shot" role="img" aria-label={shot.label}>
      <span aria-hidden="true">{shot.label}</span>
    </div>
  );
}

function Monitor({ shot, showLive = false, scrollKey }: { shot: AlchemicShot; showLive?: boolean; scrollKey: string }) {
  return (
    <div className="alc-site-monitor">
      {showLive ? <span className="alc-site-live">Live</span> : null}
      <div className="alc-site-bezel">
        <div className="alc-site-screen alc-site-scroll" key={scrollKey}>
          <FrameShot shot={shot} />
        </div>
      </div>
      <div className="alc-site-stand" aria-hidden="true">
        <span />
        <span />
      </div>
    </div>
  );
}

function Phone({ shot, scrollKey }: { shot: AlchemicShot; scrollKey: string }) {
  return (
    <div className="alc-site-phone">
      <div className="alc-site-phone-screen alc-site-scroll" key={scrollKey}>
        <FrameShot shot={shot} />
      </div>
    </div>
  );
}

function BrowserPreview({ item }: { item: AlchemicShippedAsset }) {
  return (
    <figure className="alc-site-ship-card">
      <figcaption>
        <span>{item.title}</span>
        {item.url ? (
          <a className="alc-site-open" href={item.url} target="_blank" rel="noreferrer">
            Open Page ↗
          </a>
        ) : null}
      </figcaption>
      <div className="alc-site-browser">
        <div className="alc-site-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {item.published ? <span className="alc-site-live">Live</span> : null}
        <div className="alc-site-screen alc-site-scroll">
          <FrameShot shot={item.shot} />
        </div>
      </div>
    </figure>
  );
}

function WebsiteCompare() {
  const { pages } = alchemicWebsiteAssets;
  const baseId = useId();
  const [activeId, setActiveId] = useState(pages[0]?.id ?? "solutions");
  const [mobileView, setMobileView] = useState<"wireframe" | "live">("wireframe");
  const page = pages.find((item) => item.id === activeId) ?? pages[0];

  if (!page) return null;

  const selectPage = (id: string) => {
    setActiveId(id);
    setMobileView("wireframe");
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? (index + 1) % pages.length : (index - 1 + pages.length) % pages.length;
    const nextPage = pages[next];
    if (!nextPage) return;
    selectPage(nextPage.id);
    document.getElementById(`${baseId}-${nextPage.id}`)?.focus();
  };

  return (
    <div className="alc-site-compare">
      <div className="alc-site-tabs" role="tablist" aria-label="Website pages">
        {pages.map((item, index) => (
          <button
            key={item.id}
            id={`${baseId}-${item.id}`}
            type="button"
            role="tab"
            aria-selected={item.id === page.id}
            aria-controls={`${baseId}-panel`}
            tabIndex={item.id === page.id ? 0 : -1}
            onClick={() => selectPage(item.id)}
            onKeyDown={(event) => onTabKey(event, index)}
          >
            {item.tab}
          </button>
        ))}
      </div>
      <div className="alc-site-tabs alc-site-toggle" role="group" aria-label="Preview">
        <button type="button" aria-pressed={mobileView === "wireframe"} onClick={() => setMobileView("wireframe")}>
          Wireframe
        </button>
        <button type="button" aria-pressed={mobileView === "live"} onClick={() => setMobileView("live")}>
          Live Website
        </button>
      </div>
      <div
        id={`${baseId}-panel`}
        className="alc-site-split"
        role="tabpanel"
        aria-labelledby={`${baseId}-${page.id}`}
        data-view={mobileView}
      >
        <div className="alc-site-pane alc-site-pane-wire">
          <p className="alc-site-label">Paper wireframe</p>
          <div className="alc-site-scroll" key={`${page.id}-wire`}>
            <FrameShot shot={page.wireframe} />
          </div>
        </div>
        <div className="alc-site-pane alc-site-pane-live">
          <p className="alc-site-label">Live website</p>
          <Monitor shot={page.live} showLive scrollKey={`${page.id}-live`} />
        </div>
      </div>
      {page.url ? (
        <p className="alc-site-page-link">
          <a className="alc-site-open" href={page.url} target="_blank" rel="noreferrer">
            Open Page ↗
          </a>
        </p>
      ) : null}
    </div>
  );
}

export function AlchemicWebsite() {
  const { responsive, shipped } = alchemicWebsiteAssets;

  return (
    <section id="case-alchemic-website" className="case-chapter alc-website">
      <p>
        02
        <span className="case-chapter-kicker">Website</span>
      </p>
      <h2>Designing for Understanding</h2>
      <div className="case-chapter-body">
        <p className="alc-site-statement">The website had the information. But was it communicating?</p>
        <p className="case-chapter-copy">
          The initial AI-generated pages relied heavily on text, inconsistent visual patterns and repetitive layouts. The challenge was to help businesses understand Alchemic's offerings without making every page look identical.
        </p>
        <WebsiteCompare />
        <div className="case-subsection">
          <h3>The decisions behind the experience</h3>
        </div>
        <ol className="alc-site-cards">
          {decisions.map((item) => (
            <li key={item.number}>
              <span>{item.number}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
        <div className="case-subsection">
          <p className="alc-kicker">Responsive experience</p>
          <h3>Same message. A different layout.</h3>
          <p className="case-chapter-copy">
            The desktop compositions needed to work on smaller screens without losing their hierarchy, readability or key interactions.
          </p>
        </div>
        <div className="alc-site-devices">
          <div className="alc-site-device">
            <p className="alc-site-label">Desktop View</p>
            <Monitor shot={responsive.desktop} scrollKey="responsive-desktop" />
          </div>
          <div className="alc-site-device alc-site-device-phone">
            <p className="alc-site-label">Mobile View</p>
            <Phone shot={responsive.mobile} scrollKey="responsive-mobile" />
          </div>
        </div>
        <div className="case-subsection">
          <h3>Also Shipped</h3>
          <p className="case-chapter-copy">Comparison pages designed, built and deployed from supplied business content.</p>
        </div>
        <div className="alc-site-shipped">
          {shipped.map((item) => (
            <BrowserPreview key={item.id} item={item} />
          ))}
        </div>
        <div className="alc-site-outcome">
          <p className="alc-kicker">After launch</p>
          <p className="alc-site-outcome-line">More businesses started reaching out.</p>
          <p className="case-chapter-copy">Following the website updates, my manager reported an increase in inbound business enquiries.</p>
        </div>
      </div>
    </section>
  );
}
