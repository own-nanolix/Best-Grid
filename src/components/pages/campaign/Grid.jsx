// The profile grid (3 x 3 square tiles, no platform chrome) and the m10 hard-cut poster cycle.
import { HEX, LINES } from '@/lib/brand';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CrossingBandsG, LatticeFieldG, NodeGridG, StarEchoG } from '@/components/art/KeyArt';
import { POSTER_LIST, PH } from './Posters';
import { Lines, HL, VL, Nd, Crossings } from './kit';

const T = 360;

// Each tile is drawn in its own 360 x 360 space.
const TILES = [
  () => (
    <g>
      <rect width={T} height={T} fill={HEX.darkBlue} />
      <MarkG x={85} y={85} size={190} fill={HEX.activeBlue} />
    </g>
  ),
  () => (
    <g>
      <rect width={T} height={T} fill={HEX.activeBlue} />
      <Lines rows={LINES.web.rows} x={30} y={140} size={30} lh={1.2} fill={HEX.darkBlue} />
      <MarkG x={264} y={30} size={66} fill={HEX.onBlue} />
    </g>
  ),
  () => (
    <g>
      <rect width={T} height={T} fill={HEX.lightBlue} />
      <WordmarkG x={180} y={205} size={70} anchor="middle" fill={HEX.darkBlue} />
    </g>
  ),
  () => (
    <g>
      <rect width={T} height={T} fill={HEX.periwinkle} />
      <CrossingBandsG idp="campaign-pg-bands" w={T} h={T} cx={0.5} cy={0.5} band={0.07} r={0.14} />
    </g>
  ),
  () => (
    <g>
      <rect width={T} height={T} fill={HEX.darkBlue} />
      <LatticeFieldG cx={180} cy={180} k={1.7} rings={5} fill={HEX.activeBlue} opacity="0.4" />
      <MarkG x={120} y={120} size={120} fill={HEX.activeBlue} />
    </g>
  ),
  () => (
    <g>
      <rect width={T} height={T} fill={HEX.activeBlue} />
      <MarkG x={264} y={30} size={66} fill={HEX.darkBlue} />
      <rect x="30" y="236" width="300" height="1.5" fill={HEX.darkBlue} />
      <Nd x={30} y={236} c={HEX.darkBlue} s={8} />
      <text x="30" y="300" fontSize="40" fill={HEX.darkBlue}>bestgrid.com</text>
    </g>
  ),
  () => (
    <g>
      <rect width={T} height={T} fill={HEX.lightBlue} />
      <NodeGridG cols={6} rows={6} size={60} seed={11} clusters={5} line="rgba(27,32,67,0.3)" />
    </g>
  ),
  () => (
    <g>
      <rect width={T} height={T} fill={HEX.darkBlue} />
      {LINES.fieldWords.map((w, i) => (
        <g key={w}>
          <rect x="30" y={60 + i * 90} width="300" height="1.2" fill={HEX.labelGrey} opacity="0.7" />
          <text x="30" y={128 + i * 90} fontSize="48" fill={HEX.onBlue} lang="es" className="display">{w}</text>
        </g>
      ))}
    </g>
  ),
  () => (
    <g>
      <rect width={T} height={T} fill={HEX.activeBlue} />
      <StarEchoG cx={180} cy={180} size={70} count={6} step={0.55} stroke={HEX.darkBlue} weight={2} />
      <MarkG x={145} y={145} size={70} fill={HEX.darkBlue} />
    </g>
  ),
];

export function ProfileGrid() {
  const edge = [T, T * 2];
  return (
    <g>
      {TILES.map((Tile, n) => {
        const x = (n % 3) * T, y = Math.floor(n / 3) * T;
        return (
          <g key={n} transform={`translate(${x} ${y})`}>
            <clipPath id={`campaign-pg-clip-${n}`}>
              <rect width={T} height={T} />
            </clipPath>
            <g clipPath={`url(#campaign-pg-clip-${n})`} className="fill-in" style={{ '--i': n * 2 }}>
              <Tile />
            </g>
          </g>
        );
      })}
      {edge.map((v, i) => <HL key={`h${v}`} y={v} x2={1080} c={HEX.white} w={3} o={0.9} i={i} />)}
      {edge.map((v, i) => <VL key={`v${v}`} x={v} y2={1080} c={HEX.white} w={3} o={0.9} i={i + 2} />)}
      <Crossings xs={edge} ys={edge} c={HEX.darkBlue} s={12} i={6} />
    </g>
  );
}

// m10: one 3:4 sheet cycling the four poster layouts of m09 and m11 in the m10 state (paper, the baseline field, one
// grey ink, photographs as flat blocks), hard cuts at 100 ms a frame. Frames 0, 2, 4, 6 and 7 follow the left sheet of
// the stills m10_1 to m10_5 (data centre, field, generation, clarity, data centre); frames 1, 3 and 5 are not in the
// stills and take the layouts of the right sheet (generation, clarity, field). The first frame shows by default.
const CYCLE = ['data-centre', 'generation', 'field', 'clarity', 'generation', 'field', 'clarity', 'data-centre'];

export function PosterCycle() {
  const id = 'campaign-cycle';
  return (
    <g>
      {CYCLE.map((key, i) => (
        <g key={i} className="cut" style={{ '--f': i }}>
          {POSTER_LIST.find((q) => q.key === key).node(`${id}-f${i}`, PH, true)}
        </g>
      ))}
    </g>
  );
}
