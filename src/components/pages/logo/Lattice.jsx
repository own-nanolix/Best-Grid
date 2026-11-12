import Art from '@/components/art/Art';
import { MarkG, MARK, NodeG, WordmarkFitG } from '@/components/art/Mark';
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

// The crossing bands of the folder (m05), re-measured on reference/crop_m05_folder.png (1000 x 1442): one band falls
// from the top edge at 27% of the width towards the lower right (72 degrees from horizontal), the other rises from
// the left edge at 58% of the height towards the upper right (21 degrees); they cross at 48.5% / 45.8% with large
// fillets; band 2.2% of the width. In crossingPath angles rise counter-clockwise, so the falling band is -72 and the
// rising one +21. The word-mark sits top right (right edge at 92.8%, baseline at 7.5%, 38.3% of the width wide) and
// the mark bottom left (7.8% from the left, 91% down, 7.9% of the width).
const BANDS = { cx: 0.485, cy: 0.458, a1: -72, a2: 21, band: 0.022, r: 0.045 };
export function Bands() {
  const W = 600, H = 860;
  const ms = r2(W * 0.079);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Crossing bands on a Dark Blue folder panel" exportName="logo-bands-cross" className={s.plate}>
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <CrossingBandsG idp="logo-bands" w={W} h={H} {...BANDS} />
      <WordmarkFitG x={r2(W * 0.928)} y={r2(H * 0.075)} w={r2(W * 0.383)} anchor="end" fill={HEX.onBlue} />
      <MarkG x={r2(W * 0.078)} y={r2(H * 0.91)} size={ms} fill={HEX.onBlue} />
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
