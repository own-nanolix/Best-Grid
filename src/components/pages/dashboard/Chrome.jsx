'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Chip from '@/components/ui/Chip';
import { CAPACITY } from '@/lib/brand';
import { RANGES } from './data';
import s from './dashboard.module.css';

// A fixed-size 1600 x 1000 artboard, scaled by k into its container.
export function Board({ id, k, label, children }) {
  return (
    <div className={s.boardBox} style={{ height: 1000 * k }}>
      <div className={`artboard ${s.board}`} data-screen={`dashboard-${id}`} role="group" aria-label={label} style={{ '--w': 1600, '--k': k }}>
        {children}
      </div>
    </div>
  );
}

export function YearChips({ st }) {
  return (
    <div className={s.chips} role="group" aria-label="Year">
      {CAPACITY.years.map((y) => <Chip key={y} pressed={st.year === y} onClick={() => st.set({ year: y })}>{y}</Chip>)}
    </div>
  );
}

export function AccountChip() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState('Account');
  return (
    <div className={s.account}>
      <button type="button" className={s.acctBtn} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>
        <Icon name="user" size={18} />{last}
      </button>
      {open && (
        <div className={s.menu} role="group" aria-label="Account menu">
          {['Profile', 'Preferences'].map((m) => <button key={m} type="button" onClick={() => { setLast(m); setOpen(false); }}>{m}</button>)}
        </div>
      )}
    </div>
  );
}

export function RangeButton({ st }) {
  const i = RANGES.findIndex((r) => r.id === st.range);
  return (
    <button type="button" className={s.ctl} aria-label={`Date range: ${RANGES[i].label}. Change`} onClick={() => st.set({ range: RANGES[(i + 1) % RANGES.length].id })}>
      <Icon name="calendar" size={18} />{RANGES[i].label}
    </button>
  );
}

// The top bar shared by the option screens: mark cell, the case study's own title, year chips, account.
export function Top({ st, label, children }) {
  return (
    <header className={s.top}>
      <div className={s.topMark}><svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true"><use href="#site-mark" /></svg></div>
      <div className={s.topTitle}>
        <span className={s.topKicker}>{label}</span>
        <span lang="es" className={s.topH}>{CAPACITY.title}</span>
      </div>
      {children}
      <div className={s.topEnd}><YearChips st={st} /><AccountChip /></div>
    </header>
  );
}
