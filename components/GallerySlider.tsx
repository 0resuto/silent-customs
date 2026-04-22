"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const photos = [
  {
    src: "/images/alu-links.webp",
    caption: "Фрезерованные линки подвески из цельного куска алюминия"
  },
  {
    src: "/images/welded-seam.webp",
    caption: "Сварные швы ручной работы, прошедшие термообработку"
  },
  {
    src: "/images/front-carbon-frame.webp",
    caption: "Карбоновый передний треугольник с индивидуальной укладкой слоев"
  },
  {
    src: "/images/painted-frame.webp",
    caption: "Кастомная покраска в любой цвет по каталогу RAL"
  },
  {
    src: "/images/bike-test-on-trails.webp",
    caption: "Готовый байк на нашей раме, покоряющий трейлы"
  }
];

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const handleDragEnd = (_: unknown, { offset }: { offset: { x: number } }) => {
    if (offset.x < -50) {
      next();
    } else if (offset.x > 50) {
      prev();
    }
  };

  return (
    <div className="flex flex-col gap-4 md:block">
      <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-[700px] rounded-3xl overflow-hidden bg-surface-container shadow-xl md:shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.23, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={photos[currentIndex].src} 
              alt={`Photo ${currentIndex + 1}`}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block absolute bottom-12 left-12 right-12 text-white"
            >
              <p className="text-2xl font-medium tracking-tight max-w-2xl leading-relaxed">
                {photos[currentIndex].caption}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-bold tracking-widest uppercase opacity-50">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Buttons */}
        <div className="md:hidden absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <button onClick={prev} className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all active:scale-90">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all active:scale-90">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex absolute bottom-12 right-12 gap-4 z-10">
          <button onClick={prev} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90">
            <ChevronLeft size={24} />
          </button>
          <button onClick={next} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Description */}
      <div className="md:hidden px-2 mt-2">
        <p className="text-lg font-medium tracking-tight text-neutral-900 leading-relaxed">
          {photos[currentIndex].caption}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm font-bold tracking-widest uppercase text-neutral-400">
            {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;