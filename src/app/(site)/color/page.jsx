import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import ColourSlide from '@/components/pages/color/ColourSlide';
import { ColourTable, SwatchCards, Ladder, NeutralScale, PRIMARY, NEUTRAL } from '@/components/pages/color/Scales';
import Proportion from '@/components/pages/color/Proportion';
import { PairGrid, PairSheet, Matrix } from '@/components/pages/color/Pairings';
import Tester from '@/components/pages/color/Tester';
import Semantic from '@/components/pages/color/Semantic';
import { PALETTE } from '@/lib/brand';
import s from '@/components/pages/color/color.module.css';

export const metadata = pageMeta('color');

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
    <section className="page" id="p-color" aria-label="Colour">
      <div className="wrap">
        <div className={s.hero}>
          <div className={s.heroText}>
            <span className="t-label">Color system</span>
            <h1 className="t-display t-balance" tabIndex={-1}>
              Colour.
            </h1>
            <p className="t-lead muted">
              The colour slide of the case study, rebuilt, then carried further: scales with their contrast, tints and
              shades, six pairings and the roles the colours play in light and dark mode. Click any value to copy it.
            </p>
            <dl className={s.heroFacts}>
              {PALETTE.map((p) => (
                <div key={p.token}>
                  <dt>{p.name}</dt>
                  <dd className="t-num t-num-s">{p.hex}</dd>
                </div>
              ))}
            </dl>
            <p className={s.note}>
              HEX and CMYK are as printed on the slide. RGB is computed from the HEX, so Light Blue reads 228 | 231 | 239
              where the slide repeats Active Blue&apos;s line. The slide is the artwork on the right; it exports as an SVG.
            </p>
          </div>
          <div className={s.slide}>
            <ColourSlide />
          </div>
        </div>
      </div>

      <div className="wrap">
        <Reveal as="section" className={s.section} aria-labelledby="color-primary-h">
          <Head n="01" title="Primary scale.">
            The three published colours and the shared tokens around them. Ratios are the colour as type on Light Blue
            and on Dark Blue, computed from the hex values.
          </Head>
          <div className={s.art}>
            <SwatchCards />
          </div>
          <div style={{ marginTop: 'var(--gap)' }}>
            <h3 id="color-primary-h" className="sr-only">Primary colour table</h3>
            <ColourTable id="color-primary-table" caption="Primary colours" rows={PRIMARY} />
          </div>
        </Reveal>

        <Reveal as="section" className={s.section} aria-labelledby="color-ladders-h">
          <Head n="02" title="Tints and shades.">
            Four tints toward white, the base, four shades toward Dark Blue (toward black for Dark Blue itself). Each
            step is computed from the published colour; the ink on every step is the one that reads best.
          </Head>
          <h3 id="color-ladders-h" className="sr-only">Ladders</h3>
          <div className={s.ladders}>
            {PALETTE.map((p) => (
              <div key={p.token}>
                <h3 className="t-h3" style={{ marginBottom: 12 }}>{p.name}</h3>
                <Ladder base={p.hex} name={p.name} slug={p.token} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className={s.dark}>
        <div className="wrap">
          <Reveal as="section" className={s.darkInner} aria-labelledby="color-neutral-h">
            <div className={s.head} style={{ paddingBottom: 0 }}>
              <div>
                <span className="t-label" style={{ color: 'var(--active-blue)' }}>03</span>
                <h2 id="color-neutral-h" className="t-h2">Neutral scale.</h2>
              </div>
              <p className="t-lead" style={{ color: 'var(--muted-on-dark)' }}>
                The greys and off-whites read from the case study, with the two small-text inks, and below them a
                ramp computed between Dark Blue and Light Blue.
              </p>
            </div>
            <div className={s.art}>
              <NeutralScale />
            </div>
            <ColourTable id="color-neutral-table" caption="Neutral colours" rows={NEUTRAL} tone="dark" />
          </Reveal>
        </div>
      </div>

      <div className="wrap">
        <Reveal as="section" className={s.section} aria-labelledby="color-proportion-h">
          <Head n="04" title="Proportion.">
            The slide gives each colour an equal band. No usage ratio is published, so the bar starts at the slide&apos;s
            equal split and the sliders try other shares.
          </Head>
          <h3 id="color-proportion-h" className="sr-only">Proportion bar</h3>
          <Proportion />
        </Reveal>

        <Reveal as="section" className={s.section} aria-labelledby="color-pairings-h">
          <Head n="05" title="Pairings.">
            Six pairs that pass for small text, each read both ways. Under them the whole matrix of the palette, and a
            tester to set any colour on any ground.
          </Head>
          <h3 id="color-pairings-h" className="sr-only">Six accessible pairings</h3>
          <PairGrid />
          <div className={s.art} style={{ marginTop: 'calc(var(--gap) * 2)' }}>
            <PairSheet />
          </div>
          <div className={s.art} style={{ marginTop: 'calc(var(--gap) * 2)' }}>
            <Matrix />
          </div>
          <h3 className="t-h3" style={{ margin: 'calc(var(--gap) * 2) 0 var(--gap)' }}>Pairing tester</h3>
          <Tester />
        </Reveal>

        <Reveal as="section" className={s.section} aria-labelledby="color-semantic-h">
          <Head n="06" title="Semantic tokens.">
            The roles the colours play, named for use rather than for hue, in light and in dark mode. The names are
            ours; every value is a published or computed colour.
          </Head>
          <h3 id="color-semantic-h" className="sr-only">Light and dark mode</h3>
          <Semantic />
        </Reveal>
      </div>
    </section>
  );
}
