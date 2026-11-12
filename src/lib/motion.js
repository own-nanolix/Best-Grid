// Easing and duration tokens. The same values are CSS variables in src/app/globals.css (--ease-*, --dur-*).
// Use these with framer-motion; never use default easings.
// Personality (SOURCE.md): engineered, exact and calm. Lines extend along the guides first, nodes snap in at the
// crossings, then content fills the cells. Nothing bounces, nothing overshoots. The only published motion (m10)
// is a hard-cut cycle at 100 ms per frame.
export const ease = {
  out: [0.16, 1, 0.3, 1],      // entering: content settling into its cell
  move: [0.65, 0, 0.35, 1],    // moves between states (tabs, panels, toggles)
  line: [0.45, 0, 0.2, 1],     // guide lines and the lattice drawing on
  linear: 'linear',            // loaders and progress only
};

// seconds
export const dur = { snap: 0.1, xs: 0.16, s: 0.24, m: 0.42, l: 0.7, draw: 1.2 };
export const stagger = 0.04;   // across cells
export const frame = 0.1;      // one hard-cut frame of the m10 cycle (CSS: steps(), --dur-snap)

// Shared transitions
export const tEnter = { duration: dur.m, ease: ease.out };
export const tPage = { duration: dur.l, ease: ease.out };
export const tMove = { duration: dur.s, ease: ease.move };
export const tNode = { duration: dur.xs, ease: ease.out };
export const tFill = { duration: dur.m, ease: ease.out };
export const tDraw = { duration: dur.draw, ease: ease.line };
export const tChart = { duration: dur.l, ease: ease.out };

// Variants for a list of cells that enters one by one: <motion.ul variants={listV} initial="hidden" animate="show">
export const listV = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } } };
export const itemV = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: tEnter } };
export const fadeV = { hidden: { opacity: 0 }, show: { opacity: 1, transition: tEnter } };
// A line extending along its guide (scaleX from the origin), then the node snapping in.
export const lineV = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: tDraw } };
export const nodeV = { hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1, transition: tNode } };
