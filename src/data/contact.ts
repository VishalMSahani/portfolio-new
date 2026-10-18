export const CONTACT_EMAIL = "info@vishal.it.com";

export const CONTACT_LINKEDIN_URL =
  "https://www.linkedin.com/in/vishal-sahani-208250197/";

export const CONTACT_FIELD_LIMITS = {
  fullName: 120,
  email: 254,
  message: 5000,
  phone: 40,
  companyName: 160,
  referralSource: 120,
  source: 120,
  service: 120,
} as const;

export const CONTACT_SERVICES = [
  "Full-stack web development",
  "UI/UX design",
  "E-commerce platforms",
  "API integrations",
  "Other",
] as const;
