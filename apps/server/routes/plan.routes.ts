import { Express } from 'express';
import { create, get, list } from '../contollers/plan.controller';
import verify from '../middlewares/jwt';

const Plan = (app: Express) => {
  app.post('/api/plan/create', [verify.verifyToken, verify.isAdmin], create);
  app.get('/api/plan/list', [verify.verifyToken, verify.isAdmin], list);
  app.get('/api/plan', [verify.verifyToken, verify.isAdmin], get);
};

export default Plan;
