import { s3 } from '../aws';

type uploadImage = {
  key: string;
  type: string;
  data: string;
};

export async function uploadImage({ key, type, data }: uploadImage) {
  const imageBuffer = Buffer.from(data, 'base64');
  let params = {
    Bucket: 'sporty-plan-images',
    Key: key,
    Body: imageBuffer,
    ContentEncoding: 'base64',
    ContentType: type,
  };
  const imageUrl = await s3.upload(params).promise();
  return imageUrl;
}
