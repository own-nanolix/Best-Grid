'use client';

// The vertical timeline of the strategy: one guide line at 27% of the width (as the letterhead of m05), a ruled
// hairline across at each station with a square node at the crossing. Signature moment: the guide fills with Dark
// Blue as you scroll down it, and each node snaps in as its station arrives.
// Motion moves wrappers only (opacity and transform); every animation lands on its final value.
import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { scrollToId } from '@/lib/site';
import { tNode, tEnter } from '@/lib/motion';
import s from './strategy.module.css';

export function Timeline({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 72%', 'end 72%'] });
  return (
    <div ref={ref} className={s.timeline}>
      <div className={s.spine} aria-hidden="true" />
      <motion.div className={s.spineFill} style={{ scaleY: scrollYProgress }} aria-hidden="true" />
      {children}
    </div>
  );
}

// One station: the node on the guide, the head in the narrow left column (sticky on wide screens), the body right.
export function Station({ id, no, title, note, children }) {
  return (
    <article className={s.station} id={id} aria-labelledby={`${id}-title`}>
      <span className={s.nodeWrap} aria-hidden="true">
        <motion.span
          className={s.nodeSq}
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={tNode}
        />
      </span>
      <header className={s.stationHead}>
        <div className={s.stationHeadInner}>
          <motion.p
            className={`t-num t-num-l ${s.stationNo}`}
            aria-hidden="true"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={tEnter}
          >
            {no}
          </motion.p>
          <h2 id={`${id}-title`} className="t-h2">
            {title}
          </h2>
          <p className="t-small muted">{note}</p>
        </div>
      </header>
      <div className={s.stationBody}>{children}</div>
    </article>
  );
}

// The four stations as buttons that scroll to them (no plain anchors).
export function StationNav({ items }) {
  return (
    <ol className={s.stationNav} aria-label="Stations of the strategy">
      {items.map((it, i) => (
        <li key={it.id}>
          <button type="button" className={s.stationNavBtn} onClick={() => scrollToId(it.id)} style={{ '--i': i }}>
            <span className={`t-num t-num-s ${s.stationNavNo}`}>{it.no}</span>
            <span className="t-lead">{it.title}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
