// Landing pages lean on alternating split rows of text and artwork (this project's direction). Each landing
// page composes them differently (ratios, order, rules, bleed); see LAYOUTS.md.
//
// <SplitRow art={<Art …/>} flip ratio={[5, 7]} ruled tone="dark">…text…</SplitRow>
// - flip: artwork on the left; ratio: [text, art] in fr; ruled: hairline (and a node) between the halves
// - tone: undefined | 'dark' | 'active' | 'periwinkle' | 'paper' | 'black' (the row's ground)
// - artClass / textClass for page-scoped styling; as="section" with aria-labelledby when it is a section
export default function SplitRow({ art, flip, ratio = [1, 1], ruled, tone, as: Tag = 'div', className = '', textClass = '', artClass = '', style, children, ...rest }) {
  const [first, second] = flip ? [ratio[1], ratio[0]] : ratio;
  const cls = ['split-row', flip && 'split-flip', ruled && 'split-ruled', tone && `field-${tone}`, className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} style={{ '--a': `${first}fr`, '--b': `${second}fr`, ...style }} {...rest}>
      <div className={`split-text ${textClass}`}>{children}</div>
      <div className={`split-art ${artClass}`}>{art}</div>
      {ruled && <span className="node split-node" aria-hidden="true" style={{ left: `${(first / (first + second)) * 100}%`, top: 0 }} />}
    </Tag>
  );
}
