'use client';

import { useState } from 'react';
import Reveal from '@/components/site/Reveal';
import Button from '@/components/ui/Button';
import { LINES } from '@/lib/brand';
import { BankRowArt, BANKS, PER_BANK } from './StorageArt';
import s from './lp-storage.module.css';

// A working demo on the light ground: eight banks of eight module cells on one busbar. The visitor fills the row
// with the slider or a bank at a time with the two buttons; cells fill bank by bank, from the bottom of each bank.
// It is an illustration: the counts are cells of the drawing, never a capacity.
const TOTAL = BANKS * PER_BANK;

export default function ChargeDemo() {
  const [lit, setLit] = useState(20);
  const full = Math.floor(lit / PER_BANK);
  const set = (n) => setLit(Math.max(0, Math.min(TOTAL, n)));

  return (
    <section className={`${s.bankRow} field-periwinkle`} aria-labelledby="lp-storage-banks-h">
      <div className={s.bankHead}>
        <div className={s.bankHeadText}>
          <Reveal>
            <p className={`${s.kicker} t-label`}><i aria-hidden="true" />Illustration</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="lp-storage-banks-h" className="t-h2">Many modules, one connection.</h2>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <p className="t-body" style={{ maxWidth: '34em' }}>Fill the row of banks with the slider, or one bank at a time. Each module cell fills in Active Blue as it joins the busbar. The numbers count cells of the drawing; no capacity is printed for a single bank.</p>
        </Reveal>
        <Reveal delay={140}>
          <p className="t-small muted" lang="es">{LINES.card}</p>
        </Reveal>
      </div>
      <div className={s.bankArt}>
        <BankRowArt lit={lit} />
      </div>
      <div className={s.bankControls}>
        <div className={s.bankCell} aria-live="polite">
          <span className={s.bankNum}>{lit}</span>
          <span className="t-small">of {TOTAL} module cells lit; {full} of {BANKS} banks full</span>
        </div>
        <div className={`${s.bankCell} ${s.bankRange}`}>
          <label htmlFor="lp-storage-charge" className="t-small">Module cells lit</label>
          <input
            id="lp-storage-charge"
            className={s.range}
            type="range"
            min={0}
            max={TOTAL}
            step={1}
            value={lit}
            onChange={(e) => set(Number(e.target.value))}
            aria-valuetext={`${lit} of ${TOTAL} module cells`}
          />
        </div>
        <div className={`${s.bankCell} ${s.bankBtns}`}>
          <Button type="button" variant="outline" cross={false} onClick={() => set((Math.ceil(lit / PER_BANK) - 1) * PER_BANK)} disabled={lit === 0}>
            Empty a bank
          </Button>
          <Button type="button" variant="dark" onClick={() => set((full + 1) * PER_BANK)} disabled={lit === TOTAL}>
            Fill a bank
          </Button>
        </div>
      </div>
    </section>
  );
}
