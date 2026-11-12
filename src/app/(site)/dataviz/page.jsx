import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Lead from '@/components/pages/dataviz/Lead';
import { StepCard, ColumnsCard, TreemapCard, RingCard, StripCard, BulletCard } from '@/components/pages/dataviz/ChartsA';
import { TimelineCard, CumulativeCard, SankeyCard, LollipopCard, WaffleCard, RadarCard, GaugeCard } from '@/components/pages/dataviz/ChartsB';
import { NodeFieldCard, MarkHolesCard, SitePagesCard } from '@/components/pages/dataviz/ChartsC';
import { StatCards, KpiTiles, Sparklines } from '@/components/pages/dataviz/Tiles';
import { ChartCard } from '@/components/pages/dataviz/kit';
import { Counters } from '@/components/pages/dataviz/Parts';
import Parts from '@/components/pages/dataviz/Parts';
import DataTable from '@/components/pages/dataviz/Table';
import s from '@/components/pages/dataviz/dataviz.module.css';

export const metadata = pageMeta('dataviz');

const RULES = [
  ['Print only what is printed', 'Every figure comes from the case study, is computed from those figures, or comes from the mark and the site themselves. Every chart names its source.'],
  ['Empty means empty', 'The case study prints figures for 2025 only. 2023 and 2024 show a quiet empty state, never a made-up value.'],
  ['Two blues and a ground', 'Active Blue is the current series, Dark Blue is context, Light Blue and periwinkle are the field. No other hue carries data.'],
  ['Cells, lines and nodes', 'Square marks, hairline gridlines and a node at every data point. Corners are square; the year chip is the only round shape.'],
  ['Spanish figures, English words', 'Numbers keep the printed Spanish format (15.420 MW). Brand labels keep their language; axis words and captions are English.'],
  ['Motion lands on the finished chart', 'Lines extend, nodes snap, cells fill, nothing bounces. The final state is the drawn artwork, also with reduced motion.'],
];

export default function Page() {
  return (
    <section className="page" id="p-dataviz" aria-label="Data visualisation">
      <div className="wrap">
        <div className={s.sheet}>
          <header className={s.head}>
            <div className={s.headTitle}>
              <p className="t-label">Brand foundations</p>
              <h1 tabIndex={-1} className="t-h1 t-balance">Data visualisation</h1>
            </div>
            <p className={`${s.headText} t-lead`}>
              Charts drawn on the grid of the mark. The case study prints one set of figures; here they are rebuilt as printed, then shown again in other honest forms.
            </p>
          </header>

          <Reveal className={s.sec}>
            <div className={s.grid12}>
              <Lead />
              <div className={s.rail}>
                <Counters />
                <ChartCard id="dataviz-spark" kind="Sparklines" title="Small forms" span="rail" caption="The printed quarters, running total and technologies as four tiny marks." source="phone and website figures">
                  <Sparklines />
                </ChartCard>
              </div>
            </div>
          </Reveal>

          <Reveal className={s.sec}>
            <div className={s.secHead}>
              <h2 className="t-h2">Stat cards and KPI tiles</h2>
              <p className="t-small muted">Printed figures only: tiles of the website, cells of the phone.</p>
            </div>
            <div className={`cells ${s.cells4}`}><StatCards /></div>
            <div className={`cells ${s.cells3}`}><KpiTiles /></div>
          </Reveal>

          <section className={s.sec} aria-labelledby="dataviz-charts-h">
            <div className={s.secHead}>
              <h2 className="t-h2" id="dataviz-charts-h">Sixteen chart types</h2>
              <p className="t-small muted">Hover or focus a mark for its value.</p>
            </div>
            <div className={s.grid12}>
              <SankeyCard />
              <RingCard />
              <GaugeCard />
              <StepCard />
              <ColumnsCard />
              <TreemapCard />
              <LollipopCard />
              <StripCard />
              <BulletCard />
              <RadarCard />
              <TimelineCard />
              <WaffleCard />
              <MarkHolesCard />
              <CumulativeCard />
              <NodeFieldCard />
              <SitePagesCard />
            </div>
          </section>

          <Reveal className={s.sec}>
            <div className={s.secHead}>
              <h2 className="t-h2">Data table</h2>
            </div>
            <DataTable />
          </Reveal>

          <Reveal className={s.sec}>
            <div className={s.secHead}>
              <h2 className="t-h2">Components and states</h2>
            </div>
            <Parts />
          </Reveal>

          <Reveal className={s.sec}>
            <div className={s.secHead}>
              <h2 className="t-h2">Chart rules</h2>
            </div>
            <ol className={s.rules}>
              {RULES.map(([title, text], i) => (
                <li key={title}>
                  <span className={s.ruleNum} aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="t-h3">{title}</h3>
                    <p className="t-small muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
