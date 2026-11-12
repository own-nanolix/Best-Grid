import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { PixelIcon } from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import SplitRow from '@/components/ui/SplitRow';
import { Rows, TwoTone } from '@/components/ui/Card';
import { SpecTable } from '@/components/ui/Spec';
import Link from 'next/link';
import { BUTTONS, CONTACT, LINES, TECH } from '@/lib/brand';
import { FogHero, TurbineBuild, WindFarm, Collector, FieldBlock, RotorCycle, ClarityPoster } from './WindArt';
import s from './lp-wind.module.css';

// Hero: the fog field full-bleed (m01), two horizontal guides at 45.6% and 54.3% of the height, two vertical guides
// at 4.3% and 97.5% of the width, nodes at the crossings; the line left between the horizontals, the mark right.
export function WindHero() {
  return (
    <header className={s.hero} aria-labelledby="lp-wind-h1">
      <div className={s.fog}>
        <FogHero />
      </div>
      <span className={`${s.vGuide} ${s.vLeft}`} aria-hidden="true" />
      <span className={`${s.vGuide} ${s.vRight}`} aria-hidden="true" />
      <div className={s.top} />
      <div className={s.band}>
        <span className={`${s.nodeDot} ${s.nTL}`} aria-hidden="true" />
        <span className={`${s.nodeDot} ${s.nTR}`} aria-hidden="true" />
        <span className={`${s.nodeDot} ${s.nBL}`} aria-hidden="true" />
        <span className={`${s.nodeDot} ${s.nBR}`} aria-hidden="true" />
        <h1 id="lp-wind-h1" tabIndex={-1} className={s.line} lang="es">
          <Rows rows={LINES.hero.rows} />
        </h1>
        <svg className={s.mark} viewBox="0 0 100 100" role="img" aria-label="Best Grid">
          <use href="#site-mark" />
        </svg>
      </div>
      <div className={s.foot}>
        <p className={`t-label ${s.tag}`}>Technology 02 of 04</p>
        <div className="row">
          <Button href="/lp-field/" lang="es">{BUTTONS.evaluate}</Button>
          <Button href="/lp-home/" variant="outline" lang="es">{BUTTONS.services}</Button>
        </div>
      </div>
    </header>
  );
}

// A three-column split: text cell, the construction square, text cell.
export function Construction() {
  return (
    <section className={`${s.trio} field-light`} aria-labelledby="lp-wind-trio">
      <div className={s.trioGrid}>
        <Reveal className={`${s.trioText} ${s.trioLeft}`}>
          <p className="t-label">Eólico</p>
          <h2 id="lp-wind-trio" className="t-h2" lang="es">
            <Rows rows={LINES.posterRightTag.rows} />
          </h2>
        </Reveal>
        <div className={s.trioArt}>
          <TurbineBuild />
        </div>
        <Reveal delay={120} className={`${s.trioText} ${s.trioRight}`}>
          <p className="t-lead" lang="es">{LINES.tube.text}</p>
          <p className="t-small muted">The turbine icon of the case study, built on a 32 x 32 grid with three guide circles.</p>
        </Reveal>
      </div>
    </section>
  );
}

// Flipped row 1: the billboard pair on Active Blue beside the wind farm.
export function RowFarm() {
  return (
    <SplitRow as="section" aria-labelledby="lp-wind-farm-h" ratio={[5, 7]} flip ruled tone="active" art={<WindFarm />} className={s.row}>
      <Reveal>
        <p className="t-label">The farm</p>
        <h2 id="lp-wind-farm-h" className="t-h2">
          <TwoTone as="span" rows={LINES.billboard.rows} tone={LINES.billboard.tone} lang="es" />
        </h2>
        <p className={`t-body ${s.measure}`} lang="es">{LINES.posterRightBody.text}</p>
      </Reveal>
    </SplitRow>
  );
}

// Flipped row 2: the card line and the clarity paragraph beside the collector diagram.
export function RowCollector() {
  return (
    <SplitRow as="section" aria-labelledby="lp-wind-col-h" ratio={[6, 6]} flip ruled art={<Collector />} className={s.row}>
      <Reveal>
        <p className="t-label">The connection</p>
        <h2 id="lp-wind-col-h" className="t-h1" lang="es">{LINES.card}</h2>
        <p className={`t-body ${s.measure}`} lang="es">{LINES.clarityBody.text}</p>
      </Reveal>
    </SplitRow>
  );
}

// The Eólico figure as one huge numeral across the full width of a Dark Blue band.
export function FigureBand() {
  const tile = TECH[1];
  return (
    <section className={`${s.figure} field-dark`} aria-labelledby="lp-wind-figure">
      <div className={s.figureRule}>
        <span className={`${s.nodeDot} ${s.fl}`} aria-hidden="true" />
        <span className={`${s.nodeDot} ${s.fr}`} aria-hidden="true" />
      </div>
      <div className="wrap">
        <Reveal className={s.figureHead}>
          <PixelIcon name={tile.icon} size={56} />
          <h2 id="lp-wind-figure" className="t-label" lang="es">{tile.label}</h2>
        </Reveal>
        <p className={s.huge} lang="es" aria-label={tile.value}>
          <CountUp value="2.794" lang="es" />
          <span className={s.hugeUnit}>MW</span>
        </p>
      </div>
    </section>
  );
}

// The field line (m11) beside a photo-block stand-in with a turbine in line art.
export function FieldRow() {
  return (
    <SplitRow as="section" aria-labelledby="lp-wind-field-h" ratio={[6, 6]} ruled tone="dark" art={<FieldBlock />} className={s.row}>
      <Reveal>
        <p className="t-label">In the field</p>
        <h2 id="lp-wind-field-h" className="t-h2" lang="es">{LINES.field}</h2>
        <p className={`t-body ${s.measure}`} lang="es">{LINES.fieldBody.text}</p>
        <div className="row">
          <Button href="/lp-field/" variant="active" lang="es">{BUTTONS.evaluate}</Button>
        </div>
      </Reveal>
    </SplitRow>
  );
}

// Contact band: the two-tone box line and the contacts as printed.
export function WindContact() {
  return (
    <section className={`${s.contact} field-periwinkle`} aria-labelledby="lp-wind-contact">
      <div className={`wrap ${s.contactGrid}`}>
        <Reveal>
          <h2 id="lp-wind-contact" className="t-h2" lang="es">
            <Rows rows={LINES.clarity.rows} />
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <address className={s.address} lang="es">
            <span className="t-label">{CONTACT.contactLabel}</span>
            <span>{CONTACT.phone}</span>
            <span>{CONTACT.email}</span>
            {CONTACT.address.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </address>
        </Reveal>
      </div>
    </section>
  );
}

// Construction facts of the turbine icon (m14), as a spec sheet with oversized numerals.
export function TurbineSpec() {
  const rows = [
    { key: 'hub', head: 'Hub ring', num: '3', cells: ['Diameter in units, with a 1 x 1 square inside'] },
    { key: 'blades', head: 'Blades', num: '3', cells: ['At 120 degrees, two converging bars each, a 1 x 1 square at the tip'] },
    { key: 'ring', head: 'Outer ring', num: '7', cells: ['Radius in units, 1 unit thick, cut where the blades pass'] },
    { key: 'bar', head: 'Bar', num: '1', cells: ['Unit: one thirty-second of the frame, square ends'] },
  ];
  return (
    <section className={`${s.spec} field-paper`} aria-labelledby="lp-wind-spec">
      <div className="wrap">
        <h2 id="lp-wind-spec" className="t-label">Turbine construction, 32 x 32</h2>
        <SpecTable rows={rows} numFirst />
      </div>
    </section>
  );
}

// The rotor in eight hard-cut frames beside its caption.
export function RotorRow() {
  return (
    <SplitRow as="section" aria-labelledby="lp-wind-cycle-h" ratio={[7, 5]} ruled tone="light" art={<RotorCycle />} className={s.row}>
      <Reveal>
        <p className="t-label">Motion</p>
        <h2 id="lp-wind-cycle-h" className="t-h2">Eight frames, 100 ms each, hard cuts.</h2>
        <p className={`t-body ${s.measure}`}>
          The only motion the case study publishes is a hard-cut cycle. The rotor repeats every 120 degrees, so eight frames of 15 degrees close the loop.
        </p>
      </Reveal>
    </SplitRow>
  );
}

// The four technology tiles of the website (m16), this page's tile highlighted.
const PAGES = { solar: 'lp-solar', wind: 'lp-wind', storage: 'lp-storage', dc: 'lp-data-centers' };
export function WindTiles() {
  return (
    <section className={`${s.tiles} field-light`} aria-label="Technologies">
      <div className={`wrap ${s.tileGrid}`}>
        {TECH.map((t) => (
          <Link key={t.key} href={`/${PAGES[t.key]}/`} className={`${s.tile} ${t.key === 'wind' ? 'cell-fill' : ''}`} aria-current={t.key === 'wind' ? 'page' : undefined} lang="es">
            <PixelIcon name={t.icon} size={56} />
            <span className={s.tileText}>
              <span className="t-small ink">{t.label}</span>
              <span className="t-h3">{t.value}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// The m11 clarity poster, rebuilt, on black as the case study presents its posters.
export function PosterRow() {
  return (
    <SplitRow as="section" aria-labelledby="lp-wind-poster-h" ratio={[5, 7]} flip tone="black" art={<ClarityPoster />} artClass={s.posterArt} className={s.row}>
      <Reveal>
        <p className="t-label">Poster</p>
        <h2 id="lp-wind-poster-h" className="t-h2">The clarity poster</h2>
        <p className="t-body muted" lang="es">{LINES.clarity.text}</p>
        <p className="t-small muted">Active Blue sheet, Dark Blue type, a three-cell footer, 3:4.</p>
      </Reveal>
    </SplitRow>
  );
}

// A narrow closing strip: the two buttons of the website (m16) over a hairline with nodes at its ends.
export function WindClose() {
  return (
    <section className={`${s.close} field-active`} aria-labelledby="lp-wind-close">
      <div className={`wrap ${s.closeGrid}`}>
        <Reveal>
          <h2 id="lp-wind-close" className="t-h2">
            <TwoTone as="span" rows={LINES.envelope.rows} tone={LINES.envelope.tone} lang="es" />
          </h2>
        </Reveal>
        <Reveal delay={120} className={s.closeSide}>
          <Button href="/lp-field/" variant="dark" lang="es">{BUTTONS.evaluate}</Button>
          <Button href="/lp-home/" variant="ghost" lang="es">{BUTTONS.services}</Button>
          <p className="t-small" lang="es">{CONTACT.web}</p>
        </Reveal>
      </div>
      <span className={`${s.nodeDot} ${s.cl}`} aria-hidden="true" />
      <span className={`${s.nodeDot} ${s.cr}`} aria-hidden="true" />
    </section>
  );
}
