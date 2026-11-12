// Station 01, the problem. The case study states it twice: in the designer's description (complexity is not the
// problem, lack of structure is) and on the event screen (generating energy is no longer the challenge; making the
// connection viable is). The drawing shows the premise: tangled strands arriving at the rows of a grid.
import Reveal from '@/components/site/Reveal';
import { TwoTone } from '@/components/ui/Card';
import { LINES } from '@/lib/brand';
import { DESIGNER_WORDS, STATIONS } from './data';
import { Station } from './Timeline';
import Tangle from './Tangle';
import s from './strategy.module.css';

export default function ProblemStation() {
  const st = STATIONS[0];
  return (
    <Station {...st}>
      <Reveal>
        <TwoTone rows={LINES.viable.rows} tone={LINES.viable.tone} as="p" lightClass="muted" darkClass="dark" lang="es" className={`t-h1 ${s.bigLine}`} />
        <p className={`t-small muted ${s.caption}`}>Printed on the event screen.</p>
      </Reveal>

      <Reveal delay={80}>
        <figure className={s.plate}>
          <div className={s.plateArt}>
            <Tangle />
          </div>
          <figcaption className={s.plateCap}>
            <span>The premise, drawn.</span>
            <span className="muted">Strands of complexity arrive at the rows of a ruled grid.</span>
          </figcaption>
        </figure>
      </Reveal>

      <div className={`cells ${s.pair}`} style={{ '--cols': 2 }}>
        <Reveal as="div" className={s.pairCell}>
          <p className="t-label">In the designer&apos;s words</p>
          <blockquote className={`t-h3 ${s.pairQuote}`}>
            &ldquo;…{DESIGNER_WORDS.premise}.&rdquo;
          </blockquote>
          <p className="t-small muted">From the project description.</p>
        </Reveal>
        <Reveal as="div" className={s.pairCell} delay={80}>
          <p className="t-label">Where the problem sits</p>
          <blockquote className={`t-h3 ${s.pairQuote}`} lang="es">
            {LINES.tube.rows.map((r) => (
              <span key={r} className={s.row}>
                {r}
              </span>
            ))}
          </blockquote>
          <p className="t-small muted">Printed on the project tube label.</p>
        </Reveal>
      </div>
    </Station>
  );
}
