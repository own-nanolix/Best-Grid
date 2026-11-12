// The closing band: the three-cell footer of the posters (m11 right), "bestgrid.com | mark | bestgrid.com", drawn as
// one exportable SVG on Dark Blue, with the designer's credit beneath it.
import Art from '@/components/art/Art';
import { LockupFooterG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { BRAND, CONTACT, DESIGNER, HEX, PROJECT_TITLE } from '@/lib/brand';
import s from './overview.module.css';

export default function Colophon() {
  return (
    <section className={`field-dark ${s.colophon}`} aria-label="Credit">
      <div className="wrap">
        <Reveal from="scale">
          <div className={s.footerArt}>
            <Art viewBox="-10 10 1220 140" title="Poster footer: web address, mark, web address" exportName="overview-colophon">
              <LockupFooterG x={0} y={20} w={1200} h={120} fill={HEX.lightBlue} line={HEX.activeBlue} web={CONTACT.web} size={22} lang="es" />
            </Art>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p className={`t-small ${s.credit2}`}>
            {PROJECT_TITLE}. Brand identity for {BRAND} by {DESIGNER}, published April 15th 2026.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
