'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { MarkG, MARK_D, NodeG } from '@/components/art/Mark';
import { GuidesG } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { CENTRES } from './data';
import s from './logo.module.css';

// The mark drawing on: guide lines extend along the lattice centre lines, nodes snap in at the crossings, the
// outline of the mark draws, then the bars fill. All CSS keyframes (the shared classes); the markup is the finished
// artwork, so the export is the mark on its guides. Replay re-mounts the SVG.
const W = 1200, H = 520, SIZE = 400, X0 = (W - SIZE) / 2, Y0 = (H - SIZE) / 2, K = SIZE / 100;

export default function DrawOn() {
  const [run, setRun] = useState(0);
  const xs = CENTRES.map((u) => r2(X0 + u * K));
  const ys = CENTRES.map((u) => r2(Y0 + u * K));
  const nodes = xs.flatMap((x) => ys.map((y) => [x, y]));
  return (
    <div className={s.drawWrap}>
      <Art key={run} viewBox={`0 0 ${W} ${H}`} title="The mark drawing on over its lattice guides" exportName="logo-draw-on" className={s.plate}>
        <rect width={W} height={H} fill={HEX.darkBlue} />
        <GuidesG w={W} h={H} xs={xs} ys={ys} nodes={[]} stroke={HEX.activeBlue} weight={1} opacity="0.55" animate />
        {nodes.map(([x, y], i) => (
          <NodeG key={`${x}-${y}`} cx={x} cy={y} s={7} fill={HEX.activeBlue} className="snap" style={{ '--i': i }} />
        ))}
        <g transform={`translate(${X0} ${Y0}) scale(${r2(K)})`}>
          <path d={MARK_D} fill="none" stroke={HEX.activeBlue} strokeWidth="0.35" pathLength="1" className="lattice-line" style={{ '--len': 1, '--i': 6 }} />
        </g>
        <MarkG x={X0} y={Y0} size={SIZE} fill={HEX.activeBlue} pathClass="lattice-fill" />
      </Art>
      <div className={s.drawBar}>
        <p className="t-small muted">Lines extend, nodes snap in, the outline draws, the bars fill. It lands on the finished mark.</p>
        <Button variant="dark" onClick={() => setRun((n) => n + 1)} cross>Replay</Button>
      </div>
    </div>
  );
}
