import { describe, it, expect } from 'vitest';
import { routing } from '@/i18n/routing';

describe('routing', () => {
  it('declares the three supported locales', () => {
    expect(routing.locales).toEqual(['en', 'vi', 'ja']);
  });

  it('defaults to English', () => {
    expect(routing.defaultLocale).toBe('en');
  });

  it('always prefixes the locale in the URL', () => {
    expect(routing.localePrefix).toBe('always');
  });
});
