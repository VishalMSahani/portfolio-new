import { SkillIcon } from "@/components/common/SkillIcon";

type SkillItem = { title: string; imgSrc: string };

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
  { title: "Canva", imgSrc: "/skill/canva.svg" },
  { title: "Eraser", imgSrc: "/skill/eraser.svg" },
  { title: "Photoshop", imgSrc: "/skill/ps.svg" },
  { title: "Illustrator", imgSrc: "/skill/ai.svg" },
  { title: "Premiere Pro", imgSrc: "/skill/premierpro.svg" },
];

const hoverDelays = ["delay-0", "delay-75", "delay-150", "delay-200"];

function SkillGrid({ skills, fallback }: { skills: SkillItem[]; fallback: string }) {
  return (
    <ul className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-5 sm:gap-x-4">
      {skills.map(({ title, imgSrc }, index) => (
        <li key={title} className="group/icon flex w-16 flex-col items-center text-center sm:w-[72px]">
          <div
            className={`skill-tile h-16 w-16 rounded-[14px] border border-neutral-200 p-2 transition-all duration-300 group-hover/skills:border-neutral-400 motion-safe:group-hover/skills:-translate-y-2 sm:h-[72px] sm:w-[72px] ${hoverDelays[index % hoverDelays.length]}`}
          >
            <div className="grid h-full place-items-center rounded-md border border-neutral-200 bg-neutral-100 shadow-[inset_0_2px_1.5px_0_rgb(0_0_0_/_0.12)]">
              <SkillIcon
                src={imgSrc}
                alt={title}
                fallback={fallback}
                className="h-9 w-9 object-contain grayscale opacity-80 transition-opacity duration-300 group-hover/icon:opacity-100 sm:h-12 sm:w-12"
              />
            </div>
          </div>
          <span className="mt-2 text-xs leading-4 text-neutral-500">{title}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechStack() {
  return (
    <div className="group/skills border-t border-neutral-200 pt-8">
      <h3 className="text-center text-sm font-medium">Technical skills</h3>
      <SkillGrid skills={devSkills} fallback="/lp-assets/code-engn.svg" />
      <h3 className="mt-8 text-center text-sm font-medium">Design tools</h3>
      <SkillGrid skills={designTools} fallback="/lp-assets/art-design.png" />
    </div>
  );
}
