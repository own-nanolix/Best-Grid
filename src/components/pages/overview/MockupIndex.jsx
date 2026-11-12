// The index of every mockup and product: a long two-column spec table with plate numbers, each row linked to the
// chapter that shows it (the showcase, the campaign and the seven "use" chapters).
import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import { pageById, href } from '@/lib/pages';
import { MOCKUPS, plate } from './data';
import s from './overview.module.css';

const half = Math.ceil(MOCKUPS.length / 2);
const COLUMNS = [MOCKUPS.slice(0, half).map((m, i) => ({ ...m, i })), MOCKUPS.slice(half).map((m, i) => ({ ...m, i: i + half }))];

// How many plates each chapter holds, in order of first appearance (for the strip under the heading).
const BY_PAGE = MOCKUPS.reduce((acc, m) => {
  const hit = acc.find((a) => a.page === m.page);
  if (hit) hit.count += 1;
  else acc.push({ page: m.page, count: 1 });
  return acc;
}, []);

export default function MockupIndex() {
  return (
    <section className={`${s.band} ${s.mockups}`} aria-labelledby="overview-mockups-title">
      <div className="wrap">
        <div className={s.sectionHead}>
          <Reveal>
            <p className="t-label">Index of mockups and products</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="t-h2 t-balance" id="overview-mockups-title">
              {MOCKUPS.length} plates, from the phone to the project tube.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-lead muted">
              Each plate is one drawing on a dark stage with a single soft light. The numbers below follow the order of the chapters.
            </p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <ul className={s.tally} aria-label="Plates per chapter">
            {BY_PAGE.map((b) => (
              <li key={b.page}>
                <Link href={href(b.page)} className={s.tallyLink}>
                  <span className={`t-num t-num-s ${s.tallyNum}`}>{b.count}</span>
                  <span className="t-small">{pageById(b.page).title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={s.tables}>
          {COLUMNS.map((rows, ci) => (
            <Reveal key={ci} delay={ci * 80}>
              <div className="spec-wrap">
                <table className={`spec spec-compact ${s.mockTable}`}>
                  <caption>{ci === 0 ? 'Plates P01 to P' + String(half).padStart(2, '0') : 'Plates P' + String(half + 1).padStart(2, '0') + ' to P' + String(MOCKUPS.length)}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Plate</th>
                      <th scope="col">Mockup</th>
                      <th scope="col" className="spec-r">
                        Chapter
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((m) => (
                      <tr key={m.i}>
                        <td className={s.plateNo}>{plate(m.i)}</td>
                        <th scope="row">{m.name}</th>
                        <td className="spec-r">
                          <Link href={href(m.page)} className="link t-small">
                            {pageById(m.page).title}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
