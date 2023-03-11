import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export enum InputVariants {
  Primary = 'primary',
  Password = 'password',
}

const variants = {
  [InputVariants.Primary]:
    'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  [InputVariants.Password]: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
};

export const Input = ({ label, ...rest }: InputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...rest}
        />
      </div>
    </div>
  );
};
