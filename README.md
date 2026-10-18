# Vishal Sahani Portfolio

A modern, minimal portfolio website showcasing full-stack development and UI/UX design projects. Built with Next.js 15 and designed with a monochromatic aesthetic that reveals color on interaction.

## ✨ Features

- **Responsive Design**: Mobile-first approach with smooth animations
- **Case Study System**: Dynamic case studies with detailed project breakdowns
- **Contact Forms**: Integrated contact page with quick inquiry form
- **Skills Showcase**: Interactive tech stack with hover effects
- **Testimonials**: Smooth looping carousel with center-active design
- **Client Marquee**: Animated client logo showcase
- **Custom 404**: Branded error page
- **SEO Optimized**: Proper metadata and Open Graph tags

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
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
│   ├── contact/          # Contact form page
│   ├── project/          # Dynamic case study page
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
    └── utils.ts          # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
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

- `/` - Homepage with all sections
- `/contact` - Full contact form
- `/project?project=<slug>` - Dynamic case study pages
- Custom 404 page

## 🎨 Design Features

- **Monochrome Theme**: Clean black, white, and gray palette
- **Hover Interactions**: Color reveals on interaction
- **Smooth Transitions**: Framer Motion animations
- **GridWrapper**: Consistent spacing with decorative borders
- **Timeline Layout**: For case studies with section dividers

## 📱 Case Studies

Currently featuring:
1. **Jain & Iyer** - Dual-model e-commerce platform
2. **EdTech Platform** - Notes + YouTube integration
3. **Anonymous Feedback** - Privacy-first feedback system

Access via: `/project?project=<slug>`

Supported slugs:
- `society-commerce` → Jain & Iyer
- `edtech-notes-youtube` → EdTech Platform
- `anonymous-feedback` → Anonymous Feedback


Deploy the `.next` output folder to your hosting platform.

## 📝 License

Private - All rights reserved

## 👤 Contact

Vishal Sahani
- Portfolio: https://vishal.it.com
- Email: vishalsahani0808@email.com
- GitHub: @VishalMSahani

---

Built with ❤️ using Next.js 15 and Tailwind CSS
