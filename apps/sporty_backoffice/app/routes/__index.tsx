import { DropdownMenu, Header, Box, Form, Disclosure, Select, Button } from 'ui';
import { useNavigate, Outlet, useLocation } from '@remix-run/react';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { requireUserId } from '~/utils/session.server';
import clsx from 'clsx';

export const loader = async ({ request }: any) => {
  const userId = await requireUserId(request);
  if (userId) {
  }
  return null;
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };
  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Plans', href: '/plans' },
    { name: 'Users', href: '/users' },
    // { name: 'Calendar', href: '/calendar' },
  ];
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
  ];

  return (
    <div className="font-sans">
      <Disclosure as="header" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <Header>
              <Header.Container>
                <Box className="flex gap-4 items-center w-64">
                  <Header.Logo>
                    <span className="text-3xl">🔥</span>
                  </Header.Logo>

                  <Select />
                </Box>

                <Box className="relative z-10 ml-4 flex items-center gap-4">
                  <Button
                    icon={<CalendarDaysIcon className="h-5 w-5" />}
                    onClick={() => {
                      navigate('/calendar');
                    }}
                  >
                    Calendar
                  </Button>
                  <DropdownMenu>
                    <DropdownMenu.Button>
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                    </DropdownMenu.Button>
                    <DropdownMenu.MenuItems>
                      {userNavigation.map((item) => (
                        <DropdownMenu.MenuItem key={item.name}>{item.name}</DropdownMenu.MenuItem>
                      ))}
                      <DropdownMenu.MenuItem>
                        <Form action="/logout" method="post">
                          <button type="submit">Logout</button>
                        </Form>
                      </DropdownMenu.MenuItem>
                    </DropdownMenu.MenuItems>
                  </DropdownMenu>
                </Box>
              </Header.Container>

              <nav className="hidden lg:flex lg:space-x-8 lg:py-2" aria-label="Global">
                {navigation.map((item: any) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                      'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </Header>
          </>
        )}
      </Disclosure>

      <div className="py-4">
        <header>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {location.pathname.split('/')[1]}
            </h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
