import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { getPublicUrl } from './url';

describe('getPublicUrl', () => {
  const original = { ...process.env };

  beforeEach(() => {
    process.env.MINIO_ENDPOINT = 'http://localhost:9000';
    process.env.MINIO_ACCESS_KEY = 'minioadmin';
    process.env.MINIO_SECRET_KEY = 'minioadmin';
    process.env.MINIO_BUCKET = 'landing-pages';
  });

  afterEach(() => {
    process.env = { ...original };
  });

  it('builds the URL from MINIO_PUBLIC_URL when set', () => {
    process.env.MINIO_PUBLIC_URL = 'https://cdn.example.com/';
    expect(getPublicUrl('pages/foo.png')).toBe(
      'https://cdn.example.com/landing-pages/pages/foo.png'
    );
  });

  it('falls back to the endpoint when MINIO_PUBLIC_URL is unset', () => {
    delete process.env.MINIO_PUBLIC_URL;
    expect(getPublicUrl('pages/foo.png')).toBe(
      'http://localhost:9000/landing-pages/pages/foo.png'
    );
  });
});
