'use client';

import { useState } from 'react';
import Reveal from '@/components/site/Reveal';
import { Segmented } from '@/components/ui/Toggle';
import { ChargeArt } from './StorageArt';
import s from './lp-storage.module.css';

// A working demo: module cells fill as the visitor moves the control. It is an illustration of how a bank fills on
// the grid: the counts are cells of the drawing, never a capacity.
const TOTAL = 32;
const STEPS = ['Empty', 'Quarter', 'Half', 'Full'];
const AT = { Empty: 0, Quarter: 8, Half: 16, Full: 32 };

export default function ChargeDemo() {
  const [lit, setLit] = useState(12);
  const step = Object.keys(AT).find((k) => AT[k] === lit) || null;

  return (
    <section className={`${s.demo} field-dark`} aria-labelledby="lp-storage-demo-h">
      <div className={s.demoGrid}>
        <div className={s.demoText}>
          <Reveal>
            <p className="t-label">Illustration</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="lp-storage-demo-h" className="t-h2">Fill a bank, cell by cell.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-body muted">Move the control. Each module cell that joins the grid fills in Active Blue. The numbers count cells of the drawing only; the case study prints no capacity for a single bank.</p>
          </Reveal>
          <Reveal delay={180}>
            <div className={s.control}>
              <label htmlFor="lp-storage-charge">Modules lit</label>
              <input
                id="lp-storage-charge"
                className={s.range}
                type="range"
                min={0}
                max={TOTAL}
                step={1}
                value={lit}
                onChange={(e) => setLit(Number(e.target.value))}
                aria-valuetext={`${lit} of ${TOTAL} module cells`}
              />
              <div className={s.readout} aria-live="polite">
                <span>
                  <strong>{lit}</strong> of {TOTAL} cells
                </span>
                <span>{lit === 0 ? 'Empty grid' : lit === TOTAL ? 'Every cell lit' : 'Filling'}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <ul className={s.legend} aria-label="Legend">
              <li>
                <span className={s.swatchOn} aria-hidden="true" />
                Cell lit
              </li>
              <li>
                <span className={s.swatchOff} aria-hidden="true" />
                Cell waiting
              </li>
            </ul>
          </Reveal>
          <Reveal delay={220}>
            <div className={s.steps}>
              <Segmented id="lp-storage-steps" label="Jump to a state" options={STEPS} value={step || ''} onChange={(o) => setLit(AT[o])} />
            </div>
          </Reveal>
        </div>
        <div className={s.demoArt}>
          <ChargeArt lit={lit} />
        </div>
      </div>
    </section>
  );
}
