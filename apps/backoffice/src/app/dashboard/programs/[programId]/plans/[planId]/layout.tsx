import Link from 'next/link';
import React from 'react';

export default function PlanLayout({ children }: any) {
  return (
    <div className="flex flex-col justify-center items-center h-full p-2">
      <div className="flex w-[95%] border m-2 p-1 text-sm gap-3">
        <Link href="/">Dashboard</Link>
        <Link href="/">Workouts</Link>
        <Link href="/">Events</Link>
        <Link href="/">Calendar</Link>
        <Link href="/">Users</Link>
      </div>
      <div className=" w-[95%] h-full border mb-2">{children}</div>
    </div>
  );
}
