import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import en from '@/messages/en.json';
import ja from '@/messages/ja.json';
import PrivacyPage, { generateMetadata, generateStaticParams } from '@/app/[locale]/privacy/page';
import { renderServerPage } from '../../../renderServerPage';

describe('Privacy page metadata', () => {
  it('lists all three locales for static generation', async () => {
    await expect(generateStaticParams()).resolves.toEqual([
      { locale: 'en' },
      { locale: 'vi' },
      { locale: 'ja' },
    ]);
  });

  it('marks the page as noindex but followable', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(meta.title).toBe(en.privacy.meta.title);
  });
});

describe('PrivacyPage', () => {
  it('renders the title and every policy section in order', async () => {
    await renderServerPage(PrivacyPage({ params: Promise.resolve({ locale: 'en' }) }));

    expect(screen.getByText(en.privacy.title)).toBeInTheDocument();
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(6);
    expect(headings[0]).toHaveTextContent(en.privacy.sections.collect.title);
    expect(headings[5]).toHaveTextContent(en.privacy.sections.contact.title);
  });

  it('links back to the localized home page', async () => {
    await renderServerPage(PrivacyPage({ params: Promise.resolve({ locale: 'ja' }) }));
    expect(screen.getByText(ja.privacy.backToHome).closest('a')).toHaveAttribute('href', '/ja');
  });
});
