import clsx from 'clsx';
import { HTMLProps } from 'react';

type Children = {
  children?: React.ReactNode;
  className?: string;
};

interface AnchorProps extends HTMLProps<HTMLAnchorElement> {
  current?: boolean;
}

const Logo = ({ children }: Children) => {
  return <div className="flex px-2 items-center">{children}</div>;
};

const NavigationItemContainer = ({ children }: Children) => {
  return <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">{children}</div>;
};

const NavigationItem = ({ children, href, current, ...rest }: AnchorProps) => {
  return (
    <a
      className={clsx(
        current
          ? 'border-indigo-500 text-gray-900'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium cursor-pointer'
      )}
      aria-current={current ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
};

const Container = ({ children }: Children) => {
  return <div className="relative flex h-16 items-center justify-between">{children}</div>;
};

export const Header = ({ children }: Children) => {
  return <div className=" px-2 sm:px-4 lg:px-8">{children}</div>;
};

Header.Logo = Logo;
Header.NavigationItemContainer = NavigationItemContainer;
Header.NavigationItem = NavigationItem;
Header.Container = Container;
