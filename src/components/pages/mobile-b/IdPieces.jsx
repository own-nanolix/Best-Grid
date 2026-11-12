// The staff badge card (m08) and the business card front (m05) as drawn for screen 18, laid out from measurements of
// reference/m08_1.png, m08_2.png and crop_m05_card.png (positions in % of the card, here in each card's own units).
// Names and roles exactly as printed. Small type is the accessible blue ink (printed Active Blue).
import { HEX, PEOPLE, CONTACT } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';
import { MarkG, WordmarkG } from '@/components/art/Mark';

const INK = HEX.blueInk;

// Badge card, 785 x 1435 (the card inside the holder).
function Barcode({ x, y, w, h }) {
  const rnd = seeded(7);
  const bars = [];
  for (let px = 0; px < w;) {
    const bw = 6 + Math.floor(rnd() * 3) * 7;
    if (px + bw > w) break;
    bars.push({ px, bw });
    px += bw + 12 + Math.floor(rnd() * 2) * 9;
  }
  return bars.map((b) => <rect key={b.px} x={r2(x + b.px)} y={y} width={b.bw} height={h} fill={INK} />);
}

export function BadgeCard({ width = 250 }) {
  const e = PEOPLE.elena;
  return (
    <svg viewBox="0 0 785 1435" width={width} height={r2((width * 1435) / 785)} role="img" lang="es"
      aria-label={`${e.name}, ${e.role}, ${e.dept}, ${e.id}, ${CONTACT.webAlt}`} style={{ display: 'block', margin: '0 auto' }}>
      <rect width="785" height="1435" style={{ fill: 'var(--card-grey)' }} />
      <rect x="225.5" y="0" width="1.5" height="1040" fill={INK} />
      <rect x="0" y="1039" width="785" height="1.5" fill={INK} />
      <rect x="217" y="1031" width="18" height="18" fill={INK} />
      <WordmarkG x={37} y={163} size={41} fill={INK} />
      <text x="273" y="400" fontSize="75" fill={INK}>{e.name}</text>
      <text fontSize="48" fill={INK}>
        {e.roleRows.map((r, i) => <tspan key={r} x="273" y={490 + i * 55}>{r}</tspan>)}
      </text>
      <text x="273" y="620" fontSize="30" fill={INK}>{e.dept}</text>
      <text x="40" y="935" fontSize="130" fill={HEX.white} opacity="0.75" className="display" aria-hidden="true">{e.numeral}</text>
      <text x="277" y="930" fontSize="37" fill={INK}>{e.id}</text>
      <Barcode x={167} y={1150} w={474} h={115} />
      <text x="405" y="1315" fontSize="30" fill={INK} textAnchor="middle">{CONTACT.webAlt}</text>
    </svg>
  );
}

// Business card front, 1600 x 1018 (85 x 55 mm).
export function CardFront({ width = 318 }) {
  const l = PEOPLE.lorena;
  return (
    <svg viewBox="0 0 1600 1018" width={width} height={r2((width * 1018) / 1600)} role="img" lang="es"
      aria-label={`${l.name}, ${l.role}, ${CONTACT.phone}, ${l.email}, ${CONTACT.address.join(' ')}, ${CONTACT.web}`} style={{ display: 'block', margin: '0 auto' }}>
      <rect width="1600" height="1018" fill={HEX.paper} />
      <text fontSize="72" fill={INK}>
        {l.nameRows.map((r, i) => <tspan key={r} x="92" y={130 + i * 90}>{r}</tspan>)}
      </text>
      <text x="1528" y="220" fontSize="72" fill={INK} textAnchor="end">{CONTACT.phone}</text>
      <rect x="0" y="292" width="1600" height="3" fill={INK} />
      <rect x="436" y="292" width="3" height="726" fill={INK} />
      <rect x="427" y="283" width="21" height="21" fill={INK} />
      <text fontSize="72" fill={INK}>
        {l.roleRows.map((r, i) => <tspan key={r} x="494" y={413 + i * 90}>{r}</tspan>)}
      </text>
      <text x="494" y="578" fontSize="28" fill={INK}>{l.email}</text>
      <text fontSize="28" fill={INK}>
        {CONTACT.address.map((r, i) => <tspan key={r} x="494" y={875 + i * 37}>{r}</tspan>)}
      </text>
      <text x="1528" y="949" fontSize="28" fill={INK} textAnchor="end">{CONTACT.web}</text>
      <MarkG x={95} y={780} size={167} fill={HEX.darkBlue} opacity="0.08" />
    </svg>
  );
}
