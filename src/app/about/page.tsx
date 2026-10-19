import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/data/siteMetaData";
import { JsonLd } from "@/components/common/JsonLd";
import { createPageMetadata, pageSeo } from "@/lib/seo";
import { aboutStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = createPageMetadata(pageSeo.about);

const capabilities = [
  { title: "Frontend", tools: "Next.js, React, TypeScript, Tailwind CSS" },
  { title: "Backend", tools: "Node.js, APIs, integrations" },
  { title: "Design", tools: "UI/UX, Figma" },
];

const socials = [
  { label: "GitHub", href: SocialLinks.github },
  { label: "LinkedIn", href: SocialLinks.linkedin },
  { label: "X", href: SocialLinks.twitter },
  { label: "Instagram", href: SocialLinks.instagram },
];

export default function AboutPage() {
  return (
    <div className="section-wrap py-12 md:py-16">
      <JsonLd data={aboutStructuredData} />
      <div className="mx-auto max-w-3xl">
        <header>
          <h1 className="text-4xl font-medium tracking-tight md:text-5xl">About Vishal Sahani</h1>
          <div className="mt-8 grid gap-7 sm:grid-cols-[1fr_180px] sm:items-center sm:gap-10">
            <div>
              <h2 className="text-2xl font-medium tracking-tight">Vishal Sahani</h2>
              <p className="mt-2 text-sm text-neutral-500">Software Developer & UI/UX Designer</p>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-600">
                I build websites and full-stack applications, with a focus on clear
                interfaces and practical workflows. My projects span commerce,
                education, and feedback.
              </p>
              <Link href="/projects" className="text-link mt-5">
                See my work <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <Image
              src="/lp-assets/profile.svg"
              alt="Illustrated portrait of Vishal Sahani"
              width={240}
              height={324}
              priority
              className="h-auto w-[160px] grayscale sm:w-[180px]"
            />
          </div>
        </header>

        <section className="mt-10 border-t border-neutral-200 pt-7" aria-labelledby="about-tools-heading">
          <h2 id="about-tools-heading" className="text-xl font-medium tracking-tight">What I work with</h2>
          <dl className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-7">
            {capabilities.map((capability) => (
              <div key={capability.title}>
                <dt className="text-sm font-medium">{capability.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-600">{capability.tools}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="approach" className="mt-8 scroll-mt-28 border-t border-neutral-200 pt-7" aria-labelledby="about-approach-heading">
          <h2 id="about-approach-heading" className="text-xl font-medium tracking-tight">My approach</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600">
            Understand the workflow, design a simple interface, then build the
            system behind it.
          </p>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-neutral-200 pt-6">
          <nav aria-label="Vishal Sahani on social platforms">
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`${social.label} (opens in a new tab)`}>
                    {social.label} <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/contact" className="text-link">
            Get in touch <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </div>
  );
}
