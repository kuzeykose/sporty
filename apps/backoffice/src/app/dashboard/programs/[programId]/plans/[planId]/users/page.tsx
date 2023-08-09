'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useParams } from 'next/navigation';
import { getUsers } from '@/services/users';
import { User } from '@/constants/Programs.type';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function PlanUserPage() {
  const [users, setUsers] = useState<User[]>();

  const params = useParams();
  const programId = params.programId;

  useEffect(() => {
    (async () => {
      getUsers(programId as string).then((res) => {
        setUsers(res);
      });
    })();
  }, []);

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
          <Button>Add User</Button>
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
            users.map((user) => (
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
