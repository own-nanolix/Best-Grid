import { pageMeta } from '@/lib/pages';
import Hero from '@/components/pages/strategy/Hero';
import { Timeline } from '@/components/pages/strategy/Timeline';
import ProblemStation from '@/components/pages/strategy/ProblemStation';
import ResearchStation from '@/components/pages/strategy/ResearchStation';
import SolutionStation from '@/components/pages/strategy/SolutionStation';
import ImpactStation from '@/components/pages/strategy/ImpactStation';
import Closing from '@/components/pages/strategy/Closing';

export const metadata = pageMeta('strategy');

export default function Page() {
  return (
    <section className="page" id="p-strategy" aria-label="Strategy">
      <Hero />
      <Timeline>
        <ProblemStation />
        <ResearchStation />
        <SolutionStation />
        <ImpactStation />
      </Timeline>
      <Closing />
    </section>
  );
}
