'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Testimonial } from '@/lib/types';
import { FaStar } from 'react-icons/fa';

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: Props) {
  const [index, setIndex] = useState(0);

  // Auto-rotate
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const goTo = (i: number) =>
    setIndex((i + testimonials.length) % testimonials.length);

  const current = testimonials[index];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="card-base relative p-8 sm:p-12">
        {/* Quote mark */}
        <div className="absolute left-6 top-4 font-display text-6xl text-pink/30 sm:text-7xl">
          "
        </div>

        <div className="text-center">
          {/* Rating */}
          <div className="mb-6 flex justify-center gap-1 text-pink">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={18}
                className={
                  i < current.rating ? 'text-pink' : 'text-espresso/15'
                }
              />
            ))}
          </div>

          {/* Content */}
          <p className="text-base leading-relaxed text-espresso/80 sm:text-lg">
            "{current.content}"
          </p>

          {/* Avatar + name */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-pink">
              {current.avatar_url ? (
                <Image
                  src={current.avatar_url}
                  alt={current.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-cream text-xl font-bold text-espresso">
                  {current.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="font-display text-base font-bold text-espresso">
                {current.name}
              </div>
              {current.role && (
                <div className="text-xs uppercase tracking-wide text-espresso/60">
                  {current.role}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      {testimonials.length > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Lihat testimoni ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? 'w-8 bg-pink'
                  : 'w-2 bg-espresso/30 hover:bg-espresso/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
