'use client';

import { useState } from 'react';
import Chip from '@/components/ui/Chip';
import { PixelIcon } from '@/components/site/Icon';
import { CAPACITY, TECH, LINES } from '@/lib/brand';
import s from './web-system.module.css';

// Tags as the case study prints them: the year chips of m17 (2025 active; 2023 and 2024 have no figures), the
// technology labels of m16, and the middle-dot words of m11.
export default function Tags() {
  const [year, setYear] = useState(CAPACITY.year);
  const [tech, setTech] = useState('solar');
  return (
    <div className={s.tagRows}>
      <div className={s.tagLine}>
        <span className={s.tagCap}>Year chips, static</span>
        {CAPACITY.years.map((y) => (
          <Chip key={y} tone={y === CAPACITY.year ? 'active' : undefined}>{y}</Chip>
        ))}
      </div>
      <div className={s.tagLine}>
        <span className={s.tagCap}>Year chips, pressed</span>
        {CAPACITY.years.map((y) => (
          <Chip key={y} pressed={year === y} onClick={() => setYear(y)}>{y}</Chip>
        ))}
        <Chip size="sm" tone="dark">{year}</Chip>
        <Chip size="sm" tone="line">{year}</Chip>
      </div>
      <div className={s.tagLine} lang="es">
        <span className={s.tagCap} lang="en">Technology labels</span>
        {TECH.map((t) => (
          <button
            key={t.key}
            type="button"
            className={s.techTag}
            aria-pressed={tech === t.key}
            onClick={() => setTech(t.key)}
            style={tech === t.key ? { background: 'var(--stat-cell)' } : undefined}
          >
            <PixelIcon name={t.icon} size={18} />
            {t.label}
          </button>
        ))}
      </div>
      <div className={s.tagLine} lang="es">
        <span className={s.tagCap} lang="en">Word tags</span>
        {LINES.fieldWords.map((w) => (
          <Chip key={w} size="sm" tone="line">{w}</Chip>
        ))}
      </div>
    </div>
  );
}
