import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/cards/ProjectCards";
import { projects } from "@/data/projects";
import { JsonLd } from "@/components/common/JsonLd";
import { createPageMetadata, pageSeo } from "@/lib/seo";
import { getProjectsStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = createPageMetadata(pageSeo.projects);

export default function ProjectsPage() {
  const [featured, ...supporting] = projects;

  return (
    <div>
      <JsonLd data={getProjectsStructuredData(projects)} />
      <header className="section-wrap pb-8 pt-12 md:pb-10 md:pt-16">
        <h1 className="text-4xl font-medium tracking-tight md:text-5xl">Projects</h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600">
          Websites and applications I’ve designed and built for commerce, education, and feedback.
        </p>
      </header>

      <section className="section-wrap pb-12 md:pb-16" aria-labelledby="project-gallery-heading">
        <h2 id="project-gallery-heading" className="sr-only">Project case studies</h2>
        <div className="space-y-7">
          {featured && <ProjectCard project={featured} featured />}
          <div className="grid gap-7 md:grid-cols-2">
            {supporting.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-wrap border-t border-neutral-200 py-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">Have a project in mind?</p>
          <Link href="/contact" className="text-link">
            Get in touch <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
