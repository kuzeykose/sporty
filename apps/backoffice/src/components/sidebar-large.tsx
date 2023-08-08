'use client';

import { DashboardIcon, ExitIcon, Link2Icon, PersonIcon } from '@radix-ui/react-icons';
import Sidebar from './ui/sidebar';
import Link from 'next/link';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LargeSidebar({ className }: SidebarProps) {
  return (
    <Sidebar className="flex flex-col justify-between">
      <div className="space-y-1">
        <Sidebar.SidebarTitle title="Dashboard" />
        <Sidebar.MenuSection title="Projects">
          <Link href="/dashboard/programs">
            <Sidebar.MenuItem>
              <DashboardIcon className="h-4 w-4" />
              All Projects
            </Sidebar.MenuItem>
          </Link>
        </Sidebar.MenuSection>
        <Sidebar.MenuSection title="Account">
          <Link href="/account/preferences">
            <Sidebar.MenuItem>
              <PersonIcon className="h-4 w-4" />
              Preferences
            </Sidebar.MenuItem>
          </Link>
        </Sidebar.MenuSection>
        <Sidebar.MenuSection title="Documentation">
          <Link href="/documentation/how-to-use">
            <Sidebar.MenuItem>
              <Link2Icon className="h-4 w-4" />
              How to use Sporty
            </Sidebar.MenuItem>
          </Link>
        </Sidebar.MenuSection>
      </div>
      <Sidebar.SidebarLogout />
    </Sidebar>
  );
}
