'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Chip from '@/components/ui/Chip';
import { CAPACITY, TECH } from '@/lib/brand';
import { RANGES } from './data';
import s from './dashboard.module.css';

function Demo({ title, states, children }) {
  return (
    <section className={s.demo} aria-label={title}>
      <h3 className="t-label">{title}</h3>
      <div className={s.demoBody}>{children}</div>
      <p className="t-small muted">States: {states}</p>
    </section>
  );
}

const GLYPH = { none: '', ascending: ' (up)', descending: ' (down)' };

export default function Sheet() {
  const [side, setSide] = useState(0);
  const [rail, setRail] = useState(0);
  const [kpis, setKpis] = useState([]);
  const [heads, setHeads] = useState(['none', 'none', 'none']);
  const [row, setRow] = useState(1);
  const [chips, setChips] = useState(['Technology']);
  const [shown, setShown] = useState(4);
  const [q, setQ] = useState('');
  const [rg, setRg] = useState(0);
  const [menu, setMenu] = useState(false);
  const [acct, setAcct] = useState('Account');
  const hits = TECH.filter((t) => t.label.toLowerCase().includes(q.trim().toLowerCase()));
  const cycle = (v) => (v === 'none' ? 'ascending' : v === 'ascending' ? 'descending' : 'none');
  return (
    <div className={s.sheet}>
      <Demo title="Sidebar item" states="default, hover, selected, disabled">
        <nav className={s.sideDemo} aria-label="Sidebar demo">
          {['Overview', 'Nodes', 'Reports'].map((l, i) => <button key={l} type="button" aria-current={side === i ? 'true' : undefined} onClick={() => setSide(i)}><Icon name={['grid', 'node', 'document'][i]} size={18} />{l}</button>)}
          <button type="button" disabled><Icon name="plug" size={18} />Disabled</button>
        </nav>
      </Demo>
      <Demo title="Rail item" states="default, hover, selected">
        <div className={s.railDemo} role="group" aria-label="Rail demo">
          {['grid', 'chart', 'layers', 'search'].map((n, i) => <button key={n} type="button" className={s.railItem} aria-pressed={rail === i} aria-label={`Rail item ${i + 1}`} onClick={() => setRail(i)}><Icon name={n} size={22} /></button>)}
        </div>
      </Demo>
      <Demo title="KPI tile" states={`default, hover, selected (${kpis.length} of 3 selected)`}>
        <div className={s.kpiRow}>
          {CAPACITY.kpis.map((x) => (
            <button key={x.label} type="button" className={s.kpiBtn} aria-pressed={kpis.includes(x.label)} onClick={() => setKpis((p) => (p.includes(x.label) ? p.filter((y) => y !== x.label) : [...p, x.label]))}>
              <span lang="es">{x.label}</span><b className="t-num" lang="es">{x.value}</b>
            </button>
          ))}
        </div>
      </Demo>
      <Demo title="Table header" states="unsorted, ascending, descending">
        <div role="table" aria-label="Table header demo">
          <div className={s.headRow} role="row">
            {['Name', 'Kind', 'Value'].map((l, i) => (
              <div key={l} role="columnheader" aria-sort={heads[i]}>
                <button type="button" onClick={() => setHeads(heads.map((h, j) => (j === i ? cycle(h) : 'none')))}>{l}{GLYPH[heads[i]]}<Icon name="sort" size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </Demo>
      <Demo title="Table row" states="default, hover, selected">
        <div className={s.rowDemo} role="listbox" aria-label="Row demo">
          {[0, 1, 2].map((i) => (
            <button key={i} type="button" role="option" aria-selected={row === i} onClick={() => setRow(i)}><span>Row 0{i + 1}</span><span className="ph" style={{ width: 80 }} /></button>
          ))}
        </div>
      </Demo>
      <Demo title="Filter chip" states="off, on, hover">
        <div className={s.chips} role="group" aria-label="Filter demo">
          {['Technology', 'Quarter', 'Count'].map((c) => <Chip key={c} pressed={chips.includes(c)} onClick={() => setChips((p) => (p.includes(c) ? p.filter((y) => y !== c) : [...p, c]))}>{c}</Chip>)}
        </div>
      </Demo>
      <Demo title="Status row" states="all rows, fewer rows">
        <div className={s.statusDemo} aria-live="polite">
          <span>{shown} of 4 rows shown</span>
          <button type="button" className={s.ctl} onClick={() => setShown(shown === 4 ? 2 : 4)}>{shown === 4 ? 'Show fewer' : 'Show all'}</button>
        </div>
      </Demo>
      <Demo title="Search field" states={`empty, typing (${hits.length} matches), focus`}>
        <label className={s.search}>
          <Icon name="search" size={20} /><span className="sr-only">Search technologies</span>
          <input id="dashboard-sheet-search" className={s.searchIn} value={q} placeholder="Search technologies" onChange={(e) => setQ(e.target.value)} />
        </label>
        {hits.length ? <p className="t-small" lang="es" aria-live="polite">{hits.map((t) => t.label).join(' · ')}</p> : <p className="t-small muted" aria-live="polite">No technology matches the search.</p>}
      </Demo>
      <Demo title="Date range" states="full year, first half, second half">
        <div className={s.rangeDemo}>
          <button type="button" className={s.ctl} aria-label="Previous range" onClick={() => setRg((rg + 2) % 3)}><Icon name="chevron-left" size={16} /></button>
          <span><Icon name="calendar" size={18} />{RANGES[rg].label}</span>
          <button type="button" className={s.ctl} aria-label="Next range" onClick={() => setRg((rg + 1) % 3)}><Icon name="chevron-right" size={16} /></button>
        </div>
      </Demo>
      <Demo title="Account chip" states="closed, open, item chosen">
        <div className={s.account}>
          <button type="button" className={s.acctBtn} aria-expanded={menu} aria-haspopup="true" onClick={() => setMenu(!menu)}><Icon name="user" size={18} />{acct}</button>
          {menu && <div className={s.menu} role="group" aria-label="Account demo menu">{['Profile', 'Preferences'].map((m) => <button key={m} type="button" onClick={() => { setAcct(m); setMenu(false); }}>{m}</button>)}</div>}
        </div>
      </Demo>
    </div>
  );
}
