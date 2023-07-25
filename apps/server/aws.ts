import AWS from 'aws-sdk';
import 'dotenv/config';

AWS.config.getCredentials((err) => {
  if (err) console.log('AWS config error', err);
});
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

export const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
export const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
