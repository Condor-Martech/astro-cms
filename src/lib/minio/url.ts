import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as presign } from '@aws-sdk/s3-request-presigner';

import { getS3Client } from './client';
import { getMinioConfig } from './config';

export function getPublicUrl(key: string): string {
  const { endpoint, bucket, publicUrl } = getMinioConfig();
  const base = publicUrl || endpoint;
  return `${base.replace(/\/$/, '')}/${bucket}/${key}`;
}

export async function getSignedDownloadUrl(
  key: string,
  expiresInSeconds = 3600
): Promise<string> {
  const { bucket } = getMinioConfig();
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return presign(getS3Client(), command, { expiresIn: expiresInSeconds });
}
