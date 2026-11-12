// Data and tour script of the node explorer. Every figure is imported from brand.js (the case study's own figures);
// nothing here is a value of our own. Node cells carry no figure: they are drawing only (m17, back phone).
import { CAPACITY, TECH, LINES } from '@/lib/brand';
import { GRID_CELLS, GRID_COLS, GRID_ROWS } from './grid';

// The m17 node grid as printed (grid.js): 20 x 41 cells. v: 1 full, 2 the lighter strength, 3 partly filled
// (quarter-size cells), 0 empty.
export const NODE = { cols: GRID_COLS, rows: GRID_ROWS, size: 40 };
const kind = (q) => (q.every((x) => x === '.') ? 0 : q.every((x) => x === 'F') ? 1 : q.every((x) => x === 'S') ? 2 : 3);
export const CELLS = GRID_CELLS.map(({ r, c, q, hidden }) => ({ r, c, q, hidden, v: kind(q) }));
export const Q = CAPACITY.quarters;
// The printed area outline of the m17 chart, traced from the reference every 2.5 phone units from Q1 to Q4 (MW axis).
// It is the drawing of the chart (it meets the Q3 marker at 5.200 MW and ends at Q4), not data of its own.
export const TRACE = [3101,3061,3040,3081,3121,3000,2898,2736,2676,2757,2696,2554,2676,2838,2939,3000,3101,3162,3121,3121,3223,3304,3426,3466,3507,3385,3263,3243,3243,3344,3446,3608,3689,3648,3628,3648,3730,3851,3953,4054,3973,3851,3730,3628,3709,3811,3871,3871,3770,3790,3871,3953,3993,4074,4155,4236,4338,4216,4155,4216,4277,4317,4358,4419,4480,4561,4601,4601,4601,4601,4621,4682,4723,4763,4824,4905,5027,5128,5200,5128,5067,4844,4601,4601,4642,4581,4520,4419,4317,4216,4155,4135,3993,3851,3750,3689,3730,3811,3851,3892,3730,3588,3486,3426,3486,3466,3344,3263,3203,3243,3304,3263,3203,3162,3101,3040,2980,2959,2920];
export const KPIS = CAPACITY.kpis;
export const PARTS = CAPACITY.treemap.parts;
export const partLine = (p) => `${p.labelRows.join(' ')} ${p.pct}%`;
export const MAX_TECH = Math.max(...TECH.map((t) => t.mw));

// The selection. Only the year with printed figures (2025) has data; the other chips show an empty state.
export const INIT = { year: CAPACITY.year, tech: null, q: null, part: null, cell: null, kpi: null, total: false };

// Plain English names for the strengths of a node cell (the case study draws two strengths of Active Blue).
export const STRENGTH = { 0: 'Empty cell', 1: 'Full strength', 2: 'Lighter strength', 3: 'Quarter-size cells' };

// The first filled cells, in reading order, used by the tour to place the cursor.
const filled = CELLS.filter((c) => c.v === 1 && !c.hidden);
const soft = CELLS.filter((c) => c.v === 2 && !c.hidden);
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
  return { title: base, body: `${strength}. No figure is published for any node.` };
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
