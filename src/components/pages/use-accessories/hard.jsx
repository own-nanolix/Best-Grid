// Hard goods: mug, bottle, paper cup with sleeve, coaster stack. Round bodies carry a cylinder gradient whose
// highlight sits towards the spotlight (hl); print wraps the body and compresses towards its edges.
import { MarkG, WordmarkG, WORDMARK } from '@/components/art/Mark';
import { SheenG } from '@/components/art/Mockup';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { NEUTRAL, Cyl, mix, url } from './kit';

// Vertical bars wrapped round a cylinder of half-width a: positions follow sin, widths follow cos.
function WrapBars({ a, y, h, n = 11, fill, bar = 3.2 }) {
  return Array.from({ length: n }, (_, i) => {
    const t = ((i / (n - 1)) * 2 - 1) * 1.25, x = a * Math.sin(t), wd = bar * Math.cos(t);
    return <rect key={i} x={r2(x - wd / 2)} y={y} width={r2(Math.max(0.6, wd))} height={h} fill={fill} />;
  });
}

// ---- Mug: origin at the centre of the base. hand = 1 right, -1 left ---------------------------------------------------
export function Mug({ id, m, hl = 0.3, base = '#eef1f7', ink = HEX.darkBlue, band = HEX.activeBlue, hand = 1 }) {
  const body = 'M-75 -170V0A75 14 0 0 0 75 0V-170Z';
  const hd = `M${hand * 72} -142C${hand * 134} -148 ${hand * 134} -44 ${hand * 70} -36`;
  return (
    <g>
      <Cyl id={`${id}-cyl`} base={base} hl={hl} gloss={0.45} />
      <clipPath id={`${id}-c`}>
        <path d={body} />
      </clipPath>
      <path d={hd} fill="none" stroke={mix(base, '#000000', 0.45)} strokeWidth="21" />
      <path d={hd} fill="none" stroke={mix(base, '#000000', 0.12)} strokeWidth="16" />
      <path d={hd} fill="none" stroke={HEX.white} strokeWidth="2.5" opacity="0.35" transform={`translate(${hl < 0.5 ? -2 : 2} -2)`} />
      <path d={body} fill={`url(#${id}-cyl)`} />
      <g clipPath={`url(#${id}-c)`}>
        <rect x="-76" y="-66" width="152" height="34" fill={band} />
        <WrapBars a={75} y={-66} h={34} fill={base} bar={2.4} n={13} />
        <g transform="scale(0.9 1)">
          <MarkG x={-26} y={-148} size={52} fill={ink} />
        </g>
        <WordmarkG x={0} y={-82} size={15} fill={ink} anchor="middle" transform="scale(0.8 1)" />
        <rect x="-76" y="-12" width="152" height="12" fill={HEX.black} opacity="0.12" />
      </g>
      <SheenG idp={m} d={body} opacity={0.22} />
      <ellipse cx="0" cy="-170" rx="75" ry="14" fill={mix(base, '#ffffff', 0.3)} />
      <ellipse cx="0" cy="-170" rx="69" ry="11.5" fill={mix(base, '#000000', 0.4)} />
      <ellipse cx="0" cy="-166" rx="64" ry="8" fill={mix(base, '#000000', 0.62)} />
      <path d="M-75 -170A75 14 0 0 1 75 -170" fill="none" stroke={HEX.white} strokeWidth="1.4" opacity="0.5" />
    </g>
  );
}

// ---- Bottle: origin at the centre of the base ---------------------------------------------------------------------------
export function Bottle({ id, m, hl = 0.3, base = NEUTRAL.steel, ink = HEX.darkBlue, cap = HEX.darkBlue, word = HEX.darkBlue }) {
  const body = 'M-42 0V-228Q-42 -250 -20 -262V-284H20V-262Q42 -250 42 -228V0A42 9 0 0 1 -42 0Z';
  return (
    <g>
      <Cyl id={`${id}-cyl`} base={base} hl={hl} gloss={0.55} />
      <Cyl id={`${id}-cap`} base={cap} hl={hl} gloss={0.3} />
      <clipPath id={`${id}-c`}>
        <path d={body} />
      </clipPath>
      <path d={body} fill={`url(#${id}-cyl)`} />
      <g clipPath={`url(#${id}-c)`}>
        <g transform="scale(0.88 1)">
          <MarkG x={-21} y={-222} size={42} fill={ink} />
          <g transform="translate(10 -34) rotate(-90)">
            <WordmarkG x={0} y={0} size={30} fill={word} />
          </g>
        </g>
        <WrapBars a={42} y={-12} h={12} n={9} fill={ink} bar={3} />
        <rect x="-44" y="-262" width="88" height="4" fill={HEX.black} opacity="0.2" />
      </g>
      <SheenG idp={m} d={body} opacity={0.25} />
      <rect x="-22" y="-308" width="44" height="26" fill={`url(#${id}-cap)`} />
      {[-12, -4, 4, 12].map((x) => (
        <rect key={x} x={x - 0.6} y="-306" width="1.2" height="22" fill={HEX.black} opacity="0.35" />
      ))}
      <rect x="-23" y="-286" width="46" height="5" fill={NEUTRAL.steelDark} />
    </g>
  );
}

// ---- Paper cup with lid and printed sleeve: origin at the centre of the base, seen about 15 degrees above ----------------
export function Cup({ id, m, hl = 0.3, sleeve = HEX.activeBlue, ink = HEX.darkBlue }) {
  const rx = (y) => r2(34 + (14 * -y) / 120); // half-width at height y (0 at the base, -120 at the rim)
  const ry = (y) => r2(rx(y) * 0.26);
  const body = `M-48 -120L-34 0A34 ${ry(0)} 0 0 0 34 0L48 -120Z`;
  const ring = (y0, y1) => `M${-rx(y0)} ${y0}A${rx(y0)} ${ry(y0)} 0 0 0 ${rx(y0)} ${y0}L${rx(y1)} ${y1}A${rx(y1)} ${ry(y1)} 0 0 1 ${-rx(y1)} ${y1}Z`;
  const sl = ring(-86, -34);
  return (
    <g>
      <Cyl id={`${id}-cyl`} base="#f6f9ff" hl={hl} gloss={0.2} />
      <Cyl id={`${id}-sl`} base={sleeve} hl={hl} gloss={0.35} />
      <Cyl id={`${id}-lid`} base={HEX.darkBlue} hl={hl} gloss={0.4} />
      <clipPath id={`${id}-c`}>
        <path d={sl} />
      </clipPath>
      <path d={body} fill={`url(#${id}-cyl)`} />
      <path d={sl} fill={`url(#${id}-sl)`} />
      <g clipPath={`url(#${id}-c)`}>
        <g transform="scale(0.9 1)">
          <MarkG x={-17} y={-77} size={34} fill={ink} />
        </g>
        <WrapBars a={42} y={-48} h={12} n={11} fill={ink} bar={2} />
        <WrapBars a={42} y={-90} h={5} n={11} fill={ink} bar={2} />
      </g>
      <path d={`M${-rx(-86)} -86A${rx(-86)} ${ry(-86)} 0 0 0 ${rx(-86)} -86`} fill="none" stroke={HEX.black} strokeWidth="1.2" opacity="0.3" />
      <path d={`M-49 -120L-48 -128H48L49 -120A49 12.4 0 0 1 -49 -120Z`} fill={`url(#${id}-lid)`} />
      <path d="M-45 -128L-38 -140H38L45 -128Z" fill={`url(#${id}-lid)`} />
      <ellipse cx="0" cy="-140" rx="38" ry="9.8" fill={mix(HEX.darkBlue, '#ffffff', 0.18)} />
      <ellipse cx="0" cy="-140" rx="32" ry="7" fill={mix(HEX.darkBlue, '#000000', 0.3)} />
      <rect x={hl < 0.5 ? 6 : -16} y="-143" width="10" height="4" fill={HEX.black} opacity="0.7" />
      <SheenG idp={m} d={body} opacity={0.18} />
    </g>
  );
}

// ---- Stack of square coasters: origin at the centre of the bottom face; hw = half width ----------------------------------
export function CoasterStack({ id, m, hw = 64, n = 3, th = 7, top = HEX.darkBlue, ink = HEX.activeBlue }) {
  const hd = r2(hw * 0.3);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const y = -i * th, last = i === n - 1;
        return (
          <g key={i}>
            <rect x={-hw} y={y + hd - th} width={hw * 2} height={th + 0.5} fill={i % 2 ? NEUTRAL.corkDark : NEUTRAL.cork} filter={url(m, 'grit')} />
            <rect x={-hw} y={y - hd - th} width={hw * 2} height={hd * 2} fill={last ? top : i % 2 ? HEX.activeBlue : HEX.lightBlue} />
            <rect x={-hw} y={y - hd - th} width={hw * 2} height={hd * 2} fill={url(m, 'shade-v')} opacity="0.5" />
            {last && (
              <g transform={`translate(0 ${y - th}) scale(1 0.3)`}>
                <MarkG x={-hw * 0.34} y={-hw * 0.34} size={hw * 0.68} fill={ink} />
              </g>
            )}
          </g>
        );
      })}
      <rect x={-hw} y={hd - n * th + th} width={hw * 2} height="0.8" fill={HEX.white} opacity="0.25" />
    </g>
  );
}

export { WORDMARK };
