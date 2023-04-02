import { InputHTMLAttributes } from 'react';
import { EnvelopeIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input = ({ icon, type, label, className, ...rest }: InputProps) => {
  const error = false;
  return (
    <>
      <div className="w-full">
        <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>

        <div className={clsx(label && 'mt-2', 'relative rounded-md shadow-sm')}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>
          <input
            type={type ? type : 'text'}
            {...rest}
            className={clsx(
              'block w-full rounded-md border-0',
              error
                ? 'block w-full rounded-md border-0 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
                : 'text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
              className,
              icon ? 'pl-10' : 'py-1.5'
            )}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {/* {errorText} */}
          </p>
        )}
      </div>
    </>
  );
};
