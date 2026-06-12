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

## Owner Action Items

These are not yet configured and need real values before going live:

| Item | Where |
|---|---|
| **Formspree endpoint** | `src/components/ContactForm.tsx` line 61 — replace `YOUR_FORM_ID` |
| **Pricing / budget ranges** | `src/messages/en.json` → `pricing.tiers.*.priceNote` + `contact.form.budget.options` |
| **Business hours** | `src/messages/*.json` → `contact.sidebar.directContact.hours` |
| **Social media URLs** | Facebook: https://www.facebook.com/Thinhnguyenphat.traocamgiacbinhyen ✓ |
| **Certifications** | `src/components/Footer.tsx` TODO comment (FSC, ISO, JAS) |
| **Real testimonials** | `src/app/[locale]/page.tsx` trust section |
| **OG images** | `public/assets/og/og-en.jpg`, `og-vi.jpg`, `og-ja.jpg` (1200×630 px) |
| **Sitemap domain** | `public/sitemap.xml` — replace placeholder domain with `https://tnpgr.vn` |

---

## Contact

**TNP**
Lô 35 đường số 9, Khu Công Nghiệp Tam Phước, Biên Hòa, Vietnam
thuy@tnpgr.vn · +84 90 333 37 29
