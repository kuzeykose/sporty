import { PlanCard } from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { Plan } from '@/constants/Plans.type';
import { getPlans } from '@/services/plans';
import Link from 'next/link';
import React from 'react';

type PlansParams = {
  params: {
    programId: string;
  };
};

export default async function Plans({ params }: PlansParams) {
  const plans = await getPlans(params.programId);

  return (
    <div className="overflow-auto space-y-4">
      <Button>New Plan</Button>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
        {plans?.map((plan: Plan) => (
          <Link href={`/dashboard/programs/${params.programId}/plans/${plan.planId}`}>
            <PlanCard title={plan.planName} description={plan.planDescription} status={plan.status} />
          </Link>
        ))}
      </div>
    </div>
  );
}
