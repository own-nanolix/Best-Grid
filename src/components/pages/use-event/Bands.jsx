// Wristbands: four fabric colourways, three silicone colourways and the seven-band fan. Each is one plate with its
// own arrangement, spotlight and callouts. Dimensions are our own production values in plain mm.
import { CalloutG, DimensionG, ShadowG, CastG, LitG, SpecColumnG, castDir, CalloutsG } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { HEX, mixHex } from '@/lib/brand';
import { Plate, idOf } from './kit';
import { Strip, Loop, COL, locDir, pt } from './bands-parts';

const SW = 600, SH = 440;
const stripD = (L, Wd) => `M${-L / 2} ${-Wd / 2}H${L / 2}V${Wd / 2}H${-L / 2}Z`;

// Fabric A: Active Blue, a straight strip across the top, callouts stepping down to the left.
export function FabricA() {
  const idp = idOf('band-fabric-active');
  const spot = { x: 0.28, y: 0.12 };
  const cd = castDir(spot, SW, SH, 300, 190);
  return (
    <Plate id="band-fabric-active" title="Fabric wristband, Active Blue" w={SW} h={SH} spot={spot} no="04">
      <g transform="translate(290 175)">
        <ShadowG idp={`${idp}-g`} cx={0} cy={26} rx={216} ry={14} dir={cd} opacity={0.5} blur={9} />
        <CastG idp={`${idp}-c`} d={stripD(440, 40)} dir={cd} depth={18} opacity={0.45} blur={6} />
        <LitG><Strip idp={idp} tag="a" tone="active" /></LitG>
      </g>
      <DimensionG x1={70} y1={155} x2={510} y2={155} value="235 mm" offset={-30} i={5} />
      <DimensionG x1={510} y1={155} x2={510} y2={195} value="20 mm" offset={-26} i={6} />
      <CalloutsG>
        <CalloutG x={82} y={175} tx={70} ty={290} label="Woven mark" i={0} />
        <CalloutG x={290} y={190} tx={200} ty={335} label="Stitched edge" sub="two rows" i={1} />
        <CalloutG x={461} y={175} tx={340} ty={380} label="Lock tab" sub="plastic with metal rivet" i={2} />
      </CalloutsG>
    </Plate>
  );
}

// Fabric B: Dark Blue, a loop standing on the floor, light from the right, callouts to the right of the loop.
export function FabricB() {
  const idp = idOf('band-fabric-dark');
  const spot = { x: 0.8, y: 0.12 };
  const cd = castDir(spot, SW, SH, 200, 240);
  return (
    <Plate id="band-fabric-dark" title="Fabric wristband, Dark Blue, as a loop" w={SW} h={SH} spot={spot} floor={0.5} no="05">
      <ShadowG idp={`${idp}-g`} cx={190} cy={300} rx={150} ry={50} dir={cd} opacity={0.6} blur={12} />
      <g transform="translate(190 250)">
        <LitG><Loop idp={idp} tag="b" tone="dark" rx={125} ry={48} h={58} thick={7} side="r" /></LitG>
      </g>
      <DimensionG x1={88} y1={222} x2={88} y2={280} value="20 mm" offset={-26} i={6} />
      <CalloutsG>
        <CalloutG x={190} y={278} tx={410} ty={120} label="Woven mark" i={0} />
        <CalloutG x={258} y={214} tx={410} ty={205} label="Folded edge" i={1} />
        <CalloutG x={190} y={222} tx={410} ty={290} label="Loop" sub="65 mm across" i={2} />
        <CalloutG x={190} y={300} tx={410} ty={375} label="Weave" sub="polyester, 2 mm" i={3} />
      </CalloutsG>
    </Plate>
  );
}

// Fabric C: Light Blue, a diagonal strip; two callouts top left, two bottom right.
export function FabricC() {
  const idp = idOf('band-fabric-light');
  const spot = { x: 0.5, y: 0.05 };
  const [cx, cy, rot] = [300, 215, -24];
  const cd = castDir(spot, SW, SH, cx, cy);
  const P = (x, y) => pt(cx, cy, rot, x, y);
  const m = P(-150, 0), lk = P(160, 0), e = P(30, 20);
  return (
    <Plate id="band-fabric-light" title="Fabric wristband, Light Blue, laid diagonally" w={SW} h={SH} spot={spot} no="06">
      <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
        <ShadowG idp={`${idp}-g`} cx={0} cy={24} rx={216} ry={14} dir={locDir(cd, rot)} opacity={0.5} blur={9} />
        <CastG idp={`${idp}-c`} d={stripD(440, 40)} dir={locDir(cd, rot)} depth={18} opacity={0.45} blur={6} />
        <LitG><Strip idp={idp} tag="c" tone="light" /></LitG>
      </g>
      <CalloutsG>
        <CalloutG x={m[0]} y={m[1]} tx={64} ty={125} label="Woven mark" i={0} />
        <CalloutG x={P(-60, -20)[0]} y={P(-60, -20)[1]} tx={64} ty={70} label="Stitched edge" i={1} />
        <CalloutG x={lk[0]} y={lk[1]} tx={536} ty={330} label="Lock tab" side="left" i={2} />
        <CalloutG x={e[0]} y={e[1]} tx={536} ty={385} label="Width" sub="20 mm" side="left" i={3} />
      </CalloutsG>
    </Plate>
  );
}

// Fabric D: Periwinkle, a vertical strip with a loupe on the weave.
export function FabricD() {
  const idp = idOf('band-fabric-periwinkle');
  const spot = { x: 0.2, y: 0.3 };
  const cd = castDir(spot, SW, SH, 120, 220);
  const c = COL.peri;
  return (
    <Plate id="band-fabric-periwinkle" title="Fabric wristband, Periwinkle, with the weave enlarged" w={SW} h={SH} spot={spot} no="07">
      <defs>
        <clipPath id={`${idp}-loupe`}><circle cx="410" cy="190" r="100" /></clipPath>
        <pattern id={`${idp}-twill`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="12" height="12" fill={c.c} />
          <rect width="12" height="5" fill={HEX.white} opacity="0.5" />
          <rect y="5" width="12" height="1.4" fill={HEX.darkBlue} opacity="0.35" />
        </pattern>
      </defs>
      <g transform="translate(130 220) rotate(90)">
        <ShadowG idp={`${idp}-g`} cx={0} cy={24} rx={176} ry={14} dir={locDir(cd, 90)} opacity={0.5} blur={9} />
        <CastG idp={`${idp}-c`} d={stripD(360, 40)} dir={locDir(cd, 90)} depth={18} opacity={0.45} blur={6} />
        <LitG><Strip idp={idp} tag="d" tone="peri" L={360} prints={2} /></LitG>
      </g>
      <path d="M150 120L330 150" stroke={mixHex(HEX.activeBlue, HEX.greyLine, 0.75)} strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <circle cx="410" cy="190" r="104" fill={HEX.black} opacity="0.4" />
      <g clipPath={`url(#${idp}-loupe)`}>
        <rect x="300" y="80" width="220" height="220" fill={`url(#${idp}-twill)`} filter={`url(#${idp}-weave)`} />
        <rect x="300" y="80" width="220" height="220" fill={`url(#${idp}-shade-v)`} />
        <MarkG x={355} y={135} size={110} fill={HEX.darkBlue} />
      </g>
      <circle cx="410" cy="190" r="100" fill="none" stroke={`url(#${idp}-metal)`} strokeWidth="6" />
      <CalloutsG>
        <CalloutG x={410} y={290} tx={330} ty={355} label="Woven mark, enlarged" i={0} />
        <CalloutG x={130} y={364} tx={330} ty={405} label="Lock tab" sub="plastic with metal rivet" i={1} />
      </CalloutsG>
    </Plate>
  );
}

// Silicone A: Active Blue, low loop, the debossed word-mark on the front wall; callouts right.
export function SiliconeA() {
  const idp = idOf('band-silicone-active');
  const spot = { x: 0.25, y: 0.1 };
  const cd = castDir(spot, SW, SH, 200, 250);
  return (
    <Plate id="band-silicone-active" title="Silicone wristband, Active Blue" w={SW} h={SH} spot={spot} floor={0.5} no="08">
      <ShadowG idp={`${idp}-g`} cx={205} cy={305} rx={160} ry={56} dir={cd} opacity={0.6} blur={12} />
      <g transform="translate(205 250)">
        <LitG><Loop idp={idp} tag="s" tone="active" silicone rx={130} ry={50} h={52} thick={9} /></LitG>
      </g>
      <DimensionG x1={75} y1={225} x2={335} y2={225} value="65 mm" offset={-70} i={5} />
      <CalloutsG>
        <CalloutG x={205} y={302} tx={430} ty={150} label="Debossed logo" i={0} />
        <CalloutG x={290} y={190} tx={430} ty={235} label="Rim" sub="2 mm wall" i={1} />
        <CalloutG x={335} y={252} tx={430} ty={320} label="Height" sub="12 mm" i={2} />
      </CalloutsG>
    </Plate>
  );
}

// Silicone B: Dark Blue, seen steeply from above, callouts left.
export function SiliconeB() {
  const idp = idOf('band-silicone-dark');
  const spot = { x: 0.78, y: 0.08 };
  const cd = castDir(spot, SW, SH, 380, 240);
  return (
    <Plate id="band-silicone-dark" title="Silicone wristband, Dark Blue, from above" w={SW} h={SH} spot={spot} floor={0.4} no="09">
      <ShadowG idp={`${idp}-g`} cx={385} cy={330} rx={150} ry={64} dir={cd} opacity={0.6} blur={12} />
      <g transform="translate(385 245)">
        <LitG><Loop idp={idp} tag="s" tone="dark" silicone rx={122} ry={92} h={52} thick={9} side="r" /></LitG>
      </g>
      <CalloutsG>
        <CalloutG x={385} y={337} tx={150} ty={380} label="Debossed logo" side="left" i={0} />
        <CalloutG x={385} y={152} tx={150} ty={90} label="Inner wall" side="left" i={1} />
        <CalloutG x={263} y={245} tx={150} ty={235} label="Gloss finish" side="left" i={2} />
      </CalloutsG>
      <DimensionG x1={263} y1={330} x2={507} y2={330} value="65 mm" offset={52} i={5} />
    </Plate>
  );
}

// Silicone C: Light Blue, low camera, with a cross-section detail beside it.
export function SiliconeC() {
  const idp = idOf('band-silicone-light');
  const spot = { x: 0.45, y: 0.06 };
  const cd = castDir(spot, SW, SH, 160, 250);
  return (
    <Plate id="band-silicone-light" title="Silicone wristband, Light Blue, with its cross-section" w={SW} h={SH} spot={spot} floor={0.55} no="10">
      <ShadowG idp={`${idp}-g`} cx={170} cy={290} rx={150} ry={36} dir={cd} opacity={0.6} blur={11} />
      <g transform="translate(170 245)">
        <LitG><Loop idp={idp} tag="s" tone="light" silicone rx={122} ry={28} h={56} thick={8} /></LitG>
      </g>
      <g transform="translate(400 150)">
        <rect x="0" y="0" width="140" height="48" fill={HEX.lightBlue} />
        <rect x="0" y="0" width="140" height="48" fill={`url(#${idp}-shade-v)`} />
        <rect x="0" y="0" width="140" height="48" fill="none" stroke={HEX.black} strokeOpacity="0.4" />
        <rect x="8" y="5" width="124" height="4" fill={HEX.white} opacity="0.5" filter={`url(#${idp}-soft)`} />
      </g>
      <DimensionG x1={400} y1={198} x2={540} y2={198} value="12 mm" offset={22} i={4} />
      <DimensionG x1={400} y1={150} x2={400} y2={198} value="2 mm" offset={-22} i={5} />
      <CalloutsG>
        <CalloutG x={170} y={303} tx={410} ty={300} label="Debossed logo" i={0} />
        <CalloutG x={470} y={170} tx={420} ty={90} label="Cross-section" i={1} />
        <CalloutG x={292} y={245} tx={410} ty={365} label="Soft-touch silicone" i={2} />
      </CalloutsG>
    </Plate>
  );
}

// The fan: seven bands laid from one point, top view. Four fabric, three silicone.
const FAN = [
  ['fabric', 'active'], ['fabric', 'dark'], ['fabric', 'light'], ['fabric', 'peri'],
  ['silicone', 'active'], ['silicone', 'dark'], ['silicone', 'light'],
];
const LABELS = ['Fabric, Active Blue', 'Fabric, Dark Blue', 'Fabric, Light Blue', 'Fabric, Periwinkle', 'Silicone, Active Blue', 'Silicone, Dark Blue', 'Silicone, Light Blue'];
export function Fan() {
  const idp = idOf('band-fan');
  const w = 1100, h = 600;
  const spot = { x: 0.22, y: 0.1 };
  const ox = 150, oy = 540;
  const cd = castDir(spot, w, h, 300, 330);
  return (
    <Plate id="band-fan" title="Seven wristbands in a fan, four fabric and three silicone" w={w} h={h} spot={spot} no="11">
      <LitG>
        {FAN.map(([kind, tone], i) => {
          const rot = -84 + i * 11.5;
          return (
            <g key={`${kind}-${tone}`} transform={`translate(${ox} ${oy}) rotate(${rot}) translate(235 0)`}>
              <CastG idp={`${idp}-c${i}`} d={stripD(470, 40)} dir={locDir(cd, rot)} depth={8} opacity={0.4} blur={4} />
              <Strip idp={idp} tag={`f${i}`} kind={kind} tone={tone} L={470} prints={kind === 'fabric' ? 3 : 1} />
            </g>
          );
        })}
      </LitG>
      <circle cx={ox} cy={oy} r="9" fill={`url(#${idp}-metal)`} stroke={mixHex(HEX.mutedOnDark, HEX.black, 0.35)} />
      {FAN.map(([kind, tone], i) => {
        const [nx, ny] = pt(ox, oy, -84 + i * 11.5, 454, 0);
        return <CalloutG key={tone + kind} x={nx} y={ny} tx={640} ty={80 + i * 55} label={LABELS[i]} i={i} />;
      })}
      <SpecColumnG x={860} y={110} w={190} title="Bands" rows={[{ k: 'Length', v: '235 mm' }, { k: 'Width', v: '20 mm' }, { k: 'Fabric', v: '4' }, { k: 'Silicone', v: '3' }]} rowH={38} />
    </Plate>
  );
}
