import Link from 'next/link';
import Art from '@/components/art/Art';
import { PixelIcon } from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import SplitRow from '@/components/ui/SplitRow';
import Button from '@/components/ui/Button';
import { Rows, TwoTone } from '@/components/ui/Card';
import { Cells, Numeral } from '@/components/ui/Spec';
import { PhoneG, WindowG, ScreenCapacityG, ScreenWebG } from '@/components/art/Devices';
import { PhotoBlockG, GuidesG } from '@/components/art/KeyArt';
import { HEX, LINES, TECH, CAPACITY, BUTTONS, BRAND_TAB, CONTACT, POSTERS } from '@/lib/brand';
import { seeded } from '@/lib/charts';
import { PosterDataCentre, PosterGeneration, PosterField, PosterClarity, EventScreen } from './Posters';
import s from './lp-home.module.css';

// Section 2 of m16: the four technology tiles as ruled cells, Data Centers highlighted (periwinkle fill).
export function Tiles() {
  return (
    <section className={s.tilesWrap} aria-label="Technology tiles">
      <Cells cols={4} open className={s.tiles}>
        {TECH.map((t, i) => (
          <Reveal key={t.key} delay={i * 60} className={`${s.tile} ${t.highlight ? 'cell-fill' : ''}`}>
            <PixelIcon name={t.icon} size={64} className={s.tileIcon} />
            <p lang="es" className={`${s.tileText} ink`}>
              <span>{t.label}</span>
              <span>{t.value}</span>
            </p>
          </Reveal>
        ))}
      </Cells>
    </section>
  );
}

// The full-width photo of m16 (the data centre), as a flat Dark Blue block with racks drawn in line art.
export function PhotoBand() {
  const rnd = seeded(11);
  const racks = (x0, n) =>
    Array.from({ length: n }, (_, i) => {
      const x = x0 + i * 34;
      return (
        <g key={x}>
          <rect x={x} y={24} width={28} height={232} fill="none" stroke={HEX.activeBlue} strokeOpacity="0.55" />
          {Array.from({ length: 10 }, (_, u) => (
            <g key={u}>
              <rect x={x + 5} y={34 + u * 22} width={14} height={3} fill={HEX.activeBlue} opacity="0.3" />
              {rnd() > 0.55 && <rect x={x + 21} y={34 + u * 22} width={3} height={3} fill={HEX.trail} />}
            </g>
          ))}
        </g>
      );
    });
  return (
    <section className={s.band} aria-label="Data centre">
      <Reveal from="none">
        <Art viewBox="0 0 1440 280" title="Data-centre corridor, photo block" exportName="lp-home-band">
          <rect width="1440" height="280" fill={HEX.black} />
          <PhotoBlockG x={0} y={0} w={1440} h={280} />
          <g>{racks(0, 20)}</g>
          <g>{racks(760, 20)}</g>
          <rect x="690" y="0" width="60" height="280" fill={HEX.fog} opacity="0.25" />
          <GuidesG w={1440} h={280} ys={[24, 256]} stroke={HEX.activeBlue} weight={0.8} animate />
        </Art>
      </Reveal>
    </section>
  );
}

// m09 left: text left, poster right. The poster's own copy is the headline of the row.
export function RowDataCentre() {
  const p = POSTERS.dataCentre;
  return (
    <SplitRow as="section" aria-labelledby="lp-home-dc-title" ratio={[1, 1]} artClass={`${s.ground} field-black`} className={s.row} art={<div className={s.posterBox}><PosterDataCentre /></div>}>
      <Reveal className={s.copy}>
        <p className="t-label">Poster, data centres</p>
        <Rows rows={p.head} as="h2" id="lp-home-dc-title" lang="es" className="t-h2" />
        <p lang="es" className="t-lead">{p.body.join(' ')}</p>
        <p lang="es" className="t-small ink">{p.tag}</p>
        <div className={s.btns}><Button href="/lp-data-centers/" variant="outline" lang="es">{BUTTONS.services}</Button></div>
      </Reveal>
    </SplitRow>
  );
}

// m09 right: art left (the Light Blue sheet), text right.
export function RowGeneration() {
  const p = POSTERS.generation;
  return (
    <SplitRow as="section" aria-labelledby="lp-home-gen-title" flip ratio={[1, 1]} artClass={`${s.ground} field-black`} className={s.row} art={<div className={s.posterBox}><PosterGeneration /></div>}>
      <Reveal className={s.copy}>
        <p className="t-label">Poster, generation</p>
        <Rows rows={p.head} as="h2" id="lp-home-gen-title" lang="es" className="t-h2" />
        <p lang="es" className="t-lead">{p.body.join(' ')}</p>
        <p lang="es" className="t-small ink">{p.tag.join(' ')}</p>
        <p className={s.links} lang="es">
          <Link href="/lp-solar/" className="link">{TECH[0].label}</Link>
          <Link href="/lp-wind/" className="link">{TECH[1].label}</Link>
        </p>
      </Reveal>
    </SplitRow>
  );
}

// m11 left: the field line, text left, Dark Blue poster right.
export function RowField() {
  const p = POSTERS.field;
  return (
    <SplitRow as="section" aria-labelledby="lp-home-field-title" ratio={[1, 1]} tone="periwinkle" artClass={`${s.ground} field-black`} className={s.row} art={<div className={s.posterBox}><PosterField /></div>}>
      <Reveal className={s.copy}>
        <p className="t-label">Poster, field work</p>
        <h2 id="lp-home-field-title" lang="es" className="t-h2">{p.head}</h2>
        <p lang="es" className="t-lead">{p.body.join(' ')}</p>
        <p lang="es" className="t-small muted">{p.email}</p>
        <div className={s.btns}><Button href="/lp-field/" variant="dark" lang="es">{BUTTONS.services}</Button></div>
      </Reveal>
    </SplitRow>
  );
}

// m11 right: the clarity line, art left, text right on Dark Blue.
export function RowClarity() {
  const p = POSTERS.clarity;
  return (
    <SplitRow as="section" aria-labelledby="lp-home-clarity-title" flip ratio={[1, 1]} tone="dark" artClass={`${s.ground} field-black`} className={s.row} art={<div className={s.posterBox}><PosterClarity /></div>}>
      <Reveal className={s.copy}>
        <p className="t-label">Poster, clarity</p>
        <Rows rows={p.head} as="h2" id="lp-home-clarity-title" lang="es" className="t-h2" />
        <p lang="es" className="t-lead">{p.body.join(' ')}</p>
        <div className={s.btns}><Button href="/lp-field/" variant="active" lang="es">{BUTTONS.evaluate}</Button></div>
      </Reveal>
    </SplitRow>
  );
}

// m17: the capacity figures of the case study (only 2025 has figures), the phone beside them.
export function Capacity() {
  return (
    <SplitRow as="section" aria-labelledby="lp-home-cap-title" ratio={[6, 5]} className={s.row} artClass={`${s.ground} field-periwinkle`} art={<div className={s.phoneBox}><PhoneArt /></div>}>
      <Reveal className={s.copy}>
        <p className="t-label">Dashboard, 2025</p>
        <Rows rows={CAPACITY.titleRows} as="h2" id="lp-home-cap-title" lang="es" className="t-h2" />
        <div lang="es">
          <p className="t-small muted">{CAPACITY.totalLabel}</p>
          <p className={`t-num t-num-l ${s.total}`}>
            <CountUp value="15.420" />
            <span className={s.unit}>MW</span>
          </p>
        </div>
        <Cells cols={3} className={s.kpis} lang="es">
          {CAPACITY.kpis.map((k) => (
            <div key={k.label}>
              <p className="t-small dark">{k.label}</p>
              <Numeral value={k.value} size="m" className="ink" />
            </div>
          ))}
        </Cells>
      </Reveal>
    </SplitRow>
  );
}

function PhoneArt() {
  return (
    <Art viewBox="-4 0 438 884" title="Phone: managed capacity dashboard" exportName="lp-home-phone-capacity" lang="es">
      <PhoneG idp="lp-home-ph" w={430}>
        <ScreenCapacityG idp="lp-home-cap" />
      </PhoneG>
    </Art>
  );
}

// m22: the connect pair on a Dark Blue band, the event screen below it.
export function Connect() {
  return (
    <section className={`${s.connect} field-dark`} aria-labelledby="lp-home-connect-title">
      <div className="wrap">
        <div className={s.connectText}>
          <Reveal>
            <TwoTone rows={LINES.connect.rows} tone={LINES.connect.tone} as="h2" id="lp-home-connect-title" lang="es" lightClass="on-dark" darkClass="blue" className="t-h1" />
          </Reveal>
          <Reveal delay={120}>
            <TwoTone rows={LINES.viable.rows} tone={LINES.viable.tone} lang="es" lightClass="on-dark" darkClass="blue" className="t-h3" />
          </Reveal>
          <Reveal delay={200}>
            <p className={s.btns}><Button href="/lp-storage/" variant="active" lang="es">{BUTTONS.evaluate}</Button></p>
          </Reveal>
        </div>
        <Reveal from="scale" className={s.eventBox}>
          <EventScreen />
        </Reveal>
        <p lang="es" className="t-micro muted">{CONTACT.handle} · {CONTACT.web}</p>
      </div>
    </section>
  );
}

// The original screen of m16 in the shared neutral window frame, rebuilt as one exportable drawing.
export function OriginalScreen() {
  return (
    <section className={`${s.screen} field-black`} aria-labelledby="lp-home-screen-title">
      <div className="wrap">
        <h2 id="lp-home-screen-title" className="t-h3">The home screen as published, in a neutral window</h2>
        <Reveal from="scale" className={s.screenBox}>
          <Art viewBox="0 0 1440 956" title="Website home screen in a neutral window frame" exportName="lp-home-screen" lang="es">
            <WindowG idp="lp-home-win" w={1440} tab={BRAND_TAB} address={CONTACT.webTab}>
              <ScreenWebG idp="lp-home-web" />
            </WindowG>
          </Art>
        </Reveal>
      </div>
    </section>
  );
}
