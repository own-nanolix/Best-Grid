import Art from '@/components/art/Art';
import { BaselineFieldG, BrandDefs, GuidesG, LiveAreaG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { GRAIN_LEVELS } from './data';
import s from './gradients.module.css';

// Noise laid over the shape it filters (the shared recipe: feTurbulence composited inside the source alpha).
function GrainFilter({ id, freq, oct, alpha, ink, seed = 4 }) {
  const c = ink ? '1 1 1' : '0 0 0';
  const [r, g, b] = c.split(' ');
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={oct} seed={seed} result="n" />
      <feColorMatrix in="n" type="matrix" values={`0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 ${alpha} 0`} result="g" />
      <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="gi" />
      </feMerge>
    </filter>
  );
}

const BANDS = [
  { fill: HEX.darkBlue },
  { fill: HEX.activeBlue },
  { fill: HEX.lightBlue },
];

// Three of the brand's flat fields side by side, with the noise on or off.
function Fields({ x = 0, y = 0, w, h, filter }) {
  const bw = w / BANDS.length;
  return (
    <g filter={filter}>
      {BANDS.map((b, i) => <rect key={b.fill} x={x + i * bw} y={y} width={bw} height={h} fill={b.fill} />)}
    </g>
  );
}

// Before and after on one strip: the flat fields on the left, the same fields with board grain on the right.
export function GrainStrip() {
  return (
    <Art viewBox="0 0 1200 300" title="Grain comparison: flat fields before, the same fields with grain after" exportName="gradients-grain-compare" className={s.wide}>
      <defs>
        <GrainFilter id="gradients-cmp-grain" freq={0.9} oct={2} alpha={0.2} ink={0} seed={11} />
        <GrainFilter id="gradients-cmp-board" freq={0.6} oct={3} alpha={0.22} ink={1} seed={9} />
      </defs>
      <Fields w={600} h={300} />
      <g filter="url(#gradients-cmp-grain)"><Fields x={600} w={600} h={300} /></g>
      <g filter="url(#gradients-cmp-board)" opacity="0.7"><Fields x={600} w={600} h={150} /></g>
      <GuidesG w={1200} h={300} xs={[600]} ys={[150]} stroke={HEX.white} weight={1} node={8} nodes={[[600, 150]]} opacity="0.8" />
      <text x="24" y="276" fontSize="22" fill={HEX.lightBlue}>Flat</text>
      <text x="624" y="276" fontSize="22" fill={HEX.lightBlue}>With grain</text>
      <text x="1176" y="32" fontSize="18" fill={HEX.darkBlue} textAnchor="end">Board grain, top half</text>
    </Art>
  );
}

// One intensity level: the three fields under one filter, the level written large.
export function GrainCell({ level }) {
  const fid = `gradients-${level.id}-grain`;
  return (
    <Art viewBox="0 0 300 300" title={`Grain ${level.name}: ${level.note}`} exportName={`gradients-grain-${level.id}`} className={s.sheet}>
      <defs><GrainFilter id={fid} freq={level.freq} oct={level.oct} alpha={level.alpha * 2.4} ink={level.ink} seed={level.ink ? 9 : 4} /></defs>
      <g filter={`url(#${fid})`}><Fields w={300} h={300} /></g>
      <text x="150" y="268" fontSize="56" fill={HEX.darkBlue} textAnchor="middle" className="display">{level.label}</text>
    </Art>
  );
}

export function GrainLevels() {
  return (
    <div className={s.levels}>
      {GRAIN_LEVELS.map((l, i) => (
        <Reveal key={l.id} delay={i * 50} as="figure" className={s.libItem}>
          <GrainCell level={l} />
          <figcaption>
            <span className={s.num}>{l.name}</span>
            <span className="t-small muted">{l.note}. Shown here at about 2.4 times for reading; print uses the stated value.</span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}

// The other two surfaces the case study shows: the baseline field of the poster grid and the metallic bubble film.
export function SurfacePlates() {
  return (
    <div className={s.pair}>
      <Reveal as="figure" className={s.libItem}>
        <Art viewBox="0 0 600 400" title="Baseline field: hairlines alternating Active Blue and grey between white gutters" exportName="gradients-texture-baseline" className={s.wide}>
          <BrandDefs idp="gradients-tx1" />
          <rect width="600" height="400" fill={HEX.paper} />
          <BaselineFieldG idp="gradients-tx1" x={40} y={40} w={520} h={320} cols={4} gutter={14} step={4.4} weight={0.9} className="fade-in" />
          <LiveAreaG w={600} h={400} m={40} stroke={HEX.darkBlue} weight={1} node={6} animate opacity="0.7" />
        </Art>
        <figcaption><span className={s.num}>Baseline field</span><span className="t-small muted">Hairlines every 0.55% of the sheet height (m10), as an SVG pattern.</span></figcaption>
      </Reveal>
      <Reveal as="figure" delay={60} className={s.libItem}>
        <Art viewBox="0 0 600 400" title="Bubble film: a hexagon pattern with specular highlights" exportName="gradients-texture-bubble" className={s.wide}>
          <BrandDefs idp="gradients-tx2" />
          <rect width="600" height="400" fill="url(#gradients-tx2-bubble)" />
          <rect width="600" height="400" fill={HEX.white} opacity="0.04" filter="url(#gradients-tx2-grain)" />
          <LiveAreaG w={600} h={400} m={40} stroke={HEX.lightBlue} weight={1} node={6} opacity="0.5" />
        </Art>
        <figcaption><span className={s.num}>Bubble film</span><span className="t-small muted">The metallic film of the mailer (m05): hexagon cells with a lit upper left.</span></figcaption>
      </Reveal>
    </div>
  );
}
