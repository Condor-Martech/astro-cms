import { PutObjectCommand } from '@aws-sdk/client-s3';

import { getS3Client } from './client';
import { getMinioConfig } from './config';

export async function uploadObject(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType: string
): Promise<void> {
  const { bucket } = getMinioConfig();
  await getS3Client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}
