// Small helpers shared by every page.

// Copy text to the clipboard. Resolves true when it worked.
export async function copy(text) {
  try {
    await navigator.clipboard.writeText(String(text));
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = String(text);
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

// Numbers. The case study prints Spanish formats ("15.420 MW", "68%"); site labels in English may use fmt().
// fmt(15420) -> "15.420" (es, default); fmt(15420, 0, '', 'en') -> "15,420"; fmt(0.68, 0, '%') -> "68%"
export function fmt(n, decimals = 0, unit = '', locale = 'es') {
  const v = unit === '%' && Math.abs(n) <= 1 ? n * 100 : n;
  const s = v.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: 'always' });
  return unit === '%' ? s + '%' : unit ? `${s} ${unit}` : s;
}

// uid('logo-grad') -> "logo-grad-1": stable within a render pass; for ids prefer the page id prefix.
let n = 0;
export function uid(prefix = 'id') {
  n += 1;
  return `${prefix}-${n}`;
}

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const range = (count, fn = (i) => i) => Array.from({ length: count }, (_, i) => fn(i));

// hex "#5983ff" -> "89, 131, 255"
export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(', ');
}

// WCAG contrast ratio of two hex colours, as a number with two decimals.
export function contrast(a, b) {
  const lum = (hex) => {
    const c = hex.replace('#', '');
    const v = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  };
  const [x, y] = [lum(a), lum(b)];
  return Math.round(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)) * 100) / 100;
}

// True when animations should be skipped (reduced motion or SVG export mode).
export function still() {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('exporting') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Scroll smoothly to an element by id (pages never use plain #anchor links).
export function scrollToId(id) {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: still() ? 'auto' : 'smooth', block: 'start' });
}
