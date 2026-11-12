// Shared values of the logo page: colourways, minimum sizes, misuse list, construction rows.
// Everything here is either published (palette, mark construction) or a plain-English production value of ours.
import { HEX } from '@/lib/brand';
import { MARK } from '@/components/art/Mark';

// The pairings the case study shows first (m21, m05, m19, m12), then two more from the published palette.
// `sampled` marks a colour read from the images, not published.
export const COLOURWAYS = [
  { id: 'active-on-dark', name: 'Active Blue on Dark Blue', ground: HEX.darkBlue, ink: HEX.activeBlue, groundHex: HEX.darkBlue, inkHex: HEX.activeBlue, seen: 'As the mark slide', rule: HEX.activeBlue },
  { id: 'dark-on-light', name: 'Dark Blue on Light Blue', ground: HEX.lightBlue, ink: HEX.darkBlue, groundHex: HEX.lightBlue, inkHex: HEX.darkBlue, seen: 'As the letterhead and the website', rule: HEX.darkBlue },
  { id: 'light-on-active', name: 'Light grey-white on Active Blue', ground: HEX.activeBlue, ink: HEX.onBlue, groundHex: HEX.activeBlue, inkHex: HEX.onBlue, inkSampled: true, seen: 'As the envelope and the billboard', rule: HEX.darkBlue },
  { id: 'warm-on-active', name: 'Warm grey on Active Blue', ground: HEX.activeBlue, ink: HEX.warmGrey, groundHex: HEX.activeBlue, inkHex: HEX.warmGrey, inkSampled: true, seen: 'As the blue box', rule: HEX.darkBlue },
  { id: 'light-on-dark', name: 'Light Blue on Dark Blue', ground: HEX.darkBlue, ink: HEX.lightBlue, groundHex: HEX.darkBlue, inkHex: HEX.lightBlue, seen: 'From the palette', rule: HEX.activeBlue },
  { id: 'dark-on-active', name: 'Dark Blue on Active Blue', ground: HEX.activeBlue, ink: HEX.darkBlue, groundHex: HEX.activeBlue, inkHex: HEX.darkBlue, seen: 'From the palette', rule: HEX.darkBlue },
];

// Minimum sizes of the mark alone, in pixels on screen (our own production values).
export const MIN_SIZES = [
  { px: 96, note: 'Comfortable' },
  { px: 64, note: 'Small' },
  { px: 40, note: 'Compact' },
  { px: 24, note: 'Minimum' },
];

// Misuse: a plain English label each.
export const MISUSE = [
  { id: 'stretch', label: 'Do not stretch' },
  { id: 'rotate', label: 'Do not rotate' },
  { id: 'recolour', label: 'Do not recolour' },
  { id: 'outline', label: 'Do not outline' },
  { id: 'contrast', label: 'Do not use low contrast' },
  { id: 'effects', label: 'Do not add effects' },
];

// The construction values, from MARK (one construction: every number in the artwork comes from here).
export const SLOPE_DEG = Math.round((Math.atan(MARK.slope) * 180 / Math.PI) * 10) / 10; // 24.2
export const CONSTRUCTION_ROWS = [
  { key: 'B', head: 'B', num: String(MARK.B), what: 'Bar width. Every band is this wide: star edges, frames, cross and diagonals.' },
  { key: 'P', head: 'P', num: String(MARK.P), what: 'Lattice pitch. Frames sit at one and two pitches from the centre.' },
  { key: 'slope', head: 'Slope', num: String(MARK.slope), what: `Star edge, ${SLOPE_DEG} degrees off the axis; each tip opens about 41 degrees.` },
  { key: 'waist', head: 'Waist', num: String(MARK.waist), what: 'The concave points on each side, measured from the edge of the box.' },
  { key: 'chamfer', head: 'Chamfer', num: String(MARK.chamfer), what: 'Each tip is cut at 45 degrees along x + y = 3.2.' },
];
export const RATIOS = [
  { key: 'ratio', head: 'B / P', num: '0.41', what: 'Bar to pitch.' },
  { key: 'hole', head: 'P - B', num: '7.62', what: 'Width of every hole.' },
  { key: 'diag', head: 'Diagonal', num: String(MARK.diag), what: 'Half band of the 45 degree diagonals, measured along x.' },
];

// Centre lines of the lattice, in units from the left edge of the mark box.
export const CENTRES = [-2, -1, 0, 1, 2].map((k) => Math.round((50 + k * MARK.P) * 100) / 100);
