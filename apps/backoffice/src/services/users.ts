import axios, { AxiosResponse } from 'axios';
import backendConfig from './backendConfig';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Program } from '@/constants/Programs.type';

export async function getUsers(programId: string) {
  const session: any = await getSession();

  if (session?.user?.accessToken) {
    return axios
      .get(`${backendConfig.url}/api/user/list`, {
        headers: { 'x-access-token': session?.user?.accessToken },
        params: { programId },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  } else {
    redirect('/signin');
  }
}
