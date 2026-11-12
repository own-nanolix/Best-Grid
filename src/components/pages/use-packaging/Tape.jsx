import { CalloutG, DimensionG, LitG, ShadowG, SheenG, CalloutsG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { Plate, Cast, TapePrintG, BOARD, BLUE, INK, pts } from './kit';

// Tape: two rolls and a plate of printed strips. Our own dimensions in plain mm; artwork is the shared mark and
// word-mark, repeated along the film.

// The outline of a cut strip in its flat local frame: straight start, saw-cut end, optional folded-back corner.
function stripPath(len, h, teeth = 9, fold = 0) {
  const t = h / 2;
  let d = `M0 ${r2(-t)}L${r2(len - fold)} ${r2(-t)}`;
  if (fold) d += `L${len} ${r2(-t + fold)}`;
  const n = Math.round((h - fold) / teeth);
  for (let i = 0; i <= n; i += 1) {
    const y = -t + fold + ((h - fold) * i) / n;
    d += `L${i % 2 ? len - 6 : len} ${r2(y)}`;
  }
  return `${d}L0 ${r2(t)}Z`;
}

// A strip lying on the floor: m is the matrix that lays its flat frame onto the floor plane.
function FlatStrip({ idp, k, m, len, h, bg, ink, fold = 0, creaseAt = 0.55, lift = HEX.onBlue }) {
  const d = stripPath(len, h, 9, fold);
  return (
    <g>
      <linearGradient id={`${idp}-${k}-gl`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={HEX.white} stopOpacity="0.3" />
        <stop offset="0.45" stopColor={HEX.white} stopOpacity="0" />
        <stop offset="1" stopColor={HEX.black} stopOpacity="0.28" />
      </linearGradient>
      <clipPath id={`${idp}-${k}-cp`}>
        <path d={d} />
      </clipPath>
      <filter id={`${idp}-${k}-sh`} x="-10%" y="-60%" width="120%" height="220%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <g transform={m}>
        <path d={d} transform="translate(5 7)" fill={HEX.black} opacity="0.45" filter={`url(#${idp}-${k}-sh)`} />
        <g clipPath={`url(#${idp}-${k}-cp)`}>
          <TapePrintG len={len} h={h} bg={bg} ink={ink} />
          <rect x="0" y={r2(-h / 2)} width={len} height={h} fill={`url(#${idp}-${k}-gl)`} />
          <rect x={r2(len * creaseAt)} y={r2(-h / 2)} width="1.6" height={h} fill={HEX.black} opacity="0.3" />
          <rect x={r2(len * creaseAt + 1.6)} y={r2(-h / 2)} width="1.2" height={h} fill={HEX.white} opacity="0.35" />
          <rect x="0" y={r2(-h / 2)} width={len} height="2" fill={HEX.white} opacity="0.35" />
        </g>
        {fold > 0 && (
          <g>
            <polygon points={`${len - fold},${-h / 2} ${len},${-h / 2 + fold} ${len - fold},${-h / 2 + fold}`} fill={lift} />
            <polygon points={`${len - fold},${-h / 2} ${len},${-h / 2 + fold} ${len - fold},${-h / 2 + fold}`} fill={HEX.black} opacity="0.12" />
          </g>
        )}
      </g>
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Plate 1: a blue roll standing on its edge, a strip unrolled across the floor to the right. Spot upper left.
export function TapeRollBlue() {
  const spot = { x: 0.24, y: 0.18 };
  const cx = 290, cy = 395, R = 140, rx = 50, wD = 150, dy = -22;
  // the wound body: from the front face to the far end, which shows only as its rounded outer half
  const bodyD = `M${cx} ${cy - R}L${cx + wD} ${cy - R + dy}A${rx} ${R} 0 0 1 ${cx + wD} ${cy + R + dy}L${cx} ${cy + R}Z`;
  const units = [[-72, 0.88], [78, 0.78]];
  return (
    <Plate
      name="tape-roll-blue" title="Printed tape roll standing on its edge with a strip unrolled to the right" spot={spot}
    >
      {(idp) => (
        <>
          <Cast idp={idp} foot={[[cx - 60, cy + R + 2], [cx + wD + 60, cy + R + dy], [cx + wD + 60, cy + R + dy + 8], [cx - 60, cy + R + 10]]} spot={spot} len={120} />
          <ShadowG idp={`${idp}-s1`} cx={cx + wD / 2 + 10} cy={cy + R + 3} rx={170} ry={14} dir={{ x: 0.4, y: 0.2 }} />
          <FlatStrip idp={idp} k="a" m={`matrix(1 0.03 0 0.3 ${cx + 30} ${cy + R - 14})`} len={470} h={150} bg={BLUE} ink={HEX.onBlue} />
          <LitG>
            <linearGradient id={`${idp}-cyl`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={HEX.white} stopOpacity="0.1" />
              <stop offset="0.22" stopColor={HEX.white} stopOpacity="0.3" />
              <stop offset="0.5" stopColor={HEX.black} stopOpacity="0" />
              <stop offset="1" stopColor={HEX.black} stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id={`${idp}-hole`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={HEX.black} stopOpacity="0.8" />
              <stop offset="1" stopColor={HEX.black} stopOpacity="0.05" />
            </linearGradient>
            <clipPath id={`${idp}-body`}>
              <path d={bodyD} />
            </clipPath>
            {/* the wound film: back cap, the cylinder with its printed band, the front face with its layers */}
            <path d={bodyD} fill={BLUE} />
            <g clipPath={`url(#${idp}-body)`}>
              {units.map(([yo, c]) => (
                <g key={yo} transform={`translate(${cx + wD / 2 + 8} ${r2(cy + yo + 108 * c - 11)}) scale(1 ${c}) rotate(-90)`}>
                  <TapePrintG len={217} h={70} ink={HEX.onBlue} />
                </g>
              ))}
              <rect x={cx} y={cy + 28} width={wD + rx} height="1.6" fill={HEX.black} opacity="0.3" transform="rotate(-8.3 290 423)" />
              <rect x={cx} y={cy + 29.6} width={wD + rx} height="1.2" fill={HEX.white} opacity="0.4" transform="rotate(-8.3 290 423)" />
            </g>
            <path d={bodyD} fill={`url(#${idp}-cyl)`} />
            <path d={bodyD} fill={`url(#${idp}-shade)`} opacity="0.55" />
            <ellipse cx={cx} cy={cy} rx={rx} ry={R} fill={`url(#${idp}-board)`} />
            {[0.8, 0.86, 0.92, 0.97].map((s) => (
              <ellipse key={s} cx={cx} cy={cy} rx={r2(rx * s)} ry={r2(R * s)} fill="none" stroke={HEX.white} strokeOpacity="0.16" strokeWidth="0.8" />
            ))}
            <ellipse cx={cx} cy={cy} rx={rx} ry={R} fill="none" stroke={HEX.white} strokeOpacity="0.55" strokeWidth="1.4" />
            <ellipse cx={cx} cy={cy} rx={r2(rx * 0.76)} ry={r2(R * 0.76)} fill={BOARD} filter={`url(#${idp}-grit)`} />
            <ellipse cx={cx} cy={cy} rx={r2(rx * 0.72)} ry={r2(R * 0.72)} fill={BOARD} />
            <ellipse cx={cx} cy={cy} rx={r2(rx * 0.72)} ry={r2(R * 0.72)} fill={`url(#${idp}-hole)`} />
            <ellipse cx={cx} cy={cy} rx={r2(rx * 0.72)} ry={r2(R * 0.72)} fill="none" stroke={HEX.black} strokeOpacity="0.4" strokeWidth="1.2" />
            <SheenG idp={idp} d={`M${cx - rx * 0.6} ${cy - R * 0.85}A${rx} ${R} 0 0 1 ${cx + rx * 0.6} ${cy - R * 0.85}Z`} opacity="0.35" />
          </LitG>
          <DimensionG x1={cx - rx - 22} y1={cy - R} x2={cx - rx - 22} y2={cy + R} value="100 mm" offset={30} i={5} />
          <CalloutsG>
            <CalloutG x={cx + 100} y={cy - 70} tx={590} ty={150} label="Printed film" sub="One colour" i={1} />
            <CalloutG x={cx + 8} y={cy + 40} tx={590} ty={250} label="Cardboard core" sub="76 mm" i={2} />
            <CalloutG x={cx - 4} y={cy - 108} tx={170} ty={140} label="Wound layers" side="left" i={3} />
            <CalloutG x={cx + 470 + 22} y={cy + R + 22} tx={680} ty={640} label="Saw-cut end" i={4} />
          </CalloutsG>
        </>
      )}
    </Plate>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Plate 2: a Dark Blue roll lying flat, seen from above and the front, its tail folded back at the corner.
// Object right, spot upper right.
export function TapeRollDark() {
  const spot = { x: 0.8, y: 0.18 };
  const cx = 680, cy = 372, R = 170, ry = 52, hh = 118;
  const wall = `M${cx - R} ${cy}L${cx - R} ${cy + hh}A${R} ${ry} 0 0 0 ${cx + R} ${cy + hh}L${cx + R} ${cy}Z`;
  const rc = 0.76;
  const angs = [-54, 0, 54];
  return (
    <Plate
      name="tape-roll-dark" title="Dark Blue tape roll lying flat with the end of the film folded back" spot={spot} side="right"
    >
      {(idp) => (
        <>
          <Cast idp={idp} foot={[[cx - R + 8, cy + hh + 18], [cx + R - 8, cy + hh + 18], [cx + R * 0.7, cy + hh + ry], [cx - R * 0.7, cy + hh + ry]]} spot={spot} len={110} blur={10} />
          <ShadowG idp={`${idp}-s1`} cx={cx} cy={cy + hh + ry - 6} rx={R + 10} ry={26} dir={{ x: -0.3, y: 0.2 }} />
          <FlatStrip idp={idp} k="b" m={`matrix(1 0.09 0 0.3 ${cx + 110} ${cy + hh + 30})`} len={370} h={120} bg={INK} ink={BLUE} fold={44} lift={HEX.labelGrey} creaseAt={0.4} />
          <LitG>
            <clipPath id={`${idp}-wall`}>
              <path d={wall} />
            </clipPath>
            <clipPath id={`${idp}-hole`}>
              <ellipse cx={cx} cy={cy} rx={R * rc} ry={ry * rc} />
            </clipPath>
            <path d={wall} fill={INK} />
            <g clipPath={`url(#${idp}-wall)`}>
              {angs.map((a) => {
                const t = (a * Math.PI) / 180;
                const x = cx + R * Math.sin(t), y = cy + ry * Math.cos(t) + hh / 2;
                return (
                  <g key={a} transform={`matrix(${r2(Math.cos(t))} ${r2(0.3 * Math.sin(t))} 0 1 ${r2(x)} ${r2(y)})`}>
                    <MarkG x={-98} y={-18} size={36} fill={BLUE} />
                    <WordmarkG x={-52} y={10} size={26} fill={BLUE} />
                  </g>
                );
              })}
              <rect x={cx - R} y={cy + 20} width={2 * R} height="1.5" fill={HEX.white} opacity="0.2" />
            </g>
            <path d={wall} fill={`url(#${idp}-shade-r)`} />
            <path d={wall} fill={`url(#${idp}-shade-v)`} opacity="0.5" />
            {/* the top face: wound layers as ellipses, then the core ring and the hole */}
            <ellipse cx={cx} cy={cy} rx={R} ry={ry} fill={`url(#${idp}-board-dark)`} />
            {[0.8, 0.86, 0.91, 0.96].map((s) => (
              <ellipse key={s} cx={cx} cy={cy} rx={r2(R * s)} ry={r2(ry * s)} fill="none" stroke={HEX.white} strokeOpacity="0.14" strokeWidth="0.8" />
            ))}
            <ellipse cx={cx} cy={cy} rx={R} ry={ry} fill="none" stroke={BLUE} strokeOpacity="0.8" strokeWidth="1.6" />
            <ellipse cx={cx} cy={cy} rx={r2(R * rc)} ry={r2(ry * rc)} fill={BOARD} filter={`url(#${idp}-grit)`} />
            <ellipse cx={cx} cy={cy} rx={r2(R * rc * 0.94)} ry={r2(ry * rc * 0.94)} fill={BOARD} />
            <g clipPath={`url(#${idp}-hole)`}>
              <ellipse cx={cx} cy={cy + 34} rx={r2(R * rc)} ry={r2(ry * rc)} fill={HEX.black} opacity="0.78" />
            </g>
            <ellipse cx={cx} cy={cy} rx={r2(R * rc * 0.94)} ry={r2(ry * rc * 0.94)} fill="none" stroke={HEX.black} strokeOpacity="0.45" strokeWidth="1.2" />
            <SheenG idp={idp} d={`M${cx - R * 0.7} ${cy + 4}A${R} ${ry} 0 0 1 ${cx + R * 0.3} ${cy - ry * 0.95}L${cx + R * 0.1} ${cy + 2}Z`} opacity="0.3" />
          </LitG>
          <CalloutsG>
            <CalloutG x={cx + 20} y={cy + 12} tx={560} ty={130} label="Core, top face" sub="76 mm" side="left" i={1} />
            <CalloutG x={cx - R + 30} y={cy - 10} tx={520} ty={240} label="Wound film edge" side="left" i={2} />
            <CalloutG x={cx + R - 40} y={cy + hh - 40} tx={930} ty={230} label="Printed wall" i={3} />
            <CalloutG x={cx + 110 + 370 - 14} y={cy + hh + 24} tx={1000} ty={640} label="Folded tab" i={4} />
          </CalloutsG>
          <DimensionG x1={cx - R} y1={cy + hh + 44} x2={cx + R} y2={cy + hh + 44} value="100 mm" offset={34} i={5} />
        </>
      )}
    </Plate>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Plate 3: three printed strips on the floor at different angles, one overlapping the next. Spot upper right.
export function TapeStrips() {
  const spot = { x: 0.6, y: 0.14 };
  const strips = [
    { k: 'a', th: -13, o: [120, 250], len: 600, h: 96, bg: BLUE, ink: HEX.onBlue },
    { k: 'b', th: 5, o: [150, 400], len: 620, h: 96, bg: INK, ink: BLUE },
    { k: 'c', th: 20, o: [250, 540], len: 520, h: 96, bg: HEX.paper, ink: INK },
  ];
  const mat = ({ th, o }) => {
    const c = Math.cos((th * Math.PI) / 180), s = Math.sin((th * Math.PI) / 180);
    return `matrix(${r2(c)} ${r2(0.4 * s)} ${r2(-s)} ${r2(0.4 * c)} ${o[0]} ${o[1]})`;
  };
  return (
    <Plate
      name="tape-strips" title="Three printed tape strips laid on the floor, cut and overlapping" spot={spot} floor={0.3}
    >
      {(idp) => (
        <>
          {strips.map((s) => (
            <FlatStrip key={s.k} idp={idp} k={s.k} m={mat(s)} len={s.len} h={s.h} bg={s.bg} ink={s.ink} fold={s.k === 'c' ? 40 : 0} lift={HEX.labelGrey} creaseAt={0.3 + 0.1 * strips.indexOf(s)} />
          ))}
          <CalloutsG>
            <CalloutG x={190} y={228} tx={90} ty={110} label="Printed film" side="right" i={1} />
            <CalloutG x={690} y={197} tx={560} ty={110} label="Saw-cut end" i={2} />
            <CalloutG x={487} y={576} tx={460} ty={650} label="Crease" side="left" i={3} />
            <CalloutG x={735} y={603} tx={715} ty={650} label="Folded corner" side="left" i={4} />
          </CalloutsG>
          <DimensionG x1={668} y1={198} x2={668} y2={252} value="48 mm" offset={-36} i={5} />
        </>
      )}
    </Plate>
  );
}
