'use client';

import { useState } from 'react';
import Reveal from '@/components/site/Reveal';
import { Segmented } from '@/components/ui/Toggle';
import Toggle from '@/components/ui/Toggle';
import { HallDemoArt } from './DcArt';
import s from './lp-data-centers.module.css';

// A working demo: rows of racks light as the visitor picks a count. It illustrates how a hall draws from one node;
// the counts are rows of the drawing, never a capacity.
const OPTIONS = ['None', '1', '2', '3', '4', '5', '6'];

export default function HallDemo() {
  const [pick, setPick] = useState('3');
  const [all, setAll] = useState(false);
  const rows = all ? 6 : pick === 'None' ? 0 : Number(pick);

  return (
    <section className={`${s.demo} field-dark`} aria-labelledby="lp-data-centers-demo-h">
      <div className={s.demoGrid}>
        <div className={s.demoArt}>
          <HallDemoArt rows={rows} />
        </div>
        <div className={s.demoText}>
          <Reveal>
            <p className="t-label">Illustration</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="lp-data-centers-demo-h" className="t-h2">Light a hall, row by row.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-body muted">Choose how many rows join the feed. Every lit row fills with Active Blue and the feed line reaches it. The counts are rows of the drawing; the case study prints no capacity for a single hall.</p>
          </Reveal>
          <Reveal delay={180}>
            <div className={s.control}>
              <p id="lp-data-centers-rows-l">Rows lit</p>
              <Segmented id="lp-data-centers-rows" label="Rows lit" options={OPTIONS} value={all ? '' : pick} onChange={(o) => { setAll(false); setPick(o); }} />
              <Toggle label="Light the whole hall" checked={all} onChange={setAll} />
              <ul className={s.legend} aria-label="Legend">
                <li>
                  <span className={s.swatchOn} aria-hidden="true" />
                  Row lit
                </li>
                <li>
                  <span className={s.swatchOff} aria-hidden="true" />
                  Row waiting
                </li>
              </ul>
              <div className={s.readout} aria-live="polite">
                <span>
                  <strong>{rows}</strong> of 6 rows
                </span>
                <span>{rows === 0 ? 'Dark hall' : rows === 6 ? 'Every row lit' : 'Filling'}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
