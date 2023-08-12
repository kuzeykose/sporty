'use client';

import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { Button } from './button';
import { ExitIcon } from '@radix-ui/react-icons';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarTitle({ title }: any) {
  return (
    <div className="border-b h-12 flex items-center">
      <h2 className="px-7 text-lg font-semibold tracking-tight min-w-[255px]">{title}</h2>
    </div>
  );
}

function MenuSection({ title, children }: any) {
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </div>
  );
}

function MenuItem({ children, variant }: any) {
  return (
    <div className="space-y-1">
      <Button variant={variant} className="w-full justify-start gap-2">
        {children}
      </Button>
    </div>
  );
}

function SidebarLogout() {
  return (
    <div className="px-3 py-2 border-t">
      <div className="space-y-1">
        <Button onClick={() => signOut()} variant="ghost" className="w-full justify-start gap-2">
          <ExitIcon className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

function Sidebar({ children, className }: SidebarProps) {
  return <div className={cn('border-r', className)}>{children}</div>;
}

Sidebar.SidebarTitle = SidebarTitle;
Sidebar.MenuSection = MenuSection;
Sidebar.MenuItem = MenuItem;
Sidebar.SidebarLogout = SidebarLogout;
export default Sidebar;
