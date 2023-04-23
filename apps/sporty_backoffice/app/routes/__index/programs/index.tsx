import { Container, Card, Box, Input, Button } from 'ui';
import { ActionArgs } from '@remix-run/server-runtime';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { MagnifyingGlassIcon, SquaresPlusIcon } from '@heroicons/react/24/solid';
import { getPrograms } from '~/utils/program.server';
import dayjs from 'dayjs';

type Program = {
  descriotion: string;
  id: string;
  name: string;
  status: string;
  createdAt: string;
};

export const loader = async ({ request }: ActionArgs) => {
  const programs = await getPrograms(request);
  programs.sort((a: Program, b: Program) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1));
  return programs;
};

export default function Index() {
  const programs = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <>
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
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program: Program) => (
            <li key={program.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
              <Link to={`/programs/${program.id}`}>
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex flex-col items-center space-x-3">
                      <h3 className="truncate text-sm font-medium text-gray-900">{program.name}</h3>
                      <div className="flex">
                        <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          {program.status}
                        </span>
                        <div>
                          <>{dayjs(program.createdAt).format('DD/MM/YYYY HH:mm')}</>
                        </div>
                      </div>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">{program.descriotion}</p>
                  </div>
                  {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={person.image} alt="" /> */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
