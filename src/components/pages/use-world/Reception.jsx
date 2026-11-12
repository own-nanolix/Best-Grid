// Scene 3: a reception wall straight on. The logo in raised letters, a counter, the wayfinding panel and a room plaque.
import { ShadowG, CalloutG, DimensionG, LitG, castDir } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { Plate, RaisedG, WayRowsG, BoltG, PanelSheenG } from './shared';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './use-world.module.css';

const IDP = 'use-world-reception';
const W = 1400, H = 900;
const SPOT = { x: 0.74, y: 0.05 };
const WALL = { x: 56, y: 56, w: 1288, h: 590 };
const FLOOR = WALL.y + WALL.h;
const WIRE = '#6f7ab0';

export default function Reception() {
  const dir = castDir(SPOT, W, H, 500, 260);
  const rows = [
    { icon: 'user', word: 'Reception', arrow: 'right' },
    { icon: 'calendar', word: 'Meeting room', arrow: 'right' },
    { icon: 'pin', word: 'Parking', arrow: 'left' },
  ];
  return (
    <Plate idp={IDP} title="Reception wall with raised logo, counter, wayfinding panel and room plaque" exportName="use-world-reception" w={W} h={H} spot={SPOT} floor={0.74} no="03" label="Reception signage">
      <defs>
        <radialGradient id={`${IDP}-wall-lit`} gradientUnits="userSpaceOnUse" cx={r2(W * SPOT.x)} cy={r2(H * SPOT.y)} r="1100">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#0c0e1f" stopOpacity="0.55" />
        </radialGradient>
        <clipPath id={`${IDP}-wall`}><rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} /></clipPath>
        <linearGradient id={`${IDP}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c2146" />
          <stop offset="1" stopColor="#0b0d1d" />
        </linearGradient>
      </defs>

      {/* wall: painted board panels with fine seams, lit from the upper right */}
      <g clipPath={`url(#${IDP}-wall)`}>
        <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill={`url(#${IDP}-card)`} />
        {[1, 2, 3, 4].map((i) => <rect key={i} x={WALL.x + i * 257} y={WALL.y} width="1.5" height={WALL.h} fill="#1b2043" opacity="0.14" />)}
        <rect x={WALL.x} y={WALL.y + 470} width={WALL.w} height="1.5" fill="#1b2043" opacity="0.14" />
        <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill="#ffffff" opacity="0.5" filter={`url(#${IDP}-fibre)`} />
        <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill={`url(#${IDP}-wall-lit)`} />
      </g>
      <rect x={WALL.x} y={FLOOR} width={WALL.w} height="170" fill={`url(#${IDP}-floor)`} />
      <rect x={WALL.x} y={FLOOR} width={WALL.w} height="8" fill="#10132b" />
      <rect x={WALL.x} y={FLOOR} width={WALL.w} height="1.5" fill="#ffffff" opacity="0.2" />

      {/* raised logo */}
      <RaisedG idp={`${IDP}-mark`} dir={dir} depth={6} face={HEX.darkBlue} shadowClass={s.shadowSweep}
        draw={(f) => <MarkG x={150} y={130} size={132} fill={f} />} />
      <RaisedG idp={`${IDP}-word`} dir={dir} depth={6} face={HEX.darkBlue} shadowClass={s.shadowSweep}
        draw={(f) => <WordmarkG x={320} y={238} size={118} fill={f} />} />

      {/* counter: slab top, board front with vertical seams, plinth, a pale bar for the screen */}
      <LitG>
        <ShadowG idp={`${IDP}-sh-counter`} cx={470} cy={FLOOR + 12} rx={420} ry={22} dir={dir} opacity={0.8} blur={10} />
        <rect x="120" y="452" width="700" height="22" fill={`url(#${IDP}-metal)`} />
        <rect x="120" y="452" width="700" height="2" fill="#ffffff" opacity="0.8" />
        <rect x="132" y="474" width="676" height="150" fill={`url(#${IDP}-board)`} filter={`url(#${IDP}-b-board)`} />
        <rect x="132" y="474" width="676" height="150" fill={`url(#${IDP}-shade-r)`} />
        {[1, 2, 3].map((i) => <rect key={i} x={132 + i * 169} y="474" width="1.5" height="150" fill="#10132b" opacity="0.5" />)}
        <rect x="132" y="474" width="676" height="14" fill="#000000" opacity="0.28" />
        <rect x="132" y="624" width="676" height="12" fill="#10132b" />
        <rect x="132" y="474" width="676" height="150" fill="none" stroke="#ffffff" strokeOpacity="0.16" />
        <MarkG x={438} y={520} size={64} fill={HEX.onBlue} opacity="0.9" />
      </LitG>

      {/* wayfinding panel: Dark Blue board, a deep edge, rows with icons, words and arrows */}
      <LitG>
        <ShadowG idp={`${IDP}-sh-panel`} cx={1020} cy={FLOOR + 12} rx={150} ry={14} dir={dir} opacity={0.5} blur={8} />
        <rect x="911" y="157" width="240" height="440" fill="#000000" opacity="0.28" filter={`url(#${IDP}-soft)`} />
        <rect x="900" y="140" width="240" height="440" fill={`url(#${IDP}-board-dark)`} />
        <rect x="900" y="140" width="240" height="440" fill="none" stroke="#ffffff" strokeOpacity="0.22" />
        <rect x="1140" y="140" width="8" height="440" fill="#0d1026" />
        <rect x="900" y="580" width="248" height="8" fill="#0d1026" />
        <WayRowsG x={900} y={190} w={240} rowH={110} rows={rows} fg={HEX.onBlue} rule={HEX.activeBlue} cell="#2a3266" />
        <WordmarkG x={920} y={168} size={26} fill={HEX.onBlue} />
        <PanelSheenG idp={IDP} x={900} y={140} w={240} h={440} opacity={0.28} />
        {[[910, 150], [1130, 150], [910, 570], [1130, 570]].map(([x, y]) => <BoltG key={`${x}${y}`} x={x} y={y} r={3.5} />)}
      </LitG>

      {/* room plaque: Active Blue, the mark, a plain room word, a quiet pale bar where a name would be */}
      <LitG>
        <rect x="1197" y="285" width="130" height="150" fill="#000000" opacity="0.28" filter={`url(#${IDP}-soft)`} />
        <rect x="1186" y="270" width="130" height="150" fill={`url(#${IDP}-board)`} filter={`url(#${IDP}-b-board)`} />
        <rect x="1186" y="270" width="130" height="150" fill={`url(#${IDP}-shade-r)`} />
        <rect x="1186" y="270" width="130" height="150" fill="none" stroke="#ffffff" strokeOpacity="0.3" />
        <MarkG x={1202} y={286} size={34} fill={HEX.darkBlue} />
        <text x="1202" y="352" fontSize="15" fill={HEX.darkBlue}>Meeting room</text>
        <rect x="1202" y="372" width="98" height="9" fill={HEX.onBlue} opacity="0.7" />
        <rect x="1202" y="392" width="62" height="9" fill={HEX.onBlue} opacity="0.5" />
        <PanelSheenG idp={IDP} x={1186} y={270} w={130} h={150} opacity={0.3} />
        {[[1194, 278], [1308, 278], [1194, 412], [1308, 412]].map(([x, y]) => <BoltG key={`${x}${y}`} x={x} y={y} r={2.6} />)}
      </LitG>

      <DimensionG x1={120} y1={636} x2={820} y2={636} value="1 800 mm" offset={36} color={WIRE} i={0} />
      <DimensionG x1={900} y1={580} x2={900} y2={140} value="1 100 mm" offset={-34} color={WIRE} text={HEX.darkBlue} i={1} />
      <CalloutG x={420} y={230} tx={180} ty={800} side="right" label="Raised letters, 8 mm deep" color={WIRE} i={2} />
      <CalloutG x={760} y={540} tx={560} ty={780} side="right" label="Reception counter" color={WIRE} i={3} />
      <CalloutG x={1020} y={440} tx={900} ty={830} side="right" label="Wayfinding panel, 600 × 1 100 mm" color={WIRE} i={4} />
      <CalloutG x={1251} y={360} tx={1100} ty={730} side="right" label="Room plaque, 325 × 375 mm" color={WIRE} i={5} />
      <CalloutG x={930} y={160} tx={760} ty={104} side="left" label="Panel board, 6 mm" color={WIRE} text={HEX.darkBlue} i={6} />
    </Plate>
  );
}
