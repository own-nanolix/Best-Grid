// The two wide pieces of the case study as flat artwork: the billboard panel (m19) and the event screen (m22).
// Their photographs become the sunset field with light trails and two stand-in fields.
import { HEX, LINES, CONTACT } from '@/lib/brand';
import { MarkG } from '@/components/art/Mark';
import { BrandDefs, TrailsG, LatticeFieldG, LatticeDefs, PhotoBlockG } from '@/components/art/KeyArt';
import { Lines, HL, VL, Nd, Word, In } from './kit';

export const BILL = { w: 1600, h: 510 };
export const SCREEN = { w: 1524, h: 275 };

// m19: Active Blue panel, two-tone line, huge word-mark, address, and a square field at the right.
export function Billboard() {
  const d = HEX.darkBlue, l = HEX.onBlue, id = 'campaign-bill';
  return (
    <g>
      <BrandDefs idp={id} />
      <rect width={BILL.w} height={BILL.h} fill={HEX.activeBlue} />
      <VL x={492} y2={BILL.h} c={l} w={1} o={0.5} />
      <VL x={1085} y2={BILL.h} c={l} w={1} o={0.5} i={1} />
      <HL y={327} x2={1060} c={l} w={1} o={0.55} i={2} />
      <Nd x={1060} y={327} c={l} s={7} i={3} />
      <In i={5}>
        <Lines rows={LINES.box.rows} x={28} y={63} size={29.5} lh={1.26} fills={[l, d, d]} />
        <MarkG x={958} y={43} size={58} fill={l} />
        <Lines rows={LINES.billboard.rows} x={32} y={276} size={16} lh={1.4} fill="#ffffff" display={false} />
        <text x="1015" y="276" fontSize="16" fill={l} textAnchor="end">{CONTACT.handle}</text>
        <text x="1015" y="298" fontSize="16" fill={d} textAnchor="end">{CONTACT.web}</text>
        <Lines rows={CONTACT.address} x={895} y={456} size={11} lh={1.2} fill={d} display={false} />
      </In>
      <Word x={28} y={480} size={151} fill={l} i={6} />
      <g className="fade-in" style={{ '--i': 8 }}>
        <rect x="1114" y="28" width="458" height="452" fill={`url(#${id}-sunset)`} />
        <TrailsG w={458} h={452} count={8} transform="translate(1114 28)" />
      </g>
    </g>
  );
}

// m22: the long LED wall, three panels: field, the two-tone pair with the word-mark, field.
export function EventScreen() {
  const d = HEX.darkBlue, l = HEX.onBlue, id = 'campaign-screen';
  return (
    <g>
      <LatticeDefs idp={id} p={36} fill={l} diagonals={false} />
      <rect width={SCREEN.w} height={SCREEN.h} fill={HEX.activeBlue} />
      <VL x={511} y2={SCREEN.h} c={l} w={1} o={0.5} />
      <VL x={1027} y2={SCREEN.h} c={l} w={1} o={0.5} i={1} />
      <HL y={203} x1={511} x2={1027} c={l} w={1} o={0.6} i={2} />
      <Nd x={511} y={203} c={l} s={6} i={3} />
      <Nd x={1027} y={203} c={l} s={6} i={4} />
      <g className="fade-in" style={{ '--i': 5 }}>
        <PhotoBlockG x={18} y={18} w={475} h={239} />
        <LatticeFieldG cx={255} cy={138} k={1.5} rings={6} fill={l} opacity="0.45" />
        <PhotoBlockG x={1046} y={18} w={460} h={239} />
        <rect x="1046" y="18" width="460" height="239" fill={`url(#${id}-lattice)`} opacity="0.3" />
      </g>
      <In i={7}>
        <Lines rows={LINES.connect.rows} x={529} y={33} size={20} lh={1.35} fills={[l, d]} />
        <MarkG x={977} y={17} size={33} fill={l} />
        <Lines rows={LINES.viable.rows} x={529} y={170} size={11} lh={1.4} fills={[l, d]} display={false} />
        <text x="1009" y="170" fontSize="11" fill={l} textAnchor="end">{CONTACT.handle}</text>
        <text x="1009" y="184" fontSize="11" fill={d} textAnchor="end">{CONTACT.web}</text>
      </In>
      <Word x={529} y={255} size={48} fill={l} i={8} />
    </g>
  );
}
