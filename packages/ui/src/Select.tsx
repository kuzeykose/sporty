import { Fragment, HTMLProps, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface Select extends HTMLProps<HTMLSelectElement> {
  label?: string;
}

const Option = ({ children, ...rest }: HTMLProps<HTMLOptionElement>) => {
  return <option {...rest}>{children}</option>;
};

export const Select = ({ label, children, ...rest }: Select) => {
  return (
    <div>
      {label && (
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <select
        {...rest}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {children}
      </select>
    </div>
  );
};

Select.Option = Option;
