'use client';

import { Plan } from '@/constants/Programs.type';
import { getPlans } from '@/services/plans';
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
    <div>
      {plans?.map((plan) => (
        <div>
          <h1>{plan.planName}</h1>
          <h1>{plan.planDescription}</h1>
          <h1>{plan.owner}</h1>
        </div>
      ))}
    </div>
  );
}
