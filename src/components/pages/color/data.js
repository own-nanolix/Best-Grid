// Colour data and the arithmetic behind the colour page. Every ratio, RGB value, tint and shade is computed here
// from the published hex values (HEX / PALETTE in @/lib/brand); nothing numeric is typed by hand.
import { HEX, PALETTE } from '@/lib/brand';
import { contrast, hexToRgb } from '@/lib/site';

export const rgbOf = (hex) => hexToRgb(hex).split(', ').map(Number);
export const rgbBars = (hex) => rgbOf(hex).join(' | ');
export const ratio = (a, b) => contrast(a, b);
export const ratioText = (r) => `${r.toFixed(2)}:1`;

// WCAG 2 levels for a ratio (small text 4.5, large text and interface parts 3, enhanced 7).
export function grade(r) {
  if (r >= 7) return 'AAA';
  if (r >= 4.5) return 'AA';
  if (r >= 3) return 'Large only';
  return 'Fails';
}
export const passesSmall = (r) => r >= 4.5;

const h2 = (n) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
// Mix a toward b by t (0 to 1), in sRGB, back to a lower-case hex.
export function mix(a, b, t) {
  const [ar, ag, ab] = rgbOf(a);
  const [br, bg, bb] = rgbOf(b);
  return `#${h2(ar + (br - ar) * t)}${h2(ag + (bg - ag) * t)}${h2(ab + (bb - ab) * t)}`;
}

// The best of three inks on a ground, by contrast (Dark Blue, white, black as a last resort in the mid tones).
export function inkOn(bg) {
  const c = [HEX.darkBlue, HEX.white, HEX.black];
  return c.reduce((best, k) => (contrast(bg, k) > contrast(bg, best) ? k : best), c[0]);
}

// Tints toward white and shades toward Dark Blue (toward black for Dark Blue itself): 4 + base + 4 steps.
export const STEPS = [80, 60, 40, 20];
export function ladder(base) {
  const shadeTo = base === HEX.darkBlue ? HEX.black : HEX.darkBlue;
  const tints = STEPS.map((p) => ({ label: `Tint ${p}`, hex: mix(base, HEX.white, p / 100) }));
  const shades = [...STEPS].reverse().map((p) => ({ label: `Shade ${p}`, hex: mix(base, shadeTo, p / 100) }));
  return [...tints, { label: 'Base', hex: base, base: true }, ...shades].map((s, i) => ({ ...s, i, ink: inkOn(s.hex) }));
}

// Published colours and the shared tokens around them.
export const PRIMARY = [
  { token: '--dark-blue', name: 'Dark Blue', hex: HEX.darkBlue, status: 'Published' },
  { token: '--active-blue', name: 'Active Blue', hex: HEX.activeBlue, status: 'Published' },
  { token: '--light-blue', name: 'Light Blue', hex: HEX.lightBlue, status: 'Published' },
  { token: '--blue-ink', name: 'Blue ink', hex: HEX.blueInk, status: 'Active Blue deepened for small text' },
  { token: '--periwinkle', name: 'Periwinkle', hex: HEX.periwinkle, status: 'Sampled from the slides' },
  { token: '--stat-cell', name: 'Stats cell', hex: HEX.statCell, status: 'Sampled from the website' },
];
export const NEUTRAL = [
  { token: '--white', name: 'White', hex: HEX.white, status: 'Reference' },
  { token: '--paper', name: 'Paper', hex: HEX.paper, status: 'Sampled' },
  { token: '--card-grey', name: 'Card grey', hex: HEX.cardGrey, status: 'Sampled' },
  { token: '--btn-fill', name: 'Button fill', hex: HEX.btnFill, status: 'Sampled' },
  { token: '--on-blue', name: 'Light type on blue', hex: HEX.onBlue, status: 'Sampled' },
  { token: '--label-grey', name: 'Label grey', hex: HEX.labelGrey, status: 'Sampled' },
  { token: '--warm-grey', name: 'Warm grey', hex: HEX.warmGrey, status: 'Sampled' },
  { token: '--muted', name: 'Muted', hex: HEX.muted, status: 'Small secondary text' },
  { token: '--muted-on-dark', name: 'Muted on dark', hex: HEX.mutedOnDark, status: 'Small secondary text' },
  { token: '--black', name: 'Black', hex: HEX.black, status: 'Presentation ground' },
];

// A computed ramp from Dark Blue to Light Blue: ten steps of the brand's own blue-grey.
export const RAMP = Array.from({ length: 10 }, (_, i) => {
  const hex = mix(HEX.darkBlue, HEX.lightBlue, i / 9);
  return { i, hex, ink: inkOn(hex) };
});

// Pairings: each is a pair of grounds read both ways (A on B and B on A give the same ratio).
export const PAIRS = [
  { id: 'dark-light', a: ['Dark Blue', HEX.darkBlue], b: ['Light Blue', HEX.lightBlue], use: 'Body text on the page' },
  { id: 'dark-active', a: ['Dark Blue', HEX.darkBlue], b: ['Active Blue', HEX.activeBlue], use: 'Text on blue fields' },
  { id: 'dark-peri', a: ['Dark Blue', HEX.darkBlue], b: ['Periwinkle', HEX.periwinkle], use: 'Slide type' },
  { id: 'ink-paper', a: ['Blue ink', HEX.blueInk], b: ['Paper', HEX.paper], use: 'Small links and labels' },
  { id: 'muted-light', a: ['Muted', HEX.muted], b: ['Light Blue', HEX.lightBlue], use: 'Captions and notes' },
  { id: 'mod-dark', a: ['Muted on dark', HEX.mutedOnDark], b: ['Dark Blue', HEX.darkBlue], use: 'Captions on dark fields' },
].map((p) => ({ ...p, r: ratio(p.a[1], p.b[1]) }));

// The colours the live tester can set against each other.
export const TESTER = [
  ['Dark Blue', HEX.darkBlue],
  ['Active Blue', HEX.activeBlue],
  ['Light Blue', HEX.lightBlue],
  ['Periwinkle', HEX.periwinkle],
  ['Paper', HEX.paper],
  ['White', HEX.white],
  ['Blue ink', HEX.blueInk],
  ['Muted', HEX.muted],
];

// Semantic tokens: our own names for the roles the published colours play. Light and dark mode.
const surfaceDark = mix(HEX.darkBlue, HEX.activeBlue, 0.1);
export const SEMANTIC = {
  light: {
    label: 'Light mode',
    bg: HEX.lightBlue,
    rows: [
      ['color-bg', HEX.lightBlue, null, 'Page ground'],
      ['color-surface', HEX.paper, null, 'Cards and sheets'],
      ['color-text', HEX.darkBlue, HEX.lightBlue, 'Type and rules'],
      ['color-text-muted', HEX.muted, HEX.lightBlue, 'Captions'],
      ['color-link', HEX.blueInk, HEX.lightBlue, 'Small blue type'],
      ['color-accent', HEX.activeBlue, HEX.lightBlue, 'Fills and large type'],
      ['color-on-accent', HEX.darkBlue, HEX.activeBlue, 'Type on the accent'],
      ['color-rule', HEX.darkBlue, HEX.lightBlue, 'Hairlines and nodes'],
    ],
  },
  dark: {
    label: 'Dark mode',
    bg: HEX.darkBlue,
    rows: [
      ['color-bg', HEX.darkBlue, null, 'Page ground'],
      ['color-surface', surfaceDark, null, 'Cards and sheets'],
      ['color-text', HEX.lightBlue, HEX.darkBlue, 'Type'],
      ['color-text-muted', HEX.mutedOnDark, HEX.darkBlue, 'Captions'],
      ['color-link', HEX.activeBlue, HEX.darkBlue, 'Blue type'],
      ['color-accent', HEX.activeBlue, HEX.darkBlue, 'Fills and the mark'],
      ['color-on-accent', HEX.darkBlue, HEX.activeBlue, 'Type on the accent'],
      ['color-rule', HEX.activeBlue, HEX.darkBlue, 'Hairlines and nodes'],
    ],
  },
};

export { PALETTE };
