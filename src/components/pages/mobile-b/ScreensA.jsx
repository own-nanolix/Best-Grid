'use client';
import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import Toggle from '@/components/ui/Toggle';
import Icon, { PixelIcon } from '@/components/site/Icon';
import { toast } from '@/components/site/Toast';
import { WordmarkG } from '@/components/art/Mark';
import { LINES, TECH, CAPACITY, WEB_HERO } from '@/lib/brand';
import { Bar, StatusBar, Mark, TabBar, Accordion, radioKeys } from './kit';
import s from './mobile-b.module.css';
export const TABS = [
  { key: '13', label: 'Reader', icon: 'document' },
  { key: '12', label: 'Notifications', icon: 'alert' },
  { key: '16', label: 'Documents', icon: 'folder' },
  { key: '18', label: 'Profile', icon: 'user' },
];
export function SignIn({ idp }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !pw) {
      setErr('Enter your email and password');
      return;
    }
    setErr('');
    toast('Signed in');
  };
  return (
    <div className={s.scr}>
      <StatusBar />
      <form className={s.body} onSubmit={submit} noValidate>
        <div style={{ color: 'var(--dark-blue)', margin: '36px 0 28px' }}>
          <Mark size={52} />
        </div>
        <svg viewBox="0 0 200 40" width="132" height="26" role="img" aria-label="Best Grid" style={{ marginBottom: 22 }}>
          <WordmarkG x={0} y={30} size={36} />
        </svg>
        <h2 className={s.h}>Sign in</h2>
        <div className={s.stack} style={{ marginTop: 18 }}>
          <Field id={`${idp}-email`} label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className={s.rel}>
            <Field id={`${idp}-password`} label="Password" type={show ? 'text' : 'password'} autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} />
            <button type="button" className={s.inlineBtn} aria-pressed={show} onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className={s.err} role="alert">{err}</p>
          <Button type="submit" variant="active" block size="lg">Sign in</Button>
        </div>
        <p lang="es" className={`${s.small} muted`} style={{ position: 'absolute', left: 36, bottom: 56, margin: 0 }}>
          {LINES.card}
        </p>
      </form>
    </div>
  );
}
export function Switcher({ idp }) {
  const [tech, setTech] = useState(0);
  const [open, setOpen] = useState(true);
  const refs = useRef([]);
  const t = TECH[tech];
  const onKey = (e) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      setOpen(false);
    }
  };
  return (
    <div className={s.scr} onKeyDown={onKey}>
      <StatusBar />
      <div className={s.body}>
        <h2 className={s.h} lang="es">{CAPACITY.titleRows[0]}<br />{CAPACITY.titleRows[1]}</h2>
        <div style={{ margin: '26px 0 14px' }}>
          <button type="button" className="chip" aria-expanded={open} aria-controls={`${idp}-sheet`} onClick={() => setOpen(!open)}>
            Technology
          </button>
        </div>
        <p className={`${s.small} muted`} lang="es" style={{ margin: '0 0 4px' }}>{t.label}</p>
        <p className={s.num} lang="es" aria-live="polite">{t.value}</p>
        <div style={{ marginTop: 28, display: 'grid', gap: 12 }}>
          <Bar w={92} /><Bar w={70} /><Bar w={84} />
        </div>
      </div>
      <div className={s.dim} data-open={open} onClick={() => setOpen(false)} aria-hidden="true" />
      <div id={`${idp}-sheet`} className={s.sheet} data-open={open} role="dialog" aria-label="Technology" inert={!open}>
        <button type="button" className={s.grip} aria-label="Close sheet" onClick={() => setOpen(false)} />
        <div role="radiogroup" aria-label="Technology" onKeyDown={(e) => radioKeys(e, TECH.length, tech, setTech, refs)}>
          {TECH.map((x, i) => (
            <button
              key={x.key}
              ref={(el) => { refs.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={i === tech}
              tabIndex={i === tech ? 0 : -1}
              className={s.rowBtn}
              onClick={() => setTech(i)}
            >
              <PixelIcon name={x.icon} size={32} />
              <span style={{ flex: 1 }} lang="es">{x.label}</span>
              <span className={s.val} lang="es">{x.value}</span>
              <i className={s.sq} />
            </button>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <Button block variant="active" onClick={() => setOpen(false)}>Done</Button>
        </div>
      </div>
    </div>
  );
}
export function Notifications({ idp, go }) {
  const [on, setOn] = useState([true, true, false, false]);
  const flip = (i) => setOn((a) => a.map((v, j) => (j === i ? !v : v)));
  return (
    <div className={s.scr}>
      <StatusBar />
      <div className={s.body}>
        <h2 className={s.h}>Notifications</h2>
        <p className={`${s.small} muted`} style={{ margin: '0 0 16px' }}>{on.filter(Boolean).length} of {TECH.length} on</p>
        <ul className={s.list}>
          {TECH.map((x, i) => (
            <li key={x.key} className={s.item}>
              <PixelIcon name={x.icon} size={32} />
              <div className={s.grow}>
                <span lang="es">{x.label}</span>
                <Bar w={62} />
              </div>
              <Toggle hideLabel label={`${x.label} notifications`} checked={on[i]} onChange={() => flip(i)} id={`${idp}-t-${x.key}`} />
            </li>
          ))}
        </ul>
      </div>
      <TabBar items={TABS} current="12" onGo={(k) => go && go(Number(k))} />
    </div>
  );
}
export const PARAS = [WEB_HERO.body, LINES.posterRightBody.text, LINES.posterLeftBody.text, LINES.fieldBody.text, LINES.clarityBody.text];
export function Reader({ idp }) {
  const [i, setI] = useState(0);
  const step = (d) => setI((v) => Math.min(PARAS.length - 1, Math.max(0, v + d)));
  return (
    <div className={s.scr}>
      <StatusBar />
      <div className={s.body}>
        <h2 className={s.h}>Reader</h2>
        <div role="group" aria-label="Progress" style={{ display: 'grid', gridTemplateColumns: `repeat(${PARAS.length}, 1fr)`, gap: 6, margin: '10px 0 8px' }}>
          {PARAS.map((p, n) => (
            <button
              key={p}
              type="button"
              id={`${idp}-seg-${n}`}
              aria-label={`Paragraph ${n + 1} of ${PARAS.length}`}
              aria-current={n === i ? 'true' : undefined}
              onClick={() => setI(n)}
              style={{ height: 10, border: 0, padding: 0, background: n <= i ? 'var(--active-blue)' : 'var(--dark-blue)', opacity: n <= i ? 1 : 0.22, transition: 'background-color var(--dur-s) var(--ease-out), opacity var(--dur-s) var(--ease-out)' }}
            />
          ))}
        </div>
        <p className={s.small} style={{ margin: '0 0 22px' }}>{i + 1} / {PARAS.length}</p>
        <p key={i} lang="es" className={s.fade} style={{ fontSize: 22, lineHeight: 1.28, margin: 0, minHeight: 330 }} aria-live="polite">
          {PARAS[i]}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
          <Button icon="chevron-left" label="Previous paragraph" variant="outline" cross={false} disabled={i === 0} onClick={() => step(-1)} />
          <Button icon="chevron-right" label="Next paragraph" variant="active" cross={false} disabled={i === PARAS.length - 1} onClick={() => step(1)} />
        </div>
      </div>
    </div>
  );
}
export const HELP = [
  { id: 'a', head: LINES.connect.rows[0], body: LINES.connect.rows[1] },
  { id: 'b', head: LINES.viable.rows[0], body: LINES.viable.rows[1] },
  { id: 'c', head: LINES.field, body: LINES.fieldBody.text },
  { id: 'd', head: LINES.clarity.text, body: LINES.clarityBody.text },
];
export function Help({ idp }) {
  return (
    <div className={s.scr}>
      <StatusBar />
      <div className={s.body}>
        <h2 className={s.h}>Help</h2>
        <p className={`${s.small} muted`} style={{ margin: '0 0 16px' }}>
          {HELP.length} topics
        </p>
        <Accordion idp={`${idp}-acc`} items={HELP} es />
      </div>
    </div>
  );
}
