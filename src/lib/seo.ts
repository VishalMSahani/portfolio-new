import type { Metadata } from "next";
import { siteMetadata, SocialLinks } from "@/data/siteMetaData";
import type { Project } from "@/data/projects";

export const absoluteUrl = (path: string) => new URL(path, siteMetadata.siteUrl).href;

export const personId = absoluteUrl("/#person");
export const websiteId = absoluteUrl("/#website");

const defaultTitle = `${siteMetadata.author} | ${siteMetadata.role}`;
const defaultImage = "/og/vishal-sahani.png";

export const pageSeo = {
  home: {
    path: "/",
    title: defaultTitle,
    description: siteMetadata.description,
  },
  about: {
    path: "/about",
    title: `About ${siteMetadata.author} | Software Developer`,
    description:
      "Meet Vishal Sahani, a software developer and UI/UX designer working with Next.js, React, TypeScript, Node.js, and Figma.",
  },
  projects: {
    path: "/projects",
    title: `Software Development Projects | ${siteMetadata.author}`,
    description:
      "Explore Vishal Sahani's projects and case studies: Jain & Iyer e-commerce, Gyanlab's learning website, and the True Feedback web app.",
  },
  contact: {
    path: "/contact",
    title: `Contact ${siteMetadata.author} | Web Development & UI/UX`,
    description:
      "Contact Vishal Sahani about full-stack web development, UI/UX design, e-commerce platforms, API integrations, or software development roles.",
  },
};

type PageSeo = {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

function sharingMetadata({ path, title, description, image, imageAlt }: PageSeo) {
  const socialImage = {
    url: absoluteUrl(image || defaultImage),
    width: 1200,
    height: 630,
    alt: imageAlt || `${siteMetadata.author} — ${siteMetadata.role}`,
  };

  return {
    openGraph: {
      type: "website" as const,
      locale: "en_US",
      siteName: siteMetadata.title,
      url: absoluteUrl(path),
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      creator: `@${new URL(SocialLinks.twitter).pathname.split("/").filter(Boolean)[0]}`,
      title,
      description,
      images: [socialImage],
    },
  };
}

export function createPageMetadata(page: PageSeo): Metadata {
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: absoluteUrl(page.path) },
    ...sharingMetadata(page),
  };
}

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const siteSeoMetadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: { default: defaultTitle, template: `%s | ${siteMetadata.author}` },
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author, url: absoluteUrl("/about") }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  robots: { googleBot: { "max-image-preview": "large" } },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  ...sharingMetadata(pageSeo.home),
};

export function getProjectSeo(project: Project): PageSeo {
  return {
    path: `/projects/${project.slug}`,
    title: `${project.title} ${project.category} Case Study | ${siteMetadata.author}`,
    description: `${project.title}: ${project.category.toLowerCase()} case study in Vishal Sahani's software development portfolio. ${project.summary}`,
    image: project.socialImage,
    imageAlt: project.imageAlt,
  };
}
