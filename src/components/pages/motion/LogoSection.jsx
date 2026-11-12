'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { Segmented } from '@/components/ui/Toggle';
import { MarkG } from '@/components/art/Mark';
import { MARK_OUTLINE_D, NodeG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { FRAMES, STAGES } from './data';
import { SheetDefsG, StageG, STAGE_W, STAGE_H } from './Posters';
import s from './motion.module.css';

const FRAME_OPTIONS = ['Cycle', ...FRAMES.map((_, i) => String(i + 1))];

// The case study's own animation (m10): a hard-cut cycle of eight frames at 100 ms (--dur-snap, --ease-cut).
// Rebuilt from the stills reference/m10_1 to m10_5 with the shared sheets; then the storyboard and the mark drawing on.
export default function LogoSection() {
  const [run, setRun] = useState(0);
  const [frame, setFrame] = useState('Cycle');
  const [markRun, setMarkRun] = useState(0);
  const cycling = frame === 'Cycle';
  const f = cycling ? 0 : Number(frame) - 1;
  const idp = 'motion-cycle';
  return (
    <div className="stack-lg">
      <div className={s.logoGrid}>
        <div className="stack">
          <div className={s.stage}>
            <Art viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} title="The m10 poster-grid animation: two sheets cutting between layouts every 100 ms" exportName="motion-logo-cycle" key={`${run}-${frame}`}>
              <SheetDefsG idp={idp} />
              <rect width={STAGE_W} height={STAGE_H} fill={HEX.periwinkleMock} />
              {cycling ? (
                <g>
                  {FRAMES.map(([l, rr], i) => (
                    <g key={i} className="cut" style={{ '--f': i }}>
                      <StageG left={l} right={rr} idp={idp} />
                    </g>
                  ))}
                </g>
              ) : (
                <StageG left={FRAMES[f][0]} right={FRAMES[f][1]} idp={idp} />
              )}
            </Art>
          </div>
          <div className="row" style={{ gap: 16 }}>
            <Button variant="active" icon="play" cross={false} onClick={() => { setFrame('Cycle'); setRun((n) => n + 1); }}>Replay</Button>
            <Segmented id="motion-frame" label="Frame" options={FRAME_OPTIONS} value={frame} onChange={setFrame} />
          </div>
          <p className="t-small muted">
            8 frames at 100 ms, looping. Each cut is instant: <code>--ease-cut</code> is <code>steps(1, end)</code>, so there is no fade between frames.
          </p>
        </div>
        <ol className={`stack ${s.stages}`}>
          {STAGES.map((st, i) => (
            <li key={st.frames} className={s.stageItem}>
              <span className={`t-num t-num-s ${s.stageNo}`}>{i + 1}</span>
              <div>
                <p className="t-label">Frames {st.frames} · {st.at}</p>
                <p className="t-body">{st.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Storyboard />

      <div className={s.logoGrid}>
        <div className={s.stage}>
          <MarkDraw run={markRun} />
        </div>
        <div className="stack">
          <h3 className="t-h3">The mark drawing on</h3>
          <p className="t-body">The lattice star is the node of the identity, so the drawing on follows the house order: guide lines extend, the outline draws along them on <code>--ease-line</code> over <code>--dur-draw</code>, nodes snap in, then the lattice fills the star.</p>
          <div><Button variant="outline" icon="play" cross={false} onClick={() => setMarkRun((n) => n + 1)}>Replay</Button></div>
        </div>
      </div>
    </div>
  );
}

// Storyboard: all eight frames of the cycle as one exportable sheet, sampled from the same frame list.
function Storyboard() {
  const k = 200 / STAGE_W;
  const idp = 'motion-board';
  return (
    <figure className={s.fig}>
      <Art viewBox="0 0 880 400" title="Storyboard of the m10 cycle: eight frames, 100 ms each" exportName="motion-logo-storyboard">
        <SheetDefsG idp={idp} />
        <rect width="880" height="400" fill={HEX.paper} />
        {FRAMES.map(([l, rr], i) => {
          const x = 20 + (i % 4) * 215;
          const y = 16 + Math.floor(i / 4) * 192;
          return (
            <g key={i}>
              <g transform={`translate(${x} ${y}) scale(${r2(k)})`}>
                <rect width={STAGE_W} height={STAGE_H} fill={HEX.periwinkleMock} />
                <StageG left={l} right={rr} idp={idp} />
              </g>
              <rect x={x} y={y} width="200" height="150" fill="none" stroke={HEX.darkBlue} strokeWidth="0.8" />
              <NodeG cx={x} cy={y} s={6} fill={HEX.darkBlue} />
              <text x={x} y={y + 168} fontSize="12" fill={HEX.darkBlue}>Frame {i + 1}</text>
              <text x={x + 200} y={y + 168} fontSize="12" textAnchor="end" fill={HEX.muted}>{i * 100} ms</text>
            </g>
          );
        })}
      </Art>
      <figcaption className="t-small muted">Storyboard: the eight frames of the cycle, hard cuts at 100 ms. Sheet copy is the designer&apos;s Spanish, unchanged.</figcaption>
    </figure>
  );
}

// The mark drawing on, on Dark Blue: guide lines extend, outline draws, nodes snap, the lattice fills.
function MarkDraw({ run }) {
  const L = [60, 300];
  return (
    <Art viewBox="0 0 360 360" title="The lattice star drawing on: guides, outline, nodes, lattice" exportName="motion-mark-draw" key={run}>
      <rect width="360" height="360" fill={HEX.darkBlue} />
      {L.map((v, i) => (
        <g key={v}>
          <rect x="0" y={v - 0.5} width="360" height="1" fill={HEX.activeBlue} opacity="0.7" className="extend-x" style={{ '--i': i }} />
          <rect x={v - 0.5} y="0" width="1" height="360" fill={HEX.activeBlue} opacity="0.7" className="extend-y" style={{ '--i': i + 2 }} />
        </g>
      ))}
      <g transform="translate(60 60) scale(2.4)">
        <path d={MARK_OUTLINE_D} pathLength="1" fill="none" stroke={HEX.activeBlue} strokeWidth="0.7" className="lattice-line" style={{ '--len': 1 }} />
      </g>
      <MarkG x={60} y={60} size={240} fill={HEX.activeBlue} pathClass="lattice-fill" />
      {L.flatMap((x) => L.map((y) => (
        <NodeG key={`${x}${y}`} cx={x} cy={y} s={8} fill={HEX.activeBlue} className="snap" style={{ '--i': 14 }} />
      )))}
    </Art>
  );
}
