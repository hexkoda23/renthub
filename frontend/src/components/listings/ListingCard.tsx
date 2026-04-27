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
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="overflow-hidden p-0 group h-full transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10" clickable>
          <div className="relative h-48 w-full overflow-hidden">
            <motion.img 
              src={listing.images[0] || "https://via.placeholder.com/400x300?text=No+Image"} 
              alt={listing.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {listing.listingPurpose && (
                <Badge 
                  className={`bg-white/95 backdrop-blur-sm uppercase text-[10px] font-bold border-none ${
                    listing.listingPurpose === "sale" ? "text-success-700" : 
                    listing.listingPurpose === "shortlet" ? "text-purple-600" : "text-primary"
                  }`}
                >
                  {listing.listingPurpose === "rent" ? "For Rent" : 
                   listing.listingPurpose === "sale" ? "For Sale" : "Shortlet"}
                </Badge>
              )}
              {listing.verified && (
                <Badge variant="info" className="gap-1 bg-white/90 backdrop-blur-sm text-[10px]">
                  <CheckCircle className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
          <div className="absolute right-3 top-3 flex flex-col gap-1.5">
            {!isJiji && listing.listingType && (
              <Badge 
                variant={listing.listingType === "owner" ? "info" : "warning"} 
                className="text-[10px] font-bold border-none"
              >
                {listing.listingType === "owner" ? "🏠 Owner" : "🏢 Agent"}
              </Badge>
            )}
            {listing.isNegotiable && (
              <Badge variant="success" className="text-[10px] font-bold border-none">
                Negotiable
              </Badge>
            )}
          </div>
          {listing.isHandoverListing && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-600/90 to-transparent py-3 px-3">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">🔄 Handover Listing</span>
            </div>
          )}
          {isJiji && (
            <div className="absolute bottom-2 right-2">
              <Badge className="bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold border-none py-0.5 px-2">
                via Jiji.ng
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          {/* Price */}
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex flex-col">
              <PriceTag 
                price={listing.price} 
                purpose={listing.listingPurpose} 
                rentFrequency={listing.rentFrequency}
                salePrice={listing.salePrice}
                shortletPricing={listing.shortletPricing}
                className="text-xl"
              />
              {listing.listingPurpose === "shortlet" && listing.shortletPricing?.minimumStay && (
                <span className="text-[10px] text-neutral-400 font-medium mt-0.5">Min. {listing.shortletPricing.minimumStay} nights</span>
              )}
            </div>
            <Badge variant="neutral" className="capitalize text-[10px] bg-neutral-100 text-neutral-600 border-none">{listing.type}</Badge>
          </div>
          
          <h3 className="mb-1 line-clamp-1 text-base font-bold font-sora text-neutral-900 group-hover:text-primary transition-colors">{listing.title}</h3>
          
          <div className="mb-3 flex items-center gap-1 text-xs text-neutral-500">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{listing.city}, {listing.state}</span>
          </div>
          
          {/* Colombian Info Pills (Renamed from Nigerian in my head for a sec, back to Nigerian) */}
          <div className="mb-3 flex flex-wrap gap-1.5 min-h-[22px]">
            {elecInfo && (
              <span className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[10px] font-bold ${elecInfo.bg} ${elecInfo.color}`}>
                <Zap className="h-2.5 w-2.5" />
                {elecInfo.label}
              </span>
            )}
            {listing.waterSituation && listing.waterSituation !== "none" && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                <Droplets className="h-2.5 w-2.5" />
                {listing.waterSituation === "running" ? "Water" : "Limited Water"}
              </span>
            )}
          </div>

          {/* Beds/Baths */}
          <div className="flex items-center gap-4 border-t border-neutral-100 pt-3">
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-bold">
              <BedDouble className="h-3.5 w-3.5 text-neutral-400" />
              <span>{listing.bedrooms} Beds</span>
            </div>
            {listing.bathrooms > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-bold">
                <Bath className="h-3.5 w-3.5 text-neutral-400" />
                <span>{listing.bathrooms} Baths</span>
              </div>
            )}
          </div>
        </div>
      </Card>
      </motion.div>
    </CardWrapper>
  );
};
