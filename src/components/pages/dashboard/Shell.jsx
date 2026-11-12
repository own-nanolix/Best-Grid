'use client';

import { useEffect, useRef, useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import { CAPACITY } from '@/lib/brand';
import { TABS } from './data';
import ScreenA from './ScreenA';
import ScreenB from './ScreenB';
import ScreenC from './ScreenC';
import ScreenD from './ScreenD';
import ScreenE from './ScreenE';
import { Overview, NodeScreen, TechScreen } from './Inner';
import s from './dashboard.module.css';

const SCREENS = { a: ScreenA, b: ScreenB, c: ScreenC, d: ScreenD, e: ScreenE, overview: Overview, node: NodeScreen, tech: TechScreen };

// One working shell: a tablist of screens over shared state, every screen a 1600 x 1000 artboard scaled to fit.
export default function Shell() {
  const [state, setState] = useState({
    tab: 'a', year: CAPACITY.year, query: '', kind: 'All', range: 'full', sort: { key: 'name', dir: 'asc' },
    rowId: 't-solar', cell: 36, layer: -1, quarter: 2, part: 'dev', tech: 'solar',
  });
  const [k, setK] = useState(0.6);
  const box = useRef(null);
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setK(Math.min(1, e.contentRect.width / 1600)));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  const st = { ...state, set: (patch) => setState((p) => ({ ...p, ...patch })) };
  const Screen = SCREENS[state.tab];
  return (
    <div ref={box} className={s.shell}>
      <Tabs id="dashboard-shell" label="Dashboard screens" value={state.tab} onChange={(tab) => st.set({ tab })}
        tabs={TABS.map((t) => ({ ...t, content: t.id === state.tab ? <Screen st={st} k={k} /> : null }))} />
    </div>
  );
}
