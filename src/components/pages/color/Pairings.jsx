import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import CopyValue from '@/components/site/CopyValue';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { PAIRS, TESTER, ratio, ratioText, grade } from './data';
import s from './color.module.css';

// Six accessible pairings as a 3 x 2 of half-and-half cells: each pair is read both ways. The ratio and level are
// computed from the two hex values; nothing here is typed.
export function PairGrid() {
  return (
    <ul className={s.pairs}>
      {PAIRS.map((p, i) => (
        <li key={p.id} className={s.pair} style={{ '--i': i }}>
          <div className={s.pairFace}>
            <span className={s.half} style={{ background: p.b[1], color: p.a[1] }}>
              <span className={s.aa}>Aa</span>
              <span className={s.pairTag}>{p.a[0]}</span>
            </span>
            <span className={s.half} style={{ background: p.a[1], color: p.b[1] }}>
              <span className={s.aa}>Aa</span>
              <span className={s.pairTag}>{p.b[0]}</span>
            </span>
          </div>
          <div className={s.pairInfo}>
            <span className="t-num t-num-s">{ratioText(p.r)}</span>
            <span className="t-small">
              <b>{grade(p.r)}</b> for small text. {p.use}.
            </span>
            <span className="t-small muted">
              <CopyValue value={p.a[1]} label={`${p.a[0]} hex`} /> on <CopyValue value={p.b[1]} label={`${p.b[0]} hex`} />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

// The six pairings as one sheet (exportable): each cell two halves with its ratio.
export function PairSheet() {
  const cw = 440;
  const ch = 300;
  const W = cw * 3;
  const H = ch * 2;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Six accessible pairings with computed contrast ratios" exportName="color-pairings">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      {PAIRS.map((p, i) => {
        const x = (i % 3) * cw;
        const y = Math.floor(i / 3) * ch;
        return (
          <g key={p.id} className="fade-in" style={{ '--i': i * 2 }}>
            <rect x={x + 20} y={y + 20} width={(cw - 40) / 2} height={ch - 100} fill={p.b[1]} />
            <rect x={x + 20 + (cw - 40) / 2} y={y + 20} width={(cw - 40) / 2} height={ch - 100} fill={p.a[1]} />
            <text x={x + 36} y={y + 120} fontSize="76" className="display" fill={p.a[1]}>Aa</text>
            <text x={x + 36 + (cw - 40) / 2} y={y + 120} fontSize="76" className="display" fill={p.b[1]}>Aa</text>
            <text x={x + 36} y={y + ch - 46} fontSize="26" className="display" fill={HEX.darkBlue}>{ratioText(p.r)}</text>
            <text x={x + 36} y={y + ch - 22} fontSize="14" fill={HEX.darkBlue}>{`${p.a[0]} on ${p.b[0]} · ${grade(p.r)}`}</text>
          </g>
        );
      })}
    </Art>
  );
}

// The contrast matrix (exportable): every colour of the tester as type (rows) on every ground (columns).
export function Matrix() {
  const n = TESTER.length;
  const cell = 120;
  const head = 130;
  const W = head + n * cell;
  const H = head + n * 62;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Contrast matrix: each colour as type on each ground, computed" exportName="color-matrix">
      <rect width={W} height={H} fill={HEX.paper} />
      {TESTER.map(([name], i) => (
        <g key={name}>
          <text x={head + i * cell + cell / 2} y={head - 16} fontSize="13" textAnchor="middle" fill={HEX.darkBlue}>{name}</text>
          <text x="12" y={head + i * 62 + 36} fontSize="13" fill={HEX.darkBlue}>{name}</text>
        </g>
      ))}
      {TESTER.flatMap(([, fg], r) =>
        TESTER.map(([, bg], c) => {
          const v = ratio(fg, bg);
          return (
            <g key={`${r}-${c}`} className="fade-in" style={{ '--i': r + c }}>
              <rect x={head + c * cell} y={head + r * 62} width={cell} height="62" fill={bg} stroke={HEX.darkBlue} strokeWidth="0.6" />
              <text x={head + c * cell + cell / 2} y={head + r * 62 + 38} fontSize="19" textAnchor="middle" fill={fg}>{v >= 4.5 ? ratioText(v) : `${v.toFixed(1)}`}</text>
              {v >= 4.5 && <rect x={head + c * cell + 6} y={head + r * 62 + 6} width="6" height="6" fill={fg} />}
            </g>
          );
        }),
      )}
      <NodeG cx={head} cy={head} s={9} fill={HEX.darkBlue} />
      <NodeG cx={W} cy={H} s={9} fill={HEX.darkBlue} />
      <text x="12" y="34" fontSize="13" fill={HEX.darkBlue}>Type (rows) on ground (columns)</text>
      <text x="12" y="54" fontSize="13" fill={HEX.darkBlue}>A square marks 4.5:1 or more</text>
      <text x={r2(W - 12)} y="34" fontSize="13" textAnchor="end" fill={HEX.darkBlue}>Under 4.5 shown without the :1</text>
    </Art>
  );
}
