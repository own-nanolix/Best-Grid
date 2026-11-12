import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import MobileDemo from '@/components/pages/mobile-a/MobileDemo';
import Artwork from '@/components/pages/mobile-a/Artwork';
import s from '@/components/pages/mobile-a/mobile-a.module.css';

export const metadata = pageMeta('mobile-a');

export default function Page() {
  return (
    <section className="page" id="p-mobile-a" aria-label="Mobile app, screens 1 to 9">
      <header className={`${s.head} wrap`}>
        <Reveal>
          <p className="t-label">Mobile app</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 tabIndex={-1} className="t-h1">Mobile app, screens 1 to 9</h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="t-lead muted">Two screens come from the case study; the rest continue its language.</p>
        </Reveal>
      </header>
      <MobileDemo />
      <Artwork />
    </section>
  );
}
