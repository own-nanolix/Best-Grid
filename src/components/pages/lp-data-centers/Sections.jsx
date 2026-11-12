import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import Icon, { PixelIcon } from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import SplitRow from '@/components/ui/SplitRow';
import { Rows, TwoTone } from '@/components/ui/Card';
import { SpecTable } from '@/components/ui/Spec';
import Art from '@/components/art/Art';
import { WordmarkFitG } from '@/components/art/Mark';
import { LINES, TECH, BUTTONS, CONTACT } from '@/lib/brand';
import { RackFieldArt, RackRowArt, HallPlanArt, RouteArt, StackArt, AisleArt, CrossingArt } from './DcArt';
import s from './lp-data-centers.module.css';

const DC = TECH.find((t) => t.key === 'dc');
const MARK = (
  <svg viewBox="0 0 100 100" width="36" height="36" aria-hidden="true">
    <use href="#site-mark" />
  </svg>
);

// ---------- 1. Hero: the m09 left poster. Dark Blue, guide frame, racks across the right 60% ----------
export function Hero() {
  return (
    <header className={s.hero}>
      <div className={s.heroText}>
        <div className={`${s.heroMark} slide-up`} style={{ '--i': 0 }}>
          <Art viewBox="0 0 400 100" title="Best Grid word-mark" exportName="lp-data-centers-wordmark">
            <WordmarkFitG x={0} y={80} w={400} fill="currentColor" />
          </Art>
        </div>
        <div className={s.heroCopy}>
          <h1 tabIndex={-1} className="slide-up" lang="es" style={{ '--i': 2 }}>
            <Rows rows={LINES.posterLeft.rows} as="span" />
          </h1>
          <p className={`${s.heroTag} slide-up`} lang="es" style={{ '--i': 5 }}>{LINES.posterLeftTag}</p>
          <div className="row slide-up" style={{ '--i': 8 }}>
            <Button href="/lp-home/" variant="active" lang="es">{BUTTONS.evaluate}</Button>
            <Button href="/lp-field/" variant="ghost" lang="es">{BUTTONS.services}</Button>
          </div>
        </div>
        <div className={s.heroFoot}>
          <span className={s.heroNodeL} aria-hidden="true" />
          <span className={s.heroNodeR} aria-hidden="true" />
          {MARK}
          <span lang="es">{CONTACT.web}</span>
        </div>
      </div>
      <div className={s.heroArt}>
        <RackFieldArt />
      </div>
    </header>
  );
}

// ---------- 2. The poster's three lines as three successive rows on black ----------
const BODY = LINES.posterLeftBody.rows;
const ROWS = [
  { label: 'Rack row', art: <RackRowArt />, note: 'A feed leaves one node and reaches each rack in turn.' },
  { label: 'Hall plan', art: <HallPlanArt />, note: 'The hall as square cells: filled where the structure is clear, empty where it is not yet.' },
  { label: 'Route to the substation', art: <RouteArt />, note: 'The route keeps only its structure: node, bends, pylons and the substation.' },
];

export function ThreeRows() {
  return (
    <section className={`${s.rows} field-black split-rows`} aria-labelledby="lp-data-centers-rows-h">
      <h2 id="lp-data-centers-rows-h" className="sr-only" lang="es">{LINES.posterLeftBody.text}</h2>
      {ROWS.map((r, i) => (
        <SplitRow
          key={r.label}
          className={s.row}
          ratio={[4, 6]}
          flip={i === 1}
          textClass={s.textCol}
          artClass={s.rowArt}
          art={r.art}
        >
          <Reveal>
            <p className={s.ordinal}>{`0${i + 1} / 03`}</p>
          </Reveal>
          <Reveal delay={60}>
            <p className={s.tag}><i aria-hidden="true" />{r.label}</p>
          </Reveal>
          <Reveal delay={100}>
            <p className={s.line} lang="es" aria-hidden="true">{BODY[i]}</p>
          </Reveal>
          <Reveal delay={140}>
            <p className={s.aside}>{r.note}</p>
          </Reveal>
          {i === ROWS.length - 1 && (
            <Reveal delay={180}>
              <div className={s.rowActions}>
                <Button href="/lp-home/" variant="active" lang="es">{BUTTONS.evaluate}</Button>
              </div>
            </Reveal>
          )}
        </SplitRow>
      ))}
    </section>
  );
}

// ---------- 3. 2.083 MW in a highlighted stat cell (as m16), beside the other tiles ----------
const HREF = { solar: '/lp-solar/', wind: '/lp-wind/', storage: '/lp-storage/' };

export function StatCell() {
  const others = TECH.filter((t) => t.key !== 'dc');
  return (
    <section className={`${s.stat} field-light`} aria-labelledby="lp-data-centers-stat-h">
      <div className="wrap">
        <div className={s.statHead}>
          <Reveal>
            <h2 id="lp-data-centers-stat-h" className="t-h2">The Data Centers tile.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-body muted" style={{ maxWidth: '30em' }}>One highlighted cell, as on the website, beside the other three technologies.</p>
          </Reveal>
        </div>
      </div>
      <div className={s.statGrid}>
        <div className={s.statBig}>
          <p className={s.statLabel} lang="es">
            <PixelIcon name={DC.icon} size={36} />
            {DC.label}
          </p>
          <div className={s.statArt}>
            <StackArt />
          </div>
          <CountUp value={DC.value} lang="es" className={`t-num t-num-l ${s.statValue}`} />
        </div>
        <div className={s.statSide}>
          {others.map((t) => (
            <Link key={t.key} href={HREF[t.key]} className={s.statLink}>
              <PixelIcon name={t.icon} size={32} />
              <span lang="es">
                {t.label}
                <small>{t.value}</small>
              </span>
              <Icon name="arrow-right" size={20} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 4. Closing: the poster tag over the m11 three-cell footer ----------
export function Closing() {
  return (
    <section className={`${s.closing} field-dark`} aria-labelledby="lp-data-centers-closing-h">
      <div className={s.closingMain}>
        <Reveal>
          <h2 id="lp-data-centers-closing-h" lang="es">{LINES.posterLeftTag}</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="t-body" lang="es" style={{ maxWidth: '34em' }}>{LINES.clarityBody.text}</p>
        </Reveal>
        <Reveal delay={140}>
          <div className="row">
            <Button href="/lp-home/" variant="active" lang="es">{BUTTONS.evaluate}</Button>
            <Button href="/lp-field/" variant="ghost" lang="es">{BUTTONS.services}</Button>
          </div>
        </Reveal>
      </div>
      <dl className={s.contacts} lang="es">
        <div>
          <dt>{CONTACT.contactLabel}</dt>
          <dd>{CONTACT.phone}</dd>
          <dd>{CONTACT.email}</dd>
        </div>
        <div>
          <dt>{CONTACT.handle}</dt>
          <dd>{CONTACT.web}</dd>
          <dd>{CONTACT.webAlt}</dd>
        </div>
        <div>
          <dt>{CONTACT.address[2]}</dt>
          <dd>{CONTACT.address[0]}</dd>
          <dd>{CONTACT.address[1]}</dd>
        </div>
      </dl>
      <div className={s.closingFoot} lang="es">
        <span>{CONTACT.web}</span>
        <span aria-hidden="true">{MARK}</span>
        <span>{CONTACT.web}</span>
      </div>
    </section>
  );
}

// ---------- 5. The aisle, wide, and four ruled cells naming what the drawings show ----------
const PARTS = [
  { icon: 'datacenter', label: 'Rack', note: 'Units stacked in a column.' },
  { icon: 'layers', label: 'Row', note: 'Racks reached by one feed.' },
  { icon: 'grid', label: 'Hall', note: 'Rows drawn as square cells.' },
  { icon: 'pylon', label: 'Route', note: 'The line from node to substation.' },
];

export function Anatomy() {
  return (
    <section className={`${s.anatomy} field-black`} aria-labelledby="lp-data-centers-anatomy-h">
      <div className={s.anatomyHead}>
        <Reveal>
          <h2 id="lp-data-centers-anatomy-h" className="t-h2">From rack to route.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="t-body muted" style={{ maxWidth: '30em' }}>The same structure at four scales. The drawings carry no capacities and no places.</p>
        </Reveal>
      </div>
      <div className={s.aisle}>
        <AisleArt />
      </div>
      <div className={s.partCells}>
        {PARTS.map((p, i) => (
          <Reveal key={p.label} delay={i * 60} className={s.part}>
            <Icon name={p.icon} size={32} />
            <p className="t-h3">{p.label}</p>
            <p className={s.aside}>{p.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- 6. The two-tone line on Active Blue (m22), beside the crossing bands of the folder (m05) ----------
export function Viable() {
  return (
    <SplitRow as="section" aria-labelledby="lp-data-centers-viable-h" tone="active" ratio={[5, 6]} flip className={s.viable} textClass={s.viableText} artClass={s.viableArt} art={<CrossingArt />}>
      <Reveal>
        <p className="t-label">Two directions, one connection</p>
      </Reveal>
      <Reveal delay={60}>
        <h2 id="lp-data-centers-viable-h" className={s.viableLine} lang="es">
          <TwoTone rows={LINES.viable.rows} tone={LINES.viable.tone} as="span" />
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <Button href="/lp-field/" variant="dark" lang="es">{BUTTONS.services}</Button>
      </Reveal>
    </SplitRow>
  );
}

// ---------- 7. The drawings on this page, as a spec table (plain English labels) ----------
const DRAWINGS = [
  ['Rack field', 'Five racks of nine units filling from one feed node', 'Hero'],
  ['Rack row', 'A feed line reaching six racks in turn', 'Row 01'],
  ['Hall plan', 'Square cells, filled in two strengths of blue', 'Row 02'],
  ['Route', 'Node, bends, pylons and a substation', 'Row 03'],
  ['Hall demo', 'Rows of racks that light as the control moves', 'Demo'],
  ['Aisle', 'Two walls of racks and the lattice of the mark', 'Anatomy'],
  ['Crossing bands', 'The secondary graphic of the folder', 'Two-tone row'],
];

export function Drawings() {
  return (
    <section className={`${s.drawings} field-light`} aria-labelledby="lp-data-centers-drawings-h">
      <div className="wrap">
        <Reveal>
          <h2 id="lp-data-centers-drawings-h" className="t-h2">Drawings on this page.</h2>
        </Reveal>
        <Reveal delay={80}>
          <SpecTable
            caption="Seven drawings, in the order they appear"
            columns={['No.', 'Drawing', 'Shows', 'Where']}
            rows={DRAWINGS.map(([name, shows, where], i) => ({ key: name, head: name, num: `0${i + 1}`, cells: [shows, where] }))}
            numFirst
          />
        </Reveal>
      </div>
    </section>
  );
}

// Words that are ours on this page (everything else is the case study's own, in Spanish, from @/lib/brand):
// English labels and captions (Rack row, Hall plan, Route to the substation, From rack to route, Illustration,
// the demo controls and the drawings table), and the ordinals 01 / 03. No capacity, place or client is invented.
// The only figure is 2.083 MW, printed beside Data Centers on the website (m16); the other tiles keep their own.
