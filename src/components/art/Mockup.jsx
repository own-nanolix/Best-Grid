// The mockup kit. This project's direction (do not change it per page):
//   Staging:  a CATALOGUE PLATE: the object on one side, spec callouts with leader lines and dimensions on the
//             other, like a product sheet drawn on the brand's guide lines (hairlines and square nodes).
//   Backdrop: a DARK STAGE WITH ONE SOFT SPOTLIGHT (StageG). Its position sets the one light direction: highlights
//             face the spot, shadows fall away from it (castDir), every object sits on a soft contact shadow.
// Each mockup is ONE <Art> SVG: stage, shadows, object, materials, shading, brand artwork and callouts, in one
// viewBox. Every page arranges its plate differently (LAYOUTS.md). Dimensions in callouts are our production
// values in plain mm (BRIEF.md): they are allowed; brand facts are not invented.
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';

// ---------------------------------------------------------------------------------------------------------------
// The stage. spot: { x, y } as fractions of the plate (default upper left of centre), r: spotlight radius as a
// fraction of the larger side, floor: where the floor meets the back wall (fraction of h; null for a seamless
// stage). Needs idp. Put it first in the SVG.
export const STAGE = { ground: '#0c0e1f', wall: '#12152c', light: '#2f3870', glow: '#4a58a8' };

export function StageG({ idp, w, h, spot = { x: 0.36, y: 0.22 }, r = 0.62, floor = 0.7, intensity = 1, ...rest }) {
  const R = Math.max(w, h) * r;
  return (
    <g {...rest}>
      <linearGradient id={`${idp}-stage`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={STAGE.wall} />
        <stop offset={floor === null ? 1 : floor} stopColor={STAGE.ground} />
        {floor !== null && <stop offset={Math.min(1, floor + 0.02)} stopColor="#151935" />}
        <stop offset="1" stopColor={STAGE.ground} />
      </linearGradient>
      <radialGradient id={`${idp}-spot`} gradientUnits="userSpaceOnUse" cx={r2(w * spot.x)} cy={r2(h * spot.y)} r={r2(R)} fx={r2(w * spot.x)} fy={r2(h * spot.y)}>
        <stop offset="0" stopColor={STAGE.glow} stopOpacity={r2(0.55 * intensity)} />
        <stop offset="0.35" stopColor={STAGE.light} stopOpacity={r2(0.4 * intensity)} />
        <stop offset="1" stopColor={STAGE.ground} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${idp}-pool`}>
        <stop offset="0" stopColor={STAGE.light} stopOpacity={r2(0.5 * intensity)} />
        <stop offset="1" stopColor={STAGE.ground} stopOpacity="0" />
      </radialGradient>
      <rect width={w} height={h} fill={`url(#${idp}-stage)`} />
      <rect width={w} height={h} fill={`url(#${idp}-spot)`} className="mock-spot" />
      {floor !== null && <ellipse cx={r2(w * spot.x + w * 0.05)} cy={r2(h * Math.min(0.95, Math.max(floor + 0.14, spot.y + 0.45)))} rx={r2(R * 0.62)} ry={r2(R * 0.16)} fill={`url(#${idp}-pool)`} className="mock-spot" />}
    </g>
  );
}

// Light helpers: the direction from a point to the spot, and the direction shadows fall.
export function lightDir(spot, w, h, x, y) {
  const dx = spot.x * w - x, dy = spot.y * h - y, l = Math.hypot(dx, dy) || 1;
  return { x: dx / l, y: dy / l };
}
export function castDir(spot, w, h, x, y) {
  const d = lightDir(spot, w, h, x, y);
  return { x: -d.x, y: -d.y };
}

// Soft contact shadow under an object (ellipse at cx, cy). Shifted slightly away from the light by `dir`.
export function ShadowG({ idp, cx, cy, rx, ry = rx * 0.16, dir = { x: 0.3, y: 0.2 }, opacity = 0.6, blur = 10, ...rest }) {
  const id = `${idp}-shadow`;
  return (
    <g {...rest}>
      <filter id={id} x="-50%" y="-200%" width="200%" height="500%">
        <feGaussianBlur stdDeviation={blur} />
      </filter>
      <ellipse cx={r2(cx + dir.x * rx * 0.12)} cy={r2(cy + dir.y * ry * 0.4)} rx={rx} ry={r2(ry)} fill="#000000" opacity={opacity} filter={`url(#${id})`} />
      <ellipse cx={cx} cy={cy} rx={r2(rx * 0.8)} ry={r2(ry * 0.4)} fill="#000000" opacity={r2(opacity * 0.7)} />
    </g>
  );
}

// The cast shadow of a flat or standing object: its outline `d`, sheared away from the light. depth = length.
export function CastG({ idp, d, dir = { x: 0.6, y: 0.3 }, depth = 30, opacity = 0.5, blur = 6, ...rest }) {
  return (
    <g {...rest}>
      <filter id={`${idp}-cast`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation={blur} />
      </filter>
      <path d={d} transform={`translate(${r2(dir.x * depth)} ${r2(dir.y * depth)})`} fill="#000000" opacity={opacity} filter={`url(#${idp}-cast)`} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Materials as <defs>. Put <MaterialDefs idp="…" /> once inside each mockup SVG, then use:
//   fill="url(#<idp>-board)"      rigid card / board in Active Blue (tubes, boxes)      -board-dark (Dark Blue)
//   fill="url(#<idp>-paper)"      off-white uncoated paper        fill="url(#<idp>-card)"   coated card, grey-blue
//   fill="url(#<idp>-metal)"      brushed steel                   fill="url(#<idp>-metal-dark)" Dark Blue anodised
//   fill="url(#<idp>-glass)"      glass sheen overlay             fill="url(#<idp>-ceramic)"   white glazed ceramic
//   fill="url(#<idp>-rubber)"     matte rubber                    fill="url(#<idp>-plastic)"   matte Dark Blue plastic
//   fill="url(#<idp>-fabric-blue)" Active Blue woven fabric       fill="url(#<idp>-fabric-dark)" Dark Blue fabric
//   fill="url(#<idp>-shade)"      left-to-right shade over round bodies (light from the left)
//   fill="url(#<idp>-shade-r)"    the same, light from the right   fill="url(#<idp>-shade-v)" top-to-bottom shade
//   filter="url(#<idp>-weave)"    fabric weave texture             filter="url(#<idp>-fibre)"  paper fibre
//   filter="url(#<idp>-grit)"     board grain                      filter="url(#<idp>-soft)"   small blur
export function MaterialDefs({ idp }) {
  const lin = (id, stops, x2 = 1, y2 = 1) => (
    <linearGradient id={`${idp}-${id}`} x1="0" y1="0" x2={x2} y2={y2}>
      {stops.map(([o, c, op]) => (
        <stop key={o} offset={o} stopColor={c} stopOpacity={op === undefined ? 1 : op} />
      ))}
    </linearGradient>
  );
  const noise = (id, freq, oct, alpha, seed, light = false) => (
    <filter id={`${idp}-${id}`} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={oct} seed={seed} result="n" />
      <feColorMatrix in="n" type="matrix" values={`0 0 0 0 ${light ? 1 : 0}  0 0 0 0 ${light ? 1 : 0}  0 0 0 0 ${light ? 1 : 0}  0 0 0 ${alpha} 0`} result="g" />
      <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="gi" />
      </feMerge>
    </filter>
  );
  return (
    <defs>
      {lin('board', [[0, '#6b90ff'], [0.45, HEX.activeBlue], [1, '#3f63d8']])}
      {lin('board-dark', [[0, '#2a3160'], [0.5, HEX.darkBlue], [1, '#10132b']])}
      {lin('paper', [[0, '#ffffff'], [0.6, HEX.paper], [1, '#e2e7f2']])}
      {lin('card', [[0, '#f4f7fb'], [1, '#dfe4ee']])}
      {lin('metal', [[0, '#f2f4f8'], [0.3, '#b7bdcc'], [0.52, '#eceff5'], [0.76, '#949bb0'], [1, '#cfd4df']])}
      {lin('metal-dark', [[0, '#3c4475'], [0.42, HEX.darkBlue], [0.62, '#2b3263'], [1, '#0d1026']])}
      {lin('glass', [[0, '#ffffff', 0.5], [0.36, '#ffffff', 0.06], [0.64, '#ffffff', 0], [1, '#ffffff', 0.18]])}
      <radialGradient id={`${idp}-ceramic`} cx="0.3" cy="0.25" r="0.95">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.6" stopColor="#eef1f7" />
        <stop offset="1" stopColor="#bfc6d6" />
      </radialGradient>
      {lin('rubber', [[0, '#2c3150'], [1, '#121528']])}
      {lin('plastic', [[0, '#2b3159'], [0.55, HEX.darkBlue], [1, '#141733']])}
      {lin('fabric-blue', [[0, '#6c8fff'], [1, '#4b74ee']], 0, 1)}
      {lin('fabric-dark', [[0, '#272d58'], [1, '#161a38']], 0, 1)}
      {lin('shade', [[0, '#ffffff', 0.28], [0.3, '#ffffff', 0], [0.62, '#000000', 0], [1, '#000000', 0.42]], 1, 0)}
      {lin('shade-r', [[0, '#000000', 0.42], [0.38, '#000000', 0], [0.7, '#ffffff', 0], [1, '#ffffff', 0.28]], 1, 0)}
      {lin('shade-v', [[0, '#ffffff', 0.2], [0.4, '#000000', 0], [1, '#000000', 0.34]], 0, 1)}
      {noise('weave', '0.9 0.35', 2, 0.28, 5)}
      {noise('fibre', 1.3, 1, 0.08, 11)}
      {noise('grit', 0.6, 3, 0.14, 9, true)}
      <filter id={`${idp}-soft`} x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
    </defs>
  );
}

// Glass or gloss sheen that slowly breathes toward the light. Place over a shape of the same geometry.
export function SheenG({ idp, d, opacity = 0.4, ...rest }) {
  return <path d={d} fill={`url(#${idp}-glass)`} opacity={opacity} className="mock-sheen" {...rest} />;
}

// The hero object of a plate turning slowly to the light on load (CSS, lands on the finished artwork).
export function LitG({ children, ...rest }) {
  return (
    <g {...rest}>
      <g className="mock-lit">{children}</g>
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Catalogue-plate parts (drawn in the brand's guide-line language: hairlines and square nodes).
export const PLATE = { line: '#8b96c8', text: '#e4e7ef', muted: '#a9b2d6', accent: HEX.activeBlue, size: 15 };

// A callout: a node on the object at (x, y), a leader line with one elbow to (tx, ty), then the label running
// along a short rule. side: 'right' | 'left' (which way the label reads). i: order of the draw-on.
export function CalloutG({ x, y, tx, ty, label, sub, side = 'right', i = 0, color = PLATE.line, text = PLATE.text, size = PLATE.size, lang, ...rest }) {
  const ex = side === 'right' ? tx - 24 : tx + 24; // elbow just before the label rule
  const d = `M${r2(x)} ${r2(y)}L${r2(ex)} ${r2(ty)}L${r2(tx)} ${r2(ty)}`;
  const len = Math.round(Math.hypot(ex - x, ty - y) + Math.abs(tx - ex));
  const anchor = side === 'right' ? 'start' : 'end';
  const lx = side === 'right' ? tx + 10 : tx - 10;
  return (
    <g {...rest}>
      <path d={d} fill="none" stroke={color} strokeWidth="1" className="callout-line" style={{ '--len': len, '--i': i }} />
      <rect x={r2(x - 4)} y={r2(y - 4)} width="8" height="8" fill={PLATE.accent} className="callout-node" style={{ '--i': i }} />
      <rect x={r2(tx - 3)} y={r2(ty - 3)} width="6" height="6" fill={color} className="callout-node" style={{ '--i': i }} />
      <g className="callout-text" style={{ '--i': i }} lang={lang}>
        <text x={r2(lx)} y={r2(ty + size * 0.36)} fontSize={size} fill={text} textAnchor={anchor}>{label}</text>
        {sub && <text x={r2(lx)} y={r2(ty + size * 0.36 + size * 1.35)} fontSize={r2(size * 0.8)} fill={PLATE.muted} textAnchor={anchor}>{sub}</text>}
      </g>
    </g>
  );
}

// A dimension line between two points with end ticks and the value centred on it, offset from the object by
// `offset` (perpendicular, positive = to the left of the direction of travel). value: "210 mm".
export function DimensionG({ x1, y1, x2, y2, value, offset = 28, i = 0, color = PLATE.line, text = PLATE.text, size = 13, ...rest }) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
  const ax = x1 + nx * offset, ay = y1 + ny * offset, bx = x2 + nx * offset, by = y2 + ny * offset;
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const up = ang > 90 || ang < -90 ? ang + 180 : ang;
  const mx = (ax + bx) / 2 + nx * 10, my = (ay + by) / 2 + ny * 10;
  const t = 6;
  return (
    <g {...rest}>
      <path d={`M${r2(x1 + nx * 6)} ${r2(y1 + ny * 6)}L${r2(ax + nx * 6)} ${r2(ay + ny * 6)}M${r2(x2 + nx * 6)} ${r2(y2 + ny * 6)}L${r2(bx + nx * 6)} ${r2(by + ny * 6)}`} stroke={color} strokeWidth="0.75" opacity="0.6" fill="none" />
      <path d={`M${r2(ax)} ${r2(ay)}L${r2(bx)} ${r2(by)}`} stroke={color} strokeWidth="1" fill="none" className="callout-line" style={{ '--len': Math.round(l), '--i': i }} />
      <path d={`M${r2(ax - nx * t)} ${r2(ay - ny * t)}L${r2(ax + nx * t)} ${r2(ay + ny * t)}M${r2(bx - nx * t)} ${r2(by - ny * t)}L${r2(bx + nx * t)} ${r2(by + ny * t)}`} stroke={color} strokeWidth="1.25" fill="none" />
      <text x={r2(mx)} y={r2(my)} fontSize={size} fill={text} textAnchor="middle" transform={`rotate(${r2(up)} ${r2(mx)} ${r2(my)})`} className="callout-text" style={{ '--i': i }}>
        {value}
      </text>
    </g>
  );
}

// A spec column: a title, then rows of key / value between hairlines, nodes where rows meet the column's left
// rule. rows: [{ k: 'Format', v: '297 × 210 mm' }]. w: column width.
export function SpecColumnG({ x = 0, y = 0, w = 300, title, rows = [], rowH = 40, color = PLATE.line, text = PLATE.text, muted = PLATE.muted, size = 14, lang, ...rest }) {
  const h = (title ? 46 : 0) + rows.length * rowH;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} {...rest}>
      <rect x="-0.5" y="0" width="1" height={h} fill={color} className="extend-y" />
      {title && (
        <text x="16" y="24" fontSize={r2(size * 1.25)} fill={text} className="callout-text" lang={lang}>
          {title}
        </text>
      )}
      {rows.map((r, i) => {
        const ry = (title ? 46 : 0) + i * rowH;
        return (
          <g key={r.k} className="callout-text" style={{ '--i': i + 1 }}>
            <rect x="0" y={ry} width={w} height="1" fill={color} opacity="0.7" />
            <rect x="-3" y={ry - 3} width="6" height="6" fill={color} />
            <text x="16" y={r2(ry + rowH * 0.62)} fontSize={r2(size * 0.86)} fill={muted}>{r.k}</text>
            <text x={w} y={r2(ry + rowH * 0.62)} fontSize={size} fill={text} textAnchor="end" lang={r.lang}>{r.v}</text>
          </g>
        );
      })}
      <rect x="0" y={h} width={w} height="1" fill={color} opacity="0.7" />
      <rect x="-3" y={h - 3} width="6" height="6" fill={color} />
    </g>
  );
}

// The plate furniture: a hairline frame inset by m with nodes at its corners, an optional divider between the
// object side and the spec side at fraction `split` (vertical) and a plate number bottom left ("01"). No text but
// the number unless `label` is given.
export function PlateFrameG({ w, h, m = 28, split, no, label, color = PLATE.line, ...rest }) {
  const sx = split ? r2(w * split) : null;
  const pts = [[m, m], [w - m, m], [m, h - m], [w - m, h - m], ...(sx ? [[sx, m], [sx, h - m]] : [])];
  return (
    <g {...rest} opacity="0.85">
      <rect x={m} y={m} width={r2(w - 2 * m)} height={r2(h - 2 * m)} fill="none" stroke={color} strokeWidth="0.75" opacity="0.5" />
      {sx && <rect x={sx - 0.375} y={m} width="0.75" height={r2(h - 2 * m)} fill={color} opacity="0.5" className="extend-y" />}
      {pts.map(([px, py]) => (
        <rect key={`${px}-${py}`} x={r2(px - 3)} y={r2(py - 3)} width="6" height="6" fill={color} className="snap" />
      ))}
      {no && <text x={m + 12} y={h - m - 12} fontSize="13" fill={PLATE.muted}>{no}</text>}
      {label && <text x={w - m - 12} y={h - m - 12} fontSize="13" fill={PLATE.muted} textAnchor="end">{label}</text>}
    </g>
  );
}

// Helper: positions for n objects along a row from x0 to x1 at y (for line-ups inside a plate).
export function lineup(n, x0, x1, y = 0) {
  return Array.from({ length: n }, (_, i) => ({ x: Math.round(n === 1 ? x0 : x0 + ((x1 - x0) * i) / (n - 1)), y, i }));
}
