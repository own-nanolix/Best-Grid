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
// stops: o = offset 0 to 1, c = colour, n = plain name of the stop.
export const GRADS = [
  {
    id: 'fog', name: 'Fog', kind: 'linear', tone: 'light', x1: 0.15, y1: 0, x2: 0.6, y2: 1,
    light: { cx: 0.12, cy: 0.1, r: 0.7 },
    source: 'Rebuilt from the hero photograph (m01): peach to plum, light from the top left.',
    stops: [
      { o: 0, c: mix(HEX.lightBlue, HEX.white, 0.4), n: 'Light Blue, lifted' },
      { o: 0.28, c: mix(HEX.fog, HEX.lightBlue, 0.45), n: 'Fog, pale' },
      { o: 0.52, c: HEX.fog, n: 'Fog' },
      { o: 0.78, c: mix(HEX.fog, HEX.plum, 0.62), n: 'Fog and Plum' },
      { o: 1, c: HEX.plum, n: 'Plum' },
    ],
  },
  {
    id: 'sunset', name: 'Sunset', kind: 'linear', tone: 'dark', x1: 0, y1: 0, x2: 0, y2: 1,
    source: 'Rebuilt from the sunset fields of the website and the billboard (m16, m19): Dark Blue sky down to orange.',
    stops: [
      { o: 0, c: HEX.darkBlue, n: 'Dark Blue' },
      { o: 0.45, c: mix(HEX.darkBlue, HEX.activeBlue, 0.22), n: 'Dark Blue, lifted' },
      { o: 0.72, c: mix(HEX.darkBlue, HEX.sunset, 0.68), n: 'Dark Blue and Sunset' },
      { o: 0.86, c: HEX.sunset, n: 'Sunset' },
      { o: 1, c: mix(HEX.plum, HEX.darkBlue, 0.55), n: 'Plum and Dark Blue' },
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
