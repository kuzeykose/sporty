import { DropdownMenu, Header, Box, Disclosure, Form } from 'ui';
import { useNavigate, Outlet, useLocation } from '@remix-run/react';
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
    { name: 'Calendar', href: '/calendar' },
  ];
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
  ];

  return (
    <div className="font-sans">
      <Box className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow-sm">
          {({ open }: any) => (
            <>
              <Header>
                <Box className="flex">
                  <Header.Logo>
                    <span style={{ fontSize: '30px' }}>🔥</span>
                  </Header.Logo>
                  <Header.NavigationItemContainer>
                    {navigation.map((item) => (
                      <Header.NavigationItem
                        onClick={() => navigate(item.href)}
                        key={item.name}
                        current={location.pathname === item.href}
                      >
                        {item.name}
                      </Header.NavigationItem>
                    ))}
                  </Header.NavigationItemContainer>
                </Box>

                <Box className="hidden items-center sm:ml-6 sm:flex">
                  {/* Profile dropdown */}
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

                <Box className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    {open ? (
                      <div className="block h-6 w-6" aria-hidden="true">
                        a
                      </div>
                    ) : (
                      <div className="block h-6 w-6" aria-hidden="true">
                        b
                      </div>
                    )}
                  </Disclosure.Button>
                </Box>
              </Header>

              <Disclosure.Panel className="sm:hidden">
                <Box className="space-y-1 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      className={clsx(
                        location.pathname === item.href
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                      )}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </Box>
              </Disclosure.Panel>
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
      </Box>
    </div>
  );
}
