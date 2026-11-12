import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import Icon, { PixelIcon } from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import SplitRow from '@/components/ui/SplitRow';
import { Rows, TwoTone } from '@/components/ui/Card';
import { Cells, SpecTable } from '@/components/ui/Spec';
import { BUTTONS, CONTACT, LINES, TECH, TUBE } from '@/lib/brand';
import { PanelField, PanelCells, RouteArt, NodesArt, PosterArt, ModuleArt, BandsArt } from './SolarArt';
import { SERVICE_ICONS } from './helpers';
import s from './lp-solar.module.css';

const TECH_PAGES = { solar: 'lp-solar', wind: 'lp-wind', storage: 'lp-storage', dc: 'lp-data-centers' };

// Hero: a 7 : 5 split. The oversized figure and the technology name left, the panel field right.
export function SolarHero() {
  const tile = TECH[0];
  return (
    <header className={s.hero} aria-labelledby="lp-solar-h1">
      <div className={s.heroText}>
        <p className={`t-label ${s.enter}`} style={{ '--i': 0 }}>
          <span className={s.chipBar} aria-hidden="true" />
          Technology
        </p>
        <h1 id="lp-solar-h1" tabIndex={-1} className={`t-display ${s.enter}`} style={{ '--i': 1 }} lang="es">
          {tile.label}
        </h1>
        <p className={`${s.bigFigure} ${s.enter}`} style={{ '--i': 2 }} lang="es" aria-label={tile.value}>
          <CountUp value="12.157" lang="es" />
          <span className={s.unit}>MW</span>
        </p>
        <p className={`t-lead ${s.enter} ${s.lead}`} style={{ '--i': 3 }} lang="es">
          {LINES.billboard.rows.join(' ')}
        </p>
        <div className={`row ${s.enter}`} style={{ '--i': 4 }}>
          <Button href="/lp-field/" lang="es">{BUTTONS.evaluate}</Button>
          <Button href="/lp-home/" variant="outline" lang="es">{BUTTONS.services}</Button>
        </div>
        <span className={s.heroNode} aria-hidden="true" />
      </div>
      <div className={s.heroArt}>
        <PanelField />
      </div>
    </header>
  );
}

// Row 1 (7 : 5): the generation poster text, the field of cells.
export function RowGeneration() {
  return (
    <SplitRow as="section" aria-labelledby="lp-solar-row-a" ratio={[7, 5]} ruled art={<PanelCells />} artClass={s.artPeri} className={s.row}>
      <Reveal>
        <p className="t-label">The array</p>
        <h2 id="lp-solar-row-a" className="t-h1" lang="es">
          <Rows rows={LINES.posterRight.rows} />
        </h2>
        <p className={`t-lead ${s.measure}`} lang="es">{LINES.posterRightBody.text}</p>
        <p className="t-small muted" lang="es">{LINES.posterRightTag.rows.join(' ')}</p>
      </Reveal>
    </SplitRow>
  );
}

// Row 2 (6 : 6, flipped): the Active Blue ground, the two-tone pair, the route to a substation.
export function RowRoute() {
  return (
    <SplitRow as="section" aria-labelledby="lp-solar-row-b" ratio={[6, 6]} flip ruled tone="active" art={<RouteArt />} className={s.row}>
      <Reveal>
        <p className="t-label">The line</p>
        <h2 id="lp-solar-row-b" className="t-h2">
          <TwoTone as="span" rows={LINES.viable.rows} tone={LINES.viable.tone} lang="es" />
        </h2>
        <p className={`t-body ${s.measure}`} lang="es">{LINES.tube.text}</p>
      </Reveal>
    </SplitRow>
  );
}

// Row 3 (5 : 7): Dark Blue, the clarity line, the node grid.
export function RowClarity() {
  return (
    <SplitRow as="section" aria-labelledby="lp-solar-row-c" ratio={[5, 7]} ruled tone="dark" art={<NodesArt />} className={s.row}>
      <Reveal>
        <p className="t-label">The nodes</p>
        <h2 id="lp-solar-row-c" className="t-h2" lang="es">
          <Rows rows={LINES.clarity.rows} />
        </h2>
        <p className={`t-body ${s.measure}`} lang="es">{LINES.clarityBody.text}</p>
      </Reveal>
    </SplitRow>
  );
}

// A row of three ruled cells: the services of the tube label (m07).
export function ServiceCells() {
  return (
    <section className={`${s.services} field-periwinkle`} aria-labelledby="lp-solar-services">
      <div className="wrap">
        <Reveal className={s.servicesHead}>
          <h2 id="lp-solar-services" className="t-h2" lang="es">
            <Rows rows={LINES.tube.rows} />
          </h2>
        </Reveal>
        <Cells cols={3} open>
          {TUBE.services.map((label, i) => (
            <Reveal key={label} delay={i * 80} className={s.serviceCell}>
              <Icon name={SERVICE_ICONS[i]} size={40} />
              <p className="t-h3" lang="es">{label}</p>
              <span className={`t-micro ink ${s.cellNo}`}>{`0${i + 1}`}</span>
            </Reveal>
          ))}
        </Cells>
      </div>
    </section>
  );
}

// The m09 right poster, rebuilt, beside the plate facts the case study gives (3:4 sheet, 6 columns, 6.7% margins).
export function PosterSection() {
  return (
    <section className={`${s.poster} field-dark`} aria-labelledby="lp-solar-poster-h">
      <div className={`wrap ${s.posterGrid}`}>
        <Reveal className={s.posterText}>
          <p className="t-label">Poster</p>
          <h2 id="lp-solar-poster-h" className="t-h2">The generation poster</h2>
          <dl className={s.facts}>
            <div><dt>Sheet</dt><dd className="t-num t-num-s">3:4</dd></div>
            <div><dt>Columns</dt><dd className="t-num t-num-s">6</dd></div>
            <div><dt>Margin</dt><dd className="t-num t-num-s">6.7%</dd></div>
          </dl>
          <p className="t-body muted" lang="es">{CONTACT.web}</p>
        </Reveal>
        <Reveal from="scale" className={s.posterSheet}>
          <PosterArt />
        </Reveal>
      </div>
    </section>
  );
}

// The four technology tiles of the website (m16) with this page's tile highlighted.
export function TechTiles() {
  return (
    <section className={`${s.tiles} field-light`} aria-labelledby="lp-solar-tiles">
      <div className="wrap">
        <h2 id="lp-solar-tiles" className="t-label">Technologies</h2>
        <Cells cols={4} open style={{ "--cell-pad": 0 }}>
          {TECH.map((t) => (
            <Link key={t.key} href={`/${TECH_PAGES[t.key]}/`} className={`${s.tile} ${t.key === 'solar' ? 'cell-fill' : ''}`} aria-current={t.key === 'solar' ? 'page' : undefined} lang="es">
              <PixelIcon name={t.icon} size={64} />
              <span className={s.tileText}>
                <span className="t-small ink">{t.label}</span>
                <span className="t-h3">{t.value}</span>
              </span>
            </Link>
          ))}
        </Cells>
      </div>
    </section>
  );
}

// Closing band: Active Blue, the two-tone line of the box and billboard, the contacts as printed.
export function SolarClose() {
  return (
    <section className={`${s.close} field-active`} aria-labelledby="lp-solar-close">
      <div className={`wrap ${s.closeGrid}`}>
        <Reveal>
          <h2 id="lp-solar-close" className="t-h2">
            <TwoTone as="span" rows={LINES.box.rows} tone={LINES.box.tone} lang="es" />
          </h2>
        </Reveal>
        <Reveal delay={120} className={s.closeSide}>
          <div className="row">
            <Button href="/lp-field/" variant="dark" lang="es">{BUTTONS.evaluate}</Button>
            <Button href="/lp-home/" variant="ghost" lang="es">{BUTTONS.services}</Button>
          </div>
          <p className="t-body" lang="es">{CONTACT.phone}</p>
          <p className="t-body" lang="es">{CONTACT.email}</p>
          <address className="t-small" lang="es" style={{ fontStyle: "normal" }}>
            {CONTACT.address.map((r) => (
              <span key={r} style={{ display: "block" }}>{r}</span>
            ))}
          </address>
        </Reveal>
      </div>
    </section>
  );
}

// The icon's own construction: the 32 x 32 grid of m14 / m15 holding the solar pixel icon.
export function ModuleRow() {
  return (
    <SplitRow as="section" aria-labelledby="lp-solar-module" ratio={[5, 7]} flip ruled tone="periwinkle" art={<ModuleArt />} className={s.row}>
      <Reveal>
        <p className="t-label">The module</p>
        <h2 id="lp-solar-module" className="t-h2">One panel, four cells across and four down.</h2>
        <dl className={s.rules}>
          <div><dt>Grid</dt><dd className="t-num t-num-s">32 x 32</dd></div>
          <div><dt>Bar</dt><dd className="t-num t-num-s">1 unit</dd></div>
        </dl>
        <p className="t-small muted">Square ends, stepped corners, open crossings: the manner of the case study&apos;s four icons.</p>
      </Reveal>
    </SplitRow>
  );
}

// A full-width band: the crossing bands and the m22 pair, then the same lines as real text for reading.
export function BandsSection() {
  return (
    <section className={`${s.bands} field-dark`} aria-labelledby="lp-solar-bands-h">
      <h2 id="lp-solar-bands-h" className="sr-only" lang="es">{LINES.connect.rows.join(' ')}</h2>
      <Reveal from="none">
        <BandsArt />
      </Reveal>
    </section>
  );
}

// Construction facts of the solar pixel icon (m15), as a spec sheet with oversized numerals.
export function PanelSpec() {
  const rows = [
    { key: 'cells', head: 'Cells', num: '4 x 4', cells: ['Four across and four down, each a ruled cell'] },
    { key: 'size', head: 'Drawing', num: '21 x 16', cells: ['Units of the 32 x 32 drawing grid: the icon as drawn here, panel and stand, centred'] },
    { key: 'frame', head: 'Frame', num: '1', cells: ['Unit: one thirty-second of the frame, square ends, stepped corners'] },
    { key: 'stand', head: 'Stand', num: '1', cells: ['A single bar under the panel, with a foot of two bars and an open crossing'] },
  ];
  return (
    <section className={`${s.spec} field-paper`} aria-labelledby="lp-solar-spec">
      <div className="wrap">
        <h2 id="lp-solar-spec" className="t-label">Solar icon construction</h2>
        <SpecTable rows={rows} numFirst />
      </div>
    </section>
  );
}
