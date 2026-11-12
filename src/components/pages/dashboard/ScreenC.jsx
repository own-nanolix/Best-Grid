'use client';

import { CAPACITY } from '@/lib/brand';
import { Board, Top } from './Chrome';
import { AreaChart, Empty } from './charts';
import s from './dashboard.module.css';

export default function ScreenC({ st, k }) {
  const has = st.year === CAPACITY.year;
  return (
    <Board id="c" k={k} label="Dashboard option C: a 2 by 2 of quarter cells">
      <Top st={st} label="Option C" />
      {has ? (
        <div className={s.cGrid}>
          {CAPACITY.quarters.map((q, i) => (
            <button key={q.q} type="button" className={s.cCell} aria-pressed={st.quarter === i} onClick={() => st.set({ quarter: i })}>
              <span className={s.cHead}><span className="t-label">{q.q}</span><span className={s.cNum} lang="es">{q.value}</span></span>
              <span className={s.cChart}><AreaChart idp={`dashboard-c-${q.q}`} w={640} h={230} compact active={i} title={`${q.q} ${q.value} on the 2025 area`} /></span>
            </button>
          ))}
        </div>
      ) : <div className={s.cGrid}><Empty year={st.year} /></div>}
      <footer className={s.status}>
        <span lang="es">{CAPACITY.totalLabel} <b>{has ? CAPACITY.totalValue : ''}</b></span>
        <span>{has ? `Selected quarter: ${CAPACITY.quarters[st.quarter].q}` : 'No quarter to select'}</span>
      </footer>
    </Board>
  );
}
