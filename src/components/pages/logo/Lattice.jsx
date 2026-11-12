import Art from '@/components/art/Art';
import { MarkG, MARK, NodeG, LockupCornersG } from '@/components/art/Mark';
import { GuidesG, LatticeFieldG, LatticeDefs, CrossingBandsG, StarEchoG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './logo.module.css';

// The secondary graphics grown from the mark: its lattice continued into a field (frames at the pitch P, a cross and
// two diagonals), the same lattice as a pattern, the pulse of the star outline, and the crossing bands of the folder.

// Nodes where a ring meets an axis or a diagonal: eight per ring, plus the centre.
function ringNodes(cx, cy, P, rings) {
  const pts = [[cx, cy]];
  for (let i = 1; i <= rings; i++) {
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) pts.push([r2(cx + dx * i * P), r2(cy + dy * i * P)]);
  }
  return pts;
}

export function LatticeField() {
  const W = 1200, H = 800, cx = 600, cy = 400, k = 4.5, rings = 5;
  const P = r2(MARK.P * k);
  const idx = Array.from({ length: 2 * rings + 1 }, (_, i) => i - rings);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Lattice field: the mark's frames, cross and diagonals continued outward" exportName="logo-lattice-field" className={s.plate}>
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <GuidesG w={W} h={H} xs={idx.map((i) => r2(cx + i * P))} ys={idx.map((i) => r2(cy + i * P))} nodes={[]} stroke={HEX.activeBlue} weight={1} opacity="0.35" animate />
      <LatticeFieldG cx={cx} cy={cy} k={k} rings={rings} fill={HEX.activeBlue} className="fade-in" />
      {ringNodes(cx, cy, P, rings).map(([x, y], i) => (
        <NodeG key={`${x}-${y}`} cx={x} cy={y} s={9} fill={HEX.lightBlue} className="snap" style={{ '--i': i }} />
      ))}
    </Art>
  );
}

export function LatticePattern() {
  const W = 800, H = 500;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Lattice pattern with the mark in a dark cell" exportName="logo-lattice-pattern" className={s.plate}>
      <LatticeDefs idp="logo-pat" p={64} fill={HEX.activeBlue} />
      <rect width={W} height={H} fill={HEX.periwinkle} />
      <rect width={W} height={H} fill="url(#logo-pat-lattice)" />
      <rect x="288" y="128" width="224" height="244" fill={HEX.darkBlue} />
      <MarkG x="308" y="152" size={184} fill={HEX.activeBlue} />
      <NodeG cx={288} cy={128} s={9} fill={HEX.darkBlue} />
      <NodeG cx={512} cy={372} s={9} fill={HEX.darkBlue} />
    </Art>
  );
}

export function Echo() {
  return (
    <Art viewBox="0 0 800 800" title="Pulse: the star outline repeated around the mark" exportName="logo-echo" className={s.plate}>
      <rect width="800" height="800" fill={HEX.darkBlue} />
      <StarEchoG cx={400} cy={400} size={190} count={7} step={0.4} stroke={HEX.activeBlue} weight={1.25} animate />
      <MarkG x={305} y={305} size={190} fill={HEX.activeBlue} />
    </Art>
  );
}

// The crossing bands of the folder (m05): two straight bands with large fillets, the word-mark top right, the mark
// bottom left. Measured: bands at 72 and -21 degrees, crossing at 48% / 46%, band 2% of the width.
export function Bands() {
  const W = 600, H = 860;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Crossing bands on a Dark Blue folder panel" exportName="logo-bands-cross" className={s.plate}>
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <CrossingBandsG idp="logo-bands" w={W} h={H} />
      <LockupCornersG w={W} h={H} fill={HEX.onBlue} />
    </Art>
  );
}

export default function Lattice() {
  return (
    <div className="stack-lg">
      <div className={s.latRow}>
        <Reveal>
          <figure className={s.fig}>
            <LatticeField />
            <figcaption className={s.cap}><span>Lattice field</span><span>Pitch P, five rings, nodes at the crossings</span></figcaption>
          </figure>
        </Reveal>
        <Reveal delay={80}>
          <figure className={s.fig}>
            <Bands />
            <figcaption className={s.cap}><span>Crossing bands</span><span>The folder of the stationery</span></figcaption>
          </figure>
        </Reveal>
      </div>
      <div className={s.pair}>
        <Reveal>
          <figure className={s.fig}>
            <LatticePattern />
            <figcaption className={s.cap}><span>Pattern</span><span>The lattice as a repeating ground</span></figcaption>
          </figure>
        </Reveal>
        <Reveal delay={80}>
          <figure className={s.fig}>
            <Echo />
            <figcaption className={s.cap}><span>Pulse</span><span>The outline leaving the node</span></figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  );
}
