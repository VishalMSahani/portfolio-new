import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/common/ContactForm";
import { CONTACT_EMAIL, CONTACT_LINKEDIN_URL } from "@/data/contact";
import { JsonLd } from "@/components/common/JsonLd";
import { createPageMetadata, pageSeo } from "@/lib/seo";
import { contactStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = createPageMetadata(pageSeo.contact);

export default function ContactPage() {
  return (
    <div className="section-wrap py-12 md:py-16">
      <JsonLd data={contactStructuredData} />
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">Contact Vishal Sahani</h1>
          <p className="body-copy mt-4">Have a project or software development role in mind? Let&apos;s talk.</p>
          <Image
            src="/connect-ppl.svg"
            alt=""
            width={950}
            height={505}
            unoptimized
            className="mt-8 h-40 w-full object-contain grayscale sm:h-48"
          />
        </header>

        <ContactForm variant="full" />

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-link break-all">{CONTACT_EMAIL}</a>
          <a
            href={CONTACT_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
