# Anarghya's Exhibition

Build my personal Product Design portfolio as a complete responsive website.

I am attaching:

1. A full-page screenshot of the final Figma design.
2. The “All Layers” CSS / design export from Figma.

THESE TWO FILES ARE THE SOURCE OF TRUTH.

Use the screenshot to understand:
- composition
- visual hierarchy
- artistic direction
- imagery
- overall feel
- relative relationships between sections

Use the Figma CSS / All Layers export to understand:
- exact desktop dimensions
- spacing
- typography
- colors
- card sizes
- content widths
- gaps
- positioning
- section heights
- proportions

DO NOT redesign my portfolio.

DO NOT turn it into a generic modern Product Designer portfolio.

The objective is to create a polished, responsive, performant WEBSITE VERSION OF MY EXISTING FIGMA DESIGN.

==================================================
MOST IMPORTANT RULE
==================================================

Do NOT copy the Figma-exported CSS literally.

The Figma export contains fixed widths, absolute positioning and dimensions intended for a design canvas.

Treat those values as DESIGN MEASUREMENTS.

Rebuild them intelligently using:

- semantic HTML
- React
- CSS Grid
- Flexbox
- relative positioning
- responsive sizing
- max-width containers
- clamp() where useful
- CSS variables
- reusable components

The desktop version at 1440px should match the Figma composition very closely.

At smaller widths, intelligently adapt the same design rather than shrinking the whole page.

==================================================
TECH STACK
==================================================

Use:

React
TypeScript
Vite

Use Tailwind only if it helps, otherwise use clean CSS modules/global CSS.

Prefer CSS for animation.

Do NOT install large libraries unless genuinely necessary.

Avoid:
- Three.js
- GSAP unless absolutely necessary
- WebGL
- heavy parallax libraries
- complex page-transition libraries
- unnecessary animation libraries
- icon libraries for tiny decorative elements if CSS/SVG can do them

If scroll reveal animations are required, use:
IntersectionObserver + CSS

or a very lightweight solution.

==================================================
GLOBAL DESIGN TOKENS
==================================================

Create CSS variables.

Primary cream:
#FFFDF4

Primary burgundy:
#6F0F18

Near-white:
#FFFCFC

Warm secondary cream used in footer:
#F5EDE1

Black:
#000000

The page background begins with:
#FFFDF4

Typography:

Primary sans-serif:
"Plus Jakarta Sans"

Editorial serif:
"DM Serif Display"

DM Serif Display should mainly appear in italic styling.

Do not substitute these fonts unless loading fails.

Use only necessary font weights to reduce load time.

Suggested loaded weights:

Plus Jakarta Sans:
400
500
600

DM Serif Display:
400 italic

==================================================
GLOBAL DESKTOP SYSTEM
==================================================

The original design is based on:

viewport/design width:
1440px

primary content width:
1280px

main horizontal page margins:
80px

Therefore use something like:

.site-container {
    width: min(1280px, calc(100% - 160px));
    margin-inline: auto;
}

Do not hardcode the entire website to 1440px.

At desktop widths >= 1440px:
the central composition should remain approximately 1280px wide.

Allow full-width burgundy backgrounds to extend edge-to-edge.

At very large screens:
do NOT keep scaling the content endlessly.
Keep approximately 1280–1320px maximum content width.

==================================================
SECTION ORDER
==================================================

The landing page must appear in this exact order:

1. Header / Navigation
2. Hero
3. Work
4. What I Bring to the Table
5. Experiments
6. Art by Anarghya
7. Contact / Footer

Do not add extra sections.

==================================================
01 — HEADER / NAVIGATION
==================================================

Background:
#FFFDF4

Desktop:

1280px content width.

Left:
“anarghya”

Typography:
DM Serif Display
italic
400
20px
27px line-height
color #6F0F18

Center navigation:

Work
Playground
About

Typography:
Plus Jakarta Sans
500
18px
23px line-height
black

Spacing between center nav items:
approximately 70px.

Far right:
Resume

same navigation typography.

The navigation should reproduce the sparse layout in the reference.

Do NOT put it inside:
- a pill
- rounded rectangle
- glass panel
- floating nav
- card
- bordered container

Keep it simple.

INTERACTIONS:

Hover:
black → #6F0F18

Add a very small animated underline or bottom rule.

Animation:
180–220ms.

Navigation anchors:

Work → #work
Playground → #experiments
About → #about
Resume → actual resume link placeholder

Use smooth scrolling.

STICKY BEHAVIOR:

The navbar may become sticky after scrolling.

If sticky:
- cream background
- very subtle opacity
- optional backdrop blur 5–8px
- no visible heavy shadow
- no giant navbar transformation

==================================================
02 — HERO
==================================================

Desktop hero structure:

content approximately:
1290px wide

two-column layout.

Left text column:
approximately 651px

Right portrait:
approximately 394px × 507px

Large gap between columns creates intentional negative space.

Do NOT force these exact fixed dimensions at every breakpoint.
Match them proportionally.

Desktop composition should closely resemble the Figma screenshot.

--------------------
HERO STATEMENT
--------------------

Text:

I like asking the “why”
before I start designing.

Typography:

Plus Jakarta Sans
italic
400
48px
60px line-height
black

Approximate width:
540px

Highlight ONLY:

“why”

in:
#6F0F18

Use DM Serif Display italic for the word “why” if it matches the Figma artwork visually.

Do not add unnecessary highlighting behind it.

--------------------
INTRODUCTION
--------------------

Below the hero statement place:

I’m Anarghya
a Product Designer interested in
understanding human behavior, interaction
design, and bringing ideas to life through code.

Typography:

Plus Jakarta Sans
400
32px
40px line-height

Approximate desktop width:
651px

Match the Figma screenshot's line breaks as closely as practical at 1440px.

The final thought:

“understanding human behavior, interaction
design, and bringing ideas to life through code.”

should appear in burgundy/editorial italic treatment matching the screenshot.

--------------------
VERTICAL SPACING
--------------------

The Figma composition contains significant space between:

hero statement
and
intro paragraph

approximately 134px in the original layout.

Preserve this strong negative space on desktop.

Do not compress the hero.

--------------------
PORTRAIT
--------------------

Use the provided portrait asset.

Desktop target dimensions:
approximately 394 × 507px.

Align portrait toward the right.

Portrait should visually reach the bottom boundary of the cream section.

Do NOT place portrait inside:
- circular container
- card
- blob
- gradient
- floating shape

Use the actual supplied image.

==================================================
HERO ANIMATION
==================================================

The hero should appear quickly.

NO:
- loader
- splash screen
- percentage loading
- letter-by-letter animation
- huge zoom
- typing animation

On initial load:

navigation:
opacity 0 → 1

headline:
opacity 0 → 1
translateY(14px → 0)

intro:
same animation with ~80ms delay

portrait:
opacity 0 → 1
translateY(10px → 0)

Duration:
500–650ms

Easing:
cubic-bezier(0.22, 1, 0.36, 1)

Animations should only use transform and opacity.

==================================================
03 — WORK
==================================================

id:
work

Full width background:
#6F0F18

Desktop inner content:
1280px

Top/bottom padding should follow the Figma's generous spacing.

Section heading:

Work

Typography:
DM Serif Display
italic
400
32px
44px
center aligned
#FFFDF4

The section contains four main projects.

Desktop arrangement:

2 columns
2 rows

Column gap:
approximately 64px

Each project visual block:
approximately 608px wide.

Projects:

ONECARE
End-to-end Medical Tourism Platform

ALCHEMIC (Summer Internship)
AI Customer Insights Platform

GIGGLES
Tangible Interaction Game

FNP CIRCLE
Group Gifting Feature on FNP

==================================================
PROJECT STRUCTURE
==================================================

Each project contains:

1. Large framed project image
2. Small discipline caption attached near bottom-right of image
3. Information plaque below

--------------------
PROJECT IMAGE FRAME
--------------------

Original desktop size:
approximately 608 × 423px.

Recreate the physical framed-work aesthetic seen in the screenshot.

This is NOT a normal product-card thumbnail.

Use the provided image/frame artwork where available.

Preserve:
- thin warm frame
- off-white inner area
- slight dimensional shadow
- exhibition feeling

Original Figma shadow resembles:
15px 15px 10px rgba(0,0,0,.25)

For production reduce slightly if necessary but visually preserve the physical frame.

Do not use border-radius.

--------------------
DISCIPLINE LABEL
--------------------

A small warm gold / cream label appears toward the lower-right of the framed work.

Original approximate dimensions:
348 × 38px.

Typography:
Plus Jakarta Sans
italic
500
12px
15px line-height
black

Example OneCare:

Design Management · Visual Design · Web Development

Other supplied text:

Alchemic:
Product Design · UX · Vibe Coding · AI Prototyping

Giggles:
Interaction Design · Accessibility · Physical Computing

FNP Circle:
use the discipline text present in the supplied design/assets.

Do not turn this into a pill.

Keep rectangular paper-label styling.

==================================================
PROJECT INFORMATION PLAQUES
==================================================

Below each framed project:

approximately:
359 × 139px desktop

The plaque is NOT full width of the image.

Align it toward the left like the Figma.

Background is a muted translucent pink/grey treatment derived from:

rgba(217, 217, 217, 0.34)

against the burgundy section.

It should visually resemble the dusty rose card visible in the screenshot.

Include the four tiny decorative corner details.

Do NOT replace these with random icons.

If supplied corner image assets exist:
use them.

Otherwise reproduce them using tiny CSS/SVG details.

Information typography:

Project name:
Plus Jakarta Sans
600
18px
23px
#FFFCFC

Project subtitle:
Plus Jakarta Sans
italic
400
14px
18px
#FFFCFC

Description:
Plus Jakarta Sans
400
12px
15px
#FFFCFC

Inner left padding:
approximately 32px.

--------------------
EXACT PROJECT COPY
--------------------

ONECARE

End-to-end Medical Tourism Platform

Designed the service, visual experience and coded platform for an international patient journey from discovery to post-surgery care.

ALCHEMIC (Summer Internship)

AI Customer Insights Platform

Designed and shipped product and web experiences, simplifying dense customer insights into clearer, more usable interfaces.

GIGGLES

Tangible Interaction Game

Designed and built a physical-digital game for autistic children, combining gameplay, tangible interaction, electronics and code.

FNP CIRCLE

Group Gifting Feature on FNP

Researched, designed and tested a group-gifting experience that helps people plan, contribute and choose gifts together.

==================================================
PROJECT HOVER
==================================================

Make the WHOLE project clickable.

Hover:

frame:
translateY(-5px)
scale(1.008)

shadow becomes slightly stronger.

discipline label:
translateY(-2px)

information plaque:
translateY(-2px)

Transition:
250ms ease

Do NOT add:
3D rotation
cursor-following
tilt
large scaling
glow

Click can route to:

/work/onecare
/work/alchemic
/work/giggles
/work/fnp-circle

Create simple placeholder case-study route structures if content has not been supplied yet.

==================================================
WORK SCROLL ANIMATION
==================================================

When project rows enter viewport:

opacity 0 → 1
translateY(20px → 0)

Duration:
550ms.

Stagger second project in each row by around 70ms.

Animate only once.

==================================================
04 — WHAT I BRING TO THE TABLE
==================================================

id:
about

Background:
#FFFDF4

Desktop section dimensions in Figma are approximately:

1440px wide
~666px tall

Padding approximately:
80px horizontal
80px top
100px bottom

Heading:

What I bring to the table ?

Typography:

DM Serif Display
italic
400
32px
44px
center
#6F0F18

Below heading:
approximately 64px spacing.

==================================================
CAPABILITY CARDS
==================================================

Four physical printed cards.

Desktop:

4 columns

Card size:
approximately 259px × 378px

Gap:
approximately 86px.

Cards:

01. Find Patterns
UX Research

02. See what works
Product Design

03. Shape interactions
Interaction Design

04. Building the idea
Vibe Coding

Use the supplied card assets wherever possible.

Do NOT recreate them as generic web cards if image assets have been supplied.

The original card contains:

- cream paper body
- burgundy stitched/dotted border
- paper clip/detail at top left
- circular stamp/detail at top right
- illustration in centre
- divider line
- title and discipline near bottom

Text inside card:

Title:
Plus Jakarta Sans
600
18px
23px

Discipline:
Plus Jakarta Sans
italic
400
14px
18px

==================================================
CAPABILITY INTERACTION
==================================================

Treat them like collectible cards.

Hover:

translateY(-6px)

Card 1:
rotate(-0.4deg)

Card 2:
rotate(0.3deg)

Card 3:
rotate(-0.25deg)

Card 4:
rotate(0.4deg)

Shadow slightly increases.

Transition:
250ms

Do not animate internal illustration independently.

On mobile disable rotation.

==================================================
05 — EXPERIMENTS
==================================================

id:
experiments

Full-width burgundy background:
#6F0F18

Experiments and Art belong to the same large burgundy visual environment.

Heading:

Experiments

DM Serif Display
italic
400
32px
44px
center
#FFFDF4

Desktop content:
approximately 1279px width.

Top section contains a gallery light rail.

==================================================
GALLERY LIGHTING RAIL
==================================================

This detail is visually important.

The Figma contains a horizontal gallery track approximately:

1195px wide
14px high

near-black:
#000

with a smaller dark brown top detail:
#392D22

Three spotlight fixtures appear along the rail.

Do not replace this with icons.

Use provided spotlight images if available.

The original fixture width is approximately 125px.

From each light, create a soft triangular light cone.

The light cones use warm translucent cream/gold tones over the burgundy background.

Visual reference colors include:

rgba(255,236,195,.4)
rgba(255,221,148,.4)

Light cone should fade toward burgundy at the top/bottom.

Use:
CSS clip-path or SVG.

A tiny blur around 2px is acceptable.

IMPORTANT PERFORMANCE RULE:

Do NOT use large CSS filter animations.

The blur itself can remain static.

Do not continuously animate the light beams.

==================================================
EXPERIMENT CARDS
==================================================

Three experiments arranged horizontally.

Each whole experiment area is roughly:
385px wide.

Gap between experiment positions:
approximately 63px.

Each image frame:

approximately:
385px × 311px

Background:
#FFFCFC

Border:
5px solid very dark burgundy / black

Examples from the Figma:
#370404
#000000

Shadow:
10px 10px 5px rgba(0,0,0,.25)

Square corners.

Projects:

Gmail Pulse

Description:
A vibe design exploration using Creatie AI to rethink how Gmail surfaces what needs attention.

Netflix VR

Description:
A spatial experience designed in DraftXR, to see how browsing and watching Netflix would work in VR.

Splash Animation

Use the corresponding description from supplied design data.

==================================================
EXPERIMENT LABEL
==================================================

Below each experiment image:

small plaque:
approximately 235px × 121px

Background:
rgba(217,217,217,.34)

Inner text area:
approximately 175–192px wide

Top/left spacing:
approximately 22px / 28px.

Experiment title:

Plus Jakarta Sans
600
18px
23px
#FFFDF4

Description:

Plus Jakarta Sans
400
12px
15px
#FFFDF4

Retain tiny corner decorative points.

==================================================
EXPERIMENT INTERACTION
==================================================

On hover:

image:
translateY(-4px)

shadow:
slightly increases

corresponding spotlight:
opacity increases very slightly

Example:
.78 → .92

Duration:
250ms.

NO flashing.

NO moving light cones.

NO animated gradients.

==================================================
06 — ART BY ANARGHYA
==================================================

Continue directly on burgundy background.

Do not insert a cream divider.

This should feel like a salon / exhibition wall.

Use ALL provided artwork assets.

Do not create an equal grid.

The original Figma composition deliberately uses irregular placement.

Desktop gallery container approximately:
1266px wide.

Artwork layout roughly:

TOP LEFT:
landscape artwork
~385 × 311

UPPER MIDDLE:
smaller portrait/square artwork
~287 × 311

UPPER RIGHT:
portrait artwork
~385 × 512

LOWER LEFT:
portrait artwork
~385 × 512

LOWER RIGHT / CENTER:
larger landscape artwork
~455 × 420

Recreate this visual relationship responsively.

Do not obsessively preserve pixel coordinates at smaller sizes.

Preserve the asymmetric gallery rhythm.

==================================================
ART TITLE
==================================================

Centered among the artworks:

Art by
anarghya

Original combined title area:
approximately 268px wide.

“Art by”:
Plus Jakarta Sans
400

“anarghya”:
DM Serif Display
italic

Desktop scale:
around 50px
64px line-height

Color:
#FFFDF4

==================================================
ART FRAMES
==================================================

Use warm cream / muted gold frame treatments as shown.

Shadow approximately:
10px 10px 5px rgba(0,0,0,.25)

Do not give artwork rounded corners.

==================================================
ART SCROLL REVEAL
==================================================

When each artwork enters viewport:

opacity 0 → 1
scale(.985 → 1)
translateY(10px → 0)

Duration:
500ms

Stagger only subtly.

Do not animate all five sequentially with huge delays.

==================================================
ART HOVER + LIGHTBOX
==================================================

Hover:

scale(1.012)

shadow increases slightly.

Click:
open artwork in a lightweight modal/lightbox.

Lightbox requirements:

- fixed overlay
- dark burgundy / near-black translucent background
- image centered
- max-height ~88vh
- max-width ~90vw
- close button
- click outside closes
- ESC closes
- keyboard accessible
- focus trap if practical

Load high-resolution artwork only when opened.

Use medium preview images on the landing page.

==================================================
07 — CONTACT / FOOTER
==================================================

Return to:
#FFFDF4

Use the same 1280px desktop content width.

The section contains:

LEFT:
closing statement

RIGHT:
large burgundy admission-ticket style contact card.

Bottom:
curation note on left
social links on right.

==================================================
CONTACT COPY
==================================================

Left headline:

Liked the curation?

Typography:
Plus Jakarta Sans
italic
approximately 48px based on visual scale.

Below:

Let’s make something worth exhibiting.

Use editorial styling on:
worth exhibiting.

DM Serif Display italic
burgundy.

Supporting text:

I’m open to Product Design opportunities, collaborations & conversations.

Keep layout and line length close to screenshot.

==================================================
CONTACT TICKET
==================================================

Use supplied ticket artwork if available.

The original ticket image/container is approximately:

517px × 259px.

It has a burgundy body and exhibition/admission-ticket silhouette.

Do not replace this with a rounded rectangle.

Use:
CSS mask
SVG clip-path
or the supplied ticket image.

Ticket content:

Thanks for Visiting

Curated by Anarghya

Say Hello at
anarghya002@gmail.com

Take with you
Resume

Typography:

“Thanks for Visiting”
Plus Jakarta Sans
400
20px
25px
#F5EDE1

“Curated by Anarghya”
DM Serif Display
italic
400
32px
44px
#FFFDF4

Ticket small text:
Plus Jakarta Sans
400
16px
20px
#FFFCFC

Thin divider:
#F5EDE1

Ticket interaction:

hover:
translateY(-3px)
rotate(.25deg)

transition:
250ms

Make email clickable using mailto.

Make Resume clickable.

==================================================
FOOTER BOTTOM ROW
==================================================

Desktop:
1280px width

Left:

small circular curatorial icon
+
Curated by Anarghya · 2026

Typography:
Plus Jakarta Sans
500
20px
25px

Right:

Behance
LinkedIn
Instagram

Typography:
Plus Jakarta Sans
500
18px
23px

Gap:
approximately 32px

Make all links accessible.

==================================================
RESPONSIVE BEHAVIOR
==================================================

DO NOT merely scale the 1440px design down.

Recompose it intelligently.

--------------------
LARGE DESKTOP
>= 1440px
--------------------

Preserve original design nearly pixel-faithfully.

1280px content width.

80px margins.

2-column hero.

2×2 work grid.

4 capabilities.

3 experiments.

asymmetric artwork.

2-column contact section.

--------------------
DESKTOP
1200–1439px
--------------------

Use approximately:
64px page gutters.

Keep work at 2 columns.

Scale project cards proportionally.

Capabilities remain 4 columns if comfortably possible.

Experiment frames stay 3 columns.

--------------------
TABLET
768–1199px
--------------------

Page gutter:
40–48px

Hero:
still 2 columns at wider tablet;
stack near 850px if necessary.

Hero headline:
clamp(38px, 5vw, 48px)

Intro:
clamp(24px, 3vw, 32px)

Work:
2 columns until too narrow,
then 1 column.

Capability cards:
2×2.

Experiments:
horizontal 3-card scroll OR 2-column + 1 layout.

Prefer horizontal scroll if it better preserves the exhibition metaphor.

Art:
use responsive asymmetric CSS Grid.

Ticket/footer:
stack as necessary.

--------------------
MOBILE
<= 767px
--------------------

Horizontal padding:
20–24px.

Navigation:
wordmark left
minimal menu right.

Do not hide Resume permanently.
Place it in mobile menu.

Hero:
single column

headline first
intro second
portrait third

Headline:
approximately 34–38px

line-height:
1.18–1.25

Intro:
22–24px

Reduce the 134px hero text gap substantially:
around 56–72px.

Portrait:
width roughly 70–82vw
max-width 340px
align toward right or center depending visual balance.

Work:
1 column.

Project image:
100% width.

Information plaque:
around 70–80% of card width.

Capabilities:
prefer horizontal snap scroll.

Each capability card should retain its original tall proportions.

Experiments:
horizontal snap scroll.

Let the user feel like moving through gallery exhibits.

Keep spotlight track visible if feasible.

Art:
responsive 2-column irregular collage.

Some pieces may span both columns.

Title can sit between rows.

Footer:
stack left copy
then ticket
then bottom social links.

==================================================
SCROLL EXPERIENCE
==================================================

The portfolio is intentionally designed as an exhibition.

The user should feel like they are moving through:

intro wall
↓
work exhibition
↓
designer-method cards
↓
experiment gallery
↓
personal art wall
↓
exit/admission ticket

Use restrained scroll reveals to reinforce this.

DO NOT create:

- scroll hijacking
- horizontal page navigation
- full-page snapping
- locomotive scroll
- giant parallax movement

Keep native vertical scrolling.

Use:

html {
    scroll-behavior: smooth;
}

==================================================
ANIMATION SYSTEM
==================================================

Create reusable reveal classes/components.

Example reveal:

initial:
opacity: 0
transform: translateY(18px)

visible:
opacity: 1
transform: translateY(0)

duration:
500–600ms

Only trigger once.

Intersection threshold:
approximately .1–.15

Root margin:
around:
0px 0px -8% 0px

Use CSS transitions wherever possible.

==================================================
PERFORMANCE IS A PRIORITY
==================================================

I do NOT want a heavy portfolio.

Target:

Desktop Lighthouse Performance:
90+

Mobile:
85+

Focus strongly on:

FCP
LCP
CLS
INP

==================================================
IMAGE PERFORMANCE
==================================================

Hero portrait:
load eagerly.

Everything below first viewport:
loading="lazy"

Use:
decoding="async"

All <img> elements must have:
width
height
or aspect-ratio

to prevent layout shift.

Use:
WebP or AVIF

where supported.

Create image variants.

Do NOT load a 3000px artwork inside a 385px frame.

Landing page suggested widths:

project previews:
~700–1000px source max depending DPR

capability imagery:
~400–600px

experiment thumbnails:
~600–800px

art previews:
~700–1000px

Only load full-resolution art inside lightbox.

==================================================
FONTS
==================================================

Only load:

Plus Jakarta Sans:
400
500
600

DM Serif Display:
400

Avoid downloading unnecessary weights.

Use:
font-display: swap

Preconnect/preload only if it meaningfully improves performance.

==================================================
ABOVE THE FOLD
==================================================

Prioritize:

navigation
hero typography
portrait

Do not preload:

Work images
Experiments
Art

The hero portrait is the primary likely LCP asset.

Use:
fetchpriority="high"

for portrait if appropriate.

==================================================
REDUCED MOTION
==================================================

Respect:

@media (prefers-reduced-motion: reduce)

Disable:
translate reveals
card lifting animation
art scaling
ticket movement

Keep page fully usable.

==================================================
ACCESSIBILITY
==================================================

Use semantic structure:





Use heading hierarchy correctly.

Each main section should have an h2.

Hero can use h1.

Project titles:
h3.

All images require useful alt text.

Do not write:
“image”

Use descriptive content.

Interactive project cards must use:

or


Do not attach click events to plain divs.

Use visible:
:focus-visible

Color:
#6F0F18

Do not remove outlines without replacement.

Lightbox must be keyboard usable.

==================================================
COMPONENT ARCHITECTURE
==================================================

Build reusable components such as:

Navbar
Hero
SectionHeading
WorkSection
ProjectCard
CapabilitySection
CapabilityCard
ExperimentsSection
ExperimentCard
GalleryLights
ArtGallery
ArtworkItem
ArtworkLightbox
ContactSection
ContactTicket
Footer

Keep project data in arrays.

Example:

const projects = [
 {
   title: 'ONECARE',
   subtitle: 'End-to-end Medical Tourism Platform',
   description: '...',
   disciplines: '...',
   image: '...',
   href: '/work/onecare'
 }
]

Do the same for:

capabilities
experiments
artworks
social links.

==================================================
ROUTES
==================================================

Landing page:
/

Prepare routes:

/work/onecare
/work/alchemic
/work/giggles
/work/fnp-circle

Do not invent detailed case study content.

For now create a minimal placeholder shell:

Back to Work
Project title
Coming soon / case study content placeholder

unless separate case-study content is supplied.

==================================================
DESIGN DETAILS YOU MUST NOT "IMPROVE"
==================================================

Do not add:

rounded project cards
large border radii
glassmorphism
gradient blobs
floating abstract shapes
massive sans-serif headings
Bento grids
neon hover effects
animated custom cursor
grain overlay over everything
sticky sidebars
floating contact button
marquee text
auto-scrolling galleries
huge footer typography
dark-mode toggle
theme switcher
AI-style gradient colors

These would change the visual semantics of the original design.

==================================================
VISUAL METAPHOR
==================================================

The portfolio communicates through the idea of a CURATED EXHIBITION.

Preserve that metaphor.

Work:
framed exhibits.

Designer capabilities:
collected/printed cards.

Experiments:
spotlit gallery pieces.

Personal art:
salon wall.

Contact:
exit/admission ticket.

Interaction should strengthen that metaphor WITHOUT becoming theatrical.

==================================================
IMPORTANT: ASSET HANDLING
==================================================

I will provide the actual visual assets separately.

Whenever an asset exists:

USE THE ACTUAL ASSET.

Do NOT regenerate:
- portrait
- paintings
- project mockups
- capability card artwork
- experiment thumbnails
- ticket graphics
- paperclip graphic
- stamps
- frames

If an asset is temporarily missing:

create a correctly sized placeholder.

Label the filename needed.

Example:

/assets/work/onecare.webp
/assets/work/alchemic.webp
/assets/work/giggles.webp
/assets/work/fnp-circle.webp

/assets/about/research-card.webp
/assets/about/product-card.webp
/assets/about/interaction-card.webp
/assets/about/code-card.webp

/assets/experiments/gmail.webp
/assets/experiments/netflix-vr.webp
/assets/experiments/splash.webp

/assets/art/art-01.webp
etc.

/assets/portrait.webp
/assets/resume.pdf

Do NOT generate substitute AI imagery.

==================================================
VISUAL QA
==================================================

After implementation, compare the rendered 1440px website against the attached Figma screenshot.

Specifically compare:

1. page width
2. section heights
3. 80px horizontal gutters
4. typography size
5. hero negative space
6. portrait size
7. cream/burgundy colors
8. work grid proportions
9. frame sizes
10. information plaque position
11. card proportions
12. spotlight rail
13. experiment frame dimensions
14. art asymmetry
15. ticket size
16. footer spacing

The 1440px version should visually resemble the reference before optimizing other breakpoints.

==================================================
FINAL QA CHECKLIST
==================================================

Before saying the website is complete:

Check:

□ no horizontal overflow
□ no console errors
□ no broken images
□ all navigation links work
□ anchor scrolling works
□ project cards are clickable
□ resume link is functional/placeholder clearly marked
□ email uses mailto
□ social links are clickable
□ art lightbox works
□ ESC closes lightbox
□ images lazy load
□ hero loads eagerly
□ CLS is minimized
□ mobile navigation works
□ tablet layout works
□ 1440px layout closely matches Figma
□ reduced motion works
□ keyboard focus is visible
□ hover states are subtle
□ no unnecessary libraries are installed

==================================================
MOST IMPORTANT FINAL INSTRUCTION
==================================================

The final product should NOT look like:

“a website inspired by this portfolio.”

It should look like:

“the actual Figma portfolio has been carefully translated into a responsive, interactive website.”

Preserve the personality, imperfections, physical exhibition details, spacing and restrained visual system of my design.

Do not redesign it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4f2863c6-428e-4510-a7b3-a9289c3e8560).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
