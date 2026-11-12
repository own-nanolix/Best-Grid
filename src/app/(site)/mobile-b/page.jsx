import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Showcase from '@/components/pages/mobile-b/Stage';
import ComponentSet from '@/components/pages/mobile-b/Components';
import Patterns from '@/components/pages/mobile-b/Patterns';
import Exports from '@/components/pages/mobile-b/Exports';
import { LINES } from '@/lib/brand';

export const metadata = pageMeta('mobile-b');

export default function Page() {
  return (
    <section className="page" id="p-mobile-b" aria-label="Mobile app, screens 10 to 18">
      <header className="wrap band" style={{ paddingBottom: 0 }}>
        <Reveal>
          <p className="t-label" style={{ marginBottom: 14 }}>Mobile, part two</p>
          <h1 className="t-h1 t-balance" tabIndex={-1} style={{ maxWidth: '16ch' }}>Mobile app, screens 10 to 18.</h1>
          <p className="t-lead muted" style={{ marginTop: 18, maxWidth: '52ch' }}>
            Nine more screens in the language of the two phone screens: calm fields, hairlines, square corners. Step through them,
            take the component set apart, and try the seven patterns.
          </p>
          <p lang="es" className="t-lead ink" style={{ marginTop: 22 }}>{LINES.card}</p>
        </Reveal>
      </header>
      <Showcase />
      <ComponentSet />
      <Patterns />
      <Exports />
    </section>
  );
}
