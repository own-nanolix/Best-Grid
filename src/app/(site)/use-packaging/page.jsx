import { pageMeta } from '@/lib/pages';
import Figure from '@/components/pages/use-packaging/Figure';
import { TapeRollBlue, TapeRollDark, TapeStrips } from '@/components/pages/use-packaging/Tape';
import { ShippingStack, ShippingMailer, ProductLid, TubeCarton } from '@/components/pages/use-packaging/Boxes';
import { BagTall, BagMedium, BagSmall } from '@/components/pages/use-packaging/Bags';
import { TissueBox, SealSheet, ShippingLabel, TubeLabelPlate } from '@/components/pages/use-packaging/Small';
import s from '@/components/pages/use-packaging/use-packaging.module.css';

export const metadata = pageMeta('use-packaging');

// Each group is a run of catalogue plates, one per row, on the dark stage with one spotlight.
const GROUPS = [
  { id: 'tape', title: 'Tape', note: 'Two rolls and a plate of cut strips, printed with the mark and the word-mark.', plates: [['tape-roll-blue', TapeRollBlue], ['tape-roll-dark', TapeRollDark], ['tape-strips', TapeStrips]] },
  { id: 'shipping', title: 'Shipping boxes', note: 'Cartons that carry the brand to the client before the first word is read.', plates: [['shipping-stack', ShippingStack], ['shipping-mailer', ShippingMailer]] },
  { id: 'product', title: 'Product boxes', note: 'The rigid box of the case study, and the project tube packed for transit.', plates: [['product-lid', ProductLid], ['tube-carton', TubeCarton]] },
  { id: 'bags', title: 'Shopping bags', note: 'Three heights, three finishes, one set of marks.', plates: [['bag-tall', BagTall], ['bag-medium', BagMedium], ['bag-small', BagSmall]] },
  { id: 'inside', title: 'Tissue, seal and labels', note: 'The small things that close a parcel, and the tube label drawn large.', plates: [['tissue-box', TissueBox], ['seal-sheet', SealSheet], ['shipping-label', ShippingLabel], ['tube-label', TubeLabelPlate]] },
];

export default function Page() {
  return (
    <section className="page" id="p-use-packaging" aria-label="Packaging">
      <div className="wrap">
        <header className={s.head}>
          <h1 className={s.h1} tabIndex={-1}>Packaging</h1>
          <p className={`t-lead ${s.lead}`}>
            Fourteen catalogue plates for everything that wraps, ships and seals a Best Grid project. Each object stands in
            one light on the dark stage, with its parts named and its dimensions drawn beside it.
          </p>
        </header>
        {GROUPS.map((g) => (
          <section key={g.id} className={s.group} aria-labelledby={`use-packaging-${g.id}-h`}>
            <div className={s.groupHead}>
              <h2 id={`use-packaging-${g.id}-h`}>{g.title}</h2>
              <p className={s.groupNote}>{g.note}</p>
            </div>
            {g.plates.map(([name, Plate]) => (
              <Figure key={name} name={name}>
                <Plate />
              </Figure>
            ))}
          </section>
        ))}
        <p className={s.foot}>Dimensions on the plates are our own production values in plain millimetres, not published figures.</p>
      </div>
    </section>
  );
}
