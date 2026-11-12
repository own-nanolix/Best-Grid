import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import { ReportHero, FiguresSection, WalkRows, RangeBand, RequestSection, PrintedFacts, ContentsStrip } from '@/components/pages/lp-annual-report/ReportSections';

export const metadata = pageMeta('lp-annual-report');

export default function Page() {
  return (
    <section className="page" id="p-lp-annual-report" aria-label="Landing: Annual report">
      <LandingNav current="lp-annual-report" tone="light" />
      <ReportHero />
      <ContentsStrip />
      <FiguresSection />
      <WalkRows />
      <PrintedFacts />
      <RangeBand />
      <RequestSection />
      <LandingFooter />
    </section>
  );
}
