import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Icon from '@/components/site/Icon';
import { SpecTable } from '@/components/ui/Spec';
import { MARK } from '@/components/art/Mark';
import { TurbineSlide, FourIcons, TURBINE_SPEC, FOUR_NAMES } from '@/components/pages/icons/Construct32';
import Construct24, { SharedRules } from '@/components/pages/icons/Construct24';
import Sheet from '@/components/pages/icons/Sheet';
import InUse from '@/components/pages/icons/InUse';
import Illustration, { ILLUSTRATIONS, illustrationTitle } from '@/components/pages/icons/Illustrations';
import s from '@/components/pages/icons/icons.module.css';

export const metadata = pageMeta('icons');

const HERO_ICONS = ['grid', 'node', 'line', 'pylon', 'substation', 'wind', 'solar', 'battery'];

// The rules the set shares with the mark. Wording is ours; values are measured from the case study.
const RULES = [
  { key: 'grid', head: 'Grid', cells: ['24 x 24 units (the four case-study icons: 32 x 32)', 'A 100 x 100 box'] },
  { key: 'bar', head: 'Bar', cells: ['1 unit, square ends', `One width everywhere: ${MARK.B}`] },
  { key: 'pitch', head: 'Pitch', cells: ['Bars repeat on a regular step, cells stay open', `Pitch ${MARK.P}, bar / pitch 0.41`] },
  { key: 'corner', head: 'Corners', cells: ['The corner pixel is left out: a stepped corner', 'Tips cut by a chamfer'] },
  { key: 'cross', head: 'Crossings', cells: ['Where one bar passes through another, the crossing pixel is left out', 'Frames and the centre cross run frame to frame'] },
  { key: 'diag', head: 'Diagonals', cells: ['Keep the one-unit width (the turbine blades)', `Diagonals of half-width ${MARK.diag}`] },
  { key: 'node', head: 'Nodes', cells: ['Tiny squares, 1 x 1, where lines meet', 'Square nodes at every crossing of the guides'] },
];

function Head({ no, id, title, children }) {
  return (
    <div className={s.head}>
      <div>
        <span className={s.no}>{no}</span>
        <h2 className="t-h2" id={id}>{title}</h2>
      </div>
      <p className={`t-lead ${s.lead}`}>{children}</p>
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-icons" aria-label="Icons and illustration">
      <div className={`wrap ${s.hero}`}>
        <h1 className="t-display" tabIndex={-1}>Icons and illustration.</h1>
        <p className={`t-lead ${s.lead}`} style={{ marginTop: 20 }}>
          Pixel bars with stepped corners and open crossings, drawn out from the four icons of the case study into a set of 32, and grown into illustration.
        </p>
        <div className={s.heroRow} aria-hidden="true">
          {HERO_ICONS.map((n, i) => (
            <span key={n} className="slide-up" style={{ '--i': i + 2 }}>
              <Icon name={n} size={40} />
            </span>
          ))}
        </div>
      </div>

      <section className={`wrap ${s.sec}`} id="icons-construction" aria-labelledby="icons-construction-h">
        <Head no="01" id="icons-construction-h" title="Construction on the 32 grid.">
          The case study builds its icons on a 32 x 32 grid of one-unit bars. The turbine sits inside its guide circles; the four icons sit in a 2 x 2 of guide cells on Dark Blue.
        </Head>
        <div className={s.pair}>
          <Reveal className={s.plate}>
            <TurbineSlide />
            <p className={s.cap}><span>Wind turbine, 32 x 32</span><span>Rebuilt from m14</span></p>
            <dl className={s.tspec}>
              {TURBINE_SPEC.map(([k, v]) => [<dt key={`t${k}`}>{k}</dt>, <dd key={`d${k}`}>{v}</dd>])}
            </dl>
          </Reveal>
          <Reveal className={s.plate} delay={80}>
            <FourIcons />
            <p className={s.cap}><span>The four pixel icons</span><span>Rebuilt from m15</span></p>
            <p className={s.cap} lang="es"><span>{FOUR_NAMES.join(' · ')}</span></p>
          </Reveal>
        </div>
      </section>

      <section className={`wrap ${s.sec}`} id="icons-set" aria-labelledby="icons-set-h">
        <Head no="02" id="icons-set-h" title="The core set.">
          Thirty-two icons on one grid and one bar width. Each is its own SVG: switch the size and the ground, then export any of them.
        </Head>
        <Reveal>
          <Sheet />
        </Reveal>
      </section>

      <section className={`wrap ${s.sec}`} id="icons-grid24" aria-labelledby="icons-grid24-h">
        <Head no="03" id="icons-grid24-h" title="Construction on the 24 grid.">
          Two icons drawn on the pixel grid: the unit, the key lines, the stepped corners, the open crossings and the square ends, then four sizes of each.
        </Head>
        <div className={s.stackGap}>
          <Construct24 />
        </div>
        <div className={s.sec}>
          <Reveal>
            <SharedRules />
          </Reveal>
          <div style={{ marginTop: 'var(--gap)' }}>
            <SpecTable caption="Rules the icons share with the mark" columns={['Rule', 'The icons', 'The mark']} rows={RULES} compact />
          </div>
        </div>
      </section>

      <section className={`wrap ${s.sec}`} id="icons-use" aria-labelledby="icons-use-h">
        <Head no="04" id="icons-use-h" title="Icons in use.">
          The set inside the brand&apos;s own components, with its own words and figures: the technology tile, the services of the tube label, the KPI cells and the contact lines.
        </Head>
        <Reveal>
          <InUse />
        </Reveal>
      </section>

      <section className={`wrap ${s.sec}`} id="icons-illustration" aria-labelledby="icons-illustration-h">
        <Head no="05" id="icons-illustration-h" title="Illustration.">
          Three subjects from the world of grid access, built from the lattice, the nodes and the guide lines. No people. Each comes on light and on dark.
        </Head>
        <div className={s.illCols}>
          {ILLUSTRATIONS.map((kind, i) => (
            <Reveal key={kind} className={s.illCol} delay={i * 80}>
              {['light', 'dark'].map((tone) => (
                <figure className={s.ill} key={tone}>
                  <Illustration kind={kind} tone={tone} />
                  <figcaption>{`${illustrationTitle(kind)}, ${tone}`}</figcaption>
                </figure>
              ))}
            </Reveal>
          ))}
        </div>
      </section>
    </section>
  );
}
