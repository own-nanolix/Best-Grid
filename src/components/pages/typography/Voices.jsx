import Art from '@/components/art/Art';
import { NodeG, WordmarkG, WORDMARK } from '@/components/art/Mark';
import { HEX, LINES, CAPACITY, SPECS } from '@/lib/brand';

const ALPHA = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789 [ ] · % Nº'];

// Primary: the text voice of the brand typeface, Regular as published, Medium as the word-mark is cut.
export function VoiceText() {
  const W = 1200;
  const H = 720;
  const rows = [
    { w: 400, name: 'Regular, 400', note: 'Published on the type slide', y: 140 },
    { w: 540, name: 'Medium, about 540', note: 'The word-mark cut, read from the artwork', y: 290 },
  ];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Primary typeface, the text voice: Regular and the Medium cut of the word-mark" exportName="typography-voice-text">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <path d={`M0 90H${W}M0 ${H - 130}H${W}M420 90V${H - 130}`} stroke={HEX.activeBlue} strokeWidth="1.2" fill="none" className="draw" style={{ '--len': 3400 }} />
      {[[420, 90], [420, H - 130]].map(([x, y]) => (
        <NodeG key={y} cx={x} cy={y} s={9} fill={HEX.activeBlue} className="snap" />
      ))}
      <text x="40" y="60" fontSize="20" fill={HEX.activeBlue}>Primary typeface, text voice</text>
      <text x="30" y="440" fontSize="300" letterSpacing="-9" fill={HEX.lightBlue} className="slide-up">Aa</text>
      {rows.map((r, i) => (
        <g key={r.name} className="fade-in" style={{ '--i': 6 + i * 3 }}>
          <text x="460" y={r.y} fontSize="17" fill={HEX.activeBlue}>{r.name}</text>
          <text x="460" y={r.y + 50} fontSize="38" fontWeight={r.w} letterSpacing="-0.4" fill={HEX.lightBlue} lang="es">{LINES.hero.rows[0]}</text>
          <text x="460" y={r.y + 82} fontSize="16" fill={HEX.mutedOnDark}>{r.note}</text>
          <rect x="460" y={r.y + 104} width={W - 500} height="0.8" fill={HEX.activeBlue} opacity="0.6" />
        </g>
      ))}
      <g fill={HEX.lightBlue} fontSize="30" className="fade-in" style={{ '--i': 12 }}>
        {ALPHA.map((t, i) => (
          <text key={t} x="460" y={470 + i * 44} letterSpacing="1">{t}</text>
        ))}
      </g>
      <g className="fade-in" style={{ '--i': 14 }}>
        <text x="40" y={H - 84} fontSize="18" fill={HEX.activeBlue}>{SPECS.type.optical}</text>
        <text x="40" y={H - 52} fontSize="16" fill={HEX.mutedOnDark}>Text sizes keep the face&apos;s default spacing and follow its optical size.</text>
      </g>
    </Art>
  );
}

// Secondary: the display voice, the same face at headline and numeral sizes, set tight.
export function VoiceDisplay() {
  const W = 1200;
  const H = 720;
  const notes = ['Headlines are set tight, about -0.01 to -0.025 em,', 'in two or three short lines ending in a full stop.', 'Lines are never joined and never translated.'];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Secondary use of the typeface, the display voice: headline and oversized numerals" exportName="typography-voice-display">
      <rect width={W} height={H} fill={HEX.activeBlue} />
      <path d={`M0 90H${W}M740 90V${H}`} stroke={HEX.darkBlue} strokeWidth="1.2" fill="none" className="draw" style={{ '--len': 3400 }} />
      <NodeG cx="740" cy="90" s={9} fill={HEX.darkBlue} className="snap" />
      <text x="40" y="60" fontSize="20" fill={HEX.darkBlue}>Secondary use, display voice</text>
      <g fill={HEX.darkBlue} className="display">
        {LINES.web.rows.map((t, i) => (
          <text key={t} x="40" y={200 + i * 70} fontSize="62" letterSpacing="-1.2" lang="es" className="slide-up" style={{ '--i': i + 2 }}>{t}</text>
        ))}
      </g>
      <g fill={HEX.darkBlue} fontSize="17" className="fade-in" style={{ '--i': 8 }}>
        {notes.map((t, i) => (
          <text key={t} x="40" y={500 + i * 28}>{t}</text>
        ))}
      </g>
      <g fill={HEX.darkBlue} className="fade-in" style={{ '--i': 10 }}>
        <text x="780" y="150" fontSize="20" lang="es">{CAPACITY.totalLabel}</text>
        <text x="780" y="290" fontSize="124" className="display" letterSpacing="-5" lang="es">15.420</text>
        <text x="780" y="336" fontSize="34" className="display" lang="es">MW</text>
        <text x="780" y="470" fontSize="20" lang="es">{CAPACITY.treemap.parts[0].labelRows.join(' ')}</text>
        <text x="780" y="590" fontSize="124" className="display" letterSpacing="-5" lang="es">68</text>
        <text x="940" y="520" fontSize="52" className="display" lang="es">%</text>
      </g>
    </Art>
  );
}

// Weights side by side: Regular, Medium and the word-mark with its spacing.
export function Weights() {
  const W = 1200;
  const H = 640;
  const rows = [
    { name: 'Regular, 400', w: 400, y0: 60 },
    { name: 'Medium, about 540', w: 540, y0: 240 },
  ];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Weights: Regular, Medium and the word-mark cut with its tight spacing" exportName="typography-weights">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      {[60, 240, 420, 600].map((y, i) => (
        <g key={y}>
          <rect x="0" y={y - 0.6} width={W} height="1.2" fill={HEX.darkBlue} className="extend-x" style={{ '--i': i }} />
          <NodeG cx="40" cy={y} s={9} fill={HEX.darkBlue} className="snap" style={{ '--i': i }} />
        </g>
      ))}
      {rows.map((r, i) => (
        <g key={r.name} className="fade-in" style={{ '--i': i * 3 + 3 }}>
          <text x="70" y={r.y0 + 30} fontSize="17" fill={HEX.blueInk}>{r.name}</text>
          <text x="70" y={r.y0 + 150} fontSize="150" fontWeight={r.w} letterSpacing="-4" fill={HEX.darkBlue} className="display">Best Grid</text>
        </g>
      ))}
      <g className="fade-in" style={{ '--i': 9 }}>
        <text x="70" y="450" fontSize="17" fill={HEX.blueInk}>{`The word-mark: tracking ${WORDMARK.tracking} em, word space ${WORDMARK.gap} em`}</text>
        <WordmarkG x={70} y={570} size={150} fill={HEX.darkBlue} />
      </g>
    </Art>
  );
}
