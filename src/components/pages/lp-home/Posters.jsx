import Art from '@/components/art/Art';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { GuidesG, NodeG, PhotoBlockG, IconArtG, BrandDefs } from '@/components/art/KeyArt';
import { HEX, LINES, CONTACT, POSTERS } from '@/lib/brand';
import { seeded, r2 } from '@/lib/charts';

// The poster sheets of m09 and m11 rebuilt as exportable artwork (3:4, 600 x 800), plus the event screen of m22.
// Photographs are never drawn: flat Dark Blue photo blocks at 75% stand in (the m10 convention).
// Every sheet carries the brand copy exactly as printed, in Spanish (lang="es" on the text groups).

const W = 600;
const H = 800;
const M = 40; // margins about 6.7% of the sheet width

// One printed line per row, as <tspan>s of a single <text>.
export function Lines({ rows, x, y, size, lh = 1.12, fill, anchor = 'start', display = false, className = '', ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} className={`${display ? 'display' : ''} ${className}`} letterSpacing={display ? r2(-size * 0.012) : undefined} {...rest}>
      {rows.map((r, i) => (
        <tspan key={r} x={x} y={r2(y + i * size * lh)}>{r}</tspan>
      ))}
    </text>
  );
}

// Server racks as line art behind a photo block: columns of small unit bars with a few lit squares.
function RacksG({ x, y, w, h, seed = 3, tone = HEX.activeBlue }) {
  const rnd = seeded(seed);
  const cols = Math.max(2, Math.round(w / 46));
  const cw = w / cols;
  return (
    <g>
      {Array.from({ length: cols }, (_, c) => (
        <g key={c}>
          <rect x={r2(x + c * cw + 3)} y={y} width={r2(cw - 6)} height={h} fill="none" stroke={tone} strokeOpacity="0.5" strokeWidth="1" />
          {Array.from({ length: Math.floor(h / 22) }, (_, u) => (
            <g key={u}>
              <rect x={r2(x + c * cw + 9)} y={r2(y + 8 + u * 22)} width={r2(cw - 18)} height="3" fill={tone} opacity="0.28" />
              {rnd() > 0.62 && <rect x={r2(x + c * cw + cw - 18)} y={r2(y + 14 + u * 22)} width="3" height="3" fill={HEX.trail} opacity="0.9" />}
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

// Geometry below is measured on m09 / m11 (each sheet 720 x 960 px in the readable copy, scaled to 600 x 800):
// guides at x 40 / 560, the word-mark about 172 wide (size 43), headlines size 33 at a 37.5 pitch, body size 10
// at a 12.5 pitch, micro lines size 7.5. Small type uses the accessible Active Blue ink (rule 9).
const WM = 43;
const HEAD = 33;

// m09 left: the data-centre poster (photo stand-in, Active Blue guide frame with nodes, Active Blue type).
export function PosterDataCentre() {
  const p = POSTERS.dataCentre;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Poster: data-centre line" exportName="lp-home-poster-data-centre" lang="es">
      <rect width={W} height={H} fill={HEX.black} />
      <PhotoBlockG x={0} y={0} w={W} h={H} />
      <g opacity="0.6">
        <RacksG x={0} y={60} w={220} h={700} seed={4} />
        <RacksG x={380} y={60} w={220} h={700} seed={9} />
      </g>
      <rect x={220} y={60} width={160} height={700} fill={HEX.darkBlue} opacity="0.45" />
      <GuidesG w={W} h={H} xs={[M, W - M]} ys={[42.5, 697.5, 757.5]} stroke={HEX.activeBlue} weight={0.8} node={5} animate />
      <WordmarkG x={80} y={112.5} size={WM} fill={HEX.activeBlue} />
      <Lines rows={p.head} x={81.7} y={476.7} size={HEAD} lh={1.136} fill={HEX.activeBlue} display className="fade-in" style={{ '--i': 6 }} />
      <Lines rows={p.body} x={81.7} y={592.5} size={12.5} lh={1.2} fill={HEX.activeBlue} className="fade-in" style={{ '--i': 8 }} />
      <text x={83} y={666.7} fontSize="7.5" fill={HEX.activeBlue}>{p.tag}</text>
      <MarkG x={81} y={712.5} size={30} fill={HEX.activeBlue} />
      <text x={518} y={731.7} fontSize="7.5" fill={HEX.activeBlue} textAnchor="end">{p.web}</text>
    </Art>
  );
}

// m09 right: the generation poster (Light Blue, the mark in a narrow column, Active Blue type, two photo cells).
export function PosterGeneration() {
  const p = POSTERS.generation;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Poster: generation line" exportName="lp-home-poster-generation" lang="es">
      <rect width={W} height={H} fill={HEX.lightBlue} />
      <rect x={122.1} y={0} width={0.8} height={461.7} fill={HEX.activeBlue} className="extend-y" />
      <rect x={299.6} y={461.7} width={0.8} height={338.3} fill={HEX.activeBlue} className="extend-y" style={{ '--i': 1 }} />
      <rect x={0} y={461.3} width={W} height={0.8} fill={HEX.activeBlue} className="extend-x" style={{ '--i': 2 }} />
      <NodeG cx={122.5} cy={461.7} s={4} fill={HEX.activeBlue} className="snap" style={{ '--i': 4 }} />
      <NodeG cx={300} cy={461.7} s={4} fill={HEX.activeBlue} className="snap" style={{ '--i': 5 }} />
      <MarkG x={45} y={41} size={31.7} fill={HEX.activeBlue} />
      <Lines rows={p.head} x={169.2} y={65.8} size={HEAD} lh={1.136} fill={HEX.activeBlue} display className="fade-in" style={{ '--i': 6 }} />
      <Lines rows={p.body} x={169.2} y={191.7} size={10} lh={1.25} fill={HEX.blueInk} className="fade-in" style={{ '--i': 8 }} />
      <text x={39.2} y={432.5} fontSize="7.5" fill={HEX.blueInk}>{p.web}</text>
      <Lines rows={p.tag} x={169.2} y={421.7} size={7.5} lh={1.33} fill={HEX.blueInk} />
      <WordmarkG x={560} y={432.5} size={WM} fill={HEX.activeBlue} anchor="end" />
      <PhotoBlockG x={15} y={477.5} w={270} h={306.7} />
      <PhotoBlockG x={315} y={477.5} w={270} h={306.7} />
      <IconArtG name="solar" px x={90} y={571} size={120} fill={HEX.activeBlue} />
      <IconArtG name="wind" px x={390} y={571} size={120} fill={HEX.activeBlue} />
    </Art>
  );
}

// m11 left: the field poster (Dark Blue, light guide frame, a square photo stand-in with the three words over it;
// the photograph shows a person and is never drawn: a turbine in the icon stroke stands in).
export function PosterField() {
  const p = POSTERS.field;
  const words = LINES.fieldWords;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Poster: field line" exportName="lp-home-poster-field" lang="es">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <GuidesG w={W} h={H} xs={[M, W - M]} ys={[132.5, 666.7]} nodes={[[M, 132.5], [300, 132.5], [W - M, 132.5], [M, 666.7], [300, 666.7], [W - M, 666.7]]} stroke={HEX.onBlue} weight={0.8} node={5} animate />
      <rect x={299.6} y={132.5} width={0.8} height={30} fill={HEX.onBlue} />
      <rect x={299.6} y={637.5} width={0.8} height={29.2} fill={HEX.onBlue} />
      <WordmarkG x={300} y={98.3} size={WM} fill={HEX.onBlue} anchor="middle" />
      <PhotoBlockG x={62.5} y={162.5} w={475} h={475} fill={HEX.black} opacity="0.4" />
      <IconArtG name="wind" px x={190} y={230} size={220} fill={HEX.activeBlue} />
      <text x={300} y={602.5} fontSize="25" fill={HEX.white} textAnchor="middle" className="display">{words.join(' · ')}</text>
      <Lines rows={p.body} x={300} y={730.8} size={10} lh={1.25} fill={HEX.onBlue} anchor="middle" className="fade-in" style={{ '--i': 8 }} />
      <text x={62.5} y={757.5} fontSize="7.5" fill={HEX.onBlue}>{p.email}</text>
      <text x={537.5} y={757.5} fontSize="7.5" fill={HEX.onBlue} textAnchor="end">{p.web}</text>
    </Art>
  );
}

// m11 right: the clarity poster (Active Blue, Dark Blue type, a three-cell ruled footer: web | mark | web).
export function PosterClarity() {
  const p = POSTERS.clarity;
  const cells = [40, 212.5, 387.5, 560];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Poster: clarity line" exportName="lp-home-poster-clarity" lang="es">
      <rect width={W} height={H} fill={HEX.activeBlue} />
      <GuidesG w={W} h={H} xs={[M, W - M]} ys={[42.5, 697.5, 757.5]} nodes={[[M, 42.5], [W - M, 42.5], ...cells.flatMap((x) => [[x, 697.5], [x, 757.5]])]} stroke={HEX.darkBlue} weight={0.8} node={5} animate />
      <rect x={212.1} y={697.5} width="0.8" height={60} fill={HEX.darkBlue} />
      <rect x={387.1} y={697.5} width="0.8" height={60} fill={HEX.darkBlue} />
      <WordmarkG x={300} y={127.5} size={WM} fill={HEX.darkBlue} anchor="middle" />
      <Lines rows={p.head} x={300} y={326.7} size={HEAD} lh={1.136} fill={HEX.darkBlue} anchor="middle" display className="fade-in" style={{ '--i': 6 }} />
      <Lines rows={p.body} x={300} y={591.7} size={10} lh={1.25} fill={HEX.darkBlue} anchor="middle" />
      <text x={126.25} y={731.7} fontSize="7.5" fill={HEX.darkBlue} textAnchor="middle">{p.web}</text>
      <MarkG x={284.5} y={712} size={31} fill={HEX.darkBlue} />
      <text x={473.75} y={731.7} fontSize="7.5" fill={HEX.darkBlue} textAnchor="middle">{p.web}</text>
    </Art>
  );
}

// m22: the event hall's long Active Blue LED wall in three panels: a photo panel left (a solar tower field), the
// text panel in the middle, a photo panel right (a roof of solar panels). Photographs, the audience and the
// speaker are never drawn: flat Dark Blue photo blocks with line art stand in. The middle panel is laid out on
// the coordinates of crop_m22_mid (1565 x 823 panel units): two-tone pair top left, the mark top right, the
// small two-tone pair and the handle above a light rule with end nodes, the word-mark large below it.
export function EventScreen() {
  const idp = 'lp-home-ev';
  const k = 384 / 1565;
  return (
    <Art viewBox="0 0 1200 520" title="Event screen: connect line" exportName="lp-home-event-screen" lang="es">
      <BrandDefs idp={idp} />
      <rect width="1200" height="520" fill={HEX.black} />
      {/* the lighting truss */}
      {[20, 52].map((y) => (
        <rect key={y} x="0" y={y} width="1200" height="1.2" fill={HEX.activeBlue} opacity="0.35" />
      ))}
      {Array.from({ length: 31 }, (_, i) => (
        <path key={i} d={`M${i * 40} 20.6L${i * 40 + 20} 52.6L${i * 40 + 40} 20.6`} fill="none" stroke={HEX.activeBlue} strokeOpacity="0.25" strokeWidth="1" />
      ))}
      {[260, 940].map((x) => (
        <g key={x}>
          <rect x={x - 1} y="53" width="2" height="22" fill="#2a2f52" />
          <rect x={x - 12} y="75" width="24" height="20" fill="#2a2f52" />
        </g>
      ))}
      {/* the wall: three panels */}
      <rect x="24" y="144" width="1152" height="214" fill="#0b0d18" />
      <rect x="30" y="150" width="377" height="202" fill={HEX.activeBlue} filter={`url(#${idp}-grain)`} />
      <PhotoBlockG x={36} y={156} w={365} h={190} />
      <IconArtG name="solar" px x={158} y={186} size={130} fill={HEX.activeBlue} />
      <rect x="803" y="150" width="367" height="202" fill={HEX.activeBlue} filter={`url(#${idp}-grain)`} />
      <PhotoBlockG x={809} y={156} w={355} h={190} />
      <g fill={HEX.activeBlue} opacity="0.8">
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 9 }, (_, c) => <rect key={`${r}-${c}`} x={830 + c * 36} y={250 + r * 18} width="32" height="15" fill="none" stroke={HEX.activeBlue} strokeWidth="1" />),
        )}
      </g>
      <g transform={`translate(413 150) scale(${k.toFixed(4)})`}>
        <rect width="1565" height="823" fill={HEX.activeBlue} filter={`url(#${idp}-grain)`} />
        <rect x="0" y="0" width="3" height="823" fill={HEX.onBlue} />
        <rect x="1562" y="0" width="3" height="823" fill={HEX.onBlue} />
        <rect x="0" y="616.5" width="1565" height="3" fill={HEX.onBlue} className="extend-x" />
        <NodeG cx={1.5} cy={618} s={14} fill={HEX.onBlue} className="snap" style={{ '--i': 10 }} />
        <NodeG cx={1563.5} cy={618} s={14} fill={HEX.onBlue} className="snap" style={{ '--i': 11 }} />
        <g className="fade-in" style={{ '--i': 4 }}>
          <text x="55" y="105" fontSize="70" className="display" fill={HEX.onBlue}>{LINES.connect.rows[0]}</text>
          <text x="55" y="187" fontSize="70" className="display" fill={HEX.darkBlue}>{LINES.connect.rows[1]}</text>
          <text x="55" y="527" fontSize="27" fill={HEX.onBlue}>{LINES.viable.rows[0]}</text>
          <text x="55" y="563" fontSize="27" fill={HEX.darkBlue}>{LINES.viable.rows[1]}</text>
          <text x="1509" y="527" fontSize="27" fill={HEX.onBlue} textAnchor="end">{CONTACT.handle}</text>
          <text x="1509" y="563" fontSize="27" fill={HEX.darkBlue} textAnchor="end">{CONTACT.web}</text>
        </g>
        <MarkG x={1415} y={55} size={95} fill={HEX.onBlue} />
        <WordmarkG x={52} y={777} size={146} fill={HEX.onBlue} />
      </g>
      {/* the stage */}
      <rect x="0" y="372" width="1200" height="148" fill="#070912" />
      <rect x="0" y="372" width="1200" height="1.2" fill={HEX.activeBlue} opacity="0.3" />
    </Art>
  );
}
