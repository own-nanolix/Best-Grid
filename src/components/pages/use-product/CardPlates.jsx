// The staff access card of m08 in three colourways, each plate showing the front over the back. Card 55 x 85 mm (our
// own production values), square corners, a painted edge. Front: the m08 card as printed (word-mark, the hairline at
// 29% of the width, name, role, department, the pale numeral, the ID line, the rule with its node, plain bars that
// encode nothing, the web address), measured from the badge's own card and set into the 55 x 85 format. Back: a dark
// strip, the small word-mark, the contact details of the brand and quiet bars where a name or a number would go.
import { r2, seeded } from '@/lib/charts';
import { HEX, CONTACT, BADGE, PEOPLE } from '@/lib/brand';
import { WordmarkFitG } from '@/components/art/Mark';
import { CalloutG, DimensionG, SpecColumnG, CastG, SheenG } from '@/components/art/Mockup';
import { Plate } from './plate';

const W = 270, H = 417; // 55 x 85 mm
const SX = W / 785, SY = H / 1435; // the m08 card (785 x 1435 px) mapped onto the format
const COL = r2(226 * SX); // the vertical hairline, 29% of the width
const RULE = r2(1036 * SY); // the horizontal rule with its node
const SIZE = 20; // callout type, so the plates stay legible in a three-column row

const VARIANTS = {
  light: { name: 'card-light', face: 'card', edge: HEX.activeBlue, word: HEX.activeBlue, ink: HEX.activeBlue, line: HEX.activeBlue, numeral: [HEX.white, 0.62], strip: HEX.darkBlue, text: HEX.darkBlue, bar: HEX.darkBlue, tone: 'Light grey-blue card, Active Blue print, as printed' },
  dark: { name: 'card-dark', face: 'board-dark', edge: HEX.activeBlue, word: HEX.activeBlue, ink: HEX.lightBlue, line: HEX.activeBlue, numeral: [HEX.white, 0.12], strip: '#06070f', text: HEX.lightBlue, bar: HEX.lightBlue, tone: 'Dark Blue card, Light Blue print' },
  active: { name: 'card-active', face: 'board', edge: HEX.darkBlue, word: HEX.onBlue, ink: HEX.darkBlue, line: HEX.darkBlue, numeral: [HEX.white, 0.3], strip: HEX.darkBlue, text: HEX.darkBlue, bar: HEX.darkBlue, tone: 'Active Blue card, Dark Blue print' },
};

// Plain bars that encode nothing (seeded, so server and browser agree).
function Bars({ x, y, w, h, fill }) {
  const rnd = seeded(11), out = [];
  for (let cx = 0; cx < w - 3;) {
    const bw = 1.2 + Math.floor(rnd() * 3) * 1.1;
    if (cx + bw > w) break;
    out.push(<rect key={cx} x={r2(x + cx)} y={y} width={r2(bw)} height={h} fill={fill} />);
    cx += bw + 1.4 + Math.floor(rnd() * 3) * 1.1;
  }
  return <g>{out}</g>;
}

function FrontArt({ v }) {
  const X = (px) => r2((px - 108) * SX), Y = (py) => r2((py - 160) * SY);
  return (
    <g lang="es">
      <rect x={COL - 0.4} y="0" width="0.8" height={RULE} fill={v.line} />
      <rect x="0" y={RULE - 0.4} width={W} height="0.8" fill={v.line} />
      <rect x={COL - 3} y={RULE - 3} width="6" height="6" fill={v.line} />
      <WordmarkFitG x={X(145)} y={Y(315)} w={r2(146 * SX)} fill={v.word} />
      <text x={X(383)} y={Y(553)} fontSize={r2(80 * SX)} fill={v.ink}>{BADGE.name}</text>
      {PEOPLE.elena.roleRows.map((t, i) => <text key={t} x={X(383)} y={r2(Y(645) + i * 18)} fontSize={r2(46 * SX)} fill={v.ink}>{t}</text>)}
      <text x={X(383)} y={r2(Y(773) + 10)} fontSize={r2(29 * SX)} fill={v.ink}>{BADGE.dept}</text>
      <text x={X(148)} y={Y(1091)} fontSize={r2(125 * SX)} fill={v.numeral[0]} fillOpacity={v.numeral[1]}>{BADGE.numeral}</text>
      <text x={X(387)} y={Y(1085)} fontSize={r2(42 * SX)} fill={v.ink}>{BADGE.id}</text>
      <Bars x={X(275)} y={Y(1302)} w={r2(474 * SX)} h={r2(114 * SY)} fill={v.ink} />
      <text x={W / 2} y={Y(1470)} fontSize={r2(29 * SX)} fill={v.ink} textAnchor="middle">{BADGE.web}</text>
    </g>
  );
}

// The back, drawn on a 250 x 386 frame and scaled to the card.
function BackArt({ v }) {
  return (
    <g transform={`scale(${r2(W / 250)})`}>
      <rect x="0" y="52" width="250" height="62" fill={v.strip} />
      <WordmarkFitG x={14} y={34} w={58} fill={v.word} />
      <rect x={71.6} y="114" width="0.8" height="272" fill={v.line} opacity="0.7" />
      <rect x={69} y="111" width="6" height="6" fill={v.line} />
      {[[140, 126], [166, 88], [192, 104]].map(([y, bw]) => <rect key={y} x="88" y={y} width={bw} height="11" fill={v.bar} opacity="0.14" />)}
      <g fill={v.text} fontSize="9.4" lang="es">
        <text x="88" y="268">{CONTACT.phone}</text>
        <text x="88" y="283">{CONTACT.email}</text>
        <text x="88" y="298">{CONTACT.web}</text>
        {CONTACT.address.map((l, i) => <text key={l} x="88" y={322 + i * 14}>{l}</text>)}
      </g>
    </g>
  );
}

function Card({ idp, id, v, side, x, y, r }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <clipPath id={`${idp}-${id}`}><rect width={W} height={H} /></clipPath>
      <rect x="2.6" y="3.4" width={W} height={H} fill={v.edge} />
      <rect x="1.3" y="1.7" width={W} height={H} fill={v.edge} />
      <rect width={W} height={H} fill={`url(#${idp}-${v.face})`} filter={`url(#${idp}-fibre)`} />
      <g clipPath={`url(#${idp}-${id})`}>
        {side === 'front' ? <FrontArt v={v} /> : <BackArt v={v} />}
        <rect width={W} height={H} fill={`url(#${idp}-shade-v)`} opacity="0.3" />
      </g>
      <rect width={W} height={H} fill="none" stroke="#ffffff" strokeOpacity="0.28" />
      {side === 'front' && <SheenG idp={idp} d={`M0 0H${W}V${H * 0.45}L0 ${H * 0.7}Z`} opacity={0.22} />}
    </g>
  );
}

const rot = (c, u, v) => { const a = (c.r * Math.PI) / 180; return [r2(c.x + u * Math.cos(a) - v * Math.sin(a)), r2(c.y + u * Math.sin(a) + v * Math.cos(a))]; };
const outline = (c) => { const p = [[0, 0], [W, 0], [W, H], [0, H]].map(([u, v]) => rot(c, u, v)); return `M${p.map((q) => q.join(' ')).join('L')}Z`; };

// Each colourway is staged differently: where the cards lie, how they turn, where the spot is and which parts are
// called out. Rows: [label, point, ty, side, tx, sub].
const STAGING = {
  light: {
    spot: { x: 0.22, y: 0.14 }, back: { x: 390, y: 60, r: 4 }, front: { x: 60, y: 420, r: -4 }, cast: { x: 0.6, y: 0.7 },
    rows: (b, f) => [
      ['Dark strip', rot(b, 40, 90), 140, 'left', 350],
      ['Quiet bars', rot(b, 110, 170), 230, 'left', 350, 'Name and number'],
      ['Contact details', rot(b, 86, 330), 330, 'left', 350],
      ['Name and role', rot(f, 230, 112), 540, 'right', 380],
      ['ID line', rot(f, 235, 263), 650, 'right', 380],
      ['Plain bars', rot(f, 205, 350), 760, 'right', 380, 'Encode nothing'],
    ],
  },
  dark: {
    spot: { x: 0.8, y: 0.14 }, back: { x: 70, y: 70, r: -5 }, front: { x: 390, y: 420, r: 3 }, cast: { x: -0.6, y: 0.7 },
    rows: (b, f) => [
      ['Dark strip', rot(b, 230, 90), 140, 'right', 380],
      ['Contact details', rot(b, 240, 300), 280, 'right', 380],
      ['Word-mark', rot(f, 10, 40), 520, 'left', 350],
      ['Hairline at 29%', rot(f, COL, 200), 600, 'left', 350],
      ['Pale numeral', rot(f, 20, 258), 730, 'left', 350, 'Badge numeral 25'],
    ],
  },
  active: {
    spot: { x: 0.5, y: 0.06 }, back: { x: 70, y: 250, r: 0 }, front: { x: 380, y: 250, r: 0 }, cast: { x: 0.2, y: 0.9 },
    rows: (b, f) => [
      ['Dark strip', rot(b, 120, 90), 190, 'right', 70],
      ['Name and role', rot(f, 140, 105), 130, 'right', 400],
      ['Word-mark', rot(f, 12, 50), 210, 'right', 400],
      ['Contact details', rot(b, 200, 385), 760, 'right', 110],
    ],
  },
};

export function CardPlate({ variant }) {
  const v = VARIANTS[variant], st = STAGING[variant], idp = `use-product-${v.name}`;
  return (
    <Plate idp={idp} w={720} h={900} name={v.name} title={`The site access card, ${v.tone}: front and back`} spot={st.spot} split={0} no={variant === 'light' ? '09' : variant === 'dark' ? '10' : '11'}>
      <CastG idp={`${idp}-c1`} d={outline(st.back)} dir={st.cast} depth={16} opacity={0.55} blur={7} />
      <Card idp={idp} id="back" v={v} side="back" {...st.back} />
      <CastG idp={`${idp}-c2`} d={outline(st.front)} dir={st.cast} depth={20} opacity={0.6} blur={8} />
      <Card idp={idp} id="front" v={v} side="front" {...st.front} />
      {st.rows(st.back, st.front).map(([label, p, ty, side, tx, sub], i) => <CalloutG key={label} label={label} sub={sub} x={p[0]} y={p[1]} tx={tx} ty={ty} side={side} size={SIZE} i={i} />)}
      {variant === 'active' && <DimensionG x1={st.front.x} y1={st.front.y + H} x2={st.front.x + W} y2={st.front.y + H} value="55 mm" offset={30} size={18} i={7} />}
      {variant === 'active' && <DimensionG x1={st.back.x} y1={st.back.y + H} x2={st.back.x} y2={st.back.y} value="85 mm" offset={-30} size={18} i={8} />}
      {variant === 'active' && <SpecColumnG x={400} y={740} w={280} rows={[{ k: 'Format', v: '55 × 85 mm' }, { k: 'Thickness', v: '0.8 mm' }]} rowH={34} size={17} />}
    </Plate>
  );
}
