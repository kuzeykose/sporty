import AWS from 'aws-sdk';
import {NextFunction, Request, Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {config} from '../configs/auth.config'

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers["x-access-token"] as string;

  // token yoksa direkt -> hata: 403
  if (!token) return res.status(403).send({ message: 'No token!' })

  // token varsa verify et
  jwt.verify(token, config.secret, (err, decode) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" })
    res.locals.email = (decode as JwtPayload)?.email
  })

  next()
}

const isAdmin = (req:Request, res:Response, next:NextFunction) => {
  const signinParams = {
    TableName: 'Sporty',
    Key: {
      "PK": `USER#${res.locals.email}`,
      "SK": `#METADATA#${res.locals.email}`
    }
  }

  ddb.get(signinParams, (err, data) => {
    if (err) return res.status(401).send({ message: 'DB error!' })

    if (data.Item?.roles.includes('ADMIN')) next()
    else return res.status(401).send({ message: 'Unauthorized!' })
  })
}

const isUser = (req:Request, res:Response, next:NextFunction) => {
  const checkRoleParams = {
    TableName: 'Sporty',
    Key: {
      "PK": `USER#${res.locals.email}`,
      "SK": `#METADATA#${res.locals.email}`
    }
  }

  ddb.get(checkRoleParams, (err, data) => {
    if (err) return res.status(401).send({ message: 'Unauthorized!' })

    if (data.Item?.roles.includes('USER') || data.Item?.roles.includes('ADMIN')) next();
    else return res.status(401).send({ message: 'Unauthorized!' })
  })
}

export default { verifyToken, isAdmin, isUser };