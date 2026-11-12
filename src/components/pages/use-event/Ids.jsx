// Two staff ID cards sliding half out of one clear holder, flat from above. Two colourways, two arrangements.
// Names and roles are only the two printed in the case study (m05, m08); no photographs, no portraits.
import { CalloutG, DimensionG, ShadowG, CastG, SheenG, LitG, castDir } from '@/components/art/Mockup';
import { WordmarkFitG, MarkG } from '@/components/art/Mark';
import { HEX, PEOPLE } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Plate, idOf, PaleBarsG, EsG, rrect } from './kit';

const CW = 130, CH = 205, OUT = 105, HW = 288, HH = 120; // px; 2.4 px per mm
const TONES = {
  dark: (idp) => ({ bg: `url(#${idp}-board-dark)`, fg: HEX.onBlue, mk: HEX.activeBlue, ph: HEX.onBlue }),
  light: (idp) => ({ bg: `url(#${idp}-card)`, fg: HEX.darkBlue, mk: HEX.activeBlue, ph: HEX.darkBlue }),
  blue: (idp) => ({ bg: `url(#${idp}-board)`, fg: HEX.darkBlue, mk: HEX.darkBlue, ph: HEX.darkBlue }),
};
const pt = (cx, cy, deg, x, y) => {
  const a = (deg * Math.PI) / 180;
  return [r2(cx + x * Math.cos(a) - y * Math.sin(a)), r2(cy + x * Math.sin(a) + y * Math.cos(a))];
};

// One card drawn with its visible end at the top (flip = false) or the bottom (flip = true).
function Card({ idp, x, y, tone, person, flip }) {
  const t = TONES[tone](idp);
  const vy = flip ? y + CH - OUT : y; // top of the part that sticks out of the holder
  const p = PEOPLE[person];
  const nameRows = p.nameRows || [p.name];
  return (
    <g>
      <rect x={x} y={y} width={CW} height={CH} fill={t.bg} filter={`url(#${idp}-fibre)`} />
      <rect x={x} y={y} width={CW} height={CH} fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
      <rect x={r2(x + CW / 2 - 13)} y={vy + 9} width="26" height="6" rx="3" fill="#000000" opacity="0.55" />
      <MarkG x={x + 12} y={vy + 24} size={22} fill={t.mk} />
      <WordmarkFitG x={x + 40} y={vy + 41} w={64} fill={t.fg} />
      <rect x={x + 12} y={vy + 52} width={CW - 24} height="1" fill={t.fg} opacity="0.5" />
      <EsG>
        {nameRows.map((n, i) => (
          <text key={n} x={x + 12} y={vy + 68 + i * 13} fontSize="12.5" fill={t.fg}>{n}</text>
        ))}
        {p.roleRows.map((n, i) => (
          <text key={n} x={x + 12} y={vy + 72 + nameRows.length * 13 + i * 11} fontSize="9.5" fill={t.fg} opacity="0.85">{n}</text>
        ))}
      </EsG>
      <PaleBarsG x={x + 12} y={flip ? y + 12 : y + CH - 36} w={CW - 24} rows={2} gap={9} h={4} fill={t.ph} />
    </g>
  );
}

function IdSet({ idp, flip, tones, people }) {
  const top = -HH / 2;
  const ys = flip ? [top + HH + OUT - CH, top + HH + OUT - CH - 10] : [top - OUT, top - OUT + 10];
  const xs = [-HW / 2 + 6, HW / 2 - CW - 6];
  return (
    <g>
      <rect x={-HW / 2} y={top} width={HW} height={HH} fill="#ffffff" opacity="0.07" />
      {[0, 1].map((i) => <Card key={i} idp={idp} x={xs[i]} y={ys[i]} tone={tones[i]} person={people[i]} flip={flip} />)}
      {/* the clear front pocket, lying over the lower part of both cards */}
      <rect x={-HW / 2} y={top} width={HW} height={HH} rx="6" fill="#dfe6f7" opacity="0.16" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5" />
      <rect x={-HW / 2} y={flip ? top + HH - 6 : top} width={HW} height="6" fill="#ffffff" opacity="0.38" />
      <rect x={-HW / 2 + 5} y={top + 5} width={HW - 10} height={HH - 10} rx="3" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" />
      <rect x={-HW / 2} y={top} width={HW} height={HH} rx="6" fill={`url(#${idp}-glass)`} opacity="0.6" />
      <SheenG idp={idp} d={rrect(-HW / 2, top, HW, HH, 6)} opacity={0.3} />
      {/* ring and clip */}
      <rect x={-HW / 2 - 10} y={-9} width="16" height="18" fill={`url(#${idp}-metal)`} stroke="#6c748c" strokeWidth="0.75" />
      <circle cx={-HW / 2 - 18} cy="0" r="9" fill="none" stroke={`url(#${idp}-metal)`} strokeWidth="3" />
    </g>
  );
}

export function IdPlateA() {
  const idp = idOf('id-a');
  const spot = { x: 0.25, y: 0.12 };
  const [cx, cy, rot] = [190, 300, -12];
  const cd = castDir(spot, 560, 520, cx, cy);
  const P = (x, y) => pt(cx, cy, rot, x, y);
  const [a, b] = [P(HW / 2 - 20, 20), P(-70, -118)];
  const [h1, h2] = [P(-HW / 2, HH / 2), P(HW / 2, HH / 2)];
  return (
    <Plate id="id-a" title="Staff ID cards in a clear holder, Dark Blue and Light Blue" w={560} h={520} spot={spot} no="02">
      <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
        <ShadowG idp={`${idp}-g`} cx={0} cy={HH / 2 - 8} rx={HW / 2 + 8} ry={22} dir={cd} opacity={0.55} blur={9} />
        <CastG idp={`${idp}-c`} d={`${rrect(-HW / 2, -HH / 2, HW, HH, 6)}M${-HW / 2 + 6} ${-HH / 2 - OUT}h${CW}v${CH}h${-CW}ZM${HW / 2 - CW - 6} ${-HH / 2 - OUT + 10}h${CW}v${CH}h${-CW}Z`} dir={{ x: 0.7, y: 0.6 }} depth={14} opacity={0.4} blur={5} />
        <LitG><IdSet idp={idp} flip={false} tones={['dark', 'light']} people={['elena', 'lorena']} /></LitG>
      </g>
      <DimensionG x1={h1[0]} y1={h1[1]} x2={h2[0]} y2={h2[1]} value="120 mm" offset={30} i={4} />
      <CalloutG x={a[0]} y={a[1]} tx={380} ty={200} label="Clear holder" sub="0.5 mm film" i={0} />
      <CalloutG x={b[0]} y={b[1]} tx={380} ty={290} label="Card" sub="54 × 85 mm" i={1} />
      <CalloutG x={P(-HW / 2 - 18, 0)[0]} y={P(-HW / 2 - 18, 0)[1]} tx={380} ty={380} label="Strap ring" i={2} />
    </Plate>
  );
}

export function IdPlateB() {
  const idp = idOf('id-b');
  const spot = { x: 0.8, y: 0.1 };
  const [cx, cy] = [360, 235];
  const cd = castDir(spot, 560, 520, cx, cy);
  return (
    <Plate id="id-b" title="Staff ID cards in a clear holder, Active Blue and Dark Blue" w={560} h={520} spot={spot} no="03">
      <g transform={`translate(${cx} ${cy})`}>
        <ShadowG idp={`${idp}-g`} cx={0} cy={HH / 2 + 118} rx={HW / 2 - 10} ry={16} dir={cd} opacity={0.5} blur={9} />
        <CastG idp={`${idp}-c`} d={rrect(-HW / 2, -HH / 2, HW, HH, 6)} dir={{ x: -0.7, y: 0.8 }} depth={12} opacity={0.4} blur={5} />
        <LitG><IdSet idp={idp} flip tones={['blue', 'dark']} people={['lorena', 'elena']} /></LitG>
      </g>
      <DimensionG x1={cx + HW / 2 + 12} y1={cy - HH / 2} x2={cx + HW / 2 + 12} y2={cy + HH / 2} value="50 mm" offset={-14} i={4} />
      <CalloutG x={cx - 100} y={cy + 140} tx={150} ty={400} label="Card" sub="54 × 85 mm" side="left" i={0} />
      <CalloutG x={cx + 80} y={cy - 30} tx={150} ty={110} label="Clear holder" sub="0.5 mm film" side="left" i={1} />
      <CalloutG x={cx - HW / 2 - 18} y={cy} tx={150} ty={200} label="Strap ring" side="left" i={2} />
    </Plate>
  );
}
