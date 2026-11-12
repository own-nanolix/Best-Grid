'use client';

import { useState } from 'react';
import { Segmented } from '@/components/ui/Toggle';
import { CAPACITY, HEX } from '@/lib/brand';
import { r2, jagged, bands, scale, linePath, areaPath, es } from '@/lib/charts';
import { Q, AXIS_MAX } from './data';
import { ChartCard, Chart, T, useTip } from './kit';

// The m17 area chart, rebuilt: y labels 7.000 to 1.000 MW, bands at 45%, square nodes at Q1 to Q4 on the baseline,
// a vertical marker at the Q3 peak, "Total anual 15.420 MW" with its up triangle. Figures for 2025 only.
const X0 = 100, X1 = 630, YT = 120, YB = 310;
const XS = [100, 277, 453, 630];

function Area({ year }) {
  const bind = useTip();
  const has = year === CAPACITY.year;
  const y = scale(0, AXIS_MAX, YB, YT);
  const pts = has ? jagged(Q.map((q, i) => ({ x: XS[i], v: q.mw })), 9, 0.05, 11).map(([px, v]) => [px, y(v)]) : [];
  const rows = CAPACITY.axis.map((label, i) => ({ label, y: r2(YT + ((YB - YT) * i) / 7) }));
  const peak = Q.find((q) => q.peak);
  const pi = Q.indexOf(peak);
  return (
    <Chart name="area-capacity" title={`Capacidad gestionada en puntos críticos de la red, ${year}`} w={640} h={480} bg={HEX.cardGrey}>
      <T es size={24} x="32" y="52">
        <tspan x="32">{CAPACITY.titleRows[0]}</tspan>
        <tspan x="32" dy="29">{CAPACITY.titleRows[1]}</tspan>
      </T>
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect x={X0} y={r.y} width={X1 - X0} height="1" fill={HEX.darkBlue} opacity="0.14" className="extend-x" style={{ '--i': i }} />
          <T size={11} x="32" y={r2(r.y + 4)} fill={HEX.muted}>{r.label}</T>
        </g>
      ))}
      {has ? (
        <g key="on">
          <g className="grow-x">
            <clipPath id="dataviz-area-clip">
              <path d={areaPath(pts, YB)} />
            </clipPath>
            <g clipPath="url(#dataviz-area-clip)">
              {bands(XS[0], X1, 30, 0.42, 0.52).map((b) => (
                <rect key={b.x} x={b.x} y={YT} width={b.w} height={YB - YT} fill={HEX.activeBlue} opacity={b.o} />
              ))}
            </g>
          </g>
          <path d={linePath(pts)} fill="none" stroke={HEX.activeBlue} strokeWidth="1.4" opacity="0.8" pathLength="1" className="draw" style={{ '--len': 1 }} />
          <rect className="extend-y" x={XS[pi] - 0.5} y={r2(y(peak.mw))} width="1" height={r2(YB - y(peak.mw))} fill={HEX.activeBlue} />
        </g>
      ) : (
        <g key="off" className="fade-in">
          <rect x={X0} y={YB - 70} width={X1 - X0} height="70" fill={HEX.darkBlue} opacity="0.06" />
          <T x={(X0 + X1) / 2} y={YB - 30} anchor="middle" fill={HEX.muted} size={16}>No figures published for {year}</T>
        </g>
      )}
      <rect x={X0 - 4} y={YB} width={X1 - X0 + 8} height="1.5" fill={HEX.darkBlue} />
      {Q.map((q, i) => (
        <g key={q.q} {...bind(has ? `${q.q}: ${q.value}` : `${q.q}: no figure published`)}>
          <rect x={XS[i] - 4} y={YB - 3} width="8" height="8" fill={HEX.darkBlue} className="snap" style={{ '--i': i }} />
          <T size={12} x={XS[i]} y={YB + 26} anchor={i === 3 ? 'end' : 'middle'}>{q.q}</T>
          {has && <T size={17} x={XS[i] + (i < 2 ? -4 : 4)} y={YB + 48} anchor={i < 2 ? 'start' : 'end'} className="fade-in" style={{ '--i': i + 6 }}>{q.value}</T>}
          <rect x={XS[i] - 44} y={YT} width="88" height={YB - YT + 56} fill="transparent" />
        </g>
      ))}
      <T es size={14} x="32" y="398">{CAPACITY.totalLabel}</T>
      {has ? (
        <g className="fade-in" style={{ '--i': 8 }}>
          <T size={60} x="28" y="456" fill={HEX.activeBlue} letterSpacing="-2" className="display">{CAPACITY.totalValue}</T>
          <path d="M322 422l9 -14l9 14z" fill={HEX.activeBlue} />
        </g>
      ) : (
        <rect x="32" y="412" width="300" height="40" fill={HEX.darkBlue} opacity="0.1" />
      )}
    </Chart>
  );
}

export default function Lead() {
  const [year, setYear] = useState(CAPACITY.year);
  const has = year === CAPACITY.year;
  return (
    <ChartCard
      id="dataviz-lead"
      kind="Area"
      title="Managed capacity"
      span={9}
      actions={<Segmented id="dataviz-year" label="Year" options={CAPACITY.years} value={year} onChange={setYear} />}
      caption={has ? `Quarterly capacity for 2025, as printed (axis 1.000 to ${es(AXIS_MAX)} MW). The line between the four quarter points is drawn as in the case study, not measured.` : `The case study prints no figures for ${year}, so the chart stays empty.`}
      source="phone dashboard, quarters Q1 to Q4"
    >
      <Area year={year} />
    </ChartCard>
  );
}
