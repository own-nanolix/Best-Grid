// Screens 6 to 9, in the same language: a node list, the report cover (m02), a brand screen with the mark and the
// published palette (m04, m21), and the four quarters (m17) as bars. Rows without published content are quiet bars.
import { HEX, CAPACITY, REPORT } from '@/lib/brand';
import { r2, scale, seeded } from '@/lib/charts';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { Ground, Title, Bar, Node, Rule, YearChip, Total } from './parts';

// The three published colours: name and HEX as printed on m04 (the matching-system codes are left out).
const PALETTE_ROWS = [
  { name: 'Dark Blue', hex: HEX.darkBlue, ink: HEX.onBlue },
  { name: 'Active Blue', hex: HEX.activeBlue, ink: HEX.darkBlue },
  { name: 'Light Blue', hex: HEX.lightBlue, ink: HEX.darkBlue },
];

// 06: a list of nodes. "Nudos analizados 46" is the printed label and figure; each row is a quiet placeholder with a
// small empty cell: it marks a row, never a node of its own or a value.
export function NodeListScreen() {
  const rnd = seeded(9);
  const rows = Array.from({ length: 11 }, () => ({ a: 70 + Math.floor(rnd() * 90), b: 40 + Math.floor(rnd() * 60) }));
  const k = CAPACITY.kpis[1];
  return (
    <Ground>
      <text x="36" y="84" fontSize="16" fill={HEX.darkBlue} lang="es">{k.label}</text>
      <text x="34" y="150" fontSize="64" fill={HEX.activeBlue} letterSpacing="-1.5" className="display">{k.value}</text>
      <Rule x={0} y={176} w={390} />
      {rows.map((r, i) => {
        const y = 176 + i * 56;
        return (
          <g key={i}>
            <Rule x={0} y={y + 56} w={390} o={0.3} />
            <Node x={36} y={y + 56} s={6} />
            <rect x="36" y={y + 14} width="28" height="28" fill="none" stroke={HEX.darkBlue} strokeOpacity="0.22" />
            <Bar x={80} y={y + 17} w={r.a} h={9} o={0.14} />
            <Bar x={80} y={y + 33} w={r.b} h={6} o={0.08} />
            <rect x="321" y={y + 22} width="32" height="12" fill={HEX.darkBlue} opacity="0.1" />
          </g>
        );
      })}
      <Node x={353} y={176} s={6} />
    </Ground>
  );
}

// 07: the report cover (m02): Active Blue, Dark Blue type, the spine strip, the two years stacked bottom right.
export function ReportScreen() {
  return (
    <Ground fill={HEX.activeBlue}>
      <rect width="34" height={844} fill={HEX.darkBlue} />
      <rect x="0" y="0" width="34" height="48" fill={HEX.darkBlue} />
      <MarkG x={7} y={58} size={20} fill={HEX.activeBlue} />
      <g transform="translate(23 760) rotate(-90)" fill={HEX.onBlue}>
        <text fontSize="11" lang="es">{REPORT.spine}</text>
        <text x="54" fontSize="11" lang="es">{REPORT.range}</text>
      </g>
      <g lang="es" fill={HEX.darkBlue}>
        <text fontSize="62" letterSpacing="-1.4" className="display">
          {REPORT.titleRows.map((r, i) => <tspan key={r} x="62" y={178 + i * 62}>{r}</tspan>)}
        </text>
        <text fontSize="14.5">
          {REPORT.lineRows.map((r, i) => <tspan key={r} x="62" y={438 + i * 19}>{r}</tspan>)}
        </text>
        <text x="62" y="780" fontSize="14">{REPORT.signature}</text>
        <text fontSize="78" textAnchor="end" letterSpacing="-2" className="display">
          {REPORT.years.map((y, i) => <tspan key={y} x="360" y={694 + i * 74}>{y}</tspan>)}
        </text>
      </g>
      <Rule x={62} y={402} w={298} o={0.6} />
      <Node x={62} y={402} s={6} />
    </Ground>
  );
}

// 08: the mark and the palette as published (names and HEX values), on Dark Blue.
export function BrandScreen() {
  const bands = PALETTE_ROWS;
  return (
    <Ground fill={HEX.darkBlue} bar={HEX.onBlue}>
      <Rule x={0} y={72} w={390} fill={HEX.activeBlue} o={0.6} />
      <Rule x={195} y={72} w={0.8} h={400} fill={HEX.activeBlue} o={0.6} />
      <Node x={195} y={72} s={6} fill={HEX.activeBlue} />
      <MarkG x={110} y={118} size={170} fill={HEX.activeBlue} />
      <Rule x={0} y={472} w={390} fill={HEX.activeBlue} o={0.6} />
      <Node x={195} y={472} s={6} fill={HEX.activeBlue} />
      <WordmarkG x={195} y={534} size={44} fill={HEX.onBlue} anchor="middle" />
      {bands.map((b, i) => {
        const y = 574 + i * 90;
        return (
          <g key={b.name}>
            <rect x="36" y={y} width="318" height="82" fill={b.hex} stroke={HEX.activeBlue} strokeOpacity={i ? 0 : 0.7} />
            <text x="50" y={y + 66} fontSize="14" fill={b.ink}>{b.name}</text>
            <text x="340" y={y + 66} fontSize="14" fill={b.ink} textAnchor="end">{`HEX ${b.hex}`}</text>
          </g>
        );
      })}
    </Ground>
  );
}

// 09: the four quarters as bars on the printed axis (1.000 to 7.000 MW), the total, and the year chips.
export function QuartersScreen() {
  const x = scale(0, CAPACITY.axisMax, 36, 353);
  const peak = CAPACITY.quarters.findIndex((q) => q.peak);
  return (
    <Ground>
      <Title rows={CAPACITY.titleRows} />
      <Total y={152} size={37} />
      {CAPACITY.quarters.map((q, i) => {
        const y = 268 + i * 96;
        const on = i === peak;
        return (
          <g key={q.q} lang="es">
            <text x="36" y={y} fontSize="11" fill={HEX.darkBlue}>{q.q}</text>
            <text x="353" y={y} fontSize="11" fill={HEX.darkBlue} textAnchor="end">{q.value}</text>
            <rect x="36" y={y + 12} width="317" height="40" fill={HEX.darkBlue} opacity="0.06" />
            <rect x="36" y={y + 12} width={r2(x(q.mw) - 36)} height="40" fill={HEX.activeBlue} opacity={on ? 1 : 0.5} />
            <Node x={36} y={y + 52} s={6} />
          </g>
        );
      })}
      <Rule x={36} y={658} w={317} fill={HEX.darkBlue} o={0.8} />
      {[1000, 4000, 7000].map((v) => (
        <g key={v}>
          <Node x={x(v)} y={658} s={5} />
          <text x={r2(x(v))} y={676} fontSize="10" fill={HEX.muted} textAnchor={v === 7000 ? 'end' : v === 1000 ? 'start' : 'middle'} lang="es">{CAPACITY.axis[7 - v / 1000]}</text>
        </g>
      ))}
      {CAPACITY.years.map((y, i) => (
        <YearChip key={y} cx={[118, 195, 271][i]} y={730} label={y} on={y === CAPACITY.year} w={64} h={24} />
      ))}
    </Ground>
  );
}
