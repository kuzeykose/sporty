import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox as ComboboxHeadless } from '@headlessui/react';
import clsx from 'clsx';

interface Combobox {
  label?: string;
  name?: string;
  value: any;
  onChange: (e: any) => void;
  list: ListValue[];
}

type ListValue = {
  id: any;
  value: any;
  name: any;
};

export const Combobox = ({ label, name, value, onChange, list }: Combobox) => {
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? list
      : list?.filter((item) => {
          return item.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <ComboboxHeadless
      value={value}
      onChange={(value: any) => {
        onChange(name ? { value, name } : value);
      }}
      name={name}
    >
      <ComboboxHeadless.Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </ComboboxHeadless.Label>
      <div className="relative mt-2">
        <ComboboxHeadless.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event: any) => setQuery(event.target.value)}
          displayValue={(item: any) => item?.name}
        />
        <ComboboxHeadless.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxHeadless.Button>

        {filtered.length > 0 && (
          <ComboboxHeadless.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filtered?.map((item) => (
              <ComboboxHeadless.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  clsx(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={clsx('block truncate', selected && 'font-semibold')}>{item.name}</span>

                    {selected && (
                      <span
                        className={clsx(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxHeadless.Option>
            ))}
          </ComboboxHeadless.Options>
        )}
      </div>
    </ComboboxHeadless>
  );
};
