// Key art in Best Grid's own language. Everything grows from the case study's few elements:
//   the guide lines that run edge to edge with square nodes at their crossings (every slide and poster);
//   the baseline field of the poster grid (m10: hairlines alternating Active Blue and grey, white gutters);
//   the crossing bands of the folder (m05: two straight bands meeting with large fillets);
//   the mark's lattice (frames at a fixed pitch, a centre cross, two diagonals);
//   the node grid of the phone (m17: square cells, clusters in two strengths of Active Blue, quarter cells);
//   flat Dark Blue blocks at 75% standing in for photographs (m10); paper and board grain.
// Every component returns an SVG group (<g>) or <defs>; wrap in <Art> for a standalone graphic. Components that
// create gradients, clips, patterns or filters take an `idp` (id prefix): use a different one each time.
import { r2, seeded } from '@/lib/charts';
import { MARK, MARK_D, markOutline } from './Mark';
import { CORE, PIXEL32, turbinePath } from '@/components/site/icons';
import { HEX } from '@/lib/brand';

// ---------------------------------------------------------------------------------------------------------------
// Guide lines and nodes

// A square node centred on (cx, cy).
export function NodeG({ cx, cy, s = 6, fill = 'currentColor', className, ...rest }) {
  return <rect x={r2(cx - s / 2)} y={r2(cy - s / 2)} width={s} height={s} fill={fill} className={className} {...rest} />;
}

// Guide frame: hairlines at xs (vertical) and ys (horizontal) running across the whole box (w x h), a node at every
// crossing (or only at `nodes` = [[x, y], ...]). animate: lines extend, then nodes snap (CSS, lands on the artwork).
export function GuidesG({ w, h, xs = [], ys = [], nodes, stroke = 'currentColor', weight = 1, node = 6, nodeFill, animate = false, ...rest }) {
  const pts = nodes || xs.flatMap((x) => ys.map((y) => [x, y]));
  let i = 0;
  return (
    <g {...rest}>
      {ys.map((y) => (
        <rect key={`h${y}`} x={0} y={r2(y - weight / 2)} width={w} height={weight} fill={stroke} className={animate ? 'extend-x' : undefined} style={animate ? { '--i': i++ } : undefined} />
      ))}
      {xs.map((x) => (
        <rect key={`v${x}`} x={r2(x - weight / 2)} y={0} width={weight} height={h} fill={stroke} className={animate ? 'extend-y' : undefined} style={animate ? { '--i': i++ } : undefined} />
      ))}
      {pts.map(([x, y], k) => (
        <NodeG key={`n${x}-${y}`} cx={x} cy={y} s={node} fill={nodeFill || stroke} className={animate ? 'snap' : undefined} style={animate ? { '--i': k + 4 } : undefined} />
      ))}
    </g>
  );
}

// The live-area frame of the posters (m09 to m11): a rectangle inset by `m` with lines running out to the edges and
// nodes at its four corners (plus optional extra rows `rows` = y values with nodes where they meet the frame).
export function LiveAreaG({ w, h, m = w * 0.067, rows = [], cols = [], stroke = 'currentColor', weight = 1, node = 6, animate = false, ...rest }) {
  const xs = [m, w - m, ...cols];
  const ys = [m, h - m, ...rows];
  return <GuidesG w={w} h={h} xs={xs} ys={ys} stroke={stroke} weight={weight} node={node} animate={animate} {...rest} />;
}

// ---------------------------------------------------------------------------------------------------------------
// The baseline field of the poster grid (m10). Columns of horizontal hairlines, alternating Active Blue and grey,
// with gutters left clear. As measured on m10: one line pair (Active Blue, then grey) every 0.63% of the sheet height,
// in blocks of 18 pairs with one empty pitch between blocks. Passing `step` (the spacing of ONE line) draws a plain
// repeating pair instead (no blocks).
export function BaselineFieldG({ idp, x = 0, y = 0, w, h, cols = 6, gutter = w * 0.008, step, pitch = h * 0.0063, block = 18, colorA = HEX.activeBlue, colorB = HEX.greyLine, weight = 0.6, opacity = 1, ...rest }) {
  const cw = (w - gutter * (cols - 1)) / cols;
  const plain = step != null;
  const ph = plain ? step * 2 : pitch * (block + 1);
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} opacity={opacity} {...rest}>
      <pattern id={`${idp}-base`} width={r2(cw + gutter)} height={r2(ph)} patternUnits="userSpaceOnUse">
        {plain ? (
          <>
            <rect y={0} width={r2(cw)} height={weight} fill={colorA} />
            <rect y={r2(step)} width={r2(cw)} height={weight} fill={colorB} />
          </>
        ) : Array.from({ length: block }, (_, i) => (
          <g key={i}>
            <rect y={r2(i * pitch)} width={r2(cw)} height={weight} fill={colorA} />
            <rect y={r2(i * pitch + pitch / 2)} width={r2(cw)} height={weight} fill={colorB} />
          </g>
        ))}
      </pattern>
      <rect width={r2(w)} height={r2(h)} fill={`url(#${idp}-base)`} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The crossing bands of the folder (m05): two straight bands across a w x h panel, crossing at (cx, cy), with large
// fillets in the four inside corners. a1 / a2: angles of the bands in degrees (m05: -72 and 21 from horizontal, the mirror of the first reading);
// band: band width; r: fillet radius. Returns one path (fill).
export function crossingPath({ w, h, cx, cy, a1 = 72, a2 = -21, band = 12, r = 40 }) {
  const dir = (a) => [Math.cos((a * Math.PI) / 180), -Math.sin((a * Math.PI) / 180)];
  const d1 = dir(a1), d2 = dir(a2);
  const n1 = [-d1[1], d1[0]], n2 = [-d2[1], d2[0]];
  const L = Math.hypot(w, h) * 2;
  const bandPoly = (d, n) => {
    const hw = band / 2;
    return [
      [cx - d[0] * L + n[0] * hw, cy - d[1] * L + n[1] * hw],
      [cx + d[0] * L + n[0] * hw, cy + d[1] * L + n[1] * hw],
      [cx + d[0] * L - n[0] * hw, cy + d[1] * L - n[1] * hw],
      [cx - d[0] * L - n[0] * hw, cy - d[1] * L - n[1] * hw],
    ];
  };
  const P = (pts) => pts.map(([px, py], i) => `${i ? 'L' : 'M'}${r2(px)} ${r2(py)}`).join('') + 'Z';
  let d = P(bandPoly(d1, n1)) + P(bandPoly(d2, n2));
  // fillets: for each quadrant (s1, s2) the corner where the band edges meet, and an arc of radius r tangent to both
  const hw = band / 2;
  for (const s1 of [1, -1]) for (const s2 of [1, -1]) {
    // edge lines: p = c + n1*s1*hw + t*d1 ; q = c + n2*s2*hw + u*d2
    const o1 = [cx + n1[0] * s1 * hw, cy + n1[1] * s1 * hw];
    const o2 = [cx + n2[0] * s2 * hw, cy + n2[1] * s2 * hw];
    const det = d1[0] * -d2[1] - d1[1] * -d2[0];
    const t = ((o2[0] - o1[0]) * -d2[1] - (o2[1] - o1[1]) * -d2[0]) / det;
    const corner = [o1[0] + d1[0] * t, o1[1] + d1[1] * t];
    // directions from the corner along each edge, away from the other band (into the quadrant)
    const e1 = [d1[0] * Math.sign(d1[0] * n2[0] * s2 + d1[1] * n2[1] * s2 || 1), d1[1] * Math.sign(d1[0] * n2[0] * s2 + d1[1] * n2[1] * s2 || 1)];
    const e2 = [d2[0] * Math.sign(d2[0] * n1[0] * s1 + d2[1] * n1[1] * s1 || 1), d2[1] * Math.sign(d2[0] * n1[0] * s1 + d2[1] * n1[1] * s1 || 1)];
    const ang = Math.acos(Math.max(-1, Math.min(1, e1[0] * e2[0] + e1[1] * e2[1])));
    const tl = r / Math.tan(ang / 2);
    const t1 = [corner[0] + e1[0] * tl, corner[1] + e1[1] * tl];
    const t2 = [corner[0] + e2[0] * tl, corner[1] + e2[1] * tl];
    const sweep = e1[0] * e2[1] - e1[1] * e2[0] > 0 ? 0 : 1;
    d += `M${r2(corner[0])} ${r2(corner[1])}L${r2(t1[0])} ${r2(t1[1])}A${r2(r)} ${r2(r)} 0 0 ${sweep} ${r2(t2[0])} ${r2(t2[1])}Z`;
  }
  return d;
}

// <CrossingBandsG idp w h /> : the folder graphic clipped to its panel. Defaults measured on m05: crossing at
// (48%, 46%), bands at -72 and 21 degrees, band 2% of the width, fillet about 6% of the width.
export function CrossingBandsG({ idp, x = 0, y = 0, w = 600, h = 860, cx = 0.48, cy = 0.46, a1 = -72, a2 = 21, band = 0.02, r = 0.06, fill = HEX.activeBlue, className, ...rest }) {
  const d = crossingPath({ w, h, cx: w * cx, cy: h * cy, a1, a2, band: w * band, r: w * r });
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} {...rest}>
      <clipPath id={`${idp}-cross`}>
        <rect width={w} height={h} />
      </clipPath>
      <path d={d} fill={fill} clipPath={`url(#${idp}-cross)`} className={className} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The lattice: the mark's construction extended into a field. Bars of width b on a pitch p (the mark's ratio
// b / p = 0.41), a cross every `every` cells, diagonals optional. As a pattern so it fills any shape.
export function LatticeDefs({ idp, p = 64, ratio = MARK.B / MARK.P, fill = HEX.activeBlue, diagonals = true }) {
  const b = r2(p * ratio * 0.5);
  return (
    <defs>
      <pattern id={`${idp}-lattice`} width={p} height={p} patternUnits="userSpaceOnUse">
        <rect width={p} height={b} fill={fill} />
        <rect width={b} height={p} fill={fill} />
        {diagonals && <path d={`M0 0L${b} 0L${p} ${r2(p - b)}L${p} ${p}L${r2(p - b)} ${p}L0 ${b}Z`} fill={fill} opacity="0.55" />}
      </pattern>
    </defs>
  );
}

// The mark's lattice as a large field: concentric square frames around a centre with a cross and diagonals,
// exactly the mark's construction (pitch P, bar B) scaled by k and continued outward `rings` times. Fill only.
export function LatticeFieldG({ cx = 0, cy = 0, k = 4, rings = 5, fill = 'currentColor', diagonals = true, className, ...rest }) {
  const P = MARK.P * k, B = MARK.B * k, R = rings * P + B / 2, dg = MARK.diag * k;
  const sq = (h) => `M${r2(cx - h)} ${r2(cy - h)}H${r2(cx + h)}V${r2(cy + h)}H${r2(cx - h)}Z`;
  const rings_ = Array.from({ length: rings }, (_, i) => sq((i + 1) * P + B / 2) + sq((i + 1) * P - B / 2)).join('');
  const cross = `M${r2(cx - B / 2)} ${r2(cy - R)}H${r2(cx + B / 2)}V${r2(cy + R)}H${r2(cx - B / 2)}Z` + `M${r2(cx - R)} ${r2(cy - B / 2)}H${r2(cx + R)}V${r2(cy + B / 2)}H${r2(cx - R)}Z`;
  const diag = (s) => `M${r2(cx - R)} ${r2(cy - s * R)}L${r2(cx - R + dg)} ${r2(cy - s * R)}L${r2(cx + R)} ${r2(cy + s * (R - dg))}L${r2(cx + R)} ${r2(cy + s * R)}L${r2(cx + R - dg)} ${r2(cy + s * R)}L${r2(cx - R)} ${r2(cy - s * (R - dg))}Z`;
  return (
    <g fill={fill} className={className} {...rest}>
      <path d={rings_} fillRule="evenodd" />
      <path d={cross} />
      {diagonals && <path d={diag(1)} />}
      {diagonals && <path d={diag(-1)} />}
    </g>
  );
}

// The mark's outline alone (no lattice), for echoes and construction drawings, in a square of `size`.
export const MARK_OUTLINE_D = markOutline().map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('') + 'Z';
export function StarOutlineG({ x = 0, y = 0, size = 100, stroke = 'currentColor', weight = 1, ...rest }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(size / 100)})`} {...rest}>
      <path d={MARK_OUTLINE_D} fill="none" stroke={stroke} strokeWidth={r2((weight * 100) / size)} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

// Echo: the star outline repeated at growing sizes around one centre (a pulse leaving a node).
export function StarEchoG({ cx = 0, cy = 0, size = 100, count = 6, step = 0.35, stroke = 'currentColor', weight = 1, animate = false, ...rest }) {
  return (
    <g {...rest}>
      {Array.from({ length: count }, (_, i) => {
        const s = size * (1 + i * step);
        return (
          <g key={i} className={animate ? 'fade-in' : undefined} style={animate ? { '--i': i * 3 } : undefined} opacity={r2(1 - i / (count + 1))}>
            <StarOutlineG x={cx - s / 2} y={cy - s / 2} size={s} stroke={stroke} weight={weight} />
          </g>
        );
      })}
    </g>
  );
}

// Tiled marks on the grid (a pattern sheet): cols x rows marks of `size` with a gap; every `alt` one in altFill.
export function MarkTileG({ x = 0, y = 0, cols = 6, rows = 4, size = 60, gap = 30, fill = 'currentColor', altFill, alt = 0, ...rest }) {
  const items = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) items.push({ r, c, i: r * cols + c });
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} {...rest}>
      {items.map(({ r, c, i }) => (
        <g key={i} transform={`translate(${r2(c * (size + gap))} ${r2(r * (size + gap))}) scale(${r2(size / 100)})`}>
          <path d={MARK_D} fillRule="evenodd" fill={alt && altFill && i % alt === 0 ? altFill : fill} />
        </g>
      ))}
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The node grid of the phone (m17 back screen): square cells with hairline outlines; clusters filled in two
// strengths of Active Blue (full and about 75%); some quarter-size cells. Drawing only: cells carry no data.
// Deterministic from `seed`. Returns the cells so a page can make them interactive.
export function nodeCells({ cols = 10, rows = 18, seed = 3, clusters = 9 } = {}) {
  const rnd = seeded(seed);
  const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
  for (let k = 0; k < clusters; k++) {
    const w = 1 + Math.floor(rnd() * 4), h = 1 + Math.floor(rnd() * 4);
    const x = Math.floor(rnd() * (cols - w + 1)), y = Math.floor(rnd() * (rows - h + 1));
    const v = rnd() < 0.55 ? 1 : 2;
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) grid[yy][xx] = v;
  }
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const q = grid[r][c] === 0 && rnd() < 0.07 ? 1 + Math.floor(rnd() * 4) : 0; // a quarter cell in one corner
    cells.push({ r, c, v: grid[r][c], q });
  }
  return cells;
}

export function NodeGridG({ x = 0, y = 0, cols = 10, rows = 18, size = 34, seed = 3, clusters = 9, line = HEX.darkBlue, lineOpacity = 0.22, full = HEX.activeBlue, soft = HEX.blueSoft, animate = false, ...rest }) {
  const cells = nodeCells({ cols, rows, seed, clusters });
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} {...rest}>
      {cells.map(({ r, c, v, q }) => {
        const cx = c * size, cy = r * size, hs = size / 2;
        const qx = cx + (q === 2 || q === 3 ? hs : 0), qy = cy + (q >= 3 ? hs : 0);
        return (
          <g key={`${r}-${c}`}>
            {v > 0 && <rect x={cx} y={cy} width={size} height={size} fill={v === 1 ? full : soft} className={animate ? 'fill-in' : undefined} style={animate ? { '--i': (r + c) % 12 } : undefined} />}
            {q > 0 && <rect x={qx} y={qy} width={hs} height={hs} fill={full} />}
            <rect x={cx + 0.5} y={cy + 0.5} width={size - 1} height={size - 1} fill="none" stroke={line} strokeOpacity={lineOpacity} strokeWidth="1" />
          </g>
        );
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Textures, gradients and photo stand-ins as <defs>. Put <BrandDefs idp="…" /> once in an SVG, then use:
//   filter="url(#<idp>-grain)"   fine paper grain (feTurbulence 0.9, 2 octaves, about 6%)
//   filter="url(#<idp>-board)"   coarser uncoated board grain (0.6), for the blue boxes and tubes
//   fill="url(#<idp>-fog)"       the fog field of m01 (peach to plum), standing in for the hero photograph
//   fill="url(#<idp>-sunset)"    the sunset of m16 / m19 (Dark Blue sky to orange)
//   fill="url(#<idp>-bubble)"    the metallic bubble film of the mailer (m05)
//   fill="url(#<idp>-base)"      not here: use BaselineFieldG
export function BrandDefs({ idp, grain = 0.06 }) {
  return (
    <defs>
      <filter id={`${idp}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
        <feColorMatrix in="n" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${grain} 0`} result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="gi" />
        </feMerge>
      </filter>
      <filter id={`${idp}-board`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="9" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.12 0" result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="gi" />
        </feMerge>
      </filter>
      <linearGradient id={`${idp}-fog`} x1="0.15" y1="0" x2="0.6" y2="1">
        <stop offset="0" stopColor={HEX.fogHi} />
        <stop offset="0.28" stopColor={HEX.fogMid} />
        <stop offset="0.52" stopColor={HEX.fog} />
        <stop offset="0.78" stopColor={HEX.fogLow} />
        <stop offset="1" stopColor={HEX.plum} />
      </linearGradient>
      <radialGradient id={`${idp}-fog-light`} cx="0.12" cy="0.1" r="0.7">
        <stop offset="0" stopColor={HEX.white} stopOpacity="0.8" />
        <stop offset="1" stopColor={HEX.white} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${idp}-sunset`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={HEX.darkBlue} />
        <stop offset="0.45" stopColor={HEX.sunsetMid} />
        <stop offset="0.72" stopColor={HEX.sunsetLow} />
        <stop offset="0.86" stopColor={HEX.sunset} />
        <stop offset="1" stopColor={HEX.sunsetEnd} />
      </linearGradient>
      <radialGradient id={`${idp}-bubble-cell`} cx="0.35" cy="0.3" r="0.7">
        <stop offset="0" stopColor={HEX.bubbleHi} />
        <stop offset="0.35" stopColor={HEX.bubbleMid} />
        <stop offset="1" stopColor={HEX.bubbleLow} />
      </radialGradient>
      <pattern id={`${idp}-bubble`} width="34" height="29.4" patternUnits="userSpaceOnUse">
        <rect width="34" height="29.4" fill={HEX.bubbleLow} />
        <path d="M8.5 0L17 4.9V14.7L8.5 19.6L0 14.7V4.9Z" fill={`url(#${idp}-bubble-cell)`} />
        <path d="M25.5 14.7L34 19.6V29.4L25.5 34.3L17 29.4V19.6Z" fill={`url(#${idp}-bubble-cell)`} />
        <path d="M25.5 -4.9L34 0V9.8L25.5 14.7L17 9.8V0Z" fill={`url(#${idp}-bubble-cell)`} />
      </pattern>
    </defs>
  );
}

// The fog field of m01 (a stand-in for the hero photograph: no turbine photo is reproduced). Needs BrandDefs.
export function FogFieldG({ idp, w, h, ...rest }) {
  return (
    <g {...rest}>
      <rect width={w} height={h} fill={`url(#${idp}-fog)`} />
      <rect width={w} height={h} fill={`url(#${idp}-fog-light)`} />
      {[0.32, 0.4, 0.62].map((t, i) => (
        <rect key={t} x={0} y={r2(h * t)} width={w} height={r2(h * 0.03)} fill={HEX.white} opacity={0.08 + i * 0.03} />
      ))}
    </g>
  );
}

// Light trails over a sunset (m16 / m19 stand-in): cyan and Active Blue catenaries between two heights.
export function TrailsG({ w, h, count = 7, y0 = 0.2, y1 = 0.62, sag = 0.08, color = HEX.trail, ...rest }) {
  return (
    <g fill="none" {...rest}>
      {Array.from({ length: count }, (_, i) => {
        const a = h * (y0 + (i * 0.05)), b = h * (y1 - i * 0.045);
        return <path key={i} d={`M0 ${r2(a)}Q${r2(w * 0.5)} ${r2((a + b) / 2 + h * sag)} ${w} ${r2(b)}`} stroke={i % 2 ? HEX.activeBlue : color} strokeWidth={r2(1.2 + (i % 3) * 0.6)} opacity={r2(0.55 + (i % 2) * 0.3)} />;
      })}
    </g>
  );
}

// A flat Dark Blue block at 75% opacity standing in for a photograph (m10).
export function PhotoBlockG({ x = 0, y = 0, w, h, fill = HEX.darkBlue, opacity = 0.75, ...rest }) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} {...rest} />;
}

// One of the brand's icons drawn large as artwork (line art of turbines, pylons, panels, racks in the icon manner).
// name: a CORE icon (24 grid) or, with px, one of the four 32-grid icons of the case study.
export function IconArtG({ name, px = false, x = 0, y = 0, size = 240, fill = 'currentColor', className, ...rest }) {
  const d = px ? PIXEL32[name] : CORE[name];
  const k = size / (px ? 32 : 24);
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k)})`} {...rest}>
      <path d={d} fill={fill} className={className} />
    </g>
  );
}

// The turbine of m14 at any size, with its construction (the 32 grid and three guide circles) if `construction`.
export function TurbineConstructionG({ x = 0, y = 0, size = 320, fill = HEX.darkBlue, guide = HEX.activeBlue, construction = true, ...rest }) {
  const u = size / 32;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} {...rest}>
      {construction && (
        <g fill="none" stroke={guide} strokeWidth="0.75">
          {Array.from({ length: 33 }, (_, i) => (
            <path key={i} d={`M${r2(i * u)} 0V${r2(size)}M0 ${r2(i * u)}H${r2(size)}`} />
          ))}
          {[1.5, 6, 7, 10.5].map((rr) => (
            <circle key={rr} cx={r2(16 * u)} cy={r2(16 * u)} r={r2(rr * u)} />
          ))}
        </g>
      )}
      <g transform={`scale(${r2(u)})`}>
        <path d={turbinePath(16, 16, 1)} fill={fill} />
      </g>
    </g>
  );
}
