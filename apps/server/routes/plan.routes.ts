import { Express, Request, Response } from 'express';
import verify from '../middlewares/jwt';

import { ddb, s3 } from '../aws';

const Plan = (app: Express) => {
  app.post('/api/plan/create', [verify.verifyToken, verify.isAdmin], async (req: Request, res: Response) => {
    try {
      const { image, planId, date, planNote } = req.body;
      const imageBuffer = Buffer.from(image.data, 'base64');

      let params = {
        Bucket: 'sporty-plan-images',
        Key: image.key,
        Body: imageBuffer,
        ContentEncoding: 'base64',
        ContentType: image.type,
      };
      const imageUrl = await s3.upload(params).promise();

      if (imageUrl.Location) {
        const workoutParams = {
          TableName: 'Sporty',
          Item: {
            PK: `PROGRAM#${planId}`,
            SK: `#METADATA#${planId}`,
            date,
            planNote,
            image: imageUrl.Location,
          },
        };
        ddb.put(workoutParams, (err, data) => {
          if (err) {
            console.log('Error', err);
            res.status(400).send(err);
          } else {
            res.status(200).send({ message: 'Plan created!' });
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  app.get('/api/plan/list', (req: Request, res: Response) => {
    const getPlanListParams = {
      TableName: 'Sporty',
      FilterExpression: 'begins_with(SK, :sk) and begins_with(PK, :pk)',
      ExpressionAttributeValues: {
        ':sk': '#METADATA#',
        ':pk': `PROGRAM#`,
      },
    };

    ddb.scan(getPlanListParams, (err, data) => {
      if (err) {
        console.log('Error', err);
        return;
      }
      // data.Items?.map(item => delete item.password)
      console.log(data);
      res.status(200).send(data?.Items);
    });
  });
};

export default Plan;
