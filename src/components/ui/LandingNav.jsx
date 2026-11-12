import Link from 'next/link';
import Icon from '@/components/site/Icon';
import { NAV, NAV_CTA } from '@/lib/brand';

// The website nav of the case study (m16), rebuilt: one row of ruled cells. The mark in the first cell, an empty
// cell, "Servicios" | "Clientes" | "Nosotros" each centred in its own cell, an empty cell, and the full-height Dark
// Blue "Únete" cell with a white crosshair. A node sits on the bottom rule under the cell borders.
// The case study's words are kept; each one opens one of the landing pages.
// <LandingNav current="lp-field" />   tone: "light" (default, as m16) | "dark"
export const NAV_TARGETS = { Servicios: 'lp-field', Clientes: 'lp-data-centers', Nosotros: 'lp-annual-report' };
export const CTA_TARGET = 'lp-storage';

export default function LandingNav({ current, tone = 'light', className = '' }) {
  return (
    <nav className={`lp-nav ${tone === 'dark' ? 'lp-nav-dark' : ''} ${className}`} aria-label="Best Grid">
      <Link href="/lp-home/" className="lp-brand" aria-label="Best Grid home" aria-current={current === 'lp-home' ? 'page' : undefined}>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <use href="#site-mark" />
        </svg>
      </Link>
      <div className="lp-links" lang="es">
        {NAV.map((label) => {
          const id = NAV_TARGETS[label];
          return (
            <Link key={label} href={`/${id}/`} aria-current={current === id ? 'page' : undefined}>
              {label}
            </Link>
          );
        })}
      </div>
      <div className="lp-actions" lang="es">
        <Link href={`/${CTA_TARGET}/`} className="lp-cta" aria-current={current === CTA_TARGET ? 'page' : undefined}>
          {NAV_CTA}
          <Icon name="crosshair" size={20} />
        </Link>
      </div>
    </nav>
  );
}
