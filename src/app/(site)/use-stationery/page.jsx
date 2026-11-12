import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { FlatLay, LetterEnvelope } from '@/components/pages/use-stationery/PlateA';
import { CardsPlate, PenNotebooks } from '@/components/pages/use-stationery/PlateB';
import { Brochure, ReportPlate, DeckPlate } from '@/components/pages/use-stationery/PlateC';
import { SLIDES, SLIDE } from '@/components/pages/use-stationery/Slides';
import { FLATS } from '@/components/pages/use-stationery/Flats';
import Art from '@/components/art/Art';
import s from '@/components/pages/use-stationery/use-stationery.module.css';

export const metadata = pageMeta('use-stationery');

function Plate({ name, children }) {
  return (
    <figure className={s.plate}>
      <div className={`mock ${s.stageBox}`} role="region" aria-label={name} tabIndex={0}>
        {children}
      </div>
      <figcaption className="mock-cap">
        <span>{name}</span>
      </figcaption>
    </figure>
  );
}

function Head({ n, title, children }) {
  return (
    <div className={s.head}>
      <div>
        <span className="t-label">{n}</span>
        <h2 className="t-h2">{title}</h2>
      </div>
      <p className="t-lead muted">{children}</p>
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-stationery" aria-label="Stationery">
      <div className="wrap">
        <div className={s.hero}>
          <h1 className="t-display t-balance" tabIndex={-1}>
            Stationery,
            <br />
            from the flat lay to the deck.
          </h1>
          <p className="t-lead muted">
            Every printed piece the case study shows, rebuilt flat and staged under one spotlight, then carried on in the
            same language: hairlines, cells, the mark and the two blues.
          </p>
        </div>

        <Reveal>
          <Plate name="Flat lay: folder, letterhead, business cards, DL envelope and bubble mailer">
            <FlatLay />
          </Plate>
        </Reveal>

        <div className={s.section}>
          <Head n="02" title="One object, one plate">
            Each object stands on the stage with its callouts and print specification on the right.
          </Head>
          <div className={s.grid2}>
            <Reveal><Plate name="Letterhead and envelope"><LetterEnvelope /></Plate></Reveal>
            <Reveal delay={80}><Plate name="Business cards"><CardsPlate /></Plate></Reveal>
            <Reveal><Plate name="Pen and notebooks"><PenNotebooks /></Plate></Reveal>
            <Reveal delay={80}><Plate name="Tri-fold brochure"><Brochure /></Plate></Reveal>
            <Reveal><Plate name="Report cover with spine"><ReportPlate /></Plate></Reveal>
            <Reveal delay={80}><Plate name="Slide deck"><DeckPlate /></Plate></Reveal>
          </div>
        </div>

        <div className={s.section}>
          <Head n="03" title="The slide deck in five steps">
            The case study&apos;s own slides, rebuilt at 1600 × 900: colour, type, logo plate, icon construction and data.
          </Head>
          <ol className={s.strip} role="region" aria-label="Slide deck, five slides" tabIndex={0}>
            {SLIDES.map((sl, i) => (
              <li key={sl.key}>
                <Art viewBox={`0 0 ${SLIDE.w} ${SLIDE.h}`} title={sl.title} exportName={`use-stationery-slide-${sl.key}`}>
                  <sl.G />
                </Art>
                <div className={s.step}>
                  <span>{sl.title}</span>
                  <b>{`0${i + 1}`}</b>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={s.section}>
          <Head n="04" title="Flat print artwork">
            The print artwork of each piece on its own, ready to export as SVG.
          </Head>
          <ul className={s.flats}>
            {FLATS.map((f) => {
              const [, , w, h] = f.vb.split(' ').map(Number);
              return (
                <li key={f.key}>
                  <figure className={s.flat}>
                    <Art viewBox={f.vb} title={f.title} exportName={`use-stationery-flat-${f.key}`} style={{ aspectRatio: `${w} / ${h}` }}>
                      {f.art}
                    </Art>
                  </figure>
                  <p className={s.flatCap}>{f.title}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
