// The nine screens of this page: number, plain English name, the printed words or figures each one uses (shown with
// lang="es"), and the artwork component. Shared by the live phone, the row of nine and the exportable artwork.
import { CapacityScreen, NodesScreen, TechScreen, TechDetailScreen, YearEmptyScreen } from './ScreensOne';
import { NodeListScreen, ReportScreen, BrandScreen, QuartersScreen } from './ScreensTwo';

export const SCREENS = [
  { name: 'Capacity', uses: 'Total anual · 15.420 MW', Draw: CapacityScreen },
  { name: 'Node grid', uses: 'Distribución de actividad en nudos de red', Draw: NodesScreen },
  { name: 'Technology tiles', uses: 'Fotovoltaico · Eólico · Almacenamiento · Data Centers', Draw: TechScreen },
  { name: 'Technology detail', uses: 'Fotovoltaico · 12.157 MW', Draw: TechDetailScreen },
  { name: 'Year without figures', uses: '2023 · 2024 · 2025', Draw: YearEmptyScreen },
  { name: 'Node list', uses: 'Nudos analizados · 46', Draw: NodeListScreen },
  { name: 'Report cover', uses: 'Annual report', Draw: ReportScreen },
  { name: 'Brand and palette', uses: 'HEX #1b2043 · #5983ff · #e4e7ef', Draw: BrandScreen },
  { name: 'Quarters', uses: 'Q1 3.200 · Q2 4.100 · Q3 5.200 · Q4 2.920 MW', Draw: QuartersScreen },
].map((s, i) => ({ ...s, n: String(i + 1).padStart(2, '0') }));

// One screen as a plain 390 x 844 SVG inside an HTML artboard (never exported itself). idp keeps ids unique.
export function ScreenSvg({ i, idp, label, animate = false }) {
  const { Draw } = SCREENS[i];
  return (
    <svg viewBox="0 0 390 844" width="390" height="844" {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}>
      <Draw idp={idp} animate={animate} />
    </svg>
  );
}
