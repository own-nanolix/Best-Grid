'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import { NodeG } from '@/components/art/KeyArt';
import { toast } from '@/components/site/Toast';
import { HEX } from '@/lib/brand';
import { tEnter, tMove } from '@/lib/motion';
import s from './motion.module.css';

const STATES = [
  ['Hover', 'the crosshair turns 90 degrees and grows 15%, --dur-s, --ease-move'],
  ['Focus-visible', 'a 2 px Dark Blue outline, offset 3 px'],
  ['Active', 'drops 1 px, --dur-xs, --ease-out'],
];

// The micro-interaction library as a five-cell bench: buttons, toggles, inputs, loaders, toasts. All live.
export default function MicroSection() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="cells" style={{ '--cols': 5 }}>
      <div className={s.bench}>
        <h3 className="t-label">Buttons</h3>
        <div className={s.col}>
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="dark">Dark</Button>
          <Button variant="active">Active</Button>
          <Button variant="ghost">Ghost</Button>
          <Button icon="download" label="Download" />
        </div>
        <dl className={s.states}>
          {STATES.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </div>

      <div className={s.bench}>
        <h3 className="t-label">Toggles</h3>
        <div className={s.col}>
          <Toggle label="Guides" defaultChecked />
          <Toggle label="Nodes" />
          <Segmented id="motion-chips" label="Order" options={['Lines', 'Nodes', 'Cells']} />
        </div>
        <p className="t-small muted">The thumb travels 22 px on <code>--ease-move</code> over <code>--dur-s</code>; the track fills Active Blue. Space and Enter flip a switch.</p>
      </div>

      <div className={s.bench}>
        <h3 className="t-label">Inputs</h3>
        <div className={s.col}>
          <Field id="motion-field-search" label="Search" placeholder="Search" />
          <Field id="motion-field-notes" label="Notes" placeholder="Notes" />
        </div>
        <p className="t-small muted">Hover and focus move the border to Dark Blue on <code>--dur-s</code>, <code>--ease-out</code>; the field turns white on focus.</p>
      </div>

      <div className={s.bench}>
        <h3 className="t-label">Loaders</h3>
        <Toggle label="Loading" checked={loading} onChange={setLoading} />
        <div className={s.col}>
          <Loaders on={loading} />
        </div>
        <p className="t-small muted">Built from nodes, a line and a lattice. Nodes and lattice cells step on <code>--ease-cut</code>; the line fills on <code>--ease-linear</code>, the only place it is used.</p>
      </div>

      <div className={s.bench}>
        <h3 className="t-label">Toasts</h3>
        <ToastBench />
      </div>
    </div>
  );
}

function Loaders({ on }) {
  const nodeCls = on ? 'loader-node' : undefined;
  const dark = HEX.darkBlue;
  return (
    <>
      <figure className={s.loader}>
        <Art viewBox="0 0 120 40" title="Loader of four nodes stepping in turn" exportName="motion-loader-nodes">
          <rect width="120" height="40" fill={HEX.paper} />
          <rect x="10" y="19.5" width="100" height="1" fill={dark} opacity="0.3" />
          {[0, 1, 2, 3].map((i) => (
            <NodeG key={i} cx={20 + i * 27} cy={20} s={10} fill={dark} className={nodeCls} style={{ '--i': i }} />
          ))}
        </Art>
        <figcaption className="t-small">Nodes</figcaption>
      </figure>
      <figure className={s.loader}>
        <Art viewBox="0 0 160 40" title="Loader of a hairline filling between two nodes" exportName="motion-loader-line">
          <rect width="160" height="40" fill={HEX.paper} />
          <rect x="12" y="19.5" width="136" height="1" fill={dark} opacity="0.3" />
          <rect x="12" y="18" width="136" height="4" fill={HEX.activeBlue} className={on ? s.lBar : undefined} />
          <NodeG cx={12} cy={20} s={8} fill={dark} />
          <NodeG cx={148} cy={20} s={8} fill={dark} />
        </Art>
        <figcaption className="t-small">Line</figcaption>
      </figure>
      <figure className={s.loader}>
        <Art viewBox="0 0 100 100" title="Loader of a five by five lattice scanned on the diagonal" exportName="motion-loader-lattice">
          <rect width="100" height="100" fill={HEX.paper} />
          {Array.from({ length: 25 }, (_, n) => {
            const x = n % 5;
            const y = Math.floor(n / 5);
            return <rect key={n} x={9 + x * 16} y={9 + y * 16} width="12" height="12" fill={(x + y) % 4 === 0 ? HEX.activeBlue : dark} className={nodeCls} style={{ '--i': x + y }} />;
          })}
        </Art>
        <figcaption className="t-small">Lattice</figcaption>
      </figure>
    </>
  );
}

function ToastBench() {
  const [items, setItems] = useState([]);
  const seq = useRef(0);
  const timers = useRef(new Set());
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);
  const show = (text) => {
    seq.current += 1;
    const id = seq.current;
    setItems((l) => [...l.slice(-1), { id, text }]);
    const t = setTimeout(() => {
      setItems((l) => l.filter((i) => i.id !== id));
      timers.current.delete(t);
    }, 2200);
    timers.current.add(t);
  };
  return (
    <>
      <div className={s.col}>
        <Button size="sm" onClick={() => show('Example toast')}>Show a toast</Button>
        <Button size="sm" variant="outline" onClick={() => show('A second toast')}>Show another</Button>
        <Button size="sm" variant="ghost" onClick={() => toast('Example page toast')}>Page toast</Button>
      </div>
      <div className={s.toastBay} role="status" aria-live="polite">
        <AnimatePresence>
          {items.map((i) => (
            <motion.div key={i.id} className="site-toast" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0, transition: tEnter }} exit={{ opacity: 0, x: 24, transition: tMove }}>
              {i.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="t-small muted">Enter from 24 px on <code>--dur-m</code>, leave on <code>--dur-s</code>; opacity and transform only.</p>
    </>
  );
}
