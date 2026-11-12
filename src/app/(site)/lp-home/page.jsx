import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-home/Hero';
import { RowReport, RowTube, RowNodes } from '@/components/pages/lp-home/Extra';
import { Tiles, PhotoBand, RowDataCentre, RowGeneration, RowField, RowClarity, Capacity, Connect, OriginalScreen } from '@/components/pages/lp-home/Sections';

export const metadata = pageMeta('lp-home');

// The landing page of m16, rebuilt section by section and continued in the case study's own language:
// nav, hero (m16), technology tiles (m16), photo band, four alternating poster rows (m09, m11), the capacity
// dashboard (m17), the connect band (m22), the original screen in a neutral window, and the footer.
export default function Page() {
  return (
    <section className="page" id="p-lp-home" aria-label="Landing: Home" style={{ paddingBottom: 0 }}>
      <LandingNav current="lp-home" />
      <Hero />
      <Tiles />
      <PhotoBand />
      <div className="split-rows">
        <RowDataCentre />
        <RowGeneration />
        <RowField />
        <RowClarity />
        <Capacity />
        <RowReport />
        <RowTube />
        <RowNodes />
      </div>
      <Connect />
      <OriginalScreen />
      <LandingFooter />
    </section>
  );
}
