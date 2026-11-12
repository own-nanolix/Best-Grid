// About this brand: a two-column spec sheet. Left, the contents as a numbered table with oversized chapter numerals
// (the nine chapters of the brand foundations). Right, the designer's own description, the credit and the lattice.
import Link from 'next/link';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { groups, pages, href } from '@/lib/pages';
import { BRAND, DESCRIPTION, DESIGNER, PROJECT_TITLE } from '@/lib/brand';
import Lattice from './Lattice';
import s from './overview.module.css';

// One plain line per chapter of the foundations: what the sheet holds (our words, deliverable names only).
const NOTES = {
  overview: 'Cover, principles and the indexes',
  logo: 'Mark, word-mark and lockups',
  color: 'The three published blues and their tints',
  gradients: 'Gradients and key art from the lattice',
  typography: 'The brand typeface in Regular',
  icons: 'Pixel icons on the 32 grid',
  dataviz: 'Charts in the area, treemap and node grid',
  motion: 'Easing, durations and the hard-cut cycle',
  strategy: 'The idea of the grid, and its figures',
};

export default function About() {
  const foundations = groups[0].pages;
  return (
    <section className={s.about} aria-labelledby="overview-about-title">
      <div className={s.aboutGrid}>
        <div className={s.contents}>
          <Reveal>
            <p className="t-label" id="overview-contents-label">Contents</p>
          </Reveal>
          <Reveal delay={60}>
            <div className="spec-wrap">
              <table className={`spec ${s.contentsTable}`} aria-labelledby="overview-contents-label">
                <tbody>
                  {foundations.map((p, i) => (
                    <tr key={p.id}>
                      <td className={`spec-num ${s.chapterNum}`}>{String(i + 1).padStart(2, '0')}</td>
                      <th scope="row">
                        <Link href={href(p.id)} className={s.chapterLink}>
                          <span className="t-h3">{p.title}</span>
                          <span className={`t-small muted ${s.chapterNote}`}>{NOTES[p.id]}</span>
                          <Icon name="arrow-right" size={20} className={s.chapterArrow} />
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className={`t-small muted ${s.contentsFoot}`}>
              {pages.length} chapters in {groups.length} groups. The nine above are the foundations; the index below lists every chapter.
            </p>
          </Reveal>
        </div>

        <div className={s.describe}>
          <Reveal>
            <p className="t-label" id="overview-about-title">About this brand</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 tabIndex={-1} className={`t-h1 ${s.title}`}>
              {PROJECT_TITLE}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className={`t-lead ${s.description}`}>{DESCRIPTION}</p>
          </Reveal>
          <Reveal delay={180}>
            <dl className={`specs ${s.credit}`} style={{ '--cols': 2 }}>
              <div>
                <dt>Brand</dt>
                <dd className="t-h3">{BRAND}</dd>
              </div>
              <div>
                <dt>Designed by</dt>
                <dd className="t-h3">{DESIGNER}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd className="t-h3">April 15th 2026</dd>
              </div>
              <div>
                <dt>Chapters</dt>
                <dd className="t-h3">{pages.length}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal from="scale" delay={120}>
            <div className={s.lattice}>
              <Lattice />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
