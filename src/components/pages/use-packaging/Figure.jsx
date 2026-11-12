import Reveal from '@/components/site/Reveal';
import { META } from './data';
import s from './use-packaging.module.css';

// One plate: the SVG on its stage, a caption with the plain name, and the spec rows as plain text underneath.
export default function Figure({ name, children }) {
  const m = META[name];
  return (
    <Reveal as="figure" className={s.plate}>
      <div className={`mock ${s.frame}`}>{children}</div>
      <figcaption className="mock-cap">
        <span>{`${m.no}  ${m.label}`}</span>
        <span>{m.rows[0].k}: {m.rows[0].v}</span>
      </figcaption>
      <dl className={s.specs}>
        {m.rows.map((r) => (
          <div key={r.k}>
            <dt>{r.k}</dt>
            <dd>{r.v}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
