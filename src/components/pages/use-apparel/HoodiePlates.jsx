// Three hoodie plates (the Dark Blue hoodie with the chest mark, the Light Blue hoodie with the lattice print, the
// Active Blue hoodie with the word-mark) and, as an extra, the high-visibility vest (the workwear of the case study's
// field poster, rebuilt in the brand's colours).
// Each plate shows one piece in front and the other two overlapping behind it in depth, turned a few degrees.
import { CalloutG, CalloutsG, DimensionG } from '@/components/art/Mockup';
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
      { lx: 126, ly: 64, label: 'Reflective brace', sub: `${mmH(28)} mm tape` },
      { lx: 208, ly: 136, label: 'Chest mark', sub: `${mmH(38)} × ${mmH(38)} mm` },
      { lx: 84, ly: 278, label: 'Reflective band', sub: `${mmH(32)} mm tape` },
      { lx: 86, ly: 190, label: 'Binding', sub: `${mmH(8)} mm` },
      { lx: 100, ly: 395, label: 'Flap pocket', sub: `${mmH(76)} mm` },
    ],
  },
  dark: {
    w: 400, h: 446, hem: [92, 308, 442], width: `${mmH(216)} mm`,
    draw: (p) => <Hoodie {...p} body={HEX.darkBlue} art={hoodieArt('mark', HEX.activeBlue, HEX.activeBlue)} />,
    calls: [
      { lx: 140, ly: 20, label: 'Lined hood', sub: `${mmH(32)} mm collar band` },
      { lx: 179, ly: 160, label: 'Drawcord', sub: 'Metal eyelets' },
      { lx: 171, ly: 181, label: 'Chest mark', sub: `${mmH(62)} × ${mmH(62)} mm` },
      { lx: 108, ly: 350, label: 'Kangaroo pocket', sub: `${mmH(168)} mm` },
      { lx: 34, ly: 400, label: 'Ribbed cuff', sub: `${mmH(24)} mm` },
      { lx: 96, ly: 428, label: 'Ribbed hem', sub: `${mmH(30)} mm` },
    ],
  },
  active: {
    w: 400, h: 446, hem: [92, 308, 442], width: `${mmH(216)} mm`,
    draw: (p) => <Hoodie {...p} body={HEX.activeBlue} tone={HEX.darkBlue} cord={HEX.darkBlue} art={hoodieArt('word', HEX.lightBlue, HEX.lightBlue)} />,
    calls: [
      { lx: 140, ly: 20, label: 'Lined hood', sub: `${mmH(32)} mm collar band` },
      { lx: 179, ly: 160, label: 'Drawcord', sub: 'Dark Blue cord' },
      { lx: 136, ly: 262, label: 'Word-mark print', sub: `${mmH(124)} × ${mmH(23)} mm` },
      { lx: 108, ly: 350, label: 'Kangaroo pocket', sub: `${mmH(168)} mm` },
      { lx: 96, ly: 428, label: 'Ribbed hem', sub: `${mmH(30)} mm` },
    ],
  },
  light: {
    w: 400, h: 446, hem: [92, 308, 442], width: `${mmH(216)} mm`,
    draw: (p) => <Hoodie {...p} body={HEX.lightBlue} tone={HEX.darkBlue} cord={HEX.darkBlue} art={hoodieArt('lattice', HEX.darkBlue, HEX.activeBlue)} />,
    calls: [
      { lx: 140, ly: 20, label: 'Lined hood', sub: `${mmH(32)} mm collar band` },
      { lx: 179, ly: 160, label: 'Drawcord', sub: 'Metal eyelets' },
      { lx: 140, ly: 268, label: 'Lattice print', sub: `${mmH(LAT)} × ${mmH(LAT)} mm` },
      { lx: 34, ly: 400, label: 'Ribbed cuff', sub: `${mmH(24)} mm` },
      { lx: 96, ly: 428, label: 'Ribbed hem', sub: `${mmH(30)} mm` },
    ],
  },
};

export const HOODS = [
  { name: 'hoodie-dark', title: 'Dark Blue hoodie with the chest mark, with two hoodies behind', hero: 'dark', rest: ['light', 'active'], mirror: true, spot: { x: 0.78, y: 0.14 }, no: '01', label: 'Dark Blue hoodie' },
  { name: 'hoodie-light', title: 'Light Blue hoodie with the lattice print, with two hoodies behind', hero: 'light', rest: ['active', 'dark'], mirror: false, spot: { x: 0.55, y: 0.06 }, no: '02', label: 'Light Blue hoodie' },
  { name: 'hoodie-active', title: 'Active Blue hoodie with the word-mark, with two hoodies behind', hero: 'active', rest: ['dark', 'light'], mirror: true, spot: { x: 0.9, y: 0.3 }, no: '03', label: 'Active Blue hoodie' },
];
// The extra workwear plate: the vest in front of two hoodies.
export const VEST = { name: 'vest', title: 'High-visibility vest with reflective tape, with two hoodies behind', hero: 'vest', rest: ['dark', 'active'], mirror: false, spot: { x: 0.2, y: 0.1 }, no: '04', label: 'Hi-vis vest' };

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
            <CalloutsG>{P.calls.map((c) => ({ c, p: at(hero, cfg.mirror ? 400 - c.lx : c.lx, c.ly) })).sort((m, n) => m.p.y - n.p.y).map(({ c, p }, j) => {
              return <CalloutG key={c.label} x={p.x} y={p.y} tx={tx} ty={170 + j * (480 / P.calls.length + 14)} label={c.label} sub={c.sub} side={side} i={j + 1} size={19} />;
            })}</CalloutsG>
            <DimensionG x1={a.x} y1={a.y} x2={b.x} y2={b.y} value={P.width} offset={30} i={8} size={15} />
          </>
        );
      }}
    </Plate>
  );
}
