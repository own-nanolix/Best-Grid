// The profile grid (3 x 3 square tiles, no platform chrome) and the m10 hard-cut poster cycle.
import { HEX, LINES, POSTERS } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CrossingBandsG, LatticeFieldG, NodeGridG, StarEchoG, BaselineFieldG } from '@/components/art/KeyArt';
import { Lines, HL, VL, Nd, Crossings, Word } from './kit';

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

// m10: one 3:4 sheet, the baseline field in its six columns, nodes at the live area, and the printed lines cutting
// through at 100 ms a frame. The frames are the only children of the cycle group (the first one shows by default).
const FRAMES = [
  { rows: POSTERS.dataCentre.head, size: 52 },
  { rows: POSTERS.dataCentre.body, size: 26 },
  { rows: POSTERS.generation.head, size: 52 },
  { rows: POSTERS.generation.body, size: 26 },
  { rows: POSTERS.clarity.head, size: 52 },
  { rows: POSTERS.clarity.body, size: 26 },
  { rows: [POSTERS.field.head], size: 44 },
  { rows: POSTERS.field.body, size: 22 },
];

export function PosterCycle() {
  const ink = HEX.muted, id = 'campaign-cycle';
  return (
    <g>
      <rect width="1080" height="1440" fill={HEX.paper} />
      <BaselineFieldG idp={id} x={72} y={76} w={936} h={1288} />
      <VL x={72} y2={1440} c={ink} w={1} o={0.5} />
      <VL x={1008} y2={1440} c={ink} w={1} o={0.5} i={1} />
      <HL y={76} x2={1080} c={ink} w={1} o={0.5} i={2} />
      <HL y={1364} x2={1080} c={ink} w={1} o={0.5} i={3} />
      <Crossings xs={[72, 1008]} ys={[76, 1364]} c={ink} s={9} i={4} />
      <MarkG x={110} y={110} size={64} fill={ink} />
      <Word x={1008 - 40} y={204} size={77} anchor="end" fill={ink} i={6} />
      <g>
        {FRAMES.map((f, i) => {
          const h = f.rows.length * f.size * 1.3 + 56;
          return (
            <g key={i} className="cut" style={{ '--f': i }}>
              <rect x="110" y={r2(1010 - f.size - 28)} width="860" height={r2(h)} fill={HEX.paper} />
              <Lines rows={f.rows} x={140} y={1010} size={f.size} lh={1.3} fill={ink} display={f.size > 30} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
