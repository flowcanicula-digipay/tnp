import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import en from '@/messages/en.json';
import ja from '@/messages/ja.json';
import HomePage, { generateMetadata, generateStaticParams } from '@/app/[locale]/page';
import { renderServerPage } from '../../renderServerPage';

describe('Home page metadata', () => {
  it('lists all three locales for static generation', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'vi' }, { locale: 'ja' }]);
  });

  it('builds locale-aware metadata with hreflang alternates', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'ja' }) });
    expect(meta.title).toBe(ja.meta.home.title);
    expect(meta.alternates?.canonical).toBe('https://tnp.skaldris.com/ja/');
    expect(meta.alternates?.languages?.['x-default']).toBe('https://tnp.skaldris.com/en/');
    expect(meta.openGraph?.locale).toBe('ja_JP');
  });

  it('uses en_US openGraph locale for English and vi_VN for Vietnamese', async () => {
    const enMeta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(enMeta.openGraph?.locale).toBe('en_US');
    const viMeta = await generateMetadata({ params: Promise.resolve({ locale: 'vi' }) });
    expect(viMeta.openGraph?.locale).toBe('vi_VN');
  });
});

describe('HomePage', () => {
  it('renders the hero headline and CTA links for the given locale', async () => {
    await renderServerPage(HomePage({ params: Promise.resolve({ locale: 'en' }) }));

    expect(screen.getByText(en.home.hero.title)).toBeInTheDocument();
    expect(screen.getByText(en.common.cta.startProject).closest('a')).toHaveAttribute(
      'href',
      '/en/contact'
    );
  });

  it('renders the three-step process as an ordered list', async () => {
    await renderServerPage(HomePage({ params: Promise.resolve({ locale: 'en' }) }));

    const ol = document.querySelector('ol');
    expect(ol).not.toBeNull();
    expect(ol!.children.length).toBe(3);
  });

  it('injects the services schema as JSON-LD', async () => {
    const { container } = await renderServerPage(HomePage({ params: Promise.resolve({ locale: 'en' }) }));
    const script = container.querySelector('script[type="application/ld+json"]');
    const schema = JSON.parse(script!.innerHTML);
    expect(schema['@type']).toBe('ItemList');
    expect(schema.itemListElement).toHaveLength(3);
  });
});
