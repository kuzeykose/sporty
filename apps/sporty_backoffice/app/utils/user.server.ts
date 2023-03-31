import { getJwtToken } from './session.server';

export async function getUsers(request: Request) {
  const aa = (await getJwtToken(request)) as string;

  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': aa,
    },
  };

  const responseHandler = async (response: Response) => {
    const text = await response.text();
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = data && data.message;
      return Promise.reject();
    }

    return data;
  };

  return fetch('http://localhost:8080/api/user/list', requestOptions)
    .then(responseHandler)
    .then((users) => {
      return users.Items;
    });
}
