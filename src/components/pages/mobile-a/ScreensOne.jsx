// Screens 1 to 5. Screens 1 and 2 are the two phone screens of the case study (m17), rebuilt from the measured
// shared artwork. Screens 3 to 5 extend the same language: the technology tiles of m16 as a screen, one technology
// with its printed figure, and a year with no published figures.
import { HEX, CAPACITY, TECH } from '@/lib/brand';
import { PIXEL32 } from '@/components/site/icons';
import { ScreenCapacityG, ScreenNodesG } from '@/components/art/Devices';
import { Ground, Title, Bar, Node, Rule, Cell, YearChip } from './parts';

// 01: m17 front phone, 2025 with its figures.
export function CapacityScreen({ idp }) {
  return <ScreenCapacityG idp={idp} year={CAPACITY.year} />;
}

// 02: m17 back phone, the node grid (drawing only, no data).
export function NodesScreen({ animate = false }) {
  return <ScreenNodesG animate={animate} />;
}

// 03: the four technology tiles of the website as stacked ruled cells (m16): pixel icon, label, figure.
const TILE_Y = 132;
const TILE_H = 150;
export function TechScreen() {
  return (
    <Ground>
      <Title rows={CAPACITY.titleRows} />
      {TECH.map((t, i) => {
        const y = TILE_Y + i * TILE_H;
        return (
          <g key={t.key} lang="es">
            <Cell x={36} y={y} w={317} h={TILE_H} fill={t.highlight ? HEX.statCell : undefined} />
            <g transform={`translate(58 ${y + 24}) scale(3.4)`}>
              <path d={PIXEL32[t.icon]} fill={HEX.darkBlue} />
            </g>
            <text x="186" y={y + 74} fontSize="17" fill={HEX.blueInk}>{t.label}</text>
            <text x="186" y={y + 104} fontSize="26" fill={HEX.blueInk} letterSpacing="-0.4" className="display">{t.value}</text>
          </g>
        );
      })}
    </Ground>
  );
}

// 04: one technology (Fotovoltaico) with its printed figure; the other rows are quiet placeholder bars.
export function TechDetailScreen() {
  const t = TECH[0];
  return (
    <Ground>
      <text x="36" y="84" fontSize="16" fill={HEX.darkBlue} lang="es">{t.label}</text>
      <Cell x={36} y={120} w={317} h={250} />
      <Rule x={36} y={245} w={317} o={0.25} />
      <g transform="translate(76 148) scale(7.4)">
        <path d={PIXEL32[t.icon]} fill={HEX.darkBlue} />
      </g>
      <text x="34" y="436" fontSize="46" fill={HEX.activeBlue} letterSpacing="-1.2" className="display" lang="es">{t.value}</text>
      <path d="M268 410l5 -8l5 8z" fill={HEX.activeBlue} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Rule x={36} y={474 + i * 52} w={317} o={0.3} />
          <Node x={36} y={474 + i * 52} s={6} />
          <Bar x={52} y={492 + i * 52} w={[130, 96, 150, 80, 112][i]} h={9} o={0.14} />
          <Bar x={52} y={510 + i * 52} w={[70, 120, 60, 98, 54][i]} h={6} o={0.08} />
          <Bar x={296} y={494 + i * 52} w={40} h={14} o={0.1} />
        </g>
      ))}
      <Node x={353} y={474} s={6} />
    </Ground>
  );
}

// 05: a year with no published figures: the chips with 2024 active, and the quiet empty state.
export function YearEmptyScreen() {
  const cx = [118, 195, 271];
  return (
    <Ground>
      <Title rows={CAPACITY.titleRows} />
      {CAPACITY.years.map((y, i) => (
        <YearChip key={y} cx={cx[i]} y={132} label={y} on={y === '2024'} w={64} h={24} />
      ))}
      <text x="36" y="196" fontSize="10" fill={HEX.darkBlue} lang="es">{CAPACITY.totalLabel}</text>
      <Bar x={36} y={218} w={190} h={26} o={0.1} />
      <Cell x={36} y={286} w={317} h={282} />
      {[1, 2, 3, 4, 5, 6].map((i) => <Rule key={i} x={36} y={286 + i * 40.3} w={317} o={0.12} h={0.6} />)}
      <rect x="36" y="286" width="317" height="282" fill={HEX.darkBlue} opacity="0.04" />
      <text x="194.5" y="432" fontSize="13" fill={HEX.muted} textAnchor="middle">No figures published for this year</text>
      <Rule x={150} y={446} w={89} o={0.5} />
      <Node x={150} y={446} s={5} />
      <Node x={239} y={446} s={5} />
      {[36, 142, 247, 353].map((x) => (
        <g key={x}>
          <Rule x={x - 0.4} y={610} w={0.8} h={64} o={0.5} />
          <Node x={x} y={610} s={6} />
          <Node x={x} y={674} s={6} />
        </g>
      ))}
      <Rule x={0} y={610} w={390} o={0.5} />
      <Rule x={0} y={674} w={390} o={0.5} />
      {CAPACITY.kpis.map((k, i) => (
        <g key={k.label}>
          <Bar x={[52, 157, 263][i]} y={626} w={64} h={6} o={0.16} />
          <Bar x={[52, 157, 263][i]} y={642} w={34} h={14} o={0.1} />
        </g>
      ))}
    </Ground>
  );
}
