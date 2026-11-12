// Construction of two icons on the 24 pixel grid: the grid, the key lines, the stroke unit, the corners and
// terminals, then the same icon at four sizes. Each drawing is one exportable SVG.
import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/KeyArt';
import { CORE } from '@/components/site/icons';
import { MarkG, MARK, markConstruction } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const K = 20, X0 = 50, Y0 = 50, G = 24;
const u = (v) => r2(v * K);
const SIZES = [96, 48, 24, 16];

// Per icon: the corner pixels left out, the open crossings [x, y, w, h], the square ends [x, y] (unit centres),
// and the one pixel highlighted as the stroke unit.
const PLANS = [
  {
    name: 'substation', title: 'Substation', unit: [3, 10],
    corners: [[2, 10], [21, 10], [2, 21], [21, 21]],
    crossings: [[7, 5, 1, 1], [16, 5, 1, 1]],
    ends: [[7.5, 3], [16.5, 3], [5, 5.5], [19, 5.5]],
  },
  {
    name: 'battery', title: 'Battery', unit: [3, 6],
    corners: [[2, 6], [11, 6], [2, 20], [11, 20], [12, 6], [21, 6], [12, 20], [21, 20]],
    crossings: [[6, 12.5, 2, 2]],
    ends: [[5, 4.5], [9, 4.5], [15, 4.5], [19, 4.5]],
  },
];

const LEGEND = ['Stroke unit, 1 x 1', 'Corner pixel left out', 'Open crossing', 'Square end'];

function Drawing({ plan, index }) {
  const lines = Array.from({ length: G + 1 }, (_, i) => i);
  const d = CORE[plan.name];
  const sz = SIZES.reduce((acc, s) => { acc.push({ s, x: acc.length ? acc[acc.length - 1].x + acc[acc.length - 1].s + 44 : 640 }); return acc; }, []);
  const dash = { fill: 'none', stroke: HEX.activeBlue, strokeWidth: 2, strokeDasharray: '4 3' };
  return (
    <Art viewBox="0 0 1200 580" title={`${plan.title} icon: construction on the 24 pixel grid, shown at four sizes`} exportName={`icons-construction-${plan.name}`}>
      <rect width="1200" height="580" fill={HEX.periwinkle} />
      <g fill={HEX.activeBlue}>
        {lines.map((i) => {
          const key = i === 12, live = i === 2 || i === 22, quarter = i === 6 || i === 18;
          const w = key || live ? 1.25 : 0.6;
          return (
            <g key={i} opacity={key || live ? 1 : quarter ? 0.7 : 0.4}>
              <rect x={r2(X0 + i * K - w / 2)} y={Y0} width={w} height={G * K} className="extend-y" style={{ '--i': i >> 1 }} />
              <rect x={X0} y={r2(Y0 + i * K - w / 2)} width={G * K} height={w} className="extend-x" style={{ '--i': i >> 1 }} />
            </g>
          );
        })}
      </g>
      {[[0, 0], [G, 0], [0, G], [G, G], [2, 2], [22, 2], [2, 22], [22, 22], [12, 12]].map(([gx, gy], i) => (
        <NodeG key={`${gx}-${gy}`} cx={X0 + gx * K} cy={Y0 + gy * K} s={i < 4 ? 9 : 7} fill={HEX.activeBlue} className="snap" style={{ '--i': 14 + i }} />
      ))}
      <g transform={`translate(${X0} ${Y0}) scale(${K})`}>
        <path d={d} fill={HEX.darkBlue} className="fill-in" style={{ '--i': 16 }} />
      </g>
      <rect x={u(plan.unit[0]) + X0} y={u(plan.unit[1]) + Y0} width={K} height={K} fill={HEX.activeBlue} className="fade-in" style={{ '--i': 30 }} />
      <g {...dash}>
        {plan.corners.map(([cx, cy]) => <rect key={`c${cx}-${cy}`} x={X0 + u(cx) + 1} y={Y0 + u(cy) + 1} width={K - 2} height={K - 2} className="fade-in" style={{ '--i': 32 }} />)}
        {plan.crossings.map(([cx, cy, w, h]) => <rect key={`x${cx}-${cy}`} x={X0 + u(cx) + 1} y={Y0 + u(cy) + 1} width={u(w) - 2} height={u(h) - 2} className="fade-in" style={{ '--i': 34 }} />)}
      </g>
      {plan.ends.map(([ex, ey]) => <NodeG key={`e${ex}-${ey}`} cx={X0 + u(ex)} cy={Y0 + u(ey)} s={8} fill={HEX.activeBlue} className="snap" style={{ '--i': 36 }} />)}

      <text x="640" y="74" fontSize="26" fill={HEX.darkBlue}>{`${plan.title}, 24 x 24`}</text>
      <rect x="640" y="250" width="520" height="1" fill={HEX.darkBlue} />
      <NodeG cx={640} cy={250.5} s={8} fill={HEX.darkBlue} />
      {sz.map(({ s, x }, i) => (
        <g key={s} className="fade-in" style={{ '--i': 20 + i * 4 }}>
          <g transform={`translate(${x} ${250 - s}) scale(${r2(s / 24)})`}>
            <path d={d} fill={HEX.darkBlue} />
          </g>
          <text x={x} y="282" fontSize="20" fill={HEX.blueInk}>{`${s} px`}</text>
        </g>
      ))}
      {LEGEND.map((label, i) => {
        const y = 346 + i * 48;
        return (
          <g key={label} className="fade-in" style={{ '--i': 40 + i * 3 }}>
            {i === 0 && <rect x="640" y={y - 14} width="20" height="20" fill={HEX.activeBlue} />}
            {i === 1 && <rect x="641" y={y - 13} width="18" height="18" {...dash} />}
            {i === 2 && <rect x="635" y={y - 10} width="30" height="12" {...dash} />}
            {i === 3 && <NodeG cx={650} cy={y - 4} s={8} fill={HEX.activeBlue} />}
            <text x="684" y={y + 2} fontSize="22" fill={HEX.darkBlue}>{label}</text>
          </g>
        );
      })}
      <text x="640" y="548" fontSize="18" fill={HEX.blueInk}>{`Plate ${index + 1} of 2`}</text>
    </Art>
  );
}

export default function Construct24() {
  return PLANS.map((plan, i) => <Drawing key={plan.name} plan={plan} index={i} />);
}

// The rules the icons share with the mark, drawn side by side: the mark with the centre lines of its bars on
// their pitch, and the lattice icon with the unit grid. Both: one bar width, open cells, square ends.
export function SharedRules() {
  const S = 400, ML = 60, MT = 70, IL = 700, k = 400 / 24;
  return (
    <Art viewBox="0 0 1200 560" title="The mark and the grid icon side by side: one bar width, regular pitch, open cells" exportName="icons-shared-rules">
      <rect width="1200" height="560" fill={HEX.periwinkle} />
      <MarkG x={ML} y={MT} size={S} fill={HEX.darkBlue} className="fill-in" style={{ '--i': 14 }} />
      <g fill={HEX.activeBlue}>
        {markConstruction().filter((l) => l.kind !== 'diagonal').map((l, i) => {
          const horizontal = l.y1 === l.y2, at = (horizontal ? l.y1 : l.x1) * (S / 100);
          return horizontal
            ? <rect key={i} x={ML} y={r2(MT + at - 0.5)} width={S} height="1" className="extend-x" style={{ '--i': i }} />
            : <rect key={i} x={r2(ML + at - 0.5)} y={MT} width="1" height={S} className="extend-y" style={{ '--i': i }} />;
        })}
      </g>
      <g fill={HEX.activeBlue}>
        {range24.map((i) => (
          <g key={i} opacity="0.4">
            <rect x={r2(IL + i * k - 0.3)} y={MT} width="0.6" height={S} className="extend-y" style={{ '--i': i >> 1 }} />
            <rect x={IL} y={r2(MT + i * k - 0.3)} width={S} height="0.6" className="extend-x" style={{ '--i': i >> 1 }} />
          </g>
        ))}
      </g>
      <g transform={`translate(${IL} ${MT}) scale(${r2(k)})`}>
        <path d={CORE.grid} fill={HEX.darkBlue} className="fill-in" style={{ '--i': 16 }} />
      </g>
      <text x={ML} y="520" fontSize="22" fill={HEX.darkBlue}>{`Mark: bar ${MARK.B}, pitch ${MARK.P}, bar / pitch 0.41`}</text>
      <text x={IL} y="520" fontSize="22" fill={HEX.darkBlue}>Icon: bar 1 unit, pitch 6 units</text>
    </Art>
  );
}
const range24 = Array.from({ length: 25 }, (_, i) => i);
