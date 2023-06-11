import { Request, Response } from 'express';
import { ddb } from '../aws';
import { config } from '../configs/auth.config';
import AWS from 'aws-sdk';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export async function signUp(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  const signupParams = {
    TableName: 'Sporty',
    Item: {
      PK: `USER#${email}`,
      SK: `#METADATA#${email}`,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcryptjs.hashSync(password, 8),
      roles: ['ADMIN'],
    },
  };

  ddb.put(signupParams, (err, data) => {
    if (err) {
      res.status(400).send({ message: 'Can not created' });
    } else {
      res.status(200).send({ message: 'User created!', email: email, firstName: firstName });
    }
  });
}

export async function singIn(req: Request, res: Response) {
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
}
