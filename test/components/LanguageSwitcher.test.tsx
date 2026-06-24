import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { renderWithIntl } from '../renderWithIntl';

describe('LanguageSwitcher', () => {
  const push = vi.fn();

  beforeEach(() => {
    push.mockClear();
    vi.mocked(usePathname).mockReturnValue('/en/pricing');
    vi.mocked(useRouter).mockReturnValue({
      push,
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    } as unknown as ReturnType<typeof useRouter>);
  });

  it('shows the current locale short code derived from the pathname', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    // Short code "EN" appears at least once (in trigger button)
    expect(screen.getAllByText('EN').length).toBeGreaterThanOrEqual(1);
  });

  it('defaults to English short code when the path segment is not a known locale', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    renderWithIntl(<LanguageSwitcher label="Language" />);
    expect(screen.getAllByText('EN').length).toBeGreaterThanOrEqual(1);
  });

  it('the trigger button has the accessible label passed as prop', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    expect(screen.getByRole('button', { name: 'Language' })).toBeInTheDocument();
  });

  it('the dropdown listbox is always in the DOM (CSS-animated visibility)', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    // Panel is always rendered; toggled via opacity/scale CSS
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('lists all three locale options in the dropdown', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Tiếng Việt')).toBeInTheDocument();
    expect(screen.getByText('日本語')).toBeInTheDocument();
  });

  it('navigates to the same page in the new locale and persists the choice', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    // Open dropdown then click the Japanese option button
    fireEvent.click(screen.getByRole('button', { name: 'Language' }));
    fireEvent.click(screen.getByText('日本語'));
    expect(push).toHaveBeenCalledWith('/ja/pricing');
    expect(window.localStorage.getItem('tnp_locale')).toBe('ja');
  });

  it('closes the listbox (pointer-events-none) when clicking outside', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    fireEvent.click(screen.getByRole('button', { name: 'Language' }));
    // Dropdown is open — trigger button aria-expanded true
    expect(screen.getByRole('button', { name: 'Language' })).toHaveAttribute('aria-expanded', 'true');

    fireEvent.mouseDown(document.body);
    // After clicking outside, aria-expanded reverts to false
    expect(screen.getByRole('button', { name: 'Language' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('aligns the menu to the left when align="left"', () => {
    renderWithIntl(<LanguageSwitcher label="Language" align="left" />);
    expect(screen.getByRole('listbox').className).toContain('left-0');
  });

  it('marks the active locale option with aria-selected="true"', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    // English is active for /en/pricing
    const englishOption = screen.getByText('English').closest('button')!;
    expect(englishOption).toHaveAttribute('aria-selected', 'true');
  });
});
