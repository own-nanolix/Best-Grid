import Art from '@/components/art/Art';
import { BaselineFieldG, GuidesG, LiveAreaG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { GRAIN_LEVELS, mix } from './data';
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

// The baseline field of m10, measured on the still m10_1: the plate is the top of a 3:4 sheet 600 wide (800 tall).
// Margins 40 (6.7% of the width), six columns with 5-unit paper gutters (0.8%), one Active Blue and one grey
// hairline every 5 units (0.63% of the sheet height), each line a third of that period, on paper; every 18 pairs the
// grey line is left out, so the field reads in blocks.
const BASE = { m: 40, w: 520, top: 40, cols: 6, gutter: 5, period: 5, block: 18 };
function BaselinePlate() {
  const { m, w, top, cols, gutter, period, block } = BASE;
  const h = 400 - top;
  const lw = r2(period / 3);
  const breaks = Array.from({ length: Math.floor(h / (period * block)) }, (_, j) => r2(top + period / 2 + (j + 1) * period * block));
  return (
    <Art viewBox="0 0 600 400" title="Baseline field: Active Blue and grey hairlines alternating in six columns between paper gutters" exportName="gradients-texture-baseline" className={s.wide}>
      <rect width="600" height="400" fill={HEX.paper} />
      <g className="fade-in">
        <BaselineFieldG idp="gradients-tx1" x={m} y={top} w={w} h={h} cols={cols} gutter={gutter} step={period / 2} weight={lw} colorA={mix(HEX.activeBlue, HEX.lightBlue, 0.62)} colorB={HEX.lightBlue} />
        {breaks.map((y) => <rect key={y} x={m} y={y} width={w} height={lw} fill={HEX.paper} />)}
      </g>
      <GuidesG w={600} h={400} xs={[m, 600 - m]} ys={[top]} stroke={HEX.darkBlue} weight={1} node={6} animate opacity="0.7" />
    </Art>
  );
}

// The metallic bubble film of the mailer (m05): round domes packed in offset columns (about 12 across the mailer),
// each dark in the middle with a lit upper rim and a soft lit lower edge, on a dark navy film.
const BUB = { d: 50, px: 47.5, py: 52.5 };
function BubblePlate() {
  const { d, px, py } = BUB;
  const r = d / 2;
  const domes = [];
  for (let c = 0; c * px < 600 + px; c++) for (let k = -1; k * py < 400 + py; k++) domes.push([r2(c * px + r / 2), r2(k * py + (c % 2) * (py / 2) + r)]);
  const lit = mix(HEX.darkBlue, HEX.lightBlue, 0.24);
  const deep = mix(HEX.darkBlue, HEX.black, 0.5);
  return (
    <Art viewBox="0 0 600 400" title="Bubble film: round domes in offset columns with lit rims, on dark navy" exportName="gradients-texture-bubble" className={s.wide}>
      <defs>
        <radialGradient id="gradients-tx2-dome" cx="0.5" cy="0.56" r="0.52">
          <stop offset="0" stopColor={deep} />
          <stop offset="0.55" stopColor={HEX.darkBlue} />
          <stop offset="0.86" stopColor={lit} />
          <stop offset="1" stopColor={mix(lit, HEX.darkBlue, 0.4)} />
        </radialGradient>
        <linearGradient id="gradients-tx2-spec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={HEX.lightBlue} stopOpacity="0.5" />
          <stop offset="1" stopColor={HEX.lightBlue} stopOpacity="0" />
        </linearGradient>
        <clipPath id="gradients-tx2-clip"><rect width="600" height="400" /></clipPath>
      </defs>
      <rect width="600" height="400" fill={mix(HEX.darkBlue, HEX.black, 0.3)} />
      <g clipPath="url(#gradients-tx2-clip)">
        {domes.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={r} fill="url(#gradients-tx2-dome)" />
            <path d={`M${r2(x - r * 0.78)} ${r2(y - r * 0.3)}A${r} ${r} 0 0 1 ${r2(x + r * 0.78)} ${r2(y - r * 0.3)}Q${x} ${r2(y - r * 0.62)} ${r2(x - r * 0.78)} ${r2(y - r * 0.3)}Z`} fill="url(#gradients-tx2-spec)" />
          </g>
        ))}
      </g>
      <LiveAreaG w={600} h={400} m={40} stroke={HEX.lightBlue} weight={1} node={6} opacity="0.5" />
    </Art>
  );
}

// The other two surfaces the case study shows: the baseline field of the poster grid and the metallic bubble film.
export function SurfacePlates() {
  return (
    <div className={s.pair}>
      <Reveal as="figure" className={s.libItem}>
        <BaselinePlate />
        <figcaption><span className={s.num}>Baseline field</span><span className="t-small muted">Measured on the poster grid (m10): an Active Blue and a grey hairline every 0.63% of the sheet height, six columns, read in blocks of 18. The top of one sheet.</span></figcaption>
      </Reveal>
      <Reveal as="figure" delay={60} className={s.libItem}>
        <BubblePlate />
        <figcaption><span className={s.num}>Bubble film</span><span className="t-small muted">The metallic film of the mailer (m05): round domes in offset columns, lit at the upper rim.</span></figcaption>
      </Reveal>
    </div>
  );
}
