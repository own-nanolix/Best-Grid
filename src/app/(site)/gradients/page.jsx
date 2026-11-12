import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { GuidesG, LatticeFieldG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import Library from '@/components/pages/gradients/Library';
import Anatomy from '@/components/pages/gradients/Anatomy';
import { GrainStrip, GrainLevels, SurfacePlates } from '@/components/pages/gradients/Textures';
import Plates from '@/components/pages/gradients/Plates';
import MotionStudies from '@/components/pages/gradients/Motion';
import s from '@/components/pages/gradients/gradients.module.css';

export const metadata = pageMeta('gradients');

const FACTS = [
  { k: 'Published gradients', v: 'None', t: 'The brand fields are flat: Dark Blue, Active Blue, Light Blue and periwinkle.' },
  { k: 'Tonal fields shown', v: 'Fog, sunset', t: 'They live in the photographs only. Rebuilt here as SVG gradients, never as photos.' },
  { k: 'Surface treatments', v: 'Grain, lines', t: 'Paper and board grain, the baseline field of the poster grid, the bubble film of the mailer.' },
];

function Head({ kicker, title, children }) {
  return (
    <div className={s.sectionHead}>
      <div>
        <span className={`${s.kicker} t-label`}>{kicker}</span>
        <h2 className="t-h2">{title}</h2>
      </div>
      <p className="t-lead muted">{children}</p>
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-gradients" aria-label="Gradients and key art">
      <header className={`${s.head} wrap`}>
        <div className={s.headGrid}>
          <div>
            <span className="t-label">Gradients, texture and key art</span>
            <h1 className="t-display" tabIndex={-1}>Gradients and key art</h1>
            <p className={`${s.lead} t-lead muted`}>
              The case study is flat colour. Everything below is built from its own pieces: the published blues, the two
              photographic tones, the mark&apos;s lattice, the crossing bands and the node grid.
            </p>
          </div>
          <Art viewBox="0 0 400 400" title="The lattice of the mark continued outward on guide lines" exportName="gradients-header-lattice" className={s.headArt}>
            <rect width="400" height="400" fill={HEX.darkBlue} />
            <LatticeFieldG cx={200} cy={200} k={3.4} rings={4} fill={HEX.activeBlue} className="lattice-fill" />
            <GuidesG w={400} h={400} xs={[24, 376]} ys={[24, 376]} stroke={HEX.lightBlue} weight={1} node={6} opacity="0.55" animate />
          </Art>
        </div>
        <div className={s.facts}>
          {FACTS.map((f, i) => (
            <Reveal key={f.k} delay={i * 60} className={s.fact}>
              <span className="t-label">{f.k}</span>
              <div className="t-num t-num-s">{f.v}</div>
              <p className="t-small muted">{f.t}</p>
            </Reveal>
          ))}
        </div>
      </header>

      <div className="wrap">
        <section className={s.section} aria-labelledby="gradients-h-library">
          <Head kicker="01 Library" title={<span id="gradients-h-library">Six named gradients</span>}>
            Two are rebuilt from the photographs of the case study. Four are restrained fields of the published
            colours and their tints, each with two stops.
          </Head>
          <Library />
        </section>

        <section className={s.section} aria-labelledby="gradients-h-anatomy">
          <Head kicker="02 Anatomy" title={<span id="gradients-h-anatomy">Stops, angle, positions</span>}>
            The two photographic gradients drawn open: where each stop sits, which colour it holds, and the vector the
            colour follows.
          </Head>
          <Anatomy />
        </section>

        <section className={s.section} aria-labelledby="gradients-h-grain">
          <Head kicker="03 Grain and texture" title={<span id="gradients-h-grain">Surface, before and after</span>}>
            Every printed surface carries a fine paper grain; the box and tubes a coarser board grain. Four levels, then
            the other two textures the case study shows.
          </Head>
          <GrainStrip />
          <GrainLevels />
          <SurfacePlates />
        </section>

        <section className={s.section} aria-labelledby="gradients-h-key">
          <Head kicker="04 Key art" title={<span id="gradients-h-key">Six plates from the brand&apos;s geometry</span>}>
            Lattice, crossing bands, node grid, converging lines, cells filling and the star echo. Lines of text are
            the ones the case study prints.
          </Head>
          <Plates />
        </section>

        <section className={s.section} aria-labelledby="gradients-h-motion">
          <Head kicker="05 Motion studies" title={<span id="gradients-h-motion">Four loops</span>}>
            Lines extend first, nodes snap in, cells fill, and the hard cut of the poster animation. Each loop carries
            its own CSS keyframes and is finished artwork when still.
          </Head>
          <MotionStudies />
        </section>
      </div>
    </section>
  );
}
