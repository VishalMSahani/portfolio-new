"use client";

import Image from "next/image";
import React, { useState } from "react";

export function ProjectImage({
  src,
  fallback,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  fallback?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [useFallback, setUseFallback] = useState(false);
  const displaySrc = useFallback && fallback ? fallback : src;

  return (
    <Image
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setUseFallback(true)}
    />
  );
}
