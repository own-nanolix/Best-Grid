// Small shared helpers for the stationery page: geometry, text rows and paper sheets.
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';
import { MaterialDefs, StageG } from '@/components/art/Mockup';

export const ID = 'use-stationery';

// The corners of a rectangle (x, y, w, h) turned by `deg` about its centre, and a path from a list of points.
export function rectPoly(x, y, w, h, deg = 0) {
  const cx = x + w / 2, cy = y + h / 2, a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]].map(([px, py]) => [
    r2(cx + (px - cx) * c - (py - cy) * s),
    r2(cy + (px - cx) * s + (py - cy) * c),
  ]);
}
export const polyD = (pts) => `M${pts.map((p) => `${r2(p[0])} ${r2(p[1])}`).join('L')}Z`;

// An SVG matrix from the screen vectors of a surface's x axis (u), y axis (v) and its origin (o).
export const mat = (u, v, o) => `matrix(${r2(u[0])} ${r2(u[1])} ${r2(v[0])} ${r2(v[1])} ${r2(o[0])} ${r2(o[1])})`;

// Rows of text, one <text> per printed row, with its own line height.
export function Rows({ rows, x = 0, y = 0, size = 14, lh = 1.2, fill = 'currentColor', anchor = 'start', ...rest }) {
  return (
    <g {...rest}>
      {rows.map((t, i) => (
        <text key={t} x={r2(x)} y={r2(y + i * size * lh)} fontSize={size} fill={fill} textAnchor={anchor}>
          {t}
        </text>
      ))}
    </g>
  );
}

// A paper sheet: the base of every printed piece. `fill` and `filter` let a plate give it a material.
export function Sheet({ w, h, fill = HEX.paper, filter }) {
  return <rect width={w} height={h} fill={fill} filter={filter} />;
}

// Thin stack edges seen along one side of a sheet (a ream or a pad), as hairlines.
export function EdgeLines({ x, y, w, h, n = 6, horizontal = true, color = HEX.darkBlue, opacity = 0.25 }) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: n }, (_, i) => {
        const o = ((i + 1) * (horizontal ? h : w)) / (n + 1);
        return horizontal ? (
          <rect key={i} x={x} y={r2(y + o)} width={w} height="0.6" fill={color} />
        ) : (
          <rect key={i} x={r2(x + o)} y={y} width="0.6" height={h} fill={color} />
        );
      })}
    </g>
  );
}

// Which of the two left/right shades faces the spot.
export const shadeFor = (spot) => (spot.x < 0.5 ? 'shade' : 'shade-r');

// The stage, the materials and the light falloff of a plate. `fall` is the radial light of the one spot, in the
// coordinates of the group it is used in (cx, cy, r); overlay a shape with fill url(#<idp>-fall) to light it.
export function Base({ idp, w, h, spot, floor = null, r = 0.62, fall }) {
  return (
    <>
      <MaterialDefs idp={idp} />
      <StageG idp={idp} w={w} h={h} spot={spot} floor={floor} r={r} />
      <radialGradient id={`${idp}-fall`} gradientUnits="userSpaceOnUse" cx={r2(fall.cx)} cy={r2(fall.cy)} r={r2(fall.r)}>
        <stop offset="0" stopColor={HEX.white} stopOpacity="0.1" />
        <stop offset="0.5" stopColor={HEX.white} stopOpacity="0" />
        <stop offset="1" stopColor={HEX.black} stopOpacity="0.3" />
      </radialGradient>
      <filter id={`${idp}-blur`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </>
  );
}

// A soft cast shadow of a polygon, thrown away from the light by (dx, dy), and the light falloff over the object.
export const CastPoly = ({ idp, pts, dx, dy, o = 0.5 }) => (
  <g fill={HEX.black} filter={`url(#${idp}-blur)`}>
    <path d={polyD(pts)} transform={`translate(${r2(dx)} ${r2(dy)})`} opacity={o} />
    <path d={polyD(pts)} transform={`translate(${r2(dx * 0.2)} ${r2(dy * 0.2)})`} opacity={r2(o + 0.2)} />
  </g>
);
