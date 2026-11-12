// Tablet leaning, phone standing and watch lying, showing the case study's own dashboard screens (m17) on neutral
// frames. No clock time is drawn. Screen sizes are our own spec values in px.
import { HEX } from '@/lib/brand';
import { TabletG, PhoneG, WatchG, ScreenCapacityG, ScreenNodesG, ScreenWatchG } from '@/components/art/Devices';
import { CalloutG, ShadowG, SheenG } from '@/components/art/Mockup';
import { Plate } from './plate';

export function DevicesPlate() {
  const idp = 'use-product-devices';
  const rows = [
    ['Tablet', 'Capacity and node grid, 1180 × 820 px', [600, 262], 110],
    ['Phone', 'Capacity screen, 390 × 844 px', [1000, 330], 330],
    ['Watch', 'Total screen, 184 × 224 px', [1130, 755], 540],
  ];
  return (
    <Plate idp={idp} w={1600} h={900} name="devices" title="A tablet, a phone and a watch showing the capacity dashboard screens of the case study" spot={{ x: 0.36, y: 0.12 }} split={0.76} floor={0.7} no="12">
      <ShadowG idp={`${idp}-sh1`} cx={330} cy={690} rx={290} ry={22} dir={{ x: 0.7, y: 0.5 }} />
      <g transform="translate(70 228) rotate(-4 300 220)">
        <TabletG idp={`${idp}-tb`} w={620}>
          <rect width="1180" height="820" fill={HEX.lightBlue} />
          <g transform="translate(206 5) scale(0.96)"><ScreenCapacityG idp={`${idp}-ta`} /></g>
          <g transform="translate(612 5) scale(0.96)"><ScreenNodesG /></g>
          <SheenG idp={idp} d="M0 0H1180L0 560Z" opacity={0.3} />
        </TabletG>
      </g>
      <ShadowG idp={`${idp}-sh2`} cx={880} cy={706} rx={150} ry={20} dir={{ x: 0.7, y: 0.5 }} />
      <PhoneG idp={`${idp}-ph`} x={760} y={228} w={240}>
        <ScreenCapacityG idp={`${idp}-pa`} year="2025" marker={1} />
        <SheenG idp={idp} d="M0 0H390L0 420Z" opacity={0.3} />
      </PhoneG>
      <ShadowG idp={`${idp}-sh3`} cx={1120} cy={816} rx={170} ry={22} dir={{ x: 0.7, y: 0.5 }} />
      <g transform="translate(979 777) rotate(-74)">
        <WatchG idp={`${idp}-wt`} w={130}>
          <ScreenWatchG />
          <SheenG idp={idp} d="M0 0H184L0 140Z" opacity={0.3} />
        </WatchG>
      </g>
      {rows.map(([label, sub, [x, y], ty], i) => <CalloutG key={label} label={label} sub={sub} x={x} y={y} tx={1230} ty={ty} i={i} />)}
    </Plate>
  );
}

