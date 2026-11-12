import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('showcase');

export default function Page() {
  return (
    <section className="page" id="p-showcase" aria-label="Showcase" data-stub="">
      <h1 tabIndex={-1}>Showcase</h1>
    </section>
  );
}
