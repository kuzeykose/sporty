import clsx from 'clsx';
import { HTMLProps } from 'react';

type Children = {
  children?: React.ReactNode;
  className?: string;
};

interface Cell extends HTMLProps<HTMLDivElement> {
  isCurrentMonth: boolean;
}

interface Time extends HTMLProps<HTMLDivElement> {
  date: string;
  isToday: boolean;
}

const Days = () => {
  return (
    <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
      <div className="bg-white py-2">
        M<span className="sr-only sm:not-sr-only">on</span>
      </div>
      <div className="bg-white py-2">
        T<span className="sr-only sm:not-sr-only">ue</span>
      </div>
      <div className="bg-white py-2">
        W<span className="sr-only sm:not-sr-only">ed</span>
      </div>
      <div className="bg-white py-2">
        T<span className="sr-only sm:not-sr-only">hu</span>
      </div>
      <div className="bg-white py-2">
        F<span className="sr-only sm:not-sr-only">ri</span>
      </div>
      <div className="bg-white py-2">
        S<span className="sr-only sm:not-sr-only">at</span>
      </div>
      <div className="bg-white py-2">
        S<span className="sr-only sm:not-sr-only">un</span>
      </div>
    </div>
  );
};

const EventTime = ({ children, ...rest }: HTMLProps<HTMLTimeElement>) => {
  return (
    <time className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block" {...rest}>
      {children}
    </time>
  );
};

const EventParagraph = ({ children, ...rest }: HTMLProps<HTMLAnchorElement>) => {
  return <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">{children}</p>;
};

const EventContent = ({ children, ...rest }: HTMLProps<HTMLAnchorElement>) => {
  return (
    <a className="group flex" {...rest}>
      {children}
    </a>
  );
};

const ListElement = ({ children }: HTMLProps<HTMLLIElement>) => {
  return <li>{children}</li>;
};

const EventList = ({ children }: HTMLProps<HTMLOListElement>) => {
  return <ol className="mt-2">{children}</ol>;
};

const Time = ({ date, isToday }: Time) => {
  return (
    <time
      dateTime={date}
      className={
        isToday
          ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
          : undefined
      }
    >
      {date.split('-').pop()?.replace(/^0/, '')}
    </time>
  );
};

const Cell = ({ children, isCurrentMonth }: Cell) => {
  return (
    <div className={clsx(isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500', 'relative px-3 py-2')}>
      {children}
    </div>
  );
};

const Content = ({ children }: HTMLProps<HTMLDivElement>) => {
  return <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">{children}</div>;
};

const Wrapper = ({ children }: HTMLProps<HTMLDivElement>) => {
  return <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">{children}</div>;
};

export const Calendar = ({ children }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className="border border-gray-200 bg-white rounded-xl lg:flex lg:h-full lg:flex-col">
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">{children}</div>
    </div>
  );
};

Calendar.Days = Days;
Calendar.Wrapper = Wrapper;
Calendar.Content = Content;
Calendar.Cell = Cell;
Calendar.Time = Time;
Calendar.EventList = EventList;
Calendar.ListElement = ListElement;
Calendar.EventContent = EventContent;
Calendar.EventParagraph = EventParagraph;
Calendar.EventTime = EventTime;
