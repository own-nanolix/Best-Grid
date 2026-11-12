// Shared plate furniture for the event page: one Art SVG per plate on the dark stage (StageG), the material
// defs, the plate frame, and a few small generators (plain bars that encode nothing, quiet pale bars).
import Art from '@/components/art/Art';
import { StageG, MaterialDefs, PlateFrameG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';

export const PID = 'use-event';
export const idOf = (id) => `${PID}-${id}`;

// One plate = one exportable SVG. Children receive nothing: each plate derives its own ids with idOf(id).
export function Plate({ id, title, w, h, spot, floor = null, intensity = 1, no, split, children }) {
  const idp = idOf(id);
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={idp}>
      <StageG idp={`${idp}-st`} w={w} h={h} spot={spot} floor={floor} intensity={intensity} />
      <MaterialDefs idp={idp} />
      <PlateFrameG w={w} h={h} no={no} split={split} />
      {children}
    </Art>
  );
}

// A generic barcode of plain bars: it encodes nothing. Seeded, so server and browser match.
export function BarsG({ x = 0, y = 0, w = 200, h = 60, fill = HEX.activeBlue, seed = 7, ...rest }) {
  const rnd = seeded(seed);
  const out = [];
  let cx = 0;
  while (cx < w - 3) {
    const bw = 1.5 + Math.floor(rnd() * 3) * 1.5;
    if (cx + bw > w) break;
    out.push(<rect key={cx} x={r2(x + cx)} y={y} width={r2(bw)} height={h} fill={fill} />);
    cx += bw + 1.5 + Math.floor(rnd() * 3) * 1.5;
  }
  return <g {...rest}>{out}</g>;
}

// Quiet pale bars standing in for a name, a role, a date or a seat (we invent none).
export function PaleBarsG({ x = 0, y = 0, w = 100, rows = 2, gap = 12, h = 5, fill = HEX.darkBlue, opacity = 0.16, ...rest }) {
  return (
    <g {...rest}>
      {Array.from({ length: rows }, (_, i) => (
        <rect key={i} x={x} y={r2(y + i * gap)} width={r2(i === rows - 1 && rows > 1 ? w * 0.62 : w)} height={h} fill={fill} opacity={opacity} />
      ))}
    </g>
  );
}

// The Spanish lines printed on the artwork sit in a group with lang="es".
export function EsG({ children, ...rest }) {
  return <g lang="es" {...rest}>{children}</g>;
}

// Rounded rectangle path (used for holders and sheets).
export const rrect = (x, y, w, h, r) =>
  `M${r2(x + r)} ${y}H${r2(x + w - r)}A${r} ${r} 0 0 1 ${r2(x + w)} ${r2(y + r)}V${r2(y + h - r)}A${r} ${r} 0 0 1 ${r2(x + w - r)} ${r2(y + h)}H${r2(x + r)}A${r} ${r} 0 0 1 ${x} ${r2(y + h - r)}V${r2(y + r)}A${r} ${r} 0 0 1 ${r2(x + r)} ${y}Z`;
