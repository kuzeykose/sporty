import {
  CheckIcon,
  ChevronDownIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { Link, useLoaderData } from '@remix-run/react';
import { ActionArgs } from '@remix-run/server-runtime';
import { useState } from 'react';
import { Button, ButtonVariants, Calendar, DropdownMenu, Modal, Select } from 'ui';
import { getWorkouts } from '~/utils/workout.server';

export const loader = async ({ request, params }: ActionArgs) => {
  const { programId, planId } = params;
  if (programId && planId) {
    const workouts = await getWorkouts(request, programId, planId);
    return workouts;
  } else {
    throw 'test';
  }
};

export default function CalendarPage() {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<String>();
  const workouts = useLoaderData<typeof loader>();
  const events = [
    {},
    // {
    //   date: '2023-04-03',
    //   events: [
    //     { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
    //     { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //     { id: 3, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //     { id: 4, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //     { id: 5, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //     { id: 6, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //   ],
    // },
    // {
    //   date: '2023-04-30',
    //   events: [
    //     { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
    //     { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //     { id: 3, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //     { id: 4, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //     { id: 5, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //     { id: 6, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    //   ],
    // },
  ];
  console.log(workouts);
  const dateCellRender = (day: any) => {
    const dayEvents: any = workouts?.find((item: any) => item.date === day.date);
    return (
      <Calendar.EventList>
        {dayEvents?.events.slice(0, 2).map((event: any) => (
          <Calendar.ListElement key={event.datetime}>
            <Calendar.EventContent
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Calendar.EventParagraph>{event.name}</Calendar.EventParagraph>
              <Calendar.EventTime dateTime={event?.datetime}>{event.time}</Calendar.EventTime>
            </Calendar.EventContent>
          </Calendar.ListElement>
        ))}
        {dayEvents && dayEvents?.events.length > 2 && (
          <li className="text-gray-500">+ {dayEvents?.events.length - 2} more</li>
        )}
      </Calendar.EventList>
    );
  };

  return (
    <div className="pt-8 lg:px-8">
      <div className="my-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Program Calendar
          </h2>
        </div>
      </div>
      <div className="lg:py-20">
        <Calendar
          headerExtra={
            <DropdownMenu>
              <DropdownMenu.Button>
                <Button className="rounded-full">
                  <div className="flex items-center gap-2">
                    Add New...
                    <ChevronDownIcon className="h-4 w-4 text-white" />
                  </div>
                </Button>
              </DropdownMenu.Button>
              <DropdownMenu.MenuItems>
                <Link to="/new/event">
                  <DropdownMenu.MenuItem>Event</DropdownMenu.MenuItem>
                </Link>
                <Link to="/workout/create">
                  <DropdownMenu.MenuItem>Workout</DropdownMenu.MenuItem>
                </Link>
              </DropdownMenu.MenuItems>
            </DropdownMenu>
          }
          dateCellRender={dateCellRender}
          onSelect={(day: any) => {
            setSelectedDay(day.date);
            setModal(true);
          }}
        />
      </div>

      <Modal panelClassName="" open={modal} setOpen={setModal}>
        <>
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <ClipboardDocumentListIcon className="h-6 w-6 text-orange-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Modal.Title>Create New Event/Workout!</Modal.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Do you want to create Event or Workout for <span className="font-semibold">{selectedDay}</span>?
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button variant={ButtonVariants.Secondary}>
              <Link to="/workout/event">🎪 Event</Link>
            </Button>
            <Button variant={ButtonVariants.Primary} onClick={() => setModal(false)}>
              <Link to={`/workout/create?date=${selectedDay}`}>🏋️ Workout</Link>
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
}
