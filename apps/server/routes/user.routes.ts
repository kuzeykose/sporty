import { Express } from 'express';
import { list, planCreateUser, planList, programCreateUser } from '../contollers/user.contoller';
import verify from '../middlewares/jwt';

const User = (app: Express) => {
  app.get('/api/user/list', [verify.verifyToken, verify.isAdmin], list);
  app.get('/api/user/plan/list', [verify.verifyToken, verify.isAdmin], planList);
  app.post('/api/user/backoffice/program/create', [verify.verifyToken, verify.isAdmin], programCreateUser);
  app.post('/api/user/backoffice/plan/create', [verify.verifyToken, verify.isAdmin], planCreateUser);
};

export default User;
