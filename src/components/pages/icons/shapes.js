// Small drawing helpers for the icons page. Everything is filled bars of one width with square ends,
// the manner of the case study's icons (m14, m15): stepped corners, open crossings.
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';

// A filled rectangle as a path.
export const R = (x, y, w, h) => `M${r2(x)} ${r2(y)}h${r2(w)}v${r2(h)}h${r2(-w)}Z`;
// A stepped frame: four bars of thickness t, the four corner pixels left out.
export const F = (x, y, w, h, t = 1) => R(x + t, y, w - 2 * t, t) + R(x + t, y + h - t, w - 2 * t, t) + R(x, y + t, t, h - 2 * t) + R(x + w - t, y + t, t, h - 2 * t);
// A straight bar of width w between two points, as polygon points.
export const bar = (x0, y0, x1, y1, w) => {
  const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy) || 1, nx = (-dy / l) * (w / 2), ny = (dx / l) * (w / 2);
  return [[x0 + nx, y0 + ny], [x1 + nx, y1 + ny], [x1 - nx, y1 - ny], [x0 - nx, y0 - ny]].map(([x, y]) => `${r2(x)},${r2(y)}`).join(' ');
};

// The two grounds of every illustration and example: light (paper) and dark (Dark Blue).
export const PAL = {
  light: { bg: HEX.paper, ink: HEX.darkBlue, acc: HEX.activeBlue, note: HEX.muted, field: HEX.periwinkle },
  dark: { bg: HEX.darkBlue, ink: HEX.lightBlue, acc: HEX.activeBlue, note: HEX.mutedOnDark, field: HEX.activeBlue },
};
