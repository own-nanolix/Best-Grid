// Scene 7: a site sign on a fence for an energy site: an Active Blue board on two posts in front of mesh fencing.
// The board carries the mark, the word-mark and the billboard line as printed; the field behind is only structure.
import { ShadowG, CalloutG, DimensionG, LitG, castDir } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { Plate, BoltG, PanelSheenG } from './shared';
import { HEX, LINES, CONTACT } from '@/lib/brand';

const IDP = 'use-world-site-sign';
const W = 1400, H = 820;
const SPOT = { x: 0.5, y: 0.04 };
const GROUND = 690;
const BX = 330, BY = 190, BW = 740, BH = 360;

export default function SiteSign() {
  const dir = castDir(SPOT, W, H, 700, GROUND);
  const [r1, r2s] = LINES.billboard.rows;
  const posts = [BX + 90, BX + BW - 90];
  return (
    <Plate idp={IDP} title="Site sign on a fence for an energy site" exportName="use-world-site-sign" w={W} h={H} spot={SPOT} floor={0.86} no="07" label="Site sign">
      <defs>
        <pattern id={`${IDP}-mesh`} width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0H28M0 0V28" stroke="#9aa2c8" strokeWidth="1.2" fill="none" />
        </pattern>
        <clipPath id={`${IDP}-fence`}><rect x="56" y="250" width="1288" height={GROUND - 250} /></clipPath>
        <clipPath id={`${IDP}-bclip`}><rect x={BX} y={BY} width={BW} height={BH} /></clipPath>
        <linearGradient id={`${IDP}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c0e1f" stopOpacity="0" />
          <stop offset="1" stopColor="#0c0e1f" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* fence: rails, mesh, line posts; the mesh fades into the dark behind the sign */}
      <g clipPath={`url(#${IDP}-fence)`} opacity="0.65">
        <rect x="56" y="250" width="1288" height={GROUND - 250} fill={`url(#${IDP}-mesh)`} />
        <rect x="56" y="250" width="1288" height={GROUND - 250} fill={`url(#${IDP}-fade)`} />
      </g>
      <rect x="56" y="246" width="1288" height="8" fill={`url(#${IDP}-metal)`} />
      <rect x="56" y={GROUND - 10} width="1288" height="6" fill={`url(#${IDP}-metal)`} />
      {[110, 760, 1290].map((x) => <rect key={x} x={x} y="236" width="12" height={GROUND - 236} fill={`url(#${IDP}-metal)`} />)}
      <rect x="28" y={GROUND - 2} width="1344" height="1.5" fill="#ffffff" opacity="0.14" />

      <LitG>
        {posts.map((x) => <ShadowG key={x} idp={`${IDP}-sh-${x}`} cx={x + 10} cy={GROUND + 2} rx={70} ry={10} dir={dir} opacity={0.7} blur={7} />)}
        <path d={`M${BX + 30} ${BY + BH}L${BX + 30 + dir.x * 120} ${BY + BH + 60}L${BX + BW + dir.x * 120} ${BY + BH + 60}L${BX + BW} ${BY + BH}Z`} fill="#000000" opacity="0.2" filter={`url(#${IDP}-soft)`} />
        {posts.map((x) => (
          <g key={x}>
            <rect x={x - 12} y={BY + 30} width="24" height={GROUND - BY - 30} fill={`url(#${IDP}-metal)`} />
            <rect x={x - 12} y={BY + 30} width="24" height={GROUND - BY - 30} fill={`url(#${IDP}-shade)`} />
            <rect x={x - 18} y={GROUND - 14} width="36" height="14" fill="#5a6180" />
          </g>
        ))}
        <rect x={BX + 8} y={BY + 10} width={BW} height={BH} fill="#05060d" opacity="0.6" />
        <rect x={BX - 8} y={BY - 8} width={BW + 16} height={BH + 16} fill={`url(#${IDP}-metal-dark)`} />
        <g clipPath={`url(#${IDP}-bclip)`}>
          <rect x={BX} y={BY} width={BW} height={BH} fill={`url(#${IDP}-board)`} filter={`url(#${IDP}-b-board)`} />
          <rect x={BX + 24} y={BY + 24} width={BW - 48} height="1" fill={HEX.onBlue} opacity="0.8" />
          <rect x={BX + 24} y={BY + BH - 25} width={BW - 48} height="1" fill={HEX.onBlue} opacity="0.8" />
          {[[24, 24], [BW - 24, 24], [24, BH - 24], [BW - 24, BH - 24]].map(([x, y]) => <rect key={`${x}${y}`} x={BX + x - 4} y={BY + y - 4} width="8" height="8" fill={HEX.onBlue} />)}
          <MarkG x={BX + BW - 120} y={BY + 52} size={66} fill={HEX.onBlue} />
          <WordmarkG x={BX + 52} y={BY + 142} size={96} fill={HEX.onBlue} />
          <rect x={BX + 52} y={BY + 192} width={BW - 104} height="1" fill={HEX.onBlue} opacity="0.8" />
          <g fontSize="30" lang="es">
            <text x={BX + 52} y={BY + 262} fill={HEX.onBlue}>{r1}</text>
            <text x={BX + 52} y={BY + 300} fill={HEX.darkBlue}>{r2s}</text>
          </g>
          <text x={BX + BW - 52} y={BY + 320} textAnchor="end" fontSize="16" fill={HEX.darkBlue}>{CONTACT.web}</text>
          <rect x={BX} y={BY} width={BW} height={BH} fill={`url(#${IDP}-shade)`} opacity="0.6" />
          <PanelSheenG idp={IDP} x={BX} y={BY} w={BW} h={BH} opacity={0.35} />
        </g>
        {[[BX + 2, BY + 2], [BX + BW - 2, BY + 2], [BX + 2, BY + BH - 2], [BX + BW - 2, BY + BH - 2]].map(([x, y]) => <BoltG key={`${x}${y}`} x={x} y={y} r={4.5} />)}
        {posts.map((x) => <rect key={x} x={x - 7} y={BY + BH - 4} width="14" height="26" fill="#10132b" opacity="0.9" />)}
      </LitG>

      <DimensionG x1={BX} y1={BY} x2={BX + BW} y2={BY} value="1 500 mm" offset={-40} i={0} />
      <DimensionG x1={BX} y1={BY + BH} x2={BX} y2={BY} value="730 mm" offset={-40} i={1} />
      <DimensionG x1={posts[1] + 18} y1={GROUND} x2={posts[1] + 18} y2={BY + BH} value="1 150 mm" offset={60} i={2} />

      <CalloutG x={BX + 24} y={BY + 170} tx={290} ty={120} side="left" label="Printed aluminium board, 3 mm" i={3} />
      <CalloutG x={posts[0]} y={GROUND - 60} tx={290} ty={730} side="left" label="Steel post, 60 mm" i={4} />
      <CalloutG x={1150} y={GROUND - 200} tx={1190} ty={160} side="right" label="Mesh fencing, 2 000 mm" i={5} />
      <CalloutG x={BX + BW - 3} y={BY + BH - 3} tx={1190} ty={730} side="right" label="Stainless fixings" i={6} />
    </Plate>
  );
}
