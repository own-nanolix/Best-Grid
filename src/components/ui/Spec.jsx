// Spec-sheet helpers: the brand pages lean on spec tables with oversized numerals (this project's direction).
// Each page still builds its own grid around them; these only give the table, the numeral and the ruled cells.

// <Numeral value="15.420" unit="MW" size="l" />   size: s | m | l | xl (classes t-num-*); sup="%" for "68%"
// The figure is printed as given (Spanish format from brand.js). Wrap with CountUp for a counting figure.
export function Numeral({ value, unit, sup, size = 'l', as: Tag = 'span', className = '', ...rest }) {
  return (
    <Tag className={`t-num t-num-${size} ${className}`} {...rest}>
      {value}
      {sup && <span className="t-sup">{sup}</span>}
      {unit && <span style={{ fontSize: '0.36em', letterSpacing: 0, marginLeft: '0.18em' }}>{unit}</span>}
    </Tag>
  );
}

// <SpecTable caption="Color system" columns={['', 'HEX', 'RGB', 'CMYK']} rows={[{ key, head, num, cells: [...] }]} />
// - head: the row label (a <th scope="row">); num: an oversized figure shown in its own first cell (optional)
// - cells: the remaining cell contents (strings or nodes); align="right" on a column index via `right: [2, 3]`
// - tone: undefined (light) | 'dark' | 'active'; compact
// Wide tables scroll inside .spec-wrap instead of the page.
export function SpecTable({ caption, columns, rows, tone, compact, right = [], numFirst = false, className = '', ...rest }) {
  const cls = ['spec', tone && `spec-${tone}`, compact && 'spec-compact', className].filter(Boolean).join(' ');
  return (
    <div className="spec-wrap">
      <table className={cls} {...rest}>
        {caption && <caption>{caption}</caption>}
        {columns && (
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={`${c}-${i}`} scope="col" className={right.includes(i) ? 'spec-r' : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((r, ri) => (
            <tr key={r.key || ri}>
              {numFirst && r.num !== undefined && <td className="spec-num">{r.num}</td>}
              <th scope="row">{r.head}</th>
              {!numFirst && r.num !== undefined && <td className="spec-num">{r.num}</td>}
              {(r.cells || []).map((c, ci) => {
                const col = ci + 1 + (r.num !== undefined ? 1 : 0);
                return (
                  <td key={ci} className={right.includes(col) ? 'spec-r' : undefined}>
                    {c}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Ruled cells with a node at every crossing (the website rows, the KPI cells of m17).
// <Cells cols={4}><div>…</div>…</Cells>   open: lines run off the left edge; quiet: no nodes; line: colour
export function Cells({ cols = 3, open, quiet, line, as: Tag = 'div', className = '', style, children, ...rest }) {
  const cls = ['cells', open && 'cells-open', quiet && 'cells-quiet', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} style={{ '--cols': cols, ...(line ? { '--line': line } : null), ...style }} {...rest}>
      {children}
    </Tag>
  );
}
