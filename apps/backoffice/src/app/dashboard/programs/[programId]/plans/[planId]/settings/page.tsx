import { getPlan } from '@/services/plans';
import React from 'react';

type PlanSettingsParams = {
  params: {
    programId: string;
    planId: string;
  };
};

export default async function PlanSettings({ params }: PlanSettingsParams) {
  const plans = await getPlan(params.programId, params.planId);

  return (
    <div>
      <ul>
        {plans.map((plan: any) => (
          <>
            <h1>SETTINGS PAGE</h1>
            <li>{plan?.planName}</li>
            <li>{plan?.planDescription}</li>
            <li>{plan?.planNote}</li>
            <li>{plan?.createdAt}</li>
          </>
        ))}
      </ul>
    </div>
  );
}
