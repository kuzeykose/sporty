import { Link, useLoaderData, useParams } from '@remix-run/react';
import { ActionArgs } from '@remix-run/server-runtime';
import { getWorkouts } from '~/utils/workout.server';

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

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Workouts</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the workouts in your plan including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link to={`/program/${params.programId}/plan/${params.planId}/workouts/new`}>
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Workout
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Workout Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Daily Note
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Created By
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {workouts?.map((workout: any) => (
                  <tr key={workout.date}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {workout.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{workout.date}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{workout.dailyNote}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{workout.createdBy}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a className="text-indigo-600 hover:text-indigo-900">
                        <Link
                          to={`/program/${workout.programId}/plan/${workout.planId}/workouts/new?workout=${workout.workoutId}&date=${workout.date}`}
                        >
                          Edit
                        </Link>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
