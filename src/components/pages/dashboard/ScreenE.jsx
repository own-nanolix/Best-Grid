'use client';

import { CAPACITY } from '@/lib/brand';
import { Board, Top } from './Chrome';
import { AreaPlot, TreemapChart, Empty } from './charts';
import s from './dashboard.module.css';

// The phone dashboard of m17 grown to the desktop: title, area chart, total, chips, KPI cells, treemap.
export default function ScreenE({ st, k }) {
  const has = st.year === CAPACITY.year;
  const kp = (v) => (has ? v : '');
  return (
    <Board id="e" k={k} label="Dashboard option E: the phone dashboard grown to desktop">
      <Top st={st} label="Option E" />
      <div className={s.eBody}>
        <div className={s.eChart}>
          {has ? <AreaPlot idp="dashboard-e" w={980} h={380} active={st.quarter} onPick={(i) => st.set({ quarter: i })} /> : <Empty year={st.year} />}
          <div className={s.eQuarters} role="group" aria-label="Quarters">
            {CAPACITY.quarters.map((q, i) => (
              <button key={q.q} type="button" disabled={!has} aria-pressed={st.quarter === i} onClick={() => st.set({ quarter: i })}>
                <span>{q.q}</span><b lang="es">{kp(q.value)}</b>
              </button>
            ))}
          </div>
        </div>
        <div className={s.eTotal}>
          <span className="t-label" lang="es">{CAPACITY.totalLabel}</span>
          <p className={`t-num ${s.totalNum}`} lang="es">{kp(CAPACITY.totalValue)}{has && <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M11 3 20 18H2Z" fill="currentColor" /></svg>}</p>
        </div>
        <div className={s.eKpis}>
          {CAPACITY.kpis.map((q) => (
            <div key={q.label} className={s.kpi}>
              <span lang="es">{q.label}</span>
              <b className="t-num" lang="es">{kp(q.value)}</b>
            </div>
          ))}
        </div>
        <div className={s.eTree}>{has ? <TreemapChart idp="dashboard-e-tm" w={520} h={320} sel={st.part} onPick={(p) => st.set({ part: p })} /> : <Empty year={st.year} />}</div>
      </div>
    </Board>
  );
}
