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

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_CONTACT_API_URL=your_contact_api_endpoint
NEXT_PUBLIC_CONTACT_SOURCE=your_source_identifier
```

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
