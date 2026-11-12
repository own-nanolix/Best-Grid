import Art from '@/components/art/Art';
import { LockupCellG, LockupStackG, LockupCornersG, LockupFooterG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import s from './logo.module.css';

// The family of four lockups. Each is an arrangement the case study shows (the nav cell of m16, the card back and
// folder of m05, the poster footer of m11); the stacked one is ours. Plate widths run 2 : 1 : 1 : 2.
export const FAMILY = [
  {
    id: 'cell', name: 'Cell', note: 'Mark cell, word-mark cell (m16)', w: 800, h: 400, ground: HEX.lightBlue,
    art: <LockupCellG x={80} y={120} fill={HEX.darkBlue} line={HEX.darkBlue} />,
  },
  {
    id: 'stack', name: 'Stack', note: 'Mark above the word-mark', w: 400, h: 400, ground: HEX.darkBlue,
    art: <LockupStackG x={0} y={50} fill={HEX.lightBlue} />,
  },
  {
    id: 'corners', name: 'Corners', note: 'Word-mark top right, mark bottom left (m05)', w: 400, h: 400, ground: HEX.activeBlue,
    art: <LockupCornersG w={400} h={400} fill={HEX.darkBlue} />,
  },
  {
    id: 'footer', name: 'Footer', note: 'Three ruled cells (m11)', w: 800, h: 400, ground: HEX.periwinkle,
    art: <LockupFooterG x={40} y={140} w={720} h={120} fill={HEX.darkBlue} line={HEX.darkBlue} size={22} />,
  },
];

export function FamilyPlate({ f }) {
  return (
    <Art viewBox={`0 0 ${f.w} ${f.h}`} title={`${f.name} lockup`} exportName={`logo-lockup-${f.id}`} className={s.plate}>
      <rect width={f.w} height={f.h} fill={f.ground} />
      {f.art}
    </Art>
  );
}

export default function Family() {
  return (
    <div className={s.family}>
      {FAMILY.map((f, i) => (
        <Reveal key={f.id} delay={i * 60}>
          <figure className={s.fig}>
            <FamilyPlate f={f} />
            <figcaption className={s.cap}><span>{f.name}</span><span>{f.note}</span></figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
