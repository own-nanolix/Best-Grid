'use client';

import { useState } from 'react';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import Button from '@/components/ui/Button';
import { LINES } from '@/lib/brand';
import { SCALE } from './data';
import s from './typography.module.css';

// A live type tester: set any line in the text or display voice, at any size of the scale or between, with
// tracking, leading and a measure in characters; guides draw the baselines.
const START = { voice: 'Text', weight: 'Regular', size: 44, track: -0.01, lead: 1.12, measure: 26, balance: true, guides: true, text: LINES.web.text };

function Slider({ id, label, min, max, step, value, onChange, unit, digits = 0 }) {
  return (
    <label className={s.slider} htmlFor={id}>
      <span className={s.sliderHead}>
        {label}
        <output htmlFor={id} className="ink">{value.toFixed(digits)}{unit}</output>
      </span>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

export default function Tester() {
  const [v, setV] = useState(START);
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const display = v.voice === 'Display';
  const medium = v.weight !== 'Regular';
  return (
    <div className={s.tester}>
      <div className={s.controls}>
        <div className="row">
          <Segmented id="typography-voice" label="Voice" options={['Text', 'Display']} value={v.voice} onChange={set('voice')} />
          <Segmented id="typography-weight" label="Weight" options={['Regular', 'Medium']} value={v.weight} onChange={set('weight')} />
        </div>
        <div className="row" role="group" aria-label="Sizes of the scale">
          {SCALE.map((r) => (
            <button key={r.px} type="button" className="chip chip-sm" aria-pressed={v.size === r.px} onClick={() => set('size')(r.px)}>
              {r.px}
            </button>
          ))}
        </div>
        <Slider id="typography-size" label="Size" min={11} max={160} step={1} value={v.size} onChange={set('size')} unit=" px" />
        <Slider id="typography-track" label="Tracking" min={-0.05} max={0.05} step={0.005} value={v.track} onChange={set('track')} unit=" em" digits={3} />
        <Slider id="typography-lead" label="Leading" min={0.9} max={1.6} step={0.02} value={v.lead} onChange={set('lead')} digits={2} />
        <Slider id="typography-measure" label="Measure" min={10} max={70} step={1} value={v.measure} onChange={set('measure')} unit=" ch" />
        <Toggle label="Balance the lines" checked={v.balance} onChange={set('balance')} />
        <Toggle label="Baseline guides" checked={v.guides} onChange={set('guides')} />
        <label className={s.area}>
          <span className="t-label">Text to set</span>
          <textarea className="input" rows={3} value={v.text} onChange={(e) => set('text')(e.target.value)} lang="es" />
        </label>
        <Button size="sm" variant="outline" onClick={() => setV(START)}>Reset</Button>
      </div>
      <div className={s.stage}>
        <p
          className={s.sample}
          lang="es"
          style={{
            fontFamily: display ? 'var(--font-display)' : 'var(--font)',
            fontWeight: medium ? 540 : 400,
            fontSize: v.size,
            letterSpacing: `${v.track}em`,
            lineHeight: v.lead,
            maxWidth: `${v.measure}ch`,
            textWrap: v.balance ? 'balance' : 'wrap',
            '--step': `${(v.size * v.lead).toFixed(2)}px`,
            backgroundImage: v.guides ? 'repeating-linear-gradient(to bottom, transparent 0, transparent calc(var(--step) - 1px), var(--rule-soft) calc(var(--step) - 1px), var(--rule-soft) var(--step))' : 'none',
          }}
        >
          {v.text}
        </p>
        <p className={s.readout}>
          {v.size} px, leading {(v.size * v.lead).toFixed(1)} px ({v.lead.toFixed(2)}), {v.voice.toLowerCase()} voice, {v.weight.toLowerCase()}.
        </p>
      </div>
    </div>
  );
}
