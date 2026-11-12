// Four square social posts (1080 x 1080), each with its own layout, built only from printed lines and figures.
import { HEX, LINES, CAPACITY, CONTACT, POSTERS } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { MarkG } from '@/components/art/Mark';
import { CrossingBandsG, IconArtG } from '@/components/art/KeyArt';
import { Lines, HL, VL, Nd, Crossings, Word, In } from './kit';

export const SQ = 1080;

// 1. Active Blue statement: the two-tone line over a huge word-mark between two guide rows.
export function PostStatement() {
  const d = HEX.darkBlue, l = HEX.onBlue;
  const rows = LINES.box.rows;
  return (
    <g>
      <rect width={SQ} height={SQ} fill={HEX.activeBlue} />
      <HL y={150} x2={SQ} c={d} w={1.5} o={0.55} />
      <HL y={930} x2={SQ} c={d} w={1.5} o={0.55} i={1} />
      <VL x={90} y2={SQ} c={d} w={1.5} o={0.55} i={2} />
      <VL x={990} y2={SQ} c={d} w={1.5} o={0.55} i={3} />
      <Crossings xs={[90, 990]} ys={[150, 930]} c={d} s={9} />
      <In i={6}>
        <MarkG x={868} y={186} size={96} fill={l} />
        <Lines rows={rows} x={120} y={340} size={56} lh={1.25} fills={[l, d, d]} />
      </In>
      <Word x={120} y={880} size={190} fill={l} i={8} />
      <In i={10}>
        <text x="90" y="1000" fontSize="26" fill={d}>{CONTACT.web}</text>
        <text x="990" y="1000" fontSize="26" fill={d} textAnchor="end">{CONTACT.handle}</text>
      </In>
    </g>
  );
}

// 2. Periwinkle: the three words as three ruled cells, each with an icon from the 24 grid.
export function PostWords() {
  const d = HEX.darkBlue, a = HEX.activeBlue;
  const words = LINES.fieldWords, icons = ['study', 'crosshair', 'check'];
  const ys = [160, 400, 640, 880];
  return (
    <g>
      <rect width={SQ} height={SQ} fill={HEX.periwinkle} />
      {ys.map((y, i) => <HL key={y} y={y} x1={90} x2={990} c={d} w={1.5} i={i} />)}
      <VL x={90} y1={160} y2={880} c={d} w={1.5} i={4} />
      <VL x={990} y1={160} y2={880} c={d} w={1.5} i={5} />
      <Crossings xs={[90, 990]} ys={ys} c={d} s={9} i={6} />
      {words.map((w, i) => (
        <g key={w} className="slide-up" style={{ '--i': 14 + i * 3 }}>
          <text x="130" y={ys[i] + 150} fontSize="104" fill={d} lang="es" className="display" letterSpacing="-2">{w}</text>
          <IconArtG name={icons[i]} x={830} y={ys[i] + 60} size={120} fill={a} />
        </g>
      ))}
      <Word x={990} y={112} size={44} anchor="end" fill={d} />
      <MarkG x={90} y={56} size={64} fill={d} />
      <In i={20}>
        <Lines rows={POSTERS.field.body} x={90} y={936} size={22} lh={1.4} fill={d} display={false} />
      </In>
    </g>
  );
}

// 3. Light Blue data post: the annual total as an oversized numeral over the four quarters.
export function PostCapacity() {
  const d = HEX.darkBlue, a = HEX.activeBlue, q = CAPACITY.quarters;
  const base = 900, w = 195, g = 40, k = 300 / 5200;
  return (
    <g>
      <rect width={SQ} height={SQ} fill={HEX.lightBlue} />
      <Lines rows={CAPACITY.titleRows} x={90} y={116} size={34} lh={1.25} fill={d} />
      <HL y={190} x1={90} x2={990} c={d} w={1.5} i={1} />
      <Nd x={90} y={190} c={d} i={2} />
      <Nd x={990} y={190} c={d} i={3} />
      <text x="90" y="262" fontSize="28" fill={HEX.blueInk} lang="es">{CAPACITY.totalLabel}</text>
      <g className="slide-up" style={{ '--i': 4 }}>
        <text x="84" y="420" fontSize="168" fill={d} lang="es" className="display" letterSpacing="-5">{CAPACITY.totalValue}</text>
      </g>
      {q.map((it, i) => {
        const h = r2(it.mw * k), x = 90 + i * (w + g);
        return (
          <g key={it.q}>
            <rect x={x} y={base - h} width={w} height={h} fill={it.peak ? a : HEX.blueSoft} className="rise" style={{ '--i': 6 + i * 2 }} />
            <g className="fade-in" style={{ '--i': 16 + i }} lang="es">
              <text x={x} y={base + 42} fontSize="26" fill={d}>{it.q}</text>
              <text x={x} y={base + 78} fontSize="26" fill={HEX.muted}>{it.value}</text>
            </g>
          </g>
        );
      })}
      <HL y={base} x1={90} x2={990} c={d} w={1.5} i={5} />
      {q.map((it, i) => <Nd key={it.q} x={90 + i * (w + g)} y={base} c={d} i={8 + i} />)}
    </g>
  );
}

// 4. Dark Blue: the crossing bands of the folder above the two-tone event pair.
export function PostBands() {
  const l = HEX.onBlue, a = HEX.activeBlue;
  return (
    <g>
      <rect width={SQ} height={SQ} fill={HEX.darkBlue} />
      <CrossingBandsG idp="campaign-post-bands" w={SQ} h={640} cx={0.62} cy={0.5} band={0.035} r={0.09} />
      <HL y={640} x2={SQ} c={l} w={1.2} o={0.5} i={1} />
      <Nd x={90} y={640} c={l} i={2} />
      <Nd x={990} y={640} c={l} i={3} />
      <In i={6}>
        <Lines rows={LINES.connect.rows} x={90} y={760} size={60} lh={1.2} fills={[l, a]} />
        <Lines rows={LINES.viable.rows} x={90} y={930} size={26} lh={1.45} fill={l} display={false} />
        <text x="90" y="1030" fontSize="24" fill={a}>{CONTACT.handle}</text>
        <text x="990" y="1030" fontSize="24" fill={l} textAnchor="end">{CONTACT.web}</text>
      </In>
      <MarkG x={868} y={868} size={110} fill={a} />
    </g>
  );
}

export const POST_LIST = [
  { key: 'statement', title: 'Statement post', node: () => <PostStatement /> },
  { key: 'words', title: 'Three words post', node: () => <PostWords /> },
  { key: 'capacity', title: 'Capacity post', node: () => <PostCapacity /> },
  { key: 'bands', title: 'Crossing bands post', node: () => <PostBands /> },
];
