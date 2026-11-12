// The mark's lattice grown into a field around the mark itself (the mark's own construction, pitch P and bar B,
// continued outward), on Dark Blue, with the guides running edge to edge and a node at each crossing.
// Entrance: guides extend, nodes snap, the rings fade in from the centre, the mark's outline draws and fills.
import Art from '@/components/art/Art';
import { GuidesG, LatticeFieldG, MARK_OUTLINE_D } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const S = 800;
const C = S / 2;

export default function Lattice() {
  const size = 200;
  const x = r2(C - size / 2);
  const guides = [r2(S * 0.067), C, r2(S * 0.933)];
  return (
    <Art viewBox={`0 0 ${S} ${S}`} title="The lattice of the mark grown into a field on Dark Blue" exportName="overview-lattice">
      <rect width={S} height={S} fill={HEX.darkBlue} />
      <g fill={HEX.activeBlue} fillOpacity="0.28">
        <g className="fade-in" style={{ '--i': 14 }}>
          <LatticeFieldG cx={C} cy={C} k={5.4} rings={5} fill={HEX.activeBlue} />
        </g>
      </g>
      <GuidesG w={S} h={S} xs={guides} ys={guides} stroke={HEX.activeBlue} weight={1} node={8} animate />
      <g transform={`translate(${x} ${x}) scale(${r2(size / 100)})`}>
        <path d={MARK_OUTLINE_D} fill="none" stroke={HEX.activeBlue} strokeWidth="0.8" pathLength="1" className="lattice-line" style={{ '--len': 1 }} />
      </g>
      <MarkG x={x} y={x} size={size} fill={HEX.activeBlue} pathClass="lattice-fill" />
    </Art>
  );
}
