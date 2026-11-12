'use client';

import { useState } from 'react';
import { LINES } from '@/lib/brand';
import CopyValue from '@/components/site/CopyValue';
import { TESTER, ratio, ratioText, grade } from './data';
import s from './color.module.css';

// A live pairing tester: pick a type colour and a ground, read the computed ratio and what it allows.
function Pick({ id, label, value, onChange }) {
  return (
    <fieldset className={s.pick}>
      <legend className="t-label">{label}</legend>
      <div className="row" role="group" aria-label={label} id={id}>
        {TESTER.map(([name, hex], i) => (
          <button key={name} type="button" className={`chip ${s.swChip}`} aria-pressed={i === value} onClick={() => onChange(i)}>
            <span className={s.sw} style={{ background: hex }} aria-hidden="true" />
            {name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function Tester() {
  const [fg, setFg] = useState(0);
  const [bg, setBg] = useState(2);
  const [f, g] = [TESTER[fg], TESTER[bg]];
  const r = ratio(f[1], g[1]);
  const checks = [
    ['Small text', 4.5],
    ['Large text', 3],
    ['Interface part', 3],
    ['Enhanced small text', 7],
  ];
  return (
    <div className={s.tester}>
      <div className={s.testerControls}>
        <Pick id="color-test-fg" label="Type colour" value={fg} onChange={setFg} />
        <Pick id="color-test-bg" label="Ground" value={bg} onChange={setBg} />
      </div>
      <div className={s.testerStage} style={{ background: g[1], color: f[1] }}>
        <p className="t-h1" lang="es">{LINES.hero.rows[0]}</p>
        <p className="t-lead" lang="es">{LINES.hero.rows[1]}</p>
        <p className="t-small" lang="es">{LINES.report.rows.join(' ')}</p>
        <p className="t-micro" lang="es">{LINES.tube.text}</p>
      </div>
      <div className={s.testerRead}>
        <span className="t-num t-num-m" aria-live="polite">{ratioText(r)}</span>
        <p className="t-small muted">
          {f[0]} on {g[0]}: {grade(r)}. <CopyValue value={f[1]} label={`${f[0]} hex`} /> on <CopyValue value={g[1]} label={`${g[0]} hex`} />
        </p>
        <ul className={s.checks}>
          {checks.map(([name, min]) => (
            <li key={name} data-pass={r >= min}>
              <span className={s.mark} aria-hidden="true" />
              {name} {min}:1 {r >= min ? 'passes' : 'does not pass'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
