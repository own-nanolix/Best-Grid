// The icon set, drawn in the manner of the brand's own pixel icons (m14, m15): FILLED bars of one unit, square ends,
// no strokes. Where two bars meet at a corner the corner pixel is left out (a stepped corner); where a bar passes
// THROUGH another (a four-way crossing) the crossing pixel is left out; T-junctions stay filled. Diagonals and arcs
// keep the one-unit width (the turbine). Tiny squares are nodes.
//
// CORE / UTIL: one 24 x 24 grid, bar = 1 unit (the brand draws 1 unit on 32; on 24 the same bars read at small
// sizes). PIXEL32: the four icons of the case study rebuilt on their own 32 x 32 grid, measured from m14 / m15.
// Every icon is one path string (fill, nonzero; every sub-path runs clockwise so overlaps join).
import { r2 } from '@/lib/charts';

// ---------- builders ----------
const area = (pts) => pts.reduce((a, p, i) => { const q = pts[(i + 1) % pts.length]; return a + p[0] * q[1] - q[0] * p[1]; }, 0);
const poly = (pts) => {
  const p = area(pts) < 0 ? [...pts].reverse() : pts; // clockwise on screen (y down)
  return p.map(([x, y], i) => `${i ? 'L' : 'M'}${r2(x)} ${r2(y)}`).join('') + 'Z';
};
const R = (x, y, w, h) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
const H = (x, y, len, w = 1) => R(x, y, len, w);
const V = (x, y, len, w = 1) => R(x, y, w, len);
// Stepped frame: four bars, corner pixels left out.
const F = (x, y, w, h, t = 1) => H(x + t, y, w - 2 * t, t) + H(x + t, y + h - t, w - 2 * t, t) + V(x, y + t, h - 2 * t, t) + V(x + w - t, y + t, h - 2 * t, t);
// A straight bar of width w from (x0, y0) to (x1, y1), square ends at the points.
const S = (x0, y0, x1, y1, w = 1) => {
  const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy) || 1, nx = (-dy / l) * (w / 2), ny = (dx / l) * (w / 2);
  return poly([[x0 + nx, y0 + ny], [x1 + nx, y1 + ny], [x1 - nx, y1 - ny], [x0 - nx, y0 - ny]]);
};
// An arc band between radii r0 and r1, from a0 to a1 (degrees, 0 = 12 o'clock, clockwise), sampled.
const pt = (cx, cy, r, deg) => { const a = ((deg - 90) * Math.PI) / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
const A = (cx, cy, r0, r1, a0, a1, n = 14) => {
  const outer = [], inner = [];
  for (let i = 0; i <= n; i++) { const a = a0 + ((a1 - a0) * i) / n; outer.push(pt(cx, cy, r1, a)); inner.push(pt(cx, cy, r0, a)); }
  return poly([...outer, ...inner.reverse()]);
};
const P = (...xy) => { const pts = []; for (let i = 0; i < xy.length; i += 2) pts.push([xy[i], xy[i + 1]]); return poly(pts); };
const rot = (pts, deg, cx, cy) => { const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a); return pts.map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]); };

// The brand's wind turbine (m14), in units of its 32 grid about its centre: tip square, blade of two converging
// bars meeting at the hub circle (r 1.5), a 1 x 1 hub square, three blades at 120 deg, a broken ring r 6 to 7.
const BLADE = [[-1.57, -9.5], [-0.6, -9.5], [-1.45, -3.15], [0, -1.72], [1.45, -3.15], [0.6, -9.5], [1.57, -9.5], [2.51, -2.85], [0.95, -1.25], [0, -1.5], [-0.95, -1.25], [-2.51, -2.85]];
const TIP = [[-0.55, -10.5], [0.55, -10.5], [0.55, -9.5], [-0.55, -9.5]];
export function turbinePath(cx = 16, cy = 16, k = 1) {
  const sc = (pts) => pts.map(([x, y]) => [x * k, y * k]);
  let d = poly(sc([[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]]).map(([x, y]) => [x + cx, y + cy]));
  for (const deg of [0, 120, 240]) d += poly(rot(sc(BLADE), deg, cx, cy)) + poly(rot(sc(TIP), deg, cx, cy));
  for (const mid of [60, 180, 300]) d += A(cx, cy, 6 * k, 7 * k, mid - 33.5, mid + 33.5);
  return d;
}

// ---------- the 32 core icons (24 grid) ----------
export const CORE = {
  // the lattice: a stepped frame cut into 3 x 3 cells, open crossings
  grid: F(2.5, 2.5, 19, 19) + [8.5, 14.5].map((v) => V(v, 3.5, 5) + V(v, 9.5, 5) + V(v, 15.5, 5) + H(3.5, v, 5) + H(9.5, v, 5) + H(15.5, v, 5)).join(''),
  // a node: a solid square where guide lines meet
  node: R(9, 9, 6, 6) + H(2, 11.5, 6) + H(16, 11.5, 6) + V(11.5, 2, 6) + V(11.5, 16, 6),
  // a connection: two nodes joined by a stepped line
  line: R(2, 16, 5, 5) + R(17, 3, 5, 5) + H(7, 18, 4) + V(11, 6, 12) + H(12, 5, 5),
  // a transmission tower
  pylon: R(11, 2, 2, 2) + S(6, 22, 10.6, 4) + S(18, 22, 13.4, 4) + H(4, 7, 16) + H(6, 12, 12) + V(4, 8, 2) + V(19, 8, 2) + V(6, 13, 2) + V(17, 13, 2),
  // a substation: fenced yard, two transformers, a gantry with open crossings
  substation: F(2, 10, 20, 12) + R(6, 14, 4, 5) + R(14, 14, 4, 5) + H(5, 5, 2) + H(8, 5, 8) + H(17, 5, 2) + V(7, 3, 2) + V(7, 6, 4) + V(16, 3, 2) + V(16, 6, 4),
  // the turbine of m14, scaled to the 24 grid
  wind: turbinePath(12, 13.6, 0.9),
  // the solar panel of m15, on its stand
  solar: F(1.5, 4, 21, 10) + [6.5, 11.5, 16.5].map((x) => V(x, 5, 2) + V(x, 8, 2) + V(x, 11, 2)).join('') + [7, 10].map((y) => H(2.5, y, 4) + H(7.5, y, 4) + H(12.5, y, 4) + H(17.5, y, 4)).join('') + V(11.5, 14, 3) + H(7.5, 17, 4) + H(12.5, 17, 4),
  // the sun: a stepped disc and eight rays
  sun: F(7.5, 7.5, 9, 9) + V(11.5, 2, 4) + V(11.5, 18, 4) + H(2, 11.5, 4) + H(18, 11.5, 4) + R(4.5, 4.5, 1.5, 1.5) + R(18, 4.5, 1.5, 1.5) + R(4.5, 18, 1.5, 1.5) + R(18, 18, 1.5, 1.5),
  // two battery cells, "+" with an open centre and "−" (m15)
  battery: F(2, 6, 10, 15) + F(12, 6, 10, 15) + H(5, 4, 4) + H(15, 4, 4) + H(4, 13, 2) + H(8, 13, 2) + V(6.5, 11, 1.5) + V(6.5, 14.5, 1.5) + H(14, 13, 6),
  // a server stack of three units (m15)
  datacenter: [0, 5, 10].map((o) => V(3, 5 + o, 4) + V(20, 5 + o, 4) + H(6, 6.5 + o, 7) + R(15, 6.5 + o, 1, 1) + R(17, 6.5 + o, 1, 1)).join('') + [4, 9, 14, 19].map((y) => H(4, y, 16)).join(''),
  // energy
  bolt: S(15, 2, 8.4, 12.5) + H(8, 12, 8) + S(15.6, 12.5, 9, 22),
  plug: V(8.5, 2, 5) + V(14.5, 2, 5) + F(6, 7, 12, 8) + V(11.5, 15, 7),
  // documents
  permit: F(4, 2, 16, 20) + H(8, 6, 8) + H(8, 9, 8) + H(8, 12, 5) + S(10.5, 16.5, 12.5, 18.5) + S(12.5, 18.5, 16.5, 14.5),
  study: F(3, 3, 18, 18) + H(6, 16, 3) + V(9, 12, 4) + H(10, 11, 4) + V(14, 7, 4) + H(15, 6, 3),
  document: F(5, 2, 14, 20) + H(8, 6, 8) + H(8, 9, 8) + H(8, 12, 8) + H(8, 15, 5),
  folder: H(4, 4, 6) + R(10, 5, 1, 1) + H(11, 6, 9) + V(3, 5, 15) + V(20, 7, 13) + H(4, 20, 16) + H(4, 9, 16),
  // place and time
  pin: H(9, 2, 6) + R(8, 3, 1, 1) + R(15, 3, 1, 1) + V(7, 4, 7) + V(16, 4, 7) + S(7.5, 11, 12, 21) + S(16.5, 11, 12, 21) + R(10.5, 6.5, 3, 3),
  map: S(3.5, 6, 9.5, 4) + S(9.5, 4, 15.5, 6) + S(15.5, 6, 21.5, 4) + S(3.5, 20, 9.5, 18) + S(9.5, 18, 15.5, 20) + S(15.5, 20, 21.5, 18) + V(3, 6, 14) + V(9, 4, 14) + V(15, 6, 14) + V(21, 4, 14),
  calendar: F(3, 4, 18, 17) + H(4, 8, 16) + V(7, 2, 2) + V(16, 2, 2) + R(7, 11, 2, 2) + R(11, 11, 2, 2) + R(15, 11, 2, 2) + R(7, 15, 2, 2) + R(11, 15, 2, 2),
  // contact
  mail: F(2, 5, 20, 14) + S(3, 6, 12, 13.5) + S(21, 6, 12, 13.5),
  phone: F(6, 2, 12, 20) + H(10, 4, 4) + R(11, 18, 2, 2),
  user: F(8, 3, 8, 8) + H(7, 15, 10) + R(6, 16, 1, 1) + R(17, 16, 1, 1) + V(5, 17, 4) + V(18, 17, 4),
  // interface
  search: F(3, 3, 13, 13) + R(15, 15, 2, 2) + R(17, 17, 2, 2) + R(19, 19, 2, 2),
  chart: V(3, 3, 17) + H(4, 20, 17) + V(7, 12, 6) + V(11, 8, 10) + V(15, 10, 8) + V(19, 5, 13),
  // the crosshair of the website buttons (m16): four short bars around an empty centre
  crosshair: H(3, 11.5, 6) + H(15, 11.5, 6) + V(11.5, 3, 6) + V(11.5, 15, 6),
  'arrow-right': H(3, 11.5, 17) + S(14, 6, 20, 12) + S(20, 12, 14, 18),
  'arrow-up-right': S(5.5, 18.5, 17.5, 6.5) + H(9, 5, 10) + V(18, 6, 9),
  download: V(11.5, 3, 12) + S(6.5, 10, 12, 15.5) + S(12, 15.5, 17.5, 10) + H(3, 20, 18),
  plus: H(4, 11.5, 7.5) + H(12.5, 11.5, 7.5) + V(11.5, 4, 7.5) + V(11.5, 12.5, 7.5),
  check: S(4, 12, 9.5, 17.5) + S(9.5, 17.5, 20, 7),
  close: S(5, 5, 19, 19) + S(19, 5, 5, 19),
  menu: H(3, 6, 18) + H(3, 11.5, 18) + H(3, 17, 18),
};

export const UTIL = {
  'chevron-left': S(15, 5, 8, 12) + S(8, 12, 15, 19),
  'chevron-right': S(9, 5, 16, 12) + S(16, 12, 9, 19),
  'chevron-up': S(5, 15, 12, 8) + S(12, 8, 19, 15),
  'chevron-down': S(5, 9, 12, 16) + S(12, 16, 19, 9),
  'arrow-left': H(4, 11.5, 17) + S(10, 6, 4, 12) + S(4, 12, 10, 18),
  'arrow-down': V(11.5, 3, 17) + S(6, 14, 12, 20) + S(12, 20, 18, 14),
  'arrow-up': V(11.5, 4, 17) + S(6, 10, 12, 4) + S(12, 4, 18, 10),
  minus: H(4, 11.5, 16),
  copy: F(8, 8, 13, 13) + H(4, 3, 11) + V(3, 4, 11),
  play: V(6.5, 4, 16) + S(7, 4.5, 19, 12) + S(19, 12, 7, 19.5),
  pause: V(8, 5, 14) + V(15, 5, 14),
  sort: V(7.5, 4, 16) + S(4, 7.5, 8, 3.5) + S(8, 3.5, 12, 7.5) + V(15.5, 4, 16) + S(12, 16.5, 16, 20.5) + S(16, 20.5, 20, 16.5),
  filter: H(3, 6, 18) + H(6, 11.5, 12) + H(9, 17, 6),
  alert: S(12, 3, 3, 20) + S(12, 3, 21, 20) + H(3.5, 20, 17) + V(11.5, 9, 6) + R(11.5, 16.5, 1, 1.5),
  clock: F(3, 3, 18, 18) + V(11.5, 7, 5) + H(12.5, 11.5, 4),
  layers: F(3, 3, 14, 10) + H(6, 15, 12) + V(19, 6, 9) + H(9, 19, 12) + V(22, 10, 9),
  external: H(4, 5, 7) + V(3, 6, 14) + H(4, 20, 14) + V(18, 13, 7) + S(10, 14, 20, 4) + H(13, 3.5, 8) + V(19.5, 4, 7),
  index: F(3, 3, 8, 8) + F(13, 3, 8, 8) + F(3, 13, 8, 8) + F(13, 13, 8, 8),
};

export const ICONS = { ...CORE, ...UTIL };
export const CORE_NAMES = Object.keys(CORE);

// ---------- the case study's own four icons, on their 32 grid (m14, m15) ----------
// Measured: solar panel 21 x 16 units, server stack 18 x 16, batteries 19 x 16, turbine about 18.7 x 17.5,
// bar 1 unit; each is centred in the 32 box. Use with viewBox="0 0 32 32" (IconUse32 / PixelIcon).
const T = (dx, dy, d) => d.replace(/([ML])(-?[\d.]+) (-?[\d.]+)/g, (_, c, x, y) => `${c}${r2(+x + dx)} ${r2(+y + dy)}`);
export const PIXEL32 = {
  solar: T(5.5, 8,
    H(1, 0, 19) + V(0, 1, 11) + V(20, 1, 11) + H(1, 12, 9) + H(11, 12, 9) +
    [5, 10, 15].map((x) => V(x, 1, 2) + V(x, 4, 2) + V(x, 7, 2) + V(x, 10, 2)).join('') +
    [3, 6, 9].map((y) => H(1, y, 4) + H(6, y, 4) + H(11, y, 4) + H(16, y, 4)).join('') +
    V(10, 13, 2) + H(5.5, 15, 4.5) + H(11, 15, 4.5)),
  datacenter: T(7, 8,
    [0, 5, 10].map((o) => V(0, 1 + o, 4) + V(17, 1 + o, 4) + H(2, 2.5 + o, 9) + R(13.5, 2.5 + o, 1, 1) + R(15, 2.5 + o, 1, 1)).join('') +
    [0, 5, 10, 15].map((y) => H(1, y, 16)).join('')),
  battery: T(6.5, 8,
    V(0, 3, 12) + H(1, 2, 5) + R(3, 0.5, 2, 1) + V(6, 2, 13) + H(1, 15, 5) +
    H(7, 0, 5) + R(7, 1, 1, 1) + R(11, 1, 1, 1) + H(8, 2, 3) + H(7, 15, 5) +
    V(12, 2, 13) + H(13, 2, 5) + R(14, 0.5, 2, 1) + V(18, 3, 12) + H(13, 15, 5) +
    R(3, 7, 1, 1) + R(2, 8, 1, 1) + R(4, 8, 1, 1) + R(3, 9, 1, 1) + H(14, 8, 3)),
  wind: turbinePath(16, 17.75, 1),
};
// Their case-study names (m16 stats row).
export const PIXEL32_LABELS = { solar: 'Fotovoltaico', wind: 'Eólico', battery: 'Almacenamiento', datacenter: 'Data Centers' };
