import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import FieldHero from '@/components/pages/lp-field/FieldHero';
import { WordRows, FieldBand, LabelRow, PiecesStrip, NodesRow, FieldClose } from '@/components/pages/lp-field/FieldSections';

export const metadata = pageMeta('lp-field');

export default function Page() {
  return (
    <section className="page" id="p-lp-field" aria-label="Landing: Field work">
      <LandingNav current="lp-field" tone="dark" />
      <FieldHero />
      <WordRows />
      <FieldBand />
      <PiecesStrip />
      <LabelRow />
      <NodesRow />
      <FieldClose />
      <LandingFooter />
    </section>
  );
}
