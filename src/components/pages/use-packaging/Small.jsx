import { CalloutG, DimensionG, LitG, SheenG } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { NodeG } from '@/components/art/KeyArt';
import { HEX, CONTACT } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';
import { Plate, Cast, pts, BOARD, BLUE, INK } from './kit';
import TubeLabelG, { LABEL } from './TubeLabel';

// Tissue paper in a box, the seal sticker on its liner, and the shipping label. All dimensions are our own values.

// Reflection of point p across the line a-b: where a folded-over corner lands.
function reflect(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy;
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2;
  const fx = a[0] + t * dx, fy = a[1] + t * dy;
  return [r2(2 * fx - p[0]), r2(2 * fy - p[1])];
}

// ---------------------------------------------------------------------------------------------------------------
// Tissue folded in a box, from above. Spot upper left, object left.
export function TissueBox() {
  const spot = { x: 0.2, y: 0.14 };
  const bx = 170, by = 150, bw = 520, bh = 400, wall = 18;
  const ix = bx + wall, iy = by + wall, iw = bw - 2 * wall, ih = bh - 2 * wall;
  const A1 = [ix, iy + 150], B1 = [ix + 170, iy];
  const A2 = [ix + iw - 210, iy + ih], B2 = [ix + iw, iy + ih - 170];
  const flap1 = [A1, B1, reflect([ix, iy], A1, B1)];
  const flap2 = [A2, B2, reflect([ix + iw, iy + ih], A2, B2)];
  const sheet = [B1, [ix + iw, iy], B2, A2, [ix, iy + ih], A1];
  const rnd = seeded(8);
  const creases = Array.from({ length: 16 }, () => {
    let x = ix + rnd() * iw, y = iy + rnd() * ih;
    let d = `M${r2(x)} ${r2(y)}`;
    for (let i = 0; i < 4; i += 1) {
      const nx = x + 30 + rnd() * 60, ny = y + (rnd() - 0.5) * 70;
      d += `Q${r2((x + nx) / 2 + (rnd() - 0.5) * 20)} ${r2((y + ny) / 2 + (rnd() - 0.5) * 20)} ${r2(nx)} ${r2(ny)}`;
      x = nx; y = ny;
    }
    return d;
  });
  const blobs = Array.from({ length: 12 }, (_, i) => ({ x: ix + rnd() * iw, y: iy + rnd() * ih, rx: 50 + rnd() * 80, ry: 30 + rnd() * 50, dark: i % 2 === 0 }));
  return (
    <Plate
      name="tissue-box" title="Printed tissue paper folded in a Dark Blue box, seen from above" spot={spot}
    >
      {(idp) => (
        <>
          <pattern id={`${idp}-tp`} width="64" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
            <rect width="64" height="64" fill={HEX.lightBlue} />
            <MarkG x={4} y={4} size={24} fill={BLUE} />
            <MarkG x={36} y={36} size={24} fill={BLUE} />
          </pattern>
          <radialGradient id={`${idp}-bd`}><stop offset="0" stopColor={HEX.black} stopOpacity="0.22" /><stop offset="1" stopColor={HEX.black} stopOpacity="0" /></radialGradient>
          <radialGradient id={`${idp}-bw`}><stop offset="0" stopColor={HEX.white} stopOpacity="0.3" /><stop offset="1" stopColor={HEX.white} stopOpacity="0" /></radialGradient>
          <linearGradient id={`${idp}-wl`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={HEX.black} stopOpacity="0.5" />
            <stop offset="0.12" stopColor={HEX.black} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${idp}-lg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={HEX.white} stopOpacity="0.22" />
            <stop offset="1" stopColor={HEX.black} stopOpacity="0.22" />
          </linearGradient>
          <clipPath id={`${idp}-in`}><rect x={ix} y={iy} width={iw} height={ih} /></clipPath>
          <Cast idp={idp} k="c1" foot={[[bx, by], [bx + bw, by], [bx + bw, by + bh], [bx, by + bh]]} spot={spot} len={46} opacity={0.55} blur={9} />
          <LitG>
            <rect x={bx} y={by} width={bw} height={bh} fill={`url(#${idp}-board-dark)`} filter={`url(#${idp}-dgrit)`} />
            <rect x={bx} y={by} width={bw} height={bh} fill="none" stroke={HEX.white} strokeOpacity="0.4" strokeWidth="1.4" />
            <rect x={bx + 1} y={by + 1} width={bw - 2} height="1.6" fill={HEX.white} opacity="0.4" />
            <rect x={ix} y={iy} width={iw} height={ih} fill={`url(#${idp}-board-dark)`} />
            <rect x={ix} y={iy} width={iw} height={ih} fill={HEX.black} opacity="0.55" />
            <g clipPath={`url(#${idp}-in)`}>
              <polygon points={pts(sheet)} fill={`url(#${idp}-tp)`} filter={`url(#${idp}-fibre)`} />
              <polygon points={pts(sheet)} fill={`url(#${idp}-lg)`} />
              {blobs.map((b, i) => <ellipse key={i} cx={r2(b.x)} cy={r2(b.y)} rx={r2(b.rx)} ry={r2(b.ry)} fill={`url(#${idp}-${b.dark ? 'bd' : 'bw'})`} transform={`rotate(${i * 23} ${r2(b.x)} ${r2(b.y)})`} />)}
              {creases.map((d, i) => (
                <g key={i} fill="none">
                  <path d={d} stroke={HEX.black} strokeOpacity="0.16" strokeWidth="1.1" />
                  <path d={d} stroke={HEX.white} strokeOpacity="0.4" strokeWidth="1" transform="translate(-1.2 -1.2)" />
                </g>
              ))}
              {/* the two folded-back corners show the plain reverse of the sheet */}
              {[[flap1, A1, B1], [flap2, A2, B2]].map(([f, a, b], i) => (
                <g key={i}>
                  <polygon points={pts([a, b, [b[0] + 14, b[1] + 16], [a[0] + 14, a[1] + 16]])} fill={HEX.black} opacity="0.3" />
                  <polygon points={pts(f)} fill={HEX.paper} filter={`url(#${idp}-fibre)`} />
                  <polygon points={pts(f)} fill={`url(#${idp}-lg)`} />
                  <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={HEX.white} strokeWidth="1.6" opacity="0.8" />
                </g>
              ))}
              <rect x={ix} y={iy} width={iw} height={ih} fill={`url(#${idp}-wl)`} />
            </g>
            <rect x={ix} y={iy} width={iw} height="1.6" fill={HEX.black} opacity="0.5" />
            <SheenG idp={idp} d={`M${ix} ${iy}L${ix + 260} ${iy}L${ix} ${iy + 200}Z`} opacity="0.2" />
          </LitG>
          <CalloutG x={ix + 300} y={iy + 160} tx={730} ty={130} label="Printed tissue" sub="Mark repeat" i={1} />
          <CalloutG x={ix + 100} y={iy + 110} tx={230} ty={120} label="Folded corner" side="left" i={2} />
          <CalloutG x={bx + 8} y={by + 280} tx={170} ty={420} label="Box wall" side="left" i={3} />
          <CalloutG x={ix + 300} y={iy + 240} tx={740} ty={600} label="Soft crease" i={4} />
          <DimensionG x1={bx} y1={by + bh} x2={bx + bw} y2={by + bh} value="520 mm" offset={34} i={5} />
        </>
      )}
    </Plate>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The seal sticker: a Dark Blue square with the mark, drawn flat in its own frame (0 to s).
function SealG({ s, fill }) {
  const m = s * 0.08;
  return (
    <g>
      <rect width={s} height={s} fill={fill} />
      <rect x={m} y={m} width={s - 2 * m} height={s - 2 * m} fill="none" stroke={BLUE} strokeOpacity="0.7" strokeWidth="0.8" />
      {[[m, m], [s - m, m], [m, s - m], [s - m, s - m]].map(([x, y]) => <NodeG key={`${x}-${y}`} cx={x} cy={y} s={4} fill={BLUE} />)}
      <MarkG x={r2(s * 0.27)} y={r2(s * 0.18)} size={r2(s * 0.46)} fill={BLUE} />
      <WordmarkG x={r2(s / 2)} y={r2(s * 0.84)} size={r2(s * 0.11)} anchor="middle" fill={HEX.onBlue} />
    </g>
  );
}

// Seal sticker sheet: a liner with die-cut squares, one slot empty, one seal lifted at a corner. Object right,
// spot upper right.
export function SealSheet() {
  const spot = { x: 0.8, y: 0.12 };
  const s = 130, gap = 34, pad = 40, lw = pad * 2 + 3 * s + 2 * gap, lh = pad * 2 + 2 * s + gap;
  const ox = 790, oy = 380, ang = -4;
  const rot = (x, y) => {
    const c = Math.cos((ang * Math.PI) / 180), sn = Math.sin((ang * Math.PI) / 180);
    const dx = x - lw / 2, dy = y - lh / 2;
    return [ox + dx * c - dy * sn, oy + dx * sn + dy * c];
  };
  const cells = [0, 1, 2].flatMap((c) => [0, 1].map((r) => ({ c, r, x: pad + c * (s + gap), y: pad + r * (s + gap) })));
  const empty = 1, lifted = 4;
  const cut = 62;
  const fa = [s - cut, s], fb = [s, s - cut];
  const peelPath = `M0 0L${s} 0L${s} ${s - cut}L${s - cut} ${s}L0 ${s}Z`;
  return (
    <Plate
      name="seal-sheet" title="Square seal stickers on a liner, one lifted at the corner and one slot empty" spot={spot} side="right"
    >
      {(idp) => (
        <>
          <Cast idp={idp} k="c1" foot={[rot(0, 0), rot(lw, 0), rot(lw, lh), rot(0, lh)]} spot={spot} len={36} opacity={0.6} blur={8} />
          <LitG>
            <g transform={`translate(${r2(ox - lw / 2)} ${r2(oy - lh / 2)}) rotate(${ang} ${lw / 2} ${lh / 2})`}>
              <linearGradient id={`${idp}-ln`} x1="1" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={HEX.white} stopOpacity="0.35" />
                <stop offset="1" stopColor={HEX.black} stopOpacity="0.12" />
              </linearGradient>
              <rect width={lw} height={lh} fill={`url(#${idp}-card)`} filter={`url(#${idp}-fibre)`} />
              <rect width={lw} height={lh} fill={`url(#${idp}-ln)`} />
              <rect x="0" y="0" width={lw} height="1.6" fill={HEX.white} opacity="0.7" />
              {cells.map((c, i) => (
                <g key={i} transform={`translate(${c.x} ${c.y})`}>
                  {i === empty ? (
                    <g>
                      <rect width={s} height={s} fill={HEX.black} opacity="0.07" />
                      <rect width={s} height={s} fill="none" stroke={HEX.black} strokeOpacity="0.35" strokeWidth="1" />
                      <rect x="1" y="1" width={s} height={s} fill="none" stroke={HEX.white} strokeOpacity="0.8" strokeWidth="1" />
                    </g>
                  ) : i === lifted ? (
                    <g>
                      <clipPath id={`${idp}-pl`}><path d={peelPath} /></clipPath>
                      <rect width={s} height={s} fill="none" stroke={HEX.black} strokeOpacity="0.3" />
                      <polygon points={pts([fa, fb, [s + 8, s + 10], [s - cut + 8, s + 10]])} fill={HEX.black} opacity="0.3" />
                      <g clipPath={`url(#${idp}-pl)`}><SealG s={s} fill={`url(#${idp}-board-dark)`} /></g>
                      <path d={peelPath} fill={`url(#${idp}-shade-r)`} opacity="0.5" />
                      <polygon points={pts([fa, fb, reflect([s, s], fa, fb)])} fill={HEX.labelGrey} />
                      <polygon points={pts([fa, fb, reflect([s, s], fa, fb)])} fill={`url(#${idp}-shade)`} opacity="0.6" />
                      <line x1={fa[0]} y1={fa[1]} x2={fb[0]} y2={fb[1]} stroke={HEX.white} strokeWidth="1.2" opacity="0.8" />
                    </g>
                  ) : (
                    <g>
                      <rect x="3" y="4" width={s} height={s} fill={HEX.black} opacity="0.3" />
                      <SealG s={s} fill={`url(#${idp}-board-dark)`} />
                      <rect width={s} height={s} fill={`url(#${idp}-shade-r)`} opacity="0.55" />
                      <rect width={s} height={s} fill="none" stroke={HEX.white} strokeOpacity="0.25" />
                    </g>
                  )}
                </g>
              ))}
            </g>
            <SheenG idp={idp} d={`M${r2(ox - 100)} ${r2(oy - 160)}L${r2(ox + 200)} ${r2(oy - 190)}L${r2(ox + 60)} ${r2(oy + 160)}Z`} opacity="0.12" />
          </LitG>
          <CalloutG x={rot(pad + s / 2, pad + s / 2)[0]} y={rot(pad + s / 2, pad + s / 2)[1]} tx={480} ty={130} label="Seal sticker" sub="Mark and word-mark" side="right" i={1} />
          <CalloutG x={rot(pad + (s + gap) * 2 + s - 8, pad + s + gap + s - 8)[0]} y={rot(pad + (s + gap) * 2 + s - 8, pad + s + gap + s - 8)[1]} tx={1000} ty={650} label="Lifted corner" i={2} />
          <CalloutG x={rot(pad + s / 2, pad + s + gap + s / 2)[0]} y={rot(pad + s / 2, pad + s + gap + s / 2)[1]} tx={500} ty={640} label="Empty slot" side="right" i={3} />
          <CalloutG x={rot(lw - 6, 90)[0]} y={rot(lw - 6, 90)[1]} tx={1080} ty={150} label="Liner" side="left" i={4} />
        </>
      )}
    </Plate>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The shipping label: logo, the printed contact details and quiet pale bars where an address and codes would go.
// The barcode is a generic run of plain bars that encodes nothing.
function LabelG({ w = 360, h = 250 }) {
  const rnd = seeded(21);
  const bars = [];
  let x = 18;
  while (x < 206) {
    const bw = 1 + Math.floor(rnd() * 3), gap = 1 + Math.floor(rnd() * 2.4);
    bars.push([x, bw]);
    x += bw + gap;
  }
  const pale = (x0, y0, bw, bh = 8) => <rect key={`${x0}-${y0}`} x={x0} y={y0} width={bw} height={bh} fill={INK} opacity="0.13" />;
  return (
    <g>
      <rect width={w} height={h} fill={HEX.white} />
      <MarkG x={18} y={14} size={34} fill={INK} />
      <WordmarkG x={62} y={42} size={22} fill={INK} />
      <text x="342" y="40" fontSize="11" fill={INK} textAnchor="end">{CONTACT.web}</text>
      <rect x="0" y="62" width={w} height="1" fill={INK} opacity="0.7" />
      <rect x="210" y="62" width="1" height="128" fill={INK} opacity="0.7" />
      <rect x="0" y="190" width={w} height="1" fill={INK} opacity="0.7" />
      <NodeG cx={210.5} cy={62.5} s={6} fill={INK} />
      <NodeG cx={210.5} cy={190.5} s={6} fill={INK} />
      {pale(18, 80, 150)}{pale(18, 98, 120)}{pale(18, 116, 140)}{pale(18, 144, 86)}{pale(18, 162, 110)}
      <g fontSize="9.6" fill={INK}>
        <text x="226" y="84">{CONTACT.phone}</text>
        <text x="226" y="99">{CONTACT.email}</text>
        <g lang="es" fontSize="8.6">
          <text x="226" y="126">{CONTACT.address[0]}</text>
          <text x="226" y="139">{CONTACT.address[1]}</text>
          <text x="226" y="152">{CONTACT.address[2]}</text>
        </g>
      </g>
      {bars.map(([bx, bw]) => <rect key={bx} x={bx} y="202" width={bw} height="32" fill={INK} />)}
      {pale(236, 204, 100)}{pale(236, 224, 70)}
    </g>
  );
}

// The label on a kraft carton face with a strip of tape across its top edge. Object left, spot top centre.
export function ShippingLabel() {
  const spot = { x: 0.42, y: 0.04 };
  const bx = 260, by = 120, bw = 500, bh = 460, lx = 330, ly = 215;
  return (
    <Plate
      name="shipping-label" title="Shipping label with the logo, contact details and pale bars for an address and codes, taped to a carton" spot={spot}
       floor={0.2}
    >
      {(idp) => (
        <>
          <clipPath id={`${idp}-lab`}><polygon points={pts([[lx, ly], [lx + 360, ly], [lx + 360, ly + 250], [lx, ly + 250]])} /></clipPath>
          <linearGradient id={`${idp}-lg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={HEX.white} stopOpacity="0.25" />
            <stop offset="0.5" stopColor={HEX.white} stopOpacity="0" />
            <stop offset="1" stopColor={HEX.black} stopOpacity="0.14" />
          </linearGradient>
          <Cast idp={idp} k="c1" foot={[[bx, by], [bx + bw, by], [bx + bw, by + bh], [bx, by + bh]]} spot={spot} len={30} opacity={0.5} blur={8} />
          <LitG>
            <rect x={bx} y={by} width={bw} height={bh} fill={BOARD} filter={`url(#${idp}-grit)`} />
            <rect x={bx} y={by} width={bw} height={bh} fill={`url(#${idp}-lg)`} />
            <rect x={bx} y={by} width={bw} height="2" fill={HEX.white} opacity="0.4" />
            {[0.25, 0.62].map((f) => <rect key={f} x={bx} y={by + bh * f} width={bw} height="1.2" fill={HEX.black} opacity="0.12" />)}
            <rect x={lx + 4} y={ly + 6} width="360" height="250" fill={HEX.black} opacity="0.35" filter={`url(#${idp}-soft)`} />
            <g clipPath={`url(#${idp}-lab)`}>
              <g transform={`translate(${lx} ${ly})`}><LabelG /></g>
              <rect x={lx} y={ly} width="360" height="250" fill={`url(#${idp}-lg)`} />
            </g>
            <rect x={lx - 30} y={ly - 22} width="420" height="38" fill={HEX.black} opacity="0.25" filter={`url(#${idp}-soft)`} transform="translate(3 5)" />
            <rect x={lx - 30} y={ly - 22} width="420" height="38" fill={HEX.onBlue} opacity="0.62" />
            <rect x={lx - 30} y={ly - 22} width="420" height="2" fill={HEX.white} opacity="0.6" />
            <rect x={lx - 30} y={ly + 14} width="420" height="2" fill={HEX.black} opacity="0.12" />
            <SheenG idp={idp} d={`M${lx - 30} ${ly - 22}h420v38h-420z`} opacity="0.25" />
          </LitG>
          <CalloutG x={lx + 35} y={ly + 40} tx={240} ty={290} label="Logo" side="left" i={1} />
          <CalloutG x={lx + 300} y={ly + 110} tx={600} ty={88} label="Contact" i={2} />
          <CalloutG x={lx + 70} y={ly + 120} tx={240} ty={380} label="Address bars" side="left" i={3} />
          <CalloutG x={lx + 110} y={ly + 218} tx={240} ty={470} label="Plain bars" side="left" i={4} />
          <CalloutG x={lx - 28} y={ly - 3} tx={240} ty={190} label="Clear tape" side="left" i={5} />
          <DimensionG x1={lx} y1={ly + 250} x2={lx + 360} y2={ly + 250} value="100 mm" offset={34} i={6} />
        </>
      )}
    </Plate>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The tube's grey project label, laid flat and enlarged: every printed line as in the case study, the client line
// as a placeholder. Object right, spot upper right.
export function TubeLabelPlate() {
  const spot = { x: 0.78, y: 0.1 };
  const k = 1.5, ox = 590, oy = 130, lw = LABEL.w * k, lh = LABEL.h * k;
  const at = (x, y) => [r2(ox + x * k), r2(oy + y * k)];
  const n = (x, y, i, label, tx, ty, side = 'left', sub) => {
    const [px, py] = at(x, y);
    return <CalloutG key={label} x={px} y={py} tx={tx} ty={ty} label={label} sub={sub} side={side} i={i} />;
  };
  return (
    <Plate name="tube-label" title="The grey project label of the tube laid flat: project number, client placeholder, services, line, date, mark and web address" spot={spot} side="right">
      {(idp) => (
        <>
          <linearGradient id={`${idp}-ll`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={HEX.white} stopOpacity="0.3" />
            <stop offset="0.5" stopColor={HEX.white} stopOpacity="0" />
            <stop offset="1" stopColor={HEX.black} stopOpacity="0.2" />
          </linearGradient>
          <Cast idp={idp} k="c1" foot={[[ox, oy], [ox + lw, oy], [ox + lw, oy + lh], [ox, oy + lh]]} spot={spot} len={34} opacity={0.6} blur={8} />
          <LitG>
            <g transform={`translate(${ox} ${oy}) scale(${k})`} filter={`url(#${idp}-fibre)`}><TubeLabelG /></g>
            <rect x={ox} y={oy} width={lw} height={lh} fill={`url(#${idp}-ll)`} />
            <rect x={ox} y={oy} width={lw} height="2" fill={HEX.white} opacity="0.7" />
            <SheenG idp={idp} d={`M${ox} ${oy}h${lw * 0.6}L${ox} ${oy + lh * 0.5}Z`} opacity="0.18" />
          </LitG>
          {n(35, 218, 1, 'Project number', 530, 510)}
          {n(57, 192, 2, 'Client name', 530, 445, 'left', 'Placeholder')}
          {n(92, 184, 3, 'Services', 530, 380)}
          {n(132, 120, 4, 'Line', 530, 300)}
          {n(262, 50, 5, 'Mark', 1050, 140, 'right')}
          {n(212, 166, 6, 'Date', 1050, 300, 'right')}
          {n(266, 214, 7, 'Web address', 1050, 460, 'right')}
          <DimensionG x1={ox} y1={oy + lh} x2={ox + lw} y2={oy + lh} value="70 mm" offset={34} i={8} />
        </>
      )}
    </Plate>
  );
}
