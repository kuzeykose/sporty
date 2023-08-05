import { cn } from '@/lib/utils';

import { Playlist } from '@/data/playlist';
import { Button } from './ui/button';
import { DashboardIcon, ExitIcon, Link2Icon, PersonIcon, GearIcon } from '@radix-ui/react-icons';
import { useParams, usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function SmallSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const params = useParams();

  console.log(pathname);
  console.log(params);
  return (
    <div className="flex">
      <div className={cn('border-r flex flex-col justify-between min-w-fit', className)}>
        <div className="space-y-4">
          <div className="border-b h-12 flex items-center justify-center">
            <h2 className="px-2 text-lg font-semibold tracking-tight text-center">S</h2>
          </div>
          <Link href="programId/users">
            <div className="space-y-1 px-2 rounded-md">
              <Button title="Home" size="icon" variant="secondary" className="w-full justify-center">
                <DashboardIcon className="h-4 w-4" />
              </Button>
            </div>
          </Link>
          <div className="space-y-1 px-2 rounded-md">
            <Link href="programId/plans">
              <Button title="Plans" size="icon" variant="ghost" className="w-full justify-center">
                <PersonIcon className="h-4 w-4" />
              </Button>
            </Link>
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
      {pathname.includes('plans') && (
        <div className="space-y-4 border-r">
          <div className="border-b h-12 flex items-center justify-center">
            <h2 className="px-2 text-lg font-semibold tracking-tight text-center">Plans</h2>
          </div>
          <div className="flex justify-center items-center">
            <Button size="sm" variant="ghost" className="border w-32">
              Add Plan
            </Button>
          </div>
          <Link href="/dashboard/programs/programId/plans/planId">
            <Card className="mx-3 w-32 mt-2 text-center">
              <CardHeader>
                <CardTitle className="text-md">Plan 1</CardTitle>
                <CardDescription>Week 1 </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/programs/programId/plans/planId">
            <Card className="mx-3 w-32 mt-2 text-center">
              <CardHeader>
                <CardTitle className="text-md">Plan 1</CardTitle>
                <CardDescription>Week 1 </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/programs/programId/plans/planId">
            <Card className="mx-3 w-32 mt-2 text-center">
              <CardHeader>
                <CardTitle className="text-md">Plan 1</CardTitle>
                <CardDescription>Week 1 </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      )}
    </div>
  );
}
