import { motion } from "framer-motion";
import { Listing, ELECTRICITY_BANDS } from "@renthub/shared";
import { Card, Badge } from "../ui";
import { BedDouble, Bath, MapPin, CheckCircle, Zap, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { PriceTag } from "./PriceTag";

interface ListingCardProps {
  listing: Listing;
}

const getElectricityStyle = (band?: string) => {
  const found = ELECTRICITY_BANDS.find(b => b.value === band);
  if (!found) return null;
  return found;
};

export const ListingCard = ({ listing }: ListingCardProps) => {
  const elecInfo = getElectricityStyle(listing.electricityBand);
  const isJiji = listing.source === "jiji";

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isJiji && listing.externalUrl) {
      return (
        <a href={listing.externalUrl} target="_blank" rel="noreferrer" className="block outline-none">
          {children}
        </a>
      );
    }
    return <Link to={`/listings/${listing.id}`}>{children}</Link>;
  };

  return (
    <CardWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(255,92,0,0.15)" }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="overflow-hidden p-0 group h-full transition-all duration-300 border-l-0 hover:border-l-4 hover:border-primary bg-white" clickable>
          <div className="relative h-56 w-full overflow-hidden">
            <motion.img 
              src={listing.images[0] || "https://via.placeholder.com/400x300?text=No+Image"} 
              alt={listing.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            
            {/* Price on Image */}
            <div className="absolute bottom-4 left-4 z-10">
              <PriceTag 
                price={listing.price} 
                purpose={listing.listingPurpose} 
                rentFrequency={listing.rentFrequency}
                salePrice={listing.salePrice}
                shortletPricing={listing.shortletPricing}
                className="text-2xl font-serif italic text-white"
              />
            </div>

            {/* Top Badges */}
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 z-10">
              <Badge 
                className="bg-ink/80 backdrop-blur-md border-none text-white px-3 py-1 rounded-full text-[10px] font-display uppercase tracking-wider"
              >
                {listing.type}
              </Badge>
            </div>

            <div className="absolute right-3 top-3 flex flex-wrap gap-1.5 z-10">
              {listing.verified && (
                <Badge className="bg-white/20 backdrop-blur-md border border-white/30 text-white gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold">
                  <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Verified
                </Badge>
              )}
            </div>

            {isJiji && (
              <div className="absolute bottom-4 right-4 z-10">
                <Badge className="bg-black/40 backdrop-blur-sm text-white/80 text-[9px] font-medium border-none py-0.5 px-2 rounded-full">
                  via Jiji.ng
                </Badge>
              </div>
            )}
          </div>
          
          <div className="p-5">
            <h3 className="mb-2 line-clamp-1 text-lg font-bold font-display text-neutral-900 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
            
            <div className="mb-4 flex items-center gap-1.5 text-sm text-neutral-500">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="truncate">{listing.city}, {listing.state}</span>
            </div>
            
            {/* Amenity pills */}
            <div className="mb-5 flex flex-wrap gap-2 min-h-[24px]">
              {elecInfo && (
                <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-0.5 text-[10px] font-medium text-neutral-600">
                  <Zap className="h-2.5 w-2.5 text-primary" />
                  {elecInfo.label}
                </span>
              )}
              {listing.waterSituation && listing.waterSituation !== "none" && (
                <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-0.5 text-[10px] font-medium text-neutral-600">
                  <Droplets className="h-2.5 w-2.5 text-primary" />
                  {listing.waterSituation === "running" ? "Water" : "Limited Water"}
                </span>
              )}
            </div>

            {/* Beds/Baths */}
            <div className="flex items-center gap-6 border-t border-neutral-100 pt-4">
              <div className="flex items-center gap-2 text-sm text-neutral-700 font-medium">
                <BedDouble className="h-4 w-4 text-neutral-400" />
                <span className="font-bold">{listing.bedrooms}</span>
                <span className="text-neutral-500 text-xs">Beds</span>
              </div>
              {listing.bathrooms > 0 && (
                <div className="flex items-center gap-2 text-sm text-neutral-700 font-medium">
                  <Bath className="h-4 w-4 text-neutral-400" />
                  <span className="font-bold">{listing.bathrooms}</span>
                  <span className="text-neutral-500 text-xs">Baths</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </CardWrapper>
  );
};
