import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ddb } from '../aws';
import jwt from 'jsonwebtoken';

export async function create(req: Request, res: Response) {
  try {
    const token = req.headers['x-access-token'] as string;
    const tokenValues: any = jwt.decode(token);

    const { projectName, projectDescription } = req.body;
    const id = uuidv4();
    const secretKey = uuidv4();

    let userParams = {
      TableName: 'Sporty',
      Key: {
        PK: `USER#${tokenValues.email}`,
        SK: `#METADATA#${tokenValues.email}`,
      },
    };

    ddb.get(userParams, function (err, data) {
      if (err) console.log(err);
      else {
        const user: any = data.Item;

        const params = {
          RequestItems: {
            Sporty: [
              {
                PutRequest: {
                  Item: {
                    PK: `PROGRAM#${id}`,
                    SK: `#METADATA#${id}`,
                    name: projectName,
                    description: projectDescription,
                    id: id,
                    owner: tokenValues.email,
                    secretKey: secretKey,
                    status: 'active', //'passive' 'achived'
                    createdAt: new Date().toISOString(),
                  },
                },
              },
              {
                PutRequest: {
                  Item: {
                    PK: `PROGRAM#${id}`,
                    SK: `USER#${tokenValues.email}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: tokenValues.email,
                    name: projectName,
                    description: projectDescription,
                    id: id,
                    status: 'active', //'passive' 'achived'
                    roles: ['OWNER'],
                  },
                },
              },
            ],
          },
        };

        ddb.batchWrite(params, (err, data) => {
          if (err) {
            res.status(400).send({ message: 'Can not created', err });
          } else {
            res.status(200).send({ status: 'success', message: 'Program created!' });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

export async function list(req: Request, res: Response) {
  try {
    const token = req.headers['x-access-token'] as string;
    const tokenValues: any = jwt.decode(token);

    const getProgramListParams = {
      TableName: 'Sporty',
      FilterExpression: 'SK = :sk and begins_with(PK, :pk)',
      ExpressionAttributeValues: {
        ':pk': `PROGRAM#`,
        ':sk': `USER#${tokenValues.email}`,
      },
    };

    ddb.scan(getProgramListParams, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.status(200).send([]);
        return;
      } else {
        res.status(200).send(data.Items);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

export async function get(req: Request, res: Response) {
  try {
    const id = req.query.programId;
    const getProgramParams = {
      TableName: 'Sporty',
      Key: {
        PK: `PROGRAM#${id}`,
        SK: `#METADATA#${id}`,
      },
    };

    ddb.get(getProgramParams, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data?.Item);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
