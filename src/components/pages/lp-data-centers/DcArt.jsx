import Art from '@/components/art/Art';
import { GuidesG, NodeG, NodeGridG, IconArtG, LatticeFieldG, CrossingBandsG } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { range } from '@/lib/site';

// Exportable artwork for the data-centre landing page: the server unit of m15 (stepped frame, a bar and two squares)
// stacked into racks, racks into rows, rows into a hall that draws from a node. Illustration only: no capacities.
// Animations are CSS keyframes (shared classes) that land on the artwork as drawn.

const BLUE = HEX.activeBlue;
const SOFT = HEX.blueSoft;
const INK = HEX.darkBlue;

// One server unit as the icon draws it: top and bottom bars, side bars with the corner pixels left out, one bar and
// two squares inside. `on` lights the bar and squares; `i` orders the fill.
export function UnitG({ x, y, w, h, u = 6, on = true, i = 0, color = BLUE }) {
  const cls = 'fill-in';
  const st = { '--i': i };
  return (
    <g className={cls} style={st}>
      <rect x={r2(x + u)} y={y} width={r2(w - 2 * u)} height={u} fill={color} />
      <rect x={r2(x + u)} y={r2(y + h - u)} width={r2(w - 2 * u)} height={u} fill={color} />
      <rect x={x} y={r2(y + u)} width={u} height={r2(h - 2 * u)} fill={color} />
      <rect x={r2(x + w - u)} y={r2(y + u)} width={u} height={r2(h - 2 * u)} fill={color} />
      <rect x={r2(x + 2.5 * u)} y={r2(y + h / 2 - u / 2)} width={r2(w * 0.5)} height={u} fill={color} opacity={on ? 1 : 0.35} />
      <rect x={r2(x + w - 4.5 * u)} y={r2(y + h / 2 - u / 2)} width={u} height={u} fill={color} opacity={on ? 1 : 0.35} />
      <rect x={r2(x + w - 3 * u)} y={r2(y + h / 2 - u / 2)} width={u} height={u} fill={color} opacity={on ? 1 : 0.35} />
    </g>
  );
}

// Hero: five racks across, nine units each, filling outwards from a feed node on the left edge of the field.
export function RackFieldArt() {
  const W = 960, H = 800, cols = 5, units = 9, uw = 150, uh = 60, gx = 30, x0 = 52, y0 = 96;
  const cy = H / 2;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="A hall of server racks filling from one feed node (illustration)" exportName="lp-data-centers-rack-field">
      <GuidesG w={W} h={H} xs={[24, 936, 480]} ys={[24, 776, cy]} stroke={BLUE} weight={1} node={6} animate />
      {range(cols).map((c) =>
        range(units).map((r) => {
          const x = x0 + c * (uw + gx), y = y0 + r * (uh + 8);
          const dist = c * 3 + Math.abs(r - 4);
          return <UnitG key={`${c}-${r}`} x={x} y={y} w={uw} h={uh} on={(c + r) % 3 !== 0} i={dist + 8} />;
        }),
      )}
      <NodeG cx={24} cy={cy} s={14} fill={BLUE} className="snap" style={{ '--i': 2 }} />
    </Art>
  );
}

// Row 1: a feed line leaves a node and reaches a row of tall racks, one after another.
export function RackRowArt() {
  const W = 900, H = 520, n = 6, rw = 96, gap = 34, x0 = 150, top = 90, units = 6, uh = 52;
  const cy = top + (units * (uh + 8)) / 2;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="A row of racks reached by one feed line (illustration)" exportName="lp-data-centers-rack-row">
      <GuidesG w={W} h={H} xs={[40]} ys={[24, H - 24]} stroke={BLUE} weight={1} node={6} animate />
      <rect x="40" y={r2(cy - 2)} width={W - 40} height="4" fill={BLUE} className="extend-x" style={{ '--i': 4 }} />
      <NodeG cx={40} cy={cy} s={18} fill={BLUE} className="snap" style={{ '--i': 2 }} />
      {range(n).map((c) => (
        <g key={c}>
          {range(units).map((r) => (
            <UnitG key={r} x={x0 + c * (rw + gap)} y={top + r * (uh + 8)} w={rw} h={uh} u={5} on={r !== 2 || c % 2 === 0} i={10 + c * 4 + r} />
          ))}
        </g>
      ))}
      <text x="150" y={H - 40} fontSize="13" fill={HEX.mutedOnDark}>Rack row, 6 racks</text>
    </Art>
  );
}

// Row 2: the plan of a hall as square cells, clusters filled in two strengths of blue (the node grid of m17).
export function HallPlanArt() {
  return (
    <Art viewBox="0 0 900 560" title="The plan of a data hall as filled and empty cells (illustration)" exportName="lp-data-centers-hall-plan">
      <GuidesG w={900} h={560} xs={[24, 876]} ys={[24, 536]} stroke={BLUE} weight={1} node={6} animate />
      <NodeGridG x={58} y={28} cols={14} rows={8} size={55} seed={11} clusters={10} line={HEX.activeBlue} lineOpacity={0.35} full={BLUE} soft={SOFT} animate />
      <text x="58" y="520" fontSize="13" fill={HEX.mutedOnDark}>Hall plan, 14 x 8</text>
    </Art>
  );
}

// Row 3: a line route that steps across the field, with pylons at the bends, to a substation.
export function RouteArt() {
  const W = 900, H = 520;
  const d = 'M40 440H300V220H560V380H760';
  const bends = [[300, 440], [300, 220], [560, 220], [560, 380]];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="A line route to a substation (diagram, no figures)" exportName="lp-data-centers-route">
      <GuidesG w={W} h={H} xs={[24, 876, 300, 560]} ys={[24, 496, 220]} stroke={BLUE} weight={0.6} node={6} />
      <path d={d} fill="none" stroke={BLUE} strokeWidth="4" pathLength="1" className="draw" style={{ '--len': 1 }} />
      <NodeG cx={40} cy={440} s={18} fill={BLUE} className="snap" style={{ '--i': 6 }} />
      {bends.map(([cx, cy], i) => (
        <NodeG key={i} cx={cx} cy={cy} s={10} fill={BLUE} className="snap" style={{ '--i': 10 + i * 6 }} />
      ))}
      <IconArtG name="pylon" x={232} y={110} size={84} fill={BLUE} className="fade-in" style={{ '--i': 16 }} />
      <IconArtG name="pylon" x={492} y={110} size={84} fill={BLUE} className="fade-in" style={{ '--i': 22 }} />
      <IconArtG name="substation" x={730} y={330} size={120} fill={BLUE} className="fade-in" style={{ '--i': 30 }} />
      <g fontSize="13" fill={HEX.mutedOnDark}>
        <text x="58" y="472">Node</text>
        <text x="730" y="474">Substation</text>
        <text x="320" y="210">Line route</text>
      </g>
    </Art>
  );
}

// Demo: six hall rows of ten racks. The first `rows` rows are lit and the feed reaches them; lit rows remount and
// play the shared fade-in, so each row always lands on its lit state.
export function HallDemoArt({ rows }) {
  const W = 760, H = 440, n = 6, per = 10, rh = 44, gap = 22, x0 = 92, y0 = 40, cw = 56, cg = 8;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`Hall rows lit: ${rows} of ${n} (illustration, no capacity)`} exportName="lp-data-centers-hall-demo">
      <GuidesG w={W} h={H} xs={[20, W - 20]} ys={[20, H - 20]} stroke={BLUE} weight={1} node={6} />
      <NodeG cx={44} cy={H / 2} s={16} fill={BLUE} />
      {range(n).map((r) => {
        const y = y0 + r * (rh + gap);
        const on = r < rows;
        return (
          <g key={`${r}-${on ? 'on' : 'off'}`}>
            <rect x="44" y={r2(y + rh / 2 - 1)} width={on ? 48 : 0} height="2" fill={BLUE} className={on ? 'extend-x' : undefined} />
            {range(per).map((c) => (
              <rect
                key={c}
                x={x0 + c * (cw + cg)}
                y={y}
                width={cw}
                height={rh}
                fill={on ? BLUE : 'none'}
                stroke={BLUE}
                strokeOpacity={on ? 0 : 0.4}
                strokeWidth="1"
                className={on ? 'fade-in' : undefined}
                style={on ? { '--i': c } : undefined}
              />
            ))}
          </g>
        );
      })}
    </Art>
  );
}

// A small tile mark used in the stat cell: the server stack of m15 drawn large on its guide frame.
export function StackArt() {
  const W = 420, H = 300;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Server stack icon on its guide frame" exportName="lp-data-centers-stack">
      <GuidesG w={W} h={H} xs={[26, W - 26]} ys={[26, H - 26]} stroke={INK} weight={1} node={6} animate />
      <IconArtG name="datacenter" px size={290} x={65} y={5} fill={INK} className="fade-in" />
    </Art>
  );
}

// A wide corridor: two walls of racks seen straight on, the lattice of the mark standing at the end of the aisle.
// The corridor of the poster is a photograph and is not reproduced; this is the structure it stands for.
export function AisleArt() {
  const W = 1600, H = 420, cols = 6, units = 5, uw = 120, uh = 54;
  const wall = (x0, key) => (
    <g key={key}>
      {range(cols).map((c) =>
        range(units).map((r) => (
          <UnitG key={`${c}-${r}`} x={x0 + c * (uw + 10)} y={46 + r * (uh + 14)} w={uw} h={uh} u={5} on={(c * 2 + r) % 4 !== 0} i={(key === 'l' ? cols - c : c) * 2 + r + 6} />
        )),
      )}
    </g>
  );
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="A corridor of racks with the lattice at the end of the aisle (illustration)" exportName="lp-data-centers-aisle">
      <GuidesG w={W} h={H} xs={[30, W - 30, W / 2]} ys={[30, H - 30]} stroke={BLUE} weight={1} node={6} animate />
      {wall(60, 'l')}
      {wall(W - 60 - cols * (uw + 10) + 10, 'r')}
      <g color={BLUE} className="fade-in" style={{ '--i': 30 }}>
        <LatticeFieldG cx={W / 2} cy={H / 2} k={2.6} rings={2} fill={BLUE} />
      </g>
    </Art>
  );
}

// The secondary graphic of the folder (m05): two straight bands meeting with large fillets, here in Dark Blue on
// Active Blue, with the mark at the crossing's lower left. Stands for a connection reached from two directions.
export function CrossingArt() {
  const W = 800, H = 640;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Two crossing bands with the mark (secondary graphic)" exportName="lp-data-centers-crossing">
      <GuidesG w={W} h={H} xs={[30, W - 30]} ys={[30, H - 30]} stroke={INK} weight={1} node={6} animate />
      <CrossingBandsG idp="lp-data-centers-x" x={0} y={0} w={W} h={H} cx={0.52} cy={0.5} a1={-72} a2={21} band={0.05} r={0.1} fill={INK} className="fade-in" />
      <MarkG x={64} y={H - 150} size={86} fill={INK} className="fade-in" style={{ '--i': 14 }} />
      <NodeG cx={W * 0.52} cy={H * 0.5} s={14} fill={INK} className="snap" style={{ '--i': 20 }} />
    </Art>
  );
}
