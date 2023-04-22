import { Container, Card, Box, Input, Button } from 'ui';
import { ActionArgs } from '@remix-run/server-runtime';

import { useLoaderData } from '@remix-run/react';
import { MagnifyingGlassIcon, SquaresPlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { getPrograms } from '~/utils/program.server';

// export const loader = async ({ request }: ActionArgs) => {
//   const plans = await getPrograms(request);
//   console.log(plans);
//   return plans;
// };

export default function Index() {
  // const data = useLoaderData<typeof loader>();

  return <></>;
}
