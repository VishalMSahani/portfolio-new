import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
import { absoluteUrl, pageSeo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...Object.values(pageSeo).map((page) => page.path),
    ...caseStudies.map((study) => `/projects/${study.slug}`),
  ];

  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
