import { MarkG } from '@/components/art/Mark';
import { HEX, TUBE, CONTACT } from '@/lib/brand';

// The grey project label of the case study's tube (m07), rebuilt flat in a 300 x 315 frame. Every printed line is
// set bottom to top as printed, in Spanish, except the client line, which reads "Client name" (the printed
// client is another company). A vertical rule at 74% closes a right cell: the mark at the top, a rule with a node,
// the web address. Ink is the deepened Active Blue (small print on a light ground).
export const LABEL = { w: 300, h: 315 };

function Up({ x, size, y = 292, children, italic, weight, ...rest }) {
  return (
    <text transform={`translate(${x} ${y}) rotate(-90)`} fontSize={size} fontStyle={italic ? 'italic' : undefined} fontWeight={weight} fill={HEX.blueInk} {...rest}>
      {children}
    </text>
  );
}

export default function TubeLabelG() {
  return (
    <g>
      <rect width={LABEL.w} height={LABEL.h} fill={HEX.labelGrey} />
      <rect x="222" y="0" width="1" height={LABEL.h} fill={HEX.blueInk} opacity="0.75" />
      <rect x="222" y="118" width="78" height="1" fill={HEX.blueInk} opacity="0.75" />
      <rect x="219" y="115" width="6" height="6" fill={HEX.blueInk} />
      <MarkG x={241} y={28} size={44} fill={HEX.blueInk} />
      <g lang="es">
        <Up x="35" size="12" italic>{TUBE.project}</Up>
        <Up x="57" size="19" lang="en">{TUBE.client}</Up>
        {TUBE.services.map((s, i) => (
          <Up key={s} x={92 + i * 13} size="9.6">{s}</Up>
        ))}
        {TUBE.lineRows.map((s, i) => (
          <Up key={s} x={132 + i * 13} size="9.6">{s}</Up>
        ))}
        <Up x="212" size="23">{TUBE.date}</Up>
        <Up x="266" size="13">{CONTACT.web}</Up>
      </g>
    </g>
  );
}
