// Flat goods: sticker sheet, pin card, coasters, desk mat with mouse pad (isometric), mouse pad, gift cards, carrier.
import { MARK_D, MarkG, MarkEmbossG, WordmarkG, LockupCornersG } from '@/components/art/Mark';
import { CrossingBandsG, LatticeFieldG, NodeGridG } from '@/components/art/KeyArt';
import { CastG, SheenG } from '@/components/art/Mockup';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { NEUTRAL, Stitch, Bar, url } from './kit';

const CD = { x: 0.6, y: 0.4 };

// ---- Sticker sheet, flat from above. Origin at its centre (260 x 330) ---------------------------------------------
export function StickerSheet({ id, m, cd = CD }) {
  const sheet = 'M-130 -165H130V125L90 165H-130Z';
  const dieMark = (x, y, k, fill) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${k})`}>
      <path d={MARK_D} fillRule="evenodd" fill="none" stroke={HEX.black} strokeWidth="7" opacity="0.14" transform="translate(1.5 2)" />
      <path d={MARK_D} fillRule="evenodd" fill={fill} stroke={HEX.lightBlue} strokeWidth="6" strokeLinejoin="round" paintOrder="stroke" />
    </g>
  );
  return (
    <g>
      <CastG idp={id} d={sheet} dir={cd} depth={14} />
      <clipPath id={`${id}-c`}>
        <path d={sheet} />
      </clipPath>
      <path d={sheet} fill={url(m, 'paper')} filter={url(m, 'fibre')} />
      <g clipPath={`url(#${id}-c)`}>
        {dieMark(-100, -140, 0.95, HEX.activeBlue)}
        <rect x="8" y="-130" width="116" height="32" fill={HEX.black} opacity="0.14" transform="translate(1.5 2)" />
        <rect x="8" y="-130" width="116" height="32" fill={HEX.darkBlue} />
        <WordmarkG x={66} y={-107} size={19} fill={HEX.onBlue} anchor="middle" />
        <g transform="translate(-112 -20)">
          <rect width="84" height="84" fill={HEX.black} opacity="0.14" transform="translate(1.5 2)" />
          <rect width="84" height="84" fill={HEX.darkBlue} />
          <LatticeFieldG cx={42} cy={42} k={0.9} rings={2} fill={HEX.activeBlue} />
        </g>
        <g transform="translate(-14 -20)">
          <rect width="84" height="84" fill={HEX.lightBlue} stroke={HEX.darkBlue} strokeWidth="1" />
          <NodeGridG cols={4} rows={4} size={21} seed={6} clusters={4} />
        </g>
        {[0, 1, 2].map((i) => dieMark(-104 + i * 50, 94, 0.36, HEX.darkBlue))}
        <g transform="translate(76 -20)">
          <rect width="44" height="84" fill={HEX.activeBlue} />
          <MarkG x={6} y={8} size={32} fill={HEX.darkBlue} />
          <WordmarkG x={22} y={66} size={9} fill={HEX.darkBlue} anchor="middle" />
        </g>
        <Stitch d="M-124 -154H124M-124 120H84" color={HEX.darkBlue} w={0.8} dash="2 5" opacity={0.25} />
        <path d="M130 125L90 165L112 118Z" fill={HEX.black} opacity="0.12" />
      </g>
      <path d="M130 125L90 165L118 134Z" fill={url(m, 'card')} />
      <path d="M130 125L90 165" stroke={HEX.black} strokeWidth="0.8" opacity="0.2" />
    </g>
  );
}

// ---- Pin card with an enamel pin. Origin at the centre of the card (150 x 200) ------------------------------------
export function PinCard({ id, m, sh, cd = CD }) {
  return (
    <g>
      <CastG idp={id} d="M-75 -100H75V100H-75Z" dir={cd} depth={14} />
      <rect x="-75" y="-100" width="150" height="200" fill={HEX.black} opacity="0.5" transform="translate(2 3)" />
      <rect x="-75" y="-100" width="150" height="200" fill={url(m, 'board-dark')} filter={url(m, 'fibre')} />
      <rect x="-75" y="-100" width="150" height="200" fill={sh} />
      <rect x="-8" y="-92" width="16" height="6" fill={HEX.black} opacity="0.8" />
      <Stitch d="M-66 -78H66V90H-66Z" color={HEX.activeBlue} w={0.8} dash="2 3" opacity={0.7} />
      <g transform="translate(-47 -62) scale(0.94)">
        <path d={MARK_D} fillRule="evenodd" fill={HEX.black} opacity="0.35" transform="translate(2 3)" />
        <path d={MARK_D} fillRule="evenodd" fill={HEX.activeBlue} stroke={NEUTRAL.steel} strokeWidth="4" strokeLinejoin="round" paintOrder="stroke" />
        <path d={MARK_D} fillRule="evenodd" fill={url(m, 'glass')} opacity="0.7" />
      </g>
      {[-1, 1].map((s) => (
        <circle key={s} cx={s * 38} cy={-3} r="3" fill={NEUTRAL.steel} />
      ))}
      <WordmarkG x={0} y={76} size={17} fill={HEX.onBlue} anchor="middle" />
      <SheenG idp={m} d="M-75 -100H75V100H-75Z" opacity={0.12} />
    </g>
  );
}

// ---- Square coaster, seen from above. Origin at its centre. kind: mark | lattice | word | cork -------------------
export function Coaster({ id, m, s = 100, kind = 'mark', cd = CD }) {
  const h = s / 2;
  const bg = { mark: HEX.darkBlue, lattice: HEX.activeBlue, word: HEX.lightBlue, cork: NEUTRAL.cork }[kind];
  return (
    <g>
      <CastG idp={id} d={`M${-h} ${-h}H${h}V${h}H${-h}Z`} dir={cd} depth={7} blur={3} />
      <rect x={-h + 1} y={-h + 4} width={s} height={s} fill={kind === 'cork' ? NEUTRAL.corkDark : NEUTRAL.cork} />
      <clipPath id={`${id}-c`}>
        <rect x={-h} y={-h} width={s} height={s} />
      </clipPath>
      <rect x={-h} y={-h} width={s} height={s} fill={bg} filter={url(m, kind === 'cork' ? 'grit' : 'fibre')} />
      <g clipPath={`url(#${id}-c)`}>
        {kind === 'mark' && <MarkG x={-h * 0.5} y={-h * 0.5} size={s * 0.5} fill={HEX.activeBlue} />}
        {kind === 'lattice' && <LatticeFieldG cx={0} cy={0} k={s / 90} rings={3} fill={HEX.darkBlue} />}
        {kind === 'word' && <WordmarkG x={0} y={s * 0.07} size={s * 0.22} fill={HEX.darkBlue} anchor="middle" />}
        {kind === 'cork' && [-30, 0, 30].map((y) => <rect key={y} x={-h} y={y} width={s} height="0.8" fill={HEX.black} opacity="0.12" />)}
      </g>
      <rect x={-h + 0.5} y={-h + 0.5} width={s - 1} height={s - 1} fill="none" stroke={HEX.white} strokeWidth="1" opacity="0.2" />
    </g>
  );
}

// ---- Isometric projection: screen point of (u, v, z) for origin (ox, oy) and scale sc -----------------------------
export const isoP = (ox, oy, sc = 0.72) => (u, v, z = 0) => [r2(ox + (u - v) * 0.866 * sc), r2(oy + (u + v) * 0.5 * sc - z)];

// A slab (mat, pad) in the iso view: two edge faces and a top face; children are drawn in the flat uv plane.
function IsoSlab({ P, sc, u0, v0, du, dv, z, th, edge, edge2, children }) {
  const poly = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('') + 'Z';
  const A = P(u0, v0 + dv, z), B = P(u0 + du, v0 + dv, z), C = P(u0 + du, v0, z), o = P(u0, v0, z);
  return (
    <g>
      <path d={poly([A, B, [B[0], r2(B[1] + th)], [A[0], r2(A[1] + th)]])} fill={edge} />
      <path d={poly([B, C, [C[0], r2(C[1] + th)], [B[0], r2(B[1] + th)]])} fill={edge2} />
      <g transform={`matrix(${r2(0.866 * sc)} ${r2(0.5 * sc)} ${r2(-0.866 * sc)} ${r2(0.5 * sc)} ${o[0]} ${o[1]})`}>{children}</g>
    </g>
  );
}

// ---- Desk mat 720 x 320 (units; 1.25 mm each) with a mouse pad on it ------------------------------------------------
export function DeskMat({ id, m, ox = 0, oy = 0, sc = 0.72 }) {
  const P = isoP(ox, oy, sc), U = 720, V = 320;
  const pad = { u0: 410, v0: 80, du: 180, dv: 150 };
  return (
    <g>
      <path d={`M${P(0, V, 0)}L${P(U, V, 0)}L${P(U, 0, 0)}L${P(U + 40, 0, 0)}L${P(U + 40, V + 40, 0)}L${P(0, V + 40, 0)}Z`} fill={HEX.black} opacity="0.5" filter={url(m, 'soft')} transform="translate(26 14)" />
      <IsoSlab P={P} sc={sc} u0={0} v0={0} du={U} dv={V} z={0} th={5} edge="#0d1026" edge2="#171b3b">
        <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1={U} y1="0" x2="0" y2={V}>
          <stop offset="0" stopColor={HEX.white} stopOpacity="0.16" />
          <stop offset="0.5" stopColor={HEX.white} stopOpacity="0" />
          <stop offset="1" stopColor={HEX.black} stopOpacity="0.4" />
        </linearGradient>
        <rect width={U} height={V} fill={HEX.darkBlue} filter={url(m, 'weave')} />
        <CrossingBandsG idp={`${id}-x`} w={U} h={V} cx={0.45} cy={0.5} a1={72} a2={-14} band={0.026} r={0.05} />
        <Stitch d={`M10 10H${U - 10}V${V - 10}H10Z`} color={HEX.onBlue} w={1.4} dash="7 5" />
        <WordmarkG x={34} y={V - 34} size={46} fill={HEX.onBlue} />
        <MarkG x={U - 92} y={26} size={58} fill={HEX.onBlue} />
        {[[10, 10], [U - 10, 10], [10, V - 10], [U - 10, V - 10]].map(([x, y]) => (
          <rect key={`${x}${y}`} x={x - 5} y={y - 5} width="10" height="10" fill={HEX.activeBlue} />
        ))}
        <rect width={U} height={V} fill={`url(#${id}-g)`} />
      </IsoSlab>
      <g transform="translate(14 -7)" opacity="0.5">
        <path d={`M${P(pad.u0, pad.v0 + pad.dv, 5)}L${P(pad.u0 + pad.du, pad.v0 + pad.dv, 5)}L${P(pad.u0 + pad.du, pad.v0, 5)}L${P(pad.u0 + pad.du + 18, pad.v0 - 4, 5)}L${P(pad.u0 + pad.du + 18, pad.v0 + pad.dv + 18, 5)}L${P(pad.u0, pad.v0 + pad.dv + 18, 5)}Z`} fill={HEX.black} filter={url(m, 'soft')} />
      </g>
      <IsoSlab P={P} sc={sc} {...pad} z={5} th={7} edge={NEUTRAL.rubber} edge2="#0e1124">
        <rect width={pad.du} height={pad.dv} fill={HEX.activeBlue} filter={url(m, 'weave')} />
        <MarkG x={pad.du / 2 - 36} y={pad.dv / 2 - 52} size={72} fill={HEX.darkBlue} />
        <WordmarkG x={pad.du / 2} y={pad.dv - 22} size={22} fill={HEX.darkBlue} anchor="middle" />
        <Stitch d={`M6 6H${pad.du - 6}V${pad.dv - 6}H6Z`} color={HEX.darkBlue} w={1.2} dash="5 4" opacity={0.6} />
        <rect width={pad.du} height={pad.dv} fill={`url(#${id}-g)`} opacity="0.7" />
      </IsoSlab>
    </g>
  );
}

// ---- Mouse pad from above with a rubber base. Origin at its centre (200 x 170) ---------------------------------------
export function MousePad({ id, m, sh, cd = CD }) {
  return (
    <g>
      <CastG idp={id} d="M-100 -85H100V85H-100Z" dir={cd} depth={16} />
      <rect x="-100" y="-80" width="200" height="170" fill={NEUTRAL.rubber} />
      <clipPath id={`${id}-c`}>
        <rect x="-100" y="-85" width="200" height="170" />
      </clipPath>
      <rect x="-100" y="-85" width="200" height="170" fill={HEX.darkBlue} filter={url(m, 'weave')} />
      <g clipPath={`url(#${id}-c)`}>
        <CrossingBandsG idp={`${id}-x`} x={-100} y={-85} w={200} h={170} cx={0.5} cy={0.5} a1={72} a2={-18} band={0.03} r={0.08} />
        <MarkG x={-26} y={-52} size={52} fill={HEX.onBlue} />
        <WordmarkG x={0} y={52} size={20} fill={HEX.onBlue} anchor="middle" />
        <rect x="-100" y="-85" width="200" height="170" fill={sh} />
      </g>
      <Stitch d="M-92 -77H92V77H-92Z" color={HEX.onBlue} w={1.1} dash="5 4" />
      <path d="M-100 85V90H100V85" fill="none" stroke={HEX.white} strokeWidth="0.8" opacity="0.2" />
    </g>
  );
}

// ---- Gift card front (the card back of m05: word-mark top right, embossed mark bottom left, the card line) ---------------
export const CARD = { w: 255, h: 165 };
export function GiftFront({ id, m, sh, cd = CD }) {
  const { w, h } = CARD;
  return (
    <g>
      <CastG idp={id} d={`M${-w / 2} ${-h / 2}H${w / 2}V${h / 2}H${-w / 2}Z`} dir={cd} depth={12} />
      <rect x={-w / 2 + 1} y={-h / 2 + 3} width={w} height={h} fill="#0d1026" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={url(m, 'plastic')} filter={url(m, 'fibre')} />
      <LockupCornersG x={-w / 2} y={-h / 2} w={w} h={h} fill={HEX.onBlue} markFill={HEX.darkBlue} />
      <MarkEmbossG idp={`${id}-e`} x={-w / 2 + w * 0.07} y={h / 2 - h * 0.2 - 34} size={34} paper={HEX.darkBlue} light="#5a64a6" shade={HEX.black} />
      <text x={w / 2 - 17} y={h / 2 - 17} fontSize="8.5" fill={HEX.activeBlue} textAnchor="end" lang="es">{LINES.card}</text>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={sh} opacity="0.55" />
      <SheenG idp={m} d={`M${-w / 2} ${-h / 2}H${w / 2}V${h / 2}H${-w / 2}Z`} opacity={0.2} />
    </g>
  );
}

// ---- Gift card back: quiet pale bars for value, number and code (the case study prints none) ------------------------------
export function GiftBack({ id, m, sh, cd = CD }) {
  const { w, h } = CARD, x0 = -w / 2 + 20;
  return (
    <g>
      <CastG idp={id} d={`M${-w / 2} ${-h / 2}H${w / 2}V${h / 2}H${-w / 2}Z`} dir={cd} depth={12} />
      <rect x={-w / 2 + 1} y={-h / 2 + 3} width={w} height={h} fill="#aab2c6" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={url(m, 'card')} filter={url(m, 'fibre')} />
      <rect x={-w / 2} y={-h / 2 + 22} width={w} height="26" fill={HEX.darkBlue} />
      <Bar x={x0} y={-h / 2 + 68} w={80} h={12} fill={HEX.darkBlue} opacity={0.14} />
      {[0, 1, 2, 3].map((i) => (
        <Bar key={i} x={x0 + i * 52} y={-h / 2 + 96} w={42} h={9} fill={HEX.darkBlue} opacity={0.14} />
      ))}
      <Bar x={x0} y={-h / 2 + 118} w={64} h={7} fill={HEX.darkBlue} opacity={0.1} />
      <MarkG x={w / 2 - 54} y={h / 2 - 54} size={34} fill={HEX.darkBlue} />
      <text x={x0} y={h / 2 - 20} fontSize="10" fill={HEX.darkBlue}>bestgrid.com</text>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={sh} opacity="0.7" />
      <SheenG idp={m} d={`M${-w / 2} ${-h / 2}H${w / 2}V${h / 2}H${-w / 2}Z`} opacity={0.14} />
    </g>
  );
}

// ---- Carrier opened flat: card slots left, crossing bands right. Origin at the fold (two panels of 250 x 170) ------------
export function Carrier({ id, m, sh, cd = CD, card = true }) {
  const pw = 250, ph = 170;
  return (
    <g>
      <CastG idp={id} d={`M${-pw} ${-ph / 2}H${pw}V${ph / 2}H${-pw}Z`} dir={cd} depth={14} />
      <rect x={-pw} y={-ph / 2 + 2} width={pw * 2} height={ph} fill="#aab2c6" />
      <rect x={-pw} y={-ph / 2} width={pw} height={ph} fill={url(m, 'paper')} filter={url(m, 'fibre')} />
      <rect x="0" y={-ph / 2} width={pw} height={ph} fill={HEX.darkBlue} filter={url(m, 'fibre')} />
      <CrossingBandsG idp={`${id}-x`} x={0} y={-ph / 2} w={pw} h={ph} cx={0.5} cy={0.5} a1={72} a2={-20} band={0.034} r={0.1} />
      <WordmarkG x={pw - 18} y={-ph / 2 + 36} size={22} fill={HEX.onBlue} anchor="end" />
      <MarkG x={18} y={ph / 2 - 56} size={38} fill={HEX.onBlue} />
      {card && (
        <g transform="translate(-125 12) scale(0.62)">
          <GiftFront id={`${id}-k`} m={m} sh={sh} cd={{ x: 0.2, y: 0.2 }} />
        </g>
      )}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => {
        const cx = -125 + sx * 79, cy = 12 + sy * 51;
        const d = `M${cx + sx * 4} ${cy + sy * 4}L${cx - sx * 26} ${cy + sy * 4}L${cx + sx * 4} ${cy - sy * 26}Z`;
        return (
          <g key={`${sx}${sy}`}>
            <path d={d} fill={HEX.black} opacity="0.25" transform="translate(1 1.5)" />
            <path d={d} fill={url(m, 'paper')} stroke={HEX.darkBlue} strokeWidth="0.8" strokeOpacity="0.5" />
          </g>
        );
      })}
      <text x={-pw + 20} y={-ph / 2 + 30} fontSize="10" fill={HEX.darkBlue} lang="es">{LINES.mailer}</text>
      <rect x="-26" y={-ph / 2} width="26" height={ph} fill={url(m, 'shade-r')} />
      <rect x="0" y={-ph / 2} width="30" height={ph} fill={url(m, 'shade')} opacity="0.9" />
      <path d={`M0 ${-ph / 2}V${ph / 2}`} stroke={HEX.black} strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />
      <rect x={-pw} y={-ph / 2} width={pw * 2} height={ph} fill={sh} opacity="0.8" />
    </g>
  );
}
