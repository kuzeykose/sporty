import React, { ComponentType } from 'react';
import { Disclosure as DisclosureTW } from '@headlessui/react';
import clsx from 'clsx';

type Children = {
  children?: React.ReactNode;
  className?: string;
};
type ExtractProps<T> = T extends ComponentType<infer P> ? P : T;
//@ts-ignore
type DisclosureButtonType = ExtractProps<typeof DisclosureTW.Button>;
type DisclosureType = ExtractProps<typeof DisclosureTW>;

interface Button extends DisclosureButtonType {
  current?: boolean;
}

const Button = ({ children, current, ...rest }: Button) => {
  return (
    <DisclosureTW.Button
      className={clsx(
        current
          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
          : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
      )}
      aria-current={current ? 'page' : undefined}
      {...rest}
    >
      {children}
    </DisclosureTW.Button>
  );
};

const Panel = ({ children }: Children) => {
  return <DisclosureTW.Panel className="sm:hidden">{children}</DisclosureTW.Panel>;
};

export const Disclosure = ({ children, ...rest }: DisclosureType) => {
  return (
    <DisclosureTW {...rest} className="bg-white shadow-sm">
      {/* Open parameter work with change icon vs. => {({ open }) => ()} */}
      {children}
    </DisclosureTW>
  );
};

Disclosure.Panel = Panel;
Disclosure.Button = Button;
