import Art from '@/components/art/Art';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CrossingBandsG, GuidesG } from '@/components/art/KeyArt';
import { StageG, MaterialDefs, ShadowG, CalloutG, LitG, PlateFrameG, PLATE } from '@/components/art/Mockup';
import { HEX, REPORT, CAPACITY, LINES } from '@/lib/brand';
import { scale, r2 } from '@/lib/charts';

// The report cover (m02), flat. Active Blue, Dark Blue type: "Informe" / "de activida…" / "anual" very large,
// the two-line line and the signature, "2024" / "202…" stacked bottom right. As on the case study's cover, the title
// and the second year run off the edge and are shown only as far as they are legible: nothing is completed.
// The SVG's own edge is the cut.
export function CoverArt() {
  const W = 1200, H = 1060;
  const F = 255; // "de activida" ends at the cover's edge, where the image cuts it
  const t = { fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Annual report cover, Active Blue: the title and the year run off the edge" exportName="lp-annual-report-cover">
      <rect width={W} height={H} fill={HEX.activeBlue} />
      <g fill={HEX.darkBlue} lang="es">
        <g className="display" fontSize={F} style={t}>
          <text x="80" y="236" className="slide-up" style={{ ...t, '--i': 2 }}>Informe</text>
          <text x="80" y="492" className="slide-up" style={{ ...t, '--i': 4 }}>de activida</text>
          <text x="80" y="748" className="slide-up" style={{ ...t, '--i': 6 }}>anual</text>
        </g>
        <g className="fade-in" style={{ '--i': 14 }} fontSize="25">
          {REPORT.lineRows.map((r, i) => (
            <text key={r} x="84" y={850 + i * 32}>{r}</text>
          ))}
          <text x="84" y="956">{REPORT.signature}</text>
        </g>
        <g className="display fade-in" fontSize="150" style={{ '--i': 18, ...t }}>
          <text x="860" y="940">{REPORT.years[0]}</text>
          <text x="947" y="1060">202</text>
        </g>
      </g>
    </Art>
  );
}

// One report in the stack: top face (the cover), the spine, the foot edge. Isometric: the page's x axis runs up and
// to the right, its y axis down and to the right, the thickness down. Cover content is drawn in page space.
function Book({ ox, oy, W, Hh, T, cover, spine, ink, mark, idp, k }) {
  const ux = [0.866, -0.5], uy = [0.866, 0.5];
  const P = (a, b) => [r2(ox + ux[0] * a + uy[0] * b), r2(oy + ux[1] * a + uy[1] * b)];
  const pts = (list) => list.map((p) => p.join(',')).join(' ');
  const o = P(0, 0), a = P(W, 0), b = P(W, Hh), c = P(0, Hh);
  const dn = (p) => [p[0], p[1] + T];
  const F = 68;
  return (
    <g>
      <polygon points={pts([o, c, dn(c), dn(o)])} fill={spine} />
      <polygon points={pts([c, b, dn(b), dn(c)])} fill={spine} />
      <polygon points={pts([c, b, dn(b), dn(c)])} fill="#000000" opacity="0.28" />
      <polygon points={pts([o, c, dn(c), dn(o)])} fill={`url(#${idp}-shade-v)`} />
      <polygon points={pts([o, a, b, c])} fill={cover} />
      <clipPath id={`${idp}-clip-${k}`}>
        <rect width={W} height={Hh} />
      </clipPath>
      <g transform={`matrix(0.866 -0.5 0.866 0.5 ${ox} ${oy})`} clipPath={`url(#${idp}-clip-${k})`} fill={ink} lang="es">
        <g className="display" fontSize={F} style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
          <text x="22" y="76">Informe</text>
          <text x="22" y="142">de activida</text>
          <text x="22" y="208">anual</text>
        </g>
        <g fontSize="10.5">
          {REPORT.lineRows.map((r, i) => (
            <text key={r} x="22" y={300 + i * 14}>{r}</text>
          ))}
          <text x="22" y="340">{REPORT.signature}</text>
        </g>
        <g className="display" fontSize="50" style={{ fontFamily: 'var(--font-display)' }}>
          <text x="206" y="400">{REPORT.years[0]}</text>
          <text x="235" y="452">202</text>
        </g>
      </g>
      {/* the spine: the mark at the head, IDAA, [24 – 25], BGS */}
      <g transform={`matrix(0.866 0.5 0 1 ${o[0]} ${o[1]})`} fill={mark} lang="es">
        <MarkG x={14} y={7} size={T - 14} fill={mark} />
        <rect x="64" y="0" width="0.8" height={T} fill={mark} opacity="0.6" />
        <g fontSize="17" fill={mark}>
          <text x="110" y={T / 2 + 6}>{REPORT.spine}</text>
          <text x="210" y={T / 2 + 6}>{REPORT.range}</text>
          <text x={Hh - 70} y={T / 2 + 6}>{REPORT.short}</text>
        </g>
      </g>
    </g>
  );
}

// The stack of three reports (m02): Active Blue cover with a Dark Blue spine, Dark Blue cover with a light-grey
// title and an Active Blue spine, Active Blue again. The hero object turns to the light; callouts follow.
export function StackArt() {
  const idp = 'lp-annual-report-stack';
  const W = 1000, H = 820;
  const set = [
    { cover: HEX.activeBlue, spine: HEX.darkBlue, ink: HEX.darkBlue, mark: HEX.activeBlue },
    { cover: HEX.darkBlue, spine: HEX.activeBlue, ink: HEX.onBlue, mark: HEX.darkBlue },
    { cover: HEX.activeBlue, spine: HEX.darkBlue, ink: HEX.darkBlue, mark: HEX.activeBlue },
  ];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Three perfect-bound annual reports stacked, covers alternating Active Blue and Dark Blue" exportName="lp-annual-report-stack">
      <MaterialDefs idp={idp} />
      <StageG idp={idp} w={W} h={H} spot={{ x: 0.28, y: 0.16 }} floor={null} />
      <PlateFrameG w={W} h={H} m={24} no="01" />
      <ShadowG idp={idp} cx={470} cy={770} rx={380} ry={26} blur={14} />
      <LitG>
        {[2, 1, 0].map((k) => (
          <Book key={k} k={k} idp={idp} ox={250 - 70 * k} oy={330 + 76 * k} W={320} Hh={450} T={46} {...set[k]} />
        ))}
      </LitG>
      <CalloutG x={560} y={380} tx={380} ty={96} label="Cover" side="left" i={0} />
      <CalloutG x={160} y={470} tx={40} ty={720} label="Spine" i={1} />
      <CalloutG x={790} y={560} tx={820} ty={720} label="Foot edge" side="left" i={2} />
      <text x="40" y={H - 40} fontSize="13" fill={PLATE.muted}>Perfect-bound, uncoated board</text>
    </Art>
  );
}

// The spines laid flat (m02): the mark at the head behind a hairline, "IDAA", "[24 – 25]" and "BGS", once on
// Dark Blue and once on Active Blue, as the stack alternates.
export function SpinesArt() {
  const W = 1200, H = 440;
  const strips = [
    { y: 30, fill: HEX.darkBlue, ink: HEX.activeBlue },
    { y: 250, fill: HEX.activeBlue, ink: HEX.darkBlue },
  ];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Report spines laid flat: mark, IDAA, [24 – 25], BGS" exportName="lp-annual-report-spines">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      {strips.map((s, i) => (
        <g key={s.y} lang="es">
          <rect x="0" y={s.y} width={W} height="160" fill={s.fill} className="grow-x" style={{ '--i': i * 4 }} />
          <g className="fade-in" style={{ '--i': i * 4 + 8 }}>
            <MarkG x={44} y={s.y + 36} size={88} fill={s.ink} />
            <rect x="170" y={s.y} width="1" height="160" fill={s.ink} opacity="0.7" />
            <g fontSize="46" fill={s.ink}>
              <text x="330" y={s.y + 96}>{REPORT.spine}</text>
              <text x="620" y={s.y + 96}>{REPORT.range}</text>
              <text x="1010" y={s.y + 96}>{REPORT.short}</text>
            </g>
          </g>
          <rect x="167" y={s.y + 157} width="6" height="6" fill={s.ink} className="snap" style={{ '--i': i * 4 + 6 }} />
        </g>
      ))}
    </Art>
  );
}

// The cover line on a page of the same grammar: Dark Blue field, the crossing bands of the folder, the line in
// light type, the signature and the mark.
export function LineArt() {
  const idp = 'lp-annual-report-line';
  const W = 900, H = 700;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The cover line over the crossing bands" exportName="lp-annual-report-line">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <CrossingBandsG idp={idp} w={W} h={H} cx={0.62} cy={0.4} band={0.05} r={0.1} />
      <GuidesG w={W} h={H} xs={[64, W - 64]} ys={[64, H - 64]} stroke={HEX.onBlue} weight={0.8} node={6} animate opacity="0.55" />
      <g fill={HEX.onBlue} lang="es" className="slide-up" style={{ '--i': 6 }}>
        <g fontSize="34">
          {LINES.report.rows.map((r, i) => (
            <text key={r} x="100" y={470 + i * 44}>{r}</text>
          ))}
        </g>
        <text x="100" y="598" fontSize="20">{REPORT.signature}</text>
      </g>
      <MarkG x={W - 64 - 76} y={H - 64 - 76} size={52} fill={HEX.activeBlue} />
      <WordmarkG x={100} y={140} size={46} fill={HEX.onBlue} />
    </Art>
  );
}

// The four quarters of the phone dashboard as bars, with the Q3 peak marker and the total. The only figures are the
// printed ones: Q1 3.200, Q2 4.100, Q3 5.200, Q4 2.920, Total anual 15.420 MW; axis 1.000 to 7.000 MW.
export function QuartersArt() {
  const W = 800, H = 560;
  const x0 = 150, x1 = 760, yb = 440, yt = 70;
  const y = scale(0, CAPACITY.axisMax, yb, yt);
  const slot = (x1 - x0) / 4;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Capacity by quarter, 2025: Q1 3.200, Q2 4.100, Q3 5.200, Q4 2.920 MW" exportName="lp-annual-report-quarters">
      <g lang="es">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <g key={n}>
            <rect x={x0} y={r2(y(n * 1000) - 0.5)} width={x1 - x0} height="1" fill={HEX.darkBlue} opacity="0.16" />
            <text x={x0 - 12} y={r2(y(n * 1000) + 4)} fontSize="12" textAnchor="end" fill={HEX.muted}>{CAPACITY.axis[7 - n]}</text>
          </g>
        ))}
        {CAPACITY.quarters.map((q, i) => {
          const cx = x0 + slot * i + slot / 2, bw = slot * 0.56, top = y(q.mw);
          return (
            <g key={q.q}>
              <rect x={r2(cx - bw / 2)} y={r2(top)} width={r2(bw)} height={r2(yb - top)} fill={HEX.activeBlue} opacity={q.peak ? 1 : 0.55} className="rise" style={{ '--i': i * 3 }} />
              <rect x={r2(cx - 3)} y={yb - 3} width="6" height="6" fill={HEX.darkBlue} className="snap" style={{ '--i': i + 3 }} />
              <text x={r2(cx)} y={yb + 30} textAnchor="middle" fontSize="15" fill={HEX.darkBlue}>{q.q}</text>
              <text x={r2(cx)} y={r2(top - 10)} textAnchor="middle" fontSize="15" fill={HEX.darkBlue} className="fade-in" style={{ '--i': 14 + i }}>{q.value}</text>
            </g>
          );
        })}
        <rect x={r2(x0 + slot * 2.5 - 0.5)} y={yt - 14} width="1" height={yb - yt + 14} fill={HEX.darkBlue} className="extend-y" style={{ '--i': 10 }} />
        <rect x={x0} y={yb} width={x1 - x0} height="1" fill={HEX.darkBlue} />
        <text x={x0} y="508" fontSize="14" fill={HEX.muted}>{CAPACITY.totalLabel}</text>
        <text x={x1} y="522" fontSize="40" textAnchor="end" fill={HEX.darkBlue} className="display">{CAPACITY.totalValue}</text>
      </g>
    </Art>
  );
}

// Two colourways of the cover, flat, side by side (m02: the covers alternate Active Blue and Dark Blue). Each cover
// crops the title and the second year at its own edge.
export function ColorwaysArt() {
  const W = 1000, H = 640;
  const ways = [
    { x: 40, fill: HEX.activeBlue, ink: HEX.darkBlue },
    { x: 520, fill: HEX.darkBlue, ink: HEX.onBlue },
  ];
  const cw = 440, ch = 560;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Two cover colourways: Active Blue with Dark Blue type, Dark Blue with light grey type" exportName="lp-annual-report-colourways">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      {ways.map((w, i) => (
        <g key={w.x} transform={`translate(${w.x} 40)`} className="fade-in" style={{ '--i': i * 6 }}>
          <clipPath id={`lp-annual-report-colourways-clip-${i}`}>
            <rect width={cw} height={ch} />
          </clipPath>
          <rect width={cw} height={ch} fill={w.fill} />
          <g clipPath={`url(#lp-annual-report-colourways-clip-${i})`} fill={w.ink} lang="es">
            <g className="display" fontSize="91" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
              <text x="34" y="120">Informe</text>
              <text x="34" y="214">de activida</text>
              <text x="34" y="308">anual</text>
            </g>
            <g fontSize="15">
              {REPORT.lineRows.map((r, k) => (
                <text key={r} x="36" y={400 + k * 20}>{r}</text>
              ))}
              <text x="36" y="462">{REPORT.signature}</text>
            </g>
            <g className="display" fontSize="76" style={{ fontFamily: 'var(--font-display)' }}>
              <text x="258" y="512">{REPORT.years[0]}</text>
              <text x="306" y="584">202</text>
            </g>
          </g>
        </g>
      ))}
    </Art>
  );
}

// The treemap of the dashboard (m17), re-measured from m17_2: a square Dark Blue field headed "2025" /
// "Capacidad gestionada"; "Desarrollo durante el año" 68% in Active Blue at the bottom left (66% of the width, the
// lower 67% of the height); "Capacidad consolidada" 16% in a lighter Active Blue at the bottom right (34% x 33%).
// The Dark Blue remainder carries no label and no figure. Large numerals keep the printed light type; the small
// labels on the blue blocks are Dark Blue for contrast (rule 9).
export function TreemapArt() {
  const S = 680;
  const [dev, cons] = CAPACITY.treemap.parts;
  const wDev = r2(S * 0.662), hDev = r2(S * 0.672), hCons = r2(S * 0.333);
  const blocks = [
    { p: dev, x: 0, y: S - hDev, w: wDev, h: hDev, fill: HEX.activeBlue, num: 150, sup: 56 },
    { p: cons, x: wDev, y: S - hCons, w: S - wDev, h: hCons, fill: '#7c9cff', num: 70, sup: 28 },
  ];
  return (
    <Art viewBox={`0 0 ${S} ${S}`} title="Treemap, 2025 capacity managed: 68% and 16%, the remainder unlabelled" exportName="lp-annual-report-treemap">
      <rect width={S} height={S} fill={HEX.darkBlue} />
      <g lang="es" fill={HEX.onBlue} fontSize="15">
        <text x="16" y="30">{CAPACITY.treemap.year}</text>
        <text x="16" y="49">{CAPACITY.treemap.title}</text>
      </g>
      {blocks.map(({ p, x, y, w, h, fill, num, sup }, i) => (
        <g key={p.key} lang="es" className="fill-in" style={{ '--i': i * 4 }}>
          <rect x={x} y={y} width={w} height={h} fill={fill} />
          {p.labelRows.map((t, k) => (
            <text key={t} x={x + 16} y={y + 28 + k * 17} fontSize="14" fill={HEX.darkBlue}>{t}</text>
          ))}
          <text x={r2(x + w - 16)} y={r2(y + h - 22)} textAnchor="end" fontSize={num} fill={HEX.onBlue} className="display">
            {p.pct}
            <tspan fontSize={sup} dy={-(num * 0.42)}>%</tspan>
          </text>
        </g>
      ))}
    </Art>
  );
}
