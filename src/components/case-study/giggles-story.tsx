import researchVisual from "../../../assets/Giggles/Research.png";
import approachesVisual from "../../../assets/Giggles/Existing approaches.png";
import ideationVisual from "../../../assets/Giggles/Ideation.png";
import boardVisual from "../../../assets/Giggles/Giggles game board.png";
import activitiesVisual from "../../../assets/Giggles/3 Activities.png";
import turnVisual from "../../../assets/Giggles/Turn at a glance.png";
import repetitionVisual from "../../../assets/Giggles/Repetition.png";
import wrongAnswerVisual from "../../../assets/Giggles/Designing for wrong answer.png";
import sidesVisual from "../../../assets/Giggles/2 sides.png";
import hardwareVisual from "../../../assets/Giggles/Hardware functioning.png";
import componentsVisual from "../../../assets/Giggles/Components used.png";
import finalGif from "../../../assets/Giggles/download.gif";
import behindVisual from "../../../assets/Giggles/Behind the scenes.png";
import gameUiVisual from "../../../assets/Giggles/Game UI.png";
import teacherUiVisual from "../../../assets/Giggles/Teacher app UI.png";
import { GigglesDivider } from "./giggles-divider";

function Frame({ label, tone, image }: { label: string; tone?: string; image?: string }) {
  return (
    <div className={tone ? `gig-frame ${tone}` : "gig-frame"}>
      {image ? (
        <img src={image} alt="" />
      ) : (
        <div className="case-shot-placeholder" role="img" aria-label={label}>
          <strong>{label}</strong>
        </div>
      )}
    </div>
  );
}

export function GigglesStory() {
  return (
    <div id="case-study-content" className="case-study-content">
      <section id="case-giggles-tangible" className="case-chapter">
        <p>
          01
          <span className="case-chapter-kicker">What shaped Giggles</span>
        </p>
        <h2>Starting with the spectrum</h2>
        <div className="case-chapter-body">
          <p className="case-chapter-copy">
            Giggles was designed for autistic children aged 7–13. Before deciding what the experience should be, we looked at how autism can influence everyday interaction and learning.
          </p>
          <Frame label="Research" image={researchVisual} tone="gig-wide" />
          <div className="case-subsection">
            <h3>What stood out</h3>
          </div>
          <div className="case-learnings gig-traits is-plain">
            <div>
              <span className="case-learning-number">01</span>
              <p className="case-chapter-copy">Social situations and sequences may not always be immediately understood.</p>
            </div>
            <div>
              <span className="case-learning-number">02</span>
              <p className="case-chapter-copy">Familiarity and routine can help reduce uncertainty.</p>
            </div>
            <div>
              <span className="case-learning-number">03</span>
              <p className="case-chapter-copy">The same environment can feel very different from one child to another.</p>
            </div>
            <div>
              <span className="case-learning-number">04</span>
              <p className="case-chapter-copy">Support needs are not the same for every child.</p>
            </div>
          </div>
          <div className="case-subsection">
            <h3>How is learning currently supported?</h3>
            <p className="case-chapter-copy">
              We looked at existing approaches to understand how communication, structured learning, sensory processing and everyday activities are currently supported.
            </p>
          </div>
          <Frame label="Existing approaches" image={approachesVisual} tone="gig-land" />
          <p className="case-chapter-copy">
            This gave us a starting point for exploring how these needs could translate into tangible interactions.
          </p>
          <div className="case-subsection">
            <h3>Exploring tangible interactions</h3>
            <p className="case-chapter-copy">We explored three directions around emotion recognition, everyday sequencing and social situations.</p>
          </div>
          <Frame label="Ideation" image={ideationVisual} tone="gig-wide" />
          <p className="case-chapter-copy">
            Across the three directions, children weren't only viewing information — they were choosing, arranging and placing physical objects as part of the activity.
          </p>
          <p className="gig-bridge">These explorations came together in Giggles.</p>
          <p className="case-chapter-copy">
            Giggles became an RFID-enabled physical–digital board game where children move through different learning activities and respond through tangible interactions.
          </p>
          <Frame label="Giggles game board" image={boardVisual} tone="gig-reveal gig-photo" />
        </div>
      </section>

      <GigglesDivider />

      <section id="case-giggles-interaction" className="case-chapter">
        <p>
          02
          <span className="case-chapter-kicker">Designing the child's interaction</span>
        </p>
        <h2>Three activities. Three ways to respond.</h2>
        <div className="case-chapter-body">
          <p className="case-chapter-copy">The final game brings three different activities onto the same board.</p>
          <Frame label="Three activities" image={activitiesVisual} tone="gig-land" />
          <div className="case-subsection">
            <h3>Keeping the interaction consistent</h3>
            <p className="case-chapter-copy">Although the activities change, each turn follows the same basic rhythm:</p>
          </div>
          <Frame label="Turn at a glance" image={turnVisual} tone="gig-wide" />
          <div className="case-subsection">
            <h3>Same block, different question</h3>
            <p className="case-chapter-copy">Each category contains a pool of six questions. Once a question appears, it is temporarily removed from the available pool.</p>
          </div>
          <Frame label="Repetition" image={repetitionVisual} tone="gig-land" />
          <p className="case-chapter-copy">This reduces immediate repetition without changing the physical structure of the game.</p>
          <div className="case-subsection">
            <h3>What happens when an answer is incorrect?</h3>
            <p className="case-chapter-copy">
              Instead of revealing the correct answer immediately, the same activity remains active while the amount of support gradually increases.
            </p>
          </div>
          <Frame label="Designing for a wrong answer" image={wrongAnswerVisual} tone="gig-wide" />
          <div className="case-learnings gig-traits">
            <div>
              <span className="case-learning-number">01</span>
              <h4>Try again</h4>
              <p className="case-chapter-copy">The child gets another attempt.</p>
            </div>
            <div>
              <span className="case-learning-number">02</span>
              <h4>Hint</h4>
              <p className="case-chapter-copy">A hint is introduced before they respond again.</p>
            </div>
            <div>
              <span className="case-learning-number">03</span>
              <h4>Answer reveal</h4>
              <p className="case-chapter-copy">After another incorrect attempt, the correct answer is shown.</p>
            </div>
          </div>
        </div>
      </section>

      <GigglesDivider />

      <section id="case-giggles-educator" className="case-chapter">
        <p>
          03
          <span className="case-chapter-kicker">From play to educator insight</span>
        </p>
        <h2>Both children got the answer right.</h2>
        <div className="case-chapter-body">
          <div className="gig-copy">
            <p className="case-chapter-copy">CHILD A<br />Correct on first attempt.</p>
            <p className="case-chapter-copy">CHILD B<br />Try Again → Hint → Correct.</p>
            <p className="case-chapter-copy">But they didn't take the same path to get there.</p>
          </div>
          <Frame label="Two sides" image={sidesVisual} tone="gig-land" />
          <p className="case-chapter-copy">
            Giggles explores how the interactions leading to an answer could become useful context for the educator — not just whether the final response was correct.
          </p>
        </div>
      </section>

      <GigglesDivider />

      <section id="case-giggles-design" className="case-chapter">
        <p>
          04
          <span className="case-chapter-kicker">Designing the experience</span>
        </p>
        <h2>From game logic to interface</h2>
        <div className="case-chapter-body">
          <p className="case-chapter-copy">
            The child-facing interface keeps the question, visual and feedback central while the physical board remains the primary way to interact.
          </p>
          <Frame label="Game UI" image={gameUiVisual} tone="gig-photo" />
          <div className="case-subsection">
            <h3>The educator side</h3>
            <p className="case-chapter-copy">The educator-facing concept brings session activity, attempts and progress into a separate view.</p>
          </div>
          <Frame label="Teacher app UI" image={teacherUiVisual} tone="gig-photo" />
        </div>
      </section>

      <GigglesDivider />

      <section id="case-giggles-prototype" className="case-chapter">
        <p>
          05
          <span className="case-chapter-kicker">From design to working prototype</span>
        </p>
        <h2>We didn't stop at Figma.</h2>
        <div className="case-chapter-body">
          <p className="case-chapter-copy">
            The final step was making the physical board and digital interface actually respond to each other.
          </p>
          <Frame label="Components used" image={componentsVisual} tone="gig-wide" />
          <Frame label="Hardware functioning" image={hardwareVisual} tone="gig-wide" />
          <p className="case-chapter-copy">
            The prototype uses an ESP32 to connect the physical board, RFID interactions, shape controls and feedback with the child-facing phone interface.
          </p>
          <p className="case-chapter-copy">And finally, it all came together.</p>
          <Frame label="Final experience" image={finalGif} tone="gig-photo" />
          <div className="case-subsection">
            <h3>Behind the scenes</h3>
          </div>
          <Frame label="Behind the scenes" image={behindVisual} tone="gig-strip" />
        </div>
      </section>

      <GigglesDivider />

      <section id="case-giggles-reflection" className="case-chapter">
        <p>
          06
          <span className="case-chapter-kicker">Reflection</span>
        </p>
        <h2>What I took away from Giggles</h2>
        <div className="case-chapter-body">
          <div className="case-reflection">
            <div className="case-learnings">
              <div>
                <span className="case-learning-number">01</span>
                <h4>Designing the interaction beyond the screen</h4>
                <p className="case-chapter-copy">
                  Working with RFID, physical controls, LEDs and a digital interface made us think about an interaction as something that moves between physical and digital touchpoints, rather than something that happens entirely on a screen.
                </p>
              </div>
              <div>
                <span className="case-learning-number">02</span>
                <h4>Designing the response, not only the question</h4>
                <p className="case-chapter-copy">
                  The Try Again → Hint → Answer Reveal logic made the feedback itself part of the experience. What happened after an incorrect response became as important to define as the activity itself.
                </p>
              </div>
              <div>
                <span className="case-learning-number">03</span>
                <h4>Thinking beyond the final outcome</h4>
                <p className="case-chapter-copy">
                  Exploring the educator side shifted the focus from simply recording whether an answer was correct to considering the path a child took to reach it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
