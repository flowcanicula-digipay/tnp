import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('SITE_URL', () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('uses NEXT_PUBLIC_SITE_URL when set', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    delete process.env.VERCEL_URL;
    const { SITE_URL } = await import('@/lib/siteUrl');
    expect(SITE_URL).toBe('https://example.com');
  });

  it('falls back to VERCEL_URL when NEXT_PUBLIC_SITE_URL is unset', async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.VERCEL_URL = 'tnp-preview.vercel.app';
    const { SITE_URL } = await import('@/lib/siteUrl');
    expect(SITE_URL).toBe('https://tnp-preview.vercel.app');
  });

  it('falls back to the hard-coded default when nothing is set', async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_URL;
    const { SITE_URL } = await import('@/lib/siteUrl');
    expect(SITE_URL).toBe('https://tnp.skaldris.com');
  });
});
