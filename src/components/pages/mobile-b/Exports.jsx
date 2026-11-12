import Art from '@/components/art/Art';
import { IconArtG } from '@/components/art/KeyArt';
import { HEX, TECH, CAPACITY } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './mobile-b.module.css';
const SC = HEX.cardGrey;
const INK = HEX.darkBlue;
const AB = HEX.activeBlue;
const HEAD = [18, 30, 70, 9, INK, 0.9];
const WIRES = {
  10: [HEAD, [18, 70, 22, 22, INK, 1], [18, 118, 114, 22, HEX.paper, 1], [18, 150, 114, 22, HEX.paper, 1], [18, 190, 114, 26, AB, 1]],
  11: [HEAD, [18, 62, 90, 24, AB, 1], [18, 100, 70, 8, INK, 0.3], [0, 170, 150, 155, HEX.paper, 1], [64, 178, 22, 3, INK, 0.4], ...[0, 1, 2, 3].map((i) => [16, 196 + i * 28, 118, 18, INK, i === 1 ? 0.3 : 0.12])],
  12: [HEAD, ...[0, 1, 2, 3].map((i) => [16, 66 + i * 46, 118, 34, INK, 0.1]), ...[0, 1, 2, 3].map((i) => [104, 76 + i * 46, 24, 12, AB, i < 2 ? 1 : 0.3]), [0, 285, 150, 40, HEX.paper, 1], [8, 285, 34, 3, AB, 1]],
  13: [HEAD, ...[0, 1, 2, 3, 4].map((i) => [18 + i * 23, 62, 20, 5, i < 2 ? AB : INK, i < 2 ? 1 : 0.25]), ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => [18, 96 + i * 17, i % 4 === 3 ? 60 : 114, 7, INK, 0.5])],
  14: [HEAD, ...[0, 1, 2, 3].map((i) => [16, 62 + i * 36 + (i > 0 ? 44 : 0), 118, 1, INK, 0.5]), [18, 70, 90, 8, INK, 0.7], [18, 92, 110, 6, INK, 0.3], [18, 104, 80, 6, INK, 0.3], [18, 120, 90, 8, INK, 0.7], [18, 158, 90, 8, INK, 0.7], [18, 194, 90, 8, INK, 0.7]],
  15: [HEAD, [18, 62, 40, 14, HEX.chipOff ?? '#e9ecf2', 1], [64, 62, 40, 14, AB, 1], ...[0, 1, 2].map((i) => [16, 100 + i * 44, 118, 34, INK, 0.1]), ...[0, 1, 2].map((i) => [104, 110 + i * 44, 24, 12, AB, i === 1 ? 0.3 : 1])],
  16: [HEAD, [18, 66, 30, 40, INK, 1], [56, 74, 70, 8, INK, 0.7], [56, 90, 40, 6, INK, 0.3], ...[0, 1, 2, 3].map((i) => [18, 124 + i * 26, 100 - i * 8, 7, INK, 0.2]), [18, 240, 114, 26, AB, 1]],
  17: [HEAD, ...[0, 1, 2, 3, 4].map((i) => [18, 66 + i * 44, 80, 8, INK, 0.4]), ...[0, 1, 2, 3, 4].map((i) => [18, 80 + i * 44, 60 + (i % 2) * 20, 8, INK, 0.8]), ...[0, 1, 2, 3, 4].map((i) => [110, 70 + i * 44, 20, 20, INK, 0.15])],
  18: [HEAD, [18, 62, 40, 14, AB, 1], [64, 62, 40, 14, HEX.periwinkle, 1], [28, 92, 94, 132, SC, 1], [57, 92, 1, 132, INK, 0.8], [66, 104, 46, 7, INK, 0.8], [66, 118, 40, 5, INK, 0.4], [34, 160, 20, 24, HEX.periwinkle, 1], [34, 206, 84, 8, AB, 1]],
};
function Wire({ n, x, y, i }) {
  return (
    <g transform={`translate(${x} ${y})`} className="fade-in" style={{ '--i': i }}>
      <rect width="150" height="325" fill={SC} />
      {WIRES[n].map((r, k) => (
        <rect key={k} x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill={r[4]} opacity={r[5]} />
      ))}
    </g>
  );
}
function ScreensMap() {
  return (
    <Art viewBox="0 0 540 1070" title="Screens 10 to 18, nine layouts" exportName="mobile-b-screens-map">
      <rect width="540" height="1070" fill={INK} />
      {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((n, i) => (
        <Wire key={n} n={n} x={21 + (i % 3) * 174} y={21 + Math.floor(i / 3) * 349} i={i} />
      ))}
    </Art>
  );
}
function StatusBarArt() {
  return (
    <Art viewBox="0 0 390 56" title="Status bar, neutral shapes" exportName="mobile-b-status-bar">
      <rect width="390" height="56" fill={SC} />
      <g fill={INK}>
        {[0, 1, 2, 3].map((i) => <rect key={i} x={282 + i * 6} y={r2(32 - i * 3)} width="4" height={4 + i * 3} />)}
        <rect x="318" y="21" width="24" height="12" fill="none" stroke={INK} strokeWidth="1.5" />
        <rect x="321" y="24" width="14" height="6" />
        <rect x="343" y="25" width="3" height="4" />
      </g>
    </Art>
  );
}
const TAB_NAMES = ['Reader', 'Notifications', 'Documents', 'Profile'];
const TAB_ICONS = ['document', 'alert', 'folder', 'user'];
function TabBarArt() {
  return (
    <Art viewBox="0 0 390 84" title="Tab bar, four items" exportName="mobile-b-tab-bar">
      <rect width="390" height="84" fill={HEX.paper} />
      <rect width="390" height="1" fill={INK} opacity="0.3" />
      <rect x="121.75" y="0" width="48" height="3" fill={AB} />
      {TAB_NAMES.map((n, i) => (
        <g key={n} className="fade-in" style={{ '--i': i }}>
          <IconArtG name={TAB_ICONS[i]} x={r2(i * 97.5 + 36.75)} y="16" size="24" fill={i === 1 ? INK : HEX.muted} />
          <text x={r2(i * 97.5 + 48.75)} y="58" fontSize="11" textAnchor="middle" fill={i === 1 ? INK : HEX.muted}>{n}</text>
        </g>
      ))}
    </Art>
  );
}
function SheetArt() {
  return (
    <Art viewBox="0 0 390 330" title="Bottom sheet with drag handle" exportName="mobile-b-sheet">
      <rect width="390" height="330" fill={SC} />
      <rect width="390" height="330" fill={INK} opacity="0.55" />
      <rect y="40" width="390" height="290" fill={HEX.paper} />
      <rect y="40" width="390" height="1" fill={INK} />
      <rect x="173" y="52" width="44" height="4" fill={INK} opacity="0.4" />
      {TECH.map((t, i) => (
        <g key={t.key} className="fade-in" style={{ '--i': i }} lang="es">
          <rect x="28" y={r2(74 + i * 56)} width="334" height="1" fill={INK} opacity="0.2" />
          <text x="28" y={r2(106 + i * 56)} fontSize="16" fill={INK}>{t.label}</text>
          <text x="330" y={r2(106 + i * 56)} fontSize="13" textAnchor="end" fill={INK}>{t.value}</text>
          <rect x="344" y={r2(92 + i * 56)} width="16" height="16" fill="none" stroke={INK} />
          {i === 0 && <rect x="348" y="96" width="8" height="8" fill={AB} />}
        </g>
      ))}
    </Art>
  );
}
function Sw({ x, on }) {
  return (
  <g transform={`translate(${x} 40)`}>
    <rect width="44" height="22" fill={on ? AB : 'none'} stroke={on ? AB : INK} />
    <rect x={on ? 27 : 5} y="5" width="12" height="12" fill={INK} />
  </g>
  );
}
function ToggleArt() {
  return (
    <Art viewBox="0 0 240 100" title="Toggle, off and on" exportName="mobile-b-toggle-states">
      <rect width="240" height="100" fill={SC} />
      <Sw x={40} on={false} />
      <Sw x={156} on />
      <text x="62" y="84" fontSize="12" textAnchor="middle" fill={INK}>Off</text>
      <text x="178" y="84" fontSize="12" textAnchor="middle" fill={INK}>On</text>
    </Art>
  );
}
function StatCardArt() {
  const k = CAPACITY.kpis[0];
  return (
    <Art viewBox="0 0 260 150" title="Stat card, projects managed" exportName="mobile-b-stat-card" lang="es">
      <rect width="260" height="150" fill={SC} />
      <rect x="20.5" y="20.5" width="219" height="109" fill={HEX.paper} stroke={INK} />
      {[[20, 20], [240, 20], [20, 130], [240, 130]].map(([x, y]) => <rect key={`${x}${y}`} x={x - 3} y={y - 3} width="6" height="6" fill={INK} />)}
      <text x="38" y="52" fontSize="13" fill={INK}>{k.label}</text>
      <text x="36" y="110" fontSize="64" fill={HEX.blueInk} letterSpacing="-2" className="display">{k.value}</text>
    </Art>
  );
}
function ReaderArt() {
  return (
    <Art viewBox="0 0 320 150" title="Reader progress row" exportName="mobile-b-reader-progress">
      <rect width="320" height="150" fill={SC} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} className="fade-in" style={{ '--i': i }} x={r2(24 + i * 54)} y="28" width="48" height="8" fill={i < 2 ? AB : INK} fillOpacity={i < 2 ? 1 : 0.25} />
      ))}
      <text x="24" y="62" fontSize="13" fill={INK}>2 / 5</text>
      {[0, 1, 2, 3].map((i) => <rect key={i} x="24" y={82 + i * 15} width={i === 3 ? 120 : 272} height="7" fill={INK} opacity="0.45" />)}
    </Art>
  );
}
const LIST = [
  ['Screens 10 to 18', ScreensMap],
  ['Status bar', StatusBarArt],
  ['Tab bar', TabBarArt],
  ['Sheet', SheetArt],
  ['Toggle', ToggleArt],
  ['Stat card', StatCardArt],
  ['Reader progress', ReaderArt],
];
export default function Exports() {
  return (
    <section className="field-periwinkle band" aria-labelledby="mobile-b-exports-h">
      <div className="wrap">
        <h2 id="mobile-b-exports-h" className="t-h2" style={{ marginBottom: 12 }}>Standalone graphics.</h2>
        <p className="t-body muted" style={{ marginBottom: 28, maxWidth: '52ch' }}>
          Each of these exports as its own SVG, as does the neutral phone frame above.
        </p>
        <div className={s.exports}>
          {LIST.map(([name, C]) => (
            <figure key={name} className={s.exp} style={{ margin: 0 }}>
              <C />
              <figcaption className={s.expCap}>{name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
