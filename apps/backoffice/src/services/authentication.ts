type LoginForm = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginForm) {
  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
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

  return fetch('http://localhost:8080/api/auth/signin', requestOptions)
    .then(responseHandler)
    .then((user) => {
      return user;
    });
}
