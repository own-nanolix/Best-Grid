import Link from 'next/link';
import { CONTACT, TECH, TUBE, LINES, REPORT, NAV } from '@/lib/brand';
import { WordmarkG, WORDMARK } from '@/components/art/Mark';
import { NAV_TARGETS } from './LandingNav';

// The landing footer. The case study shows no website footer; this grows the poster footer (m11: ruled cells,
// "bestgrid.com" | mark | "bestgrid.com") and the stationery's contact block (m05) into one, using only the case
// study's own words: the technology tiles, the services of the tube label, the contacts as printed, and the
// word-mark large in light grey as on the billboard and the event screen (m19, m22).
const TECH_PAGES = { solar: 'lp-solar', wind: 'lp-wind', storage: 'lp-storage', dc: 'lp-data-centers' };

export default function LandingFooter({ className = '' }) {
  const h = 100 * WORDMARK.cap;
  return (
    <footer className={`lp-footer ${className}`} lang="es">
      <div className="wrap">
        <div className="lp-footer-grid">
          <div>
            <svg viewBox="0 0 100 100" width="40" height="40" role="img" aria-label="Best Grid" style={{ color: 'var(--active-blue)' }}>
              <use href="#site-mark" />
            </svg>
            <p className="t-h3" style={{ marginTop: 22, maxWidth: '16em' }}>{LINES.card}</p>
          </div>
          <div>
            <p className="lp-foot-head">{NAV[0]}</p>
            <ul>
              {TUBE.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
              <li><Link href={`/${NAV_TARGETS.Servicios}/`}>{LINES.field}</Link></li>
            </ul>
          </div>
          <div>
            <p className="lp-foot-head">{NAV[1]}</p>
            <ul>
              {TECH.map((t) => (
                <li key={t.key}><Link href={`/${TECH_PAGES[t.key]}/`}>{t.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="lp-foot-head">{CONTACT.contactLabel}</p>
            <address>
              {CONTACT.address.map((r) => (
                <span key={r} style={{ display: 'block' }}>{r}</span>
              ))}
              <span style={{ display: 'block', marginTop: 10 }}>{CONTACT.phone}</span>
              <span style={{ display: 'block' }}>{CONTACT.email}</span>
            </address>
            <p style={{ marginTop: 10, fontSize: 14 }}>
              <Link href={`/${NAV_TARGETS.Nosotros}/`}>{REPORT.name}</Link>
            </p>
          </div>
        </div>
        <span className="lp-footer-word" aria-hidden="true">
          <svg viewBox={`0 0 ${Math.round(100 * WORDMARK.width + 4)} ${Math.round(h + 4)}`} aria-hidden="true">
            <WordmarkG x={1} y={Math.round(h + 1)} size={100} fill="currentColor" />
          </svg>
        </span>
        <div className="lp-footer-base">
          <span>{CONTACT.handle}</span>
          <span>
            <svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true">
              <use href="#site-mark" />
            </svg>
          </span>
          <span>{CONTACT.web}</span>
        </div>
      </div>
    </footer>
  );
}
