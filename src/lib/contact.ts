import { CONTACT_FIELD_LIMITS } from "@/data/contact";

export type ContactPayload = {
  fullName: string;
  email: string;
  services: string[];
  message: string;
  source: string;
  phone?: string;
  companyName?: string;
  referralSource?: string;
};

type ValidationResult =
  | { payload: ContactPayload }
  | { error: string };

export const isSingleLine = (value: string) =>
  !Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || (code >= 127 && code <= 159);
  });

export const isContactEmail = (value: string) =>
  value.length <= CONTACT_FIELD_LIMITS.email &&
  isSingleLine(value) &&
  /^[^\s@<>,;:"\\]+@[^\s@<>,;:"\\]+\.[^\s@<>,;:"\\]+$/.test(value);

export function validateContactPayload(data: unknown): ValidationResult {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { error: "Please send valid enquiry details." };
  }

  const fields = data as Record<string, unknown>;
  const labels = {
    fullName: "your full name",
    email: "a valid email address",
    message: "your project details",
    source: "the enquiry source",
  } as const;

  for (const field of ["fullName", "email", "message", "source"] as const) {
    const value = fields[field];
    if (typeof value !== "string" || !value.trim()) {
      return { error: `Please enter ${labels[field]}.` };
    }
    if (value.trim().length > CONTACT_FIELD_LIMITS[field]) {
      return { error: `Please shorten ${labels[field]}.` };
    }
    const singleLineValue = field === "message" ? value.trim().replace(/[\r\n\t]/g, "") : value.trim();
    if (!isSingleLine(singleLineValue)) {
      return { error: `Please enter valid details for ${labels[field]}.` };
    }
  }

  const payload: ContactPayload = {
    fullName: (fields.fullName as string).trim(),
    email: (fields.email as string).trim(),
    message: (fields.message as string).trim(),
    source: (fields.source as string).trim(),
    services: [],
  };

  if (!isContactEmail(payload.email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!Array.isArray(fields.services) || fields.services.length === 0 || fields.services.length > 10) {
    return { error: "Please select between one and ten services." };
  }
  for (const service of fields.services) {
    if (typeof service !== "string" || !service.trim() || service.trim().length > CONTACT_FIELD_LIMITS.service || !isSingleLine(service.trim())) {
      return { error: "Please select valid services." };
    }
    payload.services.push(service.trim());
  }
  payload.services = [...new Set(payload.services)];

  for (const field of ["phone", "companyName", "referralSource"] as const) {
    const value = fields[field];
    if (value === undefined) continue;
    if (typeof value !== "string" || value.trim().length > CONTACT_FIELD_LIMITS[field] || !isSingleLine(value.trim())) {
      return { error: "Please check your additional details." };
    }
    payload[field] = value.trim();
  }

  if (fields.website !== undefined && (typeof fields.website !== "string" || fields.website.trim())) {
    return { error: "This enquiry could not be submitted. Please email me directly." };
  }

  return { payload };
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);

export function buildContactEmail(payload: ContactPayload) {
  const details: [string, string][] = [
    ["Name", payload.fullName],
    ["Email", payload.email],
    ["Services", payload.services.join(", ")],
    ["Source", payload.source],
  ];
  const additionalDetails: [string, string | undefined][] = [
    ["Phone", payload.phone],
    ["Company", payload.companyName],
    ["Referral source", payload.referralSource],
  ];
  for (const [label, value] of additionalDetails) {
    if (value !== undefined) details.push([label, value || "Not provided"]);
  }
  details.push(["Project details", payload.message]);

  return {
    subject: "New portfolio enquiry",
    text: `New portfolio enquiry\n\n${details.map(([label, value]) => `${label}: ${value}`).join("\n\n")}`,
    html: `<!doctype html><html lang="en"><body style="margin:0;background:#fafafa;color:#171717;font-family:Arial,sans-serif"><div style="max-width:600px;margin:24px auto;padding:24px;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px"><h1 style="margin:0 0 24px;font-size:22px;font-weight:600">New portfolio enquiry</h1><dl style="margin:0">${details.map(([label, value]) => `<dt style="margin-top:18px;font-size:12px;color:#525252">${escapeHtml(label)}</dt><dd style="margin:6px 0 0;font-size:15px;line-height:1.6;overflow-wrap:anywhere">${escapeHtml(value).replace(/\r?\n/g, "<br />")}</dd>`).join("")}</dl></div></body></html>`,
  };
}
