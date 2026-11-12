import Art from '@/components/art/Art';
import { GuidesG, NodeG, NodeGridG, IconArtG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { range } from '@/lib/site';

// Exportable artwork for the storage landing page. Battery modules are cells that fill on the grid (an illustration:
// no capacities are drawn). Every shape is generated; every animation is a CSS keyframe that lands on the base style.

const INK = HEX.darkBlue;
const BLUE = HEX.activeBlue;

// One battery drawn in the manner of the m15 icon: stepped corners (no corner pixel), a terminal, a "+" mark, and a
// column of module cells that fill from the bottom. `lit` of `rows` modules are filled (an illustration state).
function BatteryBodyG({ x, y, w, h, u, rows, lit, order = 0 }) {
  const inner = h - 4 * u;
  const gap = u * 0.5;
  const rh = (inner - gap * (rows - 1)) / rows;
  return (
    <g>
      {/* terminal */}
      <rect x={r2(x + w / 2 - u * 1.5)} y={r2(y - u * 1.5)} width={u * 3} height={u * 1.5} fill={INK} />
      {/* frame: four bars, corner pixels left out */}
      <rect x={x + u} y={y} width={w - 2 * u} height={u} fill={INK} className="extend-x" style={{ '--i': order }} />
      <rect x={x + u} y={y + h - u} width={w - 2 * u} height={u} fill={INK} className="extend-x" style={{ '--i': order + 1 }} />
      <rect x={x} y={y + u} width={u} height={h - 2 * u} fill={INK} className="extend-y" style={{ '--i': order + 2 }} />
      <rect x={x + w - u} y={y + u} width={u} height={h - 2 * u} fill={INK} className="extend-y" style={{ '--i': order + 3 }} />
      {range(rows).map((i) => {
        const yy = r2(y + h - 2 * u - (i + 1) * rh - i * gap);
        const on = i < lit;
        return (
          <rect
            key={i}
            x={x + 2 * u}
            y={yy}
            width={w - 4 * u}
            height={r2(rh)}
            fill={on ? BLUE : 'none'}
            stroke={on ? 'none' : INK}
            strokeOpacity="0.3"
            strokeWidth="1"
            className={on ? 'fill-in' : undefined}
            style={on ? { '--i': i + order * 2 } : undefined}
          />
        );
      })}
    </g>
  );
}

// Hero: one of three tall cells. `lit` modules filled; `no` is the plain ordinal printed in the corner.
export function HeroCellArt({ name, no, lit }) {
  return (
    <Art viewBox="0 0 400 600" title={`Battery cell ${no}: ${lit} of 10 modules filled (illustration)`} exportName={`lp-storage-${name}`}>
      <GuidesG w={400} h={600} xs={[28, 372]} ys={[28, 572]} stroke={INK} weight={1} node={6} animate />
      <BatteryBodyG x={104} y={120} w={192} h={400} u={12} rows={10} lit={lit} order={no} />
      <text x="48" y="64" fontSize="14" fill={HEX.muted} className="display">{`0${no}`}</text>
    </Art>
  );
}

// Row A: a tall grid of module cells, some clusters filled, as the node grid of the phone (m17).
export function ModuleGridArt() {
  return (
    <Art viewBox="0 0 480 820" title="Battery modules as cells filling a grid (illustration)" exportName="lp-storage-module-grid">
      <GuidesG w={480} h={820} xs={[30, 450]} ys={[30, 790]} stroke={INK} weight={1} node={6} animate />
      <g transform="translate(60 60) scale(1)" color={INK}>
        <IconArtG name="battery" px size={72} fill={INK} className="fade-in" />
      </g>
      <NodeGridG x={60} y={140} cols={6} rows={10} size={60} seed={5} clusters={8} line="rgba(27,32,67,0.28)" full={BLUE} soft="#7c9cff" animate />
      <text x="60" y="772" fontSize="13" fill={HEX.muted}>Module grid, 6 x 10</text>
    </Art>
  );
}

// Row B: the connection, drawn as a diagram of lines and nodes (no figures): storage, a node, a junction,
// then a pylon and a substation along the route.
export function ConnectionArt() {
  const stroke = 4;
  const segs = [
    { x: 238, y: 214, w: stroke, h: 114, k: 'y' }, // storage down to the node
    { x: 238, y: 340, w: stroke, h: 190, k: 'y' }, // node down to the junction
    { x: 106, y: 528, w: 276, h: stroke, k: 'x' }, // junction left and right
    { x: 106, y: 528, w: stroke, h: 80, k: 'y' }, // down to the pylon
    { x: 380, y: 528, w: stroke, h: 80, k: 'y' }, // down to the substation
  ];
  const nodes = [[240, 334, 18], [240, 530, 12], [108, 530, 10], [382, 530, 10]];
  return (
    <Art viewBox="0 0 480 820" title="A grid connection: storage, node, pylon and substation (diagram, no figures)" exportName="lp-storage-connection">
      <GuidesG w={480} h={820} xs={[30, 450]} ys={[30, 790]} stroke={INK} weight={1} node={6} animate />
      <IconArtG name="battery" px size={220} x={130} y={20} fill={INK} className="fade-in" />
      {segs.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} fill={BLUE} className={s.k === 'x' ? 'extend-x' : 'extend-y'} style={{ '--i': i * 5 + 4 }} />
      ))}
      {nodes.map(([cx, cy, s], i) => (
        <NodeG key={i} cx={cx} cy={cy} s={s} fill={i === 0 ? INK : BLUE} className="snap" style={{ '--i': i * 5 + 8 }} />
      ))}
      <IconArtG name="pylon" x={48} y={610} size={120} fill={INK} className="fade-in" style={{ '--i': 30 }} />
      <IconArtG name="substation" x={320} y={610} size={120} fill={INK} className="fade-in" style={{ '--i': 32 }} />
      <g fontSize="13" fill={HEX.muted}>
        <text x="262" y="332">Connection node</text>
        <text x="262" y="552">Junction</text>
        <text x="62" y="752">Line route</text>
        <text x="330" y="752">Substation</text>
        <text x="40" y="230" fill={HEX.muted}>Storage</text>
      </g>
    </Art>
  );
}

// The tile: the batteries icon of m15 large, on its guide frame (the figure itself is live type beside it).
export function TileIconArt() {
  return (
    <Art viewBox="0 0 400 300" title="Batteries icon on its guide frame" exportName="lp-storage-tile-icon">
      <GuidesG w={400} h={300} xs={[26, 374]} ys={[26, 274]} stroke={INK} weight={1} node={6} animate />
      <IconArtG name="battery" px size={300} x={50} y={0} fill={INK} className="fade-in" />
    </Art>
  );
}

// Demo: 8 x 4 module cells; the first `lit` fill from the bottom row, left to right. Newly lit cells remount and
// play the shared fade-in keyframe, so a cell always lands on its filled state.
export function ChargeArt({ lit }) {
  const cols = 8, rows = 4, size = 62, gap = 6, x0 = 44, y0 = 40;
  const cells = range(cols * rows).map((n) => {
    const r = rows - 1 - Math.floor(n / cols);
    const c = n % cols;
    return { n, x: x0 + c * (size + gap), y: y0 + r * (size + gap) };
  });
  return (
    <Art viewBox="0 0 600 340" title={`Module cells lit: ${lit} of 32 (illustration, no capacity)`} exportName="lp-storage-charge-grid">
      <GuidesG w={600} h={340} xs={[20, 580]} ys={[20, 320]} stroke={BLUE} weight={1} node={6} />
      {cells.map(({ n, x, y }) => (
        <g key={`${n}-${n < lit ? 'on' : 'off'}`}>
          <rect x={x} y={y} width={size} height={size} fill={n < lit ? BLUE : 'none'} stroke={BLUE} strokeOpacity={n < lit ? 0 : 0.45} strokeWidth="1" className={n < lit ? 'fade-in' : undefined} />
        </g>
      ))}
    </Art>
  );
}

// A row of banks on one busbar running to a single node and a pylon: many modules, one connection. Illustration only.
const BANK_LIT = [3, 5, 8, 2, 6, 8, 4, 7];
export function BankRowArt() {
  const w = 1600, h = 440, bw = 104, bh = 220, gap = 62, x0 = 70, top = 70;
  const busY = top + bh + 56;
  const lastX = x0 + (BANK_LIT.length - 1) * (bw + gap) + bw / 2;
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title="A row of battery banks on one busbar, running to a single grid node (illustration)" exportName="lp-storage-bank-row">
      <GuidesG w={w} h={h} xs={[30, w - 30]} ys={[30, h - 30]} stroke={INK} weight={1} node={6} animate />
      {BANK_LIT.map((lit, i) => {
        const x = x0 + i * (bw + gap);
        return (
          <g key={i}>
            <BatteryBodyG x={x} y={top} w={bw} h={bh} u={8} rows={8} lit={lit} order={i * 2} />
            <rect x={x + bw / 2 - 2} y={top + bh} width="4" height={busY - top - bh} fill={BLUE} className="extend-y" style={{ '--i': 10 + i }} />
          </g>
        );
      })}
      <rect x={x0 + bw / 2 - 2} y={busY - 2} width={r2(lastX - x0 - bw / 2 + 2 + 280)} height="4" fill={BLUE} className="extend-x" style={{ '--i': 16 }} />
      <NodeG cx={r2(lastX + 280)} cy={busY} s={16} fill={INK} className="snap" style={{ '--i': 30 }} />
      <IconArtG name="pylon" x={r2(lastX + 280 + 40)} y={busY - 70} size={140} fill={INK} className="fade-in" style={{ '--i': 34 }} />
      <text x={x0} y={h - 48} fontSize="13" fill={HEX.muted}>Eight banks, one busbar, one node</text>
    </Art>
  );
}
