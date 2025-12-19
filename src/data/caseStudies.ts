export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  tech?: string[];
  liveUrl?: string;
  repoUrl?: string;
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "jain-and-iyer",
    title: "Jain & Iyer — Case Study",
    subtitle:
      "Designing a Dual-Model E-commerce Platform for Individuals & Residential Societies",
    coverImage: "/projects/jainiyer.jpg",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Razorpay", "Tailwind CSS", "META Api", "Google Cloud Platform (GCP)"],
    liveUrl: "https://www.jainandiyer.com/",
    sections: [
      {
        heading: "Problem Statement",
        paragraphs: [
          "Traditional e-commerce platforms are not built for recurring household needs or society-based ordering. Jain & Iyer required a system that could support both instant individual purchases and scheduled society-level ordering with grouped society-wise deliveries as per schedule, while maintaining efficiency, automation, and full administrative control—without relying on slow or rigid off-the-shelf solutions.",
        ],
      },
      {
        heading: "1. Understanding the Business Reality",
        paragraphs: [
          "Jain & Iyer is a high-end e-commerce brand and Manufacturer of Authentic Food Batters (Idli, dosa, Vada) Flours (Refer Product List) Instant Pre-Mixes (Refer Product List) All our Products are Preservatives and Chemical Free. The business operates in two distinct ways: individual customers who order anytime, and residential societies that prefer fixed weekly delivery schedules. The real challenge was translating these real-world buying behaviors into a single, scalable digital platform.",
        ],
      },
      {
        heading: "2. Defining the Dual Ordering Model",
        paragraphs: [
          "To keep the system clear and scalable, the platform was designed around two independent ordering models:",
        ],
        bullets: [
          "Individual Model: Customers can place orders anytime with standard doorstep delivery.",
          "Society Model: Orders are placed under a society with predefined delivery days (1–2 days per week), enabling group benefits and coordinated deliveries.",
        ],
      },
      {
        heading: "3. Planning Before Designing",
        paragraphs: [
          "Before starting UI design, the entire business logic was mapped out:",
        ],
        bullets: [
          "Each society has specific delivery days and cut-off times",
          "Orders placed after the cut-off automatically move to the next valid delivery date",
          "Admins must be able to override schedules without affecting existing orders",
          "Society orders must be grouped for delivery efficiency",
        ],
      },
      {
        heading: "4. UX Strategy & Wireframing",
        paragraphs: [
          "User journeys were designed separately for individual buyers, society buyers, and admins. The UX focus was on clarity, speed, and repeat usage.",
        ],
        bullets: [
          "Clear separation between society and individual ordering",
          "Mobile-first design for frequent customers",
          "Minimal checkout steps for recurring orders",
          "Transparent communication of delivery dates and scheduling",
        ],
      },
      {
        heading: "5. Automated Delivery Scheduling System",
        paragraphs: [
          "The core innovation of the platform is its automated delivery engine. The system dynamically validates delivery availability based on society rules and automatically reschedules orders placed outside allowed windows. Orders are grouped society-wise to simplify delivery planning and reduce operational effort.",
          "This automation removes manual coordination while keeping the system flexible.",
        ],
      },
      {
        heading: "6. Admin Control & Multi-Role Access",
        paragraphs: [
          "The platform includes a robust admin system with multi-role access.",
          "Admins can:",
        ],
        bullets: [
          "Create and manage societies",
          "Define delivery days and cut-off times",
          "Override delivery schedules when required",
          "Manage inventory and products",
          "View and process society-wise grouped orders",
        ],
      },
      {
        heading: "7. Technology & Performance Focus",
        paragraphs: [
          "The platform was built with performance and scalability in mind.",
          "Tech Stack:",
        ],
        bullets: [
          "Frontend: Next.js",
          "Backend: Node.js",
          "Database: PostgreSQL",
          "Payments: Razorpay",
          "Styling: Tailwind CSS",
          "SMS/Notifications: META Api",
          "Hosting: Google Cloud Platform (GCP)",
        ],
      },
      {
        heading: "8. Outcome & Impact",
        paragraphs: [
          "The final system enables effortless recurring ordering for both individuals and residential societies. It reduces operational complexity, improves delivery efficiency, and provides a scalable foundation for future growth.",
          "This project demonstrates the ability to translate complex business rules into a clean, high-performance, production-ready full-stack solution.",
        ],
      },
    ],
  },
  {
    slug: "edtech-notes-youtube",
    title: "EdTech Website — Notes + YouTube Integration",
    subtitle: "Conceptual Learning Platform for Students",
    coverImage: "/projects/gyanlab.jpg",
    tech: ["Next.js", "Google Drive API", "YouTube Data API", "Tailwind CSS"],    liveUrl: "https://www.gyanlabap.com/",    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Built a mobile-first EdTech platform combining structured study notes with YouTube-based video learning for conceptual clarity.",
        ],
      },
      {
        heading: "Class-wise Notes via Drive API",
        paragraphs: [
          "Implemented class-wise notes access using Google Drive API, allowing easy content updates without redeploying the app.",
        ],
      },
      {
        heading: "YouTube Integration",
        paragraphs: [
          "Integrated YouTube Data API to dynamically fetch and display educational videos directly within the platform.",
        ],
      },
      {
        heading: "UI for Learning Focus",
        paragraphs: [
          "Designed a clean, distraction-free UI focused on quick access, readability, and smooth navigation for students.",
        ],
      },
    ],
  },
  {
    slug: "anonymous-feedback",
    title: "Anonymous Feedback Platform — Privacy-First Feedback Links",
    subtitle: "True Feedback System",
    coverImage: "/projects/truefeedback.jpg",
    tech: ["Next.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://true-feedback-byvishal.vercel.app/",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Designed and developed a privacy-first anonymous feedback system where users can collect honest responses via shareable links.",
        ],
      },
      {
        heading: "User Dashboards",
        paragraphs: [
          "Implemented user dashboards to manage feedback while keeping sender identity fully anonymous.",
        ],
      },
      {
        heading: "Trust-focused UI",
        paragraphs: [
          "Built a simple, trust-focused UI to encourage genuine responses without login friction for reviewers.",
        ],
      },
      {
        heading: "Scalable Architecture",
        paragraphs: [
          "Structured the system for scalability with secure data handling and clear separation between public feedback pages and private dashboards.",
        ],
      },
    ],
  },
];

export const getCaseStudyBySlug = (slug?: string) => {
  if (!slug) return undefined;
  const aliasMap: Record<string, string> = {
    // Map project slugs to case study slugs
    "society-commerce": "jain-and-iyer",
  };
  const normalized = aliasMap[slug] ?? slug;
  return caseStudies.find((c) => c.slug === normalized);
};
