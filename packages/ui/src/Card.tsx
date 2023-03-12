import React from 'react';
import clsx from 'clsx';

type Children = {
  children?: React.ReactNode;
  className?: string;
};

type Title = {
  text?: string;
};

export const Card = ({ children, className }: Children) => {
  return (
    <div className={clsx('mt-8 sm:mx-auto sm:w-full sm:max-w-md', className)}>
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
    </div>
  );
};

const Title = ({ text }: Title) => {
  return <h3 className="text-base font-semibold leading-6 text-gray-900">{text}</h3>;
};

const Context = ({ children }: Children) => {
  return <div className="mt-2 max-w-xl text-sm text-gray-500">{children}</div>;
};

const Footer = ({ children }: Children) => {
  return (
    <div className="mt-5">
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Change plan
      </button>
    </div>
  );
};

Card.Header = Title;
Card.Context = Context;
Card.Footer = Footer;
