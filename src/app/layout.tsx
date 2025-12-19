import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/common/Navbar";
import { siteMetadata } from "../data/siteMetaData";
import { Footer } from "../components/common/Footer";
import { BgGradient } from "../components/common/BgGradient";
import { cx } from "../lib/utils";
// import { GeistMono } from "geist/font/mono";
// import { GeistSans } from "geist/font/sans";
import Script from "next/script";

export const metadata: Metadata = {
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description, 
  },
  icons: {
    icon: [
      { url: "/fav-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/fav-icon.svg"],
    apple: [{ url: "/fav-icon.svg", type: "image/svg+xml" }],
    other: [{ rel: "mask-icon", url: "/window.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-bg-primary `}
    >
      <body className="flex min-h-screen flex-col bg-bg-primary font-sans md:max-w-7xl lg:mx-auto lg:flex-row">
        <main
          className={cx(
            "relative flex flex-1 flex-col overflow-x-hidden border-x border-border-primary/50",
          )}
        >
          <Navbar />
          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[32px_1fr_32px]">
            <div className="hidden w-full border-r border-border-primary opacity-75 [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] bg-[length:5px_5px] lg:block"></div>
            <div className="relative col-span-1 px-3 lg:px-0">
              <BgGradient />
              {children}
            </div>
            <div className="hidden w-full border-l border-border-primary opacity-75 [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] bg-[length:5px_5px] lg:block"></div>
          </div>
          <Footer />
        </main>
      </body>

      <Script id="vemetric-loader" strategy="afterInteractive">
        {`
          window.vmtrcq = window.vmtrcq || [];
          window.vmtrc = window.vmtrc || ((...args) => window.vmtrcq.push(args));
        `}
      </Script>

      <Script
        src="https://cdn.vemetric.com/main.js"
        data-token="HUO9AbX53v2wkzRu"
        strategy="afterInteractive"
      />
    </html>
  );
}
