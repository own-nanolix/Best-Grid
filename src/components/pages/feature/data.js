// Data and tour script of the node explorer. Every figure is imported from brand.js (the case study's own figures);
// nothing here is a value of our own. Node cells carry no figure: they are drawing only (m17, back phone).
import { CAPACITY, TECH, LINES } from '@/lib/brand';
import { nodeCells } from '@/components/art/KeyArt';

export const NODE = { cols: 14, rows: 20, size: 40, seed: 5, clusters: 16 };
export const CELLS = nodeCells({ cols: NODE.cols, rows: NODE.rows, seed: NODE.seed, clusters: NODE.clusters });
export const Q = CAPACITY.quarters;
export const KPIS = CAPACITY.kpis;
export const PARTS = CAPACITY.treemap.parts;
export const partLine = (p) => `${p.labelRows.join(' ')} ${p.pct}%`;
export const MAX_TECH = Math.max(...TECH.map((t) => t.mw));

// The selection. Only the year with printed figures (2025) has data; the other chips show an empty state.
export const INIT = { year: CAPACITY.year, tech: null, q: null, part: null, cell: null, kpi: null, total: false };

// Plain English names for the strengths of a node cell (the case study draws two strengths of Active Blue).
export const STRENGTH = { 0: 'Empty cell', 1: 'Full strength', 2: 'Three-quarter strength' };

// The first filled cells, in reading order, used by the tour to place the cursor.
const filled = CELLS.filter((c) => c.v === 1);
const soft = CELLS.filter((c) => c.v === 2);
const A = filled[0] || CELLS[0];
const B = soft[Math.floor(soft.length / 2)] || CELLS[CELLS.length - 1];

// The guided tour. Every caption is a verbatim line of the case study (Spanish, lang="es"); `seq` changes the
// selection at given offsets (ms) after the caption starts. Captions pair a label with the value printed beside it.
const tq = (i, at) => ({ at, sel: { q: i } });
export const STEPS = [
  { id: 'nodes', text: CAPACITY.nodesTitle, seq: [{ at: 0, sel: { cell: { r: A.r, c: A.c } } }, { at: 900, sel: { cell: { r: B.r, c: B.c } } }] },
  { id: 'chart', text: CAPACITY.title, seq: [tq(0, 0), tq(1, 520), tq(2, 1040), tq(3, 1560)] },
  { id: 'total', text: `${CAPACITY.totalLabel} ${CAPACITY.totalValue}`, seq: [{ at: 0, sel: { total: true } }] },
  { id: 'k0', text: `${KPIS[0].label} ${KPIS[0].value}`, seq: [{ at: 0, sel: { kpi: 0 } }] },
  { id: 'k1', text: `${KPIS[1].label} ${KPIS[1].value}`, seq: [{ at: 0, sel: { kpi: 1 } }] },
  { id: 'k2', text: `${KPIS[2].label} ${KPIS[2].value}`, seq: [{ at: 0, sel: { kpi: 2 } }] },
  ...TECH.map((t) => ({ id: t.key, text: `${t.label} ${t.value}`, seq: [{ at: 0, sel: { tech: t.key } }] })),
  { id: 'dev', text: partLine(PARTS[0]), seq: [{ at: 0, sel: { part: 'dev' } }] },
  { id: 'cons', text: partLine(PARTS[1]), seq: [{ at: 0, sel: { part: 'cons' } }] },
  { id: 'end', text: LINES.tube.text, seq: [{ at: 0, sel: {} }] },
];

export const TOUR = { speed: 24, hold: 1100 };
export const IDLE_TEXT = CAPACITY.title;

// Text for the tooltip of a node cell. Cells have a position and a strength only.
export function cellTip({ r, c }) {
  const cell = CELLS.find((x) => x.r === r && x.c === c);
  const base = `Row ${r + 1}, column ${c + 1}`;
  const strength = STRENGTH[cell ? cell.v : 0];
  const quarter = cell && cell.q > 0 ? ', with a quarter-size cell' : '';
  return { title: base, body: `${strength}${quarter}. No figure is published for any node.` };
}

// The printed figures used on this page, with where each is printed. Used by the figures table.
export const USED = [
  { key: 'tiles', head: 'Technology tiles', where: 'Website, m16', values: TECH.map((t) => `${t.label} ${t.value}`) },
  { key: 'quarters', head: 'Quarters', where: 'Phone, m17', values: Q.map((q) => `${q.q} ${q.value}`) },
  { key: 'total', head: 'Total', where: 'Phone, m17', values: [`${CAPACITY.totalLabel} ${CAPACITY.totalValue}`] },
  { key: 'axis', head: 'Axis', where: 'Phone, m17', values: [`${CAPACITY.axis[CAPACITY.axis.length - 1]} to ${CAPACITY.axis[0]}`] },
  { key: 'kpis', head: 'KPI cells', where: 'Phone, m17', values: KPIS.map((k) => `${k.label} ${k.value}`) },
  { key: 'tree', head: 'Treemap', where: 'Phone, m17', values: [partLine(PARTS[0]), partLine(PARTS[1])] },
  { key: 'years', head: 'Year chips', where: 'Phone, m17', values: CAPACITY.years },
];
