// The two drawings of the explorer page that do not react to a selection: the technology tiles of the website
// (m16, a faithful rebuild) and the diagram of how the explorer's parts connect (an extension).
import Art from '@/components/art/Art';
import { PIXEL32 } from '@/components/site/icons';
import { HEX, TECH } from '@/lib/brand';

const SVG = { display: 'block', width: '100%', height: 'auto' };

// The stats row of m16: four ruled cells, a pixel icon, the label and the printed capacity. The Data Centers cell
// is filled (the highlighted one). Nodes sit on the rules where the cells meet.
const TILE_X = [0, 374, 720, 1065, 1440];

export function TilesSheet() {
  return (
    <Art viewBox="0 0 1440 150" title="Technology tiles: fotovoltaico, eólico, almacenamiento, data centers" exportName="feature-tiles" style={SVG}>
      <rect width="1440" height="150" fill={HEX.lightBlue} />
      <rect x="1065" y="32" width="375" height="86" fill={HEX.statCell} className="fill-in" style={{ '--i': 6 }} />
      <rect x="0" y="32" width="1440" height="1" fill={HEX.darkBlue} opacity="0.5" className="extend-x" />
      <rect x="0" y="118" width="1440" height="1" fill={HEX.darkBlue} opacity="0.5" className="extend-x" style={{ '--i': 1 }} />
      {TILE_X.slice(1, -1).map((tx, i) => (
        <g key={tx}>
          <rect x={tx} y="32" width="1" height="86" fill={HEX.darkBlue} opacity="0.5" className="extend-y" style={{ '--i': i + 2 }} />
          <rect x={tx - 3.5} y="28.5" width="7" height="7" fill={HEX.darkBlue} className="snap" style={{ '--i': i + 2 }} />
          <rect x={tx - 3.5} y="114.5" width="7" height="7" fill={HEX.darkBlue} className="snap" style={{ '--i': i + 3 }} />
        </g>
      ))}
      {TECH.map((t, i) => (
        <g key={t.key} lang="es" className="fill-in" style={{ '--i': i + 3 }}>
          <g transform={`translate(${TILE_X[i] + 118} 46) scale(1.8)`}>
            <path d={PIXEL32[t.icon]} fill={HEX.darkBlue} />
          </g>
          <text x={TILE_X[i] + 202} y="70" fontSize="14" fill={HEX.blueInk}>{t.label}</text>
          <text x={TILE_X[i] + 202} y="88" fontSize="14" fill={HEX.blueInk}>{t.value}</text>
        </g>
      ))}
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// How the explorer's parts connect: five inputs write one selection; five outputs read it; the guided tour writes
// the same selection a visitor does. Plain English names; drawn on the guide system (hairlines and square nodes).
const INPUTS = ['Year chips', 'Quarter buttons', 'Technology tiles', 'Treemap parts', 'Node cells'];
const OUTPUTS = [
  { name: 'Quarter chart', reads: 'reads year, quarter' },
  { name: 'Total and KPI cells', reads: 'reads year' },
  { name: 'Treemap', reads: 'reads year, part' },
  { name: 'Tile bars', reads: 'reads technology' },
  { name: 'Readout and node grid', reads: 'reads all five' },
];
const FIELDS = ['Year', 'Quarter', 'Technology', 'Part', 'Node cell'];
const ROW = (i) => 40 + i * 90;

function Box({ x, y, w, h, label, sub, i = 0, fill = 'none', ink = HEX.darkBlue, subInk = HEX.muted }) {
  return (
    <g className="fill-in" style={{ '--i': i }}>
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} fill={fill} stroke={ink} strokeWidth="1" />
      {[[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([px, py]) => (
        <rect key={`${px}-${py}`} x={px - 3} y={py - 3} width="6" height="6" fill={ink} />
      ))}
      <text x={x + 18} y={y + (sub ? h / 2 - 2 : h / 2 + 5)} fontSize="17" fill={ink}>{label}</text>
      {sub && <text x={x + 18} y={y + h / 2 + 18} fontSize="13" fill={subInk}>{sub}</text>}
    </g>
  );
}

export function DiagramSvg() {
  return (
    <Art viewBox="0 0 1200 600" title="How the explorer's parts connect: inputs write one selection, outputs read it, the tour drives the same selection" exportName="feature-diagram" style={SVG}>
      <rect width="1200" height="600" fill={HEX.paper} />
      <text x="40" y="26" fontSize="13" fill={HEX.blueInk}>Inputs</text>
      <text x="480" y="26" fontSize="13" fill={HEX.blueInk}>One selection</text>
      <text x="940" y="26" fontSize="13" fill={HEX.blueInk}>Outputs</text>
      {INPUTS.map((name, i) => (
        <g key={name}>
          <Box x={40} y={ROW(i)} w={220} h={60} label={name} i={i} />
          <path d={`M260 ${ROW(i) + 30}H480`} stroke={HEX.darkBlue} strokeWidth="1" fill="none" className="draw" style={{ '--len': 220, '--i': i + 4 }} />
          <rect x="257" y={ROW(i) + 27} width="6" height="6" fill={HEX.activeBlue} className="snap" style={{ '--i': i + 6 }} />
        </g>
      ))}
      <g className="fill-in" style={{ '--i': 3 }}>
        <rect x="480.5" y="40.5" width="239" height="419" fill={HEX.darkBlue} />
        {FIELDS.map((f, i) => (
          <g key={f}>
            <rect x="480" y={ROW(i) + 30} width="240" height="1" fill={HEX.activeBlue} opacity="0.6" />
            <text x="500" y={ROW(i) + 24} fontSize="17" fill={HEX.lightBlue}>{f}</text>
            <text x="500" y={ROW(i) + 50} fontSize="13" fill={HEX.mutedOnDark}>{i === 0 ? 'only 2025 holds data' : i === 4 ? 'a position, never a value' : 'as printed'}</text>
          </g>
        ))}
      </g>
      {OUTPUTS.map((o, i) => (
        <g key={o.name}>
          <path d={`M720 ${ROW(i) + 30}H940`} stroke={HEX.darkBlue} strokeWidth="1" fill="none" className="draw" style={{ '--len': 220, '--i': i + 9 }} />
          <rect x="937" y={ROW(i) + 27} width="6" height="6" fill={HEX.activeBlue} className="snap" style={{ '--i': i + 11 }} />
          <Box x={940} y={ROW(i)} w={220} h={60} label={o.name} sub={o.reads} i={i + 5} />
        </g>
      ))}
      <Box x={40} y={510} w={1120} h={56} label="Guided tour: writes the same selection, one printed line at a time, and lands on the finished view" i={10} fill={HEX.darkBlue} ink={HEX.lightBlue} />
      <path d="M600 510V459" stroke={HEX.darkBlue} strokeWidth="1" fill="none" className="draw" style={{ '--len': 51, '--i': 14 }} />
      <rect x="597" y="456" width="6" height="6" fill={HEX.activeBlue} className="snap" style={{ '--i': 16 }} />
    </Art>
  );
}
