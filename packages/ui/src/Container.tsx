import { HTMLProps } from 'react';

export const Container = ({ children }: HTMLProps<HTMLDivElement>) => {
  return <div className="mx-auto max-w-7xl bg-white p-4 shadow sm:rounded-lg">{children}</div>;
};
