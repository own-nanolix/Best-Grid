// Shared parts of the use-world scenes: the plate wrapper, small materials, and the case study's own artwork
// (the m19 billboard face and the m11 / m09 posters) drawn once in their own coordinates and placed by every scene.
import Art from '@/components/art/Art';
import { MaterialDefs, StageG, PlateFrameG } from '@/components/art/Mockup';
import { BrandDefs, TrailsG, IconArtG, NodeG } from '@/components/art/KeyArt';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CORE } from '@/components/site/icons';
import { HEX, LINES, CONTACT, POSTERS } from '@/lib/brand';
import { r2 } from '@/lib/charts';

export const LIGHT = HEX.onBlue; // light grey-white type on blue (sampled)

// The plate: stage, furniture, defs, then the scene. `spot` is the one light; `no` / `label` sit bottom of frame.
export function Plate({ idp, title, exportName, w, h, spot, floor = 0.74, split, no, label, r = 0.62, intensity = 1, children }) {
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={exportName}>
      <MaterialDefs idp={idp} />
      <BrandDefs idp={`${idp}-b`} />
      <StageG idp={idp} w={w} h={h} spot={spot} floor={floor} r={r} intensity={intensity} />
      <PlateFrameG w={w} h={h} split={split} no={no} label={label} />
      {children}
    </Art>
  );
}

// A bolt or screw head with a highlight facing the light.
export function BoltG({ x, y, r = 4 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#2a2f4c" />
      <circle cx={r2(x - r * 0.2)} cy={r2(y - r * 0.2)} r={r2(r * 0.7)} fill="#b7bdcc" />
      <path d={`M${r2(x - r * 0.6)} ${y}H${r2(x + r * 0.6)}`} stroke="#3c4475" strokeWidth="1" />
    </g>
  );
}

// A sheen band on a lit panel: the glass gradient, breathing slowly.
export function PanelSheenG({ idp, x, y, w, h, opacity = 0.5, skew = 0 }) {
  return <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-glass)`} opacity={opacity} className="mock-sheen" transform={skew ? `skewX(${skew})` : undefined} />;
}

// Dark guide hairlines and nodes of a poster or board (the case study's live area).
function Guides({ xs, ys, nodes, stroke, node = 5 }) {
  return (
    <g>
      {xs.map((x) => <rect key={`x${x}`} x={x - 0.5} y={ys[0] - 40} width="1" height={ys[ys.length - 1] - ys[0] + 80} fill={stroke} opacity="0.7" />)}
      {ys.map((y) => <rect key={`y${y}`} x={xs[0] - 40} y={y - 0.5} width={xs[xs.length - 1] - xs[0] + 80} height="1" fill={stroke} opacity="0.7" />)}
      {nodes.map(([x, y]) => <NodeG key={`${x}-${y}`} cx={x} cy={y} s={node} fill={stroke} />)}
    </g>
  );
}

// The photograph stand-in: a sunset field with light trails and the pylon as line art in the icon manner.
export function SkyFieldG({ idp, x, y, w, h, clip }) {
  return (
    <g>
      <clipPath id={clip}><rect x={x} y={y} width={w} height={h} /></clipPath>
      <g clipPath={`url(#${clip})`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-b-sunset)`} />
        <g transform={`translate(${x} ${y})`}><TrailsG w={w} h={h} count={5} y0={0.06} y1={0.5} sag={0.05} /></g>
        <IconArtG name="pylon" x={r2(x + w * 0.16)} y={r2(y + h * 0.18)} size={r2(w * 0.68)} fill={HEX.darkBlue} opacity="0.92" />
        <rect x={x} y={y} width={w} height={h} fill="#000000" opacity="0.08" />
      </g>
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The m19 billboard face, in the reference's own 1600 x 510 board space (measured from m19).
export const BOARD = { w: 1600, h: 510 };
export function BillboardFaceG({ idp }) {
  const [a, b, c] = LINES.box.rows;
  const [t1, t2] = LINES.billboard.rows;
  return (
    <g>
      <rect width={BOARD.w} height={BOARD.h} fill={HEX.activeBlue} filter={`url(#${idp}-b-board)`} />
      {/* m19 guides: two full-height verticals, the rule from the left edge to its node */}
      <g fill={LIGHT} opacity="0.7">
        {[492, 1085].map((x) => <rect key={x} x={x - 0.5} y="0" width="1" height={BOARD.h} />)}
        <rect x="0" y="326.5" width="1059" height="1" />
      </g>
      <NodeG cx={1059} cy={327} s={7} fill={LIGHT} />
      <g fill={LIGHT} fontSize="32" lang="es">
        <text x="28" y="63">{a}</text>
        <text x="28" y="100">en avance. <tspan fill={HEX.darkBlue}>Dando estructura</tspan></text>
        <text x="28" y="137" fill={HEX.darkBlue}>{c}</text>
      </g>
      <MarkG x={957} y={43} size={60} fill={LIGHT} opacity="0.95" />
      <g fontSize="15.5" fill="#ffffff" lang="es">
        <text x="32" y="276">{t1}</text>
        <text x="32" y="298">{t2}</text>
        <text x="1015" y="276" textAnchor="end" fill={LIGHT}>{CONTACT.handle}</text>
        <text x="1015" y="298" textAnchor="end" fill={HEX.darkBlue}>{CONTACT.web}</text>
      </g>
      <WordmarkG x={26} y={480} size={148} fill={LIGHT} />
      <g fontSize="8.6" fill={HEX.darkBlue} textAnchor="start" lang="es">
        <text x="895" y="460">{CONTACT.address[0]}</text>
        <text x="895" y="471">{CONTACT.address[1]}</text>
        <text x="895" y="482">{CONTACT.address[2]}</text>
      </g>
      <SkyFieldG idp={idp} x={1114} y={29} w={458} h={451} clip={`${idp}-bb-photo`} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Posters of m11 / m09 in their own 720 x 960 space. Each returns a group; the scene clips and places it.
export const POSTER = { w: 720, h: 960 };

// m11 left: Dark Blue sheet, white "Best Grid" top centre, guide frame, photo stand-in with the three words.
export function PosterFieldG({ idp, uid = "f" }) {
  const p = POSTERS.field;
  const xs = [48, 372, 672], ys = [159, 800];
  return (
    <g>
      <rect width={POSTER.w} height={POSTER.h} fill={HEX.darkBlue} />
      <Guides xs={xs} ys={ys} nodes={[[48, 159], [372, 159], [672, 159], [48, 800], [372, 800], [672, 800]]} stroke={LIGHT} node={6} />
      <WordmarkG x={360} y={118} size={58} fill={LIGHT} anchor="middle" />
      <SkyFieldG idp={idp} x={75} y={195} w={570} h={570} clip={`${idp}-${uid}-pf-photo`} />
      <rect x={75} y={195} width={570} height={570} fill={HEX.darkBlue} opacity="0.2" />
      <text x="360" y="722" textAnchor="middle" fontSize="30" fill="#ffffff" lang="es">{p.head}</text>
      <g fontSize="12.5" fill={LIGHT} textAnchor="middle" lang="es">
        {p.body.map((l, i) => <text key={l} x="360" y={870 + i * 15}>{l}</text>)}
      </g>
      <g fontSize="9" fill={LIGHT}>
        <text x="75" y="906">{p.email}</text>
        <text x="645" y="906" textAnchor="end">{p.web}</text>
      </g>
    </g>
  );
}

// m11 right: Active Blue sheet, Dark Blue type centred, three-cell footer with the mark.
export function PosterClarityG() {
  const p = POSTERS.clarity;
  return (
    <g>
      <rect width={POSTER.w} height={POSTER.h} fill={HEX.activeBlue} />
      <Guides xs={[48, 672]} ys={[50, 836, 910]} nodes={[[48, 50], [672, 50], [48, 836], [672, 836], [48, 910], [672, 910], [256, 836], [466, 836], [256, 910], [466, 910]]} stroke={HEX.darkBlue} node={6} />
      <rect x="255.5" y="836" width="1" height="74" fill={HEX.darkBlue} opacity="0.7" />
      <rect x="465.5" y="836" width="1" height="74" fill={HEX.darkBlue} opacity="0.7" />
      <WordmarkG x={360} y={175} size={58} fill={HEX.darkBlue} anchor="middle" />
      <g fontSize="38" fill={HEX.darkBlue} textAnchor="middle" lang="es">
        {p.head.map((l, i) => <text key={l} x="360" y={405 + i * 45}>{l}</text>)}
      </g>
      <g fontSize="12" fill={HEX.darkBlue} textAnchor="middle" lang="es">
        {p.body.map((l, i) => <text key={l} x="360" y={650 + i * 15}>{l}</text>)}
      </g>
      <g fontSize="9" fill={HEX.darkBlue} textAnchor="middle">
        <text x="152" y="877">{p.web}</text>
        <text x="569" y="877">{p.web}</text>
      </g>
      <MarkG x={341} y={856} size={38} fill={HEX.darkBlue} />
    </g>
  );
}

// m09 right: Light Blue sheet, mark in a narrow column, headline and body, Active Blue "Best Grid" bottom right.
export function PosterGenerationG({ idp, uid = "g" }) {
  const p = POSTERS.generation;
  return (
    <g>
      <rect width={POSTER.w} height={POSTER.h} fill={HEX.lightBlue} />
      <Guides xs={[56, 152]} ys={[60, 900]} nodes={[[56, 60], [152, 60], [56, 900], [152, 900]]} stroke={HEX.darkBlue} node={5} />
      <MarkG x={82} y={82} size={46} fill={HEX.darkBlue} />
      <g fontSize="40" fill={HEX.darkBlue} lang="es">
        {p.head.map((l, i) => <text key={l} x="190" y={130 + i * 46}>{l}</text>)}
      </g>
      <g fontSize="12.5" fill={HEX.darkBlue} lang="es">
        {p.body.map((l, i) => <text key={l} x="190" y={300 + i * 16}>{l}</text>)}
        {p.tag.map((l, i) => <text key={l} x="190" y={380 + i * 16}>{l}</text>)}
        <text x="190" y="440">{p.web}</text>
      </g>
      <SkyFieldG idp={idp} x={190} y={520} w={230} h={230} clip={`${idp}-${uid}-pg-a`} />
      <rect x="440" y="520" width="230" height="230" fill={HEX.darkBlue} opacity="0.75" />
      <WordmarkG x={668} y={868} size={56} fill={HEX.activeBlue} anchor="end" />
    </g>
  );
}

// The Reception / meeting / parking wayfinding rows use the shared icons as filled pixel-bar paths.
export function IconPathG({ name, x, y, size, fill }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(size / 24)})`}>
      <path d={CORE[name]} fill={fill} />
    </g>
  );
}

// Raised letters or a raised mark: a cast shadow that sweeps with the light, a stack of side layers away from the
// light, a lit edge and the face. `draw(fill)` returns the shape in the given fill. dir = direction shadows fall.
export function RaisedG({ idp, draw, dir, depth = 5, face, side = '#10132b', shadowClass }) {
  const n = Math.max(2, Math.round(depth));
  return (
    <g>
      <filter id={`${idp}-raise-blur`} x="-20%" y="-40%" width="140%" height="180%">
        <feGaussianBlur stdDeviation={r2(depth * 0.9)} />
      </filter>
      <g className={shadowClass}>
        <g transform={`translate(${r2(dir.x * depth * 2.4)} ${r2(dir.y * depth * 2.4)})`} opacity="0.4" filter={`url(#${idp}-raise-blur)`}>{draw('#000000')}</g>
      </g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${r2(dir.x * (n - i) * 0.9)} ${r2(dir.y * (n - i) * 0.9)})`}>{draw(side)}</g>
      ))}
      <g transform={`translate(${r2(-dir.x * 0.9)} ${r2(-dir.y * 0.9)})`} opacity="0.65">{draw('#ffffff')}</g>
      {draw(face)}
    </g>
  );
}

// Wayfinding rows: a shared icon in a square cell, a plain word and an arrow, between hairlines with nodes.
// rows: [{ icon, word, arrow: 'right' | 'left' | 'up', lang }]. Colours come from the caller.
export function WayRowsG({ x, y, w, rowH, rows, fg, rule, cell }) {
  const u = rowH * 0.36;
  const rot = { right: 0, left: 180, up: -90 };
  return (
    <g transform={`translate(${x} ${y})`}>
      {rows.map((r, i) => {
        const ry = i * rowH;
        return (
          <g key={r.word}>
            <rect x="0" y={ry} width={w} height="1" fill={rule} opacity="0.8" />
            <rect x="-3" y={ry - 3} width="6" height="6" fill={rule} />
            <rect x={rowH * 0.18} y={r2(ry + rowH * 0.5 - u * 0.75)} width={r2(u * 1.5)} height={r2(u * 1.5)} fill={cell} />
            <IconPathG name={r.icon} x={r2(rowH * 0.18 + u * 0.15)} y={r2(ry + rowH * 0.5 - u * 0.6)} size={r2(u * 1.2)} fill={fg} />
            <text x={r2(rowH * 0.18 + u * 1.5 + 12)} y={r2(ry + rowH * 0.5 + rowH * 0.06)} fontSize={r2(rowH * 0.15)} fill={fg} lang={r.lang}>{r.word}</text>
            <g transform={`translate(${r2(w - 24)} ${r2(ry + rowH * 0.5)}) rotate(${rot[r.arrow]})`}>
              <g transform={`translate(${r2(-u * 0.35)} ${r2(-u * 0.35)}) scale(${r2((u * 0.7) / 24)})`}><path d={CORE['arrow-right']} fill={fg} /></g>
            </g>
          </g>
        );
      })}
      <rect x="0" y={rows.length * rowH} width={w} height="1" fill={rule} opacity="0.8" />
      <rect x="-3" y={rows.length * rowH - 3} width="6" height="6" fill={rule} />
    </g>
  );
}
