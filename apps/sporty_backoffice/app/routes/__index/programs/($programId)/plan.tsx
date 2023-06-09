import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, CalendarIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Outlet, useLocation, useParams } from '@remix-run/react';

export default function Example() {
  const params = useParams();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <main className="py-10 lg:pl-80">
        <div className=" max-w-7xl px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}
