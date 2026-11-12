import Art from '@/components/art/Art';
import { GuidesG, NodeG, NodeGridG, IconArtG, PhotoBlockG, CrossingBandsG } from '@/components/art/KeyArt';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { PIXEL32 } from '@/components/site/icons';
import { r2, range } from './helpers';

// Every graphic of the solar landing is its own exportable SVG. Animation inside them is CSS keyframes only
// (the shared classes), playing from a start state towards the drawn artwork.

// ---------------------------------------------------------------------------------------------------------------
// 1. The hero: the solar pixel icon of the case study (m15) grown into a full field of panels. Each module repeats
//    the icon's cell logic (a frame and a 4 x 4 grid of bars); the field fills module by module along the diagonal.
export function PanelField() {
  const W = 640, H = 760;
  const cols = 3, rows = 4, mw = 176, mh = 148, gap = 16, x0 = 40, y0 = 60;
  const modules = range(rows * cols, (n) => {
    const r = Math.floor(n / cols), c = n % cols;
    return { r, c, x: x0 + c * (mw + gap), y: y0 + r * (mh + gap) };
  });
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Solar panel field grown from the pixel icon" exportName="lp-solar-panel-field">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <GuidesG w={W} h={H} xs={[40, 600]} ys={[40, 720]} stroke={HEX.activeBlue} animate />
      {modules.map(({ r, c, x, y }) => {
        const lit = 0.1 + 0.05 * ((r + c) % 4);
        return (
          <g key={`${r}-${c}`}>
            <rect x={x} y={y} width={mw} height={mh} fill={HEX.activeBlue} fillOpacity={r2(lit)} className="fill-in" style={{ '--i': r + c }} />
            <rect x={x + 2} y={y + 2} width={mw - 4} height={mh - 4} fill="none" stroke={HEX.activeBlue} strokeWidth="4" className="fade-in" style={{ '--i': r + c + 6 }} />
            <path
              d={range(3, (k) => `M${r2(x + ((k + 1) * mw) / 4)} ${y + 4}V${y + mh - 4}M${x + 4} ${r2(y + ((k + 1) * mh) / 4)}H${x + mw - 4}`).join('')}
              fill="none"
              stroke={HEX.activeBlue}
              strokeWidth="2"
              className="fade-in"
              style={{ '--i': r + c + 8 }}
            />
          </g>
        );
      })}
      <g fill={HEX.activeBlue} lang="es">
        <text x="56" y="745" fontSize="13">Fotovoltaico</text>
      </g>
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 2. A field of panels as cells on the grid, brightest nearest the sun (top right), fading with distance.
export function PanelCells() {
  const W = 720, H = 600, size = 80, cols = 8, rows = 6, x0 = 40, y0 = 60;
  const sun = { x: 680, y: 60 };
  const maxD = Math.hypot(sun.x - x0, sun.y - (y0 + rows * size));
  const cells = range(cols * rows, (n) => {
    const r = Math.floor(n / cols), c = n % cols;
    const cx = x0 + c * size + size / 2, cy = y0 + r * size + size / 2;
    const d = Math.hypot(sun.x - cx, sun.y - cy);
    return { r, c, d, t: 1 - d / maxD };
  });
  const xs = range(cols + 1, (i) => x0 + i * size);
  const ys = range(rows + 1, (i) => y0 + i * size);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Field of panels as cells, strongest near the sun" exportName="lp-solar-array">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      {cells.map(({ r, c, d, t }) => (
        <g key={`${r}-${c}`}>
          <rect x={x0 + c * size} y={y0 + r * size} width={size} height={size} fill={HEX.activeBlue} fillOpacity={r2(0.12 + 0.78 * t * t)} className="fill-in" style={{ '--i': Math.round(d / 40) }} />
          <path d={`M${x0 + c * size + size / 2} ${y0 + r * size + 10}V${y0 + r * size + size - 10}M${x0 + c * size + 10} ${y0 + r * size + size / 2}H${x0 + c * size + size - 10}`} stroke={HEX.darkBlue} strokeWidth="1" opacity="0.28" fill="none" className="fade-in" style={{ '--i': Math.round(d / 40) + 6 }} />
        </g>
      ))}
      {/* the grid on top: hairlines with nodes at the outer corners and where the sun's row meets the field */}
      <GuidesG w={W} h={H} xs={xs} ys={ys} stroke={HEX.darkBlue} weight={1} animate nodes={[[xs[0], ys[0]], [xs[cols], ys[0]], [xs[0], ys[rows]], [xs[cols], ys[rows]], [xs[4], ys[3]]]} />
      {/* rays from the sun */}
      <g fill="none" stroke={HEX.darkBlue} strokeWidth="1">
        {range(4, (k) => (
          <path key={k} d={`M${sun.x} ${sun.y}L${r2(sun.x - 330 - k * 110)} ${r2(sun.y + 520 - k * 20)}`} className="draw" style={{ '--len': 900, '--i': k + 2 }} opacity="0.5" />
        ))}
      </g>
      <IconArtG name="sun" x={sun.x - 28} y={sun.y - 28} size={56} fill={HEX.darkBlue} className="fade-in" />
      <g fill={HEX.darkBlue} fontSize="13">
        <text x="40" y="574">Fewer rays</text>
        <text x="680" y="574" textAnchor="end">More rays</text>
      </g>
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 3. A line route from the array to a substation: no figures, only the structure of a grid connection.
export function RouteArt() {
  const W = 720, H = 460, ground = 372;
  const poles = [270, 410, 550];
  const top = 282;
  const conductors = [0, 14, 28];
  const link = (x1, x2, off) => `M${x1} ${top + off}Q${r2((x1 + x2) / 2)} ${top + off + 26} ${x2} ${top + off}`;
  const stops = [150, ...poles.map((p) => p + 0), 650];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Line route from a panel array to a substation" exportName="lp-solar-route">
      <rect width={W} height={H} fill={HEX.paper} />
      {/* ground line and the vertical guides over each station */}
      <rect x="0" y={ground} width={W} height="1" fill={HEX.darkBlue} className="extend-x" />
      {[90, ...poles, 650].map((x, i) => (
        <g key={x}>
          <rect x={x} y="48" width="1" height={ground - 48} fill={HEX.darkBlue} opacity="0.35" className="extend-y" style={{ '--i': i + 1 }} />
          <NodeG cx={x} cy="48" fill={HEX.darkBlue} className="snap" style={{ '--i': i + 2 }} />
          <NodeG cx={x} cy={ground} fill={HEX.darkBlue} className="snap" style={{ '--i': i + 6 }} />
        </g>
      ))}
      {/* the array: a small cluster of panel cells */}
      {range(6, (n) => {
        const c = n % 3, r = Math.floor(n / 3);
        return <rect key={n} x={46 + c * 28} y={ground - 60 + r * 28} width="28" height="28" fill={HEX.activeBlue} fillOpacity={r2(0.35 + 0.12 * c)} stroke={HEX.darkBlue} strokeWidth="1" className="fill-in" style={{ '--i': n }} />;
      })}
      {/* pylons */}
      {poles.map((x, i) => (
        <g key={x} className="fade-in" style={{ '--i': i + 4 }}>
          <IconArtG name="pylon" x={x - 48} y={ground - 96} size={96} fill={HEX.darkBlue} />
        </g>
      ))}
      {/* the substation */}
      <g className="fade-in" style={{ '--i': 10 }}>
        <IconArtG name="substation" x={602} y={ground - 96} size={96} fill={HEX.darkBlue} />
      </g>
      {/* conductors: three lines, drawn along the route */}
      <g fill="none" stroke={HEX.activeBlue} strokeWidth="2">
        {conductors.map((off, k) => (
          <path key={off} d={[`M${stops[0] - 60} ${top + off + 40}L${stops[1] - 6} ${top + off}`, link(stops[1] - 6, stops[2] - 6, off), link(stops[2] - 6, stops[3] - 6, off), `M${stops[3] - 6} ${top + off}L${stops[4] - 20} ${top + off + 20}`].join('')} className="draw" style={{ '--len': 900, '--i': k * 3 + 2 }} />
        ))}
      </g>
      <g fill={HEX.darkBlue} fontSize="13">
        <text x="46" y={ground + 36}>Array</text>
        <text x="316" y={ground + 36}>Line</text>
        <text x="604" y={ground + 36}>Substation</text>
      </g>
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 4. The node grid of the case study (the m17 back screen) on Dark Blue: the brand's structure made visible.
export function NodesArt() {
  const W = 720, H = 540, size = 40, cols = 16, rows = 11;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Node grid with clusters in two strengths" exportName="lp-solar-nodes">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <NodeGridG x={40} y={36} cols={cols} rows={rows} size={size} seed={11} clusters={13} line="rgba(228,231,239,0.22)" animate />
      <GuidesG w={W} h={H} xs={[40, 680]} ys={[36, 476]} stroke={HEX.activeBlue} weight={1} animate />
      <g fontSize="13" fill={HEX.activeBlue}>
        <rect x="40" y="498" width="14" height="14" fill={HEX.activeBlue} />
        <text x="62" y="510" fill={HEX.lightBlue}>Full</text>
        <rect x="112" y="498" width="14" height="14" fill="#7c9cff" />
        <text x="134" y="510" fill={HEX.lightBlue}>Soft</text>
      </g>
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 5. The right poster of m09 rebuilt (Light Blue, 3:4): the mark in a narrow column, the line, the body, the two
//    square photographs as flat Dark Blue blocks at 75% (stand-ins: a solar field and a turbine, in line art).
export function PosterArt() {
  const W = 600, H = 800;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Generation poster, Light Blue sheet in 3:4" exportName="lp-solar-poster" lang="es">
      <rect width={W} height={H} fill={HEX.lightBlue} />
      <rect x="116" y="0" width="1" height={H} fill={HEX.darkBlue} className="extend-y" />
      <rect x="0" y="440" width={W} height="1" fill={HEX.darkBlue} className="extend-x" style={{ '--i': 2 }} />
      <NodeG cx="116.5" cy="440.5" fill={HEX.darkBlue} className="snap" style={{ '--i': 4 }} />
      <MarkG x="40" y="40" size="44" fill={HEX.darkBlue} className="fade-in" />
      <g fill={HEX.darkBlue} className="slide-up" style={{ '--i': 3 }}>
        <text x="140" y="104" fontSize="30" className="display">Convertimos la</text>
        <text x="140" y="140" fontSize="30" className="display">complejidad técnica</text>
        <text x="140" y="176" fontSize="30" className="display">en proyectos que avanzan.</text>
      </g>
      <g fill={HEX.darkBlue} fontSize="13" className="slide-up" style={{ '--i': 6 }}>
        <text x="140" y="238">Intervenimos en la conexión a red de proyectos</text>
        <text x="140" y="257">energéticos, estructurando decisiones en puntos</text>
        <text x="140" y="276">donde la viabilidad no es evidente.</text>
        <text x="140" y="326">bestgrid.com</text>
      </g>
      <g fill={HEX.darkBlue} fontSize="13" className="fade-in" style={{ '--i': 8 }}>
        <text x="140" y="402">Acceso y conexión a red</text>
        <text x="140" y="421">en generación eólica y solar</text>
      </g>
      {[140, 360].map((x, i) => (
        <g key={x} className="fill-in" style={{ '--i': i * 2 + 6 }}>
          <PhotoBlockG x={x} y="470" w="200" h="200" />
          <IconArtG name={i ? 'wind' : 'solar'} x={x + 52} y="522" size={96} fill={HEX.lightBlue} />
        </g>
      ))}
      <WordmarkG x="560" y="758" size="34" fill={HEX.activeBlue} anchor="end" />
      <MarkG x="40" y="716" size="44" fill={HEX.darkBlue} />
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 6. The construction of the solar pixel icon on its 32 x 32 grid (as m14 shows the turbine): hairline grid with
//    nodes at the outer corners, the icon in Dark Blue; the grid fades in first, then the icon fills in.
export function ModuleArt() {
  const W = 720, H = 640, u = 17, ox = 88, oy = 36;
  const lines = range(33, (i) => i);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Solar pixel icon on its 32 by 32 construction grid" exportName="lp-solar-module">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      <g stroke={HEX.activeBlue} strokeWidth="1" fill="none">
        {lines.map((i) => (
          <g key={i}>
            <path d={`M${ox + i * u} ${oy}V${oy + 32 * u}`} className="fade-in" style={{ '--i': i }} />
            <path d={`M${ox} ${oy + i * u}H${ox + 32 * u}`} className="fade-in" style={{ '--i': i }} />
          </g>
        ))}
      </g>
      {[[0, 0], [32, 0], [0, 32], [32, 32]].map(([a, b], k) => (
        <NodeG key={k} cx={ox + a * u} cy={oy + b * u} fill={HEX.darkBlue} className="snap" style={{ '--i': k + 20 }} />
      ))}
      <g transform={`translate(${ox} ${oy}) scale(${u})`}>
        <path d={PIXEL32.solar} fill={HEX.darkBlue} className="fill-in" style={{ '--i': 30 }} />
      </g>
      <text x={ox} y={oy + 32 * u + 36} fontSize="14" fill={HEX.darkBlue}>32 x 32</text>
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 7. The crossing bands of the folder (m05) pulled wide, with the m22 pair of lines set over them.
export function BandsArt() {
  const W = 1440, H = 480;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Crossing bands with the connection line" exportName="lp-solar-bands" lang="es">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <g className="fade-in">
        <CrossingBandsG idp="lp-solar-bands" w={W} h={H} cx={0.74} cy={0.5} a1={62} a2={-18} band={0.022} r={0.07} />
      </g>
      <GuidesG w={W} h={H} xs={[96, 1344]} ys={[48, 432]} stroke={HEX.activeBlue} animate />
      <g className="slide-up" style={{ '--i': 6 }} fill={HEX.onBlue}>
        <text x="144" y="214" fontSize="46" className="display">No se trata de producir más.</text>
        <text x="144" y="274" fontSize="46" className="display" fill={HEX.activeBlue}>Se trata de poder conectar.</text>
      </g>
    </Art>
  );
}
