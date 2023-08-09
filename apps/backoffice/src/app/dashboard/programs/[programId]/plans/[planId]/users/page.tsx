'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useParams } from 'next/navigation';
import { getUsers } from '@/services/users';
import { User } from '@/constants/Programs.type';

type TableUserProps = {
  name: string;
  title: string;
  email: string;
  role: string;
};

export default function PlanUserPage() {
  const [users, setUsers] = useState<User[]>();

  const params = useParams();
  const programId = params.programId;

  useEffect(() => {
    (async () => {
      getUsers(programId as string).then((res) => {
        console.log('user:', res);
        setUsers(res);
      });
    })();
  }, []);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>There is no user.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
