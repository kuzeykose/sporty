'use client';

import React, { useEffect } from 'react';
import { LargeSidebar } from '@/components/large-sidebar';
import { SmallSidebar } from '@/components/small-sidebar';
import { Button } from '@/components/ui/button';
import { BellIcon } from '@radix-ui/react-icons';
import { redirect, useParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';

export default function DashboardLayout({ children, request }: any) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    console.log(session);

    if (status !== 'loading' && !session?.user) {
      redirect('/signin');
    }
  }, [session]);

  return (
    <div className="flex max-h-screen min-h-screen">
      {params.programId ? <SmallSidebar className="flex flex-col justify-between min-w-fit" /> : <LargeSidebar />}
      <div className="flex flex-col w-full">
        <div
          className={clsx(
            params.programId && 'hidden', // is programId is exist then the header is working on programId's layout
            'h-12 w-full border-b text-sm flex flex-none items-center justify-between px-7'
          )}
        >
          <h2 className="text-sm tracking-tight capitalize">sporty {pathname.split('/').join(' / ')}</h2>
          <Button size="sm" variant="ghost">
            <BellIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
