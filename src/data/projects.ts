export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  features: string[];
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  heroImage?: string;
  previewImage?: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "jain-and-iyer",
    title: "Jain & Iyer",
    category: "E-commerce",
    summary: "Commerce for individual orders and scheduled society deliveries.",
    features: [
      "Individual and society ordering",
      "Delivery cutoffs and automatic rescheduling",
      "Society-grouped dispatch and admin controls",
    ],
    tech: ["Next.js", "Node.js", "Razorpay", "Tailwind CSS", "GCP"],
    liveUrl: "https://www.jainandiyer.com/",
    heroImage: "/projects/jainiyer.jpg",
    previewImage: "/new-img/jainiyer.jpg",
    imageAlt: "Jain & Iyer commerce interface shown on desktop and mobile devices",
  },
  {
    slug: "edtech-notes-youtube",
    title: "Gyanlab",
    category: "Education",
    summary: "Study notes and videos, in one student-friendly website.",
    features: [
      "Class-wise notes through Google Drive",
      "Integrated YouTube video learning",
      "A readable, mobile-first interface",
    ],
    tech: ["Next.js", "Google Drive API", "YouTube Data API", "Tailwind CSS"],
    liveUrl: "https://www.gyanlabap.com/",
    heroImage: "/projects/gyanlab.jpg",
    previewImage: "/new-img/gyanlab.jpg",
    imageAlt: "Gyanlab study notes and video learning interfaces shown on mobile devices",
  },
  {
    slug: "anonymous-feedback",
    title: "True Feedback",
    category: "Web app",
    summary: "Shareable feedback links with a private response dashboard.",
    features: [
      "Shareable feedback links",
      "Public pages for submitting responses",
      "Private response-management dashboards",
    ],
    tech: ["Next.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://true-feedback-byvishal.vercel.app/",
    heroImage: "/projects/truefeedback.jpg",
    previewImage: "/new-img/truefeedback.jpg",
    imageAlt: "True Feedback public submission page and private dashboard previews",
  },
];

export const normalizeProjectSlug = (slug: string) =>
  slug === "society-commerce" ? "jain-and-iyer" : slug;

export const getProjectBySlug = (slug?: string) =>
  slug ? projects.find((project) => project.slug === normalizeProjectSlug(slug)) : undefined;
