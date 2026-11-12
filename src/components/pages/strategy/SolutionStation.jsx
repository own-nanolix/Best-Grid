// Station 03, the solution. Three things the case study says about it, each in its own words: the designer's
// sentence about the visual system, the poster line "Los proyectos avanzan cuando la estructura es clara.", and the
// website's paragraph about what the consultancy does at critical nodes. The three words of the field poster
// (Análisis · Criterio · Validación) and the three services of the tube label close the station.
import Reveal from '@/components/site/Reveal';
import { Rows } from '@/components/ui/Card';
import { LINES, WEB_HERO } from '@/lib/brand';
import { DESIGNER_WORDS, SERVICES, STATIONS } from './data';
import { Station } from './Timeline';
import Method from './Method';
import s from './strategy.module.css';

export default function SolutionStation() {
  const st = STATIONS[2];
  return (
    <Station {...st}>
      <Reveal>
        <p className={`t-h3 ${s.designerLine}`}>{DESIGNER_WORDS.solution}</p>
        <p className={`t-small muted ${s.caption}`}>From the project description.</p>
      </Reveal>

      <Reveal delay={60}>
        <Rows rows={LINES.clarity.rows} as="p" lang="es" className={`t-h1 ${s.bigLine}`} />
        <p className={`t-body ${s.bodyEs}`} lang="es">
          {LINES.clarityBody.text}
        </p>
        <p className={`t-small muted ${s.caption}`}>Printed on the Active Blue poster.</p>
      </Reveal>

      <Reveal delay={60}>
        <figure className={s.plate}>
          <div className={s.plateArt}>
            <Method />
          </div>
          <figcaption className={s.plateCap}>
            <span lang="es">{LINES.fieldBody.text}</span>
            <span className="muted">Printed on the field poster.</span>
          </figcaption>
        </figure>
      </Reveal>

      <div className={`cells ${s.pair}`} style={{ '--cols': 2 }}>
        <Reveal as="div" className={s.pairCell}>
          <p className="t-label">What is done at the nodes</p>
          <p className={`t-body ${s.bodyEs}`} lang="es">
            {WEB_HERO.body}
          </p>
          <p className="t-small muted">Printed on the website.</p>
        </Reveal>
        <Reveal as="div" className={s.pairCell} delay={80}>
          <p className="t-label">Three services</p>
          <ul className={s.services}>
            {SERVICES.map((v, i) => (
              <li key={v} className="t-h3" lang="es" style={{ '--i': i }}>
                {v}
              </li>
            ))}
          </ul>
          <p className="t-small muted">Printed on the project tube label.</p>
        </Reveal>
      </div>
    </Station>
  );
}
