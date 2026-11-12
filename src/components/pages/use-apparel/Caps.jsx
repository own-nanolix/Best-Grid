// Headwear in profile, peak to the left: the six-panel cap (curved peak with stitching rows, panel seams, eyelets,
// button, sweatband, strap) and the hard hat (shell with ridges, vents, front peak, Light Blue reflective band).
// Both are drawn empty and lit by the plate's one spotlight. Local box: 460 x 300.
import { HEX } from '@/lib/brand';
import { MarkG } from '@/components/art/Mark';
import { CastG } from '@/components/art/Mockup';
import { EyeletG, FoldsG, LightG, RibStroke, SeamG, place } from './fabric';

export const CAP_BOX = { w: 460, h: 300 };
const CROWN = 'M118 252Q102 94 262 84Q430 82 438 252Q300 266 118 252Z';
const VISOR = 'M124 240Q58 234 12 268Q18 280 42 286Q98 300 138 288Z';
const SHELL = 'M96 254Q90 78 266 74Q444 78 438 254Z';
const BRIM = 'M66 254Q70 232 112 240L444 254Q456 272 424 278L92 274Q56 272 66 254Z';

// The artwork on the front panel, foreshortened with the panel (it turns away from us toward the peak).
function FrontMark({ x, y, size, fill, kx = 0.5 }) {
  return (
    <g transform={`translate(${x} ${y}) matrix(${kx} 0.06 0 1 0 0)`}>
      <MarkG size={size} fill={fill} />
    </g>
  );
}

export function Cap({ idp, id, t, spot, body, ink, tone = HEX.white, cast }) {
  const d = `${CROWN}${VISOR}`;
  return (
    <g transform={place(t)}>
      {cast && <CastG idp={`${id}-cast`} d={d} dir={cast.dir} depth={cast.depth / t.s} opacity={0.55} />}
      <path d={VISOR} fill={body} filter={`url(#${idp}-weave)`} />
      <path d="M12 268Q18 280 42 286Q98 300 138 288L134 280Q96 290 44 278Q24 274 12 268Z" fill={HEX.black} opacity="0.42" />
      {[0, 1, 2, 3].map((i) => (
        <SeamG key={i} d={`M${34 + i * 8} ${272 - i * 1.2}Q${84 + i * 6} ${284 - i * 3} ${132 - i * 1.5} ${274 - i * 7}`} tone={tone} o={0.5} w={0.9} dash="3.4 2.6" />
      ))}
      <path d={CROWN} fill={body} filter={`url(#${idp}-weave)`} />
      <clipPath id={`${id}-clip`}>
        <path d={CROWN} />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <g filter={`url(#${idp}-weave)`}>
          <FrontMark x={146} y={128} size={60} fill={ink} />
        </g>
        <path d="M118 252Q300 266 438 252L438 270L118 270Z" fill={HEX.black} opacity="0.1" />
        <path d="M118 90Q200 40 262 80L262 252L118 252Z" fill={HEX.black} opacity="0.07" />
        <path d="M118 252Q300 266 438 252" fill="none" stroke={HEX.black} strokeWidth="1" opacity="0.4" />
      </g>
      <FoldsG idp={idp} paths={['M190 110Q226 170 206 236', 'M338 120Q372 180 358 240']} spot={spot} t={t} w={11} o={0.18} />
      {['M262 84Q212 150 188 256', 'M262 84Q296 164 300 262', 'M262 84Q346 150 394 256', 'M262 84Q172 112 130 210'].map((p, i) => (
        <SeamG key={i} d={p} tone={tone} o={0.55} dash="4 2.6" />
      ))}
      <RibStroke d="M118 244Q300 258 438 244" w={14} body={body} rib={0.22} step={3} />
      <circle cx="262" cy="84" r="7.5" fill={body} stroke={HEX.black} strokeOpacity="0.4" strokeWidth="0.8" />
      <circle cx="260" cy="82" r="4" fill={HEX.white} opacity="0.18" />
      <EyeletG idp={idp} cx={226} cy={112} r={3.4} />
      <EyeletG idp={idp} cx={312} cy={112} r={3.4} />
      <path d="M426 214L458 222V250L436 252Z" fill={HEX.black} opacity="0.55" />
      <path d="M426 214L458 222V250L436 252Z" fill={body} opacity="0.7" />
      <rect x="444" y="228" width="10" height="14" fill={`url(#${idp}-metal)`} stroke={HEX.black} strokeOpacity="0.4" strokeWidth="0.6" />
      <LightG id={`${id}-v`} d={VISOR} spot={spot} t={t} c={{ x: 70, y: 270 }} reach={120} body={body} />
      <LightG id={`${id}-c`} d={CROWN} spot={spot} t={t} c={{ x: 280, y: 170 }} reach={190} body={body} />
      <path d={CROWN} fill="none" stroke={HEX.black} strokeWidth="1" opacity="0.3" />
    </g>
  );
}

export function HardHat({ idp, id, t, spot, body = HEX.activeBlue, ink = HEX.darkBlue, tape = HEX.lightBlue, tone = HEX.white, cast }) {
  return (
    <g transform={place(t)}>
      {cast && <CastG idp={`${id}-cast`} d={`${SHELL}${BRIM}`} dir={cast.dir} depth={cast.depth / t.s} opacity={0.55} />}
      <path d={BRIM} fill={body} filter={`url(#${idp}-weave)`} />
      <path d="M92 274L424 278Q456 272 444 254L440 262Q430 270 424 270L92 266Q70 264 66 254Q60 272 92 274Z" fill={HEX.black} opacity="0.4" />
      <path d={SHELL} fill={body} />
      <clipPath id={`${id}-clip`}>
        <path d={SHELL} />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <path d="M118 244Q140 110 268 98Q396 108 418 244" fill="none" stroke={HEX.white} strokeWidth="26" opacity="0.12" />
        <path d="M118 244Q140 110 268 98Q396 108 418 244" fill="none" stroke={HEX.black} strokeWidth="26" strokeDasharray="0.8 0" opacity="0.1" transform="translate(7 6)" />
        {['M104 246Q126 100 268 86Q410 100 432 246', 'M132 248Q152 124 268 112Q384 124 404 248'].map((p, i) => (
          <path key={i} d={p} fill="none" stroke={HEX.black} strokeWidth="1.2" opacity="0.35" />
        ))}
        <FrontMark x={112} y={132} size={72} fill={ink} kx={0.46} />
        <path d="M96 226Q266 250 438 226V242Q266 266 96 242Z" fill={tape} />
        <pattern id={`${id}-prism`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="2" height="5" fill={HEX.black} opacity="0.16" />
        </pattern>
        <path d="M96 226Q266 250 438 226V242Q266 266 96 242Z" fill={`url(#${idp}-metal)`} opacity="0.5" />
        <path d="M96 226Q266 250 438 226V242Q266 266 96 242Z" fill={`url(#${id}-prism)`} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={288 + i * 32} y={176 + i * 3} width="18" height="5" fill={HEX.black} opacity="0.55" />
        ))}
        <path d="M96 254Q266 270 438 254V280H96Z" fill={HEX.black} opacity="0.18" />
      </g>
      <FoldsG idp={idp} paths={['M170 130Q150 190 160 230']} spot={spot} t={t} w={14} o={0.14} />
      <SeamG d="M110 238Q266 262 430 238" tone={tone} o={0.55} w={0.9} dash="3.4 2.6" />
      <rect x="88" y="244" width="30" height="14" fill={HEX.black} opacity="0.4" />
      <LightG id={`${id}-b`} d={BRIM} spot={spot} t={t} c={{ x: 250, y: 262 }} reach={200} body={body} />
      <LightG id={`${id}-s`} d={SHELL} spot={spot} t={t} c={{ x: 270, y: 170 }} reach={190} body={body} />
      <path d={SHELL} fill="none" stroke={HEX.black} strokeWidth="1" opacity="0.3" />
    </g>
  );
}
