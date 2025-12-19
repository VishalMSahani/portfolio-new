import React from "react";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export function TestimonialCard({ name, role, company, content }: TestimonialCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-gray-900">
      {/* Quote Icon */}
      <div className="mb-6">
        <svg
          className="h-8 w-8 text-gray-900"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Content */}
      <p className="mb-6 text-base leading-relaxed text-gray-700">
        {content}
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
          <span className="text-lg font-semibold">{name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">
            {role} at {company}
          </p>
        </div>
      </div>
    </div>
  );
}
