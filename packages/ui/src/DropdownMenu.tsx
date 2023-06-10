import { AnchorHTMLAttributes, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

type Children = {
  children?: React.ReactNode;
  className?: string;
};

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Button = ({ children, className }: Children) => {
  return (
    <Menu.Button
      className={clsx(
        className,
        'flex rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      )}
    >
      {children}
    </Menu.Button>
  );
};

const MenuItem = ({ children, ...rest }: AnchorProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          {...rest}
          className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  );
};

const MenuItems = ({ children }: Children) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {children}
      </Menu.Items>
    </Transition>
  );
};

export const DropdownMenu = ({ children }: Children) => {
  return (
    <Menu as="div" className="relative ml-3">
      {children}
    </Menu>
  );
};

DropdownMenu.Button = Button;
DropdownMenu.MenuItem = MenuItem;
DropdownMenu.MenuItems = MenuItems;
