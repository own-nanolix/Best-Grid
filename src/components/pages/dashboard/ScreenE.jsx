'use client';

import { CAPACITY } from '@/lib/brand';
import { Board, Top } from './Chrome';
import { AreaPlot, TreemapChart, Empty } from './charts';
import s from './dashboard.module.css';

// The phone dashboard of m17 grown to the desktop, in the phone's own order: the area chart with the quarter and its
// printed value under each node, "Total anual" in Active Blue with its up triangle, the three ruled KPI cells, and the
// treemap (laid out as printed) beside them. The quarter nodes are the control: hover, focus or click one.
export default function ScreenE({ st, k }) {
  const has = st.year === CAPACITY.year;
  const kp = (v) => (has ? v : '');
  return (
    <Board id="e" k={k} label="Dashboard option E: the phone dashboard grown to desktop">
      <Top st={st} label="Option E" />
      <div className={s.eBody}>
        <div className={s.eChart}>
          {has ? <AreaPlot idp="dashboard-e" w={940} h={400} active={st.quarter} onPick={(i) => st.set({ quarter: i })} /> : <Empty year={st.year} />}
        </div>
        <div className={s.eTotal}>
          <span className="t-label" lang="es">{CAPACITY.totalLabel}</span>
          {has ? (
            <p className={`t-num ${s.totalNum}`} lang="es">{CAPACITY.totalValue}<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M11 3 20 18H2Z" fill="currentColor" /></svg></p>
          ) : <p className={s.hint}>No published figures for {st.year}.</p>}
        </div>
        <div className={s.eKpis}>
          {CAPACITY.kpis.map((q) => (
            <div key={q.label} className={s.kpi}>
              <span lang="es">{q.label}</span>
              <b className="t-num" lang="es">{kp(q.value)}</b>
            </div>
          ))}
        </div>
        <div className={s.eTree}>{has ? <TreemapChart idp="dashboard-e-tm" w={560} h={560} faithful sel={st.part} onPick={(p) => st.set({ part: p })} /> : <Empty year={st.year} />}</div>
      </div>
    </Board>
  );
}
