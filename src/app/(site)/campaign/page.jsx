import { pageMeta } from '@/lib/pages';
import Board from '@/components/pages/campaign/Board';
import s from '@/components/pages/campaign/campaign.module.css';

export const metadata = pageMeta('campaign');

export default function Page() {
  return (
    <section className="page" id="p-campaign" aria-label="Campaign">
      <header className="wrap">
        <div className={s.intro}>
          <h1 className="t-h1" tabIndex={-1}>Campaign</h1>
          <p className="t-lead muted">
            The posters of the case study rebuilt sheet by sheet, then extended into posts, stories and a profile grid in the same language of
            guide lines, nodes and two blues.
          </p>
        </div>
      </header>
      <Board />
    </section>
  );
}
