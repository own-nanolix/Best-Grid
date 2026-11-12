import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { TotesPlate, MugsPlate, BottlesPlate, StickersPlate, PatchesPlate, CupPlate, DeskPlate, UmbrellaPlate, GiftPlate } from '@/components/pages/use-accessories/plates';
import { ToteSingle, MugSingle, BottleSingle, StickerSingle, PinSingle, PatchSingle, KeychainSingle, CoastersSingle, PadSingle, UmbrellaSingle, GiftFrontSingle, GiftBackSingle, CarrierSingle } from '@/components/pages/use-accessories/singles';
import s from '@/components/pages/use-accessories/use-accessories.module.css';

export const metadata = pageMeta('use-accessories');

// Large plates span 2 x 2; the small single-object plates fill around them. `right` puts a large plate on the right.
const ORDER = [
  [TotesPlate, 'Tote bags', 'large'],
  [ToteSingle, 'Tote bag, Light Blue'],
  [MugSingle, 'Mug, handle left'],
  [BottleSingle, 'Bottle, Dark Blue'],
  [StickerSingle, 'Sticker sheet'],
  [MugsPlate, 'Mugs', 'large right'],
  [PinSingle, 'Pin card'],
  [PatchSingle, 'Patch, close view'],
  [KeychainSingle, 'Keychain'],
  [CoastersSingle, 'Coasters'],
  [BottlesPlate, 'Bottles', 'large'],
  [PadSingle, 'Mouse pad'],
  [UmbrellaSingle, 'Umbrella, side view'],
  [StickersPlate, 'Sticker sheet and pin card', 'large right'],
  [GiftFrontSingle, 'Gift card, front'],
  [GiftBackSingle, 'Gift card, back'],
  [PatchesPlate, 'Patches and keychain', 'large'],
  [CarrierSingle, 'Card carrier'],
  [CupPlate, 'Cup, sleeve and coasters', 'large right'],
  [DeskPlate, 'Desk mat and mouse pad', 'large'],
  [UmbrellaPlate, 'Umbrella and socks', 'large right'],
  [GiftPlate, 'Gift card and carrier', 'large'],
];

export default function Page() {
  return (
    <section className="page" id="p-use-accessories" aria-label="Accessories">
      <div className="wrap">
        <header className={s.head}>
          <p className={`t-label ${s.enter}`} style={{ '--i': 0 }}>Campaign and the physical brand</p>
          <h1 tabIndex={-1} className={`t-h1 ${s.enter}`} style={{ '--i': 1 }}>Accessories</h1>
          <p className={`t-lead muted ${s.enter}`} style={{ '--i': 2 }}>
            Totes, mugs, bottles, stickers, pins, patches, cups, mats, an umbrella, socks and a gift card, each as a
            catalogue plate. The mark, the word-mark, the lattice and the two blues do all the work.
          </p>
        </header>
        <div className={s.grid}>
          {ORDER.map(([Plate, name, kind = ''], i) => (
            <Reveal key={name} as="figure" className={`${s.cell} ${kind.split(' ').map((k) => s[k]).filter(Boolean).join(' ')} mock-fig`} delay={(i % 3) * 60}>
              <div className="mock">
                <Plate />
              </div>
              <figcaption className={`mock-cap ${s.cap}`}>
                <span>{name}</span>
                <span>{String(i + 1).padStart(2, '0')}</span>
              </figcaption>
            </Reveal>
          ))}
          <aside className={s.note}>
            <p className="t-label">Plate notes</p>
            <p className="t-small muted">Dimensions on the plates are production values of our own, in millimetres.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
