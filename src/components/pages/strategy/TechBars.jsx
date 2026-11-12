// The four technology tiles of the website (m16) re-plotted as four bars: Fotovoltaico 12.157 MW, Eólico 2.794 MW,
// Almacenamiento 3.433 MW, Data Centers 2.083 MW. Each bar is scaled to its own figure; the figure is printed at the
// bar's end. The case study gives no total for the tiles, so none is drawn. The Data Centers row carries the
// highlighted cell of m16 (periwinkle). Pixel icons are the case study's four 32-grid icons, drawn as paths.
// Entrance: row hairlines extend, bars grow from the left, nodes snap, figures fade in.
import Art from '@/components/art/Art';
import { IconArtG } from '@/components/art/KeyArt';
import { HEX, TECH } from '@/lib/brand';
import { r2, scale } from '@/lib/charts';

const W = 860;
const ROW = 92;
const TOP = 24;
const H = TOP + ROW * TECH.length + 16;
const BAR_X = 330;
const BAR_MAX = 360;
const x = scale(0, Math.max(...TECH.map((t) => t.mw)), 0, BAR_MAX);

export default function TechBars() {
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Managed capacity per technology: Fotovoltaico 12.157, Eólico 2.794, Almacenamiento 3.433, Data Centers 2.083 MW" exportName="strategy-technology-bars">
      <rect width={W} height={H} fill={HEX.paper} />
      {TECH.map((t, i) => {
        const y = TOP + i * ROW;
        const w = r2(x(t.mw));
        return (
          <g key={t.key}>
            {t.highlight && <rect x={0} y={y} width={W} height={ROW} fill={HEX.statCell} className="fill-in" style={{ '--i': 14 }} />}
            <rect x={0} y={y - 0.5} width={W} height={1} fill={HEX.darkBlue} className="extend-x" style={{ '--i': i * 2 }} />
            <rect x={0} y={y - 3} width={6} height={6} fill={HEX.darkBlue} className="snap" style={{ '--i': i * 2 }} />
            <g>
              <IconArtG name={t.icon} px size={44} x={20} y={y + 24} fill={HEX.darkBlue} />
            </g>
            <text x={80} y={y + 56} fontSize="22" fill={HEX.darkBlue} lang="es" className="fade-in" style={{ '--i': 4 + i * 2 }}>
              {t.label}
            </text>
            <rect x={BAR_X} y={y + 30} width={w} height={32} fill={t.highlight ? HEX.darkBlue : HEX.activeBlue} className="grow-x" style={{ '--i': 6 + i * 3 }} />
            <text x={r2(BAR_X + w + 14)} y={y + 58} fontSize="26" fill={HEX.darkBlue} lang="es" className="display fade-in" style={{ '--i': 16 + i * 3 }}>
              {t.value}
            </text>
          </g>
        );
      })}
      <rect x={0} y={TOP + ROW * TECH.length - 0.5} width={W} height={1} fill={HEX.darkBlue} className="extend-x" style={{ '--i': 8 }} />
      <rect x={BAR_X - 0.5} y={TOP} width={1} height={ROW * TECH.length} fill={HEX.darkBlue} className="extend-y" style={{ '--i': 2 }} />
    </Art>
  );
}
