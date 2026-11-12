// Plate 2: a line-up of eight phones, each showing a different screen in the brand's language, standing on one shelf
// across the top two thirds of the plate, with eight callouts in a ruled row below (one per screen). Spot top centre.
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, ShadowG, LitG, DimensionG, PlateFrameG, castDir, lineup, PLATE } from '@/components/art/Mockup';
import { PhoneG, ScreenCapacityG, ScreenNodesG } from '@/components/art/Devices';
import { CAPACITY, TECH } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { ScreenTechG, ScreenBrandG, ShelfG } from './kit';

const W = 1600, H = 900, SPOT = { x: 0.5, y: 0.04 };
const PW = 160, PH = 329, TOP = 120, SHELF = TOP + PH + 3;
const SLOTS = lineup(8, 150, 1450);
const STEP = (1450 - 150) / 7;

// the eight screens: the two printed phone screens, the empty year, the four technology tiles, the mark
const SCREENS = [
  { label: 'Capacity 2025', draw: (idp) => <ScreenCapacityG idp={idp} year={CAPACITY.year} /> },
  { label: 'Node grid', draw: () => <ScreenNodesG /> },
  { label: 'Empty year', draw: (idp) => <ScreenCapacityG idp={idp} year="2024" />, sub: '2024' },
  ...TECH.map((t) => ({ label: t.label, es: true, draw: () => <ScreenTechG tech={t.key} /> })),
  { label: 'Mark and address', draw: () => <ScreenBrandG /> },
];

export default function SceneLineup() {
  const idp = 'showcase-b';
  const rowTop = 590, rowBot = 700;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Catalogue plate: eight phones in a row, each with a different screen, and eight callouts in a ruled row below" exportName="showcase-phone-lineup" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <MaterialDefs idp={idp} />
      <StageG idp={idp} w={W} h={H} spot={SPOT} floor={0.58} r={0.7} />
      <PlateFrameG w={W} h={H} no="02" />

      <ShelfG idp={idp} x={86} y={SHELF} w={1428} />
      {SLOTS.map(({ x, i }) => (
        <ShadowG key={i} idp={`${idp}-s${i}`} cx={x} cy={SHELF} rx={92} ry={9} dir={castDir(SPOT, W, H, x, SHELF)} opacity={0.6} blur={6} />
      ))}

      <LitG>
        {SLOTS.map(({ x, i }) => {
          const left = x < 800;
          const strength = r2(0.25 + Math.abs(x - 800) / 800 * 0.5);
          return (
            <g key={i}>
              <PhoneG idp={`${idp}-p${i}`} x={x - PW / 2} y={TOP} w={PW}>
                {SCREENS[i].draw(`${idp}-c${i}`)}
              </PhoneG>
              <rect x={x - PW / 2} y={TOP} width={PW} height={PH} rx="28" fill={`url(#${idp}-${left ? 'shade-r' : 'shade'})`} opacity={strength} />
              <rect x={x - PW / 2 + 8} y={TOP + 8} width={PW - 16} height={PH - 16} rx="20" fill={`url(#${idp}-glass)`} opacity="0.35" className="mock-sheen" />
            </g>
          );
        })}
      </LitG>

      <DimensionG x1={SLOTS[0].x - PW / 2} y1={TOP} x2={SLOTS[0].x + PW / 2} y2={TOP} value="72 mm" offset={-26} i={1} />
      <DimensionG x1={SLOTS[7].x + PW / 2} y1={TOP + PH} x2={SLOTS[7].x + PW / 2} y2={TOP} value="150 mm" offset={24} i={2} />

      {/* the ruled row of callouts */}
      <g>
        <rect x="57" y={rowTop} width="1486" height="1" fill={PLATE.line} className="extend-x" />
        <rect x="57" y={rowBot} width="1486" height="1" fill={PLATE.line} className="extend-x" style={{ '--i': 1 }} />
        {Array.from({ length: 9 }, (_, k) => {
          const ex = 150 - STEP / 2 + k * STEP;
          return (
            <g key={k}>
              <rect x={r2(ex - 0.5)} y={rowTop} width="1" height={rowBot - rowTop} fill={PLATE.line} className="extend-y" style={{ '--i': k }} />
              <rect x={r2(ex - 3)} y={rowTop - 3} width="6" height="6" fill={PLATE.line} className="snap" style={{ '--i': k }} />
              <rect x={r2(ex - 3)} y={rowBot - 3} width="6" height="6" fill={PLATE.line} className="snap" style={{ '--i': k + 1 }} />
            </g>
          );
        })}
        {SLOTS.map(({ x, i }) => (
          <g key={i}>
            <path d={`M${x} ${SHELF + 16}V${rowTop}`} stroke={PLATE.line} strokeWidth="1" fill="none" className="callout-line" style={{ '--len': rowTop - SHELF - 16, '--i': i }} />
            <rect x={x - 4} y={SHELF + 12} width="8" height="8" fill={PLATE.accent} className="callout-node" style={{ '--i': i }} />
            <g className="callout-text" style={{ '--i': i }} lang={SCREENS[i].es ? 'es' : undefined}>
              <text x={r2(x - STEP / 2 + 14)} y={rowTop + 30} fontSize="13" fill={PLATE.muted}>{`0${i + 1}`}</text>
              <text x={r2(x - STEP / 2 + 14)} y={rowTop + 66} fontSize="17" fill={PLATE.text}>{SCREENS[i].label}</text>
              {SCREENS[i].sub && <text x={r2(x - STEP / 2 + 14)} y={rowTop + 88} fontSize="13" fill={PLATE.muted} lang="en">{SCREENS[i].sub}</text>}
            </g>
          </g>
        ))}
      </g>
    </Art>
  );
}
