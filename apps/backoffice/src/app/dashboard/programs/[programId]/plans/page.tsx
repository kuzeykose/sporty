'use client';

import { PlanCard } from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { Plan } from '@/constants/Programs.type';
import { getPlans } from '@/services/plans';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>();

  const params = useParams();
  const programId = params.programId;

  useEffect(() => {
    (async () => {
      getPlans(programId as string).then((res) => {
        setPlans(res);
      });
    })();
  }, []);

  return (
    <div className="overflow-auto space-y-4">
      <Button>New Plan</Button>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
        {plans?.map((plan) => (
          <Link href={`/dashboard/programs/${programId}/plans/${plan.planId}`}>
            <PlanCard title={plan.planName} description={plan.planDescription} status={plan.status} />
          </Link>
        ))}
      </div>
    </div>
  );
}
