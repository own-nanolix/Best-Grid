// The premise of the case study as one drawing: "technical complexity is not the problem, lack of structure is".
// Left, seven tangled strands. They arrive at seven straight rows; the rows run on into a ruled grid whose crossings
// take a square node, and a few cells fill. Drawing only: nothing here carries a value.
// Entrance (CSS keyframes inside the SVG): the strands draw on, the rows extend, the columns extend, the nodes snap,
// the cells fill.
import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';

const W = 1200;
const H = 500;
const ROWS = Array.from({ length: 7 }, (_, i) => 60 + i * 60);          // 60 .. 420
const COLS = Array.from({ length: 6 }, (_, i) => 640 + i * 108);        // 640 .. 1180
const JOIN = 560;                                                        // where the strands become rows
const FILLED = [[0, 1], [1, 1], [1, 2], [3, 3], [3, 4], [4, 4], [4, 0]]; // [col, row] cells that fill (drawing only)

// Seven strands from scattered starts on the left edge to the seven rows, with seeded control points.
function strands() {
  const rnd = seeded(23);
  const starts = ROWS.map((_, i) => r2(40 + ((i * 3 + 2) % 7) * 56 + rnd() * 18));
  return ROWS.map((y, i) => {
    const y0 = starts[i];
    const c1 = [r2(120 + rnd() * 120), r2(40 + rnd() * 380)];
    const c2 = [r2(300 + rnd() * 140), r2(40 + rnd() * 380)];
    const c3 = [r2(180 + rnd() * 200), r2(30 + rnd() * 400)];
    return `M0 ${y0}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${r2(JOIN * 0.55)} ${r2((y0 + y) / 2)}S${c3[0] + 200} ${r2(y + (rnd() - 0.5) * 160)} ${JOIN} ${y}`;
  });
}

export default function Tangle() {
  const paths = strands();
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Seven tangled strands arriving at the rows of a ruled grid" exportName="strategy-tangle-to-grid">
      <rect width={W} height={H} fill={HEX.paper} />
      {/* filled cells under the lines */}
      {FILLED.map(([c, r], k) => (
        <rect key={`f${c}-${r}`} x={COLS[c] + 0.5} y={ROWS[r] + 0.5} width={COLS[c + 1] - COLS[c] - 1} height={ROWS[r + 1] - ROWS[r] - 1} fill={k % 3 === 0 ? HEX.darkBlue : HEX.activeBlue} className="fill-in" style={{ '--i': 26 + k * 2 }} />
      ))}
      {/* the strands: complexity */}
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={HEX.darkBlue} strokeWidth="1.4" strokeOpacity="0.8" pathLength="1" className="draw" style={{ '--len': 1, '--i': i }} />
      ))}
      {/* the rows: structure begins */}
      {ROWS.map((y, i) => (
        <rect key={`r${y}`} x={JOIN} y={y - 0.6} width={W - JOIN} height={1.2} fill={HEX.darkBlue} className="extend-x" style={{ '--i': 14 + i }} />
      ))}
      {COLS.map((x, i) => (
        <rect key={`c${x}`} x={x - 0.6} y={ROWS[0]} width={1.2} height={ROWS[ROWS.length - 1] - ROWS[0]} fill={HEX.darkBlue} className="extend-y" style={{ '--i': 20 + i }} />
      ))}
      {ROWS.map((y, ri) =>
        COLS.map((x, ci) => (
          <rect key={`n${ri}-${ci}`} x={x - 3} y={y - 3} width="6" height="6" fill={HEX.darkBlue} className="snap" style={{ '--i': 24 + ri + ci }} />
        )),
      )}
      {/* the joint: nodes where each strand meets its row */}
      {ROWS.map((y, i) => (
        <rect key={`j${y}`} x={JOIN - 3} y={y - 3} width="6" height="6" fill={HEX.activeBlue} className="snap" style={{ '--i': 12 + i }} />
      ))}
      <g fill={HEX.muted} fontSize="18" className="fade-in" style={{ '--i': 30 }}>
        <text x={24} y={478}>Complexity</text>
        <text x={COLS[0]} y={478}>Structure</text>
      </g>
    </Art>
  );
}
