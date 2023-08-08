'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

export default function PlanLayout({ children }: any) {
  const params = useParams();

  console.log(params);

  return (
    <div className="h-full space-y-2">
      <div className="flex border text-sm gap-3">
        <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}`}>Dashboard</Link>
        <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}/workouts`}>Workouts</Link>
        <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}/events`}>Events</Link>
        <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}/calendar`}>Calendar</Link>
        <Link href={`/dashboard/programs/${params.programId}/plans/${params.planId}/users`}>Users</Link>
      </div>
      <div className="h-full border mb-2">{children}</div>
    </div>
  );
}
