// Motion page data: the shared tokens as the site defines them (globals.css, lib/motion.js) and the m10 cycle.
import { ease, dur } from '@/lib/motion';

const ms = (s) => Math.round(s * 1000);

// Easing tokens: cubic-bezier control points (x1, y1, x2, y2) come from lib/motion.js; linear and the hard cut are
// the two non-curve tokens. `dur` is the shared duration each one is paired with in the demos.
export const EASES = [
  { id: 'out', token: '--ease-out', pts: ease.out, role: 'Entering: content settling into its cell', dur: ms(dur.l), durToken: '--dur-l' },
  { id: 'move', token: '--ease-move', pts: ease.move, role: 'Moves between states: tabs, panels, toggles', dur: ms(dur.s), durToken: '--dur-s' },
  { id: 'line', token: '--ease-line', pts: ease.line, role: 'Guide lines and the lattice drawing on', dur: ms(dur.draw), durToken: '--dur-draw' },
  { id: 'linear', token: '--ease-linear', pts: null, kind: 'linear', role: 'Loaders and progress only', dur: 1600, durToken: 'loader cycle' },
  { id: 'cut', token: '--ease-cut', pts: null, kind: 'cut', role: 'The m10 hard cut: no in-between', dur: ms(dur.snap), durToken: '--dur-snap' },
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

// The m10 poster layouts (reference/m10_1 to m10_5). A: headline poster, B: two photo blocks, C: one photo block,
// D: centred line with the three-cell footer. Each frame is shown for one --dur-snap and cut to the next.
// Left sheet, right sheet. Read from the stills at frames 0, 2, 4, 6 and 7; frames in between hold the layout.
export const FRAMES = [
  ['A', 'B'], ['A', 'B'],
  ['B', 'A'], ['B', 'A'],
  ['D', 'C'], ['D', 'C'],
  ['A', 'C'], ['A', 'C'],
];

export const STAGES = [
  { frames: '1 and 2', at: '0 to 200 ms', text: 'The left sheet carries the headline layout; the right sheet the mark column, the line and two Dark Blue photo blocks at 75%.' },
  { frames: '3 and 4', at: '200 to 400 ms', text: 'The two layouts trade sheets in one hard cut. The grid, the margins and the corner nodes stay where they are.' },
  { frames: '5 and 6', at: '400 to 600 ms', text: 'The left sheet cuts to the centred line with its three-cell footer; the right sheet to the field layout with one large photo block.' },
  { frames: '7 and 8', at: '600 to 800 ms', text: 'The headline layout returns on the left, the large block holds on the right, then the cycle loops without easing or fade.' },
];

// Poster copy (verbatim, Spanish) used by the sheets.
export const SHEET_COPY = {
  headline: ['Donde el sistema', 'es más exigente,', 'aportamos claridad.'],
  headBody: ['Estructuramos la conexión a red', 'de centros de datos en entornos', 'de máxima complejidad.'],
  headTag: 'Acceso y conexión a red en infraestructuras digitales',
  convert: ['Convertimos la', 'complejidad técnica', 'en proyectos que avanzan.'],
  convertBody: ['Intervenimos en la conexión a red de proyectos', 'energéticos, estructurando decisiones en puntos', 'donde la viabilidad no es evidente.'],
  convertTag: ['Acceso y conexión a red', 'en generación eólica y solar'],
};
