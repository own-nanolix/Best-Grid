// Plates 5 to 7. The tri-fold brochure standing in a Z, the report stack of m02 with its spines to the left (the title and
// the years run off the plate's picture edge as printed), and the five slides fanned in depth.
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';
import Art from '@/components/art/Art';
import { CalloutG, DimensionG, PlateFrameG, SpecColumnG, ShadowG, LitG, CalloutsG } from '@/components/art/Mockup';
import { Base, CastPoly, mat, rectPoly, ID } from './kit';
import { PanelG, PANEL, ReportCoverG, ReportSpineG, REPORT_FACE } from './Objects';
import { SLIDES, SLIDE } from './Slides';

// ---------------------------------------------------------------------------------------------------------------
// Plate 5. Three panels of one A4 sheet, each a skewed face: the fold lines change tone (ridge lit, valley dark).
export function Brochure() {
  const idp = `${ID}-brochure`, W = 960, H = 700, spot = { x: 0.22, y: 0.2 }, floor = 0.74;
  const sx = 0.76, sy = 0.8, sk = 0.2, x0 = 130, y0 = 130, pw = PANEL.w * sx, ph = PANEL.h * sy;
  const faces = [
    { kind: 'cover', mat: 'board', e: x0, f: y0, k: sk, over: HEX.white, o: 0.1 },
    { kind: 'inside', mat: 'paper', e: x0 + pw, f: y0 + sk * PANEL.w, k: -sk, over: HEX.black, o: 0.2 },
    { kind: 'back', mat: 'board-dark', e: x0 + 2 * pw, f: y0, k: sk, over: HEX.white, o: 0.06 },
  ];
  const m = (p) => `matrix(${sx} ${p.k} 0 ${sy} ${r2(p.e)} ${r2(p.f)})`;
  const pt = (p, x, y) => [r2(p.e + sx * x), r2(p.f + p.k * x + sy * y)];
  const foot = faces.map((p) => [pt(p, 0, PANEL.h), pt(p, PANEL.w, PANEL.h)]);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Tri-fold brochure standing in a Z with panel widths dimensioned" exportName="use-stationery-brochure">
      <Base idp={idp} w={W} h={H} spot={spot} floor={floor} r={0.8} fall={{ cx: 0, cy: 0, r: 1 }} />
      <PlateFrameG w={W} h={H} split={0.66} no="05" label="Tri-fold brochure" />
      <ShadowG idp={`${idp}-s1`} cx={x0 + 1.5 * pw} cy={y0 + ph + 52} rx={250} dir={{ x: 0.6, y: 0.2 }} />
      {foot.map(([a, b], i) => <CastPoly key={i} idp={idp} pts={[a, b, [b[0] + 60, b[1] - 20], [a[0] + 60, a[1] - 20]]} dx={0} dy={0} o={0.4} />)}
      <LitG>
        {faces.map((p) => (
          <g key={p.kind}>
            <g transform={m(p)}>
              <PanelG kind={p.kind} fill={`url(#${idp}-${p.mat})`} filter={`url(#${idp}-fibre)`} />
              <rect width={PANEL.w} height={PANEL.h} fill={p.over} opacity={p.o} />
              <rect width={PANEL.w} height={PANEL.h} fill={`url(#${idp}-shade-v)`} opacity="0.6" />
            </g>
            <path d={`M${pt(p, PANEL.w, 0).join(' ')}L${pt(p, PANEL.w, PANEL.h).join(' ')}`} stroke={HEX.white} strokeWidth="1" opacity="0.4" />
          </g>
        ))}
      </LitG>
      <CalloutsG>
        <CalloutG x={pt(faces[0], 100, 250)[0]} y={pt(faces[0], 100, 250)[1]} tx={660} ty={270} label="Cover panel" sub="Active Blue" i={0} />
        <CalloutG x={pt(faces[0], PANEL.w, 200)[0]} y={pt(faces[0], PANEL.w, 200)[1]} tx={660} ty={200} label="Fold line" sub="Ridge and valley" i={1} />
        <CalloutG x={pt(faces[1], 100, 100)[0]} y={pt(faces[1], 100, 100)[1]} tx={660} ty={130} label="Inside panel" sub="Ruled cells" i={2} />
        <CalloutG x={pt(faces[2], 100, 330)[0]} y={pt(faces[2], 100, 330)[1]} tx={660} ty={340} label="Back panel" sub="Contact details" i={3} />
      </CalloutsG>
      {foot.map(([a, b], i) => <DimensionG key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} value="99 mm" offset={26} i={4 + i} />)}
      <DimensionG x1={pt(faces[0], 0, 0)[0]} y1={pt(faces[0], 0, 0)[1]} x2={pt(faces[0], 0, PANEL.h)[0]} y2={pt(faces[0], 0, PANEL.h)[1]} value="210 mm" offset={36} i={7} />
      <SpecColumnG x={620} y={430} w={290} title="Print spec" rows={[{ k: 'Sheet', v: 'A4, 297 × 210 mm' }, { k: 'Fold', v: 'Z-fold, 3 panels' }, { k: 'Stock', v: '170 g/m²' }]} rowH={38} />
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Plate 6. Report stack, isometric: the covers lie on the u and v axes, the spine hangs along the cover's left edge.
export function ReportPlate() {
  const idp = `${ID}-report`, W = 960, H = 700, spot = { x: 0.22, y: 0.16 };
  const u = [0.88, -0.38], v = [0.5, 0.72], t = [-0.62, 0.5], T = 64;
  const { w: cw, h: ch } = REPORT_FACE;
  const O = [0, 0], step = [-58, 96];
  const reps = [0, 1, 2].map((i) => ({ i, o: [O[0] + step[0] * i, O[1] + step[1] * i], tone: i === 1 ? 'dark' : 'active' }));
  const G = (x, y) => [r2(170 + 0.8 * x), r2(110 + 0.8 * y)];
  const at = (r, a, b) => G(r.o[0] + u[0] * a + v[0] * b, r.o[1] + u[1] * a + v[1] * b);
  const sp = (r, a, b) => G(r.o[0] + v[0] * a + t[0] * b, r.o[1] + v[1] * a + t[1] * b);
  const base = reps[2].o;
  const foot = [base, [base[0] + u[0] * cw, base[1] + u[1] * cw], [base[0] + u[0] * cw + v[0] * ch, base[1] + u[1] * cw + v[1] * ch], [base[0] + v[0] * ch, base[1] + v[1] * ch]];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Three report covers stacked with their spines to the left, spine width and format dimensioned" exportName="use-stationery-report">
      <Base idp={idp} w={W} h={H} spot={spot} r={0.8} fall={{ cx: 0, cy: 0, r: 1 }} />
      <clipPath id={`${idp}-zone`}><rect x="40" y="94" width="578" height="600" /></clipPath>
      <PlateFrameG w={W} h={H} split={0.68} no="06" label="Report cover with spine" />
      <rect x="40" y="94" width="578" height="560" fill="none" stroke={HEX.mutedOnDark} strokeWidth="0.75" opacity="0.5" />
      <g clipPath={`url(#${idp}-zone)`}>
        <g transform="translate(170 110) scale(0.8)">
          <CastPoly idp={idp} pts={foot} dx={34} dy={40} o={0.55} />
          <LitG>
            {[...reps].reverse().map((r) => (
              <g key={r.i}>
                <g transform={mat(v, t, r.o)}>
                  <ReportSpineG tone={r.tone} fill={`url(#${idp}-${r.tone === 'dark' ? 'board' : 'board-dark'})`} />
                  <rect width={ch} height={T} fill={`url(#${idp}-shade-v)`} />
                  <rect width={ch} height={T} fill={HEX.black} opacity="0.22" />
                </g>
                <g transform={mat(u, v, r.o)}>
                  <ReportCoverG tone={r.tone} fill={`url(#${idp}-${r.tone === 'dark' ? 'board-dark' : 'board'})`} filter={`url(#${idp}-${r.tone === 'dark' ? 'fibre' : 'grit'})`} />
                  <rect width={cw} height={ch} fill={`url(#${idp}-shade-v)`} />
                  <rect width="1" height={ch} fill={HEX.white} opacity="0.35" />
                </g>
              </g>
            ))}
          </LitG>
        </g>
      </g>
      <CalloutsG>
        <CalloutG x={sp(reps[0], 20, 32)[0]} y={sp(reps[0], 20, 32)[1]} tx={200} ty={58} label="Spine" sub="Mark, IDAA, [24 – 25], BGS" i={0} />
        <CalloutG x={at(reps[0], 200, 330)[0]} y={at(reps[0], 200, 330)[1]} tx={690} ty={200} label="Cover" sub="Title, closing line, years" i={1} />
        <CalloutG x={at(reps[1], 200, 560)[0]} y={at(reps[1], 200, 560)[1]} tx={690} ty={400} label="Dark Blue cover" sub="Light type" i={2} />
      </CalloutsG>
      <DimensionG x1={sp(reps[2], 0, T)[0]} y1={sp(reps[2], 0, T)[1]} x2={sp(reps[2], ch, T)[0]} y2={sp(reps[2], ch, T)[1]} value="310 mm" offset={26} i={4} />
      <DimensionG x1={sp(reps[2], ch, 0)[0]} y1={sp(reps[2], ch, 0)[1]} x2={sp(reps[2], ch, T)[0]} y2={sp(reps[2], ch, T)[1]} value="18 mm" offset={-24} i={5} />
      <SpecColumnG x={690} y={470} w={220} rows={[{ k: 'Format', v: '220 × 310 mm' }, { k: 'Spine', v: '18 mm' }, { k: 'Binding', v: 'Perfect-bound' }]} rowH={38} />
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Plate 7. Five slides fanned in depth, the front one straight on: each behind is smaller, turned and in more shade.
export function DeckPlate() {
  const idp = `${ID}-deck`, W = 960, H = 700, spot = { x: 0.3, y: 0.18 };
  const sc = 0.26, fw = SLIDE.w * sc, fh = SLIDE.h * sc, front = [300, 430];
  const place = (k) => ({ c: [front[0] + 48 * k, front[1] - 46 * k], rot: k * 2.6, s: sc * (1 - 0.055 * k) });
  const order = [...SLIDES.keys()].reverse();
  // a point on a slide's top edge, in the plate
  const edge = (k) => {
    const p = place(k), a = (p.rot * Math.PI) / 180, dx = (SLIDE.w * 0.72 - SLIDE.w / 2) * p.s, dy = (30 - SLIDE.h / 2) * p.s;
    return [r2(p.c[0] + dx * Math.cos(a) - dy * Math.sin(a)), r2(p.c[1] + dx * Math.sin(a) + dy * Math.cos(a))];
  };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Five slides fanned in depth like cards, the front one straight on" exportName="use-stationery-deck">
      <Base idp={idp} w={W} h={H} spot={spot} r={0.8} fall={{ cx: 0, cy: 0, r: 1 }} />
      <PlateFrameG w={W} h={H} split={0.72} no="07" label="Slide deck" />
      <ShadowG idp={`${idp}-s1`} cx={400} cy={600} rx={300} dir={{ x: 0.5, y: 0.2 }} opacity={0.5} />
      {order.map((k) => {
        const p = place(k), { G } = SLIDES[k];
        const body = (
          <g transform={`translate(${p.c[0]} ${p.c[1]}) rotate(${p.rot}) scale(${p.s}) translate(${-SLIDE.w / 2} ${-SLIDE.h / 2})`}>
            <G />
            <rect width={SLIDE.w} height={SLIDE.h} fill={HEX.black} opacity={r2(k * 0.13)} />
            <rect width={SLIDE.w} height={SLIDE.h} fill={`url(#${idp}-${spot.x < 0.5 ? 'shade' : 'shade-r'})`} opacity="0.55" />
            <rect x="0" y={SLIDE.h - 6} width={SLIDE.w} height="6" fill={HEX.black} opacity="0.3" />
          </g>
        );
        return (
          <g key={k}>
            <CastPoly idp={idp} pts={rectPoly(p.c[0] - (SLIDE.w * p.s) / 2, p.c[1] - (SLIDE.h * p.s) / 2, SLIDE.w * p.s, SLIDE.h * p.s, p.rot)} dx={16} dy={20} o={0.35} />
            {k === 0 ? <LitG>{body}</LitG> : body}
          </g>
        );
      })}
      {SLIDES.map((s, k) => {
        const p = place(k), a = k ? edge(k) : [p.c[0] + fw / 2 - 30, p.c[1] + fh / 2 - 40];
        return <CalloutG key={s.key} x={a[0]} y={a[1]} tx={730} ty={120 + (4 - k) * 60} label={s.title} sub={`Slide ${k + 1} of 5`} i={k} />;
      })}
      <DimensionG x1={front[0] - fw / 2} y1={front[1] + fh / 2} x2={front[0] + fw / 2} y2={front[1] + fh / 2} value="1600 px" offset={24} i={5} />
      <SpecColumnG x={700} y={470} w={210} rows={[{ k: 'Format', v: '16:9' }, { k: 'Size', v: '1600 × 900 px' }]} rowH={38} />
    </Art>
  );
}
