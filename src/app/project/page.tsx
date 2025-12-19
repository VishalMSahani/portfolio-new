import { GridWrapper } from "../../components/common/GridWrapper";
import { caseStudies, getCaseStudyBySlug, type CaseStudySection } from "../../data/caseStudies";
import Image from "next/image";

export default async function CaseStudyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = params?.project;
  const slug = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : "jain-and-iyer";
  const cs = getCaseStudyBySlug(slug) ?? caseStudies[0];

  return (
    <div className="w-full space-y-12">
      <title>{`${cs.title} | Vishal Sahani`}</title>
      <div className="mx-auto text-balance pt-14 md:pt-16">
        <GridWrapper>
          <h1 className="mx-auto max-w-3xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
            {cs.title}
          </h1>
          {cs.subtitle ? (
            <p className="mx-auto mt-4 max-w-3xl text-center text-text-secondary">
              {cs.subtitle}
            </p>
          ) : null}
        </GridWrapper>
      </div>

      <ul className="flex flex-col">
        {/* Overview row keeps the same row/column grid styling */}
        <li>
          <div className="grid h-full grid-cols-1 rounded-2xl md:grid-cols-12">
            <div className="col-span-2 col-start-1 hidden space-y-2 p-4 md:block">
              <div className="font-mono text-sm leading-none text-text-secondary">
                <span className="block">Overview</span>
                <span className="text-xs text-text-tertiary">Case Study</span>
              </div>
            </div>
            <div className="col-start-3 col-end-4 hidden h-full border-x border-dashed border-border-primary md:block"></div>
            <div className="col-span-9 col-start-4 flex w-full flex-grow flex-col p-4">
              <h2 className="mb-6 text-balance text-2xl font-medium leading-none tracking-tight text-text-primary">
                {cs.title}
              </h2>
              {cs.coverImage ? (
                <Image
                  src={cs.coverImage}
                  alt={cs.title}
                  width={1600}
                  height={900}
                  className="drama-shadow mb-6 w-full rounded-xl object-contain"
                />
              ) : null}
              {cs.subtitle ? (
                <p className="mb-4 text-text-secondary">{cs.subtitle}</p>
              ) : null}
              {cs.tech?.length ? (
                <div className="mb-2 text-sm text-text-tertiary">Tech: {cs.tech.join(", ")}</div>
              ) : null}
            </div>
          </div>
          <div className="h-0 w-full border-t border-dashed border-border-primary" />
        </li>

        {cs.sections.map((s: CaseStudySection, i: number) => (
          <li key={s.heading}>
            <div className="grid h-full grid-cols-1 rounded-2xl md:grid-cols-12">
              <div className="col-span-2 col-start-1 hidden space-y-2 p-4 md:block">
                <div className="font-mono text-sm leading-none text-text-secondary">
                  <span className="block">Section</span>
                  <span className="text-xs text-text-tertiary">#{String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>
              <div className="col-start-3 col-end-4 hidden h-full border-x border-dashed border-border-primary md:block"></div>
              <div className="col-span-9 col-start-4 flex w-full flex-grow flex-col p-4">
                <h3 className="mb-4 text-2xl font-medium text-text-primary">{s.heading}</h3>
                {s.paragraphs?.map((p: string) => (
                  <p key={p} className="mb-3 text-text-secondary">
                    {p}
                  </p>
                ))}
                {s.bullets?.length ? (
                  <ul className="mb-2 list-disc space-y-1 pl-6 text-text-secondary">
                    {s.bullets.map((b: string) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
            <div className="h-0 w-full border-t border-dashed border-border-primary" />
          </li>
        ))}

        {cs.liveUrl ? (
          <li>
            <div className="grid h-full grid-cols-1 rounded-2xl md:grid-cols-12">
              <div className="col-span-2 col-start-1 hidden space-y-2 p-4 md:block">
                <div className="font-mono text-sm leading-none text-text-secondary">
                  <span className="block">Live</span>
                </div>
              </div>
              <div className="col-start-3 col-end-4 hidden h-full border-x border-dashed border-border-primary md:block"></div>
              <div className="col-span-9 col-start-4 flex w-full flex-grow flex-col p-4">
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                >
                  View Live Site
                </a>
              </div>
            </div>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
