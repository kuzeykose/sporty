import { Express } from 'express';
import { create, list, update, get } from '../contollers/workout.contoller';
import verify from '../middlewares/jwt';

const Workout = (app: Express) => {
  app.get('/api/workout/list', list);
  app.post('/api/workout/create', [verify.verifyToken, verify.isAdmin], create);
  app.post('/api/workout/update', [verify.verifyToken, verify.isAdmin], update);
  app.get('/api/workout/get', [verify.verifyToken, verify.isAdmin], get);
};

export default Workout;
