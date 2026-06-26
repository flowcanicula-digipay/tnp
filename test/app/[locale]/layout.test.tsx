import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import LocaleLayout, { metadata, generateStaticParams } from '@/app/[locale]/layout';
import { renderServerPage } from '../../renderServerPage';

describe('LocaleLayout', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/en');
  });

  it('exports empty page metadata (locale metadata is set per-page)', () => {
    expect(metadata).toEqual({});
  });

  it('lists all three locales for static generation', async () => {
    expect(await generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('renders header, content, footer and privacy banner for a supported locale', async () => {
    await renderServerPage(
      LocaleLayout({
        children: <div>page content</div>,
        params: Promise.resolve({ locale: 'en' }),
      })
    );

    expect(screen.getByText('page content')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument(); // <header>
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // <footer>
    expect(document.documentElement.lang).toBe('en');
  });

  it('injects Organization/WebSite/LocalBusiness JSON-LD schema', async () => {
    const { container } = await renderServerPage(
      LocaleLayout({
        children: <div>x</div>,
        params: Promise.resolve({ locale: 'ja' }),
      })
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const schema = JSON.parse(script!.innerHTML);
    expect(schema.map((s: { '@type': string }) => s['@type'])).toEqual([
      'Organization',
      'WebSite',
      'FurnitureStore',
    ]);
  });

  it('calls notFound() for an unsupported locale', async () => {
    await expect(
      renderServerPage(
        LocaleLayout({ children: <div />, params: Promise.resolve({ locale: 'fr' }) })
      )
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
