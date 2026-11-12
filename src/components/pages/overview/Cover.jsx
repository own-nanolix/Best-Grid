// The opening of the overview, as the hero photograph of the case study (m01): the fog field full-bleed, two
// horizontal guides at 45.6% and 54.3% of the height and two vertical guides at 4.3% and 97.5% of the width, small
// square nodes where they cross, the hero line left between the guides and the mark right.
// The photograph itself is not reproduced: the fog field stands in for it.
// Entrance (CSS keyframes inside the SVG, landing on the artwork): the guides extend, the nodes snap in, the mark's
// outline draws on and fills, then the two rows of the line slide up.
import Art from '@/components/art/Art';
import { BrandDefs, FogFieldG, GuidesG, IconArtG, MARK_OUTLINE_D } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './overview.module.css';

const W = 1600;
const H = 900;
const GUIDE = { xs: [r2(W * 0.043), r2(W * 0.975)], ys: [r2(H * 0.456), r2(H * 0.543)] };
const BAND_Y = GUIDE.ys[0];
const BAND_H = r2(GUIDE.ys[1] - GUIDE.ys[0]);

export default function Cover() {
  const idp = 'overview-cover';
  const markSize = 58;
  const markX = r2(W * 0.89 - markSize / 2);
  const markY = r2((GUIDE.ys[0] + GUIDE.ys[1]) / 2 - markSize / 2);
  return (
    <div className={s.cover}>
      <Art viewBox={`0 0 ${W} ${H}`} title="Cover: the hero line between two guides over the fog field" exportName="overview-cover">
        <BrandDefs idp={idp} />
        <FogFieldG idp={idp} w={W} h={H} />
        {/* a quiet pixel turbine in line art stands where the photograph's turbine stood */}
        <g fillOpacity="0.1">
          <g className="fade-in" style={{ '--i': 14 }}>
            <IconArtG name="wind" px size={560} x={r2(W * 0.38)} y={r2(H * 0.06)} fill={HEX.plum} />
          </g>
        </g>
        {/* the band between the two horizontal guides: a soft tint so the line reads on the fog */}
        <rect x={0} y={BAND_Y} width={W} height={BAND_H} fill={HEX.plum} fillOpacity="0.46" className="fade-in" style={{ '--i': 8 }} />
        <GuidesG w={W} h={H} xs={GUIDE.xs} ys={GUIDE.ys} stroke="#ffffff" weight={1.2} node={8} animate opacity="0.9" />
        <g fill="#ffffff" className="display" lang="es">
          <g className="slide-up" style={{ '--i': 16 }}>
            <text x={151} y={BAND_Y + 31} fontSize="25">{LINES.hero.rows[0]}</text>
          </g>
          <g className="slide-up" style={{ '--i': 19 }}>
            <text x={151} y={BAND_Y + 60} fontSize="25">{LINES.hero.rows[1]}</text>
          </g>
        </g>
        {/* the mark: outline drawn first, then the lattice fills in */}
        <g transform={`translate(${markX} ${markY}) scale(${r2(markSize / 100)})`}>
          <path d={MARK_OUTLINE_D} fill="none" stroke="#ffffff" strokeWidth="1.6" pathLength="1" className="lattice-line" style={{ '--len': 1 }} />
        </g>
        <MarkG x={markX} y={markY} size={markSize} fill="#ffffff" pathClass="lattice-fill" />
      </Art>
      <p className={s.coverLine} lang="es">
        {LINES.hero.rows.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </p>
      <p className={s.coverNote}>
        <span className={s.coverDot} aria-hidden="true" />
        Brand overview
      </p>
    </div>
  );
}
