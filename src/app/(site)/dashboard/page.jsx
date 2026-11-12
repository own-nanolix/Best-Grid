import { pageMeta } from '@/lib/pages';
import { CAPACITY } from '@/lib/brand';
import Shell from '@/components/pages/dashboard/Shell';
import Sheet from '@/components/pages/dashboard/Sheet';
import Gallery from '@/components/pages/dashboard/Gallery';
import Reveal from '@/components/site/Reveal';
import s from '@/components/pages/dashboard/dashboard.module.css';

export const metadata = pageMeta('dashboard');

export default function Page() {
  return (
    <section className="page" id="p-dashboard" aria-label="Dashboard">
      <div className="wrap">
        <header className={s.intro}>
          <h1 tabIndex={-1} className={`t-h1 ${s.h1}`}>Dashboard, five structures for one set of figures.</h1>
          <p className="t-lead muted" lang="es">{CAPACITY.title}</p>
        </header>
        <Reveal as="section" className={s.block} aria-label="Dashboard screens">
          <h2 className="t-h3">Screens</h2>
          <p className="t-small muted">Eight screens in one shell: five options, an overview and two inner screens. Use the arrow keys on the tabs.</p>
          <Shell />
        </Reveal>
        <Reveal as="section" className={s.block} aria-label="Components">
          <h2 className="t-h3">Components</h2>
          <p className="t-small muted">Ten parts of the dashboard with their states. Each one responds to a click.</p>
          <Sheet />
        </Reveal>
        <Reveal as="section" className={s.block} aria-label="Charts and diagrams">
          <h2 className="t-h3">Charts and diagrams</h2>
          <p className="t-small muted">Every drawing exports as its own SVG. Tooltips open on hover and on keyboard focus.</p>
          <Gallery />
        </Reveal>
      </div>
    </section>
  );
}
