# TNP Website

Marketing site for **TNP** — a Japanese-Vietnamese solid wood flooring and
timber furniture manufacturer, built in Vietnam (Tam Phước Industrial Zone,
Biên Hòa) and exporting to Japan and international markets.

Static export built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
and `next-intl` for English / Vietnamese / Japanese localisation.

## Stack

- Next.js 15 (App Router), static export (`output: 'export'`)
- TypeScript (strict mode)
- Tailwind CSS
- `next-intl` — locales: `en` (default), `vi`, `ja`
- Formspree — static-compatible quote-request form backend

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
jsdom. `next/image`, `next/link`, and `next/navigation` are mocked in
`test/mocks/next.ts` (loaded from `test/setup.ts`), and `test/renderServerPage.tsx`
awaits + renders async Server Components directly, so both Server and
Client Components can be asserted on without a running Next server.

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
| `/[locale]/contact/` | Quote request form |
| `/[locale]/privacy/` | Privacy policy (`noindex, follow`) |
| Custom 404 | `src/app/not-found.tsx` |

## Deployment

**GitHub Pages**: `.github/workflows/deploy.yml` runs the test suite, builds,
and publishes `out/` to GitHub Pages on every push to `main`, using a
`basePath` of `/tnp` (set via `NEXT_PUBLIC_BASE_PATH`, only used in that
workflow). Enable Pages once per repo: **Settings → Pages → Source: GitHub
Actions**.

**Vercel**: the repo also deploys to Vercel as a static export, serving from
the project's domain root (no base path) — same as a custom-domain GitHub
Pages setup. `vercel.json` only sets cache headers; Vercel's native
Next.js + `output: 'export'` support handles the rest, no `framework`
override needed. `NEXT_PUBLIC_SITE_URL` and canonical/OG URLs resolve
dynamically from the deployment context (see `src/lib/siteUrl.ts`).

**Custom domain** (e.g. `tnpgr.vn`) on GitHub Pages: add a `CNAME` file to
`public/`, drop `NEXT_PUBLIC_BASE_PATH` from the workflow, and point DNS at
GitHub's IPs (apex `A` records) or `flowcanicula-digipay.github.io` (`www`
`CNAME`).

## Reminders for myself before launch

This isn't a public-facing notice — just a note to self (and whoever else
ends up working on this repo) so nothing placeholder ships by accident.
Several values are intentionally left as `TODO`: pricing/budget ranges
(`PricingPageClient.tsx`, `ContactForm.tsx`), business hours
(`contact.sidebar.directContact.hours` in `src/messages/*.json` — currently
unused since the contact page hardcodes hours inline instead), certification
badges (`Footer.tsx`), and real testimonials/stats (`home.trust.testimonialNote`).
Search the repo for `TODO` before going live and fill them in for real. The
Formspree endpoint in `ContactForm.tsx` already points at a live form ID —
confirm it's the client's account before launch.

## Author

Jaime Canicula ([jaime.canicula@gmail.com](mailto:jaime.canicula@gmail.com)) —
based in the Philippines, building for a client in Vietnam.
