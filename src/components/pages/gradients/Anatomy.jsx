import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/KeyArt';
import { SpecTable } from '@/components/ui/Spec';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { GradDefs } from './Library';
import { angleOf, gradById } from './data';
import s from './gradients.module.css';

const PW = 300, PH = 400; // the preview sheet inside the drawing
const BX = 380, BW = 540; // the stop bar

// A wide drawing of one gradient: the sheet with its vector and numbered stops, and the same stops laid on a hairline.
function AnatomyDrawing({ g, n }) {
  const idp = `gradients-an${n}`;
  const linear = g.kind === 'linear';
  const pt = (o) => [r2((g.x1 + (g.x2 - g.x1) * o) * PW), r2((g.y1 + (g.y2 - g.y1) * o) * PH)];
  const ink = g.tone === 'dark' ? HEX.lightBlue : HEX.darkBlue;
  return (
    <Art viewBox="0 0 960 400" title={`Anatomy of the ${g.name} gradient: stops, angle and positions`} exportName={`gradients-anatomy-${g.id}`} className={s.wide}>
      <GradDefs idp={idp} g={g} />
      <GradDefs idp={`${idp}-bar`} g={g} horizontal />
      <rect width={PW} height={PH} fill={`url(#${idp}-${g.id})`} />
      {g.light && <rect width={PW} height={PH} fill={`url(#${idp}-${g.id}-light)`} />}
      {linear && (
        <g>
          <line x1={pt(0)[0]} y1={pt(0)[1]} x2={pt(1)[0]} y2={pt(1)[1]} stroke={ink} strokeWidth="1.5" strokeDasharray="6 5" className="lattice-line" style={{ '--len': 520 }} />
          {g.stops.map((st, i) => (
            <g key={st.o}>
              <NodeG cx={pt(st.o)[0]} cy={pt(st.o)[1]} s={12} fill={st.c} stroke={ink} strokeWidth="1.5" className="snap" style={{ '--i': i + 2 }} />
              <text x={pt(st.o)[0] + (st.o > 0.9 ? -14 : 14)} y={pt(st.o)[1] + 6} fontSize="18" fill={ink} textAnchor={st.o > 0.9 ? 'end' : 'start'}>{i + 1}</text>
            </g>
          ))}
        </g>
      )}
      {g.light && (
        <g>
          <circle cx={g.light.cx * PW} cy={g.light.cy * PH} r="9" fill="none" stroke={ink} strokeWidth="1.5" />
          <text x={g.light.cx * PW + 16} y={g.light.cy * PH + 6} fontSize="18" fill={ink}>Light</text>
        </g>
      )}
      <text x={PW + 40} y="46" fontSize="22" fill={HEX.darkBlue}>{g.name}</text>
      <text x={PW + 40} y="74" fontSize="18" fill={HEX.muted}>{`Angle ${angleOf(g)}° · ${g.stops.length} stops`}</text>
      <rect x={BX} y="110" width={BW} height="110" fill={`url(#${idp}-bar-${g.id})`} />
      <rect x={BX} y="244" width={BW} height="1" fill={HEX.darkBlue} className="extend-x" />
      {g.stops.map((st, i) => (
        <g key={st.o}>
          <rect x={r2(BX + st.o * BW - 0.5)} y="220" width="1" height="24" fill={HEX.darkBlue} />
          <NodeG cx={BX + st.o * BW} cy={244.5} s={10} fill={HEX.darkBlue} className="snap" style={{ '--i': i + 3 }} />
          <text x={BX + st.o * BW} y={278 + (i % 2) * 52} fontSize="20" fill={HEX.darkBlue} textAnchor={st.o === 0 ? 'start' : st.o === 1 ? 'end' : 'middle'}>{`${i + 1} · ${r2(st.o * 100)}%`}</text>
          <text x={BX + st.o * BW} y={302 + (i % 2) * 52} fontSize="17" fill={HEX.muted} textAnchor={st.o === 0 ? 'start' : st.o === 1 ? 'end' : 'middle'}>{st.c}</text>
        </g>
      ))}
    </Art>
  );
}

function StopsTable({ g }) {
  const rows = g.stops.map((st, i) => ({ key: st.o, head: `Stop ${i + 1}`, cells: [`${r2(st.o * 100)}%`, st.c, st.n] }));
  return (
    <SpecTable
      compact
      caption={`${g.name}: stops`}
      columns={['Stop', 'Position', 'Colour', 'Made of']}
      rows={rows}
    />
  );
}

export default function Anatomy() {
  const picks = [gradById('fog'), gradById('sunset')];
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
