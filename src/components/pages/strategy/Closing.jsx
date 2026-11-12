// The closing band: the brand idea on Dark Blue, the event screen's two-tone pair, the mark echoed outward, and the
// way on to the next chapter. The paragraph is ours, written only from what the case study shows, and the page says
// so: it is labelled as our note, never presented as the brand's copy.
import Reveal from '@/components/site/Reveal';
import Button from '@/components/ui/Button';
import { TwoTone } from '@/components/ui/Card';
import { LINES } from '@/lib/brand';
import { BRAND_IDEA } from './data';
import BrandIdea from './BrandIdea';
import s from './strategy.module.css';

export default function Closing() {
  return (
    <section className={`field-dark ${s.closing}`} aria-labelledby="strategy-idea-title">
      <div className={`wrap ${s.closingGrid}`}>
        <div className={s.closingText}>
          <Reveal>
            <p className="t-label">Our note</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="strategy-idea-title" className="t-h2 t-balance">
              The brand idea, as we read it.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <figure className={s.ourNote}>
              <p className="t-lead">{BRAND_IDEA}</p>
              <figcaption className="t-small muted">
                Our summary, written from the case study for this site. It is not the brand&apos;s copy.
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={180}>
            <TwoTone rows={LINES.connect.rows} tone={LINES.connect.tone} as="p" lightClass="tone-light" darkClass="blue" lang="es" className="t-h2" />
            <p className="t-small muted" style={{ marginTop: 12 }}>Printed on the event screen.</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="row">
              <Button href="/web-system/" variant="active">
                Next: Web system
              </Button>
              <Button href="/overview/" variant="ghost">
                Back to the overview
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal from="scale" delay={100}>
          <div className={s.closingArt}>
            <BrandIdea />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
