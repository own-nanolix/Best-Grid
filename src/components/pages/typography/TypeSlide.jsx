import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import { HEX, SPECS } from '@/lib/brand';

// The case study's type slide (m03), rebuilt at its own 1600 px width. Slide one: header cells ("Typographic system"
// and the face, here "The brand typeface"), the "AaBb" specimen, footer cells. Slide two: the glyph specimen
// "[€0.9]" between two guides with a rule and nodes below. Labels in Active Blue on periwinkle, as printed.
const W = 1600;
const X = [122, 1478];
const T = SPECS.type;
const SPECIMEN_DX = [12, -1, 13];

function Line({ cls, i, animate, ...p }) {
  return <rect fill={HEX.darkBlue} {...p} {...(animate ? { className: cls, style: { '--i': i } } : {})} />;
}

export function TypeSlide({ animate = true }) {
  const H = 1300;
  const a = (cls, i) => (animate ? { className: cls, style: { '--i': i } } : {});
  const nodes = [
    [122, 122], [800, 122], [1478, 122], [122, 233], [800, 233], [1478, 233],
    [122, 1015], [574, 1015], [1026, 1015], [1478, 1015], [122, 1117], [574, 1117], [1026, 1117], [1478, 1117],
  ];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Typographic system slide: the AaBb specimen in Regular with its header and footer cells" exportName="typography-slide">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      <Line x={0} y={121.4} width={W} height={1.2} cls="extend-x" i={0} animate={animate} />
      <Line x={122} y={232.4} width={1356} height={1.2} cls="extend-x" i={1} animate={animate} />
      <Line x={122} y={1014.4} width={1356} height={1.2} cls="extend-x" i={2} animate={animate} />
      <Line x={122} y={1116.4} width={1356} height={1.2} cls="extend-x" i={3} animate={animate} />
      {X.map((x, i) => (
        <Line key={x} x={x - 0.6} y={0} width={1.2} height={H} cls="extend-y" i={2 + i} animate={animate} />
      ))}
      <Line x={799.4} y={122} width={1.2} height={111} cls="extend-y" i={5} animate={animate} />
      {[574, 1026].map((x, i) => (
        <Line key={x} x={x - 0.6} y={1015} width={1.2} height={102} cls="extend-y" i={5 + i} animate={animate} />
      ))}
      {nodes.map(([x, y], i) => (
        <NodeG key={`${x}-${y}`} cx={x} cy={y} s={11} fill={HEX.darkBlue} {...a('snap', i)} />
      ))}
      <g fill={HEX.activeBlue} textAnchor="middle" fontSize="23" {...a('fade-in', 10)}>
        <text x="466" y="188">{T.title}</text>
        <text x="1133" y="188">{T.name}</text>
        <text x="356" y="1074">{T.set}</text>
        <text x="800" y="1074">{T.weight}</text>
        <text x="1244" y="1076">{T.optical}</text>
      </g>
      {/* gaps between the four glyphs set to the slide's (measured on m03: 16, 45 and 43 units) */}
      <text x="792" y="872" textAnchor="middle" fontSize="500" letterSpacing="-14" fill={HEX.darkBlue} className="display slide-up" style={animate ? { '--i': 8 } : undefined}>
        {T.specimen[0]}
        {[...T.specimen.slice(1)].map((g, i) => (
          <tspan key={g} dx={SPECIMEN_DX[i]}>{g}</tspan>
        ))}
      </text>
    </Art>
  );
}

export function GlyphSlice({ animate = true }) {
  const H = 983;
  const a = (cls, i) => (animate ? { className: cls, style: { '--i': i } } : {});
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Glyph specimen: square brackets, euro sign, figures" exportName="typography-glyph-slice">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      {X.map((x, i) => (
        <Line key={x} x={x - 0.6} y={0} width={1.2} height={H} cls="extend-y" i={i} animate={animate} />
      ))}
      <Line x={0} y={859.4} width={W} height={1.2} cls="extend-x" i={2} animate={animate} />
      {X.map((x, i) => (
        <NodeG key={x} cx={x} cy={860} s={11} fill={HEX.darkBlue} {...a('snap', 3 + i)} />
      ))}
      <text x="791" y="640" textAnchor="middle" fontSize="490" letterSpacing="-16" fill={HEX.darkBlue} className="display fade-in" style={animate ? { '--i': 5 } : undefined} lang="es">
        {T.glyphs}
      </text>
    </Art>
  );
}
