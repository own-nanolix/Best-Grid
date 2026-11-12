import Art from '@/components/art/Art';
import { GuidesG, NodeG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import Reveal from '@/components/site/Reveal';
import { GRADS, angleOf } from './data';
import s from './gradients.module.css';

// One gradient as SVG <defs>: id `${idp}-${g.id}` (plus `-light` for a radial light laid over it).
export function GradDefs({ idp, g, horizontal = false }) {
  const id = `${idp}-${g.id}`;
  const stops = g.stops.map((st) => <stop key={st.o} offset={st.o} stopColor={st.c} />);
  return (
    <defs>
      {g.kind === 'radial' ? (
        <radialGradient id={id} cx={g.cx} cy={g.cy} r={g.r}>{stops}</radialGradient>
      ) : horizontal ? (
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">{stops}</linearGradient>
      ) : (
        <linearGradient id={id} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2}>{stops}</linearGradient>
      )}
      {g.light && (
        <radialGradient id={`${id}-light`} cx={g.light.cx} cy={g.light.cy} r={g.light.r}>
          <stop offset="0" stopColor={HEX.white} stopOpacity="0.8" />
          <stop offset="1" stopColor={HEX.white} stopOpacity="0" />
        </radialGradient>
      )}
    </defs>
  );
}

// The 3:4 sheet of the poster ratio: the gradient, hairline guides and nodes in the ink that reads on it.
export function GradSheet({ g, index }) {
  const idp = `gradients-lib${index + 1}`;
  const ink = g.tone === 'dark' ? HEX.lightBlue : HEX.darkBlue;
  return (
    <Art viewBox="0 0 300 400" title={`${g.name} gradient sheet`} exportName={`gradients-sheet-${g.id}`} className={s.sheet}>
      <GradDefs idp={idp} g={g} />
      <rect width="300" height="400" fill={`url(#${idp}-${g.id})`} />
      {g.light && <rect width="300" height="400" fill={`url(#${idp}-${g.id}-light)`} />}
      <GuidesG w={300} h={400} xs={[20, 280]} ys={[20, 380]} stroke={ink} weight={1} node={6} opacity="0.55" animate />
      <NodeG cx={150} cy={200} s={10} fill={ink} className="snap" style={{ '--i': 8 }} />
    </Art>
  );
}

export default function Library() {
  return (
    <div className={s.library}>
      {GRADS.map((g, i) => (
        <Reveal key={g.id} delay={i * 50} as="figure" className={s.libItem}>
          <GradSheet g={g} index={i} />
          <figcaption>
            <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
            <strong className="t-small">{g.name}</strong>
            <span className="t-small muted">
              {g.kind === 'radial' ? 'Radial' : `Linear, ${angleOf(g)}°`}, {g.stops.length} stops
            </span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}
