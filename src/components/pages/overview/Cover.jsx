// The opening of the overview, as the hero photograph of the case study (m01), on its own 4:3 sheet. Measured on
// m01 (2800 x 2100): horizontal guides at 45.7% and 54.3% of the height, vertical guides at 4.3% and 95.7% of the
// width, square nodes where they cross; the hero line left at 9.5% of the width (Regular, about 1.1% of the width,
// two rows 1.43 apart), the mark right, centred at 89.1% of the width between the guides, 2.9% of the width.
// The photograph itself is not reproduced: the fog field stands in for it, with the turbine as pixel line art.
// The soft band between the guides is ours: it lifts the small light type to a readable contrast.
// Entrance (CSS keyframes inside the SVG, landing on the artwork): the guides extend, the nodes snap in, the mark's
// outline draws on and fills, then the two rows of the line slide up.
import Art from '@/components/art/Art';
import { BrandDefs, FogFieldG, GuidesG, IconArtG, MARK_OUTLINE_D } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './overview.module.css';

const W = 1600;
const H = 1200;
const GUIDE = { xs: [r2(W * 0.0427), r2(W * 0.9566)], ys: [r2(H * 0.4569), r2(H * 0.5426)] };
const BAND_Y = GUIDE.ys[0];
const BAND_H = r2(GUIDE.ys[1] - GUIDE.ys[0]);
const TEXT = { x: r2(W * 0.0946), size: 18, base: [r2(H * 0.4948), r2(H * 0.5138)] };
const MARK_SIZE = r2(W * 0.0286);
const TURBINE = 560;

export default function Cover() {
  const idp = 'overview-cover';
  const markX = r2(W * 0.8914 - MARK_SIZE / 2);
  const markY = r2((GUIDE.ys[0] + GUIDE.ys[1]) / 2 - MARK_SIZE / 2);
  return (
    <div className={s.cover}>
      <Art viewBox={`0 0 ${W} ${H}`} title="Cover: the hero line between two guides over the fog field" exportName="overview-cover">
        <BrandDefs idp={idp} />
        <FogFieldG idp={idp} w={W} h={H} />
        {/* a quiet pixel turbine in line art stands where the photograph's turbine stood, its hub in the band */}
        <g fillOpacity="0.1">
          <g className="fade-in" style={{ '--i': 14 }}>
            <IconArtG name="wind" px size={TURBINE} x={r2(W * 0.52 - TURBINE / 2)} y={r2(H * 0.5 - TURBINE / 2)} fill={HEX.plum} />
          </g>
        </g>
        <rect x={0} y={BAND_Y} width={W} height={BAND_H} fill={HEX.plum} fillOpacity="0.74" className="fade-in" style={{ '--i': 8 }} />
        <GuidesG w={W} h={H} xs={GUIDE.xs} ys={GUIDE.ys} stroke={HEX.white} weight={1.2} node={8} animate opacity="0.9" />
        <g fill={HEX.onBlue} fontSize={TEXT.size} lang="es">
          {LINES.hero.rows.map((row, i) => (
            <g key={row} className="slide-up" style={{ '--i': 16 + i * 3 }}>
              <text x={TEXT.x} y={TEXT.base[i]}>{row}</text>
            </g>
          ))}
        </g>
        {/* the mark: outline drawn first, then the lattice fills in */}
        <g transform={`translate(${markX} ${markY}) scale(${r2(MARK_SIZE / 100)})`}>
          <path d={MARK_OUTLINE_D} fill="none" stroke={HEX.onBlue} strokeWidth="1.6" pathLength="1" className="lattice-line" style={{ '--len': 1 }} />
        </g>
        <MarkG x={markX} y={markY} size={MARK_SIZE} fill={HEX.onBlue} pathClass="lattice-fill" />
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
