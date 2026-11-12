// The four 3:4 posters of the case study (m09 and m11), rebuilt on a 1080 x 1440 sheet. Measured on the references:
// sheet x = (X - 69 or 811) x 1.5. Photographs become the abstract fields of the brand (never traced).
import { HEX, POSTERS } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';
import { MarkG } from '@/components/art/Mark';
import { LatticeFieldG, IconArtG, PhotoBlockG } from '@/components/art/KeyArt';
import { Lines, HL, VL, Crossings, Word, In } from './kit';

export const PW = 1080;
export const PH = 1440;
const SOFT = '#7c9cff';

// Stand-in for the corridor photograph of the left poster: lit end wall, stepped rack columns, floor reflections.
function Corridor({ idp }) {
  const rnd = seeded(7);
  const racks = (side) =>
    Array.from({ length: 6 }, (_, i) => {
      const w = 62, x = side < 0 ? i * w : PW - (i + 1) * w, y = 30 + i * 58, h = 800 - y - i * 40;
      return (
        <g key={`${side}${i}`}>
          <rect x={x} y={y} width={w} height={h} fill="#0d1026" opacity={r2(0.55 + i * 0.07)} />
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
        <stop offset="0" stopColor="#4a5390" />
        <stop offset="0.55" stopColor="#2a3266" />
        <stop offset="1" stopColor={HEX.darkBlue} />
      </linearGradient>
      <linearGradient id={`${idp}-floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#11142e" />
        <stop offset="1" stopColor={HEX.darkBlue} />
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
export function PosterDataCentre({ idp }) {
  const P = POSTERS.dataCentre, a = HEX.activeBlue;
  return (
    <g>
      <rect width={PW} height={PH} fill={HEX.darkBlue} />
      <Corridor idp={idp} />
      <VL x={72} y2={PH} c={a} w={1.5} o={0.7} />
      <VL x={1008} y2={PH} c={a} w={1.5} o={0.7} i={1} />
      <HL y={76} x2={PW} c={a} w={1.5} o={0.7} i={2} />
      <HL y={1256} x2={PW} c={a} w={1.5} o={0.7} i={3} />
      <HL y={1364} x2={PW} c={a} w={1.5} o={0.7} i={4} />
      <Crossings xs={[72, 1008]} ys={[76, 1256, 1364]} c={a} s={9} />
      <Word x={144} y={204} size={77} fill={a} />
      <In i={9}>
        <Lines rows={P.head} x={147} y={858} size={52} lh={1.3} fill={a} />
        <Lines rows={P.body} x={147} y={1066} size={20} lh={1.3} fill={a} display={false} />
        <Lines rows={[P.tag]} x={147} y={1202} size={15} fill={a} display={false} />
        <MarkG x={146} y={1283} size={54} fill={a} />
        <text x="1008" y="1318" fontSize="16" fill={a} textAnchor="end">{P.web}</text>
      </In>
    </g>
  );
}

// m09 right: Light Blue, mark in a narrow column, headline in Active Blue, two photo squares below.
export function PosterGeneration() {
  const P = POSTERS.generation, a = HEX.activeBlue, ink = HEX.blueInk;
  return (
    <g>
      <rect width={PW} height={PH} fill={HEX.lightBlue} />
      <VL x={220} y2={832} c={a} />
      <HL y={832} x2={PW} c={a} i={1} />
      <VL x={540} y1={832} y2={PH} c={a} i={2} />
      <Crossings xs={[220, 540]} ys={[832]} c={a} s={7} i={3} />
      <In i={4}>
        <MarkG x={82} y={76} size={54} fill={a} />
        <Lines rows={P.head} x={305} y={118} size={52} lh={1.3} fill={a} />
        <Lines rows={P.body} x={305} y={346} size={17} lh={1.4} fill={ink} display={false} />
        <Lines rows={P.tag} x={305} y={759} size={15} lh={1.3} fill={ink} display={false} />
        <text x="71" y="777" fontSize="14" fill={ink}>{P.web}</text>
      </In>
      <Word x={1010} y={780} size={77} anchor="end" fill={a} i={5} />
      <g className="fade-in" style={{ '--i': 7 }}>
        <PhotoBlockG x={27} y={860} w={486} h={552} />
        <PhotoBlockG x={567} y={860} w={486} h={552} />
        <LatticeFieldG cx={270} cy={1136} k={3.2} rings={5} fill={HEX.lightBlue} opacity="0.4" />
        <IconArtG name="solar" px x={150} y={1016} size={240} fill={HEX.lightBlue} />
        <IconArtG name="wind" px x={627} y={956} size={360} fill={HEX.lightBlue} />
      </g>
    </g>
  );
}

// m11 left: Dark Blue, centred word-mark, one square field with the three words, light guide frame.
export function PosterField({ idp }) {
  const P = POSTERS.field, g = HEX.labelGrey, l = HEX.onBlue;
  return (
    <g>
      <rect width={PW} height={PH} fill={HEX.darkBlue} />
      <VL x={72} y2={PH} c={g} w={1.2} o={0.8} />
      <VL x={1008} y2={PH} c={g} w={1.2} o={0.8} i={1} />
      <HL y={237} x2={PW} c={g} w={1.2} o={0.8} i={2} />
      <HL y={1200} x2={PW} c={g} w={1.2} o={0.8} i={3} />
      <VL x={540} y1={237} y2={1200} c={g} w={1.2} o={0.8} i={4} />
      <Crossings xs={[72, 540, 1008]} ys={[237, 1200]} c={l} s={9} i={5} />
      <Word x={540} y={175} size={77} anchor="middle" fill={l} />
      <g className="fade-in" style={{ '--i': 8 }}>
        <linearGradient id={`${idp}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a6aa8" />
          <stop offset="0.6" stopColor="#3a4580" />
          <stop offset="1" stopColor="#2a3266" />
        </linearGradient>
        <rect x="112" y="292" width="856" height="855" fill={`url(#${idp}-sky)`} />
        <IconArtG name="wind" px x={326} y={330} size={430} fill={HEX.lightBlue} opacity="0.55" />
        <rect x="112" y="1000" width="856" height="147" fill={HEX.darkBlue} opacity="0.55" />
        <text x="261" y="1083" fontSize="36" fill="#ffffff" lang="es" className="display">{P.head}</text>
      </g>
      <In i={10}>
        <Lines rows={P.body} x={540} y={1318} size={16.5} lh={1.35} fill={l} anchor="middle" display={false} />
        <text x="112" y="1359" fontSize="14" fill={l}>{P.email}</text>
        <text x="968" y="1359" fontSize="14" fill={l} textAnchor="end">{P.web}</text>
      </In>
    </g>
  );
}

// m11 right: Active Blue, centred type in Dark Blue, a footer of three ruled cells.
export function PosterClarity() {
  const P = POSTERS.clarity, d = HEX.darkBlue;
  return (
    <g>
      <rect width={PW} height={PH} fill={HEX.activeBlue} />
      <VL x={72} y2={PH} c={d} w={1.2} o={0.6} />
      <VL x={1008} y2={PH} c={d} w={1.2} o={0.6} i={1} />
      <HL y={76} x2={PW} c={d} w={1.2} o={0.6} i={2} />
      <HL y={1254} x2={PW} c={d} w={1.2} o={0.6} i={3} />
      <HL y={1362} x2={PW} c={d} w={1.2} o={0.6} i={4} />
      <VL x={382} y1={1254} y2={1362} c={d} w={1.2} o={0.6} i={5} />
      <VL x={697} y1={1254} y2={1362} c={d} w={1.2} o={0.6} i={6} />
      <Crossings xs={[72, 1008]} ys={[76, 1254, 1362]} c={d} s={9} i={7} />
      <Crossings xs={[382, 697]} ys={[1254, 1362]} c={d} s={9} i={9} />
      <Word x={540} y={231} size={78} anchor="middle" fill={d} />
      <In i={9}>
        <Lines rows={P.head} x={540} y={590} size={52} lh={1.3} fill={d} anchor="middle" />
        <Lines rows={P.body} x={540} y={1067} size={17} lh={1.35} fill={d} anchor="middle" display={false} />
        <text x="227" y="1314" fontSize="15" fill={d} textAnchor="middle">{P.web}</text>
        <text x="853" y="1314" fontSize="15" fill={d} textAnchor="middle">{P.web}</text>
        <MarkG x={513} y={1285} size={54} fill={d} />
      </In>
    </g>
  );
}

export const POSTER_LIST = [
  { key: 'data-centre', title: 'Data-centre poster', node: (idp) => <PosterDataCentre idp={idp} />, from: 'm09' },
  { key: 'generation', title: 'Generation poster', node: () => <PosterGeneration />, from: 'm09' },
  { key: 'field', title: 'Field poster', node: (idp) => <PosterField idp={idp} />, from: 'm11' },
  { key: 'clarity', title: 'Clarity poster', node: () => <PosterClarity />, from: 'm11' },
];
