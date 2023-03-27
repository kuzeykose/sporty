import React, { HTMLProps } from 'react';

export const Box = ({ className, children, ...rest }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};
