import Button from '@/components/ui/Button';
import { SpecTable } from '@/components/ui/Spec';
import { BUTTONS, NAV_CTA } from '@/lib/brand';
import s from './web-system.module.css';

// Six variants of the shared Button, each in its states. Hover, focus and active are forced for display with
// classes that mirror the shared rules; disabled is the real attribute. The shared Button is never redefined.
const VARIANTS = [
  { key: 'fill', name: 'Fill', label: BUTTONS.evaluate, es: true, ground: s.grounded, hov: s.hovFill, props: {} },
  { key: 'outline', name: 'Outline', label: BUTTONS.services, es: true, ground: s.groundedDark, hov: s.hovOutline, props: { variant: 'outline' } },
  { key: 'dark', name: 'Dark', label: NAV_CTA, es: true, ground: s.grounded, hov: s.hovDark, props: { variant: 'dark' } },
  { key: 'active', name: 'Active', label: BUTTONS.evaluate, es: true, ground: s.grounded, hov: s.hovActive, props: { variant: 'active' } },
  { key: 'ghost', name: 'Ghost', label: BUTTONS.services, es: true, ground: s.groundedDark, hov: s.hovGhost, props: { variant: 'ghost' } },
  { key: 'icon', name: 'Icon only', label: null, ground: s.grounded, hov: s.hovFill, props: { icon: 'search', label: 'Search' } },
];
const STATES = ['Rest', 'Hover', 'Focus-visible', 'Active', 'Disabled'];

function Sample({ v, state }) {
  const cls = state === 'Hover' ? `${s.hov} ${v.hov}` : state === 'Focus-visible' ? s.foc : state === 'Active' ? s.act : '';
  const lang = v.es ? 'es' : undefined;
  return (
    <span className={v.ground}>
      <Button {...v.props} className={cls} disabled={state === 'Disabled'} tabIndex={-1} lang={lang}>
        {v.label}
      </Button>
    </span>
  );
}

export default function ButtonStates() {
  const rows = VARIANTS.map((v) => ({
    key: v.key,
    head: v.name,
    cells: STATES.map((st) => <Sample key={st} v={v} state={st} />),
  }));
  return (
    <>
      <SpecTable
        className={s.states}
        caption="Six variants, five states"
        columns={['Variant', ...STATES]}
        rows={rows}
      />
      <p className={s.note}>
        Hover, focus-visible and active are held on for display. Disabled is the real attribute. Sizes follow the shared
        small, default and large steps.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginTop: 18 }}>
        <Button size="sm" lang="es">{BUTTONS.services}</Button>
        <Button lang="es">{BUTTONS.services}</Button>
        <Button size="lg" lang="es">{BUTTONS.services}</Button>
      </div>
    </>
  );
}
