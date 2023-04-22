import { Express, Request, Response } from 'express';
import verify from '../middlewares/jwt';

import { ddb } from '../aws';

const User = (app: Express) => {
  app.post('/api/user/put/programId', (req, res) => {
    console.log(req);

    // const { email, password } = req.body;

    // const signinParams = {
    //   TableName: 'Sporty',
    //   Key: {
    //     PK: `USER#${email}`,
    //     SK: `#METADATA#${email}`,
    //   },
    // };

    // ddb.get(signinParams, (err, data: AWS.DynamoDB.DocumentClient.GetItemOutput) => {
    //   if (err) {
    //     console.log('Error', err);
    //   } else {
    //     const passwordIsValid = bcryptjs.compareSync(password, data?.Item?.password);

    //     if (!passwordIsValid) {
    //       return res.status(401).send({
    //         message: 'Invalid password!',
    //       });
    //     }

    //     const token = jwt.sign({ email: email, roles: data.Item?.roles }, config.secret, { expiresIn: 86400 });

    //     res.status(200).send({
    //       email: email,
    //       roles: data.Item?.roles,
    //       accessToken: token,
    //     });
    //   }
    // });
  });

  app.get('/api/user/list', [verify.verifyToken], (req: Request, res: Response) => {
    const getUserListParams = {
      TableName: 'Sporty',
      FilterExpression: 'begins_with(PK, :pk)',
      ExpressionAttributeValues: {
        ':pk': 'USER#',
      },
    };

    ddb.scan(getUserListParams, (req, data) => {
      data.Items?.map((item) => delete item.password);
      res.status(200).send(data);
    });

    // res.send('admin access!')
  });
};

export default User;
