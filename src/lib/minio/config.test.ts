import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { getMinioConfig } from './config';

const REQUIRED_ENV = {
  MINIO_ENDPOINT: 'http://localhost:9000',
  MINIO_ACCESS_KEY: 'minioadmin',
  MINIO_SECRET_KEY: 'minioadmin',
  MINIO_BUCKET: 'landing-pages',
};

describe('getMinioConfig', () => {
  const original = { ...process.env };

  beforeEach(() => {
    Object.assign(process.env, REQUIRED_ENV);
  });

  afterEach(() => {
    process.env = { ...original };
  });

  it('reads config from env vars with sane defaults', () => {
    const config = getMinioConfig();
    expect(config).toMatchObject({
      endpoint: 'http://localhost:9000',
      region: 'us-east-1',
      accessKeyId: 'minioadmin',
      secretAccessKey: 'minioadmin',
      bucket: 'landing-pages',
      forcePathStyle: true,
    });
  });

  it('throws when a required env var is missing', () => {
    delete process.env.MINIO_BUCKET;
    expect(() => getMinioConfig()).toThrow('MINIO_BUCKET');
  });
});
