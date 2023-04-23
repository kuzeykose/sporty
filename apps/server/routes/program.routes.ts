import { Express, NextFunction, Request, Response } from 'express';
import verify from '../middlewares/jwt';
import { v4 as uuidv4 } from 'uuid';
import { ddb } from '../aws';
import jwt from 'jsonwebtoken';
import { config } from '../configs/auth.config';

const createProgram = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-access-token'] as string;
    const tokenValues: any = jwt.decode(token);

    const { projectName, projectDescription } = req.body;
    const id = uuidv4();
    const secretKey = uuidv4();

    (req as any).data = { id: id, email: tokenValues.email };
    const programParams = {
      TableName: 'Sporty',
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
    };

    ddb.put(programParams, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.status(400).send(err);
      } else {
        res.status(200).send({ status: 'success', message: 'Program created!' });
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const putProgramId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, email } = (req as any).data;
    const params = {
      TableName: 'Sporty',
      Key: {
        PK: `USER#${email}`,
        SK: `#METADATA#${email}`,
      },
      UpdateExpression: 'SET #attrName = list_append(#attrName, :newArray) ',
      ExpressionAttributeNames: {
        '#attrName': 'programs',
      },
      ExpressionAttributeValues: {
        ':newArray': [id],
      },
    };

    ddb.update(params, (err, data) => {
      if (err) {
        console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
      } else {
        console.log('Updated item:', JSON.stringify(data, null, 2));
      }

      res.status(200);
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const Program = (app: Express) => {
  app.post('/api/program/create', [verify.verifyToken, verify.isAdmin], [createProgram, putProgramId]);

  app.get('/api/program/list', [verify.verifyToken, verify.isAdmin], async (req: Request, res: Response) => {
    try {
      const token = req.headers['x-access-token'] as string;
      const tokenValues: any = jwt.decode(token);
      const getProgramListParams = {
        TableName: 'Sporty',
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': `USER#${tokenValues.email}`,
        },
      };

      ddb.query(getProgramListParams, (err, data) => {
        if (err) {
          console.log('Error', err);
          return;
        }
        const userData: any = data?.Items;
        const programKeys = userData[0].programs.map((programId: string) => ({
          PK: `PROGRAM#${programId}`,
          SK: `#METADATA#${programId}`,
        }));

        const params = {
          RequestItems: {
            Sporty: {
              Keys: programKeys,
              ProjectionExpression: '#projectName, id, description, #projectStatus, createdAt',
              ExpressionAttributeNames: {
                '#projectName': 'name',
                '#projectStatus': 'status',
              },
            },
          },
          ReturnConsumedCapacity: 'TOTAL',
        };

        ddb.batchGet(params, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(data.Responses?.Sporty);
            // console.log(JSON.stringify(data, null, 4));
          }
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  app.get('/api/program', [verify.verifyToken, verify.isAdmin], async (req: Request, res: Response) => {
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

    try {
    } catch (error) {
      console.log(error);
    }
  });
};

export default Program;
