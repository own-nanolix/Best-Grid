// Everything the dataviz page plots, derived from the figures the case study prints (src/lib/brand.js) or from
// the site's own structure. Nothing here is invented: derived numbers are computed in code and named as such.
import { CAPACITY, TECH, HEX } from '@/lib/brand';
import { pages, groups } from '@/lib/pages';
import { es, shares } from '@/lib/charts';
import { markHolesTL } from '@/components/art/Mark';

export const Q = CAPACITY.quarters; // Q1 3.200, Q2 4.100, Q3 5.200, Q4 2.920 (m17)
export const AXIS_MAX = CAPACITY.axisMax; // 7.000 MW (m17)
export const TOTAL = CAPACITY.total; // 15.420 MW = the four quarters
export const QMEAN = TOTAL / 4; // computed: 3.855 MW
export const PEAK = Math.max(...Q.map((q) => q.mw)); // Q3, 5.200 MW
export const DELTAS = Q.slice(1).map((q, i) => ({ from: Q[i].q, to: q.q, d: q.mw - Q[i].mw })); // computed
export const CUM = Q.reduce((a, q) => [...a, (a.length ? a[a.length - 1] : 0) + q.mw], []); // computed, ends at 15.420

export const TECH_SORTED = [...TECH].sort((a, b) => b.mw - a.mw);
export const TECH_SUM = TECH.reduce((a, t) => a + t.mw, 0); // computed: the four tiles added
export const TECH_SHARES = shares(TECH.map((t) => t.mw)).map((s, i) => ({ ...s, ...TECH[i], pct: Math.round(s.share * 100) }));

export const KPIS = CAPACITY.kpis; // 128, 46, 72 (m17)
export const PARTS = CAPACITY.treemap.parts; // 68, 16 and the unlabelled remainder

// The mark's own geometry: its 20 holes, counted from the construction (5 per quadrant, mirrored four times).
const tl = markHolesTL();
export const HOLE_KINDS = [
  { key: 'tri', label: 'Triangles', n: tl.filter((h) => h.length === 3).length * 4 },
  { key: 'trap', label: 'Trapezoids', n: tl.slice(2, 4).length * 4 },
  { key: 'sq', label: 'Squares', n: tl.slice(4).length * 4 },
];

// The site's own structure: 30 pages in four groups (pages.json).
export const GROUPS = groups.map((g) => ({ name: g.name, n: g.pages.length, pages: g.pages }));
export const MIN_EXPORTS = pages.reduce((a, p) => a + (p.minExports || 0), 0);

// Colours for a data series (published palette only; the lighter blue is Active Blue at 55%).
export const INK = HEX.darkBlue;
export const BLUE = HEX.activeBlue;
export const SMALL_BLUE = HEX.blueInk;
export const MUTED = HEX.muted;
export const signed = (n) => `${n < 0 ? '−' : '+'}${es(Math.abs(n))}`;
export const mwf = (n) => `${es(n)} MW`;
