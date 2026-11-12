import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { SpecTable } from '@/components/ui/Spec';
import Explorer from '@/components/pages/feature/Explorer';
import { TilesSheet, DiagramSvg } from '@/components/pages/feature/StaticArt';
import { USED } from '@/components/pages/feature/data';
import s from '@/components/pages/feature/feature.module.css';

export const metadata = pageMeta('feature');

const KEYS = [
  ['Move the cursor over the node grid', 'Arrow keys'],
  ['Jump to the first or last column', 'Home, End'],
  ['Clear the node cursor', 'Escape'],
  ['Choose a quarter, a tile, a year', 'Tab, then Enter'],
  ['Choose a treemap part', 'Tab, then Enter or Space'],
  ['Pause or resume the tour', 'Tab to the button, then Enter'],
];

const RULES = [
  ['Print only what is printed', 'Every figure on the desk is a figure of the case study, shown beside the thing it is printed for. Nothing is added up, averaged or estimated.'],
  ['Empty means empty', 'Only 2025 has figures. 2023 and 2024 open a quiet empty state in the chart, the total, the KPI cells and the treemap.'],
  ['Nodes are places, not values', 'A node cell has a position and one of two strengths of Active Blue. It has no name, no place and no figure.'],
];

export default function Page() {
  const rows = USED.map((u) => ({
    key: u.key,
    head: u.head,
    cells: [u.where, <span key="v" lang={u.key === 'years' ? undefined : 'es'}>{u.values.join(' · ')}</span>],
  }));
  return (
    <section className="page" id="p-feature" aria-label="Grid-node capacity explorer">
      <div className="wrap">
        <div className={s.sheet}>
          <header className={s.head}>
            <div className={s.headTitle}>
              <p className="t-label">Product</p>
              <h1 tabIndex={-1} className="t-h1 t-balance">Grid-node capacity explorer</h1>
            </div>
            <p className={`${s.headText} t-lead`}>
              The phone dashboard and the technology tiles of the case study, made to work. Choose a year, a quarter, a technology, a part of the treemap or a node cell, or let the tour read the printed lines aloud.
            </p>
          </header>

          <Reveal className={s.sec}>
            <Explorer />
          </Reveal>

          <Reveal className={s.sec}>
            <div className={s.secHead}>
              <h2 className="t-h2">How the parts connect</h2>
              <p className="t-small muted">Five inputs write one selection. Five outputs read it. The tour writes it too.</p>
            </div>
            <div className={s.two}>
              <figure className={`${s.plate} ${s.twoA}`}>
                <DiagramSvg />
                <figcaption>Diagram of the explorer. Exportable as SVG.</figcaption>
              </figure>
              <div className={s.twoB}>
                <figure className={s.plate}>
                  <TilesSheet />
                  <figcaption lang="es">Fotovoltaico, Eólico, Almacenamiento, Data Centers: the stats row of the website, as printed.</figcaption>
                </figure>
                <div>
                  <h3 className="t-h3">Keyboard</h3>
                  <ul className={s.keys}>
                    {KEYS.map(([what, key]) => (
                      <li key={what}>
                        <span>{what}</span>
                        <kbd>{key}</kbd>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className={s.sec}>
            <div className={s.secHead}>
              <h2 className="t-h2">Figures on this page</h2>
              <p className="t-small muted">Each figure and the image it is printed on.</p>
            </div>
            <SpecTable caption="Printed figures used by the explorer" columns={['Part', 'Printed on', 'Figures']} rows={rows} />
            <ul className={s.rules}>
              {RULES.map(([t, d]) => (
                <li key={t}>
                  <h3 className="t-h3">{t}</h3>
                  <p className="t-small muted">{d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
