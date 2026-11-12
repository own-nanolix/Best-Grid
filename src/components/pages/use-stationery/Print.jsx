// The printed pieces of the case study, rebuilt flat (m05, m06): letterhead, DL envelope, business cards, the
// folder, the mailer and its card. Each returns an SVG group in the paper's own units, so the same artwork is
// exported flat and placed on the plates. Measured from reference/m05_1.png and m06_1.png.
import { r2 } from '@/lib/charts';
import { HEX, CONTACT, PEOPLE, LINES } from '@/lib/brand';
import { MarkG, MarkEmbossG, WordmarkFitG } from '@/components/art/Mark';
import { CrossingBandsG } from '@/components/art/KeyArt';
import { Rows, Sheet } from './kit';

const D = HEX.darkBlue, A = HEX.activeBlue, L = HEX.onBlue;

// Letterhead, A4 at 595 x 842. The vertical hairline sits at 27.4% of the width, the horizontal one at 91.4% of
// the height with a Dark Blue node at the crossing; no body text.
export const LETTER = { w: 595, h: 842 };
export function LetterheadG({ fill, filter }) {
  const { w, h } = LETTER, vx = 163, hy = 770;
  return (
    <g lang="es">
      <Sheet w={w} h={h} fill={fill} filter={filter} />
      <rect x={vx - 0.4} y="0" width="0.8" height={hy} fill={D} />
      <rect x="0" y={hy - 0.4} width={w} height="0.8" fill={D} />
      <rect x={vx - 3} y={hy - 3} width="6" height="6" fill={D} />
      <WordmarkFitG x={27} y={42} w={79} fill={D} />
      <Rows rows={CONTACT.address} x={27} y={297} size={6.6} lh={1.45} fill={D} />
      <Rows rows={[CONTACT.phone, CONTACT.email]} x={27} y={731} size={6.6} lh={1.45} fill={D} />
      <text x="27" y="808" fontSize="6.6" fill={D}>{CONTACT.web}</text>
      <MarkG x={540} y={791} size={27} fill={D} />
    </g>
  );
}

// DL envelope, flap up, 660 x 330 (220 x 110 mm). Printed lines as on m05, with the e-mail in its correct form.
export const ENVELOPE = { w: 660, h: 330 };
export function EnvelopeG({ fill, filter }) {
  const { w, h } = ENVELOPE;
  const t = LINES.envelope.rows;
  return (
    <g lang="es">
      <Sheet w={w} h={h} fill={fill || A} filter={filter} />
      <path d={`M0 0H${w}L${w - 10} 148H0Z`} fill={HEX.white} opacity="0.08" />
      <path d={`M0 148H${w - 10}`} stroke={D} strokeWidth="1" opacity="0.22" />
      <WordmarkFitG x={634} y={72} w={225} anchor="end" fill={L} />
      <rect x="461.5" y="148" width="1" height="104" fill={HEX.white} opacity="0.5" />
      <rect x="0" y="251.5" width={w} height="1" fill={HEX.white} opacity="0.5" />
      <rect x="459" y="249" width="6" height="6" fill={HEX.white} />
      <text x="29" y="198" fontSize="12.5" fill={L}>{t[0]}</text>
      <Rows rows={[t[1], t[2]]} x={29} y={213} size={12.5} lh={1.2} fill={D} />
      <text x="491" y="232" fontSize="13" fill={L}>{CONTACT.web}</text>
      <MarkG x={31} y={266} size={42} fill={D} />
      <Rows rows={CONTACT.addressEnvelope} x={103} y={282} size={6.6} lh={1.5} fill={D} />
      <Rows rows={[CONTACT.contactLabel, CONTACT.phone, CONTACT.email]} x={491} y={282} size={6.6} lh={1.5} fill={D} />
    </g>
  );
}

// Business cards, 85 x 55 mm at 510 x 330. tone 'paper' is the printed front (m05, m06); 'active' is the same
// front in the second colour of the system.
export const CARD = { w: 510, h: 330 };
export function CardFrontG({ idp, tone = 'paper', fill, filter }) {
  const { w, h } = CARD, p = PEOPLE.lorena;
  const on = tone === 'paper';
  const ink = on ? A : D, ground = on ? HEX.paper : A;
  return (
    <g lang="es">
      <Sheet w={w} h={h} fill={fill || ground} filter={filter} />
      <rect x="0" y="91.5" width={w} height="1" fill={ink} opacity="0.7" />
      <rect x="131.5" y="92" width="1" height={h - 92} fill={ink} opacity="0.7" />
      <rect x="129" y="89.5" width="6" height="6" fill={ink} />
      <Rows rows={p.nameRows} x={18} y={34} size={25} lh={1.02} fill={ink} />
      <text x="492" y="60" fontSize="23" fill={ink} textAnchor="end">{CONTACT.phone}</text>
      <Rows rows={p.roleRows} x={150} y={130} size={24} lh={1.17} fill={ink} />
      <text x="150" y="185" fontSize="10" fill={ink}>{p.email}</text>
      <Rows rows={CONTACT.address} x={150} y={280} size={8.8} lh={1.35} fill={ink} />
      <text x="492" y="308" fontSize="10" fill={ink} textAnchor="end">{CONTACT.web}</text>
      <MarkEmbossG idp={`${idp}-emb`} x={18} y={252} size={58} paper={on ? HEX.paper : A} shade={D} />
    </g>
  );
}

export function CardBackG({ idp, fill, filter }) {
  const { w, h } = CARD;
  return (
    <g lang="es">
      <Sheet w={w} h={h} fill={fill || D} filter={filter} />
      <WordmarkFitG x={494} y={66} w={265} anchor="end" fill={HEX.white} />
      <text x="494" y="302" fontSize="10" fill={A} textAnchor="end">{LINES.card}</text>
      <MarkEmbossG idp={`${idp}-emb`} x={20} y={250} size={56} paper={D} light={HEX.mutedOnDark} shade={HEX.black} />
    </g>
  );
}

// The pocket folder of m05 (610 x 880): Dark Blue, the crossing bands, the word-mark top right, the mark bottom
// left in white.
export const FOLDER = { w: 610, h: 880 };
export function FolderG({ idp, fill, filter }) {
  const { w, h } = FOLDER;
  return (
    <g>
      <Sheet w={w} h={h} fill={fill || D} filter={filter} />
      <CrossingBandsG idp={`${idp}-fb`} w={w} h={h} />
      <WordmarkFitG x={572} y={67} w={237} anchor="end" fill={L} />
      <MarkG x={48} y={808} size={48} fill={L} />
    </g>
  );
}

// The card on the mailer (m05, 323 x 206): light grey, "Best Grid" in Active Blue top right, a vertical rule with a
// node, the Active Blue mark and the printed address lines.
export const MAILCARD = { w: 323, h: 206 };
export function MailerCardG({ fill }) {
  const { w, h } = MAILCARD;
  return (
    <g lang="es">
      <Sheet w={w} h={h} fill={fill || HEX.labelGrey} />
      <rect x="144.5" y="0" width="1" height="147" fill={A} opacity="0.8" />
      <rect x="0" y="146.5" width={w} height="1" fill={A} opacity="0.8" />
      <rect x="142" y="144" width="6" height="6" fill={A} />
      <WordmarkFitG x={305} y={58} w={141} anchor="end" fill={A} />
      <MarkG x={19} y={163} size={26} fill={A} />
      <Rows rows={CONTACT.addressEnvelope} x={55} y={170} size={4.4} lh={1.5} fill={A} />
      <Rows rows={[LINES.mailer, CONTACT.web]} x={306} y={175} size={4.4} lh={1.5} fill={A} anchor="end" />
    </g>
  );
}

// The dark navy metallic bubble mailer (414 x 690): board colour, a hexagon pattern with a soft highlight per cell.
export const MAILER = { w: 414, h: 690 };
export function MailerG({ idp }) {
  const { w, h } = MAILER, R = 40, pw = r2(R * Math.sqrt(3)), ph = R * 3;
  const hex = (cx, cy) => Array.from({ length: 6 }, (_, i) => {
    const a = ((30 + 60 * i) * Math.PI) / 180;
    return `${i ? 'L' : 'M'}${r2(cx + (R - 1.5) * Math.cos(a))} ${r2(cy + (R - 1.5) * Math.sin(a))}`;
  }).join('') + 'Z';
  return (
    <g>
      <radialGradient id={`${idp}-bub`} cx="0.34" cy="0.3" r="0.8">
        <stop offset="0" stopColor={HEX.activeBlue} stopOpacity="0.5" />
        <stop offset="0.35" stopColor={HEX.darkBlue} stopOpacity="0.2" />
        <stop offset="1" stopColor={HEX.black} stopOpacity="0.6" />
      </radialGradient>
      <pattern id={`${idp}-hex`} width={pw} height={ph} patternUnits="userSpaceOnUse">
        <path d={hex(pw / 2, R)} fill={`url(#${idp}-bub)`} />
        <path d={hex(0, R * 2.5)} fill={`url(#${idp}-bub)`} />
        <path d={hex(pw, R * 2.5)} fill={`url(#${idp}-bub)`} />
      </pattern>
      <rect width={w} height={h} fill={HEX.darkBlue} />
      <rect width={w} height={h} fill={`url(#${idp}-hex)`} />
    </g>
  );
}
