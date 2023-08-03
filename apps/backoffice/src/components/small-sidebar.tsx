import { cn } from '@/lib/utils';

import { Playlist } from '@/data/playlist';
import { Button } from './ui/button';
import { DashboardIcon, ExitIcon, Link2Icon, PersonIcon, GearIcon } from '@radix-ui/react-icons';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function SmallSidebar({ className }: SidebarProps) {
  return (
    <div className={cn('border-r', className)}>
      <div className="space-y-4">
        <div className="border-b h-12 flex items-center justify-center">
          <h2 className="px-2 text-lg font-semibold tracking-tight text-center">S</h2>
        </div>
        <div className="space-y-1 px-2 rounded-md">
          <Button title="Home" size="icon" variant="secondary" className="w-full justify-center">
            <DashboardIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1 px-2 rounded-md">
          <Button title="Plans" size="icon" variant="ghost" className="w-full justify-center">
            <PersonIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1 px-2 rounded-md">
          <Button title="Users" size="icon" variant="ghost" className="w-full justify-center">
            <Link2Icon className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1 px-2 rounded-md">
          <Button title="Settings" size="icon" variant="ghost" className="w-full justify-center">
            <GearIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="px-3 py-2 border-t">
        <div className="space-y-1">
          <Button size="icon" variant="ghost" className="w-full justify-center">
            <ExitIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
