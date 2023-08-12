'use client';

import clsx from 'clsx';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export default function DashboardBreadcrumb() {
  const params = useParams();
  const pathname = usePathname();

  return (
    <div>
      <div
        className={clsx(
          params.programId && 'hidden', // is programId is exist then the header is working on programId's layout
          'h-12 w-full border-b text-sm flex flex-none items-center justify-between px-7'
        )}
      >
        <h2 className="text-sm tracking-tight capitalize">sporty {pathname.split('/').join(' / ')}</h2>
      </div>
    </div>
  );
}
