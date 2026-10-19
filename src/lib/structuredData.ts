import { siteMetadata, SocialLinks } from "@/data/siteMetaData";
import { CONTACT_EMAIL, CONTACT_SERVICES } from "@/data/contact";
import type { CaseStudy } from "@/data/caseStudies";
import type { Project } from "@/data/projects";
import { absoluteUrl, getProjectSeo, pageSeo, personId, websiteId } from "./seo";

const graph = (nodes: Record<string, unknown>[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

export const siteStructuredData = graph([
  {
    "@type": "Person",
    "@id": personId,
    name: siteMetadata.author,
    url: absoluteUrl("/"),
    jobTitle: siteMetadata.jobTitle,
    description: siteMetadata.description,
    email: CONTACT_EMAIL,
    sameAs: Object.values(SocialLinks),
    mainEntityOfPage: { "@id": absoluteUrl("/about#webpage") },
  },
  {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteMetadata.title,
    alternateName: siteMetadata.headerTitle,
    url: absoluteUrl("/"),
    description: siteMetadata.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  },
]);

export function getPageStructuredData(page: keyof typeof pageSeo, type: string) {
  const { path, title, description } = pageSeo[page];
  return {
    "@type": type,
    "@id": absoluteUrl(`${path}#webpage`),
    name: title,
    url: absoluteUrl(path),
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
  };
}

export const homeStructuredData = graph([
  { ...getPageStructuredData("home", "WebPage"), mainEntity: { "@id": personId } },
]);

export const aboutStructuredData = graph([
  { ...getPageStructuredData("about", "ProfilePage"), mainEntity: { "@id": personId } },
]);

const services = CONTACT_SERVICES.filter((service) => service !== "Other").map((service, index) => ({
  "@type": "Service",
  "@id": absoluteUrl(`/contact#service-${index + 1}`),
  name: service,
  serviceType: service,
  url: absoluteUrl("/contact"),
  provider: { "@id": personId },
}));

export const contactStructuredData = graph([
  {
    ...getPageStructuredData("contact", "ContactPage"),
    mainEntity: { "@id": personId },
    mentions: services.map((service) => ({ "@id": service["@id"] })),
  },
  ...services,
]);

export function getProjectsStructuredData(projects: Project[]) {
  const listId = absoluteUrl("/projects#project-list");
  return graph([
    {
      ...getPageStructuredData("projects", "CollectionPage"),
      mainEntity: { "@id": listId },
    },
    {
      "@type": "ItemList",
      "@id": listId,
      name: "Vishal Sahani's software development projects",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: absoluteUrl(`/projects/${project.slug}`),
      })),
    },
  ]);
}

export function getCaseStudyStructuredData(project: Project, study: CaseStudy) {
  const seo = getProjectSeo(project);
  const url = absoluteUrl(seo.path);
  const pageId = `${url}#webpage`;
  const workId = `${url}#case-study`;
  const breadcrumbId = `${url}#breadcrumb`;

  return graph([
    {
      "@type": "WebPage",
      "@id": pageId,
      name: seo.title,
      url,
      description: seo.description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": workId },
      breadcrumb: { "@id": breadcrumbId },
    },
    {
      "@type": "CreativeWork",
      "@id": workId,
      name: `${study.title} case study`,
      url,
      description: study.subtitle || project.summary,
      author: { "@id": personId },
      inLanguage: "en",
      keywords: project.tech,
      ...(project.socialImage ? { image: absoluteUrl(project.socialImage) } : {}),
      isPartOf: { "@id": pageId },
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
        { "@type": "ListItem", position: 3, name: study.title, item: url },
      ],
    },
  ]);
}
