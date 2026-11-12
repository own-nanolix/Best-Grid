'use client';

import { createContext, useContext, useRef, useState } from 'react';
import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { INK } from './data';
import s from './dataviz.module.css';

// Tooltip plumbing: a chart card provides it, a mark asks for props. The tooltip is HTML beside the SVG, so the
// exported artwork stays clean. Hover and keyboard focus show it; leave and blur hide it.
const TipCtx = createContext(null);
// Text in the small 400-wide charts is set larger so it stays legible when the card is narrow.
const TextK = createContext(1);

export function useTip() {
  const show = useContext(TipCtx);
  // bind(text, es): the props for one mark. es marks Spanish brand copy.
  return (text, es = false) => ({
    tabIndex: 0,
    role: 'img',
    'aria-label': text,
    onMouseEnter: show ? (e) => show.on(text, es, e.currentTarget) : undefined,
    onFocus: show ? (e) => show.on(text, es, e.currentTarget) : undefined,
    onMouseLeave: show ? show.off : undefined,
    onBlur: show ? show.off : undefined,
  });
}

// A hover target without a tab stop (many small marks inside one focusable group).
export function useHover() {
  const show = useContext(TipCtx);
  return (text, es = false) => ({
    onMouseEnter: show ? (e) => show.on(text, es, e.currentTarget) : undefined,
    onMouseLeave: show ? show.off : undefined,
  });
}

export function Tip({ tip }) {
  if (!tip) return null;
  return (
    <div className={s.tip} style={{ left: tip.x, top: tip.y }} role="status">
      <span lang={tip.es ? 'es' : undefined}>{tip.text}</span>
    </div>
  );
}

// kind: the chart family (trend, comparison, share, distribution, time, flow, place, ranking, ...).
export function ChartCard({ id, kind, title, caption, source, span = 3, actions, legend, tone, children }) {
  const ref = useRef(null);
  const [tip, setTip] = useState(null);
  const api = {
    on(text, es, el) {
      const f = ref.current.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const x = Math.min(Math.max(r.left + r.width / 2 - f.left, 70), f.width - 70);
      setTip({ text, es, x, y: r.top - f.top - 8 });
    },
    off: () => setTip(null),
  };
  return (
    <TipCtx.Provider value={api}>
      <figure ref={ref} id={id} className={`${s.card} ${s['span' + span]} ${tone === 'dark' ? s.cardDark : ''}`}>
        <figcaption className={s.cardHead}>
          <span>
            <span className={`${s.kind} t-label`}>{kind}</span>
            <span className={`${s.cardTitle} t-h3`}>{title}</span>
          </span>
          {actions}
        </figcaption>
        <div className={s.art}>{children}</div>
        {legend}
        <p className={`${s.cap} t-small muted`}>
          {caption} <span className={s.src}>Source: {source}.</span>
        </p>
        <Tip tip={tip} />
      </figure>
    </TipCtx.Provider>
  );
}

// The exportable SVG of every chart: paper ground, <title>, role, data-export.
export function Chart({ name, title, w = 400, h = 300, bg = HEX.paper, children }) {
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={`dataviz-${name}`} className={s.svg}>
      <rect width={w} height={h} fill={bg} />
      <TextK.Provider value={w <= 600 && w >= 400 ? 1.2 : 1}>{children}</TextK.Provider>
    </Art>
  );
}

// SVG text in the brand stack; es marks brand copy in Spanish.
export function T({ es: spanish, size = 13, fill = INK, anchor, children, ...rest }) {
  const k = useContext(TextK);
  return (
    <text fontSize={Math.round(size * k * 10) / 10} fill={fill} textAnchor={anchor} lang={spanish ? 'es' : undefined} {...rest}>
      {children}
    </text>
  );
}

// Legend: swatches are squares (the system has no round marks except the year chip).
export function Legend({ items, className = '' }) {
  return (
    <ul className={`${s.legend} ${className}`}>
      {items.map((it) => (
        <li key={it.label} className="t-small">
          <span className={s.sw} style={{ background: it.color, opacity: it.opacity ?? 1, boxShadow: it.line ? `inset 0 0 0 1px ${INK}` : undefined }} aria-hidden="true" />
          <span lang={it.es ? 'es' : undefined}>{it.label}</span>
        </li>
      ))}
    </ul>
  );
}
