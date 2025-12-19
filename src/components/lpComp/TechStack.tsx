import { RecCard } from "../cards/RecCard";
import { SkillIcon } from "@/components/common/SkillIcon";

type SkillItem = { title: string; imgSrc: string; fallback?: string };

// Add or adjust icons under /public/lp-assets to match these names.
const devSkills: SkillItem[] = [
  { title: "JavaScript", imgSrc: "/skill/js.svg" },
  { title: "TypeScript", imgSrc: "/skill/typescript.svg" },
  { title: "React", imgSrc: "/skill/react.svg" },
  { title: "Next.js", imgSrc: "/skill/nextjs.svg" },
  { title: "Express", imgSrc: "/skill/express.svg" },
  { title: "HTML", imgSrc: "/skill/html.svg" },
  { title: "CSS", imgSrc: "/skill/css.svg" },
  { title: "Tailwind", imgSrc: "/skill/tailwind.svg" },
  { title: "Python", imgSrc: "/skill/python.svg" },
  { title: "Redux", imgSrc: "/skill/redux.svg" },
  { title: "MongoDB", imgSrc: "/skill/mongo.svg" },
  { title: "PostgreSQL", imgSrc: "/skill/pg.svg" },
  { title: "Git", imgSrc: "/skill/git.svg" },
  { title: "GitHub", imgSrc: "/skill/github.svg" },
  { title: "Postman", imgSrc: "/skill/postman.svg" },
  { title: "Docker", imgSrc: "/skill/docker.svg" },
  { title: "Node.js", imgSrc: "/skill/node.svg" },
  { title: "Azure", imgSrc: "/skill/azure.svg" },
  { title: "AWS", imgSrc: "/skill/aws.svg" },
  { title: "GCP", imgSrc: "/skill/gcp.svg" },
  { title: "Redis", imgSrc: "/skill/redis.svg" },
  { title: "Kubernetes", imgSrc: "/skill/kubernetes.svg" },
  { title: "Cloudflare", imgSrc: "/skill/cloudflare.svg" },
];

const designTools: SkillItem[] = [
  { title: "Figma", imgSrc: "/skill/figma.svg" },
  // { title: "Adobe XD", imgSrc: "/skill/adobexd.svg"},
  { title: "Canva", imgSrc: "/skill/canva.svg"},
  { title: "Eraser", imgSrc: "/skill/eraser.svg"},
  { title: "Photoshop", imgSrc: "/skill/ps.svg" },
  { title: "Illustrator", imgSrc: "/skill/ai.svg" },
  { title: "Premiere Pro", imgSrc: "/skill/premierpro.svg" },
];

const DevItems = devSkills.slice(0, 25).map((item, index) => (
  <div key={item.title} className="group inline-flex flex-col items-center text-center">
    <div
      className={`rounded-[14px] border border-border-primary p-2 transition-all duration-300 group-hover:border-gray-500 ${
        index % 4 === 0
          ? "delay-0 group-hover:-translate-y-2"
          : index % 4 === 1
            ? "delay-75 group-hover:-translate-y-2"
            : index % 4 === 2
              ? "delay-150 group-hover:-translate-y-2"
              : "delay-200 group-hover:-translate-y-2"
      }`}
      style={{ width: 72, height: 72 }}
    >
      <div
        className="grid h-full place-items-center rounded-md border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0]"
        style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
      >
          <SkillIcon
            className="h-12 w-12 filter grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
          alt={item.title}
          src={item.imgSrc}
          fallback="/lp-assets/code-engn.svg"
        />
      </div>
    </div>
    <span className="mt-2 text-xs text-text-secondary">{item.title}</span>
  </div>
));

const DesignItems = designTools.map((item, index) => (
  <div key={item.title} className="group inline-flex flex-col items-center text-center">
    <div
      className={`rounded-[14px] border border-border-primary p-2 transition-all duration-300  group-hover:border-gray-500  ${
        index % 4 === 0
          ? "delay-0 group-hover:-translate-y-2"
          : index % 4 === 1
            ? "delay-75 group-hover:-translate-y-2"
            : index % 4 === 2
              ? "delay-150 group-hover:-translate-y-2"
              : "delay-200 group-hover:-translate-y-2"
      }`}
      style={{ width: 72, height: 72 }}
    >
      <div
        className="grid h-full place-items-center rounded-md border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0]"
        style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
      >
          <SkillIcon
            className="h-12 w-12 filter grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
            alt={item.title}
            src={item.imgSrc}
            fallback={item.fallback || "/lp-assets/art-design.png"}
          />
      </div>
    </div>
    <span className="mt-2 text-xs text-text-secondary">{item.title}</span>
  </div>
));

export function TechStack({ linkTo }: { linkTo?: string }) {
  return (
    <RecCard linkTo={linkTo}>
      <div className="group-hover:from-bg-white absolute inset-y-0 left-0 z-20 w-1/5 bg-linear-to-r from-bg-primary to-transparent"></div>
      <div className="group-hover:from-bg-white absolute inset-y-0 right-0 z-20 w-1/5 bg-linear-to-l from-bg-primary to-transparent"></div>
      <div className="z-20 text-center">
        <h2 className="text-base font-medium">Technical Skills</h2>
        <p className="mt-1 text-text-secondary">Core languages, frameworks, and tools I use.</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 transition-all duration-500 ease-in-out">
        {DevItems}
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-sm font-medium text-gray-900">Design Tools</h3>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 transition-all duration-500 ease-in-out">
        {DesignItems}
      </div>
    </RecCard>
  );
}
