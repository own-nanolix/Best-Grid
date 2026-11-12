// A diagram of the whole site: one guide line per group of chapters, one square node per chapter, numbered as in the
// index below. Dark Blue ground, Active Blue guides. Entrance: the guides extend, the nodes snap in one after another,
// the numbers fade in. The first chapter (this one) is the filled node.
import Art from '@/components/art/Art';
import { groups, pages } from '@/lib/pages';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const W = 1600;
const ROW = 96;
const TOP = 78;
const X0 = 420;
const STEP = 124;
const H = TOP + ROW * groups.length + 20;

export default function ChapterMap() {
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Map of the 30 chapters in four groups, one node per chapter" exportName="overview-chapter-map">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      {/* the vertical guides at the live-area edges */}
      <rect x={40} y={0} width={1} height={H} fill={HEX.activeBlue} fillOpacity="0.5" className="extend-y" />
      <rect x={r2(W - 40)} y={0} width={1} height={H} fill={HEX.activeBlue} fillOpacity="0.5" className="extend-y" style={{ '--i': 2 }} />
      {groups.map((g, gi) => {
        const y = TOP + gi * ROW;
        return (
          <g key={g.name}>
            <rect x={0} y={y} width={W} height={1.2} fill={HEX.activeBlue} className="extend-x" style={{ '--i': gi * 3 }} />
            <text x={80} y={y - 14} fontSize="17" fill={HEX.lightBlue} className="fade-in" style={{ '--i': gi * 3 + 8 }}>
              {g.name}
            </text>
            <text x={80} y={y + 32} fontSize="14" fill={HEX.mutedOnDark} className="fade-in" style={{ '--i': gi * 3 + 9 }}>
              {g.pages.length} chapters
            </text>
            {g.pages.map((p, pi) => {
              const n = pages.findIndex((q) => q.id === p.id) + 1;
              const x = X0 + pi * STEP;
              const k = n - 1;
              const here = p.id === 'overview';
              return (
                <g key={p.id}>
                  <rect x={r2(x - (here ? 6 : 4))} y={r2(y - (here ? 6 : 4))} width={here ? 12 : 8} height={here ? 12 : 8} fill={here ? HEX.activeBlue : HEX.lightBlue} className="snap" style={{ '--i': k }} />
                  <text x={x} y={y + 34} fontSize="16" textAnchor="middle" fill={here ? HEX.activeBlue : HEX.lightBlue} className="fade-in" style={{ '--i': k + 6 }}>
                    {String(n).padStart(2, '0')}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </Art>
  );
}
