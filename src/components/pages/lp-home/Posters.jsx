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

// m09 left: the data-centre poster (photo stand-in, Active Blue guide frame, headline, body, tag).
export function PosterDataCentre() {
  const p = POSTERS.dataCentre;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Poster: data-centre line" exportName="lp-home-poster-data-centre" lang="es">
      <rect width={W} height={H} fill={HEX.black} />
      <PhotoBlockG x={0} y={0} w={W} h={H} />
      <g opacity="0.9">
        <RacksG x={0} y={110} w={210} h={560} seed={4} />
        <RacksG x={390} y={110} w={210} h={560} seed={9} />
      </g>
      <rect x={210} y={110} width={180} height={560} fill={HEX.darkBlue} opacity="0.45" />
      <GuidesG w={W} h={H} xs={[M, W - M]} ys={[M, H - M]} stroke={HEX.activeBlue} animate />
      <WordmarkG x={M + 14} y={M + 34} size={22} fill={HEX.activeBlue} />
      <Lines rows={p.head} x={M + 14} y={440} size={40} fill={HEX.onBlue} display className="fade-in" style={{ '--i': 6 }} />
      <Lines rows={p.body} x={M + 14} y={560} size={14} lh={1.35} fill={HEX.onBlue} className="fade-in" style={{ '--i': 8 }} />
      <text x={M + 14} y={656} fontSize="12" fill={HEX.activeBlue}>{p.tag}</text>
      <MarkG x={M + 14} y={H - M - 52} size={32} fill={HEX.onBlue} />
      <text x={W - M - 14} y={H - M - 22} fontSize="13" fill={HEX.onBlue} textAnchor="end">{p.web}</text>
    </Art>
  );
}

// m09 right: the generation poster (Light Blue, mark in a narrow column, two square photo stand-ins below).
export function PosterGeneration() {
  const p = POSTERS.generation;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Poster: generation line" exportName="lp-home-poster-generation" lang="es">
      <rect width={W} height={H} fill={HEX.lightBlue} />
      <GuidesG w={W} h={H} xs={[M + 60]} ys={[M + 20, 470]} stroke={HEX.darkBlue} weight={0.8} animate />
      <MarkG x={M + 8} y={M + 44} size={34} fill={HEX.darkBlue} />
      <Lines rows={p.head} x={M + 84} y={M + 64} size={34} fill={HEX.darkBlue} display className="fade-in" style={{ '--i': 6 }} />
      <Lines rows={p.body} x={M + 84} y={M + 190} size={12.5} lh={1.4} fill={HEX.darkBlue} className="fade-in" style={{ '--i': 8 }} />
      <text x={M + 84} y={M + 286} fontSize="12" fill={HEX.blueInk}>{p.web}</text>
      <Lines rows={p.tag} x={M + 84} y={M + 330} size={12.5} lh={1.35} fill={HEX.darkBlue} />
      <WordmarkG x={W - M} y={M + 440} size={30} fill={HEX.darkBlue} anchor="end" />
      <PhotoBlockG x={M} y={490} w={250} h={250} />
      <PhotoBlockG x={M + 270} y={490} w={250} h={250} />
      <IconArtG name="solar" px x={M + 65} y={555} size={120} fill={HEX.activeBlue} />
      <IconArtG name="wind" px x={M + 335} y={555} size={120} fill={HEX.activeBlue} />
    </Art>
  );
}

// m11 left: the field poster (Dark Blue, light guide frame, square photo stand-in with the three words over it).
export function PosterField() {
  const p = POSTERS.field;
  const words = LINES.fieldWords;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Poster: field line" exportName="lp-home-poster-field" lang="es">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <GuidesG w={W} h={H} xs={[M, W - M]} ys={[M, H - M]} stroke={HEX.onBlue} weight={0.8} animate />
      <WordmarkG x={W / 2} y={M + 34} size={22} fill={HEX.white} anchor="middle" />
      <PhotoBlockG x={M} y={110} w={W - 2 * M} h={W - 2 * M} fill={HEX.black} opacity="0.5" />
      <IconArtG name="wind" px x={190} y={190} size={220} fill={HEX.activeBlue} />
      <text x={W / 2} y={460} fontSize="22" fill={HEX.white} textAnchor="middle" className="display">{words.join(' · ')}</text>
      <Lines rows={p.body} x={W / 2} y={620} size={14} lh={1.4} fill={HEX.onBlue} anchor="middle" className="fade-in" style={{ '--i': 8 }} />
      <text x={M + 14} y={H - M - 16} fontSize="12" fill={HEX.onBlue}>{p.email}</text>
      <text x={W - M - 14} y={H - M - 16} fontSize="12" fill={HEX.onBlue} textAnchor="end">{p.web}</text>
    </Art>
  );
}

// m11 right: the clarity poster (Active Blue, Dark Blue type, three-cell footer).
export function PosterClarity() {
  const p = POSTERS.clarity;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Poster: clarity line" exportName="lp-home-poster-clarity" lang="es">
      <rect width={W} height={H} fill={HEX.activeBlue} />
      <GuidesG w={W} h={H} xs={[M, W - M]} ys={[M, H - 110]} stroke={HEX.darkBlue} weight={0.8} animate />
      <WordmarkG x={W / 2} y={M + 40} size={22} fill={HEX.darkBlue} anchor="middle" />
      <Lines rows={p.head} x={W / 2} y={330} size={46} fill={HEX.darkBlue} anchor="middle" display className="fade-in" style={{ '--i': 6 }} />
      <Lines rows={p.body} x={W / 2} y={540} size={14} lh={1.4} fill={HEX.darkBlue} anchor="middle" />
      <rect x={M + (W - 2 * M) / 3} y={H - 110} width="0.8" height={70} fill={HEX.darkBlue} />
      <rect x={M + (2 * (W - 2 * M)) / 3} y={H - 110} width="0.8" height={70} fill={HEX.darkBlue} />
      <text x={M + (W - 2 * M) / 6} y={H - 70} fontSize="13" fill={HEX.darkBlue} textAnchor="middle">{p.web}</text>
      <MarkG x={W / 2 - 14} y={H - 92} size={28} fill={HEX.darkBlue} />
      <text x={M + (5 * (W - 2 * M)) / 6} y={H - 70} fontSize="13" fill={HEX.darkBlue} textAnchor="middle">{p.web}</text>
    </Art>
  );
}

// m22: the event screen, one long Active Blue LED wall over a stage; the audience and speaker are not drawn.
export function EventScreen() {
  const idp = 'lp-home-ev';
  return (
    <Art viewBox="0 0 1200 560" title="Event screen: connect line" exportName="lp-home-event-screen" lang="es">
      <BrandDefs idp={idp} />
      <rect width="1200" height="560" fill={HEX.black} />
      {[90, 320, 600, 880, 1110].map((x) => (
        <rect key={x} x={x} y="0" width="1.2" height="64" fill={HEX.activeBlue} opacity="0.4" />
      ))}
      <rect x="0" y="62" width="1200" height="1.2" fill={HEX.activeBlue} opacity="0.5" />
      <rect x="0" y="22" width="1200" height="1.2" fill={HEX.activeBlue} opacity="0.35" />
      <rect x="60" y="100" width="1080" height="330" fill={HEX.activeBlue} filter={`url(#${idp}-grain)`} />
      <g className="fade-in" style={{ '--i': 4 }}>
        <text x="110" y="190" fontSize="44" className="display" fill={HEX.white} letterSpacing="-0.5">{LINES.connect.rows[0]}</text>
        <text x="110" y="244" fontSize="44" className="display" fill={HEX.darkBlue} letterSpacing="-0.5">{LINES.connect.rows[1]}</text>
        <text x="110" y="330" fontSize="20" fill={HEX.white}>{LINES.viable.rows[0]}</text>
        <text x="110" y="358" fontSize="20" fill={HEX.darkBlue}>{LINES.viable.rows[1]}</text>
      </g>
      <MarkG x={1040} y={124} size={44} fill={HEX.onBlue} />
      <text x="110" y="408" fontSize="13" fill={HEX.darkBlue}>{CONTACT.handle}   {CONTACT.web}</text>
      <rect x="60" y="388" width="1080" height="1" fill={HEX.darkBlue} opacity="0.6" />
      <NodeG cx={60} cy={388.5} s={8} fill={HEX.white} className="snap" style={{ '--i': 10 }} />
      <NodeG cx={1140} cy={388.5} s={8} fill={HEX.white} className="snap" style={{ '--i': 11 }} />
      <rect x="0" y="430" width="1200" height="130" fill="#0b0d18" />
      <WordmarkG x={600} y={510} size={64} fill={HEX.onBlue} anchor="middle" />
    </Art>
  );
}
