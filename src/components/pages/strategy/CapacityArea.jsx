// The area chart of the phone dashboard (m17), rebuilt: title in two rows, grey gridlines with "x.000 MW" labels from
// 1.000 to 7.000 MW, an Active Blue area at about 45% broken into soft vertical bands, a vertical marker at the Q3
// peak, square nodes on the baseline at Q1 to Q4 with the quarter and its figure beneath.
// The four figures are the published ones (Q1 3.200, Q2 4.100, Q3 5.200, Q4 2.920 MW, year 2025); the wiggle
// between them is drawing, not data (jagged anchors, seeded).
// Entrance: gridlines extend, the area rises, the marker extends, the nodes snap, the figures fade in.
import Art from '@/components/art/Art';
import { CAPACITY, HEX } from '@/lib/brand';
import { areaPath, bands, jagged, linePath, r2, scale } from '@/lib/charts';

const W = 860;
const H = 560;
const X0 = 130;
const X1 = 820;
const TOP = 130;
const BASE = 440;
const y = scale(0, CAPACITY.axisMax, BASE, TOP);

export default function CapacityArea() {
  const q = CAPACITY.quarters;
  const span = (X1 - X0) / (q.length - 1);
  const qx = q.map((_, i) => r2(X0 + i * span));
  const anchors = q.map((d, i) => ({ x: qx[i], v: d.mw }));
  const peak = Math.max(...q.map((d) => d.mw));
  // the published peak stays the highest point of the drawn series
  const pts = jagged(anchors, 12, 0.045, 11).map(([x, v]) => [x, y(Math.min(v, peak))]);
  const area = areaPath(pts, BASE);
  const top = linePath(pts);
  const peakIdx = q.findIndex((d) => d.peak);
  const grid = CAPACITY.axis.map((label, i) => ({ label, v: CAPACITY.axisMax - i * 1000 }));
  const stripes = bands(X0, X1, 28, 0.36, 0.52);
  const clip = 'strategy-area-clip';
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Managed capacity by quarter, 2025: Q1 3.200, Q2 4.100, Q3 5.200 and Q4 2.920 MW" exportName="strategy-capacity-area">
      <clipPath id={clip}>
        <path d={area} />
      </clipPath>
      <rect width={W} height={H} fill={HEX.paper} />
      <g fill={HEX.darkBlue} lang="es">
        <text x={24} y={52} fontSize="28" className="display">{CAPACITY.titleRows[0]}</text>
        <text x={24} y={86} fontSize="28" className="display">{CAPACITY.titleRows[1]}</text>
      </g>
      {/* gridlines and the y labels */}
      {grid.map((g, i) => (
        <g key={g.v}>
          <rect x={X0} y={r2(y(g.v) - 0.5)} width={X1 - X0} height={1} fill={HEX.darkBlue} fillOpacity="0.14" className="extend-x" style={{ '--i': i }} />
          <text x={24} y={r2(y(g.v) + 6)} fontSize="17" fill={HEX.muted} lang="es" className="fade-in" style={{ '--i': i + 2 }}>
            {g.label}
          </text>
        </g>
      ))}
      {/* the area: soft vertical bands inside the jagged outline, rising from the baseline */}
      <g className="rise" style={{ '--i': 8 }}>
        <g clipPath={`url(#${clip})`}>
          {stripes.map((b, i) => (
            <rect key={i} x={b.x} y={TOP} width={b.w} height={BASE - TOP} fill={HEX.activeBlue} fillOpacity={b.o} />
          ))}
        </g>
        <path d={top} fill="none" stroke={HEX.activeBlue} strokeWidth="1.4" />
      </g>
      {/* baseline */}
      <rect x={24} y={BASE - 0.75} width={X1 - 24} height={1.5} fill={HEX.darkBlue} className="extend-x" style={{ '--i': 6 }} />
      {/* the vertical marker at the peak */}
      <rect x={r2(qx[peakIdx] - 0.75)} y={r2(y(q[peakIdx].mw))} width={1.5} height={r2(BASE - y(q[peakIdx].mw))} fill={HEX.activeBlue} className="extend-y" style={{ '--i': 30 }} />
      <rect x={r2(qx[peakIdx] - 3)} y={r2(y(q[peakIdx].mw) - 3)} width={6} height={6} fill={HEX.activeBlue} className="snap" style={{ '--i': 34 }} />
      {/* nodes, quarters and figures */}
      {q.map((d, i) => (
        <g key={d.q}>
          <rect x={qx[i] - 4.5} y={BASE - 4.5} width={9} height={9} fill={HEX.darkBlue} className="snap" style={{ '--i': 24 + i * 2 }} />
          <g className="fade-in" style={{ '--i': 36 + i * 3 }} lang="es">
            <text x={qx[i]} y={BASE + 34} fontSize="17" fill={HEX.muted} textAnchor={i === 0 ? 'start' : i === q.length - 1 ? 'end' : 'middle'}>{d.q}</text>
            <text x={qx[i]} y={BASE + 64} fontSize="24" fill={HEX.darkBlue} textAnchor={i === 0 ? 'start' : i === q.length - 1 ? 'end' : 'middle'}>{d.value}</text>
          </g>
        </g>
      ))}
    </Art>
  );
}
