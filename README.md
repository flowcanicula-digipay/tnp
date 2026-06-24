# TNP Website

Marketing site for **TNP** — a Japanese-Vietnamese solid wood flooring and
timber furniture manufacturer, built in Vietnam (Tam Phước Industrial Zone,
Biên Hòa) and exporting to Japan and international markets.

Tagline: **"Supplying solid wood flooring and timber furniture."**

Static export built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
and `next-intl` for English / Vietnamese / Japanese localisation.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), `output: 'export'` |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS with custom `cream`, `timber`, `forest`, `stone` scales |
| i18n | `next-intl` — locales: `en` (default), `vi`, `ja` |
| Icons | Lucide React |
| Form backend | Formspree (static-compatible) |
| Testing | Vitest + React Testing Library + jsdom |
| Fonts | Space Mono (serif display) · Plus Jakarta Sans (body) |

## Getting started

```bash
node --version   # 20+
npm install
npm run dev      # http://localhost:3000 — routes live at /en/, /vi/, /ja/
```

## Build

```bash
npm run build    # builds and exports static site to out/
npx serve out    # preview the static export locally
```

`npm run build` runs `scripts/generate-og.mjs` first (via the `prebuild` npm
lifecycle hook), which generates the shared 1200×630 Open Graph image used
across all three locales.

## Testing

```bash
npm test               # run the unit test suite once (Vitest)
npm run test:watch     # watch mode, reruns on file changes
npm run test:coverage  # run once and print the coverage table
```

Unit tests live under `test/` — a sibling of `src/`, mirroring it 1:1 —
covering `src/lib`, `src/i18n`, every component, and every page/layout/
not-found file under `src/app`, using Vitest + React Testing Library +
jsdom.

- `next/image`, `next/link`, and `next/navigation` are mocked in `test/mocks/next.ts` (loaded from `test/setup.ts`)
- `test/renderServerPage.tsx` awaits + renders async Server Components directly, so both Server and Client Components can be asserted on without a running Next server
- 24 test files · 136 tests

Coverage thresholds (statements/branches/functions/lines, all 80%) are
enforced in `vitest.config.ts` — `vitest run --coverage` exits non-zero if
any metric falls below that bar. CI (`.github/workflows/deploy.yml`) runs
`npm run test:coverage` as its own step before `npm run build`, so a
failing test or a coverage regression blocks the deploy.

## Pages

| Route | Description |
|---|---|
| `/` | Redirects to the visitor's locale (`/en/`, `/vi/`, or `/ja/`) |
| `/[locale]/` | Home — hero, about, process (Creation → Delivery → Installation), trust stats |
| `/[locale]/pricing/` | Service tiers (flooring / furniture / complete projects), FAQ |
| `/[locale]/contact/` | Quote request form with sidebar |
| `/[locale]/portfolio/` | Project gallery with category filter and Vietnam service-area map |
| `/[locale]/privacy/` | Privacy policy (`noindex, follow`) |
| Custom 404 | `src/app/not-found.tsx` |

## Project structure

```
/
├── public/
│   ├── assets/
│   │   ├── images/          # All real client photos (flooring, furniture, portfolio, etc.)
│   │   ├── images/motifs/   # SVG decorative motifs (heritage-seal, compass-seal, viet-pin, etc.)
│   │   ├── logo/            # TNP logo SVG + PNG
│   │   ├── og/              # OpenGraph images (1200×630)
│   │   └── favicon/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/[locale]/        # Dynamic locale segment (en | vi | ja)
│   ├── components/          # Shared + page-specific client components
│   ├── i18n/                # next-intl routing + request config
│   └── messages/            # en.json, vi.json, ja.json — all UI strings
├── test/                    # Mirrors src/ 1:1
└── scripts/                 # generate-og.mjs prebuild script
```

## Internationalisation

All user-visible strings live in `src/messages/{en,vi,ja}.json`. The three
files share identical key structures — a missing key breaks the build. Keys
are namespaced by page and section (`home.hero.title`, `pricing.faq.q1`,
`contact.form.name`, etc.). English is the source language; Vietnamese and
Japanese are adapted — not machine-translated — by locale.

The locale switcher in the header and footer lets visitors toggle between
`/en/`, `/vi/`, and `/ja/` paths. Canonical and `hreflang` tags are generated
per-page via `generateMetadata`.

## Deployment

**GitHub Pages**: `.github/workflows/deploy.yml` runs the test suite, builds,
and publishes `out/` to GitHub Pages on every push to `main`, using a
`basePath` of `/tnp` (set via `NEXT_PUBLIC_BASE_PATH`, only used in that
workflow). Enable Pages once per repo: **Settings → Pages → Source: GitHub
Actions**.

**Vercel**: the repo also deploys to Vercel as a static export, serving from
the project's domain root (no base path) — same as a custom-domain GitHub
Pages setup. `vercel.json` only sets cache headers; Vercel's native
Next.js + `output: 'export'` support handles the rest. `NEXT_PUBLIC_SITE_URL`
and canonical/OG URLs resolve dynamically from the deployment context
(see `src/lib/siteUrl.ts`).

**Custom domain** (e.g. `tnpgr.vn`) on GitHub Pages: add a `CNAME` file to
`public/`, drop `NEXT_PUBLIC_BASE_PATH` from the workflow, and point DNS at
GitHub's IPs (apex `A` records) or the GitHub Pages subdomain (`www` `CNAME`).

**Hostinger**: run `npm run build` locally to produce `out/`, then upload
`out/` to `public_html/` via hPanel File Manager or FTP. The included
`public/.htaccess` handles HTTPS redirect, trailing-slash normalisation,
`ErrorDocument 404`, and cache-control headers for `/assets/`.

## Pre-launch checklist

Several values are intentionally left as `TODO` — search the repo for `TODO`
before going live:

- [ ] Pricing and budget ranges (`PricingPageClient.tsx`, `ContactForm.tsx`)
- [ ] Business hours (`src/messages/*.json` — `contact.sidebar.directContact.hours`)
- [ ] Trust certifications / badges (`Footer.tsx`) — FSC, ISO, JAS, export licences
- [ ] Real testimonials or client stats (`home.trust`)
- [ ] Social media URLs (`Footer.tsx`)
- [ ] Formspree endpoint (`ContactForm.tsx`) — confirm it is the client's account
- [ ] OG images per locale (`public/assets/og/og-en.jpg`, `og-vi.jpg`, `og-ja.jpg`)

## Security

See [SECURITY.md](SECURITY.md) for the vulnerability reporting policy.

## Author

Jaime Canicula ([jaimecanicula@gmail.com](mailto:jaimecanicula@gmail.com)) —
freelance frontend engineer, building for TNP in Vietnam.
