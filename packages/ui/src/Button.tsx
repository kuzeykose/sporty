import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary',
  Soft = 'soft',
}

const variants = {
  [ButtonVariants.Primary]:
    'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  [ButtonVariants.Secondary]: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
  [ButtonVariants.Soft]: 'bg-indigo-50 text-indigo-600 shadow-sm hover:bg-indigo-100',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

export const Button = ({ children, variant = ButtonVariants.Primary, className, ...rest }: ButtonProps) => {
  return (
    <>
      <button
        type="button"
        className={clsx('rounded-md py-1.5 px-2.5 text-sm shadow-sm', variants[variant], className)}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};
