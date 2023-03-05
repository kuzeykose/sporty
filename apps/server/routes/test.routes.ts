import {Express,Request,Response} from 'express';
import verify from '../middlewares/jwt';

import {ddb} from '../aws';

const Test = (app: Express) => {
  app.get('/api/test/public', (req, res) => {
    res.send('public access!')
  })
  app.get('/api/test/user',[verify.verifyToken, verify.isUser],(req:Request, res:Response) => {
      res.send('user access!')
    }
  )
  app.get('/api/test/admin', [verify.verifyToken, verify.isAdmin], (req:Request, res:Response) => {
    res.send('admin access!')
  })
}

export default Test;