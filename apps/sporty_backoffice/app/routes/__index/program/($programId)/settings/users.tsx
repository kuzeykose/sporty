import { Button, Container, Box, Modal, ButtonVariants, Form, Input } from 'ui';
import { useLoaderData, useParams } from '@remix-run/react';
import { ActionArgs } from '@remix-run/server-runtime';
import { createUserInProgram, getUsers } from '~/utils/user.server';
import clsx from 'clsx';
import { useState } from 'react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

export const action = async ({ request }: ActionArgs) => {
  let formData = await request.formData();
  const userEmail = formData.get('email') as string;
  const programId = formData.get('programId') as string;

  const res = await createUserInProgram(request, userEmail, programId);
  if (res.status === 200) {
    // throw redirect('/');
  } else {
    return res;
  }
  return '';
};

export const loader = async ({ request, params }: ActionArgs) => {
  const users = await getUsers(request, params.programId as string);
  return users;
};

export default function Users() {
  const data = useLoaderData<typeof loader>();
  const params = useParams();
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setModal(true);
            }}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Last Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map(
                  (person: User) => (
                    console.log(person),
                    (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {person.firstName}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.lastName}</td>
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
                            Edit<span className="sr-only">, {person.firstName}</span>
                          </a>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal panelClassName="" open={modal} setOpen={setModal}>
        <Form method="post">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <ClipboardDocumentListIcon className="h-6 w-6 text-orange-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Modal.Title>Create New User!</Modal.Title>
              <div className="mt-2 text-left">
                <Input label="Email" name="email" />
                <Input className="hidden" name="programId" defaultValue={params.programId} />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button variant={ButtonVariants.Secondary}>Cancel</Button>
            <Button type="submit" variant={ButtonVariants.Primary} onClick={() => setModal(false)}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
