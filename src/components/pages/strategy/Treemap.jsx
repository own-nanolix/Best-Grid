// The treemap of the phone dashboard (m17), rebuilt with the proportions measured on the reference (m17_2: the
// treemap is 676 x 679 px; here 600 x 600): a Dark Blue field headed "2025" / "Capacidad gestionada", an Active Blue
// block lower left (66.1% x 67.2%) "Desarrollo durante el año" with 68%, a lighter Active Blue block lower right
// (33.9% x 33.3%) "Capacidad consolidada" with 16%. Numerals, percent signs and labels are placed where the reference
// prints them (scaled by 600 / 676). The Dark Blue remainder has no label and no figure in the case study, and none
// is drawn. The small labels on the blue blocks are Dark Blue (printed light grey-white) so they reach 4.5:1.
// Entrance: the field fades in, the blocks rise from the baseline, the numerals fade in.
import Art from '@/components/art/Art';
import { CAPACITY, HEX } from '@/lib/brand';

const S = 600;
const BIG = { x: 0, y: 197, w: 397, h: 403 };
const SMALL = { x: 397, y: 400, w: 203, h: 200 };
const LABEL = 11;
const [dev, cons] = CAPACITY.treemap.parts;

export default function Treemap() {
  return (
    <Art viewBox={`0 0 ${S} ${S}`} title="Treemap 2025, Capacidad gestionada: Desarrollo durante el año 68%, Capacidad consolidada 16%" exportName="strategy-treemap">
      <rect width={S} height={S} fill={HEX.darkBlue} className="fade-in" />
      <g fill={HEX.onBlue} fontSize={LABEL} lang="es" className="fade-in" style={{ '--i': 6 }}>
        <text x={13} y={20}>{CAPACITY.treemap.year}</text>
        <text x={13} y={32}>{CAPACITY.treemap.title}</text>
      </g>
      <g className="rise" style={{ '--i': 4 }}>
        <rect x={BIG.x} y={BIG.y} width={BIG.w} height={BIG.h} fill={HEX.activeBlue} />
      </g>
      {/* the lighter Active Blue: Active Blue at 82% over white */}
      <g className="rise" style={{ '--i': 8 }}>
        <rect x={SMALL.x} y={SMALL.y} width={SMALL.w} height={SMALL.h} fill={HEX.white} />
        <rect x={SMALL.x} y={SMALL.y} width={SMALL.w} height={SMALL.h} fill={HEX.activeBlue} fillOpacity="0.82" />
      </g>
      <g fill={HEX.darkBlue} fontSize={LABEL} lang="es" className="fade-in" style={{ '--i': 16 }}>
        {dev.labelRows.map((r, i) => (
          <text key={r} x={BIG.x + 13} y={BIG.y + 20 + i * 12}>{r}</text>
        ))}
        {cons.labelRows.map((r, i) => (
          <text key={r} x={SMALL.x + 13} y={SMALL.y + 20 + i * 12}>{r}</text>
        ))}
      </g>
      <g fill={HEX.onBlue} lang="es" className="display fade-in" style={{ '--i': 20 }}>
        <text x={316} y={580} fontSize="131" textAnchor="end" letterSpacing="-3">{dev.pct}</text>
        <text x={371} y={528} fontSize="60" textAnchor="end">%</text>
        <text x={553} y={579} fontSize="63" textAnchor="end" letterSpacing="-1.5">{cons.pct}</text>
        <text x={586} y={561} fontSize="39" textAnchor="end">%</text>
      </g>
    </Art>
  );
}
