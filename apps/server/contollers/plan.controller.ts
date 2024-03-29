import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ddb } from '../aws';
import { uploadImage } from '../services/UploadImage';
import jwt from 'jsonwebtoken';

export async function create(req: Request, res: Response) {
  try {
    const { image, endDate, startDate, programId, planNote, planName, planDescription } = req.body;
    const token = req.headers['x-access-token'] as string;
    const tokenValues: any = jwt.decode(token);
    const planId = uuidv4();
    const secretKey = uuidv4();

    const imageUrl = await uploadImage(image);

    if (imageUrl.Location) {
      const workoutParams = {
        TableName: 'Sporty',
        Item: {
          PK: `PROGRAM#${programId}`,
          SK: `PLAN#${planId}`,
          date: [startDate, endDate],
          planNote,
          owner: tokenValues.email,
          secretKey: secretKey,
          status: 'active', //'passive' 'achived'
          createdAt: new Date().toISOString(),
          planName,
          planDescription,
          programId,
          planId,
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
}

export async function list(req: Request, res: Response) {
  const { programId } = req.query;

  const getPlanListParams = {
    TableName: 'Sporty',
    KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `PROGRAM#${programId}`,
      ':sk': 'PLAN#',
    },
  };

  ddb.query(getPlanListParams, (err, data) => {
    if (err) {
      console.log('Error', err);
      return;
    }

    res.status(200).send(data?.Items);
  });
}

export async function get(req: Request, res: Response) {
  const { programId, planId } = req.query;

  const getPlanParams = {
    TableName: 'Sporty',
    Key: {
      PK: `PROGRAM#${programId}`,
      SK: `PLAN#${planId}`,
    },
  };

  ddb.get(getPlanParams, (err, data) => {
    if (err) {
      console.log('Error', err);
      return;
    } else {
      res.status(200).send(data?.Item);
    }
  });
}
