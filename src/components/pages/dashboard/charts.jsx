'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { HEX, CAPACITY, TECH } from '@/lib/brand';
import { scale, r2, linePath, areaPath, jagged, bands, treemap } from '@/lib/charts';
import { CELLS, GRID, LEVELS } from './data';
import s from './dashboard.module.css';

// Exportable (Art) when exportName is given, otherwise the same drawing as a plain labelled svg.
export function Svg({ exportName, title, viewBox, children, ...rest }) {
  if (exportName) return <Art viewBox={viewBox} title={title} exportName={exportName} {...rest}>{children}</Art>;
  return (
    <svg viewBox={viewBox} role="img" aria-label={title} {...rest}>
      <title>{title}</title>
      {children}
    </svg>
  );
}

// A chart with real tooltips: focusable hit areas sit over the drawing (hover and keyboard focus show the tip).
export function Frame({ w, h, hits = [], children, className = '' }) {
  const [tip, setTip] = useState(null);
  const show = (t) => () => setTip(t);
  return (
    <div className={`${s.frame} ${className}`} style={{ aspectRatio: `${w} / ${h}` }} onMouseLeave={() => setTip(null)}>
      {children}
      {hits.map((t) => (
        <button key={t.id} type="button" className={s.hit} aria-label={t.label} aria-pressed={t.on}
          style={{ left: `${(t.x / w) * 100}%`, top: `${(t.y / h) * 100}%`, width: `${(t.w / w) * 100}%`, height: `${(t.h / h) * 100}%` }}
          onMouseEnter={show(t)} onFocus={show(t)} onBlur={() => setTip(null)} onClick={t.onClick} />
      ))}
      {tip && <span role="tooltip" className={s.tip} style={{ left: `${((tip.x + tip.w / 2) / w) * 100}%`, top: `${(tip.y / h) * 100}%` }}>{tip.label}</span>}
    </div>
  );
}

// m17 area chart: Active Blue at about 45% in soft vertical bands, grey gridlines, nodes on the baseline, a marker.
function areaGeom(w, h, compact) {
  const L = compact ? 10 : 78, R = compact ? 10 : 22, T = compact ? 12 : 26, B = compact ? 22 : 40;
  const pw = w - L - R, ph = h - T - B, y = scale(0, CAPACITY.axisMax, T + ph, T);
  const xs = CAPACITY.quarters.map((_, i) => r2(L + pw * (0.08 + (0.84 * i) / 3)));
  return { L, R, T, B, pw, ph, y, xs, base: T + ph };
}

export function AreaChart({ idp, w = 640, h = 300, active = 2, compact, exportName, title = 'Capacidad gestionada by quarter, 2025' }) {
  const g = areaGeom(w, h, compact);
  const pts = jagged(CAPACITY.quarters.map((q, i) => ({ x: g.xs[i], v: q.mw })), 7, 0.05, 11).map(([x, v]) => [x, g.y(v)]);
  const bs = bands(g.xs[0], g.xs[3], 28);
  const ay = g.y(CAPACITY.quarters[active].mw);
  return (
    <Svg viewBox={`0 0 ${w} ${h}`} title={title} exportName={exportName}>
      <defs><clipPath id={`${idp}-clip`}><path d={areaPath(pts, g.base)} /></clipPath></defs>
      {!compact && CAPACITY.axis.map((a, i) => {
        const yy = r2(g.y((7 - i) * 1000));
        return (
          <g key={a}>
            <line x1={g.L} x2={w - g.R} y1={yy} y2={yy} stroke={HEX.darkBlue} strokeOpacity="0.12" className="extend-x" style={{ '--i': i }} />
            <text x={g.L - 10} y={yy + 4} textAnchor="end" fontSize="11" fill={HEX.muted}>{a}</text>
          </g>
        );
      })}
      <g clipPath={`url(#${idp}-clip)`}>
        <g className="rise">{bs.map((b) => <rect key={b.x} x={b.x} y={g.T} width={b.w} height={g.ph} fill={HEX.activeBlue} fillOpacity={b.o} />)}</g>
      </g>
      <path d={linePath(pts)} fill="none" stroke={HEX.activeBlue} strokeWidth="1.6" pathLength="1" className="draw" style={{ '--len': 1 }} />
      <line x1={g.xs[active]} x2={g.xs[active]} y1={ay} y2={g.base} stroke={HEX.darkBlue} />
      <line x1={g.L} x2={w - g.R} y1={g.base} y2={g.base} stroke={HEX.darkBlue} />
      {CAPACITY.quarters.map((q, i) => (
        <g key={q.q}>
          <rect x={g.xs[i] - 3} y={g.base - 3} width="6" height="6" fill={HEX.darkBlue} className="snap" style={{ '--i': i }} />
          {!compact && <text x={g.xs[i]} y={h - 12} textAnchor="middle" fontSize="12" fill={HEX.darkBlue}>{q.q}</text>}
          {!compact && <text x={g.xs[i]} y={g.y(q.mw) - 10} textAnchor="middle" fontSize="12" fill={HEX.darkBlue} fontWeight={i === active ? 600 : 400}>{q.value}</text>}
        </g>
      ))}
    </Svg>
  );
}

export function AreaPlot({ onPick, active = 2, ...rest }) {
  const { w = 640, h = 300 } = rest;
  const g = areaGeom(w, h, rest.compact);
  const cw = (g.pw * 0.84) / 3;
  const hits = CAPACITY.quarters.map((q, i) => ({ id: q.q, label: `${q.q} ${q.value}`, x: g.xs[i] - cw / 2, y: g.T, w: cw, h: g.ph, on: i === active, onClick: () => onPick && onPick(i) }));
  return <Frame w={w} h={h} hits={rest.compact ? [] : hits}><AreaChart active={active} {...rest} /></Frame>;
}

// m17 treemap: Dark Blue field, Active Blue and a lighter Active Blue block, oversized numerals bottom right.
export function TreemapChart({ idp, w = 400, h = 300, sel, onPick, exportName }) {
  const top = 74;
  const blocks = treemap(CAPACITY.treemap.parts.map((p) => ({ ...p, value: p.pct })), 0, top, w, h - top, 4);
  const hits = blocks.map((b) => ({ id: b.key, label: b.unlabelled ? 'Unlabelled remainder' : `${b.labelRows.join(' ')} ${b.pct}%`, x: b.x, y: b.y, w: b.w, h: b.h, on: sel === b.key, onClick: () => onPick && onPick(b.key) }));
  return (
    <Frame w={w} h={h} hits={hits}>
      <Svg viewBox={`0 0 ${w} ${h}`} title="Capacidad gestionada treemap, 2025" exportName={exportName}>
        <rect width={w} height={h} fill={HEX.darkBlue} />
        <text x="16" y="28" fontSize="13" fill={HEX.mutedOnDark}>{CAPACITY.treemap.year}</text>
        <text x="16" y="52" fontSize="17" fill={HEX.onBlue} lang="es">{CAPACITY.treemap.title}</text>
        {blocks.map((b, i) => (
          <g key={b.key} className="fill-in" style={{ '--i': i }}>
            {b.unlabelled ? <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={HEX.darkBlue} stroke={HEX.activeBlue} strokeOpacity="0.5" />
              : <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={HEX.activeBlue} />}
            {b.key === 'cons' && <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={HEX.white} fillOpacity="0.3" />}
            {b.labelRows.map((t, j) => <text key={t} x={b.x + 14} y={b.y + 26 + j * 16} fontSize={b.key === 'dev' ? 15 : 12} fill={HEX.darkBlue} lang="es">{t}</text>)}
            {!b.unlabelled && (
              <text className="display" x={b.x + b.w - 14} y={b.y + b.h - 14} textAnchor="end" fontSize={b.key === 'dev' ? 76 : 40} letterSpacing="-2" fill={HEX.darkBlue}>
                {b.pct}<tspan fontSize={b.key === 'dev' ? 30 : 18} dy={b.key === 'dev' ? -34 : -14}>%</tspan>
              </text>
            )}
            {sel === b.key && <rect x={b.x + 1} y={b.y + 1} width={b.w - 2} height={b.h - 2} fill="none" stroke={HEX.white} strokeWidth="2" />}
          </g>
        ))}
      </Svg>
    </Frame>
  );
}

// m17 back phone: square cells in two strengths of Active Blue, some half-size. No figures per cell.
export function NodeGrid({ sel = -1, hov = -1, only = -1, crop, exportName }) {
  const { cols, rows, size, gap } = GRID, p = size + gap, W = cols * p - gap, H = rows * p - gap;
  const vb = crop ? `${crop.col * p - p * 2} ${crop.row * p - p * 2} ${p * 5 - gap} ${p * 5 - gap}` : `0 0 ${W} ${H}`;
  return (
    <Svg viewBox={vb} title="Distribución de actividad en nudos de red" exportName={exportName}>
      {CELLS.map((c) => {
        const x = c.col * p, y = c.row * p, dim = only >= 0 && c.lvl !== only;
        return (
          <g key={c.i} opacity={dim ? 0.25 : 1}>
            <rect x={x + 0.5} y={y + 0.5} width={size - 1} height={size - 1} fill="none" stroke={HEX.darkBlue} strokeOpacity="0.22" />
            {c.lvl > 0 && <rect x={x} y={y} width={size} height={size} fill={HEX.activeBlue} fillOpacity={c.lvl === 2 ? 1 : 0.75} className="fill-in" style={{ '--i': c.col % 8 }} />}
            {c.half && <rect x={x + size / 4} y={y + size / 4} width={size / 2} height={size / 2} fill={HEX.activeBlue} fillOpacity="0.75" />}
            {(c.i === sel || c.i === hov) && <rect x={x - 2} y={y - 2} width={size + 4} height={size + 4} fill="none" stroke={HEX.darkBlue} strokeWidth={c.i === sel ? 2 : 1} />}
          </g>
        );
      })}
    </Svg>
  );
}

// The node grid as a control: arrow keys and pointer pick a cell.
export function NodeGridPlot({ sel, onPick, only, crop }) {
  const [hov, setHov] = useState(-1);
  const { cols, rows } = GRID;
  const at = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const n = crop ? 5 : cols, m = crop ? 5 : rows;
    const col = Math.floor(((e.clientX - r.left) / r.width) * n) + (crop ? crop.col - 2 : 0);
    const row = Math.floor(((e.clientY - r.top) / r.height) * m) + (crop ? crop.row - 2 : 0);
    return Math.min(rows - 1, Math.max(0, row)) * cols + Math.min(cols - 1, Math.max(0, col));
  };
  const key = (e) => {
    const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
    if (!d) return;
    e.preventDefault();
    onPick(Math.min(cols * rows - 1, Math.max(0, sel + d)));
  };
  const c = CELLS[sel];
  return (
    <div className={s.gridPlot} style={{ aspectRatio: crop ? '1' : `${cols} / ${rows}` }} tabIndex={0} role="group" aria-label={`Node cells, use the arrow keys. Selected: row ${c.row + 1}, column ${c.col + 1}, ${LEVELS[c.lvl]}`}
      onKeyDown={key} onPointerMove={(e) => setHov(at(e))} onPointerLeave={() => setHov(-1)} onClick={(e) => onPick(at(e))}>
      <NodeGrid sel={sel} hov={hov} only={only} crop={crop} />
      {hov >= 0 && <span role="tooltip" className={s.tip} style={{ left: `${((CELLS[hov].col + 0.5) / cols) * 100}%`, top: `${(CELLS[hov].row / rows) * 100}%` }}>Cell {hov + 1}: {LEVELS[CELLS[hov].lvl]}</span>}
    </div>
  );
}

// Horizontal bars (quarters or technologies), each with its printed value; bars are drawn to scale of `max`.
export function BarsChart({ items, max, w = 520, h, sel, onPick, exportName, title }) {
  const rowH = 44, H = h || items.length * rowH + 16, lw = 130, x = scale(0, max, 0, w - lw - 110);
  const hits = items.map((it, i) => ({ id: it.id, label: `${it.label} ${it.value}`, x: 0, y: 8 + i * rowH, w, h: rowH - 8, on: sel === it.id, onClick: () => onPick && onPick(it.id) }));
  return (
    <Frame w={w} h={H} hits={hits}>
      <Svg viewBox={`0 0 ${w} ${H}`} title={title} exportName={exportName}>
        {items.map((it, i) => {
          const y = 8 + i * rowH;
          return (
            <g key={it.id}>
              <text x="0" y={y + 24} fontSize="14" fill={HEX.darkBlue} lang={it.es ? 'es' : undefined}>{it.label}</text>
              <rect x={lw} y={y + 8} width={w - lw - 110} height="22" fill={HEX.darkBlue} fillOpacity="0.08" />
              <rect x={lw} y={y + 8} width={r2(x(it.mw))} height="22" fill={HEX.activeBlue} className="grow-x" style={{ '--i': i }} />
              {sel === it.id && <rect x={lw - 2} y={y + 6} width={r2(x(it.mw)) + 4} height="26" fill="none" stroke={HEX.darkBlue} strokeWidth="2" />}
              <text x={w} y={y + 25} textAnchor="end" fontSize="14" fill={HEX.darkBlue}>{it.value}</text>
            </g>
          );
        })}
      </Svg>
    </Frame>
  );
}
export const QUARTER_ITEMS = CAPACITY.quarters.map((q) => ({ id: q.q, label: q.q, value: q.value, mw: q.mw }));
export const TECH_ITEMS = TECH.map((t) => ({ id: t.key, label: t.label, value: t.value, mw: t.mw, es: true }));

// The three KPI cells of m17 as ruled cells.
export function KpiCells({ exportName }) {
  return (
    <Svg viewBox="0 0 600 150" title="KPI cells: Proyectos gestionados, Nudos analizados, Accesos concedidos" exportName={exportName}>
      {CAPACITY.kpis.map((k, i) => (
        <g key={k.label}>
          <rect x={i * 200 + 0.5} y="0.5" width="199" height="149" fill="none" stroke={HEX.darkBlue} />
          <rect x={i * 200 - 3} y="-3" width="6" height="6" fill={HEX.darkBlue} />
          <rect x={i * 200 + 197} y="147" width="6" height="6" fill={HEX.darkBlue} />
          <text x={i * 200 + 16} y="30" fontSize="13" fill={HEX.darkBlue} lang="es">{k.label}</text>
          <text className="display" x={i * 200 + 16} y="124" fontSize="72" letterSpacing="-3" fill={HEX.activeBlue}>{k.value}</text>
        </g>
      ))}
    </Svg>
  );
}

// Thumbnail diagrams of the five structures: [x, y, w, h, fill, opacity] boxes on a 200 x 125 sheet.
const T = { ink: HEX.darkBlue, blue: HEX.activeBlue };
const THUMBS = {
  a: [[0, 0, 200, 14, 'none'], [8, 4, 70, 6, T.blue, 0.8], [90, 4, 8, 6, T.ink, 0.3], [102, 4, 8, 6, T.ink, 0.3], [150, 4, 40, 6, T.ink, 0.3],
    ...Array.from({ length: 9 }, (_, i) => [8, 24 + i * 10, 122, 6, T.ink, i === 3 ? 0.4 : 0.14]), [140, 20, 52, 98, 'none']],
  b: [[0, 0, 22, 125, T.ink, 0.9], ...Array.from({ length: 4 }, (_, i) => [7, 12 + i * 14, 8, 8, T.blue, 0.9]), [30, 8, 112, 109, 'none'],
    ...Array.from({ length: 6 }, (_, r) => Array.from({ length: 10 }, (_, c) => [34 + c * 10.6, 12 + r * 17, 8, 14, T.blue, (r + c) % 4 < 2 ? 0.75 : 0.12])).flat(), [150, 8, 42, 109, 'none']],
  c: [[8, 8, 90, 52, 'none'], [102, 8, 90, 52, 'none'], [8, 64, 90, 52, 'none'], [102, 64, 90, 52, 'none'],
    ...[0, 1, 2, 3].map((i) => [8 + (i % 2) * 94 + 6, 8 + Math.floor(i / 2) * 56 + 24, 78, 22 - i * 3, T.blue, 0.5])],
  d: [[8, 8, 124, 109, T.ink, 0.9], [12, 12, 84, 101, T.blue, 1], [100, 12, 28, 48, T.blue, 0.6], [140, 8, 52, 109, 'none'],
    ...Array.from({ length: 5 }, (_, i) => [146, 16 + i * 14, 40, 5, T.ink, 0.2])],
  e: [[8, 6, 60, 14, T.ink, 0.3], [8, 26, 184, 40, T.blue, 0.45], [8, 72, 58, 22, 'none'], [67, 72, 58, 22, 'none'], [126, 72, 66, 22, 'none'], [8, 100, 184, 20, T.ink, 0.9]],
};
export function Thumb({ kind, exportName, title }) {
  return (
    <Svg viewBox="0 0 200 125" title={title} exportName={exportName} {...(exportName ? {} : { 'aria-hidden': 'true', role: undefined, 'aria-label': undefined })}>
      <rect width="200" height="125" fill={HEX.paper} stroke={HEX.darkBlue} />
      {THUMBS[kind].map(([x, y, bw, bh, fill, o = 1], i) => (
        <rect key={i} x={x} y={y} width={bw} height={bh} fill={fill} fillOpacity={o} stroke={fill === 'none' ? HEX.darkBlue : 'none'} strokeOpacity="0.5" />
      ))}
      <rect x="-3" y="-3" width="6" height="6" fill={HEX.darkBlue} /><rect x="197" y="122" width="6" height="6" fill={HEX.darkBlue} />
    </Svg>
  );
}

export function Empty({ year, light }) {
  return (
    <div className={`${s.empty} ${light ? s.emptyLight : ''}`}>
      <span className={s.emptyBars} aria-hidden="true">{[60, 40, 52, 30].map((n) => <i key={n} className="ph" style={{ width: `${n}%` }} />)}</span>
      <p>No published figures for {year}.</p>
    </div>
  );
}
