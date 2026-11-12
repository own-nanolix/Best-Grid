import { HEX, CAPACITY, TECH } from '@/lib/brand';
import { PIXEL32 } from '@/components/site/icons';
import { r2, scale, linePath, stepPath, segments } from '@/lib/charts';
import { Q, CUM, TOTAL, PEAK, AXIS_MAX, KPIS, PARTS, TECH_SORTED, INK, BLUE, MUTED } from './data';
import { Chart, T } from './kit';

const Node = ({ x, y, fill = INK }) => <rect x={x - 3} y={y - 3} width="6" height="6" fill={fill} className="snap" />;

// ---- Stat cards: four structures (a big numeral, an icon tile, a track, a segmented bar) ----
function StatTotal() {
  return (
    <Chart name="stat-total" title="Stat card: Total anual 15.420 MW" w={300} h={180} bg={HEX.cardGrey}>
      <T es size={13} x="20" y="32">{CAPACITY.totalLabel}</T>
      <T size={62} x="16" y="104" fill={BLUE} letterSpacing="-2" className="display fade-in">15.420</T>
      <T size={22} x="192" y="104">MW</T>
      <path d="M240 66l8 -13l8 13z" fill={BLUE} className="snap" />
      <rect x="20" y="132" width="260" height="1" fill={INK} className="extend-x" />
      <T size={12} x="20" y="156" fill={MUTED}>Sum of Q1 to Q4</T>
    </Chart>
  );
}

function StatTech() {
  const t = TECH.find((x) => x.highlight);
  return (
    <Chart name="stat-technology" title="Stat card: Data Centers 2.083 MW" w={300} h={180} bg={HEX.statCell}>
      <g transform="translate(20 20) scale(1.5)"><path d={PIXEL32[t.icon]} fill={INK} className="fade-in" /></g>
      <T es size={15} x="20" y="112">{t.label}</T>
      <T size={34} x="18" y="152" fill={BLUE} className="display">{t.value}</T>
    </Chart>
  );
}

function StatPeak() {
  const x = scale(0, AXIS_MAX, 20, 280);
  return (
    <Chart name="stat-peak" title="Stat card: the Q3 peak, 5.200 MW" w={300} h={180} bg={INK}>
      <rect x="20" y="22" width="40" height="22" rx="11" fill={BLUE} />
      <T size={13} x="40" y="38" anchor="middle">{Q[2].q}</T>
      <T size={58} x="16" y="104" fill={HEX.lightBlue} className="display">5.200</T>
      <T size={20} x="172" y="104" fill={HEX.mutedOnDark}>MW</T>
      <rect x="20" y="138" width="260" height="1" fill={HEX.mutedOnDark} />
      <rect x="20" y="136" width={r2(x(PEAK) - 20)} height="5" fill={BLUE} className="grow-x" />
      <Node x={r2(x(PEAK))} y={138.5} fill={HEX.lightBlue} />
      <T size={12} x="20" y="162" fill={HEX.mutedOnDark}>0</T>
      <T size={12} x="280" y="162" anchor="end" fill={HEX.mutedOnDark}>7.000 MW</T>
    </Chart>
  );
}

function StatShare() {
  const dev = PARTS[0];
  return (
    <Chart name="stat-share" title="Stat card: Desarrollo durante el año 68%" w={300} h={180} bg={BLUE}>
      <T size={78} x="16" y="92" className="display">{dev.pct}</T>
      <T size={30} x="112" y="48">%</T>
      {dev.labelRows.map((t, i) => <T key={t} es size={13} x="20" y={118 + i * 16}>{t}</T>)}
      {segments(25, 260, 17, 3).map((sg, i) => (
        <rect key={sg.x} x={20 + sg.x} y="154" width={sg.w} height="14" fill={sg.on ? INK : 'none'} stroke={INK} strokeWidth="1" className="fill-in" style={{ '--i': i % 12 }} />
      ))}
    </Chart>
  );
}

export function StatCards() {
  return [StatTotal, StatTech, StatPeak, StatShare].map((C) => <C key={C.name} />);
}

// ---- KPI tiles (m17): three structures for the three printed counts ----
const label = (t) => <T es size={13} x="18" y="30">{t}</T>;

function KpiFaithful() {
  const k = KPIS[0];
  return (
    <Chart name="kpi-projects" title="KPI tile: Proyectos gestionados 128" w={280} h={130} bg={HEX.paper}>
      {label(k.label)}
      <T size={60} x="14" y="108" fill={BLUE} className="display fade-in">{k.value}</T>
    </Chart>
  );
}

function KpiDots() {
  const k = KPIS[1];
  return (
    <Chart name="kpi-nodes" title="KPI tile: Nudos analizados 46" w={280} h={130} bg={HEX.paper}>
      {label(k.label)}
      <T size={44} x="16" y="76" fill={BLUE} className="display">{k.value}</T>
      {Array.from({ length: k.value }, (_, i) => <rect key={i} x={18 + (i % 23) * 11} y={90 + Math.floor(i / 23) * 14} width="7" height="7" fill={INK} className="snap" style={{ '--i': i % 23 }} />)}
    </Chart>
  );
}

function KpiBars() {
  const k = KPIS[2];
  return (
    <Chart name="kpi-access" title="KPI tile: Accesos concedidos 72" w={280} h={130} bg={HEX.paper}>
      {label(k.label)}
      <T size={60} x="262" y="86" anchor="end" fill={BLUE} className="display fade-in">{k.value}</T>
      {Array.from({ length: k.value }, (_, i) => <rect key={i} x={18 + i * 3.4} y="102" width="2" height="16" fill={INK} className="rise" style={{ '--i': i % 24 }} />)}
    </Chart>
  );
}

export function KpiTiles() {
  return [KpiFaithful, KpiDots, KpiBars].map((C) => <C key={C.name} />);
}

// ---- Sparklines: the printed figures again, as four tiny forms ----
export function Sparklines() {
  const q = scale(0, AXIS_MAX, 52, 8);
  const xs = [0, 1, 2, 3].map((i) => 124 + i * 28);
  const cum = scale(0, TOTAL, 52, 8);
  const row = (i) => 8 + i * 62;
  const techMax = TECH_SORTED[0].mw;
  return (
    <Chart name="sparklines" title="Sparklines: quarters, running total and technologies" w={300} h={262} bg={HEX.paper}>
      {['Quarters', 'Per quarter', 'Running total', 'By technology'].map((t, i) => (
        <g key={t}>
          <T size={12} x="16" y={row(i) + 34} fill={MUTED}>{t}</T>
          <rect x="16" y={row(i) + 58} width="268" height="1" fill={INK} opacity="0.14" />
        </g>
      ))}
      <g transform={`translate(0 ${row(0)})`}>
        <path d={linePath(Q.map((v, i) => [xs[i], q(v.mw)]))} fill="none" stroke={BLUE} strokeWidth="2" pathLength="1" className="draw" style={{ '--len': 1 }} />
        <Node x={xs[3]} y={q(Q[3].mw)} />
        <T size={12} x="284" y="34" anchor="end">{Q[3].value}</T>
      </g>
      <g transform={`translate(0 ${row(1)})`}>
        {Q.map((v, i) => <rect key={v.q} x={xs[i] - 8} y={q(v.mw)} width="16" height={r2(52 - q(v.mw))} fill={i === 2 ? BLUE : INK} className="rise" style={{ '--i': i }} />)}
        <T size={12} x="284" y="34" anchor="end">{Q[2].value}</T>
      </g>
      <g transform={`translate(0 ${row(2)})`}>
        <path d={stepPath(CUM.map((v, i) => [xs[i], cum(v)]))} fill="none" stroke={INK} strokeWidth="2" pathLength="1" className="draw" style={{ '--len': 1 }} />
        <T size={12} x="284" y="34" anchor="end">{CAPACITY.totalValue}</T>
      </g>
      <g transform={`translate(0 ${row(3)})`}>
        {TECH_SORTED.map((t, i) => <rect key={t.key} x="124" y={6 + i * 12} width={r2((t.mw / techMax) * 80)} height="8" fill={i ? INK : BLUE} className="grow-x" style={{ '--i': i }} />)}
        <T size={12} x="284" y="34" anchor="end">{TECH_SORTED[0].value}</T>
      </g>
    </Chart>
  );
}
