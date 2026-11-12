import Link from 'next/link';
import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { GuidesG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import Icon from '@/components/site/Icon';
import CopyValue from '@/components/site/CopyValue';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import { Rows } from '@/components/ui/Card';
import { HEX, LINES, WEB_HERO, CONTACT, NAV } from '@/lib/brand';
import Bay from '@/components/pages/web-system/Bay';
import ButtonStates from '@/components/pages/web-system/ButtonStates';
import { ButtonAnatomy, ChipAnatomy, RowAnatomy } from '@/components/pages/web-system/Anatomy';
import FeatureCards from '@/components/pages/web-system/FeatureCards';
import Tags from '@/components/pages/web-system/Tags';
import { DisclosureRows, DataRows } from '@/components/pages/web-system/ListRows';
import MegaMenu from '@/components/pages/web-system/MegaMenu';
import s from '@/components/pages/web-system/web-system.module.css';

export const metadata = pageMeta('web-system');

export default function Page() {
  return (
    <section className="page" id="p-web-system" aria-label="Web system">
      <header className={s.head}>
        <Art decorative viewBox="0 0 1440 360" exportName="web-system-head-guides" className={s.headArt} preserveAspectRatio="none">
          <GuidesG w={1440} h={360} xs={[96, 1344]} ys={[56, 304]} stroke={HEX.darkBlue} weight={1} node={6} animate />
        </Art>
        <div className="wrap">
          <div className={s.headInner}>
            <div className={s.headLead}>
              <p className={`t-label ${s.enter}`} style={{ '--i': 0 }}>Web</p>
              <h1 tabIndex={-1} className={`t-h1 ${s.enter}`} style={{ '--i': 2 }}>Web system</h1>
              <p className={`t-lead muted ${s.enter}`} style={{ '--i': 4 }}>
                A workbench of the site&apos;s components, each with its states, built from the website of the case study.
              </p>
            </div>
            <p className={`t-lead ${s.enter}`} style={{ '--i': 6 }} lang="es">
              <Rows rows={LINES.web.rows} />
            </p>
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className={s.bench}>
          <Bay id="buttons" no="01" title="Buttons" note="The primary, the outlined and the dark nav button are rebuilt from the website. The crosshair turns a quarter on hover.">
            <Reveal><ButtonStates /></Reveal>
          </Bay>

          <Bay id="anatomy" no="02" title="Anatomy" note="Measurements in CSS pixels are the shared classes' own values. Each drawing exports as SVG.">
            <Reveal>
              <div className={s.anaGrid}>
                <ButtonAnatomy />
                <ChipAnatomy />
                <RowAnatomy />
              </div>
            </Reveal>
          </Bay>

          <Bay id="nav" no="03" title="Navigation bar" flush>
            <div className={s.stack} style={{ marginTop: 8 }}>
              <div>
                <p className={s.navCap} style={{ paddingInline: 'clamp(14px, 2vw, 28px)' }}>Light, as the website</p>
                <LandingNav current="lp-field" tone="light" />
              </div>
              <div>
                <p className={s.navCap} style={{ paddingInline: 'clamp(14px, 2vw, 28px)' }}>Dark</p>
                <LandingNav current="lp-data-centers" tone="dark" className="field-dark" />
              </div>
            </div>
          </Bay>

          <Bay id="links" no="04" title="Links" width="half">
            <div className={s.linkList} lang="es">
              <div className={s.linkRow}>
                <span className={s.linkState} lang="en">Rest</span>
                <Link href="/lp-field/" className="link">{LINES.field}</Link>
              </div>
              <div className={s.linkRow}>
                <span className={s.linkState} lang="en">Hover</span>
                <Link href="/lp-field/" className={`link ${s.linkHov}`} tabIndex={-1}>{LINES.field}</Link>
              </div>
              <div className={s.linkRow}>
                <span className={s.linkState} lang="en">Focus-visible</span>
                <Link href="/lp-field/" className={`link ${s.linkFoc}`} tabIndex={-1}>{LINES.field}</Link>
              </div>
              <div className={s.linkRow}>
                <span className={s.linkState} lang="en">Disabled</span>
                <span className={`link ${s.linkDis}`} aria-disabled="true">{LINES.field}</span>
              </div>
              <div className={s.linkRow}>
                <span className={s.linkState} lang="en">With arrow</span>
                <Link href="/lp-home/" className={s.arrowLink}>
                  {NAV[0]}
                  <Icon name="arrow-right" size={18} />
                </Link>
              </div>
            </div>
          </Bay>

          <Bay id="tags" no="05" title="Tags" width="half">
            <Tags />
          </Bay>

          <Bay id="cards" no="06" title="Feature cards">
            <Reveal><FeatureCards /></Reveal>
          </Bay>

          <Bay id="block" no="07" title="Content block" width="half">
            <Reveal>
              <div className={s.block}>
                <div className={s.blockHead}>
                  <span lang="es">{CONTACT.web}</span>
                  <CopyValue value={CONTACT.email} label="e-mail address" />
                </div>
                <div className={s.blockBody}>
                  <div className={s.blockText} lang="es">
                    <h3 className="t-h3" style={{ marginBottom: 12 }}><Rows rows={LINES.web.rows} /></h3>
                    <p>{WEB_HERO.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </Bay>

          <Bay id="rows" no="08" title="List rows" width="half">
            <Reveal>
              <DisclosureRows />
              <p className={s.note}>Rows that carry a value.</p>
              <DataRows />
            </Reveal>
          </Bay>

          <Bay id="footer" no="09" title="Footer" flush>
            <div className={s.footWrap} style={{ marginTop: 8 }}>
              <LandingFooter />
            </div>
          </Bay>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
        <div className={s.bench}>
          <Bay id="mega" no="10" title="Mega menu, open" dark flush>
            <div style={{ marginTop: 8 }}>
              <MegaMenu />
            </div>
          </Bay>
        </div>
      </div>
    </section>
  );
}
