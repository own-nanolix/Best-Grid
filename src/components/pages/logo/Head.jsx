import Reveal from '@/components/site/Reveal';
import s from './logo.module.css';

// A section head: a ruled row with a node on the rule, the number, the h2 and a one-line lead.
export default function Head({ id, no, title, lead }) {
  return (
    <header className={`guide-t ${s.head}`}>
      <span className="node" style={{ left: 0, top: 0 }} />
      <Reveal>
        <div className={s.headGrid}>
          <p className="t-label">{no}</p>
          <div className="stack">
            <h2 className="t-h2" id={id}>{title}</h2>
            {lead && <p className={`t-lead muted ${s.lead}`}>{lead}</p>}
          </div>
        </div>
      </Reveal>
    </header>
  );
}
