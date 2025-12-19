import { AnimatedText } from "../components/common/AnimatedText";
import { GridWrapper } from "../components/common/GridWrapper";
import { AboutMeVishal } from "../components/lpComp/AboutMeVishal";
import { TechStack } from "../components/lpComp/TechStack";
import { ServiceCard } from "../components/cards/ServiceCard";
import { ClientsMarquee } from "../components/common/ClientsMarquee";
import { TestimonialsLoop } from "@/components/common/TestimonialsLoop";
import { ContactSection } from "../components/common/ContactSection";
import ProjectCards from "@/components/cards/ProjectCards";
import clsx from "clsx";
import Image from "next/image";
import CurvedLoop from "../components/CurvedLoop";

export default async function Home() {
  // const allPublishedBlogPosts = await fetchAndSortBlogPosts();
  // const featuredArticles = allPublishedBlogPosts.slice(0, 4);

  const PROFILE_DELAY = 0;
  const HEADING_DELAY = PROFILE_DELAY + 0.2;
  const PARAGRAPH_DELAY = HEADING_DELAY + 0.1;
  const PHOTOS_DELAY = PARAGRAPH_DELAY + 0.1;

  return (
    <section>
      <div className="relative mt-8 mb-0 flex items-center justify-center md:mt-12">
        <Image
          src="/lp-assets/ps-1.svg"
          alt="Person"
          width={150}
          height={150}
          className="relative z-10"
          priority
        />
      </div>
      <div className=" space-y-10 md:mt-0 md:space-y-16">
        <section>
          <div className="relative text-balance">
            <GridWrapper>
              <div className="flex justify-center">
                <span className="shadow-s text-gray-700t font-mediume inline-flex items-center rounded-full border border-gray-200 bg-gray-700 text-white px-4 py-1.5 text-base">
                  Designed to impress. Engineered to last.
                </span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <AnimatedText
                as="h1"
                delay={HEADING_DELAY}
                className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-16"
              >
                Crafting Products with <br />
                <span className="mt-5"> Code, Design, and Clarity.</span>
              </AnimatedText>
            </GridWrapper>
            <GridWrapper>
              <div className="mt-4 text-center md:mt-8">
                <AnimatedText
                  as="p"
                  delay={PARAGRAPH_DELAY}
                  className="leading-8 text-text-secondary"
                >
                  End-to-end product development combining technical precision
                  with intuitive, user-centered design.
                </AnimatedText>
              </div>
            </GridWrapper>
          </div>
        </section>

        {/* About Section */}
        <section className="relative space-y-10 md:space-y-16">
          {/* <AboutPattern /> */}
          <div className="space-y-4 ">
            <GridWrapper>
              <div className="text-center text-2xl font-medium text-gray-900">
                <span>About</span>
              </div>
            </GridWrapper>
           
          </div>

          <GridWrapper>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12 lg:grid-rows-[14]">
              <div className="col-span-1 md:col-span-5 lg:col-span-5 lg:row-span-6">
                <AboutMeVishal linkTo="/about" />
              </div>

              <div className="col-span-1 md:col-span-7 lg:col-span-7 lg:row-span-6 flex items-center">
                <ul className="space-y-3 px-4">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary"></span>
                    <span className="text-sm text-text-secondary">I create digital products where design and engineering work in sync</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary"></span>
                    <span className="text-sm text-text-secondary">I love solving complex problems with simple, intuitive interfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary"></span>
                    <span className="text-sm text-text-secondary">Skilled in building full-stack systems using modern JavaScript frameworks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary"></span>
                    <span className="text-sm text-text-secondary">I design with intention — clean, functional, conversion-focused</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary"></span>
                    <span className="text-sm text-text-secondary">Always exploring new tech, better workflows, and smarter architectures</span>
                  </li>
                </ul>
              </div>

              <div className="col-span-1 md:col-span-12 lg:col-span-12 lg:row-span-7">
                <TechStack />
              </div>

            
            </div>
          </GridWrapper>
        </section>

        {/* Projects Section (simple layout) */}
        <ProjectCards/>

         {/* Services Section */}
        <section className="relative space-y-10 md:space-y-16">
          <div className="relative space-y-4 text-balance">
            <GridWrapper>
              <div className="text-center text-2xl font-medium text-gray-900">
                <span>Services</span>
              </div>
            </GridWrapper>
          </div>

          <div className="z-10">
            <GridWrapper>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <ServiceCard
                  title="Engineering & Development"
                  description="Building robust digital solutions with modern technologies, from responsive websites to powerful mobile applications."
                  imageSrc="/lp-assets/ai.svg"
                  subServices={[
                    {
                      name: "Web Development",
                      icon: (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      ),
                    },
                    {
                      name: "App Development",
                      icon: (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      ),
                    },
                  ]}
                />
                <ServiceCard
                  title="Design & Visual Experience"
                  description="Creating stunning visual experiences that captivate users and communicate your brand's story effectively."
                  imageSrc="/lp-assets/art-design.png"
                  subServices={[
                    {
                      name: "UI/UX Design",
                      icon: (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      ),
                    },
                    {
                      name: "Graphic Design",
                      icon: (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      ),
                    },
                  ]}
                />
              </div>
            </GridWrapper>
          </div>
        </section>

        <section className="relative space-y-10 md:space-y-16">
          <div className="relative space-y-4 text-balance">
            <GridWrapper>
              <div className="text-center text-2xl font-medium text-gray-900">
                <span>Clients</span>
              </div>
            </GridWrapper>
          </div>
          <div className="z-10">
            <GridWrapper>
              <div className={clsx("overflow-hidden")}>
                  <ClientsMarquee />
              </div>
            </GridWrapper>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative space-y-10 md:space-y-16">
          <div className="relative space-y-4 text-balance">
            <GridWrapper>
              <div className="text-center text-2xl font-medium text-gray-900">
                <span>What Clients Say</span>
              </div>
            </GridWrapper>
          </div>
          <div className="z-10">
            <GridWrapper>
              <TestimonialsLoop />
            </GridWrapper>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative space-y-10 md:space-y-16">
          <div className="relative space-y-4 text-balance">
            <GridWrapper>
              <div className="text-center text-2xl font-medium text-gray-900">
                <span>Get In Touch</span>
              </div>
            </GridWrapper>
          </div>
          <div className="z-10">
             <div className="z-10 text-gray-900 overflow-hidden">
              <GridWrapper>
                <div className="w-full flex justify-center items-center py-2">
                  <Image 
                  src="/connect-ppl.svg" 
                  alt="Description" 
                  width={800} 
                  height={300} />
                </div>
              </GridWrapper>
              </div>
            <GridWrapper>
              <ContactSection />
            </GridWrapper>
          </div>
        </section>
        <section>
          <div className="z-10 flex justify-center items-center text-gray-900 overflow-hidden">
            <GridWrapper>
              <CurvedLoop 
              marqueeText="Vishal Sahani ✦ Fullstack Developer ✦ UI/UX Designer ✦ Problem Solver ✦"
              speed={3}
              curveAmount={0}
              direction="right"
              interactive={true}
              className="text-black bg-black mt-8"
              />
            </GridWrapper>
          </div>
          {/* <NewsletterSignUp /> */}
        </section>
        <section>
          <div className="z-10 text-gray-900 overflow-hidden">
            <GridWrapper>
              <div className="w-full">
                <Image 
                src="/grp-ppl.svg" 
                alt="Description" 
                width={1200} 
                height={300} />
              </div>
            </GridWrapper>
          </div>
          {/* <NewsletterSignUp /> */}
        </section>
       
      </div>
    </section>
  );
}
