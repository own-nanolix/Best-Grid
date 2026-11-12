import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import HallDemo from '@/components/pages/lp-data-centers/HallDemo';
import { Hero, ThreeRows, Anatomy, StatCell, Viable, Drawings, Closing } from '@/components/pages/lp-data-centers/Sections';

export const metadata = pageMeta('lp-data-centers');

// Landing: Data centres. As the m09 left poster: a Dark Blue hero with the guide frame and racks filling the right
// 60%; the poster's three lines as three successive rows on black with artwork bleeding to the edge; a hall demo;
// the highlighted Data Centers tile; the closing band; the footer.
export default function Page() {
  return (
    <section className="page" id="p-lp-data-centers" aria-label="Landing: Data centres">
      <LandingNav current="lp-data-centers" tone="dark" />
      <Hero />
      <ThreeRows />
      <HallDemo />
      <Anatomy />
      <StatCell />
      <Viable />
      <Drawings />
      <Closing />
      <LandingFooter />
    </section>
  );
}
