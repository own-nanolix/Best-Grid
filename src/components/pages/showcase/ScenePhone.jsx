// Plate 1: a phone with data cards. The phone stands upright, turned a little to the left, on the left 60% of the
// plate; the printed KPI cells, the total and the treemap of m17 float out as cards on leader lines. Spot top left.
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, ShadowG, LitG, DimensionG, SpecColumnG, PlateFrameG, castDir } from '@/components/art/Mockup';
import { PhoneG } from '@/components/art/Devices';
import { ScreenCapacityG } from '@/components/art/Devices';
import { HEX, CAPACITY } from '@/lib/brand';
import { es, r2 } from '@/lib/charts';
import { Leader, CardDefs, CardG, TreemapG } from './kit';

const W = 1600, H = 900, SPOT = { x: 0.2, y: 0.14 };
const PX = 330, PY = 150, PW = 300, K = PW / 430;
const TILT = { a: 0.9, b: 0.05 };
// a point of the phone's screen (u, v in 390 x 844 screen space) in plate space, after the three-quarter turn
const onScreen = (u, v) => {
  const x = PX + (20 + u) * K, y = PY + (20 + v) * K;
  return [r2(TILT.a * x + (1 - TILT.a) * 480), r2(TILT.b * (x - 480) + y)];
};

export default function ScenePhone() {
  const idp = 'showcase-a';
  const dir = castDir(SPOT, W, H, 480, 760);
  const [t1x, t1y] = onScreen(250, 372);
  const [t2x, t2y] = onScreen(230, 462);
  const [t3x, t3y] = onScreen(260, 700);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Catalogue plate: a phone showing the capacity dashboard, with the total, the KPI cells and the treemap floating out on leader lines" exportName="showcase-phone-cards" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <MaterialDefs idp={idp} />
      <defs><CardDefs idp={idp} dx={9} dy={12} /></defs>
      <StageG idp={idp} w={W} h={H} spot={SPOT} floor={0.7} />
      <PlateFrameG w={W} h={H} split={0.6} no="01" />

      <ShadowG idp={`${idp}-s`} cx={500} cy={768} rx={170} dir={dir} opacity={0.65} blur={12} />
      <LitG>
        <g transform={`matrix(${TILT.a} ${TILT.b} 0 1 ${r2((1 - TILT.a) * 480)} ${r2(-TILT.b * 480)})`}>
          <rect x={PX - 16} y={PY + 10} width={PW} height="617" rx="46" fill={`url(#${idp}-metal-dark)`} />
          <rect x={PX - 16} y={PY + 40} width="3" height="520" fill="#ffffff" opacity="0.28" />
          <PhoneG idp={`${idp}-ph`} x={PX} y={PY} w={PW}>
            <ScreenCapacityG idp={`${idp}-scr`} year={CAPACITY.year} />
          </PhoneG>
          <clipPath id={`${idp}-glass-clip`}><rect x={PX + 20 * K} y={PY + 20 * K} width={390 * K} height={844 * K} rx={48 * K} /></clipPath>
          <rect x={PX} y={PY} width={PW} height="617" fill={`url(#${idp}-glass)`} opacity="0.55" clipPath={`url(#${idp}-glass-clip)`} className="mock-sheen" />
          <rect x={PX} y={PY} width={PW} height="617" rx="46" fill={`url(#${idp}-shade)`} opacity="0.5" />
        </g>
      </LitG>

      <DimensionG x1={PX - 20} y1={PY} x2={PX - 20} y2={PY + 617} value="150 mm" offset={44} i={1} />
      <DimensionG x1={PX} y1={PY + 640} x2={PX + PW} y2={PY + 640} value="72 mm" offset={18} i={2} />

      <Leader x={t1x} y={t1y} tx={1000} ty={195} i={3} />
      <Leader x={t2x} y={t2y} tx={1000} ty={370} i={4} />
      <Leader x={t3x} y={t3y} tx={1000} ty={575} i={5} />

      <CardG idp={idp} x={1000} y={120} w={430} h={150} i={0}>
        <g lang="es">
          <text x="24" y="38" fontSize="16" fill={HEX.darkBlue}>{CAPACITY.totalLabel}</text>
          <text x="22" y="108" fontSize="68" fill={HEX.activeBlue} letterSpacing="-2" className="display">{es(CAPACITY.total)}</text>
          <text x="262" y="108" fontSize="26" fill={HEX.activeBlue} className="display">MW</text>
          <path d="M336 70l8 -12l8 12z" fill={HEX.activeBlue} />
        </g>
      </CardG>
      <CardG idp={idp} x={1000} y={300} w={430} h={140} i={1}>
        <g lang="es">
          {CAPACITY.kpis.map((k, i) => {
            const cx = 20 + i * 134;
            const words = k.label.split(' ');
            return (
              <g key={k.label}>
                {i > 0 && <rect x={cx - 12} y="16" width="1" height="108" fill={HEX.darkBlue} opacity="0.4" />}
                <text x={cx} y="40" fontSize="14" fill={HEX.darkBlue}>{words[0]}</text>
                <text x={cx} y="58" fontSize="14" fill={HEX.darkBlue}>{words[1]}</text>
                <text x={cx - 2} y="116" fontSize="54" fill={HEX.activeBlue} letterSpacing="-1" className="display">{k.value}</text>
              </g>
            );
          })}
          <rect x="0" y="0" width="430" height="1" fill={HEX.darkBlue} opacity="0.4" />
        </g>
      </CardG>
      <CardG idp={idp} x={1000} y={470} w={200} h={200} fill={HEX.darkBlue} i={2}>
        <g transform="scale(0.628)"><TreemapG /></g>
      </CardG>

      <SpecColumnG x={1260} y={470} w={250} title="Phone" size={14} rows={[{ k: 'Height', v: '150 mm' }, { k: 'Width', v: '72 mm' }, { k: 'Depth', v: '8 mm' }, { k: 'Screen ground', v: 'Light grey-blue' }]} />
    </Art>
  );
}
