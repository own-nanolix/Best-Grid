'use client';

import Icon, { PixelIcon } from '@/components/site/Icon';
import { CAPACITY, TECH } from '@/lib/brand';
import { Board, Top } from './Chrome';
import { TreemapChart, Empty } from './charts';
import s from './dashboard.module.css';

export default function ScreenD({ st, k }) {
  const has = st.year === CAPACITY.year;
  return (
    <Board id="d" k={k} label="Dashboard option D: treemap with a side legend">
      <Top st={st} label="Option D" />
      <div className={s.dBody}>
        <div className={s.dMap}>{has ? <TreemapChart idp="dashboard-d" w={1000} h={760} sel={st.part} onPick={(p) => st.set({ part: p })} /> : <Empty year={st.year} />}</div>
        <aside className={s.dSide} aria-label="Legend">
          <span className="t-label">Legend</span>
          {CAPACITY.treemap.parts.filter((p) => !p.unlabelled).map((p) => (
            <button key={p.key} type="button" className={s.legendRow} aria-pressed={st.part === p.key} onClick={() => st.set({ part: p.key })} disabled={!has}>
              <span lang="es">{p.labelRows.join(' ')}</span><b lang="es">{has ? `${p.pct}%` : ''}</b>
            </button>
          ))}
          <span className="t-label">Technologies</span>
          <div className={s.techList}>
            {TECH.map((t) => (
              <button key={t.key} type="button" className={s.techTile} onClick={() => st.set({ tech: t.key, tab: 'tech' })}>
                <PixelIcon name={t.icon} size={28} />
                <span lang="es">{t.label}</span>
                <b lang="es">{t.value}</b>
                <Icon name="arrow-right" size={16} />
              </button>
            ))}
          </div>
        </aside>
      </div>
    </Board>
  );
}
