import {Express,Request,Response} from 'express';
import verify from '../middlewares/jwt';

import {ddb} from '../aws';

const Plan = (app: Express) => {
  app.post('/api/plan/create', [verify.verifyToken, verify.isAdmin], (req:Request, res:Response) => {
    const {planId, date, planNote} = req.body;

    const workoutParams = {
      TableName: 'Sporty',
      Item: {
        'PK': `PROGRAM#${planId}`,
        'SK': `#METADATA#${planId}`,
        date,
        planNote
      }
    }

    ddb.put(workoutParams, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        res.status(200).send('Plan created!')
      }
    })
  })

  app.get('/api/plan/list', (req:Request, res:Response) => {
    // const { planId } = req.body;

    const getPlanListParams = {
      TableName: 'Sporty',
      FilterExpression: "begins_with(SK, :sk) and begins_with(PK, :pk)",
      ExpressionAttributeValues: {
        ":sk": "#METADATA#",
        ":pk": `PROGRAM#`
      }
    }

    ddb.scan(getPlanListParams, (err, data) => {      
      if (err) {
        console.log("Error", err);
        return;
      }
      // data.Items?.map(item => delete item.password)
      console.log(data);
      res.status(200).send(data?.Items)
    })
  })

}

export default Plan;