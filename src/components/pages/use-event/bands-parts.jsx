// Wristband parts: the flat strip (fabric, with weave and stitching, or silicone, with gloss and deboss), the
// standing loop (a cylinder band seen from above, with real wall thickness) and the colourways.
import { SheenG } from '@/components/art/Mockup';
import { MarkG, MarkEmbossG, WordmarkFitG } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { rrect } from './kit';

export const COL = {
  active: { name: 'Active Blue', c: HEX.activeBlue, ink: HEX.darkBlue, mk: HEX.darkBlue, light: '#ffffff' },
  dark: { name: 'Dark Blue', c: HEX.darkBlue, ink: HEX.onBlue, mk: HEX.activeBlue, light: '#6a7bd0' },
  light: { name: 'Light Blue', c: HEX.lightBlue, ink: HEX.darkBlue, mk: HEX.activeBlue, light: '#ffffff' },
  peri: { name: 'Periwinkle', c: HEX.periwinkle, ink: HEX.darkBlue, mk: HEX.darkBlue, light: '#ffffff' },
};

// A direction rotated into the local frame of an object turned by `deg` (so cast shadows stay consistent).
export const locDir = (d, deg) => {
  const a = (-deg * Math.PI) / 180;
  return { x: r2(d.x * Math.cos(a) - d.y * Math.sin(a)), y: r2(d.x * Math.sin(a) + d.y * Math.cos(a)) };
};
export const pt = (cx, cy, deg, x, y) => {
  const a = (deg * Math.PI) / 180;
  return [r2(cx + x * Math.cos(a) - y * Math.sin(a)), r2(cy + x * Math.sin(a) + y * Math.cos(a))];
};

// The silicone-style deboss: a light edge and a shadow edge around the shape, on the band colour.
function Deboss({ idp, c, x, y, w, size, tag }) {
  return (
    <g>
      <MarkEmbossG idp={`${idp}-m${tag}`} x={x} y={y} size={size} paper={c} shade="#05071a" />
      <g opacity="0.28" transform="translate(0.9 1)"><WordmarkFitG x={x + size + 8} y={y + size * 0.78} w={w} fill="#05071a" /></g>
      <g opacity="0.5" transform="translate(-0.7 -0.7)"><WordmarkFitG x={x + size + 8} y={y + size * 0.78} w={w} fill="#ffffff" /></g>
      <WordmarkFitG x={x + size + 8} y={y + size * 0.78} w={w} fill={c} />
    </g>
  );
}

// The locking tab of a flat band: a plastic tab with a window and a metal rivet (fabric), a push stud (silicone).
function Lock({ idp, x, Wd, silicone }) {
  if (silicone) {
    return (
      <g>
        {[0, 1].map((i) => (
          <g key={i}>
            <circle cx={x + 20 + i * 22} cy="0" r="7.5" fill="#000000" opacity="0.35" />
            <circle cx={x + 20 + i * 22} cy="0" r="6" fill={`url(#${idp}-metal)`} />
          </g>
        ))}
      </g>
    );
  }
  return (
    <g>
      <path d={rrect(x, -Wd / 2 - 6, 72, Wd + 12, 6)} fill={`url(#${idp}-plastic)`} stroke="#000000" strokeOpacity="0.5" />
      <rect x={x + 8} y={-Wd / 2 + 4} width="34" height={Wd - 8} fill="#06081a" opacity="0.8" />
      <circle cx={x + 56} cy="0" r="7" fill={`url(#${idp}-metal)`} stroke="#4d5470" strokeWidth="0.75" />
      <circle cx={x + 56} cy="0" r="2.2" fill="#2b3159" />
      <path d={rrect(x + 1, -Wd / 2 - 5, 70, 5, 3)} fill="#ffffff" opacity="0.18" />
    </g>
  );
}

// A flat strip centred on the origin, lying along x.
export function Strip({ idp, tag = 'a', kind = 'fabric', L = 440, Wd = 40, tone = 'active', prints = 3 }) {
  const t = COL[tone];
  const x0 = -L / 2;
  const sil = kind === 'silicone';
  const d = sil ? rrect(x0, -Wd / 2, L, Wd, 12) : `M${x0} ${-Wd / 2}H${-x0}V${Wd / 2}H${x0}Z`;
  return (
    <g>
      <path d={d} fill={t.c} filter={sil ? undefined : `url(#${idp}-weave)`} />
      <path d={d} fill={`url(#${idp}-shade-v)`} opacity={sil ? 0.9 : 0.7} />
      {!sil && <path d={`M${x0 + 5} ${-Wd / 2 + 5}H${-x0 - 80}M${x0 + 5} ${Wd / 2 - 5}H${-x0 - 80}`} stroke={t.ink} strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="5 3.5" />}
      {sil && <rect x={x0 + 14} y={-Wd / 2 + 4} width={L - 28} height="3.5" rx="1.7" fill="#ffffff" opacity="0.32" filter={`url(#${idp}-soft)`} />}
      {sil ? (
        <Deboss idp={idp} c={t.c} x={x0 + 40} y={-12} w={84} size={24} tag={tag} />
      ) : (
        Array.from({ length: prints }, (_, i) => (
          <g key={i}>
            <MarkG x={x0 + 24 + i * 140} y={-11} size={22} fill={t.mk} />
            <WordmarkFitG x={x0 + 54 + i * 140} y={5} w={66} fill={t.ink} />
          </g>
        ))
      )}
      <Lock idp={idp} x={x0 + L - (sil ? 56 : 72)} Wd={Wd} silicone={sil} />
      {!sil && <rect x={x0} y={-Wd / 2} width="3" height={Wd} fill="#000000" opacity="0.25" />}
    </g>
  );
}

// A standing band seen from above: back wall, front wall, top rim with real thickness.
export function Loop({ idp, tag = 'l', rx = 130, ry = 50, h = 52, thick = 9, tone = 'active', silicone = false, side = 'l' }) {
  const t = COL[tone];
  const hh = h / 2;
  const ix = rx - thick, iy = (ry * ix) / rx;
  const front = `M${-rx} ${-hh}A${rx} ${ry} 0 0 0 ${rx} ${-hh}V${hh}A${rx} ${ry} 0 0 1 ${-rx} ${hh}Z`;
  const back = `M${-rx} ${-hh}A${rx} ${ry} 0 0 1 ${rx} ${-hh}V${hh}A${rx} ${ry} 0 0 0 ${-rx} ${hh}Z`;
  const rim = `M${-rx} ${-hh}A${rx} ${ry} 0 1 1 ${rx} ${-hh}A${rx} ${ry} 0 1 1 ${-rx} ${-hh}ZM${-ix} ${-hh}A${ix} ${iy} 0 1 1 ${ix} ${-hh}A${ix} ${iy} 0 1 1 ${-ix} ${-hh}Z`;
  const shade = `url(#${idp}-shade${side === 'l' ? '' : '-r'})`;
  const prints = [-0.58, 0.58];
  const wm = Math.round(rx * 0.62);
  return (
    <g>
      <path d={back} fill={t.c} />
      <path d={back} fill="#000000" opacity="0.42" />
      <path d={front} fill={t.c} filter={silicone ? undefined : `url(#${idp}-weave)`} />
      <path d={front} fill={shade} />
      <path d={front} fill={`url(#${idp}-shade-v)`} opacity="0.55" />
      {silicone && <rect x={side === 'l' ? -rx * 0.74 : rx * 0.66} y={-hh + ry * 0.55} width="7" height={h - 12} rx="3.5" fill="#ffffff" opacity="0.34" filter={`url(#${idp}-soft)`} />}
      {prints.map((p, i) => {
        const k = Math.sqrt(1 - p * p);
        return (
          <g key={p} transform={`translate(${r2(p * rx)} ${r2(ry * k)}) scale(${r2(k)} 1)`}>
            {silicone ? <MarkEmbossG idp={`${idp}-m${tag}${i}`} x={-11} y={-11} size={22} paper={t.c} shade="#05071a" /> : <MarkG x={-11} y={-11} size={22} fill={t.mk} />}
          </g>
        );
      })}
      <g transform={`translate(0 ${r2(ry)})`}>
        {silicone ? (
          <g>
            <g opacity="0.3" transform="translate(0.9 1)"><WordmarkFitG x={-wm / 2} y={6} w={wm} fill="#05071a" /></g>
            <g opacity="0.5" transform="translate(-0.7 -0.7)"><WordmarkFitG x={-wm / 2} y={6} w={wm} fill="#ffffff" /></g>
            <WordmarkFitG x={-wm / 2} y={6} w={wm} fill={t.c} />
          </g>
        ) : (
          <WordmarkFitG x={-wm / 2} y={6} w={wm} fill={t.ink} />
        )}
      </g>
      <path d={rim} fill={t.c} fillRule="evenodd" />
      <path d={rim} fill={t.light} opacity="0.22" fillRule="evenodd" />
      <path d={rim} fill={shade} fillRule="evenodd" />
      <path d={`M${-ix} ${-hh}A${ix} ${iy} 0 1 1 ${ix} ${-hh}A${ix} ${iy} 0 1 1 ${-ix} ${-hh}Z`} fill="none" stroke="#000000" strokeOpacity="0.4" strokeWidth="1.2" />
      <path d={`M${side === 'l' ? -rx : rx} ${-hh}A${rx} ${ry} 0 0 ${side === 'l' ? 1 : 0} ${r2(rx * (side === 'l' ? -0.35 : 0.35))} ${r2(-hh - ry * 0.94)}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.4" />
      <SheenG idp={idp} d={front} opacity={silicone ? 0.28 : 0.1} />
    </g>
  );
}
