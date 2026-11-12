import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import SplitRow from '@/components/ui/SplitRow';
import Chip from '@/components/ui/Chip';
import Button from '@/components/ui/Button';
import { Rows } from '@/components/ui/Card';
import { SpecTable, Cells } from '@/components/ui/Spec';
import { REPORT, TECH, CAPACITY, FIGURES, CONTACT } from '@/lib/brand';
import { CoverArt, StackArt, SpinesArt, LineArt, QuartersArt, ColorwaysArt, TreemapArt } from './ReportArt';
import RequestForm from './RequestForm';
import s from './lp-annual-report.module.css';

function Eyebrow({ n, children }) {
  return (
    <p className={`${s.eyebrow} t-label`}>
      <b>{n}</b>
      <i aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

// The hero: the cover itself. The h1 is the cover artwork; the title runs off its edge as printed.
export function ReportHero() {
  return (
    <section className={`field-active ${s.hero}`} aria-label="Annual report">
      <div className={s.heroAside} lang="es">
        <p className="t-label">{REPORT.short}</p>
        <div>
          <p className={s.heroId}>{REPORT.spine}</p>
          <p className={s.heroRange}>{REPORT.range}</p>
        </div>
      </div>
      <h1 className={s.heroCover} tabIndex={-1}>
        <CoverArt />
      </h1>
    </section>
  );
}

const unit = (v) => (
  <span lang="es">
    {v.replace(' MW', '')}
    <span className="spec-unit">MW</span>
  </span>
);

// The figures exactly as printed in the case study, as spec tables with oversized numerals. Only 2025 has figures.
export function FiguresSection() {
  const kpi = FIGURES.kpis;
  return (
    <section className="field-light band" aria-labelledby="lp-annual-report-figures">
      <div className="wrap stack-lg">
        <Reveal>
          <div className={s.figHead}>
            <h2 id="lp-annual-report-figures" className={s.title}>Figures</h2>
          </div>
        </Reveal>
        <div className={s.figGrid}>
          <Reveal>
            <SpecTable
              caption="Technology tiles, as printed on the website"
              rows={TECH.map((t) => ({ key: t.key, head: <span lang="es">{t.label}</span>, num: unit(t.value) }))}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className={s.chipRow} role="group" aria-label="Year on the dashboard">
              {CAPACITY.years.map((y) => (
                <Chip key={y} tone={y === CAPACITY.year ? 'active' : undefined} aria-current={y === CAPACITY.year ? 'true' : undefined}>{y}</Chip>
              ))}
            </div>
            <SpecTable
              caption="The dashboard, 2025"
              rows={[
                { key: 'total', head: <span lang="es">{CAPACITY.totalLabel}</span>, num: unit(CAPACITY.totalValue) },
                ...kpi.map((k) => ({ key: k.label, head: <span lang="es">{k.label}</span>, num: <span lang="es">{k.value}</span> })),
                ...FIGURES.treemap.map((t) => ({ key: t.label, head: <span lang="es">{t.label}</span>, num: <span lang="es">{t.value.replace('%', '')}<span className="spec-unit">%</span></span> })),
              ]}
            />
          </Reveal>
        </div>
        <p className={s.empty}>The dashboard prints figures for 2025 only; 2023 and 2024 have none to show. The website tiles carry no year.</p>
      </div>
    </section>
  );
}

// Split rows that walk through the report, alternating artwork and text.
export function WalkRows() {
  return (
    <div className="split-rows">
      <SplitRow as="section" aria-labelledby="lp-annual-report-cover-h" ratio={[5, 7]} ruled className={s.rowSec} art={<StackArt />} tone="paper">
        <Reveal><Eyebrow n="01">Cover and spines</Eyebrow></Reveal>
        <Reveal delay={60}><h2 id="lp-annual-report-cover-h" className={s.title}>The cover</h2></Reveal>
        <Reveal delay={120}><Rows rows={REPORT.lineRows} as="p" lang="es" className={s.lede} /></Reveal>
        <p className={`${s.note} muted`}>Three reports, covers alternating Active Blue and Dark Blue, spines the opposite colour.</p>
      </SplitRow>

      <SplitRow as="section" aria-labelledby="lp-annual-report-ways-h" ratio={[6, 6]} flip ruled className={s.rowSec} art={<ColorwaysArt />} tone="light">
        <Reveal><Eyebrow n="02">Colourways</Eyebrow></Reveal>
        <Reveal delay={60}><h2 id="lp-annual-report-ways-h" className={s.title}>Two covers</h2></Reveal>
        <Reveal delay={120}><Rows rows={REPORT.titleRows.slice(0, 1)} as="p" lang="es" className={s.big} /></Reveal>
        <p className={`${s.note} muted`}>Active Blue with Dark Blue type, and Dark Blue with light grey type. The title and the year run off the edge of each cover.</p>
      </SplitRow>

      <SplitRow as="section" aria-labelledby="lp-annual-report-spine-h" ratio={[6, 6]} flip ruled className={s.rowSec} art={<SpinesArt />} tone="periwinkle">
        <Reveal><Eyebrow n="03">Spines</Eyebrow></Reveal>
        <Reveal delay={60}><h2 id="lp-annual-report-spine-h" className={s.title}>The spine</h2></Reveal>
        <Reveal delay={120}>
          <p className={s.big} lang="es">{REPORT.spine}</p>
          <p className={`${s.big} ink`} lang="es">{REPORT.range}</p>
        </Reveal>
        <p className={`${s.note} muted`} lang="es">{REPORT.short}</p>
      </SplitRow>

      <SplitRow as="section" aria-labelledby="lp-annual-report-line-h" ratio={[5, 7]} ruled className={s.rowSec} art={<LineArt />} tone="paper">
        <Reveal><Eyebrow n="04">The line</Eyebrow></Reveal>
        <Reveal delay={60}><h2 id="lp-annual-report-line-h" className={s.title}>On the page</h2></Reveal>
        <Reveal delay={120}><Rows rows={REPORT.lineRows} as="p" lang="es" className={s.lede} /></Reveal>
        <p className={`${s.note} muted`} lang="es">{REPORT.signature}</p>
      </SplitRow>

      <SplitRow as="section" aria-labelledby="lp-annual-report-q-h" ratio={[5, 7]} flip ruled className={s.rowSec} art={<QuartersArt />} tone="light">
        <Reveal><Eyebrow n="05">Data</Eyebrow></Reveal>
        <Reveal delay={60}><h2 id="lp-annual-report-q-h" className={s.title}>Capacity by quarter</h2></Reveal>
        <Reveal delay={120}>
          <p className="t-body muted" lang="es">{CAPACITY.totalLabel}</p>
          <CountUp value={CAPACITY.totalValue} lang="es" className="t-num t-num-m ink" />
        </Reveal>
        <p className={`${s.note} muted`}>Q1 to Q4 as printed on the dashboard. The marker sits at the Q3 peak.</p>
      </SplitRow>
      <SplitRow as="section" aria-labelledby="lp-annual-report-tree-h" ratio={[5, 7]} ruled className={s.rowSec} art={<TreemapArt />} tone="paper">
        <Reveal><Eyebrow n="06">Data</Eyebrow></Reveal>
        <Reveal delay={60}><h2 id="lp-annual-report-tree-h" className={s.title}>Capacity managed, 2025</h2></Reveal>
        <Reveal delay={120}>
          <p className="t-body" lang="es">{CAPACITY.treemap.parts[0].labelRows.join(' ')}</p>
          <CountUp value="68%" lang="es" className="t-num t-num-m ink" />
        </Reveal>
        <p className={`${s.note} muted`}>The Dark Blue remainder carries no label and no figure, as in the case study.</p>
      </SplitRow>
    </div>
  );
}

// The "[24 – 25]" band on Dark Blue.
export function RangeBand() {
  return (
    <section className={`field-dark ${s.band}`} aria-label="IDAA">
      <span className={s.bandLine} aria-hidden="true" style={{ top: 0 }} />
      <div className="wrap stack">
        <Reveal>
          <p className={s.bandNum} lang="es">{REPORT.range}</p>
        </Reveal>
        <div className={s.bandRow} lang="es">
          <p className={s.bandId}>{REPORT.spine}</p>
          <p className={s.bandId}>{REPORT.signature}</p>
        </div>
      </div>
      <span className={s.bandLine} aria-hidden="true" style={{ bottom: 0, animationDelay: '300ms' }} />
    </section>
  );
}

// The request form with its real states.
export function RequestSection() {
  return (
    <section className="field-light band" aria-labelledby="lp-annual-report-request">
      <div className="wrap">
        <Cells cols={2} open>
          <Reveal>
            <div className={s.formSide}>
              <Eyebrow n="07">Request</Eyebrow>
              <h2 id="lp-annual-report-request" className={s.title}>Request the report</h2>
              <p className="t-body muted">Leave a name and an email address. The form checks them here; it sends nothing.</p>
              <div className={s.contactRow} lang="es">
                <span>{CONTACT.email}</span>
                <span>{CONTACT.web}</span>
              </div>
              <div className="row">
                <Button href="/lp-field/" variant="ghost" cross={false} iconRight="arrow-right">Field work</Button>
                <Link className="link" href="/lp-home/">Home</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <RequestForm />
          </Reveal>
        </Cells>
      </div>
    </section>
  );
}

// What the report prints on its cover and spine, as a definition list (the case study's own words).
export function PrintedFacts() {
  const facts = [
    { k: 'Spine', v: REPORT.spine },
    { k: 'Range', v: REPORT.range },
    { k: 'Short name', v: REPORT.short },
    { k: 'Years on the cover', v: REPORT.years.join(' / ') },
    { k: 'Signature', v: REPORT.signature },
    { k: 'Line', v: REPORT.lineRows.join(' ') },
  ];
  return (
    <section className="field-paper band" aria-labelledby="lp-annual-report-printed">
      <div className="wrap stack-lg">
        <Reveal>
          <h2 id="lp-annual-report-printed" className={s.title}>Printed on the report</h2>
        </Reveal>
        <Reveal delay={80}>
          <dl className="specs" style={{ '--cols': 3 }}>
            {facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd className="t-h3" lang="es">{f.v === REPORT.years.join(' / ') ? `${REPORT.years[0]} / 202` : f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <p className={`${s.note} muted`}>The second year is cut by the edge of the cover and is shown only as far as it can be read.</p>
      </div>
    </section>
  );
}
