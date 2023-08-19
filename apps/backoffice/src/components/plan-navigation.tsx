'use client';

import { Plan } from '@/constants/Plans.type';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLayoutContext } from './layout-provider';
import { useEffect } from 'react';

export default function PlanNavigation({ plan }: { plan: Plan }) {
  const params = useParams();
  const layoutContext = useLayoutContext();

  useEffect(() => {
    plan && layoutContext.setPlan({ name: plan.planName, id: plan.planId });
  }, []);

  return (
    <div className="flex border text-sm gap-3">
      <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}`}>Dashboard</Link>
      <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}/workouts`}>Workouts</Link>
      <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}/events`}>Events</Link>
      <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}/calendar`}>Calendar</Link>
      <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}/users`}>Users</Link>
      <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}/settings`}>Settings</Link>
    </div>
  );
}
