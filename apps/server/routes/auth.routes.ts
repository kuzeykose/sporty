import { Express } from 'express';
import { signUp, singIn } from '../contollers/auth.controller';

const Auth = (app: Express) => {
  app.post('/api/auth/signup', signUp);
  app.post('/api/auth/signin', singIn);
};

export default Auth;
