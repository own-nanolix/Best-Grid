// <Icon name="pylon" /> draws a sprite icon (24 grid, filled pixel bars). Pass label="..." when the icon carries
// meaning on its own. Inside a larger SVG use <IconUse name x y size /> instead.
// <PixelIcon name="solar" /> draws one of the case study's own four icons on its 32 grid (m15, m16).
export default function Icon({ name, size = 24, label, className, style }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} {...a11y}>
      <use href={`#site-icon-${name}`} />
    </svg>
  );
}

export function IconUse({ name, x = 0, y = 0, size = 24, ...rest }) {
  return <use href={`#site-icon-${name}`} x={x} y={y} width={size} height={size} {...rest} />;
}

export function PixelIcon({ name, size = 48, label, className, style }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' };
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} style={style} {...a11y}>
      <use href={`#site-px-${name}`} />
    </svg>
  );
}

export function PixelIconUse({ name, x = 0, y = 0, size = 32, ...rest }) {
  return <use href={`#site-px-${name}`} x={x} y={y} width={size} height={size} {...rest} />;
}
