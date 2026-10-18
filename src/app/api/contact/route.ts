import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { buildContactEmail, isContactEmail, isSingleLine, validateContactPayload, type ContactPayload } from "@/lib/contact";

export const runtime = "nodejs";
export const maxDuration = 30;

const BODY_LIMIT = 32 * 1024;
const PROVIDER_TIMEOUT = 8000;
const RATE_WINDOW = 10 * 60 * 1000;
const SUBMISSION_WINDOW = 15 * 60 * 1000;
const MAX_ENTRIES = 500;
const SUCCESS_MESSAGE = "Thank you. Your enquiry has been submitted successfully.";
const FAILURE_MESSAGE = "Your enquiry could not be confirmed. Your details are still here. Please try again or email me directly.";

type SubmissionResult = {
  statusCode: number;
  body: {
    status: boolean;
    message: string;
    dashboardStatus: "saved" | "unconfirmed" | "unavailable";
    notificationStatus: "accepted" | "failed" | "unavailable";
  };
};

type EmailConfig = { apiKey: string; from: string; to: string };

// These bounded caches are best-effort per process, not shared serverless storage.
const rateLimits = new Map<string, { count: number; expiresAt: number }>();
const submissions = new Map<string, {
  fingerprint: string;
  expiresAt: number;
  promise: Promise<SubmissionResult>;
}>();

function failure(message: string, status = 400, headers?: Record<string, string>) {
  return NextResponse.json({ status: false, message }, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function submissionResponse(result: SubmissionResult) {
  return NextResponse.json(result.body, {
    status: result.statusCode,
    headers: { "Cache-Control": "no-store" },
  });
}

function emailConfiguration(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim() || "";
  const from = process.env.RESEND_FROM_EMAIL?.trim() || "";
  const to = process.env.CONTACT_TO_EMAIL?.trim() || "sahanivishal0808@gmail.com";
  const sender = from.match(/^(?:[^<>\r\n]*<([^<>]+)>|([^<>\r\n]+))$/);
  const senderEmail = (sender?.[1] || sender?.[2] || "").trim();
  if (!apiKey.startsWith("re_") || /\s/.test(apiKey) || !isSingleLine(apiKey) || !isSingleLine(from) || from.length > 384 || !isContactEmail(senderEmail) || !isContactEmail(to)) {
    return null;
  }
  return { apiKey, from, to };
}

function dashboardApiUrl(): string | null {
  const apiUrl = process.env.CONTACT_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim() ||
    "https://admin.vishal.it.com/api/contact-us";
  try {
    const url = new URL(apiUrl);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
  } catch {
    return null;
  }
  return apiUrl;
}

function rateLimit(request: Request): number {
  const now = Date.now();
  for (const [key, value] of rateLimits) {
    if (value.expiresAt <= now) rateLimits.delete(key);
  }
  // Only use a platform-controlled IP header. Self-hosting shares a fallback quota.
  const ip = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim()
    : null;
  const key = ip ? `vercel:${ip.slice(0, 100)}` : "shared";
  const maximum = ip ? 6 : 30;
  const existing = rateLimits.get(key);
  if (existing) {
    if (existing.count >= maximum) return Math.max(1, Math.ceil((existing.expiresAt - now) / 1000));
    existing.count += 1;
  } else {
    if (rateLimits.size >= MAX_ENTRIES) return 60;
    rateLimits.set(key, { count: 1, expiresAt: now + RATE_WINDOW });
  }
  return 0;
}

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > BODY_LIMIT) {
        await reader.cancel();
        throw new RangeError("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

const timedOut = (error: unknown) =>
  error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name);

function logFailure(id: string, stage: string, reason: string, status?: number) {
  console.error("[contact] Provider request failed", { id, stage, reason, ...(status ? { status } : {}) });
}

async function providerResult(response: Response): Promise<unknown> {
  return response.json().catch((error: unknown) => {
    if (timedOut(error)) throw error;
    return null;
  });
}

async function submitEnquiry(payload: ContactPayload, apiUrl: string | null, config: EmailConfig | null, id: string): Promise<SubmissionResult> {
  let saved = false;
  let accepted = false;
  let providerTimedOut = false;

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(PROVIDER_TIMEOUT),
        cache: "no-store",
        redirect: "error",
      });
      const result = await providerResult(response);
      saved = response.ok && !!result && typeof result === "object" &&
        "status" in result && result.status === true;
      if (!saved) logFailure(id, "save", "rejected-or-invalid-response", response.status);
    } catch (error) {
      const timeout = timedOut(error);
      providerTimedOut ||= timeout;
      logFailure(id, "save", timeout ? "timeout" : "network");
    }
  } else {
    logFailure(id, "save", "missing-or-invalid-configuration");
  }

  // Email is an independent delivery channel, even when the dashboard is unavailable.
  if (config) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `portfolio-enquiry/${id}`,
        },
        body: JSON.stringify({
          from: config.from,
          to: [config.to],
          reply_to: payload.email,
          ...buildContactEmail(payload),
        }),
        signal: AbortSignal.timeout(PROVIDER_TIMEOUT),
        cache: "no-store",
        redirect: "error",
      });
      const result = await providerResult(response);
      accepted = response.ok && !!result && typeof result === "object" &&
        "id" in result && typeof result.id === "string" && !!result.id.trim();
      if (!accepted) logFailure(id, "notification", "rejected-or-invalid-response", response.status);
    } catch (error) {
      const timeout = timedOut(error);
      providerTimedOut ||= timeout;
      logFailure(id, "notification", timeout ? "timeout" : "network");
    }
  } else {
    logFailure(id, "notification", "missing-or-invalid-configuration");
  }

  const status = saved || accepted;
  return {
    statusCode: status ? 200 : providerTimedOut ? 504 : 502,
    body: {
      status,
      dashboardStatus: !apiUrl ? "unavailable" : saved ? "saved" : "unconfirmed",
      notificationStatus: !config ? "unavailable" : accepted ? "accepted" : "failed",
      message: status ? SUCCESS_MESSAGE : FAILURE_MESSAGE,
    },
  };
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return failure("Please submit your enquiry from this website.", 403);
  }
  if (origin) {
    try {
      // Next may construct request.url with an internal hostname behind a proxy.
      const requestHost = request.headers.get("host")?.toLowerCase() || new URL(request.url).host;
      if (new URL(origin).host !== requestHost) {
        return failure("Please submit your enquiry from this website.", 403);
      }
    } catch {
      return failure("Please submit your enquiry from this website.", 403);
    }
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return failure("Please send valid enquiry details.", 415);
  }
  const length = Number(request.headers.get("content-length"));
  if (Number.isFinite(length) && length > BODY_LIMIT) {
    return failure("Please shorten your enquiry.", 413);
  }
  const id = request.headers.get("idempotency-key")?.trim().toLowerCase() || "";
  if (!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(id)) {
    return failure("Please refresh the page and try again.");
  }

  let data: unknown;
  try {
    data = await readBody(request);
  } catch (error) {
    return failure(error instanceof RangeError ? "Please shorten your enquiry." : "Please send valid enquiry details.", error instanceof RangeError ? 413 : 400);
  }
  const validation = validateContactPayload(data);
  if ("error" in validation) return failure(validation.error);
  const payload = validation.payload;
  const fingerprint = createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  const now = Date.now();
  for (const [key, submission] of submissions) {
    if (submission.expiresAt <= now) submissions.delete(key);
  }
  const existing = submissions.get(id);
  if (existing) {
    if (existing.fingerprint !== fingerprint) {
      return failure("Your details changed. Please refresh the page and try again.", 409);
    }
    return submissionResponse(await existing.promise);
  }

  const apiUrl = dashboardApiUrl();
  const config = emailConfiguration();
  if (!apiUrl && !config) {
    logFailure(id, "configuration", "missing-or-invalid");
    return failure("The enquiry form is temporarily unavailable. Please email me directly or try again later.", 503);
  }
  const retryAfter = rateLimit(request);
  if (retryAfter || submissions.size >= MAX_ENTRIES) {
    return failure("Please wait a little before submitting another enquiry.", 429, { "Retry-After": String(retryAfter || 60) });
  }

  const promise = submitEnquiry(payload, apiUrl, config, id);
  submissions.set(id, { fingerprint, expiresAt: now + SUBMISSION_WINDOW, promise });
  const result = await promise;
  if (!result.body.status) submissions.delete(id);
  return submissionResponse(result);
}
