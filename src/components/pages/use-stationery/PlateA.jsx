// Plates 1 and 2. The flat lay of m05 rebuilt from above on the stage, and the letterhead with its DL envelope.
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';
import Art from '@/components/art/Art';
import { CalloutG, DimensionG, PlateFrameG, SpecColumnG, LitG } from '@/components/art/Mockup';
import { Base, CastPoly, rectPoly, shadeFor, ID } from './kit';
import { LetterheadG, EnvelopeG, CardFrontG, CardBackG, FolderG, MailerG, MailerCardG, LETTER, ENVELOPE, CARD, FOLDER, MAILER, MAILCARD } from './Print';

// ---------------------------------------------------------------------------------------------------------------
// Plate 1: the flat lay (m05) from above. Source pixel coordinates sit in one scaled group.
export function FlatLay() {
  const idp = `${ID}-flat-lay`, W = 1600, H = 1000, k = 0.59, ox = 330, oy = 130, spot = { x: 0.36, y: 0.2 };
  const P = ([x, y]) => [r2(ox + k * x), r2(oy + k * y)];
  const sc = (w, tw) => r2(tw / w);
  // each object: its place (source px), its size, and its art
  const parts = [
    { id: 'mail', x: 1186, y: 0, w: MAILER.w, h: MAILER.h },
    { id: 'mc', x: 1237, y: 427, w: MAILCARD.w, h: MAILCARD.h },
    { id: 'fold', x: 0, y: 0, w: FOLDER.w, h: FOLDER.h },
    { id: 'let', x: 440, y: 328, w: 620, h: 877 },
    { id: 'cf', x: 742, y: 98, w: 256, h: 164 },
    { id: 'cb', x: 742, y: 293, w: 256, h: 164 },
    { id: 'stack', x: 170, y: 815, w: 147, h: 255 },
    { id: 'env', x: 885, y: 745, w: 645, h: 322 },
  ];
  const paper = `url(#${idp}-paper)`, fibre = `url(#${idp}-fibre)`;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Stationery flat lay from above: folder, letterhead, business cards, DL envelope and bubble mailer" exportName="use-stationery-flat-lay">
      <Base idp={idp} w={W} h={H} spot={spot} r={0.7} fall={{ cx: (spot.x * W - ox) / k, cy: (spot.y * H - oy) / k, r: 1500 }} />
      <PlateFrameG w={W} h={H} no="01" label="Flat lay" />
      <g transform={`translate(${ox} ${oy}) scale(${k})`}>
        {parts.map((p) => <CastPoly key={p.id} idp={idp} pts={rectPoly(p.x, p.y, p.w, p.h)} dx={16} dy={24} o={0.5} />)}
        <g transform="translate(1186 0)"><MailerG idp={`${idp}-m`} /><rect width={MAILER.w} height={MAILER.h} fill={`url(#${idp}-fall)`} /></g>
        <g transform={`translate(1237 427) scale(${sc(MAILCARD.w, 323)})`}><MailerCardG fill={`url(#${idp}-card)`} /><rect width={MAILCARD.w} height={MAILCARD.h} fill={`url(#${idp}-fall)`} /></g>
        <FolderG idp={`${idp}-f`} fill={`url(#${idp}-board-dark)`} filter={fibre} />
        <rect width={FOLDER.w} height={FOLDER.h} fill={`url(#${idp}-fall)`} />
        <g transform={`translate(440 328) scale(${sc(LETTER.w, 620)})`}><LetterheadG fill={paper} filter={fibre} /><rect width={LETTER.w} height={LETTER.h} fill={`url(#${idp}-fall)`} /></g>
        <g transform={`translate(742 98) scale(${sc(CARD.w, 256)})`}><CardFrontG idp={`${idp}-cf`} fill={paper} filter={fibre} /><rect width={CARD.w} height={CARD.h} fill={`url(#${idp}-fall)`} /></g>
        <g transform={`translate(742 293) scale(${sc(CARD.w, 256)})`}><CardBackG idp={`${idp}-cb`} fill={`url(#${idp}-board-dark)`} /><rect width={CARD.w} height={CARD.h} fill={`url(#${idp}-fall)`} /></g>
        <g>
          <rect x="170" y="815" width="147" height="255" fill={HEX.activeBlue} />
          {Array.from({ length: 36 }, (_, i) => <rect key={i} x={170 + i * 4.1} y="815" width="1.2" height="255" fill={i % 2 ? HEX.white : HEX.black} opacity="0.14" />)}
          <rect x="170" y="815" width="147" height="255" fill={`url(#${idp}-fall)`} />
        </g>
        <g transform={`translate(885 745) scale(${sc(ENVELOPE.w, 645)})`}><EnvelopeG fill={`url(#${idp}-board)`} filter={fibre} /><rect width={ENVELOPE.w} height={ENVELOPE.h} fill={`url(#${idp}-fall)`} /></g>
      </g>
      <CalloutG {...{ x: P([140, 300])[0], y: P([140, 300])[1], tx: 286, ty: 210, label: 'Pocket folder', sub: 'Crossing bands', side: 'left', i: 0 }} />
      <CalloutG {...{ x: P([240, 940])[0], y: P([240, 940])[1], tx: 286, ty: 780, label: 'Card stack', sub: 'Painted edges', side: 'left', i: 1 }} />
      <CalloutG {...{ x: P([470, 1150])[0], y: P([470, 1150])[1], tx: 286, ty: 880, label: 'Letterhead', sub: 'A4', side: 'left', i: 2 }} />
      <CalloutG {...{ x: P([850, 100])[0], y: P([850, 100])[1], tx: 980, ty: 70, label: 'Business cards', sub: '85 × 55 mm', side: 'right', i: 3 }} />
      <CalloutG {...{ x: P([1400, 260])[0], y: P([1400, 260])[1], tx: 1340, ty: 300, label: 'Bubble mailer', sub: 'With card', side: 'right', i: 4 }} />
      <CalloutG {...{ x: P([1450, 1000])[0], y: P([1450, 1000])[1], tx: 1340, ty: 760, label: 'DL envelope', sub: '220 × 110 mm', side: 'right', i: 5 }} />
      <DimensionG x1={P([440, 0])[0]} y1={P([0, 1205])[1]} x2={P([1060, 0])[0]} y2={P([0, 1205])[1]} value="210 mm" offset={26} i={6} />
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Plate 2: the letterhead upright at 5 degrees, the DL envelope in front, both on the left; A4 and DL on the right.
export function LetterEnvelope() {
  const idp = `${ID}-letter-envelope`, W = 960, H = 700, spot = { x: 0.2, y: 0.14 };
  const ls = 0.56, es = 0.5, lc = [240, 300], ec = [262, 530];
  const lPts = rectPoly(lc[0] - (LETTER.w * ls) / 2, lc[1] - (LETTER.h * ls) / 2, LETTER.w * ls, LETTER.h * ls, 5);
  const ePts = rectPoly(ec[0] - (ENVELOPE.w * es) / 2, ec[1] - (ENVELOPE.h * es) / 2, ENVELOPE.w * es, ENVELOPE.h * es, -3);
  const paper = `url(#${idp}-paper)`, fibre = `url(#${idp}-fibre)`, sh = `url(#${idp}-${shadeFor(spot)})`;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Letterhead and DL envelope on the stage with A4 and DL dimensions" exportName="use-stationery-letter-envelope">
      <Base idp={idp} w={W} h={H} spot={spot} r={0.7} fall={{ cx: 0, cy: 0, r: 1 }} />
      <PlateFrameG w={W} h={H} split={0.55} no="02" label="Letterhead and envelope" />
      <CastPoly idp={idp} pts={lPts} dx={26} dy={30} o={0.55} />
      <LitG>
        <g transform={`translate(${lc[0]} ${lc[1]}) rotate(5) scale(${ls}) translate(${-LETTER.w / 2} ${-LETTER.h / 2})`}>
          <LetterheadG fill={paper} filter={fibre} />
          <rect width={LETTER.w} height={LETTER.h} fill={sh} opacity="0.6" />
          <rect x={LETTER.w - 3} width="3" height={LETTER.h} fill={HEX.darkBlue} opacity="0.12" />
        </g>
      </LitG>
      <CastPoly idp={idp} pts={ePts} dx={22} dy={26} o={0.6} />
      <LitG>
        <g transform={`translate(${ec[0]} ${ec[1]}) rotate(-3) scale(${es}) translate(${-ENVELOPE.w / 2} ${-ENVELOPE.h / 2})`}>
          <EnvelopeG fill={`url(#${idp}-board)`} filter={fibre} />
          <rect width={ENVELOPE.w} height={ENVELOPE.h} fill={sh} opacity="0.6" />
          <rect y={ENVELOPE.h - 3} width={ENVELOPE.w} height="3" fill={HEX.black} opacity="0.25" />
        </g>
      </LitG>
      <CalloutG x={lc[0] - 20} y={lc[1] - 150} tx={580} ty={130} label="Letterhead" sub="Uncoated paper" i={0} />
      <CalloutG x={lc[0] + 40} y={lc[1] + 20} tx={580} ty={220} label="Guide hairlines" sub="Dark Blue, 0.25 pt" i={1} />
      <CalloutG x={ec[0] + 150} y={ec[1] + 40} tx={580} ty={470} label="DL envelope" sub="Active Blue stock" i={2} />
      <CalloutG x={ec[0] + 150} y={ec[1] - 12} tx={580} ty={400} label="Flap" sub="Tone change at the fold" i={3} />
      <DimensionG x1={lPts[0][0]} y1={lPts[0][1]} x2={lPts[3][0]} y2={lPts[3][1]} value="297 mm" offset={24} i={4} />
      <DimensionG x1={ePts[3][0]} y1={ePts[3][1] + 8} x2={ePts[2][0]} y2={ePts[2][1] + 8} value="220 mm" offset={26} i={5} />
      <SpecColumnG x={560} y={496} w={330} rowH={32} title="Print spec" rows={[{ k: 'Letterhead', v: 'A4, 210 × 297 mm' }, { k: 'Envelope', v: 'DL, 220 × 110 mm' }, { k: 'Stock', v: '100 g/m², uncoated' }]} />
    </Art>
  );
}
