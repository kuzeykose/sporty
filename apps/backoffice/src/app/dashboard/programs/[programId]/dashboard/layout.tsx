'use client';
import { Button } from '@/components/ui/button';
import { BellIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function layout({ children }: any) {
  const pathname = usePathname();
  return (
    <div className="flex h-full">
      <div className="w-full">
        <div className="h-12 w-full border-b text-sm flex flex-none items-center justify-between px-7">
          <h2 className="text-sm tracking-tight capitalize">sporty {pathname.split('/').join(' / ')}</h2>
          <Button size="sm" variant="ghost">
            <BellIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
