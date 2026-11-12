// The four 3:4 posters of the case study (m09 and m11), rebuilt on a 1080 x 1440 sheet. Measured on the references:
// sheet x = (X - 69 or 811) x 1.5, sheet y = (Y - 120) x 1.5. Headlines re-measured by width on m09_1 / m11_1: 61.5 px
// on a 67 px pitch. Photographs become the abstract fields of the brand (never traced).
//
// Every poster also takes h = PH45 (1350): the deliverable 1080 x 1350 sheet. It is re-composed, not squashed: the
// type keeps its size, the top band and the footer keep their distance from the edges, and only the open middle of
// the sheet gives up the 90 px (see fy).
import { HEX, POSTERS } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';
import { MarkG } from '@/components/art/Mark';
import { LatticeFieldG, IconArtG, PhotoBlockG, BaselineFieldG } from '@/components/art/KeyArt';
import { Lines, HL, VL, Crossings, Word, In } from './kit';

export const PW = 1080;
export const PH = 1440;
export const PH45 = 1350;
const HEAD = 61.5, HLH = 1.09;

// mono: the m10 state of a sheet (the poster grid animation): paper ground, the baseline field over the live area,
// every line and the type in one grey ink, photographs as flat Dark Blue blocks at 75%.
const INK = HEX.muted;
function MonoGround({ idp, h }) {
  return (
    <g>
      <rect width={PW} height={h} fill={HEX.paper} />
      <BaselineFieldG idp={`${idp}-bf`} x={72} y={76} w={936} h={h - 152} />
    </g>
  );
}

// The vertical layout of a sheet of height h: positions in the top 300 px stay, positions below 1150 move up with
// the bottom edge, the middle is re-spaced in between.
export function fy(h) {
  const cut = PH - h;
  if (!cut) return (v) => v;
  return (v) => (v <= 300 ? v : v >= 1150 ? v - cut : r2(300 + ((v - 300) * (850 - cut)) / 850));
}

// Stand-in for the corridor photograph of the left poster: lit end wall, stepped rack columns, floor reflections.
function Corridor({ idp }) {
  const rnd = seeded(7);
  const racks = (side) =>
    Array.from({ length: 6 }, (_, i) => {
      const w = 62, x = side < 0 ? i * w : PW - (i + 1) * w, y = 30 + i * 58, h = 800 - y - i * 40;
      return (
        <g key={`${side}${i}`}>
          <rect x={x} y={y} width={w} height={h} fill={HEX.darkBlue} opacity={r2(0.55 + i * 0.07)} />
          <rect x={x} y={y} width={w} height={h} fill={HEX.black} opacity="0.35" />
          {Array.from({ length: Math.floor(h / 26) }, (_, j) => (
            <rect key={j} x={x} y={y + j * 26} width={w} height="1" fill={HEX.activeBlue} opacity="0.16" />
          ))}
          <rect x={side < 0 ? x + w - 1 : x} y={y} width="1" height={h} fill={HEX.activeBlue} opacity="0.3" />
        </g>
      );
    });
  return (
    <g>
      <linearGradient id={`${idp}-lit`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={HEX.activeBlue} stopOpacity="0.45" />
        <stop offset="0.55" stopColor={HEX.activeBlue} stopOpacity="0.18" />
        <stop offset="1" stopColor={HEX.darkBlue} stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${idp}-floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={HEX.black} stopOpacity="0.4" />
        <stop offset="1" stopColor={HEX.darkBlue} stopOpacity="0" />
      </linearGradient>
      <rect x="372" y="30" width="336" height="800" fill={`url(#${idp}-lit)`} />
      {racks(-1)}
      {racks(1)}
      <rect y="800" width={PW} height="640" fill={`url(#${idp}-floor)`} />
      {Array.from({ length: 14 }, (_, k) => (
        <rect key={k} x={r2(120 + rnd() * 840)} y={820} width={r2(2 + rnd() * 6)} height={r2(120 + rnd() * 260)} fill={HEX.activeBlue} opacity={r2(0.1 + rnd() * 0.16)} />
      ))}
    </g>
  );
}

// m09 left: data-centre corridor, Active Blue type and guide frame on dark.
export function PosterDataCentre({ idp, h = PH, mono = false }) {
  const P = POSTERS.dataCentre, a = mono ? INK : HEX.activeBlue, Y = fy(h);
  return (
    <g>
      {mono ? <MonoGround idp={idp} h={h} /> : (
        <g>
          <rect width={PW} height={h} fill={HEX.darkBlue} />
          <g transform={h === PH ? undefined : `scale(1 ${r2((h / PH) * 1e4) / 1e4})`}>
            <Corridor idp={idp} />
          </g>
        </g>
      )}
      <VL x={72} y2={h} c={a} w={1.5} o={0.7} />
      <VL x={1008} y2={h} c={a} w={1.5} o={0.7} i={1} />
      <HL y={76} x2={PW} c={a} w={1.5} o={0.7} i={2} />
      <HL y={Y(1256)} x2={PW} c={a} w={1.5} o={0.7} i={3} />
      <HL y={Y(1364)} x2={PW} c={a} w={1.5} o={0.7} i={4} />
      <Crossings xs={[72, 1008]} ys={[76, Y(1256), Y(1364)]} c={a} s={9} />
      <Word x={144} y={204} size={77} fill={a} />
      <In i={9}>
        <Lines rows={P.head} x={147} y={Y(860)} size={HEAD} lh={HLH} fill={a} />
        <Lines rows={P.body} x={147} y={Y(1068)} size={22} lh={1.23} fill={a} display={false} />
        <Lines rows={[P.tag]} x={147} y={Y(1202)} size={15} fill={a} display={false} />
        <MarkG x={146} y={Y(1283)} size={54} fill={a} />
        <text x="933" y={Y(1318)} fontSize="15" fill={a} textAnchor="end">{P.web}</text>
      </In>
    </g>
  );
}

// m09 right: Light Blue, mark in a narrow column, headline in Active Blue, two photo blocks below.
export function PosterGeneration({ idp, h = PH, mono = false }) {
  const P = POSTERS.generation, a = mono ? INK : HEX.activeBlue, ink = mono ? INK : HEX.blueInk, Y = fy(h);
  const top = Y(860), bot = h - 28;
  return (
    <g>
      {mono ? <MonoGround idp={idp} h={h} /> : <rect width={PW} height={h} fill={HEX.lightBlue} />}
      <VL x={220} y2={Y(832)} c={a} />
      <HL y={Y(832)} x2={PW} c={a} i={1} />
      <VL x={540} y1={Y(832)} y2={h} c={a} i={2} />
      <Crossings xs={[220, 540]} ys={[Y(832)]} c={a} s={7} i={3} />
      <In i={4}>
        <MarkG x={82} y={76} size={54} fill={a} />
        <Lines rows={P.head} x={305} y={118} size={HEAD} lh={HLH} fill={a} />
        <Lines rows={P.body} x={305} y={346} size={17} lh={1.32} fill={ink} display={false} />
        <Lines rows={P.tag} x={305} y={Y(759)} size={15} lh={1.3} fill={ink} display={false} />
        <text x="71" y={Y(777)} fontSize="14" fill={ink}>{P.web}</text>
      </In>
      <Word x={1010} y={Y(780)} size={77} anchor="end" fill={a} i={5} />
      <g className="fade-in" style={{ '--i': 7 }}>
        <PhotoBlockG x={27} y={top} w={486} h={bot - top} />
        <PhotoBlockG x={567} y={top} w={486} h={bot - top} />
        {!mono && (
          <g>
            <LatticeFieldG cx={270} cy={r2((top + bot) / 2)} k={3.2} rings={5} fill={HEX.lightBlue} opacity="0.4" />
            <IconArtG name="solar" px x={150} y={r2((top + bot) / 2 - 120)} size={240} fill={HEX.lightBlue} />
            <IconArtG name="wind" px x={627} y={r2((top + bot) / 2 - 180)} size={360} fill={HEX.lightBlue} />
          </g>
        )}
      </g>
    </g>
  );
}

// m11 left: Dark Blue, centred word-mark, one square field with the three words, light guide frame.
export function PosterField({ idp, h = PH, mono = false }) {
  const P = POSTERS.field, g = mono ? INK : HEX.labelGrey, l = mono ? INK : HEX.onBlue, Y = fy(h);
  const side = Y(1147) - 292, sx = r2(540 - side / 2);
  return (
    <g>
      {mono ? <MonoGround idp={idp} h={h} /> : <rect width={PW} height={h} fill={HEX.darkBlue} />}
      <VL x={72} y2={h} c={g} w={1.2} o={0.8} />
      <VL x={1008} y2={h} c={g} w={1.2} o={0.8} i={1} />
      <HL y={237} x2={PW} c={g} w={1.2} o={0.8} i={2} />
      <HL y={Y(1200)} x2={PW} c={g} w={1.2} o={0.8} i={3} />
      <VL x={540} y1={237} y2={Y(1200)} c={g} w={1.2} o={0.8} i={4} />
      <Crossings xs={[72, 540, 1008]} ys={[237, Y(1200)]} c={l} s={9} i={5} />
      <Word x={540} y={175} size={77} anchor="middle" fill={l} />
      <g className="fade-in" style={{ '--i': 8 }}>
        <linearGradient id={`${idp}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={HEX.activeBlue} stopOpacity="0.55" />
          <stop offset="0.6" stopColor={HEX.activeBlue} stopOpacity="0.3" />
          <stop offset="1" stopColor={HEX.activeBlue} stopOpacity="0.18" />
        </linearGradient>
        {mono ? <PhotoBlockG x={sx} y={292} w={side} h={side} /> : (
          <g>
            <rect x={sx} y="292" width={side} height={side} fill={HEX.darkBlue} />
            <rect x={sx} y="292" width={side} height={side} fill={`url(#${idp}-sky)`} />
            <IconArtG name="wind" px x={r2(540 - side * 0.25)} y={r2(292 + side * 0.044)} size={r2(side * 0.5)} fill={HEX.lightBlue} opacity="0.55" />
          </g>
        )}
        <text x={r2(sx + side * 0.174)} y={r2(292 + side * 0.925)} fontSize="36" fill={mono ? HEX.onBlue : HEX.white} lang="es" className="display">{P.head}</text>
      </g>
      <In i={10}>
        <Lines rows={P.body} x={540} y={Y(1318)} size={16.5} lh={1.35} fill={l} anchor="middle" display={false} />
        <text x="112" y={Y(1363)} fontSize="14" fill={l}>{P.email}</text>
        <text x="968" y={Y(1363)} fontSize="14" fill={l} textAnchor="end">{P.web}</text>
      </In>
    </g>
  );
}

// m11 right: Active Blue, centred type in Dark Blue, a footer of three ruled cells.
export function PosterClarity({ idp, h = PH, mono = false }) {
  const P = POSTERS.clarity, d = mono ? INK : HEX.darkBlue, Y = fy(h);
  return (
    <g>
      {mono ? <MonoGround idp={idp} h={h} /> : <rect width={PW} height={h} fill={HEX.activeBlue} />}
      <VL x={72} y2={h} c={d} w={1.2} o={0.6} />
      <VL x={1008} y2={h} c={d} w={1.2} o={0.6} i={1} />
      <HL y={76} x2={PW} c={d} w={1.2} o={0.6} i={2} />
      <HL y={Y(1254)} x2={PW} c={d} w={1.2} o={0.6} i={3} />
      <HL y={Y(1362)} x2={PW} c={d} w={1.2} o={0.6} i={4} />
      <VL x={382} y1={Y(1254)} y2={Y(1362)} c={d} w={1.2} o={0.6} i={5} />
      <VL x={697} y1={Y(1254)} y2={Y(1362)} c={d} w={1.2} o={0.6} i={6} />
      <Crossings xs={[72, 1008]} ys={[76, Y(1254), Y(1362)]} c={d} s={9} i={7} />
      <Crossings xs={[382, 697]} ys={[Y(1254), Y(1362)]} c={d} s={9} i={9} />
      <Word x={540} y={231} size={78} anchor="middle" fill={d} />
      <In i={9}>
        <Lines rows={P.head} x={540} y={Y(590)} size={HEAD} lh={HLH} fill={d} anchor="middle" />
        <Lines rows={P.body} x={540} y={Y(1067)} size={17.7} lh={1.3} fill={d} anchor="middle" display={false} />
        <text x="227" y={Y(1314)} fontSize="15" fill={d} textAnchor="middle">{P.web}</text>
        <text x="853" y={Y(1314)} fontSize="15" fill={d} textAnchor="middle">{P.web}</text>
        <MarkG x={513} y={Y(1285)} size={54} fill={d} />
      </In>
    </g>
  );
}

export const POSTER_LIST = [
  { key: 'data-centre', title: 'Data-centre poster', node: (idp, h, mono) => <PosterDataCentre idp={idp} h={h} mono={mono} />, from: 'm09' },
  { key: 'generation', title: 'Generation poster', node: (idp, h, mono) => <PosterGeneration idp={idp} h={h} mono={mono} />, from: 'm09' },
  { key: 'field', title: 'Field poster', node: (idp, h, mono) => <PosterField idp={idp} h={h} mono={mono} />, from: 'm11' },
  { key: 'clarity', title: 'Clarity poster', node: (idp, h, mono) => <PosterClarity idp={idp} h={h} mono={mono} />, from: 'm11' },
];
