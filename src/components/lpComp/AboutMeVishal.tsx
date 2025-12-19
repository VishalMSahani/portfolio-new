import { getTimeOfDayGreeting } from "../../lib/utils";
import { RecCard } from "../cards/RecCard";

export function AboutMeVishal({ linkTo }: { linkTo?: string }) {
  const timeOfDayGreeting = getTimeOfDayGreeting();

  return (
    <RecCard height="h-[275px] md:h-[304px] lg:h-[220px]" >
      <div className="group flex h-full"> 
        <div className="relative">
          <div className="group inline-block text-center">
            <div
              className="rounded-[20px] border border-border-primary p-1 transition-all duration-500 ease-out group-hover:border-indigo-400"
              style={{ width: 188, height: 278 }}
            >
              <div
                className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0]"
                style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
              ></div>
            </div>
          </div>
          <img
            className="absolute -top-1 left-0 md:h-67.5 h-77.5 w-45  rounded-lg object-cover transition-all duration-500 group-hover:rotate-[4deg] group-hover:scale-105"
            src="/lp-assets/profile.svg"
            alt="A headshot"
          />
        </div>
        <div className="text-balance flex justify-start items-center">
          <div className="mb-2 text-balance pl-3 text-gray-700 md:pl-4">
            {timeOfDayGreeting} <br />
           <span className="text-2xl font-semibold">
             I&apos;m Vishal Sahani.
           </span>
              <br/>
              <div className="flex justify-start items-center mt-2 space-x-2 gap-2 font-light text-gray-600">
               <span className="hidden md:block h-px w-12 bg-gray-700 "/>
               Fullstack Developer.
              </div>
          </div>
        </div>
      </div>
    </RecCard>
  );
}
