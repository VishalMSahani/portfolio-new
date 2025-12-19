export type Project = {
  slug: string;
  title: string;
  summary: string;
  features: string[];
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  heroImage?: string;
};

export const projects: Project[] = [
  {
    slug: "society-commerce",
    title: "Society & Individual Model-Based E‑Commerce",
    summary:
      "Multi‑role commerce platform with society pricing, individual orders, and delivery workflow.",
    features: [
      "Role-based dashboards: User, Admin, Delivery",
      "Society-level pricing and order aggregation",
      "Realtime order status and delivery tracking",
    ],
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind"],
    liveUrl: "https://www.jainandiyer.com/",
    heroImage: "/projects/jainiyer.jpg",
  },
  {
    slug: "edtech-notes-youtube",
    title: "EdTech Website (Notes + YouTube)",
    summary:
      "Student-centric portal with Google Drive notes and YouTube playlist integration.",
    features: [
      "Drive API for notes storage",
      "YouTube Data API for curated videos",
      "Clean, responsive UI",
    ],
    tech: ["Next.js", "Drive API", "YouTube API", "Tailwind"],
    liveUrl: "https://www.gyanlabap.com/",
    heroImage: "/projects/gyanlab.jpg",
  },
  {
    slug: "anonymous-feedback",
    title: "Anonymous Feedback Platform",
    summary:
      "Privacy-first feedback links with a simple dashboard for responses.",
    features: [
      "Shareable anonymous links",
      "Spam-safe submissions",
      "Dashboard to view/manage",
    ],
    tech: ["Next.js", "MongoDB", "Tailwind"],
    liveUrl: "https://true-feedback-byvishal.vercel.app/",
    heroImage: "/projects/truefeedback.jpg",
  },
];

export const getProjectBySlug = (slug?: string) =>
  projects.find((p) => p.slug === slug);
