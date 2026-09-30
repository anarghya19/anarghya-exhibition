import onecareCover from "../../assets/One Care/One Care Behance/Cover for website.png";
import problemSolution from "../../assets/One Care/One Care Website/Problem - Solution.png";
import storyboard from "../../assets/One Care/One Care Website/Storyboard.png";
import competitorAnalysis from "../../assets/One Care/One Care Website/Competitor Analysis.png";
import careIntegrator from "../../assets/One Care/One Care Website/Care Integrator.png";
import oneCareIa from "../../assets/One Care/One Care Website/One care IA.png";
import cardSorting from "../../assets/One Care/One Care Website/Card sorting.png";
import paperWireframe from "../../assets/One Care/One Care Website/Postcare Paper wireframe.png";
import logoExplorations from "../../assets/One Care/One Care Website/Logo explorations.png";
import logoBreakdown from "../../assets/One Care/One Care Website/Logo breakdown.png";
import uiDesignSystem from "../../assets/One Care/One Care Website/UI Design system.png";
import branding from "../../assets/One Care/One Care Website/Branding.png";
import sixStages from "../../assets/One Care/One Care Website/6 stages.png";
import discoverCare from "../../assets/One Care/One Care Website/Discover Care.png";
import prepareJourney from "../../assets/One Care/One Care Website/Prepare for journey.png";
import myJourney from "../../assets/One Care/One Care Website/My journey.png";
import continueCare from "../../assets/One Care/One Care Website/Continue care.png";
import htmlCss from "../../assets/One Care/One Care Website/HTML CSS.png";
import mediaQuery from "../../assets/One Care/One Care Website/Media query.png";
import javaScript from "../../assets/One Care/One Care Website/Java Script.png";
import dataFlow from "../../assets/One Care/One Care Website/Data flow.png";
import onecareThumb from "../../assets/One care Thumbnail.png";
import alchemicThumb from "../../assets/Alchemic Thumbnail.png";
import gigglesThumb from "../../assets/Giggles Thumbnail.png";
import gigglesCover from "../../assets/Giggles/Cover.png";
import gigglesBrief from "../../assets/Giggles/Problem Solution.png";
import fnpThumb from "../../assets/FNP Thumbnail.png";

export type BriefVisual = "bone" | "game" | "gift" | "insight";

export type ChapterBlock =
  | { type: "text"; text: string; statement?: boolean }
  | { type: "image"; src: string; alt: string; hero?: boolean }
  | { type: "changes"; items: { finding: string; change: string }[]; image?: string; alt?: string }
  | { type: "stack"; steps: string[]; marker?: "plus" }
  | { type: "link"; label: string; href: string }
  | { type: "reflection"; label: string; heading: string; items: { number?: string; title: string; text: string }[] }
  | { type: "intro"; lead?: string; text: string; more?: string; statement?: string; question?: string }
  | { type: "question"; text: string }
  | { type: "mark"; image: string; alt: string; text: string }
  | { type: "palette"; colors: { name: string; hex?: string; swatch: string; role: string }[] }
  | { type: "typefaces"; faces: { name: string; role: string; family: string }[] }
  | { type: "figure"; src: string; alt: string; caption: string; close?: boolean }
  | { type: "split"; image: string; alt: string; heading: string; text: string; statement: string }
  | { type: "points"; items: { number: string; title: string; text: string }[]; large?: boolean }
  | { type: "journey"; stages: { number: string; title: string; text: string }[] }
  | { type: "stats"; items: { figure: string; label: string }[] }
  | { type: "subsection"; heading: string; text?: string; small?: boolean; label?: string }
  | { type: "decision"; statement: string; text?: string; label?: string }
  | { type: "compare"; label?: string; columns: { label: string; steps: string[] }[] }
  | { type: "ladder"; flat?: boolean; items: { level?: string; title: string; text?: string; next?: string }[] }
  | { type: "bridge"; from?: string; to: string }
  | { type: "note"; text: string }
  | { type: "decisions"; items: { number: string; heading: string; found: string; changed: string }[] }
  | { type: "placeholder"; id: string; label: string; caption?: string }
  | { type: "shots"; items: { id: string; label: string }[]; caption?: string }
  | { type: "heading"; text: string }
  | { type: "finding"; image: string; alt: string; finding: string; follow: string }
  | { type: "modes"; columns: { label: string; title: string; items: string[] }[] }
  | { type: "architecture"; src: string; alt: string };

export type CaseStudySection = {
  id: string;
  title: string;
  navTitle?: string;
  kicker?: string;
  numbered?: boolean;
  includeInNav?: boolean;
  blocks?: ChapterBlock[];
};

export type CaseStudy = {
  slug: "onecare" | "alchemic" | "giggles" | "fnp-circle";
  title: string;
  tagline: string;
  heroImage: string;
  cardImage: string;
  lineup: string;
  projectType: string;
  duration: string;
  team: string;
  role: string;
  problem: string;
  solution: string;
  briefVisual: BriefVisual;
  briefImage?: string;
  briefStatement?: string;
  showBriefHeadings?: boolean;
  sections: CaseStudySection[];
  nextSlug: CaseStudy["slug"];
};

const chapters = (...titles: string[]): CaseStudySection[] =>
  titles.map((title) => ({
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    title,
  }));

export const caseStudies: CaseStudy[] = [
  {
    slug: "onecare",
    title: "Onecare",
    tagline: "A care platform simplifying the medical tourism journey from treatment discovery to recovery.",
    heroImage: onecareCover,
    cardImage: onecareThumb,
    lineup: "Strategy · Visual Identity · Experience Design · Development",
    projectType: "Academic Project",
    duration: "8 weeks",
    team: "4 members",
    role: "Research · Design · Development",
    problem:
      "International patients could find hospitals and doctors, but the rest of the journey remained fragmented. Treatment, travel, documents, payments and recovery had to be coordinated across different providers and channels.",
    solution:
      "OneCare connects everything around treatment in one place by helping patients discover suitable care, prepare for their journey, track what happens next and continue recovery after returning home.",
    briefVisual: "bone",
    briefImage: problemSolution,
    sections: [
      {
        id: "opportunity",
        navTitle: "Opportunity",
        kicker: "The opportunity",
        title: "The gap wasn't treatment.\nIt was everything around it.",
        blocks: [
          {
            type: "intro",
            text: "India already offered specialised care, lower treatment costs and shorter waiting periods. But for international patients, choosing a hospital was only the beginning.",
            more: "Documents, travel, accommodation, appointments, payments and recovery still had to be coordinated across different providers and channels.",
          },
          {
            type: "image",
            src: storyboard,
            alt: "A patient journey from finding care, through preparing and treatment, to recovery.",
          },
          {
            type: "figure",
            src: competitorAnalysis,
            alt: "How existing medical-tourism platforms compare, with coordination still fragmented.",
            caption: "Looking at the journey end-to-end revealed that the complexity existed around treatment, not just in finding it.",
          },
          {
            type: "subsection",
            heading: "Discovery was already being solved. Coordination wasn't.",
            text: "Existing medical-tourism platforms largely helped patients discover hospitals, doctors and treatment options. The larger gap was keeping everything around that treatment connected.",
          },
          {
            type: "decision",
            statement: "OneCare wouldn't become another treatment marketplace. It would become the care integrator connecting the journey around treatment.",
          },
          {
            type: "image",
            src: careIntegrator,
            alt: "OneCare connecting hospitals, travel, documents, payments and recovery around one patient journey.",
          },
        ],
      },
      {
        id: "journey",
        navTitle: "Journey",
        kicker: "Designing the journey",
        title: "Patients don't think in services.\nThey think about what happens next.",
        blocks: [
          {
            type: "intro",
            text: "OneCare had to connect hospitals, doctors, documents, travel, accommodation, transport, payments and recovery.",
            more: "Presenting all of these as separate services would simply recreate the complexity patients were already dealing with.",
          },
          {
            type: "image",
            src: sixStages,
            alt: "The OneCare journey, organised as Discover, Prepare, Experience and Continue.",
          },
          {
            type: "decision",
            statement: "Make the patient's stage the organising principle.",
            text: "Instead of asking patients to understand OneCare's service ecosystem, the experience is structured around the patient's stage.",
          },
        ],
      },
      {
        id: "structure",
        navTitle: "Structure",
        kicker: "Structuring the experience",
        title: "One platform.\nTwo very different moments.",
        blocks: [
          {
            type: "intro",
            text: "Someone exploring treatment and someone already travelling for care don't come to OneCare with the same goal.",
            more: "Before committing, patients need to compare and build confidence in their options. Once care is booked, their priority shifts from choosing to coordinating.",
          },
          {
            type: "subsection",
            heading: "Making sense of the service ecosystem",
            text: "Before finalising the structure, we used card sorting to understand how users grouped OneCare's services and where different parts of the journey naturally belonged.",
          },
          {
            type: "figure",
            src: cardSorting,
            alt: "Card sorting used to group OneCare's services.",
            caption: "Card sorting helped inform how the service ecosystem was grouped before the final information architecture was defined.",
          },
          {
            type: "image",
            src: oneCareIa,
            alt: "Before login, OneCare supports exploring care. After login, it supports managing the journey.",
          },
          {
            type: "decision",
            statement: "Separate exploring care from managing care.",
            text: "Before login, OneCare supports discovery and comparison. After login, it becomes a journey-management experience centred around the patient's upcoming care.",
          },
        ],
      },
      {
        id: "refinement",
        navTitle: "Refinement",
        kicker: "Refining the experience",
        title: "",
        blocks: [
          {
            type: "intro",
            lead: "Testing before polishing.",
            text: "Before moving into the final interface, we tested key flows using paper wireframes to see where the journey broke down, what caused hesitation, and what needed to change.",
          },
          {
            type: "figure",
            src: paperWireframe,
            alt: "Paper wireframes used to test early OneCare flows.",
            caption: "Testing early flows with paper wireframes.",
          },
          {
            type: "heading",
            text: "Testing didn't just validate the flow.\nIt changed how it worked.",
          },
          {
            type: "text",
            text: "Testing the paper-wireframe flows exposed moments where the journey still asked too much from the patient. Four findings directly changed the experience.",
          },
          {
            type: "decisions",
            items: [
              {
                number: "01",
                heading: "Don't let unavailability become a dead end.",
                found: "An unavailable doctor could interrupt the journey and leave the patient without a clear next step.",
                changed: "Suitable alternatives were surfaced within the flow instead of forcing the patient to restart their search.",
              },
              {
                number: "02",
                heading: "Recommend before asking patients to choose.",
                found: "Choosing a physiotherapist without enough context placed another decision on a recovering patient.",
                changed: "The experience recommends a suitable therapist first, while still allowing patients to explore alternatives.",
              },
              {
                number: "03",
                heading: "Make completion unmistakable.",
                found: "Bookings and payments needed clearer feedback about whether an action was complete and what changed afterwards.",
                changed: "Confirmation and journey-status updates were strengthened so patients could understand both what happened and what comes next.",
              },
              {
                number: "04",
                heading: "Different stages need clearer language.",
                found: "Some navigation labels were difficult to distinguish.",
                changed: "Labels were simplified and differentiated around the patient's journey, making different areas of the experience easier to recognise.",
              },
            ],
          },
          {
            type: "heading",
            text: "The journey doesn't end\nat discharge.",
          },
          {
            type: "intro",
            text: "Returning home doesn't mean recovery is complete.",
            more: "International patients may still need follow-ups with their operating doctor, physiotherapy and continued recovery support after leaving India.",
          },
          {
            type: "stack",
            steps: ["TREATMENT", "DISCHARGE", "HOME", "RECOVERY", "FOLLOW-UP"],
          },
          {
            type: "image",
            src: continueCare,
            alt: "Continued care after discharge, including teleconsultation, physiotherapy and follow-up.",
          },
          {
            type: "decision",
            statement: "Make continued care part of the core journey, not an add-on.",
            text: "OneCare extends the same coordinated experience into teleconsultation, physiotherapy and follow-up so patients don't lose continuity once they return home.",
          },
        ],
      },
      {
        id: "experience",
        navTitle: "Experience",
        kicker: "Designing the experience",
        title: "Trustworthy,\nwithout feeling clinical.",
        blocks: [
          {
            type: "intro",
            text: "OneCare deals with high-stakes medical decisions, so the experience needed to feel dependable without making an already stressful journey feel cold or institutional.",
            more: "Deep blue creates structure and trust, while lavender and lace soften the experience. Rounded forms and the connected-line motif carry the idea of continuity from the identity into the interface.",
          },
          {
            type: "image",
            src: logoExplorations,
            alt: "Explorations of the OneCare logo.",
          },
          {
            type: "mark",
            image: logoBreakdown,
            alt: "The final OneCare mark, built from a connected line.",
            text: "The mark carries the same connected line into the product, so continuity is visible in the interface as well as the identity.",
          },
          {
            type: "image",
            src: branding,
            alt: "OneCare colour and typography.",
          },
          {
            type: "image",
            src: uiDesignSystem,
            alt: "OneCare interface components.",
          },
          {
            type: "subsection",
            heading: "From identity to interface",
            text: "The same visual language carries through the interface, helping the experience feel connected across discovery, planning, treatment and recovery.",
          },
          {
            type: "heading",
            text: "One journey,\nvisible from beginning to recovery.",
          },
          {
            type: "subsection",
            label: "Discover",
            heading: "Find suitable care.",
            text: "Treatments · Hospitals · Doctors · Packages",
          },
          {
            type: "image",
            src: discoverCare,
            alt: "Screens for discovering treatments, hospitals, doctors and packages.",
          },
          {
            type: "subsection",
            label: "Prepare",
            heading: "Get ready for the journey.",
            text: "Documents · Visa · Appointments · Travel",
          },
          {
            type: "image",
            src: prepareJourney,
            alt: "Screens for documents, visa, appointments and travel before the trip.",
          },
          {
            type: "subsection",
            label: "Experience",
            heading: "Navigate care in India.",
            text: "Arrival · Treatment · Payments · Records",
          },
          {
            type: "image",
            src: myJourney,
            alt: "Screens for arrival, treatment, payments and records during the stay.",
          },
          {
            type: "subsection",
            label: "Continue",
            heading: "Recover beyond discharge.",
            text: "Teleconsultation · Physiotherapy · Recovery · Follow-up",
          },
          {
            type: "image",
            src: continueCare,
            alt: "Screens for teleconsultation, physiotherapy, recovery and follow-up.",
          },
        ],
      },
      {
        id: "build",
        navTitle: "Build",
        kicker: "From design to build",
        title: "Taking it beyond\nthe prototype.",
        blocks: [
          {
            type: "text",
            text: "We developed OneCare as a responsive web experience, bringing the journey architecture and interface system into a working product.",
          },
          {
            type: "stack",
            steps: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
          },
          {
            type: "image",
            src: htmlCss,
            alt: "The OneCare interface built in HTML and CSS.",
          },
          {
            type: "image",
            src: mediaQuery,
            alt: "The same OneCare pages adapting across screen sizes.",
          },
          {
            type: "image",
            src: javaScript,
            alt: "Interactive behaviour in the working OneCare product.",
          },
          {
            type: "image",
            src: dataFlow,
            alt: "How patient information moves through the working product.",
          },
          {
            type: "link",
            label: "View Live Prototype ↗",
            href: "https://anarghya19.github.io/onecare/",
          },
        ],
      },
      {
        id: "reflection",
        navTitle: "Reflection",
        kicker: "Reflection",
        title: "What OneCare changed\nin how I think.",
        blocks: [
          {
            type: "reflection",
            label: "",
            heading: "",
            items: [
              {
                number: "01",
                title: "Design around the person, not the organisation.",
                text: "The clearest structure came from following the patient's journey rather than exposing the complexity of the service ecosystem.",
              },
              {
                number: "02",
                title: "Visibility reduces uncertainty.",
                text: "For a long, high-stakes journey, knowing what has happened and what comes next is part of the experience itself.",
              },
              {
                number: "03",
                title: "Building reveals different problems than designing.",
                text: "Taking the experience into code made responsive behaviour and implementation constraints part of the design process.",
              },
            ],
          },
        ],
      },
    ],
    nextSlug: "alchemic",
  },
  {
    slug: "alchemic",
    title: "Alchemic",
    tagline: "From complex AI insights to clearer, shippable product experiences.",
    heroImage: alchemicThumb,
    cardImage: alchemicThumb,
    lineup: "Product Design · UX · Design Systems · AI Prototyping · Vibe Coding",
    projectType: "Internship",
    duration: "May – July 2026",
    team: "",
    role: "Product Design Intern",
    problem:
      "Alchemic is an AI customer insights platform that helps teams make sense of customer responses and uncover patterns around a brand.",
    solution:
      "I joined as a Product Design Intern, but my work extended beyond interface design. I worked across the public website and internal AI product—from establishing visual systems and simplifying workflows to restructuring how insights were consumed, building testable prototypes, and shipping experiences to production.",
    briefVisual: "insight",
    briefStatement: "My role spanned the distance between designing an experience and getting it into production.",
    showBriefHeadings: false,
    sections: [
      { id: "trust", navTitle: "Building Trust", title: "Building trust" },
      { id: "clarity", navTitle: "Clarity", title: "Designing for clarity" },
      { id: "friction", navTitle: "Friction", title: "Removing friction" },
      { id: "ai", navTitle: "AI Workflow", title: "AI as an implementation layer" },
      { id: "reflection", navTitle: "Reflection", title: "Reflection" },
    ],
    nextSlug: "giggles",
  },
  {
    slug: "giggles",
    title: "Giggles",
    tagline: "A physical-digital game for autistic children, combining play, tangible interaction and code.",
    heroImage: gigglesCover,
    cardImage: gigglesThumb,
    lineup: "Interaction Design · Accessibility · Tangible Design · Prototyping",
    projectType: "Academic Project",
    duration: "3 weeks",
    team: "Team of 5",
    role: "Tangible Interface Design",
    problem:
      "Children with autism can experience communication, sensory input and learning in different ways. Traditional learning activities may not always provide the clarity, predictability and engagement they need.",
    solution:
      "Giggles is a tangible physical–digital learning game that makes learning more interactive and approachable through play. It brings together communication, emotion recognition and motor activities in one experience.",
    briefVisual: "game",
    briefImage: gigglesBrief,
    sections: [
      { id: "tangible", navTitle: "Shaping Giggles", title: "What shaped Giggles" },
      { id: "interaction", navTitle: "Child Interaction", title: "Designing the child's interaction" },
      { id: "educator", navTitle: "Educator Insight", title: "From play to educator insight" },
      { id: "design", navTitle: "Design", title: "Designing the experience" },
      { id: "prototype", navTitle: "Prototype", title: "From design to working prototype" },
      { id: "reflection", navTitle: "Reflection", title: "Reflection" },
    ],
    nextSlug: "fnp-circle",
  },
  {
    slug: "fnp-circle",
    title: "FNP Circle",
    tagline: "A group-gifting experience that helps people plan, contribute and choose gifts together.",
    heroImage: fnpThumb,
    cardImage: fnpThumb,
    lineup: "Research · Design · Testing",
    projectType: "Product Feature",
    duration: "Design project",
    team: "Design team",
    role: "Research · Design · Testing",
    problem:
      "Planning a shared gift meant scattered chats, unclear contributions and a last-minute choice that nobody fully agreed on.",
    solution:
      "FNP Circle gives a group one place to plan the gift, contribute toward it and decide together before it is sent.",
    briefVisual: "gift",
    sections: chapters("Context", "Research", "Strategy", "Structure", "Experience", "Build & Reflect"),
    nextSlug: "onecare",
  },
];

export const getCaseStudy = (slug: CaseStudy["slug"]) => caseStudies.find((study) => study.slug === slug)!;
