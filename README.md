# Vishal Sahani Portfolio

Vishal Sahani's software development and UI/UX design portfolio. Built with Next.js 16, original doodle illustrations, and a permanently monochromatic, minimalist design.

## ✨ Features

- **Responsive Design**: Mobile-first approach with smooth animations
- **Case Study System**: Dynamic case studies with detailed project breakdowns
- **Contact Forms**: Integrated contact page with quick inquiry form
- **Skills Showcase**: Interactive tech stack with hover effects
- **Clients & Projects**: Compact section using existing project and client logos
- **Custom 404**: Branded error page
- **SEO**: Page-specific metadata, canonical URLs, social previews, structured data, robots, and sitemap

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Image Optimization**: Next/Image
- **Forms**: Custom contact API integration

## 📁 Project Structure

```
src/
├── app/
│   ├── about/            # Developer profile
│   ├── contact/          # Contact form page
│   ├── projects/         # Gallery and canonical case studies
│   ├── project/          # Permanent legacy redirects
│   ├── robots.ts         # Crawl rules
│   ├── sitemap.ts        # Canonical public pages
│   ├── page.tsx          # Homepage
│   └── layout.tsx        # Root layout with metadata
├── components/
│   ├── cards/            # Reusable card components
│   ├── common/           # Shared UI components
│   └── lpComp/           # Landing page specific components
├── data/
│   ├── projects.ts       # Project listings
│   ├── caseStudies.ts    # Detailed case study content
│   └── siteMetaData.ts   # Site configuration
└── lib/
    ├── seo.ts            # Shared metadata and canonical URLs
    ├── structuredData.ts # Factual entity and page graphs
    └── utils.ts          # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+ (required by Next.js 16)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd new-portfolio-web

# Install dependencies
npm install

# Configure environment variables as described below; preserve existing files.
```

### Environment Variables

Use [.env.example](.env.example) as a secret-free reference. Add or update the values in your **existing [.env](.env) or [.env.local](.env.local)**; create [.env.local](.env.local) only if neither exists. Do not blindly copy the example over an existing environment file or discard unrelated settings. Actual environment files remain git-ignored; only the example is tracked.

| Variable | Setup |
| --- | --- |
| `RESEND_API_KEY` | **Required for email notifications.** Private Resend API key with **Sending access**. The example intentionally leaves it blank. |
| `RESEND_FROM_EMAIL` | **Required for email notifications.** `"Vishal Portfolio <contact@your-verified-domain.com>"`; replace the address with one on your own Resend-verified domain. |
| `CONTACT_TO_EMAIL` | Optional recipient. Defaults to `sahanivishal0808@gmail.com` in the contact route. |
| `CONTACT_API_URL` | Optional private dashboard API override. When blank/unset, falls back to the existing `NEXT_PUBLIC_CONTACT_API_URL`, then `https://admin.vishal.it.com/api/contact-us`. |
| `NEXT_PUBLIC_CONTACT_SOURCE` | Optional. Leave blank to preserve the compact/full forms' existing variant-specific source defaults. |
| `GOOGLE_SITE_VERIFICATION` | Optional Google Search Console HTML-tag `content` token. Public metadata, not a provider API key. Set before building; redeploy after changes. |

For production, explicitly set `CONTACT_API_URL=https://admin.vishal.it.com/api/contact-us` (or your own production dashboard endpoint) so an old local development URL is not used. Next.js inlines `NEXT_PUBLIC_*` values during the build; changing the legacy public endpoint or source only at runtime does not update the built application. The private `CONTACT_API_URL` override is read on the server.

#### Resend sender setup

1. In the Resend dashboard, add a custom domain you own. A dedicated sending subdomain (for example, `mail.your-domain.com`) is recommended to isolate sending configuration from existing mailboxes.
2. Add the **exact DNS records shown by Resend** at your DNS provider and wait until the domain is marked **Verified** in the dashboard. Do not replace unrelated mailbox MX or other DNS records.
3. Set `RESEND_FROM_EMAIL` to an address on that same verified domain (for example, `"Vishal Portfolio <contact@mail.your-domain.com>"` for the subdomain above). The From value contains the domain; there is no separate domain API credential.
4. Create a Resend API key with **Sending access** for that domain and put it in `RESEND_API_KEY`. No Gmail/SMTP password is needed, even when the recipient is Gmail.

Keep `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`, and `CONTACT_API_URL` server-only: **do not add a `NEXT_PUBLIC_` prefix**. Set these values in your hosting platform's private environment settings for deployed environments, not just a local file. Restart the development server after local changes; redeploy after changing hosting environment settings.

#### Contact flow and production notes

Both forms POST to `/api/contact`. The server attempts the configured dashboard save, then independently attempts the Resend notification **even if the dashboard request fails**. If the dashboard confirms a save **or** Resend accepts the email, the form shows its normal thank-you message and clears the inputs without a partial-failure warning. A submission delivery error appears only when neither channel confirms success; the inputs remain available for retry.

Missing or malformed provider settings disable only that channel. A temporary-unavailable response is returned only when neither channel has usable local configuration. Accepted submissions are briefly cached, including email-only and dashboard-only successes; replaying the same submission does not automatically retry a failed channel. Inspect sanitized hosting/server logs and the Resend dashboard for individual provider outcomes. Resend acceptance does not guarantee inbox delivery, and email-only success does not confirm that a dashboard record exists. Request validation and rate-limit errors still apply.

Rate limiting and idempotency are best-effort and in-process, not global across serverless instances. The external dashboard API has no durable idempotency guarantee. Use hosting/platform protection for the public production endpoint; do not rely on these safeguards alone to prevent abuse or duplicate enquiries.

Automated contact verification must mock both server providers (the dashboard API and Resend), without real provider requests or live credentials.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## 📄 Key Pages

- `/` — Software developer portfolio and services
- `/about` — Vishal Sahani's profile and capabilities
- `/projects` — Project gallery
- `/projects/<slug>` — Canonical case studies
- `/contact` — Project enquiries and software-development conversations
- `/project?project=<slug>` — Permanent redirect to the matching case study
- Custom, non-indexable 404 page

## 🎨 Design Features

- **Monochrome Theme**: Clean black, white, and gray palette
- **Hover Interactions**: Restrained motion with monochrome images and icons
- **Smooth Transitions**: Framer Motion animations
- **GridWrapper**: Consistent spacing with decorative borders
- **Timeline Layout**: For case studies with section dividers

## 📱 Case Studies

Currently featuring:
1. **Jain & Iyer** — E-commerce and scheduled society ordering
2. **Gyanlab** — Study notes and YouTube integration
3. **True Feedback** — Feedback links and a private response dashboard

Access via `/projects/<slug>`:
- `jain-and-iyer`
- `edtech-notes-youtube`
- `anonymous-feedback`

The old `society-commerce` slug and `/project?project=<slug>` URLs permanently redirect to their canonical case studies.

## Search visibility and indexing

The primary portfolio URL is **https://www.vishal.it.com**. Keep [src/data/siteMetaData.ts](src/data/siteMetaData.ts) aligned with the preferred production domain. Canonicals, Open Graph URLs, JSON-LD IDs and sitemap entries use this origin rather than request hosts or preview deployments.

Every public page has its own title, description and self-canonical. Metadata and structured data describe Vishal's software development, UI/UX design, real services and recorded projects. The About page identifies the developer with `ProfilePage`/`Person`; the gallery lists case studies; project pages credit the case-study author without claiming sole product ownership. No invented ratings, locations, credentials, performance metrics or publication dates are included.

Static social previews live under [public/og/](public/og/). The default uses original doodle branding, and project previews are grayscale copies of the existing boards. If project records or their images change, update the matching social asset and its `socialImage` path. Shared metadata expects these assets to be 1200×630.

### After deploying

1. Confirm `https://www.vishal.it.com/` and all seven URLs in `https://www.vishal.it.com/sitemap.xml` are publicly accessible, with the intended canonical and no accidental `noindex` on valid pages. The sitemap excludes aliases, API endpoints and 404s, and does not invent modification dates.
2. Configure the hosting domain redirect so `https://vishal.it.com/<path>` permanently redirects to `https://www.vishal.it.com/<path>`, preserving paths. Apply equivalent redirects for any retired domain you control. A canonical tag cannot repair broken DNS, authentication or crawler challenges.
3. Add `https://www.vishal.it.com/` as a URL-prefix property in [Google Search Console](https://search.google.com/search-console). For HTML-tag verification, copy only the tag's `content` token into the hosting variable `GOOGLE_SITE_VERIFICATION`, select Production, and redeploy. Blank/unset values emit no verification tag. DNS verification is another option managed separately by the owner.
4. Submit `https://www.vishal.it.com/sitemap.xml` in Search Console → Sitemaps. Use URL Inspection for Home, About, Projects, Contact and the three case studies, then request indexing where appropriate.
5. Review deployed markup with Google's [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/). Not every valid schema type produces a Google rich result.
6. Keep the portfolio URL and developer identity consistent on the existing GitHub and LinkedIn profiles. Add useful, truthful case studies as the work grows, and monitor indexing and relevant name/service queries in Search Console.

Deployment, DNS changes, Search Console submission and external validator uploads are owner actions, not automatically performed by this code. Crawlability and structured-data eligibility do **not** guarantee indexing, rankings, sitelinks or rich results.

Automated SEO checks should run against the production-built app with fake-only provider configuration and external networking blocked. Do not submit live enquiries, expose provider credentials or read real dotenv contents during verification.

## 📝 License

Private - All rights reserved

## 👤 Contact

Vishal Sahani
- Portfolio: https://www.vishal.it.com
- Public contact: info@vishal.it.com
- GitHub: @VishalMSahani

---

Built with ❤️ using Next.js 16 and Tailwind CSS
