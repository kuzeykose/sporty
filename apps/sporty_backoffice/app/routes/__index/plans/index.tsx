import { Container, Card, Box, Input, Button } from 'ui';
import { ActionArgs } from '@remix-run/server-runtime';
import { getPlans } from '~/utils/plan.server';
import { useLoaderData } from '@remix-run/react';
import { MagnifyingGlassIcon, SquaresPlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

// export const loader = async ({ request }: ActionArgs) => {
//   const plans = await getPlans(request);
//   console.log(plans);

//   return plans;
// };

export default function Index() {
  // const data = useLoaderData<typeof loader>();
  // console.log(data);

  const data = [
    {
      SK: '#METADATA#PlanA',
      date: ['2023-03-12', '2023-04-12'],
      PK: 'PROGRAM#PlanA',
      image: 'https://sporty-plan-images.s3.amazonaws.com/test.png',
      planNote: 'PlanA-note',
    },
    {
      SK: '#METADATA#PlanB',
      date: ['2023-03-12', '2023-04-12'],
      PK: 'PROGRAM#PlanB',
      image: 'https://sporty-plan-images.s3.amazonaws.com/Screenshot%202023-03-12%20at%201.07.39%20PM.png',
      planNote: 'PlanB-note',
    },
    {
      SK: '#METADATA#TestC',
      date: ['2023-03-12', '2023-04-12'],
      PK: 'PROGRAM#TestC',
      image: 'https://sporty-plan-images.s3.amazonaws.com/test.png',
      planNote: 'TestC',
    },
    {
      SK: '#METADATA#PlanD',
      date: ['2023-03-19', '2023-04-19'],
      PK: 'PROGRAM#PlanD',
      image: 'https://sporty-plan-images.s3.amazonaws.com/Screenshot%202023-03-12%20at%201.07.39%20PM.png',
      planNote: 'PlanD',
    },
  ];

  return (
    <>
      <Box className="flex gap-6">
        <Input className="h-10" placeholder="Search" icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />} />
        <Button className="w-32" icon={<SquaresPlusIcon className="h-5 w-5 text-white" />}>
          Add New
        </Button>
      </Box>

      <div className="mt-4">
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((person) => (
            <li key={person.PK} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">{person.PK}</h3>
                    <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">{person.planNote}</p>
                </div>
                <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={person.image} alt="" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
