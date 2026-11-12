// Plates 3 and 4. The two business cards leaning on a block at eye level (m06), and two notebooks with a pen on top.
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';
import Art from '@/components/art/Art';
import { CalloutG, DimensionG, PlateFrameG, SpecColumnG, ShadowG, LitG } from '@/components/art/Mockup';
import { Base, CastPoly, EdgeLines, rectPoly, ID } from './kit';
import { CardFrontG, CardBackG, CARD } from './Print';
import { NotebookG, PenG, NOTE, PEN } from './Objects';

// A point of a card (local x, y) after its matrix [a b c d e f].
const tp = (m, x, y) => [r2(m[0] * x + m[2] * y + m[4]), r2(m[1] * x + m[3] * y + m[5])];

// Plate 3. The card matrix leans the top away: the dark card behind, the white front in front, a block behind both.
export function CardsPlate() {
  const idp = `${ID}-cards`, W = 960, H = 700, spot = { x: 0.3, y: 0.18 }, floor = 0.72;
  const dk = [0.485, 0, -0.06, 0.48, 109.8, 361.6];
  const wt = [0.485, 0, -0.06, 0.48, 329.8, 397.6];
  const M = (m) => `matrix(${m.join(' ')})`;
  const floorShadow = (m) => [tp(m, 0, CARD.h), tp(m, CARD.w, CARD.h), [tp(m, CARD.w, CARD.h)[0] + 70, tp(m, CARD.w, CARD.h)[1] - 16], [tp(m, 0, CARD.h)[0] + 70, tp(m, 0, CARD.h)[1] - 16]];
  const sh = `url(#${idp}-shade)`;
  const wtTop = [tp(wt, 0, 0), tp(wt, CARD.w, 0)], wtRight = [tp(wt, CARD.w, 0), tp(wt, CARD.w, CARD.h)];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Business cards, front and back, leaning on a block at eye level with 85 by 55 mm dimensions" exportName="use-stationery-cards-plate">
      <Base idp={idp} w={W} h={H} spot={spot} floor={floor} r={0.8} fall={{ cx: 0, cy: 0, r: 1 }} />
      <PlateFrameG w={W} h={H} split={0.62} no="03" label="Business cards" />
      <ShadowG idp={`${idp}-s1`} cx={260} cy={528} rx={230} dir={{ x: 0.5, y: 0.2 }} />
      <ShadowG idp={`${idp}-s2`} cx={440} cy={556} rx={220} dir={{ x: 0.5, y: 0.2 }} opacity={0.5} />
      <CastPoly idp={idp} pts={floorShadow(dk)} dx={0} dy={0} o={0.45} />
      <CastPoly idp={idp} pts={floorShadow(wt)} dx={0} dy={0} o={0.45} />
      <g>
        <path d="M300 290H440V520H300Z" fill={`url(#${idp}-board-dark)`} />
        <path d="M300 290L330 268H470L440 290Z" fill={HEX.darkBlue} opacity="0.9" />
        <path d="M300 290L330 268H470L440 290Z" fill={HEX.white} opacity="0.16" />
        <path d="M440 290L470 268V496L440 520Z" fill={HEX.black} opacity="0.5" />
        <rect x="300" y="290" width="140" height="230" fill={sh} />
      </g>
      <g transform={M(dk)}>
        <rect x={CARD.w} y="0" width="12" height={CARD.h} fill={HEX.activeBlue} />
        <rect x="0" y={CARD.h} width={CARD.w + 12} height="9" fill={HEX.activeBlue} opacity="0.75" />
        <CardBackG idp={`${idp}-b`} fill={`url(#${idp}-board-dark)`} />
        <rect width={CARD.w} height={CARD.h} fill={sh} />
      </g>
      <LitG>
        <g transform={M(wt)}>
          <rect x={CARD.w} y="0" width="9" height={CARD.h} fill={HEX.paper} />
          <EdgeLines x={CARD.w} y="0" w={9} h={CARD.h} n={5} horizontal={false} />
          <rect x="0" y={CARD.h} width={CARD.w + 9} height="8" fill={HEX.cardGrey} />
          <EdgeLines x={0} y={CARD.h} w={CARD.w + 9} h={8} n={3} />
          <CardFrontG idp={`${idp}-f`} fill={`url(#${idp}-paper)`} filter={`url(#${idp}-fibre)`} />
          <rect width={CARD.w} height={CARD.h} fill={sh} />
        </g>
      </LitG>
      <CalloutG x={tp(dk, -6, 150)[0]} y={tp(dk, -6, 150)[1]} tx={90} ty={200} label="Painted edge" sub="Active Blue" i={0} />
      <CalloutG x={tp(wt, 47, 281)[0]} y={tp(wt, 47, 281)[1]} tx={260} ty={600} side="left" label="Blind-embossed mark" sub="No ink" i={1} />
      <CalloutG x={tp(wt, CARD.w - 60, 40)[0]} y={tp(wt, CARD.w - 60, 40)[1]} tx={640} ty={330} label="Front" sub="Name, role, contact" i={2} />
      <CalloutG x={tp(dk, 20, 20)[0]} y={tp(dk, 20, 20)[1]} tx={90} ty={120} label="Back" sub="Word-mark and mark" i={3} />
      <DimensionG x1={tp(wt, 0, CARD.h)[0]} y1={tp(wt, 0, CARD.h)[1]} x2={tp(wt, CARD.w, CARD.h)[0]} y2={tp(wt, CARD.w, CARD.h)[1]} value="85 mm" offset={34} i={4} />
      <DimensionG x1={wtRight[0][0]} y1={wtRight[0][1]} x2={wtRight[1][0]} y2={wtRight[1][1]} value="55 mm" offset={-30} i={5} />
      <SpecColumnG x={620} y={430} w={290} title="Print spec" rows={[{ k: 'Format', v: '85 × 55 mm' }, { k: 'Stock', v: '600 g/m², duplex' }, { k: 'Edge', v: 'Painted, Active Blue' }, { k: 'Finish', v: 'Blind emboss' }]} />
    </Art>
  );
}

// A notebook lying flat: its stack edge on the side away from the light, a cast shadow, then the cover.
function Pad({ idp, c, rot, tone, spot }) {
  const t = 9;
  const pts = rectPoly(c[0] - NOTE.w / 2, c[1] - NOTE.h / 2, NOTE.w + t, NOTE.h + t, rot);
  return (
    <g>
      <CastPoly idp={idp} pts={pts} dx={22} dy={28} o={0.5} />
      <g transform={`translate(${c[0]} ${c[1]}) rotate(${rot}) translate(${-NOTE.w / 2} ${-NOTE.h / 2})`}>
        <rect x="3" y="3" width={NOTE.w + t - 3} height={NOTE.h + t - 3} fill={`url(#${idp}-paper)`} />
        <EdgeLines x={NOTE.w} y={3} w={t} h={NOTE.h} n={7} />
        <EdgeLines x={3} y={NOTE.h} w={NOTE.w} h={t} n={7} horizontal={false} />
        <NotebookG tone={tone} fill={`url(#${idp}-${tone === 'dark' ? 'board-dark' : 'board'})`} filter={`url(#${idp}-grit)`} />
        <rect width={NOTE.w} height={NOTE.h} fill={`url(#${idp}-${spot.x < 0.5 ? 'shade' : 'shade-r'})`} />
        <rect x="0" width="5" height={NOTE.h} fill={HEX.black} opacity="0.2" />
        <rect x="9" width="0.8" height={NOTE.h} fill={HEX.white} opacity="0.2" />
      </g>
    </g>
  );
}

// Plate 4. Top view, object on the left, callouts and the spec column on the right.
export function PenNotebooks() {
  const idp = `${ID}-pen-notebooks`, W = 960, H = 700, spot = { x: 0.28, y: 0.2 };
  const lc = [262, 388], uc = [246, 368], ps = 0.555, pc = [330, 330], pr = -38;
  const upper = rectPoly(uc[0] - NOTE.w / 2, uc[1] - NOTE.h / 2, NOTE.w, NOTE.h, -3);
  const pen = (x, y) => {
    const a = (pr * Math.PI) / 180, dx = (x - PEN.w / 2) * ps, dy = (y - PEN.h / 2) * ps;
    return [r2(pc[0] + dx * Math.cos(a) - dy * Math.sin(a)), r2(pc[1] + dx * Math.sin(a) + dy * Math.cos(a))];
  };
  const rot = (c, deg, x, y) => {
    const a = (deg * Math.PI) / 180, dx = x - NOTE.w / 2, dy = y - NOTE.h / 2;
    return [r2(c[0] + dx * Math.cos(a) - dy * Math.sin(a)), r2(c[1] + dx * Math.sin(a) + dy * Math.cos(a))];
  };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Two notebooks stacked with a pen on top, top view, with callouts" exportName="use-stationery-pen-notebooks">
      <Base idp={idp} w={W} h={H} spot={spot} r={0.8} fall={{ cx: 0, cy: 0, r: 1 }} />
      <PlateFrameG w={W} h={H} split={0.56} no="04" label="Pen and notebooks" />
      <Pad idp={idp} c={lc} rot={6} tone="dark" spot={spot} />
      <LitG>
        <Pad idp={idp} c={uc} rot={-3} tone="active" spot={spot} />
        <g>
          <g transform={`translate(${pc[0] + 16} ${pc[1] + 20}) rotate(${pr}) scale(${ps}) translate(${-PEN.w / 2} ${-PEN.h / 2})`} opacity="0.55" filter={`url(#${idp}-blur)`}>
            <rect y="2" width={PEN.w} height="24" fill={HEX.black} />
          </g>
          <g transform={`translate(${pc[0]} ${pc[1]}) rotate(${pr}) scale(${ps}) translate(${-PEN.w / 2} ${-PEN.h / 2})`}>
            <PenG idp={idp} />
          </g>
        </g>
      </LitG>
      <CalloutG x={pen(480, 0)[0]} y={pen(480, 0)[1]} tx={620} ty={180} label="Pen clip" sub="Metal" i={0} />
      <CalloutG x={pen(220, 14)[0]} y={pen(220, 14)[1]} tx={620} ty={320} label="Barrel" sub="Matte Dark Blue, word-mark" i={1} />
      <CalloutG x={rot(uc, -3, 200, 60)[0]} y={rot(uc, -3, 200, 60)[1]} tx={620} ty={110} label="Notebook cover" sub="Active Blue, ruled cells" i={2} />
      <CalloutG x={rot(lc, 6, 285, 100)[0]} y={rot(lc, 6, 285, 100)[1]} tx={620} ty={250} label="Notebook cover" sub="Dark Blue" i={3} />
      <CalloutG x={rot(lc, 6, 301, 200)[0]} y={rot(lc, 6, 301, 200)[1]} tx={620} ty={390} label="Stack edge" sub="Page block" i={4} />
      <DimensionG x1={upper[0][0]} y1={upper[0][1]} x2={upper[3][0]} y2={upper[3][1]} value="210 mm" offset={30} i={5} />
      <DimensionG x1={upper[0][0]} y1={upper[0][1]} x2={upper[1][0]} y2={upper[1][1]} value="148 mm" offset={-30} i={6} />
      <SpecColumnG x={560} y={450} w={330} title="Print spec" rows={[{ k: 'Notebook', v: 'A5, 148 × 210 mm' }, { k: 'Cover', v: 'Board, wrapped' }, { k: 'Pen', v: '150 mm, metal clip' }]} rowH={38} />
    </Art>
  );
}
