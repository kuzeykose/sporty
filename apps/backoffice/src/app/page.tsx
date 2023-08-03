import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/sidebar';
import { playlists } from '@/data/playlist';
import { BellIcon } from '@radix-ui/react-icons';

export default function Home() {
  return (
    <main>
      <div className="grid lg:grid-cols-6">
        <Sidebar playlists={playlists} className="h-screen flex flex-col justify-between" />
        <div className="h-12 col-span-5 w-full border-b text-sm flex items-center justify-between px-7">
          <h2 className="text-sm tracking-tight">Sporty / Dashboard</h2>
          <Button size="sm" variant="ghost">
            <BellIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
