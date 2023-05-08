import { Express, Request, Response } from 'express';
import verify from '../middlewares/jwt';

import { ddb } from '../aws';

const User = (app: Express) => {
  app.get('/api/user/list', [verify.verifyToken, verify.isAdmin], (req: Request, res: Response) => {
    const { programId } = req.query;
    const getUserListParams = {
      TableName: 'Sporty',
      KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `PROGRAM#${programId}`,
        ':sk': `USER#`,
      },
    };

    ddb.query(getUserListParams, (req, data) => {
      res.status(200).send(data.Items);
    });
  });

  app.get('/api/user/plan/list', (req: Request, res: Response) => {
    const { programId, planId } = req.query;
    const getUserListParams = {
      TableName: 'Sporty',
      FilterExpression: 'PK = :pk and contains(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `PROGRAM#${programId}`,
        ':sk': `#PLAN#${planId}`,
      },
    };

    ddb.scan(getUserListParams, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data.Items);
      }
    });
  });

  app.post(
    '/api/user/backoffice/program/create',
    [verify.verifyToken, verify.isAdmin],
    (req: Request, res: Response) => {
      const { email, programId } = req.body;

      let userParams = {
        TableName: 'Sporty',
        Key: {
          PK: `USER#${email}`,
          SK: `#METADATA#${email}`,
        },
      };

      ddb.get(userParams, function (err, data) {
        const user: any = data.Item;
        const getProgramInfoParams = {
          TableName: 'Sporty',
          Key: {
            PK: `PROGRAM#${programId}`,
            SK: `#METADATA#${programId}`,
          },
        };

        ddb.get(getProgramInfoParams, (req, data) => {
          const program: any = data.Item;
          const programUserParams = {
            TableName: 'Sporty',
            Item: {
              PK: `PROGRAM#${programId}`,
              SK: `USER#${email}`,
              roles: ['USER'],
              status: program.status,
              name: program.name, // program name
              description: program.description, // program description
              id: program.id, // program id
              firstName: user.firstName, // user first name
              lastName: user.lastName, // user last name
              email: email,
            },
          };

          ddb.put(programUserParams, (err, data) => {
            if (err) {
              console.log('Error', err);
              res.status(400).send(err);
            } else {
              res.status(200).send({ message: `User created in ${programId}!` });
            }
          });
        });
      });
    }
  );

  app.post('/api/user/backoffice/plan/create', [verify.verifyToken, verify.isAdmin], (req: Request, res: Response) => {
    const { email, programId, planId } = req.body;

    let userParams = {
      TableName: 'Sporty',
      Key: {
        PK: `USER#${email}`,
        SK: `#METADATA#${email}`,
      },
    };

    ddb.get(userParams, function (err, data) {
      const user: any = data.Item;
      const getPlanInfoParams = {
        TableName: 'Sporty',
        Key: {
          PK: `PROGRAM#${programId}`,
          SK: `PLAN#${planId}`,
        },
      };

      ddb.get(getPlanInfoParams, function (err, data) {
        const plan: any = data.Item;
        const planUserParams = {
          TableName: 'Sporty',
          Item: {
            PK: `PROGRAM#${programId}`,
            SK: `USER#${email}#PLAN#${planId}`,
            roles: ['USER'],
            status: plan.status,
            name: plan.name, // program name
            description: plan.description, // program description
            id: plan.id, // program id
            firstName: user.firstName, // user first name
            lastName: user.lastName, // user last name
            email: email,
          },
        };
        ddb.put(planUserParams, function (err, data) {
          if (err) {
            console.log('Error', err);
            res.status(400).send(err);
          } else {
            console.log(`User created in ${planId}!`);
            res.status(200).send({ message: `User created in ${planId}!` });
          }
        });
      });
    });
  });
};

export default User;
