'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';

const slides = [
  {
    image: '/img/bubbles.webp',
    title: 'Your home for all your toileteries',
    subtitle: null,
    showButton: false
  },
  {
    image: '/img/soaps.webp',
    title: 'Soaps',
    subtitle: 'Our best soaps to keep you germ-free',
    showButton: true
  }
];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
    };

    if (!isPaused) {
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="relative w-full max-w-[95vw] mx-auto h-[600px] rounded-2xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover filter"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col">
            <div className="mt-auto px-8 pb-16">
              <h1 className="text-4xl font-bold text-white mb-2">{slide.title}</h1>
              {slide.subtitle && (
                <p className="text-xl text-white italic mb-6">{slide.subtitle}</p>
              )}
              {slide.showButton && (
                <div>
                  <Button>Buy Now</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};
