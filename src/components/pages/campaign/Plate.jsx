// Mockup plate: three framed 3:4 posters hanging in a row from a rail, labels hanging below on leader lines,
// a spec column on the right. One SVG: stage, rail, wires, frames, glass, posters, callouts. Light from the top spot.
import { r2 } from '@/lib/charts';
import { StageG, MaterialDefs, CastG, SheenG, CalloutG, DimensionG, SpecColumnG, PlateFrameG, castDir } from '@/components/art/Mockup';
import { PosterDataCentre, PosterGeneration, PosterField, PW } from './Posters';

export const PLATE_W = 1600;
export const PLATE_H = 880;

const FW = 330, FH = 440, FY = 210, XS = [130, 530, 930];
const SPOT = { x: 0.5, y: 0.1 };
const SHEETS = [
  { title: 'Data-centre poster', sub: 'Dark Blue ground', art: (idp) => <PosterDataCentre idp={idp} /> },
  { title: 'Generation poster', sub: 'Light Blue ground', art: () => <PosterGeneration /> },
  { title: 'Field poster', sub: 'Dark Blue ground', art: (idp) => <PosterField idp={idp} /> },
];

export function FramedPosters() {
  const id = 'campaign-plate', k = 300 / PW;
  return (
    <g>
      <MaterialDefs idp={id} />
      <StageG idp={id} w={PLATE_W} h={PLATE_H} spot={SPOT} floor={null} r={0.7} />
      <PlateFrameG w={PLATE_W} h={PLATE_H} split={1300 / PLATE_W} no="01" label="Posters in frames" />
      {/* the rail and its wires */}
      <rect x="90" y="108" width="1220" height="6" fill={`url(#${id}-metal)`} />
      {XS.map((x) => (
        <g key={x}>
          <path d={`M${x + 40} ${FY}V111M${x + FW - 40} ${FY}V111`} stroke="#8b96c8" strokeWidth="0.9" fill="none" />
          <rect x={x + 37} y="108" width="6" height="6" fill="#8b96c8" />
          <rect x={x + FW - 43} y="108" width="6" height="6" fill="#8b96c8" />
        </g>
      ))}
      {SHEETS.map((s, i) => {
        const x = XS[i], cx = x + FW / 2, fid = `${id}-f${i + 1}`;
        const outline = `M${x} ${FY}h${FW}v${FH}h${-FW}Z`;
        const dir = castDir(SPOT, PLATE_W, PLATE_H, cx, FY + FH / 2);
        return (
          <g key={s.title}>
            <CastG idp={fid} d={outline} dir={dir} depth={22} opacity={0.55} blur={9} />
            <g className="fade-in" style={{ '--i': 4 + i * 2 }}>
              <rect x={x} y={FY} width={FW} height={FH} fill={`url(#${id}-metal-dark)`} />
              <rect x={x + 0.5} y={FY + 0.5} width={FW - 1} height={FH - 1} fill="none" stroke="#5a65a0" strokeWidth="1" opacity="0.7" />
              <rect x={x + 14} y={FY + 19} width="302" height="402" fill="#05060f" />
              <clipPath id={`${fid}-clip`}>
                <rect x={x + 15} y={FY + 20} width="300" height="400" />
              </clipPath>
              <g clipPath={`url(#${fid}-clip)`}>
                <g transform={`translate(${x + 15} ${FY + 20}) scale(${r2(k)})`}>{s.art(`${fid}-art`)}</g>
                <SheenG idp={id} d={`M${x + 15} ${FY + 20}h300v400h-300Z`} opacity={0.35} />
              </g>
            </g>
            <CalloutG x={cx} y={FY + FH} tx={cx + 24} ty={790} label={s.title} sub={s.sub} i={i + 2} />
          </g>
        );
      })}
      <DimensionG x1={XS[0]} y1={FY} x2={XS[0]} y2={FY + FH} value="600 mm" offset={44} i={1} />
      <SpecColumnG
        x={1330}
        y={210}
        w={220}
        title="Poster set"
        rows={[
          { k: 'Format', v: '450 × 600 mm' },
          { k: 'Ratio', v: '3 : 4' },
          { k: 'Frame', v: 'Dark Blue metal' },
          { k: 'Glazing', v: 'Clear glass' },
        ]}
      />
    </g>
  );
}
