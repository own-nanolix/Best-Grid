import { pageMeta } from '@/lib/pages';
import Cover from '@/components/pages/overview/Cover';
import About from '@/components/pages/overview/About';
import Principles from '@/components/pages/overview/Principles';
import ChapterIndex from '@/components/pages/overview/ChapterIndex';
import MockupIndex from '@/components/pages/overview/MockupIndex';
import Colophon from '@/components/pages/overview/Colophon';

export const metadata = pageMeta('overview');

export default function Page() {
  return (
    <section className="page" id="p-overview" aria-label="Overview">
      <Cover />
      <About />
      <Principles />
      <ChapterIndex />
      <MockupIndex />
      <Colophon />
    </section>
  );
}
