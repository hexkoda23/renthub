import { motion } from "framer-motion";
import { Listing, ELECTRICITY_BANDS } from "@renthob/shared";
import { Card } from "../ui";
import { BedDouble, Bath, MapPin, Zap, Droplets } from "lucide-react";
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

  const getPurposeBadge = () => {
    switch (listing.listingPurpose) {
      case "rent": return "For Rent";
      case "sale": return "For Sale";
      case "shortlet": return "Shortlet";
      default: return listing.type;
    }
  };

  return (
    <CardWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="overflow-hidden p-0 group h-full transition-all duration-300 rounded-3xl border border-neutral-100/60 shadow-card hover:shadow-card-hover bg-white" clickable>
          <div className="relative h-56 w-full overflow-hidden">
            <motion.img 
              src={listing.images[0] || "https://via.placeholder.com/400x300?text=No+Image"} 
              alt={listing.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Price on Image */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                <PriceTag 
                  price={listing.price} 
                  purpose={listing.listingPurpose} 
                  rentFrequency={listing.rentFrequency}
                  salePrice={listing.salePrice}
                  shortletPricing={listing.shortletPricing}
                  className="text-xl font-display font-bold text-white"
                />
              </div>
            </div>

            {/* Top Left - Purpose Badge */}
            <div className="absolute left-3 top-3 z-10">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-ink">
                {getPurposeBadge()}
              </span>
            </div>

            {/* Top Right - Verified/Jiji Badge */}
            <div className="absolute right-3 top-3 z-10">
              {listing.verified ? (
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Verified
                </span>
              ) : isJiji ? (
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-neutral-600">
                  via Jiji.ng
                </span>
              ) : null}
            </div>
          </div>
          
          <div className="p-5">
            <h3 className="mb-2 line-clamp-2 text-base font-display font-semibold text-neutral-900 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
            
            <div className="mb-4 flex items-center gap-1.5 text-sm text-neutral-400">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{listing.city}, {listing.state}</span>
            </div>
            
            {/* Amenity pills */}
            <div className="mb-4 flex flex-wrap gap-2 min-h-[24px]">
              {elecInfo && (
                <span className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-2.5 py-0.5 text-[10px] font-medium text-neutral-600">
                  <Zap className="h-2.5 w-2.5" />
                  {elecInfo.label}
                </span>
              )}
              {listing.waterSituation && listing.waterSituation !== "none" && (
                <span className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-2.5 py-0.5 text-[10px] font-medium text-neutral-600">
                  <Droplets className="h-2.5 w-2.5" />
                  {listing.waterSituation === "running" ? "Water" : "Limited Water"}
                </span>
              )}
            </div>

            {/* Beds/Baths */}
            <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                  <BedDouble className="h-4 w-4 text-neutral-300" />
                  <span className="font-semibold">{listing.bedrooms}</span>
                  <span className="text-neutral-400 text-xs">Beds</span>
                </div>
                {listing.bathrooms > 0 && (
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <Bath className="h-4 w-4 text-neutral-300" />
                    <span className="font-semibold">{listing.bathrooms}</span>
                    <span className="text-neutral-400 text-xs">Baths</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 border-t border-neutral-100 pt-4">
              <button 
                className="flex-1 flex items-center justify-center gap-1.5 bg-primary-light text-primary hover:bg-primary hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                View Details
              </button>
              <button 
                onClick={(e) => e.preventDefault()}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E] hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                Call Landlord
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </CardWrapper>
  );
};
