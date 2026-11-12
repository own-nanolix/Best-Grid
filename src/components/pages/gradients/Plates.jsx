import Art from '@/components/art/Art';
import {
  BrandDefs, CrossingBandsG, GuidesG, LatticeFieldG, NodeG, NodeGridG, StarEchoG,
} from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { GradDefs } from './Library';
import { gradById, mix } from './data';
import s from './gradients.module.css';

const D = HEX.darkBlue, A = HEX.activeBlue, L = HEX.lightBlue;

// 1. Hero, 1200 x 1200: the mark's own lattice (pitch and bar of the mark) continued outward, on Dark Blue.
function LatticePlate() {
  return (
    <Art viewBox="0 0 1200 1200" title="Lattice field: the mark's lattice continued outward on Dark Blue" exportName="gradients-key-lattice" className={s.plate}>
      <BrandDefs idp="gradients-k1" />
      <defs>
        <radialGradient id="gradients-k1-glow" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor={A} stopOpacity="0.5" />
          <stop offset="1" stopColor={A} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="1200" fill={D} filter="url(#gradients-k1-grain)" />
      <rect width="1200" height="1200" fill="url(#gradients-k1-glow)" />
      <LatticeFieldG cx={600} cy={600} k={8} rings={4} fill={A} className="lattice-fill" />
      <GuidesG w={1200} h={1200} xs={[80, 1120]} ys={[80, 1120]} stroke={L} weight={1} node={8} opacity="0.55" animate />
      <text x="80" y="1076" fontSize="40" fill={L} className="display" lang="es">{LINES.hero.rows[0]}</text>
    </Art>
  );
}

// 2. Tall, 600 x 1200: the crossing bands of the folder (m05) on Active Blue with the website line, two-tone.
function BandsPlate() {
  const rows = LINES.web.rows;
  const cx = 600 * 0.48, cy = 1200 * 0.46;
  return (
    <Art viewBox="0 0 600 1200" title="Crossing bands on Active Blue with the website line" exportName="gradients-key-bands" className={s.plate}>
      <BrandDefs idp="gradients-k2" />
      <rect width="600" height="1200" fill={A} filter="url(#gradients-k2-board)" />
      <CrossingBandsG idp="gradients-k2" w={600} h={1200} fill={D} band={0.03} r={0.1} className="fade-in" />
      <NodeG cx={cx} cy={cy} s={14} fill={L} className="snap" style={{ '--i': 6 }} />
      <GuidesG w={600} h={1200} xs={[40, 560]} ys={[40, 1160]} stroke={D} weight={1} node={8} animate />
      <g className="display" fontSize="50" lang="es">
        <text x="40" y="968" fill={HEX.onBlue}>{rows[0]}</text>
        <text x="40" y="1026" fill={D}>{rows[1]}</text>
        <text x="40" y="1084" fill={D}>{rows[2]}</text>
      </g>
    </Art>
  );
}

// 3. Tall, 600 x 1200: the node grid of the phone (m17), cells only, no data, on Light Blue.
function NodesPlate() {
  return (
    <Art viewBox="0 0 600 1200" title="Node grid: ruled square cells with clusters in two strengths of Active Blue" exportName="gradients-key-nodes" className={s.plate}>
      <BrandDefs idp="gradients-k3" />
      <rect width="600" height="1200" fill={L} filter="url(#gradients-k3-grain)" />
      <NodeGridG cols={10} rows={20} size={60} seed={5} clusters={14} animate />
      <GuidesG w={600} h={1200} xs={[0.5, 599.5]} ys={[0.5, 1199.5]} stroke={D} weight={1} node={8} />
    </Art>
  );
}

// 4. Square: lines converging on one node from every edge point of a 60 grid.
function ConvergePlate() {
  const pts = [];
  for (let i = 0; i <= 10; i++) pts.push([i * 60, 0], [i * 60, 600], [0, i * 60], [600, i * 60]);
  const seen = new Set();
  const uniq = pts.filter(([x, y]) => (seen.has(`${x},${y}`) ? false : seen.add(`${x},${y}`)));
  return (
    <Art viewBox="0 0 600 600" title="Converging lines: every edge point drawn to one node" exportName="gradients-key-converge" className={s.plate}>
      <rect width="600" height="600" fill={D} />
      <g stroke={A} strokeWidth="1" fill="none">
        {uniq.map(([x, y], i) => {
          const len = r2(Math.hypot(300 - x, 300 - y));
          return <path key={`${x}-${y}`} d={`M${x} ${y}L300 300`} className="draw" style={{ '--len': len, '--i': i % 14 }} strokeOpacity={i % 2 ? 0.55 : 1} />;
        })}
      </g>
      {uniq.map(([x, y]) => <NodeG key={`n${x}-${y}`} cx={Math.min(594, Math.max(6, x))} cy={Math.min(594, Math.max(6, y))} s={5} fill={L} />)}
      <NodeG cx={300} cy={300} s={22} fill={L} className="snap" style={{ '--i': 14 }} />
      <NodeG cx={300} cy={300} s={8} fill={D} className="snap" style={{ '--i': 15 }} />
    </Art>
  );
}

// 5. Square: cells filling from the lower right, in four steps of Active Blue.
function CellsPlate() {
  const n = 12, size = 50;
  const steps = [0, 0.25, 0.5, 0.75, 1];
  const cells = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const d = Math.hypot(n - 1 - c, n - 1 - r) / Math.hypot(n - 1, n - 1);
    const lv = Math.round((1 - d) * 4 * 1.15);
    cells.push({ r, c, lv: Math.min(4, Math.max(0, lv)), d });
  }
  return (
    <Art viewBox="0 0 600 600" title="Cells filling: a ruled grid filling with Active Blue towards one corner" exportName="gradients-key-cells" className={s.plate}>
      <rect width="600" height="600" fill={L} />
      {cells.filter((k) => k.lv > 0).map((k) => (
        <rect key={`${k.r}-${k.c}`} x={k.c * size} y={k.r * size} width={size} height={size} fill={mix(L, A, steps[k.lv])} className="fill-in" style={{ '--i': Math.round(k.d * 20) }} />
      ))}
      <GuidesG w={600} h={600} xs={Array.from({ length: n + 1 }, (_, i) => Math.min(599.5, i * size + 0.5))} ys={Array.from({ length: n + 1 }, (_, i) => Math.min(599.5, i * size + 0.5))} stroke={D} weight={1} node={5} opacity="0.35" />
    </Art>
  );
}

// 6. Square: the mark with echoes of its outline over the Dark Blue to Active Blue gradient and board grain.
function StarPlate() {
  const g = gradById('dark-to-active');
  return (
    <Art viewBox="0 0 600 600" title="Star echo: the mark with its outline repeated outward over a Dark Blue to Active Blue field" exportName="gradients-key-echo" className={s.plate}>
      <BrandDefs idp="gradients-k6" />
      <GradDefs idp="gradients-k6" g={g} />
      <rect width="600" height="600" fill={`url(#gradients-k6-${g.id})`} filter="url(#gradients-k6-grain)" />
      <StarEchoG cx={300} cy={300} size={200} count={6} step={0.34} stroke={L} weight={1} animate />
      <MarkG x={200} y={200} size={200} fill={L} pathClass="lattice-fill" />
      <GuidesG w={600} h={600} xs={[300]} ys={[300]} stroke={L} weight={1} node={8} nodes={[[300, 300]]} opacity="0.4" animate />
    </Art>
  );
}

const PLATES = [
  { id: 'lattice', cls: 'kHero', C: LatticePlate, name: 'Lattice field', note: 'The mark’s lattice, bar and pitch, continued outward with guide lines and nodes.' },
  { id: 'bands', cls: 'kTall', C: BandsPlate, name: 'Crossing bands', note: 'The folder graphic of m05 with the website line, first row light, the rest Dark Blue.' },
  { id: 'nodes', cls: 'kTall', C: NodesPlate, name: 'Node grid', note: 'Ruled cells and clusters as on the phone back screen (m17), without data.' },
  { id: 'converge', cls: 'kSmall', C: ConvergePlate, name: 'Converging lines', note: 'Every edge point drawn to a single node.' },
  { id: 'cells', cls: 'kSmall', C: CellsPlate, name: 'Cells filling', note: 'A ruled grid filling in four steps of Active Blue.' },
  { id: 'echo', cls: 'kSmall', C: StarPlate, name: 'Star echo', note: 'The mark’s outline repeated outward over Dark Blue to Active Blue.' },
];

export default function Plates() {
  return (
    <div className={s.keyGrid}>
      {PLATES.map(({ id, cls, C, name, note }, i) => (
        <Reveal key={id} as="figure" delay={(i % 3) * 60} className={`${s.libItem} ${s[cls]}`}>
          <C />
          <figcaption>
            <span className={s.num}>{String(i + 1).padStart(2, '0')} {name}</span>
            <span className="t-small muted">{note}</span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}
