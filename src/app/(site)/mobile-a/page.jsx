import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('mobile-a');

export default function Page() {
  return (
    <section className="page" id="p-mobile-a" aria-label="Mobile app, screens 1 to 9" data-stub="">
      <h1 tabIndex={-1}>Mobile app, screens 1 to 9</h1>
    </section>
  );
}
