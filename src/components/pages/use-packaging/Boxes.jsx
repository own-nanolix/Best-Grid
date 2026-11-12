import { CalloutG, DimensionG, LitG, ShadowG } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CrossingBandsG } from '@/components/art/KeyArt';
import { HEX, CONTACT, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Plate, Cast, IsoBox, TapePrintG, boxGeom, pts, BOARD, BLUE, INK } from './kit';
import TubeLabelG, { LABEL } from './TubeLabel';

// Shipping boxes and product boxes. One mm is two screen units on the first plate and 1.5 on the second: every
// dimension is our own production value, in plain mm.

// The top face is a mirrored frame (see kit.jsx): text along the long edge and along the short edge.
const alongU = (x, y) => `matrix(0 -1 -1 0 ${r2(x)} ${r2(y)})`;
const alongV = (x, y) => `matrix(1 0 0 -1 ${r2(x)} ${r2(y)})`;

// ---------------------------------------------------------------------------------------------------------------
// Shipping box 1: a large carton with a small one stacked on it, isometric from the left. Spot upper left.
export function ShippingStack() {
  const spot = { x: 0.22, y: 0.16 };
  const big = boxGeom({ fx: 440, fy: 540, a: 250, b: 200, h: 170 });
  const [sx, sy] = big.P(46, 40, 170);
  const small = boxGeom({ fx: sx, fy: sy, a: 140, b: 110, h: 100 });
  return (
    <Plate
      name="shipping-stack" title="Two shipping cartons, the small one on the large one, with printed tape" spot={spot}
    >
      {(idp) => (
        <>
          <Cast idp={idp} k="c1" foot={big.foot} spot={spot} len={150} opacity={0.55} />
          <ShadowG idp={`${idp}-s1`} cx={440} cy={546} rx={300} ry={26} dir={{ x: 0.4, y: 0.2 }} />
          <LitG>
            <IsoBox
              idp={idp} k="big" g={big} fill={BOARD} lit="left"
              art={{
                left: (
                  <g>
                    <rect y="6" width="250" height="1.4" fill={HEX.black} opacity="0.3" />
                    <MarkG x={26} y={34} size={54} fill={INK} />
                    <WordmarkG x={92} y={74} size={32} fill={INK} />
                    <text x="26" y="142" fontSize="14" fill={INK}>{CONTACT.web}</text>
                  </g>
                ),
                right: (
                  <g>
                    <rect y="6" width="200" height="1.4" fill={HEX.black} opacity="0.3" />
                    <g transform="translate(100 0) rotate(90)"><TapePrintG len={84} h={30} bg={BLUE} ink={HEX.onBlue} /></g>
                  </g>
                ),
                top: (
                  <g>
                    <rect x="99.5" y="0" width="1.2" height="250" fill={HEX.black} opacity="0.35" />
                    <g transform={alongU(100, 250)}><TapePrintG len={250} h={30} bg={BLUE} ink={HEX.onBlue} /></g>
                    <rect x="82" y="0" width="1" height="250" fill={HEX.white} opacity="0.35" />
                    <rect x="117" y="0" width="1" height="250" fill={HEX.black} opacity="0.2" />
                  </g>
                ),
              }}
            />
            <clipPath id={`${idp}-btop`}><polygon points={pts(big.top)} /></clipPath>
            <filter id={`${idp}-tsh`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" /></filter>
            <g clipPath={`url(#${idp}-btop)`}><polygon points={pts(small.foot)} transform="translate(34 10)" fill={HEX.black} opacity="0.5" filter={`url(#${idp}-tsh)`} /></g>
            <IsoBox
              idp={idp} k="small" g={small} fill={`url(#${idp}-board-dark)`} lit="left" grit="dgrit"
              art={{
                left: (
                  <g>
                    <MarkG x={22} y={22} size={42} fill={BLUE} />
                    <text x="22" y="88" fontSize="12" fill={HEX.onBlue}>{CONTACT.web}</text>
                  </g>
                ),
                right: <g transform="translate(55 0) rotate(90)"><TapePrintG len={50} h={22} bg={HEX.onBlue} ink={INK} /></g>,
                top: <g transform={alongU(55, 140)}><TapePrintG len={140} h={22} bg={HEX.onBlue} ink={INK} /></g>,
              }}
            />
          </LitG>
          <CalloutG x={big.P(0, 100, 100)[0]} y={big.P(0, 100, 100)[1]} tx={720} ty={490} label="Sealing tape" sub="48 mm" i={1} />
          <CalloutG x={big.P(197, 0, 109)[0]} y={big.P(197, 0, 109)[1]} tx={200} ty={170} label="Printed mark" side="left" i={2} />
          <CalloutG x={small.P(70, 110, 60)[0]} y={small.P(70, 110, 60)[1]} tx={660} ty={180} label="Small carton" i={3} />
          <CalloutG x={big.P(0, 100, 164)[0]} y={big.P(0, 100, 164)[1]} tx={720} ty={235} label="Flap fold" i={4} />
          <DimensionG x1={big.P(250, 0, 0)[0]} y1={big.P(250, 0, 0)[1]} x2={440} y2={540} value="500 mm" offset={32} i={5} />
          <DimensionG x1={440} y1={540} x2={big.P(0, 200, 0)[0]} y2={big.P(0, 200, 0)[1]} value="400 mm" offset={32} i={6} />
          <DimensionG x1={big.P(0, 200, 0)[0]} y1={big.P(0, 200, 0)[1]} x2={big.P(0, 200, 170)[0]} y2={big.P(0, 200, 170)[1]} value="340 mm" offset={34} i={7} />
        </>
      )}
    </Plate>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Shipping box 2: a Dark Blue mailer with the crossing bands printed on its long face. Object right, spot right.
export function ShippingMailer() {
  const spot = { x: 0.8, y: 0.16 };
  const g = boxGeom({ fx: 650, fy: 530, a: 170, b: 320, h: 120 });
  return (
    <Plate
      name="shipping-mailer" title="Dark Blue mailer box with the crossing bands on the long face and tape across the lid" spot={spot} side="right"
    >
      {(idp) => (
        <>
          <Cast idp={idp} k="c1" foot={g.foot} spot={spot} len={150} opacity={0.55} />
          <ShadowG idp={`${idp}-s1`} cx={700} cy={536} rx={330} ry={24} dir={{ x: -0.4, y: 0.2 }} />
          <LitG>
            <IsoBox
              idp={idp} k="mail" g={g} fill={`url(#${idp}-board-dark)`} lit="right" grit="dgrit"
              art={{
                left: (
                  <g>
                    <MarkG x={12} y={34} size={50} fill={BLUE} />
                    <g transform="translate(85 0) rotate(90)"><TapePrintG len={64} h={26} bg={HEX.onBlue} ink={INK} /></g>
                  </g>
                ),
                right: (
                  <g>
                    <CrossingBandsG idp={`${idp}-x1`} w={320} h={120} cx={0.62} cy={0.5} band={0.045} r={0.05} fill={BLUE} />
                    <WordmarkG x={22} y={100} size={30} fill={HEX.onBlue} />
                  </g>
                ),
                top: (
                  <g>
                    <rect x="0" y="84" width="320" height="1.2" fill={HEX.black} opacity="0.4" />
                    <g transform={alongV(0, 85)}><TapePrintG len={320} h={26} bg={HEX.onBlue} ink={INK} /></g>
                  </g>
                ),
              }}
            />
          </LitG>
          <CalloutG x={g.P(0, 200, 70)[0]} y={g.P(0, 200, 70)[1]} tx={1010} ty={210} label="Crossing bands" sub="Two colours" i={1} />
          <CalloutG x={g.P(60, 40, 120)[0]} y={g.P(60, 40, 120)[1]} tx={1010} ty={110} label="Sealing tape" i={2} />
          <CalloutG x={g.P(133, 0, 61)[0]} y={g.P(133, 0, 61)[1]} tx={420} ty={150} label="Printed mark" side="left" i={3} />
          <DimensionG x1={g.P(170, 0, 0)[0]} y1={g.P(170, 0, 0)[1]} x2={650} y2={530} value="260 mm" offset={30} i={4} />
          <DimensionG x1={650} y1={530} x2={g.P(0, 320, 0)[0]} y2={g.P(0, 320, 0)[1]} value="480 mm" offset={30} i={5} />
        </>
      )}
    </Plate>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Product box 1 (as m12): an Active Blue rigid box close up, raking light from a low spot at the left, the
// word-mark large across the lid, ruled panels on the front, a Dark Blue box behind.
export function ProductLid() {
  const spot = { x: 0.08, y: 0.56 };
  const base = boxGeom({ fx: 560, fy: 556, a: 400, b: 250, h: 140 });
  const lid = boxGeom({ fx: base.P(-4, -4, 0)[0], fy: base.P(-4, -4, 0)[1] - 124, a: 408, b: 258, h: 28 });
  const back = boxGeom({ fx: 668, fy: 440, a: 240, b: 190, h: 120 });
  const backLid = boxGeom({ fx: back.P(-3, -3, 0)[0], fy: back.P(-3, -3, 0)[1] - 98, a: 246, b: 196, h: 26 });
  const box = LINES.box.rows;
  const addr = CONTACT.address;
  return (
    <Plate
      name="product-lid" title="Active Blue rigid box close up with the word-mark across the lid and a Dark Blue box behind" spot={spot}
    >
      {(idp) => (
        <>
          <Cast idp={idp} k="c1" foot={base.foot} spot={spot} len={220} opacity={0.6} blur={10} />
          <ShadowG idp={`${idp}-s1`} cx={560} cy={560} rx={320} ry={26} dir={{ x: 0.5, y: 0.1 }} />
          <IsoBox
            idp={idp} k="bb" g={back} fill={`url(#${idp}-board-dark)`} lit="left" grit="dgrit"
            art={{ left: <MarkG x={92} y={22} size={56} fill={BLUE} />, right: <g /> }}
          />
          <IsoBox
            idp={idp} k="bl" g={backLid} fill={`url(#${idp}-board-dark)`} lit="left" grit="dgrit"
            art={{ top: <g transform="translate(98 123) scale(1 -1)"><g transform="translate(-30 -30)"><MarkG size={60} fill={BLUE} /></g></g> }}
          />
          <LitG>
            <IsoBox
              idp={idp} k="base" g={base} fill={`url(#${idp}-board)`} lit="left"
              art={{
                left: (
                  <g>
                    {[190, 290].map((x) => <rect key={x} x={x} y="0" width="1" height="140" fill={HEX.darkBlue} opacity="0.45" />)}
                    <g fontSize="9.4">
                      <text x="16" y="50" fill={HEX.warmGrey}>{box[0]}</text>
                      <text x="16" y="63" fill={INK}>{box[1]}</text>
                      <text x="16" y="76" fill={INK}>{box[2]}</text>
                    </g>
                    <MarkG x={218} y={42} size={44} fill={HEX.warmGrey} />
                    <g fontSize="5.8" lang="es">
                      <text x="297" y="50" fill={HEX.warmGrey}>{addr[0]}</text>
                      <text x="297" y="61" fill={INK}>{addr[1]}</text>
                      <text x="297" y="72" fill={INK}>{addr[2]}</text>
                    </g>
                  </g>
                ),
                right: <rect x="130" y="0" width="1" height="140" fill={HEX.darkBlue} opacity="0.4" />,
              }}
            />
            <IsoBox
              idp={idp} k="lid" g={lid} fill={`url(#${idp}-board)`} lit="left"
              art={{
                top: (
                  <g transform={`matrix(0 -1 -1 0 106 340)`}>
                    <WordmarkG x={0} y={0} size={62} fill={HEX.onBlue} />
                  </g>
                ),
              }}
            />
          </LitG>
          <CalloutG x={lid.P(200, 258, 28)[0]} y={lid.P(200, 258, 28)[1]} tx={650} ty={110} label="Word-mark" sub="Large across the lid" i={1} />
          <CalloutG x={base.P(120, 0, 70)[0]} y={base.P(120, 0, 70)[1]} tx={250} ty={600} label="Panel rules" side="left" i={2} />
          <CalloutG x={base.P(30, 0, 128)[0]} y={base.P(30, 0, 128)[1]} tx={410} ty={640} label="Lid overhang" i={3} />
          <CalloutG x={base.P(0, 120, 100)[0]} y={base.P(0, 120, 100)[1]} tx={720} ty={640} label="Board edge" i={4} />
          <DimensionG x1={lid.P(408, 0, 28)[0]} y1={lid.P(408, 0, 28)[1]} x2={lid.P(0, 0, 28)[0]} y2={lid.P(0, 0, 28)[1]} value="408 mm" offset={30} i={5} />
        </>
      )}
    </Plate>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// A rigid tube standing on its base: body, curved grey label, lid with a recessed face and the mark.
function TubeG({ idp, k, cx, yb, r, h, body, lid, face, mark, rim, bg = "grit", lg = "dgrit", showLabel = true }) {
  const ry = r * 0.34, lh = 26, ybt = yb - (h - lh), yt = yb - h;
  const bodyD = `M${r2(cx - r)} ${r2(ybt)}L${r2(cx - r)} ${r2(yb)}A${r} ${r2(ry)} 0 0 0 ${r2(cx + r)} ${r2(yb)}L${r2(cx + r)} ${r2(ybt)}Z`;
  const R = r + 5;
  const lidD = `M${r2(cx - R)} ${r2(yt)}L${r2(cx - R)} ${r2(ybt)}A${R} ${r2(ry)} 0 0 0 ${r2(cx + R)} ${r2(ybt)}L${r2(cx + R)} ${r2(yt)}Z`;
  const lw = r * 1.55, s = lw / LABEL.w, y0 = ybt + 28, x0 = cx - lw / 2, xr = cx + lw / 2, sg = ry * 0.63, lhh = LABEL.h * s;
  const lab = `M${r2(x0)} ${r2(y0 + sg)}Q${r2(cx)} ${r2(y0 + ry * 1.37)} ${r2(xr)} ${r2(y0 + sg)}L${r2(xr)} ${r2(y0 + lhh + sg)}Q${r2(cx)} ${r2(y0 + lhh + ry * 1.37)} ${r2(x0)} ${r2(y0 + lhh + sg)}Z`;
  return (
    <g>
      <clipPath id={`${idp}-${k}-lab`}><path d={lab} /></clipPath>
      <path d={bodyD} fill={body} filter={`url(#${idp}-${bg})`} />
      {showLabel && (
        <g clipPath={`url(#${idp}-${k}-lab)`}>
          <g transform={`translate(${r2(x0)} ${r2(y0 + sg - ry * 0.1)}) scale(${r2(s)})`}><TubeLabelG /></g>
          <path d={lab} fill={`url(#${idp}-shade-r)`} opacity="0.55" />
        </g>
      )}
      <path d={bodyD} fill={`url(#${idp}-shade-r)`} />
      <path d={lidD} fill={lid} filter={`url(#${idp}-${lg})`} />
      <path d={lidD} fill={`url(#${idp}-shade-r)`} />
      <rect x={cx - R} y={ybt - 2} width={2 * R} height="1.4" fill={HEX.black} opacity="0.35" />
      <ellipse cx={cx} cy={yt} rx={R} ry={r2(ry + 1)} fill={rim} />
      <ellipse cx={cx} cy={yt} rx={R} ry={r2(ry + 1)} fill={`url(#${idp}-shade-r)`} />
      <ellipse cx={cx} cy={r2(yt + 1)} rx={r - 9} ry={r2(ry * 0.84)} fill={face} />
      <ellipse cx={cx} cy={r2(yt - 1)} rx={r - 9} ry={r2(ry * 0.84)} fill="none" stroke={HEX.black} strokeOpacity="0.45" strokeWidth="1.6" />
      <g transform={`translate(${cx} ${yt}) scale(1 0.34)`}><MarkG x={-34} y={-34} size={68} fill={mark} /></g>
    </g>
  );
}

// Product box 2: the case study's project tube, packed two to a transit carton. The carton is open; the tubes stand
// in it with the lids and labels above the rim. Spot upper right, object left.
export function TubeCarton() {
  const spot = { x: 0.68, y: 0.1 };
  const g = boxGeom({ fx: 560, fy: 560, a: 440, b: 280, h: 110 });
  const t1 = g.P(130, 140, 0), t2 = g.P(330, 140, 0);
  const inset = (u, v) => g.P(u, v, 110);
  const wallA = [inset(435, 5), inset(435, 275), g.P(435, 275, 0), g.P(435, 5, 0)];
  const wallB = [inset(5, 275), inset(435, 275), g.P(435, 275, 0), g.P(5, 275, 0)];
  return (
    <Plate
      name="tube-carton" title="Two project tubes with their grey labels, packed upright in an open transit carton" spot={spot}
    >
      {(idp) => (
        <>
          <Cast idp={idp} k="c1" foot={g.foot} spot={spot} len={130} opacity={0.55} />
          <ShadowG idp={`${idp}-s1`} cx={560} cy={566} rx={330} ry={22} dir={{ x: -0.4, y: 0.2 }} />
          <IsoBox idp={idp} k="car" g={g} fill={BOARD} lit="right" art={{ right: <rect x="120" y="0" width="60" height="110" fill={BLUE} opacity="0.0" /> }} />
          <polygon points={pts([inset(5, 5), inset(435, 5), inset(435, 275), inset(5, 275)])} fill={HEX.black} opacity="0.82" />
          <polygon points={pts(wallA)} fill={BOARD} opacity="0.5" />
          <polygon points={pts(wallB)} fill={BOARD} opacity="0.4" />
          <polygon points={pts(wallA)} fill={HEX.black} opacity="0.55" />
          <polygon points={pts(wallB)} fill={HEX.black} opacity="0.35" />
          <LitG>
            <TubeG idp={idp} k="t2" cx={t2[0]} yb={t2[1]} r={90} h={280} body={`url(#${idp}-board-dark)`} lid={`url(#${idp}-board)`} rim={BLUE} face={INK} mark={BLUE} bg="dgrit" lg="grit" />
            <TubeG idp={idp} k="t1" cx={t1[0]} yb={t1[1]} r={90} h={280} body={`url(#${idp}-board)`} lid={`url(#${idp}-board-dark)`} rim={BLUE} face={INK} mark={BLUE} />
          </LitG>
          <IsoBox idp={idp} k="car2" g={g} fill={BOARD} lit="right" faces={['left', 'right']} art={{ right: <rect x="120" y="0" width="60" height="110" fill={BLUE} opacity="0.0" /> }} />
          <CalloutG x={t1[0] + 20} y={t1[1] - 270} tx={690} ty={110} label="Lid with the mark" i={1} />
          <CalloutG x={t1[0] + 52} y={t1[1] - 170} tx={690} ty={200} label="Project label" sub="Grey, one colour" i={2} />
          <CalloutG x={g.P(400, 0, 60)[0]} y={g.P(400, 0, 60)[1]} tx={150} ty={300} label="Transit carton" side="left" i={3} />
          <CalloutG x={t2[0] - 70} y={t2[1] - 200} tx={270} ty={170} label="Second tube" side="left" i={4} />
          <DimensionG x1={g.P(440, 0, 0)[0]} y1={g.P(440, 0, 0)[1]} x2={560} y2={560} value="440 mm" offset={30} i={5} />
        </>
      )}
    </Plate>
  );
}
