import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ServiceCard({ title, description, imageSrc, deliverables }: {
  title: string;
  description: string;
  imageSrc: string;
  deliverables: string[];
}) {
  return (
    <article className="group/service flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow duration-300 hover:border-neutral-300 hover:shadow-[0_4px_20px_rgb(0_0_0_/_0.04)] focus-within:border-neutral-300">
      <div className="relative h-48 border-b border-neutral-200 bg-neutral-50 sm:h-56">
        <Image src={imageSrc} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" className="service-doodle object-contain p-5 grayscale transition-transform duration-300 motion-safe:group-hover/service:-rotate-2" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
        <p className="mb-4 mt-3 text-sm leading-relaxed text-neutral-600">{description}</p>
        <ul className="mb-5 space-y-2 text-sm text-neutral-500">
          {deliverables.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <Link href="/contact" className="text-link mt-auto border-t border-neutral-200 pt-4" aria-label={`Let's talk about ${title.toLowerCase()}`}>Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
