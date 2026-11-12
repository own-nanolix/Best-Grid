import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import Icon, { PixelIcon } from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import SplitRow from '@/components/ui/SplitRow';
import { Rows } from '@/components/ui/Card';
import { LINES, TECH, TUBE, WEB_HERO, BUTTONS, CONTACT } from '@/lib/brand';
import { HeroCellArt, ModuleGridArt, ConnectionArt, TileIconArt, BankRowArt } from './StorageArt';
import s from './lp-storage.module.css';

const STORAGE = TECH.find((t) => t.key === 'storage');

// ---------- 1. Hero: the headline over three tall battery cells ----------
export function Hero() {
  return (
    <header className={`${s.hero} field-periwinkle`}>
      <div className={s.heroBand}>
        <h1 tabIndex={-1} className="slide-up" lang="es" style={{ '--i': 0 }}>
          <Rows rows={LINES.connect.rows} as="span" />
        </h1>
        <div className={s.heroAside}>
          <p className={`${s.heroTag} slide-up`} style={{ '--i': 4 }}>
            <span className="chip chip-dark" lang="es">{STORAGE.label}</span>
          </p>
          <p className="t-small muted slide-up" lang="es" style={{ '--i': 6, maxWidth: '30em' }}>
            {LINES.viable.rows.join(' ')}
          </p>
          <div className="row slide-up" style={{ '--i': 8 }}>
            <Button href="/lp-home/" lang="es">{BUTTONS.evaluate}</Button>
            <Button href="/lp-field/" variant="outline" lang="es">{BUTTONS.services}</Button>
          </div>
        </div>
        <span className={s.heroLine} aria-hidden="true" />
      </div>
      <div className={s.heroCells}>
        {[
          { name: 'hero-cell-a', no: 1, lit: 4 },
          { name: 'hero-cell-b', no: 2, lit: 7 },
          { name: 'hero-cell-c', no: 3, lit: 10 },
        ].map((c) => (
          <div key={c.name} className={s.heroCell}>
            <HeroCellArt {...c} />
          </div>
        ))}
      </div>
    </header>
  );
}

// ---------- 2. Row A: two text rows beside one tall artwork ----------
export function RowModules() {
  return (
    <SplitRow
      as="section"
      aria-labelledby="lp-storage-modules-h"
      className={`${s.rowX}`}
      ratio={[5, 7]}
      ruled
      textClass="stack"
      artClass={s.art}
      art={<ModuleGridArt />}
    >
      <div className={s.textRow}>
        <Reveal>
          <p className={`${s.kicker} t-label`}><i aria-hidden="true" />Modules on the grid</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="lp-storage-modules-h" className={`${s.rowBig} t-balance`} lang="es">
            <Rows rows={LINES.hero.rows} as="span" />
          </h2>
        </Reveal>
      </div>
      <div className={s.textRow}>
        <Reveal>
          <p className={s.rowBody} lang="es">{WEB_HERO.body}</p>
        </Reveal>
        <Reveal delay={80}>
          <p className={`${s.note} muted`}>Each filled cell of the drawing stands for a module joining the structure. The drawing carries no capacities.</p>
        </Reveal>
      </div>
    </SplitRow>
  );
}

// ---------- 3. Row B: the connection, flipped ----------
export function RowConnection() {
  return (
    <SplitRow
      as="section"
      aria-labelledby="lp-storage-connection-h"
      className={`${s.rowX} ${s.rowFlip}`}
      ratio={[5, 7]}
      flip
      ruled
      textClass="stack"
      artClass={s.art}
      art={<ConnectionArt />}
    >
      <div className={s.textRow}>
        <Reveal>
          <p className={`${s.kicker} t-label`}><i aria-hidden="true" />Connection, drawn</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="lp-storage-connection-h" className={`${s.rowBig} t-balance`} lang="es">
            <Rows rows={LINES.tube.rows} as="span" />
          </h2>
        </Reveal>
      </div>
      <div className={s.textRow}>
        <Reveal>
          <p className={s.rowBody} lang="es">{LINES.billboard.text}</p>
        </Reveal>
        <Reveal delay={80}>
          <p className={`${s.note} muted`}>A bank reaches the grid through one node. The diagram keeps only the structure: storage, node, junction, pylon and substation.</p>
        </Reveal>
      </div>
    </SplitRow>
  );
}

// ---------- 4. The 3.433 MW tile ----------
export function Tile() {
  return (
    <section className={`${s.tile} field-light`} aria-labelledby="lp-storage-tile-h">
      <div className="wrap" style={{ paddingBottom: 'clamp(20px, 3vw, 40px)' }}>
        <Reveal>
          <h2 id="lp-storage-tile-h" className="t-h2">The storage tile.</h2>
        </Reveal>
      </div>
      <div className={s.tileCells}>
        <div className={s.tileIcon}>
          <TileIconArt />
        </div>
        <div className={`${s.tileFig} cell-fill`}>
          <p className={s.tileLabel} lang="es">
            <PixelIcon name={STORAGE.icon} size={32} />
            {STORAGE.label}
          </p>
          <CountUp value={STORAGE.value} lang="es" className="t-num t-num-l" />
        </div>
        <div className={s.tileLine}>
          <p className="t-small muted" lang="es">{LINES.clarity.rows.join(' ')}</p>
          <Link href="/lp-data-centers/" className="link t-small" lang="es">{TECH[3].label}</Link>
        </div>
      </div>
    </section>
  );
}

// ---------- 5. The ruled strip of four, from the tube label ----------
const STEPS = [
  { icon: 'plug', text: TUBE.services[0] },
  { icon: 'study', text: TUBE.services[1] },
  { icon: 'node', text: TUBE.services[2] },
  { icon: 'pylon', text: LINES.tube.rows.join(' ') },
];

export function Strip() {
  return (
    <section className={`${s.strip} field-light`} aria-labelledby="lp-storage-strip-h">
      <div className="wrap">
        <div className={s.stripHead}>
          <Reveal>
            <h2 id="lp-storage-strip-h" className="t-h2">From first study to connection.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-body muted" style={{ maxWidth: '34em' }}>The services of the project tube, in the order a bank meets them.</p>
          </Reveal>
        </div>
        <div className={s.stripCells}>
          {STEPS.map((st, i) => (
            <Reveal key={st.text} delay={i * 60} className={s.stripCell}>
              <div className={s.stripNo}>
                <span className="ink">{`0${i + 1}`}</span>
                <Icon name={st.icon} size={28} />
              </div>
              <p className={s.stripText} lang="es">{st.text}</p>
              <span className={s.stripMark} aria-hidden="true" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 6. Closing band ----------
export function Closing() {
  return (
    <section className={`${s.closing} field-dark`} aria-labelledby="lp-storage-closing-h">
      <div className={s.closingGrid}>
        <div className={s.closingMain}>
          <Reveal>
            <h2 id="lp-storage-closing-h" className="t-h1" lang="es">
              <Rows rows={LINES.clarity.rows} as="span" />
            </h2>
          </Reveal>
        </div>
        <div className={s.closingSide}>
          <Reveal>
            <p className="t-body" lang="es">{LINES.clarityBody.text}</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="actions">
              <Button href="/lp-home/" variant="active" lang="es">{BUTTONS.evaluate}</Button>
              <Button href="/lp-field/" variant="ghost" lang="es">{BUTTONS.services}</Button>
            </div>
          </Reveal>
        </div>
      </div>
      <PosterFooter />
    </section>
  );
}

// ---------- 7. A wide row of banks on one busbar ----------
export function BankRow() {
  return (
    <section className={`${s.bankRow} field-light`} aria-labelledby="lp-storage-banks-h">
      <div className="wrap">
        <div className={s.bankHead}>
          <Reveal>
            <h2 id="lp-storage-banks-h" className="t-h2">Many modules, one connection.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-body muted" lang="es" style={{ maxWidth: '28em' }}>{LINES.card}</p>
          </Reveal>
        </div>
      </div>
      <Reveal className={s.bankArt} from="none">
        <BankRowArt />
      </Reveal>
    </section>
  );
}

// The poster footer of m11: "bestgrid.com" | mark | "bestgrid.com", three ruled cells.
export function PosterFooter() {
  return (
    <div className={s.posterFoot} lang="es">
      <span>{CONTACT.web}</span>
      <span aria-hidden="true">
        <svg viewBox="0 0 100 100" width="28" height="28">
          <use href="#site-mark" />
        </svg>
      </span>
      <span>{CONTACT.web}</span>
    </div>
  );
}

// ---------- 8. The other technologies, as three ruled cells (labels only, no figures) ----------
const TECH_HREF = { solar: '/lp-solar/', wind: '/lp-wind/', dc: '/lp-data-centers/' };

export function Siblings() {
  const others = TECH.filter((t) => t.key !== 'storage');
  return (
    <section className={`${s.sibs} field-light`} aria-labelledby="lp-storage-sibs-h">
      <div className="wrap">
        <Reveal>
          <h2 id="lp-storage-sibs-h" className="t-h2">Other technologies on the same grid.</h2>
        </Reveal>
        <div className={s.sibCells}>
          {others.map((t, i) => (
            <Reveal key={t.key} delay={i * 60} className={s.sibCell}>
              <Link href={TECH_HREF[t.key]} className={s.sibLink}>
                <PixelIcon name={t.icon} size={44} />
                <span lang="es" className="t-h3">{t.label}</span>
                <Icon name="arrow-right" size={20} />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
