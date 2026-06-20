import { describe, it, expect } from 'vitest';
import RootLayout, { metadata } from '@/app/layout';

describe('RootLayout', () => {
  it('declares the site-wide metadata', () => {
    expect(metadata.title).toBe('TNP');
    expect(metadata.description).toBe('Supplying solid wood flooring and timber furniture.');
  });

  it('wraps children in an <html lang="en"> / <body> shell with favicon links', () => {
    const element = RootLayout({ children: 'hello' });
    expect(element.type).toBe('html');
    expect(element.props.lang).toBe('en');

    const [head, body] = element.props.children as React.ReactElement[];
    expect(head.type).toBe('head');
    expect(body.type).toBe('body');
    expect(body.props.children).toBe('hello');

    const icons = head.props.children as React.ReactElement[];
    expect(icons[0].props.href).toContain('/assets/favicon/favicon.ico');
  });
});
