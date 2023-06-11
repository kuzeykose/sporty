import { Express } from 'express';
import { create, list, update } from '../contollers/workout.contoller';
import verify from '../middlewares/jwt';

const Workout = (app: Express) => {
  app.get('/api/workout/list', list);
  app.post('/api/workout/create', [verify.verifyToken, verify.isAdmin], create);
  app.post('/api/workout/update', [verify.verifyToken, verify.isAdmin], update);
};

export default Workout;
