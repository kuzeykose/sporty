import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { calendarCellDateCalculator } from './helpers/calendar';
import { Menu, Transition } from '@headlessui/react';

const Days = () => {
  return (
    <div className="mt-2 grid grid-cols-7 text-xs leading-6 text-gray-500">
      <div>M</div>
      <div>T</div>
      <div>W</div>
      <div>T</div>
      <div>F</div>
      <div>S</div>
      <div>S</div>
    </div>
  );
};

const Header = ({ nextMonth, previousMonth, month }: any) => {
  return (
    <div className="flex items-center text-gray-900">
      <button
        type="button"
        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon onClick={previousMonth} className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex-auto text-sm font-semibold">{month}</div>
      <button
        type="button"
        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon onClick={nextMonth} className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

const Calendar = ({ selectedDate, setSelectedDate, onSelect }: any) => {
  const [calendar, setCalendar] = useState<any>();
  const [date, setDate] = useState<any>(
    selectedDate
      ? { month: selectedDate.date.split('-')[1], year: selectedDate.date.split('-')[0] }
      : { month: dayjs().month() + 1, year: dayjs().year() }
  );

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

  return (
    <div className="w-72 mt-4 text-center">
      <Header nextMonth={nextMonth} previousMonth={previousMonth} month={0} />
      <Days />
      <div className="isolate mt-1 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {calendar?.map((day: any, dayIdx: any) => (
          <button
            onClick={() => {
              onSelect && onSelect(day);
              setSelectedDate(day);
            }}
            key={day.date}
            type="button"
            className={clsx(
              'py-1.5 hover:bg-gray-100 focus:z-10',
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
              (day.isSelected || day.isToday) && 'font-semibold',
              day?.date === selectedDate?.date && 'text-white',
              // !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
              // !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
              day.isToday && 'text-indigo-600'
            )}
          >
            <time
              dateTime={day.date}
              className={clsx(
                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                day?.date === selectedDate?.date && day.isToday && 'bg-indigo-600',
                day?.date === selectedDate?.date && 'bg-gray-900'
              )}
            >
              {day.date.split('-').pop().replace(/^0/, '')}
            </time>
          </button>
        ))}
      </div>
    </div>
  );
};

export const DatePicker = ({ onSelect, value, label }: any) => {
  const [selectedDate, setSelectedDate] = useState<any>({ date: value || dayjs().format('YYYY-MM-DD') });
  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      <div>
        {label && <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>}
        <div className={clsx(label && 'mt-2', 'relative rounded-md shadow-sm')}>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedDate ? selectedDate?.date : 'Select Date'}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 overflow-hidden mt-2 w-fit rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} onSelect={onSelect} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
