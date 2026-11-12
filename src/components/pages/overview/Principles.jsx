// The brand's principles as four ruled cells in one row, each with a big numeral. Every principle is a line the
// designer printed on the case study's own pieces, quoted exactly (Spanish, lang="es"); the numerals and the
// "printed on" captions are plain English labels of ours.
import Reveal from '@/components/site/Reveal';
import { PRINCIPLES } from './data';
import s from './overview.module.css';

export default function Principles() {
  return (
    <section className={`${s.band} ${s.principles}`} aria-labelledby="overview-principles-title">
      <div className="wrap">
        <div className={s.sectionHead}>
          <Reveal>
            <p className="t-label">Principles</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="t-h2 t-balance" id="overview-principles-title">
              Four lines the designer wrote, and the brand keeps.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <div className={`cells ${s.principleCells}`} style={{ '--cols': 4 }}>
            {PRINCIPLES.map((p, i) => (
              <figure key={p.n} className={s.principle} style={{ '--i': i }}>
                <span className={`t-num t-num-l ${s.principleNum}`} aria-hidden="true">
                  {p.n}
                </span>
                <blockquote className={`t-h3 ${s.quote}`} lang="es">
                  {p.rows.map((r) => (
                    <span key={r} className={p.tone ? s.quoteSentence : s.quoteRow}>
                      {r}
                    </span>
                  ))}
                </blockquote>
                <figcaption className="t-small muted">{p.source}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
