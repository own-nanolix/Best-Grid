import Link from 'next/link';
import Icon from '@/components/site/Icon';

// The website button (m16): square, label first, then the Active Blue crosshair.
// <Button>Evaluar proyecto</Button>                     pale fill (the primary of m16)
// <Button variant="outline">Ver servicios</Button>      variants: fill (default) | outline | dark | active | ghost
// <Button href="/lp-home/">…</Button>                    renders a next/link
// <Button icon="search" label="Search" />                square icon button (label required when icon-only)
// size="sm" | "lg", block, cross={false} hides the crosshair, iconRight="arrow-right" replaces it.
// Spanish labels from the case study get lang="es" (pass it through).
export default function Button({ children, variant = 'fill', size, block, href, icon, iconRight, cross = true, label, className = '', type = 'button', ...rest }) {
  const iconOnly = !children && (icon || iconRight);
  const cls = ['btn', variant !== 'fill' && `btn-${variant}`, size === 'sm' && 'btn-sm', size === 'lg' && 'btn-lg', block && 'btn-block', iconOnly && 'btn-icon', className].filter(Boolean).join(' ');
  const s = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
  const tail = iconRight ? <Icon name={iconRight} size={s} className="btn-x" /> : cross && children ? <Icon name="crosshair" size={s} className="btn-x" /> : null;
  const inner = (
    <>
      {icon && <Icon name={icon} size={s + 2} />}
      {children && <span>{children}</span>}
      {tail}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={label} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} aria-label={label} {...rest}>
      {inner}
    </button>
  );
}
