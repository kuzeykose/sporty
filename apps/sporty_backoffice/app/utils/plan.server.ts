import { responseHandler } from './helpers';
import { getJwtToken } from './session.server';

export async function getPlans(request: Request) {
  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/plan/list', requestOptions)
    .then(responseHandler)
    .then((plans) => {
      return plans;
    });
}
