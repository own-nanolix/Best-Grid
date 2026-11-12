'use client';

import { useEffect, useState } from 'react';
import Art from '@/components/art/Art';
import { BrandDefs, TrailsG, IconArtG } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import { Rows } from '@/components/ui/Card';
import { HEX, LINES, WEB_HERO, BUTTONS, mixHex } from '@/lib/brand';
import { still } from '@/lib/site';
import s from './lp-home.module.css';

// The hero of m16: the line and the body left, a photo slider right (transmission towers with light trails at
// sunset: the photograph is not reproduced, a drawn stand-in takes its place), the column guide with its node.
// The slider keeps m16's controls: an Active Blue pill plus white dots, and a round pause button.

const SLIDES = [
  { pylons: [[80, 140, 300], [360, 230, 190], [520, 270, 150]], count: 8, sag: 0.06 },
  { pylons: [[30, 170, 260], [300, 200, 230], [560, 290, 120]], count: 7, sag: 0.08 },
  { pylons: [[150, 120, 320], [430, 250, 170]], count: 9, sag: 0.05 },
  { pylons: [[60, 230, 200], [250, 160, 280], [500, 250, 160]], count: 6, sag: 0.1 },
];
const INTERVAL = 4800;

function SlideArt({ i, exportName }) {
  const sl = SLIDES[i];
  const idp = `lp-home-sl${i}`;
  return (
    <Art
      viewBox="0 0 664 526"
      title="Slider: towers and light trails at sunset"
      exportName={exportName}
      decorative={!exportName}
      className={s.slide}
    >
      <BrandDefs idp={idp} />
      <rect width="664" height="526" fill={`url(#${idp}-sunset)`} />
      <TrailsG w={664} h={526} count={sl.count} y0={0.12} y1={0.52} sag={sl.sag} />
      {sl.pylons.map(([x, y, size]) => (
        <IconArtG key={`${x}-${y}`} name="pylon" x={x} y={y} size={size} fill={mixHex(HEX.darkBlue, HEX.stage, 0.45)} />
      ))}
      <rect x="0" y="470" width="664" height="56" fill={mixHex(HEX.stageLight, HEX.black, 0.75)} opacity="0.55" />
    </Art>
  );
}

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || still()) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className={s.hero} aria-labelledby="lp-home-title">
      <div className={s.heroText}>
        <Rows rows={LINES.web.rows} as="h1" id="lp-home-title" tabIndex={-1} lang="es" className={`${s.h1} slide-up`} style={{ '--i': 2 }} />
        <p lang="es" className={`${s.body} ink slide-up`} style={{ '--i': 5 }}>{WEB_HERO.body}</p>
        <div className={`${s.btns} slide-up`} style={{ '--i': 8 }}>
          <Button href="/lp-field/" size="sm" lang="es">{BUTTONS.evaluate}</Button>
          <Button href="/lp-data-centers/" variant="outline" size="sm" lang="es">{BUTTONS.services}</Button>
        </div>
      </div>
      <div className={s.heroSlider}>
        <div className={s.sliderFrame}>
          {SLIDES.map((_, i) => (
            <div key={i} className={s.slideWrap} data-on={i === idx ? 'true' : 'false'}>
              <SlideArt i={i} exportName={i === 0 ? 'lp-home-slider' : undefined} />
            </div>
          ))}
          <div className={s.sliderBar}>
            <div className={s.dots} role="group" aria-label="Slides">
              {SLIDES.map((_, i) => (
                <button key={i} type="button" className={s.dot} data-on={i === idx ? 'true' : 'false'} aria-label={`Slide ${i + 1}`} aria-current={i === idx ? 'true' : undefined} onClick={() => setIdx(i)} />
              ))}
            </div>
            <button type="button" className={s.pause} aria-label={paused ? 'Play slider' : 'Pause slider'} aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
              <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                {paused ? <path d="M3 1h2v10H3zM5 3h2v6H5zM7 4h2v4H7z" fill={HEX.darkBlue} /> : <path d="M3 2h2.4v8H3zM6.6 2H9v8H6.6z" fill={HEX.darkBlue} />}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* the column guide with its nodes: lines extend first, then the nodes snap in */}
      <span className={`${s.vline} extend-y`} aria-hidden="true" />
      <span className={`${s.hline} extend-x`} aria-hidden="true" style={{ '--i': 6 }} />
      <span className={`node snap ${s.nodeTop}`} aria-hidden="true" style={{ '--i': 6 }} />
      <span className={`node snap ${s.nodeMid}`} aria-hidden="true" style={{ '--i': 10 }} />
    </section>
  );
}
