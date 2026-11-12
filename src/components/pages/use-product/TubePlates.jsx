// Plates 1 to 3: the three tubes as in m07, the standing tube turning to the light, the tube lying and end-on.
import { CalloutG, DimensionG, SpecColumnG, ShadowG, LitG } from '@/components/art/Mockup';
import { Plate, labelRows } from './plate';
import { TubeG, LyingTubeG, EndViewG, T } from './tube';

const Callouts = ({ rows, tx, side }) => labelRows(rows, tx, side).map((r) => <CalloutG key={r.label} {...r} />);

// Production values of our own, in mm (plain, not published).
export const TUBE_SPEC = [
  { k: 'Diameter', v: '120 mm' }, { k: 'Length', v: '306 mm' }, { k: 'Lid band', v: '26 mm' },
  { k: 'Wall', v: '3 mm' }, { k: 'Label', v: '70 × 70 mm' },
];

// Plate 01: three tubes standing, seen from above at an angle, cropped by the frame as in m07.
export function HeroPlate() {
  const idp = 'use-product-hero', k = 1.05, ratio = 0.34;
  const tubes = [{ x: 205, y: 230, tone: 'active' }, { x: 520, y: 420, tone: 'dark' }, { x: 835, y: 610, tone: 'active' }];
  const P = (u, v) => [835 + k * u, 610 + k * v];
  return (
    <Plate idp={idp} w={1600} h={1000} name="tube-hero" title="Three project tubes seen from above, as in the case study: Active Blue, Dark Blue and Active Blue, each lid carrying the mark and each body a grey label" spot={{ x: 0.3, y: 0.16 }} split={0.68} no="01">
      {tubes.map((t, i) => <TubeG key={t.x} idp={idp} n={i + 1} tone={t.tone} x={t.x} y={t.y} k={k} ratio={ratio} />)}
      <DimensionG x1={43} y1={230} x2={367} y2={230} value="Ø 120 mm" offset={-105} i={5} />
      <Callouts tx={1086} rows={[
        ['Card rim', P(0, -52), 240],
        ['Lid mark', P(0, 11), 330],
        ['Printed label', P(10, 250), 900],
        ['Wound card body', P(140, 330), 430],
      ]} />
      <SpecColumnG x={1110} y={620} w={410} title="Project tube" rows={TUBE_SPEC.slice(0, 4)} />
    </Plate>
  );
}

// Plate 02: the tube standing, front view, turning to the light on load.
export function FrontPlate() {
  const idp = 'use-product-front', X = 440, Y = 110, base = Y + T.H;
  const P = (u, v) => [X + u, Y + v];
  return (
    <Plate idp={idp} w={1400} h={1060} name="tube-front" title="The project tube standing, front view, with its lid, label and vertical word-mark" spot={{ x: 0.28, y: 0.16 }} split={0.6} floor={0.8} no="02">
      <ShadowG idp={`${idp}-sh`} cx={X + 20} cy={base + 4} rx={180} ry={50} dir={{ x: 0.9, y: 0.1 }} />
      <LitG>
        <TubeG idp={idp} tone="active" x={X} y={Y} />
      </LitG>
      <DimensionG x1={X - 154} y1={Y} x2={X - 154} y2={base} value="306 mm" offset={70} i={7} />
      <DimensionG x1={X - 154} y1={base + 52} x2={X + 154} y2={base + 52} value="Ø 120 mm" offset={60} i={8} />
      <Callouts tx={870} rows={[
        ['Card rim', P(0, -43), 100],
        ['Lid mark', P(0, 9), 190],
        ['Lid band', P(152, 32), 280],
        ['Printed label', P(-45, 240), 400],
        ['Vertical word-mark', P(-78, 560), 560],
        ['Wound card body', P(148, 700), 700],
      ]} />
      <SpecColumnG x={1100} y={150} w={240} title="Standing" rows={TUBE_SPEC} />
    </Plate>
  );
}

// Plate 03: the tube lying (side view, lid at the right) and end-on, showing the lid and its rim.
export function SidePlate() {
  const idp = 'use-product-side', X = 120, Y = 150;
  const P = (u, v) => [X + u, Y + v];
  return (
    <Plate idp={idp} w={1600} h={900} name="tube-side" title="The project tube lying down, side view with the lid at the right, and end-on showing the lid and its rim" spot={{ x: 0.42, y: 0.1 }} split={0.6} floor={0.55} no="03">
      <ShadowG idp={`${idp}-sh1`} cx={X + 392} cy={Y + 306} rx={420} ry={26} dir={{ x: 0.2, y: 0.9 }} blur={9} />
      <LyingTubeG idp={idp} tone="active" x={X} y={Y} />
      <ShadowG idp={`${idp}-sh2`} cx={360} cy={864} rx={190} ry={22} dir={{ x: 0.4, y: 0.9 }} />
      <LitG><EndViewG idp={idp} tone="active" cx={360} cy={700} /></LitG>
      <DimensionG x1={X} y1={Y} x2={X + 764} y2={Y} value="306 mm" offset={-60} i={6} />
      <DimensionG x1={X} y1={Y} x2={X} y2={Y + 300} value="Ø 120 mm" offset={44} i={7} />
      <Callouts tx={1040} rows={[
        ['Lid', P(745, 60), 130],
        ['Printed label', P(560, 80), 240],
        ['Lid seam', P(700, 250), 350],
        ['Lid face', [360, 700], 600],
        ['Card rim', [510, 720], 720],
      ]} />
      <SpecColumnG x={1090} y={420} w={420} rows={TUBE_SPEC.slice(1, 4)} />
    </Plate>
  );
}
