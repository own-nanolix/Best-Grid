import s from './web-system.module.css';

// A ruled bay of the workbench, labelled at its top-left node. width: 'full' | 'half' | 'third'.
export default function Bay({ id, no, title, width = 'full', dark, flush, note, children }) {
  const cls = [s.bay, width === 'half' && s.half, width === 'third' && s.third, dark && s.dark, flush && s.flush].filter(Boolean).join(' ');
  return (
    <section className={cls} aria-labelledby={`web-system-${id}-h`} id={`web-system-${id}`}>
      <h2 className={s.label} id={`web-system-${id}-h`}>
        <span className={s.labelNo}>{no}</span>
        <span>{title}</span>
      </h2>
      {children}
      {note && <p className={s.note}>{note}</p>}
    </section>
  );
}
