// The node grid of the second phone screen (m17 back): "Distribución de actividad en nudos de red" over a grid of
// square cells with hairline outlines, clusters filled in two strengths of Active Blue and some quarter-size cells.
// Drawing only: the case study prints no value for any cell, so none is shown. The visible pattern is continued.
// Entrance: the cells fill in, in a diagonal wave (CSS keyframes inside the SVG).
import Art from '@/components/art/Art';
import { NodeGridG } from '@/components/art/KeyArt';
import { CAPACITY, HEX } from '@/lib/brand';

const COLS = 10;
const ROWS = 12;
const SIZE = 34;
const GX = 24;
const GY = 100;

export default function NodeGrid() {
  const W = GX * 2 + COLS * SIZE;
  const H = GY + ROWS * SIZE + 24;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Node grid: cells filled in two strengths of Active Blue, with no values" exportName="strategy-node-grid">
      <rect width={W} height={H} fill={HEX.cardGrey} />
      <g fill={HEX.darkBlue} fontSize="20" lang="es" className="display">
        <text x={GX} y={40}>{CAPACITY.nodesTitleRows[0]}</text>
        <text x={GX} y={66}>{CAPACITY.nodesTitleRows[1]}</text>
      </g>
      <NodeGridG x={GX} y={GY} cols={COLS} rows={ROWS} size={SIZE} seed={5} clusters={8} animate />
    </Art>
  );
}
