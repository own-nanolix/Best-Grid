// Plate 4: an event stage. A wide LED wall rebuilt as m22 (re-measured on m22_1 and crop_m22_mid: a 1524 x 275 wall,
// three panels split at 510 and 1027, the connect and viable lines, the mark, the contacts, the rule with its
// nodes and the word-mark in the centre panel, a screen either side) seen straight on across the top, the stage deck
// at its foot, a spec column beneath. Spot overhead. The photographs of m22 are not reproduced: the side screens
// are flat Dark Blue blocks at 75% with line art from the icons. The designer's colours stay inside the artwork.
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, ShadowG, LitG, CalloutG, DimensionG, SpecColumnG, PlateFrameG, PLATE, CalloutsG } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { PhotoBlockG, IconArtG } from '@/components/art/KeyArt';
import { HEX, LINES, CONTACT } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const W = 1600, H = 900, SPOT = { x: 0.5, y: 0.0 };
// the wall in the plate: 1524 x 275 in its own space (as m22), scaled to WW
const WALL = { w: 1524, h: 275 };
const WX = 100, WY = 112, WW = 1240, K = WW / WALL.w, WH = r2(WALL.h * K);
const at = (x, y) => [r2(WX + x * K), r2(WY + y * K)];
const DECK = { back: WY + WH, front: WY + WH + 92, face: 40, x0: WX, x1: WX + WW, f0: WX - 40, f1: WX + WW + 40 };

// a lighting truss: two chords and a zigzag web, drawn in bars (the lattice of the mark, at rest)
function Truss({ y, x0 = 60, x1 = 1540 }) {
  const n = 37, step = (x1 - x0) / n;
  const web = Array.from({ length: n }, (_, i) => `${i ? 'L' : 'M'}${r2(x0 + i * step)} ${i % 2 ? y : y + 30}`).join('') + `L${x1} ${y + 30}`;
  return (
    <g className="fade-in">
      <rect x={x0} y={y - 3} width={x1 - x0} height="6" fill={PLATE.line} opacity="0.8" />
      <rect x={x0} y={y + 27} width={x1 - x0} height="6" fill={PLATE.line} opacity="0.8" />
      <path d={web} fill="none" stroke={PLATE.line} strokeWidth="2" opacity="0.6" />
      <rect x={x0} y={y - 3} width={x1 - x0} height="1.5" fill={HEX.white} opacity="0.5" />
    </g>
  );
}

// the screen artwork of m22 in its own 1524 x 275 space
function WallArtG({ idp }) {
  const light = HEX.onBlue, dark = HEX.darkBlue;
  return (
    <g>
      <rect width={WALL.w} height={WALL.h} fill={HEX.activeBlue} />
      <rect width={WALL.w} height={WALL.h} fill={`url(#${idp}-led)`} />
      {/* side screens: the photographs as flat Dark Blue blocks, with line art */}
      <PhotoBlockG x={16} y={18} w={478} h={240} />
      <IconArtG name="sun" x={175} y={58} size={160} fill={HEX.activeBlue} opacity="0.4" />
      <PhotoBlockG x={1044} y={18} w={463} h={240} />
      <IconArtG name="solar" x={1195} y={58} size={160} fill={HEX.activeBlue} opacity="0.4" />
      {/* the centre panel's rules and nodes */}
      <rect x="509.5" y="0" width="1" height={WALL.h} fill={light} opacity="0.8" />
      <rect x="1026.5" y="0" width="1" height={WALL.h} fill={light} opacity="0.8" />
      <rect x="510" y="202.5" width="517" height="1" fill={light} />
      {[510, 1027].map((nx) => <rect key={nx} x={nx - 2.5} y="200.5" width="5" height="5" fill={light} />)}
      <g lang="es">
        <text fontSize="21.5" letterSpacing="-0.1">
          <tspan x="531" y="37" fill={light}>{LINES.connect.rows[0]}</tspan>
          <tspan x="531" y="64" fill={dark}>{LINES.connect.rows[1]}</tspan>
        </text>
        <text fontSize="10">
          <tspan x="531" y="174" fill={light}>{LINES.viable.rows[0]}</tspan>
          <tspan x="531" y="186" fill={dark}>{LINES.viable.rows[1]}</tspan>
        </text>
        <text fontSize="10" textAnchor="end">
          <tspan x="1001" y="174" fill={light}>{CONTACT.handle}</tspan>
          <tspan x="1001" y="186" fill={dark}>{CONTACT.web}</tspan>
        </text>
      </g>
      <MarkG x={970} y={21} size={31} fill={light} />
      <WordmarkG x={530} y={255} size={46.5} fill={light} />
    </g>
  );
}

export default function SceneStage() {
  const idp = 'showcase-d';
  const deckTop = `M${DECK.x0} ${DECK.back}H${DECK.x1}L${DECK.f1} ${DECK.front}H${DECK.f0}Z`;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Catalogue plate: an event stage with the wide LED wall of the case study, the stage deck at its foot and a spec column beneath" exportName="showcase-event-stage" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <MaterialDefs idp={idp} />
      <defs>
        <pattern id={`${idp}-led`} width="6" height="6" patternUnits="userSpaceOnUse">
          <rect x="2" y="2" width="2" height="2" fill={HEX.white} opacity="0.07" />
        </pattern>
        <radialGradient id={`${idp}-glow`} cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor={HEX.white} stopOpacity="0.14" />
          <stop offset="1" stopColor={HEX.white} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${idp}-spill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={HEX.activeBlue} stopOpacity="0.5" />
          <stop offset="1" stopColor={HEX.activeBlue} stopOpacity="0" />
        </linearGradient>
      </defs>
      <StageG idp={idp} w={W} h={H} spot={SPOT} floor={0.6} r={0.75} />
      <PlateFrameG w={W} h={H} no="04" />
      <Truss y={42} />

      {/* the deck at the wall's foot: top surface in perspective, the front edge face, light spilling from the wall */}
      <ShadowG idp={`${idp}-s`} cx={800} cy={DECK.front + DECK.face + 6} rx={700} ry={14} dir={{ x: 0, y: 1 }} opacity={0.7} blur={10} />
      <path d={deckTop} fill={`url(#${idp}-metal-dark)`} />
      <path d={deckTop} fill={`url(#${idp}-spill)`} />
      <rect x={DECK.f0} y={DECK.front} width={DECK.f1 - DECK.f0} height={DECK.face} fill={`url(#${idp}-board-dark)`} />
      <rect x={DECK.f0} y={DECK.front} width={DECK.f1 - DECK.f0} height="2" fill={HEX.white} opacity="0.4" />
      <rect x={DECK.f0} y={DECK.front + DECK.face - 6} width={DECK.f1 - DECK.f0} height="6" fill={HEX.black} opacity="0.5" />

      <LitG>
        <rect x={WX - 8} y={WY - 8} width={WW + 16} height={WH + 8} fill={`url(#${idp}-metal-dark)`} />
        <g transform={`translate(${WX} ${WY}) scale(${r2(K * 1e4) / 1e4})`}>
          <WallArtG idp={idp} />
        </g>
        <rect x={WX} y={WY} width={WW} height={WH} fill={`url(#${idp}-glow)`} className="mock-sheen" />
        <rect x={WX} y={WY} width={WW} height="2" fill={HEX.white} opacity="0.4" />
      </LitG>

      <DimensionG x1={WX} y1={WY} x2={WX + WW} y2={WY} value="12 000 mm" offset={-22} i={4} />
      <DimensionG x1={WX} y1={WY + WH} x2={WX} y2={WY} value="2 200 mm" offset={-30} i={5} />

      {/* callouts on the right, every node on the right part of the object, top to bottom */}
      <CalloutsG>
        <CalloutG x={at(1516, 60)[0]} y={at(1516, 60)[1]} tx={1420} ty={150} label="LED wall" side="right" i={0} />
        <CalloutG x={at(1480, 200)[0]} y={at(1480, 200)[1]} tx={1420} ty={262} label="Side screen" side="right" i={1} />
        <CalloutG x={DECK.x1 + 6} y={DECK.back + 46} tx={1420} ty={DECK.back + 46} label="Stage deck" side="right" i={2} />
        <CalloutG x={DECK.f1 - 4} y={DECK.front + DECK.face / 2} tx={1420} ty={DECK.front + DECK.face / 2} label="Stage edge" side="right" i={3} />
      </CalloutsG>

      <SpecColumnG x={100} y={560} w={520} title="Stage" rows={[{ k: 'Wall width', v: '12 000 mm' }, { k: 'Wall height', v: '2 200 mm' }, { k: 'Deck depth', v: '6 000 mm' }]} />
    </Art>
  );
}
