// Small drawing parts shared by the nine screens. Every screen is an SVG group in the 390 x 844 artboard space.
import { HEX, CAPACITY } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { StatusBarG } from '@/components/art/Devices';

export const W = 390;
export const H = 844;
export const GROUND = '#dcdfe6'; // the phone screen ground sampled on m17
export const SOFT = '#7c9cff';   // the lighter Active Blue of the node grid

// The screen ground and the neutral status bar (9:41 and plain glyphs).
export function Ground({ fill = GROUND, bar = HEX.darkBlue, children }) {
  return (
    <g>
      <rect width={W} height={H} fill={fill} />
      <StatusBarG fill={bar} />
      {children}
    </g>
  );
}

// A two-row title in the printed manner (16 px, Dark Blue).
export function Title({ rows, y = 84, fill = HEX.darkBlue, size = 16 }) {
  return (
    <text x="36" y={y} fontSize={size} fill={fill} lang="es">
      {rows.map((r, i) => (
        <tspan key={r} x="36" dy={i ? r2(size * 1.22) : 0}>{r}</tspan>
      ))}
    </text>
  );
}

// A quiet placeholder bar (a row whose content is not published).
export function Bar({ x, y, w, h = 8, o = 0.1, fill = HEX.darkBlue }) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} opacity={o} />;
}

// A solid square node placed by its centre.
export function Node({ x, y, s = 6, fill = HEX.darkBlue }) {
  return <rect x={r2(x - s / 2)} y={r2(y - s / 2)} width={s} height={s} fill={fill} />;
}

// A hairline (horizontal when h is omitted).
export function Rule({ x, y, w, h = 0.8, o = 0.5, fill = HEX.darkBlue }) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} opacity={o} />;
}

// A ruled cell: optional fill, four hairlines and a node on each corner.
export function Cell({ x, y, w, h, fill, line = HEX.darkBlue, o = 0.5, node = 6, nodes = true }) {
  return (
    <g>
      {fill && <rect x={x} y={y} width={w} height={h} fill={fill} />}
      <rect x={x} y={y - 0.4} width={w} height="0.8" fill={line} opacity={o} />
      <rect x={x} y={y + h - 0.4} width={w} height="0.8" fill={line} opacity={o} />
      <rect x={x - 0.4} y={y} width="0.8" height={h} fill={line} opacity={o} />
      <rect x={x + w - 0.4} y={y} width="0.8" height={h} fill={line} opacity={o} />
      {nodes && [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([cx, cy]) => <Node key={`${cx}-${cy}`} x={cx} y={cy} s={node} fill={line} />)}
    </g>
  );
}

// A year chip: the only round element. The active label is Dark Blue (rule 9).
export function YearChip({ cx, y, label, on, w = 52, h = 18 }) {
  return (
    <g>
      <rect x={cx - w / 2} y={y} width={w} height={h} rx={h / 2} fill={on ? HEX.activeBlue : '#e8eaf0'} />
      <text x={cx} y={y + h / 2 + 3.6} fontSize="10.5" fill={HEX.darkBlue} textAnchor="middle">{label}</text>
    </g>
  );
}

// The oversized total line of the dashboard: label above, Active Blue numeral and the small up triangle.
export function Total({ y = 349, size = 37, tri = true }) {
  const dy = size * 0.95;
  return (
    <g>
      <text x="36" y={y} fontSize="10" fill={HEX.darkBlue} lang="es">{CAPACITY.totalLabel}</text>
      <text x="34" y={r2(y + dy + 6)} fontSize={size} fill={HEX.activeBlue} letterSpacing="-1" className="display" lang="es">{CAPACITY.totalValue}</text>
      {tri && <path d={`M${r2(34 + size * 5.25)} ${r2(y + 12)}l4 -6l4 6z`} fill={HEX.activeBlue} />}
    </g>
  );
}
