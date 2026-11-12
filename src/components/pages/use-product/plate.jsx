// One catalogue plate: a dark stage with one spotlight, the plate furniture, the shared materials and the tube
// gradients, in one exportable SVG. Children are drawn in the plate's own units.
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, PlateFrameG } from '@/components/art/Mockup';
import { TubeDefs } from './tube';

export function Plate({ idp, w, h, name, title, spot, split, floor = null, no, intensity = 1, children }) {
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={`use-product-${name}`}>
      <MaterialDefs idp={idp} />
      <TubeDefs idp={idp} />
      <StageG idp={idp} w={w} h={h} spot={spot} floor={floor} intensity={intensity} />
      <PlateFrameG w={w} h={h} split={split} no={no} />
      {children}
    </Art>
  );
}

// A row of callouts: [label, [x, y], ty] with a shared label column at tx.
export function labelRows(rows, tx, side = 'right') {
  return rows.map(([label, [x, y], ty, sub], i) => ({ label, x, y, tx, ty, sub, side, i }));
}
