// Plate 4: an event stage. A wide LED wall (as m22: the connect and viable lines, the mark, the contacts, the
// word-mark, a screen either side) seen straight on across the top, the stage edge below, a spec column beneath.
// Spot overhead. The photographs of m22 are not reproduced: the side screens are flat Dark Blue blocks at 75%.
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, ShadowG, LitG, CalloutG, DimensionG, SpecColumnG, PlateFrameG, PLATE } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { PhotoBlockG, IconArtG } from '@/components/art/KeyArt';
import { HEX, LINES, CONTACT } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const W = 1600, H = 900, SPOT = { x: 0.5, y: 0.0 };
const WX = 140, WY = 110, WW = 1120, WH = 290;

// a lighting truss: two chords and a zigzag web, drawn in bars (the lattice of the mark, at rest)
function Truss({ y, x0 = 60, x1 = 1540 }) {
  const n = 37, step = (x1 - x0) / n;
  const web = Array.from({ length: n }, (_, i) => `${i ? 'L' : 'M'}${r2(x0 + i * step)} ${i % 2 ? y : y + 30}`).join('') + `L${x1} ${y + 30}`;
  return (
    <g className="fade-in">
      <rect x={x0} y={y - 3} width={x1 - x0} height="6" fill={PLATE.line} opacity="0.8" />
      <rect x={x0} y={y + 27} width={x1 - x0} height="6" fill={PLATE.line} opacity="0.8" />
      <path d={web} fill="none" stroke={PLATE.line} strokeWidth="2" opacity="0.6" />
      <rect x={x0} y={y - 3} width={x1 - x0} height="1.5" fill="#ffffff" opacity="0.5" />
    </g>
  );
}

export default function SceneStage() {
  const idp = 'showcase-d';
  const tone = LINES.connect, viable = LINES.viable;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Catalogue plate: an event stage with a wide LED wall showing the brand, the stage edge below and a spec column beneath" exportName="showcase-event-stage" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <MaterialDefs idp={idp} />
      <defs>
        <pattern id={`${idp}-led`} width="6" height="6" patternUnits="userSpaceOnUse">
          <rect x="2" y="2" width="2" height="2" fill="#ffffff" opacity="0.1" />
        </pattern>
        <radialGradient id={`${idp}-glow`} cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${idp}-spill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={HEX.activeBlue} stopOpacity="0.5" />
          <stop offset="1" stopColor={HEX.activeBlue} stopOpacity="0" />
        </linearGradient>
      </defs>
      <StageG idp={idp} w={W} h={H} spot={SPOT} floor={0.58} r={0.75} />
      <PlateFrameG w={W} h={H} no="04" />
      <Truss y={42} />

      {/* the deck: top surface in perspective, the front edge face, light spilling from the wall */}
      <path d={`M120 470H1480L1560 560H40Z`} fill={`url(#${idp}-metal-dark)`} />
      <path d={`M120 470H1480L1560 560H40Z`} fill={`url(#${idp}-spill)`} />
      <rect x="40" y="560" width="1520" height="44" fill={`url(#${idp}-board-dark)`} />
      <rect x="40" y="560" width="1520" height="2" fill="#ffffff" opacity="0.4" />
      <rect x="40" y="598" width="1520" height="6" fill="#000000" opacity="0.5" />
      <ShadowG idp={`${idp}-s`} cx={800} cy={610} rx={780} ry={14} dir={{ x: 0, y: 1 }} opacity={0.7} blur={10} />

      <LitG>
        {/* the wall: bezel, Active Blue panels with seams and LED grain, the glow */}
        <rect x={WX - 10} y={WY - 10} width={WW + 20} height={WH + 20} fill={`url(#${idp}-metal-dark)`} />
        <rect x={WX} y={WY} width={WW} height={WH} fill={HEX.activeBlue} />
        <rect x={WX} y={WY} width={WW} height={WH} fill={`url(#${idp}-led)`} />
        {Array.from({ length: 19 }, (_, i) => (
          <rect key={i} x={WX + (i + 1) * 55} y={WY} width="1" height={WH} fill={HEX.darkBlue} opacity="0.18" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={WX} y={WY + (i + 1) * 48} width={WW} height="1" fill={HEX.darkBlue} opacity="0.18" />
        ))}
        <rect x={WX} y={WY} width={WW} height={WH} fill={`url(#${idp}-glow)`} className="mock-sheen" />

        {/* side screens: flat Dark Blue photo blocks (no photograph) with line art */}
        <PhotoBlockG x={WX + 24} y={WY + 28} w={250} h={WH - 56} />
        <IconArtG name="solar" x={WX + 54} y={WY + 62} size={190} fill={HEX.activeBlue} opacity="0.55" />
        <PhotoBlockG x={WX + WW - 274} y={WY + 28} w={250} h={WH - 56} />
        <IconArtG name="solar" x={WX + WW - 244} y={WY + 62} size={190} fill={HEX.activeBlue} opacity="0.55" />

        {/* centre screen: the lines of m22 */}
        <g lang="es">
          <text fontSize="30" letterSpacing="-0.4" className="display">
            <tspan x="432" y="175" fill={HEX.white}>{tone.rows[0]}</tspan>
            <tspan x="432" y="210" fill={HEX.darkBlue}>{tone.rows[1]}</tspan>
          </text>
          <rect x="432" y="240" width="404" height="1" fill={HEX.white} />
          {[432, 634, 836].map((nx) => <rect key={nx} x={nx - 3} y="237" width="6" height="6" fill={HEX.white} />)}
          <text fontSize="20" letterSpacing="-0.2" className="display">
            <tspan x="432" y="278" fill={HEX.white}>{viable.rows[0]}</tspan>
            <tspan x="432" y="304" fill={HEX.darkBlue}>{viable.rows[1]}</tspan>
          </text>
          <text x="432" y="352" fontSize="13" fill={HEX.darkBlue}>{CONTACT.handle}</text>
          <text x="432" y="370" fontSize="13" fill={HEX.darkBlue}>{CONTACT.web}</text>
        </g>
        <MarkG x={796} y={128} size={40} fill={HEX.onBlue} />
        <WordmarkG x={836} y={380} size={44} fill={HEX.onBlue} anchor="end" />
        <rect x={WX} y={WY} width={WW} height="2" fill="#ffffff" opacity="0.5" />
      </LitG>

      <DimensionG x1={WX} y1={WY} x2={WX + WW} y2={WY} value="12 000 mm" offset={-24} i={4} />
      <DimensionG x1={WX} y1={WY + WH} x2={WX} y2={WY} value="2 800 mm" offset={-30} i={5} />

      <CalloutG x={WX + WW - 40} y={190} tx={1360} ty={190} label="LED wall" side="right" i={0} />
      <CalloutG x={WX + WW - 150} y={330} tx={1360} ty={330} label="Side screen" side="right" i={1} />
      <CalloutG x={1200} y={520} tx={1360} ty={520} label="Stage deck" side="right" i={2} />
      <CalloutG x={1300} y={582} tx={1360} ty={582} label="Stage edge" side="right" i={3} />

      <SpecColumnG x={100} y={650} w={520} title="Stage" rows={[{ k: 'Wall width', v: '12 000 mm' }, { k: 'Wall height', v: '2 800 mm' }, { k: 'Deck depth', v: '6 000 mm' }]} />
    </Art>
  );
}
