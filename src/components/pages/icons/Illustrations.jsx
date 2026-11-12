// Three illustrations from this brand's world (a substation, a line route, a solar field), built only from the
// guide lines and nodes, the lattice, the crossing bands and the icon bars. No people. Each comes in a light and
// a dark version: six exportable SVGs. Animation is CSS keyframes inside the artwork (lines extend, nodes snap,
// the structure rises, then fills in).
import Art from '@/components/art/Art';
import { GuidesG, NodeG, IconArtG, CrossingBandsG, LatticeDefs } from '@/components/art/KeyArt';
import { r2 } from '@/lib/charts';
import { R, F, bar, PAL } from './shapes';

const W = 800, H = 600;
const range = (n) => Array.from({ length: n }, (_, i) => i);

// ---------- 1. Substation: two gantry towers, a busbar, drop lines, a crossing line with open crossings, transformers
function Tower({ x, p, i }) {
  const w = 64, b = 12, levels = [140, 228, 316, 404, 470];
  return (
    <g className="rise" style={{ '--i': i }}>
      <path d={R(x, 140, b, 330) + R(x + w - b, 140, b, 330)} fill={p.ink} />
      {levels.slice(1, 4).map((y) => <rect key={y} x={x + b} y={y} width={w - 2 * b} height="8" fill={p.ink} />)}
      {levels.slice(0, 4).map((y, k) => (
        <polygon key={y} points={bar(k % 2 ? x + w - b : x + b, y + 8, k % 2 ? x + b : x + w - b, levels[k + 1], 7)} fill={p.acc} />
      ))}
    </g>
  );
}

function Substation({ p }) {
  const drops = [312, 392, 472, 552];
  // the second line crosses the drops: segments with a gap at every crossing (open crossings)
  const edges = [254, ...drops.flatMap((d) => [d - 9, d + 9]), 610];
  const segs = range(edges.length / 2).map((k) => [edges[2 * k], edges[2 * k + 1]]);
  return (
    <g>
      <Tower x={190} p={p} i={4} />
      <Tower x={610} p={p} i={6} />
      <rect x="160" y="140" width="514" height="12" fill={p.ink} className="extend-x" style={{ '--i': 10 }} />
      {segs.map(([a, b], k) => <rect key={a} x={a} y="297" width={r2(b - a)} height="6" fill={p.ink} className="extend-x" style={{ '--i': 14 + k }} />)}
      {drops.map((cx, k) => (
        <g key={cx} className="fill-in" style={{ '--i': 14 + k * 2 }}>
          <rect x={cx - 3} y="152" width="6" height="228" fill={p.ink} />
          <rect x={cx - 7} y="206" width="14" height="14" fill={p.acc} />
          <path d={F(cx - 28, 380, 56, 90, 8)} fill={p.ink} />
          <rect x={cx - 8} y="414" width="16" height="16" fill={p.acc} />
        </g>
      ))}
      <rect x="48" y="470" width="704" height="6" fill={p.ink} />
      {range(12).map((k) => <NodeG key={k} cx={r2(80 + k * 58.5)} cy={473} s={9} fill={p.acc} className="snap" style={{ '--i': 20 + k }} />)}
    </g>
  );
}

// ---------- 2. Line route: pylons receding along a stepped ground route, conductors with a sag, crossing bands behind
const PYLONS = [
  { cx: 150, gy: 520, size: 230 }, { cx: 330, gy: 470, size: 170 }, { cx: 480, gy: 430, size: 130 },
  { cx: 590, gy: 400, size: 100 }, { cx: 676, gy: 378, size: 78 },
];
function LineRoute({ p, idp }) {
  const tip = (q, ux, uy) => [r2(q.cx - q.size / 2 + (ux * q.size) / 24), r2(q.gy + ((uy - 22) * q.size) / 24)];
  const CONDS = [[20, 7.5, 4, 7.5, 'acc', 24], [18, 12.5, 6, 12.5, 'ink', 18]];
  const sag = ([x0, y0], [x1, y1], k) => `M${x0} ${y0}Q${r2((x0 + x1) / 2)} ${r2((y0 + y1) / 2 + k)} ${x1} ${y1}`;
  return (
    <g>
      <CrossingBandsG idp={`${idp}-bands`} w={W} h={H} cx={0.52} cy={0.46} band={0.026} r={0.1} fill={p.acc} opacity="0.22" />
      <path d={range(PYLONS.length - 1).map((k) => {
        const a = PYLONS[k], b = PYLONS[k + 1], mx = r2((a.cx + b.cx) / 2);
        return R(a.cx, a.gy - 3, mx - a.cx, 6) + R(mx - 3, Math.min(a.gy, b.gy) - 3, 6, Math.abs(b.gy - a.gy) + 6) + R(mx, b.gy - 3, b.cx - mx, 6);
      }).join('') + R(60, PYLONS[0].gy - 3, PYLONS[0].cx - 60, 6) + R(PYLONS[4].cx, PYLONS[4].gy - 3, 740 - PYLONS[4].cx, 6)} fill={p.acc} className="extend-x" style={{ '--i': 6 }} />
      <g fill="none" strokeWidth="2.2">
        {range(PYLONS.length - 1).flatMap((k) => CONDS.map(([ax, ay, bx, by, col, dip], j) => {
          const a = PYLONS[k], b = PYLONS[k + 1];
          return <path key={`${k}-${j}`} d={sag(tip(a, ax, ay), tip(b, bx, by), dip * (b.size / 120))} stroke={p[col]} className="fade-in" style={{ '--i': 10 + k * 2 + j }} />;
        }))}
      </g>
      {PYLONS.map((q, k) => (
        <g key={q.cx} className="rise" style={{ '--i': 2 + k * 2 }}>
          <IconArtG name="pylon" x={q.cx - q.size / 2} y={q.gy - (q.size * 22) / 24} size={q.size} fill={p.ink} />
        </g>
      ))}
      {PYLONS.map((q, k) => <NodeG key={q.cx} cx={q.cx} cy={q.gy} s={r2(8 + q.size / 30)} fill={p.acc} className="snap" style={{ '--i': 16 + k }} />)}
      <NodeG cx={60} cy={PYLONS[0].gy} s={14} fill={p.ink} className="snap" style={{ '--i': 14 }} />
      <NodeG cx={740} cy={PYLONS[4].gy} s={14} fill={p.ink} className="snap" style={{ '--i': 22 }} />
    </g>
  );
}

// ---------- 3. Solar field: rows of panels receding to a horizon, the sun as the icon, the lattice in the sky
const ROWS = [{ w: 36, h: 16, g: 10 }, { w: 54, h: 24, g: 14 }, { w: 80, h: 36, g: 18 }, { w: 116, h: 52, g: 22 }, { w: 168, h: 72, g: 0 }];
const ROW_TOPS = ROWS.reduce((acc, r, k) => [...acc, k ? acc[k - 1] + ROWS[k - 1].h + ROWS[k - 1].g : 270], []);
function SolarField({ p, idp }) {
  const rows = ROWS.map((r, k) => ({ ...r, y: ROW_TOPS[k] }));
  return (
    <g>
      <LatticeDefs idp={idp} p={46} fill={p.acc} diagonals={false} />
      <rect x="48" y="48" width="704" height="212" fill={`url(#${idp}-lattice)`} opacity="0.16" />
      <IconArtG name="sun" x={548} y={78} size={140} fill={p.acc} className="fade-in" style={{ '--i': 6 }} />
      {rows.map((r, k) => {
        const n = Math.floor(680 / (r.w + 14)), total = n * r.w + (n - 1) * 14, x0 = (W - total) / 2, t = Math.max(2, r2(r.h / 10));
        return (
          <g key={k} className="fill-in" style={{ '--i': 8 + k * 3 }}>
            {range(n).map((c) => {
              const x = r2(x0 + c * (r.w + 14));
              return (
                <g key={c}>
                  <path d={F(x, r.y, r.w, r.h, t)} fill={p.ink} />
                  <path d={R(x + r.w / 2 - t / 2, r.y + t, t, r.h - 2 * t)} fill={p.acc} />
                </g>
              );
            })}
            <NodeG cx={r2(x0 - 14)} cy={r2(r.y + r.h / 2)} s={7} fill={p.acc} />
            <NodeG cx={r2(x0 + total + 14)} cy={r2(r.y + r.h / 2)} s={7} fill={p.acc} />
          </g>
        );
      })}
    </g>
  );
}

const SCENES = {
  substation: { title: 'Substation', Scene: Substation },
  route: { title: 'Line route', Scene: LineRoute },
  solar: { title: 'Solar field', Scene: SolarField },
};
export const ILLUSTRATIONS = Object.keys(SCENES);
export const illustrationTitle = (kind) => SCENES[kind].title;

// One illustration on one ground. kind: substation | route | solar; tone: light | dark.
export default function Illustration({ kind, tone }) {
  const p = PAL[tone];
  const { title, Scene } = SCENES[kind];
  const idp = `icons-${kind}-${tone}`;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`${title} illustration on a ${tone} ground`} exportName={`icons-illustration-${kind}-${tone}`}>
      <rect width={W} height={H} fill={p.bg} />
      <GuidesG w={W} h={H} xs={[48, 752]} ys={[48, 552]} stroke={p.ink} node={9} animate opacity="0.5" />
      <Scene p={p} idp={idp} />
    </Art>
  );
}
