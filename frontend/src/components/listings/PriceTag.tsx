import { ListingPurpose, RentFrequency } from "@renthub/shared";

interface PriceTagProps {
  price: number;
  purpose?: ListingPurpose;
  rentFrequency?: RentFrequency;
  salePrice?: number | null;
  shortletPricing?: {
    perNight: number;
    perWeek?: number;
  } | null;
  className?: string;
}

const formatNGN = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatCompact = (price: number) => {
  if (price >= 1000000) return `₦${(price / 1000000).toFixed(1)}M`;
  if (price >= 1000) return `₦${(price / 1000).toFixed(0)}K`;
  return formatNGN(price);
};

export const PriceTag = ({ 
  price, 
  purpose = "rent", 
  rentFrequency = "yearly", 
  salePrice, 
  shortletPricing,
  className = "" 
}: PriceTagProps) => {
  
  if (purpose === "sale" && salePrice) {
    return (
      <span className={`font-bold text-primary ${className}`}>
        {formatCompact(salePrice)}
      </span>
    );
  }

  if (purpose === "shortlet" && shortletPricing) {
    return (
      <span className={`font-bold text-primary ${className}`}>
        {formatNGN(shortletPricing.perNight)}
        <span className="text-[10px] font-normal text-neutral-500">/night</span>
      </span>
    );
  }

  // Default: Rent
  return (
    <span className={`font-bold text-primary ${className}`}>
      {formatCompact(price)}
      <span className="text-[10px] font-normal text-neutral-500">
        /{rentFrequency === "monthly" ? "mo" : "yr"}
      </span>
    </span>
  );
};
