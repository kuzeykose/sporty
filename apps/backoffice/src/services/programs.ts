import axios, { AxiosResponse } from 'axios';
import backendConfig from './backendConfig';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Program } from '@/constants/Programs.type';

export async function getPrograms() {
  const session: any = await getSession();

  if (session?.user?.accessToken) {
    return axios
      .get(`${backendConfig.url}/api/backoffice/program/list`, {
        headers: { 'x-access-token': session?.user?.accessToken },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  } else {
    redirect('/signin');
  }
}

// export async function getProgram(programId: string) {
//   const session: any = await getSession();

//   const searchParams = new URLSearchParams();
//   searchParams.append('programId', programId);

//   if (session?.user?.accessToken) {
//     return axios
//       .get(`${backendConfig.url}/api/backoffice/program?${searchParams.toString()}`, {
//         headers: { 'x-access-token': session?.user?.accessToken },
//       })
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => console.log(err));
//   } else {
//     redirect('/signin');
//   }
// }
