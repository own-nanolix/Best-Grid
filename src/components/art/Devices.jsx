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
import { r2, jagged, bands, scale, linePath, areaPath } from '@/lib/charts';
import { HEX, CAPACITY, TECH, WEB_HERO, NAV, NAV_CTA, BUTTONS } from '@/lib/brand';
import { MarkG } from './Mark';
import { NodeGridG, BrandDefs, TrailsG, IconArtG, PhotoBlockG } from './KeyArt';
import { PIXEL32, CORE } from '@/components/site/icons';

export const SCREEN = { phone: [390, 844], tablet: [1180, 820], laptop: [1440, 900], monitor: [1600, 1000], window: [1440, 900], watch: [184, 224] };
const METAL = '#2a2f4d';
const BEZEL = '#0b0d18';

export function PhoneG({ idp, x = 0, y = 0, w = 300, children, screenFill = '#dcdfe6', ...rest }) {
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
      <circle cx="215" cy="46" r="3.5" fill="#1d2140" />
      <path d="M66 6h298a60 60 0 0 1 60 60v80" fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="2" />
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
      <circle cx="630" cy="20" r="5" fill="#1d2140" />
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
      <path d="M0 960h1840v8H0z" fill="#ffffff" opacity="0.18" />
      <path d="M800 960h240v10a10 10 0 0 1-10 10H810a10 10 0 0 1-10-10z" fill="#000000" opacity="0.35" />
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
          <path d="M760 1040h120v50H760z" fill="#000000" opacity="0.35" />
          <path d="M560 1270h520v18H560z" fill={METAL} />
          <path d="M560 1288h520v12H560z" fill="#14172b" />
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
      <rect width="1440" height="56" fill="#d9dce4" />
      <path d="M24 56V14a6 6 0 0 1 6-6h300a6 6 0 0 1 6 6v42z" fill="#f4f5f8" />
      <MarkG x={40} y={22} size={16} fill={HEX.darkBlue} />
      {tab && <text x="66" y="35" fontSize="13" fill={HEX.darkBlue}>{tab}</text>}
      <rect x="352" y="16" width="1064" height="26" rx="13" fill="#f4f5f8" />
      {address && <text x="374" y="33.5" fontSize="12" fill={HEX.muted}>{address}</text>}
      <rect x="0" y="55.5" width="1440" height="1" fill="#c3c7d2" />
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
// Screens

// A neutral status bar: "9:41" and three plain status glyphs (bars, a fan of arcs, a battery).
export function StatusBarG({ w = 390, fill = HEX.darkBlue }) {
  return (
    <g fill={fill}>
      <text x="34" y="35" fontSize="17" fontWeight="500">{CAPACITY.status}</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={w - 108 + i * 6} y={r2(30 - i * 3)} width="4" height={r2(5 + i * 3)} />
      ))}
      <path d={`M${w - 76} 27a10 10 0 0 1 16 0l-2 2a7 7 0 0 0-12 0Z M${w - 72} 30.5a5 5 0 0 1 8 0l-4 4Z`} />
      <rect x={w - 52} y="22" width="22" height="11" rx="2.5" />
    </g>
  );
}

// m17 front phone. year: '2025' shows the published figures; any other year shows the quiet empty state
// (2023 and 2024 have no figures). marker: index of the quarter with the vertical marker (default the Q3 peak).
export function ScreenCapacityG({ idp, year = CAPACITY.year, marker = 2 }) {
  const has = year === CAPACITY.year;
  const X0 = 36, X1 = 353, Yt = 153, Yb = 312;
  const xs = [57, 155, 253, 352];
  const y = scale(0, CAPACITY.axisMax, Yb, Yt);
  const anchors = CAPACITY.quarters.map((q, i) => ({ x: xs[i], v: q.mw }));
  const pts = has ? jagged(anchors, 9, 0.05, 11).map(([px, v]) => [px, y(v)]) : [];
  const rows = CAPACITY.axis.map((label, i) => ({ label, y: r2(Yt + ((Yb - Yt) * i) / 7) }));
  const tm = { x: 36, y: 508, w: 317, h: 318 };
  return (
    <g>
      <rect width="390" height="844" fill="#dcdfe6" />
      <StatusBarG />
      <text x="36" y="84" fontSize="16" fill={HEX.darkBlue} lang="es">
        <tspan x="36">{CAPACITY.titleRows[0]}</tspan>
        <tspan x="36" dy="19.5">{CAPACITY.titleRows[1]}</tspan>
      </text>
      {/* chart: gridlines and labels */}
      {rows.map((r) => (
        <g key={r.label}>
          <rect x={X0} y={r.y} width={X1 - X0} height="0.5" fill="#1b2043" opacity="0.14" />
          <text x={X0} y={r2(r.y + 5.5)} fontSize="3.6" fill={HEX.muted}>{r.label}</text>
        </g>
      ))}
      {has ? (
        <g>
          <clipPath id={`${idp}-area`}>
            <path d={areaPath(pts, Yb)} />
          </clipPath>
          <g clipPath={`url(#${idp}-area)`}>
            {bands(xs[0], X1, 30, 0.42, 0.52).map((b) => (
              <rect key={b.x} x={b.x} y={Yt} width={b.w} height={Yb - Yt} fill={HEX.activeBlue} opacity={b.o} />
            ))}
          </g>
          <path d={linePath(pts)} fill="none" stroke={HEX.activeBlue} strokeWidth="0.8" opacity="0.7" />
          <rect x={r2(xs[marker] - 0.3)} y={r2(y(CAPACITY.quarters[marker].mw))} width="0.6" height={r2(Yb - y(CAPACITY.quarters[marker].mw))} fill={HEX.activeBlue} />
        </g>
      ) : (
        <text x={(X0 + X1) / 2} y={(Yt + Yb) / 2} fontSize="9" fill={HEX.muted} textAnchor="middle">No figures published for this year</text>
      )}
      <rect x={X0 - 2} y={Yb} width={X1 - X0 + 4} height="0.8" fill={HEX.darkBlue} />
      {CAPACITY.quarters.map((q, i) => (
        <g key={q.q}>
          <rect x={xs[i] - 1.6} y={Yb - 1.2} width="3.2" height="3.2" fill={HEX.darkBlue} />
          <text x={xs[i]} y={Yb + 9} fontSize="3.4" fill={HEX.darkBlue} textAnchor={i === 3 ? 'end' : 'middle'}>{q.q}</text>
          {has && <text x={i === 3 ? xs[i] : xs[i] - 2} y={Yb + 16} fontSize="5.6" fill={HEX.darkBlue} textAnchor={i === 3 ? 'end' : 'start'}>{q.value}</text>}
        </g>
      ))}
      {/* total */}
      <text x="36" y="349" fontSize="5.6" fill={HEX.darkBlue} lang="es">{CAPACITY.totalLabel}</text>
      {has ? (
        <g>
          <text x="34" y="384" fontSize="37" fill={HEX.activeBlue} letterSpacing="-1" className="display">{CAPACITY.totalValue}</text>
          <path d="M228 359l4 -6l4 6z" fill={HEX.activeBlue} />
        </g>
      ) : (
        <rect x="36" y="362" width="150" height="14" fill={HEX.darkBlue} opacity="0.1" />
      )}
      {/* year chips */}
      {CAPACITY.years.map((yy, i) => {
        const cx = [118, 195, 271][i];
        const on = yy === year;
        return (
          <g key={yy}>
            <rect x={cx - 24} y="408" width="48" height="16" rx="8" fill={on ? HEX.activeBlue : '#e8eaf0'} />
            <text x={cx} y="418.6" fontSize="5.6" fill={on ? HEX.white : HEX.darkBlue} textAnchor="middle">{yy}</text>
          </g>
        );
      })}
      {/* KPI cells */}
      <rect x="0" y="443" width="390" height="0.6" fill={HEX.darkBlue} opacity="0.5" />
      <rect x="0" y="482" width="390" height="0.6" fill={HEX.darkBlue} opacity="0.5" />
      {[36, 142, 247, 353].map((cx) => (
        <g key={cx}>
          <rect x={cx - 0.3} y="443" width="0.6" height="39" fill={HEX.darkBlue} opacity="0.5" />
          <rect x={cx - 1.6} y="441.4" width="3.2" height="3.2" fill={HEX.darkBlue} />
          <rect x={cx - 1.6} y="480.4" width="3.2" height="3.2" fill={HEX.darkBlue} />
        </g>
      ))}
      {CAPACITY.kpis.map((k, i) => (
        <g key={k.label} lang="es">
          <text x={[52, 157, 263][i]} y="456" fontSize="5" fill={HEX.darkBlue}>{k.label}</text>
          {has ? <text x={[51, 156, 262][i]} y="476" fontSize="18" fill={HEX.activeBlue}>{k.value}</text> : <rect x={[52, 157, 263][i]} y="465" width="30" height="9" fill={HEX.darkBlue} opacity="0.1" />}
        </g>
      ))}
      {/* treemap: Dark Blue field, Desarrollo 68% and Capacidad consolidada 16% (the remainder unlabelled) */}
      {has && (
        <g lang="es">
          <rect x={tm.x} y={tm.y} width={tm.w} height={tm.h} fill={HEX.darkBlue} />
          <text x={tm.x + 6} y={tm.y + 9} fontSize="4.6" fill={HEX.white}>{CAPACITY.treemap.year}</text>
          <text x={tm.x + 6} y={tm.y + 14.5} fontSize="4.6" fill={HEX.white}>{CAPACITY.treemap.title}</text>
          <rect x={tm.x} y="613" width="210" height="213" fill="#5282f5" />
          <text x={tm.x + 6} y="622" fontSize="4.6" fill={HEX.white}>{CAPACITY.treemap.parts[0].labelRows[0]}</text>
          <text x={tm.x + 6} y="627.5" fontSize="4.6" fill={HEX.white}>{CAPACITY.treemap.parts[0].labelRows[1]}</text>
          <text x="226" y="815" fontSize="78" fill="#e6e8ee" textAnchor="end" letterSpacing="-2" className="display">68</text>
          <text x="227" y="768" fontSize="30" fill="#e6e8ee">%</text>
          <rect x="246" y="721" width="107" height="105" fill="#7097f2" />
          <text x="252" y="730" fontSize="4.6" fill={HEX.white}>{CAPACITY.treemap.parts[1].labelRows[0]}</text>
          <text x="252" y="735.5" fontSize="4.6" fill={HEX.white}>{CAPACITY.treemap.parts[1].labelRows[1]}</text>
          <text x="334" y="815" fontSize="33" fill="#e6e8ee" textAnchor="end" letterSpacing="-0.8" className="display">16</text>
          <text x="335" y="796" fontSize="13" fill="#e6e8ee">%</text>
        </g>
      )}
    </g>
  );
}

// m17 back phone: the node grid. Drawing only, no data.
export function ScreenNodesG({ seed = 5, animate = false }) {
  return (
    <g>
      <rect width="390" height="844" fill="#dcdfe6" />
      <StatusBarG />
      <text x="36" y="84" fontSize="16" fill={HEX.darkBlue} lang="es">
        <tspan x="36">{CAPACITY.nodesTitleRows[0]}</tspan>
        <tspan x="36" dy="19.5">{CAPACITY.nodesTitleRows[1]}</tspan>
      </text>
      <NodeGridG x={35} y={128} cols={20} rows={42} size={16} seed={seed} clusters={34} animate={animate} />
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
        <rect x="187.5" y="496.5" width="112" height="28" fill="none" stroke="#ffffff" strokeWidth="1" />
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
          <IconArtG name="pylon" x={80} y={140} size={300} fill="#141833" />
          <IconArtG name="pylon" x={360} y={230} size={190} fill="#141833" />
          <IconArtG name="pylon" x={520} y={270} size={150} fill="#141833" />
        </g>
        <rect x="747" y="560" width="664" height="50" fill="#0b0d18" opacity="0.5" />
      </g>
      {[0, 1, 2, 3].map((i) => {
        const x0 = 776 + i * 8 + (i > active ? 22 : 0);
        return i === active ? <rect key={i} x={x0} y="576" width="26" height="4" rx="2" fill={HEX.activeBlue} /> : <circle key={i} cx={x0 + 2} cy="578" r="2" fill="#ffffff" />;
      })}
      <circle cx="1370" cy="578" r="10" fill="#ffffff" />
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
