// The five slides of the case study's presentation, rebuilt at 1600 x 900 (m04 colour, m03 type, m21 logo plate, m14
// icon construction, m16 data row). Each is a group so the same artwork exports alone and sits on the deck plate.
// Left out on purpose: the colour-matching system codes and the typeface's product name.
import { HEX, PALETTE, SPECS, TECH } from '@/lib/brand';
import { MarkG } from '@/components/art/Mark';
import { IconArtG, TurbineConstructionG } from '@/components/art/KeyArt';

const D = HEX.darkBlue, A = HEX.activeBlue, L = HEX.onBlue;
export const SLIDE = { w: 1600, h: 900 };

// Hairline guides with a square node at every crossing (the slide's signature).
function Guides({ xs, spans, color = D }) {
  return (
    <g>
      {spans.map(([x1, y1, x2, y2]) => (
        <rect key={`${x1}-${y1}-${x2}-${y2}`} x={x1 - (x1 === x2 ? 0.5 : 0)} y={y1 - (y1 === y2 ? 0.5 : 0)} width={x2 - x1 || 1} height={y2 - y1 || 1} fill={color} />
      ))}
      {xs.flatMap((p) => p.map(([x, y]) => <rect key={`${x}-${y}`} x={x - 4.5} y={y - 4.5} width="9" height="9" fill={color} />))}
    </g>
  );
}

// Colour slide (m04): header cell, an empty field, then three equal full-width bands with the name bottom left and
// the values in two columns. HEX, RGB and CMYK as printed; Light Blue's RGB comes from its HEX.
export function SlideColourG() {
  const top = 333, bh = 189;
  const ink = [L, L, D], bg = [D, A, HEX.lightBlue];
  const keys = ['RGB', 'CMYK', 'HEX'];
  return (
    <g>
      <rect width="1600" height="900" fill={HEX.periwinkle} />
      <Guides
        spans={[[0, 70, 1600, 70], [0, 140, 1600, 140], [122, 0, 122, 140], [1478, 0, 1478, 140], [800, 140, 800, top]]}
        xs={[[[122, 70], [1478, 70], [122, 140], [800, 140], [1478, 140]]]}
      />
      <text x="806" y="112" fontSize="22" fill={A} textAnchor="middle">{SPECS.color.title}</text>
      {PALETTE.map((p, i) => {
        const y = top + i * bh;
        const vals = [p.rgb.join(' | '), p.cmyk.replace('  ', '  '), p.hex];
        return (
          <g key={p.token}>
            <rect x="0" y={y} width="1600" height={bh} fill={bg[i]} />
            <text x="118" y={y + 133} fontSize="40" fill={ink[i]}>{p.name}</text>
            {keys.map((k, j) => (
              <g key={k} fontSize="20" fill={ink[i]}>
                <text x="820" y={y + 76 + j * 31}>{k}</text>
                <text x="1170" y={y + 76 + j * 31}>{vals[j]}</text>
              </g>
            ))}
          </g>
        );
      })}
    </g>
  );
}

// Type slide (m03): header cells, the specimen very large in Dark Blue, three footer cells.
export function SlideTypeG() {
  const s = SPECS.type, hy = [80, 170], fy = [730, 810], fx = [122, 574, 1026, 1478];
  const cells = [[s.title, 466], [s.name, 1139]];
  const foot = [[s.set, 348], [s.weight, 800], [s.optical, 1252]];
  return (
    <g>
      <rect width="1600" height="900" fill={HEX.periwinkle} />
      <Guides
        spans={[[0, 80, 1600, 80], [0, 170, 1600, 170], [0, 730, 1600, 730], [0, 810, 1600, 810], [122, 0, 122, 900], [1478, 0, 1478, 900], [800, 80, 800, 170], [574, 730, 574, 810], [1026, 730, 1026, 810]]}
        xs={[[...[122, 800, 1478].flatMap((x) => hy.map((y) => [x, y])), ...fx.flatMap((x) => fy.map((y) => [x, y]))]]}
      />
      {cells.map(([t, x]) => <text key={t} x={x} y="131" fontSize="22" fill={A} textAnchor="middle">{t}</text>)}
      {foot.map(([t, x]) => <text key={t} x={x} y="777" fontSize="22" fill={A} textAnchor="middle">{t}</text>)}
      <text x="800" y="628" fontSize="460" fill={D} textAnchor="middle" letterSpacing="-14">{s.specimen}</text>
    </g>
  );
}

// Logo plate (m21): the mark alone, Active Blue on Dark Blue, centred, 31% of the slide width.
export function SlideLogoG() {
  return (
    <g>
      <rect width="1600" height="900" fill={D} />
      <MarkG x={552} y={202} size={496} fill={A} />
    </g>
  );
}

// Icon construction slide (m14): the 32 x 32 hairline grid with nodes at its corners, the label "32 x 32", three guide
// circles and the turbine in Dark Blue.
export function SlideIconsG() {
  return (
    <g>
      <rect width="1600" height="900" fill={HEX.periwinkle} />
      <Guides color={A} spans={[[0, 100, 1600, 100], [450, 0, 450, 900], [1150, 0, 1150, 900]]} xs={[[[450, 100], [1150, 100], [450, 800], [1150, 800]]]} />
      <text x="490" y="86" fontSize="18" fill={A}>{SPECS.icon.grid}</text>
      <TurbineConstructionG x={450} y={100} size={700} />
    </g>
  );
}

// Data slide: the website's stats row of four ruled cells (m16): a Dark Blue pixel icon, the label and the value in
// Active Blue; the Data Centers cell is filled.
export function SlideDataG() {
  const x0 = 100, cw = 350, y0 = 330, ch = 240;
  return (
    <g lang="es">
      <rect width="1600" height="900" fill={HEX.lightBlue} />
      {TECH.map((t, i) => (
        <g key={t.key}>
          {t.highlight && <rect x={x0 + i * cw} y={y0} width={cw} height={ch} fill={HEX.statCell} />}
          <IconArtG name={t.icon} px x={x0 + i * cw + 30} y={y0 + 72} size={96} fill={D} />
          <text x={x0 + i * cw + 146} y={y0 + 112} fontSize="26" fill={A}>{t.label}</text>
          <text x={x0 + i * cw + 146} y={y0 + 148} fontSize="26" fill={A}>{t.value}</text>
        </g>
      ))}
      <Guides
        spans={[[0, y0, 1600, y0], [0, y0 + ch, 1600, y0 + ch], ...[0, 1, 2, 3, 4].map((i) => [x0 + i * cw, y0, x0 + i * cw, y0 + ch])]}
        xs={[[0, 1, 2, 3, 4].flatMap((i) => [y0, y0 + ch].map((y) => [x0 + i * cw, y]))]}
      />
    </g>
  );
}

export const SLIDES = [
  { key: 'colour', title: 'Colour slide', G: SlideColourG },
  { key: 'type', title: 'Type slide', G: SlideTypeG },
  { key: 'logo', title: 'Logo plate', G: SlideLogoG },
  { key: 'icons', title: 'Icon construction slide', G: SlideIconsG },
  { key: 'data', title: 'Data slide', G: SlideDataG },
];
