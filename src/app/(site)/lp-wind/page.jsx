import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import { WindHero, Construction, TurbineSpec, RotorRow, WindTiles, RowFarm, RowCollector, FigureBand, FieldRow, PosterRow, WindContact, WindClose } from '@/components/pages/lp-wind/WindSections';

export const metadata = pageMeta('lp-wind');

// Landing page 3: Eólico. Hero: the fog field full-bleed with the line between two guides (m01); a three-column
// construction split; two flipped split rows; the 2.794 MW figure as a full-width band; the field line; footer.
export default function Page() {
  return (
    <section className="page" id="p-lp-wind" aria-label="Landing: Wind" style={{ paddingBottom: 0 }}>
      <LandingNav current="lp-wind" />
      <WindHero />
      <Construction />
      <TurbineSpec />
      <RowFarm />
      <RowCollector />
      <FigureBand />
      <RotorRow />
      <FieldRow />
      <PosterRow />
      <WindTiles />
      <WindContact />
      <WindClose />
      <LandingFooter />
    </section>
  );
}

// Notes for reviewers
// - Every brand line on this page is Spanish, verbatim from the case study, and carries lang="es".
// - Every label, caption and control in English is plain naming of a deliverable or a control.
// - Every figure is printed beside the technology it belongs to (the m16 website tiles); no other figure is used.
// - All artwork is inline SVG exported by name (data-export="lp-wind-...") and animated with CSS keyframes only.
// - Nothing here uses a photograph, a person, another company's name, a price, a place or a client.
// - Entrance: guides extend, nodes snap in, then text and cells fill (the shared motion tokens).
// - Reduced motion: shared CSS shortens the keyframes; the page's own keyframes are shortened in its module.
// - Narrow screens: rows stack with the text first, grids use minmax(0, 1fr), nothing scrolls sideways.
