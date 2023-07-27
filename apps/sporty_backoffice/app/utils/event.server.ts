import { Event } from '~/types/event';
import { responseHandler } from './helpers';
import { getJwtToken } from './session.server';

export async function getEvents(request: Request, programId: string, planId: string) {
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

  return fetch(`http://localhost:8080/api/event/list?${searchParams.toString()}`, requestOptions)
    .then(responseHandler)
    .then((programs) => {
      return programs;
    });
}

export async function getEvent(request: Request, programId: string, planId: string, eventId: string, date: string) {
  const searchParams = new URLSearchParams();
  searchParams.append('programId', programId);
  searchParams.append('planId', planId);
  searchParams.append('eventId', eventId);
  searchParams.append('date', date);

  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  };

  console.log(searchParams.toString());
  return fetch(`http://localhost:8080/api/event/get?${searchParams.toString()}`, requestOptions)
    .then(responseHandler)
    .then((event) => {
      return event;
    });
}

export async function createEvent(
  request: Request,
  programId: string,
  planId: string,
  date: string,
  name: string,
  description: string
) {
  const token = (await getJwtToken(request)) as string;

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      programId,
      planId,
      date,
      description,
      name,
    }),
    headers: {
      'content-type': 'application/json',
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/event/create', requestOptions)
    .then(responseHandler)
    .then((res) => {
      return res;
    });
}

export async function updateEvent(
  request: Request,
  programId: string,
  planId: string,
  eventId: string,
  date: string,
  event: any
) {
  const token = (await getJwtToken(request)) as string;

  console.log(programId, planId, eventId, event);

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      programId,
      planId,
      eventId,
      event,
    }),
    headers: {
      'content-type': 'application/json',
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/event/update', requestOptions)
    .then(responseHandler)
    .then((res) => {
      return res;
    });
}
