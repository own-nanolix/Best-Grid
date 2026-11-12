import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import { SCREENS } from './registry';
import s from './mobile-a.module.css';

// Six of the screens as standalone exportable SVG artwork (390 x 844 each). The phone frame is exported from the
// live phone above (mobile-a-phone-frame).
const EXPORTS = [
  { i: 0, key: 'capacity' },
  { i: 1, key: 'node-grid' },
  { i: 2, key: 'technology-tiles' },
  { i: 6, key: 'report-cover' },
  { i: 7, key: 'brand-palette' },
  { i: 8, key: 'quarters' },
];

export default function Artwork() {
  return (
    <section className={`${s.art} wrap`} aria-labelledby="mobile-a-art-h">
      <h2 id="mobile-a-art-h" className="t-h3">Screen artwork</h2>
      <p className="t-body muted">Each drawing below is one screen as a single SVG, ready to export.</p>
      <ul className={s.artGrid}>
        {EXPORTS.map(({ i, key }, n) => {
          const { Draw, name, n: num } = SCREENS[i];
          return (
            <li key={key}>
              <Reveal delay={n * 40}>
                <figure className={s.fig}>
                  <Art viewBox="0 0 390 844" title={`Screen ${num}: ${name}`} exportName={`mobile-a-screen-${key}`} className={s.figSvg}>
                    <Draw idp={`mobile-a-art-${key}`} />
                  </Art>
                  <figcaption className={s.figCap}>
                    <span className={s.miniNum}>{num}</span> {name}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
