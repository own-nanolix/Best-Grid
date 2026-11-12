import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import Head from '@/components/pages/logo/Head';
import Primary from '@/components/pages/logo/Primary';
import Construction from '@/components/pages/logo/Construction';
import ClearSpace from '@/components/pages/logo/ClearSpace';
import Colour from '@/components/pages/logo/Colour';
import Family from '@/components/pages/logo/Family';
import Misuse from '@/components/pages/logo/Misuse';
import Lattice from '@/components/pages/logo/Lattice';
import DrawOn from '@/components/pages/logo/DrawOn';
import s from '@/components/pages/logo/logo.module.css';

export const metadata = pageMeta('logo');

const SECTIONS = [
  { id: 'logo-primary', no: '01', title: 'Mark, word-mark and primary lockup', lead: 'The mark alone on Dark Blue at 31% of the slide width, as on the mark slide. The word-mark set once, in a heavier cut with tight spacing. The lockup puts them in two neighbouring cells.', Body: Primary },
  { id: 'logo-construction', no: '02', title: 'Construction', lead: 'Every bar is one width, every frame one pitch. Each tip is cut at 45 degrees and every edge leans the same way.', Body: Construction },
  { id: 'logo-clear-space', no: '03', title: 'Clear space and minimum sizes', lead: 'Space is counted in pitches of the mark itself. The four sizes are drawn at their true size on screen.', Body: ClearSpace },
  { id: 'logo-colour', no: '04', title: 'Colour versions', lead: 'The first four are the pairings the case study shows. The last two stay inside the published palette.', Body: Colour },
  { id: 'logo-family', no: '05', title: 'Lockup family', lead: 'Each arrangement keeps the mark and the word-mark apart, in cells of the guide grid.', Body: Family },
  { id: 'logo-misuse', no: '06', title: 'Misuse', lead: 'Each plate shows one mistake inside a red hairline.', Body: Misuse },
  { id: 'logo-lattice', no: '07', title: 'Secondary graphics', lead: 'The mark is a piece of a larger structure. Continue its frames, cross and diagonals and you get the field; pull its cross out to the edges and you get the bands of the folder.', Body: Lattice },
  { id: 'logo-draw-on', no: '08', title: 'Draw-on', lead: 'Lines first, then nodes, then the fill. Nothing bounces.', Body: DrawOn },
];

export default function Page() {
  return (
    <section className="page" id="p-logo" aria-label="Logo">
      <div className={`wrap ${s.hero}`}>
        <div className={s.heroGrid}>
          <div className="stack">
            <p className="t-label slide-up">Logo</p>
            <h1 className="t-display t-balance slide-up" style={{ '--i': 2 }} tabIndex={-1}>
              Logo.
            </h1>
            <p className="t-lead muted slide-up" style={{ '--i': 4, maxWidth: '52ch' }}>
              The mark, the word-mark and the lockups built from them, with their construction, clear space, minimum sizes, colour versions and misuse. Every drawing below is its own SVG, ready to export.
            </p>
          </div>
          <div className={`${s.heroSide} slide-up`} style={{ '--i': 6 }}>
            <div className={s.heroMark}>
              <Art viewBox="0 0 100 100" title="The Best Grid mark" exportName="logo-hero-mark">
                <MarkG fill={HEX.activeBlue} />
              </Art>
            </div>
            <p className="t-small muted">Active Blue on Dark Blue, as on the mark slide.</p>
          </div>
        </div>
      </div>

      {SECTIONS.map(({ id, no, title, lead, Body }) => (
        <section key={id} className={`wrap ${s.band}`} aria-labelledby={id}>
          <Head id={id} no={no} title={title} lead={lead} />
          <Body />
        </section>
      ))}

      <div className={`wrap ${s.band}`}>
        <Reveal>
          <div className={s.close}>
            {[
              ['Units', 'One unit is 1% of the mark width, so every figure scales with the mark.'],
              ['Colour', 'Grounds and inks are the three published blues, with the sampled light grey-white and warm grey of the printed pieces.'],
              ['Export', 'Every plate on this page is a standalone SVG, with its own title and nothing outside the file.'],
            ].map(([k, v]) => (
              <p key={k} className={s.note}>
                <span className="t-label">{k}</span>
                <span className="t-body">{v}</span>
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
