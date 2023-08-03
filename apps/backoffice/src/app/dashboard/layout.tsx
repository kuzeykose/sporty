'use client';

import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { playlists } from '@/data/playlist';
import { BellIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function DashboardLayout({ children }: any) {
  const pathname = usePathname();

  // const capitalizeFirstLetters = ({ array }: any) => {
  //   array.forEach((element: string) => {
  //     element.charAt(0).toUpperCase();
  //   });
  //   console.log(array);
  // };

  console.log('pathname:', pathname.split('/'));

  return (
    <div className="grid lg:grid-cols-6">
      <Sidebar playlists={playlists} className="h-screen flex flex-col justify-between" />
      <div className="col-span-5 w-full ">
        <div className="h-12 w-full border-b text-sm flex items-center justify-between px-7">
          <h2 className="text-sm tracking-tight">Sporty {pathname.split('/').join(' / ')}</h2>
          <Button size="sm" variant="ghost">
            <BellIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="bg-gray-500 w-full h-[calc(100%-3rem)]">{children}</div>
      </div>
    </div>
  );
}
