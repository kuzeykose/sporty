import { useState } from 'react';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { ActionArgs } from '@remix-run/server-runtime';
import { Modal } from 'ui';
import { Workout } from '~/types/workout';
import { getWorkouts } from '~/utils/workout.server';
import { WorkoutPreviewer } from 'components';

interface WorkoutList extends Workout {
  name: string;
  date: string;
  dailyNote: string;
  createdBy: string;
  programId: string;
  planId: string;
  workoutId: string;
}

export const loader = async ({ request, params }: ActionArgs) => {
  const { programId, planId } = params;
  if (programId && planId) {
    const workouts = await getWorkouts(request, programId, planId);
    return workouts;
  } else {
    throw '';
  }
};

export default function Example() {
  const params = useParams();
  const workouts = useLoaderData<typeof loader>();
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [workoutPreview, setWorkoutPreview] = useState<Workout>({} as Workout);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Events</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all the events according to your plan.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link to={`/programs/${params.programId}/plans/${params.planId}/events/new`}>
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Event
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
