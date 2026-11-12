import Art from '@/components/art/Art';
import { IconArtG } from '@/components/art/KeyArt';
import { UTIL } from '@/components/site/icons';
import { HEX, BUTTONS, CAPACITY, TUBE } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './web-system.module.css';

// Component anatomy drawings: button, chip, row, each drawn at 4 to 6 times with its measurements in CSS pixels.
// The measurements are the values of the shared classes (our production values, not published by the designer).
const INK = HEX.darkBlue;
const BLUE = HEX.activeBlue;

// A dimension line with end ticks; horizontal when y1 === y2, vertical otherwise. The label sits beside it.
function Dim({ x1, y1, x2, y2, label, i = 0, side = 1 }) {
  const horiz = y1 === y2;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return (
    <g className="fade-in" style={{ '--i': i }}>
      <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke={BLUE} strokeWidth={1.5} fill="none" />
      {horiz ? (
        <>
          <path d={`M${x1} ${y1 - 8}v16M${x2} ${y2 - 8}v16`} stroke={BLUE} strokeWidth={1.5} />
          <text x={mx} y={my + 26 * side} textAnchor="middle" fontSize={20} fill={INK}>{label}</text>
        </>
      ) : (
        <>
          <path d={`M${x1 - 8} ${y1}h16M${x2 - 8} ${y2}h16`} stroke={BLUE} strokeWidth={1.5} />
          <text x={mx + 14 * side} y={my + 7} textAnchor={side > 0 ? 'start' : 'end'} fontSize={20} fill={INK}>{label}</text>
        </>
      )}
    </g>
  );
}

function Frame({ w, h }) {
  return (
    <g>
      <rect width={w} height={h} fill={HEX.lightBlue} />
      <rect x={0.5} y={0.5} width={w - 1} height={h - 1} fill="none" stroke={INK} strokeOpacity={0.2} />
    </g>
  );
}

export function ButtonAnatomy() {
  const k = 4, x = 100, y = 110;
  const h = 40 * k, w = 150 * k;
  return (
    <Art viewBox="0 0 800 340" title="Button anatomy with measurements" exportName="web-system-anatomy-button" className={s.anatomy}>
      <Frame w={800} h={340} />
      <rect x={x} y={y} width={w} height={h} fill={HEX.btnFill} />
      <text x={x + 14 * k} y={y + 25 * k} fontSize={13 * k} fill={INK} lang="es">{BUTTONS.evaluate}</text>
      <IconArtG name="crosshair" x={x + w - 12 * k - 16 * k} y={y + 12 * k} size={16 * k} fill={BLUE} />
      <path d={`M${x} ${y - 12}v-10M${x + w} ${y - 12}v-10`} stroke={INK} strokeOpacity={0.4} />
      {/* padding left 14, gap 18, crosshair 16, padding right 12 */}
      <Dim x1={x} y1={y + h + 34} x2={x + 14 * k} y2={y + h + 34} label="14" i={1} />
      <Dim x1={x + w - (12 + 16 + 18) * k} y1={y + h + 34} x2={x + w - (12 + 16) * k} y2={y + h + 34} label="18" i={2} />
      <Dim x1={x + w - 28 * k} y1={y + h + 34} x2={x + w - 12 * k} y2={y + h + 34} label="16" i={3} />
      <Dim x1={x + w - 12 * k} y1={y + h + 34} x2={x + w} y2={y + h + 34} label="12" i={4} />
      <Dim x1={x - 30} y1={y} x2={x - 30} y2={y + h} label="40" i={5} side={-1} />
      <text x={400} y={50} textAnchor="middle" fontSize={22} fill={INK}>Button, square corners, radius 0 (px)</text>
    </Art>
  );
}

export function ChipAnatomy() {
  const k = 6, w = 64 * k, h = 30 * k, x = (800 - w) / 2, y = 90;
  return (
    <Art viewBox="0 0 800 340" title="Year chip anatomy with measurements" exportName="web-system-anatomy-chip" className={s.anatomy}>
      <Frame w={800} h={340} />
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={BLUE} />
      <text x={400} y={y + h / 2 + 22} textAnchor="middle" fontSize={12 * k} fill={INK}>{CAPACITY.year}</text>
      <Dim x1={x} y1={y + h + 40} x2={x + 18 * k} y2={y + h + 40} label="18" i={1} />
      <Dim x1={x + w - 18 * k} y1={y + h + 40} x2={x + w} y2={y + h + 40} label="18" i={2} />
      <Dim x1={x - 40} y1={y} x2={x - 40} y2={y + h} label="30" i={3} side={-1} />
      <path d={`M${x + w + 30} ${y}h-10 M${x + w + 30} ${y + h}h-10`} stroke={BLUE} strokeWidth={1.5} />
      <text x={x + w + 40} y={y + h / 2 + 7} fontSize={20} fill={INK}>radius 15 = height / 2</text>
      <text x={400} y={44} textAnchor="middle" fontSize={22} fill={INK}>Chip, the only pill (px)</text>
    </Art>
  );
}

export function RowAnatomy() {
  const k = 4, x = 60, y = 90, w = 170 * k, h = 56 * k;
  return (
    <Art viewBox="0 0 800 340" title="List row anatomy with measurements" exportName="web-system-anatomy-row" className={s.anatomy}>
      <Frame w={800} h={340} />
      <rect x={x} y={y} width={w} height={0} />
      <rect x={x} y={y} width={w} height={1.5} fill={INK} />
      <rect x={x} y={y + h} width={w} height={1.5} fill={INK} />
      <rect x={x} y={y + 1.5} width={12 * k} height={h - 1.5} fill={BLUE} opacity={0.18} />
      <rect x={x + w - 12 * k} y={y + 1.5} width={12 * k} height={h - 1.5} fill={BLUE} opacity={0.18} />
      <text x={x + 12 * k} y={y + h / 2 + 11} fontSize={16 * k * 0.8} fill={INK} lang="es">{TUBE.services[1]}</text>
      <path d={UTIL['chevron-down']} transform={`translate(${x + w - 12 * k - 48} ${y + h / 2 - 24}) scale(2)`} fill={INK} />
      <Dim x1={x} y1={y + h + 38} x2={x + 12 * k} y2={y + h + 38} label="12" i={1} />
      <Dim x1={x + w - 12 * k} y1={y + h + 38} x2={x + w} y2={y + h + 38} label="12" i={2} />
      <Dim x1={x - 26} y1={y} x2={x - 26} y2={y + h} label="56" i={3} side={-1} />
      <text x={x + w - 12 * k - 24} y={y - 14} textAnchor="end" fontSize={20} fill={INK}>icon 24</text>
      <text x={x} y={y - 14} fontSize={20} fill={INK}>hairline 1</text>
      <text x={400} y={r2(310)} textAnchor="middle" fontSize={22} fill={INK}>Row, minimum height and side padding (px)</text>
    </Art>
  );
}
