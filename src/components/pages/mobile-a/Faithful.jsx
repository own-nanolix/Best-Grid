// Screens 1 and 2: the two phone screens of the case study (m17), rebuilt from measurements of reference/m17.png
// (front screen 834 px wide = 390 units, so 1 unit = 2.1385 px). Every position below is a measured value in the
// 390 x 844 artboard. Changes from the print, for the shared rules: no clock in the status bar; small labels on
// Active Blue are Dark Blue and the active year chip's label is Dark Blue (printed white), for contrast.
import { HEX, CAPACITY } from '@/lib/brand';
import { r2, bands, linePath, areaPath } from '@/lib/charts';
import { GRID_CELLS } from './grid';
import { GROUND, StatusBar } from './parts';

const XL = 36.7, XR = 352.8;                     // the live area of both screens
const YB = 309.8, STEP = 23.07;                   // chart baseline (0 MW) and 1.000 MW
const XS = [57.5, 155.4, 253.5, 351.2];           // the Q1 to Q4 nodes on the baseline
const yOf = (mw) => r2(YB - (mw / 1000) * STEP);
const SOFT_OVER_DARK = 0.2;                       // white over Active Blue: the lighter treemap block
// The printed area outline, traced from the reference every 2.5 units from Q1 to Q4, on the MW axis. It is the
// drawing of the chart (it meets the Q3 marker at 5.200 MW and ends at Q4), not data of its own.
const TRACE = [3101,3061,3040,3081,3121,3000,2898,2736,2676,2757,2696,2554,2676,2838,2939,3000,3101,3162,3121,3121,3223,3304,3426,3466,3507,3385,3263,3243,3243,3344,3446,3608,3689,3648,3628,3648,3730,3851,3953,4054,3973,3851,3730,3628,3709,3811,3871,3871,3770,3790,3871,3953,3993,4074,4155,4236,4338,4216,4155,4216,4277,4317,4358,4419,4480,4561,4601,4601,4601,4601,4621,4682,4723,4763,4824,4905,5027,5128,5200,5128,5067,4844,4601,4601,4642,4581,4520,4419,4317,4216,4155,4135,3993,3851,3750,3689,3730,3811,3851,3892,3730,3588,3486,3426,3486,3466,3344,3263,3203,3243,3304,3263,3203,3162,3101,3040,2980,2959,2920];
const traced = () => TRACE.map((v, i) => [r2(Math.min(XS[0] + i * 2.5, XR)), yOf(v)]);

function Title({ rows }) {
  return (
    <text x={XL} y="87.5" fontSize="16" fill={HEX.darkBlue} lang="es">
      <tspan x={XL}>{rows[0]}</tspan>
      <tspan x={XL} dy="19.5">{rows[1]}</tspan>
    </text>
  );
}

// 01: the front phone, 2025.
export function CapacityFaithful({ idp }) {
  const pts = traced();
  const peak = CAPACITY.quarters.findIndex((q) => q.peak);
  const kx = [36.5, 142, 247.4, 353.1];
  const qEnd = [false, false, true, true];
  const qX = [56.6, 153.8, 256.3, 353.1];
  return (
    <g>
      <rect width="390" height="844" style={{ fill: GROUND }} />
      <StatusBar />
      <Title rows={CAPACITY.titleRows} />
      {CAPACITY.axis.map((label, i) => {
        const y = yOf((7 - i) * 1000);
        return (
          <g key={label}>
            <rect x={XL} y={y} width={r2(XR - XL)} height="0.5" fill={HEX.darkBlue} opacity="0.14" />
            <text x="37" y={r2(y + 5.3)} fontSize="3.1" fill={HEX.muted} lang="es">{label}</text>
          </g>
        );
      })}
      <clipPath id={`${idp}-area`}>
        <path d={areaPath(pts, YB)} />
      </clipPath>
      <g clipPath={`url(#${idp}-area)`}>
        <rect x={XS[0]} y={yOf(7000)} width={r2(XR - XS[0])} height={r2(YB - yOf(7000))} fill={HEX.activeBlue} opacity="0.36" />
        {bands(XS[0], XR, 30).filter((b, i) => i % 2).map((b) => (
          <rect key={b.x} x={b.x} y={yOf(7000)} width={r2(b.w - 0.5)} height={r2(YB - yOf(7000))} fill={HEX.activeBlue} opacity="0.07" />
        ))}
      </g>
      <path d={linePath(pts)} fill="none" stroke={HEX.activeBlue} strokeWidth="0.8" opacity="0.7" />
      <rect x={r2(XS[peak] - 0.45)} y={yOf(CAPACITY.quarters[peak].mw)} width="0.9" height={r2(YB - yOf(CAPACITY.quarters[peak].mw))} fill={HEX.activeBlue} />
      <rect x={XL} y={r2(YB - 0.3)} width={r2(XR - XL)} height="0.6" fill={HEX.darkBlue} />
      {CAPACITY.quarters.map((q, i) => (
        <g key={q.q} lang="es" fill={HEX.darkBlue}>
          <rect x={r2(XS[i] - 1.5)} y={r2(YB - 1.5)} width="3" height="3" />
          <text x={i === 3 ? 352.6 : r2(XS[i] - 1.4)} y="318.7" fontSize="3.3" textAnchor={i === 3 ? 'end' : 'start'}>{q.q}</text>
          <text x={qX[i]} y="326.6" fontSize="5.1" textAnchor={qEnd[i] ? 'end' : 'start'}>{q.value}</text>
        </g>
      ))}
      <text x="36.9" y="348.1" fontSize="5.1" fill={HEX.darkBlue} lang="es">{CAPACITY.totalLabel}</text>
      <text x="38.9" y="381.8" fontSize="36" fill={HEX.activeBlue} letterSpacing="0.5" className="display" lang="es">{CAPACITY.totalValue}</text>
      <path d="M225 361.7l4 -6.1l4 6.1z" fill={HEX.activeBlue} />
      {CAPACITY.years.map((y, i) => {
        const cx = [118.5, 194.5, 270.7][i];
        const on = y === CAPACITY.year;
        return (
          <g key={y}>
            <rect x={r2(cx - 23.5)} y="406" width="47" height="15.3" rx="7.65" fill={on ? HEX.activeBlue : undefined} style={on ? undefined : { fill: 'var(--chip-off)' }} />
            <text x={cx} y="415.3" fontSize="4.3" fill={HEX.darkBlue} textAnchor="middle">{y}</text>
          </g>
        );
      })}
      <rect x="0" y="439.5" width="390" height="0.6" fill={HEX.darkBlue} opacity="0.5" />
      <rect x="0" y="478.1" width="390" height="0.6" fill={HEX.darkBlue} opacity="0.5" />
      {kx.map((x) => (
        <g key={x} fill={HEX.darkBlue}>
          <rect x={r2(x - 0.3)} y="439.8" width="0.6" height="38.6" opacity="0.5" />
          <rect x={r2(x - 1.5)} y="438.3" width="3" height="3" />
          <rect x={r2(x - 1.5)} y="476.9" width="3" height="3" />
        </g>
      ))}
      {CAPACITY.kpis.map((k, i) => (
        <g key={k.label} lang="es">
          <text x={[53.3, 155.3, 260.9][i]} y="452.9" fontSize="5.1" fill={HEX.darkBlue}>{k.label}</text>
          <text x={[50.2, 154.6, 260.4][i]} y="472.1" fontSize="17.5" fill={HEX.activeBlue}>{k.value}</text>
        </g>
      ))}
      <g lang="es">
        <rect x={XL} y="504.8" width={r2(XR - XL)} height="317.5" fill={HEX.darkBlue} />
        <text x="43.5" y="514.6" fontSize="3.9" fill={HEX.white}>{CAPACITY.treemap.year}</text>
        <text x="43.5" y="519.8" fontSize="3.9" fill={HEX.white}>{CAPACITY.treemap.title}</text>
        <rect x={XL} y="609.1" width="209.1" height="213.2" fill={HEX.activeBlue} />
        <text fontSize="3.9" fill={HEX.darkBlue}>
          {CAPACITY.treemap.parts[0].labelRows.map((r, i) => <tspan key={r} x="43.5" y={r2(618.4 + i * 5.2)}>{r}</tspan>)}
        </text>
        <text x="203" y="810.2" fontSize="69.5" fill={HEX.onBlue} textAnchor="end" letterSpacing="-1.6" className="display">68</text>
        <text x="205.6" y="783.5" fontSize="31.6" fill={HEX.onBlue} className="display">%</text>
        <rect x="245.8" y="717.1" width="107" height="105.2" fill={HEX.activeBlue} />
        <rect x="245.8" y="717.1" width="107" height="105.2" fill={HEX.white} opacity={SOFT_OVER_DARK} />
        <text fontSize="3.9" fill={HEX.darkBlue}>
          {CAPACITY.treemap.parts[1].labelRows.map((r, i) => <tspan key={r} x="252.5" y={r2(727.4 + i * 5.6)}>{r}</tspan>)}
        </text>
        <text x="333.8" y="810.2" fontSize="34.1" fill={HEX.onBlue} textAnchor="end" letterSpacing="1.5" className="display">16</text>
        <text x="332.6" y="798.5" fontSize="17.7" fill={HEX.onBlue} className="display">%</text>
      </g>
    </g>
  );
}

// 02: the back phone, the node grid. Measured: 20 columns of 15.85 units from x 36.3, 41 rows of 15.69 from y 153.2.
// The visible cells are as printed; the cells hidden behind the front phone continue the pattern.
const GX = 36.3, GY = 153.2, CW = 15.85, CH = 15.69;
const QOFF = [[0, 0], [1, 0], [0, 1], [1, 1]];
export function NodesFaithful({ animate = false }) {
  return (
    <g>
      <rect width="390" height="844" style={{ fill: GROUND }} />
      <StatusBar />
      <Title rows={CAPACITY.nodesTitleRows} />
      {GRID_CELLS.map(({ r, c, q }) => {
        const x = GX + c * CW, y = GY + r * CH;
        const anim = animate ? { className: 'fill-in', style: { '--i': (r + c) % 12 } } : {};
        if (q[0] !== '.' && q.every((v) => v === q[0])) {
          return <rect key={`${r}-${c}`} x={r2(x)} y={r2(y)} width={CW} height={CH} fill={HEX.activeBlue} fillOpacity={q[0] === 'S' ? 0.75 : 1} {...anim} />;
        }
        return q.map((v, k) => (v === '.' ? null : (
          <rect key={`${r}-${c}-${k}`} x={r2(x + QOFF[k][0] * CW / 2)} y={r2(y + QOFF[k][1] * CH / 2)} width={r2(CW / 2)} height={r2(CH / 2)} fill={HEX.activeBlue} fillOpacity={v === 'S' ? 0.75 : 1} {...anim} />
        )));
      })}
      {Array.from({ length: 21 }, (_, c) => (
        <rect key={`v${c}`} x={r2(GX + c * CW - 0.25)} y={GY} width="0.5" height={r2(41 * CH)} fill={HEX.darkBlue} opacity="0.22" />
      ))}
      {Array.from({ length: 42 }, (_, r) => (
        <rect key={`h${r}`} x={GX} y={r2(GY + r * CH - 0.25)} width={r2(20 * CW)} height="0.5" fill={HEX.darkBlue} opacity="0.22" />
      ))}
    </g>
  );
}
