import { S3Client } from '@aws-sdk/client-s3';

import { getMinioConfig } from './config';

let client: S3Client | undefined;

export function getS3Client(): S3Client {
  if (!client) {
    const config = getMinioConfig();
    client = new S3Client({
      endpoint: config.endpoint,
      region: config.region,
      forcePathStyle: config.forcePathStyle,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }
  return client;
}
