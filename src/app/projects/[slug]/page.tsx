import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";
import { getProjectBySlug, projects } from "@/data/projects";
import { JsonLd } from "@/components/common/JsonLd";
import { createPageMetadata, getProjectSeo } from "@/lib/seo";
import { getCaseStudyStructuredData } from "@/lib/structuredData";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  const project = getProjectBySlug(slug);
  if (!study || !project) notFound();
  if (slug !== study.slug) permanentRedirect(`/projects/${study.slug}`);

  return createPageMetadata(getProjectSeo(project));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  const project = getProjectBySlug(slug);
  if (!study || !project) notFound();
  if (slug !== study.slug) permanentRedirect(`/projects/${study.slug}`);

  const projectIndex = projects.findIndex((item) => item.slug === study.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article>
      <JsonLd data={getCaseStudyStructuredData(project, study)} />
      <header className="section-wrap pb-8 pt-10 md:pb-10 md:pt-12">
        <Link href="/projects" className="text-link !text-neutral-500">
          <ArrowLeft size={15} aria-hidden="true" /> All projects
        </Link>
        <h1 className="mt-7 text-4xl font-medium tracking-tight md:text-5xl">{study.title}</h1>
        <p className="mt-3 text-sm text-neutral-500">Case study by Vishal Sahani</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">{study.subtitle ?? project.summary}</p>
        {study.tech?.length ? (
          <ul aria-label={`${study.title} technologies`} className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500">
            {study.tech.map((tech) => <li key={tech}>{tech}</li>)}
          </ul>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {study.liveUrl && (
            <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`Visit ${study.title} website (opens in a new tab)`}>
              Live website <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          {study.repoUrl && (
            <a href={study.repoUrl} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`${study.title} source code (opens in a new tab)`}>
              Source code <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      {study.coverImage && (
        <div className="section-wrap pb-8 md:pb-10">
          <Image
            src={study.coverImage}
            alt={project.imageAlt}
            width={2320}
            height={1080}
            priority
            sizes="(max-width: 767px) 100vw, 1152px"
            className="h-auto w-full rounded-lg border border-neutral-200 grayscale"
          />
        </div>
      )}

      <div className="section-wrap pb-10 md:pb-12">
        <div className="mx-auto max-w-3xl border-t border-neutral-200">
          {study.sections.map((section, index) => {
            const List = section.ordered ? "ol" : "ul";
            const headingId = `section-${index + 1}-heading`;

            return (
              <section key={section.heading} id={`section-${index + 1}`} aria-labelledby={headingId} className="scroll-mt-28 border-b border-neutral-200 py-8 md:py-10">
                <h2 id={headingId} className="mb-5 text-xl font-medium tracking-tight md:text-2xl">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-7 text-neutral-600">{paragraph}</p>
                  ))}
                  {section.bullets?.length ? (
                    <List className={`${section.ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5 text-base leading-7 text-neutral-600`}>
                      {section.bullets.map((bullet) => <li key={bullet} className="pl-1">{bullet}</li>)}
                    </List>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <nav className="section-wrap border-t border-neutral-200 py-7" aria-label="More projects and contact">
        <div className="flex flex-wrap items-center justify-between gap-5">
          {nextProject && (
            <Link href={`/projects/${nextProject.slug}`} className="text-link">
              Next: {nextProject.title} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
          <Link href="/contact" className="text-link">
            Get in touch <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </article>
  );
}
