import workflowIllustration from "../../../assets/Alchemic/Workflow.webp";
import { AlchemicWebsite } from "./alchemic-website";
import { AlchemicProduct } from "./alchemic-product";
import { AlchemicClients } from "./alchemic-clients";
import { AlchemicReflection } from "./alchemic-reflection";

export function AlchemicStory() {
  return (
    <>
      <section className="alc-intro">
        <div className="alc-prose">
          <h2>At a glance</h2>
          <p>During my Product Design Internship at Alchemic, I worked across live web experiences and internal products, taking on responsibilities that went beyond conventional design deliverables.</p>
          <p>NDA Note: Internal product and client work are confidential, so their screens are not shown in this case study.</p>
        </div>
      </section>
      <div id="case-study-content" className="case-study-content">
        <section id="case-alchemic-approach" className="case-chapter alc-approach">
          <p>
            01
            <span className="case-chapter-kicker">Approach</span>
          </p>
          <h2>From early sketches to working experiences.</h2>
          <div className="case-chapter-body">
            <p className="case-chapter-copy">
              Instead of stopping at static designs, I explored ideas on paper and brought them to life through AI-assisted coding—refining interactions, testing functionality and shipping real experiences.
            </p>
            <div className="alc-workflow">
              <img src={workflowIllustration} alt="Sketch, build, validate, and ship" />
            </div>
          </div>
        </section>
        <AlchemicWebsite />
        <AlchemicProduct />
        <AlchemicClients />
        <AlchemicReflection />
      </div>
    </>
  );
}
