// Soft goods drawn as functions with colour parameters: tote, socks, umbrella (from below and from the side),
// woven patch, keychain. Each returns a group in its own local space; plates place it with <At>.
import { MarkG, WordmarkG, WORDMARK } from '@/components/art/Mark';
import { LatticeFieldG, NodeGridG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { FAB, NEUTRAL, Stitch, Print, url } from './kit';

// ---- Tote: origin at the top centre of the body, hanging from a bar `drop` units above -------------------------
export function Tote({ id, m, sh, fab = 'dark', drop = 120 }) {
  const f = FAB[fab];
  const body = 'M-100 0H100L104 226Q0 240 -104 226Z';
  const strap = `M-62 8C-62 -64 -10 -${drop} 0 -${drop}C10 -${drop} 62 -64 62 8`;
  return (
    <g>
      <path d={strap} fill="none" stroke={f.edge} strokeWidth="19" />
      <path d={strap} fill="none" stroke={f.solid} strokeWidth="15" />
      <Stitch d={strap} color={f.word} w={1} dash="3 3" opacity={0.5} />
      <clipPath id={`${id}-c`}>
        <path d={body} />
      </clipPath>
      <path d={body} fill={url(m, f.fill)} filter={url(m, 'weave')} />
      <g clipPath={`url(#${id}-c)`}>
        <Print cx={0} y={66} s={66} mark={f.ink} word={f.word} />
        {[-70, -12, 46].map((x) => (
          <rect key={x} x={x} y="0" width="22" height="240" fill={HEX.black} opacity="0.07" />
        ))}
        <path d={body} fill={sh} />
        <path d={body} fill={url(m, 'shade-v')} />
        <rect x="-110" y="0" width="220" height="14" fill={HEX.black} opacity="0.12" />
      </g>
      <path d={body} fill="none" stroke={HEX.white} strokeWidth="1" opacity="0.14" />
      <Stitch d="M-100 20H100" color={f.word} />
      <Stitch d="M-98 218Q0 232 98 218" color={f.word} opacity={0.5} />
      {[-62, 62].map((x) => (
        <g key={x}>
          <rect x={x - 13} y="-4" width="26" height="46" fill="none" stroke={f.word} strokeWidth="1.1" strokeDasharray="4 3" opacity="0.8" />
          <path d={`M${x - 13} -4L${x + 13} 42M${x + 13} -4L${x - 13} 42`} stroke={f.word} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        </g>
      ))}
    </g>
  );
}

// ---- Sock: flat, leg up, foot right. Origin at the top centre of the cuff -----------------------------------
const SOCK_D = 'M-32 0H32V150Q32 176 58 190L112 214Q138 226 138 252V270Q138 282 122 282H-8Q-36 282 -36 252Z';
export function Sock({ id, m, body = HEX.darkBlue, accent = HEX.activeBlue, ink = HEX.activeBlue }) {
  return (
    <g>
      <clipPath id={`${id}-c`}>
        <path d={SOCK_D} />
      </clipPath>
      <pattern id={`${id}-knit`} width="4" height="4" patternUnits="userSpaceOnUse">
        <path d="M0 1.5H4M1 3L2 4M3 3L2 4" stroke={HEX.black} strokeWidth="0.7" opacity="0.22" fill="none" />
      </pattern>
      <path d={SOCK_D} fill={body} />
      <g clipPath={`url(#${id}-c)`}>
        <rect x="-40" y="0" width="80" height="30" fill={accent} opacity="0.9" />
        {[-24, -12, 0, 12, 24].map((x) => (
          <path key={x} d={`M${x} 0V30`} stroke={HEX.black} strokeWidth="1.2" opacity="0.25" />
        ))}
        <rect x="-40" y="40" width="80" height="6" fill={accent} />
        <rect x="-40" y="52" width="80" height="3" fill={accent} />
        <MarkG x={-22} y={78} size={44} fill={ink} />
        <path d="M-40 208Q-4 206 20 240Q40 270 36 290H-40Z" fill={accent} />
        <rect x="110" y="200" width="40" height="92" fill={accent} />
        <rect x="-40" y="0" width="190" height="300" fill={`url(#${id}-knit)`} />
        <rect x="-40" y="0" width="190" height="300" fill={url(m, 'shade-v')} />
        <path d="M-32 0V240" stroke={HEX.black} strokeWidth="14" opacity="0.1" />
      </g>
      <path d="M-32 30H32" stroke={HEX.black} strokeWidth="1" opacity="0.4" />
    </g>
  );
}

// ---- Umbrella from below: octagonal canopy, ribs, hub. Origin at the hub ------------------------------------------
export function UmbrellaBelow({ id, m, R = 170, c1 = HEX.darkBlue, c2 = HEX.activeBlue, lx = -0.3, ly = -0.35 }) {
  const ang = (i) => ((-90 + i * 45) * Math.PI) / 180;
  const pt = (i, rr) => [r2(Math.cos(ang(i)) * rr), r2(Math.sin(ang(i)) * rr)];
  const edge = (i) => {
    const [x0, y0] = pt(i, R), [x1, y1] = pt(i + 1, R), a = ang(i + 0.5);
    return `M${x0} ${y0}Q${r2(Math.cos(a) * R * 0.9)} ${r2(Math.sin(a) * R * 0.9)} ${x1} ${y1}`;
  };
  const panel = (i) => `M0 0L${edge(i).slice(1)}Z`;
  const all = Array.from({ length: 8 }, (_, i) => panel(i));
  return (
    <g>
      <radialGradient id={`${id}-rg`} gradientUnits="userSpaceOnUse" cx={r2(lx * R)} cy={r2(ly * R)} r={r2(R * 1.5)}>
        <stop offset="0" stopColor={HEX.white} stopOpacity="0.3" />
        <stop offset="0.5" stopColor={HEX.black} stopOpacity="0" />
        <stop offset="1" stopColor={HEX.black} stopOpacity="0.5" />
      </radialGradient>
      <clipPath id={`${id}-c`}>
        <path d={all.join('')} />
      </clipPath>
      {all.map((d, i) => (
        <path key={i} d={d} fill={i % 2 ? c2 : c1} />
      ))}
      <g clipPath={`url(#${id}-c)`}>
        {[0, 2, 4, 6].map((i) => {
          const [px, py] = pt(i + 0.5, R * 0.6);
          return (
            <g key={i} transform={`translate(${px} ${py}) rotate(${r2(((-90 + (i + 0.5) * 45 + 90) * 1))})`}>
              <MarkG x={-17} y={-17} size={34} fill={c2} />
            </g>
          );
        })}
        <rect x={-R} y={-R} width={R * 2} height={R * 2} fill={`url(#${id}-rg)`} />
      </g>
      {all.map((d, i) => (
        <path key={`e${i}`} d={edge(i)} fill="none" stroke={HEX.black} strokeWidth="5" opacity="0.28" />
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const [x, y] = pt(i, R);
        return (
          <g key={i}>
            <path d={`M0 0L${x} ${y}`} stroke={NEUTRAL.steel} strokeWidth="3" />
            <path d={`M0 0L${x} ${y}`} stroke={HEX.white} strokeWidth="0.8" opacity="0.5" />
            <rect x={r2(x - 3)} y={r2(y - 3)} width="6" height="6" fill={NEUTRAL.steel} />
          </g>
        );
      })}
      <circle r="17" fill={NEUTRAL.steel} />
      <circle r="10" fill={NEUTRAL.steelDark} />
      <circle r="4" fill={HEX.darkBlue} />
    </g>
  );
}

// ---- Umbrella from the side, open. Origin at the rim centre; canopy half-width 170 ---------------------------------
export function UmbrellaSide({ id, m, sh, c1 = HEX.darkBlue, c2 = HEX.activeBlue }) {
  const xs = [-170, -85, 0, 85, 170];
  const seam = (x) => `${x * 0.93} -100`;
  const panel = (i) => {
    const a = xs[i], b = xs[i + 1];
    return `M0 -150Q${seam(a)} ${a} 0Q${(a + b) / 2} -26 ${b} 0Q${seam(b)} 0 -150Z`;
  };
  const all = [0, 1, 2, 3].map(panel);
  return (
    <g>
      <rect x="-4" y="-150" width="8" height="370" fill={url(m, 'metal')} />
      <path d="M-4 -150L0 -176L4 -150Z" fill={NEUTRAL.steel} />
      <path d="M0 214C0 252 40 252 40 226" fill="none" stroke={HEX.darkBlue} strokeWidth="14" />
      <path d="M0 214C0 252 40 252 40 226" fill="none" stroke={HEX.white} strokeWidth="2" opacity="0.2" transform="translate(-3 -2)" />
      <clipPath id={`${id}-c`}>
        <path d={all.join('')} />
      </clipPath>
      {all.map((d, i) => (
        <path key={i} d={d} fill={i % 2 ? c2 : c1} />
      ))}
      <g clipPath={`url(#${id}-c)`}>
        <g transform="translate(42 -66) scale(0.8 1)">
          <MarkG x={-17} y={-17} size={34} fill={c2} />
        </g>
        <rect x="-175" y="-160" width="350" height="170" fill={sh} />
        <rect x="-175" y="-160" width="350" height="170" fill={url(m, 'shade-v')} />
      </g>
      {xs.map((x) => (
        <rect key={x} x={x * 0.99 - 3} y="-3" width="6" height="6" fill={NEUTRAL.steel} />
      ))}
    </g>
  );
}

// ---- Woven patch with a merrowed edge. Origin at its centre. kind: mark | word | lattice | nodes ---------------------
const PATCHES = {
  mark: { bg: HEX.darkBlue, edge: HEX.activeBlue },
  word: { bg: HEX.activeBlue, edge: HEX.darkBlue },
  lattice: { bg: HEX.lightBlue, edge: HEX.darkBlue },
  nodes: { bg: HEX.darkBlue, edge: HEX.lightBlue },
};
export function Patch({ id, m, sh, s = 90, kind = 'mark' }) {
  const c = PATCHES[kind], h = s / 2;
  return (
    <g>
      <clipPath id={`${id}-c`}>
        <rect x={-h} y={-h} width={s} height={s} />
      </clipPath>
      <rect x={-h - 1} y={-h + 3} width={s + 2} height={s} fill={HEX.black} opacity="0.35" />
      <rect x={-h} y={-h} width={s} height={s} fill={c.bg} filter={url(m, 'weave')} />
      <g clipPath={`url(#${id}-c)`}>
        {kind === 'mark' && <MarkG x={-h * 0.6} y={-h * 0.6} size={s * 0.6} fill={HEX.activeBlue} />}
        {kind === 'word' && <WordmarkG x={0} y={r2(s * 0.08)} size={r2(s * 0.21)} fill={HEX.onBlue} anchor="middle" />}
        {kind === 'lattice' && <LatticeFieldG cx={0} cy={0} k={r2(s / 90)} rings={3} fill={HEX.activeBlue} />}
        {kind === 'nodes' && <NodeGridG x={-h * 0.72} y={-h * 0.72} cols={5} rows={5} size={r2(s * 0.29)} seed={4} clusters={4} line="rgba(228,231,239,0.3)" />}
        <rect x={-h} y={-h} width={s} height={s} fill={sh} />
      </g>
      <rect x={-h + 3.5} y={-h + 3.5} width={s - 7} height={s - 7} fill="none" stroke={c.edge} strokeWidth="7" />
      <rect x={-h + 3.5} y={-h + 3.5} width={s - 7} height={s - 7} fill="none" stroke={HEX.black} strokeWidth="7" strokeDasharray="1.2 1.2" opacity="0.28" />
      <Stitch d={`M${-h + 9} ${-h + 9}H${h - 9}V${h - 9}H${-h + 9}Z`} color={c.edge} w={0.9} dash="3 2.5" opacity={0.55} />
    </g>
  );
}

// ---- Keychain: split ring, chain, tag. Origin at the top of the ring -----------------------------------------------
export function Keychain({ m, sh, tag = HEX.darkBlue, ink = HEX.activeBlue }) {
  return (
    <g>
      <circle cx="0" cy="16" r="15" fill="none" stroke={NEUTRAL.steelDark} strokeWidth="5" />
      <circle cx="0" cy="16" r="15" fill="none" stroke={NEUTRAL.steel} strokeWidth="2.4" />
      {[44, 62, 80].map((y, i) => (
        <rect key={y} x={i % 2 ? -6 : -3.5} y={y} width={i % 2 ? 12 : 7} height={i % 2 ? 7 : 16} fill="none" stroke={NEUTRAL.steel} strokeWidth="2.6" />
      ))}
      <rect x="-36" y="100" width="72" height="92" fill={HEX.black} opacity="0.4" transform="translate(4 5)" />
      <rect x="-36" y="100" width="72" height="92" fill={tag} />
      <rect x="-36" y="100" width="72" height="92" fill={url(m, 'plastic')} opacity="0.7" />
      <MarkG x={-23} y={128} size={46} fill={ink} />
      <rect x="-5" y="106" width="10" height="10" fill={HEX.black} />
      <rect x="-36" y="100" width="72" height="92" fill={sh} />
      <rect x="-36" y="100" width="72" height="2" fill={HEX.white} opacity="0.35" />
      <WordmarkG x={0} y={181} size={11} fill={HEX.onBlue} anchor="middle" />
      <path d="M0 104V100" stroke={NEUTRAL.steelDark} strokeWidth="3" />
      <rect x={-6} y={92} width="12" height="13" fill="none" stroke={NEUTRAL.steel} strokeWidth="2.6" />
    </g>
  );
}
