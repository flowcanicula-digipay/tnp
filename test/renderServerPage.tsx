import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';

/**
 * Server Components in the app router are plain async functions that return
 * JSX. Since none of our pages/layouts use hooks at the top level, calling
 * them directly and awaiting the result gives back a real React element —
 * this renders that element the same way `render()` would for a client
 * component.
 */
export async function renderServerPage(
  element: Promise<ReactElement> | ReactElement
): Promise<RenderResult> {
  return render(await element);
}
