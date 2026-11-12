// The catalogue-plate scaffold used by every apparel mockup: one <Art> SVG with the dark stage and its one soft
// spotlight, the plate furniture, the shared defs and the page's own callout rows. Also the production values
// (plain mm of our own) that the callouts print.
import Art from '@/components/art/Art';
import { StageG, PlateFrameG, castDir } from '@/components/art/Mockup';
import { MARK } from '@/components/art/Mark';
import { GarmentDefs, mm } from './fabric';

// spot: fractions of the plate. The plate hands children the pixel spot and the cast direction for a point.
export default function Plate({ idp, name, title, w, h, spot, split, no, label, floor = null, r = 0.62, intensity = 1, children }) {
  const px = { x: w * spot.x, y: h * spot.y };
  const cast = (x, y, depth = 26) => ({ dir: castDir(spot, w, h, x, y), depth });
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={`use-apparel-${name}`}>
      <GarmentDefs idp={idp} />
      <StageG idp={idp} w={w} h={h} spot={spot} r={r} floor={floor} intensity={intensity} />
      <PlateFrameG w={w} h={h} split={split} no={no} label={label} />
      {children(px, cast)}
    </Art>
  );
}

// "w x h mm" of one artwork item (our production values; 2.17 mm per tee unit).
export function dimsOf(a) {
  if (a.k === 'mark') return `${mm(a.size)} × ${mm(a.size)} mm`;
  if (a.k === 'word') return `${mm(a.size * 4)} × ${mm(a.size * 0.73)} mm`;
  const side = 2 * (a.rings * MARK.P + MARK.B / 2) * a.kk;
  return `${mm(side)} × ${mm(side)} mm`;
}
// Hoodies, vests and caps are cut on other scales (mm per drawing unit).
export const mmH = (u) => Math.round((u * 1.75) / 5) * 5;
export const mmC = (u) => Math.round((u * 0.65) / 5) * 5;
