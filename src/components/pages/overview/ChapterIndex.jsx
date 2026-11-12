// The index of every chapter: a ledger of ruled cells, three across, one block per group. Each cell is a link to
// its chapter (next/link, trailing slash). A map of the whole site (an exportable SVG) opens the section.
import Link from 'next/link';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { groups, pages, href } from '@/lib/pages';
import ChapterMap from './ChapterMap';
import s from './overview.module.css';

export default function ChapterIndex() {
  return (
    <section className={`${s.band} ${s.index}`} aria-labelledby="overview-index-title">
      <div className="wrap">
        <div className={s.sectionHead}>
          <Reveal>
            <p className="t-label">Index of chapters</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="t-h2 t-balance" id="overview-index-title">
              Every chapter, in the order a brand is built.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-lead muted">
              {pages.length} chapters in {groups.length} groups. Open any cell to go there.
            </p>
          </Reveal>
        </div>
        <Reveal from="scale" delay={80}>
          <div className={s.map}>
            <ChapterMap />
          </div>
        </Reveal>
        <div className={s.ledger}>
          {groups.map((g) => (
            <Reveal key={g.name} as="div" className={s.ledgerBlock}>
              <div className={s.ledgerHead}>
                <h3 className="t-h3">{g.name}</h3>
                <span className="t-small muted">{g.pages.length} chapters</span>
              </div>
              <div className="cells" style={{ '--cols': 3 }}>
                {g.pages.map((p) => {
                  const n = pages.findIndex((q) => q.id === p.id) + 1;
                  return (
                    <Link key={p.id} href={href(p.id)} className={s.ledgerCell} aria-current={p.id === 'overview' ? 'page' : undefined}>
                      <span className={`t-num t-num-s ${s.ledgerNum}`}>{String(n).padStart(2, '0')}</span>
                      <span className={`t-lead ${s.ledgerTitle}`}>{p.title}</span>
                      <Icon name="arrow-right" size={18} className={s.ledgerArrow} />
                    </Link>
                  );
                })}
                {Array.from({ length: (3 - (g.pages.length % 3)) % 3 }, (_, i) => (
                  <span key={`f${i}`} className={s.ledgerFill} aria-hidden="true" />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
