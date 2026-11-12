'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import { Placeholder } from '@/components/ui/Card';
import Icon from '@/components/site/Icon';
import s from './motion.module.css';

const TAB_COPY = [
  { id: 'lines', label: 'Lines', text: 'Lines extend along the guides first.' },
  { id: 'nodes', label: 'Nodes', text: 'Nodes snap in at the crossings.' },
  { id: 'cells', label: 'Cells', text: 'Cells fill once their lines are in.' },
];

// Page and component transitions. Left: the page enter the site itself uses (lines, nodes, then content).
// Right: the brand's own components: a table row, a tile, a card, a sheet and tabs. Transform and opacity only.
export default function TransitionsSection() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [card, setCard] = useState(0);
  const [sheet, setSheet] = useState(false);
  const [tile, setTile] = useState(false);
  return (
    <div className={s.pair}>
      <div className="stack">
        <h3 className="t-h3">Page enter</h3>
        <div key={page} className={`${s.pageDemo} field-light`} aria-label="Page enter preview" role="group">
          <div className={s.pgNav}>
            <span className={s.pgLine} style={{ '--i': 0 }} />
            <span className={`${s.pgNode} ${s.pgNodeA}`} />
            <span className={`${s.pgNode} ${s.pgNodeB}`} />
            <span className={s.pgMark}><Icon name="grid" size={20} /></span>
          </div>
          <div className={s.pgBody}>
            <div className={s.pgRise} style={{ '--i': 0 }}><Placeholder width={9} /></div>
            <div className={s.pgRise} style={{ '--i': 1 }}><Placeholder width={7} /></div>
            <div className={`${s.pgRise} ${s.pgSmall}`} style={{ '--i': 3 }}><Placeholder width={14} /></div>
            <div className={s.pgCells}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`${s.pgCell} ${i === 3 ? 'cell-fill' : ''}`} style={{ '--i': 5 + i }} />
              ))}
            </div>
          </div>
        </div>
        <p className="t-small muted">Entering: <code>--ease-out</code> over <code>--dur-l</code> (700 ms), 16 px rise, cells staggered by 40 ms. The guide line extends on <code>--ease-line</code>; nodes snap in on <code>--dur-xs</code>.</p>
        <div><Button variant="active" icon="play" cross={false} onClick={() => setPage((n) => n + 1)}>Replay page enter</Button></div>
      </div>

      <div className="stack">
        <h3 className="t-h3">Components</h3>
        <div className="cells" style={{ '--cols': 2 }}>
          <div className={s.demo}>
            <p className="t-label">Table row</p>
            <table className="spec spec-compact" key={rows}>
              <caption className="sr-only">Rows entering one by one</caption>
              <tbody>
                {['Row A', 'Row B', 'Row C'].map((t, i) => (
                  <tr key={t} className={s.rowIn} style={{ '--i': i }}>
                    <th scope="row">{t}</th>
                    <td><Placeholder width={4} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button size="sm" variant="outline" cross={false} onClick={() => setRows((n) => n + 1)}>Replay rows</Button>
          </div>
          <div className={s.demo}>
            <p className="t-label">Tile</p>
            <button type="button" className={s.tile} aria-pressed={tile} onClick={() => setTile((v) => !v)}>
              <span className={s.tileNode} aria-hidden="true" />
              <Icon name="node" size={28} />
              <span className="t-small">{tile ? 'Selected' : 'Select tile'}</span>
            </button>
            <p className="t-small muted">Hover lifts 2 px on <code>--dur-s</code>; press drops 1 px; selecting fills the cell.</p>
          </div>
          <div className={s.demo}>
            <p className="t-label">Card</p>
            <div key={card} className={`card ${s.cardIn}`}>
              <p className="t-body">Card title</p>
              <Placeholder width={10} />
            </div>
            <Button size="sm" variant="outline" cross={false} onClick={() => setCard((n) => n + 1)}>Replay card</Button>
          </div>
          <div className={s.demo}>
            <p className="t-label">Sheet</p>
            <div className={s.sheetFrame} data-open={sheet}>
              <span className={s.scrim} />
              <div className={s.sheet} role="dialog" aria-label="Sheet preview" aria-hidden={!sheet}>
                <p className="t-body">Sheet</p>
                <Placeholder width={8} />
                <Button size="sm" variant="dark" cross={false} onClick={() => setSheet(false)} tabIndex={sheet ? 0 : -1}>Close sheet</Button>
              </div>
            </div>
            <Button size="sm" variant="outline" cross={false} aria-expanded={sheet} onClick={() => setSheet((v) => !v)}>{sheet ? 'Close sheet' : 'Open sheet'}</Button>
          </div>
        </div>
        <div>
          <p className="t-label">Tabs</p>
          <Tabs
            id="motion-tabs"
            label="Motion order"
            tabs={TAB_COPY.map((t) => ({ id: t.id, label: t.label, content: <p className={`t-body ${s.panelIn}`}>{t.text}</p> }))}
          />
        </div>
      </div>
    </div>
  );
}
