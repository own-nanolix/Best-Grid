import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import Icon from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import SplitRow from '@/components/ui/SplitRow';
import { Rows, TwoTone } from '@/components/ui/Card';
import { Cells } from '@/components/ui/Spec';
import { LINES, TUBE, CAPACITY, BUTTONS, NAV, PEOPLE } from '@/lib/brand';
import { TubeArt, VehicleArt, BillboardArt, BadgeArt, NodesArt, LabelFlatArt } from './FieldArt';
import s from './lp-field.module.css';

function Eyebrow({ n, children }) {
  return (
    <p className={`${s.eyebrow} t-label`}>
      <b>{n}</b>
      <i aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

// The three words of the poster as three split rows, each with its own piece of the brand in the field.
export function WordRows() {
  return (
    <div className="split-rows">
      <SplitRow as="section" aria-labelledby="lp-field-analisis" ratio={[5, 7]} ruled className={s.rowSec}
        art={<TubeArt />}>
        <Reveal>
          <Eyebrow n="01">Project tube</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="lp-field-analisis" className={s.word} lang="es">{LINES.fieldWords[0]}</h2>
        </Reveal>
        <Reveal delay={120}>
          <Rows rows={LINES.tube.rows} as="p" lang="es" className={s.lede} />
        </Reveal>
        <Reveal delay={180}>
          <ul className={s.services} lang="es">
            {TUBE.services.map((t, i) => (
              <li key={t}>
                <Icon name={['plug', 'study', 'node'][i]} size={22} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <p className={`${s.note} muted`}>The tube carries the rolled connection study: Active Blue rigid card, the mark on the lid, a grey label.</p>
      </SplitRow>

      <SplitRow as="section" aria-labelledby="lp-field-criterio" ratio={[5, 7]} flip ruled tone="periwinkle" className={s.rowSec}
        art={<VehicleArt />}>
        <Reveal>
          <Eyebrow n="02">Vehicle livery</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="lp-field-criterio" className={s.word} lang="es">{LINES.fieldWords[1]}</h2>
        </Reveal>
        <Reveal delay={120}>
          <Rows rows={LINES.clarityBody.rows} as="p" lang="es" className={s.lede} />
        </Reveal>
        <p className={`${s.note} muted`}>White body, Dark Blue roof: the mark on the rear quarter, the word-mark on the rear door.</p>
      </SplitRow>

      <SplitRow as="section" aria-labelledby="lp-field-validacion" ratio={[5, 7]} ruled tone="dark" className={s.rowSec}
        art={<BillboardArt />}>
        <Reveal>
          <Eyebrow n="03">Signage</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="lp-field-validacion" className={s.word} lang="es">{LINES.fieldWords[2]}</h2>
        </Reveal>
        <Reveal delay={120}>
          <Rows rows={LINES.billboard.rows} as="p" lang="es" className={s.lede} />
        </Reveal>
        <Reveal delay={180}>
          <div className="row">
            <Button href="/lp-storage/" variant="active" lang="es">{BUTTONS.evaluate}</Button>
            <Button href="/lp-home/" variant="ghost" lang="es">{BUTTONS.services}</Button>
          </div>
        </Reveal>
        <p className={`${s.note} muted`}>The panel under the overhang: a two-tone line, the hairline with its node and the word-mark.</p>
      </SplitRow>

      <SplitRow as="section" aria-labelledby="lp-field-badge-h" ratio={[6, 6]} flip ruled tone="periwinkle" className={s.rowSec}
        art={<BadgeArt />}>
        <Reveal>
          <Eyebrow n="04">Site badge</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="lp-field-badge-h" className={s.word} lang="es">{PEOPLE.elena.dept}</h2>
        </Reveal>
        <Reveal delay={120}>
          <Rows rows={PEOPLE.elena.roleRows} as="p" lang="es" className={s.lede} />
        </Reveal>
        <p className={`${s.note} muted`}>The badge worn on site: lanyard, holder and card, with the printed name, role and ID.</p>
      </SplitRow>
    </div>
  );
}

// The field paragraph on Active Blue: the first part light, the rest Dark Blue, as the case study sets its blue grounds.
export function FieldBand() {
  const [a, b] = [LINES.fieldBody.rows[0], `${LINES.fieldBody.rows[1]} ${LINES.fieldBody.rows[2]}`];
  return (
    <section className={`field-active ${s.band}`} aria-label="Field work">
      <span className={`${s.bandRule} ${s.bandRuleT} extend-x`} aria-hidden="true" />
      <div className="wrap">
        <Reveal>
          <p className={s.bandText} lang="es">
            <span className="tone-light">{a}</span> <span className="tone-dark">{b}</span>
          </p>
        </Reveal>
      </div>
      <span className={`${s.bandRule} ${s.bandRuleB} extend-x`} aria-hidden="true" style={{ '--i': 4 }} />
    </section>
  );
}

// The tube label laid flat, large: every printed line as on the tube, in a wide plate under a ruled head.
export function LabelRow() {
  return (
    <section className={`field-dark ${s.labelSec}`} aria-labelledby="lp-field-label-h">
      <div className={s.labelHead}>
        <Reveal>
          <Eyebrow n="05">Project label</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="lp-field-label-h" className={s.labelTitle} lang="es">{TUBE.project}</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className={s.labelMeta} lang="es">
            <span>{TUBE.date}</span>
            <span>{TUBE.web}</span>
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p className={`${s.note} ${s.noteDark}`}>Set vertically on the tube; turned here a quarter so it reads across.</p>
        </Reveal>
      </div>
      <Reveal className={s.labelArt} from="none">
        <LabelFlatArt />
      </Reveal>
    </section>
  );
}

// The node grid of m17's back phone, with its one printed figure: "Nudos analizados" 46.
export function NodesRow() {
  const kpi = CAPACITY.kpis[1];
  return (
    <SplitRow as="section" aria-labelledby="lp-field-nodes-h" ratio={[5, 7]} flip ruled tone="paper" className={s.rowSec}
      art={<NodesArt />} artClass="">
      <Reveal>
        <Eyebrow n="06">Node grid</Eyebrow>
      </Reveal>
      <Reveal delay={60}>
        <h2 id="lp-field-nodes-h" className="t-h1" lang="es">
          {CAPACITY.nodesTitleRows.map((r) => (
            <span key={r} style={{ display: 'block' }}>{r}</span>
          ))}
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <div className={s.statRow}>
          <CountUp value={String(kpi.value)} className="t-num t-num-xl ink" />
          <span className="t-body" lang="es">{kpi.label}</span>
        </div>
      </Reveal>
      <p className={`${s.note} muted`}>The cells are a drawing and carry no values; the count beside them is the one printed on the dashboard.</p>
    </SplitRow>
  );
}

// Closing on Active Blue: the event-screen pair, then the website buttons.
export function FieldClose() {
  return (
    <section className="field-active band" aria-labelledby="lp-field-close">
      <div className="wrap stack-lg">
        <Reveal>
          <h2 id="lp-field-close" className="t-display">
            <TwoTone rows={LINES.viable.rows} tone={LINES.viable.tone} as="span" lang="es" />
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="row">
            <Button href="/lp-storage/" variant="dark" lang="es">{BUTTONS.evaluate}</Button>
            <Button href="/lp-annual-report/" variant="ghost" lang="es">{NAV[2]}</Button>
            <Link className="link" href="/lp-home/" lang="es">{NAV[0]}</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// The four pieces of the field, as a ruled strip: the object, what it is made of, where it is seen.
const PIECES = [
  { n: '01', name: 'Project tube', note: 'Rigid card, Active Blue', icon: 'document' },
  { n: '02', name: 'Vehicle livery', note: 'Mark and word-mark', icon: 'pin' },
  { n: '03', name: 'Signage', note: 'Printed panel', icon: 'map' },
  { n: '04', name: 'Site badge', note: 'Lanyard and holder', icon: 'user' },
];

export function PiecesStrip() {
  return (
    <section className="field-paper band" aria-labelledby="lp-field-pieces">
      <div className="wrap stack-lg">
        <Reveal>
          <h2 id="lp-field-pieces" className="t-h2">The pieces in the field</h2>
        </Reveal>
        <Cells cols={4}>
          {PIECES.map((p, i) => (
            <Reveal key={p.n} delay={i * 60} className={s.hoverLift}>
              <div className={s.cellHead}>
                <span className="t-label">{p.n}</span>
                <Icon name={p.icon} size={26} />
              </div>
              <p className={s.cellText}>{p.name}</p>
              <p className="t-small muted">{p.note}</p>
            </Reveal>
          ))}
        </Cells>
      </div>
    </section>
  );
}
