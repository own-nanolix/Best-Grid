import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('use-world');

export default function Page() {
  return (
    <section className="page" id="p-use-world" aria-label="In the world" data-stub="">
      <h1 tabIndex={-1}>In the world</h1>
    </section>
  );
}
