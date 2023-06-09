import {
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  PaperClipIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { useLoaderData, useParams } from '@remix-run/react';
import { ActionArgs } from '@remix-run/server-runtime';
import clsx from 'clsx';
import { getProgram } from '~/utils/program.server';

type Program = {
  owner: string;
  name: string;
  id: string;
  description: string;
  status: string;
  createdAt: string;
};

export const loader = async ({ request, params }: ActionArgs) => {
  if (params.programId) {
    const program = await getProgram(request, params.programId);
    return program;
  } else {
    return 'Error';
  }
};

const ProgramId = () => {
  const data: Program = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Program Information</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Program detail.</p>
          </div>
          <div className="mt-6 border-t border-gray-200">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.name}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.description}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.status}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Owner</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.owner}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Settings</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Program settings</p>
          </div>
          <div className="mt-6 border-t border-gray-200">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Id</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.id}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Created At</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.createdAt}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramId;
