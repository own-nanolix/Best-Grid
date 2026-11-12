// Scene 1: the m19 billboard under its concrete overhang, seen straight on, two steel bollards in front.
import { ShadowG, CalloutG, DimensionG, LitG, castDir, CalloutsG } from '@/components/art/Mockup';
import { Plate, BillboardFaceG, BoltG, PanelSheenG, BOARD } from './shared';
import { r2 } from '@/lib/charts';
import { HEX, mixHex } from '@/lib/brand';

const IDP = 'use-world-billboard';
const W = 1400, H = 900;
const SPOT = { x: 0.2, y: 0.06 };
const BX = 90, BY = 300, BW = 1220;
const K = BW / BOARD.w;
const BH = r2(BOARD.h * K);
const FLOOR = 720;

function Bollard({ x, top = 580, dir }) {
  return (
    <g>
      <ShadowG idp={`${IDP}-sh-${x}`} cx={x + 8} cy={FLOOR + 62} rx={40} ry={9} dir={dir} opacity={0.7} blur={6} />
      <path d={`M${x + 8} ${FLOOR + 60}L${x + 8 + 150} ${FLOOR + 60 + 28}L${x + 8 + 150} ${FLOOR + 60 + 36}L${x + 8} ${FLOOR + 60 + 8}Z`} fill={HEX.black} opacity="0.28" />
      <rect x={x - 15} y={top + 14} width="30" height={FLOOR + 60 - top - 14} fill={`url(#${IDP}-metal)`} />
      <path d={`M${x - 15} ${top + 14}A15 14 0 0 1 ${x + 15} ${top + 14}Z`} fill={`url(#${IDP}-metal)`} />
      <rect x={x - 15} y={top + 14} width="30" height={FLOOR + 60 - top - 14} fill={`url(#${IDP}-shade)`} />
      <rect x={x - 17} y={FLOOR + 52} width="34" height="8" fill={mixHex(HEX.darkBlue, HEX.lightBlue, 0.4)} />
      <rect x={x - 12} y={top + 40} width="3" height={FLOOR - top - 4} fill={HEX.white} opacity="0.5" />
    </g>
  );
}

export default function Billboard() {
  const dir = castDir(SPOT, W, H, 700, 600);
  const beams = [70, 250, 430, 610, 790, 970, 1150, 1330];
  return (
    <Plate idp={IDP} title="Billboard under a concrete overhang, with width and height dimensions" exportName="use-world-billboard" w={W} h={H} spot={SPOT} floor={0.8} no="01" label="Billboard">
      <defs>
        <linearGradient id={`${IDP}-concrete`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={mixHex(HEX.darkBlue, HEX.lightBlue, 0.4)} />
          <stop offset="0.5" stopColor={mixHex(HEX.cardGrey, HEX.darkBlue, 0.8)} />
          <stop offset="1" stopColor={mixHex(HEX.stage, HEX.muted, 0.5)} />
        </linearGradient>
        <linearGradient id={`${IDP}-pave`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={mixHex(HEX.labelGrey, HEX.darkBlue, 0.9)} />
          <stop offset="1" stopColor={mixHex(HEX.darkBlue, HEX.black, 0.3)} />
        </linearGradient>
        <clipPath id={`${IDP}-face`}><rect x={BX} y={BY} width={BW} height={BH} /></clipPath>
        <linearGradient id={`${IDP}-rake`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={HEX.black} stopOpacity="0.38" />
          <stop offset="1" stopColor={HEX.black} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* wall above, beams, the black recess, the pavement */}
      <rect x="28" y="28" width="1344" height="206" fill={`url(#${IDP}-concrete)`} />
      <g fill={HEX.white} opacity="0.18">
        {[0, 1, 2].map((i) => <rect key={i} x="28" y={72 + i * 52} width="1344" height="1" />)}
        {[200, 560, 940, 1260].map((x) => <rect key={x} x={x} y="60" width="3" height="3" />)}
      </g>
      {beams.map((x, i) => (
        <path key={x} d={`M${x} 180L${x + 70} 180L${x + 36} 234L${x - 22} 234Z`} fill={mixHex(HEX.stage, HEX.muted, 0.35)} opacity={r2(0.55 + (i % 2) * 0.12)} />
      ))}
      <rect x="28" y="234" width="1344" height="66" fill={mixHex(HEX.darkBlue, HEX.black, 0.8)} />
      <rect x="28" y={BY + BH} width="1344" height={FLOOR - BY - BH - 8} fill={mixHex(HEX.darkBlue, HEX.stage, 0.7)} />
      <rect x="28" y={BY + BH + 4} width="1344" height="2" fill={HEX.white} opacity="0.1" />
      <rect x="28" y={FLOOR - 8} width="1344" height="172" fill={`url(#${IDP}-pave)`} />
      <rect x="28" y={FLOOR - 8} width="1344" height="1.5" fill={HEX.white} opacity="0.14" />

      <LitG>
        {/* the frame: steel angle with depth, bolts at the corners */}
        <rect x={BX - 14} y={BY - 14} width={BW + 28} height={BH + 28} fill={`url(#${IDP}-metal-dark)`} />
        <rect x={BX - 14} y={BY - 14} width={BW + 28} height="5" fill={HEX.white} opacity="0.2" />
        <rect x={BX - 14} y={BY + BH + 9} width={BW + 28} height="5" fill={HEX.black} opacity="0.4" />
        <g clipPath={`url(#${IDP}-face)`}>
          <g transform={`translate(${BX} ${BY}) scale(${r2(K)})`}><BillboardFaceG idp={IDP} /></g>
          {/* the overhang throws its shadow on the face, falling away from the light */}
          <path d={`M${BX} ${BY}H${BX + BW}V${BY + 34}L${BX + 940} ${BY + 34}L${BX + 900} ${BY + 82}L${BX + 560} ${BY + 82}L${BX + 520} ${BY + 34}L${BX} ${BY + 34}Z`} fill={`url(#${IDP}-rake)`} />
          {beams.map((x) => <path key={x} d={`M${x + 20} ${BY}L${x + 110} ${BY}L${x + 150} ${BY + 66}L${x + 56} ${BY + 66}Z`} fill={HEX.black} opacity="0.16" />)}
          <PanelSheenG idp={IDP} x={BX} y={BY} w={BW} h={BH} opacity={0.35} />
        </g>
        {[[BX - 7, BY - 7], [BX + BW + 7, BY - 7], [BX - 7, BY + BH + 7], [BX + BW + 7, BY + BH + 7], [BX + BW / 2, BY - 7], [BX + BW / 2, BY + BH + 7]].map(([x, y]) => <BoltG key={`${x}-${y}`} x={x} y={y} r={4.5} />)}
      </LitG>

      <Bollard x={BX + Math.round(440 * K)} dir={dir} />
      <Bollard x={BX + Math.round(1222 * K)} dir={dir} />

      {/* dimensions: width above, height to the left */}
      <DimensionG x1={BX} y1={BY} x2={BX + BW} y2={BY} value="12 000 mm" offset={-48} i={0} />
      <DimensionG x1={BX} y1={BY + BH} x2={BX} y2={BY} value="3 800 mm" offset={-36} i={1} />

      <CalloutsG>
        <CalloutG x={BX + 110} y={BY + BH - 8} tx={300} ty={850} side="left" label="Printed vinyl face" i={2} />
        <CalloutG x={BX + BW - 40} y={BY + BH + 11} tx={1190} ty={790} label="Steel angle frame" i={3} />
        <CalloutG x={BX + Math.round(1222 * K)} y={720} tx={1010} ty={850} side="left" label="Stainless bollard, 90 mm" i={4} />
        <CalloutG x={BX + 540} y={190} tx={600} ty={88} label="Concrete overhang" i={5} />
      </CalloutsG>
    </Plate>
  );
}
