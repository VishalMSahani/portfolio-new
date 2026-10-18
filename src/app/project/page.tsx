import { notFound, redirect } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";

type LegacyProjectPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LegacyProjectPage({ searchParams }: LegacyProjectPageProps) {
  const { project: query } = await searchParams;

  if (query === undefined) redirect(`/projects/${caseStudies[0].slug}`);

  const slug = Array.isArray(query) ? query[0] : query;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  redirect(`/projects/${study.slug}`);
}
