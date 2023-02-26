import {Express,Request,Response} from 'express';
import AWS from 'aws-sdk';
import verify from '../middlewares/jwt';

import {ddb} from '../aws';

const Test = (app: Express) => {
  app.get('/api/test/public', (req, res) => {
    res.send('public access!')
  })

  app.get(
    '/api/test/user',
    [verify.verifyToken, verify.isUser],
    (req:Request, res:Response) => {
      res.send('user access!')
    }
  )

  app.get('/api/test/admin', [verify.verifyToken, verify.isAdmin], (req:Request, res:Response) => {
    res.send('admin access!')
  })

  app.get('/api/user/list', (req:Request, res:Response) => {

    const getUserListParams = {
      TableName: 'Sporty',
      FilterExpression: "begins_with(PK, :pk)",
      ExpressionAttributeValues: {
        ":pk": "USER#"
      }
    }

    ddb.scan(getUserListParams, (req, data) => {      
      data.Items?.map(item => delete item.password)
      res.status(200).send(data)
    })

    // res.send('admin access!')
  })

  app.get('/api/workout/list', (req:Request, res:Response) => {

    const getUserListParams = {
      TableName: 'Sporty',
      FilterExpression: "begins_with(SK, :sk)",
      ExpressionAttributeValues: {
        ":sk": "WORKOUT"
      }
    }

    ddb.scan(getUserListParams, (req, data) => {      
      data.Items?.map(item => delete item.password)
      res.status(200).send(data)
    })

    // res.send('admin access!')
  })
}

export default Test;