import { Button, Card, Box } from 'ui';
import { useLoaderData } from '@remix-run/react';
import { ActionArgs } from '@remix-run/server-runtime';
import { getUsers } from '~/utils/user.server';
import clsx from 'clsx';

type User = {
  firstname: string;
  lastname: string;
  email: string;
  roles: string[];
};

export const loader = async ({ request }: ActionArgs) => {
  const users = await getUsers(request);
  return users;
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <Box className="mx-auto">
      <Card>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name, title, email and role.
              </p>
            </div>
            <div className="space-x-2">
              <Button>Add User</Button>
              <Button>Import Excel</Button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        First Name
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                        Last Name
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                        Roles
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.map((person: User) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {person.firstname}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.lastname}</td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.roles.map((role) => (
                            <span
                              key={role}
                              className={clsx(
                                role === 'ADMIN' && 'bg-yellow-100 text-yellow-800',
                                role === 'USER' && 'bg-green-100 text-green-800',
                                'inline-flex rounded-full  px-2 text-xs font-semibold leading-5'
                              )}
                            >
                              {role}
                            </span>
                          ))}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit<span className="sr-only">, {person.firstname}</span>
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
      </Card>
    </Box>
  );
}
