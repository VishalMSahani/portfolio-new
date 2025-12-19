import Link from "next/link";
import Image from "next/image";
import { SocialPill } from "./SocialPill";
import { GridWrapper } from "./GridWrapper";
import { JSX } from "react";

interface FooterLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "General",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
    ],
  },
  // {
  //   title: "Extra",
  //   links: [
  //     { href: "/changelog", label: "Changelog" },
  //     { href: "/connections", label: "Connections" },
  //     { href: "/links", label: "Links" },
  //   ],
  // },
];

export function Footer(): JSX.Element {
  const renderFooterLink = (link: FooterLink): JSX.Element => {
    if (link.isExternal) {
      return (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      );
    }
    return <Link href={link.href}>{link.label}</Link>;
  };

  return (
    <>
      <div className="relative max-w-7xl border-border-primary/50 bg-black  text-white">
        <GridWrapper>
          <div className="max-w-6xl divide-y px-4 lg:mx-auto lg:flex lg:divide-x lg:px-4 xl:px-0 py-4">
            <div className="md:flex flex-col justify-center items-center w-full py-6 text-sm">
              <div className="flex w-full items-center justify-center">
                <p>Follow</p>
                <SocialPill />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
             <p className="py-4 ">
                  © {new Date().getFullYear()} Vishal Sahani. All rights reserved.
                </p>
          </div>
        </GridWrapper>
      </div>
      <div className="relative h-8 w-full [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] bg-[length:5px_5px]"></div>
    </>
  );
}
