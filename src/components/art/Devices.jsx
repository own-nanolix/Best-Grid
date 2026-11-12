// Device frames and product screens as SVG groups, for mockups and showcase scenes (one SVG per scene).
// For live, interactive screens use the HTML frames in components/ui/Devices (Phone, Tablet, Laptop, Monitor,
// Window, Watch). Frames are NEUTRAL: no maker's features (a round camera hole, never a pill island; no window
// buttons of a known system; no logos or keyboard legends). Each frame takes `w` (its width in the parent SVG) and
// `idp`, and draws `children` on its screen in the screen's own coordinate space:
//   PhoneG   390 x 844      TabletG  1180 x 820     LaptopG  1440 x 900
//   MonitorG 1600 x 1000    WindowG  1440 x 900 (below a 56 px bar)     WatchG 184 x 224
//
// Ready screens rebuilt from the case study's own screens (measured on m16 and m17):
//   ScreenCapacityG  the front phone of m17 (390 x 844): "Capacidad gestionada…", area chart Q1 to Q4,
//                    "Total anual 15.420 MW", year chips, three KPI cells, the 2025 treemap
//   ScreenNodesG     the back phone of m17 (390 x 844): "Distribución de actividad en nudos de red" over the node grid
//   ScreenWebG       the website of m16 (1440 x 900): nav cells, hero, buttons, slider, the four technology tiles
import { r2, bands, linePath, areaPath } from '@/lib/charts';
import { HEX, mixHex, CAPACITY, TECH, WEB_HERO, NAV, NAV_CTA, BUTTONS } from '@/lib/brand';
import { MarkG } from './Mark';
import { BrandDefs, TrailsG, IconArtG, PhotoBlockG } from './KeyArt';
import { GRID_CELLS } from './node-grid';
import { PIXEL32, CORE } from '@/components/site/icons';

export const SCREEN = { phone: [390, 844], tablet: [1180, 820], laptop: [1440, 900], monitor: [1600, 1000], window: [1440, 900], watch: [184, 224] };
// frame colours, derived from the tokens
const METAL = mixHex(HEX.stageLight, HEX.darkBlue, 0.4);
const BEZEL = HEX.stage;
const CAMERA = HEX.darkBlue;
const CHROME = HEX.screen;                              // browser bar
const CHROME_HI = mixHex(HEX.cardGrey, HEX.white, 0.5); // tab and address field
const CHROME_LINE = HEX.labelGrey;

export function PhoneG({ idp, x = 0, y = 0, w = 300, children, screenFill = HEX.screen, ...rest }) {
  const k = w / 430; // frame 430 x 884 around a 390 x 844 screen
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 1000) / 1000})`} {...rest}>
      <clipPath id={`${idp}-ph`}>
        <rect x="20" y="20" width="390" height="844" rx="48" />
      </clipPath>
      <rect x="-3" y="170" width="6" height="60" rx="2" fill={METAL} />
      <rect x="427" y="200" width="6" height="92" rx="2" fill={METAL} />
      <rect width="430" height="884" rx="66" fill={METAL} />
      <rect x="5" y="5" width="420" height="874" rx="61" fill={BEZEL} />
      <rect x="20" y="20" width="390" height="844" rx="48" fill={screenFill} />
      <g clipPath={`url(#${idp}-ph)`}>
        <g transform="translate(20 20)">{children}</g>
      </g>
      <circle cx="215" cy="46" r="9" fill={BEZEL} />
      <circle cx="215" cy="46" r="3.5" fill={CAMERA} />
      <path d="M66 6h298a60 60 0 0 1 60 60v80" fill="none" stroke={HEX.white} strokeOpacity="0.28" strokeWidth="2" />
    </g>
  );
}

export function TabletG({ idp, x = 0, y = 0, w = 600, children, screenFill = HEX.lightBlue, ...rest }) {
  const k = w / 1260; // frame 1260 x 900 around 1180 x 820
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 1000) / 1000})`} {...rest}>
      <clipPath id={`${idp}-tb`}>
        <rect x="40" y="40" width="1180" height="820" rx="14" />
      </clipPath>
      <rect width="1260" height="900" rx="46" fill={METAL} />
      <rect x="4" y="4" width="1252" height="892" rx="42" fill={BEZEL} />
      <rect x="40" y="40" width="1180" height="820" rx="14" fill={screenFill} />
      <g clipPath={`url(#${idp}-tb)`}>
        <g transform="translate(40 40)">{children}</g>
      </g>
      <circle cx="630" cy="20" r="5" fill={CAMERA} />
    </g>
  );
}

export function LaptopG({ idp, x = 0, y = 0, w = 900, children, screenFill = HEX.lightBlue, body = 'url(#none)', ...rest }) {
  const k = w / 1840; // lid 1500 x 960 centred, screen 1440 x 900 at (200, 30); base 1840 x 56
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 1000) / 1000})`} {...rest}>
      <clipPath id={`${idp}-lp`}>
        <rect x="200" y="30" width="1440" height="900" />
      </clipPath>
      <rect x="170" y="0" width="1500" height="960" rx="30" fill={BEZEL} />
      <rect x="200" y="30" width="1440" height="900" fill={screenFill} />
      <g clipPath={`url(#${idp}-lp)`}>
        <g transform="translate(200 30)">{children}</g>
      </g>
      <path d="M0 960h1840v26a30 30 0 0 1-30 30H30a30 30 0 0 1-30-30z" fill={body === 'url(#none)' ? METAL : body} />
      <path d="M0 960h1840v8H0z" fill={HEX.white} opacity="0.18" />
      <path d="M800 960h240v10a10 10 0 0 1-10 10H810a10 10 0 0 1-10-10z" fill={HEX.black} opacity="0.35" />
    </g>
  );
}

export function MonitorG({ idp, x = 0, y = 0, w = 800, children, screenFill = HEX.lightBlue, stand = true, ...rest }) {
  const k = w / 1640; // frame 1640 x 1040 around 1600 x 1000; stand adds 260 below
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 1000) / 1000})`} {...rest}>
      <clipPath id={`${idp}-mo`}>
        <rect x="20" y="20" width="1600" height="1000" />
      </clipPath>
      {stand && (
        <g>
          <path d="M760 1040h120v230H760z" fill={METAL} />
          <path d="M760 1040h120v50H760z" fill={HEX.black} opacity="0.35" />
          <path d="M560 1270h520v18H560z" fill={METAL} />
          <path d="M560 1288h520v12H560z" fill={mixHex(HEX.stage, HEX.darkBlue, 0.3)} />
        </g>
      )}
      <rect width="1640" height="1040" rx="6" fill={BEZEL} />
      <rect x="20" y="20" width="1600" height="1000" fill={screenFill} />
      <g clipPath={`url(#${idp}-mo)`}>
        <g transform="translate(20 20)">{children}</g>
      </g>
    </g>
  );
}

// A neutral window (stands in for the browser of m16): a 56 px bar with one tab (the mark and the tab label) and a
// plain address field; the 1440 x 900 page below. tab / address: strings from brand.js (BRAND_TAB, CONTACT.webTab).
export function WindowG({ idp, x = 0, y = 0, w = 900, children, tab, address, screenFill = HEX.lightBlue, ...rest }) {
  const k = w / 1440;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 1000) / 1000})`} {...rest}>
      <clipPath id={`${idp}-wn`}>
        <rect x="0" y="56" width="1440" height="900" />
      </clipPath>
      <rect width="1440" height="956" fill={screenFill} />
      <rect width="1440" height="56" fill={CHROME} />
      <path d="M24 56V14a6 6 0 0 1 6-6h300a6 6 0 0 1 6 6v42z" fill={CHROME_HI} />
      <MarkG x={40} y={22} size={16} fill={HEX.darkBlue} />
      {tab && <text x="66" y="35" fontSize="13" fill={HEX.darkBlue}>{tab}</text>}
      <rect x="352" y="16" width="1064" height="26" rx="13" fill={CHROME_HI} />
      {address && <text x="374" y="33.5" fontSize="12" fill={HEX.muted}>{address}</text>}
      <rect x="0" y="55.5" width="1440" height="1" fill={CHROME_LINE} />
      <g clipPath={`url(#${idp}-wn)`}>
        <g transform="translate(0 56)">{children}</g>
      </g>
    </g>
  );
}

export function WatchG({ idp, x = 0, y = 0, w = 180, children, band = HEX.activeBlue, screenFill = HEX.darkBlue, ...rest }) {
  const k = w / 248; // body 248 x 490 with bands; screen 184 x 224 at (28, 133)
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 1000) / 1000})`} {...rest}>
      <clipPath id={`${idp}-wt`}>
        <rect x="28" y="133" width="184" height="224" rx="44" />
      </clipPath>
      <path d="M50 0h140l10 110H40z" fill={band} />
      <path d="M40 380h160l-10 110H50z" fill={band} />
      <rect x="236" y="196" width="12" height="40" rx="3" fill={METAL} />
      <rect x="0" y="100" width="240" height="290" rx="70" fill={METAL} />
      <rect x="8" y="108" width="224" height="274" rx="62" fill={BEZEL} />
      <rect x="28" y="133" width="184" height="224" rx="44" fill={screenFill} />
      <g clipPath={`url(#${idp}-wt)`}>
        <g transform="translate(28 133)">{children}</g>
      </g>
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Screens. The two phone screens below carry the measurements of reference/m17.png (front screen 834 px wide = 390
// units, 1 unit = 2.1385 px), copied from the page that measured them. Rules applied (BRIEF.md): no clock time is
// ever drawn; small labels on Active Blue are Dark Blue and the active year chip's label is Dark Blue (printed
// white), for contrast; the large numerals keep the printed light grey.

// A neutral status bar: signal bars, a fan of arcs and a battery (positions measured on m17). No clock time, no text.
export function StatusBarG({ w = 390, fill = HEX.darkBlue }) {
  const o = w - 390;
  return (
    <g fill={fill} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={r2(o + 280.5 + i * 4.9)} y={r2(36.5 - (i + 1) * 2.3)} width="3.2" height={r2((i + 1) * 2.3)} />
      ))}
      <path d={`M${o + 306} 30.5a12 12 0 0 1 17.5 0l-1.9 2a9.3 9.3 0 0 0-13.7 0Z M${o + 309.6} 34.1a7 7 0 0 1 10.3 0l-5.15 5.2Z`} />
      <rect x={o + 334} y="30.6" width="21" height="8.6" rx="2" />
    </g>
  );
}

const XL = 36.7, XR = 352.8;                       // the live area of both phone screens
const YB = 309.8, STEP = 23.07;                    // chart baseline (0 MW) and 1.000 MW
const XS = [57.5, 155.4, 253.5, 351.2];            // the Q1 to Q4 nodes on the baseline
const yOf = (mw) => r2(YB - (mw / 1000) * STEP);
const SOFT_OVER_BLUE = 0.2;                        // white over Active Blue: the lighter treemap block
// The printed area outline, traced from the reference every 2.5 units from Q1 to Q4, on the MW axis. It is the
// drawing of the chart (it meets the Q3 marker at 5.200 MW and ends at Q4), not data of its own.
const TRACE = [3101,3061,3040,3081,3121,3000,2898,2736,2676,2757,2696,2554,2676,2838,2939,3000,3101,3162,3121,3121,3223,3304,3426,3466,3507,3385,3263,3243,3243,3344,3446,3608,3689,3648,3628,3648,3730,3851,3953,4054,3973,3851,3730,3628,3709,3811,3871,3871,3770,3790,3871,3953,3993,4074,4155,4236,4338,4216,4155,4216,4277,4317,4358,4419,4480,4561,4601,4601,4601,4601,4621,4682,4723,4763,4824,4905,5027,5128,5200,5128,5067,4844,4601,4601,4642,4581,4520,4419,4317,4216,4155,4135,3993,3851,3750,3689,3730,3811,3851,3892,3730,3588,3486,3426,3486,3466,3344,3263,3203,3243,3304,3263,3203,3162,3101,3040,2980,2959,2920];
const traced = () => TRACE.map((v, i) => [r2(Math.min(XS[0] + i * 2.5, XR)), yOf(v)]);

function TitleRows({ rows }) {
  return (
    <text x={XL} y="87.5" fontSize="16" fill={HEX.darkBlue} lang="es">
      <tspan x={XL}>{rows[0]}</tspan>
      <tspan x={XL} dy="19.5">{rows[1]}</tspan>
    </text>
  );
}

// m17 front phone. year: '2025' shows the published figures; any other year shows the quiet empty state
// (2023 and 2024 have no figures). marker: index of the quarter with the vertical marker (default the Q3 peak).
export function ScreenCapacityG({ idp, year = CAPACITY.year, marker = 2 }) {
  const has = year === CAPACITY.year;
  const pts = traced();
  const kx = [36.5, 142, 247.4, 353.1];
  const qEnd = [false, false, true, true];
  const qX = [56.6, 153.8, 256.3, 353.1];
  const [dev, cons] = CAPACITY.treemap.parts;
  return (
    <g>
      <rect width="390" height="844" fill={HEX.screen} />
      <StatusBarG />
      <TitleRows rows={CAPACITY.titleRows} />
      {CAPACITY.axis.map((label, i) => {
        const y = yOf((7 - i) * 1000);
        return (
          <g key={label}>
            <rect x={XL} y={y} width={r2(XR - XL)} height="0.5" fill={HEX.darkBlue} opacity="0.14" />
            <text x="37" y={r2(y + 5.3)} fontSize="3.1" fill={HEX.muted} lang="es">{label}</text>
          </g>
        );
      })}
      {has ? (
        <g>
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
          <rect x={r2(XS[marker] - 0.45)} y={yOf(CAPACITY.quarters[marker].mw)} width="0.9" height={r2(YB - yOf(CAPACITY.quarters[marker].mw))} fill={HEX.activeBlue} />
        </g>
      ) : (
        <text x={r2((XL + XR) / 2)} y={r2((yOf(7000) + YB) / 2)} fontSize="9" fill={HEX.muted} textAnchor="middle">No figures published for this year</text>
      )}
      <rect x={XL} y={r2(YB - 0.3)} width={r2(XR - XL)} height="0.6" fill={HEX.darkBlue} />
      {CAPACITY.quarters.map((q, i) => (
        <g key={q.q} lang="es" fill={HEX.darkBlue}>
          <rect x={r2(XS[i] - 1.5)} y={r2(YB - 1.5)} width="3" height="3" />
          <text x={i === 3 ? 352.6 : r2(XS[i] - 1.4)} y="318.7" fontSize="3.3" textAnchor={i === 3 ? 'end' : 'start'}>{q.q}</text>
          {has && <text x={qX[i]} y="326.6" fontSize="5.1" textAnchor={qEnd[i] ? 'end' : 'start'}>{q.value}</text>}
        </g>
      ))}
      {/* total */}
      <text x="36.9" y="348.1" fontSize="5.1" fill={HEX.darkBlue} lang="es">{CAPACITY.totalLabel}</text>
      {has ? (
        <g>
          <text x="38.9" y="381.8" fontSize="36" fill={HEX.activeBlue} letterSpacing="0.5" className="display" lang="es">{CAPACITY.totalValue}</text>
          <path d="M225 361.7l4 -6.1l4 6.1z" fill={HEX.activeBlue} />
        </g>
      ) : (
        <rect x="38.9" y="362" width="150" height="14" fill={HEX.darkBlue} opacity="0.1" />
      )}
      {/* year chips: the active label is Dark Blue (printed white) */}
      {CAPACITY.years.map((yy, i) => {
        const cx = [118.5, 194.5, 270.7][i];
        return (
          <g key={yy}>
            <rect x={r2(cx - 23.5)} y="406" width="47" height="15.3" rx="7.65" fill={yy === year ? HEX.activeBlue : HEX.chipOff} />
            <text x={cx} y="415.3" fontSize="4.3" fill={HEX.darkBlue} textAnchor="middle">{yy}</text>
          </g>
        );
      })}
      {/* KPI cells */}
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
          {has
            ? <text x={[50.2, 154.6, 260.4][i]} y="472.1" fontSize="17.5" fill={HEX.activeBlue}>{k.value}</text>
            : <rect x={[53.3, 155.3, 260.9][i]} y="461" width="30" height="9" fill={HEX.darkBlue} opacity="0.1" />}
        </g>
      ))}
      {/* treemap: Dark Blue field, Desarrollo 68% and Capacidad consolidada 16% (the remainder unlabelled, no figure) */}
      {has && (
        <g lang="es">
          <rect x={XL} y="504.8" width={r2(XR - XL)} height="317.5" fill={HEX.darkBlue} />
          <text x="43.5" y="514.6" fontSize="3.9" fill={HEX.white}>{CAPACITY.treemap.year}</text>
          <text x="43.5" y="519.8" fontSize="3.9" fill={HEX.white}>{CAPACITY.treemap.title}</text>
          <rect x={XL} y="609.1" width="209.1" height="213.2" fill={HEX.activeBlue} />
          <text fontSize="3.9" fill={HEX.darkBlue}>
            {dev.labelRows.map((r, i) => <tspan key={r} x="43.5" y={r2(618.4 + i * 5.2)}>{r}</tspan>)}
          </text>
          <text x="203" y="810.2" fontSize="69.5" fill={HEX.onBlue} textAnchor="end" letterSpacing="-1.6" className="display">{dev.pct}</text>
          <text x="205.6" y="783.5" fontSize="31.6" fill={HEX.onBlue} className="display">%</text>
          <rect x="245.8" y="717.1" width="107" height="105.2" fill={HEX.activeBlue} />
          <rect x="245.8" y="717.1" width="107" height="105.2" fill={HEX.white} opacity={SOFT_OVER_BLUE} />
          <text fontSize="3.9" fill={HEX.darkBlue}>
            {cons.labelRows.map((r, i) => <tspan key={r} x="252.5" y={r2(727.4 + i * 5.6)}>{r}</tspan>)}
          </text>
          <text x="333.8" y="810.2" fontSize="34.1" fill={HEX.onBlue} textAnchor="end" letterSpacing="1.5" className="display">{cons.pct}</text>
          <text x="332.6" y="798.5" fontSize="17.7" fill={HEX.onBlue} className="display">%</text>
        </g>
      )}
    </g>
  );
}

// m17 back phone: the node grid, 20 columns of 15.85 units from x 36.3 by 41 rows of 15.69 from y 153.2, read cell by
// cell (node-grid.js). Drawing only, no data.
const GX = 36.3, GY = 153.2, CW = 15.85, CH = 15.69;
const QOFF = [[0, 0], [1, 0], [0, 1], [1, 1]];
export function ScreenNodesG({ animate = false }) {
  return (
    <g>
      <rect width="390" height="844" fill={HEX.screen} />
      <StatusBarG />
      <TitleRows rows={CAPACITY.nodesTitleRows} />
      {GRID_CELLS.map(({ r, c, q }) => {
        const x = GX + c * CW, y = GY + r * CH;
        const anim = animate ? { className: 'fill-in', style: { '--i': (r + c) % 12 } } : {};
        if (q[0] !== '.' && q.every((v) => v === q[0])) {
          return <rect key={`${r}-${c}`} x={r2(x)} y={r2(y)} width={CW} height={CH} fill={HEX.activeBlue} fillOpacity={q[0] === 'S' ? 0.75 : 1} {...anim} />;
        }
        return q.map((v, k) => (v === '.' ? null : (
          <rect key={`${r}-${c}-${k}`} x={r2(x + (QOFF[k][0] * CW) / 2)} y={r2(y + (QOFF[k][1] * CH) / 2)} width={r2(CW / 2)} height={r2(CH / 2)} fill={HEX.activeBlue} fillOpacity={v === 'S' ? 0.75 : 1} {...anim} />
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

// m16 website hero (1440 x 900). Needs idp (BrandDefs for the slider's sunset stand-in). active: the slider dot.
export function ScreenWebG({ idp, active = 0 }) {
  const cells = [0, 130, 489, 645, 794, 950, 1308, 1440];
  const tiles = [0, 374, 720, 1065, 1440];
  return (
    <g>
      <BrandDefs idp={idp} />
      <rect width="1440" height="900" fill={HEX.lightBlue} />
      {/* nav row of ruled cells */}
      <rect x="1308" y="0" width="132" height="56" fill={HEX.darkBlue} />
      <rect x="0" y="56" width="1440" height="1" fill={HEX.darkBlue} opacity="0.55" />
      {cells.slice(1, 6).map((cx) => (
        <rect key={cx} x={cx} y="0" width="1" height="56" fill={HEX.darkBlue} opacity="0.35" />
      ))}
      <MarkG x={46} y={12} size={32} fill={HEX.darkBlue} />
      <g lang="es" fontSize="14" fill={HEX.darkBlue}>
        {NAV.map((n, i) => (
          <text key={n} x={r2((cells[i + 2] + cells[i + 3]) / 2)} y="33" textAnchor="middle">{n}</text>
        ))}
        <text x="1352" y="33" fill={HEX.activeBlue}>{NAV_CTA}</text>
      </g>
      <path d={CORE.crosshair} transform="translate(1396 21) scale(0.6)" fill={HEX.white} />
      <rect x="127" y="53" width="7" height="7" fill={HEX.darkBlue} />
      <rect x="717" y="53" width="7" height="7" fill={HEX.darkBlue} />
      {/* hero column rule and the guide through the slider */}
      <rect x="720" y="57" width="1" height="581" fill={HEX.darkBlue} opacity="0.35" />
      <rect x="720" y="369" width="27" height="1" fill={HEX.darkBlue} opacity="0.35" />
      <rect x="1411" y="369" width="29" height="1" fill={HEX.darkBlue} opacity="0.35" />
      <rect x="717" y="366" width="7" height="7" fill={HEX.darkBlue} />
      <g lang="es">
        <text fontSize="45" fill={HEX.darkBlue} letterSpacing="-0.6" className="display">
          {WEB_HERO.rows.map((r, i) => (
            <tspan key={r} x="29" y={199 + i * 50}>{r}</tspan>
          ))}
        </text>
        <text fontSize="13.4" fill={HEX.activeBlue}>
          {['Acompañamos proyectos de energía, almacenamiento, autoconsumo, data', 'centers y nuevas demandas eléctricas en los puntos donde acceso, conexión', 'y viabilidad se vuelven decisivos. Identificamos nudos críticos, ordenamos', 'condicionantes técnicos y regulatorios y coordinamos la interlocución', 'necesaria para que los proyectos puedan avanzar.'].map((r, i) => (
            <tspan key={r} x="29" y={355 + i * 17.8}>{r}</tspan>
          ))}
        </text>
        <rect x="36" y="496" width="128" height="29" fill={HEX.btnFill} />
        <text x="48" y="514.5" fontSize="10.5" fill={HEX.darkBlue}>{BUTTONS.evaluate}</text>
        <path d={CORE.crosshair} transform="translate(141 503) scale(0.62)" fill={HEX.activeBlue} />
        <rect x="187.5" y="496.5" width="112" height="28" fill="none" stroke={HEX.white} strokeWidth="1" />
        <text x="199" y="514.5" fontSize="10.5" fill={HEX.darkBlue}>{BUTTONS.services}</text>
        <path d={CORE.crosshair} transform="translate(275 503) scale(0.62)" fill={HEX.activeBlue} />
      </g>
      {/* the slider: a sunset stand-in with light trails and pylon line art (the photograph is not reproduced) */}
      <clipPath id={`${idp}-slide`}>
        <rect x="747" y="84" width="664" height="526" />
      </clipPath>
      <g clipPath={`url(#${idp}-slide)`}>
        <rect x="747" y="84" width="664" height="526" fill={`url(#${idp}-sunset)`} />
        <g transform="translate(747 84)">
          <TrailsG w={664} h={526} count={8} y0={0.12} y1={0.52} sag={0.06} />
          <IconArtG name="pylon" x={80} y={140} size={300} fill={mixHex(HEX.stage, HEX.darkBlue, 0.5)} />
          <IconArtG name="pylon" x={360} y={230} size={190} fill={mixHex(HEX.stage, HEX.darkBlue, 0.5)} />
          <IconArtG name="pylon" x={520} y={270} size={150} fill={mixHex(HEX.stage, HEX.darkBlue, 0.5)} />
        </g>
        <rect x="747" y="560" width="664" height="50" fill={BEZEL} opacity="0.5" />
      </g>
      {[0, 1, 2, 3].map((i) => {
        const x0 = 776 + i * 8 + (i > active ? 22 : 0);
        return i === active ? <rect key={i} x={x0} y="576" width="26" height="4" rx="2" fill={HEX.activeBlue} /> : <circle key={i} cx={x0 + 2} cy="578" r="2" fill={HEX.white} />;
      })}
      <circle cx="1370" cy="578" r="10" fill={HEX.white} />
      <rect x="1366.5" y="573.5" width="2" height="9" fill={HEX.darkBlue} />
      <rect x="1371.5" y="573.5" width="2" height="9" fill={HEX.darkBlue} />
      {/* technology tiles */}
      <rect x="1065" y="638" width="375" height="86" fill={HEX.statCell} />
      <rect x="0" y="638" width="1440" height="1" fill={HEX.darkBlue} opacity="0.45" />
      <rect x="0" y="724" width="1440" height="1" fill={HEX.darkBlue} opacity="0.45" />
      {tiles.slice(1, -1).map((tx) => (
        <g key={tx}>
          <rect x={tx} y="638" width="1" height="86" fill={HEX.darkBlue} opacity="0.45" />
          <rect x={tx - 3.5} y="634.5" width="7" height="7" fill={HEX.darkBlue} />
          <rect x={tx - 3.5} y="720.5" width="7" height="7" fill={HEX.darkBlue} />
        </g>
      ))}
      {TECH.map((t, i) => (
        <g key={t.key} lang="es">
          <g transform={`translate(${tiles[i] + 118} 652) scale(1.8)`}>
            <path d={PIXEL32[t.icon]} fill={HEX.darkBlue} />
          </g>
          <text x={tiles[i] + 202} y="676" fontSize="14" fill={HEX.blueInk}>{t.label}</text>
          <text x={tiles[i] + 202} y="694" fontSize="14" fill={HEX.blueInk}>{t.value}</text>
        </g>
      ))}
      {/* the full-width photograph below, as a flat Dark Blue block (m10 convention) */}
      <PhotoBlockG x={29} y={753} w={1382} h={147} />
    </g>
  );
}

// A watch screen in the same language: the total and the year (184 x 224).
export function ScreenWatchG() {
  return (
    <g>
      <rect width="184" height="224" fill={HEX.darkBlue} />
      <MarkG x={74} y={22} size={36} fill={HEX.activeBlue} />
      <text x="92" y="98" fontSize="10" fill={HEX.lightBlue} textAnchor="middle" lang="es">{CAPACITY.totalLabel}</text>
      <text x="92" y="132" fontSize="27" fill={HEX.activeBlue} textAnchor="middle" letterSpacing="-0.6" className="display">15.420</text>
      <text x="92" y="150" fontSize="11" fill={HEX.lightBlue} textAnchor="middle">MW</text>
      <rect x="66" y="172" width="52" height="18" rx="9" fill={HEX.activeBlue} />
      <text x="92" y="184.5" fontSize="10" fill={HEX.darkBlue} textAnchor="middle">{CAPACITY.year}</text>
    </g>
  );
}
