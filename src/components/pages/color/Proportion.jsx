'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import { PALETTE, HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { inkOn } from './data';
import s from './color.module.css';

// The proportion bar. The slide gives the three colours equal bands (about a fifth of the slide each); there is no
// published usage ratio. The bar starts at that equal split and the sliders let a layout be tried at other shares.
const START = [33, 34, 33];

export default function Proportion() {
  const [v, setV] = useState(START);
  const total = v.reduce((a, b) => a + b, 0) || 1;
  const pct = v.map((n) => (n / total) * 100);
  const W = 1350;
  const H = 150;
  const cells = PALETTE.map((p, i) => ({
    p,
    x: pct.slice(0, i).reduce((a, b) => a + b, 0) * (W / 100),
    w: (pct[i] / 100) * W,
    ink: inkOn(p.hex),
  }));
  const set = (i, val) => setV((old) => old.map((n, k) => (k === i ? val : n)));
  const same = v.every((n, i) => n === START[i]);

  return (
    <div className={s.prop}>
      <Art viewBox={`0 0 ${W} ${H}`} title="Proportion bar: the three published colours, equal bands as on the slide until moved" exportName="color-proportion">
        <rect width={W} height={H} fill={HEX.periwinkle} />
        {cells.map(({ p, x: cx, w, ink }) => (
          <g key={p.token}>
            <rect x={r2(cx)} y="0" width={r2(w)} height={H} fill={p.hex} />
            {w > 130 && (
              <g fill={ink}>
                <text x={r2(cx + 16)} y="34" fontSize="20">{p.name}</text>
                <text x={r2(cx + 16)} y="128" fontSize="44" className="display" letterSpacing="-1">{Math.round((w / W) * 100)}%</text>
              </g>
            )}
          </g>
        ))}
        {cells.slice(1).map(({ p, x: cx }) => (
          <NodeG key={p.token} cx={r2(cx)} cy={H / 2} s={9} fill={HEX.darkBlue} />
        ))}
      </Art>
      <div className={s.sliders}>
        {PALETTE.map((p, i) => (
          <label key={p.token} className={s.slider}>
            <span className={s.sliderHead}>
              <span className={s.sw} style={{ background: p.hex }} aria-hidden="true" />
              {p.name}
              <output className="ink">{Math.round(pct[i])}%</output>
            </span>
            <input type="range" min="0" max="100" value={v[i]} onChange={(e) => set(i, Number(e.target.value))} aria-label={`${p.name} share`} />
          </label>
        ))}
        <Button size="sm" onClick={() => setV(START)} disabled={same}>Reset to the slide</Button>
      </div>
    </div>
  );
}
