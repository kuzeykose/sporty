import { Box, Input, Button } from 'ui';
import { ActionArgs } from '@remix-run/server-runtime';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { MagnifyingGlassIcon, SquaresPlusIcon } from '@heroicons/react/24/solid';
import { getPrograms } from '~/utils/program.server';
import dayjs from 'dayjs';
import clsx from 'clsx';

type Program = {
  description: string;
  id: string;
  name: string;
  status: string;
  createdAt: string;
};

export const loader = async ({ request }: ActionArgs) => {
  const programs = await getPrograms(request);
  programs?.sort((a: Program, b: Program) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1));
  return programs;
};

export default function Index() {
  const programs = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="pt-8 lg:px-8">
      <Box className="flex gap-6">
        <Input className="h-10" placeholder="Search" icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />} />
        <Button
          onClick={() => navigate('/programs/create')}
          className="w-32"
          icon={<SquaresPlusIcon className="h-5 w-5 text-white" />}
        >
          Add New
        </Button>
      </Box>

      <div className="mt-4">
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
          {programs?.map((program: Program) => (
            <Link key={program.id} to={`/program/${program.id}`}>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                  {/* <img
                  src={client.imageUrl}
                  alt={client.name}
                  className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                /> */}
                  <div className="text-sm font-medium leading-6 text-gray-900">{program.name}</div>
                </div>
                <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Description</dt>
                    <dd className="text-gray-700">{program.description}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Status</dt>
                    <dd className="flex items-start gap-x-2">
                      <div
                        className={clsx(
                          'text-green-700 bg-green-50 ring-green-600/20',
                          'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                        )}
                      >
                        {program.status}
                      </div>
                    </dd>
                  </div>
                </dl>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
