'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from '@/components/ui/Devices';
import Reveal from '@/components/site/Reveal';
import Icon from '@/components/site/Icon';
import { tEnter } from '@/lib/motion';
import { still } from '@/lib/site';
import { SCREENS, ScreenSvg } from './registry';
import s from './mobile-a.module.css';

// A fixed 390 x 844 artboard scaled with CSS transform to the width of the device screen that holds it.
function Fit({ name, children }) {
  const ref = useRef(null);
  const [k, setK] = useState(0.7);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / 390));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={s.fit}>
      <div className="artboard" data-screen={name} style={{ '--w': 390, '--k': k }}>
        {children}
      </div>
    </div>
  );
}

const typing = (el) => !!el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

export default function MobileDemo() {
  const [cur, setCur] = useState(0);
  const phoneRef = useRef(null);
  const reduce = useReducedMotion();
  const last = SCREENS.length - 1;
  const here = SCREENS[cur];

  const go = (i, block = 'nearest') => {
    const n = Math.max(0, Math.min(last, i));
    setCur(n);
    const el = phoneRef.current;
    if (el) el.scrollIntoView({ behavior: still() ? 'auto' : 'smooth', block });
  };

  // Left / Right step the screens. Shift + arrows belong to the site's dock, so they are left alone.
  useEffect(() => {
    const onKey = (e) => {
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || typing(e.target)) return;
      if (e.key === 'ArrowLeft') setCur((c) => Math.max(0, c - 1));
      else if (e.key === 'ArrowRight') setCur((c) => Math.min(SCREENS.length - 1, c + 1));    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <section className={s.stage} aria-labelledby="mobile-a-live-h">
        <div className={`${s.phoneCol} field-dark`}>
          <div className={s.guideV} aria-hidden="true" />
          <div className={s.phoneBox} ref={phoneRef}>
            <h2 id="mobile-a-live-h" className="sr-only">Live phone</h2>
            <Reveal from="scale">
              <Phone className={s.live} exportName="mobile-a-phone-frame">
                <motion.div
                  key={cur}
                  className={s.swap}
                  initial={reduce ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={tEnter}
                >
                  <Fit name={`mobile-a-live-${here.n}`}>
                    <ScreenSvg i={cur} idp={`mobile-a-live-${here.n}`} label={`Screen ${here.n}: ${here.name}`} animate />
                  </Fit>
                </motion.div>
              </Phone>
            </Reveal>
          </div>
          <div className={s.controls}>
            <button type="button" className={`${s.step} btn btn-sm`} onClick={() => go(cur - 1)} disabled={cur === 0} aria-label="Previous screen">
              <Icon name="arrow-right" size={16} className={s.flip} />
              Previous
            </button>
            <p className={s.count} aria-live="polite" id="mobile-a-caption">
              <span className={s.capNum}>{here.n}</span>
              <span className={s.capName}>{here.name}</span>
              <span className={s.capOf}>Screen {cur + 1} of {SCREENS.length}</span>
            </p>
            <button type="button" className={`${s.step} btn btn-sm`} onClick={() => go(cur + 1)} disabled={cur === last} aria-label="Next screen">
              Next
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
          <p className={s.hint}>Left and Right arrow keys step through the screens.</p>
        </div>

        <div className={s.listCol}>
          <h2 className="t-h3">The nine screens</h2>
          <ol className={s.list} aria-label="Screens">
            {SCREENS.map((sc, i) => (
              <li key={sc.n}>
                <button
                  type="button"
                  className={s.item}
                  aria-current={i === cur ? 'true' : undefined}
                  aria-label={`Screen ${sc.n}: ${sc.name}`}
                  onClick={() => go(i)}
                >
                  <span className={s.num}>{sc.n}</span>
                  <span className={s.itemText}>
                    <span className={s.itemName}>{sc.name}</span>
                    <span className={s.itemUses} lang="es">{sc.uses}</span>
                  </span>
                  <span className={s.itemNode} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${s.rowSec} field-periwinkle`} aria-labelledby="mobile-a-row-h">
        <div className="wrap">
          <h2 id="mobile-a-row-h" className="t-h3">All nine side by side</h2>
          <ul className={s.row}>
            {SCREENS.map((sc, i) => (
              <li key={sc.n}>
                <button
                  type="button"
                  className={s.mini}
                  aria-pressed={i === cur}
                  aria-label={`Show screen ${sc.n}: ${sc.name} in the live phone`}
                  onClick={() => go(i, 'center')}
                >
                  <Phone className={s.miniPhone}>
                    <Fit name={`mobile-a-${sc.n}`}>
                      <ScreenSvg i={i} idp={`mobile-a-row-${sc.n}`} />
                    </Fit>
                  </Phone>
                  <span className={s.miniNum}>{sc.n}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
