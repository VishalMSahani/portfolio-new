import React from "react";
import Image from "next/image";

interface SubService {
  name: string;
  icon: React.ReactNode;
}

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  subServices: SubService[];
}

export function ServiceCard({ title, description, imageSrc, subServices }: ServiceCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white">
      {/* Image Section */}
      <div className="relative h-72 overflow-hidden bg-gray-50 rounded-b-3xl">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Content Section */}
      <div className="relative p-4">
        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold text-gray-900">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        {/* Sub Services */}
        <div className="space-y-3">
          {subServices.map((service, index) => (
            <div
              key={index}
              className="group/item flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-all duration-300 group-hover/item:bg-gray-700 group-hover/item:text-white group-hover/item:shadow-sm">
                {service.icon}
              </div>
              <span className="font-medium text-gray-900">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
