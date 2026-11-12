'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Phone } from '@/components/ui/Devices';
import Button from '@/components/ui/Button';
import { ease, dur } from '@/lib/motion';
import { scrollToId } from '@/lib/site';
import { Fit } from './kit';
import { SignIn, Switcher, Notifications, Reader, Help } from './ScreensA';
import { Settings, Documents, ShareScreen, Profile } from './ScreensB';
import s from './mobile-b.module.css';
export const SCREENS = [
  { n: 10, name: 'Sign in', C: SignIn },
  { n: 11, name: 'Technology switcher', C: Switcher },
  { n: 12, name: 'Notifications', C: Notifications },
  { n: 13, name: 'Reader', C: Reader },
  { n: 14, name: 'Help', C: Help },
  { n: 15, name: 'Settings', C: Settings },
  { n: 16, name: 'Documents', C: Documents },
  { n: 17, name: 'Share and contact', C: ShareScreen },
  { n: 18, name: 'Profile', C: Profile },
];
export const COMPONENTS = ['Status bar', 'Nav', 'Tab bar', 'List row', 'Menu row', 'Card', 'Stat card', 'Input', 'Accordion', 'Sheet'];
export const PATTERNS = ['Pull to refresh', 'Swipe between screens', 'Tap a row to expand', 'Bottom sheet', 'Tab bar change', 'Stepper', 'Long press and toggle'];
const BLOCK = 'input, textarea, select, [role="dialog"], [role="radiogroup"], [role="tablist"], [contenteditable="true"]';
function Spine({ title, items, id }) {
  return (
    <nav aria-label={title}>
      <h3 className="t-label" style={{ margin: '0 0 12px', fontWeight: 400 }}>{title}</h3>
      <ol className={s.rail} style={{ padding: 0, margin: 0 }}>
        {items.map((x, i) => (
          <li key={x}>
            <button type="button" className={s.railBtn} onClick={() => scrollToId(id(i))}>
              <span className={s.railN}>{i + 1}</span>
              <span>{x}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
export default function Showcase() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const rm = useReducedMotion();
  const pick = (i) => {
    const n = Math.min(SCREENS.length - 1, Math.max(0, i));
    setDir(n >= index ? 1 : -1);
    setIndex(n);
  };
  const onKey = (e) => {
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.target.closest && e.target.closest(BLOCK)) return;
    e.preventDefault();
    pick(index + (e.key === 'ArrowRight' ? 1 : -1));
  };
  const cur = SCREENS[index];
  const Cur = cur.C;
  const go = (n) => {
    const i = SCREENS.findIndex((x) => x.n === n);
    if (i >= 0) pick(i);
  };
  return (
    <>
      <section className="wrap band" aria-labelledby="mobile-b-live-h">
        <h2 id="mobile-b-live-h" className="t-h2" style={{ marginBottom: 28 }}>Live screens, 10 to 18.</h2>
        <div className={s.stageGrid} onKeyDown={onKey}>
          <Spine title="Components" items={COMPONENTS} id={() => 'mobile-b-components'} />
          <div className={s.phoneBox}>
            <Phone exportName="mobile-b-phone-frame">
              <Fit screen={`mobile-b-live-${cur.n}`}>
                <AnimatePresence initial={false} custom={dir}>
                  <motion.div
                    key={cur.n}
                    className={s.pane}
                    initial={{ opacity: 0, x: rm ? 0 : dir * 36 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: dur.m, ease: ease.out } }}
                  >
                    <Cur idp="mobile-b-live" go={go} />
                  </motion.div>
                </AnimatePresence>
              </Fit>
            </Phone>
            <div className={s.controls}>
              <Button variant="outline" icon="chevron-left" cross={false} disabled={index === 0} onClick={() => pick(index - 1)}>Previous</Button>
              <span className={s.count} role="status" aria-live="polite">{cur.n} of 18</span>
              <Button variant="active" iconRight="chevron-right" disabled={index === SCREENS.length - 1} onClick={() => pick(index + 1)}>Next</Button>
            </div>
            <p className="t-small muted" style={{ margin: '10px 0 18px' }}>Left and Right arrow keys step through the screens.</p>
            <nav aria-label="Screens">
              <ol className={s.rail} style={{ padding: 0, margin: 0 }}>
                {SCREENS.map((x, i) => (
                  <li key={x.n}>
                    <button type="button" className={s.railBtn} aria-current={i === index ? 'true' : undefined} onClick={() => pick(i)}>
                      <span className={s.railN}>{x.n}</span>
                      <span>{x.name}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          <Spine title="Interaction patterns" items={PATTERNS} id={(i) => `mobile-b-pat-${i + 1}`} />
        </div>
      </section>
      <section className="field-dark band" aria-labelledby="mobile-b-nine-h">
        <div className="wrap">
          <h2 id="mobile-b-nine-h" className="t-h2" style={{ marginBottom: 28 }}>All nine together.</h2>
          <div className={s.nine}>
            {SCREENS.map((x, i) => {
              const C = x.C;
              return (
                <div key={x.n} className={s.nineItem}>
                  <div className={s.cellwrap}>
                    <Fit screen={`mobile-b-${x.n}`}>
                      <div inert>
                        <C idp="mobile-b-all" go={() => {}} />
                      </div>
                    </Fit>
                    <button
                      type="button"
                      className={s.pick}
                      aria-label={`Show screen ${x.n}, ${x.name}`}
                      aria-pressed={i === index}
                      onClick={() => {
                        pick(i);
                        scrollToId('mobile-b-live-h');
                      }}
                    />
                  </div>
                  <div className={s.nineCap}><span>{x.n}</span><span>{x.name}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
