'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';
import { dur, ease } from '@/lib/motion';

// <CountUp value="15.420 MW" /> counts the first number in the text up from zero when it scrolls into view.
// Numbers are read in the case study's Spanish format by default (dot = thousands, comma = decimals:
// "12.157 MW", "68%"); pass locale="en" for "1,234.5". The server HTML already holds the final text, and the
// count always lands on it. Pass lang="es" for Spanish copy around the number.
export default function CountUp({ value, duration = dur.l * 1.6, locale = 'es', className, as: Tag = 'span', ...rest }) {
  const ref = useRef(null);
  const text = String(value);
  useEffect(() => {
    const el = ref.current;
    const group = locale === 'es' ? '.' : ',';
    const dec = locale === 'es' ? ',' : '.';
    const re = locale === 'es' ? /\d{1,3}(\.\d{3})+(,\d+)?|\d+(,\d+)?/ : /\d{1,3}(,\d{3})+(\.\d+)?|\d+(\.\d+)?/;
    const m = text.match(re);
    if (!el || !m || still()) return;
    const raw = m[0];
    const target = parseFloat(raw.split(group).join('').replace(dec, '.'));
    const decimals = (raw.split(dec)[1] || '').length;
    const grouped = raw.includes(group);
    const pad = /^0\d/.test(raw) ? raw.split(dec)[0].length : 0;
    const show = (v) => {
      let s = v.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouped ? 'always' : false });
      if (pad) s = s.padStart(pad, '0');
      el.textContent = text.replace(raw, s);
    };
    // the brand's entering curve, evaluated as a cubic bezier (no overshoot)
    const [x1, y1, x2, y2] = ease.out;
    const bez = (t) => {
      let u = t;
      for (let i = 0; i < 8; i++) {
        const x = 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u - t;
        const dx = 3 * (1 - u) * (1 - u) * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u * u * (1 - x2);
        if (Math.abs(dx) < 1e-6) break;
        u = Math.min(1, Math.max(0, u - x / dx));
      }
      return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u;
    };
    let frame = 0;
    let start = 0;
    let done = false;
    const run = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / (duration * 1000));
      show(target * bez(p));
      if (p < 1) frame = requestAnimationFrame(run);
      else {
        el.textContent = text;
        done = true;
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          show(0);
          frame = requestAnimationFrame(run);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      if (!done) el.textContent = text;
    };
  }, [text, duration, locale]);
  return (
    <Tag ref={ref} className={className} {...rest}>
      {text}
    </Tag>
  );
}
