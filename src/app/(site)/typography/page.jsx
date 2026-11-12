import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { TypeSlide, GlyphSlice } from '@/components/pages/typography/TypeSlide';
import { VoiceText, VoiceDisplay, Weights } from '@/components/pages/typography/Voices';
import { ScaleTable, ScaleArt } from '@/components/pages/typography/Scale';
import Charset, { CharsetArt } from '@/components/pages/typography/Charset';
import { PosterArt, PosterSpec } from '@/components/pages/typography/Poster';
import { MetricsArt, LeadingArt } from '@/components/pages/typography/Metrics';
import { HabitsArt } from '@/components/pages/typography/Habits';
import Tester from '@/components/pages/typography/Tester';
import s from '@/components/pages/typography/typography.module.css';

export const metadata = pageMeta('typography');

function Head({ n, id, title, children }) {
  return (
    <div className={s.head}>
      <div>
        <span className="t-label">{n}</span>
        <h2 id={id} className="t-h2">{title}</h2>
      </div>
      <p className="t-lead muted">{children}</p>
    </div>
  );
}

const HABITS = [
  ['Short lines', 'Headlines break into two or three short lines and end with a full stop. Lines are broken where the sense breaks, not where the width ends.'],
  ['The two-tone line', 'On Active Blue a sentence starts in light grey-white and continues in Dark Blue.'],
  ['Square brackets', 'Brackets set off phone prefixes, places, ranges and glyph specimens.'],
  ['Middle dots', 'Words that belong together are separated by a middle dot, not a comma.'],
  ['The superscript percent', 'A percent sign rides high beside an oversized numeral.'],
  ['Capitals', 'Sentence case everywhere. Capitals only in acronyms and units, and Nº for numbers.'],
];

export default function Page() {
  return (
    <section className="page" id="p-typography" aria-label="Typography">
      <div className="wrap">
        <div className={s.hero}>
          <div className={s.slides}>
            <TypeSlide />
            <GlyphSlice />
          </div>
          <div className={s.heroText}>
            <span className="t-label">Typographic system</span>
            <h1 className="t-display t-balance" tabIndex={-1}>
              One grotesk,
              <br />
              two voices.
            </h1>
            <p className="t-lead muted">
              The type slide of the case study, rebuilt, then carried further: the face in its text and display voices,
              the full scale, the character set, the hierarchy on a poster and the metrics under it.
            </p>
            <dl className={s.facts}>
              <div><dt>Face</dt><dd>The brand typeface</dd></div>
              <div><dt>Weight published</dt><dd>Regular</dd></div>
              <div><dt>Specimen size</dt><dd lang="es">Optical size: 600 pt</dd></div>
            </dl>
            <p className={s.note}>
              The face is a commercial grotesk and is never named on the pages. Everything here is set in the closest
              free match; the font names are in the report.
            </p>
          </div>
        </div>
      </div>

      <div className="wrap">
        <Reveal as="section" className={s.section} aria-labelledby="typography-voices-h">
          <Head n="01" id="typography-voices-h" title="Two voices.">
            The case study names one face and shows it in Regular. Its text sizes and its display sizes are set here as two
            voices of that one face: the text voice keeps the face&apos;s default spacing, the display voice sits tight.
          </Head>
          <div className={s.pair}>
            <div className={s.art}><VoiceText /></div>
            <div className={s.art}><VoiceDisplay /></div>
          </div>
          <div className={s.art} style={{ marginTop: 'var(--gap)' }}><Weights /></div>
        </Reveal>

        <Reveal as="section" className={s.section} aria-labelledby="typography-scale-h">
          <Head n="02" id="typography-scale-h" title="The scale.">
            Ten sizes from 11 to 160 px. The first column prints each size at that size. The origin column says which sizes
            are read from the case study and which extend it.
          </Head>
          <ScaleTable />
          <div className={s.art} style={{ marginTop: 'calc(var(--gap) * 2)' }}><ScaleArt /></div>
        </Reveal>

        <Reveal as="section" className={s.section} aria-labelledby="typography-charset-h">
          <Head n="03" id="typography-charset-h" title="Character set.">
            Capitals, lower case, figures, the Spanish accents and the signs the brand leans on. Hover, focus or tap a glyph
            to read its code point.
          </Head>
          <Charset />
          <div className={s.art} style={{ marginTop: 'calc(var(--gap) * 2)' }}><CharsetArt /></div>
        </Reveal>

        <Reveal as="section" className={s.section} aria-labelledby="typography-poster-h">
          <Head n="04" id="typography-poster-h" title="Hierarchy in use.">
            The Active Blue poster of the case study, rebuilt on a 3:4 sheet. Four tiers carry it; the table gives each
            tier as a share of the sheet width.
          </Head>
          <div className={s.posterRow}>
            <PosterArt />
            <div className={s.stackGap}>
              <PosterSpec />
              <p className={s.note}>
                Sizes are measured from the poster on a sheet 720 units wide. The headline sits at about 5% of the width with
                leading near 1.12 and the micro text at about 1.1%, as the case study&apos;s own proportions.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className={s.section} aria-labelledby="typography-metrics-h">
          <Head n="05" id="typography-metrics-h" title="Metrics.">
            A word set large with the five lines of the type, then three baselines of a headline at its leading.
          </Head>
          <div className={s.stackGap}>
            <div className={s.art}><MetricsArt /></div>
            <div className={s.art}><LeadingArt /></div>
          </div>
        </Reveal>

        <Reveal as="section" className={s.section} aria-labelledby="typography-habits-h">
          <Head n="06" id="typography-habits-h" title="Habits of setting.">
            Six habits read from the printed pieces. Each example in the drawing is a line or figure the case study prints.
          </Head>
          <div className={s.art}><HabitsArt /></div>
          <div className={s.habits}>
            {HABITS.map(([t, d]) => (
              <div key={t}>
                <h3>{t}</h3>
                <p className="t-small">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className={s.section} aria-labelledby="typography-tester-h">
          <Head n="07" id="typography-tester-h" title="Type tester.">
            Set a line in either voice at any size, then move the tracking, the leading and the measure. Line balance and
            baseline guides can be switched on and off.
          </Head>
          <Tester />
        </Reveal>
      </div>
    </section>
  );
}
