import Image from "next/image";

const clients = [
  { name: "True Feedback", logo: "/clients/Logo-true-feedback.svg" },
  { name: "Gyanlab", logo: "/clients/gyanlab-logo.svg" },
  { name: "JNY", logo: "/clients/jny-logo.svg" },
  { name: "Vidyam", logo: "/clients/vidyam-logo.svg" },
  { name: "trueedge", logo: "/clients/trueedge-logo.svg" },
  { name: "CA CP Pandey", logo: "/clients/logo-ca-cp.png" },
];

export function ClientsSection() {
  return (
    <section className="section-wrap border-t border-neutral-200 py-10" aria-labelledby="clients-heading">
      <h2 id="clients-heading" className="section-title">Clients & projects.</h2>
      <ul className="mt-7 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {clients.map(({ name, logo }) => (
          <li key={name} className="flex h-14 items-center justify-center">
            <Image src={logo} alt={name} width={150} height={76} className="h-12 w-full max-w-[150px] object-contain grayscale" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export { ClientsSection as ClientsMarquee };
