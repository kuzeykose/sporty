'use client';

import clsx from 'clsx';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { DashboardIcon, ExitIcon, Link2Icon, PersonIcon, GearIcon, HomeIcon } from '@radix-ui/react-icons';
import { Anton } from 'next/font/google';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
const anton = Anton({ weight: '400', subsets: ['latin'] });

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

type NavbarSectionChildren = {
  key: string;
  title: string;
  icon: React.ReactNode;
  href1: string;
};

type NavbarSection = {
  key: string;
  sectionName: string;
  children: NavbarSectionChildren[];
};

const smallSidebarItems: NavbarSection[] = [
  {
    key: 'section_',
    sectionName: 'Projects',
    children: [
      {
        key: 'link_dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon className="h-4 w-4" />,
        href1: '/dashboard/programs/programId/dashboard',
      },
      {
        key: 'link_plans',
        title: 'Dashboard',
        icon: <HomeIcon className="h-4 w-4" />,
        href1: '/dashboard/programs/programId/plans',
      },
      {
        key: 'link_users',
        title: 'Dashboard',
        icon: <PersonIcon className="h-4 w-4" />,
        href1: '/dashboard/programs/programId/users',
      },
      {
        key: 'link_settings',
        title: 'Dashboard',
        icon: <GearIcon className="h-4 w-4" />,
        href1: '/dashboard/programs/programId/settings',
      },
    ],
  },
];

export function SmallSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const params = useParams();

  console.log(typeof params.programId);

  console.log(typeof regex);

  console.log(regex);

  return (
    <div className={cn('border-r', className)}>
      <div className="flex flex-col items-center justify-center space-y-6">
        <Link className="w-full" href="/dashboard">
          <div className="border-b h-12 flex items-center justify-center w-full cursor-pointer">
            <h2 className={clsx(anton.className, 'px-2 text-2xl')}>S</h2>
          </div>
        </Link>

        {smallSidebarItems.map((section: NavbarSection) =>
          section.children.map((child: NavbarSectionChildren) => (
            <Link key={child.key} href={child.href1.replace(/programId/i, params.programId as string)}>
              <Button
                title={child.title}
                size="icon"
                variant={
                  pathname === child.href1.replace(/programId/i, params.programId as string) ? 'secondary' : 'ghost'
                }
              >
                {child.icon}
              </Button>
            </Link>
          ))
        )}
      </div>
      <div className="px-3 py-2 border-t">
        <div className="space-y-1">
          <UserNav />
        </div>
      </div>
    </div>
  );
}
