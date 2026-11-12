'use client';

// The three live drawings of the node explorer. Each is one exportable SVG and shows the artwork of the case study
// (m17) in the state the explorer is in, laid out from measurements of reference/m17.png (front screen: 1 unit =
// 2.1385 px). Labels are set larger than printed so they read at panel size. Geometry is in attributes; motion is
// CSS keyframes that land on the artwork.
import Art from '@/components/art/Art';
import { HEX, CAPACITY } from '@/lib/brand';
import { r2, bands, linePath, areaPath } from '@/lib/charts';
import { NODE, CELLS, Q, PARTS, TRACE } from './data';

const SVG = { display: 'block', width: '100%', height: 'auto' };
const CELL_LINE = HEX.darkBlue;

// ---------------------------------------------------------------------------------------------------------------
// The node grid (m17, back phone), cell by cell as printed (grid.js; the part hidden behind the front phone is
// continued): hairline outlines, two strengths of Active Blue, quarter-size cells. Cells carry no figures.
// `cell` is the selected cell, `hov` the hovered one. One hit layer maps the pointer to a cell.
const QOFF = [[0, 0], [1, 0], [0, 1], [1, 1]];
export function GridSvg({ cell, hov, onHover, onPick }) {
  const { cols, rows, size } = NODE;
  const W = cols * size, H = rows * size, hs = size / 2;
  const sel = cell ? { x: cell.c * size, y: cell.r * size } : null;
  const hv = hov ? { x: hov.c * size, y: hov.r * size } : null;
  const at = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    const c = Math.floor(((e.clientX - b.left) / b.width) * cols);
    const r = Math.floor(((e.clientY - b.top) / b.height) * rows);
    return { r: Math.min(rows - 1, Math.max(0, r)), c: Math.min(cols - 1, Math.max(0, c)) };
  };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Node grid: a field of square cells, one per grid node, with clusters of filled cells" exportName="feature-node-grid" style={SVG}>
      <rect width={W} height={H} style={{ fill: 'var(--screen)' }} />
      {CELLS.map(({ r, c, q, v }) => {
        const x = c * size, y = r * size;
        const anim = { className: 'fill-in', style: { '--i': (r + c) % 14 } };
        if (v === 1 || v === 2) return <rect key={`${r}-${c}`} x={x} y={y} width={size} height={size} fill={HEX.activeBlue} fillOpacity={v === 1 ? 1 : 0.75} {...anim} />;
        return q.map((k, i) => (k === '.' ? null : (
          <rect key={`${r}-${c}-${i}`} x={x + QOFF[i][0] * hs} y={y + QOFF[i][1] * hs} width={hs} height={hs} fill={HEX.activeBlue} fillOpacity={k === 'F' ? 1 : 0.75} {...anim} />
        )));
      })}
      {Array.from({ length: cols + 1 }, (_, c) => <rect key={`v${c}`} x={c * size - 0.6} y="0" width="1.2" height={H} fill={CELL_LINE} opacity="0.24" />)}
      {Array.from({ length: rows + 1 }, (_, r) => <rect key={`h${r}`} x="0" y={r * size - 0.6} width={W} height="1.2" fill={CELL_LINE} opacity="0.24" />)}
      {hv && <rect x={hv.x} y={hv.y} width={size} height={size} fill={HEX.darkBlue} opacity="0.16" pointerEvents="none" />}
      {sel && (
        <g key={`${cell.r}-${cell.c}`} pointerEvents="none">
          <rect x="0" y={sel.y - 0.75} width={W} height="1.5" fill={HEX.darkBlue} className="extend-x" />
          <rect x="0" y={sel.y + size - 0.75} width={W} height="1.5" fill={HEX.darkBlue} className="extend-x" />
          <rect x={sel.x - 0.75} y="0" width="1.5" height={H} fill={HEX.darkBlue} className="extend-y" />
          <rect x={sel.x + size - 0.75} y="0" width="1.5" height={H} fill={HEX.darkBlue} className="extend-y" />
          <rect x={sel.x + 2} y={sel.y + 2} width={size - 4} height={size - 4} fill="none" stroke={HEX.darkBlue} strokeWidth="4" />
          {QOFF.map(([a, b]) => (
            <rect key={`${a}${b}`} x={sel.x + a * size - 5} y={sel.y + b * size - 5} width="10" height="10" fill={HEX.darkBlue} className="snap" style={{ '--i': a + b * 2 }} />
          ))}
        </g>
      )}
      <rect width={W} height={H} fill="transparent" style={{ cursor: 'pointer' }}
        onPointerMove={(e) => { const p = at(e); if (!hov || hov.r !== p.r || hov.c !== p.c) onHover(p); }}
        onPointerLeave={() => onHover(null)}
        onClick={(e) => onPick(at(e))} />
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The quarter chart (m17), at the printed proportions (scale 1.741 from the phone): gridlines edge to edge with the
// y labels under them, the traced area in soft vertical bands, square nodes on the baseline at Q1 to Q4, a vertical
// marker (at the Q3 peak until a quarter is chosen). Figures for 2025 only.
const W = 600, H = 440, X0 = 24, X1 = 576, YB = 373, STEP = 40.17;
const XS = [60.2, 230.7, 401.5, 571.5];
const yOf = (mw) => r2(YB - (mw / 1000) * STEP);
const YT = yOf(7000);
export const CHART_TIP_X = XS.map((x) => r2((x / W) * 100));
const Q_LABEL_END = [false, false, false, true];
const Q_VALUE_END = [false, false, true, true];

export function ChartSvg({ year, q, onPick, onHover }) {
  const has = year === CAPACITY.year;
  const pts = has ? TRACE.map((v, i) => [r2(Math.min(XS[0] + i * 4.35, XS[3])), yOf(v)]) : [];
  const mi = q === null ? Q.findIndex((p) => p.peak) : q;
  const top = yOf(Q[mi].mw);
  const mid = (i) => (i === 0 ? X0 : r2((XS[i - 1] + XS[i]) / 2));
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`Chart of managed capacity at critical points of the grid, ${year}`} exportName="feature-chart" style={SVG}>
      <rect width={W} height={H} style={{ fill: 'var(--screen)' }} />
      <text fontSize="20" fill={HEX.darkBlue} lang="es" className="display">
        <tspan x={X0} y="34">{CAPACITY.titleRows[0]}</tspan>
        <tspan x={X0} y="58">{CAPACITY.titleRows[1]}</tspan>
      </text>
      {CAPACITY.axis.map((label, i) => {
        const y = yOf((7 - i) * 1000);
        return (
          <g key={label}>
            <rect x={X0} y={y} width={X1 - X0} height="1" fill={HEX.darkBlue} opacity="0.14" className="extend-x" style={{ '--i': i }} />
            <text x={X0 + 2} y={r2(y + 12)} fontSize="10" fill={HEX.muted} lang="es">{label}</text>
          </g>
        );
      })}
      {has ? (
        <g key="on">
          <g className="grow-x">
            <clipPath id="feature-chart-clip">
              <path d={areaPath(pts, YB)} />
            </clipPath>
            <g clipPath="url(#feature-chart-clip)">
              <rect x={XS[0]} y={YT} width={r2(XS[3] - XS[0])} height={r2(YB - YT)} fill={HEX.activeBlue} opacity="0.36" />
              {bands(XS[0], XS[3], 30).filter((b, i) => i % 2).map((b) => (
                <rect key={b.x} x={b.x} y={YT} width={r2(b.w - 0.5)} height={r2(YB - YT)} fill={HEX.activeBlue} opacity="0.07" />
              ))}
            </g>
          </g>
          <path d={linePath(pts)} fill="none" stroke={HEX.activeBlue} strokeWidth="1.4" opacity="0.8" pathLength="1" className="draw" style={{ '--len': 1 }} />
          <g key={mi}>
            <rect x={XS[mi] - 0.8} y={top} width="1.6" height={r2(YB - top)} fill={q === null ? HEX.activeBlue : HEX.darkBlue} className="extend-y" />
            {q !== null && <rect x={XS[mi] - 5} y={r2(top - 5)} width="10" height="10" fill={HEX.darkBlue} className="snap" />}
          </g>
        </g>
      ) : (
        <g key="off" className="fade-in">
          <rect x={X0} y={YB - 90} width={X1 - X0} height="90" fill={HEX.darkBlue} opacity="0.06" />
          <text x={(X0 + X1) / 2} y={YB - 40} fontSize="16" fill={HEX.muted} textAnchor="middle">No figures published for {year}</text>
        </g>
      )}
      <rect x={X0} y={YB - 0.75} width={X1 - X0} height="1.5" fill={HEX.darkBlue} />
      {Q.map((p, i) => {
        const on = has && i === mi && q !== null;
        return (
          <g key={p.q} lang="es">
            <rect x={XS[i] - 4} y={YB - 4} width="8" height="8" fill={HEX.darkBlue} className="snap" style={{ '--i': i }} />
            <text x={Q_LABEL_END[i] ? XS[i] + 4 : XS[i] - 4} y={YB + 22} fontSize="12" fill={HEX.darkBlue} textAnchor={Q_LABEL_END[i] ? 'end' : 'start'}>{p.q}</text>
            {has && (
              <text x={Q_VALUE_END[i] ? XS[i] + 4 : XS[i] - 4} y={YB + 46} fontSize={on ? 17 : 14} fill={on ? HEX.blueInk : HEX.darkBlue} textAnchor={Q_VALUE_END[i] ? 'end' : 'start'}>
                {p.value}
              </text>
            )}
          </g>
        );
      })}
      {Q.map((p, i) => (
        <rect
          key={`hit${p.q}`}
          x={mid(i)}
          y={YT - 20}
          width={r2((i === 3 ? X1 : (XS[i] + XS[i + 1]) / 2) - mid(i))}
          height={r2(H - YT + 20)}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onPointerEnter={() => onHover(i)}
          onPointerLeave={() => onHover(null)}
          onClick={() => onPick(i)}
        />
      ))}
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The treemap (m17), measured: a Dark Blue field 316 x 318 headed "2025 / Capacidad gestionada", Desarrollo durante
// el año 68% in Active Blue (209 x 213, bottom left), Capacidad consolidada 16% in the lighter Active Blue (107 x 105,
// bottom right). The Dark Blue remainder has no label and no figure. Small labels on Active Blue are Dark Blue.
const DEV = { x: 0, y: 104.3, w: 209.1, h: 213.7 };
const CONS = { x: 209.1, y: 212.3, w: 106.9, h: 105.7 };
export function TreemapSvg({ year, part, onPick, onHover }) {
  const has = year === CAPACITY.treemap.year;
  const dim = (k) => (part && part !== k ? 0.4 : 1);
  const hit = (k, x, y, w, h, label) => (
    <rect
      key={`${k}-${x}-${y}`}
      x={x}
      y={y}
      width={w}
      height={h}
      fill="transparent"
      tabIndex={0}
      role="button"
      aria-label={label}
      aria-pressed={part === k}
      style={{ cursor: 'pointer' }}
      onPointerEnter={() => onHover(k)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(k)}
      onBlur={() => onHover(null)}
      onClick={() => onPick(k)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPick(k);
        }
      }}
    />
  );
  return (
    <Art viewBox="0 0 316 318" title={`Treemap of managed capacity, ${year}`} exportName="feature-treemap" style={SVG}>
      <rect width="316" height="318" fill={HEX.darkBlue} />
      {has ? (
        <g lang="es" key="on">
          <text x="7" y="18" fontSize="11" fill={HEX.white}>{CAPACITY.treemap.year}</text>
          <text x="7" y="32" fontSize="11" fill={HEX.white}>{CAPACITY.treemap.title}</text>
          <g opacity={dim('dev')} style={{ transition: 'opacity var(--dur-s) var(--ease-out)' }}>
            <rect x={DEV.x} y={DEV.y} width={DEV.w} height={DEV.h} fill={HEX.activeBlue} className="fill-in" />
            <text fontSize="11" fill={HEX.darkBlue}>
              {PARTS[0].labelRows.map((r, i) => <tspan key={r} x="7" y={r2(DEV.y + 16 + i * 13)}>{r}</tspan>)}
            </text>
            <text x="166.3" y="305.4" fontSize="69.5" fill={HEX.onBlue} textAnchor="end" letterSpacing="-1.6" className="display">68</text>
            <text x="168.9" y="278.7" fontSize="31.6" fill={HEX.onBlue} className="display">%</text>
          </g>
          <g opacity={dim('cons')} style={{ transition: 'opacity var(--dur-s) var(--ease-out)' }}>
            <rect x={CONS.x} y={CONS.y} width={CONS.w} height={CONS.h} fill={HEX.activeBlue} className="fill-in" style={{ '--i': 3 }} />
            <rect x={CONS.x} y={CONS.y} width={CONS.w} height={CONS.h} fill={HEX.white} opacity="0.2" />
            <text fontSize="11" fill={HEX.darkBlue}>
              {PARTS[1].labelRows.map((r, i) => <tspan key={r} x={r2(CONS.x + 7)} y={r2(CONS.y + 16 + i * 13)}>{r}</tspan>)}
            </text>
            <text x="297.1" y="305.4" fontSize="34.1" fill={HEX.onBlue} textAnchor="end" letterSpacing="1.5" className="display">16</text>
            <text x="295.9" y="293.7" fontSize="17.7" fill={HEX.onBlue} className="display">%</text>
          </g>
          {part === 'dev' && <rect x="2" y={DEV.y + 2} width={DEV.w - 4} height={DEV.h - 4} fill="none" stroke={HEX.white} strokeWidth="2" />}
          {part === 'cons' && <rect x={CONS.x + 2} y={CONS.y + 2} width={CONS.w - 4} height={CONS.h - 4} fill="none" stroke={HEX.white} strokeWidth="2" />}
          {part === 'rest' && <rect x="2" y="2" width="312" height={DEV.y - 4} fill="none" stroke={HEX.white} strokeWidth="2" strokeDasharray="6 4" />}
        </g>
      ) : (
        <g key="off" className="fade-in">
          <text x="158" y="165" fontSize="14" fill={HEX.mutedOnDark} textAnchor="middle">No figures published</text>
          <text x="158" y="185" fontSize="14" fill={HEX.mutedOnDark} textAnchor="middle">for {year}</text>
        </g>
      )}
      {has && (
        <g>
          {hit('dev', DEV.x, DEV.y, DEV.w, DEV.h, `${PARTS[0].labelRows.join(' ')} ${PARTS[0].pct}%`)}
          {hit('cons', CONS.x, CONS.y, CONS.w, CONS.h, `${PARTS[1].labelRows.join(' ')} ${PARTS[1].pct}%`)}
          {hit('rest', 0, 0, 316, DEV.y, 'Unlabelled Dark Blue part of the treemap')}
          {hit('rest', CONS.x, DEV.y, CONS.w, r2(CONS.y - DEV.y), 'Unlabelled Dark Blue part of the treemap')}
        </g>
      )}
    </Art>
  );
}
