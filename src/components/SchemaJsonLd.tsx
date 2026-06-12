interface SchemaJsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export default function SchemaJsonLd({ schema }: SchemaJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
