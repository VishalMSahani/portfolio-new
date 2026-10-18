import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { siteMetadata } from "@/data/siteMetaData";

const displayFont = localFont({
  src: "../../public/fonts/sora/Sora.ttf",
  variable: "--font-display",
  weight: "100 800",
  display: "swap",
});

const bodyFont = localFont({
  src: "../../public/fonts/source-sans-3/SourceSans3.ttf",
  variable: "--font-body",
  weight: "200 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: "Vishal Sahani — Developer & Designer",
    template: "%s | Vishal Sahani",
  },
  description: siteMetadata.description,
  openGraph: {
    title: "Vishal Sahani — Developer & Designer",
    description: siteMetadata.description,
    type: "website",
    url: siteMetadata.siteUrl,
  },
  icons: {
    icon: [{ url: "/fav-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/fav-icon.svg"],
    apple: [{ url: "/fav-icon.svg" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-neutral-950 px-5 py-3 text-sm text-white focus:translate-y-0">
          Skip to content
        </a>
        <div className="site-frame">
          <Navbar />
          <div aria-hidden="true" className="page-rail pointer-events-none absolute inset-y-0 left-0 hidden w-3 border-r border-neutral-200 lg:block" />
          <div aria-hidden="true" className="page-rail pointer-events-none absolute inset-y-0 right-0 hidden w-3 border-l border-neutral-200 lg:block" />
          <main id="main-content" tabIndex={-1} className="relative min-w-0 focus:outline-none">
            {children}
          </main>
          <Footer />
        </div>
        <Script id="vemetric-loader" strategy="afterInteractive">
          {`
            window.vmtrcq = window.vmtrcq || [];
            window.vmtrc = window.vmtrc || ((...args) => window.vmtrcq.push(args));
          `}
        </Script>
        <Script src="https://cdn.vemetric.com/main.js" data-token="HUO9AbX53v2wkzRu" strategy="afterInteractive" />
      </body>
    </html>
  );
}
