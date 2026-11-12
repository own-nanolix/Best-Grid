// The app icon: the mark on a Dark Blue tile at 16, 32, 64, 128 and 256 px, flat (no stage), drawn at real pixel sizes.
// The lattice is simplified at small sizes so the star stays legible: at 16 px an open centre, at 32 px three
// holes per quadrant, from 64 px the full mark.
import { HEX } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MARK_D, markOutline, markHolesTL, roundedPolygon } from '@/components/art/Mark';

export const ICON_SIZES = [
  { px: 16, note: 'Open centre: the lattice is dropped' },
  { px: 32, note: 'Three holes per quadrant' },
  { px: 64, note: 'The full mark' },
  { px: 128, note: 'The full mark' },
  { px: 256, note: 'The full mark' },
];

const mirrors = [([x, y]) => [x, y], ([x, y]) => [100 - x, y], ([x, y]) => [100 - x, 100 - y], ([x, y]) => [x, 100 - y]];
const OUTER = roundedPolygon(markOutline(), (d) => (d > 120 ? 1.05 : 0.85));
const SIMPLE = [
  OUTER + roundedPolygon([[41, 41], [59, 41], [59, 59], [41, 59]], 1.2),
  OUTER + mirrors.flatMap((f) => [2, 3, 4].map((i) => roundedPolygon(markHolesTL()[i].map(f), 0.7))).join(''),
];

export function IconG({ px, x = 0, y = 0 }) {
  const d = px <= 16 ? SIMPLE[0] : px <= 32 ? SIMPLE[1] : MARK_D;
  return (
    <g transform={`translate(${x} ${y}) scale(${px / 100})`}>
      <rect width="100" height="100" fill={HEX.darkBlue} />
      <g transform="translate(18 18) scale(0.64)"><path d={d} fill={HEX.activeBlue} fillRule="evenodd" /></g>
    </g>
  );
}

// One icon on its own, its SVG exactly px wide (shrinks on a narrow screen).
export function AppIcon({ px }) {
  return (
    <Art viewBox={`0 0 ${px} ${px}`} title={`App icon at ${px} px`} exportName={`use-product-icon-${px}`} style={{ width: px, maxWidth: '100%', height: 'auto' }}>
      <IconG px={px} />
    </Art>
  );
}

// The ladder: all five side by side on a common baseline, each with its size.
export function IconLadder() {
  const xs = ICON_SIZES.map((_, i) => ICON_SIZES.slice(0, i).reduce((a, q) => a + q.px + 40, 0));
  return (
    <Art viewBox="0 0 656 300" title="App icon ladder at 16, 32, 64, 128 and 256 px" exportName="use-product-icon-ladder" style={{ width: 656, maxWidth: '100%', height: 'auto' }}>
      {ICON_SIZES.map(({ px }, i) => {
        const at = xs[i];
        return (
          <g key={px}>
            <IconG px={px} x={at} y={256 - px} />
            <rect x={at} y="268" width={px} height="1" fill={HEX.darkBlue} opacity="0.5" />
            <rect x={at - 2.5} y="265.5" width="5" height="5" fill={HEX.darkBlue} />
            <text x={at} y="289" fontSize="14" fill={HEX.muted}>{px} px</text>
          </g>
        );
      })}
    </Art>
  );
}
