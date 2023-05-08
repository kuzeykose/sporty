import { responseHandler } from './helpers';
import { getJwtToken } from './session.server';

export async function getUsers(request: Request, programId: string) {
  const searchParams = new URLSearchParams();
  searchParams.append('programId', programId);

  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  };

  return fetch(`http://localhost:8080/api/user/list?${searchParams.toString()}`, requestOptions)
    .then(responseHandler)
    .then((users) => {
      return users;
    });
}

export async function getPlanUsers(request: Request, programId: string, planId: string) {
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

  return fetch(`http://localhost:8080/api/user/plan/list?${searchParams.toString()}`, requestOptions)
    .then(responseHandler)
    .then((users) => {
      return users;
    });
}

export async function createUserInProgram(request: Request, email: string, programId: string) {
  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ email, programId }),
    headers: {
      'content-type': 'application/json',
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/user/backoffice/program/create', requestOptions)
    .then(responseHandler)
    .then((users) => {
      return users;
    });
}

export async function createUserInPlan(request: Request, email: string, programId: string, planId: string) {
  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ email, programId, planId }),
    headers: {
      'content-type': 'application/json',
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/user/backoffice/plan/create', requestOptions)
    .then(responseHandler)
    .then((users) => {
      return users;
    });
}
