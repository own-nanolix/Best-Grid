// Five stories (1080 x 1920). Printed lines and figures only; each has its own structure.
import { HEX, LINES, TECH, CAPACITY, CONTACT, POSTERS } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { MarkG, LockupFooterG } from '@/components/art/Mark';
import { NodeGridG, BaselineFieldG, PhotoBlockG, IconArtG } from '@/components/art/KeyArt';
import { Lines, HL, VL, Nd, Crossings, Word, In } from './kit';

export const SW = 1080;
export const SH = 1920;

// 1. Active Blue: the website headline above one very large mark.
export function StoryHero() {
  const d = HEX.darkBlue;
  return (
    <g>
      <rect width={SW} height={SH} fill={HEX.activeBlue} />
      <VL x={90} y2={SH} c={d} o={0.5} />
      <VL x={990} y2={SH} c={d} o={0.5} i={1} />
      <HL y={250} x2={SW} c={d} o={0.5} i={2} />
      <HL y={1670} x2={SW} c={d} o={0.5} i={3} />
      <Crossings xs={[90, 990]} ys={[250, 1670]} c={d} />
      <Word x={90} y={200} size={72} fill={d} />
      <In i={8}>
        <Lines rows={LINES.web.rows} x={90} y={450} size={92} lh={1.14} fill={d} />
        <MarkG x={290} y={820} size={500} fill={HEX.onBlue} />
        <text x="90" y="1740" fontSize="30" fill={d}>{CONTACT.web}</text>
        <text x="990" y="1740" fontSize="30" fill={d} textAnchor="end">{CONTACT.handle}</text>
      </In>
    </g>
  );
}

// 2. Dark Blue: the four technology cells of the website, the Data Centers cell highlighted.
export function StoryTech() {
  const l = HEX.onBlue, a = HEX.activeBlue;
  const ys = [320, 620, 920, 1220, 1520];
  return (
    <g>
      <rect width={SW} height={SH} fill={HEX.darkBlue} />
      <Word x={90} y={200} size={72} fill={l} />
      {ys.map((y, i) => <HL key={y} y={y} x1={90} x2={990} c={l} w={1.2} o={0.5} i={i} />)}
      <VL x={90} y1={320} y2={1520} c={l} w={1.2} o={0.5} i={5} />
      <VL x={990} y1={320} y2={1520} c={l} w={1.2} o={0.5} i={6} />
      <Crossings xs={[90, 990]} ys={ys} c={l} s={9} i={7} />
      {TECH.map((t, i) => {
        const hl = t.highlight, fg = hl ? HEX.darkBlue : l, vg = hl ? HEX.darkBlue : a;
        return (
          <g key={t.key} className="fade-in" style={{ '--i': 12 + i * 3 }} lang="es">
            {hl && <rect x="91" y={ys[i] + 1} width="898" height="298" fill={a} />}
            <IconArtG name={t.icon} px x={140} y={ys[i] + 75} size={150} fill={fg} />
            <text x="340" y={ys[i] + 120} fontSize="40" fill={fg}>{t.label}</text>
            <text x="336" y={ys[i] + 235} fontSize="108" fill={vg} className="display" letterSpacing="-3">{t.value}</text>
          </g>
        );
      })}
      <MarkG x={90} y={1620} size={90} fill={a} />
    </g>
  );
}

// 3. Light Blue: the clarity line on a paper plate over the baseline field, a photo block below.
export function StoryClarity() {
  const d = HEX.darkBlue, P = POSTERS.clarity;
  return (
    <g>
      <rect width={SW} height={SH} fill={HEX.lightBlue} />
      <BaselineFieldG idp="campaign-st3" x={90} y={250} w={900} h={1320} opacity={0.8} />
      <Word x={90} y={200} size={72} fill={d} />
      <HL y={250} x2={SW} c={d} o={0.5} i={1} />
      <HL y={1570} x2={SW} c={d} o={0.5} i={2} />
      <Crossings xs={[90, 990]} ys={[250, 1570]} c={d} i={3} />
      <In i={8}>
        <rect x="90" y="330" width="900" height="400" fill={HEX.paper} />
        <Lines rows={P.head} x={130} y={470} size={84} lh={1.18} fill={d} />
        <rect x="90" y="790" width="900" height="190" fill={HEX.paper} />
        <Lines rows={P.body} x={130} y={860} size={30} lh={1.4} fill={d} display={false} />
        <PhotoBlockG x={90} y={1040} w={900} h={530} />
        <IconArtG name="wind" px x={390} y={1100} size={410} fill={HEX.lightBlue} opacity="0.7" />
      </In>
      <LockupFooterG x={90} y={1660} w={900} h={120} fill={d} line={d} size={24} />
    </g>
  );
}

// 4. Periwinkle: the three KPI cells of the phone, one numeral each.
export function StoryKpis() {
  const d = HEX.darkBlue, ys = [300, 700, 1100, 1500];
  return (
    <g>
      <rect width={SW} height={SH} fill={HEX.periwinkle} />
      <Word x={90} y={200} size={72} fill={d} />
      {ys.map((y, i) => <HL key={y} y={y} x1={90} x2={990} c={d} w={1.5} i={i} />)}
      <VL x={90} y1={300} y2={1500} c={d} w={1.5} i={4} />
      <VL x={990} y1={300} y2={1500} c={d} w={1.5} i={5} />
      <Crossings xs={[90, 990]} ys={ys} c={d} i={6} />
      {CAPACITY.kpis.map((k, i) => (
        <g key={k.label} className="slide-up" style={{ '--i': 12 + i * 4 }} lang="es">
          {i === 1 && <rect x="91" y={ys[i] + 1} width="898" height="398" fill={HEX.statCell} />}
          <text x="130" y={ys[i] + 90} fontSize="42" fill={d}>{k.label}</text>
          <text x="120" y={ys[i] + 350} fontSize="270" fill={d} className="display" letterSpacing="-8">{k.value}</text>
          <rect x="800" y={ys[i] + 330} width={r2(100 + i * 30)} height="14" fill={HEX.activeBlue} className="grow-x" style={{ '--i': 18 + i }} />
        </g>
      ))}
      <MarkG x={90} y={1610} size={110} fill={d} />
      <text x="990" y="1700" fontSize="30" fill={d} textAnchor="end">{CONTACT.web}</text>
    </g>
  );
}

// 5. Dark Blue: the node grid of the back phone (cells carry no data) under its title, the billboard line below.
export function StoryNodes() {
  const l = HEX.onBlue, a = HEX.activeBlue;
  return (
    <g>
      <rect width={SW} height={SH} fill={HEX.darkBlue} />
      <Lines rows={CAPACITY.nodesTitleRows} x={90} y={170} size={58} lh={1.2} fill={l} />
      <g className="fade-in" style={{ '--i': 3 }}>
        <NodeGridG x={0} y={330} cols={12} rows={13} size={90} seed={5} clusters={10} line={HEX.lightBlue} lineOpacity={0.24} animate />
      </g>
      <HL y={330} x2={SW} c={l} w={1.2} o={0.6} />
      <HL y={1500} x2={SW} c={l} w={1.2} o={0.6} i={1} />
      <Nd x={90} y={330} c={l} i={2} />
      <Nd x={990} y={1500} c={l} i={3} />
      <In i={14}>
        <Lines rows={LINES.billboard.rows} x={90} y={1620} size={42} lh={1.3} fills={[l, a]} />
        <MarkG x={868} y={1700} size={110} fill={a} />
      </In>
    </g>
  );
}

export const STORY_LIST = [
  { key: 'hero', title: 'Hero story', node: () => <StoryHero /> },
  { key: 'technologies', title: 'Technologies story', node: () => <StoryTech /> },
  { key: 'clarity', title: 'Clarity story', node: () => <StoryClarity /> },
  { key: 'indicators', title: 'Indicators story', node: () => <StoryKpis /> },
  { key: 'nodes', title: 'Node grid story', node: () => <StoryNodes /> },
];
