import Icon from '@/components/site/Icon';

// The card: a square sheet between hairlines. <Card title="Color system">…</Card>
// variant: 'paper' (default) | 'dark' | 'active' | 'cell' (the highlighted periwinkle cell) | 'line' (outline only).
// The title uses the heading tag given in `level` (default h3). icon="pylon" puts a pixel icon top right.
const CLASS = { paper: 'card', dark: 'card-dark', active: 'card-active', cell: 'card-cell', line: 'card-line' };
export default function Card({ title, icon, variant = 'paper', level = 'h3', as: Tag = 'div', className = '', children, ...rest }) {
  const H = level;
  return (
    <Tag className={`${CLASS[variant] || 'card'} ${className}`} {...rest}>
      {(title || icon) && (
        <div className="card-head">
          {title && <H className="t-h3">{title}</H>}
          {icon && <Icon name={icon} size={24} />}
        </div>
      )}
      {children}
    </Tag>
  );
}

// A line with its printed line breaks: <Rows rows={LINES.web.rows} /> renders one block span per row.
// as="h1" / "p" / …; lang="es" for brand copy.
export function Rows({ rows, as: Tag = 'span', className = '', ...rest }) {
  return (
    <Tag className={`t-rows ${className}`} {...rest}>
      {rows.map((r) => (
        <span key={r}>{r}</span>
      ))}
    </Tag>
  );
}

// The two-tone line of the Active Blue grounds (m12, m19, m22): the leading part `tone` light, the rest Dark Blue,
// with the printed line breaks. <TwoTone rows={LINES.box.rows} tone={LINES.box.tone} lang="es" />
// On other grounds pass lightClass / darkClass (for example 'muted' and '').
export function TwoTone({ rows, tone = '', as: Tag = 'p', lightClass = 'tone-light', darkClass = 'tone-dark', className = '', ...rest }) {
  let left = tone.length;
  const out = [];
  rows.forEach((r, i) => {
    const cut = Math.max(0, Math.min(r.length, left));
    left -= r.length + 1;
    const a = r.slice(0, cut).trimEnd(), b = r.slice(cut).trimStart();
    out.push(
      <span key={i} style={{ display: 'block' }}>
        {a && <span className={lightClass}>{a}</span>}
        {a && b ? ' ' : null}
        {b && <span className={darkClass}>{b}</span>}
      </span>,
    );
  });
  return (
    <Tag className={className} {...rest}>
      {out}
    </Tag>
  );
}

// A quiet placeholder line for a fact the case study does not publish. width in em.
export function Placeholder({ width = 6, label = 'Not published in the case study' }) {
  return <span className="ph" style={{ minWidth: `min(${width}em, 100%)` }} role="img" aria-label={label} />;
}
