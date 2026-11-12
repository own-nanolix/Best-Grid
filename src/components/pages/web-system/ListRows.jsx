'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import { PixelIcon } from '@/components/site/Icon';
import { TECH, TUBE, LINES } from '@/lib/brand';
import s from './web-system.module.css';

// Rows from the case study's own rows. The disclosure rows are the three services of the tube label (m07); each
// opens on one verbatim line of the case study. The data rows are the technology tiles of m16 (value as printed).
const OPEN_ON = [LINES.clarityBody.text, LINES.tube.text, LINES.posterRightBody.text];

export function DisclosureRows() {
  const [open, setOpen] = useState(0);
  return (
    <ul className={s.rows} lang="es">
      {TUBE.services.map((label, i) => {
        const on = open === i;
        return (
          <li key={label} className={s.rowItem}>
            <h3 style={{ margin: 0, fontWeight: 400 }}>
              <button
                type="button"
                className={s.rowBtn}
                aria-expanded={on}
                aria-controls={`web-system-row-panel-${i}`}
                id={`web-system-row-btn-${i}`}
                onClick={() => setOpen(on ? -1 : i)}
              >
                <span>{label}</span>
                <Icon name="chevron-down" size={24} />
              </button>
            </h3>
            <div className={s.rowPanel} data-open={on} id={`web-system-row-panel-${i}`} role="region" aria-labelledby={`web-system-row-btn-${i}`}>
              <div className={s.rowPanelIn} inert={!on}>
                <p>{OPEN_ON[i]}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function DataRows() {
  return (
    <ul className={s.rows} lang="es">
      {TECH.map((t) => (
        <li key={t.key} className={`${s.dataRow} ${t.highlight ? s.hl : ''}`}>
          <PixelIcon name={t.icon} size={32} />
          <span>{t.label}</span>
          <span className={s.dataVal}>{t.value}</span>
        </li>
      ))}
    </ul>
  );
}
