// The exhibition booth, the opening plate: a back wall carrying the event screen of m22 (rebuilt faithfully, with
// stand-ins for the photographs), a return wall, a reception counter and a carpet, seen at eye level from the
// front-left in one-point perspective (the vanishing point sits left of the booth). No people.
import { CalloutG, DimensionG, ShadowG, SpecColumnG, LitG, castDir } from '@/components/art/Mockup';
import { MarkG, WordmarkFitG } from '@/components/art/Mark';
import { PhotoBlockG, IconArtG } from '@/components/art/KeyArt';
import { HEX, LINES, CONTACT } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Plate, idOf, EsG } from './kit';

const W = 1500, H = 830;
const VP = [110, 330]; // the vanishing point: eye level, left of the booth
const pr = (x, y, s) => [r2(VP[0] + (x - VP[0]) * s), r2(VP[1] + (y - VP[1]) * s)];
const poly = (pts) => `M${pts.map((p) => p.join(' ')).join('L')}Z`;
const WALL = { x: 260, y: 130, w: 800, h: 340 }; // the back wall
const S1 = 1.3, S2 = 1.4; // depth of the return wall and of the carpet

// The event screen of m22, in the reference's pixel space (2107 x 380, origin top left of the screen).
function ScreenArt() {
  const ink = HEX.onBlue, dk = HEX.darkBlue;
  return (
    <g>
      <rect width="2107" height="380" fill={HEX.activeBlue} />
      <PhotoBlockG x={25} y={25} w={656} h={331} />
      <IconArtG name="solar" px x={248} y={92} size={192} fill={HEX.activeBlue} />
      <PhotoBlockG x={1445} y={25} w={637} h={331} />
      <IconArtG name="wind" px x={1665} y={92} size={192} fill={HEX.activeBlue} />
      <rect x="704" y="0" width="2" height="380" fill={ink} opacity="0.7" />
      <rect x="1419" y="0" width="2" height="380" fill={ink} opacity="0.7" />
      <rect x="705" y="279" width="715" height="2" fill={ink} opacity="0.7" />
      {[705, 1420].map((x) => <rect key={x} x={x - 6} y="274" width="12" height="12" fill={ink} />)}
      <EsG>
        <text x="731" y="58" fontSize="36" fill={ink}>{LINES.connect.rows[0]}</text>
        <text x="731" y="98" fontSize="36" fill={dk}>{LINES.connect.rows[1]}</text>
        <text x="731" y="244" fontSize="14.5" fill={ink}>{LINES.viable.rows[0]}</text>
        <text x="731" y="262" fontSize="14.5" fill={dk}>{LINES.viable.rows[1]}</text>
        <text x="1395" y="244" fontSize="14.5" fill={ink} textAnchor="end">{CONTACT.handle}</text>
        <text x="1395" y="262" fontSize="14.5" fill={dk} textAnchor="end">{CONTACT.web}</text>
      </EsG>
      <MarkG x={1352} y={24} size={46} fill={ink} />
      <WordmarkFitG x={731} y={351} w={267} fill={ink} />
    </g>
  );
}

// Art on a receding face, drawn as vertical strips so it follows the perspective of the wall.
function Face({ idp, wall, u0, u1, v0, v1, aw, ah, N = 40, children }) {
  const { xl, xr, tl, tr, bl, br } = wall;
  const X = (u) => xl + (xr - xl) * u;
  const T = (u) => tl + (tr - tl) * u, B = (u) => bl + (br - bl) * u;
  const top = (u) => T(u) + (B(u) - T(u)) * v0, hg = (u) => (B(u) - T(u)) * (v1 - v0);
  const du = (u1 - u0) / aw;
  return (
    <g>
      {Array.from({ length: N }, (_, j) => {
        const xa = (aw * j) / N, xb = (aw * (j + 1)) / N, xm = (xa + xb) / 2, um = u0 + (u1 - u0) * (xm / aw);
        const a = (xr - xl) * du;
        const b = ((tr - tl) + (v0 * ((br - bl) - (tr - tl))) + 0.5 * (v1 - v0) * ((br - bl) - (tr - tl))) * du;
        const d = hg(um) / ah;
        const e = X(um) - a * xm, f = top(um) - b * xm;
        return (
          <g key={j}>
            <g transform={`matrix(${r2(a)} ${r2(b)} 0 ${r2(d)} ${r2(e)} ${r2(f)})`}>
              <clipPath id={`${idp}-fs${j}`}><rect x={xa} y="0" width={r2(xb - xa + 0.6)} height={ah} /></clipPath>
              <g clipPath={`url(#${idp}-fs${j})`}>{children}</g>
            </g>
          </g>
        );
      })}
    </g>
  );
}

export default function Booth() {
  const idp = idOf('booth');
  const spot = { x: 0.3, y: 0.06 };
  const cd = castDir(spot, W, H, 740, 500);
  const k = 740 / 2107;
  const sx = WALL.x + 30, sy = 196;
  // return wall (the inside face to the right of the back wall)
  const [rt0, rt1] = [pr(WALL.x + WALL.w, WALL.y, 1), pr(WALL.x + WALL.w, WALL.y, S1)];
  const [rb0, rb1] = [pr(WALL.x + WALL.w, WALL.y + WALL.h, 1), pr(WALL.x + WALL.w, WALL.y + WALL.h, S1)];
  const wall = { xl: rt0[0], xr: rt1[0], tl: rt0[1], tr: rt1[1], bl: rb0[1], br: rb1[1] };
  const floor = [[WALL.x, WALL.y + WALL.h], [WALL.x + WALL.w, WALL.y + WALL.h], pr(WALL.x + WALL.w, WALL.y + WALL.h, S2), pr(WALL.x, WALL.y + WALL.h, S2)];
  // reception counter: footprint x 380..820, depth s 1.1 to 1.3, 100 high
  const [cx0, cx1, ch, cs0, cs1] = [380, 820, 100, 1.1, 1.3];
  const fy = WALL.y + WALL.h;
  const front = [pr(cx0, fy - ch, cs1), pr(cx1, fy - ch, cs1), pr(cx1, fy, cs1), pr(cx0, fy, cs1)];
  const topF = [pr(cx0, fy - ch, cs0), pr(cx1, fy - ch, cs0), pr(cx1, fy - ch, cs1), pr(cx0, fy - ch, cs1)];
  const sideL = [pr(cx0, fy - ch, cs0), pr(cx0, fy - ch, cs1), pr(cx0, fy, cs1), pr(cx0, fy, cs0)];
  const fw = front[1][0] - front[0][0], fh = front[2][1] - front[0][1];
  const seamX = Array.from({ length: 7 }, (_, i) => WALL.x + (WALL.w * (i + 1)) / 8);
  const seamS = [1.075, 1.15, 1.225];
  return (
    <Plate id="booth" title="Exhibition booth with the event screen on the back wall" w={W} h={H} spot={spot} no="00">
      <defs>
        <radialGradient id={`${idp}-glow`}><stop offset="0" stopColor={HEX.activeBlue} stopOpacity="0.42" /><stop offset="1" stopColor={HEX.activeBlue} stopOpacity="0" /></radialGradient>
        <clipPath id={`${idp}-screen`}><rect x={sx} y={sy} width="740" height={r2(380 * k)} /></clipPath>
      </defs>
      <LitG>
        {/* carpet with its seams, receding to the vanishing point */}
        <path d={poly(floor)} fill={`url(#${idp}-metal-dark)`} filter={`url(#${idp}-grit)`} />
        <path d={poly(floor)} fill={`url(#${idp}-shade-v)`} opacity="0.6" />
        <ellipse cx="660" cy="508" rx="440" ry="44" fill={`url(#${idp}-glow)`} className="mock-spot" />
        {Array.from({ length: 9 }, (_, i) => {
          const u = i / 8;
          const a = [WALL.x + WALL.w * u, fy], b = pr(WALL.x + WALL.w * u, fy, S2);
          return <path key={`f${i}`} d={`M${a.join(' ')}L${b.join(' ')}`} stroke="#8b96c8" strokeOpacity="0.28" strokeWidth="0.8" />;
        })}
        {[1.1, 1.2, 1.3].map((s) => (
          <path key={s} d={`M${pr(WALL.x, fy, s).join(' ')}L${pr(WALL.x + WALL.w, fy, s).join(' ')}`} stroke="#8b96c8" strokeOpacity="0.28" strokeWidth="0.8" />
        ))}
        <ShadowG idp={`${idp}-g`} cx={747} cy={fy + 52} rx={330} ry={22} dir={cd} opacity={0.5} blur={10} />
        {/* back wall: panels with seams and nodes */}
        <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill={`url(#${idp}-board-dark)`} />
        <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill={`url(#${idp}-shade)`} opacity="0.7" />
        {seamX.map((x) => <rect key={x} x={x - 0.4} y={WALL.y} width="0.8" height={WALL.h} fill="#8b96c8" opacity="0.32" />)}
        {[180, 330].map((y) => <rect key={y} x={WALL.x} y={y - 0.4} width={WALL.w} height="0.8" fill="#8b96c8" opacity="0.32" />)}
        {seamX.flatMap((x) => [180, 330].map((y) => <rect key={`${x}${y}`} x={x - 2} y={y - 2} width="4" height="4" fill="#8b96c8" opacity="0.7" />))}
        <rect x={WALL.x} y={WALL.y + WALL.h - 6} width={WALL.w} height="6" fill="#05071a" opacity="0.7" />
        {/* the screen: m22 rebuilt */}
        <rect x={sx - 5} y={sy - 5} width={740 + 10} height={r2(380 * k + 10)} fill="#05071a" />
        <g clipPath={`url(#${idp}-screen)`}>
          <g transform={`translate(${sx} ${sy}) scale(${r2(k)})`}><ScreenArt /></g>
          <rect x={sx} y={sy} width="740" height={r2(380 * k)} fill={`url(#${idp}-shade-v)`} opacity="0.25" />
          {Array.from({ length: 11 }, (_, i) => <rect key={i} x={sx + (740 * (i + 1)) / 12 - 0.3} y={sy} width="0.6" height={r2(380 * k)} fill="#05071a" opacity="0.25" />)}
        </g>
        {/* the return wall in perspective */}
        <path d={poly([rt0, rt1, rb1, rb0])} fill={`url(#${idp}-board-dark)`} />
        <path d={poly([rt0, rt1, rb1, rb0])} fill={`url(#${idp}-shade-r)`} opacity="0.55" />
        {seamS.map((s) => {
          const a = pr(WALL.x + WALL.w, WALL.y, s), b = pr(WALL.x + WALL.w, WALL.y + WALL.h, s);
          return <path key={s} d={`M${a.join(' ')}L${b.join(' ')}`} stroke="#8b96c8" strokeOpacity="0.32" strokeWidth="0.8" />;
        })}
        <path d={`M${rt0.join(' ')}L${rt1.join(' ')}M${rb0.join(' ')}L${rb1.join(' ')}M${pr(WALL.x + WALL.w, 330, 1).join(' ')}L${pr(WALL.x + WALL.w, 330, S1).join(' ')}`} stroke="#8b96c8" strokeOpacity="0.32" strokeWidth="0.8" />
        <Face idp={`${idp}-rw`} wall={wall} u0={0.14} u1={0.9} v0={0.14} v1={0.62} aw={300} ah={180}>
          <rect width="300" height="180" fill={HEX.activeBlue} />
          <MarkG x={22} y={20} size={46} fill={HEX.onBlue} />
          <EsG>
            {LINES.box.rows.map((t, i) => <text key={t} x="22" y={r2(102 + i * 20)} fontSize="15.5" fill={i === 0 ? HEX.onBlue : HEX.darkBlue}>{t}</text>)}
          </EsG>
          <WordmarkFitG x={22} y={168} w={92} fill={HEX.onBlue} />
        </Face>
        <path d={poly([rt0, rt1, rb1, rb0])} fill="none" stroke="#000000" strokeOpacity="0.5" />
        {/* the header truss with two lamps */}
        <rect x={WALL.x - 18} y="96" width={WALL.w + 36} height="12" fill={`url(#${idp}-metal)`} stroke="#59607a" strokeWidth="0.6" />
        <path d={Array.from({ length: 21 }, (_, i) => `${i ? 'L' : 'M'}${WALL.x - 18 + (i * (WALL.w + 36)) / 20} ${i % 2 ? 108 : 96}`).join('')} stroke="#8d95ab" fill="none" strokeWidth="1.2" />
        {[430, 880].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="108" width="6" height="12" fill="#59607a" />
            <path d={`M${x - 16} 120h32l-5 22h-22z`} fill={`url(#${idp}-metal-dark)`} stroke="#8d95ab" strokeWidth="0.6" />
            <ellipse cx={x} cy="142" rx="11" ry="3" fill="#f4f7ff" opacity="0.85" />
          </g>
        ))}
        {/* the reception counter */}
        <path d={poly(sideL)} fill={`url(#${idp}-board-dark)`} />
        <path d={poly(sideL)} fill="#000000" opacity="0.35" />
        <path d={poly(front)} fill={`url(#${idp}-board-dark)`} filter={`url(#${idp}-grit)`} />
        <path d={poly(front)} fill={`url(#${idp}-shade)`} opacity="0.6" />
        <path d={poly(topF)} fill={`url(#${idp}-metal)`} />
        <MarkG x={front[0][0] + fw * 0.07} y={front[0][1] + fh * 0.2} size={r2(fh * 0.55)} fill={HEX.activeBlue} />
        <WordmarkFitG x={front[0][0] + fw * 0.07 + fh * 0.7} y={front[0][1] + fh * 0.6} w={r2(fw * 0.3)} fill={HEX.onBlue} />
      </LitG>
      <DimensionG x1={WALL.x} y1={WALL.y} x2={WALL.x + WALL.w} y2={WALL.y} value="6000 mm" offset={-76} i={6} />
      <DimensionG x1={WALL.x} y1={WALL.y + WALL.h} x2={WALL.x} y2={WALL.y} value="3000 mm" offset={-40} i={7} />
      <CalloutG x={sx + 20} y={sy + 40} tx={60} ty={250} label="Event screen" sub="back wall graphic" i={0} />
      <CalloutG x={seamX[0]} y={330} tx={60} ty={330} label="Panel seam" i={1} />
      <CalloutG x={WALL.x - 18} y={102} tx={60} ty={160} label="Header truss" i={2} />
      <CalloutG x={front[0][0] + 20} y={front[2][1] - 24} tx={60} ty={620} label="Reception counter" sub="1200 mm wide" i={3} />
      <CalloutG x={(rt0[0] + rt1[0]) / 2} y={(rt0[1] + rb0[1]) / 2 - 20} tx={1250} ty={680} label="Return wall graphic" i={4} />
      <SpecColumnG x={700} y={640} w={420} title="Booth" rows={[{ k: 'Footprint', v: '6000 × 3000 mm' }, { k: 'Wall height', v: '3000 mm' }, { k: 'Carpet', v: 'Dark Blue, tiles' }]} rowH={34} />
    </Plate>
  );
}
