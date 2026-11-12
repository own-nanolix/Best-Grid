'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/site/Icon';
import Art from '@/components/art/Art';
import { GuidesG, CrossingBandsG } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { HEX, NAV, NAV_CTA, TECH, TUBE, LINES, REPORT } from '@/lib/brand';
import s from './web-system.module.css';

// The open mega menu on Dark Blue. Entries are the case study's own words (nav, the services of the tube label, the
// four technology tiles, the annual report title) and link to the site's landing pages. Escape closes it and
// returns focus to the trigger.
const TECH_PAGES = { solar: 'lp-solar', wind: 'lp-wind', storage: 'lp-storage', dc: 'lp-data-centers' };

export function MegaArt() {
  return (
    <Art viewBox="0 0 360 300" title="Mega menu artwork: crossing bands, guides and the mark" exportName="web-system-mega-art" className={s.megaArt} preserveAspectRatio="xMidYMid slice">
      <rect width={360} height={300} fill={HEX.darkBlue} />
      <GuidesG w={360} h={300} xs={[36, 324]} ys={[36, 264]} stroke={HEX.activeBlue} weight={1} node={6} animate />
      <CrossingBandsG idp="web-system-mega" w={360} h={300} cx={0.55} cy={0.5} band={0.045} r={0.12} />
      <MarkG x={236} y={172} size={64} fill={HEX.lightBlue} className="fade-in" />
    </Art>
  );
}

export default function MegaMenu() {
  const [open, setOpen] = useState(true);
  const trigger = useRef(null);
  const root = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (root.current && !root.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  const onKey = (e) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
    }
  };

  return (
    <div ref={root} onKeyDown={onKey} className={s.megaStage}>
      <div className={s.megaBar} lang="es">
        <button
          ref={trigger}
          type="button"
          className={s.megaTrigger}
          aria-expanded={open}
          aria-controls="web-system-mega-panel"
          onClick={() => setOpen(!open)}
        >
          {NAV[0]}
          <Icon name="chevron-down" size={20} />
        </button>
        <Link href="/lp-data-centers/" className={s.megaBarLink}>{NAV[1]}</Link>
        <Link href="/lp-annual-report/" className={s.megaBarLink}>{NAV[2]}</Link>
        <Link href="/lp-storage/" className={s.megaBarLink} style={{ marginLeft: 'auto' }}>{NAV_CTA}</Link>
      </div>
      <div id="web-system-mega-panel" className={s.megaPanel} hidden={!open} lang="es">
        <div className={s.megaCol}>
          <p className={s.megaHead}>{NAV[0]}</p>
          <ul className={s.megaList}>
            {TUBE.services.map((t) => (
              <li key={t}><Link href="/lp-field/">{t}</Link></li>
            ))}
            <li><Link href="/lp-field/">{LINES.field}</Link></li>
          </ul>
        </div>
        <div className={s.megaCol}>
          <p className={s.megaHead}>{NAV[1]}</p>
          <ul className={s.megaList}>
            {TECH.map((t) => (
              <li key={t.key}><Link href={`/${TECH_PAGES[t.key]}/`}>{t.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className={s.megaCol}>
          <p className={s.megaHead}>{NAV[2]}</p>
          <ul className={s.megaList}>
            <li><Link href="/lp-annual-report/">{REPORT.titleRows.join(' ')}</Link></li>
            <li><Link href="/lp-home/">{LINES.web.text}</Link></li>
          </ul>
        </div>
        <div className={`${s.megaCol} ${s.megaArtCell}`}>
          <MegaArt />
        </div>
      </div>
      <p className={s.note} style={{ padding: '0 clamp(14px, 2vw, 28px) 16px', margin: 0, paddingTop: 12 }} lang="en">
        Press Escape to close; focus returns to the trigger.
      </p>
    </div>
  );
}
