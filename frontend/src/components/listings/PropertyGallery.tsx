import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyGalleryProps {
  images: string[];
}

export const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % images.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative space-y-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-sand/20 shadow-2xl border border-clay/10 aspect-[16/9] md:aspect-[21/9]">
        {/* Main Image Container */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx] || "https://via.placeholder.com/1200x600?text=No+Image"}
            alt="Property View"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button 
              onClick={prev}
              className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={next}
              className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Floating Controls */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-display font-bold tracking-widest uppercase">
            {activeIdx + 1} <span className="text-white/40 mx-1">/</span> {images.length}
          </div>
          <button className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 px-2 overflow-x-auto no-scrollbar pb-2">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-500",
                activeIdx === idx 
                  ? "border-clay ring-4 ring-clay/10 scale-95" 
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
              )}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
              {activeIdx === idx && (
                <motion.div 
                  layoutId="activeThumb"
                  className="absolute inset-0 bg-clay/10 pointer-events-none"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
