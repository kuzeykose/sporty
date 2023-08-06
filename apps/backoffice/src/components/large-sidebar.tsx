'use client';

import { DashboardIcon, ExitIcon, Link2Icon, PersonIcon } from '@radix-ui/react-icons';
import Sidebar from './ui/sidebar';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LargeSidebar({ className }: SidebarProps) {
  return (
    <Sidebar className="flex flex-col justify-between">
      <div className="space-y-1">
        <Sidebar.SidebarTitle title="Dashboard" />
        <Sidebar.MenuSection title="Projects">
          <Sidebar.MenuItem>
            <DashboardIcon className="h-4 w-4" />
            All Projects
          </Sidebar.MenuItem>
        </Sidebar.MenuSection>
        <Sidebar.MenuSection title="Account">
          <Sidebar.MenuItem>
            <PersonIcon className="h-4 w-4" />
            Preferences
          </Sidebar.MenuItem>
        </Sidebar.MenuSection>
        <Sidebar.MenuSection title="Documentation">
          <Sidebar.MenuItem>
            <Link2Icon className="h-4 w-4" />
            How to use Sporty
          </Sidebar.MenuItem>
        </Sidebar.MenuSection>
      </div>
      <Sidebar.SidebarLogout />
    </Sidebar>
  );
}
