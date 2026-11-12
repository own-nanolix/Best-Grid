'use client';

import { HEX, CAPACITY } from '@/lib/brand';
import { r2, scale, stepPath, arcPath, es } from '@/lib/charts';
import { MarkG } from '@/components/art/Mark';
import { Q, DELTAS, QMEAN, AXIS_MAX, PEAK, TECH_SHARES, TECH_SUM, PARTS, signed, mwf, INK, BLUE, MUTED } from './data';
import { ChartCard, Chart, T, Legend, useTip } from './kit';

const GRID = { fill: INK, opacity: 0.14 };

// 1. Trend: the four quarters as a stepped line (the orthogonal language of the guides), with each change.
function Step() {
  const bind = useTip();
  const xs = [60, 153, 247, 340];
  const y = scale(0, AXIS_MAX, 230, 40);
  const pts = Q.map((q, i) => [xs[i], y(q.mw)]);
  return (
    <Chart name="trend-step" title="Trend: quarterly capacity as a stepped line">
      {[0, 7000].map((v, i) => (
        <g key={v}>
          <rect x="40" y={y(v)} width="330" height="1" {...GRID} className="extend-x" style={{ '--i': i }} />
          <T size={12} x="40" y={y(v) - 5} fill={MUTED}>{v ? mwf(v) : '0'}</T>
        </g>
      ))}
      <path d={stepPath(pts)} fill="none" stroke={BLUE} strokeWidth="3" pathLength="1" className="draw" style={{ '--len': 1 }} />
      {Q.map((q, i) => (
        <g key={q.q} {...bind(`${q.q}: ${q.value}`)}>
          <rect x={xs[i] - 5} y={y(q.mw) - 5} width="10" height="10" fill={INK} className="snap" style={{ '--i': i }} />
          <T size={12} x={xs[i]} y={y(q.mw) - 12} anchor="middle">{es(q.mw)}</T>
          <T size={12} x={xs[i]} y="252" anchor="middle">{q.q}</T>
          <rect x={xs[i] - 40} y="30" width="80" height="230" fill="transparent" />
        </g>
      ))}
      {DELTAS.map((d, i) => (
        <T key={d.to} size={13} x={(xs[i] + xs[i + 1]) / 2} y="280" anchor="middle" fill={d.d < 0 ? INK : HEX.blueInk}>{signed(d.d)}</T>
      ))}
    </Chart>
  );
}

// 2. Comparison: each quarter against the mean of the four (computed), columns rising from the baseline.
function Columns() {
  const bind = useTip();
  const y = scale(0, AXIS_MAX, 240, 50);
  const xs = [58, 136, 214, 292];
  return (
    <Chart name="comparison-columns" title="Comparison: quarters against their mean">
      <rect x="40" y="240" width="330" height="1.5" fill={INK} />
      {Q.map((q, i) => (
        <g key={q.q} {...bind(`${q.q}: ${q.value}, ${q.mw >= QMEAN ? 'above' : 'below'} the mean of ${mwf(QMEAN)}`)}>
          <rect x={xs[i]} y={y(q.mw)} width="58" height={r2(240 - y(q.mw))} fill={q.mw >= QMEAN ? BLUE : INK} className="rise" style={{ '--i': i }} />
          <T size={12} x={xs[i] + 29} y={y(q.mw) - 7} anchor="middle">{es(q.mw)}</T>
          <T size={12} x={xs[i] + 29} y="262" anchor="middle">{q.q}</T>
        </g>
      ))}
      <rect x="40" y={y(QMEAN)} width="330" height="1.5" fill={INK} className="extend-x" style={{ '--i': 5 }} />
      <T size={12} x="370" y={y(QMEAN) - 6} anchor="end" fill={MUTED}>Mean {es(QMEAN)}</T>
    </Chart>
  );
}

// 3. Share (faithful): the m17 treemap, "2025 / Capacidad gestionada": 68%, 16% and the unlabelled remainder.
function Treemap() {
  const bind = useTip();
  const [dev, cons] = PARTS;
  // Measured on m17 (676 x 679 px, drawn square here): Desarrollo 66.1% wide below the top 32.8%; Capacidad
  // consolidada from 66.7% of the height. The printed blocks are not drawn to area, so neither are these.
  const W = 600, H = 600, cut = [0.661, 0.328, 0.667];
  const dx = r2(W * cut[0]), yd = r2(H * cut[1]), yc = r2(H * cut[2]);
  // Small labels: Dark Blue on Active Blue for contrast (printed light); the oversized numerals keep the printed light grey.
  return (
    <Chart name="share-treemap" title="Share: Capacidad gestionada 2025 as a treemap" w={W} h={H} bg={INK}>
      <T es size={12} x="20" y="30" fill={HEX.lightBlue}>{CAPACITY.treemap.year}</T>
      <T es size={12} x="20" y="48" fill={HEX.lightBlue}>Capacidad gestionada</T>
      <rect x={dx} y={yd} width={W - dx} height={yc - yd} fill={INK} {...bind('The Dark Blue remainder: no label and no figure published')} />
      <g {...bind(`${dev.labelRows.join(' ')}: ${dev.pct}%`, true)}>
        <rect x="0" y={yd} width={dx} height={H - yd} fill={BLUE} className="fill-in" style={{ '--i': 0 }} />
        {dev.labelRows.map((t, i) => <T key={t} es size={12} x="18" y={yd + 26 + i * 16} className="fade-in" style={{ '--i': 6 }}>{t}</T>)}
        <T size={125} x={dx - 62} y={H - 22} anchor="end" fill={HEX.onBlue} letterSpacing="-4" className="display fade-in" style={{ '--i': 7 }}>{dev.pct}</T>
        <T size={48} x={dx - 16} y={H - 112} anchor="end" fill={HEX.onBlue} className="fade-in" style={{ '--i': 7 }}>%</T>
      </g>
      <g {...bind(`${cons.labelRows.join(' ')}: ${cons.pct}%`, true)}>
        <rect x={dx} y={yc} width={W - dx} height={H - yc} fill={BLUE} className="fill-in" style={{ '--i': 2 }} />
        <rect x={dx} y={yc} width={W - dx} height={H - yc} fill={HEX.white} fillOpacity="0.2" className="fill-in" style={{ '--i': 2 }} />
        {cons.labelRows.map((t, i) => <T key={t} es size={11} x={dx + 14} y={yc + 24 + i * 14} className="fade-in" style={{ '--i': 7 }}>{t}</T>)}
        <T size={62} x={W - 36} y={H - 18} anchor="end" fill={HEX.onBlue} letterSpacing="-2" className="display fade-in" style={{ '--i': 8 }}>{cons.pct}</T>
        <T size={26} x={W - 10} y={H - 62} anchor="end" fill={HEX.onBlue} className="fade-in" style={{ '--i': 8 }}>%</T>
      </g>
    </Chart>
  );
}

const TECH_FILL = [{ c: BLUE }, { c: INK }, { c: BLUE, o: 0.5 }, { c: HEX.periwinkle, line: true }];

// 4. Share: the four technology tiles as a ring (shares computed from the printed MW).
function Ring() {
  const bind = useTip();
  return (
    <Chart name="share-ring" title="Share: the four technologies as a ring">
      {TECH_SHARES.map((t, i) => {
        const a0 = t.start * 360 + 1.2, a1 = (t.start + t.share) * 360 - 1.2;
        return (
          <g key={t.key} {...bind(`${t.label}: ${t.value}, ${t.pct}%`, true)}>
            <path d={arcPath(115, 150, 78, a0, a1)} fill="none" stroke={TECH_FILL[i].c} strokeOpacity={TECH_FILL[i].o ?? 1} strokeWidth="38" pathLength="1" className="draw" style={{ '--len': 1, '--i': i * 4 }} />
                      </g>
        );
      })}
      <MarkG x={93} y={128} size={44} fill={INK} />
      {TECH_SHARES.map((t, i) => (
        <g key={t.key} className="fade-in" style={{ '--i': i + 4 }}>
          <rect x="226" y={72 + i * 50} width="14" height="14" fill={TECH_FILL[i].c} fillOpacity={TECH_FILL[i].o ?? 1} stroke={INK} strokeWidth={TECH_FILL[i].line ? 1 : 0} />
          <T es size={13} x="250" y={84 + i * 50}>{t.label}</T>
          <T size={17} x="250" y={106 + i * 50} className="display">{t.pct}%</T>
        </g>
      ))}
    </Chart>
  );
}

// 5. Distribution: where the eight printed MW values fall on one axis (quarters above, technologies below).
function Strip() {
  const bind = useTip();
  const x = scale(0, 13000, 50, 370);
  const tech = TECH_SHARES;
  return (
    <Chart name="distribution-strip" title="Distribution: the printed MW values on one axis">
      {[0, 5000, 10000].map((v, i) => (
        <g key={v}>
          <rect x={x(v)} y="60" width="1" height="190" {...GRID} className="extend-y" style={{ '--i': i }} />
          <T size={12} x={x(v)} y="272" anchor="middle" fill={MUTED}>{v ? es(v) : '0'}</T>
        </g>
      ))}
      <T size={12} x="50" y="52" fill={MUTED}>Quarters (m17)</T>
      <T size={12} x="50" y="152" fill={MUTED}>Technologies (m16)</T>
      <rect x="50" y="108" width="320" height="1" fill={INK} /><rect x="50" y="208" width="320" height="1" fill={INK} />
      {Q.map((q, i) => (
        <g key={q.q} {...bind(`${q.q}: ${q.value}`)}>
          <rect x={x(q.mw) - 8} y={101 + (i % 2 ? -10 : 10)} width="14" height="14" fill={BLUE} className="snap" style={{ '--i': i }} />
        </g>
      ))}
      {tech.map((t, i) => (
        <g key={t.key} {...bind(`${t.label}: ${t.value}`, true)}>
          <rect x={x(t.mw) - 8} y="201" width="14" height="14" fill={INK} className="snap" style={{ '--i': i + 4 }} />
        </g>
      ))}
    </Chart>
  );
}

// 6. Comparison: each quarter as a share of the Q3 peak, on a track as long as the printed axis (7.000 MW).
function Bullet() {
  const bind = useTip();
  const x = scale(0, AXIS_MAX, 70, 330);
  return (
    <Chart name="comparison-bullet" title="Comparison: quarters against the Q3 peak">
      {Q.map((q, i) => {
        const y0 = 50 + i * 56;
        return (
          <g key={q.q} {...bind(`${q.q}: ${q.value}, ${Math.round((q.mw / PEAK) * 100)}% of the peak`)}>
            <T size={14} x="30" y={y0 + 18}>{q.q}</T>
            <rect x="70" y={y0} width="260" height="26" fill={HEX.periwinkle} />
            <rect x="70" y={y0 + 7} width={r2(x(q.mw) - 70)} height="12" fill={BLUE} className="grow-x" style={{ '--i': i }} />
            <rect x={r2(x(PEAK) - 1.5)} y={y0 - 5} width="3" height="36" fill={INK} />
            <T size={14} x="384" y={y0 + 19} anchor="end">{Math.round((q.mw / PEAK) * 100)}%</T>
          </g>
        );
      })}
      <T size={12} x="70" y="282" fill={MUTED}>0</T>
      <T size={12} x="330" y="282" anchor="end" fill={MUTED}>{mwf(AXIS_MAX)}</T>
      <T size={12} x={r2(x(PEAK))} y="38" anchor="middle" fill={INK}>peak</T>
    </Chart>
  );
}

export const StepCard = () => (
  <ChartCard id="dataviz-trend" kind="Trend" title="Stepped line" caption="The four quarters of 2025 joined by steps; the figures under the line are the change from the previous quarter, computed." source="phone dashboard, quarters">
    <Step />
  </ChartCard>
);
export const ColumnsCard = () => (
  <ChartCard id="dataviz-comparison" kind="Comparison" title="Columns against the mean" caption="Each quarter against the mean of the four (15.420 divided by 4)." source="phone dashboard, quarters" legend={<Legend items={[{ label: 'Above the mean', color: BLUE }, { label: 'Below the mean', color: INK }]} />}>
    <Columns />
  </ChartCard>
);
export const TreemapCard = () => (
  <ChartCard id="dataviz-share" kind="Share" title="Treemap" span="6r" caption="The case study's own treemap, laid out as printed: 2025 Capacidad gestionada. The Dark Blue remainder has no label and no figure in the case study, so it has none here." source="phone dashboard, treemap">
    <Treemap />
  </ChartCard>
);
export const RingCard = () => (
  <ChartCard id="dataviz-ring" kind="Share" title="Ring of technologies" caption={`Each technology as a share of the four website tiles added together (${mwf(TECH_SUM)}, computed; the case study does not relate this to the 15.420 MW Total anual). Percentages are computed and rounded.`} source="website tiles, computed shares">
    <Ring />
  </ChartCard>
);
export const StripCard = () => (
  <ChartCard id="dataviz-distribution" kind="Distribution" title="Strip plot" caption="The eight printed MW values placed on one axis, quarters above and technologies below." source="phone and website figures">
    <Strip />
  </ChartCard>
);
export const BulletCard = () => (
  <ChartCard id="dataviz-bullet" kind="Comparison" title="Bullet bars" caption="Each quarter as a share of the Q3 peak (computed, rounded); the tick marks 5.200 MW and the track is the printed axis." source="phone dashboard, quarters">
    <Bullet />
  </ChartCard>
);
