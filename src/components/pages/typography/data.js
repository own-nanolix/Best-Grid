// Typography data. Sizes come from SOURCE.md ("suggested site scale"); the poster measurements were taken from the
// right-hand poster of m11. Vertical metrics are those of the closest free match the site sets the type in.
import { LINES, CONTACT } from '@/lib/brand';
import { WORDMARK } from '@/components/art/Mark';

// Vertical metrics, in em, of the face the site sets the type in (cap height, x-height, ascender, descender).
export const METRICS = { cap: 0.727, x: 0.546, asc: 0.76, desc: 0.21 };

// The scale: size in px, role, leading (line-height), tracking in em, where it comes from.
export const SCALE = [
  { px: 11, role: 'Micro', lh: 1.3, ls: 0, use: 'Addresses and footers', origin: 'Case study (about 1.1% of a sheet)' },
  { px: 13, role: 'Small', lh: 1.35, ls: 0, use: 'Slide labels and captions', origin: 'Case study slides' },
  { px: 14, role: 'Body, web', lh: 1.3, ls: 0, use: 'Website body at 1440', origin: 'Case study (about 14 px, leading 1.3)' },
  { px: 16, role: 'Text', lh: 1.4, ls: 0, use: 'Running text on this site', origin: 'Extension' },
  { px: 20, role: 'Lead', lh: 1.35, ls: 0, use: 'Introductions', origin: 'Extension' },
  { px: 28, role: 'Title', lh: 1.18, ls: -0.006, use: 'Section titles', origin: 'Extension' },
  { px: 44, role: 'Headline', lh: 1.12, ls: -0.01, use: 'Website hero', origin: 'Case study (about 3% of the viewport, leading 1.12)' },
  { px: 64, role: 'Display', lh: 1.08, ls: -0.02, use: 'Page openings', origin: 'Extension' },
  { px: 96, role: 'Poster display', lh: 1.04, ls: -0.025, use: 'Large headlines', origin: 'Extension' },
  { px: 160, role: 'Numeral', lh: 0.9, ls: -0.035, use: 'Oversized data', origin: 'Case study (about 3 times the headline)' },
];

// The character set, in rows of twelve. Spanish accents and the designer's devices included.
export const GLYPHS = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((g) => ({ g, k: 'Capital' })),
  ...'abcdefghijklmnopqrstuvwxyz'.split('').map((g) => ({ g, k: 'Lower case' })),
  ...'0123456789'.split('').map((g) => ({ g, k: 'Figure' })),
  ...'ÁÉÍÓÚÑÜáéíóúñü'.split('').map((g) => ({ g, k: 'Accented' })),
  ...'.,:;·!?¡¿-–—()[]/|+−×=%€&@#ªº"\''.split('').map((g) => ({ g, k: 'Punctuation and sign' })),
];
export const GLYPH_COLS = 12;
export const codeOf = (g) => `U+${g.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`;

// The right-hand poster of m11 (Active Blue, Dark Blue type), measured on a 720 x 960 artboard.
export const POSTER = {
  w: 720,
  h: 960,
  frame: { x0: 48, x1: 672, y0: 51 },
  foot: { y0: 837, y1: 909, xs: [48, 255, 465, 672] },
  parts: [
    { n: 1, name: 'Word-mark', size: 55, lh: null, ls: WORDMARK.tracking, weight: 'Medium', align: 'Centre', note: 'Tight spacing, narrow word space' },
    { n: 2, name: 'Headline', size: 38.5, lh: 1.17, ls: -0.01, weight: 'Regular', align: 'Centre', note: LINES.clarity.rows.join(' / ') },
    { n: 3, name: 'Body', size: 12, lh: 1.25, ls: 0, weight: 'Regular', align: 'Centre', note: 'Three lines' },
    { n: 4, name: 'Footer', size: 8, lh: 1, ls: 0, weight: 'Regular', align: 'Centre', note: CONTACT.web },
  ],
};

// Brand habits of setting, with the printed examples.
export const BRACKETS = ['[+34]', '[Madrid]', '[24 – 25]', '[€0.9]'];
export const DOTS = [LINES.field, 'Acceso a red · Conexión'];
