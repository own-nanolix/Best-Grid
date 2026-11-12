import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import EaseSection from '@/components/pages/motion/EaseSection';
import LogoSection from '@/components/pages/motion/LogoSection';
import TransitionsSection from '@/components/pages/motion/TransitionsSection';
import MicroSection from '@/components/pages/motion/MicroSection';
import DoDontSection from '@/components/pages/motion/DoDontSection';
import Sequence from '@/components/pages/motion/Sequence';
import s from '@/components/pages/motion/motion.module.css';

export const metadata = pageMeta('motion');

// Section frame: a hairline with its node, a number, the heading and a short line of what it holds.
function Block({ n, id, title, lead, children }) {
  return (
    <section className={`wrap ${s.section}`} aria-labelledby={id}>
      <div className={`${s.blockHead} guide-t`}>
        <span className="node" style={{ left: 0, top: 0 }} aria-hidden="true" />
        <p className="t-label">{n}</p>
        <div className="stack">
          <h2 className="t-h2 t-balance" id={id}>{title}</h2>
          <p className="t-lead muted">{lead}</p>
        </div>
      </div>
      <Reveal>{children}</Reveal>
    </section>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-motion" aria-label="Motion">
      <header className={`wrap ${s.hero}`}>
        <div className={`${s.heroText} stack`}>
          <p className={`t-label slide-up`}>Motion</p>
          <h1 tabIndex={-1} className="t-display t-rows slide-up" style={{ '--i': 2 }}>
            <span>Lines first.</span>
            <span>Then nodes.</span>
            <span>Then cells.</span>
          </h1>
          <p className="t-lead slide-up" style={{ '--i': 4 }}>
            Motion here is engineered, exact and calm. Guide lines extend, nodes snap in at the crossings, content fills the cells, and nothing bounces. The only motion the case study publishes is a hard-cut cycle at 100 ms per frame; everything below is built to match it.
          </p>
          <p className="t-small muted slide-up" style={{ '--i': 6 }}>With reduced motion on, every demo on this page shows its final state.</p>
        </div>
        <div className={s.heroArt}><Sequence /></div>
      </header>

      <Block n="01" id="motion-system" title="The motion system." lead="Five easings and six durations, each as a live demo. Every curve is drawn from its real control points and can be exported as SVG.">
        <EaseSection />
      </Block>

      <Block n="02" id="motion-logo" title="The logo in motion." lead="The one animation the designer published, rebuilt frame by frame from its eight frames with the shared poster sheets, then the mark drawing on in the house order.">
        <LogoSection />
      </Block>

      <Block n="03" id="motion-transitions" title="Page and component transitions." lead="How the site enters a page, and how a row, a tile, a card, a sheet and a set of tabs arrive.">
        <TransitionsSection />
      </Block>

      <Block n="04" id="motion-micro" title="Micro-interactions." lead="Buttons, toggles, inputs, loaders and toasts, live, in the brand's square shapes. Try hover, focus with the keyboard, and press.">
        <MicroSection />
      </Block>

      <Block n="05" id="motion-dodont" title="Do and don't." lead="Each pair plays side by side. The wrong version is still transform and opacity only: just its easing, distance or shape of motion is wrong.">
        <DoDontSection />
      </Block>
    </section>
  );
}
