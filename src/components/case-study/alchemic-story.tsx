import imageryStyle from "../../../assets/Alchemic/Imagery style.png";
import { SectionDivider } from "./case-study-content";

function Shot({ label, caption, image }: { label: string; caption?: string; image?: string }) {
  const frame = image ? (
    <img className="case-chapter-image" src={image} alt={label} />
  ) : (
    <div className="case-shot-placeholder" role="img" aria-label={label}>
      <strong>{label}</strong>
    </div>
  );
  if (!caption) return frame;
  return (
    <figure className="case-figure">
      {frame}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Changed({ children }: { children: string }) {
  return (
    <div className="case-subsection">
      <p className="case-mode-label">What this changed</p>
      <p className="case-chapter-copy">{children}</p>
    </div>
  );
}

export function AlchemicStory() {
  return (
    <>
      <section className="alc-intro">
        <div className="alc-prose">
          <h2>At a glance</h2>
          <p>During my internship at Alchemic, I worked across the public website and internal product experience — strengthening how the company communicated its offering, making complex research insights easier to navigate, prototyping interactions and taking selected work into implementation.</p>
          <p>Some internal product work is under NDA, so confidential content has been blurred or selectively shown throughout this case study.</p>
        </div>
      </section>

      <div id="case-study-content" className="case-study-content">
        <section id="case-alchemic-trust" className="case-chapter">
          <p>
            01
            <span className="case-chapter-kicker">Building trust</span>
          </p>
          <h2>Making the offering easier to understand — and trust.</h2>
          <div className="case-chapter-body">
            <div className="case-chapter-intro">
              <p className="case-chapter-copy">
                Alchemic's website had to communicate a complex offering to potential clients quickly. I worked on the Solutions and Technology pages, using imagery, stronger visual hierarchy and a consistent visual language to make the offering easier to understand and give the brand a more credible, established presence.
              </p>
            </div>
            <div className="case-subsection">
              <h3>Giving services a visual identity</h3>
              <p className="case-chapter-copy">
                Rather than relying on text alone, imagery became part of how each service was communicated. The visuals helped distinguish the offerings while creating a stronger visual language across the page.
              </p>
            </div>
            <div className="case-shot-row is-stack">
              <Shot label="Service imagery from the Solutions page." image={imageryStyle} />
              <Shot label="[ SOLUTIONS — CONTENT / HIERARCHY CROP ]" />
              <Shot label="[ SOLUTIONS — PAGE DETAIL CROP ]" />
            </div>
            <div className="case-subsection">
              <h3>Carrying the language across the website</h3>
              <p className="case-chapter-copy">
                The same visual principles were carried into the Technology page so that different parts of the website felt connected rather than independently designed.
              </p>
            </div>
            <Shot label="[ ACTUAL TECHNOLOGY PAGE IMAGE ]" />
            <div className="case-shot-row is-pair">
              <Shot label="[ SOLUTIONS PAGE ]" caption="Solutions" />
              <Shot label="[ TECHNOLOGY PAGE ]" caption="Technology" />
            </div>
            <Changed>
              The website communicates Alchemic's offering through a more visual and consistent experience, helping establish trust before a potential client enters a conversation with the team.
            </Changed>
            <p className="case-chapter-copy">Selected work from this redesign is part of Alchemic's live website.</p>
          </div>
        </section>

        <SectionDivider />

        <section id="case-alchemic-clarity" className="case-chapter">
          <p>
            02
            <span className="case-chapter-kicker">Designing for clarity</span>
          </p>
          <h2>Making the important thing visible first.</h2>
          <div className="case-chapter-body">
            <div className="case-chapter-intro">
              <p className="case-chapter-copy">
                Internal research outputs could contain a lot of information at once. My focus was on creating a clearer hierarchy — helping users understand the key insight first, while keeping supporting context and evidence available when they needed it.
              </p>
            </div>
            <Shot label="[ ACTUAL BLURRED INTERNAL DASHBOARD ]" caption="Internal product · blurred for confidentiality." />
            <div className="case-subsection">
              <h3>Creating hierarchy within the insight</h3>
              <p className="case-chapter-copy">
                Instead of presenting every piece of information with the same visual weight, I structured the experience around the takeaway first, with context and supporting evidence available progressively.
              </p>
            </div>
            <Shot
              label="[ ACTUAL INSIGHT UI SCREEN ]"
              caption="01 — Key insight first · 02 — Supporting context · 03 — Evidence when needed"
            />
            <Changed>
              Instead of giving every piece of information equal weight, the interface creates a clearer path from understanding the takeaway to exploring the evidence behind it.
            </Changed>
          </div>
        </section>

        <SectionDivider />

        <section id="case-alchemic-friction" className="case-chapter">
          <p>
            03
            <span className="case-chapter-kicker">Removing friction</span>
          </p>
          <h2>Making common actions take less effort.</h2>
          <div className="case-chapter-body">
            <div className="case-chapter-intro">
              <p className="case-chapter-copy">
                Across parts of the product, I worked on flows where users were being asked to make more decisions or move through more steps than the task required. I looked for opportunities to remove unnecessary interaction, bring related actions together and make the next step clearer.
              </p>
            </div>
            <div className="case-shot-row">
              <Shot label="[ BLURRED PRODUCT / FLOW SCREEN 01 ]" />
              <Shot label="[ BLURRED PRODUCT / FLOW SCREEN 02 ]" />
              <Shot label="[ BLURRED PRODUCT / FLOW SCREEN 03 ]" />
            </div>
            <div className="case-learnings">
              <div><h4>Remove steps that didn't add value.</h4></div>
              <div><h4>Bring related actions closer together.</h4></div>
              <div><h4>Make the next action easier to find.</h4></div>
            </div>
            <div className="case-shot-row is-pair">
              <Shot label="[ ACTUAL FEATURE / FLOW SCREEN ]" />
              <Shot label="[ ACTUAL FEATURE / FLOW SCREEN ]" />
            </div>
            <Changed>
              The resulting flows asked less from the user while keeping the controls and information they needed within reach.
            </Changed>
          </div>
        </section>

        <SectionDivider />

        <section id="case-alchemic-ai" className="case-chapter">
          <p>
            04
            <span className="case-chapter-kicker">AI as an implementation layer</span>
          </p>
          <h2>Using AI to move from decisions to working experiences.</h2>
          <div className="case-chapter-body">
            <div className="case-chapter-intro">
              <p className="case-chapter-copy">
                AI became a significant part of my implementation workflow during the internship. I used it after the design direction and interaction decisions were defined — helping me translate those decisions into functional prototypes and working outputs faster.
              </p>
            </div>
            <div className="case-subsection">
              <h3>Giving the build better context</h3>
              <p className="case-chapter-copy">
                Rather than repeatedly explaining the interface through prompts, I documented the intended behaviour, states and requirements in a Markdown specification. That specification became part of the context used to build the interaction through Figma Make.
              </p>
            </div>
            <Shot label="[ ACTUAL FIGMA DESIGN CROP ]" caption="Design" />
            <Shot label="[ ACTUAL MARKDOWN SPECIFICATION CROP ]" caption="Specify" />
            <Shot label="[ ACTUAL FIGMA MAKE / BUILD CROP ]" caption="Build" />
            <Shot label="[ ACTUAL WORKING PROTOTYPE / GIF ]" caption="Refine" />
            <div className="case-subsection">
              <h3>Teaching the workflow what I kept repeating</h3>
              <p className="case-chapter-copy">
                As I worked this way more often, I noticed that some implementation instructions kept repeating. For recurring needs, I learnt to create reusable skills so the workflow could retain those patterns instead of requiring the same context every time.
              </p>
            </div>
            <Shot label="[ ACTUAL REUSABLE SKILL SCREENSHOT / FILE ]" />
            <p className="case-chapter-copy">Before — Repeat the same implementation context → After — Reuse the skill and refine from there</p>
            <div className="case-subsection">
              <h3>Testing the interaction by making it work</h3>
              <p className="case-chapter-copy">
                Functional prototypes let me experience behaviours and states that were difficult to judge from static screens alone.
              </p>
            </div>
            <Shot label="[ LARGE ACTUAL FUNCTIONAL PROTOTYPE GIF / VIDEO ]" />
            <Changed>
              AI became an implementation layer rather than a replacement for design thinking — helping me move from defined decisions to working outputs with less repeated setup.
            </Changed>
          </div>
        </section>

        <SectionDivider />

        <section id="case-alchemic-reflection" className="case-chapter">
          <p>
            05
            <span className="case-chapter-kicker">Reflection</span>
          </p>
          <h2>Working on a live product changed what 'done' meant.</h2>
          <div className="case-chapter-body">
            <div className="case-reflection">
              <div className="case-learnings">
                <div>
                  <span className="case-learning-number">01</span>
                  <h4>Design had to communicate business value.</h4>
                  <p className="case-chapter-copy">A page wasn't successful simply because it looked better. The design also had to make Alchemic's offering easier to understand and communicate credibility.</p>
                </div>
                <div>
                  <span className="case-learning-number">02</span>
                  <h4>Hierarchy became a product decision.</h4>
                  <p className="case-chapter-copy">Working with information-heavy AI outputs made me think more carefully about what users needed to understand first, and what could remain available when they wanted to go deeper.</p>
                </div>
                <div>
                  <span className="case-learning-number">03</span>
                  <h4>Implementation became part of my design process.</h4>
                  <p className="case-chapter-copy">Working with specifications, AI-assisted building and reusable skills helped me think beyond static screens and carry design decisions further into functional experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
