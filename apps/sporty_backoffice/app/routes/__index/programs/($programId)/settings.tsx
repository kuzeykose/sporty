import {
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FingerPrintIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Outlet, useLocation, useParams } from '@remix-run/react';
import clsx from 'clsx';
import React from 'react';

const Detail = () => {
  const location = useLocation();
  const params = useParams();

  const secondaryNavigation = [
    { name: 'Program', href: `/programs/${params.programId}/settings`, icon: UserCircleIcon },
    { name: 'Users', href: `/programs/${params.programId}/settings/users`, icon: FingerPrintIcon },
  ];

  return (
    <div className="pt-8 lg:px-8">
      <div>
        {/* <div>
          <nav className="sm:hidden" aria-label="Back">
            <a href="#" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
              <ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Back
            </a>
          </nav>
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div className="flex">
                  <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                    Programs
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    {data.name}
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div> */}
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Program Settings
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={clsx(
                      location.pathname == item.href
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon
                      className={clsx(
                        // item.current ? 'text-indigo-600' :
                        'text-gray-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Detail;
