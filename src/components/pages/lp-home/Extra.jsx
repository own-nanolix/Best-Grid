import Link from 'next/link';
import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import SplitRow from '@/components/ui/SplitRow';
import Button from '@/components/ui/Button';
import { Rows } from '@/components/ui/Card';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { GuidesG, NodeG, NodeGridG } from '@/components/art/KeyArt';
import { Numeral } from '@/components/ui/Spec';
import { HEX, REPORT, TUBE, LINES, BRAND_FULL, CAPACITY } from '@/lib/brand';
import { Lines } from './Posters';
import s from './lp-home.module.css';

// Two more pieces of the case study continue the landing page in its own language: the annual report (m02) for
// "Nosotros" and the project tube (m07) for the services. Both are exportable drawings; their copy is as printed.

// m02: the report cover (Active Blue, Dark Blue type) with its Dark Blue spine on the left.
function ReportCover() {
  return (
    <Art viewBox="0 0 480 640" title="Annual report cover" exportName="lp-home-report-cover" lang="es">
      <rect width="480" height="640" fill={HEX.periwinkle} />
      <rect x="70" y="34" width="360" height="572" fill="#000000" opacity="0.14" transform="translate(10 12)" />
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
      <text x="394" y="500" fontSize="60" textAnchor="end" fill={HEX.darkBlue} className="display" letterSpacing="-1.5">{REPORT.years[0]}</text>
      <text x="394" y="560" fontSize="60" textAnchor="end" fill={HEX.darkBlue} className="display" letterSpacing="-1.5">{REPORT.years[1]}</text>
    </Art>
  );
}

// m07: the project tube, Dark Blue body, Active Blue lid with the mark, grey label with the printed services.
// The label's client company is a neutral quiet bar.
function TubeArt() {
  const rows = TUBE.services;
  return (
    <Art viewBox="0 0 360 640" title="Project tube with label" exportName="lp-home-tube" lang="es">
      <rect width="360" height="640" fill={HEX.periwinkle} />
      <ellipse cx="180" cy="596" rx="110" ry="12" fill="#000000" opacity="0.18" />
      <rect x="80" y="96" width="200" height="500" fill={HEX.darkBlue} />
      <rect x="80" y="96" width="34" height="500" fill="#000000" opacity="0.18" />
      <rect x="70" y="40" width="220" height="64" fill={HEX.activeBlue} />
      <MarkG x={150} y={50} size={44} fill={HEX.darkBlue} />
      <WordmarkG x={104} y={190} size={26} fill={HEX.onBlue} />
      <GuidesG w={360} h={640} xs={[104, 256]} ys={[214, 560]} stroke={HEX.activeBlue} weight={0.8} animate />
      <rect x="118" y="238" width="124" height="296" fill={HEX.labelGrey} className="fill-in" style={{ '--i': 8 }} />
      <g className="fade-in" style={{ '--i': 10 }}>
        <text x="128" y="262" fontSize="12" fontStyle="italic" fill={HEX.blueInk}>{TUBE.project}</text>
        <rect x="128" y="272" width="64" height="5" fill={HEX.darkBlue} opacity="0.25" />
        {rows.map((r, i) => (
          <text key={r} x="128" y={308 + i * 18} fontSize="9" fill={HEX.darkBlue}>{r}</text>
        ))}
        <Lines rows={TUBE.lineRows.map((r) => r.replace('Trabajamos en los puntos donde la red', 'Trabajamos en los puntos'))} x={128} y={386} size={8.5} lh={1.4} fill={HEX.darkBlue} />
        <text x="128" y="484" fontSize="10" fill={HEX.darkBlue}>{TUBE.date}</text>
        <text x="128" y="518" fontSize="9" fill={HEX.blueInk}>{TUBE.web}</text>
      </g>
      <NodeG cx={104} cy={214} s={6} fill={HEX.activeBlue} className="snap" style={{ '--i': 12 }} />
      <NodeG cx={256} cy={560} s={6} fill={HEX.activeBlue} className="snap" style={{ '--i': 13 }} />
    </Art>
  );
}

export function RowReport() {
  return (
    <SplitRow as="section" aria-labelledby="lp-home-report-title" ratio={[1, 1]} className={s.row} artClass={`${s.ground} field-periwinkle`} art={<div className={s.posterBox}><ReportCover /></div>}>
      <Reveal className={s.copy}>
        <p className="t-label">Annual report</p>
        <Rows rows={REPORT.titleRows} as="h2" id="lp-home-report-title" lang="es" className="t-h2" />
        <p lang="es" className="t-lead">{REPORT.lineRows.join(' ')}</p>
        <p className={s.links} lang="es">
          <Link href="/lp-annual-report/" className="link">{REPORT.titleRows.join(' ')}</Link>
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
