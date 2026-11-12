'use client';

import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import s from './lp-annual-report.module.css';

// "On this page", set as the contents page of a report: an oversized ordinal, the entry, a hairline leader and the
// section it opens. Each row is a button that scrolls to its section (no #anchor links) and moves focus to its
// heading; under reduced motion the jump is instant.
const ENTRIES = [
  { id: 'lp-annual-report-figures', name: 'Figures', note: 'Technology tiles and the 2025 dashboard' },
  { id: 'lp-annual-report-cover-h', name: 'The cover', note: 'Three reports, stacked' },
  { id: 'lp-annual-report-ways-h', name: 'Two covers', note: 'Active Blue and Dark Blue' },
  { id: 'lp-annual-report-spine-h', name: 'The spine', note: 'Mark, IDAA, range, BGS' },
  { id: 'lp-annual-report-line-h', name: 'On the page', note: 'The cover line' },
  { id: 'lp-annual-report-q-h', name: 'Capacity by quarter', note: 'Q1 to Q4, 2025' },
  { id: 'lp-annual-report-tree-h', name: 'Capacity managed, 2025', note: 'The treemap' },
  { id: 'lp-annual-report-printed', name: 'Printed on the report', note: 'Every printed line' },
  { id: 'lp-annual-report-request', name: 'Request the report', note: 'Name and email address' },
];

function go(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  (el.closest('section') || el).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

export default function Contents() {
  return (
    <section className={`field-light ${s.toc}`} aria-labelledby="lp-annual-report-contents">
      <div className={s.tocHead}>
        <Reveal>
          <h2 id="lp-annual-report-contents" className={s.title}>On this page</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="t-small muted">Nine entries, in the order they follow.</p>
        </Reveal>
      </div>
      <ol className={s.tocList}>
        {ENTRIES.map((e, i) => (
          <li key={e.id}>
            <Reveal delay={i * 40}>
              <button type="button" className={s.tocRow} onClick={() => go(e.id)}>
                <span className={s.tocNo}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.tocName}>{e.name}</span>
                <span className={s.tocLeader} aria-hidden="true" />
                <span className={s.tocNote}>{e.note}</span>
                <Icon name="arrow-right" size={20} />
              </button>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
