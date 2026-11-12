// The two slides of the case study, rebuilt: m14 (the turbine on its 32 x 32 grid with three guide circles)
// and m15 (the four icons, Active Blue on Dark Blue, in a 2 x 2).
import Art from '@/components/art/Art';
import { GuidesG } from '@/components/art/KeyArt';
import { turbinePath, PIXEL32, PIXEL32_LABELS } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const U = 20, X0 = 40, Y0 = 100, N = 32;
const SPEC = [
  ['Bar', '1 unit'],
  ['Hub ring', '3 units across'],
  ['Hub square', '1 x 1'],
  ['Blades', '3, at 120°'],
  ['Tip square', '1 x 1'],
  ['Outer ring', 'radius 7, broken'],
];

export function TurbineSlide() {
  const lines = Array.from({ length: N + 1 }, (_, i) => i);
  return (
    <Art viewBox="0 0 1000 800" title="Turbine icon on its 32 by 32 grid with three guide circles" exportName="icons-turbine-construction">
      <rect width="1000" height="800" fill={HEX.periwinkle} />
      <g fill={HEX.activeBlue}>
        {lines.map((i) => (
          <g key={i}>
            <rect x={r2(X0 + i * U - 0.375)} y={Y0} width="0.75" height={N * U} className="extend-y" style={{ '--i': i >> 1 }} />
            <rect x={X0} y={r2(Y0 + i * U - 0.375)} width={N * U} height="0.75" className="extend-x" style={{ '--i': i >> 1 }} />
          </g>
        ))}
      </g>
      <GuidesG w={1000} h={800} xs={[X0, X0 + N * U]} ys={[Y0, Y0 + N * U]} stroke={HEX.activeBlue} node={9} animate />
      <g fill="none" stroke={HEX.activeBlue} strokeWidth="1">
        {[1.5, 6, 7, 10.5].map((r, i) => (
          <circle key={r} cx={X0 + 16 * U} cy={Y0 + 16 * U} r={r2(r * U)} className="fade-in" style={{ '--i': 18 + i * 3 }} />
        ))}
      </g>
      <g transform={`translate(${X0} ${Y0}) scale(${U})`}>
        <path d={turbinePath(16, 16, 1)} fill={HEX.darkBlue} className="fill-in" style={{ '--i': 24 }} />
      </g>
      <text x={X0 + 14} y={Y0 - 22} fontSize="22" fill={HEX.blueInk}>32 x 32</text>
      {SPEC.map(([k, v], i) => (
        <g key={k} className="fade-in" style={{ '--i': 30 + i * 3 }}>
          <rect x="716" y={r2(Y0 + 40 + i * 62 - 3)} width="6" height="6" fill={HEX.activeBlue} />
          <rect x="716" y={r2(Y0 + 40 + i * 62)} width="244" height="0.75" fill={HEX.activeBlue} />
          <text x="736" y={r2(Y0 + 40 + i * 62 + 26)} fontSize="20" fill={HEX.blueInk}>{k}</text>
          <text x="736" y={r2(Y0 + 40 + i * 62 + 48)} fontSize="22" fill={HEX.darkBlue}>{v}</text>
        </g>
      ))}
    </Art>
  );
}

const ORDER = ['solar', 'datacenter', 'battery', 'wind'];

export function FourIcons() {
  const xs = [50, 500, 950], ys = [50, 420, 790], k = 9;
  return (
    <Art viewBox="0 0 1000 840" title="The four pixel icons in Active Blue on Dark Blue: solar panel, server stack, batteries, wind turbine" exportName="icons-four-pixel-icons">
      <rect width="1000" height="840" fill={HEX.darkBlue} />
      <GuidesG w={1000} h={840} xs={xs} ys={ys} stroke={HEX.activeBlue} node={9} animate />
      {ORDER.map((name, i) => {
        const cx = xs[i % 2], cy = ys[i >> 1];
        return (
          <g key={name} className="fill-in" style={{ '--i': 14 + i * 4 }}>
            <g transform={`translate(${r2(cx + 225 - 16 * k)} ${r2(cy + 185 - 16 * k - 6)}) scale(${k})`}>
              <path d={PIXEL32[name]} fill={HEX.activeBlue} />
            </g>
            <text x={cx + 20} y={cy + 350} fontSize="20" fill={HEX.activeBlue} lang="es">{PIXEL32_LABELS[name]}</text>
          </g>
        );
      })}
    </Art>
  );
}
