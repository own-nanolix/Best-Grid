// The treemap of the phone dashboard (m17), rebuilt with the proportions measured on the reference: a Dark Blue field
// headed "2025" / "Capacidad gestionada", an Active Blue block lower left "Desarrollo durante el año" with 68%, a
// lighter Active Blue block lower right "Capacidad consolidada" with 16%. The Dark Blue remainder has no label and no
// figure in the case study, and none is drawn.
// Entrance: the field fades in, the blocks rise from the baseline, the numerals fade in.
import Art from '@/components/art/Art';
import { CAPACITY, HEX } from '@/lib/brand';

const S = 600;
const BIG = { x: 0, y: 197, w: 397, h: 403 };
const SMALL = { x: 397, y: 398, w: 203, h: 202 };
const [dev, cons] = CAPACITY.treemap.parts;

export default function Treemap() {
  return (
    <Art viewBox={`0 0 ${S} ${S}`} title="Treemap 2025, Capacidad gestionada: Desarrollo durante el año 68%, Capacidad consolidada 16%" exportName="strategy-treemap">
      <rect width={S} height={S} fill={HEX.darkBlue} className="fade-in" />
      <g fill={HEX.onBlue} fontSize="15" lang="es" className="fade-in" style={{ '--i': 6 }}>
        <text x={20} y={34}>{CAPACITY.treemap.year}</text>
        <text x={20} y={56}>{CAPACITY.treemap.title}</text>
      </g>
      <g className="rise" style={{ '--i': 4 }}>
        <rect x={BIG.x} y={BIG.y} width={BIG.w} height={BIG.h} fill={HEX.activeBlue} />
      </g>
      <g className="rise" style={{ '--i': 8 }}>
        <rect x={SMALL.x} y={SMALL.y} width={SMALL.w} height={SMALL.h} fill="#7c9cff" />
      </g>
      <g fill={HEX.darkBlue} fontSize="15" lang="es" className="fade-in" style={{ '--i': 16 }}>
        {dev.labelRows.map((r, i) => (
          <text key={r} x={20} y={BIG.y + 32 + i * 20}>{r}</text>
        ))}
        {cons.labelRows.map((r, i) => (
          <text key={r} x={SMALL.x + 20} y={SMALL.y + 32 + i * 20}>{r}</text>
        ))}
      </g>
      <g fill={HEX.onBlue} lang="es" className="display fade-in" style={{ '--i': 20 }}>
        <text x={BIG.x + BIG.w - 70} y={S - 24} fontSize="170" textAnchor="end" letterSpacing="-6">{dev.pct}</text>
        <text x={BIG.x + BIG.w - 24} y={S - 130} fontSize="64" textAnchor="end">%</text>
        <text x={S - 62} y={S - 22} fontSize="84" textAnchor="end" letterSpacing="-3">{cons.pct}</text>
        <text x={S - 20} y={S - 80} fontSize="34" textAnchor="end">%</text>
      </g>
    </Art>
  );
}
