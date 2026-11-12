import Art from '@/components/art/Art';
import { MarkG, MARK, NodeG, LockupCellG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { MIN_SIZES } from './data';
import s from './logo.module.css';

// Clear space is measured in the mark's own grid: two lattice pitches (2 P = 25.7 u) on every side, the width of the
// two rings of the lattice. These rules are ours; the case study does not publish any.
const CLEAR = r2(2 * MARK.P); // 25.7 units

// A dimension arrow-less bracket: a line with end ticks, drawn in pixels.
function Bracket({ x1, y1, x2, y2 }) {
  const h = y1 === y2;
  const t = 7;
  const tick = (x, y) => (h ? `M${x} ${y - t}V${y + t}` : `M${x - t} ${y}H${x + t}`);
  return <path d={`M${x1} ${y1}L${x2} ${y2}${tick(x1, y1)}${tick(x2, y2)}`} fill="none" stroke={HEX.darkBlue} strokeWidth="1.5" />;
}

// The mark with its clear space: the zone, the four corner squares of 2P x 2P, the dimensions.
export function ClearSpaceMark() {
  const S = 280, pad = r2((CLEAR * S) / 100), c = 400;
  const x0 = c - S / 2, y0 = c - S / 2;
  const zx = x0 - pad, zy = y0 - pad, zs = S + 2 * pad;
  const corners = [[zx, zy], [zx + zs - pad, zy], [zx, zy + zs - pad], [zx + zs - pad, zy + zs - pad]];
  return (
    <Art viewBox="0 0 800 800" title="Clear space: two lattice pitches (2 P = 25.7 units) on every side of the mark" exportName="logo-clear-space" className={s.plate}>
      <rect width="800" height="800" fill={HEX.periwinkle} />
      {corners.map(([x, y], i) => (
        <rect key={i} x={r2(x)} y={r2(y)} width={pad} height={pad} fill={HEX.activeBlue} opacity="0.22" className="fill-in" style={{ '--i': i }} />
      ))}
      <rect x={r2(zx)} y={r2(zy)} width={zs} height={zs} fill="none" stroke={HEX.darkBlue} strokeWidth="1.5" />
      <rect x={x0} y={y0} width={S} height={S} fill="none" stroke={HEX.activeBlue} strokeWidth="1.5" strokeDasharray="7 5" />
      <MarkG x={x0} y={y0} size={S} fill={HEX.darkBlue} />
      {corners.map(([x, y], i) => (
        <NodeG key={`n${i}`} cx={r2(x + (i % 2 ? pad : 0))} cy={r2(y + (i > 1 ? pad : 0))} s={9} fill={HEX.darkBlue} className="snap" style={{ '--i': i }} />
      ))}
      <Bracket x1={r2(zx)} y1={r2(c)} x2={r2(x0)} y2={r2(c)} />
      <Bracket x1={r2(c)} y1={r2(zy)} x2={r2(c)} y2={r2(y0)} />
      <text x={r2(zx + pad / 2)} y={r2(c - 16)} fontSize="22" textAnchor="middle" fill={HEX.darkBlue}>2P</text>
      <text x={r2(c + 16)} y={r2(zy + pad / 2 + 7)} fontSize="22" fill={HEX.darkBlue}>2P</text>
      <text x="400" y="760" fontSize="20" textAnchor="middle" fill={HEX.darkBlue}>2P = 25.7 u, with P = 12.85 u</text>
    </Art>
  );
}

// The primary lockup with the same clear space, measured on the mark in its cell.
export function ClearSpaceLockup() {
  const k = 1.2, bw = 640 * k, bh = 160 * k;
  const markPx = 88 * k;
  const pad = r2((CLEAR * markPx) / 100);
  const x = r2((900 - bw) / 2), y = r2((360 - bh) / 2);
  return (
    <Art viewBox="0 0 900 360" title="Clear space around the primary lockup, measured on the mark" exportName="logo-clear-space-lockup" className={s.plate}>
      <rect width="900" height="360" fill={HEX.periwinkle} />
      <rect x={r2(x - pad)} y={r2(y - pad)} width={r2(bw + 2 * pad)} height={r2(bh + 2 * pad)} fill="none" stroke={HEX.darkBlue} strokeWidth="1.5" />
      <rect x={r2(x - pad)} y={r2(y - pad)} width={pad} height={pad} fill={HEX.activeBlue} opacity="0.3" />
      <rect x={r2(x + bw)} y={r2(y + bh)} width={pad} height={pad} fill={HEX.activeBlue} opacity="0.3" />
      <LockupCellG x={x} y={y} scale={k} fill={HEX.darkBlue} line={HEX.darkBlue} />
      <text x="450" y="342" fontSize="17" textAnchor="middle" fill={HEX.darkBlue}>Clear space = 2P of the mark, on all four sides</text>
    </Art>
  );
}

// One minimum-size plate, drawn at its true size: one viewBox unit is one CSS pixel, so the mark measures `px` on
// screen. Around it the clear-space zone (2P on each side, dashed), its corner nodes, then the size and its name.
export function MinPlate({ px, note }) {
  const pad = r2((CLEAR * px) / 100);
  const zone = r2(px + 2 * pad);
  const w = Math.max(zone, 88);
  const h = r2(zone + 44);
  const zx = r2((w - zone) / 2);
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={`Minimum size: mark at ${px} px`} exportName={`logo-min-size-${px}`} className={s.sizeArt} style={{ width: w }}>
      <rect width={w} height={h} fill={HEX.paper} />
      <rect x={zx} y={0} width={zone} height={zone} fill="none" stroke={HEX.activeBlue} strokeWidth="1" strokeDasharray="3 3" />
      {[[zx, 0], [zx + zone, 0], [zx, zone], [zx + zone, zone]].map(([x, y]) => (
        <NodeG key={`${x}-${y}`} cx={r2(x)} cy={r2(y)} s={4} fill={HEX.darkBlue} />
      ))}
      <MarkG x={r2(zx + pad)} y={pad} size={px} fill={HEX.darkBlue} />
      <text x={r2(w / 2)} y={r2(zone + 20)} fontSize="13" textAnchor="middle" fill={HEX.darkBlue}>{px} px</text>
      <text x={r2(w / 2)} y={r2(zone + 37)} fontSize="11" textAnchor="middle" fill={HEX.muted}>{note}</text>
    </Art>
  );
}

export default function ClearSpace() {
  return (
    <div className="stack-lg">
      <div className={s.pair}>
        <Reveal>
          <figure className={s.fig}>
            <ClearSpaceMark />
            <figcaption className={s.cap}><span>Mark</span><span>2P on every side</span></figcaption>
          </figure>
        </Reveal>
        <Reveal delay={80}>
          <figure className={s.fig}>
            <ClearSpaceLockup />
            <figcaption className={s.cap}><span>Lockup</span><span>The same distance, measured on the mark</span></figcaption>
          </figure>
        </Reveal>
      </div>
      <Reveal>
        <div className={`cells ${s.sizes}`} style={{ '--cols': 4, '--line': 'var(--rule)', '--steps': MIN_SIZES.map((m) => `minmax(0, ${m.px}fr)`).join(' ') }}>
          {MIN_SIZES.map((m) => (
            <figure key={m.px} className={s.size}>
              <MinPlate {...m} />
            </figure>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
