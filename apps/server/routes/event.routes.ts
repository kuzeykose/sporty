import { Express } from 'express';
import { create, list, update, get } from '../contollers/event.controller';
import verify from '../middlewares/jwt';

const Event = (app: Express) => {
  app.get('/api/event/list', list);
  app.post('/api/event/create', [verify.verifyToken, verify.isAdmin], create);
  app.post('/api/event/update', [verify.verifyToken, verify.isAdmin], update);
  app.get('/api/event/get', [verify.verifyToken, verify.isAdmin], get);
};

export default Event;
