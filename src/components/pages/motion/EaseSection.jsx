'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import { NodeG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { EASES, EASE_VALUE, DURS } from './data';
import Curve from './Curve';
import s from './motion.module.css';

// Every shared easing and duration, live: a spec table (token, its curve drawn from the real control points, the
// paired duration as an oversized numeral, a lane with a travelling node) and the duration bars.
export default function EaseSection() {
  const [runs, setRuns] = useState({});
  const [slow, setSlow] = useState(false);
  const [all, setAll] = useState(0);
  const k = slow ? 4 : 1;
  const play = (id) => setRuns((r) => ({ ...r, [id]: (r[id] || 0) + 1 }));
  const playAll = () => {
    setAll((n) => n + 1);
    setRuns((r) => Object.fromEntries(EASES.map((e) => [e.id, (r[e.id] || 0) + 1])));
  };
  return (
    <div className="stack">
      <div className="row" style={{ gap: 20 }}>
        <Button onClick={playAll} variant="active" icon="play" cross={false}>Play all</Button>
        <Toggle label="Slow motion (4 times slower)" checked={slow} onChange={setSlow} />
      </div>
      <div className={`spec-wrap ${s.tableWrap}`}>
        <table className={`spec ${s.easeTable}`}>
          <caption>Easing tokens: curve, paired duration and a live lane</caption>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Curve</th>
              <th scope="col">Duration</th>
              <th scope="col">Lane</th>
              <th scope="col"><span className="sr-only">Play</span></th>
            </tr>
          </thead>
          <tbody>
            {EASES.map((e) => (
              <tr key={e.id}>
                <th scope="row">
                  <code className={s.token}>{e.token}</code>
                  <span className={`t-small muted ${s.block}`}>{EASE_VALUE(e)}</span>
                  <span className={`t-small ${s.block}`}>{e.role}</span>
                </th>
                <td className={s.curveCell}><Curve e={e} run={runs[e.id] || 0} ms={e.dur * k} /></td>
                <td className="spec-num">
                  {e.dur}
                  <span className="spec-unit">ms</span>
                  <span className={`t-small muted ${s.block}`}>{e.durToken}</span>
                </td>
                <td className={s.laneCell}>
                  <div className={s.lane}>
                    <div key={runs[e.id] || 0} className={s.laneRun} style={{ '--ms': `${e.dur * k}ms`, '--ease': `var(--ease-${e.id})` }}>
                      <span className={s.laneNode} />
                    </div>
                  </div>
                </td>
                <td>
                  <Button size="sm" variant="outline" cross={false} icon="play" onClick={() => play(e.id)} aria-label={`Play ${e.token}`}>Play</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Durations run={all} k={k} />
    </div>
  );
}

// The six durations as bars that fill in their own time, plus the stagger across cells. Exportable.
function Durations({ run, k }) {
  const X = 190;
  const W = 400;
  const row = (i) => 34 + i * 34;
  return (
    <div className={s.durWrap}>
      <Art viewBox="0 0 680 310" title="Shared durations as bars, 100 to 1200 ms" exportName="motion-durations" key={run} style={{ '--k': k }}>
        <rect width="680" height="310" fill={HEX.paper} />
        <text x="20" y="22" fontSize="11" fill={HEX.muted}>Bar length is the duration; the scale ends at 1200 ms</text>
        {DURS.map((d, i) => (
          <g key={d.token}>
            <text x="20" y={row(i) + 4} fontSize="12" fill={HEX.darkBlue}>{d.token}</text>
            <rect x={X} y={row(i)} width={W} height="1" fill={HEX.darkBlue} opacity="0.3" />
            <rect x={X} y={row(i) - 7} width={r(W * d.ms / 1200)} height="14" fill={HEX.activeBlue} className={s.durBar} style={{ '--d': `var(${d.token})` }} />
            <text x={X + W + 14} y={row(i) + 4} fontSize="12" fill={HEX.darkBlue}>{d.ms} ms</text>
            <text x={X} y={row(i) + 20} fontSize="9" fill={HEX.muted}>{d.use}</text>
          </g>
        ))}
        <text x="20" y="274" fontSize="12" fill={HEX.darkBlue}>--stagger</text>
        {Array.from({ length: 6 }, (_, i) => (
          <NodeG key={i} cx={X + 6 + i * 13.33} cy={270} s={10} fill={HEX.darkBlue} className="fade-in" style={{ '--i': i }} />
        ))}
        <text x={X + W + 14} y="274" fontSize="12" fill={HEX.darkBlue}>40 ms apart</text>
      </Art>
    </div>
  );
}

const r = (n) => Math.round(n * 100) / 100;
