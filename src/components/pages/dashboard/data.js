// The dashboard's data: only the figures the case study prints (m16 tiles, m17 phone), nothing else.
// Placeholder rows are named plainly and carry no values.
import { TECH, CAPACITY } from '@/lib/brand';

export const STRUCTS = [
  { id: 'a', name: 'Command table', desc: 'A command bar over a dense data table, a drawer for the open row.' },
  { id: 'b', name: 'Node map', desc: 'A left rail, the node grid as the main area, a detail panel.' },
  { id: 'c', name: 'Quarter cells', desc: 'A 2 x 2 of quarter cells, each a small area chart.' },
  { id: 'd', name: 'Treemap field', desc: 'The treemap as the whole screen with a side legend.' },
  { id: 'e', name: 'Phone grown', desc: 'The phone dashboard of the case study grown to the desktop.' },
];

export const TABS = [
  ...STRUCTS.map((x) => ({ id: x.id, label: `${x.id.toUpperCase()} ${x.name}` })),
  { id: 'overview', label: 'Overview' },
  { id: 'node', label: 'Node detail' },
  { id: 'tech', label: 'Technology detail' },
];

export const KINDS = ['All', 'Technology', 'Quarter', 'Count', 'Placeholder'];
export const RANGES = [
  { id: 'full', label: 'Q1 to Q4', qs: [0, 1, 2, 3] },
  { id: 'h1', label: 'Q1 to Q2', qs: [0, 1] },
  { id: 'h2', label: 'Q3 to Q4', qs: [2, 3] },
];

export const ROWS = [
  ...TECH.map((t) => ({ id: `t-${t.key}`, kind: 'Technology', name: t.label, value: t.value, num: t.mw, icon: t.icon, es: true, tech: t.key })),
  ...CAPACITY.quarters.map((q, i) => ({ id: `q-${q.q}`, kind: 'Quarter', name: q.q, value: q.value, num: q.mw, qi: i })),
  ...CAPACITY.kpis.map((k, i) => ({ id: `k-${i}`, kind: 'Count', name: k.label, value: String(k.value), num: k.value, es: true })),
  ...[1, 2, 3].map((n) => ({ id: `p-${n}`, kind: 'Placeholder', name: `Row 0${n}`, value: null, num: -1 })),
];

const MAX = {};
ROWS.forEach((r) => { MAX[r.kind] = Math.max(MAX[r.kind] || 0, r.num); });
export const barOf = (r) => (r.num < 0 ? 0 : Math.round((r.num / MAX[r.kind]) * 100));

// The rows on screen: year, kind, search text, quarter range, then the sort.
export function visibleRows({ year, kind, query, range, sort }) {
  if (year !== CAPACITY.year) return [];
  const q = query.trim().toLowerCase();
  const qs = RANGES.find((r) => r.id === range).qs;
  const out = ROWS.filter((r) => (kind === 'All' || r.kind === kind)
    && (r.qi === undefined || qs.includes(r.qi))
    && (!q || `${r.name} ${r.kind} ${r.value || ''}`.toLowerCase().includes(q)));
  const dir = sort.dir === 'asc' ? 1 : -1;
  const val = (r) => (sort.key === 'value' ? r.num : sort.key === 'kind' ? r.kind : r.name);
  return out.sort((a, b) => {
    const x = val(a), y = val(b);
    return (typeof x === 'number' ? x - y : String(x).localeCompare(String(y), 'es')) * dir;
  });
}

// The node grid of m17 (back phone): clusters in two strengths and some half-size cells. Drawing, not data.
export const GRID = { cols: 16, rows: 9, size: 30, gap: 4 };
export const LEVELS = ['Empty', 'Strong', 'Full'];
export function nodeCells() {
  const centres = [[3, 3], [11, 2], [8, 6], [14, 7], [1, 7]];
  let n = 7;
  const rnd = () => ((n = (n * 16807) % 2147483647) - 1) / 2147483646;
  const out = [];
  for (let row = 0; row < GRID.rows; row++) {
    for (let col = 0; col < GRID.cols; col++) {
      const d = Math.min(...centres.map(([cx, cy]) => Math.hypot(cx - col, (cy - row) * 1.1)));
      const j = d + (rnd() - 0.5) * 1.1;
      out.push({ col, row, i: row * GRID.cols + col, lvl: j < 1.5 ? 2 : j < 2.7 ? 1 : 0, half: j >= 2.7 && rnd() < 0.14 });
    }
  }
  return out;
}
export const CELLS = nodeCells();
