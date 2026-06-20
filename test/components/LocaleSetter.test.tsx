import { describe, it, expect } from 'vitest';
import LocaleSetter from '@/components/LocaleSetter';
import { renderWithIntl } from '../renderWithIntl';

describe('LocaleSetter', () => {
  it('sets document.documentElement.lang to the given locale', () => {
    renderWithIntl(<LocaleSetter locale="ja" />);
    expect(document.documentElement.lang).toBe('ja');
  });

  it('updates the lang attribute when the locale prop changes', () => {
    const { rerender } = renderWithIntl(<LocaleSetter locale="en" />);
    expect(document.documentElement.lang).toBe('en');
    rerender(<LocaleSetter locale="vi" />);
    expect(document.documentElement.lang).toBe('vi');
  });

  it('renders nothing', () => {
    const { container } = renderWithIntl(<LocaleSetter locale="en" />);
    expect(container).toBeEmptyDOMElement();
  });
});
