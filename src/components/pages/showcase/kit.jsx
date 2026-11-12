// Shared parts of the four showcase plates: leader lines to floating cards, the cards themselves (printed content
// of the m17 phone), a small treemap, two extra phone screens in the brand's language, a shelf and the card shadow.
// Everything returns SVG groups; each plate wraps its own <Art>.
import { r2 } from '@/lib/charts';
import { HEX, CAPACITY, TECH, CONTACT } from '@/lib/brand';
import { PIXEL32 } from '@/components/site/icons';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { PLATE } from '@/components/art/Mockup';

// The status glyphs of a phone screen without a clock time (owner's rule: no clock times on showcase phones):
// signal bars, a fan of arcs and a battery, in the 390-wide screen space.
export function StatusGlyphsG({ w = 390, fill = HEX.darkBlue }) {
  return (
    <g fill={fill}>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={w - 108 + i * 6} y={r2(30 - i * 3)} width="4" height={r2(5 + i * 3)} />
      ))}
      <path d={`M${w - 76} 27a10 10 0 0 1 16 0l-2 2a7 7 0 0 0-12 0Z M${w - 72} 30.5a5 5 0 0 1 8 0l-4 4Z`} />
      <rect x={w - 52} y="22" width="22" height="11" rx="2.5" />
    </g>
  );
}

// A leader line from a node on the object (x, y) to the edge of a floating card (tx, ty): one elbow, drawn on.
export function Leader({ x, y, tx, ty, i = 0, color = PLATE.line }) {
  const ex = tx + (x < tx ? -26 : 26);
  const d = `M${r2(x)} ${r2(y)}L${r2(ex)} ${r2(ty)}L${r2(tx)} ${r2(ty)}`;
  const len = Math.round(Math.hypot(ex - x, ty - y) + 26);
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth="1" className="callout-line" style={{ '--len': len, '--i': i }} />
      <rect x={r2(x - 4)} y={r2(y - 4)} width="8" height="8" fill={PLATE.accent} className="callout-node" style={{ '--i': i }} />
      <rect x={r2(tx - 3)} y={r2(ty - 3)} width="6" height="6" fill={color} className="callout-node" style={{ '--i': i }} />
    </g>
  );
}

// The shadow filter of floating cards: it falls away from the light (dx, dy).
export function CardDefs({ idp, dx = 8, dy = 12 }) {
  return (
    <filter id={`${idp}-card-shadow`} x="-20%" y="-20%" width="150%" height="160%">
      <feDropShadow dx={dx} dy={dy} stdDeviation="9" floodColor={HEX.black} floodOpacity="0.55" />
    </filter>
  );
}

// A floating card: paper with a hairline, a drop shadow and a lit top edge.
export function CardG({ idp, x, y, w, h, fill = HEX.cardGrey, children, i = 0 }) {
  return (
    <g className="slide-up" style={{ '--i': i, animationDelay: `${600 + i * 120}ms` }}>
      <rect x={x} y={y} width={w} height={h} fill={fill} filter={`url(#${idp}-card-shadow)`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-paper)`} opacity="0.55" />
      <rect x={x} y={y} width={w} height="2" fill={HEX.white} opacity="0.7" />
      <g transform={`translate(${x} ${y})`}>{children}</g>
    </g>
  );
}

// The two-tier treemap of m17 in its own 317 x 318 space: Desarrollo durante el año 68%, Capacidad consolidada 16%,
// the Dark Blue remainder unlabelled.
export function TreemapG() {
  const P = CAPACITY.treemap.parts;
  return (
    <g lang="es">
      <rect width="317" height="318" fill={HEX.darkBlue} />
      <text x="10" y="20" fontSize="13" fill={HEX.white}>{CAPACITY.treemap.year}</text>
      <text x="10" y="36" fontSize="13" fill={HEX.white}>{CAPACITY.treemap.title}</text>
      <rect x="0" y="105" width="210" height="213" fill={HEX.activeBlue} />
      <text x="10" y="124" fontSize="13" fill={HEX.white}>{P[0].labelRows[0]}</text>
      <text x="10" y="140" fontSize="13" fill={HEX.white}>{P[0].labelRows[1]}</text>
      <text x="190" y="307" fontSize="78" fill={HEX.onBlue} textAnchor="end" letterSpacing="-2" className="display">68</text>
      <text x="191" y="260" fontSize="30" fill={HEX.onBlue}>%</text>
      <rect x="210" y="213" width="107" height="105" fill={HEX.activeBlue} />
      <rect x="210" y="213" width="107" height="105" fill={HEX.white} opacity="0.2" />
      <text x="218" y="232" fontSize="13" fill={HEX.white}>{P[1].labelRows[0]}</text>
      <text x="218" y="248" fontSize="13" fill={HEX.white}>{P[1].labelRows[1]}</text>
      <text x="298" y="307" fontSize="33" fill={HEX.onBlue} textAnchor="end" letterSpacing="-0.8" className="display">16</text>
      <text x="299" y="287" fontSize="13" fill={HEX.onBlue}>%</text>
    </g>
  );
}

// A phone screen in the language of the website tiles (m16): Dark Blue ground, one pixel icon, the label and the
// printed capacity of one technology. 390 x 844.
export function ScreenTechG({ tech }) {
  const t = TECH.find((x) => x.key === tech);
  return (
    <g lang="es">
      <rect width="390" height="844" fill={HEX.darkBlue} />
      <StatusGlyphsG fill={HEX.lightBlue} />
      <g transform="translate(55 190) scale(8.5)">
        <path d={PIXEL32[t.icon]} fill={HEX.activeBlue} />
      </g>
      <rect x="0" y="540" width="390" height="1" fill={HEX.activeBlue} opacity="0.6" />
      <rect x="32" y="536" width="8" height="8" fill={HEX.activeBlue} />
      <rect x="350" y="536" width="8" height="8" fill={HEX.activeBlue} />
      <text x="36" y="600" fontSize="22" fill={HEX.lightBlue}>{t.label}</text>
      <text x="34" y="688" fontSize="68" fill={HEX.activeBlue} letterSpacing="-2" className="display">{t.value.replace(' MW', '')}</text>
      <text x="36" y="728" fontSize="22" fill={HEX.lightBlue}>MW</text>
    </g>
  );
}

// A closing phone screen: the mark, the word-mark and the web address, all as printed.
export function ScreenBrandG() {
  return (
    <g>
      <rect width="390" height="844" fill={HEX.activeBlue} />
      <StatusGlyphsG />
      <MarkG x={95} y={250} size={200} fill={HEX.darkBlue} />
      <WordmarkG x={195} y={560} size={64} fill={HEX.onBlue} anchor="middle" />
      <text x="195" y="760" fontSize="20" fill={HEX.darkBlue} textAnchor="middle">{CONTACT.web}</text>
    </g>
  );
}

// A shelf: a long slab the phones stand on (top face lit, front face in shade).
export function ShelfG({ idp, x, y, w, depth = 22, h = 14 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-metal-dark)`} />
      <rect x={x} y={y} width={w} height="2" fill={HEX.white} opacity="0.35" />
      <path d={`M${x} ${y}L${x + 18} ${y - depth * 0.25}H${x + w - 18}L${x + w} ${y}Z`} fill={HEX.white} opacity="0.09" />
      <rect x={x} y={y + h - 3} width={w} height="3" fill={HEX.black} opacity="0.4" />
    </g>
  );
}
