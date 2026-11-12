'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import Icon, { PixelIcon } from '@/components/site/Icon';
import { TECH, TUBE } from '@/lib/brand';
import { clamp } from '@/lib/site';
import { Bar, radioKeys, useSheetDrag } from './kit';
import { TABS } from './ScreensA';
import { PATTERNS } from './Stage';
import s from './mobile-b.module.css';
function Pattern({ n, how, caption, children }) {
  return (
    <li className={s.pattern} id={`mobile-b-pat-${n}`}>
      <div>
        <p className={s.patNum} aria-hidden="true">{String(n).padStart(2, '0')}</p>
        <h3 className="t-h3" style={{ margin: '10px 0 8px' }}>{PATTERNS[n - 1]}</h3>
        <p className="t-body muted" style={{ maxWidth: '38ch' }}>{how}</p>
      </div>
      <div>
        {children}
        <p className={s.demoCap} role="status" aria-live="polite">{caption}</p>
      </div>
    </li>
  );
}
function Pull() {
  const [dy, setDy] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [runs, setRuns] = useState(0);
  const from = useRef(null);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const refresh = () => {
    if (phase === 'loading') return;
    setPhase('loading');
    setDy(52);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPhase('idle');
      setDy(0);
      setRuns((v) => v + 1);
    }, 900);
  };
  const end = () => {
    if (from.current === null) return;
    from.current = null;
    if (dy >= 52) refresh();
    else { setDy(0); setPhase('idle'); }
  };
  return (
    <>
      <div
        className={s.demo}
        role="group"
        aria-label="Pull to refresh demo"
        onPointerDown={(e) => { if (phase !== 'loading') from.current = e.clientY; }}
        onPointerMove={(e) => {
          if (from.current === null) return;
          const d = e.clientY - from.current;
          if (d > 6) e.currentTarget.setPointerCapture(e.pointerId);
          setDy(clamp(d * 0.6, 0, 90));
          setPhase('pulling');
        }}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <div className={s.pullList} data-drag={phase === 'pulling'} style={{ transform: `translateY(${dy}px)` }}>
          <div className={s.pull} style={{ marginTop: -44 }} aria-hidden="true">
            <span className={phase === 'loading' ? s.pending : undefined} style={{ display: 'grid', transform: phase === 'pulling' ? `rotate(${dy * 3}deg)` : undefined }}>
              <Icon name="chevron-down" size={22} />
            </span>
          </div>
          <ul className={s.list} key={runs} style={{ margin: 16 }}>
            {[70, 54, 62, 48, 66, 40].map((w) => (
              <li key={w} className={`${s.item} ${s.fade}`}><div className={s.grow}><Bar w={w} /><Bar w={w - 24} /></div></li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ marginTop: 12 }}><Button size="sm" variant="outline" onClick={refresh} disabled={phase === 'loading'}>Refresh</Button></div>
    </>
  );
}
function Swipe() {
  const [i, setI] = useState(0);
  const [dx, setDx] = useState(0);
  const from = useRef(null);
  const go = (n) => setI(clamp(n, 0, TECH.length - 1));
  const end = () => {
    if (from.current === null) return;
    from.current = null;
    if (dx < -60) go(i + 1);
    else if (dx > 60) go(i - 1);
    setDx(0);
  };
  return (
    <>
      <div
        className={s.demo}
        role="group"
        aria-label="Swipe demo"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
        }}
        onPointerDown={(e) => { if (!e.target.closest('button')) from.current = e.clientX; }}
        onPointerMove={(e) => {
          if (from.current === null) return;
          const d = e.clientX - from.current;
          if (Math.abs(d) > 6) e.currentTarget.setPointerCapture(e.pointerId);
          setDx(d);
        }}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <div className={s.panes} data-drag={dx !== 0} style={{ transform: `translateX(calc(${-i * 100}% + ${dx}px))` }}>
          {TECH.map((t) => (
            <div key={t.key} className={s.paneCell} aria-hidden={t.key !== TECH[i].key}>
              <PixelIcon name={t.icon} size={64} />
              <span lang="es" className="t-h3">{t.label}</span>
              <span lang="es" className={s.num}>{t.value}</span>
            </div>
          ))}
        </div>
        <div className={s.dots}>
          {TECH.map((t, n) => (
            <button key={t.key} type="button" className={s.dot} aria-label={`Screen ${n + 1}`} aria-current={n === i ? 'true' : undefined} onClick={() => go(n)} />
          ))}
        </div>
      </div>
      <div className="row" style={{ marginTop: 12, gap: 8 }}>
        <Button size="sm" variant="outline" icon="chevron-left" label="Previous screen" cross={false} disabled={i === 0} onClick={() => go(i - 1)} />
        <Button size="sm" variant="outline" icon="chevron-right" label="Next screen" cross={false} disabled={i === TECH.length - 1} onClick={() => go(i + 1)} />
      </div>
    </>
  );
}
function Expand() {
  const [open, setOpen] = useState([0]);
  const flip = (i) => setOpen((a) => (a.includes(i) ? a.filter((x) => x !== i) : [...a, i]));
  return (
    <div className={s.demo}>
      <div style={{ padding: 16 }}>
        {TECH.map((t, i) => {
          const on = open.includes(i);
          return (
            <div key={t.key} className={s.list} style={{ borderTop: i ? 0 : undefined }}>
              <button type="button" className={s.rowBtn} aria-expanded={on} aria-controls={`mobile-b-exp-${i}`} onClick={() => flip(i)}>
                <PixelIcon name={t.icon} size={28} />
                <span style={{ flex: 1 }} lang="es">{t.label}</span>
                <Icon name="chevron-down" size={20} style={{ transform: on ? 'rotate(180deg)' : undefined, transition: 'transform var(--dur-m) var(--ease-move)' }} />
              </button>
              <div id={`mobile-b-exp-${i}`} className={s.accPanel} data-open={on} role="region" aria-label={`${t.label} details`}>
                <div>
                  <div style={{ padding: '12px 4px 16px', display: 'grid', gap: 8 }}>
                    <span lang="es" className={s.val}>{t.value}</span>
                    <Bar w={80} /><Bar w={56} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function SheetDemo() {
  const [open, setOpen] = useState(false);
  const { grip, sheetStyle } = useSheetDrag(() => setOpen(false));
  const trigger = useRef(null);
  const closeBtn = useRef(null);
  const was = useRef(false);
  useEffect(() => {
    if (open) {
      was.current = true;
      closeBtn.current?.focus();
    } else if (was.current) {
      was.current = false;
      trigger.current?.focus();
    }
  }, [open]);
  return (
    <div className={s.demo} onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}>
      <div style={{ padding: 16, display: 'grid', gap: 12 }}>
        <Bar w={76} /><Bar w={58} /><Bar w={66} />
        <div><Button ref={trigger} size="sm" variant="active" aria-expanded={open} onClick={() => setOpen(true)}>Open sheet</Button></div>
      </div>
      <div className={s.dim} data-open={open} onClick={() => setOpen(false)} aria-hidden="true" />
      <div
        className={s.sheet}
        data-open={open}
        role="dialog"
        aria-label="Sheet demo"
        inert={!open}
        style={sheetStyle}
      >
        <button type="button" className={s.grip} aria-label="Drag down or press to close" {...grip} />
        <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}><Bar w={70} /><Bar w={48} /><Bar w={60} /></div>
        <Button ref={closeBtn} size="sm" variant="outline" onClick={() => setOpen(false)}>Close</Button>
      </div>
    </div>
  );
}
function TabChange() {
  const [i, setI] = useState(0);
  const refs = useRef([]);
  return (
    <div className={s.demo}>
      <div style={{ padding: 16, display: 'grid', gap: 12 }}>
        <p className="t-h3" aria-live="polite">{TABS[i].label}</p>
        <Bar w={72} /><Bar w={50} /><Bar w={64} />
      </div>
      <div className={s.tabbar} role="tablist" aria-label="Tab change demo" onKeyDown={(e) => radioKeys(e, TABS.length, i, setI, refs)}>
        <i className={s.tabInd} style={{ transform: `translateX(${i * 100}%)` }} />
        {TABS.map((t, n) => (
          <button
            key={t.key}
            ref={(el) => { refs.current[n] = el; }}
            type="button"
            role="tab"
            aria-selected={n === i}
            tabIndex={n === i ? 0 : -1}
            className={s.tb}
            style={n === i ? { color: 'var(--dark-blue)' } : undefined}
            onClick={() => setI(n)}
          >
            <Icon name={t.icon} size={22} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
function Stepper() {
  const [i, setI] = useState(0);
  const names = TUBE.services;
  return (
    <>
      <div className={s.demo} style={{ height: 300 }}>
        <div style={{ padding: 20 }}>
          <div className={s.steps} role="list" aria-label="Steps">
            <i className={s.stepTrack} />
            <i className={s.stepFill} style={{ transform: `scaleX(${i / (names.length - 1)})` }} />
            {names.map((n, k) => (
              <div key={n} role="listitem" className={s.stepDot} data-on={k <= i} aria-current={k === i ? 'step' : undefined}>
                <i />
                <span>Step {k + 1}</span>
              </div>
            ))}
          </div>
          <p key={i} lang="es" className={`t-h3 ${s.fade}`} style={{ margin: '0 0 14px' }}>{names[i]}</p>
          <div style={{ display: 'grid', gap: 10 }}><Bar w={80} /><Bar w={60} /></div>
        </div>
      </div>
      <div className="row" style={{ marginTop: 12, gap: 8 }}>
        <Button size="sm" variant="outline" cross={false} disabled={i === 0} onClick={() => setI(i - 1)}>Back</Button>
        <Button size="sm" variant="active" disabled={i === names.length - 1} onClick={() => setI(i + 1)}>Next</Button>
      </div>
    </>
  );
}
function LongPress() {
  const [on, setOn] = useState(false);
  const [holding, setHolding] = useState(false);
  const timer = useRef(0);
  const t = TECH[3];
  useEffect(() => () => clearTimeout(timer.current), []);
  const stop = () => { clearTimeout(timer.current); setHolding(false); };
  const down = () => {
    setHolding(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setOn((v) => !v); setHolding(false); }, 700);
  };
  return (
    <>
      <div className={s.demo} style={{ height: 240 }}>
        <div style={{ padding: 20, display: 'grid', gap: 14 }}>
          <button
            type="button"
            className={s.hold}
            data-on={on}
            data-holding={holding}
            aria-pressed={on}
            onPointerDown={down}
            onPointerUp={stop}
            onPointerLeave={stop}
            onPointerCancel={stop}
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => { if (e.detail === 0) setOn((v) => !v); }}
          >
            <PixelIcon name={t.icon} size={32} />
            <span lang="es" style={{ display: 'block', marginTop: 8 }}>{t.label}</span>
            <span lang="es" className={s.val}>{t.value}</span>
            <i className={s.holdFill} />
          </button>
          <Toggle label="Pinned" checked={on} onChange={setOn} />
        </div>
      </div>
    </>
  );
}
export default function Patterns() {
  return (
    <section className="wrap band" aria-labelledby="mobile-b-patterns-h">
      <h2 id="mobile-b-patterns-h" className="t-h2" style={{ marginBottom: 28 }}>Seven interaction patterns.</h2>
      <ol className={s.patterns}>
        <Pattern n={1} how="Drag the list down past the threshold, or press Refresh. The indicator turns, the list settles back." caption="Drag down or press Refresh."><Pull /></Pattern>
        <Pattern n={2} how="Drag sideways, use Left and Right, the dots or the buttons. The panes slide on one move curve." caption="One technology per pane."><Swipe /></Pattern>
        <Pattern n={3} how="Each row opens and closes on its own; the chevron turns with it." caption="Several rows can stay open."><Expand /></Pattern>
        <Pattern n={4} how="The sheet rises from the bottom with its drag handle. Escape, the handle dragged down or Close dismiss it." caption="Focus moves in and returns."><SheetDemo /></Pattern>
        <Pattern n={5} how="The indicator slides to the chosen tab. Arrow keys move between tabs." caption="Left and Right between tabs."><TabChange /></Pattern>
        <Pattern n={6} how="A line fills along the steps; Back and Next move one step." caption="Three steps."><Stepper /></Pattern>
        <Pattern n={7} how="Hold the tile for 0.7 seconds to pin it, press Enter, or use the switch. All three change the same state." caption="Release early to cancel."><LongPress /></Pattern>
      </ol>
    </section>
  );
}
