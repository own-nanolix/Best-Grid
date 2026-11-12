// Plates 4 to 8: the tube open with the drawing half out, the tube in its carton, the second colourway, the
// connection-study drawing on its own and the grey label flat. All dimensions are our own production values in mm.
import { r2 } from '@/lib/charts';
import { HEX, mixHex } from '@/lib/brand';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CalloutG, DimensionG, SpecColumnG, ShadowG, CastG, LitG, CalloutsG } from '@/components/art/Mockup';
import { Plate, labelRows } from './plate';
import { TubeG, LyingTubeG, LabelContentG, T } from './tube';
import { DrawingG, DRAWING } from './drawing';

const Callouts = ({ rows, tx, side }) => <CalloutsG>{labelRows(rows, tx, side).map((r) => <CalloutG key={r.label} {...r} />)}</CalloutsG>;

// Plate 04: tube lying open, the rolled drawing half out and unrolled onto the floor.
export function OpenPlate() {
  const idp = 'use-product-open', X = 650, Y = 150, S = 0.8;
  const P = (u, v) => [r2(X + S * u), r2(Y + S * v)];
  const quad = 'M735 288H1010L950 500H675Z';
  const spiral = [1, 0.8, 0.62, 0.45, 0.3];
  return (
    <Plate idp={idp} w={1600} h={820} name="tube-open" title="The project tube lying open with the rolled connection-study drawing half out and unrolled in front of it" spot={{ x: 0.55, y: 0.1 }} split={0.36} floor={0.5} no="04">
      <g transform={`translate(${X} ${Y}) scale(${S})`}>
        <clipPath id={`${idp}-roll`}><rect x="700" y="22" width="310" height="256" /></clipPath>
        <ShadowG idp={`${idp}-sh`} cx={420} cy={304} rx={470} ry={24} dir={{ x: 0.2, y: 0.9 }} blur={9} />
        <CastG idp={`${idp}-cast`} d={quad} dir={{ x: 0.1, y: 0.6 }} depth={14} opacity={0.5} />
        <g>
          <path d={quad} fill={`url(#${idp}-paper)`} />
          <g transform="matrix(0.3618 0 -0.1111 0.3926 735 288)"><DrawingG idp={idp} flat /></g>
          <path d={quad} fill={`url(#${idp}-ao)`} />
          <path d="M675 500Q812 524 950 500V493Q812 517 675 493Z" fill={HEX.cardGrey} opacity="0.9" />
        </g>
        <LyingTubeG idp={idp} tone="active" open />
        <ellipse cx="700" cy="150" rx="30" ry="128" fill={`url(#${idp}-paper)`} />
        <rect x="700" y="22" width="310" height="256" fill={`url(#${idp}-paper)`} filter={`url(#${idp}-fibre)`} />
        <rect x="700" y="22" width="310" height="256" fill={`url(#${idp}-shade-v)`} />
        <rect x="700" y="22" width="310" height="256" fill={`url(#${idp}-ao)`} opacity="0.35" />
        <ellipse cx="1010" cy="150" rx="30" ry="128" fill={HEX.cardGrey} />
        {spiral.map((s, i) => <ellipse key={s} cx={1010 - i * 1.5} cy={150} rx={r2(30 * s)} ry={r2(128 * s)} fill="none" stroke={HEX.darkBlue} strokeOpacity="0.45" strokeWidth="0.9" />)}
        <ellipse cx="1010" cy="150" rx="30" ry="128" fill="none" stroke={HEX.black} strokeOpacity="0.25" />
      </g>
      <Callouts tx={0} rows={[]} />
      <CalloutsG>
        <CalloutG label="Wound card body" x={P(160, 0)[0]} y={P(160, 0)[1]} tx={P(160, 0)[0] + 24} ty={60} i={0} />
        <CalloutG label="Printed label" x={P(560, 100)[0]} y={P(560, 100)[1]} tx={P(560, 100)[0] + 24} ty={100} i={1} />
        <CalloutG label="Tube mouth" x={P(700, -2)[0]} y={P(700, -2)[1]} tx={P(700, -2)[0] + 24} ty={60} i={2} />
        <CalloutG label="Rolled drawing" x={P(860, 22)[0]} y={P(860, 22)[1]} tx={P(860, 22)[0] + 24} ty={100} i={3} />
        <CalloutG label="Unrolled sheet" x={P(790, 480)[0]} y={P(790, 480)[1]} tx={P(790, 480)[0] + 24} ty={730} i={4} />
        <CalloutG label="Lattice study" x={P(935, 363)[0]} y={P(935, 363)[1]} tx={P(935, 363)[0] + 24} ty={690} i={5} />
      </CalloutsG>
      <SpecColumnG x={96} y={300} w={380} title="Tube and drawing" rows={[{ k: 'Tube length', v: '306 mm' }, { k: 'Tube inner diameter', v: '114 mm' }, { k: 'Roll diameter', v: '100 mm' }, { k: 'Sheet', v: 'A3, 420 × 297 mm' }]} />
    </Plate>
  );
}

// Plate 05: the tube in its carton, light from the right.
export function CartonPlate() {
  const idp = 'use-product-carton', X = 800, Y = 270, S = 1.3, W = 238, Hh = 459, dx = 100, dy = -47;
  const P = (u, v) => [r2(X + S * u), r2(Y + S * v)];
  const rightFace = `M${W} 0L${W + dx} ${dy}V${Hh + dy}L${W} ${Hh}Z`;
  const topFace = `M0 0H${W}L${W + dx} ${dy}H${dx}Z`;
  return (
    <Plate idp={idp} w={1500} h={950} name="tube-carton" title="The project tube standing in its open carton with its lid showing above the rim" spot={{ x: 0.74, y: 0.14 }} split={0.4} floor={0.84} no="05">
      <ShadowG idp={`${idp}-sh`} cx={X + 190 * S} cy={Y + Hh * S + 4} rx={300} ry={40} dir={{ x: -0.9, y: 0.1 }} />
      <g transform={`translate(${X} ${Y}) scale(${S})`}>
        <path d={topFace} fill={`url(#${idp}-card)`} />
        <path d={topFace} fill={HEX.black} opacity="0.42" />
        <path d={`M0 0L${dx} ${dy}V0Z`} fill={HEX.black} opacity="0.25" />
        <path d={topFace} fill={`url(#${idp}-ao)`} opacity="0.9" />
        <TubeG idp={idp} tone="active" x={169} y={-84} k={0.68} right len={600} />
        <path d={`M0 0H${W}V${Hh}H0Z`} fill={`url(#${idp}-card)`} filter={`url(#${idp}-fibre)`} />
        <path d={`M0 0H${W}V${Hh}H0Z`} fill={HEX.black} opacity="0.1" />
        <path d={`M0 0H${W}V${Hh}H0Z`} fill={`url(#${idp}-shade-v)`} opacity="0.5" />
        <path d={rightFace} fill={`url(#${idp}-card)`} filter={`url(#${idp}-fibre)`} />
        <path d={rightFace} fill={HEX.white} opacity="0.14" />
        <path d={rightFace} fill={`url(#${idp}-shade-r)`} opacity="0.6" />
        <path d={`M0 0H${W}L${W + dx} ${dy}`} fill="none" stroke={HEX.white} strokeOpacity="0.7" strokeWidth="2.4" />
        <rect x="28" y="0" width="0.8" height={Hh} fill={HEX.darkBlue} opacity="0.5" />
        <rect x="25.5" y="148" width="5.6" height="5.6" fill={HEX.darkBlue} />
        <MarkG x={50} y={110} size={70} fill={HEX.darkBlue} />
        <WordmarkG x={W - 14} y={Hh - 24} size={26} anchor="end" fill={HEX.darkBlue} />
      </g>
      <DimensionG x1={X} y1={Y + Hh * S} x2={X + W * S} y2={Y + Hh * S} value="140 mm" offset={44} i={6} />
      <DimensionG x1={X + (W + dx) * S} y1={Y + dy * S} x2={X + (W + dx) * S} y2={Y + (Hh + dy) * S} value="320 mm" offset={-46} i={7} />
      <Callouts tx={560} side="left" rows={[
        ['Tube lid', P(169, -80), 130],
        ['Open carton top', P(42, -16), 250],
        ['Printed carton face', P(60, 300), 420],
        ['Carton edge', P(3, 380), 560],
      ]} />
      <SpecColumnG x={96} y={650} w={340} title="Carton" rows={[{ k: 'Inside', v: '140 × 140 mm' }, { k: 'Height', v: '320 mm' }, { k: 'Stock', v: 'Light card' }]} />
    </Plate>
  );
}

// Plate 06: the second colourway, the Dark Blue tube with the Active Blue lid face, lit from the right.
export function ColourwayPlate() {
  const idp = 'use-product-colourway', X = 1010, Y = 120, ratio = 0.22, base = Y + T.H;
  const P = (u, v) => [X + u, Y + v];
  return (
    <Plate idp={idp} w={1500} h={1060} name="tube-colourway" title="The project tube in its second colourway, Dark Blue with an Active Blue lid face, lit from the right" spot={{ x: 0.74, y: 0.14 }} split={0.4} floor={0.8} no="06">
      <ShadowG idp={`${idp}-sh`} cx={X - 20} cy={base + 4} rx={180} ry={40} dir={{ x: -0.9, y: 0.1 }} />
      <LitG><TubeG idp={idp} tone="dark" x={X} y={Y} ratio={ratio} right /></LitG>
      <Callouts tx={560} side="left" rows={[
        ['Card rim', P(0, -34), 90],
        ['Lid face', P(0, 8), 190],
        ['Lid band', P(-152, 30), 300],
        ['Printed label', P(-45, 235), 440],
        ['Wound card body', P(-148, 640), 640],
      ]} />
      <SpecColumnG x={96} y={780} w={380} title="Second colourway" rows={[{ k: 'Body', v: 'Dark Blue #1b2043' }, { k: 'Lid face and mark', v: 'Active Blue #5983ff' }, { k: 'Print', v: 'Light grey, grey label' }]} />
    </Plate>
  );
}

// Plate 07: the connection-study drawing flat, with a turned corner.
export function DrawingPlate() {
  const idp = 'use-product-drawing', { w, h } = DRAWING, c = Math.cos(0.0524), s = Math.sin(0.0524);
  const G = (u, v) => [r2(80 + c * u + s * v), r2(140 - s * u + c * v)];
  const sheet = `M0 0H${w}V${h - 110}L${w - 110} ${h}H0Z`;
  return (
    <Plate idp={idp} w={1500} h={900} name="drawing" title="The connection-study drawing laid flat: guide lines, nodes, a single-line diagram, a lattice study and a title block, with one corner turned" spot={{ x: 0.3, y: 0.18 }} split={0.62} no="07">
      <g transform="translate(80 140) rotate(-3)">
        <CastG idp={`${idp}-cast`} d={sheet} dir={{ x: 0.6, y: 0.6 }} depth={22} opacity={0.55} blur={9} />
        <clipPath id={`${idp}-cut`}><path d={sheet} /></clipPath>
        <g clipPath={`url(#${idp}-cut)`}><DrawingG idp={idp} /></g>
        <path d={sheet} fill="none" stroke={HEX.black} strokeOpacity="0.2" />
        <path d={`M${w - 110} ${h}L${w} ${h - 110}L${w - 110} ${h - 110}Z`} fill={`url(#${idp}-card)`} />
        <path d={`M${w - 110} ${h}L${w} ${h - 110}L${w - 110} ${h - 110}Z`} fill={`url(#${idp}-shade-v)`} opacity="0.6" />
      </g>
      <DimensionG x1={G(0, 0)[0]} y1={G(0, 0)[1]} x2={G(w, 0)[0]} y2={G(w, 0)[1]} value="420 mm" offset={-48} i={5} />
      <DimensionG x1={G(0, 0)[0]} y1={G(0, 0)[1]} x2={G(0, h)[0]} y2={G(0, h)[1]} value="297 mm" offset={44} i={6} />
      <Callouts tx={1010} rows={[
        ['Guide lines and nodes', G(330, 70), 160],
        ['Lattice study', G(610, 190), 260],
        ['Single-line diagram', G(300, 160), 360],
        ['Title block', G(420, 480), 470],
        ['Turned corner', G(668, 456), 580],
      ]} />
      <SpecColumnG x={1090} y={640} w={380} rows={[{ k: 'Format', v: 'A3, 420 × 297 mm' }, { k: 'Stock', v: 'Uncoated paper' }]} />
    </Plate>
  );
}

// Plate 08: the grey label flat, 70 x 70 mm, as printed, with the client line as a neutral placeholder.
export function LabelPlate() {
  const idp = 'use-product-label', X = 110, Y = 130, S = 3.5, L = T.lbl;
  const A = (lx, ly) => [r2(X + S * (L - ly)), r2(Y + S * lx)];
  const box = `M0 0H${L}V${L}H0Z`;
  return (
    <Plate idp={idp} w={1500} h={860} name="label" title="The grey project label laid flat, with every printed line, the mark and a rule with a node" spot={{ x: 0.34, y: 0.12 }} split={0.5} no="08">
      <g transform={`translate(${X} ${Y}) scale(${S})`}>
        <CastG idp={`${idp}-cast`} d={box} dir={{ x: 0.7, y: 0.8 }} depth={4} opacity={0.55} blur={2.4} />
        <rect x="0.3" y="1" width={L} height={L} fill={mixHex(HEX.cardGrey, HEX.darkBlue, 0.45)} />
        <rect width={L} height={L} fill={HEX.labelGrey} filter={`url(#${idp}-fibre)`} />
        <g transform={`translate(${L} 0) rotate(90)`}><LabelContentG /></g>
        <rect width={L} height={L} fill={`url(#${idp}-shade)`} opacity="0.55" />
        <rect width={L} height={L} fill={`url(#${idp}-shade-v)`} opacity="0.5" />
      </g>
      <DimensionG x1={X} y1={Y} x2={X + S * L} y2={Y} value="70 mm" offset={-44} i={9} />
      <DimensionG x1={X} y1={Y} x2={X} y2={Y + S * L} value="70 mm" offset={44} i={10} />
      <Callouts tx={900} rows={[
        ['Project line', A(16, 4), 110],
        ['Client line', A(29, 4), 190],
        ['Service list', A(52, 4), 270],
        ['Closing line', A(80, 4), 350],
        ['Date', A(127, 4), 430],
        ['Rule and node', A(143, 4), 510],
        ['Web address', A(157, 4), 590],
        ['Mark', A(162, 37), 670],
      ]} />
      <SpecColumnG x={1180} y={130} w={290} rows={[{ k: 'Size', v: '70 × 70 mm' }, { k: 'Stock', v: 'Grey label paper' }, { k: 'Ink', v: 'Active Blue' }]} />
    </Plate>
  );
}
