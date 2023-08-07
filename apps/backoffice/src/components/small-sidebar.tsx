import clsx from 'clsx';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { DashboardIcon, ExitIcon, Link2Icon, PersonIcon, GearIcon } from '@radix-ui/react-icons';
import { Anton } from 'next/font/google';
import { UserNav } from './user-nav';
const anton = Anton({ weight: '400', subsets: ['latin'] });

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SmallSidebar({ className }: SidebarProps) {
  return (
    <div className={cn('border-r', className)}>
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="border-b h-12 flex items-center justify-center w-full">
          <h2 className={clsx(anton.className, 'px-2 text-2xl')}>S</h2>
        </div>

        <Button size="icon" variant="secondary">
          <DashboardIcon className="h-4 w-4" />
        </Button>

        <Button title="Plans" size="icon" variant="ghost">
          <PersonIcon className="h-4 w-4" />
        </Button>

        <Button title="Users" size="icon" variant="ghost">
          <Link2Icon className="h-4 w-4" />
        </Button>

        <Button title="Settings" size="icon" variant="ghost">
          <GearIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="px-3 py-2 border-t">
        <div className="space-y-1">
          <UserNav />
        </div>
      </div>
    </div>
  );
}
