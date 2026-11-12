// Lanyard with the speaker badge: a faithful rebuild of m08 (holder, slot, screw bosses, card), drawn in the
// reference's own pixel space (holder 978 x 1680) and scaled into the plate. No portrait on the card, as printed.
import { CalloutG, DimensionG, SpecColumnG, CastG, ShadowG, SheenG, LitG, castDir } from '@/components/art/Mockup';
import { WordmarkFitG } from '@/components/art/Mark';
import { HEX, BADGE, PEOPLE } from '@/lib/brand';
import { Plate, idOf, BarsG, EsG, rrect } from './kit';

const W = 940, H = 1110, X0 = 120, Y0 = 170, K = 0.5;
const SPOT = { x: 0.2, y: 0.16 };
const at = (x, y) => [X0 + K * x, Y0 + K * y]; // reference pixel space -> plate

function HolderArt({ idp }) {
  const lanyard = 'M308 -700H693V92Q500 126 308 104Z';
  return (
    <g>
      {/* lanyard: Active Blue fabric through the slot */}
      <path d={rrect(278, 48, 465, 62, 30)} fill="#0c0e1f" />
      <path d={lanyard} fill={`url(#${idp}-fabric-blue)`} filter={`url(#${idp}-weave)`} />
      <path d={lanyard} fill={`url(#${idp}-shade)`} />
      <path d="M318 -700V100M683 -700V98" stroke="#000000" strokeOpacity="0.18" strokeWidth="4" fill="none" />
      <path d="M308 90Q500 124 693 88" stroke="#000000" strokeOpacity="0.28" strokeWidth="8" fill="none" />
    </g>
  );
}

export default function Badge() {
  const idp = idOf('badge');
  const cd = castDir(SPOT, W, H, X0 + 250, Y0 + 400);
  const [sx, sy] = at(700, 80);
  const [kx, ky] = at(903, 77);
  const [rx, ry] = at(952, 26);
  const [cx, cy] = at(893, 700);
  const [bx, by] = at(749, 1360);
  const [lx, ly] = at(600, -120);
  const web = BADGE.web;
  return (
    <Plate id="badge" title="Lanyard with speaker badge" w={W} h={H} spot={SPOT} no="01">
      <ShadowG idp={`${idp}-g`} cx={X0 + 245} cy={1058} rx={190} ry={16} dir={cd} opacity={0.4} blur={12} />
      <CastG idp={`${idp}-c`} d={rrect(X0, Y0, 978 * K, 1680 * K, 44)} dir={cd} depth={30} opacity={0.42} blur={9} />
      <LitG transform={`translate(${X0} ${Y0}) scale(${K})`}>
        {/* the rigid holder: matte Dark Blue, radius about 9% of its width */}
        <path d={rrect(0, 0, 978, 1680, 88)} fill={`url(#${idp}-metal-dark)`} />
        <path d={rrect(0, 0, 978, 1680, 88)} fill={`url(#${idp}-shade)`} />
        <path d={rrect(10, 10, 958, 1660, 80)} fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="5" />
        <path d={rrect(92, 138, 808, 1470, 10)} fill="#0b0d22" />
        <path d="M92 138H900" stroke="#000000" strokeOpacity="0.6" strokeWidth="14" />
        {[[118, 70], [903, 77]].map(([px, py]) => (
          <g key={px}>
            <circle cx={px} cy={py} r="38" fill="#0b0d22" />
            <circle cx={px} cy={py} r="30" fill={`url(#${idp}-metal-dark)`} stroke="#ffffff" strokeOpacity="0.2" strokeWidth="3" />
            <circle cx={px} cy={py} r="9" fill="#05060f" />
          </g>
        ))}
        {/* the card, as printed on m08 (the pale numeral sits in the left column, left of the hairline) */}
        <rect x="108" y="160" width="785" height="1435" fill={`url(#${idp}-card)`} filter={`url(#${idp}-fibre)`} />
        <rect x="334" y="160" width="2.6" height="1038" fill={HEX.activeBlue} />
        <rect x="108" y="1196" width="785" height="2.6" fill={HEX.activeBlue} />
        <rect x="325" y="1189" width="18" height="18" fill={HEX.activeBlue} />
        <WordmarkFitG x={145} y={315} w={146} fill={HEX.activeBlue} />
        <EsG fill={HEX.activeBlue}>
          <text x="383" y="553" fontSize="80" fill={HEX.activeBlue}>{BADGE.name}</text>
          {PEOPLE.elena.roleRows.map((t, i) => (
            <text key={t} x="383" y={645 + i * 56} fontSize="46" fill={HEX.activeBlue}>{t}</text>
          ))}
          <text x="383" y="773" fontSize="29" fill={HEX.activeBlue}>{BADGE.dept}</text>
          <text x="148" y="1091" fontSize="125" fill="#ffffff" fillOpacity="0.62">{BADGE.numeral}</text>
          <text x="387" y="1085" fontSize="42" fill={HEX.activeBlue}>{BADGE.id}</text>
          <text x="382" y="1470" fontSize="29" fill={HEX.activeBlue}>{web}</text>
        </EsG>
        <BarsG x={275} y={1302} w={474} h={114} fill={HEX.activeBlue} seed={11} />
        <rect x="108" y="160" width="785" height="1435" fill="none" stroke="#000000" strokeOpacity="0.18" strokeWidth="3" />
        <SheenG idp={idp} d="M108 160H893V1595H108Z" opacity={0.35} />
        <HolderArt idp={idp} />
      </LitG>
      <DimensionG x1={X0} y1={Y0 + 840} x2={X0} y2={Y0} value="155 mm" offset={-46} i={6} />
      <DimensionG x1={X0} y1={Y0 + 840} x2={X0 + 489} y2={Y0 + 840} value="90 mm" offset={34} i={7} />
      <CalloutG x={lx} y={ly} tx={700} ty={80} label="Lanyard" sub="20 mm wide, woven" i={0} />
      <CalloutG x={sx} y={sy} tx={700} ty={330} label="Lanyard slot" i={1} />
      <CalloutG x={kx} y={ky} tx={700} ty={250} label="Screw boss" i={2} />
      <CalloutG x={rx} y={ry} tx={700} ty={170} label="Holder radius" sub="R 8 mm" i={3} />
      <CalloutG x={cx} y={cy} tx={700} ty={520} label="Card window" sub="72 × 132 mm" i={4} />
      <CalloutG x={bx} y={by} tx={700} ty={780} label="Barcode" sub="plain bars, encodes nothing" i={5} />
      <SpecColumnG x={690} y={870} w={210} title="Holder" rows={[{ k: 'Size', v: '90 × 155 mm' }, { k: 'Radius', v: '8 mm' }, { k: 'Card', v: '72 × 132 mm' }]} rowH={36} size={14} />
    </Plate>
  );
}
