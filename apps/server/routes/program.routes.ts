import { Express } from 'express';
import { create, get, list } from '../contollers/program.contoller';
import verify from '../middlewares/jwt';

const Program = (app: Express) => {
  app.post('/api/backoffice/program/create', [verify.verifyToken, verify.isAdmin], create);
  app.get('/api/backoffice/program/list', [verify.verifyToken, verify.isAdmin], list);
  app.get('/api/backoffice/program', [verify.verifyToken, verify.isAdmin], get);
};

export default Program;
