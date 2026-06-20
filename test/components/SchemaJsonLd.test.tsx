import { describe, it, expect } from 'vitest';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { renderWithIntl } from '../renderWithIntl';

describe('SchemaJsonLd', () => {
  it('serializes a single schema object into a JSON-LD script tag', () => {
    const { container } = renderWithIntl(<SchemaJsonLd schema={{ '@type': 'Organization', name: 'TNP' }} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    expect(JSON.parse(script!.innerHTML)).toEqual({ '@type': 'Organization', name: 'TNP' });
  });

  it('serializes an array of schema objects', () => {
    const schemas = [{ '@type': 'Organization' }, { '@type': 'WebSite' }];
    const { container } = renderWithIntl(<SchemaJsonLd schema={schemas} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(JSON.parse(script!.innerHTML)).toEqual(schemas);
  });
});
