import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { SpecTable } from '@/components/ui/Spec';
import Collection from '@/components/pages/use-apparel/Collection';
import { TEES, TeePlate } from '@/components/pages/use-apparel/TeePlates';
import { HOODS, VEST, HoodiePlate } from '@/components/pages/use-apparel/HoodiePlates';
import { CAPS, HAT, CapPlate } from '@/components/pages/use-apparel/CapPlates';
import { ChestDetail, TapeDetail, CordDetail } from '@/components/pages/use-apparel/Details';
import SpecSheet, { AREAS } from '@/components/pages/use-apparel/SpecSheet';
import { mm } from '@/components/pages/use-apparel/fabric';
import s from '@/components/pages/use-apparel/use-apparel.module.css';

export const metadata = pageMeta('use-apparel');

// One row of the print-spec table per placement or garment measure: production values of our own, in plain mm.
const sz = (a) => `${mm(a.w)} × ${mm(a.h)} mm`;
const ROWS = [
  { key: 'chest', head: 'Left chest print', cells: ['Front', sz(AREAS.front[0])] },
  { key: 'back', head: 'Back print', cells: ['Back', sz(AREAS.back[0])] },
  { key: 'nape', head: 'Nape mark', cells: ['Back', sz(AREAS.back[1])] },
  { key: 'width', head: 'Chest width', cells: ['Front and back', `${mm(240)} mm`] },
  { key: 'length', head: 'Length', cells: ['Front and back', `${mm(332)} mm`] },
  { key: 'sleeve', head: 'Sleeve', cells: ['Front and back', `${mm(113)} mm`] },
];

function Fig({ children, name, note }) {
  return (
    <figure className={s.fig}>
      <div className="mock">{children}</div>
      <figcaption className="mock-cap">
        <span>{name}</span>
        {note && <span>{note}</span>}
      </figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-apparel" aria-label="Apparel">
      <div className="wrap">
        <header className={s.head}>
          <h1 className="t-h1" tabIndex={-1}>Apparel</h1>
          <p className={`t-lead muted ${s.lead}`}>
            Three t-shirts, three hoodies and three caps, with a hi-vis vest and a hard hat as workwear, drawn empty in code on a dark stage and lit by one spotlight. The mark, the word-mark and the lattice are the brand&apos;s own; the millimetre values are production values of our own.
          </p>
          <div className={s.rule} />
          <span className={s.node} style={{ left: 0 }} aria-hidden="true" />
        </header>

        <Reveal className={s.section} as="section" aria-labelledby="use-apparel-h-collection">
          <h2 className="t-h2" id="use-apparel-h-collection">Collection</h2>
          <Fig name="Collection" note="Seven garments and four pieces of headwear">
            <Collection />
          </Fig>
        </Reveal>

        <Reveal className={s.section} as="section" aria-labelledby="use-apparel-h-tees">
          <h2 className="t-h2" id="use-apparel-h-tees">T-shirts</h2>
          <div className={s.grid3}>
            {TEES.map((c) => (
              <Fig key={c.k} name={`T-shirt, ${c.label}`} note="Front and back">
                <TeePlate cfg={c} idp={`use-apparel-${c.name}`} />
              </Fig>
            ))}
          </div>
        </Reveal>

        <Reveal className={s.section} as="section" aria-labelledby="use-apparel-h-hoods">
          <h2 className="t-h2" id="use-apparel-h-hoods">Hoodies</h2>
          <div className={s.grid3}>
            {HOODS.map((c) => (
              <Fig key={c.name} name={c.label} note="Three-quarter, in depth">
                <HoodiePlate cfg={c} idp={`use-apparel-${c.name}`} />
              </Fig>
            ))}
          </div>
        </Reveal>

        <Reveal className={s.section} as="section" aria-labelledby="use-apparel-h-caps">
          <h2 className="t-h2" id="use-apparel-h-caps">Caps</h2>
          <div className={s.grid3}>
            {CAPS.map((c) => (
              <Fig key={c.name} name={c.label} note="Profile">
                <CapPlate cfg={c} idp={`use-apparel-${c.name}`} />
              </Fig>
            ))}
          </div>
        </Reveal>

        <Reveal className={s.section} as="section" aria-labelledby="use-apparel-h-work">
          <h2 className="t-h2" id="use-apparel-h-work">Workwear</h2>
          <div className={s.grid2}>
            <Fig name={VEST.label} note="Three-quarter, in depth">
              <HoodiePlate cfg={VEST} idp="use-apparel-vest" />
            </Fig>
            <Fig name={HAT.label} note="Profile">
              <CapPlate cfg={HAT} idp="use-apparel-hard-hat" />
            </Fig>
          </div>
        </Reveal>

        <Reveal className={s.section} as="section" aria-labelledby="use-apparel-h-details">
          <h2 className="t-h2" id="use-apparel-h-details">Close-ups</h2>
          <div className={s.grid3}>
            <Fig name="Chest print" note="T-shirt"><ChestDetail idp="use-apparel-d-chest" /></Fig>
            <Fig name="Reflective tape" note="Vest"><TapeDetail idp="use-apparel-d-tape" /></Fig>
            <Fig name="Drawcord and eyelets" note="Hoodie"><CordDetail idp="use-apparel-d-cord" /></Fig>
          </div>
        </Reveal>

        <Reveal className={s.section} as="section" aria-labelledby="use-apparel-h-spec">
          <h2 className="t-h2" id="use-apparel-h-spec">Print-spec sheet</h2>
          <div className={s.specRow}>
            <Fig name="Print-spec sheet" note="Front and back">
              <SpecSheet />
            </Fig>
            <div className={s.specSide}>
              <SpecTable caption="Placements and measures" columns={['Part', 'Side', 'Size']} rows={ROWS} right={[2]} compact />
              <p className={`t-small muted ${s.note}`}>Values are in millimetres and are our own production values.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
