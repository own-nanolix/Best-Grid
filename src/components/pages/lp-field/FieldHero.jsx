import Art from '@/components/art/Art';
import { WordmarkFitG } from '@/components/art/Mark';
import { LINES, CONTACT } from '@/lib/brand';
import { HeroPhotoArt } from './FieldArt';
import s from './lp-field.module.css';

// The hero, as the m11 left poster: Dark Blue, the word-mark centred at the top, a square photo stand-in with
// "Análisis · Criterio · Validación" over it, the paragraph centred below; guide lines run edge to edge, nodes at
// the crossings. The guides extend first, the nodes snap, then the content rises.
export default function FieldHero() {
  return (
    <section className={`field-dark ${s.hero}`} aria-label="Field work">
      <div className={`${s.row} ${s.rowFirst}`}>
        <div className={s.col}>
          <div className={`${s.markCell} ${s.rise}`} style={{ '--i': 0 }}>
            <Art viewBox="0 0 400 100" title="Best Grid word-mark" exportName="lp-field-wordmark">
              <WordmarkFitG x={0} y={80} w={400} fill="currentColor" />
            </Art>
          </div>
        </div>
      </div>

      <div className={s.row} style={{ '--i': 1 }}>
        <div className={s.col}>
          <span className={s.nodeA} aria-hidden="true" />
          <span className={s.nodeB} aria-hidden="true" />
          <span className={s.nodeC} aria-hidden="true" />
          <div className={s.photoCell}>
            <div className={s.photo}>
              <HeroPhotoArt />
              <h1 className={`${s.photoCap} ${s.rise}`} style={{ '--i': 2 }} tabIndex={-1} lang="es">
                {LINES.field}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className={s.row} style={{ '--i': 2 }}>
        <div className={s.col}>
          <span className={s.nodeA} aria-hidden="true" />
          <span className={s.nodeB} aria-hidden="true" />
          <span className={s.nodeC} aria-hidden="true" />
          <div className={s.foot}>
            <p className={`${s.body} ${s.rise}`} style={{ '--i': 3 }} lang="es">
              {LINES.fieldBody.rows.map((r) => (
                <span key={r}>{r} </span>
              ))}
            </p>
            <div className={s.meta} lang="es">
              <span>{CONTACT.email}</span>
              <span>{CONTACT.web}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
