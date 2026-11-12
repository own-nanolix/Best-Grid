// The anatomy of a plate: the same parts every showcase plate is made of, drawn once on a small stage and named in
// plain English. A phone screen of the case study stands in as the object.
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, ShadowG, LitG, CalloutG, DimensionG, SpecColumnG, PlateFrameG, castDir, CalloutsG } from '@/components/art/Mockup';
import { PhoneG, ScreenNodesG } from '@/components/art/Devices';
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';

const W = 1200, H = 520, SPOT = { x: 0.26, y: 0.14 };
const PY = 163, PB = PY + 307; // the phone stands on its contact shadow

export default function PlateKey() {
  const idp = 'showcase-e';
  const dir = castDir(SPOT, W, H, 300, 470);
  const sx = r2(W * SPOT.x), sy = r2(H * SPOT.y);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Anatomy of a catalogue plate: spotlight, object, contact shadow, callout with leader line, dimension and spec column" exportName="showcase-plate-anatomy" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <MaterialDefs idp={idp} />
      <StageG idp={idp} w={W} h={H} spot={SPOT} floor={0.74} r={0.7} />
      <PlateFrameG w={W} h={H} split={0.66} />

      {/* the spotlight, shown as a ring on its own position */}
      <g className="fade-in" style={{ '--i': 2 }}>
        <circle cx={sx} cy={sy} r="9" fill="none" stroke={HEX.white} strokeWidth="1.5" opacity="0.8" />
        <circle cx={sx} cy={sy} r="3" fill={HEX.white} opacity="0.9" />
        <path d={`M${sx} ${sy}L${300 - 70} ${PY}M${sx} ${sy}L${300 + 70} ${PY}`} stroke={HEX.white} strokeOpacity="0.14" strokeWidth="1" />
      </g>

      <ShadowG idp={`${idp}-s`} cx={300} cy={PB + 2} rx={130} dir={dir} opacity={0.65} blur={10} />
      <LitG>
        <PhoneG idp={`${idp}-ph`} x={225} y={PY} w={150}>
          <ScreenNodesG />
        </PhoneG>
        <rect x={225} y={PY} width={150} height={307} rx={28} fill={`url(#${idp}-shade-r)`} opacity="0.35" />
        <rect x={233} y={PY + 8} width={134} height={291} rx={20} fill={`url(#${idp}-glass)`} opacity="0.4" className="mock-sheen" />
      </LitG>

      <DimensionG x1={225} y1={PY} x2={225} y2={PB} value="Dimension" offset={34} i={4} />

      <CalloutsG>
        <CalloutG x={sx + 6} y={sy + 4} tx={600} ty={64} label="Spotlight: the one light" side="right" i={0} />
        <CalloutG x={375} y={250} tx={600} ty={150} label="Object, turned to the light" side="right" i={1} />
        <CalloutG x={375} y={360} tx={600} ty={236} label="Callout: node, leader line, label" side="right" i={2} />
        <CalloutG x={418} y={PB + 4} tx={600} ty={322} label="Contact shadow" side="right" i={3} />
        <CalloutG x={560} y={H - 28} tx={600} ty={408} label="Plate frame and nodes" side="right" i={5} />
      </CalloutsG>

      <SpecColumnG x={860} y={90} w={280} title="Spec column" rows={[{ k: 'Part one', v: 'Value' }, { k: 'Part two', v: 'Value' }, { k: 'Part three', v: 'Value' }]} />
    </Art>
  );
}
