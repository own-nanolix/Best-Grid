// Shared parts of the accessories plates: colours, the plate shell, and small drawing helpers.
// Every plate is one <Art> SVG: stage, materials, plate furniture, objects, callouts.
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, PlateFrameG, LitG } from '@/components/art/Mockup';
import { MarkG, WordmarkG, WORDMARK } from '@/components/art/Mark';
import { HEX, mixHex } from '@/lib/brand';
import { r2 } from '@/lib/charts';

export const ID = 'use-accessories';

// Neutral tones for metal, cork and rubber (rule: palette plus neutrals); everything else is the published palette.
export const NEUTRAL = { steel: mixHex(HEX.cardGrey, HEX.darkBlue, 0.2), steelDark: mixHex(HEX.cardGrey, HEX.darkBlue, 0.45), cork: mixHex(HEX.warmGrey, HEX.sunset, 0.3), corkDark: mixHex(mixHex(HEX.warmGrey, HEX.sunset, 0.3), HEX.plum, 0.25), rubber: mixHex(HEX.stage, HEX.muted, 0.3), thread: HEX.onBlue };

// Fabric options: the material fill id (from MaterialDefs), a solid for straps and edges, the ink printed on it.
export const FAB = {
  dark: { fill: 'fabric-dark', solid: HEX.darkBlue, edge: mixHex(HEX.stage, HEX.activeBlue, 0.05), ink: HEX.activeBlue, word: HEX.onBlue },
  active: { fill: 'fabric-blue', solid: HEX.activeBlue, edge: mixHex(HEX.activeBlue, HEX.blueInk, 0.65), ink: HEX.darkBlue, word: HEX.onBlue },
  light: { fill: 'paper', solid: HEX.lightBlue, edge: mixHex(HEX.paper, HEX.stageLight, 0.3), ink: HEX.darkBlue, word: HEX.darkBlue },
};

export const url = (m, n) => `url(#${m}-${n})`;

// Mix two hex colours (t = 0 gives a, 1 gives b).
export function mix(a, b, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
}

// A round body's horizontal shading: darker at the edges, the highlight at fraction `hl` (towards the spot).
export function Cyl({ id, base, hl = 0.3, gloss = 0.5 }) {
  const hi = mix(base, HEX.white, gloss), lo = mix(base, HEX.black, 0.5);
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor={hl < 0.5 ? mix(base, HEX.black, 0.18) : lo} />
      <stop offset={r2(hl)} stopColor={hi} />
      <stop offset={r2(Math.min(0.95, hl + 0.22))} stopColor={base} />
      <stop offset="1" stopColor={hl < 0.5 ? lo : mix(base, HEX.black, 0.18)} />
    </linearGradient>
  );
}

// Place an object: translate, rotate, scale (attributes only; animation classes live on inner groups).
export function At({ x = 0, y = 0, k = 1, rot = 0, children, ...rest }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) rotate(${rot}) scale(${k})`} {...rest}>
      {children}
    </g>
  );
}

// A seam or stitch line (dashed stroke).
export function Stitch({ d, color = NEUTRAL.thread, w = 1.2, dash = '5 4', opacity = 0.75, ...rest }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeDasharray={dash} opacity={opacity} {...rest} />;
}

// The mark above the word-mark, centred at cx; s = mark size. The one print used on most objects.
export function Print({ cx = 0, y = 0, s = 60, mark, word, wordSize, gap = 0.3 }) {
  const ws = wordSize || r2(s * 0.34);
  return (
    <g>
      <MarkG x={r2(cx - s / 2)} y={y} size={s} fill={mark} />
      {word && <WordmarkG x={cx} y={r2(y + s + s * gap + ws * WORDMARK.cap)} size={ws} fill={word} anchor="middle" />}
    </g>
  );
}

// Pale placeholder bar (quiet field, no value).
export function Bar({ x, y, w, h = 8, fill = HEX.onBlue, opacity = 0.5 }) {
  return <rect x={r2(x)} y={r2(y)} width={r2(w)} height={h} fill={fill} opacity={opacity} />;
}

// The plate shell. children receives { idp, sh(x), W, H } so objects can pick the shade that faces the spotlight.
export function Plate({ name, title, w, h, spot, floor = 0.72, split, no, intensity = 1, children }) {
  const idp = `${ID}-${name}`;
  const sh = (x) => url(idp, spot.x * w < x ? 'shade' : 'shade-r');
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={idp}>
      <StageG idp={idp} w={w} h={h} spot={spot} floor={floor} intensity={intensity} />
      <MaterialDefs idp={idp} />
      <PlateFrameG w={w} h={h} m={w > 500 ? 22 : 14} split={split} no={no} />
      {children({ idp, sh, w, h, spot })}
    </Art>
  );
}

export { LitG };
