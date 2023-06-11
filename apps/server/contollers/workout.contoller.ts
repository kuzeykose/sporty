import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ddb } from '../aws';
import jwt from 'jsonwebtoken';

export async function list(req: Request, res: Response) {
  const { programId, planId } = req.query;
  const getUserListParams = {
    TableName: 'Sporty',
    KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `PROGRAM#${programId}`,
      ':sk': `WORKOUT#${planId}`,
    },
  };

  ddb.query(getUserListParams, (err, data) => {
    if (err) {
      console.log('Error', err);
      return;
    }

    res.status(200).send(data?.Items);
  });
}

export async function create(req: Request, res: Response) {
  const token = req.headers['x-access-token'] as string;
  const tokenValues: any = jwt.decode(token);
  const workoutId = uuidv4();

  const { workout, programId, planId } = req.body;

  const workoutParams = {
    TableName: 'Sporty',
    Item: {
      PK: `PROGRAM#${programId}`,
      SK: `WORKOUT#${planId}#${workoutId}#${workout.date}`,
      programId,
      planId,
      workoutId,
      createdBy: tokenValues.email,
      createdAt: new Date().toISOString(),
      ...workout,
    },
  };

  ddb.put(workoutParams, (err, data) => {
    if (err) {
      console.log('Error', err);
      res.status(400).send({ status: 'fail', message: 'Workout fail!' });
    } else {
      console.log('Workout created!', data);
      res.status(200).send({ status: 'success', message: 'Workout created!' });
    }
  });
}

export async function update(req: Request, res: Response) {
  const token = req.headers['x-access-token'] as string;
  const tokenValues: any = jwt.decode(token);
  const workoutId = uuidv4();

  const { workout, programId, planId } = req.body;

  const workoutParams = {
    TableName: 'Sporty',
    Item: {
      // PK: `PROGRAM#${programId}`,
      // SK: `WORKOUT#${planId}#${workoutId}#${workout.date}`,
      // programId,
      // planId,
      // workoutId,
      // createdBy: tokenValues.email,
      // createdAt: new Date().toISOString(),
      ...workout,
    },
  };

  ddb.put(workoutParams, (err, data) => {
    if (err) {
      console.log('Error', err);
      res.status(400).send({ status: 'fail', message: 'Workout fail!' });
    } else {
      console.log('Workout created!', data);
      res.status(200).send({ status: 'success', message: 'Workout created!' });
    }
  });
}
