import PlanNavigation from '@/components/plan-navigation';
import { Plan } from '@/constants/Plans.type';
import { getPlan } from '@/services/plans';

export default async function PlanLayout({ children, params }: any) {
  const plan: Plan = params.planId && (await getPlan(params.programId, params.planId));

  return (
    <div className="h-full space-y-2">
      <PlanNavigation plan={plan} />
      <div className="h-full border mb-2">{children}</div>
    </div>
  );
}
