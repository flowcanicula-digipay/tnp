import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';

/**
 * Standard render for client components. TNP components receive their
 * translated strings as props (not via next-intl's `useTranslations` hook),
 * so no provider is required today — this wrapper exists as the single
 * place to add one (e.g. `NextIntlClientProvider`) if that ever changes,
 * without touching every test file.
 */
export function renderWithIntl(ui: ReactElement, options?: RenderOptions): RenderResult {
  return render(ui, options);
}
