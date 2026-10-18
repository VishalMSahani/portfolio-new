"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function isActive(path: string, href: string) {
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Vishal Sahani — home" className="inline-flex shrink-0 items-center gap-3">
      <Image src="/v-logo.svg" width={34} height={34} alt="" className="grayscale" />
      <span className="text-sm font-medium tracking-tight">Vishal Sahani</span>
    </Link>
  );
}

function MobileNav({ path }: { path: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button type="button" onClick={() => setOpen(true)} aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" className="grid h-11 w-11 place-items-center rounded-full border border-neutral-200">
        <Menu size={19} strokeWidth={1.5} />
      </button>
      <Dialog open={open} onClose={setOpen} className="fixed inset-0 z-50 md:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto p-3">
          <DialogPanel id="mobile-navigation" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl">
            <DialogTitle className="sr-only">Site navigation</DialogTitle>
            <div className="flex items-center justify-between gap-4">
              <Brand onClick={() => setOpen(false)} />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation menu" className="grid h-11 w-11 place-items-center rounded-full border border-neutral-200">
                <X size={19} strokeWidth={1.5} />
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="mt-10">
              <ul className="divide-y divide-neutral-200">
                {navigationLinks.map(({ name, href }) => (
                  <li key={href}>
                    <Link href={href} onClick={() => setOpen(false)} aria-current={isActive(path, href) ? "page" : undefined} className={cn("flex items-center justify-between py-5 font-[family-name:var(--font-display)] text-2xl tracking-tight", isActive(path, href) ? "text-neutral-950" : "text-neutral-500")}>
                      {name}<ArrowUpRight size={20} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="eyebrow mt-8">Ideas become better together.</p>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default function Navbar() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="section-wrap flex h-16 items-center justify-between gap-6">
        <Brand />
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-5 rounded-full border border-neutral-200 px-5 lg:gap-7">
            {navigationLinks.map(({ name, href }) => (
              <li key={href}>
                <Link href={href} aria-current={isActive(path, href) ? "page" : undefined} className={cn("relative inline-flex min-h-11 items-center text-sm transition-colors hover:text-neutral-950", isActive(path, href) ? "font-semibold text-neutral-950 after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-neutral-950" : "text-neutral-500")}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="hidden min-h-10 items-center gap-3 rounded-full border border-neutral-300 px-4 text-sm font-semibold transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white lg:inline-flex">
          Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <MobileNav key={path} path={path} />
      </div>
    </header>
  );
}
