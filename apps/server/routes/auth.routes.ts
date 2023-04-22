import { Express } from 'express';
import AWS from 'aws-sdk';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../configs/auth.config';
import { ddb } from '../aws';

const Auth = (app: Express) => {
  app.post('/api/auth/signup', (req, res) => {
    const { username, lastname, email, password } = req.body;

    const signupParams = {
      TableName: 'Sporty',
      Item: {
        PK: `USER#${email}`,
        SK: `#METADATA#${email}`,
        username: username,
        lastname: lastname,
        email: email,
        password: bcryptjs.hashSync(password, 8),
        roles: ['ADMIN'],
        programs: [],
      },
    };

    ddb.put(signupParams, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('User created', data);
        res.send('User created!');
      }
    });
  });

  app.post('/api/auth/signin', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.body, 'test');

    const { email, password } = req.body;

    const signinParams = {
      TableName: 'Sporty',
      Key: {
        PK: `USER#${email}`,
        SK: `#METADATA#${email}`,
      },
    };

    ddb.get(signinParams, (err, data: AWS.DynamoDB.DocumentClient.GetItemOutput) => {
      if (err) {
        console.log('Error', err);
      } else {
        const passwordIsValid = bcryptjs.compareSync(password, data?.Item?.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            message: 'Invalid password!',
          });
        }

        const token = jwt.sign({ email: email, roles: data.Item?.roles }, config.secret, { expiresIn: 86400 });

        res.status(200).send({
          email: email,
          roles: data.Item?.roles,
          accessToken: token,
        });
      }
    });
  });
};

export default Auth;
