import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Billboard from '@/components/pages/use-world/Billboard';
import Citylight from '@/components/pages/use-world/Citylight';
import Reception from '@/components/pages/use-world/Reception';
import Vehicle from '@/components/pages/use-world/Vehicle';
import Wayfinding from '@/components/pages/use-world/Wayfinding';
import Plaque from '@/components/pages/use-world/Plaque';
import SiteSign from '@/components/pages/use-world/SiteSign';
import s from '@/components/pages/use-world/use-world.module.css';

export const metadata = pageMeta('use-world');

const SCENES = [
  { id: 'billboard', name: 'Billboard', note: 'Face as the case study prints it, 12 000 × 3 800 mm', C: Billboard },
  { id: 'citylight', name: 'Citylight and roll-ups', note: 'Backlit poster and two banners', C: Citylight },
  { id: 'reception', name: 'Reception signage', note: 'Raised logo, counter, wayfinding panel and room plaque', C: Reception },
  { id: 'wayfinding', name: 'Wayfinding plaques', note: 'Facility words and the case study section words, with arrows', C: Wayfinding },
  { id: 'plaque', name: 'Room plaque', note: 'Close up from 20 degrees left', C: Plaque },
  { id: 'vehicle', name: 'Vehicle wrap', note: 'Livery on a generic body', C: Vehicle },
  { id: 'site-sign', name: 'Site sign', note: 'Fence panel for an energy site', C: SiteSign },
];

export default function Page() {
  return (
    <section className="page" id="p-use-world" aria-label="In the world">
      <header className={`${s.head} wrap`}>
        <h1 tabIndex={-1} className="t-h1">In the world</h1>
        <p className="t-lead muted">The identity outdoors and on site: billboard, posters, signage and fleet, staged as catalogue plates.</p>
      </header>
      <div className={`${s.scenes} wrap`}>
        {SCENES.map(({ id, name, note, C }, i) => (
          <Reveal key={id}>
            <figure className={s.plate} id={`use-world-${id}`}>
              <h2 className={s.name}>{name}</h2>
              <div className="mock"><C /></div>
              <figcaption className="mock-cap"><span>{String(i + 1).padStart(2, '0')} {name}</span><span>{note}</span></figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
