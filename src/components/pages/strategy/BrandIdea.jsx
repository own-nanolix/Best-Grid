// The brand idea in one drawing: the mark, a grid gathered into one node reaching in four directions, with its
// outline echoed outward like a pulse leaving a node, and the guides running out from its centre. Active Blue on Dark
// Blue. Entrance: the guides extend, the echoes fade in from the centre outward, the mark's outline draws and fills.
import Art from '@/components/art/Art';
import { GuidesG, MARK_OUTLINE_D, StarEchoG } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const S = 700;
const C = S / 2;

export default function BrandIdea() {
  const size = 170;
  const x = r2(C - size / 2);
  return (
    <Art viewBox={`0 0 ${S} ${S}`} title="The mark with its outline echoed outward from one node" exportName="strategy-brand-idea">
      <rect width={S} height={S} fill={HEX.darkBlue} />
      <GuidesG w={S} h={S} xs={[C]} ys={[C]} stroke={HEX.activeBlue} weight={1} node={8} animate />
      <g fillOpacity="0" color={HEX.activeBlue}>
        <StarEchoG cx={C} cy={C} size={size * 1.3} count={6} step={0.42} stroke={HEX.activeBlue} weight={1} animate />
      </g>
      <g transform={`translate(${x} ${x}) scale(${r2(size / 100)})`}>
        <path d={MARK_OUTLINE_D} fill="none" stroke={HEX.activeBlue} strokeWidth="0.9" pathLength="1" className="lattice-line" style={{ '--len': 1 }} />
      </g>
      <MarkG x={x} y={x} size={size} fill={HEX.activeBlue} pathClass="lattice-fill" />
    </Art>
  );
}
