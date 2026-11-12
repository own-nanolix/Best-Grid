import Art from '@/components/art/Art';
import { MarkG, MARK, NodeG, markConstruction } from '@/components/art/Mark';
import { GuidesG } from '@/components/art/KeyArt';
import { SpecTable, Numeral } from '@/components/ui/Spec';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { CENTRES, CONSTRUCTION_ROWS, RATIOS, SLOPE_DEG } from './data';
import s from './logo.module.css';

// The construction drawing: the mark on its own 100 x 100 unit box (1 u = 1% of the mark width, y down), the centre
// lines of every bar, the measurements drawn and labelled. Scale 7 px per unit on a 900 square, box at (100, 100).
const K = 7, OX = 100, OY = 100;
const X = (u) => r2(OX + u * K);
const Y = (u) => r2(OY + u * K);
const INK = HEX.darkBlue;

function Label({ x, y, children, anchor = 'middle', size = 22, i = 0 }) {
  return (
    <text x={X(x)} y={Y(y)} fontSize={size} textAnchor={anchor} fill={INK} stroke={HEX.periwinkle} strokeWidth="6" paintOrder="stroke" strokeLinejoin="round" className="fade-in" style={{ '--i': 30 + i }}>
      {children}
    </text>
  );
}

// A dimension between (x1, y1) and (x2, y2) in units, with an end tick on each side.
function Dim({ x1, y1, x2, y2, i = 0 }) {
  const horizontal = y1 === y2;
  const t = 6;
  const tick = (x, y) => (horizontal ? `M${X(x)} ${Y(y) - t}V${Y(y) + t}` : `M${X(x) - t} ${Y(y)}H${X(x) + t}`);
  return (
    <path d={`M${X(x1)} ${Y(y1)}L${X(x2)} ${Y(y2)}${tick(x1, y1)}${tick(x2, y2)}`} fill="none" stroke={INK} strokeWidth="1.5" className="fade-in" style={{ '--i': 28 + i }} />
  );
}

// An extension line: dotted, from a measured edge to its dimension.
function Ext({ x1, y1, x2, y2 }) {
  return <path d={`M${X(x1)} ${Y(y1)}L${X(x2)} ${Y(y2)}`} stroke={INK} strokeWidth="1" strokeDasharray="3 4" fill="none" />;
}

export function ConstructionArt() {
  const h = MARK.B / 2;
  const wy = MARK.waist; // waist point (50, 20.9)
  const arcR = 14;
  const a = (Math.atan(MARK.slope) * 180) / Math.PI;
  const ar = (deg) => [r2(X(50) - arcR * K * Math.cos((deg * Math.PI) / 180)), r2(Y(wy) - arcR * K * Math.sin((deg * Math.PI) / 180))];
  const [ax0, ay0] = ar(0);
  const [ax1, ay1] = ar(a);
  const lines = markConstruction().filter((l) => l.kind === 'diagonal');
  return (
    <Art viewBox="0 0 900 900" title="Construction: the mark on its own grid, with units and angles" exportName="logo-construction" className={s.plate}>
      <rect width="900" height="900" fill={HEX.periwinkle} />
      <MarkG x={OX} y={OY} size={100 * K} fill={INK} />
      <g transform={`translate(${OX} ${OY})`}>
        <GuidesG w={100 * K} h={100 * K} xs={CENTRES.map((u) => r2(u * K))} ys={CENTRES.map((u) => r2(u * K))} stroke={HEX.activeBlue} weight={1} node={8} animate />
      </g>
      <g fill="none" stroke={HEX.activeBlue} strokeWidth="1" strokeDasharray="7 5">
        {lines.map((l) => (
          <path key={`${l.x1}-${l.y1}`} d={`M${X(l.x1)} ${Y(l.y1)}L${X(l.x2)} ${Y(l.y2)}`} />
        ))}
      </g>
      {[[0, 0], [100, 0], [0, 100], [100, 100]].map(([u, v]) => (
        <NodeG key={`${u}-${v}`} cx={X(u)} cy={Y(v)} s={9} fill={INK} />
      ))}

      {/* B: the width of the centre cross */}
      <Ext x1={50 - h} y1={14} x2={50 - h} y2={21.5} />
      <Ext x1={50 + h} y1={14} x2={50 + h} y2={21.5} />
      <Dim x1={50 - h} y1={14} x2={50 + h} y2={14} i={0} />
      <Label x={50} y={11} i={0}>B 5.23</Label>

      {/* P: the pitch, between the centre line and the next frame */}
      <Ext x1={86} y1={50} x2={95} y2={50} />
      <Ext x1={86} y1={50 + MARK.P} x2={95} y2={50 + MARK.P} />
      <Dim x1={93} y1={50} x2={93} y2={50 + MARK.P} i={1} />
      <Label x={95.5} y={50 + MARK.P / 2 + 2} anchor="start" i={1}>P 12.85</Label>

      {/* Waist, from the box edge to the concave point */}
      <Dim x1={0} y1={50} x2={wy} y2={50} i={2} />
      <Label x={wy / 2} y={46} i={2}>Waist 20.9</Label>

      {/* Slope of the star edge */}
      <Ext x1={27} y1={wy} x2={50} y2={wy} />
      <path d={`M${ax0} ${ay0}A${r2(arcR * K)} ${r2(arcR * K)} 0 0 1 ${ax1} ${ay1}`} fill="none" stroke={INK} strokeWidth="1.5" className="fade-in" style={{ '--i': 31 }} />
      <Label x={42} y={12} anchor="end" i={3}>{SLOPE_DEG} deg</Label>

      {/* Chamfer at the top-left tip */}
      <Ext x1={2.2} y1={1.2} x2={7} y2={-3} />
      <Label x={7.5} y={-3.2} anchor="start" i={4}>Chamfer 3.2</Label>

      {/* Centre lines, read from the left edge of the box */}
      <g fontSize="17" fill={INK} textAnchor="middle">
        {CENTRES.map((u, i) => (
          <g key={u}>
            <path d={`M${X(u)} ${Y(100) + 4}V${Y(100) + 14}`} stroke={INK} strokeWidth="1" />
            <text x={X(u)} y={Y(100) + 34}>{u.toFixed(2)}</text>
            <path d={`M${X(0) - 14} ${Y(u)}H${X(0) - 4}`} stroke={INK} strokeWidth="1" />
            <text x={X(0) - 20} y={Y(u) + 6} textAnchor="end" className="fade-in" style={{ '--i': 40 + i }}>{u.toFixed(2)}</text>
          </g>
        ))}
      </g>
      <text x={OX} y="44" fontSize="19" fill={INK}>1 u = 1/100 of the mark width</text>
      <text x={OX} y="880" fontSize="17" fill={INK}>Diagonals on y = x and y = 100 - x, half band {MARK.diag}</text>
    </Art>
  );
}

export default function Construction() {
  return (
    <div className={s.constr}>
      <Reveal>
        <figure className={s.fig}>
          <ConstructionArt />
          <figcaption className={s.cap}><span>Construction</span><span>Units of the mark box, centre lines in Active Blue</span></figcaption>
        </figure>
      </Reveal>
      <Reveal delay={80}>
        <div className="stack">
          <SpecTable
            caption="Construction values, in units"
            columns={['Name', 'Value', 'Reads as']}
            rows={CONSTRUCTION_ROWS.map((r) => ({ key: r.key, head: r.head, num: r.num, cells: [<span key="w" className="t-small muted">{r.what}</span>] }))}
            compact
          />
          <div className={s.ratios}>
            {RATIOS.map((r) => (
              <div key={r.key} className="stack">
                <p className="t-label">{r.head}</p>
                <Numeral value={r.num} size="s" />
                <p className="t-small muted">{r.what}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
