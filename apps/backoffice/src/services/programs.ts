import axios, { AxiosResponse } from 'axios';
import backendConfig from './backendConfig';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export async function getPrograms() {
  const session: any = await getServerSession(options);

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

export async function getProgram(programId: string) {
  const session: any = await getServerSession(options);

  if (session?.user?.accessToken) {
    return axios
      .get(`${backendConfig.url}/api/backoffice/program`, {
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
