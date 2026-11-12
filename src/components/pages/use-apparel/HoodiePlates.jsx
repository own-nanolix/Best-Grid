// Three hoodie-class plates: the high-visibility vest (the workwear of the case study's field poster, rebuilt in
// the brand's colours), the Dark Blue hoodie with the chest mark and the Light Blue hoodie with the lattice print.
// Each plate shows one piece in front and the other two overlapping behind it in depth, turned a few degrees.
import { CalloutG, DimensionG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { at } from './fabric';
import Plate, { mmH } from './Plate';
import { Hoodie, Vest, hoodieArt } from './Tops';

const W = 880, H = 800;
const LAT = 2 * (3 * 12.85 + 2.615) * 1.5;

const PIECES = {
  vest: {
    w: 400, h: 436, hem: [80, 320, 436], width: `${mmH(240)} mm`,
    draw: (p) => <Vest {...p} />,
    calls: [
      { lx: 136, ly: 120, label: 'Reflective brace', sub: `${mmH(28)} mm tape` },
      { lx: 226, ly: 138, label: 'Chest mark', sub: `${mmH(38)} × ${mmH(38)} mm` },
      { lx: 110, ly: 278, label: 'Reflective band', sub: `${mmH(32)} mm tape` },
      { lx: 88, ly: 190, label: 'Binding', sub: `${mmH(8)} mm` },
      { lx: 138, ly: 408, label: 'Flap pocket', sub: `${mmH(76)} mm` },
    ],
  },
  dark: {
    w: 400, h: 446, hem: [92, 308, 442], width: `${mmH(216)} mm`,
    draw: (p) => <Hoodie {...p} body={HEX.darkBlue} art={hoodieArt('mark', HEX.activeBlue, HEX.activeBlue)} />,
    calls: [
      { lx: 200, ly: 10, label: 'Lined hood', sub: `${mmH(32)} mm collar band` },
      { lx: 180, ly: 130, label: 'Drawcord', sub: 'Metal eyelets' },
      { lx: 200, ly: 182, label: 'Chest mark', sub: `${mmH(62)} × ${mmH(62)} mm` },
      { lx: 130, ly: 346, label: 'Kangaroo pocket', sub: `${mmH(168)} mm` },
      { lx: 36, ly: 392, label: 'Ribbed cuff', sub: `${mmH(24)} mm` },
      { lx: 130, ly: 428, label: 'Ribbed hem', sub: `${mmH(30)} mm` },
    ],
  },
  light: {
    w: 400, h: 446, hem: [92, 308, 442], width: `${mmH(216)} mm`,
    draw: (p) => <Hoodie {...p} body={HEX.lightBlue} tone={HEX.darkBlue} cord={HEX.darkBlue} art={hoodieArt('lattice', HEX.darkBlue, HEX.activeBlue)} />,
    calls: [
      { lx: 200, ly: 10, label: 'Lined hood', sub: `${mmH(32)} mm collar band` },
      { lx: 180, ly: 130, label: 'Drawcord', sub: 'Metal eyelets' },
      { lx: 200, ly: 252, label: 'Lattice print', sub: `${mmH(LAT)} × ${mmH(LAT)} mm` },
      { lx: 36, ly: 392, label: 'Ribbed cuff', sub: `${mmH(24)} mm` },
      { lx: 130, ly: 428, label: 'Ribbed hem', sub: `${mmH(30)} mm` },
    ],
  },
};

export const HOODS = [
  { name: 'vest', title: 'High-visibility vest with reflective tape, with two hoodies behind', hero: 'vest', rest: ['dark', 'light'], mirror: false, spot: { x: 0.2, y: 0.1 }, no: '01', label: 'Hi-vis vest' },
  { name: 'hoodie-dark', title: 'Dark Blue hoodie with the chest mark, with the vest and a hoodie behind', hero: 'dark', rest: ['vest', 'light'], mirror: true, spot: { x: 0.78, y: 0.14 }, no: '02', label: 'Dark Blue hoodie' },
  { name: 'hoodie-light', title: 'Light Blue hoodie with the lattice print, with two pieces behind', hero: 'light', rest: ['dark', 'vest'], mirror: false, spot: { x: 0.55, y: 0.06 }, no: '03', label: 'Light Blue hoodie' },
];

export function HoodiePlate({ cfg, idp }) {
  const base = [
    { x: 300, y: 200, s: 0.98, rot: 0 },
    { x: 440, y: 130, s: 0.8, rot: 3 },
    { x: 560, y: 160, s: 0.7, rot: 6 },
  ];
  const ts = base.map((b, i) => {
    const pk = i === 0 ? cfg.hero : cfg.rest[i - 1];
    if (!cfg.mirror) return { ...b, pk };
    return { ...b, x: W - b.x - PIECES[pk].w * b.s, rot: -b.rot, pk };
  });
  const order = [2, 1, 0];
  return (
    <Plate idp={idp} name={cfg.name} title={cfg.title} w={W} h={H} spot={cfg.spot} no={cfg.no} label={cfg.label}>
      {(spot, cast) => {
        const hero = ts[0], P = PIECES[hero.pk];
        const side = cfg.mirror ? 'right' : 'left';
        const tx = cfg.mirror ? 640 : 250;
        const a = at(hero, P.hem[0], P.hem[2]), b = at(hero, P.hem[1], P.hem[2]);
        return (
          <>
            {order.map((i) => {
              const t = ts[i];
              return <g key={i}>{PIECES[t.pk].draw({ idp, id: `${idp}-p${i}`, t, spot, cast: cast(t.x + 150, t.y + 150, 22 + (2 - i) * 4), dim: i === 0 ? 0 : i === 1 ? 0.28 : 0.5 })}</g>;
            })}
            {P.calls.map((c, j) => {
              const lx = cfg.mirror ? 400 - c.lx : c.lx;
              const p = at(hero, lx, c.ly);
              return <CalloutG key={c.label} x={p.x} y={p.y} tx={tx} ty={170 + j * (480 / P.calls.length + 14)} label={c.label} sub={c.sub} side={side} i={j + 1} size={19} />;
            })}
            <DimensionG x1={a.x} y1={a.y} x2={b.x} y2={b.y} value={P.width} offset={30} i={8} size={15} />
          </>
        );
      }}
    </Plate>
  );
}
