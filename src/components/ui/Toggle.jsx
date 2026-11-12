'use client';

import { useRef, useState } from 'react';

// A switch.  <Toggle label="Guides" checked={on} onChange={setOn} />
// Uncontrolled when `checked` is not given (use defaultChecked).
export default function Toggle({ label, checked, defaultChecked = false, onChange, className = '', hideLabel = false, ...rest }) {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const flip = () => {
    if (checked === undefined) setInner(!on);
    if (onChange) onChange(!on);
  };
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={hideLabel ? label : undefined} className={`toggle ${className}`} onClick={flip} {...rest}>
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>
      {!hideLabel && <span>{label}</span>}
    </button>
  );
}

// A two- or three-option switch: buttons in a row, one pressed. Roving focus: only the pressed button is in the tab
// order; Left / Right (and Up / Down) move to the previous / next option, Home / End to the first / last, and the
// option they land on is pressed.
// <Segmented id="dashboard-year" label="Year" options={CAPACITY.years} value={v} onChange={setV} />  (year chips, m17)
export function Segmented({ id, label, options, value, onChange, className = '' }) {
  const [inner, setInner] = useState(options[0]);
  const active = value !== undefined ? value : inner;
  const refs = useRef({});
  const pick = (o, focus) => {
    if (value === undefined) setInner(o);
    if (onChange) onChange(o);
    if (focus && refs.current[o]) refs.current[o].focus();
  };
  const onKey = (e) => {
    const i = Math.max(0, options.indexOf(active));
    let n = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % options.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + options.length) % options.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = options.length - 1;
    if (n < 0) return;
    e.preventDefault();
    pick(options[n], true);
  };
  return (
    <div className={`row ${className}`} role="group" aria-label={label} id={id} style={{ gap: 8 }} onKeyDown={onKey}>
      {options.map((o) => (
        <button key={o} ref={(el) => { refs.current[o] = el; }} type="button" className="chip" aria-pressed={o === active} tabIndex={o === (options.includes(active) ? active : options[0]) ? 0 : -1} onClick={() => pick(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}
