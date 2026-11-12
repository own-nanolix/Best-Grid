// Opening of the strategy: the title, the designer's own premise, and the four stations as a ruled index.
// The premise is the designer's sentence from the project description, quoted exactly.
import { StationNav } from './Timeline';
import { STATIONS } from './data';
import s from './strategy.module.css';

export default function Hero() {
  return (
    <header className={s.hero}>
      <span className={s.heroNodeA} aria-hidden="true" />
      <span className={s.heroNodeB} aria-hidden="true" />
      <div className={`wrap ${s.heroGrid}`}>
        <div className={s.heroText}>
          <p className={`t-label ${s.heroIn}`} style={{ '--i': 0 }}>
            Chapter 09
          </p>
          <h1 tabIndex={-1} className={`t-display ${s.heroTitle} ${s.heroIn}`} style={{ '--i': 1 }}>
            Strategy.
          </h1>
          <figure className={`${s.premise} ${s.heroIn}`} style={{ '--i': 3 }}>
            <blockquote className="t-h2 t-balance">Technical complexity is not the problem—lack of structure is.</blockquote>
            <figcaption className="t-small muted">
              From the designer&apos;s description: &ldquo;The project is built around a clear idea: technical complexity is not the problem—lack of structure is.&rdquo;
            </figcaption>
          </figure>
        </div>
        <div className={`${s.heroIndex} ${s.heroIn}`} style={{ '--i': 5 }}>
          <p className="t-label">Four stations</p>
          <StationNav items={STATIONS} />
        </div>
      </div>
    </header>
  );
}
