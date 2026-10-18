"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CONTACT_FIELD_LIMITS, CONTACT_SERVICES } from "@/data/contact";

type ContactFormProps = {
  variant?: "compact" | "full";
};

type SubmitStatus = {
  type: "success" | "error";
  message: string;
} | null;

export function ContactForm({ variant = "compact" }: ContactFormProps) {
  const prefix = useId();
  const full = variant === "full";
  const submittingRef = useRef(false);
  const submissionRef = useRef<{ body: string; id: string } | null>(null);
  const firstServiceRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceError, setServiceError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const fieldId = (name: string) => `${prefix}-${name}`;
  const serviceDescription = [
    fieldId("services-hint"),
    serviceError ? fieldId("services-error") : null,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    const field = event.target;
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement ||
      field instanceof HTMLSelectElement
    ) {
      field.setCustomValidity("");
      if (field.name === "services") {
        const selected = new FormData(event.currentTarget).getAll("services");
        setServiceError(selected.some((service) => String(service).trim()) ? "" : serviceError);
      }
    }
    setSubmitStatus(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const value = (name: string) => String(values.get(name) ?? "").trim();
    const fullName = value("fullName");
    const email = value("email");
    const message = value("message");
    const services = values
      .getAll("services")
      .map((service) => String(service).trim())
      .filter(Boolean);

    // Native required validation does not reject whitespace-only text.
    for (const [name, text, error] of [
      ["fullName", fullName, "Please enter your full name."],
      ["message", message, "Please tell me a little about your project."],
    ]) {
      if (!text) {
        const field = form.elements.namedItem(name);
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
          field.setCustomValidity(error);
          field.reportValidity();
        }
        setSubmitStatus({ type: "error", message: error });
        return;
      }
    }

    if (services.length === 0) {
      setServiceError(full ? "Please select at least one service." : "Please select a service.");
      setSubmitStatus(null);
      firstServiceRef.current?.focus();
      return;
    }

    // The ref closes the gap before React renders the disabled button.
    submittingRef.current = true;
    setIsSubmitting(true);
    setServiceError("");
    setSubmitStatus(null);

    try {
      const body = JSON.stringify({
        fullName,
        email,
        services,
        message,
        source:
          process.env.NEXT_PUBLIC_CONTACT_SOURCE?.trim() ||
          (full ? "portfolio-website" : "lets-work-together"),
        website: value("website"),
        ...(full
          ? {
              phone: value("phone"),
              companyName: value("companyName"),
              referralSource: value("referralSource"),
            }
          : {}),
      });
      // Reuse the identifier if an unchanged enquiry is retried after a network error.
      if (submissionRef.current?.body !== body) {
        submissionRef.current = { body, id: crypto.randomUUID() };
      }
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": submissionRef.current.id,
        },
        body,
      });
      const data: unknown = await response.json().catch(() => null);
      const result =
        data && typeof data === "object" && !Array.isArray(data)
          ? (data as { status?: unknown; message?: unknown })
          : null;

      if (!response.ok || result?.status !== true) {
        const serverMessage =
          result?.status === false && typeof result.message === "string"
            ? result.message.trim()
            : "";
        setSubmitStatus({
          type: "error",
          message:
            serverMessage ||
            "Your enquiry could not be confirmed. Your details are still here. Please try again or email me directly.",
        });
        return;
      }

      form.reset();
      submissionRef.current = null;
      setSubmitStatus({
        type: "success",
        message:
          typeof result.message === "string" && result.message.trim()
            ? result.message.trim()
            : "Thank you. Your enquiry has been submitted successfully.",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "Could not connect to the server. Your details are still here. Please try again or email me directly.",
      });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      aria-busy={isSubmitting}
      aria-describedby={fieldId("required-hint")}
      className="w-full"
    >
      <p id={fieldId("required-hint")} className="sr-only">
        Fields marked with an asterisk (*) are required.
      </p>

      <fieldset disabled={isSubmitting} className="min-w-0 space-y-6 disabled:opacity-70">
        <legend className="sr-only">{full ? "Project enquiry details" : "Quick enquiry details"}</legend>
        <div hidden aria-hidden="true">
          <label htmlFor={fieldId("website")}>Leave this field empty</label>
          <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" maxLength={200} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <label className="form-label" htmlFor={fieldId("fullName")}>
              Full name <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldId("fullName")}
              name="fullName"
              type="text"
              autoComplete="name"
              maxLength={CONTACT_FIELD_LIMITS.fullName}
              placeholder="Your name"
              className="form-input w-full"
              required
            />
          </div>
          <div className="min-w-0">
            <label className="form-label" htmlFor={fieldId("email")}>
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={CONTACT_FIELD_LIMITS.email}
              placeholder="you@example.com"
              className="form-input w-full"
              required
            />
          </div>
        </div>

        {full ? (
          <fieldset
            className="min-w-0"
            aria-describedby={serviceDescription}
            aria-invalid={serviceError ? true : undefined}
          >
            <legend className="form-label">
              Services <span aria-hidden="true">*</span>
              <span className="sr-only"> (required)</span>
            </legend>
            <p id={fieldId("services-hint")} className="mb-3 text-xs leading-relaxed text-neutral-500">
              Select at least one.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {CONTACT_SERVICES.map((service, index) => (
                <label
                  key={service}
                  htmlFor={fieldId(`service-${index}`)}
                  className="flex min-h-12 cursor-pointer items-center gap-3 border border-neutral-200 bg-white px-3 py-3 text-sm leading-snug text-neutral-700 transition-colors hover:border-neutral-500 has-[:checked]:border-neutral-900 has-[:checked]:bg-neutral-100 has-[:checked]:text-neutral-950 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-neutral-900"
                >
                  <input
                    ref={index === 0 ? (node) => { firstServiceRef.current = node; } : undefined}
                    id={fieldId(`service-${index}`)}
                    name="services"
                    type="checkbox"
                    value={service}
                    aria-describedby={serviceDescription}
                    aria-invalid={serviceError ? true : undefined}
                    className="h-4 w-4 shrink-0 accent-neutral-950"
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
            {serviceError && (
              <p id={fieldId("services-error")} role="alert" className="form-status mt-3 text-sm">
                {serviceError}
              </p>
            )}
          </fieldset>
        ) : (
          <div>
            <label className="form-label" htmlFor={fieldId("services")}>
              Service <span aria-hidden="true">*</span>
            </label>
            <select
              ref={(node) => { firstServiceRef.current = node; }}
              id={fieldId("services")}
              name="services"
              defaultValue=""
              className="form-input w-full"
              aria-describedby={serviceDescription}
              aria-invalid={serviceError ? true : undefined}
              onInvalid={() => setServiceError("Please select a service.")}
              required
            >
              <option value="" disabled>Choose a service</option>
              {CONTACT_SERVICES.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <p id={fieldId("services-hint")} className="sr-only">Choose one service.</p>
            {serviceError && (
              <p id={fieldId("services-error")} role="alert" className="form-status mt-3 text-sm">
                {serviceError}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="form-label" htmlFor={fieldId("message")}>
            Project details <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={full ? 4 : 3}
            maxLength={CONTACT_FIELD_LIMITS.message}
            placeholder="Tell me about your project."
            aria-describedby={fieldId("message-hint")}
            className="form-input min-h-28 w-full resize-y"
            required
          />
          <p id={fieldId("message-hint")} className="sr-only">
            Share a little about your project.
          </p>
        </div>

        {full && (
          <details className="border-t border-neutral-200 pt-4">
            <summary className="cursor-pointer text-sm font-medium text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">
              Additional details (optional)
            </summary>
            <div className="mt-5 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <label className="form-label" htmlFor={fieldId("phone")}>Phone</label>
                  <input
                    id={fieldId("phone")}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={CONTACT_FIELD_LIMITS.phone}
                    placeholder="Your phone number"
                    className="form-input w-full"
                  />
                </div>
                <div className="min-w-0">
                  <label className="form-label" htmlFor={fieldId("companyName")}>Company</label>
                  <input
                    id={fieldId("companyName")}
                    name="companyName"
                    type="text"
                    autoComplete="organization"
                    maxLength={CONTACT_FIELD_LIMITS.companyName}
                    placeholder="Company or organization"
                    className="form-input w-full"
                  />
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor={fieldId("referralSource")}>
                  How did you find me?
                </label>
                <select
                  id={fieldId("referralSource")}
                  name="referralSource"
                  defaultValue=""
                  className="form-input w-full"
                >
                  <option value="">Select an option</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friend Referral">Friend Referral</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </details>
        )}
      </fieldset>

      <div role="status" aria-live="polite" aria-atomic="true">
        {submitStatus && (
          <p className="form-status mt-6" data-status={submitStatus.type}>
            {submitStatus.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className="button-primary mt-6 w-full justify-between gap-6 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{isSubmitting ? "Submitting enquiry…" : "Send enquiry"}</span>
        {isSubmitting ? (
          <LoaderCircle className="h-4 w-4 shrink-0 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        ) : (
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
