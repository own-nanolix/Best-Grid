'use client';

import { useState } from 'react';
import { es } from '@/lib/charts';
import { CAPACITY, TECH } from '@/lib/brand';
import { Q } from './data';
import s from './dataviz.module.css';

// The data table: six printed MW figures, sortable by label or by figure. The case study prints no table, so this
// is only the figures laid in rows; "where printed" names the image they come from.
const ROWS = [
  ...TECH.map((t) => ({ key: t.key, label: t.label, mw: t.mw, where: 'Website tiles', es: true })),
  { key: 'total', label: CAPACITY.totalLabel, mw: CAPACITY.total, where: 'Phone dashboard', es: true },
  { key: 'q3', label: Q[2].q, mw: Q[2].mw, where: 'Phone dashboard, peak' },
];

export default function DataTable() {
  const [sort, setSort] = useState({ key: 'mw', dir: -1 });
  const rows = [...ROWS].sort((a, b) => {
    const r = sort.key === 'mw' ? a.mw - b.mw : a.label.localeCompare(b.label, 'es');
    return r * sort.dir;
  });
  const pick = (key) => setSort((p) => ({ key, dir: p.key === key ? -p.dir : key === 'mw' ? -1 : 1 }));
  const head = (key, text) => (
    <th scope="col" aria-sort={sort.key === key ? (sort.dir > 0 ? 'ascending' : 'descending') : 'none'}>
      <button type="button" className={s.sortBtn} onClick={() => pick(key)}>
        {text}
        <span aria-hidden="true" className={s.sortMark}>{sort.key === key ? (sort.dir > 0 ? '▲' : '▼') : '△'}</span>
      </button>
    </th>
  );
  return (
    <div className="spec-wrap">
      <table className={`spec ${s.table}`}>
        <caption>Six printed figures, sorted by {sort.key === 'mw' ? 'figure' : 'label'}. Click a heading to sort. Each row is shown as printed: the four technology tiles add up to {es(TECH.reduce((a, t) => a + t.mw, 0))} MW (computed), not to the <span lang="es">Total anual</span>.</caption>
        <thead>
          <tr>
            {head('label', 'Label')}
            {head('mw', 'Figure')}
            <th scope="col">Where printed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <th scope="row" lang={r.es ? 'es' : undefined}>{r.label}</th>
              <td className="spec-num-s" lang="es">
                {es(r.mw)}
                <span className="spec-unit">MW</span>
              </td>
              <td className="muted">{r.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
