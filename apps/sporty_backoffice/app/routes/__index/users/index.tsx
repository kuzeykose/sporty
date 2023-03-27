import { Button, Card, Box } from 'ui';

const people = [
  { fistName: 'Lindsay', lastName: 'Walton', email: 'lindsay.walton@example.com', role: 'Member' },
  { fistName: 'Lindsay', lastName: 'Walton', email: 'lindsay.walton@example.com', role: 'Member' },
  { fistName: 'Lindsay', lastName: 'Walton', email: 'lindsay.walton@example.com', role: 'Member' },
  { fistName: 'Lindsay', lastName: 'Walton', email: 'lindsay.walton@example.com', role: 'Member' },
  { fistName: 'Lindsay', lastName: 'Walton', email: 'lindsay.walton@example.com', role: 'Member' },
  { fistName: 'Lindsay', lastName: 'Walton', email: 'lindsay.walton@example.com', role: 'Member' },
];

export default function Index() {
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
                        Role
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {person.fistName}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.lastName}</td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.email}</td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.role}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit<span className="sr-only">, {person.fistName}</span>
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
