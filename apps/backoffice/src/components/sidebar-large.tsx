'use client';

import { DashboardIcon, ExitIcon, Link2Icon, PersonIcon } from '@radix-ui/react-icons';
import Sidebar from './ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProjectSectionItems = [
  {
    title: 'All Projects',
    icon: <DashboardIcon className="h-4 w-4" />,
    href: '/dashboard/programs',
  },
];

const AccountSectionItems = [
  {
    title: 'Preferences',
    icon: <PersonIcon className="h-4 w-4" />,
    href: '/account/preferences',
  },
];

const DocumentationSectionItems = [
  {
    title: 'How to use Sporty',
    icon: <Link2Icon className="h-4 w-4" />,
    href: '/documentation/how-to-use',
  },
];

export function LargeSidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar className="flex flex-col justify-between">
      <div className="space-y-1">
        <Sidebar.MenuSection title="Projects">
          {ProjectSectionItems.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link href={link.href}>
                <Sidebar.MenuItem variant={isActive ? 'secondary' : 'ghost'}>
                  {link.icon}
                  {link.title}
                </Sidebar.MenuItem>
              </Link>
            );
          })}
        </Sidebar.MenuSection>
        <Sidebar.MenuSection title="Account">
          {AccountSectionItems.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link href={link.href}>
                <Sidebar.MenuItem variant={isActive ? 'secondary' : 'ghost'}>
                  {link.icon}
                  {link.title}
                </Sidebar.MenuItem>
              </Link>
            );
          })}
        </Sidebar.MenuSection>
        <Sidebar.MenuSection title="Documentation">
          {DocumentationSectionItems.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link href={link.href}>
                <Sidebar.MenuItem variant={isActive ? 'secondary' : 'ghost'}>
                  {link.icon}
                  {link.title}
                </Sidebar.MenuItem>
              </Link>
            );
          })}
        </Sidebar.MenuSection>
      </div>
      <Sidebar.SidebarLogout />
    </Sidebar>
  );
}
