// The poster sheets of the m10 animation, rebuilt as SVG groups: two 3:4 sheets with a 6-column baseline field,
// margins of 6.7%, square nodes at the live-area corners, photos as flat Dark Blue blocks at 75%.
// Sheets are 300 x 400. Measured from reference/m10_1 to m10_5 (sheet width 720 px there, so scale 0.4167).
import { HEX, LINES, CONTACT } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { NodeG, PhotoBlockG } from '@/components/art/KeyArt';
import { SHEET_COPY as C, mix } from './data';

export const SHEET = { w: 300, h: 400, m: 20, top: 21, bottom: 379 };
const { w: W, m: M, top: TOP, bottom: BOT } = SHEET;
const INK = HEX.darkBlue;
const COLS = 6;
const GUT = r2(W * 0.008);
const CW = r2((W - 2 * M - GUT * (COLS - 1)) / COLS);

// The baseline field pattern, measured on m10: one pale Active Blue and one grey (Light Blue) hairline every 2.5
// units (0.63% of the sheet height), each line a third of the period, on paper, with paper column gutters; every
// 18 pairs the grey line is left out, so the field reads in blocks. Define once per SVG (id `${idp}-base`).
const PERIOD = 2.5, LW = r2(PERIOD / 3), BLOCK = 18;
const BREAKS = Array.from({ length: Math.floor((BOT - TOP) / (PERIOD * BLOCK)) }, (_, j) => r2(TOP + PERIOD / 2 + (j + 1) * PERIOD * BLOCK));
export function SheetDefsG({ idp }) {
  return (
    <defs>
      <pattern id={`${idp}-base`} x={M} y={TOP} width={r2(CW + GUT)} height={PERIOD} patternUnits="userSpaceOnUse">
        <rect width={CW} height={LW} fill={mix(HEX.activeBlue, HEX.lightBlue, 0.62)} />
        <rect y={PERIOD / 2} width={CW} height={LW} fill={HEX.lightBlue} />
      </pattern>
    </defs>
  );
}

function Lines({ xs = [], ys = [], from = 0, to = 400 }) {
  const d = xs.map((x) => `M${x} ${from}V${to}`).join('') + ys.map((y) => `M0 ${y}H${W}`).join('');
  return <path d={d} stroke={INK} strokeWidth="0.45" fill="none" opacity="0.7" />;
}
const Nodes = ({ pts, fill = INK }) => pts.map(([x, y]) => <NodeG key={`${x}-${y}`} cx={x} cy={y} s={3.2} fill={fill} />);
function Rows({ x, y, lh, s, anchor = 'start', rows, fill = INK }) {
  return rows.map((t, i) => (
    <text key={t} x={x} y={r2(y + i * lh)} fontSize={s} textAnchor={anchor} fill={fill}>{t}</text>
  ));
}

// A: headline poster (m09 left).
function A() {
  return (
    <>
      <Lines xs={[M, 280]} ys={[TOP, BOT]} />
      <path d={`M${M} 349H280V${BOT}H${M}Z`} stroke={INK} strokeWidth="0.45" fill="none" opacity="0.7" />
      <Nodes pts={[[M, TOP], [280, TOP], [M, BOT], [280, BOT], [M, 349], [280, 349]]} />
      <WordmarkG x={40} y={56} size={21} fill={INK} />
      <Rows x={40} y={240} lh={18.75} s={15.4} rows={C.headline} />
      <Rows x={40} y={295.5} lh={7.5} s={5.4} rows={C.headBody} />
      <text x="40" y="332" fontSize="3.6" fill={INK}>{C.headTag}</text>
      <MarkG x={40} y={356} size={15} fill={INK} />
      <text x="261" y="366" fontSize="4.4" textAnchor="end" fill={INK}>{CONTACT.web}</text>
    </>
  );
}

// B: mark column, line, two photo blocks (m09 right).
function B() {
  return (
    <>
      <Lines xs={[62, 150]} ys={[231]} from={0} to={400} />
      <Nodes pts={[[62, 231], [150, 231]]} />
      <MarkG x={23} y={22} size={15} fill={INK} />
      <Rows x={85} y={34} lh={18.75} s={15.4} rows={C.convert} />
      <Rows x={85} y={96.3} lh={6.3} s={5} rows={C.convertBody} />
      <text x="20" y="217" fontSize="3.8" fill={INK}>{CONTACT.web}</text>
      <Rows x={85} y={213} lh={6} s={3.8} rows={C.convertTag} />
      <WordmarkG x={281} y={217} size={21.5} anchor="end" fill={INK} />
      <PhotoBlockG x={7.5} y={239} w={135} h={153.5} />
      <PhotoBlockG x={157.5} y={239} w={135.5} h={153.5} />
    </>
  );
}

// C: one large photo block with the three words over it (m11 left).
function C3() {
  const mid = [[M, 66], [150, 66], [280, 66], [M, 333], [150, 333], [280, 333]];
  return (
    <>
      <Lines xs={[M, 150, 280]} ys={[66, 333]} from={66} to={333} />
      <Nodes pts={mid} />
      <WordmarkG x={150} y={49} size={21} anchor="middle" fill={INK} />
      <PhotoBlockG x={31} y={81} w={238} h={238} />
      <text x="150" y="301" fontSize="12" textAnchor="middle" fill={HEX.lightBlue}>{LINES.field}</text>
      <Rows x={150} y={365} lh={6} s={4.2} anchor="middle" rows={LINES.fieldBody.rows} />
      <text x="31" y="377" fontSize="3.8" fill={INK}>{CONTACT.email}</text>
      <text x="269" y="377" fontSize="3.8" textAnchor="end" fill={INK}>{CONTACT.web}</text>
    </>
  );
}

// D: centred line with the three-cell footer (m11 right).
function D() {
  return (
    <>
      <Lines xs={[M, 280]} ys={[TOP, BOT]} />
      <path d={`M${M} 349H280V${BOT}H${M}ZM106 349V${BOT}M194 349V${BOT}`} stroke={INK} strokeWidth="0.45" fill="none" opacity="0.7" />
      <Nodes pts={[[M, TOP], [280, TOP], [M, BOT], [280, BOT], [M, 349], [106, 349], [194, 349], [280, 349], [106, BOT], [194, BOT]]} />
      <WordmarkG x={150} y={63} size={21} anchor="middle" fill={INK} />
      <Rows x={150} y={164} lh={19} s={15.4} anchor="middle" rows={LINES.clarity.rows} />
      <Rows x={150} y={297} lh={6} s={4.8} anchor="middle" rows={LINES.clarityBody.rows} />
      <text x="63" y="366" fontSize="4.4" textAnchor="middle" fill={INK}>{CONTACT.web}</text>
      <MarkG x={142.5} y={356} size={15} fill={INK} />
      <text x="237" y="366" fontSize="4.4" textAnchor="middle" fill={INK}>{CONTACT.web}</text>
    </>
  );
}

const LAYOUT = { A, B, C: C3, D };

// One sheet at (x, y). The wrapper carries the transform; the Spanish copy is marked lang="es".
export function SheetG({ kind, x = 0, y = 0, idp }) {
  const Body = LAYOUT[kind];
  return (
    <g transform={`translate(${x} ${y})`} lang="es">
      <rect width={W} height={SHEET.h} fill={HEX.paper} />
      <rect x={M} y={TOP} width={W - 2 * M} height={BOT - TOP} fill={`url(#${idp}-base)`} />
      {BREAKS.map((y) => <rect key={y} x={M} y={y} width={W - 2 * M} height={LW} fill={HEX.paper} />)}
      <Body />
    </g>
  );
}

// The stage: two sheets on the periwinkle ground (640 x 480 for the 2800 x 2100 frames of m10, k = 0.2286).
// Measured: left sheet x 119 to 1380, right 1420 to 2681, both y 210 to 1891, so each sheet is 288.2 wide
// (scale 0.9607 of the 300-unit sheet) at x 27.2 and 324.6, y 48. The frame group has no transform of its own,
// so a CSS cycle can run on it.
export const STAGE_W = 640;
export const STAGE_H = 480;
const SK = 0.9607, SY = 48;
export function StageG({ left, right, idp }) {
  return (
    <>
      <g transform={`translate(27.2 ${SY}) scale(${SK})`}><SheetG kind={left} idp={idp} /></g>
      <g transform={`translate(324.6 ${SY}) scale(${SK})`}><SheetG kind={right} idp={idp} /></g>
    </>
  );
}
