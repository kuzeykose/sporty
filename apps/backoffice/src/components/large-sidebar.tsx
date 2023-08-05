'use client';
import { cn } from '@/lib/utils';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { DashboardIcon, ExitIcon, Link2Icon, PersonIcon } from '@radix-ui/react-icons';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LargeSidebar({ className }: SidebarProps) {
  return (
    <div className={cn('border-r', className)}>
      <div className="space-y-4">
        <div className="border-b h-12 flex items-center">
          <h2 className="px-7 text-lg font-semibold tracking-tight">Dashboard</h2>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Projects</h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start gap-2">
              <DashboardIcon className="h-4 w-4" />
              All Projects
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Account</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <PersonIcon className="h-4 w-4" />
              Preferences
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Documentation</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Link2Icon className="h-4 w-4" />
              How to use Sporty
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 border-t">
        <div className="space-y-1">
          <Button onClick={() => signOut()} variant="ghost" className="w-full justify-start gap-2">
            <ExitIcon className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
