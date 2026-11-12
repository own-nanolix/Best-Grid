// Motion page data: the shared tokens as the site defines them (globals.css, lib/motion.js) and the m10 cycle.
import { ease, dur } from '@/lib/motion';

const ms = (s) => Math.round(s * 1000);

// Easing tokens: cubic-bezier control points (x1, y1, x2, y2) come from lib/motion.js; linear and the hard cut are
// the two non-curve tokens. `dur` is the shared duration each one is paired with in the demos.
export const EASES = [
  { id: 'out', name: 'Entering', token: '--ease-out', pts: ease.out, role: 'Entering: content settling into its cell', dur: ms(dur.l), durToken: '--dur-l' },
  { id: 'move', name: 'Move', token: '--ease-move', pts: ease.move, role: 'Moves between states: tabs, panels, toggles', dur: ms(dur.s), durToken: '--dur-s' },
  { id: 'line', name: 'Line drawing', token: '--ease-line', pts: ease.line, role: 'Guide lines and the lattice drawing on', dur: ms(dur.draw), durToken: '--dur-draw' },
  { id: 'linear', name: 'Linear', token: '--ease-linear', pts: null, kind: 'linear', role: 'Loaders and progress only', dur: 1600, durToken: 'loader cycle' },
  { id: 'cut', name: 'Hard cut', token: '--ease-cut', pts: null, kind: 'cut', role: 'The m10 hard cut: no in-between', dur: ms(dur.snap), durToken: '--dur-snap' },
];

export const EASE_VALUE = (e) => (e.pts ? `cubic-bezier(${e.pts.join(', ')})` : e.kind === 'cut' ? 'steps(1, end)' : 'linear');

export const DURS = [
  { token: '--dur-snap', ms: ms(dur.snap), use: 'One m10 frame' },
  { token: '--dur-xs', ms: ms(dur.xs), use: 'Nodes, chips' },
  { token: '--dur-s', ms: ms(dur.s), use: 'Hover, press' },
  { token: '--dur-m', ms: ms(dur.m), use: 'Cell fills, panels' },
  { token: '--dur-l', ms: ms(dur.l), use: 'Page enter' },
  { token: '--dur-draw', ms: ms(dur.draw), use: 'Lines, the lattice drawing on' },
];

// The m10 poster layouts. A: headline poster (m09 left), B: mark column and two photo blocks (m09 right),
// C: one large photo block with the three words (m11 left), D: centred line with the three-cell footer (m11 right).
// Left sheet, right sheet, for each of the eight frames of reference/m10.gif (decoded frame by frame, 100 ms each).
// Every cut changes one sheet only, alternating left and right; the grid, margins and nodes never move.
export const FRAMES = [
  ['A', 'B'], ['C', 'B'],
  ['C', 'D'], ['B', 'D'],
  ['B', 'A'], ['D', 'A'],
  ['D', 'C'], ['A', 'C'],
];

export const LAYOUT_NAMES = {
  A: 'the headline poster',
  B: 'the mark column with two photo blocks',
  C: 'the field poster with one large photo block',
  D: 'the centred line with the three-cell footer',
};

// One line per frame, generated from FRAMES so the list, the storyboard and the cycle always agree.
export const STAGES = FRAMES.map(([l, r], i) => {
  const [pl, pr] = i ? FRAMES[i - 1] : FRAMES[FRAMES.length - 1];
  const side = pl !== l ? 'left' : pr !== r ? 'right' : null;
  const now = side === 'left' ? l : r;
  return {
    frames: String(i + 1),
    at: `${i * 100} ms`,
    text: i === 0
      ? `Left: ${LAYOUT_NAMES.A}. Right: ${LAYOUT_NAMES.B}.`
      : `The ${side} sheet cuts to ${LAYOUT_NAMES[now]}; the other holds.`,
  };
});

// mix(a, b, t): t = 0 gives a, t = 1 gives b (for tints of the shared hex values).
export function mix(a, b, t) {
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [rgb(a), rgb(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
}

// Poster copy (verbatim, Spanish) used by the sheets.
export const SHEET_COPY = {
  headline: ['Donde el sistema', 'es más exigente,', 'aportamos claridad.'],
  headBody: ['Estructuramos la conexión a red', 'de centros de datos en entornos', 'de máxima complejidad.'],
  headTag: 'Acceso y conexión a red en infraestructuras digitales',
  convert: ['Convertimos la', 'complejidad técnica', 'en proyectos que avanzan.'],
  convertBody: ['Intervenimos en la conexión a red de proyectos', 'energéticos, estructurando decisiones en puntos', 'donde la viabilidad no es evidente.'],
  convertTag: ['Acceso y conexión a red', 'en generación eólica y solar'],
};
