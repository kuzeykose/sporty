import { useState } from 'react';
import { ActionArgs } from '@remix-run/server-runtime';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { Button, ButtonVariants, Calendar, DropdownMenu, Modal, CalenderDay } from 'ui';
import { ChevronDownIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { getWorkouts } from '~/utils/workout.server';
import { Workout } from '~/types/workout';
import { WorkoutPreviewer } from 'components';

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
  const params = useParams();
  const [modal, setModal] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<String>();
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [workoutPreview, setWorkoutPreview] = useState<Workout>({} as Workout);
  const workouts = useLoaderData<typeof loader>();

  const dateCellRender = (day: CalenderDay) => {
    const dayEvents: Workout[] = [];
    workouts.forEach((workout: Workout) => {
      if (workout.date === day.date) {
        dayEvents.push(workout);
      }
    });

    return (
      <Calendar.EventList>
        {dayEvents.map((event: Workout) => (
          // <Link to={`/program/${event.programId}/plan/${event.planId}/workouts/new`}>
          <Calendar.ListElement key={event.workoutId}>
            <Calendar.EventContent
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Calendar.EventParagraph>
                <div
                  className="flex items-center gap-2"
                  onClick={() => {
                    setPreviewModal(true);
                    setWorkoutPreview(event);
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-lime-500" />
                  <p> {event.name}</p>
                </div>
              </Calendar.EventParagraph>
              {/* <Calendar.EventTime dateTime={event?.datetime}>{(event.date)}</Calendar.EventTime> */}
            </Calendar.EventContent>
          </Calendar.ListElement>
          // </Link>
        ))}
        {/* {dayEvents && dayEvents?.length > 2 && <li className="text-gray-500">+ {dayEvents?.length - 2} more</li>} */}
      </Calendar.EventList>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Calendar</h1>
          <p className="mt-2 text-sm text-gray-700">Calendar view of the workouts in your plan. </p>
        </div>
      </div>
      <div className="lg:py-12">
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
                {/* <Link to="/new/event">
                  <DropdownMenu.MenuItem>Event</DropdownMenu.MenuItem>
                </Link> */}
                <Link to={`/program/${params.programId}/plan/${params.planId}/workouts/new`}>
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

      <Modal panelClassName="sm:max-w-4xl sm:pt-6" open={previewModal} setOpen={setPreviewModal}>
        <Modal.Title>{workoutPreview.date}</Modal.Title>
        <p className="font-medium mt-4">
          <span className="text-gray-600">Workout Name: </span> {workoutPreview.name}
        </p>
        <p className="font-medium">
          <span className="text-gray-600">Daily Note: </span> {workoutPreview.dailyNote}
        </p>
        <div className="mt-6">
          <WorkoutPreviewer workouts={workoutPreview as Workout} />
        </div>
      </Modal>

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
              <Link to={`/program/${params.programId}/plan/${params.planId}/workouts/new?date=${selectedDay}`}>
                🏋️ Workout
              </Link>
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
}
