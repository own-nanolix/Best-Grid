import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import { SpecTable } from '@/components/ui/Spec';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { SCALE } from './data';
import s from './typography.module.css';

const em = (n) => (n === 0 ? '0' : `${n > 0 ? '+' : ''}${n}`);

// The full scale as a spec table: the first column prints each size at that size.
export function ScaleTable() {
  return (
    <SpecTable
      id="typography-scale-table"
      caption="Type scale, px"
      columns={['Size', 'Role', 'Leading', 'Tracking, em', 'Use', 'Origin']}
      rows={SCALE.map((r) => ({
        key: r.px,
        num: (
          <span className={s.printed} style={{ fontSize: r.px, letterSpacing: `${r.ls}em` }}>
            {r.px}
          </span>
        ),
        head: r.role,
        cells: [r.lh.toFixed(2), em(r.ls), r.use, r.origin],
      }))}
      numFirst
    />
  );
}

// The scale as one drawing (exportable): a brand line at each size, baselines on a hairline, a node at the left.
export function ScaleArt() {
  const W = 1200;
  const gap = 20;
  const rows = SCALE.map((r) => ({ ...r, h: Math.round(r.px * 1.05) + gap }));
  const ys = rows.reduce((acc, r) => [...acc, (acc[acc.length - 1] || 56) + r.h], []);
  const H = ys[ys.length - 1] + 30;
  const text = (r) => (r.px >= 96 ? 'Aa' : r.px >= 64 ? 'Aa Bb' : r.px >= 44 ? LINES.web.rows[0] : r.px >= 28 ? LINES.hero.rows[0] : LINES.hero.text);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Type scale: ten sizes from 11 to 160 pixels, each set at its size" exportName="typography-scale">
      <rect width={W} height={H} fill={HEX.paper} />
      <text x="36" y="34" fontSize="14" fill={HEX.blueInk}>Size, px</text>
      {rows.map((r, i) => {
        const y = ys[i];
        return (
          <g key={r.px} className="fade-in" style={{ '--i': i }}>
            <rect x="0" y={r2(y + 6)} width={W} height="0.8" fill={HEX.darkBlue} opacity="0.35" />
            <NodeG cx="18" cy={r2(y + 6.4)} s={6} fill={HEX.darkBlue} />
            <text x="36" y={y} fontSize={Math.min(r.px, 28)} fill={HEX.blueInk}>{r.px}</text>
            <text x="150" y={y} fontSize={r.px} letterSpacing={r2(r.px * r.ls)} fill={HEX.darkBlue} className={r.px >= 44 ? 'display' : undefined} lang="es">
              {text(r)}
            </text>
          </g>
        );
      })}
    </Art>
  );
}
