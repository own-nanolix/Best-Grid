'use client';

// The node explorer: one working desk. The node grid (m17 back phone) is the large left panel; the right column holds
// the year chips, the quarter chart, the total, the KPI cells and the treemap (m17 front phone); the four technology
// tiles of the website (m16) run along the bottom. A guided tour with typed captions drives the same selection.
import { useEffect, useState } from 'react';
import Typewriter from '@/components/site/Typewriter';
import Icon, { PixelIcon } from '@/components/site/Icon';
import { Segmented } from '@/components/ui/Toggle';
import { Placeholder } from '@/components/ui/Card';
import { Numeral } from '@/components/ui/Spec';
import { CAPACITY, TECH } from '@/lib/brand';
import { es } from '@/lib/charts';
import { still } from '@/lib/site';
import { GridSvg, ChartSvg, TreemapSvg, CHART_TIP_X } from './ExplorerArt';
import { NODE, Q, KPIS, PARTS, MAX_TECH, INIT, STEPS, TOUR, IDLE_TEXT, cellTip, STRENGTH, CELLS, partLine } from './data';
import s from './feature.module.css';

const TOTAL_NUM = es(CAPACITY.total);

function Tip({ x, y, children }) {
  return (
    <div className={s.tip} style={{ left: `clamp(90px, ${x}%, calc(100% - 90px))`, top: `${y}%` }} role="status">
      {children}
    </div>
  );
}

export default function Explorer() {
  const [sel, setSel] = useState(INIT);
  const [run, setRun] = useState(0);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [hovCell, setHovCell] = useState(null);
  const [gridFocus, setGridFocus] = useState(false);
  const [hovQ, setHovQ] = useState(null);
  const [hovPart, setHovPart] = useState(null);
  const [hovTech, setHovTech] = useState(null);
  const last = STEPS.length - 1;
  const has = sel.year === CAPACITY.year;
  const finished = !playing && step === last;

  // A visitor's action interrupts the tour; the view stays exactly where the visitor puts it.
  const touch = (patch) => {
    setPlaying(false);
    setSel((p) => ({ ...p, ...patch }));
  };

  // The tour: each step applies its selection changes at their offsets, then moves on. It always ends on the
  // finished view (2025, nothing selected) and its last caption.
  useEffect(() => {
    if (!playing || step < 0) return undefined;
    const st = STEPS[step];
    const fast = still();
    const ids = st.seq.map((q) => setTimeout(() => setSel({ ...INIT, ...q.sel }), fast ? 0 : q.at));
    const span = Math.max(...st.seq.map((q) => q.at)) + 600;
    const dwell = fast ? 450 : Math.max(st.text.length * TOUR.speed + TOUR.hold, span + TOUR.hold);
    ids.push(
      setTimeout(() => {
        if (step >= last) {
          setPlaying(false);
          setSel(INIT);
        } else setStep(step + 1);
      }, dwell),
    );
    return () => ids.forEach(clearTimeout);
  }, [playing, step, run, last]);

  const toggle = () => {
    if (playing) setPlaying(false);
    else if (step < 0 || finished) replay();
    else setPlaying(true);
  };
  const replay = () => {
    setSel(INIT);
    setStep(0);
    setRun((r) => r + 1);
    setPlaying(true);
  };
  const skip = () => {
    setPlaying(false);
    setSel(INIT);
    setStep(last);
    setRun((r) => r + 1);
  };

  // keyboard on the node grid: arrows move the cursor (and select), Home and End jump, Escape clears
  const onGridKey = (e) => {
    const cur = sel.cell || { r: 0, c: 0 };
    let { r, c } = cur;
    if (e.key === 'ArrowRight') c = Math.min(NODE.cols - 1, c + 1);
    else if (e.key === 'ArrowLeft') c = Math.max(0, c - 1);
    else if (e.key === 'ArrowDown') r = Math.min(NODE.rows - 1, r + 1);
    else if (e.key === 'ArrowUp') r = Math.max(0, r - 1);
    else if (e.key === 'Home') c = 0;
    else if (e.key === 'End') c = NODE.cols - 1;
    else if (e.key === 'Escape') {
      touch({ cell: null });
      return;
    } else if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    touch({ cell: { r, c } });
  };

  const text = step < 0 ? IDLE_TEXT : STEPS[step].text;
  const cellShown = hovCell || (gridFocus ? sel.cell : null);
  const cellInfo = cellShown ? cellTip(cellShown) : null;
  const qShown = hovQ;
  const partShown = hovPart;
  const tech = TECH.find((t) => t.key === sel.tech);
  const selCell = sel.cell ? CELLS.find((x) => x.r === sel.cell.r && x.c === sel.cell.c) : null;
  const partInfo = {
    dev: { x: 33, y: 55, text: has ? partLine(PARTS[0]) : '' },
    cons: { x: 83, y: 75, text: has ? partLine(PARTS[1]) : '' },
    rest: { x: 50, y: 20, text: 'The Dark Blue remainder: unlabelled in the case study, with no figure.' },
  };

  return (
    <div className={s.desk}>
      <section className={s.tour} aria-label="Guided tour">
        <div className={s.tourText}>
          <p className={`t-label ${s.tourLabel}`}>Guided tour <span aria-hidden="true">{'//'}</span> {step < 0 ? 'ready' : `line ${step + 1} of ${STEPS.length}`}</p>
          <Typewriter key={`${run}-${step}`} as="p" className={s.caption} text={text} speed={TOUR.speed} lang="es" />
          <p className="sr-only" aria-live="polite" lang="es">{text}</p>
        </div>
        <div className={s.ctls} role="group" aria-label="Tour controls">
          <button type="button" className={`${s.ctl} ${s.ctlMain}`} onClick={toggle} aria-pressed={playing}>
            <Icon name={playing ? 'pause' : 'play'} size={18} />
            <span>{playing ? 'Pause' : finished ? 'Play again' : step >= 0 ? 'Resume' : 'Play'}</span>
          </button>
          <button type="button" className={s.ctl} onClick={replay}>Replay</button>
          <button type="button" className={s.ctl} onClick={skip}>Skip to end</button>
        </div>
        <ol className={s.progress} aria-hidden="true">
          {STEPS.map((st, i) => (
            <li key={st.id} data-state={i === step ? 'now' : i < step || finished ? 'past' : 'next'} />
          ))}
        </ol>
      </section>

      <div className={s.panels}>
        <section className={s.panel} aria-labelledby="feature-grid-h">
          <header className={s.panelHead}>
            <h2 id="feature-grid-h" className="t-h3" lang="es">{CAPACITY.nodesTitle}</h2>
            <p className="t-small muted">Nodes carry no values: hover or use the arrow keys to read a cell.</p>
          </header>
          <div
            className={s.gridWrap}
            tabIndex={0}
            role="group"
            aria-label="Node grid. Arrow keys move the cursor, Escape clears it."
            onKeyDown={onGridKey}
            onFocus={() => setGridFocus(true)}
            onBlur={() => setGridFocus(false)}
          >
            <GridSvg cell={sel.cell} hov={hovCell} onHover={setHovCell} onPick={(cell) => touch({ cell })} />
            {cellInfo && (
              <Tip x={((cellShown.c + 0.5) / NODE.cols) * 100} y={(cellShown.r / NODE.rows) * 100}>
                <strong>{cellInfo.title}</strong>
                <br />
                {cellInfo.body}
              </Tip>
            )}
          </div>
        </section>

        <div className={s.col}>
          <div className={s.yearRow}>
            <h2 className="t-h3 sr-only">Year</h2>
            <Segmented id="feature-year" label="Year" options={CAPACITY.years} value={sel.year} onChange={(year) => touch({ year })} />
            <span className="t-small muted">{has ? 'Figures printed for 2025 only' : `No figures published for ${sel.year}`}</span>
          </div>

          <section className={s.panel} aria-labelledby="feature-chart-h">
            <header className={s.panelHead}>
              <h2 id="feature-chart-h" className="t-h3">Quarter chart</h2>
              <div className={s.qRow} role="group" aria-label="Quarter">
                {Q.map((p, i) => (
                  <button
                    key={p.q}
                    type="button"
                    className="chip chip-sm"
                    aria-pressed={sel.q === i}
                    onClick={() => touch({ q: sel.q === i ? null : i })}
                    onPointerEnter={() => setHovQ(i)}
                    onPointerLeave={() => setHovQ(null)}
                    onFocus={() => setHovQ(i)}
                    onBlur={() => setHovQ(null)}
                  >
                    {p.q}
                  </button>
                ))}
              </div>
            </header>
            <div className={s.chartWrap}>
              <ChartSvg year={sel.year} q={sel.q} onPick={(i) => touch({ q: sel.q === i ? null : i })} onHover={setHovQ} />
              {qShown !== null && (
                <Tip x={CHART_TIP_X[qShown]} y={24}>
                  {has ? `${Q[qShown].q}: ${Q[qShown].value}` : `${Q[qShown].q}: no figure published`}
                </Tip>
              )}
            </div>
          </section>

          <div className={`${s.totalRow} ${sel.total ? s.hot : ''}`}>
            <div>
              <p className="t-small" lang="es">{CAPACITY.totalLabel}</p>
              {has ? (
                <p className={s.totalNum} lang="es">
                  <Numeral value={TOTAL_NUM} unit="MW" size="m" className="ink" />
                  <svg viewBox="0 0 12 8" width="22" height="15" aria-hidden="true" className={s.up}>
                    <path d="M0 8L6 0L12 8Z" fill="currentColor" />
                  </svg>
                </p>
              ) : (
                <p className={s.totalNum}><Placeholder width={9} /></p>
              )}
            </div>
            <ul className={`cells ${s.kpis}`} aria-label="Key figures">
              {KPIS.map((k, i) => (
                <li key={k.label} className={sel.kpi === i ? s.hot : ''}>
                  <span className="t-small" lang="es">{k.label}</span>
                  {has ? <Numeral value={String(k.value)} size="s" className="blue" lang="es" /> : <Placeholder width={3} />}
                </li>
              ))}
            </ul>
          </div>

          <section className={`${s.panel} ${s.treePanel}`} aria-labelledby="feature-tree-h">
            <header className={s.panelHead}>
              <h2 id="feature-tree-h" className="t-h3">Treemap</h2>
              <span className="t-small muted" lang="es">{CAPACITY.treemap.year} {CAPACITY.treemap.title}</span>
            </header>
            <div className={s.treeWrap}>
              <TreemapSvg year={sel.year} part={sel.part} onPick={(k) => touch({ part: sel.part === k ? null : k })} onHover={setHovPart} />
              {partShown && has && <Tip x={partInfo[partShown].x} y={partInfo[partShown].y}><span lang={partShown === 'rest' ? undefined : 'es'}>{partInfo[partShown].text}</span></Tip>}
            </div>
          </section>
        </div>
      </div>

      <section aria-labelledby="feature-tiles-h">
        <h2 id="feature-tiles-h" className={`t-h3 ${s.tilesH}`}>Technologies</h2>
        <div className={`cells ${s.tiles}`} role="group" aria-label="Technology tiles">
          {TECH.map((t) => {
            const on = sel.tech === t.key;
            return (
              <button
                key={t.key}
                type="button"
                className={`${s.tile} ${on ? s.tileOn : ''} ${t.highlight ? 'cell-fill' : ''}`}
                aria-pressed={on}
                onClick={() => touch({ tech: on ? null : t.key })}
                onPointerEnter={() => setHovTech(t.key)}
                onPointerLeave={() => setHovTech(null)}
                onFocus={() => setHovTech(t.key)}
                onBlur={() => setHovTech(null)}
              >
                <PixelIcon name={t.icon} size={40} />
                <span className={s.tileText} lang="es">
                  <span className={s.tileLabel}>{t.label}</span>
                  <Numeral value={t.value.replace(' MW', '')} unit="MW" size="s" />
                </span>
                <span className={s.bar} aria-hidden="true"><span style={{ width: `${(t.mw / MAX_TECH) * 100}%` }} /></span>
                {hovTech === t.key && <span className={s.tileTip}>{t.label}: {t.value}, as printed on the website tile</span>}
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="feature-ledger-h">
        <h2 id="feature-ledger-h" className={`t-h3 ${s.tilesH}`}>Selection</h2>
        <dl className={`cells ${s.ledger}`} style={{ '--cols': 5 }}>
          <div><dt>Year</dt><dd>{sel.year}{has ? '' : ', empty'}</dd></div>
          <div><dt>Quarter</dt><dd>{sel.q === null ? 'None' : has ? `${Q[sel.q].q} ${Q[sel.q].value}` : `${Q[sel.q].q}, no figure`}</dd></div>
          <div><dt>Technology</dt><dd lang={tech ? 'es' : undefined}>{tech ? `${tech.label} ${tech.value}` : 'None'}</dd></div>
          <div><dt>Treemap part</dt><dd lang={sel.part && sel.part !== 'rest' ? 'es' : undefined}>{sel.part ? (sel.part === 'rest' ? 'Unlabelled remainder' : partLine(PARTS[sel.part === 'dev' ? 0 : 1])) : 'None'}</dd></div>
          <div><dt>Node cell</dt><dd>{sel.cell ? `Row ${sel.cell.r + 1}, column ${sel.cell.c + 1}, ${STRENGTH[selCell ? selCell.v : 0].toLowerCase()}` : 'None'}</dd></div>
        </dl>
      </section>
    </div>
  );
}
