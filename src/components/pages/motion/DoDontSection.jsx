'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Card';
import s from './motion.module.css';

// Do / don't pairs, shown live. Every "don't" is still built with transform and opacity and shared tokens: only
// its easing, distance or shape of motion is wrong, and it is labelled as such.
const PAIRS = [
  {
    id: 'enter',
    title: 'Easing of an entrance',
    do: { cls: 'doEnter', code: '--ease-out, --dur-m', note: 'Content arrives fast and settles slowly into its cell.' },
    dont: { cls: 'dontEnter', code: '--ease-linear, --dur-m', note: 'Linear on an entrance moves at one dead speed and stops hard. Linear is for loaders only.' },
    demo: 'card',
  },
  {
    id: 'line',
    title: 'A guide line drawing on',
    do: { cls: 'doLine', code: '--ease-line, --dur-draw', note: 'The line leaves slowly, carries on, and lands softly.' },
    dont: { cls: 'dontLine', code: '--ease-cut, --dur-draw', note: 'A hard cut belongs to the m10 frames. On a line it shows nothing, then everything.' },
    demo: 'line',
  },
  {
    id: 'distance',
    title: 'Distance travelled',
    do: { cls: 'doDist', code: '16 px, --dur-m', note: 'A short rise reads as settling. 16 px is the site standard.' },
    dont: { cls: 'dontDist', code: '96 px, --dur-draw', note: 'Content flies in from far away and the page feels slow.' },
    demo: 'card',
  },
  {
    id: 'node',
    title: 'A node snapping in',
    do: { cls: 'doNode', code: 'scale 0.3 to 1, --ease-out, --dur-xs', note: 'The node lands on the crossing and stays there.' },
    dont: { cls: 'dontNode', code: 'scale 0.3 to 1.35 to 1, --dur-m', note: 'Overshoot makes the node bounce. Nothing in this system bounces.' },
    demo: 'node',
  },
];

function Stage({ kind, cls, run }) {
  const c = s[cls];
  if (kind === 'line') {
    return (
      <div className={s.dStage}>
        <div key={run} className={`${s.dLine} ${c}`} />
      </div>
    );
  }
  if (kind === 'node') {
    return (
      <div className={s.dStage}>
        <span className={s.dGuide} aria-hidden="true" />
        <span key={run} className={`${s.dNode} ${c}`} />
      </div>
    );
  }
  return (
    <div className={s.dStage}>
      <div key={run} className={`${s.dCard} ${c}`}>
        <Placeholder width={7} />
        <Placeholder width={10} />
      </div>
    </div>
  );
}

export default function DoDontSection() {
  const [run, setRun] = useState(0);
  return (
    <div className="stack">
      <div><Button variant="active" icon="play" cross={false} onClick={() => setRun((n) => n + 1)}>Play all pairs</Button></div>
      {PAIRS.map((p) => (
        <div key={p.id} className={s.cmpWrap}>
          <h3 className="t-h3">{p.title}</h3>
          <div className={s.cmp}>
            <span className={s.cmpNode} aria-hidden="true" />
            <div className={s.half}>
              <span className="chip chip-sm chip-active">Do</span>
              <Stage kind={p.demo} cls={p.do.cls} run={run} />
              <p className="t-small"><code>{p.do.code}</code></p>
              <p className="t-small muted">{p.do.note}</p>
            </div>
            <div className={`${s.half} ${s.halfDont}`}>
              <span className="chip chip-sm chip-dark">Don&apos;t</span>
              <Stage kind={p.demo} cls={p.dont.cls} run={run} />
              <p className="t-small"><code>{p.dont.code}</code></p>
              <p className="t-small muted">{p.dont.note}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
