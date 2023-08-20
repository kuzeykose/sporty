import PlanNavigation from '@/components/plan-navigation';
import { Plan } from '@/constants/Plans.type';
import { getPlan } from '@/services/plans';
import { ReactNode } from 'react';

export default async function PlanLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { programId: string; planId: string };
}) {
  const plan: Plan = params.planId && (await getPlan(params.programId, params.planId));

  console.log(plan);

  return (
    <div className="h-full space-y-2">
      <PlanNavigation plan={plan} />
      <div className="h-full border mb-2">{children}</div>
    </div>
  );
}
