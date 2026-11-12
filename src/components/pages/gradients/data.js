// Gradient specifications for the gradients page. Colours come from HEX (published names and sampled tones);
// every other stop is a mix of two of them, computed here, so no private hex lives in the page.
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
// mix(a, b, t): t = 0 gives a, t = 1 gives b.
export function mix(a, b, t) {
  const [ar, ag, ab] = toRgb(a);
  const [br, bg, bb] = toRgb(b);
  const h = (x, y) => Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
  return `#${h(ar, br)}${h(ag, bg)}${h(ab, bb)}`;
}

// CSS-style angle of a linear gradient vector given in bounding-box units (0deg points up, 90deg points right).
export function angleOf({ x1, y1, x2, y2 }) {
  const deg = (Math.atan2(x2 - x1, -(y2 - y1)) * 180) / Math.PI;
  return r2((deg + 360) % 360);
}

// kind: 'linear' uses x1 y1 x2 y2; 'radial' uses cx cy r. tone: whether the field reads dark or light.
// stops: o = offset 0 to 1, c = colour, n = plain description of the stop.
// The case study publishes no gradient. The first two fields stand in for its photographs: their stops were sampled
// from the reference images (m01 corner to corner; m16, the slider photo, top to bottom) and matched with mixes of
// the sampled photo tones and the published blues. HEX.fog / HEX.plum / HEX.sunset are those sampled tones.
const SKY = mix(HEX.darkBlue, HEX.lightBlue, 0.12);
export const GRADS = [
  {
    id: 'photo-m01', name: 'Hero photograph field', kind: 'linear', tone: 'light', x1: 0, y1: 0, x2: 1, y2: 1,
    source: 'Measured from the hero photograph (m01), corner to corner: pale grey at the top left through warm grey to dark brown at the bottom right. A stand-in for the photograph, not a published gradient; the cool sky at the top right is left out.',
    stops: [
      { o: 0, c: mix(HEX.lightBlue, HEX.darkBlue, 0.1), n: 'Pale grey (sampled, top left)' },
      { o: 0.22, c: mix(HEX.lightBlue, HEX.fog, 0.2), n: 'Grey-white' },
      { o: 0.4, c: mix(HEX.fog, HEX.darkBlue, 0.13), n: 'Warm grey' },
      { o: 0.6, c: mix(HEX.fog, HEX.plum, 0.45), n: 'Grey-brown' },
      { o: 0.75, c: mix(HEX.fog, HEX.plum, 0.8), n: 'Brown' },
      { o: 0.9, c: HEX.plum, n: 'Dark brown (sampled)' },
      { o: 1, c: mix(HEX.plum, HEX.black, 0.36), n: 'Near black (bottom right)' },
    ],
  },
  {
    id: 'photo-m16', name: 'Website photograph field', kind: 'linear', tone: 'dark', x1: 0, y1: 0, x2: 0, y2: 1,
    source: 'Measured from the slider photograph of the website (m16), top to bottom: blue-grey sky, the orange band of the horizon, then the black ground. A stand-in for the photograph, not a published gradient.',
    stops: [
      { o: 0, c: SKY, n: 'Blue-grey sky' },
      { o: 0.45, c: mix(SKY, HEX.activeBlue, 0.1), n: 'Blue-grey' },
      { o: 0.58, c: mix(HEX.darkBlue, HEX.fog, 0.25), n: 'Grey' },
      { o: 0.7, c: mix(HEX.sunset, HEX.fog, 0.45), n: 'Pale orange' },
      { o: 0.81, c: mix(HEX.sunset, HEX.plum, 0.4), n: 'Orange red' },
      { o: 0.88, c: mix(HEX.plum, HEX.sunset, 0.2), n: 'Dark red' },
      { o: 0.92, c: HEX.black, n: 'Black ground, to the bottom edge' },
    ],
  },
  {
    id: 'dark-to-active', name: 'Dark Blue to Active Blue', kind: 'linear', tone: 'dark', x1: 0, y1: 1, x2: 1, y2: 0,
    source: 'Extension: the two published blues as one restrained field.',
    stops: [
      { o: 0, c: HEX.darkBlue, n: 'Dark Blue' },
      { o: 1, c: HEX.activeBlue, n: 'Active Blue' },
    ],
  },
  {
    id: 'active-to-light', name: 'Active Blue to Light Blue', kind: 'linear', tone: 'light', x1: 0, y1: 0, x2: 0, y2: 1,
    source: 'Extension: Active Blue thinning into the page ground.',
    stops: [
      { o: 0, c: HEX.activeBlue, n: 'Active Blue' },
      { o: 1, c: HEX.lightBlue, n: 'Light Blue' },
    ],
  },
  {
    id: 'light-to-periwinkle', name: 'Light Blue to Periwinkle', kind: 'linear', tone: 'light', x1: 0, y1: 0, x2: 1, y2: 1,
    source: 'Extension: the page ground deepening to the slide ground.',
    stops: [
      { o: 0, c: HEX.lightBlue, n: 'Light Blue' },
      { o: 1, c: HEX.periwinkle, n: 'Periwinkle' },
    ],
  },
  {
    id: 'active-to-dark', name: 'Active Blue to Dark Blue, radial', kind: 'radial', tone: 'dark', cx: 0.5, cy: 0.36, r: 0.78,
    source: 'Extension: a single node of Active Blue falling into Dark Blue.',
    stops: [
      { o: 0, c: HEX.activeBlue, n: 'Active Blue' },
      { o: 1, c: HEX.darkBlue, n: 'Dark Blue' },
    ],
  },
];

export const gradById = (id) => GRADS.find((g) => g.id === id);

// Four intensity levels of surface grain: opacity of the noise, its frequency, octaves and colour.
export const GRAIN_LEVELS = [
  { id: 'l1', name: 'Level 1', label: '4 %', note: 'Fine paper grain, 0.9 at 4%', freq: 0.9, oct: 2, alpha: 0.04, ink: 0 },
  { id: 'l2', name: 'Level 2', label: '6 %', note: 'Fine paper grain, 0.9 at 6%', freq: 0.9, oct: 2, alpha: 0.06, ink: 0 },
  { id: 'l3', name: 'Level 3', label: '8 %', note: 'Fine paper grain, 0.9 at 8%', freq: 0.9, oct: 2, alpha: 0.08, ink: 0 },
  { id: 'l4', name: 'Level 4', label: 'Board', note: 'Uncoated board grain, 0.6 at 12%', freq: 0.6, oct: 3, alpha: 0.12, ink: 1 },
];
