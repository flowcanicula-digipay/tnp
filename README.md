# TNP — Solid Wood Flooring & Timber Furniture

A high-conversion, SEO-optimised, fully multilingual marketing website for **TNP**, a Japanese-Vietnamese solid wood flooring and timber furniture company.

**Live site:** https://flowcanicula-digipay.github.io/tnp/

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| i18n | next-intl (EN / VI / JA) |
| Deployment | Static export → GitHub Pages |
| Forms | Formspree (static-compatible) |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build (generates out/)
npm run build

# Type check only
npx tsc --noEmit
```

> **Note:** Local dev runs without `NEXT_PUBLIC_BASE_PATH`, so all routes are at `/en/`, `/vi/`, `/ja/`. The GitHub Actions build injects `/tnp` for the GitHub Pages sub-path.

---

## GitHub Pages Deployment

### First-time setup

1. **Push this repo** to `https://github.com/flowcanicula-digipay/tnp`

2. **Enable GitHub Pages** in the repo settings:
   - Go to **Settings → Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

3. **Push to `main`** — the workflow at `.github/workflows/deploy.yml` will run automatically, build the static site, and deploy to `https://flowcanicula-digipay.github.io/tnp/`

That's it. Every push to `main` triggers a new deploy.

### Manual deploy (without pushing)

Go to **Actions → Deploy to GitHub Pages → Run workflow**.

---

## Custom Domain (optional)

If you point a domain (e.g. `tnpgr.vn`) to GitHub Pages:

1. Add a `CNAME` file to `public/` containing just the domain:
   ```
   tnpgr.vn
   ```

2. Remove `NEXT_PUBLIC_BASE_PATH` from the workflow (`deploy.yml`), or set it to an empty string — the basePath is only needed for the GitHub sub-path.

3. Configure your DNS with your registrar:
   - For an apex domain: four `A` records pointing to GitHub's IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
   - For `www`: a `CNAME` record pointing to `flowcanicula-digipay.github.io`

4. In **Settings → Pages**, enter your custom domain and enable **Enforce HTTPS**.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — html/body, favicon, globals.css
│   ├── page.tsx                # Root redirect with locale detection
│   └── [locale]/
│       ├── layout.tsx          # Locale layout — Header, Footer, schema, banner
│       ├── page.tsx            # Home page
│       ├── pricing/page.tsx    # Pricing page
│       ├── contact/page.tsx    # Contact / quote form
│       └── privacy/page.tsx    # Privacy policy
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx    # EN / VI / JA switcher (persists to localStorage)
│   ├── HowItWorks.tsx
│   ├── ContactForm.tsx
│   ├── PricingPageClient.tsx
│   ├── PrivacyBanner.tsx       # Cookie/privacy notice banner
│   ├── LocaleSetter.tsx        # Sets document.documentElement.lang per locale
│   └── SchemaJsonLd.tsx
├── i18n/
│   ├── routing.ts
│   └── request.ts
└── messages/
    ├── en.json                 # English (source language)
    ├── vi.json                 # Vietnamese
    └── ja.json                 # Japanese
public/
├── assets/
│   ├── images/                 # Portfolio, flooring, furniture, process photos
│   ├── logo/                   # tnp_logo_primary.png (transparent PNG)
│   ├── favicon/                # favicon.ico, site.webmanifest
│   └── og/                     # og-en.jpg, og-vi.jpg, og-ja.jpg (1200×630px)
├── .nojekyll                   # Prevents GitHub Pages from running Jekyll
├── robots.txt
└── sitemap.xml
```

---

## Locale Detection (root `/`)

When a visitor hits `/`, the site automatically redirects to the right locale:

1. **Last used** — if the visitor has previously chosen a language via the switcher, `localStorage` sends them there directly
2. **Browser language** — `navigator.language` is checked; Vietnamese (`vi*`) → `/vi`, Japanese (`ja*`) → `/ja`
3. **Default** → `/en`

---

## Unit Tests

Tests run on [Vitest](https://vitest.dev) + React Testing Library. The test tree lives in `test/` at the repo root (a sibling of `src/`, not co-located with the source files) and mirrors the `src/` layout 1:1.

```bash
npm test               # run the suite once
npm run test:watch     # watch mode while developing
npm run test:coverage  # run once + print a coverage report (also written to coverage/)
```

```
test/
├── app/                    # mirrors src/app — pages, layouts, generateMetadata
├── components/             # mirrors src/components
├── i18n/, lib/             # mirrors src/i18n, src/lib
├── mocks/next.ts           # vi.mock for next/image, next/link, next/navigation
├── renderServerPage.tsx    # helper: await + render an async Server Component
├── renderWithIntl.tsx      # standard render() for client components
└── setup.ts                # global setup — IntersectionObserver, localStorage, etc.
```

**Coverage gate:** `vitest.config.ts` enforces a minimum of **80%** across statements, branches, functions, and lines (`coverage.thresholds`). `vitest run --coverage` exits non-zero if any metric falls below that, so a regression fails the run locally and in CI.

**CI:** `.github/workflows/deploy.yml` runs `npm run test:coverage` as its own step before `npm run build` — a failing test or a coverage drop below 80% blocks the deploy. The HTML coverage report is uploaded as a workflow artifact (`coverage-report`) on every run, pass or fail, for inspection.

When adding a new component or page, add its test under the matching path in `test/` (e.g. a new `src/components/Foo.tsx` gets `test/components/Foo.test.tsx`) so the mirror stays accurate and coverage keeps tracking the right files.

---

## Developer Action Items

Open TODOs left in the codebase that need either real business input (pricing, hours, certifications) or follow-up engineering work before launch. Search `TODO` across the repo to find the exact comment for each.

| Item | Where | Needs |
|---|---|---|
| **Pricing / budget ranges** | `src/components/PricingPageClient.tsx` (price display) + `src/components/ContactForm.tsx` line ~236 (budget select options, currently hardcoded in USD) | Real per-m²/per-project prices and currency (USD vs VND) from the client |
| **Business hours** | `src/messages/*.json` → `contact.sidebar.directContact.hours` (currently a TODO placeholder, and unused — `src/app/[locale]/contact/page.tsx` hardcodes hours inline instead). Wire the page to read from messages once real hours are set, or remove the unused key | Confirmed hours from the client |
| **Certifications** | `src/components/Footer.tsx` — TODO comment for FSC/ISO/JAS badges | Certification logos/links, if applicable |
| **Real testimonials / stats** | `src/app/[locale]/page.tsx` trust section + `home.trust.testimonialNote` in `src/messages/*.json` | Client quotes or verified project/stat numbers |
| **Formspree endpoint** | `src/components/ContactForm.tsx` — already pointed at a live Formspree form ID | Confirm it's the client's account, not a placeholder, before launch |
| **Sitemap / OG images** | `public/sitemap.xml`, `public/assets/og/og-default.png` | Already correct/automated (`scripts/generate-og.mjs` runs on `prebuild`) — no action needed unless the domain changes |

---

## Author

Built by **Jaime Canicula** (jaime.canicula@gmail.com), based in the Philippines, for a client in Vietnam.

## Contact

**TNP**
Lô 35 đường số 9, Khu Công Nghiệp Tam Phước, Biên Hòa, Vietnam
thuy@tnpgr.vn · +84 90 333 37 29
