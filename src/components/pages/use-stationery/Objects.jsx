// Extensions in the case study's language: notebooks, the pen, the tri-fold panels and the report. Grid cells and
// hairlines, the mark, the lattice, the two blues and Light Blue. Fields the case study does not print are pale bars.
import { useId } from 'react';
import { r2 } from '@/lib/charts';
import { HEX, CONTACT, LINES, REPORT } from '@/lib/brand';
import { MarkG, WordmarkFitG, WordmarkG } from '@/components/art/Mark';

import { Rows, Sheet } from './kit';

const D = HEX.darkBlue, A = HEX.activeBlue, L = HEX.onBlue;

// A pale bar standing in for a field the case study does not print.
const Bar = ({ x, y, w, fill = D, o = 0.14 }) => <rect x={r2(x)} y={r2(y)} width={r2(w)} height="5" fill={fill} opacity={o} />;

// Notebook cover, A5 at 296 x 420. 'dark': the card-back manner (word-mark top right, mark bottom left).
// 'active': ruled cells on Active Blue with a node at every crossing.
export const NOTE = { w: 296, h: 420 };
export function NotebookG({ tone = 'dark', fill, filter }) {
  const { w, h } = NOTE, dark = tone === 'dark';
  const xs = [0, 1, 2, 3].map((i) => r2(28 + (i * (w - 56)) / 3));
  const ys = [0, 1, 2, 3, 4].map((i) => r2(34 + (i * (h - 150)) / 4));
  return (
    <g>
      <Sheet w={w} h={h} fill={fill || (dark ? D : A)} filter={filter} />
      {dark ? (
        <>
          <WordmarkFitG x={w - 26} y={62} w={150} anchor="end" fill={HEX.white} />
          <MarkG x={26} y={h - 72} size={46} fill={A} />
        </>
      ) : (
        <>
          {xs.map((x) => <rect key={x} x={x - 0.4} y={ys[0]} width="0.8" height={ys[4] - ys[0]} fill={L} opacity="0.7" />)}
          {ys.map((y) => <rect key={y} x={xs[0]} y={y - 0.4} width={xs[3] - xs[0]} height="0.8" fill={L} opacity="0.7" />)}
          {xs.flatMap((x) => ys.map((y) => <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" fill={D} />))}
          <WordmarkFitG x={28} y={h - 70} w={120} fill={D} />
          <MarkG x={w - 70} y={h - 90} size={40} fill={D} />
        </>
      )}
    </g>
  );
}

// The pen in its own length (540 x 28), tip on the left, drawn horizontally; the barrel is matte Dark Blue with the
// word-mark, a ring in Active Blue, and a metal clip. `idp` provides the material defs of the host plate.
export const PEN = { w: 540, h: 28 };
export function PenG({ idp }) {
  return (
    <g>
      <path d="M0 14L58 5V23Z" fill={`url(#${idp}-metal)`} />
      <path d="M58 3H410V25H58Z" fill={`url(#${idp}-plastic)`} />
      <path d="M410 1H540V27H410Z" fill={`url(#${idp}-plastic)`} />
      <rect x="402" y="1" width="9" height="26" fill={A} />
      <rect x="54" y="2" width="6" height="24" fill={`url(#${idp}-metal)`} />
      <WordmarkG x={150} y={19} size={14} fill={L} />
      <path d="M432 -3H530V0H436Z" fill={`url(#${idp}-metal)`} />
      <rect x="436" y="-1" width="94" height="4" fill={`url(#${idp}-metal)`} />
      <path d="M58 3H540V27H58Z" fill={`url(#${idp}-shade-v)`} />
      <rect x="64" y="5" width="470" height="1.4" fill={HEX.white} opacity="0.3" />
    </g>
  );
}

// Tri-fold panels, each 198 x 420 (99 x 210 mm): cover, inside and back. The inside panel is ruled cells and pale
// bars; the back carries the printed contact lines.
export const PANEL = { w: 198, h: 420 };
export function PanelG({ kind, fill, filter }) {
  const { w, h } = PANEL;
  if (kind === 'cover') {
    const t = LINES.envelope.rows;
    return (
      <g lang="es">
        <Sheet w={w} h={h} fill={fill || A} filter={filter} />
        <rect x="0" y="82.5" width={w} height="1" fill={HEX.white} opacity="0.5" />
        <rect x="0" y="334.5" width={w} height="1" fill={HEX.white} opacity="0.5" />
        <rect x="46.5" y="83" width="1" height="252" fill={HEX.white} opacity="0.5" />
        <rect x="44" y="332" width="6" height="6" fill={HEX.white} />
        <WordmarkFitG x={w - 16} y={56} w={140} anchor="end" fill={L} />
        <text x="62" y="108" fontSize="11" fill={L}>{t[0]}</text>
        <Rows rows={[t[1], t[2]]} x={62} y={122} size={11} lh={1.2} fill={D} />
        <MarkG x={w - 70} y={350} size={46} fill={D} />
      </g>
    );
  }
  if (kind === 'inside') {
    const ys = [60, 150, 240, 330];
    return (
      <g>
        <Sheet w={w} h={h} fill={fill || HEX.paper} filter={filter} />
        {ys.map((y) => <rect key={y} x="0" y={y - 0.4} width={w} height="0.8" fill={D} opacity="0.7" />)}
        <rect x="99" y="60" width="0.8" height="270" fill={D} opacity="0.7" />
        {ys.flatMap((y) => [18, 99, 180].map((x) => <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" fill={D} />))}
        {ys.slice(0, 3).flatMap((y, i) => [0, 1].map((c) => <Bar key={`${i}-${c}`} x={c ? 112 : 18} y={y + 22} w={c ? 62 - i * 8 : 52 + i * 10} />))}
        <MarkG x={w - 58} y={364} size={30} fill={A} />
      </g>
    );
  }
  return (
    <g lang="es">
      <Sheet w={w} h={h} fill={fill || D} filter={filter} />
      <MarkG x={24} y={36} size={40} fill={A} />
      <Rows rows={CONTACT.address} x={24} y={330} size={8.5} lh={1.4} fill={L} />
      <Rows rows={[CONTACT.phone, CONTACT.email]} x={24} y={366} size={8.5} lh={1.4} fill={L} />
      <text x="24" y="398" fontSize="8.5" fill={A}>{CONTACT.web}</text>
    </g>
  );
}

// Report cover, 420 x 590 (220 x 310 mm), as m02: the title in three lines, the closing line, "Best Grid Solutions" and
// the years bottom right. The title and the years are set in full and cropped by a clipPath at the cover edge, as they run off the cover's frame on the plate.
export const REPORT_FACE = { w: 420, h: 590 };
export function ReportCoverG({ tone = 'active', fill, filter }) {
  const { w, h } = REPORT_FACE, on = tone === 'active';
  const ink = on ? D : L, cid = 'use-stationery-rc' + useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <g lang="es">
      <Sheet w={w} h={h} fill={fill || (on ? A : D)} filter={filter} />
      <clipPath id={cid}><rect width={w} height={h} /></clipPath>
      <g clipPath={`url(#${cid})`}>
      <Rows rows={REPORT.titleRows} x={34} y={96} size={58} lh={1.1} fill={ink} />
      <Rows rows={REPORT.lineRows} x={34} y={330} size={12} lh={1.3} fill={ink} />
      <text x="34" y="376" fontSize="12" fill={ink}>{REPORT.signature}</text>
      <Rows rows={[REPORT.years[0]]} x={200} y={480} size={72} lh={1.05} fill={ink} />
      <Rows rows={[REPORT.years[1]]} x={287} y={556} size={72} lh={1.05} fill={ink} />
      </g>
    </g>
  );
}

// The spine strip, 590 x 64 along its length (head on the left): the Dark Blue mark at the head, a hairline, then
// IDAA and [24 – 25], and BGS at the foot, as m02 shows them.
export function ReportSpineG({ tone = 'active', fill, filter }) {
  const on = tone === 'active', ink = on ? A : D;
  return (
    <g lang="es">
      <Sheet w={590} h={64} fill={fill || (on ? D : A)} filter={filter} />
      <MarkG x={16} y={14} size={36} fill={on ? A : D} />
      <rect x="72" y="0" width="0.8" height="64" fill={ink} opacity="0.5" />
      <text x="190" y="38" fontSize="14" fill={on ? A : D}>{REPORT.spine}</text>
      <text x="290" y="38" fontSize="14" fill={on ? A : D}>{REPORT.range}</text>
      <text x="520" y="40" fontSize="20" fill={on ? A : D}>{REPORT.short}</text>
    </g>
  );
}
