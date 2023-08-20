import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from '@/constants/Users.type';
import { getUsers } from '@/services/users';
import AddUserModal from './add-user';

type PlanUserPageParams = {
  params: {
    programId: string;
  };
};

export default async function Users({ params }: PlanUserPageParams) {
  const users = await getUsers(params.programId);

  console.log(users);

  return (
    <>
      <div className="w-full px-4 py-2 flex justify-between items-center">
        <div>
          <p className="text-lg">Users</p>
          <p className="text-sm">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="flex items-center justify-center ml-4">
          <AddUserModal />
        </div>
      </div>
      <Separator className="my-2" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.length ? (
            users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles}</TableCell>
                <TableCell>
                  <Button size="sm" variant="destructive">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            // Buraya "colspan" eklenecek.
            <TableRow>
              <TableCell>There is no user.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
