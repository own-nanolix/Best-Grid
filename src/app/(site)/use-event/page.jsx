import { pageMeta } from '@/lib/pages';
import { Opening, Credentials, Tickets, Wristbands } from '@/components/pages/use-event/Sections';
import s from '@/components/pages/use-event/use-event.module.css';

export const metadata = pageMeta('use-event');

export default function Page() {
  return (
    <section className="page" id="p-use-event" aria-label="Event">
      <header className={`wrap ${s.head}`}>
        <h1 className="t-h1" tabIndex={-1}>Event</h1>
        <p className={`t-lead ${s.lead}`}>The Best Grid identity at the show: the booth, the badge, passes, bands, flags and a banner, each on its own plate.</p>
      </header>
      <Opening />
      <Credentials />
      <Tickets />
      <Wristbands />
    </section>
  );
}
