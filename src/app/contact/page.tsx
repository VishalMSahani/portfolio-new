"use client";

import React, { useState } from "react";

const SERVICE_OPTIONS = [
  "SEO",
  "Social Media Marketing",
  "Content Marketing",
  "Email Marketing",
  "PPC Advertising",
  "Web Design",
  "Brand Strategy",
  "Analytics & Reporting",
];

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    services: [] as string[],
    message: "",
    referralSource: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | { type: "success" | "error"; message: string }>(null);

  const apiUrl =
    process.env.NEXT_PUBLIC_CONTACT_API_URL || "https://admin.vishal.it.com/api/contact-us";
  const sourceValue = process.env.NEXT_PUBLIC_CONTACT_SOURCE || "portfolio-website";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      const services = exists ? prev.services.filter((s) => s !== service) : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const validate = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email";
    if (formData.services.length === 0) return "Please select at least one service";
    if (!formData.message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setSubmitStatus({ type: "error", message: error });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: sourceValue }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Inquiry submitted successfully" });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          services: [],
          message: "",
          referralSource: "",
        });
      } else {
        setSubmitStatus({ type: "error", message: data?.message || "Failed to send message" });
      }
    } catch (err) {
      setSubmitStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
        <p className="mt-2 text-gray-600">
        Have a project in mind? Let's create something amazing together.
         </p>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-800" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-800" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-800" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
            placeholder="+1 555-123-4567"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-800" htmlFor="companyName">
            Company
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
            placeholder="Acme Inc"
          />
        </div>

        {/* Services */}
        <div>
          <span className="mb-2 block text-sm font-medium text-gray-800">Services</span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((service) => (
              <label
                key={service}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-gray-900 hover:border-gray-900"
              >
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => toggleService(service)}
                  className="h-4 w-4 accent-gray-900"
                />
                <span className="text-sm">{service}</span>
              </label>
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">Select at least one.</p>
        </div>

        {/* Referral Source */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-800" htmlFor="referralSource">
            How did you hear about me?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 focus:border-gray-900 focus:outline-none"
          >
            <option value="">Select an option</option>
            <option value="Google Search">Google Search</option>
            <option value="Social Media">Social Media</option>
            <option value="Friend Referral">Friend Referral</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-800" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
            placeholder="Tell me about your project..."
            required
          />
        </div>

        {submitStatus && (
          <div
            className={
              submitStatus.type === "success"
                ? "rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-800"
                : "rounded-xl border border-gray-200 bg-white p-3 text-gray-800"
            }
            role="alert"
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-xl border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}

export default ContactPage;
