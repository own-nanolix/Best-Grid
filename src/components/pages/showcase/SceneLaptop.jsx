// Plate 3: a laptop turned 30 degrees on a square plinth on the right 40% of the plate, dimensions down the plinth,
// callouts to the left. Spot top right. The laptop shows the website of m16 (the copy is legible there); its body
// is Active Blue aluminium (m13); the plinth is Dark Blue anodised. The leader lines reach the object from its left
// edges only, so none of them crosses the laptop or another line.
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, ShadowG, CastG, LitG, CalloutG, DimensionG, SpecColumnG, PlateFrameG, castDir } from '@/components/art/Mockup';
import { ScreenWebG } from '@/components/art/Devices';
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';

const W = 1600, H = 900, SPOT = { x: 0.85, y: 0.12 };
// plinth, oblique: front face, top face (back edge shifted right and up), right face
const FL = [940, 660], FR = [1420, 660], BL = [990, 622], BR = [1470, 622], FLb = [940, 790], FRb = [1420, 790], BRb = [1470, 752];
// the laptop, turned 30 degrees: the hinge line recedes to the upper right like the plinth's top face; the lid
// rises from it and leans back a little; the deck comes forward from it towards the viewer (V).
const H0 = [1040, 630], H1 = [1380, 607], LEAN = [8, -250], V = [-26, 23];
const add = (a, b, k = 1) => [r2(a[0] + b[0] * k), r2(a[1] + b[1] * k)];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const U = sub(H1, H0);
// a point on the deck: u along the hinge (0 to 1), t towards the front edge (0 to 1)
const deck = (u, t) => add(add(H0, U, u), V, t);
const poly = (pts) => `M${pts.map((p) => p.join(' ')).join('L')}Z`;
// the lid's own space is 1500 x 960 (bezel), the 1440 x 900 screen at (30, 30); mapped onto the lid parallelogram
const LID = [r2(U[0] / 1500), r2((U[1] / 1500) * 1e4) / 1e4, r2((-LEAN[0] / 960) * 1e5) / 1e5, r2((-LEAN[1] / 960) * 1e4) / 1e4, H0[0] + LEAN[0], H0[1] + LEAN[1]];
const lid = (x, y) => [r2(LID[0] * x + LID[2] * y + LID[4]), r2(LID[1] * x + LID[3] * y + LID[5])];

export default function SceneLaptop() {
  const idp = 'showcase-c';
  const dir = castDir(SPOT, W, H, 1225, 760);
  const top = poly([FL, FR, BR, BL]);
  const right = poly([FR, BR, BRb, FRb]);
  const T0 = lid(0, 0), T1 = lid(1500, 0);
  const F0 = deck(0, 1), F1 = deck(1, 1);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Catalogue plate: a laptop turned 30 degrees on a square plinth, showing the website, with callouts on the left and dimensions down the plinth" exportName="showcase-laptop-plinth" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <MaterialDefs idp={idp} />
      <defs>
        <clipPath id={`${idp}-screen`}>
          <rect x="30" y="30" width="1440" height="900" />
        </clipPath>
      </defs>
      <StageG idp={idp} w={W} h={H} spot={SPOT} floor={0.7} />
      <PlateFrameG w={W} h={H} split={0.55} no="03" />

      {/* floor: contact shadow and the plinth's long cast shadow, away from the spot */}
      <ShadowG idp={`${idp}-s`} cx={1215} cy={794} rx={330} ry={22} dir={dir} opacity={0.7} blur={14} />
      <CastG idp={idp} d={`M${FLb[0]} ${FLb[1]}L${FRb[0]} ${FRb[1]}L${BRb[0]} ${BRb[1]}L${BRb[0] - 400} ${BRb[1]}Z`} dir={{ x: -0.95, y: 0.25 }} depth={130} opacity={0.35} blur={14} />

      {/* the plinth */}
      <g>
        <rect x={FL[0]} y={FL[1]} width={FR[0] - FL[0]} height={FLb[1] - FL[1]} fill={`url(#${idp}-plastic)`} />
        <rect x={FL[0]} y={FL[1]} width={FR[0] - FL[0]} height={FLb[1] - FL[1]} fill="#000000" opacity="0.18" />
        <path d={right} fill={`url(#${idp}-plastic)`} />
        <path d={right} fill="#ffffff" opacity="0.1" />
        <path d={top} fill={`url(#${idp}-metal-dark)`} />
        <path d={top} fill="#ffffff" opacity="0.2" />
        <path d={`M${FL[0]} ${FL[1]}L${FR[0]} ${FR[1]}L${BR[0]} ${BR[1]}`} fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d={`M${FR[0]} ${FR[1]}V${FRb[1]}`} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
        <rect x={FL[0]} y={FLb[1] - 6} width={FR[0] - FL[0]} height="6" fill="#000000" opacity="0.45" />
      </g>

      {/* the laptop's contact shadow on the plinth top, pushed away from the spot (lower left) */}
      <path d={poly([add(deck(0, 0), [-14, 4]), add(deck(1, 0), [-6, 2]), add(deck(1, 1), [-10, 5]), add(deck(0, 1), [-20, 6])])} fill="#000000" opacity="0.55" filter={`url(#${idp}-soft)`} />

      {/* the laptop, turned to the light */}
      <LitG>
        {/* the deck: Active Blue aluminium seen from above, keyboard well and trackpad (no legends), front edge */}
        <path d={poly([deck(0, 0), deck(1, 0), deck(1, 1), deck(0, 1)])} fill={`url(#${idp}-board)`} />
        <path d={poly([deck(0, 0), deck(1, 0), deck(1, 1), deck(0, 1)])} fill={`url(#${idp}-shade-r)`} opacity="0.35" />
        <path d={poly([deck(0.1, 0.12), deck(0.9, 0.12), deck(0.9, 0.5), deck(0.1, 0.5)])} fill="#000000" opacity="0.22" />
        {Array.from({ length: 5 }, (_, k) => (
          <path key={k} d={`M${deck(0.1, 0.12 + k * 0.076 + 0.076).join(' ')}L${deck(0.9, 0.12 + k * 0.076 + 0.076).join(' ')}`} stroke="#ffffff" strokeOpacity="0.12" strokeWidth="0.6" />
        ))}
        <path d={poly([deck(0.36, 0.6), deck(0.64, 0.6), deck(0.64, 0.92), deck(0.36, 0.92)])} fill="#ffffff" opacity="0.12" />
        <path d={poly([F0, F1, add(F1, [0, 6]), add(F0, [0, 6])])} fill={`url(#${idp}-board)`} />
        <path d={poly([F0, F1, add(F1, [0, 6]), add(F0, [0, 6])])} fill="#000000" opacity="0.3" />
        <path d={`M${F0.join(' ')}L${F1.join(' ')}`} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />

        {/* the lid's right edge, lit by the spot, then the lid itself with the website on its screen */}
        <path d={poly([H1, T1, add(T1, [5, 2]), add(H1, [5, 2])])} fill={`url(#${idp}-board)`} />
        <g transform={`matrix(${LID.join(' ')})`}>
          <rect width="1500" height="960" rx="30" fill={HEX.black} />
          <rect x="30" y="30" width="1440" height="900" fill={HEX.lightBlue} />
          <g clipPath={`url(#${idp}-screen)`}>
            <g transform="translate(30 30)">
              <ScreenWebG idp={`${idp}-web`} />
            </g>
          </g>
          <rect x="30" y="30" width="1440" height="900" fill={`url(#${idp}-glass)`} opacity="0.55" className="mock-sheen" />
          <rect x="30" y="30" width="1440" height="900" fill={`url(#${idp}-shade-r)`} opacity="0.3" />
        </g>
        <path d={`M${H0.join(' ')}L${H1.join(' ')}`} stroke="#000000" strokeOpacity="0.5" strokeWidth="2" />
      </LitG>

      <DimensionG x1={T0[0]} y1={T0[1]} x2={T1[0]} y2={T1[1]} value="310 mm" offset={-26} i={5} />
      <DimensionG x1={BRb[0]} y1={BRb[1]} x2={BR[0]} y2={BR[1]} value="120 mm" offset={30} i={6} />
      <DimensionG x1={FLb[0]} y1={FLb[1]} x2={FRb[0]} y2={FRb[1]} value="300 mm" offset={30} i={7} />

      {/* callouts, top to bottom in the order of their nodes, every node on the object's left edge */}
      <CalloutG x={lid(110, 330)[0]} y={lid(110, 330)[1]} tx={720} ty={330} label="Display" side="left" i={0} />
      <CalloutG x={H0[0] - 1} y={H0[1]} tx={720} ty={430} label="Hinge" side="left" i={1} />
      <CalloutG x={deck(0.04, 0.7)[0]} y={deck(0.04, 0.7)[1]} tx={720} ty={520} label="Aluminium body" side="left" i={2} />
      <CalloutG x={972} y={648} tx={720} ty={600} label="Top face" side="left" i={3} />
      <CalloutG x={968} y={724} tx={720} ty={690} label="Dark Blue plinth" side="left" i={4} />

      <SpecColumnG x={110} y={110} w={300} title="Laptop on plinth" rows={[{ k: 'Laptop width', v: '310 mm' }, { k: 'Laptop closed', v: '14 mm' }, { k: 'Turn', v: '30°' }, { k: 'Plinth', v: '300 × 300 mm' }, { k: 'Plinth height', v: '120 mm' }]} />
    </Art>
  );
}
