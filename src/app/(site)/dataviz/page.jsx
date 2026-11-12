import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('dataviz');

export default function Page() {
  return (
    <section className="page" id="p-dataviz" aria-label="Data visualisation" data-stub="">
      <h1 tabIndex={-1}>Data visualisation</h1>
    </section>
  );
}
