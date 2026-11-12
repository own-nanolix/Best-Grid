import Art from '@/components/art/Art';
import { NodeG } from '@/components/art/Mark';
import CopyValue from '@/components/site/CopyValue';
import { SpecTable } from '@/components/ui/Spec';
import { BRAND } from '@/lib/brand';
import { SEMANTIC, ratio, ratioText, grade } from './data';
import s from './color.module.css';

const token = (mode, name) => SEMANTIC[mode].rows.find((r) => r[0] === name)[1];

// A small layout in one mode: ground, a card, type, a link, the accent button and a hairline with its node.
function Preview({ mode }) {
  const t = (n) => token(mode, n);
  const W = 520;
  const H = 360;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`Semantic tokens in ${mode} mode`} exportName={`color-semantic-${mode}`}>
      <rect width={W} height={H} fill={t('color-bg')} />
      <rect x="28" y="28" width={W - 56} height="212" fill={t('color-surface')} className="fill-in" style={{ '--i': 1 }} />
      <text x="52" y="74" fontSize="13" fill={t('color-text-muted')}>{BRAND}</text>
      <text x="52" y="128" fontSize="36" className="display" letterSpacing="-0.8" fill={t('color-text')}>Surface and type</text>
      <text x="52" y="162" fontSize="15" fill={t('color-text-muted')}>Muted caption on the surface</text>
      <text x="52" y="200" fontSize="15" fill={t('color-link')} textDecoration="underline">A link in blue ink</text>
      <rect x="28" y="268" width="150" height="44" fill={t('color-accent')} className="fill-in" style={{ '--i': 3 }} />
      <text x="48" y="296" fontSize="15" fill={t('color-on-accent')}>Accent button</text>
      <rect x="28" y="332" width={W - 56} height="1.2" fill={t('color-rule')} className="extend-x" style={{ '--i': 4 }} />
      <NodeG cx="28" cy="332.6" s={7} fill={t('color-rule')} className="snap" style={{ '--i': 5 }} />
      <NodeG cx={W - 28} cy="332.6" s={7} fill={t('color-rule')} className="snap" style={{ '--i': 6 }} />
    </Art>
  );
}

// One column of a facing pair: the preview artwork over a spec table of the tokens in that mode.
function Column({ mode }) {
  const m = SEMANTIC[mode];
  const dark = mode === 'dark';
  return (
    <div className={`${s.semCol} ${dark ? 'field-dark' : 'field-light'}`}>
      <h3 className="t-h3">{m.label}</h3>
      <Preview mode={mode} />
      <SpecTable
        tone={dark ? 'dark' : undefined}
        compact
        caption={`${m.label} tokens`}
        columns={['Token', 'Value', 'Role', 'Contrast on its ground']}
        rows={m.rows.map(([name, hex, ground, role]) => {
          const r = ground ? ratio(hex, ground) : null;
          return {
            key: name,
            head: <code className={s.token}>{name}</code>,
            cells: [
              <CopyValue key="v" value={hex} label={`${m.label} ${name}`} />,
              role,
              r ? `${ratioText(r)} ${grade(r)}` : name === 'color-bg' ? 'Ground' : 'Surface',
            ],
          };
        })}
      />
    </div>
  );
}

export default function Semantic() {
  return (
    <div className={s.sem}>
      <Column mode="light" />
      <Column mode="dark" />
    </div>
  );
}

