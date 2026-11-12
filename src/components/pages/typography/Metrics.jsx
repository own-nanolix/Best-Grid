import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { METRICS } from './data';

// Metrics study: a word set large, with the five horizontal lines of the type (ascender, cap height, x-height,
// baseline, descender) running edge to edge, a node at each end, and the measures in em. The measures are those
// of the closest free match the site sets the type in.
export function MetricsArt() {
  const W = 1500;
  const H = 560;
  const size = 190;
  const base = 330;
  const lines = [
    { k: 'Ascender', em: METRICS.asc, y: base - METRICS.asc * size, off: -8 },
    { k: 'Cap height', em: METRICS.cap, y: base - METRICS.cap * size, off: 21 },
    { k: 'x-height', em: METRICS.x, y: base - METRICS.x * size, off: 21 },
    { k: 'Baseline', em: 0, y: base, off: -8 },
    { k: 'Descender', em: -METRICS.desc, y: base + METRICS.desc * size, off: 21 },
  ];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Type metrics: ascender, cap height, x-height, baseline and descender on a large word" exportName="typography-metrics">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      <text x="270" y={base} fontSize={size} letterSpacing="-4" fill={HEX.darkBlue} className="display slide-up">Typographic</text>
      {lines.map((l, i) => (
        <g key={l.k}>
          <rect x="0" y={r2(l.y - 0.5)} width={W} height="1" fill={HEX.darkBlue} className="extend-x" style={{ '--i': i }} />
          <NodeG cx="40" cy={r2(l.y)} s={8} fill={HEX.darkBlue} className="snap" style={{ '--i': i }} />
          <NodeG cx={W - 40} cy={r2(l.y)} s={8} fill={HEX.darkBlue} className="snap" style={{ '--i': i }} />
          <text x="60" y={r2(l.y + l.off)} fontSize="16" fill={HEX.blueInk} className="fade-in" style={{ '--i': i + 6 }}>
            {`${l.k} ${l.em === 0 ? '0' : `${l.em > 0 ? '+' : '-'}${Math.abs(l.em).toFixed(3)} em`}`}
          </text>
        </g>
      ))}
      <g fill={HEX.darkBlue} className="fade-in" style={{ '--i': 12 }}>
        <rect x="1462" y={r2(base - size)} width="1.2" height={size} />
        <rect x="1454" y={r2(base - size)} width="18" height="1.2" />
        <rect x="1454" y={base} width="18" height="1.2" />
      </g>
      <text x="1456" y={base + 70} fontSize="16" textAnchor="end" fill={HEX.blueInk}>1 em</text>
      <text x="60" y="500" fontSize="16" fill={HEX.blueInk}>{`Set at ${size} units; every measure is a share of that size.`}</text>
    </Art>
  );
}

// Leading study: a three-line headline with its baselines drawn as hairlines and the pitch between them.
export function LeadingArt() {
  const W = 1400;
  const size = 96;
  const lh = 1.12;
  const pitch = size * lh;
  const rows = LINES.web.rows;
  const y0 = 150;
  const H = y0 + pitch * 2 + 140;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Leading: three baselines at 1.12 times the size" exportName="typography-leading">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      {rows.map((t, i) => {
        const y = r2(y0 + i * pitch);
        return (
          <g key={t}>
            <rect x="0" y={r2(y - 0.5)} width={W} height="1" fill={HEX.activeBlue} className="extend-x" style={{ '--i': i }} />
            <NodeG cx="40" cy={y} s={8} fill={HEX.activeBlue} className="snap" style={{ '--i': i }} />
            <text x="120" y={y} fontSize={size} letterSpacing={r2(size * -0.01)} fill={HEX.lightBlue} className="display slide-up" style={{ '--i': i + 2 }} lang="es">{t}</text>
          </g>
        );
      })}
      <g className="fade-in" style={{ '--i': 8 }} fill={HEX.activeBlue}>
        <rect x="1100" y={y0} width="1.2" height={r2(pitch)} />
        <rect x="1092" y={y0} width="18" height="1.2" />
        <rect x="1092" y={r2(y0 + pitch)} width="18" height="1.2" />
        <text x="1120" y={r2(y0 + pitch / 2 + 6)} fontSize="20">{`${r2(pitch)} = ${lh} x ${size}`}</text>
        <text x="120" y={H - 40} fontSize="17" fill={HEX.mutedOnDark}>Leading 1.12 as in the case study&apos;s headlines; body sits near 1.3.</text>
      </g>
    </Art>
  );
}
