import { notFound, permanentRedirect } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";

type LegacyProjectPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LegacyProjectPage({ searchParams }: LegacyProjectPageProps) {
  const { project: query } = await searchParams;

  if (query === undefined) permanentRedirect(`/projects/${caseStudies[0].slug}`);

  const slug = Array.isArray(query) ? query[0] : query;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  permanentRedirect(`/projects/${study.slug}`);
}
