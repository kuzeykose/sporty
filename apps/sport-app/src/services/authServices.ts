import { BehaviorSubject } from 'rxjs';
import { message } from 'antd';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('sporty_token') as string));

// login
const login = (email: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch('http://localhost:8080/api/auth/signin', requestOptions)
    .then(responseHandler)
    .then((user) => {
      localStorage.setItem('sporty_token', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
};

// logout
const logout = () => {
  localStorage.removeItem('sporty_token');
  currentUserSubject.next(null);
};

// responseHandler
const responseHandler = async (response: Response) => {
  const text = await response.text();
  const data = text && JSON.parse(text);

  if (!response.ok) {
    const error = data && data.message;
    message.error(error);

    return Promise.reject();
  }

  return data;
};

export const authServices = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
