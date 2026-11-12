// Scene 4: two wayfinding plaques on stand-offs. Left plate: plain facility words with the shared icons and arrows.
// Right plate: the case study's own words (Análisis, Criterio, Validación) with arrows. Callouts and spec on the left.
import { CalloutG, DimensionG, SpecColumnG, LitG, castDir, CalloutsG } from '@/components/art/Mockup';
import { Plate, WayRowsG, PanelSheenG } from './shared';
import { MarkG } from '@/components/art/Mark';
import { HEX, LINES, mixHex } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const IDP = 'use-world-wayfinding';
const W = 1400, H = 860;
const SPOT = { x: 0.16, y: 0.08 };
const WALL = { x: 620, y: 56, w: 724, h: 700 };
const WIRE = mixHex(HEX.periwinkle, HEX.stageLight, 0.55);

// A plaque on stand-offs: a cast shadow away from the light, an edge with thickness, the printed face, a lit rim.
function Plaque({ id, x, y, w, h, face, edge, dir, children }) {
  const caps = [[x + 16, y + 16], [x + w - 16, y + 16], [x + 16, y + h - 16], [x + w - 16, y + h - 16]];
  return (
    <g>
      <rect x={r2(x + dir.x * 22)} y={r2(y + dir.y * 22)} width={w} height={h} fill={HEX.black} opacity="0.32" filter={`url(#${IDP}-soft)`} />
      <rect x={r2(x + dir.x * 5)} y={r2(y + dir.y * 5)} width={w} height={h} fill={edge} />
      <rect x={x} y={y} width={w} height={h} fill={face} />
      <clipPath id={`${IDP}-${id}-clip`}><rect x={x} y={y} width={w} height={h} /></clipPath>
      <g clipPath={`url(#${IDP}-${id}-clip)`}>
        {children}
        <rect x={x} y={y} width={w} height={h} fill={`url(#${IDP}-shade)`} opacity="0.6" />
        <PanelSheenG idp={IDP} x={x} y={y} w={w} h={h} opacity={0.32} />
      </g>
      <rect x={x} y={y} width={w} height="2" fill={HEX.white} opacity="0.55" />
      <rect x={x} y={y} width="2" height={h} fill={HEX.white} opacity="0.4" />
      {caps.map(([cx, cy]) => (
        <g key={`${cx}${cy}`}>
          <circle cx={r2(cx + dir.x * 4)} cy={r2(cy + dir.y * 4)} r="9" fill={HEX.black} opacity="0.35" />
          <circle cx={cx} cy={cy} r="8" fill={`url(#${IDP}-metal)`} />
          <circle cx={cx} cy={cy} r="4.5" fill="none" stroke={mixHex(HEX.darkBlue, HEX.lightBlue, 0.4)} strokeWidth="1" />
          <circle cx={r2(cx - 2.5)} cy={r2(cy - 2.5)} r="1.6" fill={HEX.white} />
        </g>
      ))}
    </g>
  );
}

export default function Wayfinding() {
  const dir = castDir(SPOT, W, H, 1000, 400);
  const plain = [
    { icon: 'user', word: 'Reception', arrow: 'right' },
    { icon: 'calendar', word: 'Meeting room', arrow: 'left' },
    { icon: 'pin', word: 'Parking', arrow: 'up' },
  ];
  const own = [
    { icon: 'chart', word: LINES.fieldWords[0], arrow: 'right', lang: 'es' },
    { icon: 'study', word: LINES.fieldWords[1], arrow: 'right', lang: 'es' },
    { icon: 'check', word: LINES.fieldWords[2], arrow: 'right', lang: 'es' },
  ];
  return (
    <Plate idp={IDP} title="Two wayfinding plaques with arrows, icons and the case study's section words" exportName="use-world-wayfinding" w={W} h={H} spot={SPOT} floor={null} split={0.44} no="04" label="Wayfinding">
      <defs>
        <clipPath id={`${IDP}-wall`}><rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} /></clipPath>
        <radialGradient id={`${IDP}-wall-lit`} gradientUnits="userSpaceOnUse" cx={r2(W * SPOT.x)} cy={r2(H * SPOT.y)} r="1300">
          <stop offset="0" stopColor={HEX.white} stopOpacity="0.6" />
          <stop offset="0.6" stopColor={HEX.white} stopOpacity="0.05" />
          <stop offset="1" stopColor={HEX.stage} stopOpacity="0.5" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${IDP}-wall)`}>
        <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill={HEX.lightBlue} />
        {[1, 2, 3].map((i) => <rect key={i} x={WALL.x + i * 181} y={WALL.y} width="1.5" height={WALL.h} fill={HEX.darkBlue} opacity="0.12" />)}
        <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill={HEX.white} opacity="0.4" filter={`url(#${IDP}-fibre)`} />
        <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill={`url(#${IDP}-wall-lit)`} />
      </g>

      <LitG>
        <Plaque id="a" x={680} y={140} w={310} h={470} face={HEX.darkBlue} edge={mixHex(HEX.darkBlue, HEX.stage, 0.85)} dir={dir}>
          <rect x="680" y="140" width="310" height="470" fill={`url(#${IDP}-board-dark)`} />
          <MarkG x={706} y={158} size={44} fill={HEX.activeBlue} />
          <WayRowsG x={680} y={230} w={310} rowH={118} rows={plain} fg={HEX.onBlue} rule={HEX.activeBlue} cell={HEX.stageLight} />
        </Plaque>
        <Plaque id="b" x={1040} y={140} w={270} h={470} face={HEX.activeBlue} edge={mixHex(HEX.activeBlue, HEX.blueInk, 0.65)} dir={dir}>
          <rect x="1040" y="140" width="270" height="470" fill={`url(#${IDP}-board)`} filter={`url(#${IDP}-b-board)`} />
          <MarkG x={1066} y={158} size={44} fill={HEX.darkBlue} />
          <WayRowsG x={1040} y={230} w={270} rowH={118} rows={own} fg={HEX.darkBlue} rule={HEX.darkBlue} cell={HEX.blueSoft} />
        </Plaque>
      </LitG>

      <DimensionG x1={680} y1={610} x2={680} y2={140} value="800 mm" offset={-30} color={WIRE} text={HEX.darkBlue} i={0} />
      <DimensionG x1={680} y1={140} x2={990} y2={140} value="500 mm" offset={-26} color={WIRE} text={HEX.darkBlue} i={1} />

      <CalloutsG>
        <CalloutG x={696} y={156} tx={560} ty={110} side="left" label="Stand-off cap, 25 mm" color={WIRE} i={2} />
        <CalloutG x={712} y={289} tx={560} ty={200} side="left" label="Icon cell, 70 mm" color={WIRE} i={3} />
        <CalloutG x={966} y={525} tx={950} ty={650} side="left" label="Arrow, 60 mm bar" color={WIRE} text={HEX.darkBlue} i={4} />
        <CalloutG x={1175} y={500} tx={1230} ty={690} side="left" label="Section words as printed" color={WIRE} text={HEX.darkBlue} i={5} />
      </CalloutsG>

      <SpecColumnG x={110} y={440} w={410} title="Wayfinding plaque" rowH={46} rows={[
        { k: 'Material', v: 'Aluminium composite, 3 mm' },
        { k: 'Print', v: 'Direct UV, matt' },
        { k: 'Fixing', v: 'Four stand-offs' },
        { k: 'Plate A', v: 'Dark Blue, 500 × 800 mm' },
        { k: 'Plate B', v: 'Active Blue, 440 × 800 mm' },
      ]} />
    </Plate>
  );
}
