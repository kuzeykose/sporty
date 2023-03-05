import {Express,Request,Response} from 'express';
import verify from '../middlewares/jwt';

import {ddb} from '../aws';

const User = (app: Express) => {
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

}

export default User;