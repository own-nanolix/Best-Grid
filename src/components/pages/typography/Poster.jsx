import Art from '@/components/art/Art';
import { MarkG, NodeG, WordmarkG } from '@/components/art/Mark';
import { SpecTable } from '@/components/ui/Spec';
import { HEX, LINES, CONTACT } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { POSTER } from './data';
import s from './typography.module.css';

const { w: W, h: H, frame, foot } = POSTER;
const pct = (px) => `${r2((px / W) * 100)}%`;

// Hierarchy in use: the right-hand poster of m11 (Active Blue, Dark Blue type) rebuilt on a 720 x 960 sheet, with
// numbered tags that point to the rows of the spec column beside it.
export function PosterArt() {
  const [wm, head, body, foo] = POSTER.parts;
  const tag = (n, y) => (
    <g key={n}>
      <rect x="10" y={y - 9} width="18" height="18" fill={HEX.darkBlue} className="snap" style={{ '--i': n + 6 }} />
      <text x="19" y={y + 4.6} fontSize="12" textAnchor="middle" fill={HEX.activeBlue}>{n}</text>
    </g>
  );
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Type hierarchy on the Active Blue poster: word-mark, headline, body and footer" exportName="typography-poster">
      <rect width={W} height={H} fill={HEX.activeBlue} />
      <g fill={HEX.darkBlue}>
        <rect x="0" y={frame.y0 - 0.5} width={W} height="1" className="extend-x" />
        <rect x="0" y={foot.y0 - 0.5} width={W} height="1" className="extend-x" style={{ '--i': 1 }} />
        <rect x="0" y={foot.y1 - 0.5} width={W} height="1" className="extend-x" style={{ '--i': 2 }} />
        {[frame.x0, frame.x1].map((x, i) => (
          <rect key={x} x={x - 0.5} y="0" width="1" height={H} className="extend-y" style={{ '--i': i + 1 }} />
        ))}
        {[255, 465].map((x) => (
          <rect key={x} x={x - 0.5} y={foot.y0} width="1" height={foot.y1 - foot.y0} className="extend-y" style={{ '--i': 3 }} />
        ))}
      </g>
      {[[frame.x0, frame.y0], [frame.x1, frame.y0], ...foot.xs.flatMap((x) => [[x, foot.y0], [x, foot.y1]])].map(([x, y], i) => (
        <NodeG key={`${x}-${y}`} cx={x} cy={y} s={7} fill={HEX.darkBlue} className="snap" style={{ '--i': i }} />
      ))}
      <WordmarkG x={W / 2 + 0} y={155} size={wm.size} fill={HEX.darkBlue} anchor="middle" />
      <g fill={HEX.darkBlue} textAnchor="middle" lang="es">
        {LINES.clarity.rows.map((t, i) => (
          <text key={t} x={W / 2} y={r2(393 + i * head.size * head.lh)} fontSize={head.size} letterSpacing={r2(head.size * head.ls)} className="display slide-up" style={{ '--i': i + 4 }}>{t}</text>
        ))}
        {LINES.clarityBody.rows.map((t, i) => (
          <text key={t} x={W / 2} y={r2(711 + i * body.size * body.lh)} fontSize={body.size} className="fade-in" style={{ '--i': i + 8 }}>{t}</text>
        ))}
        {[foot.xs[0], foot.xs[2]].map((x, i) => (
          <text key={x} x={r2(x + (foot.xs[i * 2 + 1] - x) / 2)} y="877" fontSize={foo.size} className="fade-in" style={{ '--i': 10 }} lang="en">{CONTACT.web}</text>
        ))}
      </g>
      <MarkG x={W / 2 - 17} y={(foot.y0 + foot.y1) / 2 - 17} size={34} fill={HEX.darkBlue} />
      {tag(1, 142)}
      {tag(2, 378)}
      {tag(3, 706)}
      {tag(4, 874)}
    </Art>
  );
}

// The spec column: one row per numbered part, with sizes as a share of the sheet width (as the case study's own
// proportions: headline about 5%, micro about 1.1%).
export function PosterSpec() {
  return (
    <SpecTable
      id="typography-poster-spec"
      caption="Measured from the poster, on a sheet 720 units wide"
      columns={['No.', 'Part', 'Weight', 'Size', 'Share of width', 'Leading', 'Tracking, em']}
      rows={POSTER.parts.map((p) => ({
        key: p.n,
        head: <span className={s.tag}>{p.n}</span>,
        cells: [p.name, p.weight, `${p.size} u`, pct(p.size), p.lh ? p.lh.toFixed(2) : 'Single line', p.ls.toString()],
      }))}
    />
  );
}
