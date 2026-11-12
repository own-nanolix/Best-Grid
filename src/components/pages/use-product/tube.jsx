// The project tube of m07 as drawn objects: standing (TubeG), lying (LyingTubeG) and end-on (EndViewG), plus the grey
// label (LabelContentG). Units: 2.5 units = 1 mm, so the tube is 120 mm across (R 150) and 306 mm long (764).
// Light comes from the spot: 'shade' (light from the left) or 'shade-r' (from the right) is laid over every body.
import { Fragment } from 'react';
import { r2 } from '@/lib/charts';
import { HEX, TUBE, mixHex } from '@/lib/brand';
import { MarkG, WordmarkG, WordmarkVerticalG } from '@/components/art/Mark';

export const T = { R: 150, H: 764, LH: 64, ratio: 0.28, lbl: 175 };
const LABEL_THETA = [-0.95, 0.22]; // where the label sits round the body, in radians from the front

// Extra gradients used by the tubes (the shared MaterialDefs come from the plate).
export function TubeDefs({ idp }) {
  const stops = (a) => a.map(([o, c, p]) => <stop key={o} offset={o} stopColor={c} stopOpacity={p} />);
  return (
    <defs>
      <linearGradient id={`${idp}-rim`} x1="0" y1="0" x2="1" y2="0">{stops([[0.84, HEX.white, 0], [1, HEX.white, 0.22]])}</linearGradient>
      <linearGradient id={`${idp}-rim-l`} x1="0" y1="0" x2="1" y2="0">{stops([[0, HEX.white, 0.22], [0.16, HEX.white, 0]])}</linearGradient>
      <linearGradient id={`${idp}-ao`} x1="0" y1="0" x2="0" y2="1">{stops([[0, HEX.black, 0.42], [1, HEX.black, 0]])}</linearGradient>
      <linearGradient id={`${idp}-gloss`} x1="0" y1="0" x2="1" y2="0">{stops([[0, HEX.white, 0], [0.5, HEX.white, 0.16], [1, HEX.white, 0]])}</linearGradient>
    </defs>
  );
}

// The printed label in its own flat space, 175 x 175 (= 70 x 70 mm), text reading bottom to top as on the tube.
// Every printed line of m07 is here; the client line is the neutral placeholder.
export function LabelContentG({ ink = HEX.blueInk }) {
  const L = (x, y, size, str, props = {}) => (
    <text transform={`translate(${x} ${y}) rotate(-90)`} fontSize={size} fill={ink} {...props}>{str}</text>
  );
  return (
    <g>
      <rect x="143" y="0" width="0.7" height="175" fill={ink} opacity="0.75" />
      <rect x="143.7" y="61.4" width="31.3" height="0.7" fill={ink} opacity="0.75" />
      <rect x="141.2" y="59.6" width="4.2" height="4.2" fill={ink} />
      <MarkG x={152.5} y={27.5} size={19} fill={ink} />
      <g lang="es">
        {L(16, 164, 7, TUBE.project, { fontStyle: 'italic' })}
        {TUBE.services.map((s, i) => <Fragment key={s}>{L(48.2 + i * 6.7, 171, 5.1, s)}</Fragment>)}
        {L(77.5, 171, 5.1, TUBE.lineRows[0])}
        {L(83.7, 171, 5.1, TUBE.lineRows[1])}
        {L(127.3, 170, 9.4, TUBE.date, { letterSpacing: -0.2 })}
        {L(157, 165, 7.2, TUBE.web)}
      </g>
      {L(29.2, 166, 10.5, TUBE.client, { lang: 'en' })}
    </g>
  );
}

function bodyPaint(idp, tone) {
  const dark = tone === 'dark';
  return { fill: `url(#${idp}-${dark ? 'board-dark' : 'board'})`, floor: dark ? `url(#${idp}-board)` : HEX.darkBlue, wall: dark ? mixHex(HEX.activeBlue, HEX.blueInk, 0.8) : mixHex(HEX.darkBlue, HEX.black, 0.5), mark: dark ? HEX.darkBlue : HEX.activeBlue };
}

// The standing tube. (x, y) is the centre of the lid's top ellipse; the body runs down `len` units (cropped by the
// plate when it leaves the frame, as in m07). ratio: how steeply it is seen from above. right: lit from the right.
export function TubeG({ idp, n = 1, tone = 'active', x = 0, y = 0, k = 1, ratio = T.ratio, right = false, len = T.H }) {
  const { R, LH } = T, rr = r2(R * ratio), id = `${idp}-t${n}`, paint = bodyPaint(idp, tone);
  const shade = `url(#${idp}-${right ? 'shade-r' : 'shade'})`;
  const ell = (u) => rr * Math.sqrt(1 - (u / R) ** 2);
  const [a, b] = LABEL_THETA.map((t) => R * Math.sin(t));
  const ly = LH + 58, lh = T.lbl, c = (b - a) / T.lbl;
  const arc = (px, py, sw) => `A${R} ${rr} 0 0 ${sw} ${r2(px)} ${r2(py)}`;
  const labelD = `M${r2(a)} ${r2(ly + ell(a))}${arc(b, ly + ell(b), 0)}V${r2(ly + lh + ell(b))}${arc(a, ly + lh + ell(a), 1)}Z`;
  const bodyD = `M${-R} ${LH}V${len}A${R} ${rr} 0 0 0 ${R} ${len}V${LH}Z`;
  const lidR = R + 4, lrr = r2(lidR * ratio), inR = lidR - 17, irr = r2(inR * ratio), ms = r2(inR * 1.24);
  const band = `M${-lidR} 0V${LH}A${lidR} ${lrr} 0 0 0 ${lidR} ${LH}V0Z`;
  const aoD = `M${-R} ${LH}A${R} ${rr} 0 0 0 ${R} ${LH}V${LH + 40}A${R} ${rr} 0 0 1 ${-R} ${LH + 40}Z`;
  const gx = right ? R * 0.42 : -R * 0.62;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${k})`}>
      <clipPath id={`${id}-b`}><path d={bodyD} /></clipPath>
      <clipPath id={`${id}-l`}><path d={labelD} /></clipPath>
      <clipPath id={`${id}-in`}><ellipse cx="0" cy="0" rx={inR} ry={irr} /></clipPath>
      <path d={bodyD} fill={paint.fill} filter={tone === 'dark' ? undefined : `url(#${idp}-grit)`} />
      <g clipPath={`url(#${id}-b)`}>
        {[a - 18, b + 16].map((hx) => <rect key={hx} x={r2(hx)} y={LH} width="0.9" height={len} fill={HEX.white} opacity="0.34" />)}
        <g transform="translate(-78 0) scale(0.87 1) translate(78 0)">
          <WordmarkVerticalG x={-111} y={len - 60} size={82} fill={HEX.onBlue} />
        </g>
        <g clipPath={`url(#${id}-l)`}>
          <path d={labelD} fill={HEX.labelGrey} filter={`url(#${idp}-fibre)`} />
          <g transform={`translate(${r2(a)} ${r2(ly + rr * 0.75)}) scale(${r2(c)} 1)`}><LabelContentG /></g>
        </g>
        <path d={labelD} fill="none" stroke={HEX.black} strokeOpacity="0.28" strokeWidth="0.8" />
        <path d={bodyD} fill={shade} />
        <path d={bodyD} fill={`url(#${idp}-${right ? 'rim-l' : 'rim'})`} />
        <rect x={r2(gx)} y={LH} width="24" height={len} fill={`url(#${idp}-gloss)`} />
        <path d={bodyD} fill={HEX.darkBlue} opacity={tone === 'dark' ? 0 : 0.14} />
        <path d={aoD} fill={`url(#${idp}-ao)`} />
      </g>
      {/* lid: a card cap with a rim and a recessed face carrying the mark */}
      <path d={band} fill={paint.fill} />
      <path d={band} fill={shade} />
      <path d={`M${-lidR} ${LH}A${lidR} ${lrr} 0 0 0 ${lidR} ${LH}`} fill="none" stroke={HEX.black} strokeOpacity="0.32" strokeWidth="1.2" />
      <ellipse cx="0" cy="0" rx={lidR} ry={lrr} fill={paint.fill} />
      <ellipse cx="0" cy="0" rx={lidR} ry={lrr} fill={shade} opacity="0.7" />
      <ellipse cx="0" cy="0" rx={lidR} ry={lrr} fill="none" stroke={HEX.white} strokeOpacity="0.3" strokeWidth="1.2" />
      <ellipse cx="0" cy="0" rx={inR} ry={irr} fill={paint.wall} />
      <g clipPath={`url(#${id}-in)`}>
        <ellipse cx="0" cy={r2(34 * ratio)} rx={inR} ry={irr} fill={paint.floor} />
        <ellipse cx="0" cy={r2(34 * ratio)} rx={inR} ry={irr} fill={shade} opacity="0.5" />
        <g transform={`translate(0 ${r2(34 * ratio)}) scale(1 ${ratio})`}><MarkG x={-ms / 2} y={-ms / 2} size={ms} fill={paint.mark} /></g>
      </g>
      <ellipse cx="0" cy="0" rx={inR} ry={irr} fill="none" stroke={HEX.black} strokeOpacity="0.35" strokeWidth="1" />
    </g>
  );
}

// The tube lying on its side, lid at the right: 764 x 300 (+ 4 each side for the lid). (x, y) is the top left.
export function LyingTubeG({ idp, n = 1, tone = 'active', x = 0, y = 0, k = 1, open = false }) {
  const { R, H, LH } = T, bl = H - LH, paint = bodyPaint(idp, tone), id = `${idp}-ly${n}`;
  const [a, b] = LABEL_THETA.map((t) => R * Math.sin(t));
  const c = (b - a) / T.lbl, lx = H - (LH + 58) - T.lbl;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${k})`}>
      <clipPath id={`${id}-b`}><rect width={bl} height={2 * R} /></clipPath>
      <rect width={bl} height={2 * R} fill={paint.fill} filter={`url(#${idp}-grit)`} />
      <g clipPath={`url(#${id}-b)`}>
        {[a - 18, b + 16].map((hy) => <rect key={hy} x="0" y={r2(R + hy)} width={bl} height="0.9" fill={HEX.white} opacity="0.34" />)}
        <g transform={`translate(0 ${R - 78}) scale(1 0.87) translate(0 ${78 - R})`}>
          <WordmarkG x={60} y={R - 78 + 30} size={82} fill={HEX.onBlue} />
        </g>
        <rect x={lx} y={r2(R + a)} width={T.lbl} height={r2(b - a)} fill={HEX.labelGrey} filter={`url(#${idp}-fibre)`} />
        <g transform={`translate(${lx + T.lbl} ${r2(R + a)}) rotate(90) scale(${r2(c)} 1)`}><LabelContentG /></g>
        <rect x={lx} y={r2(R + a)} width={T.lbl} height={r2(b - a)} fill="none" stroke={HEX.black} strokeOpacity="0.28" strokeWidth="0.8" />
        <rect width={bl} height={2 * R} fill={`url(#${idp}-shade-v)`} />
        <rect width={bl} height={2 * R} fill={`url(#${idp}-shade)`} opacity="0.4" />
      </g>
      {open ? (
        <g>
          <ellipse cx={bl} cy={R} rx="40" ry={R + 1} fill={paint.fill} />
          <ellipse cx={bl} cy={R} rx="40" ry={R + 1} fill={`url(#${idp}-shade-v)`} />
          <ellipse cx={bl + 4} cy={R} rx="33" ry={R - 6} fill={paint.wall} />
        </g>
      ) : (
        <g>
          <rect x={bl} y="-4" width={LH} height={2 * R + 8} fill={paint.fill} />
          <rect x={bl} y="-4" width={LH} height={2 * R + 8} fill={`url(#${idp}-shade-v)`} />
          <rect x={bl - 1} y="-4" width="2.4" height={2 * R + 8} fill={HEX.black} opacity="0.35" />
          <rect x={bl + 6} y="-4" width="1.2" height={2 * R + 8} fill={HEX.white} opacity="0.22" />
          <ellipse cx={H} cy={R} rx="9" ry={R + 4} fill={paint.fill} />
          <ellipse cx={H} cy={R} rx="9" ry={R + 4} fill="none" stroke={HEX.white} strokeOpacity="0.3" />
        </g>
      )}
    </g>
  );
}

// The tube seen end-on, looking at the lid: rim ring, recessed face, mark. (cx, cy) is the centre.
export function EndViewG({ idp, n = 1, tone = 'active', cx = 0, cy = 0, k = 1 }) {
  const { R } = T, paint = bodyPaint(idp, tone), lidR = R + 4, inR = lidR - 17, ms = r2(inR * 1.24);
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${k})`}>
      <clipPath id={`${idp}-ev${n}`}><circle r={inR} /></clipPath>
      <circle r={lidR} fill={paint.fill} filter={`url(#${idp}-grit)`} />
      <circle r={lidR} fill={`url(#${idp}-shade)`} />
      <circle r={lidR} fill="none" stroke={HEX.white} strokeOpacity="0.28" strokeWidth="1.2" />
      <circle r={inR} fill={paint.wall} />
      <g clipPath={`url(#${idp}-ev${n})`}>
        <circle cx="5" cy="5" r={inR - 4} fill={paint.floor} />
        <circle cx="5" cy="5" r={inR - 4} fill={`url(#${idp}-shade)`} opacity="0.6" />
        <MarkG x={r2(5 - ms / 2)} y={r2(5 - ms / 2)} size={ms} fill={paint.mark} />
      </g>
      <circle r={inR} fill="none" stroke={HEX.black} strokeOpacity="0.4" />
    </g>
  );
}
