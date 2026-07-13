function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export function getMinioConfig() {
  return {
    endpoint: required('MINIO_ENDPOINT'),
    region: process.env.MINIO_REGION || 'us-east-1',
    accessKeyId: required('MINIO_ACCESS_KEY'),
    secretAccessKey: required('MINIO_SECRET_KEY'),
    bucket: required('MINIO_BUCKET'),
    forcePathStyle: process.env.MINIO_FORCE_PATH_STYLE !== 'false',
    publicUrl: process.env.MINIO_PUBLIC_URL,
  };
}
