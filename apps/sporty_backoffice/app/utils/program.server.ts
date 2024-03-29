import { responseHandler } from './helpers';
import { getJwtToken } from './session.server';

type CreateProject = {
  request: Request;
  projectName: string;
  projectDescription: string;
};

export async function createProgram(request: Request, projectName: string, projectDescription: string) {
  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      projectName,
      projectDescription,
    }),
    headers: {
      'content-type': 'application/json',
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/backoffice/program/create', requestOptions)
    .then(responseHandler)
    .then((res) => {
      return res;
    });
}

export async function getPrograms(request: Request) {
  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/backoffice/program/list', requestOptions)
    .then(responseHandler)
    .then((programs) => {
      return programs;
    });
}

export async function getProgram(request: Request, programId: string) {
  const searchParams = new URLSearchParams();
  searchParams.append('programId', programId);

  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  };

  return fetch(`http://localhost:8080/api/backoffice/program?${searchParams.toString()}`, requestOptions)
    .then(responseHandler)
    .then((programs) => {
      return programs;
    });
}
