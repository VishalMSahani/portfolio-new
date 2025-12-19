import { GridWrapper } from "../common/GridWrapper";
import Link from "next/link";
import { projects } from "../../data/projects";
import { ProjectImage } from "../common/ProjectImage";

function ProjectCards() {
  return (
     <section className="relative space-y-10 md:space-y-16">
              <div className="space-y-4 text-balance">
                <GridWrapper>
                  <div className="text-center text-2xl font-medium text-gray-900">
                    <span>Projects</span>
                  </div>
                </GridWrapper>
              </div>
              <div className="space-y-12">
                {projects.map((p) => {
                  // Map project slugs to actual image filenames
                  const imageMap: Record<string, string> = {
                    "society-commerce": "jainniyer.jpg",
                    "edtech-notes-youtube": "gyanlabap.jpg",
                    "anonymous-feedback": "truefeedback.jpg",
                  };
                  const src = `/projects/${imageMap[p.slug] || p.slug + ".jpg"}`;
                  const fallback = p.heroImage ?? "/lp-assets/hero-bg.svg";
                  const caseStudyHref = `/project?project=${p.slug}`;
                  return (
                    <div key={p.slug}>
                      <GridWrapper>
                        <div className="w-full">
                          <ProjectImage
                            src={src}
                            fallback={fallback}
                            alt={p.title}
                            width={1600}
                            height={900}
                            className="w-full rounded-2xl object-cover md:grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      </GridWrapper>
                      <GridWrapper>
                        <div className="mt-2 flex items-center justify-center gap-4">
                          
                          <Link
                            href={caseStudyHref}
                            className="rounded-lg border border-gray-300 bg-gray-900 md:px-4 md:py-2 px-2 py-1 text-sm text-white hover:bg-gray-700"
                          >
                            Case Study
                          </Link>
                          {p.liveUrl ? (
                            <Link
                              href={p.liveUrl}
                              className="rounded-lg border border-gray-300 md:px-4 md:py-2 px-2 py-1 text-sm text-gray-800 hover:bg-gray-50"
                            >
                              Live Link
                            </Link>
                          ) : null}
                        </div>
                      </GridWrapper>
                    </div>
                  );
                })}
              </div>
            </section>
  )
}

export default ProjectCards