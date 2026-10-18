import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/data/siteMetaData";

export function Footer() {
  return (
    <footer className="relative">
      <div className="section-wrap bg-white pt-6">
        <Image src="/grp-ppl.svg" alt="" width={1200} height={126} sizes="(max-width: 767px) 100vw, 1152px" className="h-auto w-full grayscale" />
      </div>
      <div className="border-t border-neutral-800 bg-neutral-950 text-white">
        <div className="section-wrap py-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p className="text-sm font-medium">Vishal Sahani.</p>
            <nav aria-label="Footer navigation" className="flex gap-6 text-sm text-neutral-300">
              <Link href="/projects" className="inline-flex min-h-8 items-center hover:text-white focus-visible:outline-white">Projects</Link>
              <Link href="/about" className="inline-flex min-h-8 items-center hover:text-white focus-visible:outline-white">About</Link>
              <Link href="/contact" className="inline-flex min-h-8 items-center hover:text-white focus-visible:outline-white">Contact</Link>
            </nav>
          </div>
          <div className="mt-6 flex flex-col justify-between gap-4 border-t border-neutral-800 pt-5 text-xs text-neutral-400 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} Vishal Sahani.</p>
            <div className="flex flex-wrap gap-5">
              {Object.entries(SocialLinks).map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 capitalize hover:text-white focus-visible:outline-white" aria-label={`${name === "twitter" ? "X" : name} (opens in a new tab)`}>
                  {name === "twitter" ? "X" : name}<ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
