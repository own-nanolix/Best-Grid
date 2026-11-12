'use client';

import Icon, { PixelIcon } from '@/components/site/Icon';
import { CAPACITY, TECH } from '@/lib/brand';
import { Board, Top } from './Chrome';
import { NodeGridPlot, BarsChart, TECH_ITEMS, Thumb } from './charts';
import { CELLS, GRID, LEVELS, STRUCTS } from './data';
import s from './dashboard.module.css';

export function Overview({ st, k }) {
  return (
    <Board id="overview" k={k} label="Dashboard options overview">
      <Top st={st} label="Overview" />
      <div className={s.ovBody}>
        <p className={s.ovLead}>Five structures on the same data. Open one to work in it.</p>
        <div className={s.ovRow}>
          {STRUCTS.map((x) => (
            <button key={x.id} type="button" className={s.ovCard} onClick={() => st.set({ tab: x.id })} aria-label={`Open option ${x.id.toUpperCase()}, ${x.name}`}>
              <Thumb kind={x.id} />
              <span className="t-label">Option {x.id.toUpperCase()}</span>
              <span className={s.ovName}>{x.name}</span>
              <span className={s.ovDesc}>{x.desc}</span>
            </button>
          ))}
        </div>
        <table className={s.table}>
          <thead><tr><th scope="col">Option</th><th scope="col">Lead element</th><th scope="col">Main control</th></tr></thead>
          <tbody>
            {[['A', 'Data table', 'Command bar and sortable headers'], ['B', 'Node grid', 'Rail layers and cell picking'], ['C', 'Four area charts', 'Quarter cells'], ['D', 'Treemap', 'Legend rows'], ['E', 'Area chart and KPI cells', 'Quarter strip']].map((r) => (
              <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </Board>
  );
}

export function NodeScreen({ st, k }) {
  const c = CELLS[st.cell];
  const near = CELLS.filter((o) => o.i !== c.i && Math.abs(o.col - c.col) <= 1 && Math.abs(o.row - c.row) <= 1);
  return (
    <Board id="node" k={k} label="Inner screen: node detail">
      <Top st={st} label="Node detail" />
      <div className={s.nBody}>
        <div className={s.nCrop}>
          <button type="button" className={s.cta} onClick={() => st.set({ tab: 'b' })}><Icon name="chevron-left" size={16} />Back to option B</button>
          <NodeGridPlot sel={st.cell} onPick={(i) => st.set({ cell: i })} crop={{ col: Math.min(GRID.cols - 3, Math.max(2, c.col)), row: Math.min(GRID.rows - 3, Math.max(2, c.row)) }} />
        </div>
        <div className={s.nSide}>
          <p className={`t-num ${s.cellNum}`}>{String(c.i + 1).padStart(3, '0')}</p>
          <dl className={s.dl}>
            <div><dt>Row</dt><dd>{c.row + 1}</dd></div>
            <div><dt>Column</dt><dd>{c.col + 1}</dd></div>
            <div><dt>Fill</dt><dd>{LEVELS[c.lvl]}</dd></div>
            <div><dt>Neighbours</dt><dd>{near.length}</dd></div>
            {[2, 1, 0].map((l) => <div key={l}><dt>{LEVELS[l]} neighbours</dt><dd>{near.filter((o) => o.lvl === l).length}</dd></div>)}
          </dl>
          {[1, 2, 3, 4].map((n) => <div key={n} className={s.field}><span>Row 0{n}</span><span className="ph" style={{ width: 40 + n * 22 }} /></div>)}
        </div>
      </div>
    </Board>
  );
}

export function TechScreen({ st, k }) {
  const t = TECH.find((x) => x.key === st.tech);
  const has = st.year === CAPACITY.year;
  return (
    <Board id="tech" k={k} label="Inner screen: technology detail">
      <Top st={st} label="Technology detail" />
      <div className={s.tBody}>
        <nav className={s.tList} aria-label="Technologies">
          {TECH.map((x) => (
            <button key={x.key} type="button" className={s.techTile} aria-pressed={st.tech === x.key} onClick={() => st.set({ tech: x.key })}>
              <PixelIcon name={x.icon} size={28} /><span lang="es">{x.label}</span><b lang="es">{has ? x.value : ''}</b>
            </button>
          ))}
        </nav>
        <section className={s.tMain} aria-label="Technology figures">
          <PixelIcon name={t.icon} size={96} />
          <p className={s.drawerName} lang="es">{t.label}</p>
          <p className={`t-num ${s.bigNum}`} lang="es">{has ? t.value : ''}</p>
          {has ? <BarsChart items={TECH_ITEMS} max={12157} w={760} sel={st.tech} onPick={(id) => st.set({ tech: id })} title="Capacity per technology" /> : <p className={s.hint}>No published figures for {st.year}.</p>}
        </section>
        <aside className={s.tSide}>
          {[1, 2, 3, 4, 5].map((n) => <div key={n} className={s.field}><span>Row 0{n}</span><span className="ph" style={{ width: 40 + n * 16 }} /></div>)}
          <button type="button" className={s.cta} onClick={() => st.set({ tab: 'a', query: t.label, rowId: `t-${t.key}` })}>Show in the table<Icon name="arrow-right" size={16} /></button>
        </aside>
      </div>
    </Board>
  );
}
