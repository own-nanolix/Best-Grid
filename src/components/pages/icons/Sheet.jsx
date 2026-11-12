'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import { CORE, CORE_NAMES } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './icons.module.css';

const SIZES = ['16 px', '24 px', '32 px', '48 px'];

// "pylon" -> "Pylon", "arrow-up-right" -> "Arrow up right": the plain name of each exported icon.
const plain = (n) => n.charAt(0).toUpperCase() + n.slice(1).replace(/-/g, ' ');

// The sheet of the 32 core icons: one grid, one bar, each icon its own exportable SVG.
// The size switch scales every icon; the ground switch swaps Dark Blue ink on light for Active Blue on Dark Blue.
export default function Sheet() {
  const [size, setSize] = useState('32 px');
  const [dark, setDark] = useState(false);
  const px = parseInt(size, 10);
  const fill = dark ? HEX.activeBlue : HEX.darkBlue;

  return (
    <div>
      <div className={s.controls}>
        <Segmented id="icons-size" label="Icon size" options={SIZES} value={size} onChange={setSize} />
        <Toggle label="Dark ground" checked={dark} onChange={setDark} />
        <p className="t-small muted" aria-live="polite" id="icons-size-note">
          {`${CORE_NAMES.length} icons, shown at ${px} px: one unit is ${r2(px / 24)} px.`}
        </p>
      </div>
      <div className={`${s.sheet} ${dark ? s.sheetDark : ''}`} id="icons-sheet" style={{ '--k': r2(px / 48) }}>
        {CORE_NAMES.map((name, i) => (
          <div className={s.cell} key={name} style={{ '--i': i % 8 }}>
            <span className={s.no}>{String(i + 1).padStart(2, '0')}</span>
            <Art viewBox="0 0 24 24" title={`${plain(name)} icon`} exportName={`icons-${name}`} className={s.glyph}>
              <path d={CORE[name]} fill={fill} />
            </Art>
            <span className={s.name}>{plain(name)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
