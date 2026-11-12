import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('lp-home');

export default function Page() {
  return (
    <section className="page" id="p-lp-home" aria-label="Landing: Home" data-stub="">
      <h1 tabIndex={-1}>Landing: Home</h1>
    </section>
  );
}
