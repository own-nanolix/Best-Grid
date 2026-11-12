'use client';

import Icon from '@/components/site/Icon';
import Chip from '@/components/ui/Chip';
import { PixelIcon } from '@/components/site/Icon';
import { Board, Top, RangeButton } from './Chrome';
import { Empty } from './charts';
import { KINDS, ROWS, visibleRows, barOf } from './data';
import s from './dashboard.module.css';

const COLS = [['name', 'Name'], ['kind', 'Kind'], ['value', 'Value']];

export function RowDetail({ row, st, onClose }) {
  if (!row) return <p className={s.hint}>Select a row to open its detail.</p>;
  return (
    <div className={s.drawer}>
      <div className={s.drawerHead}>
        <span className="t-label">{row.kind}</span>
        <button type="button" className={s.ctl} onClick={onClose} aria-label="Close detail"><Icon name="close" size={16} /></button>
      </div>
      <p className={s.drawerName} lang={row.es ? 'es' : undefined}>{row.name}</p>
      <p className={`t-num ${s.drawerNum}`} lang="es">{row.value || <span className="ph" style={{ width: 120 }} />}</p>
      <span className={s.bar}><i style={{ width: `${barOf(row)}%` }} /></span>
      {[1, 2, 3].map((n) => <div key={n} className={s.field}><span>Field 0{n}</span><span className="ph" style={{ width: 40 + n * 20 }} /></div>)}
      {row.tech && <button type="button" className={s.cta} onClick={() => st.set({ tech: row.tech, tab: 'tech' })}>Open technology detail<Icon name="arrow-right" size={16} /></button>}
    </div>
  );
}

export default function ScreenA({ st, k }) {
  const rows = visibleRows(st);
  const sel = ROWS.find((r) => r.id === st.rowId);
  const toggle = (key) => st.set({ sort: { key, dir: st.sort.key === key && st.sort.dir === 'asc' ? 'desc' : 'asc' } });
  const none = st.year !== '2025';
  return (
    <Board id="a" k={k} label="Dashboard option A: command bar over a data table">
      <Top st={st} label="Option A" />
      <div className={s.cmd}>
        <label className={s.search}>
          <Icon name="search" size={20} />
          <span className="sr-only">Search the table</span>
          <input id="dashboard-a-search" className={s.searchIn} value={st.query} placeholder="Search rows" onChange={(e) => st.set({ query: e.target.value })} />
          {st.query && <button type="button" className={s.clear} aria-label="Clear search" onClick={() => st.set({ query: '' })}><Icon name="close" size={14} /></button>}
        </label>
        <div className={s.chips} role="group" aria-label="Kind">
          {KINDS.map((x) => <Chip key={x} pressed={st.kind === x} onClick={() => st.set({ kind: x })}>{x}</Chip>)}
        </div>
        <RangeButton st={st} />
        <button type="button" className={s.ctl} onClick={() => st.set({ query: '', kind: 'All', range: 'full', rowId: null })}>Reset</button>
      </div>
      <div className={s.aBody}>
        <div className={s.tableWrap}>
          {none ? <Empty year={st.year} /> : (
            <table className={s.table} id="dashboard-a-table">
              <thead>
                <tr>
                  {COLS.map(([key, label]) => (
                    <th key={key} scope="col" aria-sort={st.sort.key === key ? (st.sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                      <button type="button" onClick={() => toggle(key)}>{label}<Icon name="sort" size={14} /></button>
                    </th>
                  ))}
                  <th scope="col">Relative bar</th>
                  <th scope="col">Note</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} aria-selected={st.rowId === r.id} onClick={() => st.set({ rowId: r.id })}>
                    <th scope="row" lang={r.es ? 'es' : undefined}>
                      <button type="button" onClick={() => st.set({ rowId: r.id })}>
                        {r.icon && <PixelIcon name={r.icon} size={20} />}{r.name}
                      </button>
                    </th>
                    <td>{r.kind}</td>
                    <td className={s.num} lang="es">{r.value || <span className="ph" style={{ width: 56 }} />}</td>
                    <td><span className={s.bar}><i style={{ width: `${barOf(r)}%` }} /></span></td>
                    <td><span className="ph" style={{ width: 90 }} /></td>
                  </tr>
                ))}
                {!rows.length && <tr><td colSpan="5" className={s.noRows}>No rows match the search.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
        <aside className={s.aSide} aria-label="Row detail"><RowDetail row={sel} st={st} onClose={() => st.set({ rowId: null })} /></aside>
      </div>
      <footer className={s.status} aria-live="polite">
        <span>{rows.length} of {ROWS.length} rows shown</span>
        <span>Sorted by {st.sort.key}, {st.sort.dir === 'asc' ? 'ascending' : 'descending'}</span>
      </footer>
    </Board>
  );
}
