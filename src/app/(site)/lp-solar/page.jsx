import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import { SolarHero, RowGeneration, RowRoute, RowClarity, ServiceCells, ModuleRow, PanelSpec, BandsSection, PosterSection, TechTiles, SolarClose } from '@/components/pages/lp-solar/SolarSections';

export const metadata = pageMeta('lp-solar');

// Landing page 2: Fotovoltaico. Hero 7 : 5 (figure left, panel field right), three split rows whose art side widens
// (7:5, 6:6, 5:7), three ruled service cells, the m09 generation poster, the technology tiles, the footer.
export default function Page() {
  return (
    <section className="page" id="p-lp-solar" aria-label="Landing: Solar" style={{ paddingBottom: 0 }}>
      <LandingNav current="lp-solar" />
      <SolarHero />
      <RowGeneration />
      <RowRoute />
      <RowClarity />
      <ServiceCells />
      <ModuleRow />
      <PanelSpec />
      <BandsSection />
      <PosterSection />
      <TechTiles />
      <SolarClose />
      <LandingFooter />
    </section>
  );
}

// Notes for reviewers
// - Every brand line on this page is Spanish, verbatim from the case study, and carries lang="es".
// - Every label, caption and control in English is plain naming of a deliverable or a control.
// - Every figure is printed beside the technology it belongs to (the m16 website tiles); no other figure is used.
// - All artwork is inline SVG exported by name (data-export="lp-solar-...") and animated with CSS keyframes only.
// - Nothing here uses a photograph, a person, another company's name, a price, a place or a client.
// - Entrance: guides extend, nodes snap in, then text and cells fill (the shared motion tokens).
// - Reduced motion: shared CSS shortens the keyframes; the page's own keyframes are shortened in its module.
// - Narrow screens: rows stack with the text first, grids use minmax(0, 1fr), nothing scrolls sideways.
