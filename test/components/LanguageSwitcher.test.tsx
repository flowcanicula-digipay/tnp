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

  it('shows the current locale label derived from the pathname', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('defaults to English when the path segment is not a known locale', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    renderWithIntl(<LanguageSwitcher label="Language" />);
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('opens the listbox on click and lists all locales', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    fireEvent.click(screen.getByRole('button', { name: 'Language' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Tiếng Việt' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '日本語' })).toBeInTheDocument();
  });

  it('navigates to the same page in the new locale and persists the choice', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    fireEvent.click(screen.getByRole('button', { name: 'Language' }));
    fireEvent.click(screen.getByRole('button', { name: '日本語' }));

    expect(push).toHaveBeenCalledWith('/ja/pricing');
    expect(window.localStorage.getItem('tnp_locale')).toBe('ja');
  });

  it('closes the listbox when clicking outside', () => {
    renderWithIntl(<LanguageSwitcher label="Language" />);
    fireEvent.click(screen.getByRole('button', { name: 'Language' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('aligns the menu to the left when align="left"', () => {
    renderWithIntl(<LanguageSwitcher label="Language" align="left" />);
    fireEvent.click(screen.getByRole('button', { name: 'Language' }));
    expect(screen.getByRole('listbox').className).toContain('left-0');
  });
});
