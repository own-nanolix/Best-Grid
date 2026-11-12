import Art from '@/components/art/Art';
import { LockupStackG, WordmarkG } from '@/components/art/Mark';
import { StarOutlineG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { MISUSE } from './data';
import s from './logo.module.css';

// Six things the logo must not do: each a small plate with a red hairline frame and a plain English label.
// These rules are ours; the case study does not publish any.
const W = 300;

function Wrong({ id }) {
  switch (id) {
    case 'stretch':
      return (
        <g transform="translate(150 133) scale(1.5 0.72) translate(-150 -133)">
          <LockupStackG x={50} y={58} scale={0.5} fill={HEX.darkBlue} />
        </g>
      );
    case 'rotate':
      return (
        <g transform="rotate(-22 150 133)">
          <LockupStackG x={50} y={58} scale={0.5} fill={HEX.darkBlue} />
        </g>
      );
    case 'recolour':
      return <LockupStackG x={50} y={58} scale={0.5} fill={HEX.sunset} />;
    case 'outline':
      return (
        <g>
          <StarOutlineG x={115} y={58} size={70} stroke={HEX.darkBlue} weight={1.4} />
          <WordmarkG x={150} y={203} size={46} anchor="middle" fill="none" stroke={HEX.darkBlue} strokeWidth="1" />
        </g>
      );
    case 'contrast':
      return (
        <g>
          <rect width={W} height={W} fill={HEX.periwinkle} />
          <LockupStackG x={50} y={58} scale={0.5} fill={HEX.activeBlue} />
        </g>
      );
    default:
      return (
        <g filter="url(#logo-misuse-shadow)">
          <LockupStackG x={50} y={58} scale={0.5} fill={HEX.darkBlue} />
        </g>
      );
  }
}

export function MisusePlate({ m }) {
  return (
    <Art viewBox={`0 0 ${W} ${W}`} title={`${m.label}: the logo misused`} exportName={`logo-misuse-${m.id}`} className={s.plate}>
      {m.id === 'effects' && (
        <defs>
          <filter id="logo-misuse-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="6" dy="8" stdDeviation="4" floodColor={HEX.darkBlue} floodOpacity="0.6" />
          </filter>
        </defs>
      )}
      <rect width={W} height={W} fill={HEX.paper} />
      <Wrong id={m.id} />
      <rect x="0.75" y="0.75" width={W - 1.5} height={W - 1.5} fill="none" className={s.red} strokeWidth="1.5" />
      <path d="M262 18L282 38M282 18L262 38" className={s.red} strokeWidth="2" fill="none" />
      <text x="16" y="284" fontSize="19" fill={HEX.darkBlue}>{m.label}</text>
    </Art>
  );
}

export default function Misuse() {
  return (
    <div className="grid cols-6">
      {MISUSE.map((m, i) => (
        <Reveal key={m.id} delay={i * 50}>
          <figure className={s.fig}>
            <MisusePlate m={m} />
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
