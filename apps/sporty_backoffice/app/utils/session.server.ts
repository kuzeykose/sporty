import { createCookieSessionStorage, redirect } from '@remix-run/node';
import jwt from 'jsonwebtoken';

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

const sessionSecret = 'test';
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'RJ_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const email = session.get('email');
  if (!email || typeof email !== 'string') return null;
  return email;
}

export async function getJwtToken(request: Request) {
  const session = await getUserSession(request);
  const email = session.get('jwtToken');
  if (!email || typeof email !== 'string') return null;
  return email;
}

export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const session = await getUserSession(request);
  const email = session.get('email');
  if (!email || typeof email !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login`);
  }
  return email;
}

export async function createUserSession(email: string, roles: string[], redirectTo: string) {
  const jwtToken = jwt.sign({ email, roles }, 'test');
  const session = await storage.getSession();
  session.set('email', email);
  session.set('jwtToken', jwtToken);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== 'string') {
    return null;
  }

  try {
    // const user = await db.user.findUnique({
    //   where: { id: userId },
    //   select: { id: true, username: true },
    // });
    // return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}
