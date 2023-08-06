import Sidebar from './ui/sidebar';

interface ProgramsSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UsersSidebar({}: ProgramsSidebarProps) {
  return (
    <Sidebar>
      <Sidebar.SidebarTitle title="Users" />
      <div className="px-3 py-2 space-y-2"></div>
    </Sidebar>
  );
}
