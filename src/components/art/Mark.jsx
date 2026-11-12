// The Best Grid mark and word-mark, and the lockups the case study shows. All parts are SVG groups (<g>), so they
// can be placed inside any artwork; wrap them in <Art> for a standalone graphic.
//
// The mark is traced from the reference (m21, reference/logo_zoom.png) and BUILT from its own grid, so every
// number below comes from one construction (box 100 x 100, y down, centre 50, 50):
//   bar width   B = 5.23          the width of every band: star edges, frames, cross, diagonals
//   pitch       P = 12.85         lattice pitch around the centre: frames at 50 +- P and 50 +- 2P, cross at 50
//   star edge   y = 0.45 x - 1.6 (top edge of the top-left tip; 24.2 deg off the axis), mirrored four ways
//   chamfer     x + y = 3.2 cuts each tip at 45 deg;  waist 20.9 (the concave points, on the star edge)
//   diagonals   y = x and y = 100 - x, half-width 3.71 measured along x
// The solid is the star outline minus 20 holes (5 per quadrant: two triangles at the tip, two trapezoids,
// one square), with right-angle corners rounded r 1.5, acute corners r 0.4 (fill-rule evenodd).
import { r2 } from '@/lib/charts';

export const MARK = {
  B: 5.23,
  P: 12.85,
  slope: 0.45,
  intercept: -1.6,
  chamfer: 3.2,
  waist: 20.9,
  diag: 3.71,
  rRight: 1.5,
  rObtuse: 1.55,
  rAcute: 0.4,
  rOuter: 0.85,
};
// Fitted to reference/logo_zoom.png by overlay: 97.4% pixel overlap (intersection over union); the remainder is
// edge anti-aliasing of the raster.

const C = 50;

// Bar edges of the lattice, measured from the centre.
function lattice(m = MARK) {
  const h = m.B / 2;
  return {
    outerA: C - 2 * m.P - h, // 21.69: outer frame, outer edge
    outerB: C - 2 * m.P + h, // 26.92: outer frame, inner edge
    innerA: C - m.P - h,     // 34.54: inner frame, outer edge
    innerB: C - m.P + h,     // 39.77: inner frame, inner edge
    crossA: C - h,           // 47.39: centre cross, left / top edge
  };
}

// Mirror a list of top-left-quadrant points into the four quadrants.
const mirrors = [
  ([x, y]) => [x, y],
  ([x, y]) => [100 - x, y],
  ([x, y]) => [100 - x, 100 - y],
  ([x, y]) => [x, 100 - y],
];

// Polygon with rounded corners. pts: [[x, y], ...]; radius(angleDeg) gives the radius for each corner.
export function roundedPolygon(pts, radius) {
  const n = pts.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p = pts[i], p1 = pts[(i + 1) % n];
    const ax = p0[0] - p[0], ay = p0[1] - p[1], bx = p1[0] - p[0], by = p1[1] - p[1];
    const la = Math.hypot(ax, ay), lb = Math.hypot(bx, by);
    const cos = (ax * bx + ay * by) / (la * lb);
    const ang = Math.acos(Math.max(-1, Math.min(1, cos))); // interior angle (radians)
    const r = typeof radius === 'function' ? radius((ang * 180) / Math.PI, i) : radius;
    const t = Math.min(r / Math.tan(ang / 2), la * 0.45, lb * 0.45);
    const s = [p[0] + (ax / la) * t, p[1] + (ay / la) * t];
    const e = [p[0] + (bx / lb) * t, p[1] + (by / lb) * t];
    const rr = t * Math.tan(ang / 2);
    const sweep = ax * by - ay * bx < 0 ? 1 : 0;
    d += `${i ? 'L' : 'M'}${r2(s[0])} ${r2(s[1])}A${r2(rr)} ${r2(rr)} 0 0 ${sweep} ${r2(e[0])} ${r2(e[1])}`;
  }
  return d + 'Z';
}

// The star outline (clockwise from the top-left chamfer).
export function markOutline(m = MARK) {
  const c = m.chamfer;
  // chamfer points: on x + y = c and on the star edge y = slope * x + intercept
  const cx = (c - m.intercept) / (1 + m.slope);
  const a = [r2(cx), r2(c - cx)]; // (3.31, -0.11) on the top edge
  const w = m.waist;
  const tl = [[a[1], a[0]], a]; // left-edge chamfer point, top-edge chamfer point
  const pts = [
    tl[1], [C, w], [100 - a[0], a[1]], [100 - a[1], a[0]], [100 - w, C],
    [100 - a[1], 100 - a[0]], [100 - a[0], 100 - a[1]], [C, 100 - w], [a[0], 100 - a[1]],
    [a[1], 100 - a[0]], [w, C], tl[0],
  ];
  return pts;
}

// The five holes of the top-left quadrant, from the lattice.
export function markHolesTL(m = MARK) {
  const L = lattice(m);
  const k = m.intercept + m.B / Math.cos(Math.atan(m.slope)); // star edge moved inward by one bar
  const dg = m.diag;
  // tip point of the triangles: star inner edge meets the diagonal band
  const tx = (k + dg) / (1 - m.slope);
  const ty = tx - dg;
  const edgeX = (y) => (y - k) / m.slope; // star inner edge at height y
  return [
    [[tx, ty], [edgeX(L.outerA), L.outerA], [L.outerA + dg, L.outerA]],                       // upper triangle
    [[ty, tx], [L.outerA, L.outerA + dg], [L.outerA, edgeX(L.outerA)]],                       // lower triangle
    [[L.outerB + dg, L.outerB], [L.crossA, L.outerB], [L.crossA, L.innerA], [L.innerA + dg, L.innerA]], // top trapezoid
    [[L.outerB, L.outerB + dg], [L.outerB, L.crossA], [L.innerA, L.crossA], [L.innerA, L.innerA + dg]].reverse(), // left trapezoid
    [[L.innerB, L.innerB], [L.crossA, L.innerB], [L.crossA, L.crossA], [L.innerB, L.crossA]], // square
  ].map((poly) => poly.map(([x, y]) => [r2(x), r2(y)]));
}

const holeRadius = (m) => (deg) => (deg < 60 ? m.rAcute : deg > 110 ? m.rObtuse : m.rRight);

// The full mark as one path (fill-rule evenodd). Cached for the default construction.
export function markPath(m = MARK) {
  const outer = roundedPolygon(markOutline(m), (deg) => (deg > 120 ? m.rOuter + 0.2 : m.rOuter));
  const holes = [];
  for (const f of mirrors) {
    for (const h of markHolesTL(m)) holes.push(roundedPolygon(h.map(f), holeRadius(m)));
  }
  return outer + holes.join('');
}

export const MARK_D = markPath();

// Construction lines of the mark (centre lines of every bar), for construction diagrams: [{ x1, y1, x2, y2, kind }]
export function markConstruction(m = MARK) {
  const out = [];
  for (const v of [C - 2 * m.P, C - m.P, C, C + m.P, C + 2 * m.P]) {
    out.push({ x1: v, y1: 0, x2: v, y2: 100, kind: v === C ? 'cross' : 'frame' });
    out.push({ x1: 0, y1: v, x2: 100, y2: v, kind: v === C ? 'cross' : 'frame' });
  }
  out.push({ x1: 0, y1: 0, x2: 100, y2: 100, kind: 'diagonal' }, { x1: 100, y1: 0, x2: 0, y2: 100, kind: 'diagonal' });
  return out.map((l) => ({ ...l, x1: r2(l.x1), y1: r2(l.y1), x2: r2(l.x2), y2: r2(l.y2) }));
}

// <MarkG x y size fill /> : the mark in a square of `size`. className lets a page animate it.
export function MarkG({ x = 0, y = 0, size = 100, fill = 'currentColor', className, pathClass, ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${r2(size / 100)})`} fill={fill} className={className} {...rest}>
      <path d={MARK_D} fillRule="evenodd" className={pathClass} />
    </g>
  );
}

// Blind emboss of the mark (business cards m05 / m06, card back): a light edge upper left and a shadow lower
// right, on the paper colour. Needs idp.
export function MarkEmbossG({ idp, x = 0, y = 0, size = 100, paper = '#eef2f7', light = '#ffffff', shade = '#1b2043', ...rest }) {
  const k = r2(size / 100);
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} {...rest}>
      <filter id={`${idp}-emboss`} x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="0.5" />
      </filter>
      <path d={MARK_D} fillRule="evenodd" fill={shade} opacity="0.22" transform="translate(0.9 1.1)" filter={`url(#${idp}-emboss)`} />
      <path d={MARK_D} fillRule="evenodd" fill={light} opacity="0.95" transform="translate(-0.7 -0.8)" filter={`url(#${idp}-emboss)`} />
      <path d={MARK_D} fillRule="evenodd" fill={paper} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The word-mark. It is set in the brand typeface (a heavier cut, read as Medium), letters touching, with a narrow
// word space, so it is SVG <text> in the brand font stack (outlined later in a design tool), never redrawn.
// Measured on the reference (crop_wordmark_grid, m19): width : cap height = 5.54 : 1, "Best" : "Grid" = 740 : 711,
// gap between "t" and "G" = 0.2 cap height. The site's stand-in face (Inter Tight) is narrower than the brand cut,
// so the word-mark is set at weight 540, tracking -0.045 em (letters touch, as printed), the word gap is set
// explicitly (no space glyph: dx 0.15 em) and the line is scaled 1.1 horizontally. Overlaid on the reference it
// spans the same width within 1% (5.5 : 1); "Grid" stays a little narrower than the brand cut's. At font size 1:
// cap height 0.73, visible width about 4.0.
export const WORDMARK = { weight: 540, tracking: -0.045, gap: 0.15, stretch: 1.1, cap: 0.73, width: 4.0 };

// <WordmarkG x y size fill anchor /> : baseline at y; size is the font size (cap height = 0.73 x size).
export function WordmarkG({ x = 0, y = 0, size = 40, fill = 'currentColor', anchor = 'start', className = '', ...rest }) {
  return (
    <text
      transform={`translate(${r2(x)} ${r2(y)}) scale(${WORDMARK.stretch} 1)`}
      fontSize={size}
      fontWeight={WORDMARK.weight}
      textAnchor={anchor}
      fill={fill}
      letterSpacing={r2(size * WORDMARK.tracking)}
      className={`wm ${className}`}
      {...rest}
    >
      Best
      <tspan dx={r2(size * WORDMARK.gap)}>Grid</tspan>
    </text>
  );
}

// The word-mark fitted to a width w (font size derived from WORDMARK.width). Baseline at y.
export function WordmarkFitG({ x = 0, y = 0, w = 400, fill = 'currentColor', anchor = 'start', ...rest }) {
  return <WordmarkG x={x} y={y} size={r2(w / WORDMARK.width)} fill={fill} anchor={anchor} {...rest} />;
}

// The word-mark set vertically (the tube bodies m07): reads bottom to top; x, y is the bottom-left of the column.
export function WordmarkVerticalG({ x = 0, y = 0, size = 120, fill = 'currentColor', ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(-90)`} {...rest}>
      <WordmarkG x={0} y={r2(size * 0.76)} size={size} fill={fill} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Lockups. The case study keeps the mark and the word-mark in separate cells of the guide grid; these are the
// arrangements it shows, plus the cell lockup (as the first nav cell of the website, m16) and a stacked one.

// A square node, the system's signature (centred on cx, cy). s = side.
export function NodeG({ cx, cy, s = 6, fill = 'currentColor', ...rest }) {
  return <rect x={r2(cx - s / 2)} y={r2(cy - s / 2)} width={s} height={s} fill={fill} {...rest} />;
}

// Card-back lockup (m05 card back, folder, envelope): word-mark top right, mark bottom left, in a w x h field.
export function LockupCornersG({ x = 0, y = 0, w = 850, h = 550, pad = 0.07, fill = 'currentColor', markFill, wordSize, ...rest }) {
  const p = w * pad;
  const ws = wordSize || w * 0.12;
  const ms = Math.min(w, h) * 0.17;
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <WordmarkG x={r2(w - p)} y={r2(p + ws * WORDMARK.cap)} size={r2(ws)} anchor="end" fill={fill} />
      <MarkG x={r2(p)} y={r2(h - p - ms)} size={r2(ms)} fill={markFill || fill} />
    </g>
  );
}

// Cell lockup (the website's first nav cell, m16; the poster columns m09 / m10): the mark in a square cell, a
// hairline with nodes, the word-mark in the next cell. Box 640 x 160 at scale 1.
export const LOCKUP_CELL = { w: 640, h: 160 };
export function LockupCellG({ x = 0, y = 0, scale = 1, fill = 'currentColor', markFill, line = 'currentColor', nodes = true, ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} {...rest}>
      <MarkG x={36} y={36} size={88} fill={markFill || fill} />
      <path d="M160 0V160M0 160H640" stroke={line} strokeWidth="1.5" fill="none" />
      {nodes && <NodeG cx={160} cy={160} s={9} fill={line} />}
      {nodes && <NodeG cx={640} cy={160} s={9} fill={line} />}
      <WordmarkG x={196} y={r2(80 + (92 * WORDMARK.cap) / 2)} size={92} fill={fill} />
    </g>
  );
}

// Row lockup: mark left, word-mark right, cap height = 0.62 of the mark. Box 520 x 100 at scale 1.
export const LOCKUP_ROW = { w: 520, h: 100 };
export function LockupRowG({ x = 0, y = 0, scale = 1, fill = 'currentColor', markFill, ...rest }) {
  const size = 85;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} {...rest}>
      <MarkG x={0} y={0} size={100} fill={markFill || fill} />
      <WordmarkG x={124} y={r2(50 + (size * WORDMARK.cap) / 2)} size={size} fill={fill} />
    </g>
  );
}

// Stacked lockup: mark above the word-mark, centred. Box 400 x 300 at scale 1.
export const LOCKUP_STACK = { w: 400, h: 300 };
export function LockupStackG({ x = 0, y = 0, scale = 1, fill = 'currentColor', markFill, ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} {...rest}>
      <MarkG x={130} y={0} size={140} fill={markFill || fill} />
      <WordmarkG x={200} y={290} size={92} anchor="middle" fill={fill} />
    </g>
  );
}

// Footer lockup of the posters (m11 right): three ruled cells "bestgrid.com" | mark | "bestgrid.com", with nodes
// at every crossing. Box w x h.
export function LockupFooterG({ x = 0, y = 0, w = 900, h = 120, fill = 'currentColor', line = 'currentColor', web = 'bestgrid.com', size = 18, ...rest }) {
  const c = w / 3;
  const xs = [0, c, 2 * c, w];
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <path d={`M0 0H${w}M0 ${h}H${w}${xs.map((v) => `M${r2(v)} 0V${h}`).join('')}`} stroke={line} strokeWidth="1.2" fill="none" />
      {xs.flatMap((v) => [0, h].map((yy) => <NodeG key={`${v}-${yy}`} cx={r2(v)} cy={yy} s={7} fill={line} />))}
      <text x={r2(c / 2)} y={r2(h / 2 + size * 0.36)} fontSize={size} textAnchor="middle" fill={fill}>{web}</text>
      <MarkG x={r2(w / 2 - h * 0.25)} y={r2(h * 0.25)} size={r2(h * 0.5)} fill={fill} />
      <text x={r2(w - c / 2)} y={r2(h / 2 + size * 0.36)} fontSize={size} textAnchor="middle" fill={fill}>{web}</text>
    </g>
  );
}

// App icon: a Dark Blue tile with the Active Blue mark (as m21). radius in tile units of 100.
export function AppIconG({ x = 0, y = 0, size = 100, radius = 22, tile = '#1b2043', fill = '#5983ff', ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${r2(size / 100)})`} {...rest}>
      <rect width="100" height="100" rx={radius} fill={tile} />
      <MarkG x={20} y={20} size={60} fill={fill} />
    </g>
  );
}

// The mark cropped large inside a w x h panel (a cover graphic grown from the mark). Needs idp.
// zoom: mark size as a multiple of w; dx / dy shift the mark in units of w / h.
export function MarkCropG({ idp, x = 0, y = 0, w = 300, h = 400, zoom = 1.6, dx = -0.3, dy = -0.2, fill = '#5983ff', ...rest }) {
  const id = `${idp}-crop`;
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <clipPath id={id}>
        <rect width={w} height={h} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <MarkG x={r2(w * dx)} y={r2(h * dy)} size={r2(w * zoom)} fill={fill} />
      </g>
    </g>
  );
}
