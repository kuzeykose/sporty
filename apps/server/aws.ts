import AWS from 'aws-sdk';

AWS.config.getCredentials((err) => {  
  if (err) console.log(err);
})
AWS.config.update({ region: 'us-east-1' });

export const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
export const s3 = new AWS.S3({apiVersion: '2006-03-01'});
