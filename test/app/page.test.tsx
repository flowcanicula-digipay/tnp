import { describe, it, expect, vi, beforeEach } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import RootPage from '@/app/page';
import { renderWithIntl as render } from '../renderWithIntl';

describe('RootPage', () => {
  const replace = vi.fn();

  beforeEach(() => {
    replace.mockClear();
    vi.mocked(useRouter).mockReturnValue({
      replace,
      push: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    } as unknown as ReturnType<typeof useRouter>);
    window.localStorage.clear();
  });

  it('redirects to the stored locale when one was previously chosen', async () => {
    window.localStorage.setItem('tnp_locale', 'ja');
    render(<RootPage />);
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/ja'));
  });

  it('redirects based on browser language when no locale is stored', async () => {
    Object.defineProperty(window.navigator, 'language', { value: 'vi-VN', configurable: true });
    Object.defineProperty(window.navigator, 'languages', { value: ['vi-VN'], configurable: true });
    render(<RootPage />);
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/vi'));
  });

  it('falls back to English when nothing matches', async () => {
    Object.defineProperty(window.navigator, 'language', { value: 'fr-FR', configurable: true });
    Object.defineProperty(window.navigator, 'languages', { value: ['fr-FR'], configurable: true });
    render(<RootPage />);
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/en'));
  });

  it('renders nothing while detecting', () => {
    const { container } = render(<RootPage />);
    expect(container).toBeEmptyDOMElement();
  });
});
