'use client';

import { DashboardIcon, ExitIcon, Link2Icon, PersonIcon } from '@radix-ui/react-icons';
import Sidebar from './ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

// keyleri ekle

const sidebarItems = [
  {
    key: 'section_projects',
    sectionName: 'Projects',
    children: [
      {
        key: 'link_all_projects',
        title: 'All Projects',
        icon: <DashboardIcon className="h-4 w-4" />,
        href: '/dashboard/programs',
      },
    ],
  },
  {
    key: 'account',
    sectionName: 'Account',
    children: [
      {
        key: 'link_preferences',
        title: 'Preferences',
        icon: <PersonIcon className="h-4 w-4" />,
        href: '/account/preferences',
      },
    ],
  },
  {
    key: 'documentation',
    sectionName: 'Documentation',
    children: [
      {
        key: 'link_documentation',
        title: 'How to use Sporty',
        icon: <Link2Icon className="h-4 w-4" />,
        href: '/documentation/how-to-use',
      },
    ],
  },
];

export function LargeSidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar className="flex flex-col justify-between">
      <div className="space-y-1">
        <Sidebar.SidebarTitle title="Dashboard" />
        {sidebarItems.map((section) => (
          <Sidebar.MenuSection key={section.key} title={section.sectionName}>
            {section.children.map((child) => (
              <Link key={child.key} href={child.href}>
                <Sidebar.MenuItem variant={pathname === child.href ? 'secondary' : 'ghost'}>
                  {child.icon}
                  {child.title}
                </Sidebar.MenuItem>
              </Link>
            ))}
          </Sidebar.MenuSection>
        ))}
      </div>
      <Sidebar.SidebarLogout />
    </Sidebar>
  );
}
