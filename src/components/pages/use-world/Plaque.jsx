// Scene 6: a room plaque on a wall seen close up from about 20 degrees to the left. The mark, a plain room word and a
// quiet pale bar where a name would be. The face is drawn flat and mapped onto the wall plane with one matrix.
import { CalloutG, DimensionG, LitG, castDir } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { Plate, BoltG, IconPathG } from './shared';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const IDP = 'use-world-plaque';
const W = 1400, H = 800;
const SPOT = { x: 0.82, y: 0.06 };
const PW = 560, PH = 400;
const A = 0.9, B = -0.1; // x scale and the rise of the far (right) edge
const OX = 150, OY = 190;
const pt = (x, y) => [r2(OX + A * x), r2(OY + B * x + y)];

export default function Plaque() {
  const dir = castDir(SPOT, W, H, 450, 400);
  const [x0, y0] = pt(0, 0), [x1, y1] = pt(PW, 0), [x2, y2] = pt(PW, PH), [x3, y3] = pt(0, PH);
  const quad = `M${x0} ${y0}L${x1} ${y1}L${x2} ${y2}L${x3} ${y3}Z`;
  return (
    <Plate idp={IDP} title="Room plaque on a wall from twenty degrees left" exportName="use-world-plaque" w={W} h={H} spot={SPOT} floor={null} split={0.62} no="06" label="Room plaque">
      <defs>
        <clipPath id={`${IDP}-wall`}><rect x="56" y="56" width="760" height="688" /></clipPath>
        <clipPath id={`${IDP}-face`}><rect x="0" y="0" width={PW} height={PH} /></clipPath>
        <radialGradient id={`${IDP}-wall-lit`} gradientUnits="userSpaceOnUse" cx={r2(W * SPOT.x)} cy={r2(H * SPOT.y)} r="1100">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#0c0e1f" stopOpacity="0.55" />
        </radialGradient>
        <linearGradient id={`${IDP}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#05060d" />
          <stop offset="1" stopColor="#2a3160" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${IDP}-wall)`}>
        <rect x="56" y="56" width="760" height="688" fill={`url(#${IDP}-card)`} />
        <rect x="56" y="56" width="760" height="688" fill="#ffffff" opacity="0.5" filter={`url(#${IDP}-fibre)`} />
        {[0, 1].map((i) => <rect key={i} x={380 + i * 330} y="56" width="1.5" height="688" fill={HEX.darkBlue} opacity="0.12" />)}
        <rect x="56" y="56" width="760" height="688" fill={`url(#${IDP}-wall-lit)`} />
        {/* the cast shadow of the plaque on the wall, away from the light */}
        <path d={quad} transform={`translate(${r2(dir.x * 34)} ${r2(dir.y * 34 + 6)})`} fill="#000000" opacity="0.3" filter={`url(#${IDP}-soft)`} />
        <path d={quad} transform={`translate(${r2(dir.x * 12)} ${r2(dir.y * 12 + 2)})`} fill="#000000" opacity="0.32" />
      </g>

      <LitG>
        {/* the left edge of the board, visible from this side */}
        <path d={`M${x0} ${y0}L${x0 - 14} ${r2(y0 + 5)}L${x3 - 14} ${r2(y3 + 5)}L${x3} ${y3}Z`} fill={`url(#${IDP}-edge)`} />
        <path d={`M${x0} ${y0}L${x1} ${y1}L${x1 - 7} ${r2(y1 - 6)}L${x0 - 14} ${r2(y0 - 4)}Z`} fill="#ffffff" opacity="0.2" />
        <g transform={`matrix(${A} ${B} 0 1 ${OX} ${OY})`}>
          <rect width={PW} height={PH} fill={`url(#${IDP}-board-dark)`} />
          <g clipPath={`url(#${IDP}-face)`}>
            {/* guide hairlines and nodes: the case study's live area */}
            <rect x="24" y="24" width={PW - 48} height="1" fill={HEX.activeBlue} opacity="0.8" />
            <rect x="24" y={PH - 25} width={PW - 48} height="1" fill={HEX.activeBlue} opacity="0.8" />
            <rect x="24" y="24" width="1" height={PH - 48} fill={HEX.activeBlue} opacity="0.8" />
            <rect x={PW - 25} y="24" width="1" height={PH - 48} fill={HEX.activeBlue} opacity="0.8" />
            {[[24, 24], [PW - 24, 24], [24, PH - 24], [PW - 24, PH - 24]].map(([x, y]) => <rect key={`${x}${y}`} x={x - 4} y={y - 4} width="8" height="8" fill={HEX.activeBlue} />)}
            <MarkG x={56} y={56} size={84} fill={HEX.activeBlue} />
            <rect x={PW - 150} y="56" width="94" height="94" fill="#2a3266" />
            <IconPathG name="calendar" x={PW - 128} y={78} size={50} fill={HEX.onBlue} />
            <text x="56" y="236" fontSize="66" fill={HEX.onBlue}>Meeting room</text>
            <rect x="56" y="276" width="400" height="20" fill={HEX.onBlue} opacity="0.55" />
            <rect x="56" y="314" width="250" height="20" fill={HEX.onBlue} opacity="0.35" />
            <rect width={PW} height={PH} fill={`url(#${IDP}-shade-r)`} opacity="0.45" />
            <rect width={PW} height={PH} fill={`url(#${IDP}-glass)`} opacity="0.4" className="mock-sheen" />
          </g>
          <rect width={PW} height={PH} fill="none" stroke="#ffffff" strokeOpacity="0.28" />
        </g>
        {[[18, 18], [PW - 18, 18], [18, PH - 18], [PW - 18, PH - 18]].map(([x, y]) => { const [px, py] = pt(x, y); return <BoltG key={`${x}${y}`} x={px} y={py} r={5} />; })}
      </LitG>

      <DimensionG x1={x3} y1={y3} x2={x2} y2={y2} value="300 mm" offset={40} i={0} text={HEX.darkBlue} color="#6f7ab0" />
      <DimensionG x1={x3} y1={y3} x2={x0} y2={y0} value="215 mm" offset={-40} i={1} text={HEX.darkBlue} color="#6f7ab0" />

      <CalloutG x={pt(98, 98)[0]} y={pt(98, 98)[1]} tx={900} ty={150} label="Mark, 45 mm" i={2} />
      <CalloutG x={pt(250, 205)[0]} y={pt(250, 205)[1]} tx={900} ty={270} label="Room word, plain English" i={3} />
      <CalloutG x={pt(250, 286)[0]} y={pt(250, 286)[1]} tx={900} ty={390} label="Pale bar where a name would be" i={4} />
      <CalloutG x={pt(PW - 18, PH - 18)[0]} y={pt(PW - 18, PH - 18)[1]} tx={900} ty={510} label="Fixing screw, 4 mm" i={5} />
      <CalloutG x={x2 + 4} y={y2 + 6} tx={900} ty={630} label="Dark Blue board, 6 mm" i={6} />
    </Plate>
  );
}
