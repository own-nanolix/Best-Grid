import Art from '@/components/art/Art';
import { MarkG, WordmarkG, LockupCellG, WORDMARK } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './logo.module.css';

// m21: the mark alone, Active Blue on Dark Blue, centred, 31% of the slide width, on the slide's own 3:4 portrait
// sheet (3283 x 4376 in the case study).
export function MarkPlate() {
  const W = 1200, H = 1600, size = r2(W * 0.31);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Primary mark: Active Blue on Dark Blue, 31% of the width" exportName="logo-mark-primary" className={s.plate}>
      <rect width={W} height={H} fill={HEX.darkBlue} />
      <MarkG x={r2((W - size) / 2)} y={r2((H - size) / 2)} size={size} fill={HEX.activeBlue} />
    </Art>
  );
}

// The word-mark plate: set once, large, Dark Blue on Light Blue (the face is the brand typeface, medium cut).
export function WordmarkPlate() {
  const W = 1600, H = 560, size = 250;
  const baseline = r2(H / 2 + (size * WORDMARK.cap) / 2);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Word-mark: Best Grid in Dark Blue on Light Blue" exportName="logo-wordmark" className={s.plate}>
      <rect width={W} height={H} fill={HEX.lightBlue} />
      <WordmarkG x={W / 2} y={baseline} size={size} anchor="middle" fill={HEX.darkBlue} />
    </Art>
  );
}

// The primary lockup: the mark in one grid cell and the word-mark in the next, as the first cell of the website nav
// (m16) and the poster columns (m09, m10). Lines and nodes of the cell run to the edge of the box.
export function LockupPlate() {
  const W = 1200, H = 560, k = 1.5;
  const y = r2((H - 160 * k) / 2);
  const x = r2((W - 640 * k) / 2);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Primary lockup: mark cell and word-mark cell" exportName="logo-lockup-primary" className={s.plate}>
      <rect width={W} height={H} fill={HEX.lightBlue} />
      <LockupCellG x={x} y={y} scale={k} fill={HEX.darkBlue} line={HEX.darkBlue} />
    </Art>
  );
}

// The primary section: the portrait mark plate beside the word-mark and lockup plates.
export default function Primary() {
  return (
    <div className={s.primary}>
      <Reveal>
        <figure className={s.fig}>
          <MarkPlate />
          <figcaption className={s.cap}><span>Mark</span><span>Active Blue on Dark Blue, 31% of the width</span></figcaption>
        </figure>
      </Reveal>
      <div className={s.primaryStack}>
        <Reveal>
          <figure className={s.fig}>
            <WordmarkPlate />
            <figcaption className={s.cap}><span>Word-mark</span><span>Brand typeface, medium cut, tight spacing</span></figcaption>
          </figure>
        </Reveal>
        <Reveal delay={80}>
          <figure className={s.fig}>
            <LockupPlate />
            <figcaption className={s.cap}><span>Primary lockup</span><span>Mark cell, then word-mark cell</span></figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  );
}
