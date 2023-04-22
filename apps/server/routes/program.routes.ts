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
    // @ts-ignore
    req.data = { id: id, email: tokenValues.email };
    const programParams = {
      TableName: 'Sporty',
      Item: {
        PK: `PROGRAM#${id}`,
        SK: `#METADATA#${id}`,
        name: projectName,
        description: projectDescription,
        id: id,
        owner: tokenValues.email,
      },
    };

    ddb.put(programParams, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.status(400).send(err);
      } else {
        res.status(200).send({ status: 'success', message: 'Program created!' });
      }
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const putProgramId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { id, email } = req.data;
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
    // try {
    //   const getProgramListParams = {
    //     TableName: 'Sporty',
    //     KeyConditionExpression: 'begins_with(PK, :pk)',
    //     ExpressionAttributeValues: {
    //       ':pk': `PROGRAM`,
    //     },
    //   };
    //   ddb.query(getProgramListParams, (err, data) => {
    //     if (err) {
    //       console.log('Error', err);
    //       return;
    //     }
    //     res.status(200).send(data?.Items);
    //   });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500);
    // }
  });
};

export default Program;
