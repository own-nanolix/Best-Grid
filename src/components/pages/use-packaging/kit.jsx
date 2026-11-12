import Art from '@/components/art/Art';
import { StageG, MaterialDefs, PlateFrameG, SpecColumnG, castDir } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';
import { META } from './data';

// Shared furniture of the packaging plates: the plate frame, isometric boxes with lit faces, a cast shadow made
// from the object's own outline, and the printed tape strip. Every plate is one SVG on the shared dark stage.
// All dimensions on the plates are our own production values in plain mm.

export const W = 1200;
export const H = 720;
export const pid = (n) => `use-packaging-${n}`;
// Board tone: the warm grey of the case study's box ink, used as an uncoated kraft-like board.
export const BOARD = HEX.warmGrey;
export const INK = HEX.darkBlue;
export const BLUE = HEX.activeBlue;
export const FLOOR_Y = 560;

// ---------------------------------------------------------------------------------------------------------------
// The plate: stage, furniture, spec column (object left: column on the right, object right: column on the left).
export function Plate({ name, title, spot, side = 'left', floor = 0.7, children }) {
  const idp = pid(name);
  const { no, label, rows } = META[name];
  const left = side === 'left';
  const rowH = 62;
  const h = 46 + rows.length * rowH;
  const x = left ? 840 : 60;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={title} exportName={idp}>
      <StageG idp={idp} w={W} h={H} spot={spot} floor={floor} />
      <MaterialDefs idp={idp} />
      <filter id={`${idp}-dgrit`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="4" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="gi" />
        </feMerge>
      </filter>
      <PlateFrameG w={W} h={H} split={left ? 0.7 : 0.3} no={no} label={label} />
      <SpecColumnG x={x} y={r2((H - h) / 2 + 8)} w={left ? 300 : 280} title="Specification" rows={rows} rowH={rowH} size={24} />
      {children(idp)}
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Convex hull, for a cast shadow that stays attached to its object.
function hull(points) {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [];
  for (const q of p) {
    while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop();
    lo.push(q);
  }
  const up = [];
  for (const q of [...p].reverse()) {
    while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop();
    up.push(q);
  }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}
export const pts = (a) => a.map((p) => `${r2(p[0])},${r2(p[1])}`).join(' ');

// A cast shadow on the floor: the footprint (ground points) swept away from the spot by `len`.
export function Cast({ idp, k = 'c', foot, spot, len = 80, opacity = 0.5, blur = 8 }) {
  const cx = foot.reduce((s, p) => s + p[0], 0) / foot.length;
  const cy = foot.reduce((s, p) => s + p[1], 0) / foot.length;
  const d = castDir(spot, W, H, cx, cy);
  const sweep = foot.map((p) => [p[0] + d.x * len, p[1] + Math.abs(d.y) * len * 0.3 + 4]);
  const id = `${idp}-${k}`;
  return (
    <g>
      <filter id={id} x="-30%" y="-60%" width="160%" height="220%">
        <feGaussianBlur stdDeviation={blur} />
      </filter>
      <polygon points={pts(hull([...foot, ...sweep]))} fill={HEX.black} opacity={opacity} filter={`url(#${id})`} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Isometric box. F is the front-bottom corner; a runs along the left edge, b along the right edge, h is the height.
const rad = (d) => (d * Math.PI) / 180;
export function boxGeom({ fx, fy, a, b, h, angL = 24, angR = 30 }) {
  const L = [-Math.cos(rad(angL)), -Math.sin(rad(angL))];
  const R = [Math.cos(rad(angR)), -Math.sin(rad(angR))];
  const P = (u, v, z) => [r2(fx + L[0] * u + R[0] * v), r2(fy + L[1] * u + R[1] * v - z)];
  return {
    P, L, R, a, b, h,
    left: [P(0, 0, 0), P(a, 0, 0), P(a, 0, h), P(0, 0, h)],
    right: [P(0, 0, 0), P(0, b, 0), P(0, b, h), P(0, 0, h)],
    top: [P(0, 0, h), P(a, 0, h), P(a, b, h), P(0, b, h)],
    foot: [P(0, 0, 0), P(a, 0, 0), P(a, b, 0), P(0, b, 0)],
  };
}

const SHADE = {
  left: { left: [HEX.white, 0.04], top: [HEX.white, 0.12], right: [HEX.black, 0.36] },
  right: { right: [HEX.white, 0.04], top: [HEX.white, 0.12], left: [HEX.black, 0.36] },
  top: { top: [HEX.white, 0.14], left: [HEX.black, 0.2], right: [HEX.black, 0.3] },
};

// One box, three faces. art = { left, right, top }: artwork in each face's flat local coordinates (left and right
// faces: x along the edge, y down from the top edge; top face: x along the right edge, y along the left edge),
// skewed onto the face with a matching matrix and clipped to it. grit: board grain filter.
export function IsoBox({ idp, k, g, fill, lit = 'left', art = {}, grit = true, edge = true, overlay, faces = ['left', 'right', 'top'] }) {
  const sh = SHADE[lit];
  const { P, L, R } = g;
  const mat = {
    left: `matrix(${r2(-L[0])} ${r2(-L[1])} 0 1 ${P(g.a, 0, g.h)[0]} ${P(g.a, 0, g.h)[1]})`,
    right: `matrix(${r2(R[0])} ${r2(R[1])} 0 1 ${P(0, 0, g.h)[0]} ${P(0, 0, g.h)[1]})`,
    top: `matrix(${r2(R[0])} ${r2(R[1])} ${r2(L[0])} ${r2(L[1])} ${P(0, 0, g.h)[0]} ${P(0, 0, g.h)[1]})`,
  };
  return (
    <g>
      {faces.map((f) => (
        <g key={f}>
          <clipPath id={`${idp}-${k}-${f}`}>
            <polygon points={pts(g[f])} />
          </clipPath>
          <polygon points={pts(g[f])} fill={fill} filter={grit ? `url(#${idp}-${grit === true ? 'grit' : grit})` : undefined} />
          {art[f] && (
            <g clipPath={`url(#${idp}-${k}-${f})`}>
              <g transform={mat[f]}>{art[f]}</g>
            </g>
          )}
          <polygon points={pts(g[f])} fill={sh[f][0]} opacity={sh[f][1]} />
        </g>
      ))}
      {overlay}
      {edge && (
        <g fill="none" strokeLinejoin="round">
          <polyline points={pts([g.left[3], g.left[0], g.right[1]])} stroke={HEX.black} strokeOpacity="0.25" strokeWidth="1" />
          <polyline points={pts([g.top[1], g.top[0], g.top[3]])} stroke={HEX.white} strokeOpacity="0.5" strokeWidth="1.4" />
          <line x1={g.left[0][0]} y1={g.left[0][1]} x2={g.left[3][0]} y2={g.left[3][1]} stroke={HEX.white} strokeOpacity={lit === 'left' ? 0.3 : 0.12} strokeWidth="1.2" />
        </g>
      )}
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// A printed tape strip drawn flat along x from 0 to len, centred on y = 0, h tall: the mark and the word-mark
// repeating. bg: tape colour, ink: print colour.
export function TapePrintG({ len, h, bg, ink, opacity = 1 }) {
  const unit = h * 3.1;
  const n = Math.max(1, Math.floor(len / unit));
  const pad = (len - n * unit) / 2;
  return (
    <g opacity={opacity}>
      {bg && <rect x="0" y={r2(-h / 2)} width={len} height={h} fill={bg} />}
      {Array.from({ length: n }, (_, i) => {
        const x = pad + i * unit;
        return (
          <g key={i}>
            <MarkG x={r2(x + h * 0.12)} y={r2(-h * 0.22)} size={r2(h * 0.44)} fill={ink} />
            <WordmarkG x={r2(x + h * 0.66)} y={r2(h * 0.1)} size={r2(h * 0.3)} fill={ink} />
          </g>
        );
      })}
    </g>
  );
}

// Paper fibre and board grain are applied by filters; this draws a few faint creases and fibre flecks on a rect.
export function CreaseG({ x, y, w, h, n = 3, opacity = 0.18 }) {
  return (
    <g opacity={opacity} fill="none" stroke={HEX.black} strokeWidth="0.8">
      {Array.from({ length: n }, (_, i) => {
        const yy = y + ((i + 1) * h) / (n + 1);
        return <path key={i} d={`M${r2(x)} ${r2(yy)}Q${r2(x + w / 2)} ${r2(yy + (i % 2 ? 4 : -4))} ${r2(x + w)} ${r2(yy)}`} />;
      })}
    </g>
  );
}
