import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/KeyArt';
import { SpecTable } from '@/components/ui/Spec';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { contrast } from '@/lib/site';
import { GradDefs } from './Library';
import { angleOf, gradById } from './data';
import s from './gradients.module.css';

const SX = 24, SY = 20; // the preview sheet sits inset, so nodes on its edges and corners are never clipped
const PW = 300, PH = 400; // the preview sheet inside the drawing
const BX = 404, BW = 540; // the stop bar

// The ink that reads best on a given colour (labels on the field are 24 px, so 3:1 is the floor; both inks are
// tried and the stronger one wins).
const inkOn = (c) => (contrast(c, HEX.darkBlue) >= contrast(c, HEX.white) ? HEX.darkBlue : HEX.white);

// Points along the gradient vector, in sheet pixels. The vector is moved sideways (perpendicular to itself, in the
// gradient's bounding-box space, which keeps every stop's offset) so that it passes through the sheet's centre.
function vectorPoints(g) {
  const dx = g.x2 - g.x1, dy = g.y2 - g.y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const mx = (g.x1 + g.x2) / 2, my = (g.y1 + g.y2) / 2;
  const k = (0.5 - mx) * nx + (0.5 - my) * ny;
  const ox = g.x1 + nx * k, oy = g.y1 + ny * k;
  return (o) => [r2(SX + (ox + dx * o) * PW), r2(SY + (oy + dy * o) * PH)];
}

// A wide drawing of one gradient: the sheet with its vector and numbered stops, and the same stops laid on a hairline.
function AnatomyDrawing({ g, n }) {
  const idp = `gradients-an${n}`;
  const linear = g.kind === 'linear';
  const pt = vectorPoints(g);
  return (
    <Art viewBox="0 0 980 440" title={`Anatomy of the ${g.name.toLowerCase()}: stops, angle and positions`} exportName={`gradients-anatomy-${g.id}`} className={s.wide}>
      <GradDefs idp={idp} g={g} />
      <GradDefs idp={`${idp}-bar`} g={g} horizontal />
      <rect x={SX} y={SY} width={PW} height={PH} fill={`url(#${idp}-${g.id})`} />
      {linear && (
        <g>
          <line x1={pt(0)[0]} y1={pt(0)[1]} x2={pt(1)[0]} y2={pt(1)[1]} stroke={HEX.darkBlue} strokeWidth="1.5" strokeDasharray="6 5" className="lattice-line" style={{ '--len': 520 }} />
          {g.stops.map((st, i) => {
            const [x, y] = pt(st.o);
            const end = st.o > 0.9;
            const ink = inkOn(st.c);
            return (
              <g key={st.o}>
                <NodeG cx={x} cy={y} s={12} fill={st.c} stroke={ink} strokeWidth="1.5" className="snap" style={{ '--i': i + 2 }} />
                <text x={x + (end ? -14 : 14)} y={y + 8} fontSize="24" fill={ink} textAnchor={end ? 'end' : 'start'}>{i + 1}</text>
              </g>
            );
          })}
        </g>
      )}
      <text x={BX} y="56" fontSize="26" fill={HEX.darkBlue}>{g.name}</text>
      <text x={BX} y="86" fontSize="18" fill={HEX.muted}>{`Angle ${angleOf(g)}° · ${g.stops.length} stops`}</text>
      <rect x={BX} y="116" width={BW} height="110" fill={`url(#${idp}-bar-${g.id})`} />
      <rect x={BX} y="250" width={BW} height="1" fill={HEX.darkBlue} className="extend-x" />
      {g.stops.map((st, i) => {
        const x = r2(BX + st.o * BW);
        const anchor = st.o === 0 ? 'start' : st.o === 1 ? 'end' : 'middle';
        return (
          <g key={st.o}>
            <rect x={r2(x - 0.5)} y="226" width="1" height="24" fill={HEX.darkBlue} />
            <NodeG cx={x} cy={250.5} s={10} fill={HEX.darkBlue} className="snap" style={{ '--i': i + 3 }} />
            <text x={x} y={284 + (i % 3) * 52} fontSize="20" fill={HEX.darkBlue} textAnchor={anchor}>{`${i + 1} · ${r2(st.o * 100)}%`}</text>
            <text x={x} y={307 + (i % 3) * 52} fontSize="17" fill={HEX.muted} textAnchor={anchor}>{st.c}</text>
          </g>
        );
      })}
    </Art>
  );
}

function StopsTable({ g }) {
  const rows = g.stops.map((st, i) => ({ key: st.o, head: `Stop ${i + 1}`, cells: [`${r2(st.o * 100)}%`, st.c, st.n] }));
  return (
    <SpecTable
      compact
      caption={`${g.name}: stops`}
      columns={['Stop', 'Position', 'Colour', 'Reads as']}
      rows={rows}
    />
  );
}

export default function Anatomy() {
  const picks = [gradById('photo-m01'), gradById('photo-m16')];
  return (
    <div className="stack-lg">
      {picks.map((g, i) => (
        <Reveal key={g.id} as="article" className={s.anatomy}>
          <h3 className="t-h3">{g.name}</h3>
          <AnatomyDrawing g={g} n={i + 1} />
          <p className="t-small muted">{g.source}</p>
          <StopsTable g={g} />
        </Reveal>
      ))}
    </div>
  );
}
