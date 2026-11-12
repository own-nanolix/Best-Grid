// Three feather flags of falling height (curved pole, sleeve, cross base) and a hanging banner (rail, cables,
// eyelets, pole pocket). Artwork is only the mark, the word-mark and lines printed in the case study.
import { CalloutG, DimensionG, ShadowG, CastG, LitG, castDir } from '@/components/art/Mockup';
import { MarkG, WordmarkVerticalG, WordmarkFitG } from '@/components/art/Mark';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Plate, idOf, EsG, rrect } from './kit';
import { COL } from './bands-parts';

// The geometry of one feather flag: a bowed pole from the origin up, and a blade of fabric along it.
function flagGeom({ H, bow, side, wmax, t0 = 0.2, n = 40 }) {
  const cx = -bow * 0.35;
  const B = (t) => [(2 * (1 - t) * t * cx) + t * t * bow, -((2 * (1 - t) * t * 0.55 * H) + t * t * H)];
  const N = (t) => {
    const [x1, y1] = B(Math.max(0, t - 0.01)), [x2, y2] = B(Math.min(1, t + 0.01));
    const l = Math.hypot(x2 - x1, y2 - y1) || 1;
    return [(-(y2 - y1) / l) * side, ((x2 - x1) / l) * side];
  };
  const prof = (s) => wmax * Math.sqrt(Math.max(0, Math.sin(Math.PI * Math.pow(s, 0.8))));
  const edge = Array.from({ length: n + 1 }, (_, i) => {
    const s = i / n, t = t0 + (1 - t0) * s, [bx, by] = B(t), [nx, ny] = N(t), w = prof(s);
    return [r2(bx + nx * w), r2(by + ny * w)];
  });
  const pole = Array.from({ length: n + 1 }, (_, i) => B(i / n).map(r2));
  const poleFlag = Array.from({ length: n + 1 }, (_, i) => B(t0 + ((1 - t0) * i) / n).map(r2));
  const L = (a) => a.map(([x, y]) => `${x} ${y}`).join('L');
  return {
    blade: `M${L(poleFlag)}L${L(edge.slice().reverse())}Z`,
    pole: `M${L(pole)}`,
    sleeve: `M${L(poleFlag)}`,
    B,
    // a point on the blade: s along it (0 bottom, 1 top), k across it (0 pole, 1 edge)
    at: (s, k) => {
      const t = t0 + (1 - t0) * s, [bx, by] = B(t), [nx, ny] = N(t), w = prof(s) * k;
      return [r2(bx + nx * w), r2(by + ny * w)];
    },
    rot: r2((Math.atan2(bow, H) * 180) / Math.PI),
    origin: B(t0).map(r2),
  };
}

// The cross base on the floor, in perspective, with a hub where the pole enters.
function CrossBase({ idp, w = 120 }) {
  const bar = (x1, y1, x2, y2, k) => (
    <g key={k}>
      <path d={`M${x1} ${y1 + 3}L${x2} ${y2 + 3}`} stroke="#000000" strokeOpacity="0.55" strokeWidth="9" strokeLinecap="round" />
      <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke="#8d95ab" strokeWidth="8" strokeLinecap="round" />
      <path d={`M${x1} ${y1 - 1.5}L${x2} ${y2 - 1.5}`} stroke="#e6e9f2" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
      {[[x1, y1], [x2, y2]].map(([x, y]) => <ellipse key={x} cx={x} cy={y + 2} rx="6" ry="3.4" fill="#10132b" />)}
    </g>
  );
  return (
    <g>
      {bar(-w, -14, w, 14, 'a')}
      {bar(-w, 14, w, -14, 'b')}
      <ellipse cx="0" cy="3" rx="17" ry="8" fill="#000000" opacity="0.45" />
      <ellipse cx="0" cy="0" rx="15" ry="7" fill={`url(#${idp}-metal)`} stroke="#59607a" strokeWidth="0.75" />
      <ellipse cx="0" cy="-1" rx="6.5" ry="3" fill="#10132b" />
    </g>
  );
}

// One feather flag plate. Shared drawing; each plate supplies its own size, colour, side and callouts.
function FlagPlate({ id, no, title, tone, H, bow, side, wmax, spot, bx, by, children }) {
  const idp = idOf(id);
  const g = flagGeom({ H, bow, side, wmax });
  const c = COL[tone];
  const cd = castDir(spot, 560, 520, bx, by - H / 2);
  const shade = `url(#${idp}-shade${side > 0 ? '' : '-r'})`;
  const wm = wmax * 0.3, mk = wmax * 0.42, cxm = side * wmax * 0.46;
  return (
    <Plate id={id} title={title} w={560} h={520} spot={spot} floor={0.8} no={no}>
      <g transform={`translate(${bx} ${by})`}>
        <ShadowG idp={`${idp}-g`} cx={0} cy={4} rx={128} ry={28} dir={cd} opacity={0.6} blur={9} />
        <CastG idp={`${idp}-c`} d={g.blade} dir={{ x: cd.x, y: 0.12 }} depth={46} opacity={0.3} blur={8} />
        <CrossBase idp={idp} />
        <LitG>
          <path d={g.pole} stroke="#000000" strokeOpacity="0.4" strokeWidth="6.5" fill="none" transform="translate(1.5 1.5)" />
          <path d={g.pole} stroke="#a3aabf" strokeWidth="5" fill="none" />
          <path d={g.pole} stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.3" fill="none" transform={`translate(${side > 0 ? -1.1 : 1.1} 0)`} />
          <clipPath id={`${idp}-blade`}><path d={g.blade} /></clipPath>
          <path d={g.blade} fill={c.c} filter={`url(#${idp}-weave)`} />
          <g clipPath={`url(#${idp}-blade)`}>
            <g transform={`translate(${g.origin[0]} ${g.origin[1]}) rotate(${g.rot})`}>
              <WordmarkVerticalG x={r2(cxm - wm * 0.4)} y={r2(-H * 0.1)} size={r2(wm)} fill={c.ink} />
              <MarkG x={r2(cxm - mk / 2)} y={r2(-H * 0.1 - wm * 4.4 - 16 - mk)} size={r2(mk)} fill={c.mk} />
            </g>
            <path d={g.blade} fill={shade} />
            <path d={g.blade} fill={`url(#${idp}-shade-v)`} opacity="0.4" />
          </g>
          <path d={g.sleeve} stroke="#000000" strokeOpacity="0.35" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d={g.pole} stroke="#a3aabf" strokeWidth="4" fill="none" strokeDasharray="0.1 0" opacity="0.5" />
          {[0.33, 0.66].map((t) => (
            <circle key={t} cx={g.B(t)[0]} cy={g.B(t)[1]} r="3.6" fill={`url(#${idp}-metal)`} stroke="#59607a" strokeWidth="0.6" />
          ))}
          <circle cx={g.B(1)[0]} cy={g.B(1)[1]} r="4.5" fill={`url(#${idp}-metal)`} stroke="#59607a" strokeWidth="0.6" />
        </LitG>
      </g>
      {children({ g, at: (x, y) => [r2(bx + x), r2(by + y)] })}
    </Plate>
  );
}

// Flag 1: Active Blue, 4.5 m, blade to the right, callouts right.
export function FlagA() {
  const bx = 170, by = 462;
  return (
    <FlagPlate id="flag-active" no="16" title="Feather flag, Active Blue, tallest" tone="active" H={405} bow={30} side={1} wmax={104} spot={{ x: 0.12, y: 0.1 }} bx={bx} by={by}>
      {({ g, at }) => (
        <g>
          <DimensionG x1={90} y1={by} x2={90} y2={by - 405} value="4500 mm" offset={26} i={6} />
          <CalloutG x={at(...g.at(0.9, 0.3))[0]} y={at(...g.at(0.9, 0.3))[1]} tx={400} ty={95} label="Mark" i={0} />
          <CalloutG x={at(...g.at(0.45, 0.6))[0]} y={at(...g.at(0.45, 0.6))[1]} tx={400} ty={200} label="Flag blade" sub="knitted fabric, 650 mm" i={1} />
          <CalloutG x={at(...g.B(0.12))[0]} y={at(...g.B(0.12))[1]} tx={400} ty={330} label="Curved pole" sub="fibreglass" i={2} />
          <CalloutG x={bx + 80} y={by + 7} tx={400} ty={420} label="Cross base" sub="steel, 900 mm" i={3} />
        </g>
      )}
    </FlagPlate>
  );
}

// Flag 2: Dark Blue, 3.5 m, blade to the left, light from the right, callouts left.
export function FlagB() {
  const bx = 385, by = 462;
  return (
    <FlagPlate id="flag-dark" no="17" title="Feather flag, Dark Blue, middle height" tone="dark" H={325} bow={-26} side={-1} wmax={92} spot={{ x: 0.9, y: 0.1 }} bx={bx} by={by}>
      {({ g, at }) => (
        <g>
          <DimensionG x1={bx + 130} y1={by} x2={bx + 130} y2={by - 325} value="3500 mm" offset={-26} i={6} />
          <CalloutG x={at(...g.at(0.9, 0.3))[0]} y={at(...g.at(0.9, 0.3))[1]} tx={150} ty={150} label="Mark" side="left" i={0} />
          <CalloutG x={at(...g.at(0.4, 0.7))[0]} y={at(...g.at(0.4, 0.7))[1]} tx={150} ty={250} label="Word-mark" side="left" i={1} />
          <CalloutG x={at(...g.B(0.1))[0]} y={at(...g.B(0.1))[1]} tx={150} ty={350} label="Pole sleeve" side="left" i={2} />
          <CalloutG x={bx - 80} y={by - 7} tx={150} ty={435} label="Cross base" side="left" i={3} />
        </g>
      )}
    </FlagPlate>
  );
}

// Flag 3: Light Blue, 2.5 m, centred, callouts either side.
export function FlagC() {
  const bx = 280, by = 462;
  return (
    <FlagPlate id="flag-light" no="18" title="Feather flag, Light Blue, shortest" tone="light" H={250} bow={20} side={1} wmax={80} spot={{ x: 0.5, y: 0.04 }} bx={bx} by={by}>
      {({ g, at }) => (
        <g>
          <DimensionG x1={bx - 150} y1={by} x2={bx - 150} y2={by - 250} value="2500 mm" offset={26} i={6} />
          <CalloutG x={at(...g.at(0.85, 0.5))[0]} y={at(...g.at(0.85, 0.5))[1]} tx={440} ty={190} label="Printed blade" i={0} />
          <CalloutG x={at(...g.B(1))[0]} y={at(...g.B(1))[1]} tx={90} ty={150} label="Pole tip" i={1} />
          <CalloutG x={bx} y={by + 2} tx={440} ty={440} label="Cross base" sub="foot plates" i={2} />
        </g>
      )}
    </FlagPlate>
  );
}

// The hanging banner: a rail with two cables to the eyelets, a pole pocket at the foot, a gently waving edge.
export function Banner() {
  const idp = idOf('banner');
  const spot = { x: 0.2, y: 0.18 };
  const x0 = 330, y0 = 112, bw = 150, bh = 330;
  const cd = castDir(spot, 560, 520, x0 + bw / 2, y0 + bh / 2);
  const wave = (x, k) => r2(Math.sin(k * 0.025) * 3 * (x < bw / 2 ? 1 : -1));
  const edge = (xx) => Array.from({ length: 12 }, (_, i) => `${r2(xx + wave(xx - x0, i * 29))} ${r2(y0 + 12 + (i * (bh - 24)) / 11)}`);
  const d = `M${x0} ${y0}H${x0 + bw}L${edge(x0 + bw).join('L')}L${x0 + bw} ${y0 + bh}H${x0}L${edge(x0).reverse().join('L')}Z`;
  const c = COL.active;
  return (
    <Plate id="banner" title="Hanging banner on cables" w={560} h={520} spot={spot} no="19">
      <rect x="170" y="52" width="362" height="12" fill={`url(#${idp}-metal)`} stroke="#59607a" strokeWidth="0.75" />
      <path d="M170 76L190 64L210 76L230 64L250 76L270 64L290 76L310 64L330 76L350 64L370 76L390 64L410 76L430 64L450 76L470 64L490 76L510 64L530 76" stroke="#8d95ab" strokeWidth="1.6" fill="none" />
      <rect x="170" y="76" width="362" height="5" fill="#59607a" />
      <ShadowG idp={`${idp}-g`} cx={x0 + bw / 2} cy={y0 + bh + 30} rx={100} ry={10} dir={cd} opacity={0.25} blur={9} />
      <CastG idp={`${idp}-c`} d={d} dir={{ x: cd.x, y: 0.1 }} depth={34} opacity={0.34} blur={9} />
      <g>
        <path d={`M${x0 + 14} 81L${x0 + 14} ${y0 + 6}M${x0 + bw - 14} 81L${x0 + bw - 14} ${y0 + 6}`} stroke="#c7ccd6" strokeWidth="1.6" fill="none" />
        <LitG>
          <path d={d} fill={c.c} filter={`url(#${idp}-weave)`} />
          <clipPath id={`${idp}-cloth`}><path d={d} /></clipPath>
          <g clipPath={`url(#${idp}-cloth)`}>
            <MarkG x={x0 + bw / 2 - 26} y={y0 + 34} size={52} fill={HEX.darkBlue} />
            <EsG>
              {LINES.web.rows.map((t, i) => (
                <text key={t} x={x0 + 16} y={y0 + 136 + i * 17} fontSize="12" fill={i === 0 ? HEX.onBlue : HEX.darkBlue}>{t}</text>
              ))}
            </EsG>
            <WordmarkFitG x={x0 + 16} y={y0 + bh - 44} w={118} fill={HEX.onBlue} />
            <rect x={x0} y={y0} width={bw} height={bh} fill={`url(#${idp}-shade)`} />
            {[0.22, 0.5, 0.78].map((k) => (
              <rect key={k} x={r2(x0 + bw * k)} y={y0} width="5" height={bh} fill="#000000" opacity="0.07" filter={`url(#${idp}-soft)`} />
            ))}
          </g>
          <path d={rrect(x0 - 2, y0 + bh - 18, bw + 4, 18, 4)} fill="#000000" opacity="0.22" />
          <rect x={x0 - 6} y={y0 + bh - 12} width="8" height="12" fill={`url(#${idp}-metal)`} />
          <rect x={x0 + bw - 2} y={y0 + bh - 12} width="8" height="12" fill={`url(#${idp}-metal)`} />
          {[x0 + 14, x0 + bw - 14].map((x) => (
            <g key={x}>
              <circle cx={x} cy={y0 + 12} r="8" fill="none" stroke={`url(#${idp}-metal)`} strokeWidth="3.4" />
              <circle cx={x} cy={y0 + 12} r="5" fill="#0c0e1f" opacity="0.8" />
            </g>
          ))}
        </LitG>
      </g>
      <DimensionG x1={x0} y1={y0 + bh} x2={x0 + bw} y2={y0 + bh} value="600 mm" offset={44} i={6} />
      <DimensionG x1={x0 + bw} y1={y0 + bh} x2={x0 + bw} y2={y0} value="1320 mm" offset={34} i={7} />
      <CalloutG x={x0 + 14} y={y0 + 12} tx={150} ty={150} label="Eyelet" sub="metal ring" side="left" i={0} />
      <CalloutG x={x0 + 14} y={96} tx={150} ty={235} label="Cable" side="left" i={1} />
      <CalloutG x={x0 + bw / 2} y={y0 + bh - 9} tx={150} ty={340} label="Pole pocket" sub="aluminium rod" side="left" i={2} />
      <CalloutG x={250} y={64} tx={150} ty={425} label="Rail" side="left" i={3} />
    </Plate>
  );
}

