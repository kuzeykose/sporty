import { Card, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import Sidebar from './ui/sidebar';

interface ProgramsSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PlansSidebar({}: ProgramsSidebarProps) {
  return (
    <Sidebar>
      <Sidebar.SidebarTitle title="Plans" />
      <div className="px-3 py-2 space-y-2">
        <Input placeholder="Search plan" />
        <Card className="cursor-pointer" onClick={() => {}}>
          <CardHeader>
            <CardTitle className="text-lg">Test</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </Sidebar>
  );
}
