// The print-spec sheet: an orthographic front and back drawing of the t-shirt on flat Dark Blue (no stage spot),
// with the print areas as dashed fields and a dimension line on every placement. All values are our own
// production values in plain mm (2.17 mm per drawing unit), never published brand figures.
import Art from '@/components/art/Art';
import { DimensionG, PLATE, SpecColumnG } from '@/components/art/Mockup';
import { GuidesG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { mm, place } from './fabric';
import { TEE_B, TEE_F } from './Tops';

const W = 1000, H = 700;
const FR = { x: 60, y: 110, s: 1, rot: 0 }, BK = { x: 540, y: 110, s: 1, rot: 0 };

// The print areas of the reference colourway (Dark Blue tee): x, y, w, h in drawing units.
export const AREAS = {
  front: [{ id: 'chest', x: 242, y: 58, w: 39, h: 39, label: 'Left chest print' }],
  back: [
    { id: 'back', x: 130.9, y: 102.9, w: 138.2, h: 138.2, label: 'Back print' },
    { id: 'nape', x: 176, y: 53.2, w: 48, h: 8.8, label: 'Nape mark' },
  ],
};
const sz = (a) => `${mm(a.w)} × ${mm(a.h)} mm`;

function Outline({ view, t }) {
  const d = view === 'front' ? TEE_F : TEE_B;
  const neck = view === 'front' ? 'M146 18Q200 78 254 18' : 'M146 18Q200 38 254 18';
  const line = { fill: 'none', stroke: HEX.lightBlue, strokeWidth: 1.5, strokeLinejoin: 'round' };
  const thin = { fill: 'none', stroke: PLATE.line, strokeWidth: 1, strokeDasharray: '5 4' };
  return (
    <g transform={place(t)}>
      <path d={d} {...line} className="draw" style={{ '--len': 1700, '--i': 1 }} />
      <path d={neck} transform="translate(0 14)" {...line} opacity="0.8" />
      <path d="M66 50Q104 116 84 190M334 50Q296 116 316 190M22 138L82 162M378 138L318 162M82 334H318" {...thin} />
      <path d="M200 0V372" stroke={PLATE.line} strokeWidth="0.75" strokeDasharray="14 3 2 3" opacity="0.7" />
      {AREAS[view].map((a) => (
        <g key={a.id}>
          <rect x={a.x} y={a.y} width={a.w} height={a.h} fill={HEX.activeBlue} opacity="0.16" />
          <rect x={a.x} y={a.y} width={a.w} height={a.h} fill="none" stroke={HEX.activeBlue} strokeWidth="1.5" strokeDasharray="4 3" />
          <rect x={a.x - 2.5} y={a.y - 2.5} width="5" height="5" fill={HEX.activeBlue} />
          <rect x={a.x + a.w - 2.5} y={a.y + a.h - 2.5} width="5" height="5" fill={HEX.activeBlue} />
        </g>
      ))}
    </g>
  );
}

export default function SpecSheet({ idp = 'use-apparel-spec' }) {
  const f = (v) => ({ x: FR.x + v[0], y: FR.y + v[1] });
  const b = (v) => ({ x: BK.x + v[0], y: BK.y + v[1] });
  const dim = (p, q, value, offset, i) => <DimensionG x1={p.x} y1={p.y} x2={q.x} y2={q.y} value={value} offset={offset} i={i} size={14} />;
  const C = AREAS.front[0], B = AREAS.back[0], N = AREAS.back[1];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Print-spec sheet: front and back drawing of the t-shirt with print areas and dimensions in mm" exportName="use-apparel-print-spec">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <GuidesG w={W} h={H} xs={[28, W - 28, 500]} ys={[28, H - 28]} stroke={PLATE.line} weight={0.75} node={6} animate opacity="0.55" />
      <text x={FR.x} y="76" fontSize="22" fill={PLATE.text}>Front</text>
      <text x={BK.x} y="76" fontSize="22" fill={PLATE.text}>Back</text>
      <Outline view="front" t={FR} />
      <Outline view="back" t={BK} />
      {dim(f([80, 350]), f([320, 350]), `${mm(240)} mm`, 30, 2)}
      {dim(f([320, 18]), f([320, 350]), `${mm(332)} mm`, -60, 3)}
      {dim(f([66, 50]), f([14, 150]), `${mm(113)} mm`, 22, 4)}
      {dim(f([C.x, C.y]), f([C.x + C.w, C.y]), `${mm(C.w)} mm`, -16, 5)}
      {dim(f([C.x + C.w + 10, 18]), f([C.x + C.w + 10, C.y]), `${mm(C.y - 18)} mm`, 16, 6)}
      {dim(b([B.x, B.y + B.h]), b([B.x + B.w, B.y + B.h]), `${mm(B.w)} mm`, 22, 5)}
      {dim(b([B.x, B.y]), b([B.x, B.y + B.h]), `${mm(B.h)} mm`, 18, 6)}
      {dim(b([N.x, N.y]), b([N.x + N.w, N.y]), `${mm(N.w)} mm`, -12, 7)}
      {dim(b([80, 350]), b([320, 350]), `${mm(240)} mm`, 30, 2)}
      {dim(b([B.x + B.w + 10, 36]), b([B.x + B.w + 10, B.y]), `${mm(B.y - 36)} mm`, -14, 8)}
      <SpecColumnG x={60} y={522} w={400} title="Front print areas" rows={[{ k: C.label, v: sz(C) }]} rowH={36} size={15} />
      <SpecColumnG x={540} y={522} w={400} title="Back print areas" rows={[{ k: B.label, v: sz(B) }, { k: N.label, v: sz(N) }]} rowH={36} size={15} />
    </Art>
  );
}
