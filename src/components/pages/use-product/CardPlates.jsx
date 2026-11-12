// The site access card in three colourways, each plate showing the front over the back. Card 55 x 85 mm (our own
// production values), square corners, a painted edge. Front: mark, word-mark, contactless arcs, the lattice.
// Back: a dark strip, the small word-mark, the contact details of the brand and pale bars where a name or a number
// would go. No names, numbers, dates or codes are invented.
import { r2 } from '@/lib/charts';
import { HEX, CONTACT } from '@/lib/brand';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { LatticeFieldG } from '@/components/art/KeyArt';
import { CalloutG, DimensionG, SpecColumnG, CastG, SheenG } from '@/components/art/Mockup';
import { Plate } from './plate';

const W = 250, H = 386, COL = 72; // card in design units; the left column is 29% of the width, as on the badge (m08)

const VARIANTS = {
  light: { name: 'card-light', face: 'card', edge: HEX.activeBlue, word: HEX.activeBlue, mark: HEX.activeBlue, line: HEX.activeBlue, lat: HEX.activeBlue, latO: 0.16, strip: HEX.darkBlue, text: HEX.darkBlue, bar: HEX.darkBlue, tone: 'Light grey-blue card, Active Blue print' },
  dark: { name: 'card-dark', face: 'board-dark', edge: HEX.activeBlue, word: HEX.lightBlue, mark: HEX.activeBlue, line: HEX.activeBlue, lat: HEX.activeBlue, latO: 0.2, strip: '#06070f', text: HEX.lightBlue, bar: HEX.lightBlue, tone: 'Dark Blue card, Light Blue word-mark' },
  active: { name: 'card-active', face: 'board', edge: HEX.darkBlue, word: HEX.onBlue, mark: HEX.darkBlue, line: HEX.darkBlue, lat: HEX.darkBlue, latO: 0.14, strip: HEX.darkBlue, text: HEX.darkBlue, bar: HEX.darkBlue, tone: 'Active Blue card, Dark Blue print' },
};

const arcs = (cx, cy) => [9, 17, 25, 33].map((r) => {
  const a = 0.85, p = (t) => `${r2(cx + r * Math.cos(t))} ${r2(cy + r * Math.sin(t))}`;
  return `M${p(-a)}A${r} ${r} 0 0 1 ${p(a)}`;
}).join('');

function FrontArt({ idp, id, v }) {
  return (
    <g>
      <clipPath id={`${idp}-${id}-lat`}><rect x={COL} y="0" width={W - COL} height="300" /></clipPath>
      <g clipPath={`url(#${idp}-${id}-lat)`}><LatticeFieldG cx={196} cy={150} k={3.1} rings={4} fill={v.lat} opacity={v.latO} /></g>
      <rect x={COL - 0.4} y="0" width="0.8" height={H} fill={v.line} opacity="0.7" />
      <rect x={COL} y="299.6" width={W - COL} height="0.8" fill={v.line} opacity="0.7" />
      <rect x={COL - 3} y="297" width="6" height="6" fill={v.line} />
      <WordmarkG x={8} y={36} size={13.6} fill={v.word} />
      <MarkG x={10} y={324} size={46} fill={v.mark} />
      <path d={arcs(188, 344)} fill="none" stroke={v.word} strokeWidth="3.4" opacity="0.95" />
    </g>
  );
}

function BackArt({ v }) {
  return (
    <g>
      <rect x="0" y="52" width={W} height="62" fill={v.strip} />
      <WordmarkG x={14} y={34} size={11} fill={v.word} />
      <rect x={COL - 0.4} y="114" width="0.8" height={H - 114} fill={v.line} opacity="0.7" />
      <rect x={COL - 3} y="111" width="6" height="6" fill={v.line} />
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
        {side === 'front' ? <FrontArt idp={idp} id={id} v={v} /> : <BackArt v={v} />}
        <rect width={W} height={H} fill={`url(#${idp}-shade-v)`} opacity="0.3" />
      </g>
      <rect width={W} height={H} fill="none" stroke="#ffffff" strokeOpacity="0.28" />
      {side === 'front' && <SheenG idp={idp} d={`M0 0H${W}V${H * 0.45}L0 ${H * 0.7}Z`} opacity={0.22} />}
    </g>
  );
}

const rot = (c, u, v) => { const a = (c.r * Math.PI) / 180; return [r2(c.x + u * Math.cos(a) - v * Math.sin(a)), r2(c.y + u * Math.sin(a) + v * Math.cos(a))]; };
const outline = (c) => { const a = (c.r * Math.PI) / 180, p = [[0, 0], [W, 0], [W, H], [0, H]].map(([u, v]) => rot(c, u, v)); return `M${p.map((q) => q.join(' ')).join('L')}Z`; };

// Each colourway is staged differently: where the cards lie, how they turn, where the spot is and where the callouts go.
const STAGING = {
  light: { spot: { x: 0.22, y: 0.14 }, split: 0.5, back: { x: 380, y: 110, r: 5 }, front: { x: 70, y: 340, r: -4 }, cast: { x: 0.6, y: 0.7 },
    rows: (b, f) => [['Dark strip', rot(b, 60, 80), 150, 'left', 350], ['Pale bars for a name and number', rot(b, 150, 150), 225, 'left', 350], ['Contact details', rot(b, 130, 300), 300, 'left', 350], ['Lattice', rot(f, 210, 120), 560, 'right', 380], ['Contactless symbol', rot(f, 190, 344), 690, 'right', 380]] },
  dark: { spot: { x: 0.8, y: 0.14 }, split: 0.5, back: { x: 70, y: 110, r: -6 }, front: { x: 380, y: 330, r: 3 }, cast: { x: -0.6, y: 0.7 },
    rows: (b, f) => [['Dark strip', rot(b, 180, 85), 150, 'right', 370], ['Contact details', rot(b, 200, 300), 260, 'right', 370], ['Lattice', rot(f, 20, 120), 560, 'left', 350], ['Mark', rot(f, 33, 347), 690, 'left', 350]] },
  active: { spot: { x: 0.5, y: 0.05 }, split: 0.5, back: { x: 235, y: 36, r: 0 }, front: { x: 235, y: 410, r: 0 }, cast: { x: 0.2, y: 0.9 },
    rows: (b, f) => [['Painted edge', rot(b, 252, 200), 160, 'right', 560], ['Word-mark', rot(f, 70, 30), 440, 'left', 200], ['Contactless symbol', rot(f, 188, 344), 690, 'right', 560]] },
};

export function CardPlate({ variant }) {
  const v = VARIANTS[variant], st = STAGING[variant], idp = `use-product-${v.name}`;
  const pile = variant === 'active';
  return (
    <Plate idp={idp} w={720} h={900} name={v.name} title={`The site access card, ${v.tone}: front over back`} spot={st.spot} split={0} no={variant === 'light' ? '09' : variant === 'dark' ? '10' : '11'}>
      <CastG idp={`${idp}-c1`} d={outline(st.back)} dir={st.cast} depth={16} opacity={0.55} blur={7} />
      {pile && [12, 8, 4].map((o) => <rect key={o} x={st.front.x + 1 + o / 4} y={st.front.y + H + o} width={W} height="3" fill={v.edge} opacity={r2(1 - o / 20)} />)}
      <Card idp={idp} id="back" v={v} side="back" {...st.back} />
      <CastG idp={`${idp}-c2`} d={outline(st.front)} dir={st.cast} depth={20} opacity={0.6} blur={8} />
      <Card idp={idp} id="front" v={v} side="front" {...st.front} />
      {st.rows(st.back, st.front).map(([label, p, ty, side, tx], i) => <CalloutG key={label} label={label} x={p[0]} y={p[1]} tx={tx} ty={ty} side={side} i={i} />)}
      {variant === 'active' && <DimensionG x1={st.front.x} y1={st.front.y + H} x2={st.front.x + W} y2={st.front.y + H} value="55 mm" offset={46} i={7} />}
      {variant === 'active' && <DimensionG x1={st.front.x} y1={st.front.y} x2={st.front.x} y2={st.front.y + H} value="85 mm" offset={36} i={8} />}
      {variant === 'dark' && <SpecColumnG x={380} y={780} w={290} rows={[{ k: 'Format', v: '55 × 85 mm' }, { k: 'Thickness', v: '0.8 mm' }]} rowH={34} />}
    </Plate>
  );
}
