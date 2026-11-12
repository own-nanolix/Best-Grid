import Art from '@/components/art/Art';
import { GuidesG, NodeG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { mix } from './data';
import { ease } from '@/lib/motion';

// The shared easing tokens (lib/motion.js) written out as values: an exported SVG carries its own <style>, where
// CSS variables of the site do not resolve.
const bez = (p) => `cubic-bezier(${p.join(', ')})`;
const EASE = { out: bez(ease.out), move: bez(ease.move), line: bez(ease.line), linear: ease.linear, cut: 'steps(1, end)' };
import s from './gradients.module.css';

const D = HEX.darkBlue, A = HEX.activeBlue, L = HEX.lightBlue;

// Every study carries its own keyframes so the exported SVG moves on its own. The artwork as drawn (no animation)
// is the finished piece; the keyframes only play from a start state towards it. Transforms sit on inner groups,
// never on an element that also carries a transform attribute.
function Css({ k, children }) {
  return (
    <style>{`${children}
@media (prefers-reduced-motion: reduce) { .${k} * , .${k} { animation: none !important; } }`}</style>
  );
}

// A. Drift: a Dark Blue and Active Blue gradient three periods wide slides one period and loops without a seam.
function Drift() {
  const stops = [0, 1, 2, 3, 4, 5, 6].map((i) => <stop key={i} offset={r2(i / 6)} stopColor={i % 2 ? A : D} />);
  return (
    <Art viewBox="0 0 600 600" title="Drift: a Dark Blue to Active Blue gradient sliding sideways in a seamless loop" exportName="gradients-motion-drift" className={s.plate}>
      <Css k="gradients-m1">{`
.gradients-m1-slide { animation: gradients-m1-slide 8s ${EASE.linear} infinite both; }
@keyframes gradients-m1-slide { from { transform: translateX(-600px); } to { transform: none; } }`}</Css>
      <defs>
        <linearGradient id="gradients-m1-field" x1="0" y1="0" x2="1" y2="0">{stops}</linearGradient>
        <clipPath id="gradients-m1-clip"><rect width="600" height="600" /></clipPath>
      </defs>
      <g clipPath="url(#gradients-m1-clip)" className="gradients-m1">
        <g className="gradients-m1-slide">
          <rect x="-600" y="0" width="1800" height="600" fill="url(#gradients-m1-field)" />
        </g>
        <GuidesG w={600} h={600} xs={[60, 540]} ys={[60, 540]} stroke={L} weight={1} node={8} opacity="0.7" />
      </g>
    </Art>
  );
}

// B. Converging: guide lines draw from both sides to one node, hold, and draw again.
function Converge() {
  const rows = Array.from({ length: 13 }, (_, i) => 60 + i * 40);
  return (
    <Art viewBox="0 0 600 600" title="Converging: lines drawing in from both sides towards one node, looping" exportName="gradients-motion-converge" className={s.plate}>
      <Css k="gradients-m2">{`
.gradients-m2-line { animation: gradients-m2-draw 4.4s ${EASE.line} infinite both; }
@keyframes gradients-m2-draw { 0% { stroke-dashoffset: 1000px; } 45%, 100% { stroke-dashoffset: 0; } }
.gradients-m2-node { transform-box: fill-box; transform-origin: center; animation: gradients-m2-snap 4.4s ${EASE.out} infinite both; }
@keyframes gradients-m2-snap { 0%, 35% { opacity: 0.2; transform: scale(0.4); } 50%, 100% { opacity: 1; transform: none; } }`}</Css>
      <rect width="600" height="600" fill={L} className="gradients-m2" />
      <g className="gradients-m2" stroke={D} strokeWidth="1" fill="none">
        {rows.map((y, i) => {
          const len = r2(Math.hypot(300, 300 - y));
          return (
            <g key={y}>
              <path d={`M0 ${y}L300 300`} className="gradients-m2-line" strokeDasharray={`${len} 1000`} style={{ animationDelay: `${i * -90}ms` }} />
              <path d={`M600 ${y}L300 300`} className="gradients-m2-line" strokeDasharray={`${len} 1000`} style={{ animationDelay: `${i * -90}ms` }} />
            </g>
          );
        })}
      </g>
      <g className="gradients-m2">
        <NodeG cx={300} cy={300} s={20} fill={A} className="gradients-m2-node" />
        <NodeG cx={300} cy={300} s={8} fill={D} />
      </g>
    </Art>
  );
}

// C. Cells: a diagonal wave of Active Blue cells rising and falling across a ruled grid (phase set by negative delay).
function Cells() {
  const n = 10, size = 60;
  const cells = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) cells.push({ r, c, i: r + c });
  return (
    <Art viewBox="0 0 600 600" title="Cells: a diagonal wave of Active Blue cells filling a ruled grid, looping" exportName="gradients-motion-cells" className={s.plate}>
      <Css k="gradients-m3">{`
.gradients-m3-cell { animation: gradients-m3-wave 3.6s ${EASE.move} infinite both; }
@keyframes gradients-m3-wave { 0% { opacity: 0; } 30%, 70% { opacity: 1; } 100% { opacity: 0; } }`}</Css>
      <rect width="600" height="600" fill={D} />
      <g className="gradients-m3">
        {cells.map((k) => (
          <rect key={`${k.r}-${k.c}`} x={k.c * size} y={k.r * size} width={size} height={size} fill={k.i % 3 === 0 ? mix(D, A, 0.6) : A} className="gradients-m3-cell" style={{ animationDelay: `${k.i * -140}ms` }} />
        ))}
      </g>
      <GuidesG w={600} h={600} xs={Array.from({ length: n + 1 }, (_, i) => Math.min(599.5, i * size + 0.5))} ys={Array.from({ length: n + 1 }, (_, i) => Math.min(599.5, i * size + 0.5))} stroke={D} weight={1} node={6} />
    </Art>
  );
}

// D. Hard cut: the published manner of m10, eight frames at 100 ms with nothing between them.
function HardCut() {
  const n = 8, size = 60, ox = 60, oy = 60;
  const frames = Array.from({ length: n }, (_, f) => f);
  return (
    <Art viewBox="0 0 600 600" title="Hard cut: eight frames at 100 ms, a marker cell stepping along the diagonal" exportName="gradients-motion-cut" className={s.plate}>
      <Css k="gradients-m4">{`
.gradients-m4-frame { animation: gradients-m4-cut 800ms ${EASE.cut} infinite both; }
@keyframes gradients-m4-cut { 0% { opacity: 1; } 12.5%, 100% { opacity: 0.18; } }`}</Css>
      <rect width="600" height="600" fill={A} />
      <g className="gradients-m4">
        {frames.map((f) => (
          <rect key={f} x={ox + f * size} y={oy + f * size} width={size} height={size} fill={D} className="gradients-m4-frame" style={{ animationDelay: `${f * 100 - 800}ms` }} />
        ))}
      </g>
      <GuidesG w={600} h={600} xs={Array.from({ length: n + 1 }, (_, i) => ox + i * size)} ys={Array.from({ length: n + 1 }, (_, i) => oy + i * size)} stroke={D} weight={1} node={6} opacity="0.5" />
    </Art>
  );
}

const STUDIES = [
  { C: Drift, name: 'Drift', note: 'Gradient sliding one period, 8 s, seamless.' },
  { C: Converge, name: 'Converging lines', note: 'Lines extend first, then the node snaps in, 4.4 s.' },
  { C: Cells, name: 'Cells filling', note: 'A diagonal wave through the ruled grid, 3.6 s.' },
  { C: HardCut, name: 'Hard cut', note: 'Eight frames at 100 ms, as the poster animation (m10).' },
];

export default function MotionStudies() {
  return (
    <div className={s.motion}>
      {STUDIES.map(({ C, name, note }, i) => (
        <Reveal key={name} as="figure" delay={i * 60} className={s.libItem}>
          <C />
          <figcaption>
            <span className={s.num}>{String(i + 1).padStart(2, '0')} {name}</span>
            <span className="t-small muted">{note} Still when motion is reduced.</span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}
