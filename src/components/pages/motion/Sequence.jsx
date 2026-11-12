'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { NodeG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import s from './motion.module.css';

// The house sequence as one exportable sheet: lines extend, nodes snap in, cells fill. All shared classes, CSS only;
// the markup is the finished artwork and the keyframes play towards it.
const XS = [20, 180, 340, 500, 660];
const YS = [20, 110, 200];
const LABELS = ['1 Lines extend', '2 Nodes snap in', '3 Cells fill', 'Nothing bounces'];

export default function Sequence() {
  const [run, setRun] = useState(0);
  let line = 0;
  return (
    <figure className={s.fig}>
      <Art viewBox="0 0 680 220" title="The house sequence: guide lines extend, nodes snap in, cells fill" exportName="motion-house-sequence" key={run}>
        <rect width="680" height="220" fill={HEX.paper} />
        {LABELS.map((t, i) => {
          const x = XS[i];
          const tone = i === 2 ? HEX.activeBlue : i % 2 ? HEX.paper : HEX.periwinkle;
          return (
            <g key={t}>
              <rect x={x} y={YS[0]} width="160" height="90" fill={tone} className="fill-in" style={{ '--i': 40 + i }} />
              <rect x={x} y={YS[1]} width="160" height="90" fill={i === 1 ? HEX.periwinkle : HEX.paper} className="fill-in" style={{ '--i': 44 + i }} />
              <text x={x + 14} y={YS[0] + 50} fontSize="13" fill={HEX.darkBlue} className="fade-in" style={{ '--i': 46 + i }}>{t}</text>
            </g>
          );
        })}
        {YS.map((y) => <rect key={`h${y}`} x="20" y={y - 0.75} width="640" height="1.5" fill={HEX.darkBlue} className="extend-x" style={{ '--i': line++ }} />)}
        {XS.map((x) => <rect key={`v${x}`} x={x - 0.75} y="20" width="1.5" height="180" fill={HEX.darkBlue} className="extend-y" style={{ '--i': line++ }} />)}
        {XS.flatMap((x, i) => YS.map((y, j) => (
          <NodeG key={`${x}-${y}`} cx={x} cy={y} s={7} fill={HEX.darkBlue} className="snap" style={{ '--i': 20 + i + j }} />
        )))}
      </Art>
      <figcaption className={s.figRow}>
        <span className="t-small muted">The order every page follows: lines on <code>--ease-line</code>, nodes on <code>--dur-xs</code>, cells on <code>--dur-m</code>, 40 ms apart.</span>
        <Button size="sm" variant="active" icon="play" cross={false} onClick={() => setRun((n) => n + 1)}>Replay sequence</Button>
      </figcaption>
    </figure>
  );
}
