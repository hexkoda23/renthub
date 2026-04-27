import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

interface PropertyGalleryProps {
  images: string[];
}

export const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % images.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-100 shadow-sm border border-neutral-100">
      {/* Main Image Container */}
      <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden relative group">
        <img 
          src={images[activeIdx] || "https://via.placeholder.com/1200x600?text=No+Image"} 
          alt="Property View" 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white/50 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white/50 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Floating Indicator */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
          {activeIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 p-2 bg-white overflow-x-auto no-scrollbar">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                activeIdx === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100 shadow-sm"
              )}
            >
              <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
