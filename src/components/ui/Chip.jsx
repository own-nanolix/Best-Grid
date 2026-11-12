// The year chip of m17: a full pill, the only rounded element of the system.
// <Chip>2023</Chip>                         inactive (pale grey-blue)
// <Chip tone="active">2025</Chip>           tone: active | dark | line; size="sm"
// <Chip pressed={on} onClick={…}>2025</Chip> becomes a toggle button (use inside a client component)
// Accessibility: the active chip is printed white on Active Blue (3.4:1); here its label is Dark Blue (4.6:1).
export default function Chip({ children, tone, size, pressed, onClick, as: Tag = 'span', className = '', ...rest }) {
  const cls = ['chip', tone && `chip-${tone}`, size === 'sm' && 'chip-sm', className].filter(Boolean).join(' ');
  if (onClick || pressed !== undefined) {
    return (
      <button type="button" className={cls} aria-pressed={pressed} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
