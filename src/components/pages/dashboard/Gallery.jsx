'use client';

import { useState } from 'react';
import Reveal from '@/components/site/Reveal';
import { CAPACITY } from '@/lib/brand';
import { AreaPlot, AreaChart, TreemapChart, NodeGrid, BarsChart, KpiCells, Thumb, Frame, QUARTER_ITEMS, TECH_ITEMS } from './charts';
import { STRUCTS } from './data';
import s from './dashboard.module.css';

// The drawings used on the screens, each exportable as its own SVG, and one thumbnail diagram per structure.
export default function Gallery() {
  const [q, setQ] = useState(2);
  const [part, setPart] = useState('dev');
  const [tq, setTq] = useState('Q3');
  const [tt, setTt] = useState('solar');
  return (
    <div className={s.gallery}>
      <Reveal className={s.gWide}>
        <AreaPlot idp="dashboard-g-area" exportName="dashboard-area-chart" w={900} h={380} active={q} onPick={setQ} />
        <p className="t-small muted">Area chart, {CAPACITY.year}. Hover or focus a quarter.</p>
      </Reveal>
      <Reveal delay={60}>
        <Frame w={400} h={140}><AreaChart idp="dashboard-g-mini" w={400} h={140} compact active={q} exportName="dashboard-area-mini" title="Area chart, compact" /></Frame>
        <p className="t-small muted">Compact area, as in the quarter cells.</p>
      </Reveal>
      <Reveal delay={120}>
        <TreemapChart idp="dashboard-g-tm" exportName="dashboard-treemap" w={400} h={400} faithful sel={part} onPick={setPart} />
        <p className="t-small muted">Treemap, 2025, laid out as printed. The Dark Blue remainder has no label and no figure.</p>
      </Reveal>
      <Reveal delay={60} className={s.gWide}>
        <div className={s.gNode}><NodeGrid exportName="dashboard-node-grid" /></div>
        <p className="t-small muted">Node grid. Cells carry no figures.</p>
      </Reveal>
      <Reveal delay={120}>
        <BarsChart items={QUARTER_ITEMS} max={CAPACITY.axisMax} w={520} sel={tq} onPick={setTq} exportName="dashboard-quarter-bars" title="Quarter bars, 2025" />
        <p className="t-small muted">Quarter bars, to the 7.000 MW axis.</p>
      </Reveal>
      <Reveal delay={180}>
        <BarsChart items={TECH_ITEMS} max={12157} w={520} sel={tt} onPick={setTt} exportName="dashboard-tech-bars" title="Capacity per technology" />
        <p className="t-small muted">Technology bars, to the largest tile.</p>
      </Reveal>
      <Reveal delay={60} className={s.gWide}>
        <KpiCells exportName="dashboard-kpi-cells" />
      </Reveal>
      {STRUCTS.map((x, i) => (
        <Reveal key={x.id} delay={i * 40}>
          <Thumb kind={x.id} exportName={`dashboard-structure-${x.id}`} title={`Option ${x.id.toUpperCase()}: ${x.name}`} />
          <p className="t-small muted">Option {x.id.toUpperCase()}, {x.name.toLowerCase()}.</p>
        </Reveal>
      ))}
    </div>
  );
}
