// "Análisis · Criterio · Validación" (m11, left poster) as three ruled cells on the brand's guides: a node at every
// crossing, each cell filling in turn, the last one in Active Blue. The three words are the designer's, verbatim.
// The step numbers 01 to 03 are plain labels of ours.
// Entrance: guides extend, nodes snap, the cells fill one after another, the words slide up.
import Art from '@/components/art/Art';
import { GuidesG } from '@/components/art/KeyArt';
import { HEX, LINES } from '@/lib/brand';

const W = 1200;
const H = 280;
const CELL = W / 3;
const FILLS = [HEX.paper, HEX.statCell, HEX.activeBlue];

export default function Method() {
  const xs = [1, CELL, CELL * 2, W - 1];
  const ys = [24, H - 24];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Three ruled cells: Análisis, Criterio, Validación" exportName="strategy-method">
      <rect width={W} height={H} fill={HEX.lightBlue} />
      {LINES.fieldWords.map((word, i) => (
        <g key={word}>
          <rect x={xs[i]} y={ys[0]} width={CELL - 1} height={ys[1] - ys[0]} fill={FILLS[i]} className="fill-in" style={{ '--i': 10 + i * 6 }} />
          <g className="slide-up" style={{ '--i': 14 + i * 6 }}>
            <text x={xs[i] + 28} y={ys[0] + 52} fontSize="16" fill={HEX.darkBlue}>
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={xs[i] + 28} y={ys[1] - 40} fontSize="46" fill={HEX.darkBlue} className="display" lang="es">
              {word}
            </text>
          </g>
        </g>
      ))}
      <GuidesG w={W} h={H} xs={xs} ys={ys} stroke={HEX.darkBlue} weight={1.2} node={8} animate />
    </Art>
  );
}
