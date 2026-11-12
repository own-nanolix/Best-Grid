// The rolled connection-study drawing, drawn in the lattice language: guide hairlines, square nodes, a single-line
// diagram, a lattice study and a title block. No names, places or figures of its own: the title block carries only the
// printed project line, date, mark and web address of the tube label.
import { r2 } from '@/lib/charts';
import { HEX, TUBE } from '@/lib/brand';
import { MarkG } from '@/components/art/Mark';
import { LatticeFieldG } from '@/components/art/KeyArt';

export const DRAWING = { w: 760, h: 540 };

const seq = (n, step, from = step) => Array.from({ length: n }, (_, i) => from + i * step);

export function DrawingG({ idp, flat = false }) {
  const { w, h } = DRAWING, ink = HEX.darkBlue, bl = HEX.activeBlue;
  const gx = seq(18, 40), gy = seq(12, 40), tb = h - 120;
  const feeders = [120, 200, 280, 360, 440, 520];
  return (
    <g>
      <clipPath id={`${idp}-sheet`}><rect x="24" y="24" width={w - 48} height={h - 48} /></clipPath>
      <rect width={w} height={h} fill={`url(#${idp}-paper)`} filter={`url(#${idp}-fibre)`} />
      <path d={gx.map((x) => `M${x} 24V${h - 24}`).join('') + gy.map((y) => `M24 ${y}H${w - 24}`).join('')} stroke={bl} strokeWidth="0.6" opacity="0.32" fill="none" />
      {gx.filter((_, i) => i % 3 === 2).flatMap((x) => gy.filter((_, j) => j % 3 === 2).map((y) => (
        <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" fill={ink} opacity="0.85" />
      )))}
      <rect x="24" y="24" width={w - 48} height={h - 48} fill="none" stroke={ink} strokeWidth="1" />
      <g clipPath={`url(#${idp}-sheet)`}>
        <LatticeFieldG cx={622} cy={190} k={1.8} rings={3} fill={bl} opacity="0.9" className={flat ? undefined : 'lattice-fill'} />
        <path d="M80 160H520" stroke={ink} strokeWidth="5" className={flat ? undefined : 'draw'} style={{ '--len': 440 }} />
        {feeders.map((x, i) => (
          <g key={x}>
            <path d={`M${x} 160V300`} stroke={ink} strokeWidth="1.8" className={flat ? undefined : 'draw'} style={{ '--len': 140, '--i': i + 2 }} />
            <rect x={x - 6} y="206" width="12" height="12" fill={`url(#${idp}-paper)`} stroke={ink} strokeWidth="1.6" />
            <rect x={x - 5} y="295" width="10" height="10" fill={ink} />
          </g>
        ))}
        <path d="M120 300H200V372H360V300H520" fill="none" stroke={bl} strokeWidth="2.6" className={flat ? undefined : 'draw'} style={{ '--len': 520, '--i': 8 }} />
        {[[200, 372], [360, 372]].map(([x, y]) => <rect key={x} x={x - 5} y={y - 5} width="10" height="10" fill={bl} />)}
        {[0, 1, 2].map((i) => <rect key={i} x={120 + i * 80} y="400" width="40" height="40" fill={bl} opacity={r2(0.35 + i * 0.25)} />)}
        <path d={`M24 ${tb}H${w - 24}M130 ${tb}V${h - 24}M330 ${tb}V${h - 24}M540 ${tb}V${h - 24}`} stroke={ink} strokeWidth="0.9" fill="none" />
        {[130, 330, 540].map((x) => <rect key={x} x={x - 3} y={tb - 3} width="6" height="6" fill={ink} />)}
        <rect x="25" y={tb + 1} width={w - 50} height={h - 25 - tb - 1} fill={`url(#${idp}-paper)`} opacity="0.9" />
        <MarkG x={49} y={tb + 19} size={56} fill={ink} />
        <g lang="es" fontSize="17" fill={ink}>
          <text x="148" y={tb + 44}>{TUBE.project}</text>
          <text x="148" y={tb + 74}>{TUBE.date}</text>
        </g>
        {[[96, 140], [96 + 24, 100], [96 + 48, 120]].map(([y, bw], i) => <rect key={y} x="352" y={tb + 18 + i * 24} width={bw} height="10" fill={ink} opacity="0.1" />)}
        <text x="548" y={tb + 58} fontSize="15" fill={HEX.blueInk} lang="es">{TUBE.web}</text>
      </g>
    </g>
  );
}
