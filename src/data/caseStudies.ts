import { getProjectBySlug, normalizeProjectSlug } from "./projects";

export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: boolean;
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

const narratives: { slug: string; subtitle: string; sections: CaseStudySection[] }[] = [
  {
    slug: "jain-and-iyer",
    subtitle: "Translating individual purchases and scheduled society orders into one commerce experience.",
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "Jain & Iyer is a batters, flours, and instant-premix brand serving individual customers and residential societies. Those customers share a product catalogue, but not an ordering routine. Individual purchases follow a direct ordering journey; society purchases need to fit fixed weekly delivery days, cutoff times, and coordinated dispatch.",
          "Checkout needed to make those differences understandable: customers need a clear delivery date, while the business needs orders organized around its delivery schedule.",
        ],
      },
      {
        heading: "Two ways to order",
        paragraphs: [
          "The platform keeps individual and society ordering distinct without treating them as separate products. The chosen ordering model determines the relevant pricing and delivery information, so customers can understand the conditions of their purchase before completing checkout.",
          "The society is also an operational grouping. Society-specific pricing serves customers, while grouped orders give the delivery operation a shared destination for dispatch.",
        ],
        bullets: [
          "Individual orders follow a direct doorstep-delivery journey.",
          "Society orders follow predefined weekly delivery days.",
          "Society-specific pricing accompanies society-grouped orders.",
        ],
      },
      {
        heading: "Business rules before screens",
        ordered: true,
        paragraphs: [
          "Each society's delivery days and cutoff times define when an order can be fulfilled. The application checks those rules and automatically assigns the next valid delivery date when an order arrives after the cutoff, rather than leaving the customer to interpret the schedule.",
          "These rules connect checkout to dispatch. Administrative overrides provide room for schedule changes without disrupting existing orders, keeping operational adjustments distinct from the normal date-assignment flow.",
        ],
        bullets: [
          "Check the society's delivery days and order cutoff.",
          "Assign the next valid delivery date after the cutoff.",
          "Group orders by society for dispatch.",
          "Allow administrative schedule overrides without disrupting existing orders.",
        ],
      },
      {
        heading: "Designing for repeat use",
        paragraphs: [
          "User journeys and wireframes helped structure the different paths through the product. The customer-facing design focuses on repeat ordering: a clear starting choice, mobile-first browsing, and checkout steps that keep attention on the purchase rather than the scheduling rules behind it.",
          "Visible delivery dates connect the shopping flow to the weekly delivery model. Customers can see when an order fits the schedule as part of their buying decision.",
        ],
        bullets: [
          "Distinguish individual and society ordering early.",
          "Keep mobile checkout focused.",
          "Show delivery dates and scheduling information clearly.",
        ],
      },
      {
        heading: "Control behind the scenes",
        paragraphs: [
          "The administrative experience brings society setup, products, inventory, and orders into the same operation. Customer, administrative, and delivery responsibilities stay distinct: customers place purchases, administrators manage the catalogue and schedules, and delivery work uses society-grouped orders for dispatch.",
          "Catalogue and schedule controls sit alongside order management, connecting what customers can buy with how the business prepares deliveries.",
        ],
        bullets: [
          "Create societies with delivery days and cutoffs.",
          "Manage products and inventory.",
          "Review society-grouped orders for dispatch.",
          "Apply schedule overrides when needed.",
        ],
      },
      {
        heading: "Connecting the system",
        paragraphs: [
          "Next.js provides the customer-facing frontend, while Node.js supports application logic, including ordering and scheduling. Razorpay connects payments, Tailwind CSS supports the interface styling, and Google Cloud Platform provides hosting. The system also includes a notification integration.",
          "These pieces support the path from customer ordering to operational handling. The delivery rules connect the frontend purchase journey with administrative scheduling and society-grouped dispatch.",
        ],
      },
      {
        heading: "What the product enables",
        paragraphs: [
          "One system handles individual purchases and scheduled society orders without hiding their differences. Customers see the ordering context and delivery date; the business works with grouped orders and controls products, inventory, and schedules.",
          "The design lesson is practical: define the business rules before simplifying the screens. Here, a focused shopping experience depends on representing the delivery workflow clearly, not removing it from view.",
        ],
      },
    ],
  },
  {
    slug: "edtech-notes-youtube",
    subtitle: "Bringing class-wise study notes and video learning into one focused student experience.",
    sections: [
      {
        heading: "The starting point",
        paragraphs: [
          "Gyanlab is a student learning website that brings class-wise notes and educational videos into one place. The starting point is the student's learning context: material needs to be relevant to their class, easy to reach, and comfortable to read on the device they have at hand.",
          "Notes and video serve different needs within that experience. Written material supports reading and revision, while a video can offer another explanation of a concept. Keeping both available gives the website a clear purpose beyond simply listing resources.",
        ],
      },
      {
        heading: "Notes that stay easy to manage",
        paragraphs: [
          "The Google Drive API connects the website to class-wise study notes. Learning content can be updated without redeploying the application, separating changes to the material from changes to the website itself. This matters because the notes are the resource students come to use, not a fixed part of the interface.",
          "Class-wise organization gives those resources a consistent structure. Students can approach the material through their class, while the website presents the connected notes within its learning experience rather than treating content maintenance as an application release.",
        ],
      },
      {
        heading: "Video learning, connected",
        paragraphs: [
          "Educational videos are dynamically fetched and displayed through the YouTube Data API. Video learning sits alongside the notes in the same website, bringing two forms of explanation into a connected browsing experience instead of making the product exclusively a notes library or a video page.",
          "The learning rationale is conceptual clarity. Reading and watching can provide different ways to engage with a topic; making both resources available supports that choice without assuming every student needs the same format for every concept.",
        ],
      },
      {
        heading: "An interface for learning",
        paragraphs: [
          "The mobile-first interface prioritizes readability and clear, quick navigation. On smaller screens, the route to useful material matters as much as the material itself: students need to understand where they are and reach the notes or videos without navigating around unnecessary interface elements.",
          "The design emphasis stays on learning content. A restrained presentation leaves room for reading, while straightforward navigation supports moving through the available resources. Together, these choices keep the class-wise structure and connected video learning understandable in everyday use.",
        ],
        bullets: [
          "Organize notes by class.",
          "Keep reading comfortable on mobile.",
          "Make notes and videos easy to reach.",
        ],
      },
    ],
  },
  {
    slug: "anonymous-feedback",
    subtitle: "Shareable feedback links with a separate private space for reviewing responses.",
    sections: [
      {
        heading: "The idea",
        paragraphs: [
          "True Feedback is built around a privacy-first intent: make it straightforward to ask for honest feedback and give the recipient a separate place to review it. Shareable links connect the person requesting feedback with reviewers, while public submission pages and a private dashboard serve different parts of the workflow.",
          "That separation gives the product its structure. Reviewers need a focused place to write; recipients need a place to return to the responses. The interface keeps those purposes distinct rather than combining collection and management on one page.",
        ],
      },
      {
        heading: "A simple submission journey",
        paragraphs: [
          "A shared link takes a reviewer to a public feedback page, where they can write and submit a response without creating an account. Removing account creation from that journey keeps the immediate task clear: the reviewer is there to provide feedback, not to set up another profile.",
          "The public page focuses on that single interaction. It is the entry point for a response, while reviewing and managing the collected feedback belongs to the recipient's separate dashboard.",
        ],
        bullets: [
          "Open the recipient's shared link.",
          "Write feedback on the public submission page.",
          "Submit without creating a reviewer account.",
        ],
      },
      {
        heading: "A private place to manage responses",
        paragraphs: [
          "The private recipient dashboard provides a place to view and manage incoming feedback. Unlike the public submission page, it is designed around the collected responses rather than the act of writing a new one. This gives the recipient a consistent destination for the other half of the feedback workflow.",
          "Keeping response management separate also clarifies the purpose of the shared link. It invites someone to contribute feedback; it is not the recipient's working view of the responses. Public collection and private review remain distinct experiences.",
        ],
      },
      {
        heading: "Keeping the product focused",
        paragraphs: [
          "Next.js, MongoDB, and Tailwind CSS support the application. The technical foundation serves a deliberately narrow workflow: collect feedback through shareable links, then let the recipient view and manage those responses in a private dashboard.",
          "Clear navigation and a restrained interface keep attention on the feedback itself. The design rationale is to make each side of the exchange understandable: reviewers have a direct submission journey, and recipients have a separate management space. The privacy-first intent is reflected in this public/private separation.",
        ],
      },
    ],
  },
];

export const caseStudies: CaseStudy[] = narratives.map((narrative) => {
  const project = getProjectBySlug(narrative.slug);
  if (!project) throw new Error(`Missing project data for ${narrative.slug}`);

  return {
    ...narrative,
    title: project.title,
    coverImage: project.heroImage,
    tech: project.tech,
    liveUrl: project.liveUrl,
    repoUrl: project.repoUrl,
  };
});

export const getCaseStudyBySlug = (slug?: string) =>
  slug ? caseStudies.find((study) => study.slug === normalizeProjectSlug(slug)) : undefined;
