import Link from 'next/link';
import Art from '@/components/art/Art';
import { GuidesG, IconArtG, CrossingBandsG, NodeGridG } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import { Rows } from '@/components/ui/Card';
import { Numeral } from '@/components/ui/Spec';
import { HEX, TECH, LINES, BUTTONS, CAPACITY } from '@/lib/brand';
import s from './web-system.module.css';

// Three structurally different feature cards, from the case study's own tiles and words:
// 1. the technology tile of m16 (icon, label, value, highlighted cell), 2. a statement card on Dark Blue with the
// crossing bands (m05) and a button, 3. a KPI card of m17 with the node grid.
const solar = TECH[0];

export function TileArt() {
  return (
    <Art viewBox="0 0 320 180" title="Technology tile artwork: pixel icon on guides" exportName="web-system-card-tile-art" className={s.fcardArt}>
      <rect width={320} height={180} fill={HEX.statCell} />
      <GuidesG w={320} h={180} xs={[40, 280]} ys={[30, 150]} stroke={HEX.darkBlue} weight={1} node={6} animate />
      <IconArtG name="solar" px x={104} y={26} size={128} fill={HEX.darkBlue} className="fade-in" />
    </Art>
  );
}

export function BandsArt() {
  return (
    <Art viewBox="0 0 320 180" title="Crossing bands artwork on Dark Blue" exportName="web-system-card-bands-art" className={s.fcardArt}>
      <rect width={320} height={180} fill={HEX.darkBlue} />
      <CrossingBandsG idp="web-system-cb" w={320} h={180} cx={0.5} cy={0.5} band={0.05} r={0.1} />
    </Art>
  );
}

export function NodesArt() {
  return (
    <Art viewBox="0 0 340 170" title="Node grid artwork, no values" exportName="web-system-card-nodes-art" className={s.fcardArt}>
      <rect width={340} height={170} fill={HEX.paper} />
      <NodeGridG x={0} y={0} cols={10} rows={5} size={34} seed={5} clusters={5} animate />
    </Art>
  );
}

export default function FeatureCards() {
  return (
    <div className={s.cardGrid}>
      <article className={`${s.fcard} ${s.fcardTile} ${s.fcardHL}`} aria-labelledby="web-system-card-1">
        <TileArt />
        <div className={s.tileBody}>
          <h3 className="t-h3" id="web-system-card-1" lang="es">
            <Link href="/lp-solar/" className="link">{solar.label}</Link>
          </h3>
          <Numeral value="12.157" unit="MW" size="m" lang="es" />
        </div>
      </article>

      <article className={`${s.fcard} ${s.fcardText}`} aria-labelledby="web-system-card-2">
        <BandsArt />
        <h3 className="t-h2" id="web-system-card-2">
          <Rows rows={LINES.clarity.rows} lang="es" />
        </h3>
        <p lang="es" className="t-small" style={{ color: 'var(--muted-on-dark)' }}>{LINES.clarityBody.text}</p>
        <div>
          <Button href="/lp-field/" variant="active" lang="es">{BUTTONS.services}</Button>
        </div>
      </article>

      <article className={`${s.fcard} ${s.fcardKpi}`} aria-labelledby="web-system-card-3">
        <NodesArt />
        <h3 className="t-h3" id="web-system-card-3" lang="es" style={{ padding: '0 16px' }}>{CAPACITY.nodesTitle}</h3>
        <div className={s.kpiRow}>
          {CAPACITY.kpis.slice(0, 2).map((k) => (
            <div key={k.label} lang="es">
              <p className="t-small">{k.label}</p>
              <Numeral value={String(k.value)} size="s" className="blue" />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
