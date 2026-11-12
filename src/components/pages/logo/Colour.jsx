import Art from '@/components/art/Art';
import { LockupStackG, MarkG, NodeG } from '@/components/art/Mark';
import CopyValue from '@/components/site/CopyValue';
import Reveal from '@/components/site/Reveal';
import { COLOURWAYS } from './data';
import s from './logo.module.css';

// One colour version: a square field with the stacked lockup in one ink, guide hairlines and nodes at the corners
// of the live area. The ink and ground come from the palette (the light grey-white and warm grey are sampled).
export function Colourway({ c }) {
  const W = 640, m = 56;
  return (
    <Art viewBox={`0 0 ${W} ${W}`} title={`Logo, ${c.name}`} exportName={`logo-colour-${c.id}`} className={s.plate}>
      <rect width={W} height={W} fill={c.ground} />
      <path d={`M${m} 0V${W}M${W - m} 0V${W}M0 ${m}H${W}M0 ${W - m}H${W}`} stroke={c.rule} strokeWidth="1" opacity="0.5" />
      {[[m, m], [W - m, m], [m, W - m], [W - m, W - m]].map(([x, y]) => (
        <NodeG key={`${x}-${y}`} cx={x} cy={y} s={9} fill={c.rule} />
      ))}
      <LockupStackG x={120} y={170} scale={1} fill={c.ink} />
    </Art>
  );
}

function Swatch({ hex, label, sampled }) {
  return (
    <li className={s.swatch}>
      <span className={s.chipSq} style={{ background: hex }} aria-hidden="true" />
      <CopyValue value={hex} label={`${label} hex`} />
      <span className="t-small muted">{label}{sampled ? ', sampled' : ''}</span>
    </li>
  );
}

function Card({ c, i }) {
  return (
    <Reveal delay={i * 60}>
      <figure className={s.fig}>
        <Colourway c={c} />
        <figcaption className={s.capStack}>
          <span className="t-body">{c.name}</span>
          <span className="t-small muted">{c.seen}</span>
          <ul className={s.swatches}>
            <Swatch hex={c.groundHex} label="Ground" />
            <Swatch hex={c.inkHex} label="Ink" sampled={c.inkSampled} />
          </ul>
        </figcaption>
      </figure>
    </Reveal>
  );
}

// Mono-line reminder of the mark alone in each ink, shown small beside the headings of the second row.
export function InkStrip() {
  return (
    <Art viewBox="0 0 640 96" title="The mark in each of the six inks" exportName="logo-colour-inks" className={s.plate}>
      {COLOURWAYS.map((c, i) => (
        <g key={c.id}>
          <rect x={i * 106.67} width="106.67" height="96" fill={c.ground} />
          <MarkG x={i * 106.67 + 28} y={20} size={56} fill={c.ink} />
        </g>
      ))}
    </Art>
  );
}

export default function Colour() {
  return (
    <div className="stack-lg">
      <div className={`grid cols-2 ${s.colours}`}>
        {COLOURWAYS.slice(0, 4).map((c, i) => <Card key={c.id} c={c} i={i} />)}
      </div>
      <Reveal>
        <p className="t-label">Also from the palette</p>
      </Reveal>
      <div className={`grid cols-2 ${s.colours}`}>
        {COLOURWAYS.slice(4).map((c, i) => <Card key={c.id} c={c} i={i} />)}
      </div>
      <Reveal>
        <figure className={s.fig}>
          <InkStrip />
          <figcaption className={s.cap}><span>All six inks</span><span>The mark alone on each ground</span></figcaption>
        </figure>
      </Reveal>
    </div>
  );
}
