// Station 02, the research figures: every figure the case study prints for capacity, each attached to what it is
// printed beside. The quarters and the total are the phone dashboard's; the four technologies are the website's.
// 2025 is the only year with figures; the 2023 and 2024 chips are shown inactive, with no values.
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import { PixelIcon } from '@/components/site/Icon';
import { SpecTable } from '@/components/ui/Spec';
import { CAPACITY } from '@/lib/brand';
import { QUARTERS, STATIONS, TILES } from './data';
import { Station } from './Timeline';
import CapacityArea from './CapacityArea';
import TechBars from './TechBars';
import s from './strategy.module.css';

export default function ResearchStation() {
  const st = STATIONS[1];
  return (
    <Station {...st}>
      <Reveal>
        <p className={`t-lead ${s.lede}`}>
          Two sets of figures: the capacity managed across the four quarters of 2025, and the capacity of each technology.
        </p>
      </Reveal>

      <div className={s.chartRow}>
        <Reveal as="div" className={s.chartMain}>
          <figure className={s.plate}>
            <div className={s.plateArt}>
              <CapacityArea />
            </div>
            <figcaption className={s.plateCap}>
              <span lang="es">{CAPACITY.title}</span>
              <span className="muted">Four published quarter figures; the line between them is drawn, not measured.</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className={s.chartSide}>
          <Reveal delay={60}>
            <p className="t-label" lang="es">
              {CAPACITY.totalLabel}
            </p>
            <p className={`t-num t-num-m ${s.total}`} lang="es">
              <CountUp value="15.420" lang="es" />
              <span className={s.unit}>MW</span>
            </p>
            <p className="t-small muted">The sum of the four quarters.</p>
          </Reveal>
          <Reveal delay={120}>
            <SpecTable
              compact
              caption="Quarters, 2025"
              columns={['Quarter', 'Capacity']}
              rows={QUARTERS.map((q) => ({
                key: q.q,
                head: <span lang="es">{q.q}</span>,
                cells: [<span key="v" lang="es" className={s.qFigure}>{q.value}</span>],
              }))}
            />
          </Reveal>
          <Reveal delay={180}>
            <div className={s.years}>
              <ul className="row" aria-label="Years">
                {CAPACITY.years.map((y) => (
                  <li key={y} className={`chip ${y === CAPACITY.year ? 'chip-active' : ''}`} aria-current={y === CAPACITY.year ? 'true' : undefined}>
                    {y}
                  </li>
                ))}
              </ul>
              <p className="t-small muted">Figures are printed for 2025 only.</p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div className={`cells ${s.tiles}`} style={{ '--cols': 4 }}>
          {TILES.map((t, i) => (
            <div key={t.key} className={`${s.tile} ${t.highlight ? 'cell-fill' : ''}`} style={{ '--i': i }}>
              <PixelIcon name={t.icon} size={40} />
              <p className="t-small" lang="es">
                {t.label}
              </p>
              <p className="t-num t-num-s" lang="es">
                <CountUp value={t.value.replace(' MW', '')} lang="es" />
                <span className={s.unit}>MW</span>
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={60}>
        <figure className={s.plate}>
          <div className={s.plateArt}>
            <TechBars />
          </div>
          <figcaption className={s.plateCap}>
            <span>The four technologies, each bar scaled to its own figure.</span>
            <span className="muted">The case study prints no total for these four.</span>
          </figcaption>
        </figure>
      </Reveal>
    </Station>
  );
}
