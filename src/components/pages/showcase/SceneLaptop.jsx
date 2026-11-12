// Plate 3: a laptop on a square plinth on the right 40% of the plate, dimensions down the plinth, callouts to the
// left. Spot top right. The laptop shows the website of m16 (the copy is legible there); its body is Active Blue
// aluminium (m13); the plinth is Dark Blue anodised.
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, ShadowG, CastG, LitG, CalloutG, DimensionG, SpecColumnG, PlateFrameG, castDir } from '@/components/art/Mockup';
import { LaptopG, ScreenWebG } from '@/components/art/Devices';
import { r2 } from '@/lib/charts';

const W = 1600, H = 900, SPOT = { x: 0.85, y: 0.12 };
// plinth, oblique: front face, top face (back edge shifted right and up), right face
const FL = [940, 660], FR = [1420, 660], BL = [990, 622], BR = [1470, 622], FLb = [940, 790], FRb = [1420, 790], BRb = [1470, 752];
const LX = 1000, LW = 460, LK = LW / 1840, LY = 640 - 1016 * LK;
const SQ = 0.88; // the laptop is turned: its width reads narrower
const lx = (x) => r2(1230 + (x - 1230) * SQ);

export default function SceneLaptop() {
  const idp = 'showcase-c';
  const dir = castDir(SPOT, W, H, 1225, 760);
  const top = `M${FL[0]} ${FL[1]}L${FR[0]} ${FR[1]}L${BR[0]} ${BR[1]}L${BL[0]} ${BL[1]}Z`;
  const right = `M${FR[0]} ${FR[1]}L${BR[0]} ${BR[1]}L${BRb[0]} ${BRb[1]}L${FRb[0]} ${FRb[1]}Z`;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Catalogue plate: a laptop showing the website on a square plinth, with callouts on the left and dimensions down the plinth" exportName="showcase-laptop-plinth" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <MaterialDefs idp={idp} />
      <StageG idp={idp} w={W} h={H} spot={SPOT} floor={0.7} />
      <PlateFrameG w={W} h={H} split={0.6} no="03" />

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

      {/* the laptop, turned to the light */}
      <ShadowG idp={`${idp}-t`} cx={1240} cy={644} rx={250} ry={13} dir={dir} opacity={0.75} blur={7} />
      <LitG>
        <g transform={`matrix(${SQ} 0 0 1 ${r2(1230 * (1 - SQ))} 0)`}>
          <LaptopG idp={`${idp}-lp`} x={LX} y={LY} w={LW} body={`url(#${idp}-board)`}>
            <ScreenWebG idp={`${idp}-web`} />
          </LaptopG>
          <rect x={LX + 30 * LK} y={LY + 30 * LK} width={1440 * LK} height={900 * LK} fill={`url(#${idp}-glass)`} opacity="0.6" className="mock-sheen" />
          <rect x={LX} y={LY + 960 * LK} width={LW} height={56 * LK} fill={`url(#${idp}-shade-r)`} opacity="0.5" />
        </g>
      </LitG>

      <DimensionG x1={lx(1000)} y1={LY - 4} x2={lx(1460)} y2={LY - 4} value="310 mm" offset={-26} i={5} />
      <DimensionG x1={BRb[0]} y1={BRb[1]} x2={BR[0]} y2={BR[1]} value="120 mm" offset={30} i={6} />
      <DimensionG x1={FLb[0]} y1={FLb[1]} x2={FRb[0]} y2={FRb[1]} value="300 mm" offset={30} i={7} />

      <CalloutG x={1110} y={470} tx={720} ty={300} label="Display" side="left" i={0} />
      <CalloutG x={1230} y={LY + 960 * LK} tx={720} ty={400} label="Hinge" side="left" i={1} />
      <CalloutG x={1380} y={LY + 985 * LK} tx={720} ty={500} label="Aluminium body" side="left" i={2} />
      <CalloutG x={1100} y={730} tx={720} ty={640} label="Dark Blue plinth" side="left" i={3} />
      <CalloutG x={1000} y={655} tx={720} ty={570} label="Top face" side="left" i={4} />

      <SpecColumnG x={110} y={110} w={300} title="Laptop on plinth" rows={[{ k: 'Laptop width', v: '310 mm' }, { k: 'Laptop closed', v: '14 mm' }, { k: 'Plinth', v: '300 × 300 mm' }, { k: 'Plinth height', v: '120 mm' }]} />
    </Art>
  );
}
