import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Vishal Sahani" },
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return (
    <section className="section-wrap flex min-h-[65vh] items-center justify-center py-12 text-center md:py-16" aria-labelledby="not-found-heading">
      <div className="w-full max-w-md">
        <Image
          src="/lp-assets/404.svg"
          alt="Illustrated 404 scene"
          width={750}
          height={500}
          priority
          className="mx-auto h-auto w-full max-w-[320px] grayscale"
        />
        <h1 id="not-found-heading" className="mt-5 text-3xl font-medium tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-neutral-600">That page doesn’t exist or has moved.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
          <Link href="/" className="button-primary">Home</Link>
          <Link href="/projects" className="text-link">
            Projects <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
