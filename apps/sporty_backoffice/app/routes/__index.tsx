import { ActionArgs } from '@remix-run/server-runtime';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, CalendarIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from 'ui';
import { Outlet, useLocation, useMatches, useParams } from '@remix-run/react';
import { requireUserId } from '~/utils/session.server';
import { Fragment, useState } from 'react';
import clsx from 'clsx';

export const loader = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  if (userId) {
  }
  return null;
};

export default function App() {
  const location = useLocation();
  const aa = useMatches();
  const params = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
  ];

  const tabs = [
    { name: 'Plans', href: `/programs/${params.programId}/plans` },
    { name: 'Settings', href: `/programs/${params.programId}/settings` },
  ];

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    { name: 'Programs', href: '/programs', icon: FolderIcon, current: false },
  ];

  const planNavigation = [
    {
      name: 'Calendar',
      href: `/programs/${params.programId}/plans/${params.planId}/calendar`,
      icon: CalendarIcon,
      current: false,
    },
    {
      name: 'Users',
      href: `/programs/${params.programId}/plans/${params.planId}/users`,
      icon: UsersIcon,
      current: false,
    },
    {
      name: 'Workouts',
      href: `/programs/${params.programId}/plans/${params.planId}/workouts`,
      icon: FolderIcon,
      current: false,
    },

    // { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
  ];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                    <span className="text-3xl">🔥</span>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="-mx-2 flex-1 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={clsx(
                                item.href
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                              )}
                            >
                              <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:flex-col lg:items-center lg:justify-between lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
          <div>
            <div className="flex h-16 shrink-0 items-center justify-center">
              <span className="text-3xl">🔥</span>
            </div>
            <nav className="mt-8">
              <ul role="list" className="flex flex-col items-center space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={clsx(
                        item.href.split('/')[1] === location.pathname.split('/')[1]
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      <span className="sr-only">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Button className="bg-transparent">
            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
          </Button>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-800"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        {params.programId && (
          <div className="lg:pl-20">
            <div className="fixed top-0 z-40 flex h-16 w-screen shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <p className="w-60 truncate">{params.programId}</p>

              <nav className="hidden lg:flex lg:space-x-2 lg:py-2" aria-label="Global">
                {tabs.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      item.href.split('/')[3] === location.pathname.split('/')[3]
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                      'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        <main className={clsx('py-28', params.planId ? 'lg:pl-96' : 'lg:pl-20')}>
          <div className={clsx(!location.pathname.split('/').includes('plan') && 'mx-auto max-w-7xl sm:px-6 lg:px-8')}>
            <Outlet />
          </div>
        </main>

        {params.planId && (
          <aside className="fixed bottom-0 left-20 top-16 hidden w-64 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
            <nav className="flex flex-1 flex-col" aria-label="Sidebar">
              <ul role="list" className="-mx-2 space-y-1">
                {planNavigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={clsx(
                        item.href.split('/')[5] === location.pathname.split('/')[5]
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
                      )}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </>
  );
}
