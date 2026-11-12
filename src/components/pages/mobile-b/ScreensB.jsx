'use client';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import Icon from '@/components/site/Icon';
import { toast } from '@/components/site/Toast';
import { copy } from '@/lib/site';
import { CONTACT, REPORT, BRAND } from '@/lib/brand';
import { BadgeCard, CardFront } from './IdPieces';
import { Bar, StatusBar, Mark } from './kit';
import s from './mobile-b.module.css';
export function Settings({ idp }) {
  const [ground, setGround] = useState('Light');
  const [on, setOn] = useState([true, false, true]);
  const names = ['Notifications', 'Reduce motion', 'Sync'];
  const flip = (i) => setOn((a) => a.map((v, j) => (j === i ? !v : v)));
  return (
    <div className={s.scr} data-theme={ground === 'Dark' ? 'dark' : 'light'}>
      <StatusBar />
      <div className={s.body}>
        <h2 className={s.h}>Settings</h2>
        <p className={`${s.small} muted`} style={{ margin: '0 0 10px' }}>Ground</p>
        <Segmented id={`${idp}-ground`} label="Ground" options={['Light', 'Dark']} value={ground} onChange={setGround} />
        <ul className={s.list} style={{ marginTop: 22 }}>
          {names.map((n, i) => (
            <li key={n} className={s.item}>
              <div className={s.grow}>
                <span>{n}</span>
                <Bar w={55} />
              </div>
              <Toggle hideLabel label={n} checked={on[i]} onChange={() => flip(i)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export function Documents() {
  return (
    <div className={s.scr}>
      <StatusBar />
      <div className={s.body}>
        <h2 className={s.h}>Documents</h2>
        <ul className={s.list} style={{ marginTop: 18 }}>
          <li className={s.item} style={{ minHeight: 96 }}>
            <div style={{ width: 54, height: 72, background: 'var(--dark-blue)', color: 'var(--active-blue)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <Mark size={30} />
            </div>
            <div className={s.grow}>
              <span lang="es" style={{ fontSize: 17 }}>{REPORT.titleRows.join(' ')}</span>
              <span className={`${s.val} muted`} lang="es">{REPORT.spine} · {REPORT.range}</span>
            </div>
          </li>
          {[70, 52, 64, 46].map((w) => (
            <li key={w} className={s.item}>
              <Icon name="document" size={24} />
              <div className={s.grow}><Bar w={w} /><Bar w={w - 22} /></div>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 22 }}>
          <Button variant="active" block size="lg" iconRight="download" onClick={() => toast('Preview only: nothing is downloaded')}>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
export function ShareScreen() {
  const rows = [
    { k: 'Phone', v: [CONTACT.phone] },
    { k: 'Email', v: [CONTACT.email] },
    { k: 'Web', v: [CONTACT.web] },
    { k: 'Handle', v: [CONTACT.handle] },
    { k: 'Address', v: CONTACT.address },
  ];
  const doCopy = async (k, v) => {
    const ok = await copy(v.join(', '));
    toast(ok ? `${k} copied` : `Could not copy ${k.toLowerCase()}`);
  };
  return (
    <div className={s.scr}>
      <StatusBar />
      <div className={s.body}>
        <h2 className={s.h}>Share</h2>
        <p className={`${s.small} muted`} style={{ margin: '0 0 12px' }}>{BRAND}</p>
        <ul className={s.list}>
          {rows.map((r) => (
            <li key={r.k} className={s.item} style={{ alignItems: 'flex-start', padding: '12px 0' }}>
              <div className={s.grow}>
                <span className={`${s.small} muted`}>{r.k}</span>
                <span lang="es" style={{ fontSize: 15, lineHeight: 1.3 }}>
                  {r.v.map((l) => (
                    <span key={l} style={{ display: 'block' }}>{l}</span>
                  ))}
                </span>
              </div>
              <Button icon="copy" size="sm" variant="outline" label={`Copy ${r.k.toLowerCase()}`} cross={false} className={s.copyBtn} onClick={() => doCopy(r.k, r.v)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export function Profile({ idp }) {
  const [view, setView] = useState('Badge');
  return (
    <div className={s.scr}>
      <StatusBar />
      <div className={s.body}>
        <h2 className={s.h}>Profile</h2>
        <div style={{ margin: '4px 0 16px' }}>
          <Segmented id={`${idp}-view`} label="Profile view" options={['Badge', 'Card']} value={view} onChange={setView} />
        </div>
        <div className={s.fade} key={view}>{view === 'Badge' ? <BadgeCard width={250} /> : <CardFront width={318} />}</div>
        <div style={{ display: 'grid', gap: 10, marginTop: 28 }}>
          <Bar w={80} /><Bar w={58} /><Bar w={70} />
        </div>
      </div>
    </div>
  );
}
