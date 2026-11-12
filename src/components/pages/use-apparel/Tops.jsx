// Garments that cover the body, each a function with colour parameters: the t-shirt (front and back), the hoodie
// and the high-visibility vest. All are drawn empty (no body inside), lit by the one spotlight of the plate.
// Light comes in as `spot` (plate space) and `t` = { x, y, s, rot }; every id starts with the plate's `id`.
import { CastG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { ArtG, EyeletG, FoldsG, LightG, RibPoly, RibStroke, SeamG, place } from './fabric';

// ---------------------------------------------------------------------------------------------------------------
// T-shirt: a 400 x 360 box, body 240 wide (a 520 mm chest at our 2.17 mm per unit).
export const TEE_F = 'M146 18L66 50L14 150L80 176L84 190L80 350L320 350L316 190L320 176L386 150L334 50L254 18Q200 78 146 18Z';
export const TEE_B = 'M146 18L66 50L14 150L80 176L84 190L80 350L320 350L316 190L320 176L386 150L334 50L254 18Q200 38 146 18Z';
export const TEE_BOX = { w: 400, h: 360 };

// The artwork of the three colourways (same marks everywhere; only the colours change).
export function teeArt(variant, ink, ink2) {
  const lattice = { k: 'lattice', cx: 200, cy: 172, kk: 1.68, rings: 3, fill: ink2 };
  if (variant === 'a') {
    return {
      front: [{ k: 'mark', x: 242, y: 58, size: 39, fill: ink }],
      back: [lattice, { k: 'word', x: 200, y: 62, size: 12, fill: ink, anchor: 'middle' }],
    };
  }
  if (variant === 'b') {
    return {
      front: [{ k: 'word', x: 200, y: 104, size: 23, fill: ink, anchor: 'middle' }],
      back: [{ k: 'mark', x: 148, y: 96, size: 104, fill: ink2 }],
    };
  }
  return {
    front: [{ ...lattice, cy: 168 }],
    back: [{ k: 'mark', x: 181, y: 62, size: 39, fill: ink }, { k: 'word', x: 200, y: 322, size: 14, fill: ink, anchor: 'middle' }],
  };
}

const TEE_FOLDS = {
  front: ['M96 196Q140 240 126 306', 'M304 196Q262 240 276 306', 'M112 322Q200 342 288 318', 'M26 144Q52 150 72 170', 'M374 144Q348 150 328 170', 'M140 60Q150 110 120 150'],
  back: ['M96 200Q130 250 120 310', 'M304 200Q270 250 282 310', 'M112 326Q200 336 288 322', 'M26 144Q52 150 72 170', 'M374 144Q348 150 328 170'],
};

export function Tee({ idp, id, t, spot, view = 'front', body, art, tone = HEX.white, cast }) {
  const d = view === 'front' ? TEE_F : TEE_B;
  const neck = view === 'front' ? 'M146 18Q200 78 254 18' : 'M146 18Q200 38 254 18';
  const items = art[view];
  return (
    <g transform={place(t)}>
      {cast && <CastG idp={`${id}-cast`} d={d} dir={cast.dir} depth={cast.depth / t.s} opacity={0.55} />}
      <path d={d} fill={body} filter={`url(#${idp}-weave)`} />
      <clipPath id={`${id}-clip`}>
        <path d={d} />
      </clipPath>
      <path d="M66 50L14 150L80 176L84 190Q100 116 66 50Z" fill={HEX.black} opacity="0.12" />
      <path d="M334 50L386 150L320 176L316 190Q300 116 334 50Z" fill={HEX.black} opacity="0.12" />
      <g filter={`url(#${idp}-weave)`}>
        <ArtG items={items.filter((a) => a.k !== 'word')} clip={`${id}-clip`} />
      </g>
      <ArtG items={items.filter((a) => a.k === 'word')} clip={`${id}-clip`} />
      <FoldsG idp={idp} paths={TEE_FOLDS[view]} spot={spot} t={t} />
      <RibStroke d={neck} w={view === 'front' ? 14 : 12} body={body} />
      <path d={neck} fill="none" stroke={HEX.black} strokeWidth="0.8" opacity="0.4" transform="translate(0 -7)" />
      <LightG id={id} d={d} spot={spot} t={t} body={body} c={{ x: 200, y: 190 }} />
      <SeamG d="M66 50Q104 116 84 190" tone={tone} />
      <SeamG d="M334 50Q296 116 316 190" tone={tone} />
      <SeamG d="M22 138L82 162" tone={tone} />
      <SeamG d="M378 138L318 162" tone={tone} />
      <SeamG d="M82 334H318" tone={tone} />
      <path d={d} fill="none" stroke={HEX.black} strokeWidth="1" opacity="0.35" />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Hoodie: a 400 x 470 box. Ribbed cuffs and hem, a kangaroo pocket, a hood with a dark lining, drawcords with
// metal eyelets. art: 'mark' | 'lattice' | 'word'.
const H_BODY = 'M132 44L72 64Q34 92 24 200L10 372L68 386L86 262L92 226L92 430L308 430L308 226L314 262L332 386L390 372L376 200Q366 92 328 64L268 44Q200 100 132 44Z';
const H_HOOD = 'M132 46Q118 -6 200 -16Q282 -6 268 46Q252 80 200 98Q148 80 132 46Z';
const H_LINING = 'M152 46Q148 6 200 -2Q252 6 248 46Q230 74 200 88Q170 74 152 46Z';
export const HOODIE_BOX = { w: 400, h: 446 };

export function hoodieArt(kind, ink, ink2) {
  if (kind === 'lattice') return [{ k: 'lattice', cx: 200, cy: 268, kk: 1.5, rings: 3, fill: ink2 }];
  if (kind === 'word') return [{ k: 'word', x: 200, y: 250, size: 31, fill: ink, anchor: 'middle' }];
  return [{ k: 'mark', x: 169, y: 150, size: 62, fill: ink }];
}

export function Hoodie({ idp, id, t, spot, body, art, tone = HEX.white, cast, dim = 0, cord = HEX.lightBlue }) {
  return (
    <g transform={place(t)}>
      {cast && <CastG idp={`${id}-cast`} d={`${H_BODY}${H_HOOD}`} dir={cast.dir} depth={cast.depth / t.s} opacity={0.55} />}
      <path d={H_BODY} fill={body} filter={`url(#${idp}-weave)`} />
      <clipPath id={`${id}-clip`}>
        <path d={H_BODY} />
      </clipPath>
      <path d="M72 64Q34 92 24 200L10 372L68 386L86 262L92 226Q100 130 72 64Z" fill={HEX.black} opacity="0.13" />
      <path d="M328 64Q366 92 376 200L390 372L332 386L314 262L308 226Q300 130 328 64Z" fill={HEX.black} opacity="0.13" />
      <g filter={`url(#${idp}-weave)`}>
        <ArtG items={art.filter((a) => a.k !== 'word')} clip={`${id}-clip`} />
      </g>
      <ArtG items={art.filter((a) => a.k === 'word')} clip={`${id}-clip`} />
      <FoldsG idp={idp} paths={['M40 230Q64 262 58 320', 'M360 230Q336 262 342 320', 'M122 250Q150 280 132 296', 'M278 250Q250 280 268 296', 'M150 404Q200 416 252 402']} spot={spot} t={t} />
      <RibPoly id={`${id}-cl`} d="M10 372L68 386L65 410L6 396Z" body={body} />
      <RibPoly id={`${id}-cr`} d="M390 372L332 386L335 410L394 396Z" body={body} />
      <RibPoly id={`${id}-hm`} d="M90 412H310V442H90Z" body={body} />
      <path d={H_HOOD} fill={body} filter={`url(#${idp}-weave)`} />
      <path d={H_HOOD} fill={HEX.black} opacity="0.06" />
      <path d={H_LINING} fill={HEX.black} opacity="0.62" />
      <path d={H_LINING} fill={body} opacity="0.35" />
      <path d="M152 46Q148 6 200 -2Q252 6 248 46" fill="none" stroke={HEX.white} strokeWidth="1.2" opacity="0.2" />
      <path d="M118 36Q160 70 200 98" fill="none" stroke={HEX.black} strokeWidth="6" opacity="0.18" filter={`url(#${idp}-fold-s)`} />
      <path d="M116 296H284L300 398H100Z" fill={HEX.black} opacity="0.08" />
      <path d="M116 296L100 398M284 296L300 398" stroke={HEX.black} strokeWidth="3" opacity="0.4" fill="none" />
      <path d="M100 398H300" stroke={HEX.black} strokeWidth="2" opacity="0.3" />
      <SeamG d="M122 304H278" tone={tone} />
      <SeamG d="M108 392H292" tone={tone} />
      <SeamG d="M72 64Q106 150 92 226" tone={tone} />
      <SeamG d="M328 64Q294 150 308 226" tone={tone} />
      <g fill="none" strokeLinecap="round">
        <path d="M182 92Q176 134 179 190M218 92Q224 134 221 190" stroke={HEX.black} strokeWidth="5" opacity="0.28" transform="translate(1.5 2)" />
        <path d="M182 92Q176 134 179 190M218 92Q224 134 221 190" stroke={cord} strokeWidth="3.4" />
        <path d="M182 92Q176 134 179 190M218 92Q224 134 221 190" stroke={HEX.black} strokeWidth="3.4" strokeDasharray="1 2.6" opacity="0.28" />
      </g>
      <rect x="176" y="186" width="6" height="16" fill={HEX.white} opacity="0.8" />
      <rect x="218" y="186" width="6" height="16" fill={HEX.white} opacity="0.8" />
      <EyeletG idp={idp} cx={184} cy={92} />
      <EyeletG idp={idp} cx={216} cy={92} />
      <LightG id={id} d={`${H_BODY}${H_HOOD}`} spot={spot} t={t} body={body} c={{ x: 200, y: 200 }} reach={280} />
      {dim > 0 && <path d={`${H_BODY}${H_HOOD}`} fill={HEX.black} opacity={dim} />}
      <path d={H_BODY} fill="none" stroke={HEX.black} strokeWidth="1" opacity="0.35" />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The high-visibility vest (workwear, as worn on site in the case study's field poster, m11): the brand's Active
// Blue body, Dark Blue binding, Light Blue reflective tape in two bands and two braces, a zip, two flap pockets.
const V_BODY = 'M126 14L170 14Q200 70 230 14L274 14L292 60Q300 120 316 176L320 436L80 436L84 176Q100 120 108 60Z';
export const VEST_BOX = { w: 400, h: 436 };

export function Vest({ idp, id, t, spot, body = HEX.activeBlue, bind = HEX.darkBlue, tape = HEX.lightBlue, cast, dim = 0 }) {
  const strips = ['M122 14L150 14L156 300L120 300Z', 'M250 14L278 14L280 300L244 300Z'];
  const bands = ['M82 262H318V294H82Z', 'M82 322H318V354H82Z'];
  return (
    <g transform={place(t)}>
      {cast && <CastG idp={`${id}-cast`} d={V_BODY} dir={cast.dir} depth={cast.depth / t.s} opacity={0.55} />}
      <path d={V_BODY} fill={body} filter={`url(#${idp}-weave)`} />
      <clipPath id={`${id}-clip`}>
        <path d={V_BODY} />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <pattern id={`${id}-prism`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="2" height="5" fill={HEX.black} opacity="0.16" />
        </pattern>
        {[...strips, ...bands].map((d, i) => (
          <g key={i}>
            <path d={d} fill={tape} />
            <path d={d} fill={`url(#${idp}-metal)`} opacity="0.55" />
            <path d={d} fill={`url(#${id}-prism)`} />
            <path d={d} fill="none" stroke={HEX.black} strokeWidth="0.8" opacity="0.35" />
          </g>
        ))}
        <ArtG items={[{ k: 'mark', x: 206, y: 118, size: 38, fill: bind }]} />
        <path d="M80 436V176" stroke={HEX.black} strokeWidth="14" opacity="0.1" />
      </g>
      <FoldsG idp={idp} paths={['M110 200Q150 232 138 258', 'M290 200Q250 232 262 258', 'M120 380Q200 396 280 378']} spot={spot} t={t} />
      {[[98, 372], [228, 372]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y}H${x + 76}V${y + 46}H${x}Z`} fill={HEX.black} opacity="0.14" />
          <path d={`M${x} ${y}H${x + 76}V${y + 22}L${x + 38} ${y + 28}L${x} ${y + 22}Z`} fill={body} />
          <path d={`M${x} ${y}H${x + 76}V${y + 22}L${x + 38} ${y + 28}L${x} ${y + 22}Z`} fill={HEX.black} opacity="0.14" />
          <SeamG d={`M${x + 4} ${y + 4}H${x + 72}`} />
        </g>
      ))}
      <path d="M200 70V436" stroke={bind} strokeWidth="7" />
      <path d="M200 70V436" stroke={HEX.white} strokeWidth="7" strokeDasharray="1.2 2.4" opacity="0.5" />
      <rect x="194" y="76" width="12" height="26" fill={`url(#${idp}-metal)`} stroke={HEX.black} strokeOpacity="0.4" strokeWidth="0.6" />
      <EyeletG idp={idp} cx={200} cy={92} r={3.4} />
      <RibStroke d="M170 14Q200 70 230 14" w={12} body={bind} rib={0.05} />
      <RibStroke d="M108 60Q102 122 84 176M292 60Q298 122 316 176" w={8} body={bind} rib={0.05} />
      <RibStroke d="M80 432H320" w={9} body={bind} rib={0.05} />
      <LightG id={id} d={V_BODY} spot={spot} t={t} body={body} c={{ x: 200, y: 220 }} />
      {dim > 0 && <path d={V_BODY} fill={HEX.black} opacity={dim} />}
      <path d={V_BODY} fill="none" stroke={HEX.black} strokeWidth="1" opacity="0.35" />
    </g>
  );
}
