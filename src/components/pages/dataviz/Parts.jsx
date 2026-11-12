'use client';

import { useState } from 'react';
import CountUp from '@/components/site/CountUp';
import Tabs from '@/components/ui/Tabs';
import { CAPACITY } from '@/lib/brand';
import { es } from '@/lib/charts';
import { Q, AXIS_MAX, KPIS, BLUE, INK } from './data';
import { Legend } from './kit';
import s from './dataviz.module.css';

// Two live counters: they count up once on entering view and land on the printed values.
export function Counters() {
  return (
    <div className={s.counters}>
      <div>
        <p className="t-label" lang="es">{CAPACITY.totalLabel}</p>
        <CountUp value={CAPACITY.totalValue} lang="es" className={`t-num t-num-s ${s.counter}`} />
      </div>
      <div>
        <p className="t-label" lang="es">{KPIS[2].label}</p>
        <CountUp value={String(KPIS[2].value)} lang="es" className={`t-num t-num-s ${s.counter}`} />
      </div>
    </div>
  );
}

// Tabs: the same quarters seen as bars, as a list and as a source note.
function QuarterBars() {
  return (
    <ul className={s.miniBars}>
      {Q.map((q, i) => (
        <li key={q.q} className="t-small">
          <span>{q.q}</span>
          <span className={s.miniTrack}><span className={`${s.miniFill} grow-x`} style={{ width: `${(q.mw / AXIS_MAX) * 100}%`, '--i': i }} /></span>
          <span lang="es">{q.value}</span>
        </li>
      ))}
    </ul>
  );
}

function QuarterList() {
  return (
    <dl className="specs" style={{ '--cols': 4 }}>
      {Q.map((q) => (
        <div key={q.q}>
          <dt>{q.q}</dt>
          <dd lang="es" className="t-num t-num-s">{es(q.mw)}</dd>
        </div>
      ))}
    </dl>
  );
}

// Loading, empty and error states: one panel each; "Try again" shows the loader for a moment, then the empty state.
function States() {
  const [err, setErr] = useState(true);
  const [busy, setBusy] = useState(false);
  const retry = () => {
    setBusy(true);
    setTimeout(() => { setBusy(false); setErr(false); }, 1400);
  };
  return (
    <div className={s.states}>
      <div className={s.state} role="status" aria-label="Loading state">
        <h4 className="t-label">Loading</h4>
        <div className={s.skelRows} aria-hidden="true">
          <span className="skeleton" style={{ width: '70%' }} />
          <span className="skeleton" style={{ width: '90%' }} />
          <span className="skeleton" style={{ width: '45%' }} />
        </div>
        <span className={s.loaderRow} aria-hidden="true">
          {[0, 1, 2, 3].map((i) => <span key={i} className="loader-node" style={{ '--i': i }} />)}
        </span>
      </div>
      <div className={s.state}>
        <h4 className="t-label">Empty</h4>
        <div className={s.phRows} aria-hidden="true">
          {[40, 70, 55, 85].map((w, i) => <span key={i} className="ph" style={{ width: `${w}%` }} />)}
        </div>
        <p className="t-small muted">No figures are published for 2023 or 2024, so those charts stay empty.</p>
      </div>
      <div className={s.state}>
        <h4 className="t-label">Error</h4>
        {busy ? (
          <span className={s.loaderRow} aria-hidden="true">{[0, 1, 2, 3].map((i) => <span key={i} className="loader-node" style={{ '--i': i }} />)}</span>
        ) : err ? (
          <>
            <p className={`t-small ${s.errText}`} role="alert">The chart could not be drawn.</p>
            <p className="t-small muted">Nothing is invented to fill the gap.</p>
            <button type="button" className="btn btn-sm" onClick={retry}>Try again<span className="btn-x" aria-hidden="true" /></button>
          </>
        ) : (
          <p className="t-small muted">Nothing to show: the data source is empty.</p>
        )}
      </div>
    </div>
  );
}

export default function Parts() {
  return (
    <div className={s.parts}>
      <div className={s.part}>
        <h3 className="t-h3">Legend</h3>
        <Legend items={[{ label: 'Current series', color: BLUE }, { label: 'Context series', color: INK }, { label: 'No figure published', color: INK, opacity: 0.12 }]} />
        <p className="t-small muted">Square swatches, English words, Spanish brand labels keep their own language.</p>
      </div>
      <div className={s.part}>
        <h3 className="t-h3">Tooltip</h3>
        <div className={s.tipDemo}>
          <span className={s.tipStatic}>Q3: <span lang="es">{Q[2].value}</span></span>
        </div>
        <p className="t-small muted">Shown on hover and on keyboard focus; it never covers the mark it names.</p>
      </div>
      <div className={`${s.part} ${s.partWide}`}>
        <h3 className="t-h3">Tabs</h3>
        <Tabs
          id="dataviz-view"
          label="Quarter views"
          tabs={[
            { id: 'bars', label: 'Bars', content: <QuarterBars /> },
            { id: 'list', label: 'Figures', content: <QuarterList /> },
            { id: 'source', label: 'Source', content: <p className="t-small muted">Printed on the phone dashboard: Q1 to Q4 and the axis from 1.000 to 7.000 MW.</p> },
          ]}
        />
      </div>
      <div className={`${s.part} ${s.partFull}`}>
        <h3 className="t-h3">Loading, empty and error</h3>
        <States />
      </div>
    </div>
  );
}
