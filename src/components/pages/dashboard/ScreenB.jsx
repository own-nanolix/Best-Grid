'use client';

import Icon from '@/components/site/Icon';
import { CAPACITY } from '@/lib/brand';
import { Board, Top } from './Chrome';
import { NodeGridPlot, Empty } from './charts';
import { CELLS, LEVELS } from './data';
import s from './dashboard.module.css';

const LAYERS = [{ lvl: -1, icon: 'grid', label: 'All cells' }, { lvl: 2, icon: 'node', label: 'Full cells' }, { lvl: 1, icon: 'layers', label: 'Strong cells' }, { lvl: 0, icon: 'plus', label: 'Empty cells' }];

export default function ScreenB({ st, k }) {
  const c = CELLS[st.cell];
  return (
    <Board id="b" k={k} label="Dashboard option B: rail, node map and detail panel">
      <Top st={st} label="Option B" />
      <div className={s.bBody}>
        <nav className={s.rail} aria-label="Cell layers">
          {LAYERS.map((l) => (
            <button key={l.label} type="button" className={s.railItem} aria-pressed={st.layer === l.lvl} aria-label={l.label} title={l.label} onClick={() => st.set({ layer: l.lvl })}>
              <Icon name={l.icon} size={22} />
            </button>
          ))}
        </nav>
        <section className={s.bMain} aria-label="Node map">
          <p className={s.mapTitle} lang="es">{CAPACITY.nodesTitle}</p>
          {st.year === CAPACITY.year ? <NodeGridPlot sel={st.cell} only={st.layer} onPick={(i) => st.set({ cell: i })} /> : <Empty year={st.year} />}
          <div className={s.legend}>
            {[2, 1, 0].map((l) => <span key={l}><i className={s[`sw${l}`]} />{LEVELS[l]}</span>)}
            <span>Drawing only: no per-node figures are published.</span>
          </div>
        </section>
        <aside className={s.bSide} aria-label="Cell detail">
          <span className="t-label">Selected cell</span>
          <p className={`t-num ${s.cellNum}`}>{String(c.i + 1).padStart(3, '0')}</p>
          <dl className={s.dl}>
            <div><dt>Row</dt><dd>{c.row + 1}</dd></div>
            <div><dt>Column</dt><dd>{c.col + 1}</dd></div>
            <div><dt>Fill</dt><dd>{LEVELS[c.lvl]}</dd></div>
          </dl>
          {[1, 2, 3].map((n) => <div key={n} className={s.field}><span>Field 0{n}</span><span className="ph" style={{ width: 40 + n * 24 }} /></div>)}
          <button type="button" className={s.cta} onClick={() => st.set({ tab: 'node' })}>Open node detail<Icon name="arrow-right" size={16} /></button>
        </aside>
      </div>
    </Board>
  );
}
