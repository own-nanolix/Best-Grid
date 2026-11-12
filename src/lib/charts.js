// Best Grid's chart helpers: scales, paths, ticks. Pure functions that return numbers and SVG path strings.
// Charts are drawn as inline SVG by the pages; geometry goes in attributes, never in CSS.
// The brand's chart language (m17): an area in Active Blue at about 45% opacity broken into soft vertical bands,
// grey hairline gridlines, small "x.000 MW" labels, square nodes on the baseline, a vertical marker at the peak;
// square-cornered treemaps with oversized numerals; a node grid of square cells in two strengths of blue.

export const scale = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0 || 1)) * (r1 - r0);
export const r2 = (n) => Math.round(n * 100) / 100;

// linePath([[x,y],...]) -> "M..L.." (straight segments)
export function linePath(points) {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${r2(x)} ${r2(y)}`).join('');
}

// Stepped line (horizontal then vertical): the orthogonal language of the guide lines.
export function stepPath(points) {
  let d = '';
  points.forEach(([x, y], i) => {
    if (!i) d += `M${r2(x)} ${r2(y)}`;
    else d += `H${r2(x)}V${r2(y)}`;
  });
  return d;
}

// Closes a line down to a baseline.
export function areaPath(points, baseY, stepped = false) {
  const top = stepped ? stepPath(points) : linePath(points);
  return `${top}L${r2(points[points.length - 1][0])} ${r2(baseY)}L${r2(points[0][0])} ${r2(baseY)}Z`;
}

// A jagged series between known anchor values, as in the m17 area chart (the published values are the anchors;
// the wiggle between them is drawing, not data). anchors: [{ x, v }]; returns [[x, v]] with `per` points per span.
// Deterministic (seeded), so server and browser draw the same artwork.
export function jagged(anchors, per = 8, amp = 0.06, seed = 7) {
  const rnd = seeded(seed);
  const out = [];
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i], b = anchors[i + 1];
    for (let k = 0; k < per; k++) {
      const t = k / per;
      const base = a.v + (b.v - a.v) * t;
      const w = k === 0 ? 0 : (rnd() - 0.5) * 2 * amp * Math.max(a.v, b.v);
      out.push([a.x + (b.x - a.x) * t, base + w]);
    }
  }
  const last = anchors[anchors.length - 1];
  out.push([last.x, last.v]);
  return out;
}

// Vertical bands for the "soft vertical stripes" fill of the area chart: [{ x, w, o }] across [x0, x1].
export function bands(x0, x1, n = 24, o0 = 0.36, o1 = 0.5) {
  const w = (x1 - x0) / n;
  return Array.from({ length: n }, (_, i) => ({ x: r2(x0 + i * w), w: r2(w + 0.5), o: r2(i % 2 ? o0 : o1) }));
}

export const polar = (cx, cy, r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))];
};

// Arc (centre line) from angle a0 to a1 in degrees, 0 = 12 o'clock, clockwise.
export function arcPath(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M${x0} ${y0}A${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
}

// A band between two radii with straight radial ends (the broken ring of the turbine icon).
export function bandPath(cx, cy, r0, r1, a0, a1) {
  const [ax, ay] = polar(cx, cy, r1, a0), [bx, by] = polar(cx, cy, r1, a1);
  const [cx2, cy2] = polar(cx, cy, r0, a1), [dx, dy] = polar(cx, cy, r0, a0);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${ax} ${ay}A${r1} ${r1} 0 ${large} 1 ${bx} ${by}L${cx2} ${cy2}A${r0} ${r0} 0 ${large} 0 ${dx} ${dy}Z`;
}

// Squarified treemap (square-cornered blocks, as the m17 "Capacidad gestionada" block).
// items: [{ value, ...any }] -> [{ ...item, x, y, w, h }] inside (x, y, w, h). gap in px between blocks.
export function treemap(items, x, y, w, h, gap = 0) {
  const out = [];
  let rest = [...items].sort((a, b) => b.value - a.value);
  let box = { x, y, w, h };
  while (rest.length) {
    const it = rest.shift();
    const share = it.value / (it.value + rest.reduce((a, b) => a + b.value, 0) || 1);
    if (!rest.length) { out.push({ ...it, ...box }); break; }
    if (box.w >= box.h) {
      const cw = box.w * share;
      out.push({ ...it, x: box.x, y: box.y, w: Math.max(0, cw - gap), h: box.h });
      box = { x: box.x + cw, y: box.y, w: box.w - cw, h: box.h };
    } else {
      const ch = box.h * share;
      out.push({ ...it, x: box.x, y: box.y, w: box.w, h: Math.max(0, ch - gap) });
      box = { x: box.x, y: box.y + ch, w: box.w, h: box.h - ch };
    }
  }
  return out.map((b) => ({ ...b, x: r2(b.x), y: r2(b.y), w: r2(b.w), h: r2(b.h) }));
}

// A grid of square cells: [{ col, row, x, y }] for cols x rows cells of `size` with `gap`.
export function cellGrid(cols, rows, size, gap = 0) {
  const out = [];
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) out.push({ col, row, x: r2(col * (size + gap)), y: r2(row * (size + gap)) });
  return out;
}

// Nice ticks for ordinary axes.
export function ticks(d0, d1, n = 5) {
  const span = d1 - d0, step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => span / s <= n) || mag * 10;
  const out = [];
  for (let v = Math.ceil(d0 / step) * step; v <= d1 + 1e-9; v += step) out.push(r2(v));
  return out;
}

// Spanish number format as printed in the case study: 15420 -> "15.420"; mw(15420) -> "15.420 MW".
export const es = (n, decimals = 0) => n.toLocaleString('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: 'always' });
export const mw = (n) => `${es(n)} MW`;

// Shares of a total as fractions that add up to 1: [{ value, share, start }]
export function shares(values) {
  const total = values.reduce((a, b) => a + b, 0) || 1;
  let start = 0;
  return values.map((value) => {
    const s = { value, share: value / total, start };
    start += value / total;
    return s;
  });
}

// Segmented progress: n square segments across w with a gap; returns [{ x, w, on }]
export function segments(n, w, filled, gap = 4) {
  const sw = (w - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ x: r2(i * (sw + gap)), w: r2(sw), on: i < filled }));
}

// Deterministic pseudo-random numbers, so the server and the browser draw the same artwork.
export function seeded(seed = 1) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
