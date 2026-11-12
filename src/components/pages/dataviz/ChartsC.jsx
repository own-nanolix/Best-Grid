'use client';

import { HEX } from '@/lib/brand';
import { MarkG } from '@/components/art/Mark';
import { NodeGridG } from '@/components/art/KeyArt';
import { HOLE_KINDS, GROUPS, MIN_EXPORTS, INK, BLUE, MUTED } from './data';
import { ChartCard, Chart, T, useTip, useHover } from './kit';

// 10. Place: the m17 node grid as the form of a place chart. The case study prints no per-node values and no map,
// so the cells carry no figures: the shape only.
function NodeField() {
  const bind = useTip();
  return (
    <Chart name="place-node-grid" title="Place: the node grid, shape only">
      <g {...bind('Node grid: shape only, no per-node figures are published')}>
        <NodeGridG x={32} y={24} cols={12} rows={9} size={28} seed={5} clusters={8} animate />
      </g>
    </Chart>
  );
}

// 15. Distribution of the mark's own geometry: its 20 holes by kind, counted from the construction.
function MarkHoles() {
  const bind = useTip();
  const total = HOLE_KINDS.reduce((a, k) => a + k.n, 0);
  return (
    <Chart name="distribution-mark-holes" title="Distribution: the holes of the mark by shape">
      <MarkG x={22} y={74} size={152} fill={INK} className="fade-in" />
      {HOLE_KINDS.map((k, i) => (
        <g key={k.key} {...bind(`${k.label}: ${k.n} of ${total} holes`)}>
          <T size={13} x="204" y={84 + i * 48}>{k.label}</T>
          <rect x="204" y={92 + i * 48} width={k.n * 14} height="18" fill={BLUE} className="grow-x" style={{ '--i': i }} />
          <T size={16} x={204 + k.n * 14 + 8} y={107 + i * 48}>{k.n}</T>
        </g>
      ))}
      <T size={42} x="204" y="266" className="display">{total}</T>
      <T size={13} x="272" y="266" fill={MUTED}>holes in all</T>
    </Chart>
  );
}

const GROUP_FILL = [
  { fill: INK, stroke: INK },
  { fill: BLUE, stroke: BLUE },
  { fill: HEX.periwinkle, stroke: INK },
  { fill: HEX.paper, stroke: INK },
];

// 16. The site's own structure: its 30 pages as cells, coloured by group (pages.json).
function SitePages() {
  const bind = useTip();
  const hover = useHover();
  const starts = GROUPS.map((_, gi) => GROUPS.slice(0, gi).reduce((a, g) => a + g.n, 0));
  return (
    <Chart name="structure-pages" title="Structure: the 30 pages by group" w={600} h={300}>
      {GROUPS.map((g, gi) => (
        <g key={g.name} {...bind(`${g.name}: ${g.n} pages`)}>
          {g.pages.map((p, pi) => {
            const i = starts[gi] + pi, c = i % 10, r = Math.floor(i / 10);
            return (
              <rect key={p.id} x={30 + c * 54} y={30 + r * 54} width="44" height="44" fill={GROUP_FILL[gi].fill} stroke={GROUP_FILL[gi].stroke} strokeWidth="1" className="fill-in" style={{ '--i': i % 12 }} {...hover(`${p.title}: at least ${p.minExports} exports`)} />
            );
          })}
        </g>
      ))}
      {GROUPS.map((g, gi) => (
        <g key={g.name}>
          <rect x={30 + (gi % 2) * 280} y={206 + Math.floor(gi / 2) * 36} width="14" height="14" fill={GROUP_FILL[gi].fill} stroke={GROUP_FILL[gi].stroke} />
          <T size={13} x={54 + (gi % 2) * 280} y={218 + Math.floor(gi / 2) * 36}>{g.name}, {g.n} pages</T>
        </g>
      ))}
      <T size={12} x="30" y="288" fill={MUTED}>30 pages, {GROUPS.length} groups, at least {MIN_EXPORTS} exportable SVGs in all</T>
    </Chart>
  );
}

export const NodeFieldCard = () => (
  <ChartCard id="dataviz-place" kind="Place" title="Node grid" caption="The brand's own place form: square cells in two blues. The case study prints no map and no per-node values, so the cells carry no figures." source="phone node grid, shape only">
    <NodeField />
  </ChartCard>
);
export const MarkHolesCard = () => (
  <ChartCard id="dataviz-holes" kind="Distribution" title="Holes of the mark" caption="Triangles, trapezoids and squares in the mark's lattice: 5 in each quadrant, counted from the construction." source="the mark's own geometry">
    <MarkHoles />
  </ChartCard>
);
export const SitePagesCard = () => (
  <ChartCard id="dataviz-structure" kind="Structure" title="Pages by group" span={6} caption="Each cell is one page of this site; the tooltip gives its minimum number of exportable graphics." source="the site's page list">
    <SitePages />
  </ChartCard>
);
