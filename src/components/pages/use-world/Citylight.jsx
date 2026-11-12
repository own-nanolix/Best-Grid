// Scene 2: a backlit citylight on the left and two roll-up banners stepping back to the right.
// The artwork is the case study's own posters (m11 left and right, m09 right), rebuilt in shared.jsx.
import { ShadowG, CalloutG, DimensionG, LitG, castDir, CalloutsG } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { Plate, PosterFieldG, PosterClarityG, PosterGenerationG, PanelSheenG, BoltG, POSTER } from './shared';
import { HEX, mixHex } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const IDP = 'use-world-citylight';
const W = 1400, H = 900;
const SPOT = { x: 0.36, y: 0.08 };
const FLOOR = 780;

// A roll-up: cassette base, a banner that carries the poster at the top and its own field below, a pole and a head bar.
function RollUp({ id, x, floor, w, k = 1, bg, line, Poster, perspective = 0 }) {
  const sc = r2(w / POSTER.w);
  const ph = r2(POSTER.h * sc);
  const bh = r2(w * 2.35);
  const top = floor - 30 - bh;
  const clip = `${IDP}-${id}-clip`;
  return (
    <g transform={`translate(${x} 0)`}>
      <clipPath id={clip}><rect x="0" y={top} width={w} height={bh} /></clipPath>
      <ShadowG idp={`${IDP}-${id}-sh`} cx={w / 2 + 10} cy={floor} rx={w * 0.72} dir={castDir(SPOT, W, H, x, floor)} opacity={0.7} blur={8 * k} />
      <g transform={perspective ? `matrix(1 ${perspective} 0 1 0 ${r2(-perspective * w * 0.5)})` : undefined}>
        <g clipPath={`url(#${clip})`}>
          <rect x="0" y={top} width={w} height={bh} fill={bg} />
          <g transform={`translate(0 ${top}) scale(${sc})`}><Poster idp={IDP} uid={id} /></g>
          <rect x="0" y={r2(top + ph - 1)} width={w} height={r2(bh - ph + 1)} fill={bg} />
          <rect x={r2(w * 0.0667)} y={r2(top + ph - 4)} width="1" height={r2(bh - ph + 4)} fill={line} opacity="0.7" />
          <rect x={r2(w * 0.9333)} y={r2(top + ph - 4)} width="1" height={r2(bh - ph + 4)} fill={line} opacity="0.7" />
          <MarkG x={r2(w / 2 - w * 0.07)} y={r2(top + bh - w * 0.3)} size={r2(w * 0.14)} fill={line} />
          <rect x="0" y={top} width={w} height={bh} fill={`url(#${IDP}-shade)`} opacity="0.55" />
          <PanelSheenG idp={IDP} x={0} y={top} w={w} h={bh} opacity={0.3} />
        </g>
        {/* head bar, pole and the cassette */}
        <rect x="-4" y={top - 12} width={w + 8} height="12" fill={`url(#${IDP}-metal)`} />
        <rect x="-4" y={top - 12} width={w + 8} height="12" fill={`url(#${IDP}-shade-v)`} />
        <rect x={r2(w / 2 - 3)} y={top - 70} width="6" height="60" fill={`url(#${IDP}-metal)`} />
        <path d={`M-6 ${floor - 30}H${w + 6}L${w + 12} ${floor - 6}Q${w + 12} ${floor} ${w + 6} ${floor}H-6Q-12 ${floor} -12 ${floor - 6}Z`} fill={`url(#${IDP}-metal)`} />
        <path d={`M-6 ${floor - 30}H${w + 6}L${w + 12} ${floor - 6}Q${w + 12} ${floor} ${w + 6} ${floor}H-6Q-12 ${floor} -12 ${floor - 6}Z`} fill={`url(#${IDP}-shade)`} />
        <rect x="-6" y={floor - 30} width={w + 12} height="2" fill={HEX.white} opacity="0.6" />
        <rect x={r2(w / 2 - 22)} y={floor - 17} width="44" height="3" fill={mixHex(HEX.stage, HEX.muted, 0.5)} opacity="0.6" />
      </g>
    </g>
  );
}

export default function Citylight() {
  const CX = 110, CY = 128, CW = 364, CH = 480; // lightbox outer
  const f = 16;
  const pw = CW - 2 * f; // 332 wide
  const ph = r2(pw * 4 / 3); // 3:4 poster: 443 tall
  const dir = castDir(SPOT, W, H, CX, FLOOR);
  return (
    <Plate idp={IDP} title="Citylight and two roll-up banners with the case study posters" exportName="use-world-citylight-rollups" w={W} h={H} spot={SPOT} floor={0.87} split={0.37} no="02" label="Citylight and roll-ups">
      <rect x="28" y={FLOOR - 4} width="1344" height="1.5" fill={HEX.white} opacity="0.12" />

      <LitG>
        {/* citylight: plinth, lightbox with a deep frame, glass, backlit poster */}
        <ShadowG idp={`${IDP}-sh-c`} cx={CX + CW / 2 + 14} cy={FLOOR} rx={CW * 0.62} dir={dir} opacity={0.75} blur={9} />
        <path d={`M${CX + CW + 20} ${FLOOR}L${CX + CW + 210} ${FLOOR + 60}L${CX + CW - 80} ${FLOOR + 60}L${CX + CW - 40} ${FLOOR}Z`} fill={HEX.black} opacity="0.2" />
        <rect x={CX + 34} y={CY + CH} width={CW - 68} height={FLOOR - CY - CH - 18} fill={`url(#${IDP}-metal-dark)`} />
        <rect x={CX + 34} y={CY + CH} width={CW - 68} height={FLOOR - CY - CH - 18} fill={`url(#${IDP}-shade)`} />
        <rect x={CX + 14} y={FLOOR - 22} width={CW - 28} height="22" fill={`url(#${IDP}-metal-dark)`} />
        <rect x={CX + 14} y={FLOOR - 22} width={CW - 28} height="3" fill={HEX.white} opacity="0.25" />
        <rect x={CX - 4} y={CY - 6} width={CW + 8} height={CH + 12} fill={`url(#${IDP}-metal-dark)`} />
        <rect x={CX - 4} y={CY - 6} width={CW + 8} height="4" fill={HEX.white} opacity="0.28" />
        <rect x={CX + f - 4} y={CY + f - 4} width={pw + 8} height={ph + 8} fill={mixHex(HEX.darkBlue, HEX.black, 0.8)} />
        <clipPath id={`${IDP}-c-clip`}><rect x={CX + f} y={CY + f} width={pw} height={ph} /></clipPath>
        <g clipPath={`url(#${IDP}-c-clip)`}>
          <g transform={`translate(${CX + f} ${CY + f}) scale(${r2(pw / POSTER.w)})`}><PosterFieldG idp={IDP} uid="c" /></g>
          <rect x={CX + f} y={CY + f} width={pw} height="46" fill={HEX.white} opacity="0.16" />
          <rect x={CX + f} y={CY + f} width={pw} height={ph} fill={HEX.white} opacity="0.07" />
          <PanelSheenG idp={IDP} x={CX + f} y={CY + f} w={pw} h={ph} opacity={0.55} />
        </g>
        <rect x={CX + f - 1} y={CY + f - 1} width={pw + 2} height={ph + 2} fill="none" stroke={HEX.white} strokeOpacity="0.3" />
        {[[CX + 8, CY + 8], [CX + CW - 8, CY + 8], [CX + 8, CY + CH - 6], [CX + CW - 8, CY + CH - 6]].map(([x, y]) => <BoltG key={`${x}${y}`} x={x} y={y} r={3.5} />)}
      </LitG>

      <LitG>
        <RollUp id="ru-a" x={620} floor={FLOOR + 6} w={190} bg={HEX.activeBlue} line={HEX.darkBlue} Poster={PosterClarityG} />
        <RollUp id="ru-b" x={900} floor={FLOOR - 36} w={158} k={0.8} bg={HEX.lightBlue} line={HEX.darkBlue} Poster={PosterGenerationG} perspective={-0.045} />
      </LitG>

      <DimensionG x1={CX} y1={CY + CH + 6} x2={CX} y2={CY - 6} value="1 750 mm" offset={-34} i={0} />
      <DimensionG x1={CX} y1={CY - 6} x2={CX + CW} y2={CY - 6} value="1 185 mm" offset={-30} i={1} />
      <DimensionG x1={620 + 190} y1={FLOOR + 6} x2={620 + 190} y2={FLOOR + 6 - 30 - 190 * 2.35 - 12} value="2 000 mm" offset={30} i={2} />

      <CalloutsG>
        <CalloutG x={CX + 190} y={CY + 230} tx={150} ty={840} side="right" label="Backlit poster, 1 200 × 1 600 mm" i={3} />
        <CalloutG x={CX + CW - 3} y={CY + 60} tx={540} ty={86} side="right" label="Aluminium frame" i={4} />
        <CalloutG x={700} y={330} tx={560} ty={130} side="right" label="Roll-up banner, 850 × 2 000 mm" i={5} />
        <CalloutG x={940} y={FLOOR - 56} tx={1130} ty={540} side="right" label="Cassette base" i={6} />
        <CalloutG x={979} y={300} tx={1130} ty={360} side="right" label="Telescopic pole" i={7} />
      </CalloutsG>
    </Plate>
  );
}
