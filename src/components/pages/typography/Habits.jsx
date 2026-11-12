import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import { HEX, LINES, TUBE } from '@/lib/brand';
import { BRACKETS, DOTS } from './data';

// The brand's habits of setting, six ruled cells (exportable): short lines ending in a full stop, the two-tone
// line on Active Blue, square brackets, middle dots, the superscript % beside a numeral, and "Nº". Every example
// is printed in the case study.
const C = 440;
const R = 400;

function Cell({ i, children, fill, label, ink }) {
  const x = (i % 3) * C;
  const y = Math.floor(i / 3) * R;
  return (
    <g transform={`translate(${x} ${y})`} className="fade-in" style={{ '--i': i * 2 }}>
      {fill && <rect width={C} height={R} fill={fill} />}
      <text x="28" y="40" fontSize="16" fill={ink}>{label}</text>
      {children}
    </g>
  );
}

export function HabitsArt() {
  const W = C * 3;
  const H = R * 2;
  const tone = LINES.box.rows;
  const nodes = [0, 1, 2, 3].flatMap((c) => [0, 1, 2].map((r) => [c * C, r * R]));
  return (
    <Art viewBox={`-6 -6 ${W + 12} ${H + 12}`} title="Habits of setting: short lines, the two-tone line, brackets, middle dots, superscript percent, Nº" exportName="typography-habits">
      <rect x="-6" y="-6" width={W + 12} height={H + 12} fill={HEX.periwinkle} />
      <Cell i={0} label="Short lines, a full stop" ink={HEX.blueInk}>
        {LINES.web.rows.map((t, k) => (
          <text key={t} x="28" y={150 + k * 50} fontSize="40" letterSpacing="-0.5" fill={HEX.darkBlue} className="display" lang="es">{t}</text>
        ))}
      </Cell>
      <Cell i={1} fill={HEX.activeBlue} label="Two-tone line on Active Blue" ink={HEX.darkBlue}>
        {tone.map((t, k) => (
          <text key={t} x="28" y={150 + k * 36} fontSize="23" letterSpacing="-0.2" fill={k === 0 ? HEX.onBlue : HEX.darkBlue} lang="es">{t}</text>
        ))}
      </Cell>
      <Cell i={2} label="Square brackets" ink={HEX.blueInk}>
        {BRACKETS.map((t, k) => (
          <text key={t} x="28" y={120 + k * 76} fontSize="58" letterSpacing="-1" fill={HEX.darkBlue} className="display">{t}</text>
        ))}
      </Cell>
      <Cell i={3} label="Middle dots" ink={HEX.blueInk}>
        {DOTS.map((t, k) => (
          <text key={t} x="28" y={170 + k * 90} fontSize={k === 0 ? 22 : 26} fill={HEX.darkBlue} lang="es">{t}</text>
        ))}
      </Cell>
      <Cell i={4} fill={HEX.darkBlue} label="Superscript percent beside a numeral" ink={HEX.activeBlue}>
        <text x="28" y="290" fontSize="200" letterSpacing="-8" fill={HEX.activeBlue} className="display">68</text>
        <text x="258" y="170" fontSize="82" fill={HEX.activeBlue} className="display">%</text>
      </Cell>
      <Cell i={5} label="Nº for numbers" ink={HEX.blueInk}>
        <text x="28" y="210" fontSize="46" letterSpacing="-1" fill={HEX.darkBlue} className="display" lang="es">{TUBE.project}</text>
        <text x="28" y="262" fontSize="30" fill={HEX.darkBlue} lang="es">{TUBE.date}</text>
      </Cell>
      <path d={`M0 ${R}H${W}M${C} 0V${H}M${2 * C} 0V${H}`} stroke={HEX.darkBlue} strokeWidth="1.2" fill="none" className="draw" style={{ '--len': 3600 }} />
      <rect x="0" y="0" width={W} height={H} fill="none" stroke={HEX.darkBlue} strokeWidth="1.2" />
      {nodes.map(([x, y]) => (
        <NodeG key={`${x}-${y}`} cx={x} cy={y} s={8} fill={HEX.darkBlue} className="snap" style={{ '--i': (x + y) / 200 }} />
      ))}
    </Art>
  );
}
