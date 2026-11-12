'use client';

// The three live drawings of the node explorer. Each is one exportable SVG and shows the artwork of the case study
// (m17) in the state the explorer is in. Geometry is in attributes; motion is CSS keyframes that land on the artwork.
import Art from '@/components/art/Art';
import { HEX, CAPACITY } from '@/lib/brand';
import { r2, jagged, bands, scale, linePath, areaPath } from '@/lib/charts';
import { NODE, CELLS, Q, PARTS } from './data';

const SVG = { display: 'block', width: '100%', height: 'auto' };
const CELL_LINE = 'rgba(27, 32, 67, 0.22)';

// ---------------------------------------------------------------------------------------------------------------
// The node grid (m17, back phone): square cells with hairline outlines, two strengths of Active Blue, some quarter
// cells. The cells carry no figures. `cell` is the selected cell, `hov` the hovered one.
export function GridSvg({ cell, hov, onHover, onPick }) {
  const { cols, rows, size } = NODE;
  const W = cols * size, H = rows * size;
  const sel = cell ? { x: cell.c * size, y: cell.r * size } : null;
  const hv = hov ? { x: hov.c * size, y: hov.r * size } : null;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Node grid: distribución de actividad en nudos de red" exportName="feature-node-grid" style={SVG}>
      <rect width={W} height={H} fill={HEX.cardGrey} />
      {CELLS.map(({ r, c, v, q }) => {
        const cx = c * size, cy = r * size, hs = size / 2;
        const qx = cx + (q === 2 || q === 3 ? hs : 0), qy = cy + (q >= 3 ? hs : 0);
        return (
          <g key={`${r}-${c}`}>
            {v > 0 && <rect x={cx} y={cy} width={size} height={size} fill={HEX.activeBlue} opacity={v === 1 ? 1 : 0.75} className="fill-in" style={{ '--i': (r + c) % 14 }} />}
            {q > 0 && <rect x={qx} y={qy} width={hs} height={hs} fill={HEX.activeBlue} />}
            <rect x={cx + 0.5} y={cy + 0.5} width={size - 1} height={size - 1} fill="none" stroke={CELL_LINE} strokeWidth="1" />
          </g>
        );
      })}
      {hv && <rect x={hv.x} y={hv.y} width={size} height={size} fill={HEX.darkBlue} opacity="0.16" pointerEvents="none" />}
      {sel && (
        <g key={`${cell.r}-${cell.c}`} pointerEvents="none">
          <rect x="0" y={sel.y - 0.5} width={W} height="1" fill={HEX.darkBlue} className="extend-x" />
          <rect x="0" y={sel.y + size - 0.5} width={W} height="1" fill={HEX.darkBlue} className="extend-x" />
          <rect x={sel.x - 0.5} y="0" width="1" height={H} fill={HEX.darkBlue} className="extend-y" />
          <rect x={sel.x + size - 0.5} y="0" width="1" height={H} fill={HEX.darkBlue} className="extend-y" />
          <rect x={sel.x + 1.5} y={sel.y + 1.5} width={size - 3} height={size - 3} fill="none" stroke={HEX.darkBlue} strokeWidth="3" />
          {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([a, b]) => (
            <rect key={`${a}${b}`} x={sel.x + a * size - 3} y={sel.y + b * size - 3} width="6" height="6" fill={HEX.darkBlue} className="snap" style={{ '--i': a + b * 2 }} />
          ))}
        </g>
      )}
      {CELLS.map(({ r, c }) => (
        <rect
          key={`h${r}-${c}`}
          x={c * size}
          y={r * size}
          width={size}
          height={size}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onPointerEnter={() => onHover({ r, c })}
          onPointerLeave={() => onHover(null)}
          onClick={() => onPick({ r, c })}
        />
      ))}
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The quarter chart (m17): y labels 7.000 to 1.000 MW, the area in soft vertical bands at about 45%, square nodes on
// the baseline at Q1 to Q4, a vertical marker (at the Q3 peak until a quarter is chosen). Figures for 2025 only.
const W = 600, H = 350, X0 = 84, X1 = 566, YT = 92, YB = 282;
const XS = [116, 265, 415, 566];

export function ChartSvg({ year, q, onPick, onHover }) {
  const has = year === CAPACITY.year;
  const y = scale(0, CAPACITY.axisMax, YB, YT);
  const pts = has ? jagged(Q.map((p, i) => ({ x: XS[i], v: p.mw })), 9, 0.05, 11).map(([px, v]) => [px, y(v)]) : [];
  const rows = CAPACITY.axis.map((label, i) => ({ label, y: r2(YT + ((YB - YT) * i) / 7) }));
  const mi = q === null ? Q.findIndex((p) => p.peak) : q;
  const top = y(Q[mi].mw);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`Capacidad gestionada en puntos críticos de la red, ${year}`} exportName="feature-chart" style={SVG}>
      <rect width={W} height={H} fill={HEX.cardGrey} />
      <text fontSize="20" fill={HEX.darkBlue} lang="es" className="display">
        <tspan x="24" y="34">{CAPACITY.titleRows[0]}</tspan>
        <tspan x="24" y="58">{CAPACITY.titleRows[1]}</tspan>
      </text>
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect x={X0} y={r.y} width={X1 - X0} height="1" fill={HEX.darkBlue} opacity="0.14" className="extend-x" style={{ '--i': i }} />
          <text x="24" y={r2(r.y + 4)} fontSize="12" fill={HEX.muted}>{r.label}</text>
        </g>
      ))}
      {has ? (
        <g key="on">
          <g className="grow-x">
            <clipPath id="feature-chart-clip">
              <path d={areaPath(pts, YB)} />
            </clipPath>
            <g clipPath="url(#feature-chart-clip)">
              {bands(XS[0], X1, 30, 0.42, 0.52).map((b) => (
                <rect key={b.x} x={b.x} y={YT} width={b.w} height={YB - YT} fill={HEX.activeBlue} opacity={b.o} />
              ))}
            </g>
          </g>
          <path d={linePath(pts)} fill="none" stroke={HEX.activeBlue} strokeWidth="1.5" opacity="0.85" pathLength="1" className="draw" style={{ '--len': 1 }} />
          <g key={mi}>
            <rect x={XS[mi] - 0.75} y={r2(top)} width="1.5" height={r2(YB - top)} fill={HEX.darkBlue} className="extend-y" />
            <rect x={XS[mi] - 5} y={r2(top - 5)} width="10" height="10" fill={HEX.darkBlue} className="snap" />
          </g>
        </g>
      ) : (
        <g key="off" className="fade-in">
          <rect x={X0} y={YB - 78} width={X1 - X0} height="78" fill={HEX.darkBlue} opacity="0.06" />
          <text x={(X0 + X1) / 2} y={YB - 34} fontSize="16" fill={HEX.muted} textAnchor="middle">No figures published for {year}</text>
        </g>
      )}
      <rect x={X0 - 6} y={YB} width={X1 - X0 + 12} height="1.5" fill={HEX.darkBlue} />
      {Q.map((p, i) => {
        const on = has && i === mi;
        const anchor = i === 3 ? 'end' : 'middle';
        return (
          <g key={p.q}>
            <rect x={XS[i] - 4} y={YB - 3} width="8" height="8" fill={HEX.darkBlue} className="snap" style={{ '--i': i }} />
            <text x={XS[i]} y={YB + 26} fontSize="13" fill={HEX.darkBlue} textAnchor={anchor}>{p.q}</text>
            {has && (
              <text x={XS[i]} y={YB + 48} fontSize={on ? 17 : 14} fill={on ? HEX.blueInk : HEX.darkBlue} textAnchor={anchor} className="display">
                {p.value}
              </text>
            )}
          </g>
        );
      })}
      {Q.map((p, i) => (
        <rect
          key={`hit${p.q}`}
          x={Math.max(0, XS[i] - 74)}
          y={YT - 20}
          width={i === 3 ? 82 : 148}
          height={YB - YT + 80}
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
// The treemap (m17): a Dark Blue field headed "2025 / Capacidad gestionada", Desarrollo durante el año 68% in Active
// Blue, Capacidad consolidada 16% in a lighter Active Blue. The Dark Blue remainder has no label and no figure.
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
    <Art viewBox="0 0 317 318" title={`Capacidad gestionada, ${year}: treemap`} exportName="feature-treemap" style={SVG}>
      <rect width="317" height="318" fill={HEX.darkBlue} />
      {has ? (
        <g lang="es" key="on">
          <text x="10" y="20" fontSize="12" fill={HEX.white}>{CAPACITY.treemap.year}</text>
          <text x="10" y="35" fontSize="12" fill={HEX.white}>{CAPACITY.treemap.title}</text>
          <g opacity={dim('dev')} style={{ transition: 'opacity var(--dur-s) var(--ease-out)' }}>
            <rect x="0" y="105" width="210" height="213" fill={HEX.activeBlue} className="fill-in" />
            <text x="10" y="123" fontSize="12" fill={HEX.darkBlue}>{PARTS[0].labelRows[0]}</text>
            <text x="10" y="138" fontSize="12" fill={HEX.darkBlue}>{PARTS[0].labelRows[1]}</text>
            <text x="190" y="307" fontSize="78" fill={HEX.onBlue} textAnchor="end" letterSpacing="-2" className="display">68</text>
            <text x="191" y="260" fontSize="30" fill={HEX.onBlue}>%</text>
          </g>
          <g opacity={dim('cons')} style={{ transition: 'opacity var(--dur-s) var(--ease-out)' }}>
            <rect x="210" y="213" width="107" height="105" fill={HEX.activeBlue} className="fill-in" style={{ '--i': 3 }} />
            <rect x="210" y="213" width="107" height="105" fill={HEX.white} opacity="0.2" className="fill-in" style={{ '--i': 3 }} />
            <text x="218" y="231" fontSize="12" fill={HEX.darkBlue}>{PARTS[1].labelRows[0]}</text>
            <text x="218" y="246" fontSize="12" fill={HEX.darkBlue}>{PARTS[1].labelRows[1]}</text>
            <text x="298" y="307" fontSize="33" fill={HEX.onBlue} textAnchor="end" letterSpacing="-0.8" className="display">16</text>
            <text x="299" y="287" fontSize="13" fill={HEX.onBlue}>%</text>
          </g>
          {part === 'dev' && <rect x="2" y="107" width="206" height="209" fill="none" stroke={HEX.white} strokeWidth="2" />}
          {part === 'cons' && <rect x="212" y="215" width="103" height="101" fill="none" stroke={HEX.white} strokeWidth="2" />}
          {part === 'rest' && <rect x="2" y="2" width="313" height="102" fill="none" stroke={HEX.white} strokeWidth="2" strokeDasharray="6 4" />}
        </g>
      ) : (
        <g key="off" className="fade-in">
          <text x="158" y="165" fontSize="14" fill={HEX.mutedOnDark} textAnchor="middle">No figures published</text>
          <text x="158" y="185" fontSize="14" fill={HEX.mutedOnDark} textAnchor="middle">for {year}</text>
        </g>
      )}
      {has && (
        <g>
          {hit('dev', 0, 105, 210, 213, `${PARTS[0].labelRows.join(' ')} ${PARTS[0].pct}%`)}
          {hit('cons', 210, 213, 107, 105, `${PARTS[1].labelRows.join(' ')} ${PARTS[1].pct}%`)}
          {hit('rest', 0, 0, 317, 105, 'Unlabelled Dark Blue part of the treemap')}
          {hit('rest', 210, 105, 107, 108, 'Unlabelled Dark Blue part of the treemap')}
        </g>
      )}
    </Art>
  );
}
