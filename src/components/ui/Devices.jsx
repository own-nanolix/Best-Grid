// Live device frames: an HTML screen (so the UI inside works, scrolls and is accessible) inside a NEUTRAL frame
// drawn as SVG: no maker's features (no pill-shaped camera island, no window buttons of a known system, no logos).
// Give `screen` a name: the screen root gets data-screen="<name>" (the artboard for later export).
// Pass exportName="<page id>-<name>" to make the frame itself an exportable SVG.
//   <Phone screen="mobile-a-home">…screen content…</Phone>
// Screen sizes to design for: phone 390 x 844, tablet 1180 x 820, laptop 1440 x 900, monitor 1600 x 1000,
// window 1600 x 1000 (below its 60 px bar), watch 184 x 224. Scale a fixed artboard with the .artboard class.
// For devices inside mockup scenes use the SVG groups in components/art/Devices instead.

import { MarkG } from '@/components/art/Mark';

const METAL = '#2a2f4d';   // anodised Dark Blue metal (the phones of m17 have dark blue-grey frames)
const BEZEL = '#0b0d18';

function Frame({ kind, viewBox, title, exportName, screen, screenStyle, className = '', style, children, art }) {
  return (
    <div className={`device device-${kind} ${className}`} style={style}>
      <div className="device-screen" data-screen={screen} style={screenStyle}>
        {children}
      </div>
      <svg className="device-frame" viewBox={viewBox} data-export={exportName} aria-hidden="true">
        <title>{title}</title>
        {art}
      </svg>
    </div>
  );
}

export function Phone({ children, exportName, screen, className, style, screenStyle }) {
  return (
    <Frame kind="phone" viewBox="-4 0 438 884" title="Phone frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <rect x="-3" y="170" width="6" height="60" rx="2" fill={METAL} />
          <rect x="427" y="200" width="6" height="92" rx="2" fill={METAL} />
          <path fillRule="evenodd" fill={METAL} d="M66 0h298a66 66 0 0 1 66 66v752a66 66 0 0 1-66 66H66a66 66 0 0 1-66-66V66A66 66 0 0 1 66 0ZM68 20a48 48 0 0 0-48 48v748a48 48 0 0 0 48 48h294a48 48 0 0 0 48-48V68a48 48 0 0 0-48-48Z" />
          <path fillRule="evenodd" fill={BEZEL} d="M66 5h298a61 61 0 0 1 61 61v752a61 61 0 0 1-61 61H66a61 61 0 0 1-61-61V66A61 61 0 0 1 66 5ZM68 20a48 48 0 0 0-48 48v748a48 48 0 0 0 48 48h294a48 48 0 0 0 48-48V68a48 48 0 0 0-48-48Z" />
          <circle cx="215" cy="46" r="9" fill={BEZEL} />
          <circle cx="215" cy="46" r="4" fill="#1d2140" />
        </>
      }
    >
      {children}
    </Frame>
  );
}

export function Tablet({ children, exportName, screen, className, style, screenStyle }) {
  return (
    <Frame kind="tablet" viewBox="0 0 1260 900" title="Tablet frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <path fillRule="evenodd" fill={BEZEL} d="M46 0h1168a46 46 0 0 1 46 46v808a46 46 0 0 1-46 46H46a46 46 0 0 1-46-46V46A46 46 0 0 1 46 0ZM54 40a14 14 0 0 0-14 14v792a14 14 0 0 0 14 14h1152a14 14 0 0 0 14-14V54a14 14 0 0 0-14-14Z" />
          <path fill="none" stroke={METAL} strokeWidth="4" d="M46 2h1168a44 44 0 0 1 44 44v808a44 44 0 0 1-44 44H46a44 44 0 0 1-44-44V46A44 44 0 0 1 46 2Z" />
          <circle cx="630" cy="20" r="5" fill="#1d2140" />
        </>
      }
    >
      {children}
    </Frame>
  );
}

export function Laptop({ children, exportName, screen, className, style, screenStyle }) {
  return (
    <Frame kind="laptop" viewBox="0 0 1840 1016" title="Laptop frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <path fillRule="evenodd" fill={BEZEL} d="M200 0h1440a30 30 0 0 1 30 30v930H170V30a30 30 0 0 1 30-30ZM200 30v900h1440V30Z" />
          <path d="M0 960h1840v26a30 30 0 0 1-30 30H30a30 30 0 0 1-30-30z" fill={METAL} />
          <path d="M0 960h1840v8H0z" fill="#4a5178" />
          <path d="M800 960h240v10a10 10 0 0 1-10 10H810a10 10 0 0 1-10-10z" fill="#1d2140" />
        </>
      }
    >
      {children}
    </Frame>
  );
}

export function Monitor({ children, exportName, screen, className, style, screenStyle }) {
  return (
    <Frame kind="monitor" viewBox="0 0 1640 1340" title="Monitor frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <path d="M760 1040h120v230H760z" fill={METAL} />
          <path d="M760 1040h120v50H760z" fill="#000000" opacity="0.35" />
          <path d="M560 1270h520v18H560z" fill={METAL} />
          <path d="M560 1288h520v12H560z" fill="#14172b" />
          <path fillRule="evenodd" fill={BEZEL} d="M0 0h1640v1040H0ZM20 20v1000h1600V20Z" />
        </>
      }
    >
      {children}
    </Frame>
  );
}

// A neutral application window (stands in for the browser of m16): a bar with one tab carrying the mark and the
// tab label, and a plain address field. No system buttons.  <Window tab="Best grid solutions" address="Bestgridsolutions.com">
export function Window({ children, exportName, screen, className, style, screenStyle, tab, address }) {
  return (
    <Frame kind="window" viewBox="0 0 1600 1060" title="Window frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <rect width="1600" height="60" fill="#d9dce4" />
          <path d="M40 60V16a6 6 0 0 1 6-6h300a6 6 0 0 1 6 6v44z" fill="#f4f5f8" />
          <rect x="370" y="18" width="1200" height="30" rx="15" fill="#f4f5f8" />
          <path d="M0 60H1600" stroke="#c3c7d2" strokeWidth="1" />
          {tab && <text x="86" y="40" fontSize="15" fill="#1b2043">{tab}</text>}
          {address && <text x="396" y="38" fontSize="14" fill="#4b5174">{address}</text>}
          <MarkG x={56} y={25} size={20} fill="#1b2043" />
        </>
      }
    >
      {children}
    </Frame>
  );
}

export function Watch({ children, exportName, screen, className, style, screenStyle, band = '#5983ff' }) {
  return (
    <Frame kind="watch" viewBox="0 0 248 490" title="Watch frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <path d="M50 0h140l10 110H40z" fill={band} />
          <path d="M40 380h160l-10 110H50z" fill={band} />
          <rect x="236" y="196" width="12" height="40" rx="3" fill={METAL} />
          <path fillRule="evenodd" fill={METAL} d="M70 100h100a70 70 0 0 1 70 70v150a70 70 0 0 1-70 70H70a70 70 0 0 1-70-70V170a70 70 0 0 1 70-70ZM72 133a44 44 0 0 0-44 44v136a44 44 0 0 0 44 44h96a44 44 0 0 0 44-44V177a44 44 0 0 0-44-44Z" />
          <path fillRule="evenodd" fill={BEZEL} d="M70 108h100a62 62 0 0 1 62 62v150a62 62 0 0 1-62 62H70a62 62 0 0 1-62-62V170a62 62 0 0 1 62-62ZM72 133a44 44 0 0 0-44 44v136a44 44 0 0 0 44 44h96a44 44 0 0 0 44-44V177a44 44 0 0 0-44-44Z" />
        </>
      }
    >
      {children}
    </Frame>
  );
}
