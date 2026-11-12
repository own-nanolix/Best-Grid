// Three headwear plates in profile: the Dark Blue cap, the Light Blue cap and the hard hat (the head protection of
// the case study's field poster, in the brand's colours). Visor and crown are dimensioned in plain mm.
import { CalloutG, DimensionG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { at } from './fabric';
import { Cap, HardHat } from './Caps';
import Plate, { mmC } from './Plate';

const W = 800, H = 640;

export const CAPS = [
  { name: 'cap-dark', title: 'Dark Blue six-panel cap in profile with the mark on the front panel', hat: false, body: HEX.darkBlue, ink: HEX.activeBlue, tone: '#ffffff',
    t: { x: 40, y: 190, s: 1.1, rot: 0 }, side: 'right', tx: 590, spot: { x: 0.3, y: 0.08 }, no: '01', label: 'Dark Blue cap',
    calls: [
      { lx: 262, ly: 84, label: 'Button' },
      { lx: 226, ly: 112, label: 'Eyelet' },
      { lx: 150, ly: 178, label: 'Front panel print', sub: `${mmC(60)} × ${mmC(60)} mm` },
      { lx: 240, ly: 246, label: 'Sweatband', sub: `${mmC(14)} mm` },
      { lx: 70, ly: 274, label: 'Curved peak', sub: `${mmC(112)} mm long` },
      { lx: 448, ly: 236, label: 'Strap' },
    ] },
  { name: 'cap-light', title: 'Light Blue six-panel cap in profile with the mark on the front panel', hat: false, body: HEX.lightBlue, ink: HEX.darkBlue, tone: HEX.darkBlue,
    t: { x: 290, y: 150, s: 1.0, rot: 0 }, side: 'left', tx: 250, spot: { x: 0.78, y: 0.1 }, no: '02', label: 'Light Blue cap',
    calls: [
      { lx: 262, ly: 84, label: 'Button' },
      { lx: 190, ly: 150, label: 'Panel seam', sub: 'Six panels' },
      { lx: 150, ly: 178, label: 'Front panel print', sub: `${mmC(60)} × ${mmC(60)} mm` },
      { lx: 60, ly: 276, label: 'Stitching rows', sub: 'Four rows' },
      { lx: 300, ly: 248, label: 'Sweatband', sub: `${mmC(14)} mm` },
    ] },
  { name: 'hard-hat', title: 'Active Blue hard hat in profile with the mark and a reflective band', hat: true, body: HEX.activeBlue, ink: HEX.darkBlue, tone: '#ffffff',
    t: { x: 150, y: 250, s: 1.12, rot: 0 }, side: 'right', tx: 640, spot: { x: 0.52, y: 0.04 }, no: '03', label: 'Hard hat',
    calls: [
      { lx: 268, ly: 96, label: 'Shell ridge' },
      { lx: 150, ly: 180, label: 'Front print', sub: `${mmC(72)} × ${mmC(72)} mm` },
      { lx: 318, ly: 186, label: 'Vents', sub: 'Three slots' },
      { lx: 330, ly: 236, label: 'Reflective band', sub: `${mmC(16)} mm tape` },
      { lx: 90, ly: 262, label: 'Front peak' },
    ] },
];

export function CapPlate({ cfg, idp }) {
  const { t } = cfg;
  return (
    <Plate idp={idp} name={cfg.name} title={cfg.title} w={W} h={H} spot={cfg.spot} no={cfg.no} label={cfg.label}>
      {(spot, cast) => {
        const common = { idp, id: `${idp}-c`, t, spot, body: cfg.body, ink: cfg.ink, tone: cfg.tone, cast: cast(t.x + 230, t.y + 150, 30) };
        const top = cfg.hat ? 74 : 84;
        const dx = cfg.side === 'right' ? (cfg.hat ? 96 : 118) : 444;
        const a = at(t, dx, top), b = at(t, dx, 254);
        const p0 = at(t, cfg.hat ? 66 : 12, 296), p1 = at(t, cfg.hat ? 112 : 124, 296);
        return (
          <>
            {cfg.hat ? <HardHat {...common} /> : <Cap {...common} />}
            {cfg.calls.map((c, j) => {
              const p = at(t, c.lx, c.ly);
              return <CalloutG key={c.label} x={p.x} y={p.y} tx={cfg.tx} ty={130 + j * 84} label={c.label} sub={c.sub} side={cfg.side} i={j + 1} size={19} />;
            })}
            <DimensionG x1={a.x} y1={a.y} x2={b.x} y2={b.y} value={`${mmC(254 - top)} mm`} offset={cfg.side === 'right' ? 28 : -28} i={8} size={15} />
            <DimensionG x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} value={`${mmC(cfg.hat ? 46 : 112)} mm`} offset={26} i={9} size={15} />
          </>
        );
      }}
    </Plate>
  );
}
