// The production values of the tube, card and carton as one spec sheet with oversized numerals.
// All values are our own plain-mm production values, not published by the case study.
import { Numeral, SpecTable } from '@/components/ui/Spec';
import s from './use-product.module.css';

const BIG = [
  { value: '120', unit: 'mm', label: 'Tube diameter' },
  { value: '306', unit: 'mm', label: 'Tube length with lid' },
  { value: '70', unit: 'mm', label: 'Label, square' },
  { value: '55 × 85', unit: 'mm', label: 'Access card' },
];

const ROWS = [
  { key: 'tube', head: 'Tube', cells: ['Rigid wound card', '3 mm wall', 'Lid band 26 mm'] },
  { key: 'label', head: 'Label', cells: ['Grey label paper', '70 × 70 mm', 'Active Blue print'] },
  { key: 'drawing', head: 'Drawing', cells: ['Uncoated paper', 'A3, 420 × 297 mm', 'Rolled, 100 mm roll'] },
  { key: 'carton', head: 'Carton', cells: ['Light card', '140 × 140 mm', 'Height 270 mm'] },
  { key: 'card', head: 'Access card', cells: ['Card stock, painted edge', '55 × 85 mm', '0.8 mm thick'] },
];

export default function SpecSheet() {
  return (
    <div className={s.sheet}>
      <ul className={s.big}>
        {BIG.map((b) => (
          <li key={b.label}>
            <Numeral value={b.value} unit={b.unit} size="m" />
            <span className="t-small muted">{b.label}</span>
          </li>
        ))}
      </ul>
      <SpecTable caption="Production values" columns={['Part', 'Material', 'Size', 'Note']} rows={ROWS} compact />
      <p className={`t-small muted ${s.notes}`}>These millimetre values are our own production values for the objects drawn here. The case study does not publish them.</p>
    </div>
  );
}
