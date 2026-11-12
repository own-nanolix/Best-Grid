import { ICONS, PIXEL32 } from './icons';
import { MARK_D } from '@/components/art/Mark';

// Hidden SVG sprite: the mark (#site-mark, viewBox 0 0 100 100), every 24-grid icon (#site-icon-<name>) and the
// case study's four 32-grid icons (#site-px-<name>). All are filled shapes in currentColor.
// Note: <use> references are fine in live UI; exportable artwork draws paths itself (MarkG, the PIXEL32 paths).
export default function Sprite() {
  return (
    <svg id="site-sprite" width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <symbol id="site-mark" viewBox="0 0 100 100">
          <path d={MARK_D} fill="currentColor" fillRule="evenodd" />
        </symbol>
        {Object.entries(ICONS).map(([name, d]) => (
          <symbol key={name} id={`site-icon-${name}`} viewBox="0 0 24 24">
            <path d={d} fill="currentColor" />
          </symbol>
        ))}
        {Object.entries(PIXEL32).map(([name, d]) => (
          <symbol key={name} id={`site-px-${name}`} viewBox="0 0 32 32">
            <path d={d} fill="currentColor" />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
