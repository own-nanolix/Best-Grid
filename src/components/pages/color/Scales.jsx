import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import CopyValue from '@/components/site/CopyValue';
import { SpecTable } from '@/components/ui/Spec';
import { PALETTE, HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { PRIMARY, NEUTRAL, RAMP, ladder, inkOn, ratio, ratioText, grade, rgbBars } from './data';
import s from './color.module.css';

// A spec table of colours: token, swatch, HEX, RGB, contrast of the colour as type on Light Blue and on Dark Blue.
export function ColourTable({ rows, caption, tone, id }) {
  const cell = (hex, ground) => {
    const r = ratio(hex, ground);
    return (
      <span className={s.ratio}>
        <b>{ratioText(r)}</b> {grade(r)}
      </span>
    );
  };
  return (
    <SpecTable
      id={id}
      caption={caption}
      tone={tone}
      columns={['Token', 'Swatch', 'HEX', 'RGB', 'On Light Blue', 'On Dark Blue', 'Origin']}
      rows={rows.map((c) => ({
        key: c.token,
        head: (
          <span>
            {c.name}
            <br />
            <code className={s.token}>{c.token}</code>
          </span>
        ),
        cells: [
          <span key="sw" className={s.sw} style={{ background: c.hex }} aria-hidden="true" />,
          <span key="hx" className="spec-num-s">
            <CopyValue value={c.hex} label={`${c.name} hex`} />
          </span>,
          <CopyValue key="rgb" className={s.nowrap} value={rgbBars(c.hex)} label={`${c.name} RGB`} />,
          cell(c.hex, HEX.lightBlue),
          cell(c.hex, HEX.darkBlue),
          c.status,
        ],
      }))}
    />
  );
}

// Three big swatch cards with the HEX as an oversized numeral (exportable).
export function SwatchCards() {
  const W = 1200;
  const H = 520;
  const cw = W / 3;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The three published colours as swatch cards" exportName="color-swatches">
      <rect width={W} height={H} fill={HEX.periwinkle} />
      {PALETTE.map((p, i) => {
        const light = i === 2;
        const ink = light ? HEX.darkBlue : HEX.onBlue;
        // small type on Active Blue is Dark Blue (light grey-white reads 2.8:1 there); the large hex keeps its colour
        const small = i === 1 ? HEX.darkBlue : ink;
        const x = i * cw;
        return (
          <g key={p.token}>
            <rect x={r2(x + 24)} y="24" width={r2(cw - 48)} height={H - 48} fill={p.hex} className="fill-in" style={{ '--i': i * 3 }} />
            <g fill={ink} className="fade-in" style={{ '--i': i * 3 + 4 }}>
              <text x={r2(x + 52)} y="84" fontSize="22" fill={small}>{p.name}</text>
              <text x={r2(x + 52)} y="318" fontSize="74" className="display" letterSpacing="-2">{p.hex}</text>
              <g fill={small}>
                <text x={r2(x + 52)} y="372" fontSize="20">RGB {rgbBars(p.hex)}</text>
                <text x={r2(x + 52)} y="402" fontSize="20" xmlSpace="preserve">CMYK {p.cmyk}</text>
                <text x={r2(x + 52)} y="432" fontSize="20">HEX {p.hex}</text>
              </g>
            </g>
          </g>
        );
      })}
      {[1, 2].map((k) => (
        <NodeG key={k} cx={k * cw} cy={H / 2} s={9} fill={HEX.darkBlue} className="snap" style={{ '--i': k }} />
      ))}
    </Art>
  );
}

// A tint-and-shade ladder from one colour: 4 tints, the base, 4 shades (exportable).
export function Ladder({ base, name, slug }) {
  const steps = ladder(base);
  const W = 1350;
  const H = 260;
  const cw = W / steps.length;
  return (
    <div className={s.ladder}>
      <Art viewBox={`0 0 ${W} ${H}`} title={`${name}: tints toward white and shades, computed`} exportName={`color-ladder-${slug}`}>
        <rect width={W} height={H} fill={HEX.paper} />
        {steps.map((st) => {
          const x = st.i * cw;
          return (
            <g key={st.label}>
              <rect x={r2(x)} y="0" width={r2(cw)} height={H} fill={st.hex} className="fill-in" style={{ '--i': st.i }} />
              <g fill={st.ink} className="fade-in" style={{ '--i': st.i + 4 }}>
                <text x={r2(x + 14)} y="36" fontSize="17">{st.label}</text>
                <text x={r2(x + 14)} y={H - 46} fontSize="20" className="display">{st.hex}</text>
                <text x={r2(x + 14)} y={H - 20} fontSize="15">{ratioText(ratio(st.hex, st.ink))}</text>
              </g>
              {st.base && <NodeG cx={r2(x + cw / 2)} cy="120" s={11} fill={st.ink} className="snap" style={{ '--i': 8 }} />}
            </g>
          );
        })}
      </Art>
      <ul className={s.hexRow} aria-label={`${name} steps`}>
        {steps.map((st) => (
          <li key={st.label}>
            <span className={s.sw} style={{ background: st.hex }} aria-hidden="true" />
            <CopyValue value={st.hex} label={`${name} ${st.label} hex`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// The neutral scale: the sampled neutrals as a strip, over the computed Dark Blue to Light Blue ramp (exportable).
export function NeutralScale() {
  const W = 1350;
  const H = 440;
  const cw = W / NEUTRAL.length;
  const rw = W / RAMP.length;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Neutral scale: sampled neutrals and the Dark Blue to Light Blue ramp" exportName="color-neutral-scale">
      <rect width={W} height={H} fill={HEX.darkBlue} />
      {NEUTRAL.map((c, i) => {
        const ink = inkOn(c.hex);
        return (
          <g key={c.token}>
            <rect x={r2(i * cw)} y="0" width={r2(cw)} height="260" fill={c.hex} stroke={HEX.activeBlue} strokeWidth="1" className="fill-in" style={{ '--i': i }} />
            <text x={r2(i * cw + 12)} y="30" fontSize="15" fill={ink} className="fade-in" style={{ '--i': i + 4 }}>{c.name.length > 14 ? c.name.slice(0, 13) + '.' : c.name}</text>
            <text x={r2(i * cw + 12)} y="240" fontSize="17" fill={ink} className="fade-in" style={{ '--i': i + 4 }}>{c.hex}</text>
          </g>
        );
      })}
      {RAMP.map((c) => (
        <g key={c.i}>
          <rect x={r2(c.i * rw)} y="290" width={r2(rw)} height="150" fill={c.hex} stroke={HEX.activeBlue} strokeWidth="1" className="fill-in" style={{ '--i': c.i + 4 }} />
          <text x={r2(c.i * rw + 10)} y="425" fontSize="15" fill={c.ink} className="fade-in" style={{ '--i': c.i + 8 }}>{c.hex}</text>
        </g>
      ))}
      <text x="0" y="278" fontSize="14" fill={HEX.mutedOnDark}>Ramp from Dark Blue to Light Blue, computed</text>
    </Art>
  );
}

export { PRIMARY, NEUTRAL };
