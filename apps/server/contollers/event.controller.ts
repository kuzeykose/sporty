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
      ':sk': `EVENT#${planId}`,
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
  const eventId = uuidv4();

  const { programId, planId, date, name, description } = req.body;

  const eventParams = {
    TableName: 'Sporty',
    Item: {
      PK: `PROGRAM#${programId}`,
      SK: `EVENT#${planId}#${eventId}#${date}`,
      programId,
      planId,
      eventId,
      createdBy: tokenValues.email,
      createdAt: new Date().toISOString(),
      date,
      name,
      description,
    },
  };

  ddb.put(eventParams, (err, data) => {
    if (err) {
      console.log('Error', err);
      res.status(400).send({ status: 'fail', message: 'Event fail!' });
    } else {
      console.log('Event created!', data);
      res.status(200).send({ status: 'success', message: 'Event created!' });
    }
  });
}

export async function update(req: Request, res: Response) {
  const token = req.headers['x-access-token'] as string;
  const tokenValues: any = jwt.decode(token);

  const { programId, planId, eventId, date, name, description } = req.body;

  const eventParams = {
    TableName: 'Sporty',
    Item: {
      PK: `PROGRAM#${programId}`,
      SK: `EVENT#${planId}#${eventId}#${date}`,
      date,
      name,
      description,
      eventId,
      updatedBy: tokenValues.email,
      updatedAt: new Date().toISOString(),
    },
  };

  ddb.put(eventParams, (err, data) => {
    if (err) {
      console.log('Error', err);
      res.status(400).send({ status: 'fail', message: 'Event fail!' });
    } else {
      console.log('Event created!', data);
      res.status(200).send({ status: 'success', message: 'Event updated!' });
    }
  });
}

export async function get(req: Request, res: Response) {
  const { programId, planId, eventId, date } = req.query;

  const getUserListParams = {
    TableName: 'Sporty',
    Key: {
      PK: `PROGRAM#${programId}`,
      SK: `EVENT#${planId}#${eventId}#${date}`,
    },
  };

  ddb.get(getUserListParams, (err, data) => {
    if (err) {
      console.log('Error', err);
      return;
    }

    res.status(200).send(data?.Item);
  });
}
