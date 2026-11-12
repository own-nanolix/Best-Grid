import Art from '@/components/art/Art';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { BrandDefs, FogFieldG, PhotoBlockG, IconArtG, TrailsG, NodeGridG } from '@/components/art/KeyArt';
import { StageG, MaterialDefs, ShadowG, CalloutG, DimensionG, LitG, SheenG, PlateFrameG } from '@/components/art/Mockup';
import { HEX, LINES, CONTACT, TUBE, BADGE } from '@/lib/brand';
import { r2 } from '@/lib/charts';

// ---------------------------------------------------------------------------------------------------------------
// The hero's square photo stand-in (m11 left poster): the fog field under a flat Dark Blue block at 75%, with the
// wind icon in line art. The photograph and the person are never reproduced.
export function HeroPhotoArt() {
  return (
    <Art viewBox="0 0 600 600" title="Square photo stand-in: fog field, flat Dark Blue block, wind icon" exportName="lp-field-photo" preserveAspectRatio="xMidYMid slice">
      <BrandDefs idp="lp-field-photo" />
      <FogFieldG idp="lp-field-photo" w={600} h={600} />
      <PhotoBlockG w={600} h={600} />
      <g stroke={HEX.onBlue} strokeWidth="1" opacity="0.35">
        <rect x="0" y="372" width="600" height="1" className="extend-x" style={{ '--i': 2 }} />
        <rect x="0" y="468" width="600" height="1" className="extend-x" style={{ '--i': 3 }} />
      </g>
      <g className="fade-in" style={{ '--i': 8 }}>
        <IconArtG name="wind" px x={150} y={84} size={300} fill={HEX.onBlue} opacity="0.9" />
      </g>
      {[[150, 372], [450, 372], [150, 468], [450, 468]].map(([x, y], i) => (
        <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" fill={HEX.onBlue} className="snap" style={{ '--i': i + 10 }} />
      ))}
    </Art>
  );
}

/// ---------------------------------------------------------------------------------------------------------------
// The printed label of the project tube (m07), in its own coordinates: 224 x 268, text set vertically (reading
// bottom to top) as printed. Positions re-measured from reference/crop_m07_label.png (label 1120 px wide, x 0.2).
// The client company printed on the label is another company: its line reads the neutral "Client name".
export const LABEL = { w: 224, h: 268 };
function LabelPrintG({ ink = HEX.blueInk, line = HEX.activeBlue, ...rest }) {
  const col = (v, t, size, extra = {}) => <text x="0" y={v} fontSize={size} {...extra}>{t}</text>;
  return (
    <g fill={ink} lang="es" {...rest}>
      <g transform="translate(0 241) rotate(-90)">
        {col(20, TUBE.project, 9, { fontStyle: 'italic' })}
        {col(38, TUBE.client, 14)}
        {TUBE.services.map((t, i) => <g key={t}>{col(62 + i * 9, t, 7)}</g>)}
        {LINES.tube.rows.map((t, i) => <g key={t}>{col(98 + i * 9, t, 6.6)}</g>)}
        {col(163, TUBE.date, 12.5)}
        {col(202, TUBE.web, 9)}
      </g>
      <rect x="174.6" y="0" width="0.8" height={LABEL.h} fill={line} />
      <path d="M175 70 L224 59" stroke={line} strokeWidth="0.8" fill="none" />
      <rect x="173" y="68" width="4" height="4" fill={line} />
      <MarkG x={187} y={21} size={23} fill={line} />
    </g>
  );
}

// The project tube (m07): rigid card tube in Active Blue, the mark on the lid, the grey label wrapped on the body.
export function TubeArt() {
  const idp = 'lp-field-tube';
  const W = 800, H = 840;
  const cx = 330, top = 150, bot = 770, rx = 130, ry = 46;
  const body = `M${cx - rx} ${top} V${bot} A${rx} ${ry} 0 0 0 ${cx + rx} ${bot} V${top} Z`;
  const lx = 218, ly = 232;
  const label = `M${lx} ${ly} Q330 ${ly + 24} ${lx + LABEL.w} ${ly} V${ly + LABEL.h} Q330 ${ly + LABEL.h + 24} ${lx} ${ly + LABEL.h} Z`;
  const spot = { x: 0.3, y: 0.18 };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Project tube in Active Blue with the grey connection-study label" exportName="lp-field-tube">
      <MaterialDefs idp={idp} />
      <BrandDefs idp={`${idp}-b`} />
      <clipPath id={`${idp}-label`}>
        <path d={label} />
      </clipPath>
      <StageG idp={idp} w={W} h={H} spot={spot} floor={0.86} />
      <PlateFrameG w={W} h={H} m={24} no="01" label="Dimensions proposed for production" />
      <ShadowG idp={idp} cx={cx} cy={bot + 8} rx={190} ry={30} />
      <LitG>
        <path d={body} fill={`url(#${idp}-board)`} filter={`url(#${idp}-b-board)`} />
        <path d={body} fill={`url(#${idp}-shade)`} />
        {/* the thin rules of the body, as printed */}
        <rect x={cx - rx + 10} y={top + 40} width="0.8" height={bot - top - 20} fill={HEX.onBlue} opacity="0.4" />
        <rect x={cx + rx - 10} y={top + 40} width="0.8" height={bot - top - 20} fill={HEX.onBlue} opacity="0.4" />
        {/* the lid: rim, dark disc, the mark foreshortened (about 60% of the lid width) */}
        <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={`url(#${idp}-board)`} />
        <ellipse cx={cx} cy={top + 4} rx={rx - 15} ry={ry - 8} fill={HEX.darkBlue} />
        <ellipse cx={cx} cy={top + 4} rx={rx - 15} ry={ry - 8} fill={`url(#${idp}-shade)`} opacity="0.7" />
        <g transform={`translate(${cx} ${top + 4}) scale(1 0.34)`}>
          <MarkG x={-78} y={-78} size={156} fill={HEX.activeBlue} className="fade-in" style={{ '--i': 14 }} />
        </g>
        {/* the grey label, wrapped on the body */}
        <path d={label} fill={HEX.labelGrey} />
        <g clipPath={`url(#${idp}-label)`}>
          <g transform={`translate(${lx} ${ly + 6})`}>
            <LabelPrintG />
          </g>
        </g>
        <path d={label} fill={`url(#${idp}-shade)`} opacity="0.45" />
        <WordmarkVertical x={318} y={758} size={52} fill={HEX.onBlue} />
        <path d={body} fill="none" stroke="#000" strokeOpacity="0.15" />
        <SheenG idp={idp} d={body} opacity={0.22} />
      </LitG>
      <DimensionG x1={cx - rx} y1={bot + 14} x2={cx + rx} y2={bot + 14} value="Ø 90 mm" offset={34} i={4} />
      <CalloutG x={cx + 62} y={top + 12} tx={600} ty={118} label="Mark on the lid" i={0} />
      <CalloutG x={lx + LABEL.w - 6} y={ly + 150} tx={600} ty={300} label="Grey label" i={1} />
      <CalloutG x={lx + 16} y={ly + LABEL.h + 8} tx={600} ty={420} label={TUBE.project} lang="es" i={3} />
      <CalloutG x={cx + rx - 1} y={600} tx={600} ty={540} label="Rigid card, grained" i={2} />
    </Art>
  );
}

// The label laid flat and turned a quarter so its vertical lines read across. The same print as on the tube.
export function LabelFlatArt() {
  const idp = 'lp-field-label';
  const W = 1100, H = 720, k = 2.5;
  const tx = 70 + LABEL.h * k, ty = 90;
  // each callout leaves the label's right edge level with the printed line it names (v: the line's baseline)
  const rows = [[17, 'Project number'], [33, 'Client line'], [68, 'Services'], [100, 'Line'], [158, 'Date'], [199, 'Web address']];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The project tube label laid flat: project number, client line, services, line and date" exportName="lp-field-label">
      <MaterialDefs idp={idp} />
      <BrandDefs idp={`${idp}-b`} />
      <StageG idp={idp} w={W} h={H} spot={{ x: 0.32, y: 0.2 }} floor={null} />
      <PlateFrameG w={W} h={H} m={24} no="05" />
      <ShadowG idp={idp} cx={r2(tx - (LABEL.h * k) / 2 + 16)} cy={r2(ty + LABEL.w * k + 8)} rx={r2(LABEL.h * k * 0.52)} ry={14} />
      <LitG>
        <g transform={`translate(${tx} ${ty}) rotate(90) scale(${k})`}>
          <rect width={LABEL.w} height={LABEL.h} fill={HEX.labelGrey} filter={`url(#${idp}-b-grain)`} />
          <LabelPrintG className="fade-in" style={{ '--i': 4 }} />
        </g>
      </LitG>
      {rows.map(([v, name], i) => (
        <CalloutG key={name} x={tx + 4} y={r2(ty + v * k)} tx={860} ty={r2(ty + v * k)} label={name} i={i} />
      ))}
    </Art>
  );
}

// The word-mark set vertically, local so the size can be tuned: reads bottom to top, bottom-left at x, y.
function WordmarkVertical({ x, y, size, fill }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(-90)`}>
      <WordmarkG x={0} y={r2(size * 0.76)} size={size} fill={fill} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The vehicle livery (m20) on a drawn neutral vehicle: no badges, grille or light signature of a real model.
// White body, Dark Blue roof, the mark on the rear quarter, the word-mark on the rear door.
export function VehicleArt() {
  const idp = 'lp-field-vehicle';
  const W = 1000, H = 640;
  const ground = 528;
  const lower = 'M105 470 L105 396 Q108 362 150 352 L262 325 L905 325 Q938 330 944 360 L948 470 Z';
  const roof = 'M285 325 Q345 222 468 215 L778 215 Q842 222 872 325 Z';
  const glassF = 'M318 318 Q362 240 440 232 L508 232 L508 318 Z';
  const glassR = 'M524 232 L770 232 Q812 238 840 318 L524 318 Z';
  const wheels = [245, 745];
  const spot = { x: 0.3, y: 0.2 };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Vehicle livery on a neutral vehicle: the mark on the rear quarter, the word-mark on the rear door" exportName="lp-field-vehicle">
      <MaterialDefs idp={idp} />
      <StageG idp={idp} w={W} h={H} spot={spot} floor={0.8} />
      <PlateFrameG w={W} h={H} m={24} no="02" label="Dimensions proposed for production" />
      <ShadowG idp={idp} cx={525} cy={ground + 4} rx={450} ry={26} blur={12} />
      <LitG>
        <path d={lower} fill={`url(#${idp}-paper)`} />
        <path d={lower} fill={`url(#${idp}-shade-v)`} />
        <path d={roof} fill={`url(#${idp}-board-dark)`} />
        <path d={glassF} fill={HEX.darkBlue} opacity="0.92" />
        <path d={glassR} fill={HEX.darkBlue} opacity="0.92" />
        <SheenG idp={idp} d={glassF} opacity={0.5} />
        <SheenG idp={idp} d={glassR} opacity={0.5} />
        {[300, 508, 712].map((x) => (
          <rect key={x} x={x} y={325} width="1.4" height={145} fill={HEX.labelGrey} />
        ))}
        <rect x="105" y="454" width="843" height="16" fill={HEX.darkBlue} opacity="0.28" />
        <rect x="640" y="344" width="46" height="8" rx="4" fill={HEX.cardGrey} stroke={HEX.labelGrey} />
        {wheels.map((x) => (
          <g key={x}>
            <circle cx={x} cy={470} r="74" fill="#0d1026" />
            <circle cx={x} cy={ground - 58} r="62" fill={`url(#${idp}-rubber)`} />
            <circle cx={x} cy={ground - 58} r="38" fill={`url(#${idp}-metal)`} />
            <circle cx={x} cy={ground - 58} r="10" fill={`url(#${idp}-metal-dark)`} />
          </g>
        ))}
        <WordmarkG x={560} y={414} size={38} fill={HEX.darkBlue} />
        <MarkG x={842} y={352} size={54} fill={HEX.darkBlue} />
      </LitG>
      <DimensionG x1={842} y1={414} x2={896} y2={414} value="270 mm" offset={22} i={3} color={HEX.darkBlue} text={HEX.darkBlue} size={12} />
      <CalloutG x={869} y={378} tx={790} ty={96} label="Mark, rear quarter" i={0} />
      <CalloutG x={625} y={405} tx={470} ty={150} label="Word-mark, rear door" side="left" i={1} />
      <CalloutG x={420} y={262} tx={250} ty={200} label="Dark Blue roof" side="left" i={2} />
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The billboard (m19): an Active Blue panel under a dark overhang, two steel bollards, the two-tone line, the mark,
// the hairline with its node, "Best Grid" very large; the pylon photograph is a sunset gradient with light trails.
export function BillboardArt() {
  const idp = 'lp-field-billboard';
  const W = 1200, H = 720;
  const k = 0.675;
  const px = 60, py = 140, pw = 1080, ph = 344;
  const spot = { x: 0.34, y: 0.12 };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Billboard: Active Blue panel with the two-tone line, the mark, the word-mark and a photo stand-in" exportName="lp-field-billboard">
      <MaterialDefs idp={idp} />
      <BrandDefs idp={`${idp}-b`} />
      <clipPath id={`${idp}-photo`}>
        <rect x={751} y={19} width={310} height={306} />
      </clipPath>
      <StageG idp={idp} w={W} h={H} spot={spot} floor={0.72} intensity={1.1} />
      <rect x="0" y="0" width={W} height="120" fill="#161a3a" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${40 + i * 150} 120 L${68 + i * 150} 78 L${150 + i * 150} 78 L${130 + i * 150} 120 Z`} fill="#0c0e1f" opacity="0.8" />
      ))}
      <ShadowG idp={`${idp}-s1`} cx={354} cy={628} rx={46} ry={9} />
      <ShadowG idp={`${idp}-s2`} cx={885} cy={628} rx={46} ry={9} />
      <LitG>
        <g transform={`translate(${px} ${py})`}>
          <rect width={pw} height={ph} fill={`url(#${idp}-board)`} filter={`url(#${idp}-b-board)`} />
          <rect x="331.5" y="0" width="1" height={ph} fill={HEX.onBlue} opacity="0.45" />
          <rect x="731.5" y="0" width="1" height={ph} fill={HEX.onBlue} opacity="0.45" />
          <g fontSize="20.5" lang="es" style={{ fontFamily: 'var(--font)' }}>
            <text x="19" y="45" fill={HEX.onBlue}>{LINES.box.rows[0]}</text>
            <text x="19" y="70" fill={HEX.darkBlue}><tspan fill={HEX.onBlue}>en avance.</tspan> Dando estructura</text>
            <text x="19" y="95" fill={HEX.darkBlue}>{LINES.box.rows[2]}</text>
          </g>
          <MarkG x={646} y={8} size={42} fill={HEX.onBlue} />
          <g fontSize="11.5" lang="es">
            {LINES.billboard.rows.map((t, i) => (
              <text key={t} x="22" y={186 + i * 17} fill="#ffffff">{t}</text>
            ))}
            <text x="685" y="186" textAnchor="end" fill={HEX.onBlue}>{CONTACT.handle}</text>
            <text x="685" y="203" textAnchor="end" fill={HEX.darkBlue}>{CONTACT.web}</text>
          </g>
          <rect x="0" y="220.5" width="714" height="1" fill={HEX.onBlue} opacity="0.7" className="extend-x" />
          <rect x="711" y="218" width="7" height="7" fill={HEX.onBlue} className="snap" style={{ '--i': 6 }} />
          <WordmarkG x={18} y={324} size={100} fill={HEX.onBlue} />
          <g fontSize="8" fill={HEX.darkBlue} lang="es">
            {CONTACT.address.map((t, i) => (
              <text key={t} x="604" y={290 + i * 9.5}>{t}</text>
            ))}
          </g>
          <g clipPath={`url(#${idp}-photo)`}>
            <rect x="751" y="19" width="310" height="306" fill={`url(#${idp}-b-sunset)`} />
            <g transform="translate(751 19)">
              <TrailsG w={310} h={306} count={6} y0={0.02} y1={0.7} sag={0.04} />
            </g>
            <IconArtG name="pylon" x={806} y={70} size={200} fill={HEX.darkBlue} opacity="0.85" />
          </g>
        </g>
        {[354, 885].map((x) => (
          <g key={x}>
            <path d={`M${x - 13} 630 V474 Q${x - 13} 458 ${x} 458 Q${x + 13} 458 ${x + 13} 474 V630 Z`} fill={`url(#${idp}-metal)`} />
            <rect x={x - 13} y="474" width="26" height="156" fill={`url(#${idp}-shade)`} />
          </g>
        ))}
      </LitG>
      <CalloutG x={250} y={450} tx={150} ty={652} label="Word-mark, very large" i={0} />
      <CalloutG x={300} y={168} tx={120} ty={62} label="Two-tone line" i={1} />
      <CalloutG x={950} y={440} tx={1010} ty={664} label="Photo stand-in" side="left" i={2} />
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The node grid of m17 (back phone), drawn as a field of ruled square cells in two strengths of Active Blue.
// Drawing only: the cells carry no data.
export function NodesArt() {
  return (
    <Art viewBox="-1 -1 530 442" title="Node grid: ruled square cells filled in two strengths of Active Blue" exportName="lp-field-nodes">
      <NodeGridG cols={12} rows={10} size={44} seed={5} clusters={10} animate />
    </Art>
  );
}

/// ---------------------------------------------------------------------------------------------------------------
// The staff badge (m08), re-measured from m08_1 / m08_2: a wide Active Blue fabric strap through the slot of a
// matte Dark Blue rigid holder (radius 9% of its width, a screw boss in each top corner), and the light grey-blue
// card (54 : 86) with a vertical hairline at 29% of its width, the word-mark top left, the name, role and
// department in the right column, a large pale "25" over the ID, a hairline with its node, the barcode and the web
// address. Only the printed name, role, department and ID appear. Small card lines use the accessible blue ink.
export function BadgeArt() {
  const idp = 'lp-field-badge';
  const W = 600, H = 860;
  const e = BADGE;
  const hx = 50, hy = 236, hw = 298, hh = 456, hr = 27;
  const cw = 240, ch = 382, cx = hx + 29, cy = hy + 48;
  const vx = cx + 69;
  const ink = HEX.blueInk;
  const widths = [3, 1.5, 4, 1.5, 1.5, 3, 1.5, 2, 4, 1.5, 3, 1.5, 4, 1.5, 2, 3, 1.5, 4].map((w) => w * 1.36);
  let bx = cx + 51;
  const bars = widths.map((w, i) => {
    const b = { x: r2(bx), w: r2(w), i };
    bx += w + (i % 3 === 1 ? 6.1 : 4.35);
    return b;
  });
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Staff badge on an Active Blue strap in a matte Dark Blue holder" exportName="lp-field-badge">
      <MaterialDefs idp={idp} />
      <StageG idp={idp} w={W} h={H} spot={{ x: 0.3, y: 0.2 }} floor={null} />
      <PlateFrameG w={W} h={H} m={24} no="04" />
      <ShadowG idp={idp} cx={hx + hw / 2 + 12} cy={hy + hh + 22} rx={170} ry={16} opacity={0.45} />
      <LitG>
        {/* the strap runs up out of the plate and loops through the slot */}
        <rect x={hx + 94} y="0" width="117" height={hy + 26} fill={`url(#${idp}-fabric-blue)`} />
        <rect x={hx + 94} y="0" width="117" height={hy + 26} fill={`url(#${idp}-shade)`} opacity="0.35" />
        <rect x={hx} y={hy} width={hw} height={hh} rx={hr} fill={`url(#${idp}-plastic)`} />
        <rect x={hx} y={hy} width={hw} height={hh} rx={hr} fill={`url(#${idp}-shade)`} />
        <rect x={hx + 85} y={hy + 17} width="141" height="15" rx="7.5" fill={HEX.periwinkle} opacity="0.85" />
        <rect x={hx + 94} y={hy + 14} width="117" height="12" fill={`url(#${idp}-fabric-blue)`} />
        {[hx + 36, hx + hw - 36].map((x) => (
          <g key={x}>
            <circle cx={x} cy={hy + 21} r="9" fill={`url(#${idp}-metal-dark)`} />
            <circle cx={x} cy={hy + 21} r="3" fill={HEX.black} opacity="0.6" />
          </g>
        ))}
        <rect x={cx} y={cy} width={cw} height={ch} fill={HEX.lightBlue} />
        <rect x={vx - 0.4} y={cy} width="0.8" height={ch} fill={HEX.activeBlue} />
        <WordmarkG x={cx + 11.6} y={cy + 49} size={11} fill={HEX.activeBlue} />
        <g fill={ink} lang="es">
          <text x={cx + 83} y={cy + 121} fontSize="21">{e.name}</text>
          <text x={cx + 83} y={cy + 149} fontSize="14">{e.roleRows[0]}</text>
          <text x={cx + 83} y={cy + 166} fontSize="14">{e.roleRows[1]}</text>
          <text x={cx + 83} y={cy + 188} fontSize="8.5">{e.dept}</text>
          <text x={cx + 85} y={cy + 228} fontSize="12">{e.id}</text>
          <text x={cx + 123} y={cy + 345} fontSize="8" textAnchor="middle">{e.web}</text>
        </g>
        <text x={cx + 12} y={cy + 228} fontSize="40" fill={HEX.white} opacity="0.75" className="display" lang="es">{e.numeral}</text>
        <rect x={cx} y={cy + 261.6} width={cw} height="0.8" fill={HEX.activeBlue} className="extend-x" />
        <rect x={vx - 2.75} y={cy + 259.25} width="5.5" height="5.5" fill={HEX.activeBlue} className="snap" />
        {bars.map((b) => (
          <rect key={b.i} x={b.x} y={cy + 294} width={b.w} height="35" fill={HEX.activeBlue} />
        ))}
        <SheenG idp={idp} d={`M${hx} ${hy} H${hx + hw} V${hy + hh} H${hx} Z`} opacity={0.14} />
      </LitG>
      <CalloutG x={hx + 150} y="120" tx={400} ty={120} label="Active Blue strap" i={0} />
      <CalloutG x={hx + hw - 6} y={hy + 120} tx={400} ty={330} label="Matte Dark Blue holder" i={1} />
      <CalloutG x={cx + cw - 20} y={cy + 300} tx={400} ty={540} label="Card, light grey-blue" i={2} />
    </Art>
  );
}
