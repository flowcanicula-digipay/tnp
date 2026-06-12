# Role and Tech Stack
You are an expert frontend engineer building a high-conversion, SEO-friendly, AI-Search optimized, and fully multilingual 3-page website for **TNP** — a Japanese-Vietnamese furniture and flooring company. Tagline: **"Supplying solid wood flooring and timber furniture."**
- Framework: **Next.js** (App Router) with **React 18+** and **TypeScript**.
- Styling: **Tailwind CSS** (installed via npm, not CDN).
- Icons: **Lucide React** (`lucide-react` package).
- Internationalization: **next-intl** for routing, translation files, and locale-aware metadata.
- Deployment output: `next export` (static HTML export) so the build can be uploaded to Hostinger shared hosting with no Node runtime.

# About the Business (TNP)
TNP is a **Japanese-Vietnamese** furniture and solid wood flooring company. It combines Japanese material standards — particularly the use of **Keyaki** An extremely hard, tough, and beautiful hardwood. Prized for ancient temple pillars and high-end, premium furniture and tableware due to its rich luster and durability, and **Hinoki (Japanese cypress)** and other premium timbers — with Vietnamese manufacturing capability and craftsmanship. TNP is built in Vietnam, headquartered in Biên Hòa (Đồng Nai province), and ready for export to Japan and international markets.

The company's core offering is **solid wood flooring and timber furniture**, spanning the full pipeline from sourcing and creation through delivery and professional installation. The site must communicate this clearly: TNP is not a reseller or trading house — it manufactures in its own facility, controls quality end-to-end, and ships worldwide.

## Company Tagline
**"Supplying solid wood flooring and timber furniture."**
Use this tagline in the hero, meta descriptions, OG tags, and schema `description` fields. It is the single line that defines TNP for search engines and AI crawlers.

## Identity & Market Position
- **Japanese-Vietnamese heritage**: Japanese quality philosophy and material sourcing (Hinoki, select hardwoods) combined with skilled Vietnamese production.
- **Built in Vietnam**: Workshop and factory are in Tam Phước Industrial Zone, Biên Hòa. This is a competitive advantage — high-quality output at Vietnamese production economics.
- **Export-ready**: TNP serves the Japanese domestic market, Vietnamese domestic market, and international buyers. The site should position TNP as a reliable export supplier, not just a local shop.
- **Hinoki as a signature material**: Hinoki (檜 / ヒノキ) is one of Japan's most prized building timbers — aromatic, rot-resistant, antibacterial, and beautifully grained. TNP's access to Hinoki and ability to manufacture with it in Vietnam is a key differentiator. Feature Hinoki prominently in copy, imagery, and material descriptions — but make clear TNP also works with a full range of solid hardwoods.

## The Three Service Pillars
Every page's copy, headings, schema, and imagery should reinforce these three stages as a connected journey:

### 1. Creation (Sáng tạo / 制作)
- **Consultation & Design** — TNP works with the client to understand the space, usage, style, and budget. For flooring projects this includes area measurement and subfloor assessment. For furniture, it includes design mockups/renders and material selection.
- **In-House Manufacturing** — all flooring and furniture is produced in TNP's own factory in Biên Hòa. Highlight craftsmanship: precision milling, kiln-drying, joinery, material quality (Hinoki, solid hardwoods, metal, upholstery), finishing (lacquer, natural oil, stain, powder coat), and quality-control checkpoints before anything leaves the facility.
- **Key copy angles**: "manufactured in our own facility, not outsourced", "Hinoki and premium hardwoods, milled to spec", "choose your timber, your finish, your dimensions".

### 2. Delivery (Giao hàng / 配送)
- **Scheduled & Protected Transport** — TNP handles domestic and international logistics. Products are wrapped, palletized, and shipped on the client's schedule. For export orders, TNP manages containerization and freight forwarding.
- **Key copy angles**: "export-ready packaging and logistics", "domestic delivery across Vietnam", "international shipping to Japan and worldwide".

### 3. Installation (Lắp đặt / 設置)
- **Professional On-Site Setup** — for domestic clients, TNP's crew handles flooring installation (subfloor prep, laying, finishing) and furniture assembly, leveling, and anchoring. For export clients, TNP provides installation guides and technical support.
- **Post-Install Walkthrough** — the team walks the client through care instructions and confirms satisfaction before leaving.
- **Key copy angles**: "professional flooring installation", "installed by the same people who built it", "export clients receive full installation documentation".

## Tone & Voice
Warm, confident, and craft-focused. Write like a skilled maker who is proud of the work but never arrogant. The tone should bridge Japanese precision and Vietnamese warmth. Avoid vague corporate buzzwords ("synergy", "solutions", "leverage"); lead with concrete benefits: material quality, Hinoki's natural properties, factory-direct pricing, export reliability, single point of contact.

**English copy** is the primary/source language — clear, professional, internationally accessible. This is the language export buyers and international clients will read first.

**Vietnamese copy** should feel natural and native — not machine-translated English. Use everyday Vietnamese phrasing a Saigon or Biên Hòa professional would use, not stiff formal prose.

**Japanese copy** should use polite-form (です/ます) appropriate for a B2B/B2C timber and furniture brand. Use katakana for loanwords where natural (e.g. オーダーメイド for "custom-made"). Lean into Japanese familiarity with Hinoki (檜) — Japanese buyers already know and value this wood; speak to them as insiders, not as if introducing a foreign concept. Keep it warm and professional, not overly stiff keigo.

## Content Architecture (how the pillars map to pages)
- **Home (/)** — Hero states the core promise: solid wood flooring and timber furniture, Japanese-Vietnamese quality, built in Vietnam. A "How It Works" / "Quy trình" / "制作の流れ" section walks through Creation → Delivery → Installation. The About section establishes the Japanese-Vietnamese heritage and Hinoki story.
- **Pricing (/pricing)** — Tiers/quote ranges for both flooring and furniture. Make clear what is *included* (consultation, manufacturing, delivery, installation where applicable) at each level. FAQ answers common questions about Hinoki, timelines, materials, export shipping, and installation.
- **Contact (/contact)** — The form is framed as "Start Your Project" / "Bắt đầu dự án" / "ご相談はこちら". Fields should capture project type (flooring vs. furniture vs. both), dimensions, material preference, and whether domestic or export.

## Contact Information
- **Address**: Lô 35 đường số 9, Khu Công Nghiệp Tam Phước, Biên Hòa, Vietnam
- **Email (primary)**: thuy@tnpgr.vn
- **Email (secondary)**: anhkiet3333@yahoo.com
- **Phone**: +84 90 333 37 29
These are real — use them in the contact page, footer, schema JSON-LD, and anywhere contact info appears. No TODO placeholders for these fields.

# Section Narratives & Copy Guide
Below is the narrative direction for every major section across all three pages. English is the source language. Use these as the basis for the translation files, then adapt naturally to Vietnamese and Japanese — do not produce literal translations.

---

## HOME PAGE (`/`)

### Hero Section
**Emotional hook**: The visitor's first impression. Show a stunning space featuring TNP's flooring or furniture — the warmth of Hinoki, the grain of solid wood. The headline should land the core promise: quality timber products, Japanese-Vietnamese craftsmanship, end-to-end service.

- **Headline**: "Solid wood flooring and timber furniture. Japanese quality, built in Vietnam."
- **Subheadline**: "TNP brings together Japanese material standards and Vietnamese craftsmanship. From Hinoki flooring to custom timber furniture — we design, manufacture, deliver, and install. One team. One standard."
- **CTA button**: "Start Your Project" (links to `/contact`)
- **Secondary CTA**: "See How It Works" (smooth-scrolls to the process section)
- **Visual**: Full-width hero image from `/assets/images/portfolio/`. A room with beautiful Hinoki flooring or a striking timber furniture piece — warm, tactile, real. Not a stock photo.

### About Section (`#about`)
**Purpose**: Establish trust and identity. Who is TNP, why Japanese-Vietnamese, and why Hinoki matters.

- **Section title**: "Where Japanese timber meets Vietnamese craft"
- **Narrative**: TNP was born from a connection between Japan and Vietnam. Japan has centuries of reverence for timber — particularly Hinoki, the cypress prized for its strength, fragrance, and natural resistance to moisture and insects. Vietnam has generations of skilled woodworkers and a manufacturing tradition that turns raw timber into finished surfaces with precision and care. TNP brings both together. We source premium timbers — Hinoki, oak, walnut, ash, and select Southeast Asian hardwoods — and manufacture solid wood flooring and custom furniture in our own factory in Biên Hòa, Vietnam. Every board is kiln-dried, milled, finished, and inspected before it leaves our facility. We don't outsource. We don't cut corners. And we handle everything from first consultation to final installation.
- **Supporting points** (displayed as icon + short text cards):
  - "Japanese-Vietnamese heritage" — Japanese material standards, Vietnamese manufacturing excellence.
  - "Hinoki & premium hardwoods" — access to Japan's most valued timber, plus a full range of solid woods.
  - "Factory-direct" — our own facility in Biên Hòa, no middlemen, export-ready.
  - "End-to-end service" — design, manufacturing, delivery, and installation by one team.
- **Visual**: A close-up of Hinoki grain or a workshop photo showing timber being milled — real, tactile, craft-focused.

### How It Works / Our Process Section (`#process`)
**Purpose**: Walk the visitor through the three pillars as a clear, sequential journey. This is the section that makes TNP's value proposition click — "they handle everything, from the timber to the finished floor."

- **Section title**: "From raw timber to finished space"
- **Lead-in**: "Every TNP project follows three stages. Whether you need solid wood flooring for an apartment in Tokyo or custom furniture for a home in Saigon — the process is the same."

**Step 1 — Creation**
- **Title**: "We source, design, and build it"
- **Narrative**: It starts with your project brief. What do you need — flooring, furniture, or both? What species and finish? For flooring, we assess the area and subfloor requirements. For furniture, we develop design mockups and material samples. Once you approve, our factory in Biên Hòa takes over. Hinoki, oak, walnut — whatever the timber, it's kiln-dried, precision-milled, joined, sanded, and finished in-house. Every piece passes quality inspection before it ships. You get progress updates along the way, and nothing leaves the factory without your sign-off.
- **Image**: Raw Hinoki planks being milled, or a side-by-side of timber stock and finished flooring.

**Step 2 — Delivery**
- **Title**: "We ship it to you — anywhere"
- **Narrative**: When your order is ready, our logistics team packages, palletizes, and ships — domestically across Vietnam or internationally to Japan and beyond. We handle export documentation, containerization, and freight coordination. Your flooring or furniture arrives protected and on schedule, in the same condition it left our factory floor.
- **Image**: Palletized flooring planks ready for export, or wrapped furniture being loaded.

**Step 3 — Installation**
- **Title**: "We install it perfectly"
- **Narrative**: For domestic clients, our crew handles everything on-site: subfloor preparation and flooring installation, furniture assembly, leveling, and anchoring. Wall-mounted pieces, built-in units, full-room flooring — we do it all. For international and export clients, we provide detailed installation guides, technical specs, and remote support. Before we consider any project done, we confirm you're satisfied.
- **Image**: A technician laying Hinoki flooring, or a finished room reveal.

### Social Proof / Trust Strip
**Purpose**: Quick credibility markers. Keep it concise — logos, numbers, or short testimonials.

- **Option A — Stats**: "500+ projects completed", "Exporting to Japan & beyond", "Factory in Biên Hòa, Vietnam"
- **Option B — Testimonials**: 2–3 short client quotes with name, city, and project type. Include at least one Japanese client and one Vietnamese client. E.g.: *"TNP supplied and installed all the Hinoki flooring in our new home. The quality matched anything we'd find in Japan."* — Tanaka K., Tokyo
- **Option C — Client logos**: If TNP has served commercial, hospitality, or developer clients, show logos here.
- Use whichever the owner can supply. Placeholder for now with `{/* TODO: add real testimonials/stats */}`.

### Final CTA Banner
**Purpose**: Catch visitors who scrolled the whole page but haven't clicked yet.

- **Headline**: "Ready to start?"
- **Body**: "Tell us about your space and we'll get back to you within 48 hours with ideas and a free quote."
- **CTA button**: "Request a Free Quote" → `/contact`

---

## PRICING PAGE (`/pricing`)

### Page Hero
- **Headline**: "Transparent pricing. Flooring and furniture, end to end."
- **Subheadline**: "Every TNP project covers sourcing, manufacturing, delivery, and installation where applicable. No hidden fees. Choose the product and service level that fits your project."

### Pricing Tiers
**Purpose**: Give visitors a sense of cost range without requiring a call. TNP works in both flooring and furniture, so tiers should cover both product lines.

- **Tier 1 — Solid Wood Flooring**
  - **Tagline**: "Premium timber flooring, factory-direct"
  - **Description**: Solid wood flooring in Hinoki, oak, walnut, ash, or select hardwoods. Kiln-dried, precision-milled, and finished in our Biên Hòa factory. Available for domestic delivery with professional installation, or export-packaged for international shipment. Priced per square meter.
  - **Example projects**: apartment flooring, commercial spaces, renovation reflooring.
  - **Price display**: "From [X] per m²" or "Request quote" — `{/* TODO: set base price per m² */}`

- **Tier 2 — Custom Timber Furniture**
  - **Tagline**: "Bespoke pieces, built to your specifications"
  - **Description**: One-of-a-kind furniture designed and manufactured to your brief. Includes consultation, design mockups, premium timber sourcing (Hinoki and hardwoods), in-house manufacturing, delivery, and installation. Ideal for dining tables, shelving, cabinetry, desks, and bedroom sets.
  - **Example projects**: a Hinoki dining table, a walnut bookshelf wall, a full bedroom set.
  - **Price display**: "From [X]" — `{/* TODO: set base price */}`

- **Tier 3 — Complete Projects**
  - **Tagline**: "Flooring and furniture for an entire space"
  - **Description**: End-to-end outfitting for one or more rooms — solid wood flooring plus custom furniture, designed to work together. TNP handles space planning, material coordination, phased manufacturing, delivery, and full installation. Ideal for new builds, major renovations, hospitality, and developer projects.
  - **Example projects**: a full apartment fit-out, a restaurant interior, a boutique hotel.
  - **Price display**: "Custom quote" — `{/* TODO: set price range */}`

- **What's always included** (highlight strip beneath the tiers): Material sourcing · Kiln-drying & milling · In-house manufacturing · Quality inspection · Delivery & protection · Professional installation (domestic) · Export packaging (international).

### FAQ Section
**Purpose**: Answer the questions that stop people from requesting a quote. Each Q&A should be wrapped in a `<details>`/`<summary>` or accordion component, and the full set should be marked up as `FAQPage` schema.

- **Q: What is Hinoki and why is it special?**
  A: Hinoki (檜 / ヒノキ) is Japanese cypress — one of Japan's most treasured building timbers. It's naturally aromatic, resistant to moisture, rot, and insects, and has a beautiful, fine grain. In Japan it's been used for centuries in temples, baths, and fine homes. TNP sources Hinoki and manufactures it into flooring and furniture at our factory in Vietnam, bringing this premium material to both domestic and international clients.

- **Q: How long does a project take?**
  A: Flooring orders typically take 3–5 weeks from confirmation to delivery. Custom furniture takes 4–8 weeks depending on complexity. Full-space projects with both flooring and furniture take 8–12 weeks. We confirm your timeline before any work begins.

- **Q: What timber species do you work with?**
  A: Our signature material is Hinoki (Japanese cypress). We also work with oak, walnut, ash, teak, and select Vietnamese and Southeast Asian hardwoods. You choose the species during the consultation — we'll provide samples and explain the characteristics of each.

- **Q: Do you ship internationally?**
  A: Yes. TNP is export-ready. We serve domestic clients across Vietnam and ship to Japan and international markets. Export orders include containerization, freight coordination, and all necessary documentation. International shipping is quoted based on destination and volume.

- **Q: Is installation included?**
  A: For domestic clients in Vietnam — yes. Our crew handles flooring installation (subfloor prep, laying, finishing) and furniture assembly on-site. For international clients, we provide detailed installation guides and remote technical support.

- **Q: What if I need changes after installation?**
  A: We offer a post-install adjustment period for domestic projects. If flooring needs a touch-up or a furniture piece needs realignment, we come back and fix it — no extra charge within the adjustment window.

- **Q: Can I visit your factory?**
  A: Absolutely. Our facility is in Tam Phước Industrial Zone, Biên Hòa — about an hour from Ho Chi Minh City. Contact us to arrange a visit and see our production process firsthand.

---

## CONTACT PAGE (`/contact`)

### Page Hero
- **Headline**: "Let's build something together"
- **Subheadline**: "Tell us about your project — flooring, furniture, or both. We'll get back to you within 48 hours with ideas and a free, no-obligation quote covering sourcing, manufacturing, delivery, and installation."

### Quote Request Form
**Purpose**: Capture enough information to start a meaningful conversation without overwhelming the visitor.

- **Fields**:
  - Full name (required)
  - Email (required)
  - Phone / WhatsApp / Zalo number (optional — note: Zalo is common in Vietnam, WhatsApp/LINE for Japanese clients)
  - Project type: dropdown — "Solid wood flooring", "Custom furniture", "Flooring + furniture", "Commercial / developer project", "Other"
  - Timber preference: checkboxes — "Hinoki (Japanese cypress)", "Oak", "Walnut", "Ash", "Teak", "Other / not sure yet"
  - Location: dropdown — "Vietnam (domestic)", "Japan", "Other international"
  - Approximate area or quantity: text field — e.g. "50m² flooring" or "1 dining table + 6 chairs"
  - Approximate budget range: dropdown — `{/* TODO: set budget ranges in USD or VND */}`
  - Preferred language for follow-up: radio — "English", "Tiếng Việt", "日本語"
  - Brief description of your project (textarea, optional)
  - File upload note: "Have reference photos, floor plans, or specs? Mention it here and we'll send you a link to share files." (no actual upload — static hosting)
- **Submit button**: "Send My Project Details"
- **Below form**: "We respond within 48 hours. Your information is never shared with third parties."

### Sidebar / Supporting Content (beside or below the form)
**Purpose**: Reassure the visitor and give direct contact alternatives.

- **Direct contact block** (use real info — no placeholders):
  - Email: thuy@tnpgr.vn
  - Email (alt): anhkiet3333@yahoo.com
  - Phone: +84 90 333 37 29
  - Address: Lô 35 đường số 9, Khu Công Nghiệp Tam Phước, Biên Hòa, Vietnam
  - Business hours: `{/* TODO: insert hours */}`

- **What happens next?** (mini timeline):
  1. "We review your project details and respond within 48 hours."
  2. "We discuss materials, timeline, and logistics — on-site, virtual, or by email."
  3. "You receive a detailed quote covering manufacturing, delivery, and installation."

- **Trust reinforcement**: "Every quote covers sourcing, manufacturing, delivery, and installation — one price, one team, factory-direct from Vietnam."

---

## SHARED COMPONENTS (Header & Footer)

### Header / Navigation
- **Logo**: TNP logo (links to home).
- **Nav links**: Home · Pricing · Contact (localized labels from translation files).
- **Language switcher**: Globe icon → dropdown with "English", "Tiếng Việt", "日本語".
- **CTA button** (optional, on desktop): "Get a Quote" → `/contact`.
- **Mobile**: Hamburger menu with the same links + language switcher inside.

### Footer
- **Column 1 — Brand**: TNP logo, tagline ("Supplying solid wood flooring and timber furniture"), and social links `{/* TODO: add social URLs */}`.
- **Column 2 — Quick links**: Home, About, How It Works, Pricing, Contact.
- **Column 3 — Contact**: thuy@tnpgr.vn · +84 90 333 37 29 · Lô 35 đường số 9, KCN Tam Phước, Biên Hòa, Vietnam.
- **Column 4 — Markets served**: "Serving Vietnam, Japan, and international clients worldwide. Export-ready from our factory in Biên Hòa."
- **Bottom bar**: "© {year} TNP. All rights reserved." + language switcher repeated for convenience.
- **Trust badges**: If TNP has certifications (FSC, ISO, JAS), trade memberships, or export licenses, place them here.

---

# Project Structure (Next.js App Router)
```
/
├── public/
│   ├── assets/                  → All custom, user-supplied assets (see Assets section)
│   │   ├── images/
│   │   │   ├── creation/
│   │   │   ├── flooring/
│   │   │   ├── furniture/
│   │   │   ├── delivery/
│   │   │   ├── installation/
│   │   │   ├── portfolio/
│   │   │   └── materials/
│   │   ├── logo/
│   │   ├── og/                  → Per-locale OG images (og-en.jpg, og-vi.jpg, og-ja.jpg)
│   │   └── favicon/
│   ├── robots.txt
│   └── sitemap.xml              → Generated or static, listing all locale/page combos
├── src/
│   ├── app/
│   │   ├── [locale]/            → Dynamic locale segment (en | vi | ja)
│   │   │   ├── layout.tsx       → Root layout: sets <html lang>, loads fonts, shared header/footer
│   │   │   ├── page.tsx         → Home page
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   └── layout.tsx           → Top-level layout (redirects bare "/" to default locale)
│   ├── components/
│   │   ├── Header.tsx           → Nav with locale switcher
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx  → Globe icon dropdown: EN / VI / JA
│   │   ├── HowItWorks.tsx       → Creation → Delivery → Installation process strip
│   │   ├── ContactForm.tsx      → Quote request form
│   │   └── SchemaJsonLd.tsx     → Reusable JSON-LD injection component
│   ├── i18n/
│   │   ├── request.ts           → next-intl server config
│   │   └── routing.ts           → Locale list, default locale, pathnames
│   └── messages/
│       ├── en.json              → All English strings
│       ├── vi.json              → All Vietnamese strings
│       └── ja.json              → All Japanese strings
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

# Internationalization (i18n) — CRITICAL
## Routing
- Use **next-intl** with the App Router `[locale]` segment.
- Supported locales: `['en', 'vi', 'ja']`. **Default locale: `en`**.
- URL pattern: `/en/`, `/vi/`, `/ja/`, `/en/pricing`, `/ja/contact`, etc.
- Bare `/` should redirect (or rewrite) to `/en/`.
- `generateStaticParams` must return all three locales so every page is statically exported for each language.

## Translation Files (`/src/messages/*.json`)
- Every user-visible string must come from the translation files — **zero hardcoded strings** in components.
- Keys should be namespaced by page/section: `home.hero.title`, `pricing.faq.q1`, `contact.form.name`, `common.nav.home`, etc.
- Include translated `alt` text for images: `home.hero.imageAlt`, `process.creation.imageAlt`, etc.
- Include translated metadata: `meta.home.title`, `meta.home.description`, `meta.pricing.title`, etc.
- All three files must have **identical key structures**. Missing keys break the build.

## Locale Switcher
- A `<LanguageSwitcher />` component in the header lets users toggle between EN / VI / JA.
- Switching locale navigates to the same page in the new language (e.g. `/en/pricing` → `/ja/pricing`).
- Display labels: "English", "Tiếng Việt", "日本語".
- Persist choice via the URL path (no cookies or localStorage needed since it is path-based).

## Copy Quality Rules
- English is the source/primary language. Vietnamese and Japanese are translations.
- Do NOT generate Vietnamese or Japanese by naively machine-translating the English. Adapt naturally to each language's conventions and phrasing.
- Vietnamese: natural phrasing a Biên Hòa or Saigon professional would use, not stiff translated prose.
- Japanese: use polite-form (です/ます), katakana for natural loanwords, and culturally appropriate phrasing. Lean into Japanese familiarity with Hinoki — don't explain it as exotic.
- If a translation is uncertain, add a `// TODO: verify [vi] or [ja] translation` comment in the JSON.

# Custom Assets (IMPORTANT)
The owner will supply their own brand assets. Place them in `/public/assets/` and NEVER hotlink external/placeholder images in the final build. Expected structure:
- `/public/assets/images/creation/`      — Factory floor, timber milling, kiln-drying, joinery in progress
- `/public/assets/images/flooring/`      — Hinoki planks, finished flooring close-ups, installed floor shots
- `/public/assets/images/furniture/`     — Custom furniture pieces, workshop builds, finished installations
- `/public/assets/images/delivery/`      — Palletized orders, export containers, delivery handoff moments
- `/public/assets/images/installation/`  — On-site flooring laying, furniture fitting, finished rooms
- `/public/assets/images/portfolio/`     — Hero shots of completed projects (flooring + furniture)
- `/public/assets/images/materials/`     — Hinoki grain close-ups, timber species samples, material swatches
- `/public/assets/logo/`                 — TNP logo in SVG + PNG, light/dark variants
- `/public/assets/og/`                   — OpenGraph images, ideally one per locale (1200×630px)
- `/public/assets/favicon/`              — favicon.ico, apple-touch-icon.png, site.webmanifest

Rules:
1. Reference assets from `/assets/...` in code (Next.js serves `public/` at root).
2. Prefer `next/image` (`<Image />`) for automatic optimization, lazy loading, and responsive `srcSet`. Use `priority` prop on the hero image only.
3. If an expected asset is not yet provided, insert a clearly-named placeholder path and add a `{/* TODO: replace with client asset */}` comment.
4. Every image must have a descriptive, keyword-relevant `alt` tag — pulled from the translation file so alt text is localized.
5. Favicon and webmanifest links must be set in the root layout's `<head>` or via Next.js `metadata` export.

# Deployment Target: Hostinger (Static Export)
The Next.js project is built locally (or in CI) with `next build` which produces a static `out/` directory. That directory is uploaded to Hostinger's `public_html/` via hPanel File Manager, FTP, or Git deployment.

## next.config.ts requirements
```ts
const nextConfig = {
  output: 'export',            // Static HTML export — no Node server needed
  trailingSlash: true,         // Generates /en/pricing/index.html — works with Apache
  images: {
    unoptimized: true,         // Required for static export (no image optimization server)
  },
};
```

## Hostinger-specific
1. **No server runtime** — the `out/` folder is plain HTML/CSS/JS. Do not use any Next.js features that require a Node server (API routes, server actions, ISR, middleware rewrites). Everything must be compatible with `output: 'export'`.
2. **`.htaccess`** — generate a `.htaccess` in `public/` (so it lands in `out/`) that handles: HTTPS redirect, trailing-slash normalization, `ErrorDocument 404`, and cache-control headers for `/assets/`.
3. **Contact form** — no backend exists. The form should POST to a free static-form endpoint (Formspree or Web3Forms) with a clearly-commented placeholder action URL. Add `{/* TODO: set form endpoint */}`. Never invent a working backend.
4. Keep total page weight reasonable: compress images before placing in `public/assets/`, use SVG for logos/icons.

# SEO & AI Search Optimization Standards (CRITICAL)
## 1. Semantic HTML
Use semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`) in components — no "div soup". Crawlers and LLMs rely on tag semantics to understand content hierarchy.

## 2. Metadata (per page, per locale)
Use Next.js `generateMetadata` in each page to produce locale-aware:
- `<title>` — distinct per page and language.
- `<meta name="description">` — translated, keyword-rich.
- OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:locale`).
- Twitter card tags.
- Canonical URL pointing to the current locale path.
- `<link rel="alternate" hreflang="...">` tags for all three locales plus `x-default` (pointing to `/en/`).
- `<html lang="vi|en|ja">` set dynamically in the root layout.

## 3. Schema JSON-LD Markup
Inject via a `<SchemaJsonLd />` component or `<script type="application/ld+json">` in the layout/page. Translate `name` and `description` fields to match the current locale.
- All pages: `LocalBusiness` (or `FurnitureStore`) — name "TNP", address "Lô 35 đường số 9, KCN Tam Phước, Biên Hòa, Vietnam", telephone "+84 90 333 37 29", email "thuy@tnpgr.vn", opening hours, `areaServed: ["VN", "JP"]`, and `availableLanguage: ["en", "vi", "ja"]`.
- Home: three `Service` entries — (1) Solid Wood Flooring (mention Hinoki), (2) Custom Timber Furniture, (3) Delivery & Installation — each with localized `description` and `serviceType`.
- Pricing: `Product`/`Offer` for tiers (flooring per m², furniture per piece, complete projects), plus `FAQPage`.
- Contact: reinforce `LocalBusiness` contact info with full address and both email addresses.

## 4. AI-Friendly Copywriting
- Use clear heading structures (`<h1>` to `<h3>`) with high-intent keywords in each language (e.g. EN: "solid wood flooring", "Hinoki furniture", "custom timber furniture Vietnam", VI: "sàn gỗ tự nhiên", "nội thất gỗ Hinoki", JA: "ヒノキフローリング", "オーダーメイド無垢材家具", "ベトナム製木製家具").
- Plain, concise text for key definitions — avoid buzzwords in all three languages.
- The "How It Works" section should use an `<ol>` so crawlers parse the Creation → Delivery → Installation sequence.
- Wrap the core business description inside a `<section id="about" aria-label="...">` with a translated `aria-label`.

## 5. Image Alt Text
Localized alt text pulled from translation files. Descriptive and keyword-relevant (e.g. EN: `"Hinoki solid wood flooring installed in a modern living room by TNP"`, VI: `"Sàn gỗ Hinoki do TNP sản xuất và lắp đặt"`, JA: `"TNP製ヒノキ無垢フローリング施工例"`).

## 6. Linking
- Internal links use Next.js `<Link>` with locale-aware paths.
- Nav links: `<Link href="/pricing">` (next-intl handles locale prefix automatically).

## 7. robots.txt & sitemap.xml
- `robots.txt` allows major search and AI crawlers, references the sitemap.
- `sitemap.xml` lists every locale/page combination (9 URLs total: 3 pages × 3 locales) with `<xhtml:link rel="alternate" hreflang="...">` entries.

# Code Quality Standards
- **Components**: small, single-responsibility. Shared UI (Header, Footer, LanguageSwitcher) lives in `/src/components/`.
- **TypeScript**: strict mode. Type translation keys, props, and schema objects.
- **No hardcoded strings**: every visible string comes from `/src/messages/*.json`.
- **Comments**: use `{/* Section: Hero */}` JSX comments to mark major sections in page files.
- **TODO markers**: `{/* TODO: ... */}` for any owner-action item (assets, form endpoint, address, phone).
- **Consistent styling**: single Tailwind config with a defined color palette and font stack across all pages.
- **Git workflow**: short, imperative commit messages for major additions.
