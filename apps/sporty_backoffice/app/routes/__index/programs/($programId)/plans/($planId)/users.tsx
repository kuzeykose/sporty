import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import { ActionArgs } from '@remix-run/server-runtime';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { Button, ButtonVariants, Form, Input, Modal } from 'ui';
import { createUserInPlan, getPlanUsers } from '~/utils/user.server';
import { User } from '~/types/user';
import clsx from 'clsx';

export const action = async ({ request, params }: ActionArgs) => {
  let formData = await request.formData();
  const userEmail = formData.get('email') as string;

  const res = await createUserInPlan(request, userEmail, params.programId as string, params.planId as string);
  if (res.status === 200) {
    // throw redirect('/');
  } else {
    return res;
  }
  return '';
};

export const loader = async ({ request, params }: ActionArgs) => {
  const users = await getPlanUsers(request, params.programId as string, params.planId as string);
  return users;
};

export default function Example() {
  const users = useLoaderData<typeof loader>();
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
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
                    Title
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
                {users.map((user: User) => (
                  <tr key={user.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {user.firstName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.lastName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.roles.map((role: string) => (
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
                        Edit<span className="sr-only">, {user.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
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
                {/* <Input className="hidden" name="programId" defaultValue={params.programId} />
                <Input className="hidden" name="planId" defaultValue={params.planId} /> */}
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
