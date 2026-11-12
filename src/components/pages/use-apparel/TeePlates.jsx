// Three t-shirt plates (front and back side by side, flat lay). Each colourway is made by the same Tee function
// from a colour set; the plates differ in order, stagger, spotlight and callouts. Print placements are dimensioned.
import { CalloutG, DimensionG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { at, mm } from './fabric';
import Plate, { dimsOf } from './Plate';
import { Tee, teeArt } from './Tops';

const W = 860, H = 540, S = 0.62;

export const TEES = [
  { k: 'a', name: 'tee-dark', title: 'T-shirt in Dark Blue with the lattice back print, front and back', body: HEX.darkBlue, ink: HEX.activeBlue, ink2: HEX.activeBlue, tone: '#ffffff', order: 'bf', stagger: 0, spot: { x: 0.5, y: 0.1 }, no: '01', label: 'Dark Blue',
    calls: { front: [{ lx: 236, ly: 46, label: 'Collar', sub: `${mm(14)} mm rib` }, { lx: 262, ly: 78, label: 'Chest print', item: 0 }, { lx: 372, ly: 158, label: 'Sleeve hem', sub: `${mm(16)} mm hem` }],
      back: [{ lx: 200, ly: 172, label: 'Back print', item: 0 }, { lx: 200, ly: 58, label: 'Nape mark', item: 1 }, { lx: 104, ly: 336, label: 'Hem', sub: `${mm(16)} mm hem` }] } },
  { k: 'b', name: 'tee-active', title: 'T-shirt in Active Blue with the word-mark chest print and the large mark on the back', body: HEX.activeBlue, ink: HEX.lightBlue, ink2: HEX.darkBlue, tone: '#ffffff', order: 'fb', stagger: 22, spot: { x: 0.16, y: 0.16 }, no: '02', label: 'Active Blue',
    calls: { front: [{ lx: 200, ly: 100, label: 'Chest word-mark', item: 0 }, { lx: 164, ly: 46, label: 'Collar', sub: `${mm(14)} mm rib` }, { lx: 40, ly: 150, label: 'Sleeve hem', sub: `${mm(16)} mm hem` }],
      back: [{ lx: 200, ly: 148, label: 'Back mark', item: 0 }, { lx: 232, ly: 30, label: 'Back collar', sub: `${mm(12)} mm rib` }, { lx: 300, ly: 336, label: 'Hem', sub: `${mm(16)} mm hem` }] } },
  { k: 'c', name: 'tee-light', title: 'T-shirt in Light Blue with the lattice chest print and the mark on the back', body: HEX.lightBlue, ink: HEX.darkBlue, ink2: HEX.activeBlue, tone: HEX.darkBlue, order: 'bf', stagger: -18, spot: { x: 0.86, y: 0.14 }, no: '03', label: 'Light Blue',
    calls: { front: [{ lx: 200, ly: 168, label: 'Chest print', item: 0 }, { lx: 372, ly: 158, label: 'Sleeve hem', sub: `${mm(16)} mm hem` }, { lx: 300, ly: 336, label: 'Hem', sub: `${mm(16)} mm hem` }],
      back: [{ lx: 200, ly: 82, label: 'Upper back mark', item: 0 }, { lx: 200, ly: 318, label: 'Hem word-mark', item: 1 }, { lx: 70, ly: 100, label: 'Shoulder seam', sub: `${mm(60)} mm` }] } },
];

export function TeePlate({ cfg, idp }) {
  const art = teeArt(cfg.k, cfg.ink, cfg.ink2);
  const left = cfg.order === 'bf' ? 'back' : 'front';
  const views = cfg.order === 'bf' ? ['back', 'front'] : ['front', 'back'];
  const xs = [180, 440];
  return (
    <Plate idp={idp} name={cfg.name} title={cfg.title} w={W} h={H} spot={cfg.spot} no={cfg.no} label={cfg.label} split={null}>
      {(spot, cast) => (
        <>
          {views.map((view, i) => {
            const t = { x: xs[i], y: 150 + (i ? cfg.stagger : 0), s: S, rot: 0 };
            return <Tee key={view} idp={idp} id={`${idp}-${view}`} t={t} spot={spot} view={view} body={cfg.body} art={art} tone={cfg.tone} cast={cast(t.x + 124, t.y + 110)} />;
          })}
          {views.map((view, i) => {
            const t = { x: xs[i], y: 150 + (i ? cfg.stagger : 0), s: S, rot: 0 };
            const side = view === left ? 'left' : 'right';
            const tx = side === 'left' ? 170 : 706;
            const a = at(t, 80, 350), b = at(t, 320, 350);
            return (
              <g key={view}>
                {cfg.calls[view].map((c, j) => {
                  const p = at(t, c.lx, c.ly);
                  const sub = c.item !== undefined ? dimsOf(art[view][c.item]) : c.sub;
                  return <CalloutG key={c.label} x={p.x} y={p.y} tx={tx} ty={170 + j * 96 + (i ? 20 : 0)} label={c.label} sub={sub} side={side} i={i * 3 + j + 1} size={19} />;
                })}
                <DimensionG x1={a.x} y1={a.y} x2={b.x} y2={b.y} value={`${mm(240)} mm`} offset={30} i={7} size={15} />
              </g>
            );
          })}
        </>
      )}
    </Plate>
  );
}
