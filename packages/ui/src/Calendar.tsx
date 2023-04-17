import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { HTMLProps, useEffect, useState } from 'react';
import isoWeek from 'dayjs/plugin/isoWeek';
import { calendarCellDateCalculator } from './helpers/calendar';
dayjs.extend(isoWeek);

interface Cell extends HTMLProps<HTMLDivElement> {
  isCurrentMonth: boolean;
}

interface Time extends HTMLProps<HTMLDivElement> {
  date: string;
  isToday: boolean;
}

const Header = ({ nextMonth, previousMonth, today, renderedDate, headerExtra }: any) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        <time dateTime="2022-01">
          {renderedDate.year} - {renderedDate.month}
        </time>
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <div
            className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
            aria-hidden="true"
          />
          <button
            type="button"
            className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={previousMonth}
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 md:block"
            onClick={today}
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={nextMonth}
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {headerExtra}
      </div>
    </header>
  );
};

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
  return (
    <p {...rest} className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
      {children}
    </p>
  );
};

const EventContent = ({ children, ...rest }: HTMLProps<HTMLAnchorElement>) => {
  return (
    <div className="group flex" {...rest}>
      {children}
    </div>
  );
};

const ListElement = ({ children, ...rest }: HTMLProps<HTMLLIElement>) => {
  return <li {...rest}>{children}</li>;
};

const EventList = ({ children, ...rest }: HTMLProps<HTMLOListElement>) => {
  return <ol className="hidden mt-2 lg:block">{children}</ol>;
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

const Cell = ({ children, isCurrentMonth, ...rest }: Cell) => {
  return (
    <div
      {...rest}
      className={clsx(
        isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
        'cursor-pointer h-16 relative px-3 py-2 lg:h-32'
      )}
    >
      {children}
    </div>
  );
};

const Content = ({ children }: HTMLProps<HTMLDivElement>) => {
  return <div className="w-full grid grid-cols-7 grid-rows-6 gap-px">{children}</div>;
};

const Wrapper = ({ children }: HTMLProps<HTMLDivElement>) => {
  return <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">{children}</div>;
};

export const Calendar = ({ dateCellRender, onSelect, headerExtra }: any) => {
  const [calendar, setCalendar] = useState<any>();
  const [date, setDate] = useState<any>({ month: dayjs().month() + 1, year: dayjs().year() });

  useEffect(() => {
    if (date) {
      const calendarDates = calendarCellDateCalculator(date);
      setCalendar(calendarDates);
    }
  }, [date]);

  const nextMonth = () => {
    let currentDate = date;
    if (currentDate.month == 12) {
      setDate({ month: 1, year: currentDate.year + 1 });
    } else {
      setDate({ ...date, month: currentDate.month + 1 });
    }
  };

  const previousMonth = () => {
    let currentDate = date;
    if (currentDate.month == 1) {
      setDate({ month: 12, year: currentDate.year - 1 });
    } else {
      setDate({ ...date, month: currentDate.month - 1 });
    }
  };

  const today = () => {
    const today = dayjs();
    setDate({ month: today.month() + 1, year: today.year() });
  };

  const BaseCell = ({ onSelect, day, children }: any) => {
    return (
      <Cell onClick={onSelect} key={day.date} isCurrentMonth={day.isCurrentMonth}>
        <Time date={day.date} isToday={day.isToday} />
        {children}
      </Cell>
    );
  };

  return (
    <div className="overflow-hidden border border-gray-200 bg-white rounded-xl lg:flex lg:h-full lg:flex-col">
      <div className="lg:flex lg:flex-auto lg:flex-col">
        <Header
          today={today}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
          renderedDate={date}
          headerExtra={headerExtra}
        />
        <Days />
        <Wrapper>
          <Content>
            {dateCellRender
              ? calendar?.map((day: any) => (
                  <BaseCell
                    onSelect={(e: any) => {
                      e.stopPropagation();
                      onSelect(day);
                    }}
                    key={day.date}
                    day={day}
                  >
                    {dateCellRender(day)}
                  </BaseCell>
                ))
              : calendar?.map((day: any) => <BaseCell key={day.date} day={day} />)}
          </Content>
        </Wrapper>
      </div>
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
Calendar.Header = Header;
