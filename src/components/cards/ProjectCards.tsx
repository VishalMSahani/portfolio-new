import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, featured = false }: {
  project: Project;
  featured?: boolean;
  index?: number;
}) {
  const href = `/projects/${project.slug}`;

  return (
    <article className={cn("project-card group", featured && "project-card-featured")}>
      <Link href={href} className="project-preview bg-white" aria-label={`Explore ${project.title} case study`}>
        <div className="project-preview-canvas">
          {project.heroImage && (
            <Image src={project.previewImage || project.heroImage} alt={project.imageAlt} fill sizes={featured ? "(max-width: 1279px) 100vw, 640px" : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 560px"} className="object-cover grayscale" />
          )}
        </div>
      </Link>
      <div className="project-card-content">
        <p className="text-xs text-neutral-500">{project.category}</p>
        <h3 className="mt-2 text-2xl font-medium tracking-tight">
          <Link href={href} className="hover:underline underline-offset-4">{project.title}</Link>
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">{project.summary}</p>
        <ul aria-label={`${project.title} technologies`} className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
          {project.tech.slice(0, 3).map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-neutral-200 pt-4">
          <Link href={href} className="text-link" aria-label={`Read ${project.title} case study`}>Case study <ArrowRight size={14} aria-hidden="true" /></Link>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link !text-neutral-500" aria-label={`Visit ${project.title} website (opens in a new tab)`}>Live site <ArrowUpRight size={14} aria-hidden="true" /></a>}
        </div>
      </div>
    </article>
  );
}

export default function ProjectCards() {
  return (
    <section id="work" className="section-wrap scroll-mt-24 py-12 md:py-16" aria-labelledby="work-heading">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 id="work-heading" className="section-title">Selected work.</h2>
        <Link href="/projects" className="text-link">All projects <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </div>
      <div className="space-y-6">
        <ProjectCard project={projects[0]} featured />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(1).map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </div>
    </section>
  );
}
