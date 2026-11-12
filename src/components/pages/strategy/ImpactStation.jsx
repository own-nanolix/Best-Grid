// Station 04, the impact as the case study shows it: the three KPI cells, the 2025 treemap of managed capacity and
// the node grid of the second screen. Figures only as printed: 128, 46, 72, 68% and 16%. The Dark Blue remainder of
// the treemap carries no label or figure in the case study, and the node grid carries no value in any cell.
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { Numeral } from '@/components/ui/Spec';
import { CAPACITY } from '@/lib/brand';
import { KPIS, STATIONS } from './data';
import { Station } from './Timeline';
import Treemap from './Treemap';
import NodeGrid from './NodeGrid';
import s from './strategy.module.css';

export default function ImpactStation() {
  const st = STATIONS[3];
  const [dev, cons] = CAPACITY.treemap.parts;
  return (
    <Station {...st}>
      <Reveal>
        <div className={`cells ${s.kpis}`} style={{ '--cols': 3 }}>
          {KPIS.map((k, i) => (
            <div key={k.label} className={s.kpi} style={{ '--i': i }}>
              <p className="t-small" lang="es">
                {k.label}
              </p>
              <p className="t-num t-num-l ink" lang="es">
                <CountUp value={String(k.value)} lang="es" />
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={s.chartRow}>
        <Reveal as="div" className={s.treeMain}>
          <figure className={s.plate}>
            <div className={s.plateArt}>
              <Treemap />
            </div>
            <figcaption className={s.plateCap}>
              <span lang="es">
                {CAPACITY.treemap.year} · {CAPACITY.treemap.title}
              </span>
              <span className="muted">The dark remainder has no label or figure in the case study.</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className={s.chartSide}>
          <Reveal delay={60}>
            <p className="t-label" lang="es">
              {dev.labelRows.join(' ')}
            </p>
            <Numeral value={String(dev.pct)} sup="%" size="xl" className="ink" lang="es" />
          </Reveal>
          <Reveal delay={120}>
            <p className="t-label" lang="es">
              {cons.labelRows.join(' ')}
            </p>
            <Numeral value={String(cons.pct)} sup="%" size="l" className="ink" lang="es" />
          </Reveal>
        </div>
      </div>

      <Reveal>
        <figure className={`${s.plate} ${s.plateNarrow}`}>
          <div className={s.plateArt}>
            <NodeGrid />
          </div>
          <figcaption className={s.plateCap}>
            <span lang="es">{CAPACITY.nodesTitle}</span>
            <span className="muted">Cells carry no values: the case study prints none.</span>
          </figcaption>
        </figure>
      </Reveal>
    </Station>
  );
}
