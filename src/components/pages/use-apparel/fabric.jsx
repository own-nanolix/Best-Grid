// Shared helpers for the apparel drawings: positions of garment features in plate space, the light overlay that
// faces the one spotlight, fold shades, rib texture, stitched seams and the brand artwork clipped to a garment.
// Colours: palette only (HEX); tones are made with black / white overlays at low opacity, never private hexes.
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { LatticeFieldG } from '@/components/art/KeyArt';
import { MaterialDefs } from '@/components/art/Mockup';

export const COL = { dark: HEX.darkBlue, active: HEX.activeBlue, light: HEX.lightBlue };
export const DEG = Math.PI / 180;

// Our own production scale: one drawing unit of the tee is 2.17 mm (a 240-unit body is a 520 mm chest).
export const MM = 2.17;
export const mm = (u) => Math.round((u * MM) / 5) * 5;

// Garment placement t = { x, y, s, rot } -> a point of the garment's own space in plate space.
export function at(t, lx, ly) {
  const a = (t.rot || 0) * DEG, c = Math.cos(a), sn = Math.sin(a);
  return { x: r2(t.x + (lx * c - ly * sn) * t.s), y: r2(t.y + (lx * sn + ly * c) * t.s) };
}
export const place = (t) => `translate(${t.x} ${t.y}) rotate(${t.rot || 0}) scale(${t.s})`;

// The spotlight in the garment's own space (so a gradient set there faces the real light).
export function localSpot(spot, t) {
  const a = -(t.rot || 0) * DEG, dx = spot.x - t.x, dy = spot.y - t.y;
  return { x: (dx * Math.cos(a) - dy * Math.sin(a)) / t.s, y: (dx * Math.sin(a) + dy * Math.cos(a)) / t.s };
}

// MaterialDefs plus the blur used by fold shades. One per SVG.
export function GarmentDefs({ idp }) {
  return (
    <>
      <MaterialDefs idp={idp} />
      <defs>
        <filter id={`${idp}-fold`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={`${idp}-fold-s`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
    </>
  );
}

// A light overlay: lit on the side that faces the spot, shaded on the far side, with a rim of light on the lit edge.
// body (a HEX) tunes the strength: dark cloth needs more light, pale cloth less shade.
export function LightG({ id, d, spot, t, body, c = { x: 200, y: 200 }, reach = 260, lit, dark }) {
  const n = parseInt((body || HEX.activeBlue).slice(1), 16), lum = (0.3 * (n >> 16) + 0.59 * ((n >> 8) & 255) + 0.11 * (n & 255)) / 255;
  const lt = lit ?? (lum < 0.3 ? 0.5 : lum > 0.7 ? 0.2 : 0.32), dk = dark ?? (lum > 0.7 ? 0.3 : 0.46);
  const p = localSpot(spot, t), vx = p.x - c.x, vy = p.y - c.y, l = Math.hypot(vx, vy) || 1;
  const ux = vx / l, uy = vy / l;
  const g = { gradientUnits: 'userSpaceOnUse', x1: r2(c.x + ux * reach), y1: r2(c.y + uy * reach), x2: r2(c.x - ux * reach), y2: r2(c.y - uy * reach) };
  return (
    <g>
      <linearGradient id={`${id}-light`} {...g}>
        <stop offset="0" stopColor={HEX.white} stopOpacity={lt} />
        <stop offset="0.45" stopColor={HEX.white} stopOpacity="0" />
        <stop offset="0.55" stopColor={HEX.black} stopOpacity="0" />
        <stop offset="1" stopColor={HEX.black} stopOpacity={dk} />
      </linearGradient>
      <linearGradient id={`${id}-rim`} {...g}>
        <stop offset="0" stopColor={HEX.white} stopOpacity="0.7" />
        <stop offset="0.5" stopColor={HEX.white} stopOpacity="0" />
      </linearGradient>
      <path d={d} fill={`url(#${id}-light)`} />
      <path d={d} fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.8" />
    </g>
  );
}

// Folds: soft dark creases, each with a faint highlight on the lit side. paths: ['M…']. dir: unit vector to light.
export function FoldsG({ idp, paths, spot, t, w = 9, o = 0.22 }) {
  const p = localSpot(spot, t), l = Math.hypot(p.x - 200, p.y - 200) || 1;
  const hx = r2(((p.x - 200) / l) * 5), hy = r2(((p.y - 200) / l) * 5);
  return (
    <g>
      {paths.map((d, i) => (
        <g key={i} fill="none" strokeLinecap="round">
          <path d={d} stroke={HEX.white} strokeWidth={r2(w * 0.7)} opacity={r2(o * 0.55)} transform={`translate(${hx} ${hy})`} filter={`url(#${idp}-fold)`} />
          <path d={d} stroke={HEX.black} strokeWidth={w} opacity={o} filter={`url(#${idp}-fold)`} />
        </g>
      ))}
    </g>
  );
}

// A ribbed band (collar, cuff, hem): the body colour a little darker, with vertical rib lines, along a path or
// as a polygon. Stroke-based for curves (w = band width) and fill-based for polygons.
export function RibStroke({ d, w = 14, body, rib = 0.16, step = 2.6 }) {
  return (
    <g fill="none">
      <path d={d} stroke={body} strokeWidth={w} />
      <path d={d} stroke={HEX.black} strokeWidth={w} opacity={rib} />
      <path d={d} stroke={HEX.black} strokeWidth={w} strokeDasharray={`0.9 ${step}`} opacity="0.3" />
      <path d={d} stroke={HEX.white} strokeWidth={w} strokeDasharray={`0.6 ${r2(step + 0.9)}`} strokeDashoffset="1.2" opacity="0.14" />
    </g>
  );
}
export function RibPoly({ d, body, id, rib = 0.16, dir = 'v' }) {
  return (
    <g>
      <path d={d} fill={body} />
      <path d={d} fill={HEX.black} opacity={rib} />
      <pattern id={`${id}-rib`} width={dir === 'v' ? 3.2 : 100} height={dir === 'v' ? 100 : 3.2} patternUnits="userSpaceOnUse">
        {dir === 'v' ? <rect width="1.1" height="100" fill={HEX.black} opacity="0.32" /> : <rect width="100" height="1.1" fill={HEX.black} opacity="0.32" />}
      </pattern>
      <path d={d} fill={`url(#${id}-rib)`} />
      <path d={d} fill="none" stroke={HEX.black} strokeWidth="0.8" opacity="0.35" />
    </g>
  );
}

// A stitched seam: dashed, with a pale twin beside it so it reads as thread in the fabric.
export function SeamG({ d, tone = HEX.white, o = 0.5, w = 1.1, dash = '4.5 3' }) {
  return (
    <g fill="none">
      <path d={d} stroke={HEX.black} strokeWidth={w} strokeDasharray={dash} opacity="0.28" transform="translate(0.8 0.9)" />
      <path d={d} stroke={tone} strokeWidth={w} strokeDasharray={dash} opacity={o} />
    </g>
  );
}

// The brand artwork of a garment, from a small list so every colourway prints the same artwork.
//   { k: 'mark', x, y, size, fill }  { k: 'word', x, y, size, fill }  { k: 'lattice', cx, cy, kk, rings, fill }
export function ArtG({ items = [], id, clip }) {
  return (
    <g clipPath={clip ? `url(#${clip})` : undefined}>
      {items.map((a, i) => {
        if (a.k === 'mark') return <MarkG key={i} x={a.x} y={a.y} size={a.size} fill={a.fill} />;
        if (a.k === 'word') return <WordmarkG key={i} x={a.x} y={a.y} size={a.size} fill={a.fill} anchor={a.anchor || 'start'} />;
        return <LatticeFieldG key={i} cx={a.cx} cy={a.cy} k={a.kk} rings={a.rings} fill={a.fill} />;
      })}
    </g>
  );
}

// A grommet / eyelet: a metal ring with a dark hole and a catch-light.
export function EyeletG({ idp, cx, cy, r = 4.4 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${idp}-metal)`} stroke={HEX.black} strokeOpacity="0.4" strokeWidth="0.6" />
      <circle cx={cx} cy={cy} r={r * 0.5} fill={HEX.black} opacity="0.85" />
      <circle cx={r2(cx - r * 0.35)} cy={r2(cy - r * 0.4)} r={r * 0.18} fill={HEX.white} opacity="0.9" />
    </g>
  );
}

// Thin hanger: hook and wire shoulders, hung from a rail at (x, y).
export function HangerG({ idp, x, y, w = 150, drop = 34 }) {
  return (
    <g fill="none" stroke={`url(#${idp}-metal)`} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x} ${y + 14}V${y + 4}A7 7 0 1 1 ${x + 7} ${y - 3}`} strokeWidth="2.4" />
      <path d={`M${x} ${y + 14}L${r2(x - w / 2)} ${y + drop}H${r2(x + w / 2)}Z`} strokeWidth="2.2" />
    </g>
  );
}
