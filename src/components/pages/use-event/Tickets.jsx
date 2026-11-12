// Three tickets and the VIP pass. Each ticket carries the logo, one line printed in the case study, a perforated
// stub, plain bars that encode nothing and quiet pale bars where a date, seat or code would go (we invent none).
import { CalloutG, DimensionG, ShadowG, CastG, LitG, SheenG, SpecColumnG, castDir, STAGE } from '@/components/art/Mockup';
import { MarkG, WordmarkFitG } from '@/components/art/Mark';
import { CrossingBandsG } from '@/components/art/KeyArt';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Plate, idOf, BarsG, PaleBarsG, EsG, rrect } from './kit';
import { pt, locDir } from './bands-parts';

const TONE = {
  paper: (idp) => ({ fill: `url(#${idp}-paper)`, ink: HEX.darkBlue, mk: HEX.activeBlue, line: HEX.activeBlue, bar: HEX.activeBlue, ph: HEX.darkBlue }),
  dark: (idp) => ({ fill: `url(#${idp}-board-dark)`, ink: HEX.onBlue, mk: HEX.activeBlue, line: HEX.onBlue, bar: HEX.activeBlue, ph: HEX.onBlue }),
  blue: (idp) => ({ fill: `url(#${idp}-board)`, ink: HEX.darkBlue, mk: HEX.darkBlue, line: HEX.onBlue, bar: HEX.darkBlue, ph: HEX.darkBlue }),
};

// The outline: a rectangle with a half-round bite out of each long edge where the stub tears off.
const landscape = (w, h, sx, r) => `M0 0H${sx - r}A${r} ${r} 0 0 0 ${sx + r} 0H${w}V${h}H${sx + r}A${r} ${r} 0 0 0 ${sx - r} ${h}H0Z`;
const portrait = (w, h, sy, r) => `M0 0H${w}V${sy - r}A${r} ${r} 0 0 0 ${w} ${sy + r}V${h}H0V${sy + r}A${r} ${r} 0 0 0 0 ${sy - r}Z`;

function Perf({ x1, y1, x2, y2, r = 7 }) {
  const n = Math.floor(Math.hypot(x2 - x1, y2 - y1) / 9);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.5) / n;
        if (Math.abs(t - 0.5) < r / Math.hypot(x2 - x1, y2 - y1)) return null;
        return <circle key={i} cx={r2(x1 + (x2 - x1) * t)} cy={r2(y1 + (y2 - y1) * t)} r="1.7" fill={STAGE.ground} opacity="0.9" />;
      })}
    </g>
  );
}

// One ticket in local coordinates (top left at 0, 0). v = stub at the foot instead of the right.
function Ticket({ idp, tone, rows, two, v = false, w, h, stub, thick = 3, tag, fs = 14 }) {
  const t = TONE[tone](idp);
  const R = 8;
  const d = v ? portrait(w, h, h - stub, R) : landscape(w, h, w - stub, R);
  const mw = v ? w : w - stub; // main panel width (or the whole width for the portrait)
  const mh = v ? h - stub : h;
  return (
    <g>
      <path d={d} fill="#000000" opacity="0.5" transform={`translate(0 ${thick})`} />
      <path d={d} fill={t.fill} filter={`url(#${idp}-fibre)`} />
      <path d={d} fill={`url(#${idp}-shade-v)`} opacity="0.5" />
      <MarkG x={18} y={16} size={24} fill={t.mk} />
      <WordmarkFitG x={50} y={34} w={64} fill={t.ink} />
      <rect x="18" y={r2(mh * 0.4)} width={r2(mw - 36)} height="1" fill={t.ink} opacity="0.4" />
      <rect x="15" y={r2(mh * 0.4 - 3)} width="7" height="7" fill={t.mk} />
      <EsG>
        {rows.map((s, i) => (
          <text key={s} x="18" y={r2(mh * 0.4 + 24 + i * 17)} fontSize={fs} fill={two && i === 0 ? HEX.onBlue : two ? HEX.darkBlue : t.line}>{s}</text>
        ))}
      </EsG>
      <PaleBarsG x={18} y={mh - 38} w={r2((mw - 36) * 0.5)} rows={2} gap={12} h={5} fill={t.ph} opacity={0.22} />
      <PaleBarsG x={r2(mw - 18 - (mw - 36) * 0.3)} y={mh - 38} w={r2((mw - 36) * 0.3)} rows={2} gap={12} h={5} fill={t.ph} opacity={0.22} />
      {v ? (
        <g>
          <Perf x1={0} y1={h - stub} x2={w} y2={h - stub} />
          <BarsG x={18} y={h - stub + 16} w={w - 36} h={stub - 34} fill={t.bar} seed={tag} />
        </g>
      ) : (
        <g>
          <Perf x1={w - stub} y1={0} x2={w - stub} y2={h} />
          <g transform={`translate(${w - stub + 22} ${h - 18}) rotate(-90)`}>
            <BarsG x={0} y={0} w={h - 36} h={stub - 44} fill={t.bar} seed={tag} />
          </g>
        </g>
      )}
      <path d={d} fill="none" stroke="#ffffff" strokeOpacity="0.2" />
      <SheenG idp={idp} d={d} opacity={0.18} />
    </g>
  );
}

const W = 600, H = 440;

// Ticket 1: paper with Active Blue type, flat from above, tilted; callouts right.
export function TicketA() {
  const idp = idOf('ticket-paper');
  const spot = { x: 0.2, y: 0.12 };
  const [cx, cy, rot] = [235, 215, -7];
  const cd = castDir(spot, W, H, cx, cy);
  const P = (x, y) => pt(cx, cy, rot, x - 170, y - 70);
  const dpath = landscape(340, 140, 260, 8);
  return (
    <Plate id="ticket-paper" title="Ticket on paper, with a perforated stub" w={W} h={H} spot={spot} no="12">
      <g transform={`translate(${cx} ${cy}) rotate(${rot}) translate(-170 -70)`}>
        <ShadowG idp={`${idp}-g`} cx={170} cy={140} rx={170} ry={12} dir={locDir(cd, rot)} opacity={0.45} />
        <CastG idp={`${idp}-c`} d={dpath} dir={locDir(cd, rot)} depth={14} opacity={0.4} blur={6} />
        <LitG><Ticket idp={idp} tone="paper" rows={[LINES.hero.rows[0]]} w={340} h={140} stub={80} tag={3} fs={12.5} /></LitG>
      </g>
      <DimensionG x1={P(0, 140)[0]} y1={P(0, 140)[1]} x2={P(340, 140)[0]} y2={P(340, 140)[1]} value="130 mm" offset={28} i={5} />
      <CalloutG x={P(36, 26)[0]} y={P(36, 26)[1]} tx={470} ty={110} label="Logo" i={0} />
      <CalloutG x={P(260, 40)[0]} y={P(260, 40)[1]} tx={470} ty={190} label="Perforation" sub="tear-off stub, 30 mm" i={1} />
      <CalloutG x={P(300, 90)[0]} y={P(300, 90)[1]} tx={470} ty={270} label="Plain bars" sub="encode nothing" i={2} />
      <CalloutG x={P(100, 125)[0]} y={P(100, 125)[1]} tx={470} ty={350} label="Paper" sub="250 g/m² uncoated" i={3} />
    </Plate>
  );
}

// Ticket 2: Dark Blue, portrait with the stub at the foot, leaning slightly; callouts left.
export function TicketB() {
  const idp = idOf('ticket-dark');
  const spot = { x: 0.85, y: 0.1 };
  const [cx, cy, rot] = [385, 225, 5];
  const cd = castDir(spot, W, H, cx, cy);
  const P = (x, y) => pt(cx, cy, rot, x - 90, y - 155);
  return (
    <Plate id="ticket-dark" title="Ticket in Dark Blue, portrait, with a perforated stub" w={W} h={H} spot={spot} no="13">
      <g transform={`translate(${cx} ${cy}) rotate(${rot}) translate(-90 -155)`}>
        <ShadowG idp={`${idp}-g`} cx={90} cy={310} rx={96} ry={12} dir={locDir(cd, rot)} opacity={0.5} />
        <CastG idp={`${idp}-c`} d={portrait(180, 310, 240, 8)} dir={locDir(cd, rot)} depth={14} opacity={0.5} blur={6} />
        <LitG><Ticket idp={idp} tone="dark" rows={LINES.clarity.rows} v w={180} h={310} stub={70} tag={5} /></LitG>
      </g>
      <DimensionG x1={P(180, 0)[0]} y1={P(180, 0)[1]} x2={P(180, 310)[0]} y2={P(180, 310)[1]} value="120 mm" offset={-26} i={5} />
      <CalloutG x={P(36, 28)[0]} y={P(36, 28)[1]} tx={170} ty={90} label="Logo" side="left" i={0} />
      <CalloutG x={P(165, 96)[0]} y={P(165, 96)[1]} tx={170} ty={170} label="Printed line" side="left" i={1} />
      <CalloutG x={P(0, 240)[0]} y={P(0, 240)[1]} tx={170} ty={265} label="Perforation" side="left" i={2} />
      <CalloutG x={P(90, 285)[0]} y={P(90, 285)[1]} tx={170} ty={345} label="Plain bars" sub="encode nothing" side="left" i={3} />
    </Plate>
  );
}

// Ticket 3: Active Blue with the two-tone line, shown obliquely with its edge; callouts in a row below.
export function TicketC() {
  const idp = idOf('ticket-blue');
  const spot = { x: 0.5, y: 0.04 };
  const cd = castDir(spot, W, H, 300, 200);
  const m = [1, 0.06, 0, 0.94]; // an oblique view: a slight shear and foreshortening
  const at = (x, y) => [r2(90 + m[0] * x + m[2] * y), r2(95 + m[1] * x + m[3] * y)];
  return (
    <Plate id="ticket-blue" title="Ticket in Active Blue with the two-tone line" w={W} h={H} spot={spot} no="14">
      <ShadowG idp={`${idp}-g`} cx={300} cy={262} rx={230} ry={14} dir={cd} opacity={0.5} />
      <CastG idp={`${idp}-c`} d={landscape(420, 150, 330, 8)} dir={cd} depth={16} opacity={0.4} blur={7} transform={`matrix(${m.join(' ')} 90 95)`} />
      <g transform={`matrix(${m.join(' ')} 90 95)`}>
        <LitG><Ticket idp={idp} tone="blue" rows={LINES.connect.rows} two w={420} h={150} stub={90} thick={5} tag={9} /></LitG>
      </g>
      <DimensionG x1={at(0, 0)[0]} y1={at(0, 0)[1]} x2={at(420, 0)[0]} y2={at(420, 0)[1]} value="160 mm" offset={-26} i={5} />
      <CalloutG x={at(36, 28)[0]} y={at(36, 28)[1]} tx={80} ty={340} label="Logo" i={0} />
      <CalloutG x={at(150, 60)[0]} y={at(150, 60)[1]} tx={210} ty={340} label="Printed line" i={1} />
      <CalloutG x={at(330, 75)[0]} y={at(330, 75)[1]} tx={480} ty={340} label="Perforation" i={2} />
      <CalloutG x={at(200, 148)[0]} y={at(200, 148)[1]} tx={360} ty={340} label="Edge" sub="0.5 mm" i={3} />
    </Plate>
  );
}

// The VIP pass, standing in a clear stand with a metal clip: Dark Blue with the crossing bands.
export function VipPass() {
  const idp = idOf('vip-pass');
  const spot = { x: 0.8, y: 0.08 };
  const cd = castDir(spot, W, H, 200, 250);
  const pw = 180, ph = 270, px = 110, py = 70;
  return (
    <Plate id="vip-pass" title="VIP pass standing in a clear stand" w={W} h={H} spot={spot} floor={0.82} no="15">
      <ShadowG idp={`${idp}-g`} cx={px + pw / 2 + 10} cy={py + ph + 12} rx={140} ry={18} dir={cd} opacity={0.6} blur={10} />
      <g>
        <path d={`M${px + pw - 6} ${py + 20}L${px + pw + 46} ${py + ph - 8}L${px + pw + 30} ${py + ph + 6}L${px + pw - 6} ${py + ph - 60}Z`} fill={`url(#${idp}-metal-dark)`} />
        <LitG>
          <CastG idp={`${idp}-c`} d={rrect(px, py, pw, ph, 6)} dir={{ x: -cd.x * 0.5, y: 0.2 }} depth={22} opacity={0.4} blur={8} />
          <path d={rrect(px, py + 3, pw, ph, 6)} fill="#000000" opacity="0.45" />
          <path d={rrect(px, py, pw, ph, 6)} fill={`url(#${idp}-board-dark)`} filter={`url(#${idp}-fibre)`} />
          <clipPath id={`${idp}-clip`}><rect x={px} y={py} width={pw} height={ph} /></clipPath>
          <g clipPath={`url(#${idp}-clip)`}>
            <CrossingBandsG idp={idp} x={px} y={py} w={pw} h={ph} cx={0.62} cy={0.58} band={0.05} r={0.16} />
          </g>
          <rect x={px + pw / 2 - 18} y={py + 12} width="36" height="8" rx="4" fill="#05071a" opacity="0.8" />
          <MarkG x={px + 16} y={py + 34} size={30} fill={HEX.activeBlue} />
          <WordmarkFitG x={px + 54} y={py + 56} w={70} fill={HEX.onBlue} />
          <text x={px + 16} y={py + ph - 24} fontSize="64" fontWeight="600" fill={HEX.onBlue} letterSpacing="2">VIP</text>
          <PaleBarsG x={px + 16} y={py + 96} w={110} rows={2} gap={12} fill={HEX.onBlue} opacity={0.22} />
          <BarsG x={px + pw - 70} y={py + ph - 42} w={54} h={28} fill={HEX.activeBlue} seed={4} />
          <SheenG idp={idp} d={rrect(px, py, pw, ph, 6)} opacity={0.2} />
        </LitG>
        <path d={`M${px - 16} ${py + ph - 34}H${px + pw + 16}V${py + ph + 10}H${px - 16}Z`} fill={`url(#${idp}-glass)`} stroke="#ffffff" strokeOpacity="0.4" />
        <path d={`M${px - 16} ${py + ph + 10}H${px + pw + 16}L${px + pw + 22} ${py + ph + 16}H${px - 22}Z`} fill="#ffffff" opacity="0.22" />
        <rect x={px + pw / 2 - 22} y={py - 12} width="44" height="14" fill={`url(#${idp}-metal)`} stroke="#6c748c" strokeWidth="0.75" />
        <circle cx={px + pw / 2} cy={py - 22} r="11" fill="none" stroke={`url(#${idp}-metal)`} strokeWidth="3.5" />
      </g>
      <DimensionG x1={px} y1={py + ph + 30} x2={px + pw} y2={py + ph + 30} value="90 mm" offset={24} i={5} />
      <DimensionG x1={px} y1={py + ph} x2={px} y2={py} value="135 mm" offset={-34} i={6} />
      <CalloutG x={px + pw / 2} y={py - 22} tx={400} ty={80} label="Metal ring" i={0} />
      <CalloutG x={px + 60} y={py + ph - 48} tx={400} ty={160} label="VIP" i={1} />
      <CalloutG x={px + 140} y={py + 130} tx={400} ty={240} label="Crossing bands" i={2} />
      <CalloutG x={px + pw + 12} y={py + ph - 14} tx={400} ty={320} label="Clear stand" sub="acrylic, 4 mm" i={3} />
      <SpecColumnG x={400} y={366} w={160} rows={[{ k: 'Card', v: '90 × 135 mm' }]} rowH={34} size={13} />
    </Plate>
  );
}
