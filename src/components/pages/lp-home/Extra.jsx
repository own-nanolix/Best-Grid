import Link from 'next/link';
import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import SplitRow from '@/components/ui/SplitRow';
import Button from '@/components/ui/Button';
import { Rows } from '@/components/ui/Card';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { GuidesG, NodeG, NodeGridG } from '@/components/art/KeyArt';
import { Numeral } from '@/components/ui/Spec';
import { HEX, REPORT, TUBE, LINES, BRAND_FULL, CAPACITY, mixHex } from '@/lib/brand';
import { Lines } from './Posters';
import s from './lp-home.module.css';

// Two more pieces of the case study continue the landing page in its own language: the annual report (m02) for
// "Nosotros" and the project tube (m07) for the services. Both are exportable drawings; their copy is as printed.

// m02: the report cover (Active Blue, Dark Blue type) with its Dark Blue spine on the left.
function ReportCover() {
  return (
    <Art viewBox="0 0 480 640" title="Annual report cover" exportName="lp-home-report-cover" lang="es">
      <rect width="480" height="640" fill={HEX.periwinkle} />
      <rect x="70" y="34" width="360" height="572" fill={HEX.black} opacity="0.14" transform="translate(10 12)" />
      <rect x="70" y="34" width="360" height="572" fill={HEX.activeBlue} />
      <rect x="40" y="34" width="30" height="572" fill={HEX.darkBlue} />
      <MarkG x={46} y={46} size={18} fill={HEX.activeBlue} />
      <g transform="translate(60 150) rotate(90)" fill={HEX.activeBlue} fontSize="10">
        <text x="0" y="0">{REPORT.spine}</text>
        <text x="48" y="0">{REPORT.range}</text>
      </g>
      <GuidesG w={480} h={640} xs={[94, 406]} ys={[58, 582]} stroke={HEX.darkBlue} weight={0.8} animate />
      <Lines rows={REPORT.titleRows} x={110} y={140} size={48} lh={1.06} fill={HEX.darkBlue} display className="fade-in" style={{ '--i': 6 }} />
      <Lines rows={REPORT.lineRows} x={110} y={330} size={13} lh={1.4} fill={HEX.darkBlue} />
      <text x="110" y="560" fontSize="12" fill={HEX.darkBlue}>{BRAND_FULL}</text>
      <text x="394" y="508" fontSize="48" textAnchor="end" fill={HEX.darkBlue} className="display" letterSpacing="-0.6">{REPORT.years[0]}</text>
      <text x="394" y="560" fontSize="48" textAnchor="end" fill={HEX.darkBlue} className="display" letterSpacing="-0.6">{REPORT.years[1]}</text>
    </Art>
  );
}

// m07: the project tube seen from above at an angle, as the middle tube: Dark Blue body, Active Blue lid with the
// Dark Blue mark, the word-mark set vertically on the body in light grey, and the grey label with its copy set
// vertically (reading upwards), a column rule with a node and the mark in the top-right cell, as printed. The
// label's client company is replaced by a quiet placeholder bar (another company's name is never shown).
function TubeArt() {
  const idp = 'lp-home-tube';
  // label layout measured on crop_m07_label (1120 x 1170 label units), drawn at k = 0.15
  const k = 0.15;
  const col = (x, y, size, text, extra = {}) => (
    <text key={text} transform={`translate(${x} ${y}) rotate(-90)`} fontSize={size} fill={HEX.blueInk} {...extra}>{text}</text>
  );
  return (
    <Art viewBox="0 0 360 640" title="Project tube with label" exportName="lp-home-tube" lang="es">
      <defs>
        <linearGradient id={`${idp}-body`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={HEX.black} stopOpacity="0.35" />
          <stop offset="0.35" stopColor={HEX.black} stopOpacity="0" />
          <stop offset="0.8" stopColor={HEX.black} stopOpacity="0.1" />
          <stop offset="1" stopColor={HEX.black} stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={`${idp}-label`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={HEX.white} stopOpacity="0.18" />
          <stop offset="0.6" stopColor={HEX.white} stopOpacity="0" />
          <stop offset="1" stopColor={HEX.black} stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <rect width="360" height="640" fill={HEX.periwinkleMock} />
      <rect x="50" y="150" width="260" height="490" fill={HEX.darkBlue} />
      <rect x="50" y="150" width="260" height="490" fill={`url(#${idp}-body)`} />
      <g transform="translate(116 760) rotate(-90)">
        <WordmarkG x={0} y={0} size={84} fill={HEX.onBlue} opacity="0.92" />
      </g>
      <ellipse cx="180" cy="150" rx="130" ry="56" fill={mixHex(HEX.darkBlue, HEX.stage, 0.65)} />
      <ellipse cx="180" cy="146" rx="122" ry="50" fill={HEX.activeBlue} />
      <ellipse cx="180" cy="150" rx="114" ry="44" fill={mixHex(HEX.activeBlue, HEX.blueInk, 0.3)} />
      <g transform="translate(180 150) scale(1 0.42) rotate(0)">
        <MarkG x={-58} y={-58} size={116} fill={HEX.darkBlue} />
      </g>
      <rect x="50" y="214" width="0.8" height="426" fill={HEX.activeBlue} opacity="0.7" className="extend-y" />
      <g transform="translate(130 236)">
        <rect width={1120 * k} height={1170 * k} fill={HEX.labelGrey} className="fill-in" style={{ '--i': 8 }} />
        <rect width={1120 * k} height={1170 * k} fill={`url(#${idp}-label)`} />
        <g transform={`scale(${k})`} className="fade-in" style={{ '--i': 10 }}>
          <rect x="875" y="0" width="5" height="1170" fill={HEX.activeBlue} />
          <rect x="878" y="348" width="242" height="5" fill={HEX.activeBlue} />
          <NodeG cx={878} cy={350} s={24} fill={HEX.activeBlue} />
          <MarkG x={935} y={110} size={120} fill={HEX.blueInk} />
          {col(150, 1100, 40, TUBE.project, { fontStyle: 'italic' })}
          <rect x="188" y="560" width="58" height="540" fill={HEX.blueInk} opacity="0.22" />
          {TUBE.services.map((r, i) => col(355 + i * 46, 1100, 32, r))}
          {TUBE.lineRows.map((r, i) => col(535 + i * 46, 1100, 32, r))}
          {col(865, 1100, 74, TUBE.date)}
          {col(1060, 1100, 44, TUBE.web)}
        </g>
      </g>
    </Art>
  );
}

export function RowReport() {
  return (
    <SplitRow as="section" aria-labelledby="lp-home-report-title" ratio={[1, 1]} className={s.row} artClass={`${s.ground} field-periwinkle`} art={<div className={s.posterBox}><ReportCover /></div>}>
      <Reveal className={s.copy}>
        <p className="t-label">Print</p>
        <h2 id="lp-home-report-title" className="t-h2">{REPORT.name}</h2>
        <p lang="es" className="t-lead">{REPORT.lineRows.join(' ')}</p>
        <p className={s.links}>
          <Link href="/lp-annual-report/" className="link">{REPORT.name}</Link>
        </p>
      </Reveal>
    </SplitRow>
  );
}

export function RowTube() {
  return (
    <SplitRow as="section" aria-labelledby="lp-home-tube-title" flip ratio={[1, 1]} tone="paper" className={s.row} artClass={`${s.ground} field-periwinkle`} art={<div className={s.tubeBox}><TubeArt /></div>}>
      <Reveal className={s.copy}>
        <p className="t-label">Project tube</p>
        <h2 id="lp-home-tube-title" lang="es" className="t-h2">{TUBE.project}</h2>
        <ul lang="es" className={s.list}>
          {TUBE.services.map((r) => (
            <li key={r} className="t-lead">{r}</li>
          ))}
        </ul>
        <p lang="es" className="t-body">{LINES.tube.text}</p>
        <div className={s.btns}><Button href="/lp-storage/" lang="es">{TUBE.services[0]}</Button></div>
      </Reveal>
    </SplitRow>
  );
}

// m17 back phone: the node grid (square cells, two strengths of Active Blue). No figures belong to single cells.
function NodesArt() {
  return (
    <Art viewBox="0 0 520 440" title="Node grid: distribution of activity" exportName="lp-home-node-grid" lang="es">
      <rect width="520" height="440" fill={HEX.cardGrey} />
      <NodeGridG x={30} y={30} cols={14} rows={11} size={34} seed={5} clusters={8} animate />
      <GuidesG w={520} h={440} xs={[30, 490]} ys={[30, 410]} stroke={HEX.darkBlue} weight={0.8} animate />
    </Art>
  );
}

export function RowNodes() {
  const parts = CAPACITY.treemap.parts.filter((p) => !p.unlabelled);
  return (
    <SplitRow as="section" aria-labelledby="lp-home-nodes-title" ratio={[1, 1]} className={s.row} artClass={`${s.ground} field-light`} art={<div className={s.nodesBox}><NodesArt /></div>}>
      <Reveal className={s.copy}>
        <p className="t-label">Node grid</p>
        <Rows rows={CAPACITY.nodesTitleRows} as="h2" id="lp-home-nodes-title" lang="es" className="t-h2" />
        <p lang="es" className="t-small dark">{CAPACITY.treemap.year} · {CAPACITY.treemap.title}</p>
        <dl lang="es" className={s.shares}>
          {parts.map((p) => (
            <div key={p.key}>
              <dt className="t-small muted">{p.labelRows.join(' ')}</dt>
              <dd><Numeral value={p.pct} sup="%" size="m" className="ink" /></dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </SplitRow>
  );
}
