"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string; // public path
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "GyanLab",
    content:
      "Working with Vishal has been invaluable for our launch. I highly recommend him for speed without compromising quality.",
    avatar: "/lp-assets/profile.svg",
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "JNY",
    content:
      "Thoughtful UI/UX and robust engineering. The collaboration was smooth and outcomes exceeded expectations.",
    avatar: "/lp-assets/ai.svg",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    company: "TrueFeedback",
    content:
      "Reliable, detail‑oriented, and fast. Vishal delivered a polished platform ahead of schedule.",
    avatar: "/lp-assets/ps-1.svg",
  },
];

export function TestimonialsLoop({
  items = DEFAULT_TESTIMONIALS,
  intervalMs = 2000,
}: {
  items?: Testimonial[];
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const step = () => {
      setIsFading(true);
      setTimeout(() => {
        setActive((i) => (i + 1) % items.length);
        setIsFading(false);
      }, Math.min(300, Math.max(150, intervalMs / 6))); // quick fade portion
    };
    const id = setInterval(step, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  const current = useMemo(() => items[active], [items, active]);

  // Fixed frame slots centered around the active index (no duplication)
  const ITEM_W = 56; // avatar tile size
  const LEN = items.length;
  const TARGET_SLOTS = 9; // desire up to 9 visible frames
  let slots = Math.min(TARGET_SLOTS, LEN);
  if (slots > 1 && slots % 2 === 0) slots -= 1; // keep it odd so there's a middle
  const halfSlots = Math.floor(Math.max(1, slots) / 2);
  const offsets = useMemo(
    () => Array.from({ length: slots || 1 }, (_, i) => i - halfSlots),
    [slots, halfSlots]
  );
  const frames = useMemo(
    () =>
      offsets.map((off) => {
        const idx = ((active + off) % LEN + LEN) % LEN; // safe modulo
        return { off, idx, t: items[idx], key: `${off}-${items[idx]?.name ?? idx}` };
      }),
    [offsets, active, LEN, items]
  );

  return (
    <div className="relative overflow-visible rounded-3xl border border-gray-200 bg-white p-8 md:p-12">
      {/* Quote */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 flex items-center justify-center text-gray-300">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M7.17 6A5.17 5.17 0 002 11.17V22h8V10a4 4 0 00-4-4zm10 0A5.17 5.17 0 0012 11.17V22h8V10a4 4 0 00-4-4z" />
          </svg>
        </div>
        <p
          className={`text-balance text-xl leading-relaxed md:text-2xl transition-all duration-300 ${
            isFading ? "opacity-60 translate-y-1 text-gray-700" : "opacity-100 translate-y-0 text-gray-900"
          }`}
        >
          {current.content}
        </p>
        <div className="mt-4 text-sm text-gray-600">
          {current.name} <span className="text-gray-400">·</span> {current.role}, {current.company}
        </div>
      </div>

      {/* Avatars row (fixed frames) */}
      <div className="mt-8 flex w-full items-end justify-center gap-3">
        {frames.map(({ off, idx, t, key }) => {
          const isActiveItem = off === 0;
          return (
            <button
              key={key}
              onClick={() => setActive(idx)}
              aria-label={`Show testimonial from ${t.name}`}
              className={`flex-shrink-0 rounded-xl border ${
                isActiveItem ? "border-gray-900" : "border-gray-200"
              } p-1`}
              style={{ width: ITEM_W, height: ITEM_W }}
            >
              <div
                className={`h-full w-full overflow-hidden rounded-lg transition-all duration-300 ${
                  isActiveItem
                    ? "translate-y-0 scale-100"
                    : "translate-y-1 scale-90 grayscale opacity-70"
                }`}
              >
                <Image src={t.avatar} alt={t.name} width={ITEM_W - 8} height={ITEM_W - 8} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
