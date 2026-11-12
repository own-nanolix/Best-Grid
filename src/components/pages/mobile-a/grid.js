// The node grid of the m17 back phone, read cell by cell from the reference (reference/m17.png): 20 columns by
// 41 rows, each cell split into four quarters ('F' full Active Blue, 'S' the lighter strength, '.' empty, 'x' hidden
// behind the front phone). Only columns 11 to 20 (and the right half of column 10) are visible in the case study;
// the hidden quarters continue the visible pattern (shifted, so it is drawing, never data). No cell carries a value.
export const GRID_COLS = 20;
export const GRID_ROWS = 41;
// Columns 11 to 20 as printed (four characters per cell: top-left, top-right, bottom-left, bottom-right).
const SEEN = [
  '.............F....FF....................',
  '..x.............FF....FF..FF............',
  'x.x.................FFFFFFFF............',
  'x.x.................FFF.FF..............',
  'x.x.........SSSSSSSS....................',
  'x.x.........SSSSSSSS....................',
  'x.x.................F.......SSSSSSSSSSSS',
  'x.x.........................SSSSSSSSSSSS',
  'x.x.........................SSSSSSSSSSSS',
  'x.x.....................FFFF............',
  'xFxF.....S.SSSSSSSSSSSSS....F...........',
  'xFxF.....S.SSSSSSSSSSSSS................',
  'x.x.F..F.SFSSSSSSSSSSSSS................',
  'x.xF.FFFFSF.SS..SS..SS..................',
  'xFxFFFFFF.F.............................',
  'xFxFFFFFF.F.............................',
  'xFxFFFFFF.F..........S.SSSSSS.S.........',
  'xFx.FF..F..F..F......S.SSSSSS.S.........',
  'x.x..FF..F..F..F..FFF.F.................',
  'x.x..........F.FFFFFF.F.................',
  'x.x........F.FF.FF..F..F..F.............',
  'x.xF..FF.FFFF........F..F..S............',
  'xFxFFFFFF.F.............S...............',
  'xFxFFFFFF.F.............................',
  'xFx.FF.SF.SS..S.....SSSSSSSSSSSSSSSS....',
  'x.x..S.SSSSSS.S.....SSSSSSSSSSSSSSSS....',
  'x.x..S..SS..S..S....SSSSSSSSSSSSSSSS....',
  'xFxF............SSSSSSSSSSSSSSSSSSSS....',
  'xFxFFFFFFFFFFFFFFFFF.FF...FF........F...',
  'x.x.FFFFFFFFFFFFFFFF....FF..............',
  'x.x.FFFFFFFFFFFFFFFF....................',
  'x.x.FFFFFFFFFFFFSSSSSSSSSSSSSSSSSSSS....',
  'x.x.FFFF........SSSSSSSSSSSSSSSSSSSS....',
  'x.x....FF.......SSSSSSSSSSSSSSSSSSSS....',
  'x.x.....FFFF....SSSSSSSSSSSSSSSSSSSS....',
  'x.x.............SSSSSSSSSSSSSSSSSSSS..F.',
  'x.x.SSSSSSSSSSSS....................FFFF',
  'x.x.SSSSSSSSSSSS............FFFFFFFFFFFF',
  'x.x.SSSSSSSSSSSS......F.....FFFFFFFFFFFF',
  'x.x.............FFFF.FF.....FFFFFFFFFFFF',
  'x.x..................F..FFFF............',
];
const at = (r, c, q) => SEEN[r][(c - 10) * 4 + q];
// Quarter value at row r, column c (0-based), quarter q, with the hidden part continued.
function quarter(r, c, q) {
  if (c >= 10) {
    const v = at(r, c, q);
    if (v !== 'x') return v;
    const m = at(r, c, q ^ 1);
    return m === 'x' ? '.' : m;
  }
  return quarter((r + 17) % GRID_ROWS, c + 10, q);
}
// Every cell: { r, c, q: [four values], hidden } where hidden marks a cell the case study does not show.
export const GRID_CELLS = Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => {
  const r = Math.floor(i / GRID_COLS);
  const c = i % GRID_COLS;
  return { r, c, q: [0, 1, 2, 3].map((q) => quarter(r, c, q)), hidden: c < 10 || (c === 10 && at(r, c, 0) === 'x') };
});
