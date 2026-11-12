// Four examples of the icons in use, rebuilt in the brand's own components and with words and figures of the case
// study: the m16 technology tile, the tube-label services (m07), the m17 KPI cells and the contact lines (m05)
// with a crosshair button (m16). Each is its own exportable SVG.
import Art from '@/components/art/Art';
import { IconArtG, GuidesG, NodeG } from '@/components/art/KeyArt';
import { HEX, TECH, CONTACT, CAPACITY, BUTTONS, TUBE } from '@/lib/brand';
import s from './icons.module.css';

const W = 480, H = 400;
const dc = TECH.find((t) => t.highlight);
const SERVICES = TUBE.services.map((text, i) => ({ text, icon: ['plug', 'study', 'node'][i] }));
const KPI_ICONS = ['folder', 'node', 'check'];

// A. The m16 stats tile: pixel icon, label, value; the Data Centers cell is the highlighted one.
function Tile() {
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Technology tile: Data Centers, 2.083 MW, with its pixel icon" exportName="icons-use-tile">
      <rect width={W} height={H} fill={HEX.lightBlue} />
      <rect x="40" y="40" width="400" height="320" fill={HEX.statCell} className="fill-in" style={{ '--i': 6 }} />
      <GuidesG w={W} h={H} xs={[40, 440]} ys={[40, 360]} stroke={HEX.darkBlue} node={7} animate />
      <IconArtG name="datacenter" px x={56} y={52} size={160} fill={HEX.darkBlue} className="fade-in" style={{ '--i': 14 }} />
      <text x="64" y="292" fontSize="28" fill={HEX.darkBlue} lang="es">{dc.label}</text>
      <text x="64" y="340" fontSize="52" className="display" fill={HEX.darkBlue} lang="es">{dc.value}</text>
    </Art>
  );
}

// B. Three service lines of the project tube label (m07), each with its icon, on Dark Blue.
function Services() {
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Icon rows: the three services printed on the project tube label" exportName="icons-use-services">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <text x="40" y="56" fontSize="18" fill={HEX.mutedOnDark}>Project tube label</text>
      <GuidesG w={W} h={H} xs={[40]} ys={SERVICES.map((_, i) => 84 + i * 96)} nodes={SERVICES.map((_, i) => [40, 84 + i * 96])} stroke={HEX.activeBlue} node={7} animate />
      {SERVICES.map((r, i) => (
        <g key={r.text} className="fade-in" style={{ '--i': 8 + i * 4 }}>
          <IconArtG name={r.icon} x={64} y={96 + i * 96} size={56} fill={HEX.activeBlue} />
          <text x="148" y={136 + i * 96} fontSize="25" fill={HEX.lightBlue} lang="es">{r.text}</text>
        </g>
      ))}
      <text x="40" y="388" fontSize="18" fill={HEX.mutedOnDark} lang="es">{TUBE.project}</text>
    </Art>
  );
}

// C. The three KPI cells of the phone (m17), with an icon in each.
function Kpis() {
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="KPI cells with icons: Proyectos gestionados 128, Nudos analizados 46, Accesos concedidos 72" exportName="icons-use-kpis">
      <rect width={W} height={H} fill={HEX.paper} />
      <GuidesG w={W} h={H} xs={[0, W]} ys={[32, 142, 252, 362]} nodes={[[32, 32], [32, 142], [32, 252], [32, 362]]} stroke={HEX.darkBlue} node={7} animate />
      {CAPACITY.kpis.map((k, i) => (
        <g key={k.label} className="fade-in" style={{ '--i': 8 + i * 4 }}>
          <IconArtG name={KPI_ICONS[i]} x={56} y={52 + i * 110} size={44} fill={HEX.darkBlue} />
          <text x="112" y={92 + i * 110} fontSize="21" fill={HEX.darkBlue} lang="es">{k.label}</text>
          <text x="440" y={118 + i * 110} fontSize="66" className="display" fill={HEX.activeBlue} textAnchor="end" lang="es">{k.value}</text>
        </g>
      ))}
    </Art>
  );
}

// D. Contact lines with their icons, and the website button with the crosshair (m16), on Active Blue.
function Contacts() {
  const rows = [
    { icon: 'phone', text: CONTACT.phone },
    { icon: 'mail', text: CONTACT.email },
    { icon: 'pin', text: CONTACT.address[0] },
  ];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Contact lines with icons and a button with the crosshair" exportName="icons-use-contacts">
      <rect width={W} height={H} fill={HEX.activeBlue} />
      {rows.map((r, i) => (
        <g key={r.icon} className="fade-in" style={{ '--i': 4 + i * 4 }}>
          <IconArtG name={r.icon} x={40} y={46 + i * 76} size={44} fill={HEX.darkBlue} />
          <text x="104" y={78 + i * 76} fontSize="21" fill={HEX.darkBlue} lang="es">{r.text}</text>
          <rect x="40" y={104 + i * 76} width="400" height="1" fill={HEX.darkBlue} />
          <NodeG cx={40} cy={104.5 + i * 76} s={7} fill={HEX.darkBlue} />
        </g>
      ))}
      <g className="fade-in" style={{ '--i': 18 }}>
        <rect x="40" y="300" width="260" height="56" fill={HEX.btnFill} />
        <text x="62" y="334" fontSize="21" fill={HEX.darkBlue} lang="es">{BUTTONS.evaluate}</text>
        <IconArtG name="crosshair" x={246} y={314} size={32} fill={HEX.activeBlue} />
      </g>
    </Art>
  );
}

const EXAMPLES = [
  { id: 'tile', cap: 'Technology tile', note: 'The website stats row (m16): pixel icon, label, value.', Art: Tile },
  { id: 'services', cap: 'Icon rows', note: 'The services of the project tube label (m07).', Art: Services },
  { id: 'kpis', cap: 'KPI cells', note: 'The three ruled cells of the phone (m17).', Art: Kpis },
  { id: 'contacts', cap: 'Contacts and button', note: 'Address lines (m05) and the crosshair button (m16).', Art: Contacts },
];

export default function InUse() {
  return (
    <div className={s.useRow}>
      {EXAMPLES.map(({ id, cap, note, Art: Example }) => (
        <figure className={s.use} key={id}>
          <Example />
          <figcaption>
            <span className="t-label">{cap}</span>
            <span className="t-small muted">{note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
