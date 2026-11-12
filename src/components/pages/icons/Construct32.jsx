// The two slides of the case study, rebuilt at their own 3:4 format and measured on the originals:
// m14 (the turbine on its 32 x 32 grid with its guide circles) and m15 (the four icons, Active Blue on Dark Blue,
// in a 2 x 2 of guide cells). Both slides are 1659 x 2212 in the reference; here 1200 x 1600 (k = 0.7233).
import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/KeyArt';
import { turbinePath, PIXEL32, PIXEL32_LABELS } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const W = 1200, HT = 1600, K = 1200 / 1659;
const N = 32;
// m14: grid square from (138, 414) to (1520, 1796) on the reference, unit 43.19; centre of the turbine (16, 16).
const X0 = r2(138 * K), Y0 = r2(414 * K), U = r2(43.19 * K);
// The guide circles of m14 (radius in units): the hub, the two edges of the ring, and the two outer guides.
const CIRCLES = [1.5, 6, 7, 9.5, 10.5];

// Values of the turbine construction, shown beside the slide (our wording; values measured on m14).
export const TURBINE_SPEC = [
  ['Grid', '32 x 32 units'],
  ['Bar', '1 unit'],
  ['Hub', 'guide circle 3 units across, 1 x 1 square'],
  ['Blades', '3 at 120°, two converging bars each'],
  ['Tips', '1 x 1 squares, top tip at 5.5'],
  ['Ring', 'radius 6 to 7, broken at the blades'],
  ['Guides', 'circles of radius 1.5, 6, 7, 9.5 and 10.5'],
];

const hair = (x, y, w, h, key, cls, i) => <rect key={key} x={r2(x)} y={r2(y)} width={r2(w)} height={r2(h)} className={cls} style={cls ? { '--i': i } : undefined} />;

export function TurbineSlide() {
  const lines = Array.from({ length: N - 1 }, (_, i) => i + 1);
  const g = N * U;
  return (
    <Art viewBox={`0 0 ${W} ${HT}`} title="Turbine icon on its 32 by 32 grid with its guide circles" exportName="icons-turbine-construction">
      <rect width={W} height={HT} fill={HEX.periwinkle} />
      <g fill={HEX.activeBlue}>
        {lines.map((i) => [
          hair(X0 + i * U - 0.35, Y0, 0.7, g, `v${i}`, 'extend-y', i >> 2),
          hair(X0, Y0 + i * U - 0.35, g, 0.7, `h${i}`, 'extend-x', i >> 2),
        ])}
        {/* the frame of the grid runs out to the slide edges */}
        {hair(X0 - 0.5, 0, 1, HT, 'fl', 'extend-y', 0)}
        {hair(X0 + g - 0.5, 0, 1, HT, 'fr', 'extend-y', 0)}
        {hair(0, Y0 - 0.5, W, 1, 'ft', 'extend-x', 0)}
        {hair(0, Y0 + g - 0.5, W, 1, 'fb', 'extend-x', 0)}
      </g>
      <g fill={HEX.activeBlue}>
        <NodeG cx={X0} cy={Y0} s={6} className="snap" style={{ '--i': 9 }} />
        <NodeG cx={X0 + g} cy={Y0} s={11} className="snap" style={{ '--i': 10 }} />
        <NodeG cx={X0} cy={Y0 + g} s={11} className="snap" style={{ '--i': 11 }} />
        <NodeG cx={X0 + g} cy={Y0 + g} s={11} className="snap" style={{ '--i': 12 }} />
      </g>
      <g fill="none" stroke={HEX.activeBlue} strokeWidth="0.75">
        {CIRCLES.map((r, i) => (
          <circle key={r} cx={r2(X0 + 16 * U)} cy={r2(Y0 + 16 * U)} r={r2(r * U)} className="fade-in" style={{ '--i': 14 + i * 2 }} />
        ))}
      </g>
      <g transform={`translate(${X0} ${Y0}) scale(${U})`}>
        <path d={turbinePath(16, 16, 1)} fill={HEX.darkBlue} className="fill-in" style={{ '--i': 26 }} />
      </g>
      <text x={r2(180 * K)} y={r2(398 * K)} fontSize="15" fill={HEX.blueInk} style={{ fontFeatureSettings: '"calt" 0' }}>32 x 32</text>
    </Art>
  );
}

// m15: guide lines at x 126 / 829 / 1531 and y 126 / 1105 / 2084 on the reference; the outer lines run to the slide
// edges, the centre lines stop at the frame. Icons centred in their cells at 20.4 px per unit.
const ORDER = ['solar', 'datacenter', 'battery', 'wind'];
const XS = [126, 829, 1531].map((v) => r2(v * K)), YS = [126, 1105, 2084].map((v) => r2(v * K));
const UNIT15 = r2(20.4 * K);
// The point of each icon's 32 box that sits on its measured centre (the turbine is placed by its hub).
const CENTRES = { solar: [478, 615], datacenter: [1182.5, 615], battery: [478.5, 1593], wind: [1182.5, 1614] };
const ANCHOR = { solar: [16, 16], datacenter: [16, 16], battery: [16, 16], wind: [16, 17.75] };
const NODES15 = [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]];

export function FourIcons() {
  return (
    <Art viewBox={`0 0 ${W} ${HT}`} title="The four pixel icons in Active Blue on Dark Blue: solar panel, server stack, batteries, wind turbine" exportName="icons-four-pixel-icons">
      <rect width={W} height={HT} fill={HEX.darkBlue} />
      <g fill={HEX.activeBlue}>
        {hair(XS[0] - 0.4, 0, 0.8, HT, 'l', 'extend-y', 0)}
        {hair(XS[2] - 0.4, 0, 0.8, HT, 'r', 'extend-y', 0)}
        {hair(0, YS[0] - 0.4, W, 0.8, 't', 'extend-x', 0)}
        {hair(0, YS[2] - 0.4, W, 0.8, 'b', 'extend-x', 0)}
        {hair(XS[1] - 0.4, 0, 0.8, YS[2], 'c', 'extend-y', 1)}
        {hair(XS[0], YS[1] - 0.4, XS[2] - XS[0], 0.8, 'm', 'extend-x', 1)}
        {NODES15.map(([i, j], k) => <NodeG key={`${i}-${j}`} cx={XS[i]} cy={YS[j]} s={7} className="snap" style={{ '--i': 4 + k }} />)}
      </g>
      {ORDER.map((name, i) => {
        const [cx, cy] = CENTRES[name], [ax, ay] = ANCHOR[name];
        return (
          <g key={name} className="fill-in" style={{ '--i': 12 + i * 3 }}>
            <g transform={`translate(${r2(cx * K - ax * UNIT15)} ${r2(cy * K - ay * UNIT15)}) scale(${UNIT15})`}>
              <path d={PIXEL32[name]} fill={HEX.activeBlue} />
            </g>
          </g>
        );
      })}
    </Art>
  );
}

// The names the four icons carry on the website stats row (m16), for the caption under the slide.
export const FOUR_NAMES = ORDER.map((n) => PIXEL32_LABELS[n]);
