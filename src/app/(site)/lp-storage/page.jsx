import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import ChargeDemo from '@/components/pages/lp-storage/ChargeDemo';
import { Hero, RowModules, RowConnection, Tile, Strip, Siblings, Closing } from '@/components/pages/lp-storage/Sections';

export const metadata = pageMeta('lp-storage');

// Landing: Storage. A periwinkle hero of three tall battery cells, two rows of two text blocks beside one tall
// artwork, a working demo of eight banks on one busbar, the Almacenamiento tile, a ruled strip of four, a closing band and the footer.
export default function Page() {
  return (
    <section className="page" id="p-lp-storage" aria-label="Landing: Storage">
      <LandingNav current="lp-storage" />
      <Hero />
      <RowModules />
      <RowConnection />
      <ChargeDemo />
      <Tile />
      <Strip />
      <Siblings />
      <Closing />
      <LandingFooter />
    </section>
  );
}
