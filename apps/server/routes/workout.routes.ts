import {Express,Request,Response} from 'express';
import verify from '../middlewares/jwt';

import {ddb} from '../aws';

const Workout = (app: Express) => {
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
  })

  app.post('/api/workout/create', [verify.verifyToken, verify.isAdmin], (req:Request, res:Response) => {
    const {plan, date} = req.body;
    const workoutParams = {
      TableName: 'Sporty',
      Item: {
        'PK': `PROGRAM#${plan}`,
        'SK': `WORKOUT#${plan}#${date}`,
        ...req.body
      }
    }

    ddb.put(workoutParams, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Workout created!", data);
        res.status(200).send('Workout created!')
      }
    })

  })

}

export default Workout;