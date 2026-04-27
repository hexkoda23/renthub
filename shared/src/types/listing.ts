export type PropertyType = "flat" | "duplex" | "self-contain" | "room" | "bungalow" | "mansion";

export type ElectricityBand = "band-a" | "band-b" | "band-c" | "band-d" | "none";
export type WaterSituation = "running" | "not-running" | "none";
export type ParkingSituation = "compound" | "nearby" | "street" | "none";
export type ListingPurpose = "rent" | "sale" | "shortlet";
export type RentFrequency = "monthly" | "yearly";
export type PropertyCondition = "newly-built" | "renovated" | "old-but-clean" | "needs-work";
export type LandTitle = "c-of-o" | "r-of-o" | "excision" | "deed-of-assignment" | "none";
export type ListingType = "owner" | "agent";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number; // NGN monthly
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  state: string;
  city: string;
  lga: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  amenities: string[];
  landlordId: string;
  status: "active" | "rented" | "pending";
  verified: boolean;
  views: number;
  createdAt: string;

  // Nigerian-specific fields (all optional for backwards compat)
  electricityBand?: ElectricityBand;
  waterSituation?: WaterSituation;
  parkingSituation?: ParkingSituation;
  listingPurpose?: ListingPurpose;
  rentFrequency?: RentFrequency;
  yearlyPrice?: number;
  propertyCondition?: PropertyCondition;
  estateName?: string;
  landTitle?: LandTitle | null;
  isNegotiable?: boolean;
  agentFee?: number | null;
  cautionFee?: number | null;
  agreementFee?: number | null;
  listingType?: ListingType;
  packOutDate?: string | null;
  isHandoverListing?: boolean;
  source: "renthub" | "jiji" | "handover";
  externalUrl?: string;
  externalId?: string;

  // Buy & Shortlet Expansion
  shortletPricing?: {
    perNight: number;
    perWeek?: number;
    minimumStay?: number;
  } | null;
  salePrice?: number | null;
  landSize?: string | null;
  landSizeUnit?: "sqm" | "plots" | "acres" | null;
}
