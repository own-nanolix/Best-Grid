'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import CopyValue from '@/components/site/CopyValue';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { GLYPHS, GLYPH_COLS, codeOf } from './data';
import s from './typography.module.css';

// The character set as a 12-column glyph grid. Hover, focus or click a glyph to read it large with its code point.
export default function Charset() {
  const [sel, setSel] = useState(0);
  const cur = GLYPHS[sel];
  return (
    <div className={s.charset}>
      <div className={s.glyphGrid} role="group" aria-label="Character set">
        {GLYPHS.map((x, i) => (
          <button
            key={`${x.g}-${i}`}
            type="button"
            className={s.glyph}
            aria-pressed={i === sel}
            aria-label={`${x.g}, ${codeOf(x.g)}`}
            onClick={() => setSel(i)}
            onMouseEnter={() => setSel(i)}
            onFocus={() => setSel(i)}
            lang="es"
          >
            {x.g}
          </button>
        ))}
      </div>
      <div className={`${s.glyphDetail} field-dark`} aria-live="polite">
        <span className={s.glyphBig} lang="es">{cur.g}</span>
        <dl className={s.glyphFacts}>
          <div>
            <dt>Code point</dt>
            <dd><CopyValue value={codeOf(cur.g)} label={`code point of ${cur.g}`} /></dd>
          </div>
          <div>
            <dt>Class</dt>
            <dd>{cur.k}</dd>
          </div>
          <div>
            <dt>Glyph</dt>
            <dd><CopyValue value={cur.g} label={`the glyph ${cur.g}`} /></dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

// The same set as one exportable sheet: ruled cells, a node at every crossing.
export function CharsetArt() {
  const cell = 100;
  const rows = Math.ceil(GLYPHS.length / GLYPH_COLS);
  const W = cell * GLYPH_COLS;
  const H = cell * rows;
  const nodes = Array.from({ length: (GLYPH_COLS + 1) * (rows + 1) }, (_, k) => [(k % (GLYPH_COLS + 1)) * cell, Math.floor(k / (GLYPH_COLS + 1)) * cell]);
  return (
    <Art viewBox={`-10 -10 ${W + 20} ${H + 20}`} title="Character set: capitals, lower case, figures, Spanish accents and the brand's signs" exportName="typography-charset">
      <rect x="-10" y="-10" width={W + 20} height={H + 20} fill={HEX.periwinkle} />
      <path d={Array.from({ length: rows + 1 }, (_, r) => `M0 ${r * cell}H${W}`).join('') + Array.from({ length: GLYPH_COLS + 1 }, (_, c) => `M${c * cell} 0V${H}`).join('')} stroke={HEX.darkBlue} strokeWidth="1" fill="none" className="draw" style={{ '--len': 14000 }} />
      {nodes.map(([x, y]) => (
        <NodeG key={`${x}-${y}`} cx={x} cy={y} s={6} fill={HEX.darkBlue} className="snap" style={{ '--i': (x + y) / 100 }} />
      ))}
      {GLYPHS.map((x, i) => (
        <text key={`${x.g}-${i}`} x={r2((i % GLYPH_COLS) * cell + cell / 2)} y={r2(Math.floor(i / GLYPH_COLS) * cell + cell * 0.66)} fontSize="52" textAnchor="middle" fill={HEX.darkBlue} className="fade-in" style={{ '--i': (i % GLYPH_COLS) + Math.floor(i / GLYPH_COLS) + 6 }} lang="es">
          {x.g}
        </text>
      ))}
    </Art>
  );
}
