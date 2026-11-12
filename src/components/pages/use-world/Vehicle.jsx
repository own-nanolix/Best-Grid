// Scene 5: the m20 livery on a generic five-door body in side elevation. The mark sits on the rear quarter, the
// word-mark low on the rear door (the photograph crops it; on the drawn body it sits whole inside the door), the roof
// panel in Dark Blue. No maker's details.
import { ShadowG, CalloutG, DimensionG, SpecColumnG, LitG, castDir } from '@/components/art/Mockup';
import { MarkG, WordmarkFitG } from '@/components/art/Mark';
import { Plate, BoltG } from './shared';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const IDP = 'use-world-vehicle';
const W = 1400, H = 800;
const SPOT = { x: 0.28, y: 0.05 };
const GROUND = 620;
const WHEELS = [250, 780];

const BODY = 'M92 562L92 484Q94 454 128 448L296 424L368 320Q378 292 402 290L800 290Q846 292 874 340L940 430Q960 456 960 486L960 562Z';
const ROOF = 'M296 424L368 320Q378 292 402 290L800 290Q846 292 874 340L912 418L330 418Z';
const GLASS = ['M338 410L384 324L556 324L556 410Z', 'M572 324L730 324L736 410L572 410Z', 'M750 324L840 326Q856 328 868 348L896 410L750 410Z'];

function Wheel({ cx }) {
  return (
    <g>
      <circle cx={cx} cy={GROUND - 58} r="68" fill="#07081a" />
      <circle cx={cx} cy={GROUND - 58} r="58" fill={`url(#${IDP}-rubber)`} />
      <circle cx={cx} cy={GROUND - 58} r="58" fill="none" stroke="#3a4066" strokeWidth="1.5" />
      <circle cx={cx} cy={GROUND - 58} r="47" fill="#0d1026" />
      <circle cx={cx} cy={GROUND - 58} r="38" fill={`url(#${IDP}-metal)`} />
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i * 72 - 90) * (Math.PI / 180);
        return <path key={i} d={`M${cx} ${GROUND - 58}L${r2(cx + Math.cos(a) * 36)} ${r2(GROUND - 58 + Math.sin(a) * 36)}`} stroke="#2a3160" strokeWidth="9" strokeLinecap="butt" />;
      })}
      <circle cx={cx} cy={GROUND - 58} r="12" fill={`url(#${IDP}-metal-dark)`} />
      <circle cx={cx} cy={GROUND - 58} r="38" fill="none" stroke="#ffffff" strokeOpacity="0.4" />
      <path d={`M${cx - 42} ${GROUND - 78}A47 47 0 0 1 ${cx + 20} ${GROUND - 102}`} stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" fill="none" />
    </g>
  );
}

export default function Vehicle() {
  const dir = castDir(SPOT, W, H, 520, GROUND);
  return (
    <Plate idp={IDP} title="Vehicle wrap on a generic body with the mark and the word-mark" exportName="use-world-vehicle" w={W} h={H} spot={SPOT} floor={0.78} split={0.72} no="05" label="Vehicle wrap">
      <defs>
        <linearGradient id={`${IDP}-paint`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#eef1f8" />
          <stop offset="1" stopColor="#b8bfd2" />
        </linearGradient>
        <linearGradient id={`${IDP}-glassfill`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a4580" />
          <stop offset="0.5" stopColor="#1b2043" />
          <stop offset="1" stopColor="#0d1026" />
        </linearGradient>
        <linearGradient id={`${IDP}-streak`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${IDP}-body`}><path d={BODY} /></clipPath>
        <clipPath id={`${IDP}-door`}><rect x="574" y="410" width="164" height="140" /></clipPath>
        <clipPath id={`${IDP}-glass-a`}><path d={GLASS[0]} /></clipPath>
        <clipPath id={`${IDP}-glass-b`}><path d={GLASS[1]} /></clipPath>
        <clipPath id={`${IDP}-glass-c`}><path d={GLASS[2]} /></clipPath>
      </defs>

      <rect x="28" y={GROUND - 2} width="1344" height="1.5" fill="#ffffff" opacity="0.12" />
      <ShadowG idp={`${IDP}-sh`} cx={526} cy={GROUND + 4} rx={470} ry={20} dir={dir} opacity={0.85} blur={12} />

      <LitG>
        {/* body in white paint, shaded to the ground, with the Dark Blue roof panel */}
        <path d={BODY} fill={`url(#${IDP}-paint)`} />
        <g clipPath={`url(#${IDP}-body)`}>
          <path d={ROOF} fill="#2a3266" />
          <path d={ROOF} fill={`url(#${IDP}-metal-dark)`} opacity="0.5" />
          <path d={ROOF} fill="none" stroke="#5a66a8" strokeWidth="3" opacity="0.9" />
          <rect x="92" y="528" width="868" height="34" fill="#2a3160" opacity="0.85" />
          <rect x="92" y="528" width="868" height="2" fill="#ffffff" opacity="0.25" />
          {/* panel shoulder line and the door seams */}
          <path d="M96 470L300 440L920 440" stroke="#9aa2ba" strokeWidth="1.2" fill="none" opacity="0.8" />
          {[340, 566, 742].map((x) => <path key={x} d={`M${x} 410L${x} 530`} stroke="#8a92ac" strokeWidth="1.6" />)}
          <path d="M742 410Q760 520 820 530" stroke="#8a92ac" strokeWidth="1.6" fill="none" />
          <path d="M92 484L160 480M880 470L960 486" stroke="#d6dbe8" strokeWidth="2" />
          <rect x="92" y="338" width="868" height="224" fill={`url(#${IDP}-shade-v)`} opacity="0.7" />

          {/* the livery (m20): a small mark on the rear quarter above the wheel arch, the word-mark low on the rear door */}
          <MarkG x={848} y={446} size={36} fill={HEX.darkBlue} />
          <g clipPath={`url(#${IDP}-door)`}>
            <WordmarkFitG x={580} y={508} w={148} fill={HEX.darkBlue} />
          </g>
        </g>

        {/* glass with a sheen, mirror, handles, lamps */}
        {GLASS.map((d, i) => (
          <g key={d}>
            <path d={d} fill={`url(#${IDP}-glassfill)`} />
            <g clipPath={`url(#${IDP}-glass-${['a', 'b', 'c'][i]})`}>
              <rect x={400 + i * 170} y="300" width="60" height="120" fill={`url(#${IDP}-streak)`} transform={`skewX(-24)`} opacity="0.9" className="mock-sheen" />
            </g>
            <path d={d} fill="none" stroke="#c9cfe0" strokeWidth="2" />
          </g>
        ))}
        <path d="M352 404L330 400L322 388L350 392Z" fill={HEX.darkBlue} />
        {[[452, 436], [630, 436]].map(([x, y]) => <rect key={x} x={x} y={y} width="40" height="6" fill={`url(#${IDP}-metal)`} />)}
        <path d="M940 446L956 458L958 500L936 500Z" fill="#3a3f5c" />
        <path d="M940 446L956 458L958 470L938 462Z" fill="#ffffff" opacity="0.28" />
        <path d="M96 470L94 492L124 488L126 466Z" fill="#cfd5e3" />
        <rect x="90" y="552" width="40" height="10" fill="#10132b" />
        <rect x="900" y="552" width="62" height="10" fill="#10132b" />
        <path d="M402 290L800 290" stroke="#b7bdcc" strokeWidth="3" />
        {WHEELS.map((cx) => <Wheel key={cx} cx={cx} />)}
        {[[250, 4], [780, 4]].map(([cx]) => <BoltG key={cx} x={cx} y={GROUND - 58} r={3} />)}
        <path d={BODY} fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
      </LitG>

      <DimensionG x1={92} y1={GROUND + 6} x2={960} y2={GROUND + 6} value="4 400 mm" offset={44} i={0} />
      <DimensionG x1={1010} y1={GROUND} x2={1010} y2={290} value="1 670 mm" offset={-22} i={1} />

      <CalloutG x={866} y={464} tx={1000} ty={720} side="left" label="Mark on the rear quarter" i={3} />
      <CalloutG x={650} y={496} tx={450} ty={645} side="left" label="Word-mark on the rear door" i={4} />
      <CalloutG x={600} y={296} tx={500} ty={210} side="left" label="Roof panel, Dark Blue" i={5} />

      <SpecColumnG x={1090} y={150} w={250} title="Vehicle wrap" rowH={46} i={6} rows={[
        { k: 'Film', v: 'Cast vinyl, 80 µm' },
        { k: 'Mark', v: '180 mm' },
        { k: 'Word-mark', v: '750 mm' },
        { k: 'Roof', v: 'Dark Blue' },
        { k: 'Finish', v: 'Gloss' },
        { k: 'Body', v: 'Generic five-door' },
      ]} />
    </Plate>
  );
}
