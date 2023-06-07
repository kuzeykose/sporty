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

export async function getWorkout(request: Request, programId: string, planId: string, workoutId: string, date: string) {
  const searchParams = new URLSearchParams();
  searchParams.append('programId', programId);
  searchParams.append('planId', planId);
  searchParams.append('workoutId', workoutId);
  searchParams.append('date', date);

  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  };

  return fetch(`http://localhost:8080/api/workout/get?${searchParams.toString()}`, requestOptions)
    .then(responseHandler)
    .then((workout) => {
      return workout;
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

export async function updateWorkout(
  request: Request,
  programId: string,
  planId: string,
  workoutId: string,
  date: string,
  workout: any
) {
  const token = (await getJwtToken(request)) as string;

  console.log(programId, planId, workoutId, workout);

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      programId,
      planId,
      workoutId,
      workout,
    }),
    headers: {
      'content-type': 'application/json',
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/workout/update', requestOptions)
    .then(responseHandler)
    .then((res) => {
      return res;
    });
}
