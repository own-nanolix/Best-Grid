import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { BrandDefs, FogFieldG, GuidesG, IconArtG, NodeG, PhotoBlockG } from '@/components/art/KeyArt';
import { turbinePath } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { range } from '@/lib/site';

// Every graphic of the wind landing is its own exportable SVG. Animation inside them is CSS keyframes only (the
// shared classes), playing from a start state towards the drawn artwork. No photograph is reproduced.

// ---------------------------------------------------------------------------------------------------------------
// 1. The fog field of m01 standing in for the hero photograph, with a turbine drawn as line art in the mist.
export function FogHero() {
  const W = 1600, H = 1200;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Fog field with a turbine in the mist" exportName="lp-wind-fog" preserveAspectRatio="xMidYMid slice">
      <BrandDefs idp="lp-wind-fog" />
      <FogFieldG idp="lp-wind-fog" w={W} h={H} />
      <g className="fade-in" style={{ '--i': 6 }}>
        <rect x="997" y="560" width="6" height="640" fill={HEX.darkBlue} fillOpacity="0.1" />
        <path d={turbinePath(1000, 560, 13)} fill={HEX.darkBlue} fillOpacity="0.26" />
      </g>
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 2. The turbine construction of m14, large: the 32 x 32 grid extends line by line, the three guide circles draw,
//    the four outer nodes snap in, and the turbine fills in last. This is the page's signature moment.
export function TurbineBuild() {
  const u = 18, o = 32, W = 640;
  const circles = [1.5, 6, 7, 10.5];
  return (
    <Art viewBox={`0 0 ${W} ${W}`} title="Wind turbine on its 32 by 32 construction grid and three guide circles" exportName="lp-wind-turbine">
      <rect width={W} height={W} fill={HEX.periwinkle} />
      <g fill={HEX.activeBlue}>
        {range(33, (i) => (
          <g key={i}>
            <rect x={o} y={r2(o + i * u - 0.4)} width={32 * u} height="0.8" className="extend-x" style={{ '--i': i }} />
            <rect x={r2(o + i * u - 0.4)} y={o} width="0.8" height={32 * u} className="extend-y" style={{ '--i': i }} />
          </g>
        ))}
      </g>
      <g fill="none" stroke={HEX.darkBlue} strokeWidth="1">
        {circles.map((rr, k) => (
          <circle key={rr} cx={o + 16 * u} cy={o + 16 * u} r={r2(rr * u)} className="draw" style={{ '--len': r2(2 * Math.PI * rr * u + 4), '--i': 30 + k * 8 }} />
        ))}
      </g>
      {[[0, 0], [32, 0], [0, 32], [32, 32]].map(([a, b], k) => (
        <NodeG key={k} cx={o + a * u} cy={o + b * u} fill={HEX.darkBlue} className="snap" style={{ '--i': 30 + k }} />
      ))}
      <g transform={`translate(${o} ${o}) scale(${u})`}>
        <path d={turbinePath(16, 16, 1)} fill={HEX.darkBlue} className="fill-in" style={{ '--i': 40 }} />
      </g>
      <text x={o} y={W - 8} fontSize="13" fill={HEX.darkBlue}>32 x 32</text>
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 3. A wind farm as nodes and lines: staggered turbines, every neighbour joined by a hairline.
export function WindFarm() {
  const W = 720, H = 600;
  const cols = 5, rows = 4, dx = 124, dy = 124, x0 = 100, y0 = 104;
  const pts = range(cols * rows, (n) => {
    const r = Math.floor(n / cols), c = n % cols;
    return { r, c, x: x0 + c * dx + (r % 2 ? dx / 2 : 0) - 30, y: y0 + r * dy };
  });
  const at = (r, c) => pts[r * cols + c];
  const links = [];
  pts.forEach(({ r, c, x, y }) => {
    if (c < cols - 1) links.push([x, y, at(r, c + 1).x, at(r, c + 1).y]);
    if (r < rows - 1) links.push([x, y, at(r + 1, c).x, at(r + 1, c).y]);
    if (r < rows - 1 && r % 2 === 0 && c > 0) links.push([x, y, at(r + 1, c - 1).x, at(r + 1, c - 1).y]);
  });
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Wind farm drawn as turbine nodes and lines" exportName="lp-wind-farm">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <g stroke={HEX.activeBlue} strokeWidth="1" fill="none">
        {links.map(([a, b, c, d], i) => (
          <path key={i} d={`M${r2(a)} ${r2(b)}L${r2(c)} ${r2(d)}`} className="draw" style={{ '--len': 180, '--i': Math.floor(i / 2) }} />
        ))}
      </g>
      {pts.map(({ r, c, x, y }) => (
        <g key={`${r}-${c}`} className="fill-in" style={{ '--i': r + c }}>
          <rect x={r2(x - 28)} y={r2(y - 28)} width="56" height="56" fill={HEX.darkBlue} />
          <path d={turbinePath(r2(x), r2(y), 1.5)} fill={HEX.lightBlue} />
        </g>
      ))}
      <GuidesG w={W} h={H} xs={[44, 676]} ys={[44, 556]} stroke={HEX.activeBlue} animate nodes={[[44, 44], [676, 44], [44, 556], [676, 556]]} />
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 4. From the turbines to the substation: branches, one collector line, one connection. No figures.
export function Collector() {
  const W = 720, H = 560;
  const rowsY = [120, 260, 400];
  const xs = [96, 176, 256, 336];
  const busX = 450, subX = 610, mid = 260;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Turbine branches joined by a collector line to a substation" exportName="lp-wind-collector">
      <rect width={W} height={H} fill={HEX.paper} />
      <g fill="none" stroke={HEX.darkBlue} strokeWidth="1.5">
        {rowsY.map((y, i) => (
          <path key={y} d={`M${xs[0]} ${y}H${busX}`} className="draw" style={{ '--len': 400, '--i': i * 2 }} />
        ))}
        <path d={`M${busX} ${rowsY[0]}V${rowsY[2]}`} className="draw" style={{ '--len': 300, '--i': 6 }} />
        <path d={`M${busX} ${mid}H${subX - 40}`} className="draw" style={{ '--len': 200, '--i': 8 }} stroke={HEX.activeBlue} strokeWidth="3" />
      </g>
      {rowsY.map((y, r) =>
        xs.map((x, c) => (
          <g key={`${r}-${c}`} className="fill-in" style={{ '--i': r + c }}>
            <rect x={x - 22} y={y - 22} width="44" height="44" fill={HEX.paper} stroke={HEX.darkBlue} strokeWidth="1" />
            <path d={turbinePath(x, y, 1.1)} fill={HEX.darkBlue} />
          </g>
        )),
      )}
      {rowsY.map((y) => (
        <NodeG key={y} cx={busX} cy={y} fill={HEX.darkBlue} className="snap" style={{ '--i': 9 }} />
      ))}
      <NodeG cx={busX} cy={mid} s={10} fill={HEX.activeBlue} className="snap" style={{ '--i': 10 }} />
      <g className="fade-in" style={{ '--i': 12 }}>
        <IconArtG name="substation" x={subX - 48} y={mid - 60} size={96} fill={HEX.darkBlue} />
      </g>
      <g fontSize="13" fill={HEX.darkBlue}>
        <text x="96" y="506">Turbines</text>
        <text x="370" y="506">Collector line</text>
        <text x="560" y="506">Substation</text>
      </g>
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 5. The field poster of m11 without the person: a square photo block (Dark Blue at 75%) with the three words over
//    it, and a turbine in line art inside it.
export function FieldBlock() {
  const W = 720, H = 720;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Square photo block with a turbine in line art and the three words" exportName="lp-wind-field" lang="es">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <GuidesG w={W} h={H} xs={[48, 672]} ys={[48, 672]} stroke={HEX.lightBlue} weight={1} animate />
      <rect x="96" y="96" width="528" height="528" fill={HEX.periwinkle} />
      <PhotoBlockG x="96" y="96" w="528" h="528" className="fill-in" />
      <g transform="translate(168 120) scale(15)" className="fade-in" style={{ '--i': 4 }}>
        <path d={turbinePath(16, 16, 1)} fill={HEX.lightBlue} fillOpacity="0.9" />
      </g>
      <text x="120" y="594" fontSize="30" fill={HEX.lightBlue} className="display slide-up" style={{ '--i': 6 }}>
        Análisis · Criterio · Validación
      </text>
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 6. The m10 hard-cut cycle, applied to the rotor: eight frames of 15 degrees at 100 ms each. The blades repeat every
//    120 degrees, so eight frames close the loop exactly. This is the page's second moving moment.
export function RotorCycle() {
  const W = 640, c = 320;
  return (
    <Art viewBox={`0 0 ${W} ${W}`} title="Turbine rotor in eight hard-cut frames" exportName="lp-wind-cycle">
      <rect width={W} height={W} fill={HEX.darkBlue} />
      <GuidesG w={W} h={W} xs={[64, 576]} ys={[64, 576]} stroke={HEX.activeBlue} animate />
      <g fill="none" stroke={HEX.activeBlue} strokeWidth="1" opacity="0.6">
        <circle cx={c} cy={c} r="168" />
        <circle cx={c} cy={c} r="126" />
      </g>
      {range(8, (f) => (
        <g key={f} className="cut" style={{ '--f': f }}>
          <g transform={`rotate(${f * 15} ${c} ${c})`}>
            <path d={turbinePath(c, c, 16)} fill={HEX.lightBlue} />
          </g>
        </g>
      ))}
    </Art>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// 7. The right poster of m11 rebuilt (Active Blue, Dark Blue type, 3:4): the clarity line centred, the body below,
//    the three-cell footer "bestgrid.com" | mark | "bestgrid.com".
export function ClarityPoster() {
  const W = 600, H = 800;
  const head = ['Los proyectos', 'avanzan cuando la', 'estructura es clara.'];
  const body = ['Aportamos claridad en la conexión a red,', 'estructurando decisiones en puntos donde', 'el sistema deja de ser evidente.'];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Clarity poster, Active Blue sheet in 3:4" exportName="lp-wind-poster" lang="es">
      <rect width={W} height={H} fill={HEX.activeBlue} />
      <GuidesG w={W} h={H} xs={[40, 560]} ys={[40, 680, 760]} stroke={HEX.darkBlue} animate nodes={[[40, 40], [560, 40], [40, 680], [560, 680], [200, 680], [400, 680], [200, 760], [400, 760]]} />
      <text x="300" y="108" fontSize="22" textAnchor="middle" fill={HEX.darkBlue} className="display fade-in" style={{ '--i': 3 }}>Best Grid</text>
      <g fill={HEX.darkBlue} textAnchor="middle" className="slide-up" style={{ '--i': 5 }}>
        {head.map((t, i) => (
          <text key={t} x="300" y={r2(330 + i * 50)} fontSize="42" className="display">{t}</text>
        ))}
      </g>
      <g fill={HEX.darkBlue} textAnchor="middle" fontSize="14" className="fade-in" style={{ '--i': 9 }}>
        {body.map((t, i) => (
          <text key={t} x="300" y={r2(520 + i * 20)}>{t}</text>
        ))}
      </g>
      <g fill={HEX.darkBlue} fontSize="13" textAnchor="middle">
        <text x="120" y="725">bestgrid.com</text>
        <text x="480" y="725">bestgrid.com</text>
      </g>
      <MarkG x="276" y="696" size="48" fill={HEX.darkBlue} />
    </Art>
  );
}
