"use client";

import React, { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
};

export function SkillIcon({ src, alt, className = "", fallback = "/lp-assets/code-engn.svg" }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      className={className}
      alt={alt}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback);
      }}
    />
  );
}
