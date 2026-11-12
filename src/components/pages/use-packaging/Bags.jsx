import { CalloutG, DimensionG, LitG, ShadowG } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CrossingBandsG, NodeG } from '@/components/art/KeyArt';
import { HEX, CONTACT, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Plate, Cast, pts, BLUE, INK } from './kit';

// Three shopping bags of different heights, one per plate (1 px = 1.25 mm). Each bag has a folded top, a gusset
// that folds in a V, eyelets and handles that pass behind the front wall. The artwork is the shared mark,
// word-mark and crossing bands; lines are printed as in the case study.

function Rope({ d, w, color, ribbon, shade = 0 }) {
  return (
    <g fill="none" strokeLinecap="round" opacity={1 - shade}>
      {ribbon ? (
        <>
          <path d={d} stroke={color} strokeWidth={w * 2} strokeLinecap="butt" />
          <path d={d} stroke={HEX.black} strokeOpacity="0.25" strokeWidth="1" transform="translate(0 -4)" />
          <path d={d} stroke={HEX.white} strokeOpacity="0.3" strokeWidth="1" transform="translate(0 4)" />
        </>
      ) : (
        <>
          <path d={d} stroke={color} strokeWidth={w} />
          <path d={d} stroke={HEX.white} strokeOpacity="0.4" strokeWidth={w} strokeDasharray="1.6 3.4" />
          <path d={d} stroke={HEX.black} strokeOpacity="0.28" strokeWidth="1" transform="translate(0 2)" />
        </>
      )}
    </g>
  );
}

function Eyelet({ idp, x, y }) {
  return (
    <g>
      <circle cx={x} cy={y + 1} r="8" fill={HEX.black} opacity="0.3" />
      <circle cx={x} cy={y} r="7" fill={`url(#${idp}-metal)`} />
      <circle cx={x} cy={y} r="3.4" fill={HEX.black} opacity="0.85" />
      <path d={`M${x - 5} ${y - 2}A5.5 5.5 0 0 1 ${x + 2} ${y - 5.2}`} stroke={HEX.white} strokeWidth="1" fill="none" opacity="0.8" />
    </g>
  );
}

// x, y: front bottom centre. s: which side the gusset shows on (1 right, -1 left), always the side away from light.
function BagG({ idp, k, x, y, w, h, d, s = 1, fill, art, rope, ropeW = 5, ribbon = false, hem = 22, handleH, eyeFrac = 0.26 }) {
  const xl = x - w / 2, xr = x + w / 2, yt = y - h;
  const ex = s === 1 ? xr : xl;
  const dx = s * d * 0.5, dy = d * 0.14, notch = 18;
  const front = [[xl, yt], [xr, yt], [xr, y], [xl, y]];
  const side = [[ex, yt], [ex + dx / 2, yt - dy / 2 + notch], [ex + dx, yt - dy], [ex + dx, y - dy], [ex + dx / 2, y - dy / 2], [ex, y]];
  const sideA = [side[0], side[1], side[4], side[5]], sideB = [side[1], side[2], side[3], side[4]];
  const mouth = [[xl, yt], [xr, yt], [xr + dx, yt - dy], [xl + dx, yt - dy]];
  const ey = yt + hem + 14, e1 = xl + w * eyeFrac, e2 = xr - w * eyeFrac;
  const hh = handleH || h * 0.32;
  const arc = (a, b, oy, ox) => `M${r2(a + ox)} ${r2(ey + oy)}C${r2(a + ox)} ${r2(ey + oy - hh * 1.35)} ${r2(b + ox)} ${r2(ey + oy - hh * 1.35)} ${r2(b + ox)} ${r2(ey + oy)}`;
  const lg = `${idp}-${k}-fl`;
  return (
    <g>
      <linearGradient id={lg} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={HEX.white} stopOpacity={s === 1 ? 0.14 : 0} />
        <stop offset="0.5" stopColor={HEX.black} stopOpacity="0" />
        <stop offset="1" stopColor={HEX.black} stopOpacity={s === 1 ? 0.05 : 0.2} />
      </linearGradient>
      <clipPath id={`${idp}-${k}-fc`}><polygon points={pts(front)} /></clipPath>
      <Rope d={arc(e1, e2, 0, dx)} w={ropeW} color={rope} ribbon={ribbon} shade={0.35} />
      <polygon points={pts(mouth)} fill={HEX.black} opacity="0.55" />
      <polygon points={pts(mouth)} fill={fill} opacity="0.35" />
      <polygon points={pts(sideA)} fill={fill} filter={`url(#${idp}-fibre)`} />
      <polygon points={pts(sideB)} fill={fill} filter={`url(#${idp}-fibre)`} />
      <polygon points={pts(sideA)} fill={HEX.black} opacity={s === 1 ? 0.3 : 0.38} />
      <polygon points={pts(sideB)} fill={HEX.black} opacity={s === 1 ? 0.44 : 0.22} />
      <polyline points={pts([side[1], side[4]])} stroke={HEX.black} strokeOpacity="0.45" strokeWidth="1.4" fill="none" />
      <polyline points={pts([[side[1][0] + s, side[1][1]], [side[4][0] + s, side[4][1]]])} stroke={HEX.white} strokeOpacity="0.25" strokeWidth="1" fill="none" />
      <polygon points={pts(front)} fill={fill} filter={`url(#${idp}-fibre)`} />
      <g clipPath={`url(#${idp}-${k}-fc)`}>
        <g transform={`translate(${r2(xl)} ${r2(yt)})`}>{art}</g>
        <rect x={xl} y={yt + hem} width={w} height="1.4" fill={HEX.black} opacity="0.3" />
        <rect x={xl} y={yt + hem + 1.4} width={w} height="1" fill={HEX.white} opacity="0.35" />
        <rect x={xl} y={yt} width={w} height={hem} fill={HEX.white} opacity="0.08" />
        <rect x={xl} y={y - 26} width={w} height="1.2" fill={HEX.black} opacity="0.18" />
        <rect x={xl + w * 0.5} y={yt} width="1" height={h} fill={HEX.black} opacity="0.05" />
        <polygon points={pts(front)} fill={`url(#${lg})`} />
      </g>
      <polyline points={pts([front[3], front[0], front[1]])} stroke={HEX.white} strokeOpacity="0.45" strokeWidth="1.2" fill="none" />
      <Rope d={arc(e1, e2, 0, 0)} w={ropeW} color={rope} ribbon={ribbon} />
      <Eyelet idp={idp} x={e1} y={ey} />
      <Eyelet idp={idp} x={e2} y={ey} />
    </g>
  );
}

const geo = ({ x, y, w, h, d, s }) => {
  const xl = x - w / 2, xr = x + w / 2;
  return { xl, xr, yt: y - h, ex: s === 1 ? xr : xl, dx: s * d * 0.5, dy: d * 0.14 };
};

// ---------------------------------------------------------------------------------------------------------------
// Bag 1: tall, Active Blue paper, rope handles. Object left, spot upper left.
export function BagTall() {
  const spot = { x: 0.22, y: 0.14 };
  const b = { x: 330, y: 560, w: 230, h: 400, d: 110, s: 1 };
  const G = geo(b);
  return (
    <Plate
      name="bag-tall" title="Tall Active Blue shopping bag with a folded top, gusset and twisted rope handles" spot={spot}
    >
      {(idp) => (
        <>
          <Cast idp={idp} k="c1" foot={[[G.xl, 560], [G.xr + G.dx, 560 - G.dy], [G.xr + G.dx, 566 - G.dy], [G.xl, 566]]} spot={spot} len={150} opacity={0.5} />
          <ShadowG idp={`${idp}-s1`} cx={345} cy={562} rx={170} ry={20} dir={{ x: 0.4, y: 0.2 }} />
          <LitG>
            <BagG
              idp={idp} k="bag" {...b} fill={`url(#${idp}-board)`} rope={HEX.paper}
              art={(
                <g>
                  <MarkG x={50} y={96} size={130} fill={INK} />
                  <rect x="0" y="262" width="230" height="1" fill={INK} opacity="0.5" />
                  <NodeG cx={22} cy={262} s={6} fill={INK} />
                  <WordmarkG x={22} y={338} size={44} fill={HEX.onBlue} />
                  <text x="22" y="368" fontSize="14" fill={INK}>{CONTACT.web}</text>
                </g>
              )}
            />
          </LitG>
          <CalloutG x={330} y={68} tx={600} ty={90} label="Rope handle" sub="Knotted inside" i={1} />
          <CalloutG x={G.xr - 60} y={G.yt + 36} tx={600} ty={290} label="Metal eyelet" i={2} />
          <CalloutG x={G.ex + G.dx / 2} y={G.yt + 14} tx={600} ty={200} label="Folded top" sub="Hem 28 mm" i={3} />
          <CalloutG x={G.ex + G.dx / 2} y={380} tx={600} ty={380} label="Gusset crease" i={4} />
          <CalloutG x={265} y={250} tx={600} ty={470} label="Printed mark" i={5} />
          <DimensionG x1={G.xl - 30} y1={G.yt} x2={G.xl - 30} y2={560} value="500 mm" offset={34} i={6} />
          <DimensionG x1={G.xl} y1={566} x2={G.xr} y2={566} value="290 mm" offset={30} i={7} />
        </>
      )}
    </Plate>
  );
}

// Bag 2: medium, Dark Blue, ribbon handles, the folder's crossing bands. Object right, spot upper right.
export function BagMedium() {
  const spot = { x: 0.8, y: 0.12 };
  const b = { x: 790, y: 560, w: 260, h: 300, d: 120, s: -1 };
  const G = geo(b);
  return (
    <Plate
      name="bag-medium" title="Medium Dark Blue shopping bag with ribbon handles and the crossing bands printed on the front" spot={spot} side="right"
    >
      {(idp) => (
        <>
          <Cast idp={idp} k="c1" foot={[[G.xr, 560], [G.xl + G.dx, 560 - G.dy], [G.xl + G.dx, 566 - G.dy], [G.xr, 566]]} spot={spot} len={150} opacity={0.5} />
          <ShadowG idp={`${idp}-s1`} cx={775} cy={562} rx={190} ry={20} dir={{ x: -0.4, y: 0.2 }} />
          <LitG>
            <BagG
              idp={idp} k="bag" {...b} fill={`url(#${idp}-board-dark)`} rope={BLUE} ribbon ropeW={9} hem={26}
              art={(
                <g>
                  <CrossingBandsG idp={`${idp}-x1`} w={260} h={300} cx={0.46} cy={0.56} band={0.035} r={0.07} fill={BLUE} />
                  <WordmarkG x={238} y={104} size={30} anchor="end" fill={HEX.onBlue} />
                  <MarkG x={24} y={244} size={34} fill={HEX.onBlue} />
                </g>
              )}
            />
          </LitG>
          <CalloutG x={790} y={205} tx={1000} ty={110} label="Ribbon handle" sub="Flat, sewn in" i={1} />
          <CalloutG x={G.xl + 75} y={G.yt + 40} tx={560} ty={200} label="Eyelet" side="left" i={2} />
          <CalloutG x={G.ex + G.dx / 2} y={G.yt + 20} tx={560} ty={290} label="Folded top" side="left" i={3} />
          <CalloutG x={G.ex + G.dx / 2} y={430} tx={560} ty={380} label="Gusset crease" side="left" i={4} />
          <CalloutG x={780} y={428} tx={1000} ty={470} label="Crossing bands" i={5} />
          <DimensionG x1={G.xr + 34} y1={560} x2={G.xr + 34} y2={G.yt} value="380 mm" offset={30} i={6} />
        </>
      )}
    </Plate>
  );
}

// Bag 3: small, off-white paper with Dark Blue print and the guide lines. Object left, gusset on the left, spot
// top centre, callouts on both sides.
export function BagSmall() {
  const spot = { x: 0.52, y: 0.06 };
  const b = { x: 450, y: 560, w: 200, h: 220, d: 100, s: -1 };
  const G = geo(b);
  const rows = LINES.mailer;
  return (
    <Plate
      name="bag-small" title="Small off-white shopping bag with Dark Blue print, guide lines and rope handles" spot={spot}
    >
      {(idp) => (
        <>
          <Cast idp={idp} k="c1" foot={[[G.xr, 560], [G.xl + G.dx, 560 - G.dy], [G.xl + G.dx, 566 - G.dy], [G.xr, 566]]} spot={spot} len={110} opacity={0.5} />
          <ShadowG idp={`${idp}-s1`} cx={440} cy={562} rx={160} ry={18} dir={{ x: 0.1, y: 0.2 }} />
          <LitG>
            <BagG
              idp={idp} k="bag" {...b} fill={`url(#${idp}-paper)`} rope={INK} ropeW={4.5} handleH={90}
              art={(
                <g>
                  <rect x="40" y="0" width="1" height="220" fill={INK} opacity="0.55" />
                  <rect x="0" y="150" width="200" height="1" fill={INK} opacity="0.55" />
                  <NodeG cx={40.5} cy={150.5} s={6} fill={INK} />
                  <MarkG x={62} y={70} size={92} fill={BLUE} />
                  <WordmarkG x={56} y={196} size={24} fill={INK} />
                  <text x="56" y="166" fontSize="8" fill={INK} lang="es">{rows}</text>
                </g>
              )}
            />
          </LitG>
          <CalloutG x={G.xl + 70} y={G.yt - 56} tx={250} ty={120} label="Rope handle" side="left" i={1} />
          <CalloutG x={G.xr - 52} y={G.yt + 36} tx={720} ty={140} label="Eyelet" i={2} />
          <CalloutG x={G.ex + G.dx / 2} y={G.yt + 18} tx={250} ty={250} label="Folded top" side="left" i={3} />
          <CalloutG x={G.ex + G.dx / 2} y={470} tx={250} ty={380} label="Gusset crease" side="left" i={4} />
          <CalloutG x={G.xr - 30} y={G.yt + 150} tx={720} ty={300} label="Guide lines" sub="Hairline with node" i={5} />
          <DimensionG x1={G.xr + 30} y1={560} x2={G.xr + 30} y2={G.yt} value="280 mm" offset={34} i={6} />
        </>
      )}
    </Plate>
  );
}
