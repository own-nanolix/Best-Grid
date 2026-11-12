'use client';
import { useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import Field from '@/components/ui/Field';
import Toggle from '@/components/ui/Toggle';
import Button from '@/components/ui/Button';
import Icon, { PixelIcon } from '@/components/site/Icon';
import { CAPACITY, TECH } from '@/lib/brand';
import { Bar, StatusBar, TabBar, Accordion } from './kit';
import { TABS, HELP } from './ScreensA';
import { SCREENS } from './Stage';
import s from './mobile-b.module.css';
function Pair({ left, right, capL = 'Light', capR = 'Dark' }) {
  return (
    <div className={s.specimen}>
      <div><p className={s.stateCap}>{capL}</p><div className={s.pad}>{left}</div></div>
      <div><p className={s.stateCap}>{capR}</p><div className={s.padDark}>{right}</div></div>
    </div>
  );
}
function StatusSpec() {
  return <Pair left={<StatusBar />} right={<StatusBar />} />;
}
function NavSpec() {
  const [i, setI] = useState(0);
  const step = (d) => setI((v) => (v + d + SCREENS.length) % SCREENS.length);
  const bar = (
    <div className={s.navBar}>
      <button type="button" className={s.navBtn} aria-label="Previous screen name" onClick={() => step(-1)}><Icon name="chevron-left" size={22} /></button>
      <span style={{ fontSize: 16 }} aria-live="polite">{SCREENS[i].name}</span>
      <button type="button" className={s.navBtn} aria-label="Next screen name" onClick={() => step(1)}><Icon name="chevron-right" size={22} /></button>
    </div>
  );
  return <Pair left={bar} right={bar} capL="Light, with back and forward" capR="Dark" />;
}
function TabBarSpec() {
  const [cur, setCur] = useState('13');
  return (
    <div className={s.specimen}>
      <div>
        <p className={s.stateCap}>Four items, one current</p>
        <TabBar flat items={TABS} current={cur} onGo={setCur} label="Tab bar specimen" />
      </div>
      <div>
        <p className={s.stateCap}>Current: {TABS.find((t) => t.key === cur).label}</p>
        <div className={s.pad}><Bar w={70} /></div>
      </div>
    </div>
  );
}
function ListSpec() {
  const [sel, setSel] = useState(1);
  const [on, setOn] = useState(true);
  return (
    <div className={s.specimen}>
      <div>
        <p className={s.stateCap}>Selectable rows</p>
        <div className={s.pad} role="radiogroup" aria-label="Rows">
          {[0, 1, 2].map((i) => (
            <button key={i} type="button" className={s.rowBtn} role="radio" aria-checked={sel === i} aria-label={`Row ${i + 1}`} onClick={() => setSel(i)}>
              <div style={{ flex: 1, display: 'grid', gap: 6 }}><Bar w={60 + i * 10} /><Bar w={34} /></div>
              <i className={s.sq} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className={s.stateCap}>Row with a switch</p>
        <div className={`${s.pad}`}>
          <div className={s.item} style={{ borderTop: 'var(--hair) solid var(--line)' }}>
            <PixelIcon name="solar" size={32} />
            <div className={s.grow}><span lang="es">{TECH[0].label}</span><Bar w={50} /></div>
            <Toggle hideLabel label="Switch" checked={on} onChange={setOn} />
          </div>
        </div>
      </div>
    </div>
  );
}
function MenuSpec() {
  const [last, setLast] = useState('None');
  const rows = ['Settings', 'Documents', 'Share'];
  return (
    <div className={s.specimen}>
      <div className={s.pad}>
        {rows.map((r) => (
          <button key={r} type="button" className={s.rowBtn} onClick={() => setLast(r)}>
            <span style={{ flex: 1 }}>{r}</span>
            <Icon name="chevron-right" size={20} />
          </button>
        ))}
        <button type="button" className={s.rowBtn} disabled style={{ opacity: 0.45 }}>
          <span style={{ flex: 1 }}>Disabled</span>
          <Icon name="chevron-right" size={20} />
        </button>
      </div>
      <p className="t-body" role="status">Opened: {last}</p>
    </div>
  );
}
function CardSpec() {
  const [pick, setPick] = useState(3);
  return (
    <div className="grid cols-2">
      {TECH.slice(0, 4).map((t, i) => (
        <button key={t.key} type="button" aria-pressed={pick === i} className={s.cardS} data-state={pick === i ? 'dark' : t.highlight ? 'active' : 'paper'} style={{ textAlign: 'left', color: 'inherit', font: 'inherit' }} onClick={() => setPick(i)}>
          <PixelIcon name={t.icon} size={32} />
          <span lang="es">{t.label}</span>
          <span lang="es" className={s.val}>{t.value}</span>
        </button>
      ))}
    </div>
  );
}
function StatSpec() {
  const [n, setN] = useState(0);
  const k = CAPACITY.kpis[n];
  return (
    <div className={s.specimen}>
      <div className={s.stat} aria-live="polite">
        <span lang="es" className="t-small">{k.label}</span>
        <b lang="es">{k.value}</b>
      </div>
      <div className="stack">
        <div role="group" aria-label="Figure" className="row" style={{ gap: 8 }}>
          {CAPACITY.kpis.map((x, i) => (
            <button key={x.label} type="button" className="chip chip-sm" aria-pressed={n === i} lang="es" onClick={() => setN(i)}>{x.label}</button>
          ))}
        </div>
        <div className={s.stat}>
          <span className="t-small">Rows shown</span>
          <b>{TECH.length}</b>
        </div>
      </div>
    </div>
  );
}
function InputSpec() {
  const [v, setV] = useState('');
  return (
    <div className={s.specimen}>
      <div className="stack">
        <Field id="mobile-b-spec-in-a" label="Email" type="email" value={v} onChange={(e) => setV(e.target.value)} autoComplete="off" />
        <Field id="mobile-b-spec-in-b" label="Password" type="password" defaultValue="placeholder" autoComplete="off" />
      </div>
      <div className="stack">
        <Field id="mobile-b-spec-in-c" label="Email (error)" type="email" aria-invalid="true" defaultValue="name" autoComplete="off" hint="Enter a complete email" />
        <Field id="mobile-b-spec-in-d" label="Disabled" disabled defaultValue="" />
      </div>
    </div>
  );
}
function AccSpec() {
  return (
    <div className={s.pad} style={{ maxWidth: 420 }}>
      <Accordion idp="mobile-b-spec-acc" items={HELP.slice(0, 3)} es />
    </div>
  );
}
function SheetSpec() {
  const [open, setOpen] = useState(false);
  return (
    <div className={s.specimen}>
      <div className={s.demo} style={{ height: 300 }} onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
        <div style={{ padding: 16, display: 'grid', gap: 12 }}>
          <Bar w={80} /><Bar w={60} /><Bar w={72} />
        </div>
        <div className={s.dim} data-open={open} onClick={() => setOpen(false)} aria-hidden="true" />
        <div className={s.sheet} data-open={open} role="dialog" aria-label="Sheet specimen" inert={!open}>
          <button type="button" className={s.grip} aria-label="Close sheet" onClick={() => setOpen(false)} />
          <div style={{ display: 'grid', gap: 12 }}><Bar w={70} /><Bar w={50} /></div>
        </div>
      </div>
      <div><Button variant="active" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close sheet' : 'Open sheet'}</Button></div>
    </div>
  );
}
const SET = [
  { id: 'status', label: 'Status bar', content: <StatusSpec /> },
  { id: 'nav', label: 'Nav', content: <NavSpec /> },
  { id: 'tab', label: 'Tab bar', content: <TabBarSpec /> },
  { id: 'list', label: 'List row', content: <ListSpec /> },
  { id: 'menu', label: 'Menu row', content: <MenuSpec /> },
  { id: 'card', label: 'Card', content: <CardSpec /> },
  { id: 'stat', label: 'Stat card', content: <StatSpec /> },
  { id: 'input', label: 'Input', content: <InputSpec /> },
  { id: 'acc', label: 'Accordion', content: <AccSpec /> },
  { id: 'sheet', label: 'Sheet', content: <SheetSpec /> },
];
export default function ComponentSet() {
  return (
    <section className="wrap band" id="mobile-b-components" aria-labelledby="mobile-b-components-h">
      <h2 id="mobile-b-components-h" className="t-h2" style={{ marginBottom: 24 }}>The mobile component set.</h2>
      <Tabs id="mobile-b-set" label="Mobile components" tabs={SET} panelClassName="" />
    </section>
  );
}
