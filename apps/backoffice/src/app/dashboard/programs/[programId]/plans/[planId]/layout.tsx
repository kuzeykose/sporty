import Link from 'next/link';
import React from 'react';

export default function PlanLayout({ children }: any) {
  return (
    <div className="h-full p-2 space-y-2">
      <div className="flex border text-sm gap-3">
        <Link href="/">Dashboard</Link>
        <Link href="/">Workouts</Link>
        <Link href="/">Events</Link>
        <Link href="/">Calendar</Link>
        <Link href="/">Users</Link>
      </div>
      <div className="h-full border mb-2">{children}</div>
    </div>
  );
}
