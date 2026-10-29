// Gallery Orbit 03: ported from gallery-orbit-44px-corrected.zip.
export const ORBIT_SPEED = .23; // slots per second

type Projection = { cardWidth: number; perspective: number; neighborDepth: number };

function edges(distance: number, layout: Projection) {
  const absolute = Math.abs(distance);
  const scale = 1 + Math.max(0, 1 - absolute / 3) * .13;
  const angle = -distance * 13 * Math.PI / 180;
  const corner = (side: number) => {
    const localX = side * layout.cardWidth / 2 * scale;
    const factor = layout.perspective / (layout.perspective
      + absolute * layout.neighborDepth + localX * Math.sin(angle));
    return { factor, offset: localX * Math.cos(angle) * factor };
  };
  return { left: corner(-1), right: corner(1) };
}

export function orbitLayout(width: number, cardWidth: number) {
  const gap = width < 768 ? 18 : width < 1200 ? 28 : 44;
  const perspective = 850;
  const neighborDepth = width < 768 ? 32 : width < 1200 ? 46 : 58;
  const centerScale = 1.13;
  const nearScale = 1 + (1 - 1 / 3) * .13;
  const sidePerspective = perspective / (perspective + neighborDepth);
  const sideRotation = Math.cos(13 * Math.PI / 180);
  const centerProjectedWidth = cardWidth * centerScale;
  const nearProjectedWidth = cardWidth * nearScale * sidePerspective * sideRotation;
  const targetPitch = (centerProjectedWidth + nearProjectedWidth) / 2 + gap;
  const referenceStep = targetPitch / sidePerspective;
  const projection = { cardWidth, perspective, neighborDepth };
  // The ZIP's optical estimate still overlaps at the outer edges. Preserve its
  // motion, but solve horizontal positions against the actual camera projection.
  // Half a pixel covers subpixel rounding without squeezing any visible gap.
  const clearance = gap + .5;
  const half = edges(.5, projection).left;
  const centreStep = 2 * (clearance / 2 - half.offset) / half.factor;
  return { width, cardWidth, gap, perspective, neighborDepth, referenceStep, clearance, centreStep };
}

function position(distance: number, layout: ReturnType<typeof orbitLayout>): number {
  if (distance < -.5) return -position(-distance, layout);
  if (distance <= .5) return distance * layout.centreStep;
  const previous = distance - 1;
  const previousRight = edges(previous, layout).right;
  const target = previousRight.factor * position(previous, layout)
    + previousRight.offset + layout.clearance;
  const left = edges(distance, layout).left;
  return (target - left.offset) / left.factor;
}

export function orbitPose(index: number, phase: number, layout: ReturnType<typeof orbitLayout>, count = 5) {
  let distance = (index - phase + count * 1000) % count;
  if (distance > count / 2) distance -= count;
  const absolute = Math.abs(distance);
  const x = position(distance, layout);
  const z = -absolute * layout.neighborDepth;
  const rotation = -distance * 13;
  const scale = 1 + Math.max(0, 1 - absolute / 3) * .13;
  const edge = Math.max(0, Math.min(1,
    (layout.width / 2 + layout.cardWidth / 2 - Math.abs(x)) / (layout.cardWidth * .4)));
  const seam = Math.max(0, Math.min(1, (2.48 - absolute) / .28));
  return {
    transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotation}deg) scale(${scale})`,
    opacity: edge * seam,
    zIndex: Math.round(100 - absolute * 12),
  };
}
