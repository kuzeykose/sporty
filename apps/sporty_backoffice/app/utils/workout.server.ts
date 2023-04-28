import { responseHandler } from './helpers';
import { getJwtToken } from './session.server';

export async function getWorkouts(request: Request, programId: string, planId: string) {
  const searchParams = new URLSearchParams();
  searchParams.append('programId', programId);
  searchParams.append('planId', planId);
  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  };

  return fetch(`http://localhost:8080/api/workout/list?${searchParams.toString()}`, requestOptions)
    .then(responseHandler)
    .then((programs) => {
      return programs;
    });
}

export async function createWorkout(request: Request, programId: string, planId: string, workout: any) {
  const token = (await getJwtToken(request)) as string;

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      programId,
      planId,
      workout,
    }),
    headers: {
      'content-type': 'application/json',
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/workout/create', requestOptions)
    .then(responseHandler)
    .then((res) => {
      return res;
    });
}
