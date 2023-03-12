import { FormHTMLAttributes } from 'react';

export const Form = ({ className, children, ...rest }: FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form {...rest} className={className}>
      {children}
    </form>
  );
};
