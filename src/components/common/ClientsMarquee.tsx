"use client";

import Image from "next/image";

const clients = [
    { name: "True Feedback", logo: "/clients/Logo-true-feedback.svg" },
    { name: "Gyanlab", logo: "/clients/gyanlab-logo.svg" },
    { name: "JNY", logo: "/clients/jny-logo.svg" },
    { name: "Vidyam", logo: "/clients/vidyam-logo.svg" },
    { name: "trueedge", logo: "/clients/trueedge-logo.svg" },
    { name: "CA CP Pandey", logo: "/clients/logo-ca-cp.png" },
  
];

export function ClientsMarquee() {
  // Duplicate the clients array to create seamless loop
  const duplicatedClients = [...clients];

  return (
    <div className="relative w-full py-4">
      {/* Gradient overlays for fade effect */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-white to-transparent" />
      
      {/* Scrolling container */}
      <div className="flex animate-scroll">
        {duplicatedClients.map((client, index) => (
          <div
            key={index}
            className="group md:mx-16 mx-8 flex md:h-16 h-8 min-w-0 shrink-0 items-center justify-center"
          >
            <div className="relative md:h-16 h-8 w-auto grayscale transition-all duration-100 group-hover:grayscale-0">
              <Image
                src={client.logo}
                alt={client.name}
                width={150}
                height={76}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
