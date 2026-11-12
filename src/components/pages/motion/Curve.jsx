// One easing token drawn as an exportable SVG from its real control points, with a square dot that travels it.
// Plot box: x 24 to 174 (time), y 190 to 40 (progress). The dot sits on its final value in the markup; CSS
// keyframes play from the start towards it: the time axis runs on the shared linear token, the progress axis on
// the token being shown, so the dot draws the curve. No element carries both a transform attribute and an animation.
import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { EASE_VALUE } from './data';
import s from './motion.module.css';

const INK = HEX.darkBlue;
const X0 = 24;
const Y0 = 190;
const S = 150;
const px = (x) => r2(X0 + S * x);
const py = (y) => r2(Y0 - S * y);

export function curvePath(e) {
  if (e.pts) {
    const [a, b, c, d] = e.pts;
    return `M${px(0)} ${py(0)}C${px(a)} ${py(b)} ${px(c)} ${py(d)} ${px(1)} ${py(1)}`;
  }
  if (e.kind === 'cut') return `M${px(0)} ${py(0)}H${px(1)}V${py(1)}`;
  return `M${px(0)} ${py(0)}L${px(1)} ${py(1)}`;
}

// Props: e (an entry of EASES), run (a number that restarts the dot), ms (duration of the dot).
export default function Curve({ e, run = 0, ms }) {
  const name = `motion-curve-${e.id}`;
  const handles = e.pts && [[0, 0, e.pts[0], e.pts[1]], [1, 1, e.pts[2], e.pts[3]]];
  return (
    <Art viewBox="0 0 200 230" title={`${e.name} easing curve: ${EASE_VALUE(e)}`} exportName={name} className={s.curve}>
      <rect width="200" height="230" fill={HEX.paper} />
      <path d={`M${X0} ${Y0}V${py(1)}H${px(1)}M${px(1)} ${Y0}V${py(1)}M${X0} ${Y0}H${px(1)}`} stroke={INK} strokeWidth="0.6" fill="none" opacity="0.28" />
      <path d={`M${X0} ${Y0}H${px(1)}V${Y0}`} stroke={INK} strokeWidth="1" fill="none" />
      <path d={`M${X0} ${Y0}V${py(1)}`} stroke={INK} strokeWidth="1" fill="none" />
      {handles && handles.map(([ax, ay, bx, by]) => (
        <g key={`${ax}${ay}`}>
          <path d={`M${px(ax)} ${py(ay)}L${px(bx)} ${py(by)}`} stroke={HEX.activeBlue} strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <rect x={r2(px(bx) - 3)} y={r2(py(by) - 3)} width="6" height="6" fill={HEX.paper} stroke={HEX.activeBlue} strokeWidth="1.2" />
        </g>
      ))}
      <path d={curvePath(e)} stroke={HEX.activeBlue} strokeWidth="2.4" fill="none" strokeLinejoin="miter" />
      <rect x={X0 - 3} y={Y0 - 3} width="6" height="6" fill={INK} />
      <rect x={px(1) - 3} y={py(1) - 3} width="6" height="6" fill={INK} />
      <g key={run} className={s.dotX} style={{ '--ms': `${ms}ms` }}>
        <g className={s.dotY} style={{ '--ease': `var(--ease-${e.id})` }}>
          <rect x={px(1) - 5} y={py(1) - 5} width="10" height="10" fill={HEX.darkBlue} stroke={HEX.paper} strokeWidth="1.5" />
        </g>
      </g>
      <text x="24" y="18" fontSize="12" fill={INK}>{e.token}</text>
      <text x="24" y="32" fontSize="9" fill={HEX.muted}>{EASE_VALUE(e)}</text>
      <text x="24" y="212" fontSize="8" fill={HEX.muted}>0</text>
      <text x={px(1)} y="212" fontSize="8" textAnchor="end" fill={HEX.muted}>time 1</text>
      <text x="14" y={py(1) + 3} fontSize="8" textAnchor="end" fill={HEX.muted}>1</text>
    </Art>
  );
}

