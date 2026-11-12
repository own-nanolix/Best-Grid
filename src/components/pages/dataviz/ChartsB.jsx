'use client';

import { HEX, CAPACITY } from '@/lib/brand';
import { r2, scale, linePath, areaPath, bands, bandPath, polar, es } from '@/lib/charts';
import { Q, CUM, TOTAL, AXIS_MAX, PEAK, TECH_SORTED, KPIS, mwf, INK, BLUE, MUTED } from './data';
import { ChartCard, Chart, T, useTip, useHover } from './kit';

const GRID = { fill: INK, opacity: 0.14 };

// 7. Time: three year lanes by four quarters. 2025 carries the printed figures; 2023 and 2024 stay empty.
function Timeline() {
  const bind = useTip();
  const hover = useHover();
  const X0 = 130, CW = 110, LY = [58, 138, 218], LH = 70;
  const xs = [0, 1, 2, 3, 4].map((i) => X0 + i * CW);
  return (
    <Chart name="time-quarters" title="Time: quarters across the three year chips" w={600} h={300}>
      {CAPACITY.years.map((yr, li) => (
        <g key={yr}>
          <rect x="16" y={LY[li] + 20} width="86" height="30" rx="15" fill={yr === CAPACITY.year ? BLUE : HEX.lightBlue} />
          <T size={13} x="59" y={LY[li] + 40} anchor="middle">{yr}</T>
          {Q.map((q, i) => {
            const on = yr === CAPACITY.year;
            const props = on ? bind(`${yr} ${q.q}: ${q.value}`) : hover(`${yr} ${q.q}: no figure published`);
            return (
              <g key={q.q} {...props}>
                {on ? (
                  <>
                    <rect x={xs[i]} y={LY[li]} width={CW} height={LH} fill={BLUE} fillOpacity={r2(0.3 + 0.7 * (q.mw / PEAK))} className="fill-in" style={{ '--i': i }} />
                    <T size={26} x={xs[i] + 10} y={LY[li] + 58} className="display fade-in" style={{ '--i': i + 4 }}>{es(q.mw)}</T>
                    <T size={12} x={xs[i] + 10} y={LY[li] + 20} className="fade-in" style={{ '--i': i + 4 }}>MW</T>
                  </>
                ) : (
                  <rect x={xs[i] + 10} y={LY[li] + 52} width="46" height="8" fill={INK} opacity="0.12" />
                )}
              </g>
            );
          })}
        </g>
      ))}
      {Q.map((q, i) => <T key={q.q} size={12} x={xs[i] + 10} y="42" fill={MUTED}>{q.q}</T>)}
      {LY.concat([LY[2] + LH]).map((y, i) => <rect key={y} x={X0} y={y - 0.5} width={CW * 4} height="1" fill={INK} className="extend-x" style={{ '--i': i }} />)}
      {xs.map((x, i) => <rect key={x} x={x - 0.5} y={LY[0]} width="1" height={LY[2] + LH - LY[0]} fill={INK} className="extend-y" style={{ '--i': i }} />)}
      {xs.flatMap((x, i) => LY.concat([LY[2] + LH]).map((y, j) => <rect key={`${i}-${j}`} x={x - 3} y={y - 3} width="6" height="6" fill={INK} className="snap" style={{ '--i': i + j }} />))}
    </Chart>
  );
}

// 8. Time: the running total across the quarters (computed); the last point is the printed Total anual.
function Cumulative() {
  const bind = useTip();
  const xs = [100, 180, 260, 340];
  const y = scale(0, TOTAL, 240, 56);
  const pts = [[50, 240], ...CUM.map((v, i) => [xs[i], y(v)])];
  return (
    <Chart name="time-cumulative" title="Time: running total across the quarters">
      <rect x="40" y="240" width="330" height="1.5" fill={INK} />
      <rect x="40" y="56" width="330" height="1" {...GRID} className="extend-x" />
      <clipPath id="dataviz-cum-clip"><path d={areaPath(pts, 240)} /></clipPath>
      <g className="grow-x"><g clipPath="url(#dataviz-cum-clip)">{bands(50, 340, 16, 0.4, 0.52).map((b) => <rect key={b.x} x={b.x} y="56" width={b.w} height="184" fill={BLUE} opacity={b.o} />)}</g></g>
      <path d={linePath(pts)} fill="none" stroke={BLUE} strokeWidth="2.5" pathLength="1" className="draw" style={{ '--len': 1 }} />
      {CUM.map((v, i) => (
        <g key={Q[i].q} {...bind(`Up to ${Q[i].q}: ${mwf(v)} in total`)}>
          <rect x={xs[i] - 5} y={y(v) - 5} width="10" height="10" fill={INK} className="snap" style={{ '--i': i }} />
          <T size={12} x={xs[i]} y="262" anchor="middle">{Q[i].q}</T>
          <rect x={xs[i] - 38} y="40" width="76" height="230" fill="transparent" />
        </g>
      ))}
      <T es size={13} x="330" y="40" anchor="end">Total anual {CAPACITY.totalValue}</T>
    </Chart>
  );
}

// 9. Flow: the four quarters flowing into the annual total; band height is proportional to MW.
function Sankey() {
  const bind = useTip();
  const k = 190 / TOTAL, gap = 10, X1 = 146, X2 = 450, XM = 298;
  const before = (i) => Q.slice(0, i).reduce((a, q) => a + k * q.mw, 0);
  const rows = Q.map((q, i) => ({ ...q, ly0: 30 + before(i) + gap * i, ly1: 30 + before(i) + k * q.mw + gap * i, ry0: 45 + before(i), ry1: 45 + before(i) + k * q.mw }));
  return (
    <Chart name="flow-quarters" title="Flow: the four quarters into Total anual" w={600} h={300}>
      {rows.map((r, i) => (
        <g key={r.q} {...bind(`${r.q} adds ${r.value} to the total`)}>
          <path d={`M${X1} ${r2(r.ly0)}C${XM} ${r2(r.ly0)} ${XM} ${r2(r.ry0)} ${X2} ${r2(r.ry0)}L${X2} ${r2(r.ry1)}C${XM} ${r2(r.ry1)} ${XM} ${r2(r.ly1)} ${X1} ${r2(r.ly1)}Z`} fill={BLUE} fillOpacity={i % 2 ? 0.42 : 0.55} className="fill-in" style={{ '--i': i }} />
          <rect x={X1 - 16} y={r2(r.ly0)} width="16" height={r2(r.ly1 - r.ly0)} fill={INK} className="grow-x" style={{ '--i': i }} />
          <T size={13} x="20" y={r2((r.ly0 + r.ly1) / 2 - 2)}>{r.q}</T>
          <T size={13} x="20" y={r2((r.ly0 + r.ly1) / 2 + 14)} fill={MUTED}>{r.value}</T>
        </g>
      ))}
      <g {...bind(`Total anual: ${CAPACITY.totalValue}`, true)}>
        <rect x={X2} y="45" width="16" height="190" fill={INK} className="grow-x" />
        <T es size={14} x="482" y="130">{CAPACITY.totalLabel}</T>
        <T size={17} x="482" y="158" fill={BLUE} className="display">{CAPACITY.totalValue}</T>
      </g>
    </Chart>
  );
}

// 11. Ranking: the four technologies ordered by MW, a lollipop for each (rank numeral, stem, square node).
function Lollipop() {
  const bind = useTip();
  const top = TECH_SORTED[0].mw;
  return (
    <Chart name="ranking-lollipop" title="Ranking: the four technologies by MW">
      {TECH_SORTED.map((t, i) => {
        const y0 = 36 + i * 62, end = 70 + (t.mw / top) * 190;
        return (
          <g key={t.key} {...bind(`Rank ${i + 1}, ${t.label}: ${t.value}`, true)}>
            <rect x="0" y={y0 - 4} width="400" height="62" fill="transparent" />
            <T size={46} x="22" y={y0 + 42} fill={BLUE} className="display">{i + 1}</T>
            <T es size={13} x="70" y={y0 + 14}>{t.label}</T>
            <rect x="70" y={y0 + 28} width={r2(end - 70)} height="3" fill={INK} className="extend-x" style={{ '--i': i }} />
            <rect x={r2(end - 6)} y={y0 + 23} width="12" height="12" fill={BLUE} className="snap" style={{ '--i': i + 3 }} />
            <T size={13} x={r2(end + 14)} y={y0 + 34}>{t.value}</T>
          </g>
        );
      })}
    </Chart>
  );
}

// 12. Unit chart: one square for each of the 128 managed projects (a count the case study prints).
function Waffle() {
  const bind = useTip();
  const n = KPIS[0].value;
  return (
    <Chart name="count-waffle" title="Count: 128 managed projects, one square each">
      <g {...bind(`${KPIS[0].label}: ${n}`, true)}>
        {Array.from({ length: n }, (_, i) => {
          const c = i % 16, r = Math.floor(i / 16);
          return <rect key={i} x={32 + c * 21} y={34 + r * 21} width="18" height="18" fill={BLUE} className="fill-in" style={{ '--i': c + r }} />;
        })}
        <T es size={13} x="32" y="226" fill={MUTED}>{KPIS[0].label}</T>
        <T size={42} x="30" y="282" className="display">{n}</T>
      </g>
    </Chart>
  );
}

// 13. Radar: the four quarters on four spokes (0 to the printed axis maximum of 7.000 MW).
function Radar() {
  const bind = useTip();
  const C = [200, 150], R = 100;
  const at = (v, i) => polar(C[0], C[1], (v / AXIS_MAX) * R, i * 90);
  const poly = (v) => linePath([0, 1, 2, 3].map((i) => at(v, i))) + 'Z';
  const lab = [[200, 38, 'middle'], [314, 154, 'start'], [200, 278, 'middle'], [86, 154, 'end']];
  return (
    <Chart name="radar-quarters" title="Radar: the four quarters on four spokes">
      {[3500, 7000].map((v, i) => <path key={v} d={poly(v)} fill="none" stroke={INK} strokeOpacity="0.3" pathLength="1" className="draw" style={{ '--len': 1, '--i': i }} />)}
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M${C[0]} ${C[1]}L${at(AXIS_MAX, i).join(' ')}`} stroke={INK} strokeOpacity="0.3" />)}
      <path d={linePath(Q.map((q, i) => at(q.mw, i))) + 'Z'} fill={BLUE} fillOpacity="0.4" stroke={BLUE} strokeWidth="2" className="fade-in" />
      {Q.map((q, i) => {
        const [x, y] = at(q.mw, i);
        return (
          <g key={q.q} {...bind(`${q.q}: ${q.value}`)}>
            <rect x={x - 5} y={y - 5} width="10" height="10" fill={INK} className="snap" style={{ '--i': i }} />
            <T size={13} x={lab[i][0]} y={lab[i][1]} anchor={lab[i][2]}>{q.q}</T>
            <rect x={x - 22} y={y - 22} width="44" height="44" fill="transparent" />
          </g>
        );
      })}
      <T size={12} x={C[0] + R / 2 + 4} y={C[1] + 34} fill={MUTED}>3.500</T>
    </Chart>
  );
}

// 14. Gauge: the Q3 peak against the printed axis, one block for every 1.000 MW label on the axis.
function Gauge() {
  const bind = useTip();
  const span = 180 / 7, full = PEAK / 1000;
  const blk = (i, f = 1) => bandPath(200, 200, 90, 140, -90 + i * span + 1, -90 + i * span + 1 + (span - 2) * f);
  return (
    <Chart name="gauge-peak" title="Gauge: the Q3 peak against the axis">
      <g {...bind(`Q3, the peak: ${Q[2].value} of ${mwf(AXIS_MAX)}`)}>
        {Array.from({ length: 7 }, (_, i) => <path key={i} d={blk(i)} fill={HEX.periwinkle} />)}
        {Array.from({ length: 7 }, (_, i) => {
          const f = Math.min(1, Math.max(0, full - i));
          return f > 0 ? <path key={i} d={blk(i, f)} fill={BLUE} className="fill-in" style={{ '--i': i * 2 }} /> : null;
        })}
        <T size={42} x="200" y="204" anchor="middle" className="display">{es(PEAK)}</T>
        <T size={15} x="200" y="232" anchor="middle">MW, Q3</T>
      </g>
      <T size={12} x="95" y="224" anchor="middle" fill={MUTED}>0</T>
      <T size={12} x="305" y="224" anchor="middle" fill={MUTED}>{mwf(AXIS_MAX)}</T>
    </Chart>
  );
}

export const TimelineCard = () => (
  <ChartCard id="dataviz-time" kind="Time" title="Quarter lanes" span={6} caption="One lane per year chip. Only 2025 has printed figures; 2023 and 2024 show quiet empty marks." source="phone dashboard, year chips">
    <Timeline />
  </ChartCard>
);
export const CumulativeCard = () => (
  <ChartCard id="dataviz-cumulative" kind="Time" title="Running total" caption="The quarters added up as the year goes on; the last point equals the printed total." source="phone quarters, computed sums">
    <Cumulative />
  </ChartCard>
);
export const SankeyCard = () => (
  <ChartCard id="dataviz-flow" kind="Flow" title="Quarters into the total" span={6} caption="Four bands, each as tall as its quarter, run into the annual total." source="phone dashboard, quarters">
    <Sankey />
  </ChartCard>
);
export const LollipopCard = () => (
  <ChartCard id="dataviz-ranking" kind="Ranking" title="Technologies by MW" caption="The four website tiles ordered from largest to smallest." source="website tiles">
    <Lollipop />
  </ChartCard>
);
export const WaffleCard = () => (
  <ChartCard id="dataviz-unit" kind="Count" title="Unit chart" caption="One square for each managed project: 128 squares, 16 across." source="phone KPI cell, 128">
    <Waffle />
  </ChartCard>
);
export const RadarCard = () => (
  <ChartCard id="dataviz-radar" kind="Comparison" title="Radar" caption="Each quarter on its own spoke, scaled to the printed axis of 7.000 MW." source="phone dashboard, quarters">
    <Radar />
  </ChartCard>
);
export const GaugeCard = () => (
  <ChartCard id="dataviz-gauge" kind="Share of axis" title="Peak gauge" caption="Q3 as blocks of 1.000 MW against the printed axis." source="phone dashboard, Q3">
    <Gauge />
  </ChartCard>
);
