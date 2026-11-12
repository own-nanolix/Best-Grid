// Small drawing helpers shared by every campaign artboard. Everything returns SVG groups or primitives.
import { r2 } from '@/lib/charts';
import { NodeG } from '@/components/art/KeyArt';
import { WordmarkG } from '@/components/art/Mark';

// Lines of text as one <text> with one <tspan> per printed row. fills: optional colour per row (the two-tone habit).
export function Lines({ rows, x, y, size, lh = 1.2, fill, fills, anchor = 'start', display = true, lang = 'es', weight, tracking = -0.01, className, ...rest }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      textAnchor={anchor}
      fontWeight={weight}
      letterSpacing={r2(size * tracking)}
      lang={lang}
      className={`${display ? 'display' : ''} ${className || ''}`.trim()}
      {...rest}
    >
      {rows.map((row, i) => (
        <tspan key={row} x={x} dy={i ? r2(size * lh) : 0} fill={fills ? fills[i] : undefined}>
          {row}
        </tspan>
      ))}
    </text>
  );
}

// A horizontal / vertical guide hairline (a filled bar, so the extend classes can animate it) and a node.
export function HL({ y, x1 = 0, x2, c, w = 1.5, i = 0, o = 1 }) {
  return <rect x={x1} y={r2(y - w / 2)} width={r2(x2 - x1)} height={w} fill={c} opacity={o} className="extend-x" style={{ '--i': i }} />;
}
export function VL({ x, y1 = 0, y2, c, w = 1.5, i = 0, o = 1 }) {
  return <rect x={r2(x - w / 2)} y={y1} width={w} height={r2(y2 - y1)} fill={c} opacity={o} className="extend-y" style={{ '--i': i }} />;
}
export function Nd({ x, y, c, s = 9, i = 0 }) {
  return <NodeG cx={x} cy={y} s={s} fill={c} className="snap" style={{ '--i': i }} />;
}
// Nodes at every crossing of xs and ys.
export function Crossings({ xs, ys, c, s = 9, i = 4 }) {
  return ys.flatMap((y, a) => xs.map((x, b) => <Nd key={`${x}-${y}`} x={x} y={y} c={c} s={s} i={i + a + b} />));
}
// The word-mark fading in (WordmarkG carries a transform, so the animated class sits on a wrapper).
export function Word({ i = 6, ...p }) {
  return (
    <g className="fade-in" style={{ '--i': i }}>
      <WordmarkG {...p} />
    </g>
  );
}
// A block of artwork fading in after the guides.
export function In({ i = 8, children }) {
  return (
    <g className="fade-in" style={{ '--i': i }}>
      {children}
    </g>
  );
}
