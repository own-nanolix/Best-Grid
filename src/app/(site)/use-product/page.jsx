import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { HeroPlate, FrontPlate, SidePlate } from '@/components/pages/use-product/TubePlates';
import { OpenPlate, CartonPlate, ColourwayPlate, DrawingPlate, LabelPlate } from '@/components/pages/use-product/TubePlates2';
import { CardPlate } from '@/components/pages/use-product/CardPlates';
import { DevicesPlate } from '@/components/pages/use-product/DevicePlate';
import { AppIcon, IconLadder, ICON_SIZES } from '@/components/pages/use-product/AppIcon';
import SpecSheet from '@/components/pages/use-product/SpecSheet';
import s from '@/components/pages/use-product/use-product.module.css';

export const metadata = pageMeta('use-product');

// One plate with its plain-name caption and plate number.
function Fig({ children, name, no, delay = 0 }) {
  return (
    <Reveal delay={delay} as="figure" className={s.fig}>
      <div className="mock">{children}</div>
      <figcaption><span>{name}</span><span className={s.no}>{no}</span></figcaption>
    </Reveal>
  );
}

function Band({ id, no, title, lead, children }) {
  return (
    <section className={`wrap ${s.band}`} aria-labelledby={id}>
      <div className={s.bandHead}>
        <div className="stack">
          <p className="t-label">{no}</p>
          <h2 id={id} className="t-h2 t-balance">{title}</h2>
        </div>
        <p className="t-lead muted" style={{ maxWidth: '56ch' }}>{lead}</p>
      </div>
      {children}
    </section>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-product" aria-label="Product: the project tube">
      <div className={`wrap ${s.head}`}>
        <div className={s.headGrid}>
          <div className="stack">
            <p className="t-label slide-up">Product</p>
            <h1 className={`t-display t-balance slide-up ${s.title}`} style={{ '--i': 2 }} tabIndex={-1}>
              Product: the project tube
            </h1>
          </div>
          <p className="t-lead muted slide-up" style={{ '--i': 4, maxWidth: '48ch' }}>
            The physical hand-over of a connection study: a rigid card tube with a lid, a grey project label and the rolled drawing inside. Every object below is drawn in code on a dark stage with one light.
          </p>
        </div>
      </div>

      <section className="wrap" aria-label="The three tubes">
        <Fig name="Three project tubes" no="01"><HeroPlate /></Fig>
      </section>

      <Band id="use-product-standing" no="02 · 03" title="Standing and lying." lead="The tube stands and turns to the light, then lies on its side so the lid and its rim can be read, side on and end on.">
        <div className={s.pair}>
          <Fig name="Tube, front" no="02"><FrontPlate /></Fig>
          <Fig name="Tube, side and end" no="03" delay={80}><SidePlate /></Fig>
        </div>
      </Band>

      <Band id="use-product-open" no="04" title="Open, with the drawing half out." lead="The connection-study drawing is a single-line diagram and a lattice study on the brand's guide lines. It carries only the printed project line, date, mark and web address.">
        <Fig name="Tube open, drawing half out" no="04"><OpenPlate /></Fig>
      </Band>

      <Band id="use-product-drawing" no="07 · 08" title="The drawing and its label." lead="The drawing laid flat with one turned corner, and the grey label as printed, every line in the designer's Spanish, the client line a neutral placeholder.">
        <div className={s.pairWide}>
          <Fig name="Connection-study drawing" no="07"><DrawingPlate /></Fig>
          <Fig name="Project label, flat" no="08" delay={80}><LabelPlate /></Fig>
        </div>
      </Band>

      <Band id="use-product-carton" no="05 · 06" title="In its carton, and in the second blue." lead="The tube travels in a light card carton. The second colourway turns the tube Dark Blue and the lid face Active Blue, the two blues of the case study.">
        <div className={s.pair}>
          <Fig name="Tube in its carton" no="05"><CartonPlate /></Fig>
          <Fig name="Second colourway" no="06" delay={80}><ColourwayPlate /></Fig>
        </div>
      </Band>

      <Band id="use-product-card" no="09 · 10 · 11" title="The access card, in three colourways." lead="The staff card of the badge, as printed, in three colourways and set into the 55 × 85 mm card format; on the back a dark strip, the contact details and quiet bars for a name and a number.">
        <div className={s.trio}>
          <Fig name="Access card, light" no="09"><CardPlate variant="light" /></Fig>
          <Fig name="Access card, dark" no="10" delay={80}><CardPlate variant="dark" /></Fig>
          <Fig name="Access card, active" no="11" delay={160}><CardPlate variant="active" /></Fig>
        </div>
      </Band>

      <Band id="use-product-devices" no="12" title="On tablet, phone and watch." lead="The capacity screens of the case study on neutral frames. Only the published figures appear; no clock is shown.">
        <Fig name="Tablet, phone and watch" no="12"><DevicesPlate /></Fig>
      </Band>

      <Band id="use-product-spec" no="14" title="The numbers, in one sheet." lead="Every millimetre value on the plates in one place. They are production values of our own, so a printer can start from them.">
        <SpecSheet />
      </Band>

      <Band id="use-product-icon" no="13" title="The app icon, five sizes." lead="The mark on its Dark Blue tile, drawn at its real pixel size. The lattice is simplified at 16 and 32 px so the star stays legible.">
        <div className={s.ladder}><IconLadder /></div>
        <ol className={s.icons} aria-label="App icon sizes">
          {ICON_SIZES.map(({ px, note }) => (
            <li key={px}>
              <AppIcon px={px} />
              <span className={`t-num ${s.iconPx}`}>{px} px</span>
              <span className="t-small muted">{note}</span>
            </li>
          ))}
        </ol>
      </Band>
    </section>
  );
}
