import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ProjectCards from "@/components/cards/ProjectCards";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { TechStack } from "@/components/lpComp/TechStack";
import { ContactSection } from "@/components/common/ContactSection";
import { ClientsSection } from "@/components/common/ClientsMarquee";
import { JsonLd } from "@/components/common/JsonLd";
import { createPageMetadata, pageSeo } from "@/lib/seo";
import { homeStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = createPageMetadata(pageSeo.home);

export default function Home() {
  return (
    <div>
      <JsonLd data={homeStructuredData} />
      <section className="section-wrap border-b border-neutral-200 py-12 text-center md:py-16 " aria-labelledby="hero-heading">
        <Image src="/lp-assets/ps-1.svg" alt="" width={500} height={500} priority className="doodle-hover mx-auto mb-6 h-42 w-28 object-contain grayscale transition-transform duration-300 motion-safe:hover:-rotate-3 motion-safe:hover:scale-[1.03] md:h-42 md:w-36" />
        <p className="mb-4 text-sm text-neutral-500">Vishal Sahani · Software Developer & UI/UX Designer</p>
        <h1 id="hero-heading" className="mx-auto max-w-3xl text-balance text-4xl font-medium leading-tight tracking-[-0.055em] sm:text-5xl md:text-6xl">
          Crafting products with<br className="hidden sm:block" /> code, {" "}
          <span className="relative inline-block">
            design
            <svg aria-hidden="true" viewBox="0 0 100 10" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full text-neutral-500">
              <path d="M2 7 Q48 1 98 5 M12 9 Q56 5 88 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>{" "}& clarity.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-neutral-600">Thoughtful interfaces. Solid full-stack web development.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="#work" className="button-primary">View work <ArrowDown size={15} aria-hidden="true" /></Link>
          <Link href="/contact" className="button-secondary">Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>

      <ProjectCards />
      <ClientsSection />

      <section className="section-wrap border-y border-neutral-200 py-12 md:py-16" aria-labelledby="about-heading">
        <h2 id="about-heading" className="section-title mb-8">A little about me.</h2>
        <div className="mb-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-10 sm:text-left">
          <Image src="/lp-assets/profile.svg" alt="Illustrated portrait of Vishal Sahani" width={150} height={200} className="h-44 w-32 shrink-0 object-contain grayscale" />
          <div>
            <h3 className="text-2xl font-medium tracking-tight">I&apos;m Vishal.</h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-neutral-600">I build digital products where design and engineering work together.</p>
            <Link href="/about" className="text-link mt-4">More about me <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
        <TechStack />
      </section>

      <section className="section-wrap py-12 md:py-16" aria-labelledby="services-heading">
        <h2 id="services-heading" className="section-title mb-8">What I do.</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ServiceCard title="Full-stack web development" description="Responsive websites, e-commerce, and full-stack products." imageSrc="/lp-assets/ai.svg" deliverables={["Websites & web apps", "APIs, payments & integrations"]} />
          <ServiceCard title="UI/UX design" description="Simple journeys. Clear interfaces. Considered details." imageSrc="/lp-assets/art-design.png" deliverables={["User flows & wireframes", "Interfaces & prototypes"]} />
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
