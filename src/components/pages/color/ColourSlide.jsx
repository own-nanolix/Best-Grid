import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import { PALETTE, HEX, SPECS } from '@/lib/brand';
import { rgbBars } from './data';

// The case study's colour slide (m04), rebuilt on its own 1600 x 2133 artboard: the "Color system" header cell
// between guides and nodes, an empty periwinkle field, then three equal full-width bands with the name bottom
// left and the values in two columns. Names, HEX and CMYK as printed; RGB is computed from the HEX (so Light
// Blue reads 228 | 231 | 239: the printed line repeats Active Blue's). The PMS row is left out.
const W = 1600;
const H = 2133;
const TOP = 792;
const BAND = [446, 447, 448];
const GX = [122, 1478];
const GY = [122, 233];
const ROWS = SPECS.color.rows; // RGB, CMYK, HEX

function values(p) {
  return [rgbBars(p.hex), p.cmyk.replace('55  |', '55  |'), p.hex];
}

export default function ColourSlide({ exportName = 'color-slide', animate = true, className }) {
  const bands = PALETTE.map((p, i) => ({
    ...p,
    top: TOP + BAND.slice(0, i).reduce((a, b) => a + b, 0),
    h: BAND[i],
    on: i === 2 ? HEX.darkBlue : HEX.onBlue,
  }));
  const a = (cls, i) => (animate ? { className: cls, style: { '--i': i } } : {});
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Colour system slide: Dark Blue, Active Blue and Light Blue with RGB, CMYK and HEX" exportName={exportName} className={className}>
      <rect width={W} height={H} fill={HEX.periwinkle} />
      {/* guides */}
      <g fill={HEX.darkBlue}>
        <rect x="0" y={GY[0] - 0.5} width={W} height="1.2" {...a('extend-x', 0)} />
        <rect x="0" y={GY[1] - 0.5} width={W} height="1.2" {...a('extend-x', 1)} />
        {GX.map((x, i) => (
          <rect key={x} x={x - 0.5} y="0" width="1.2" height={GY[1]} {...a('extend-y', 2 + i)} />
        ))}
        <rect x="799.4" y={GY[1]} width="1.2" height={TOP - GY[1]} {...a('extend-y', 4)} />
      </g>
      {GX.flatMap((x) => GY.map((y) => [x, y])).concat([[800, GY[1]]]).map(([x, y], i) => (
        <NodeG key={`${x}-${y}`} cx={x} cy={y} s={11} fill={HEX.darkBlue} {...a('snap', i)} />
      ))}
      <text x="806" y="190" fontSize="23" textAnchor="middle" fill={HEX.activeBlue} {...a('fade-in', 6)}>
        {SPECS.color.title}
      </text>
      {/* the three bands */}
      {bands.map((b, i) => (
        <g key={b.token}>
          <rect x="0" y={b.top} width={W} height={b.h} fill={b.hex} {...a('extend-y', 6 + i * 2)} />
          <g fill={b.on} {...a('fade-in', 12 + i * 3)}>
            <text x="118" y={b.top + 325} fontSize="40" className="display">{b.name}</text>
            {ROWS.map((label, k) => (
              <g key={label}>
                <text x="819" y={b.top + 233 + k * 30.7} fontSize="21">{label}</text>
                <text x="1169" y={b.top + 233 + k * 30.7} fontSize="21" xmlSpace="preserve">{values(b)[k]}</text>
              </g>
            ))}
          </g>
        </g>
      ))}
    </Art>
  );
}
