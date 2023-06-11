import { Express, Request, Response } from 'express';
import { create, list } from '../contollers/plan.controller';
import verify from '../middlewares/jwt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { ddb, s3 } from '../aws';

const Plan = (app: Express) => {
  app.post('/api/plan/create', [verify.verifyToken, verify.isAdmin], create);
  app.get('/api/plan/list', [verify.verifyToken, verify.isAdmin], list);
};

export default Plan;
