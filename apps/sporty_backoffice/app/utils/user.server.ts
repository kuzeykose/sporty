import { responseHandler } from './helpers';
import { getJwtToken } from './session.server';

export async function getUsers(request: Request) {
  const token = (await getJwtToken(request)) as string;
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  };

  return fetch('http://localhost:8080/api/user/list', requestOptions)
    .then(responseHandler)
    .then((users) => {
      return users.Items;
    });
}
