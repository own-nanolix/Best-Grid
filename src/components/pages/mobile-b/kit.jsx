'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/site/Icon';
import { MARK_D } from '@/components/art/Mark';
import s from './mobile-b.module.css';
export const SCREEN_W = 390;
export function Fit({ screen, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const set = () => el.style.setProperty('--k', String(el.clientWidth / SCREEN_W));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={s.fit}>
      <div className={`artboard ${s.board}`} data-screen={screen}>
        {children}
      </div>
    </div>
  );
}
export function Bar({ w = 60 }) {
  return <i className={s.bar} style={{ width: `${w}%` }} aria-hidden="true" />;
}
export function StatusBar() {
  return (
    <div className={s.sb} aria-hidden="true">
      <div className={s.sbr}>
        <svg width="22" height="14" viewBox="0 0 22 14" fill="currentColor">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 6} y={10 - i * 3} width="4" height={4 + i * 3} />
          ))}
        </svg>
        <svg width="28" height="14" viewBox="0 0 28 14" fill="currentColor">
          <rect x="0" y="1" width="24" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3" y="4" width="14" height="6" />
          <rect x="25" y="5" width="3" height="4" />
        </svg>
      </div>
    </div>
  );
}
export function Mark({ size = 44 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d={MARK_D} fillRule="evenodd" />
    </svg>
  );
}
export function TabBar({ items, current, onGo, flat = false, label = 'Tab bar' }) {
  return (
    <nav className={`${s.tabbar} ${flat ? s.flat : ''}`} aria-label={label}>
      {items.map((it) => (
        <button key={it.key} type="button" className={s.tb} aria-current={it.key === current ? 'page' : undefined} onClick={() => onGo(it.key)}>
          <Icon name={it.icon} size={22} />
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
export function Accordion({ idp, items, es = false, initial = 0 }) {
  const [open, setOpen] = useState(initial);
  return (
    <div className={s.acc}>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.id}>
            <h3 className={s.accHead}>
              <button type="button" id={`${idp}-h-${i}`} className={s.accBtn} aria-expanded={on} aria-controls={`${idp}-p-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                <span lang={es ? 'es' : undefined}>{it.head}</span>
                <Icon name="chevron-down" size={20} />
              </button>
            </h3>
            <div id={`${idp}-p-${i}`} role="region" aria-labelledby={`${idp}-h-${i}`} className={s.accPanel} data-open={on}>
              <div>
                <p lang={es ? 'es' : undefined}>{it.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
// A bottom sheet's drag handle: drag it down past 80 px (or press it, or Escape on the sheet) to close.
// Returns the drag offset for the sheet's style and the props for the handle button.
export function useSheetDrag(onClose) {
  const [dy, setDy] = useState(0);
  const from = useRef(null);
  const moved = useRef(false);
  const end = () => {
    if (from.current === null) return;
    from.current = null;
    if (dy > 80) onClose();
    setDy(0);
  };
  const grip = {
    style: { touchAction: 'none', cursor: 'grab' },
    onPointerDown: (e) => { from.current = e.clientY; moved.current = false; e.currentTarget.setPointerCapture(e.pointerId); },
    onPointerMove: (e) => {
      if (from.current === null) return;
      const d = Math.max(0, e.clientY - from.current);
      if (d > 4) moved.current = true;
      setDy(d);
    },
    onPointerUp: end,
    onPointerCancel: end,
    onClick: () => { if (!moved.current) onClose(); },
    onKeyDown: (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); onClose(); } },
  };
  const sheetStyle = dy ? { transform: `translateY(${dy}px)`, transition: 'none' } : undefined;
  return { grip, sheetStyle };
}
export function radioKeys(e, count, current, pick, refs) {
  let n = -1;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (current + 1) % count;
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (current - 1 + count) % count;
  if (n < 0) return;
  e.preventDefault();
  pick(n);
  if (refs.current[n]) refs.current[n].focus();
}
